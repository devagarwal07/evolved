
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
                // Add more fields if needed
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

        return {
            user,
            stats: {
                coursesCompleted: 0, // Mock for now
                hoursLearned: 12.5,  // Mock for now
            },
            recentActivity,
            recommended: [
                { title: "Advanced React Patterns", type: "course", progress: 0 },
                { title: "System Design Interview", type: "practice", progress: 0 }
            ]
        };
    }

    async getCourses(userId: string) {
        // In real app, fetch from LearningPath table
        // For MVP, return mock list if empty
        const paths = await this.prisma.learningPath.findMany({
            where: { userId }
        });

        if (paths.length === 0) {
            return [
                { id: '1', title: 'Fullstack Development', progress: 35, totalNodes: 20, completedNodes: 7 },
                { id: '2', title: 'AI Engineering', progress: 10, totalNodes: 15, completedNodes: 1.5 }
            ];
        }

        return paths;
    }
}
