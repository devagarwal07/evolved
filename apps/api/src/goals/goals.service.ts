import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GamificationService, XP_REWARDS } from '../gamification/gamification.service';

@Injectable()
export class GoalsService {
    private readonly logger = new Logger(GoalsService.name);

    constructor(private prisma: PrismaService, private gamification: GamificationService) { }

    async createGoal(userId: string, name: string, targetDate?: string) {
        return this.prisma.userGoal.create({
            data: {
                name,
                targetDate: targetDate ? new Date(targetDate) : null,
                userId,
            },
        });
    }

    async getGoals(userId: string) {
        return this.prisma.userGoal.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateGoal(id: string, userId: string, data: { name?: string; progress?: number; status?: string; targetDate?: string }) {
        const goal = await this.prisma.userGoal.findFirst({ where: { id, userId } });
        if (!goal) throw new NotFoundException('Goal not found');

        const updated = await this.prisma.userGoal.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.progress !== undefined && { progress: data.progress }),
                ...(data.status && { status: data.status }),
                ...(data.targetDate && { targetDate: new Date(data.targetDate) }),
            },
        });

        // Award XP if goal just completed
        if (data.status === 'completed' && goal.status !== 'completed') {
            await this.gamification.awardXP(userId, XP_REWARDS.GOAL_COMPLETED, 'goal_completed');
        }

        return updated;
    }

    async deleteGoal(id: string, userId: string) {
        const goal = await this.prisma.userGoal.findFirst({ where: { id, userId } });
        if (!goal) throw new NotFoundException('Goal not found');
        await this.prisma.userGoal.delete({ where: { id } });
        return { message: 'Goal deleted' };
    }

    async getStats(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { xp: true, streak: true, lastActiveAt: true },
        });

        const goals = await this.prisma.userGoal.findMany({ where: { userId } });
        const activeGoals = goals.filter(g => g.status === 'active').length;
        const completedGoals = goals.filter(g => g.status === 'completed').length;

        const paths = await this.prisma.learningPath.count({ where: { userId } });
        const notes = await this.prisma.note.count({ where: { userId } });

        return {
            xp: user?.xp || 0,
            streak: user?.streak || 0,
            activeGoals,
            completedGoals,
            totalPaths: paths,
            totalNotes: notes,
        };
    }
}
