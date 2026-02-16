"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Lock, Flame, Zap, Crown, Target, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";

const RARITY_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    common: { bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-300", glow: "" },
    rare: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-300", glow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
    epic: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-300", glow: "shadow-[0_0_20px_rgba(168,85,247,0.25)]" },
    legendary: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-300", glow: "shadow-[0_0_25px_rgba(234,179,8,0.3)]" },
};

const CATEGORY_ICONS: Record<string, string> = {
    learning: "📚",
    practice: "🎯",
    social: "👥",
    streak: "🔥",
    milestone: "⭐",
};

const LEVEL_NAMES = [
    'Novice', 'Learner', 'Student', 'Scholar', 'Apprentice',
    'Adept', 'Expert', 'Master', 'Sage', 'Grandmaster',
    'Virtuoso', 'Prodigy', 'Genius', 'Luminary', 'Titan',
    'Legend', 'Mythic', 'Transcendent', 'Immortal', 'Ascended',
];

export default function AchievementsPage() {
    const [profile, setProfile] = useState<any>(null);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get("/gamification/profile"),
            api.get("/gamification/leaderboard"),
        ]).then(([profileRes, lbRes]) => {
            setProfile(profileRes.data);
            setLeaderboard(lbRes.data);
        }).catch(() => { }).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const categories = ["all", "learning", "practice", "social", "streak", "milestone"];
    const earnedBadges = profile?.badges?.earned || [];
    const lockedBadges = profile?.badges?.locked || [];
    const allBadges = [...earnedBadges.map((b: any) => ({ ...b, earned: true })), ...lockedBadges.map((b: any) => ({ ...b, earned: false }))];
    const filteredBadges = activeCategory === "all" ? allBadges : allBadges.filter((b: any) => b.category === activeCategory);

    const level = profile?.level || 1;
    const xp = profile?.xp || 0;
    const streak = profile?.streak || 0;
    const progressPercent = profile?.progressPercent || 0;
    const nextThreshold = profile?.nextThreshold || 50;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-primary/20 via-[#0a0a12] to-secondary/10 border border-primary/20"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-[80px]" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Level Circle */}
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full border-4 border-primary/40 flex items-center justify-center bg-primary/10 relative">
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="4" />
                                <circle cx="50" cy="50" r="46" fill="none" stroke="url(#xpGradient)" strokeWidth="4"
                                    strokeDasharray={`${progressPercent * 2.89} 289`} strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="xpGradient">
                                        <stop offset="0%" stopColor="#8B5CF6" />
                                        <stop offset="100%" stopColor="#06B6D4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="text-center z-10">
                                <div className="text-3xl font-black text-white">{level}</div>
                                <div className="text-[10px] font-bold text-primary uppercase tracking-wider">Level</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-black text-white mb-1">{LEVEL_NAMES[level - 1] || 'Ascended'}</h1>
                        <p className="text-sm text-slate-400 mb-4">Keep learning to unlock achievements and level up!</p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                <Zap className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-bold text-white">{xp.toLocaleString()}</span>
                                <span className="text-xs text-slate-500">XP</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                <Flame className="w-4 h-4 text-orange-400" />
                                <span className="text-sm font-bold text-orange-300">{streak}</span>
                                <span className="text-xs text-orange-400/70">streak</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                <Trophy className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-bold text-yellow-300">{earnedBadges.length}/{profile?.totalBadges || 0}</span>
                                <span className="text-xs text-yellow-400/70">badges</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                                <Target className="w-4 h-4 text-green-400" />
                                <span className="text-sm font-bold text-green-300">{nextThreshold - xp}</span>
                                <span className="text-xs text-green-400/70">to next lvl</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Badge Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:bg-white/[0.06]"
                            }`}
                    >
                        {cat === "all" ? "🏆 All" : `${CATEGORY_ICONS[cat] || ""} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
                    </button>
                ))}
            </div>

            {/* Badges Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredBadges.map((badge: any) => {
                        const colors = RARITY_COLORS[badge.rarity] || RARITY_COLORS.common;
                        return (
                            <motion.div
                                key={badge.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className={`relative overflow-hidden rounded-xl p-5 border transition-all ${badge.earned
                                        ? `${colors.bg} ${colors.border} ${colors.glow}`
                                        : "bg-white/[0.02] border-white/[0.06] opacity-50"
                                    }`}
                            >
                                {badge.earned && badge.rarity === "legendary" && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent" />
                                )}

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="text-3xl">{badge.icon}</span>
                                        {badge.earned ? (
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${colors.bg} ${colors.text} border ${colors.border}`}>
                                                {badge.rarity}
                                            </span>
                                        ) : (
                                            <Lock className="w-4 h-4 text-slate-600" />
                                        )}
                                    </div>
                                    <h3 className={`text-sm font-bold mb-1 ${badge.earned ? "text-white" : "text-slate-500"}`}>
                                        {badge.name}
                                    </h3>
                                    <p className={`text-xs leading-relaxed ${badge.earned ? "text-slate-400" : "text-slate-600"}`}>
                                        {badge.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
            >
                <div className="p-6 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <h2 className="text-lg font-bold text-white">Leaderboard</h2>
                    </div>
                </div>
                <div className="divide-y divide-white/[0.04]">
                    {leaderboard.slice(0, 10).map((entry: any) => (
                        <div key={entry.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${entry.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                                    entry.rank === 2 ? "bg-slate-400/20 text-slate-300" :
                                        entry.rank === 3 ? "bg-orange-500/20 text-orange-400" :
                                            "bg-white/[0.04] text-slate-500"
                                }`}>
                                {entry.rank}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-white truncate">{entry.name}</div>
                                <div className="text-[11px] text-slate-500">{entry.levelName} · {entry.badgeCount} badges</div>
                            </div>
                            <div className="flex items-center gap-3">
                                {entry.streak > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Flame className="w-3 h-3 text-orange-400" />
                                        <span className="text-[11px] font-bold text-orange-300">{entry.streak}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-secondary" />
                                    <span className="text-sm font-bold text-secondary">{entry.xp.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {leaderboard.length === 0 && (
                        <div className="p-8 text-center text-sm text-slate-500">
                            No users yet. Start learning to top the leaderboard! 🚀
                        </div>
                    )}
                </div>
            </motion.div>

            {/* XP Rewards Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-secondary" />
                    How to Earn XP
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                        { action: "Watch a Video", xp: 10, icon: "📺" },
                        { action: "Complete a Node", xp: 25, icon: "✅" },
                        { action: "Finish a Path", xp: 100, icon: "🗺️" },
                        { action: "Generate Notes", xp: 15, icon: "📝" },
                        { action: "Complete a Quiz", xp: 20, icon: "📋" },
                        { action: "Perfect Quiz Score", xp: 50, icon: "💯" },
                        { action: "Review Flashcard", xp: 3, icon: "🃏" },
                        { action: "AI Tutor Message", xp: 3, icon: "🤖" },
                        { action: "Complete a Goal", xp: 40, icon: "🎯" },
                        { action: "Create Study Room", xp: 10, icon: "🏠" },
                        { action: "Daily Login", xp: 5, icon: "📅" },
                    ].map((item) => (
                        <div key={item.action} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <span className="text-lg">{item.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-slate-300 truncate">{item.action}</div>
                                <div className="text-[11px] font-bold text-secondary">+{item.xp} XP</div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
