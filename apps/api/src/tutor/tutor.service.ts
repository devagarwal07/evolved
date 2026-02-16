import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GamificationService, XP_REWARDS } from '../gamification/gamification.service';

const SYSTEM_PROMPT = `You are **EvolveEd AI Tutor** — a world-class, patient, and adaptive learning mentor built into the EvolveEd platform.

Your behavior:
- **Be a tutor, not a search engine.** Don't just give answers — teach the concept step by step. Ask follow-up questions to check understanding.
- **Use markdown formatting.** Use **bold**, *italics*, \`code blocks\`, numbered lists, bullet points, headers (##), and tables to structure your responses. Use \`\`\` for code examples.
- **Be encouraging but honest.** Celebrate progress ("Great question!"), but don't lie about correctness.
- **Adapt to the topic.** If the topic is programming, include code examples. If it's science, include formulas and diagrams described in text. If it's history, provide timelines.
- **Keep responses focused.** Aim for 200–400 words unless the student asks for a deep dive. Break complex topics into digestible chunks.
- **Ask follow-up questions.** End responses with a question to keep the conversation going and check comprehension, e.g., "Does that make sense? Want me to explain the next step?"
- **Use examples and analogies.** Make abstract concepts concrete with real-world examples.
- **When the student is confused, try a different approach.** Explain using analogies, visual descriptions, or simpler language.

You are NOT a general-purpose chatbot. You only help with learning and education topics. If asked unrelated questions, politely redirect: "I'm your learning tutor! Let's focus on your studies. What topic can I help you with?"`;

@Injectable()
export class TutorService {
    private readonly logger = new Logger(TutorService.name);
    private genAI: GoogleGenerativeAI | null = null;
    private model: any = null;

    constructor(private prisma: PrismaService, private gamification: GamificationService) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({
                model: 'gemini-2.0-flash',
                systemInstruction: SYSTEM_PROMPT,
            });
            this.logger.log('Gemini AI initialized successfully');
        } else {
            this.logger.warn('GEMINI_API_KEY not found. AI Tutor will use mock responses.');
        }
    }

    async createSession(userId: string, topic: string) {
        const session = await this.prisma.tutorSession.create({
            data: {
                userId,
                topic,
                messages: {
                    create: {
                        role: 'assistant',
                        content: `# Welcome to your ${topic} session! 🎓\n\nI'm your **EvolveEd AI Tutor**, and I'm here to help you master **${topic}**.\n\nI can help you with:\n- 📖 **Explaining concepts** step by step\n- 🧪 **Practice problems** and worked examples\n- 🎯 **Exam preparation** and key topics\n- 🤔 **Clearing doubts** on anything you're stuck on\n\n**Where would you like to start?** Tell me what you already know, or ask me anything!`,
                    },
                },
            },
            include: {
                messages: true,
            },
        });
        return session;
    }

    async getSessions(userId: string) {
        return this.prisma.tutorSession.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            include: {
                messages: {
                    take: 1,
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
    }

    async getSession(id: string, userId: string) {
        const session = await this.prisma.tutorSession.findFirst({
            where: { id, userId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });

        if (!session) {
            throw new NotFoundException('Session not found');
        }

        return session;
    }

    async deleteSession(id: string, userId: string) {
        const session = await this.prisma.tutorSession.findFirst({
            where: { id, userId },
        });

        if (!session) {
            throw new NotFoundException('Session not found');
        }

        // Delete messages first (cascade should handle this, but being explicit)
        await this.prisma.tutorMessage.deleteMany({
            where: { sessionId: id },
        });

        await this.prisma.tutorSession.delete({
            where: { id },
        });

        return { message: 'Session deleted successfully' };
    }

    async sendMessage(sessionId: string, userId: string, content: string) {
        // 1. Verify session ownership
        const session = await this.prisma.tutorSession.findFirst({
            where: { id: sessionId, userId },
        });

        if (!session) {
            throw new NotFoundException('Session not found');
        }

        // 2. Save user message
        const userMessage = await this.prisma.tutorMessage.create({
            data: {
                sessionId,
                role: 'user',
                content,
            },
        });

        // Award XP for sending a message
        this.awardMessageXP(userId);

        // 3. Generate AI response
        let aiResponseContent = '';

        if (this.model) {
            // Fetch previous messages for context
            const history = await this.prisma.tutorMessage.findMany({
                where: {
                    sessionId,
                    id: { not: userMessage.id },
                },
                orderBy: { createdAt: 'asc' },
                take: 50,
            });

            try {
                // Sanitize history: merge consecutive messages from same role
                const sanitizedHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [];
                let lastRole: string | null = null;

                for (const msg of history) {
                    const role = msg.role === 'assistant' ? 'model' : 'user';

                    if (role === lastRole && sanitizedHistory.length > 0) {
                        sanitizedHistory[sanitizedHistory.length - 1].parts[0].text += '\n' + msg.content;
                    } else {
                        sanitizedHistory.push({
                            role,
                            parts: [{ text: msg.content }],
                        });
                        lastRole = role;
                    }
                }

                // Gemini requirement: history must start with 'user'
                if (sanitizedHistory.length > 0 && sanitizedHistory[0].role === 'model') {
                    sanitizedHistory.unshift({
                        role: 'user',
                        parts: [{ text: `I want to learn about ${session.topic}.` }],
                    });
                }

                const chat = this.model.startChat({
                    history: sanitizedHistory,
                    generationConfig: {
                        maxOutputTokens: 2048,
                    },
                });

                const result = await chat.sendMessage(content);
                const response = await result.response;
                aiResponseContent = response.text();
            } catch (error) {
                const errMsg = (error as Error).message || String(error);
                this.logger.error(`Gemini API Error: ${errMsg}`, (error as Error).stack);

                if (errMsg.includes('429')) {
                    aiResponseContent =
                        "⚠️ **Rate limit reached.** The AI service quota has been exceeded. Please wait a minute and try again, or update your API key in the `.env` file.";
                } else if (errMsg.includes('404')) {
                    aiResponseContent =
                        "⚠️ **Model not found.** The configured AI model isn't available. Please check the model name in the tutor service.";
                } else {
                    aiResponseContent =
                        `⚠️ **AI service error:** ${errMsg.substring(0, 200)}\n\nPlease try again in a moment.`;
                }
            }
        } else {
            aiResponseContent = `I'm currently in **demo mode** because the AI service isn't configured.\n\nYour question about *"${content}"* is great! Once the AI service is active, I'll be able to give you a detailed, personalized answer.\n\n> **Tip:** Ask your administrator to configure the \`GEMINI_API_KEY\` environment variable.`;
        }

        // 4. Save AI response
        const aiMessage = await this.prisma.tutorMessage.create({
            data: {
                sessionId,
                role: 'assistant',
                content: aiResponseContent,
            },
        });

        // 5. Update session timestamp
        await this.prisma.tutorSession.update({
            where: { id: sessionId },
            data: { updatedAt: new Date() },
        });

        return aiMessage;
    }

    private async awardMessageXP(userId: string) {
        try {
            await this.gamification.awardXP(userId, XP_REWARDS.TUTOR_MESSAGE, 'tutor_message');
        } catch (e) { /* non-critical */ }
    }
}
