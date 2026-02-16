import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

const NOTES_SYSTEM_PROMPT = `You are the **EvolveEd Smart Notes Engine** — an AI that generates structured, exam-ready study notes from any topic.

Your output MUST be a valid JSON object with this exact structure:
{
  "keyConcepts": [
    { "title": "Concept Name", "explanation": "Clear 2-3 sentence explanation", "importance": "high|medium|low" }
  ],
  "formulas": [
    { "name": "Formula Name", "formula": "The formula in text/LaTeX", "explanation": "When and how to use it" }
  ],
  "definitions": [
    { "term": "Term", "definition": "Clear, concise definition" }
  ],
  "examples": [
    { "title": "Example Title", "description": "Real-world example or worked problem" }
  ],
  "revisionPoints": [
    "Point 1 to remember for exams",
    "Point 2 to remember for exams"
  ],
  "summary": "A 2-3 paragraph comprehensive summary of the topic"
}

Rules:
- Generate 4-8 key concepts, 2-5 formulas (if applicable, empty array if not), 4-8 definitions, 2-4 examples, and 5-10 revision points.
- If the topic is non-mathematical (e.g., history, literature), set "formulas" to an empty array.
- Make content exam-ready: precise, structured, and focused on what's important to remember.
- Use clear, student-friendly language.
- Return ONLY the JSON object, no markdown, no wrapping, no explanation outside the JSON.`;

@Injectable()
export class NotesService {
    private readonly logger = new Logger(NotesService.name);
    private genAI: GoogleGenerativeAI | null = null;
    private model: any = null;

    constructor(private prisma: PrismaService) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({
                model: 'gemini-2.0-flash',
            });
            this.logger.log('Smart Notes AI initialized successfully');
        } else {
            this.logger.warn('GEMINI_API_KEY not found. Smart Notes will use demo content.');
        }
    }

    async generateNote(userId: string, topic: string, sourceUrl?: string, sourceType?: string) {
        let noteContent: any;

        if (this.model) {
            try {
                const prompt = sourceUrl
                    ? `Generate comprehensive, exam-ready study notes for the topic: "${topic}". The source material is from: ${sourceUrl} (${sourceType || 'web'}). Focus on what students need to know for exams.`
                    : `Generate comprehensive, exam-ready study notes for the topic: "${topic}". Focus on what students need to know for exams. Include all key concepts, formulas (if applicable), definitions, examples, and revision points.`;

                const result = await this.model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    systemInstruction: NOTES_SYSTEM_PROMPT,
                    generationConfig: {
                        maxOutputTokens: 4096,
                        temperature: 0.7,
                    },
                });

                const response = await result.response;
                const text = response.text();

                // Parse JSON from response (strip markdown code fences if present)
                const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                noteContent = JSON.parse(jsonStr);

                this.logger.log(`Generated notes for topic: "${topic}"`);
            } catch (error) {
                const errMsg = (error as Error).message || String(error);
                this.logger.error(`Gemini Notes Error: ${errMsg}`);

                // Return a demo structure on error
                noteContent = this.getDemoContent(topic, errMsg);
            }
        } else {
            noteContent = this.getDemoContent(topic);
        }

        // Save to database
        const note = await this.prisma.note.create({
            data: {
                title: topic,
                sourceUrl: sourceUrl || null,
                sourceType: sourceType || null,
                content: noteContent,
                userId,
            },
        });

        return note;
    }

    async getNotes(userId: string) {
        return this.prisma.note.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                sourceUrl: true,
                sourceType: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async getNote(id: string, userId: string) {
        const note = await this.prisma.note.findFirst({
            where: { id, userId },
        });

        if (!note) {
            throw new NotFoundException('Note not found');
        }

        return note;
    }

    async deleteNote(id: string, userId: string) {
        const note = await this.prisma.note.findFirst({
            where: { id, userId },
        });

        if (!note) {
            throw new NotFoundException('Note not found');
        }

        await this.prisma.note.delete({
            where: { id },
        });

        return { message: 'Note deleted successfully' };
    }

    private getDemoContent(topic: string, errorMsg?: string) {
        return {
            keyConcepts: [
                {
                    title: `Introduction to ${topic}`,
                    explanation: `This is a demo note. ${errorMsg ? `AI Error: ${errorMsg.substring(0, 100)}` : 'Configure GEMINI_API_KEY for real AI-generated notes.'}`,
                    importance: 'high',
                },
            ],
            formulas: [],
            definitions: [
                { term: topic, definition: `The study of ${topic} and its related concepts.` },
            ],
            examples: [
                { title: 'Demo Example', description: `A practical application of ${topic} concepts.` },
            ],
            revisionPoints: [
                `Understand the core concepts of ${topic}`,
                'Review all definitions before the exam',
                'Practice with examples and past papers',
            ],
            summary: `These are demo notes for "${topic}". Once the AI service is configured with a valid API key, you'll get comprehensive, exam-ready notes with detailed concepts, formulas, definitions, and revision points.`,
        };
    }
}
