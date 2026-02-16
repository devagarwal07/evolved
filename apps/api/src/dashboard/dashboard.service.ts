
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getOverview(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                xp: true,
                streak: true,
                role: true,
            }
        });

        const recentActivity = await this.prisma.tutorSession.findMany({
            where: { userId },
            take: 3,
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                topic: true,
                updatedAt: true
            }
        });

        // Real learning path data
        const activePaths = await this.prisma.learningPath.findMany({
            where: { userId },
            take: 3,
            orderBy: { updatedAt: 'desc' },
            include: {
                nodes: {
                    orderBy: [{ phase: 'asc' }, { order: 'asc' }],
                },
            },
        });

        const pathsWithMeta = activePaths.map(path => {
            const totalNodes = path.nodes.length;
            const completedNodes = path.nodes.filter(n => n.status === 'COMPLETED').length;
            const activeNode = path.nodes.find(n => n.status === 'ACTIVE');
            const activePhase = activeNode
                ? ((path.phases as any)?.phases || []).find((p: any) => p.phase === activeNode.phase)
                : null;

            return {
                id: path.id,
                topic: path.topic,
                goal: path.goal,
                progress: path.progress,
                totalNodes,
                completedNodes,
                currentPhase: activePhase?.title || 'Getting Started',
                currentNode: activeNode?.title || null,
                updatedAt: path.updatedAt,
            };
        });

        // Real stats
        const totalPaths = await this.prisma.learningPath.count({ where: { userId } });
        const totalNodesCompleted = await this.prisma.pathNode.count({
            where: { path: { userId }, status: 'COMPLETED' },
        });
        const totalNotes = await this.prisma.note.count({ where: { userId } });

        return {
            user,
            stats: {
                totalPaths,
                totalNodesCompleted,
                totalNotes,
                hoursLearned: Math.round(totalNodesCompleted * 2.5 * 10) / 10, // estimate ~2.5h per node
            },
            recentActivity,
            activePaths: pathsWithMeta,
        };
    }

    async getCourses(userId: string) {
        const paths = await this.prisma.learningPath.findMany({
            where: { userId },
            include: {
                nodes: true,
            },
        });

        return paths.map(path => ({
            id: path.id,
            title: path.topic,
            progress: path.progress,
            totalNodes: path.nodes.length,
            completedNodes: path.nodes.filter(n => n.status === 'COMPLETED').length,
        }));
    }
}
