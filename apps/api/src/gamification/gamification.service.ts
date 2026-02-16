import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// ─── Badge Catalog ───────────────────────────────────────
export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string; // emoji
    category: 'learning' | 'practice' | 'social' | 'streak' | 'milestone';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    condition: string;
}

export const BADGE_CATALOG: Badge[] = [
    // ── Learning ──
    { id: 'first_path', name: 'Trailblazer', description: 'Create your first learning path', icon: '🗺️', category: 'learning', rarity: 'common', condition: 'pathsCreated >= 1' },
    { id: 'path_explorer', name: 'Path Explorer', description: 'Create 5 learning paths', icon: '🧭', category: 'learning', rarity: 'rare', condition: 'pathsCreated >= 5' },
    { id: 'first_node', name: 'First Step', description: 'Complete your first lesson', icon: '👣', category: 'learning', rarity: 'common', condition: 'nodesCompleted >= 1' },
    { id: 'node_crusher', name: 'Node Crusher', description: 'Complete 25 lessons', icon: '💪', category: 'learning', rarity: 'rare', condition: 'nodesCompleted >= 25' },
    { id: 'knowledge_seeker', name: 'Knowledge Seeker', description: 'Complete 100 lessons', icon: '🧠', category: 'learning', rarity: 'epic', condition: 'nodesCompleted >= 100' },
    { id: 'path_master', name: 'Path Master', description: 'Finish an entire learning path', icon: '🏆', category: 'learning', rarity: 'epic', condition: 'pathsCompleted >= 1' },
    { id: 'video_watcher', name: 'Video Scholar', description: 'Watch 10 tutorial videos', icon: '📺', category: 'learning', rarity: 'common', condition: 'videosWatched >= 10' },
    { id: 'binge_learner', name: 'Binge Learner', description: 'Watch 50 tutorial videos', icon: '🎬', category: 'learning', rarity: 'rare', condition: 'videosWatched >= 50' },

    // ── Practice ──
    { id: 'first_flashcard', name: 'Card Collector', description: 'Study your first flashcard deck', icon: '🃏', category: 'practice', rarity: 'common', condition: 'decksStudied >= 1' },
    { id: 'flashcard_pro', name: 'Flashcard Pro', description: 'Study 10 flashcard decks', icon: '⚡', category: 'practice', rarity: 'rare', condition: 'decksStudied >= 10' },
    { id: 'quiz_taker', name: 'Quiz Taker', description: 'Complete your first quiz', icon: '📝', category: 'practice', rarity: 'common', condition: 'quizzesTaken >= 1' },
    { id: 'quiz_master', name: 'Quiz Master', description: 'Complete 20 quizzes', icon: '🎯', category: 'practice', rarity: 'epic', condition: 'quizzesTaken >= 20' },
    { id: 'perfect_score', name: 'Perfect Score', description: 'Score 100% on a quiz', icon: '💯', category: 'practice', rarity: 'rare', condition: 'perfectQuizzes >= 1' },

    // ── Notes ──
    { id: 'first_note', name: 'Note Taker', description: 'Generate your first smart note', icon: '📋', category: 'practice', rarity: 'common', condition: 'notesCreated >= 1' },
    { id: 'note_master', name: 'Note Master', description: 'Generate 25 smart notes', icon: '📚', category: 'practice', rarity: 'rare', condition: 'notesCreated >= 25' },

    // ── Social ──
    { id: 'social_butterfly', name: 'Social Butterfly', description: 'Join your first study room', icon: '🦋', category: 'social', rarity: 'common', condition: 'roomsJoined >= 1' },
    { id: 'room_host', name: 'Room Host', description: 'Create a study room', icon: '🏠', category: 'social', rarity: 'common', condition: 'roomsCreated >= 1' },
    { id: 'community_leader', name: 'Community Leader', description: 'Create 5 study rooms', icon: '👑', category: 'social', rarity: 'rare', condition: 'roomsCreated >= 5' },

    // ── Streaks ──
    { id: 'streak_3', name: 'On Fire', description: '3-day learning streak', icon: '🔥', category: 'streak', rarity: 'common', condition: 'streak >= 3' },
    { id: 'streak_7', name: 'Week Warrior', description: '7-day learning streak', icon: '⚔️', category: 'streak', rarity: 'rare', condition: 'streak >= 7' },
    { id: 'streak_30', name: 'Unstoppable', description: '30-day learning streak', icon: '🌟', category: 'streak', rarity: 'epic', condition: 'streak >= 30' },
    { id: 'streak_100', name: 'Legend', description: '100-day learning streak', icon: '👑', category: 'streak', rarity: 'legendary', condition: 'streak >= 100' },

    // ── XP Milestones ──
    { id: 'xp_100', name: 'Getting Started', description: 'Earn 100 XP', icon: '⭐', category: 'milestone', rarity: 'common', condition: 'xp >= 100' },
    { id: 'xp_500', name: 'Rising Star', description: 'Earn 500 XP', icon: '🌟', category: 'milestone', rarity: 'rare', condition: 'xp >= 500' },
    { id: 'xp_1000', name: 'Overachiever', description: 'Earn 1,000 XP', icon: '💫', category: 'milestone', rarity: 'epic', condition: 'xp >= 1000' },
    { id: 'xp_5000', name: 'Grandmaster', description: 'Earn 5,000 XP', icon: '🏅', category: 'milestone', rarity: 'legendary', condition: 'xp >= 5000' },

    // ── Goals ──
    { id: 'first_goal', name: 'Goal Setter', description: 'Set your first learning goal', icon: '🎯', category: 'milestone', rarity: 'common', condition: 'goalsCreated >= 1' },
    { id: 'goal_achiever', name: 'Goal Achiever', description: 'Complete a learning goal', icon: '✅', category: 'milestone', rarity: 'rare', condition: 'goalsCompleted >= 1' },

    // ── AI Tutor ──
    { id: 'first_chat', name: 'Curious Mind', description: 'Start your first AI tutor session', icon: '💬', category: 'learning', rarity: 'common', condition: 'tutorSessions >= 1' },
    { id: 'deep_thinker', name: 'Deep Thinker', description: 'Send 100 messages to the AI tutor', icon: '🤔', category: 'learning', rarity: 'rare', condition: 'tutorMessages >= 100' },
];

// ─── XP Config ───────────────────────────────────────────
export const XP_REWARDS = {
    VIDEO_WATCHED: 10,
    NODE_COMPLETED: 25,
    PATH_COMPLETED: 100,
    FLASHCARD_REVIEW: 3,
    QUIZ_COMPLETED: 20,
    QUIZ_PERFECT: 50,
    NOTE_GENERATED: 15,
    TUTOR_MESSAGE: 3,
    GOAL_COMPLETED: 40,
    ROOM_CREATED: 10,
    DAILY_LOGIN: 5,
};

// ─── Level Thresholds ────────────────────────────────────
export const LEVEL_THRESHOLDS = [
    0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500,
    5000, 7000, 10000, 14000, 20000, 28000, 40000, 55000, 75000, 100000,
];

export const LEVEL_NAMES = [
    'Novice', 'Learner', 'Student', 'Scholar', 'Apprentice',
    'Adept', 'Expert', 'Master', 'Sage', 'Grandmaster',
    'Virtuoso', 'Prodigy', 'Genius', 'Luminary', 'Titan',
    'Legend', 'Mythic', 'Transcendent', 'Immortal', 'Ascended',
];

@Injectable()
export class GamificationService {
    private readonly logger = new Logger(GamificationService.name);

    constructor(private prisma: PrismaService) { }

    // ─── Core XP & Streak ────────────────────────────────

    async awardXP(userId: string, amount: number, reason: string): Promise<{ xp: number; level: number; leveledUp: boolean; newBadges: Badge[] }> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) return { xp: 0, level: 1, leveledUp: false, newBadges: [] };

        const newXp = user.xp + amount;
        const oldLevel = user.level;
        const newLevel = this.calculateLevel(newXp);
        const leveledUp = newLevel > oldLevel;

        // Update streak
        const now = new Date();
        let newStreak = user.streak;
        if (user.lastActiveAt) {
            const lastDate = new Date(user.lastActiveAt);
            const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                newStreak += 1; // continuous day
            } else if (diffDays > 1) {
                newStreak = 1; // streak broken, start fresh
            }
            // diffDays === 0 means same day, keep streak
        } else {
            newStreak = 1; // first activity
        }

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                xp: newXp,
                level: newLevel,
                streak: newStreak,
                lastActiveAt: now,
            },
        });

        this.logger.log(`+${amount} XP for ${reason} (user: ${userId}, total: ${newXp}, level: ${newLevel})`);

        // Check for new badges
        const newBadges = await this.checkAndAwardBadges(userId);

        return { xp: newXp, level: newLevel, leveledUp, newBadges };
    }

    calculateLevel(xp: number): number {
        for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
        }
        return 1;
    }

    getLevelInfo(xp: number, level: number) {
        const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
        const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] * 1.5;
        const progressInLevel = xp - currentThreshold;
        const xpNeeded = nextThreshold - currentThreshold;

        return {
            level,
            name: LEVEL_NAMES[level - 1] || 'Ascended',
            xp,
            currentThreshold,
            nextThreshold,
            progressPercent: Math.min((progressInLevel / xpNeeded) * 100, 100),
        };
    }

    // ─── Badge System ────────────────────────────────────

    async checkAndAwardBadges(userId: string): Promise<Badge[]> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                learningPaths: { include: { nodes: true } },
                tutorSessions: { include: { messages: true } },
                notes: true,
                flashcardDecks: true,
                quizAttempts: true,
                roomMemberships: true,
                goals: true,
            },
        });

        if (!user) return [];

        const existingBadges: string[] = Array.isArray(user.badges) ? (user.badges as string[]) : [];

        // Compute stats
        const stats = {
            xp: user.xp,
            streak: user.streak,
            pathsCreated: user.learningPaths.length,
            pathsCompleted: user.learningPaths.filter(p => p.progress >= 100).length,
            nodesCompleted: user.learningPaths.flatMap(p => p.nodes).filter(n => n.status === 'COMPLETED').length,
            videosWatched: user.learningPaths.flatMap(p => p.nodes)
                .reduce((sum, n) => sum + ((n.resources as any)?.watchedVideos?.length || 0), 0),
            decksStudied: user.flashcardDecks.length,
            quizzesTaken: user.quizAttempts.length,
            perfectQuizzes: user.quizAttempts.filter(q => q.score >= 100).length,
            notesCreated: user.notes.length,
            roomsJoined: user.roomMemberships.length,
            roomsCreated: user.roomMemberships.filter(m => m.role === 'host').length,
            tutorSessions: user.tutorSessions.length,
            tutorMessages: user.tutorSessions.reduce((sum, s) => sum + s.messages.filter(m => m.role === 'user').length, 0),
            goalsCreated: user.goals.length,
            goalsCompleted: user.goals.filter(g => g.status === 'completed').length,
        };

        // Check each badge
        const newBadges: Badge[] = [];
        for (const badge of BADGE_CATALOG) {
            if (existingBadges.includes(badge.id)) continue;

            if (this.evaluateCondition(badge.condition, stats)) {
                newBadges.push(badge);
            }
        }

        if (newBadges.length > 0) {
            const updatedBadges = [...existingBadges, ...newBadges.map(b => b.id)];
            await this.prisma.user.update({
                where: { id: userId },
                data: { badges: updatedBadges },
            });
            this.logger.log(`Awarded ${newBadges.length} badges to user ${userId}: ${newBadges.map(b => b.name).join(', ')}`);
        }

        return newBadges;
    }

    private evaluateCondition(condition: string, stats: Record<string, number>): boolean {
        // Parse "field >= value" format
        const match = condition.match(/(\w+)\s*>=\s*(\d+)/);
        if (!match) return false;
        const [, field, valueStr] = match;
        return (stats[field] || 0) >= parseInt(valueStr, 10);
    }

    // ─── Profile / API ───────────────────────────────────

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { xp: true, level: true, streak: true, badges: true, lastActiveAt: true },
        });

        if (!user) return null;

        const earnedBadgeIds: string[] = Array.isArray(user.badges) ? (user.badges as string[]) : [];
        const earnedBadges = BADGE_CATALOG.filter(b => earnedBadgeIds.includes(b.id));
        const lockedBadges = BADGE_CATALOG.filter(b => !earnedBadgeIds.includes(b.id));

        return {
            ...this.getLevelInfo(user.xp, user.level),
            streak: user.streak,
            lastActiveAt: user.lastActiveAt,
            totalBadges: BADGE_CATALOG.length,
            earnedCount: earnedBadges.length,
            badges: {
                earned: earnedBadges,
                locked: lockedBadges,
            },
            xpRewards: XP_REWARDS,
        };
    }

    async getLeaderboard(limit = 20) {
        const users = await this.prisma.user.findMany({
            orderBy: { xp: 'desc' },
            take: limit,
            select: {
                id: true,
                name: true,
                avatar: true,
                xp: true,
                level: true,
                streak: true,
                badges: true,
            },
        });

        return users.map((u, i) => ({
            rank: i + 1,
            id: u.id,
            name: u.name || 'Anonymous',
            avatar: u.avatar,
            xp: u.xp,
            level: u.level,
            levelName: LEVEL_NAMES[u.level - 1] || 'Ascended',
            streak: u.streak,
            badgeCount: Array.isArray(u.badges) ? (u.badges as string[]).length : 0,
        }));
    }
}
