
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TutorSession, TutorMessage, Prisma } from '@prisma/client';
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class TutorService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(private prisma: PrismaService) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
        } else {
            console.warn("GEMINI_API_KEY not found in environment variables. AI Tutor will use mock responses.");
        }
    }

    async createSession(userId: string, topic: string) {
        return this.prisma.tutorSession.create({
            data: {
                userId,
                topic,
                messages: {
                    create: {
                        role: 'assistant',
                        content: `Hello! I'm your AI Tutor for ${topic}. I can help you understand concepts, practice problems, or prepare for exams. How would you like to start?`,
                    }
                }
            },
            include: {
                messages: true,
            },
        });
    }

    async getSessions(userId: string) {
        return this.prisma.tutorSession.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            include: {
                messages: {
                    take: 1,
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
    }

    async getSession(id: string, userId: string) {
        return this.prisma.tutorSession.findFirst({
            where: { id, userId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' }
                }
            }
        });
    }

    async sendMessage(sessionId: string, userId: string, content: string) {
        // 1. Verify ownership
        const session = await this.prisma.tutorSession.findFirst({
            where: { id: sessionId, userId }
        });

        if (!session) throw new Error('Session not found');

        // 2. Save User Message
        const userMessage = await this.prisma.tutorMessage.create({
            data: {
                sessionId,
                role: 'user',
                content,
            }
        });

        // 3. Generate AI Response
        let aiResponseContent = "";

        if (this.model) {
            try {
                // Fetch previous messages for context
                const history = await this.prisma.tutorMessage.findMany({
                    where: {
                        sessionId,
                        id: { not: userMessage.id }
                    },
                    orderBy: { createdAt: 'asc' },
                    take: 50
                });

                // Sanitize history: Merge consecutive messages from same role
                const sanitizedHistory = [];
                let lastRole = null;

                for (const msg of history) {
                    const role = msg.role === 'assistant' ? 'model' : 'user';

                    if (role === lastRole && sanitizedHistory.length > 0) {
                        // Merge with previous
                        sanitizedHistory[sanitizedHistory.length - 1].parts[0].text += "\n" + msg.content;
                    } else {
                        // Add new
                        sanitizedHistory.push({
                            role: role,
                            parts: [{ text: msg.content }]
                        });
                        lastRole = role;
                    }
                }

                // Gemini requirement: History must start with 'user'
                if (sanitizedHistory.length > 0 && sanitizedHistory[0].role === 'model') {
                    sanitizedHistory.unshift({
                        role: 'user',
                        parts: [{ text: `I want to start a session about ${session.topic}.` }]
                    });
                }

                try {
                    const fs = require('fs');
                    fs.writeFileSync('d:\\evolveed\\evolve-v1\\apps\\api\\history_dump.json', JSON.stringify(sanitizedHistory, null, 2));
                } catch (e) { console.error("Failed to write log", e); }

                const chat = this.model.startChat({
                    history: sanitizedHistory,
                    generationConfig: {
                        maxOutputTokens: 1000,
                    },
                });

                const result = await chat.sendMessage(content);
                const response = await result.response;
                aiResponseContent = response.text();

            } catch (error) {
                console.error("Gemini API Error:", error);
                // Log to file for debugging
                const fs = require('fs');
                const logData = `[${new Date().toISOString()}] Error: ${error}\nHistory: ${JSON.stringify(history, null, 2)}\n\n`;
                fs.appendFileSync('d:\\evolveed\\evolve-v1\\api-error.log', logData);

                aiResponseContent = "I'm having trouble connecting to my knowledge base right now. Please try again in a moment. (Error logged)";
            }
        } else {
            aiResponseContent = `[MOCK] That's an interesting point about "${content}". I'm running in mock mode. Please configure GEMINI_API_KEY.`;
        }

        // 4. Save AI Response
        const aiMessage = await this.prisma.tutorMessage.create({
            data: {
                sessionId,
                role: 'assistant',
                content: aiResponseContent,
            }
        });

        // Update session timestamp
        await this.prisma.tutorSession.update({
            where: { id: sessionId },
            data: { updatedAt: new Date() }
        });

        return aiMessage;
    }
}
