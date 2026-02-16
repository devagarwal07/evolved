import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

const FLASHCARD_PROMPT = `You are the **EvolveEd Flashcard Generator**. Generate study flashcards.

Output MUST be a valid JSON array:
[
  { "front": "Question or prompt", "back": "Answer or explanation" }
]

Rules:
- Generate 10-15 flashcards
- Cover key concepts, definitions, formulas, and applications
- Questions should test understanding, not just memorization
- Return ONLY the JSON array`;

const QUIZ_PROMPT = `You are the **EvolveEd Quiz Generator**. Generate a multiple-choice quiz.

Output MUST be a valid JSON object:
{
  "questions": [
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Why this answer is correct"
    }
  ]
}

Rules:
- Generate 10 questions
- Each has exactly 4 options
- correctIndex is 0-based
- Include clear explanations
- Mix difficulty levels
- Return ONLY the JSON object`;

@Injectable()
export class PracticeService {
    private readonly logger = new Logger(PracticeService.name);
    private genAI: GoogleGenerativeAI | null = null;
    private model: any = null;

    constructor(private prisma: PrismaService) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
            this.logger.log('Practice Engine AI initialized');
        }
    }

    // ─── Flashcards ─────────────────────────────────────────

    async generateFlashcards(userId: string, topic: string) {
        let cards: any[] = [];

        if (this.model) {
            try {
                const result = await this.model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: `Generate flashcards for: "${topic}"` }] }],
                    systemInstruction: FLASHCARD_PROMPT,
                    generationConfig: { maxOutputTokens: 4096, temperature: 0.7 },
                });
                const text = (await result.response).text();
                const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                cards = JSON.parse(jsonStr);
                this.logger.log(`Generated ${cards.length} flashcards for: "${topic}"`);
            } catch (error) {
                this.logger.error(`Flashcard gen error: ${(error as Error).message}`);
                cards = this.getDemoCards(topic);
            }
        } else {
            cards = this.getDemoCards(topic);
        }

        const deck = await this.prisma.flashcardDeck.create({
            data: {
                title: topic,
                userId,
                cards: {
                    create: cards.map((c: any) => ({
                        front: c.front,
                        back: c.back,
                    })),
                },
            },
            include: { cards: true },
        });

        return deck;
    }

    async getDecks(userId: string) {
        return this.prisma.flashcardDeck.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            include: { _count: { select: { cards: true } } },
        });
    }

    async getDeck(id: string, userId: string) {
        const deck = await this.prisma.flashcardDeck.findFirst({
            where: { id, userId },
            include: { cards: { orderBy: { nextReview: 'asc' } } },
        });
        if (!deck) throw new NotFoundException('Deck not found');
        return deck;
    }

    async reviewCard(cardId: string, quality: number) {
        // SM-2 Algorithm
        const card = await this.prisma.flashcard.findUnique({ where: { id: cardId } });
        if (!card) throw new NotFoundException('Card not found');

        let { interval, easeFactor } = card;
        const q = Math.max(0, Math.min(5, quality)); // 0-5 scale

        if (q >= 3) {
            if (interval === 0) interval = 1;
            else if (interval === 1) interval = 6;
            else interval = Math.round(interval * easeFactor);
        } else {
            interval = 0; // Reset on fail
        }

        easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + interval);

        return this.prisma.flashcard.update({
            where: { id: cardId },
            data: { interval, easeFactor, nextReview },
        });
    }

    async deleteDeck(id: string, userId: string) {
        const deck = await this.prisma.flashcardDeck.findFirst({ where: { id, userId } });
        if (!deck) throw new NotFoundException('Deck not found');
        await this.prisma.flashcard.deleteMany({ where: { deckId: id } });
        await this.prisma.flashcardDeck.delete({ where: { id } });
        return { message: 'Deck deleted' };
    }

    // ─── Quizzes ────────────────────────────────────────────

    async generateQuiz(userId: string, topic: string) {
        let quizData: any = { questions: [] };

        if (this.model) {
            try {
                const result = await this.model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: `Generate a quiz for: "${topic}"` }] }],
                    systemInstruction: QUIZ_PROMPT,
                    generationConfig: { maxOutputTokens: 4096, temperature: 0.7 },
                });
                const text = (await result.response).text();
                const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                quizData = JSON.parse(jsonStr);
                this.logger.log(`Generated quiz for: "${topic}"`);
            } catch (error) {
                this.logger.error(`Quiz gen error: ${(error as Error).message}`);
                quizData = this.getDemoQuiz(topic);
            }
        } else {
            quizData = this.getDemoQuiz(topic);
        }

        return { topic, questions: quizData.questions };
    }

    async submitQuiz(userId: string, topic: string, score: number, totalQs: number, weakAreas: any) {
        return this.prisma.quizAttempt.create({
            data: { topic, score, totalQs, weakAreas, userId },
        });
    }

    async getQuizHistory(userId: string) {
        return this.prisma.quizAttempt.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
    }

    private getDemoCards(topic: string) {
        return [
            { front: `What is ${topic}?`, back: `${topic} is a field of study. Configure GEMINI_API_KEY for real cards.` },
            { front: `Key principle of ${topic}?`, back: `The core principle involves understanding fundamentals first.` },
            { front: `Application of ${topic}?`, back: `${topic} is applied in real-world scenarios for problem-solving.` },
        ];
    }

    private getDemoQuiz(topic: string) {
        return {
            questions: [
                {
                    question: `What is the primary focus of ${topic}?`,
                    options: ['Theory only', 'Practice only', 'Both theory and practice', 'Neither'],
                    correctIndex: 2,
                    explanation: 'A comprehensive understanding requires both theory and practice.',
                },
            ],
        };
    }
}
