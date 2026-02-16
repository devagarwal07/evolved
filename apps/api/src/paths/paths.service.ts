import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PATH_SYSTEM_PROMPT = `You are the **EvolveEd Learning Path Generator** — an AI that creates structured, progressive learning roadmaps.

Your output MUST be a valid JSON object with this exact structure:
{
  "phases": [
    {
      "phase": 1,
      "title": "Phase Title (e.g., Foundations)",
      "description": "What this phase covers",
      "nodes": [
        {
          "title": "Topic/Skill Name",
          "order": 1,
          "resources": {
            "description": "Brief description of what to learn",
            "estimatedHours": 3,
            "tips": "Study tips for this topic",
            "searchQuery": "best YouTube search query for this topic tutorial"
          }
        }
      ]
    }
  ]
}

Rules:
- Generate 3-5 phases, each with 3-6 nodes
- Order nodes from prerequisite → advanced within each phase
- Make it progressive: Phase 1 = fundamentals, last phase = mastery
- Include practical projects in later phases
- For searchQuery, generate an optimal YouTube search query that would find the best tutorial video for that node
- Return ONLY the JSON object, no markdown wrapping`;

@Injectable()
export class PathsService {
    private readonly logger = new Logger(PathsService.name);
    private genAI: GoogleGenerativeAI | null = null;
    private model: any = null;
    private youtubeApiKey: string | null = null;

    constructor(private prisma: PrismaService) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
            this.logger.log('Learning Paths AI initialized');
        }
        this.youtubeApiKey = process.env.YOUTUBE_API_KEY || null;
        if (this.youtubeApiKey) {
            this.logger.log('YouTube API initialized');
        }
    }

    // ─── YouTube Integration ────────────────────────────────

    async fetchYouTubeVideos(query: string, maxResults = 5): Promise<any[]> {
        if (!this.youtubeApiKey) {
            this.logger.warn('No YOUTUBE_API_KEY — returning demo videos');
            return this.getDemoVideos(query);
        }

        try {
            const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' tutorial')}&type=video&order=viewCount&maxResults=${maxResults}&key=${this.youtubeApiKey}`;
            const searchRes = await fetch(searchUrl);
            const searchData = await searchRes.json();

            if (!searchData.items || searchData.items.length === 0) {
                return this.getDemoVideos(query);
            }

            const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

            // Fetch video stats (views, duration)
            const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet&id=${videoIds}&key=${this.youtubeApiKey}`;
            const statsRes = await fetch(statsUrl);
            const statsData = await statsRes.json();

            return (statsData.items || []).map((video: any) => ({
                videoId: video.id,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url,
                channelTitle: video.snippet.channelTitle,
                viewCount: parseInt(video.statistics.viewCount || '0'),
                duration: this.parseDuration(video.contentDetails?.duration || ''),
                publishedAt: video.snippet.publishedAt,
                watched: false,
            }));
        } catch (error) {
            this.logger.error(`YouTube API Error: ${(error as Error).message}`);
            return this.getDemoVideos(query);
        }
    }

    private parseDuration(iso: string): string {
        const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match) return '0:00';
        const h = match[1] ? `${match[1]}:` : '';
        const m = match[2] || '0';
        const s = (match[3] || '0').padStart(2, '0');
        return `${h}${m}:${s}`;
    }

    private getDemoVideos(query: string): any[] {
        return [
            { videoId: 'dQw4w9WgXcQ', title: `${query} - Complete Tutorial`, thumbnail: `https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg`, channelTitle: 'EvolveEd Demo', viewCount: 100000, duration: '15:30', watched: false },
            { videoId: 'dQw4w9WgXcQ', title: `${query} - Explained Simply`, thumbnail: `https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg`, channelTitle: 'EvolveEd Demo', viewCount: 75000, duration: '10:15', watched: false },
            { videoId: 'dQw4w9WgXcQ', title: `${query} - Deep Dive`, thumbnail: `https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg`, channelTitle: 'EvolveEd Demo', viewCount: 50000, duration: '22:00', watched: false },
        ];
    }

    // ─── Path Generation ────────────────────────────────────

    async generatePath(userId: string, topic: string, goal: string, level?: string) {
        let phasesData: any;

        if (this.model) {
            try {
                const prompt = `Generate a comprehensive learning roadmap for: "${topic}"
Goal: ${goal} (${level || 'beginner'} level)
Create a structured path with phases and nodes that takes a student from ${level || 'beginner'} to mastery.`;

                const result = await this.model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    systemInstruction: PATH_SYSTEM_PROMPT,
                    generationConfig: { maxOutputTokens: 4096, temperature: 0.7 },
                });

                const text = (await result.response).text();
                const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                phasesData = JSON.parse(jsonStr);
                this.logger.log(`Generated path for: "${topic}"`);
            } catch (error) {
                this.logger.error(`Gemini Path Error: ${(error as Error).message}`);
                phasesData = this.getDemoData(topic);
            }
        } else {
            phasesData = this.getDemoData(topic);
        }

        // Map goal string to enum
        const goalMap: Record<string, any> = {
            'SKILL': 'SKILL', 'EXAM': 'EXAM', 'INTERVIEW': 'INTERVIEW',
            'CURIOSITY': 'CURIOSITY', 'CERTIFICATION': 'CERTIFICATION',
        };

        // Fetch YouTube videos for each node (in parallel, batched)
        const allNodes: any[] = [];
        for (const phase of (phasesData.phases || [])) {
            for (const node of (phase.nodes || [])) {
                const searchQuery = node.resources?.searchQuery || `${node.title} ${topic} tutorial`;
                const videos = await this.fetchYouTubeVideos(searchQuery, 5);
                allNodes.push({
                    title: node.title,
                    phase: phase.phase,
                    order: node.order || allNodes.filter((n: any) => n.phase === phase.phase).length + 1,
                    status: phase.phase === 1 && allNodes.filter((n: any) => n.phase === phase.phase).length === 0 ? 'ACTIVE' : 'LOCKED',
                    resources: {
                        ...(node.resources || {}),
                        videos,
                        watchedVideos: [],
                    },
                });
            }
        }

        const path = await this.prisma.learningPath.create({
            data: {
                topic,
                goal: goalMap[goal.toUpperCase()] || 'SKILL',
                phases: phasesData,
                userId,
                nodes: {
                    create: allNodes,
                },
            },
            include: { nodes: { orderBy: [{ phase: 'asc' }, { order: 'asc' }] } },
        });

        return path;
    }

    // ─── Video Progress ─────────────────────────────────────

    async markVideoWatched(pathId: string, nodeId: string, userId: string, videoId: string) {
        const path = await this.prisma.learningPath.findFirst({ where: { id: pathId, userId } });
        if (!path) throw new NotFoundException('Path not found');

        const node = await this.prisma.pathNode.findUnique({ where: { id: nodeId } });
        if (!node) throw new NotFoundException('Node not found');

        const resources = (node.resources as any) || {};
        const watchedVideos = resources.watchedVideos || [];

        if (!watchedVideos.includes(videoId)) {
            watchedVideos.push(videoId);
        }

        const videos = resources.videos || [];
        const allWatched = videos.length > 0 && videos.every((v: any) => watchedVideos.includes(v.videoId));

        // Update node resources with watched status
        const updatedResources = { ...resources, watchedVideos };
        await this.prisma.pathNode.update({
            where: { id: nodeId },
            data: { resources: updatedResources },
        });

        // If all videos watched, auto-complete the node
        if (allWatched && node.status !== 'COMPLETED') {
            await this.updateNodeStatus(pathId, nodeId, userId, 'COMPLETED');
        }

        // Recalculate path progress based on video completion
        const allNodes = await this.prisma.pathNode.findMany({ where: { pathId } });
        let totalVideos = 0;
        let totalWatched = 0;
        for (const n of allNodes) {
            const r = (n.resources as any) || {};
            const vids = r.videos || [];
            const watched = r.watchedVideos || [];
            totalVideos += vids.length;
            totalWatched += Math.min(watched.length, vids.length);
        }
        const progress = totalVideos > 0 ? (totalWatched / totalVideos) * 100 : 0;
        await this.prisma.learningPath.update({ where: { id: pathId }, data: { progress } });

        return {
            nodeId,
            videoId,
            watchedVideos,
            allWatched,
            pathProgress: progress,
        };
    }

    async getNodeVideos(pathId: string, nodeId: string, userId: string) {
        const path = await this.prisma.learningPath.findFirst({ where: { id: pathId, userId } });
        if (!path) throw new NotFoundException('Path not found');

        const node = await this.prisma.pathNode.findUnique({ where: { id: nodeId } });
        if (!node) throw new NotFoundException('Node not found');

        const resources = (node.resources as any) || {};
        const videos = (resources.videos || []).map((v: any) => ({
            ...v,
            watched: (resources.watchedVideos || []).includes(v.videoId),
        }));

        return {
            nodeId: node.id,
            title: node.title,
            phase: node.phase,
            status: node.status,
            videos,
            watchedCount: (resources.watchedVideos || []).length,
            totalCount: videos.length,
        };
    }

    // ─── CRUD ───────────────────────────────────────────────

    async getPaths(userId: string) {
        return this.prisma.learningPath.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            include: { nodes: { orderBy: [{ phase: 'asc' }, { order: 'asc' }] } },
        });
    }

    async getPath(id: string, userId: string) {
        const path = await this.prisma.learningPath.findFirst({
            where: { id, userId },
            include: { nodes: { orderBy: [{ phase: 'asc' }, { order: 'asc' }] } },
        });
        if (!path) throw new NotFoundException('Path not found');
        return path;
    }

    async updateNodeStatus(pathId: string, nodeId: string, userId: string, status: string) {
        const path = await this.prisma.learningPath.findFirst({ where: { id: pathId, userId } });
        if (!path) throw new NotFoundException('Path not found');

        const node = await this.prisma.pathNode.update({
            where: { id: nodeId },
            data: { status: status as any },
        });

        // Update path progress
        const allNodes = await this.prisma.pathNode.findMany({ where: { pathId } });
        const completed = allNodes.filter(n => n.status === 'COMPLETED').length;
        const progress = allNodes.length > 0 ? (completed / allNodes.length) * 100 : 0;

        await this.prisma.learningPath.update({
            where: { id: pathId },
            data: { progress },
        });

        // Unlock next node if completed
        if (status === 'COMPLETED') {
            const sorted = allNodes.sort((a, b) => a.phase - b.phase || a.order - b.order);
            const idx = sorted.findIndex(n => n.id === nodeId);
            if (idx >= 0 && idx < sorted.length - 1) {
                const next = sorted[idx + 1];
                if (next.status === 'LOCKED') {
                    await this.prisma.pathNode.update({
                        where: { id: next.id },
                        data: { status: 'ACTIVE' },
                    });
                }
            }
        }

        return node;
    }

    async deletePath(id: string, userId: string) {
        const path = await this.prisma.learningPath.findFirst({ where: { id, userId } });
        if (!path) throw new NotFoundException('Path not found');
        await this.prisma.pathNode.deleteMany({ where: { pathId: id } });
        await this.prisma.learningPath.delete({ where: { id } });
        return { message: 'Path deleted' };
    }

    private getDemoData(topic: string) {
        return {
            phases: [
                {
                    phase: 1, title: 'Foundations',
                    description: `Core fundamentals of ${topic}`,
                    nodes: [
                        { title: `Introduction to ${topic}`, order: 1, resources: { description: 'Get started with the basics', estimatedHours: 2, tips: 'Take notes as you learn', searchQuery: `${topic} introduction tutorial for beginners` } },
                        { title: 'Core Concepts', order: 2, resources: { description: 'Understand key principles', estimatedHours: 3, tips: 'Practice with examples', searchQuery: `${topic} core concepts explained` } },
                    ],
                },
                {
                    phase: 2, title: 'Intermediate',
                    description: 'Building on fundamentals',
                    nodes: [
                        { title: 'Advanced Techniques', order: 1, resources: { description: 'Deep dive into methods', estimatedHours: 4, tips: 'Focus on understanding why', searchQuery: `${topic} advanced techniques tutorial` } },
                        { title: 'Practice Project', order: 2, resources: { description: 'Apply what you learned', estimatedHours: 5, tips: 'Build something real', searchQuery: `${topic} project tutorial step by step` } },
                    ],
                },
            ],
        };
    }
}
