"use client";

import { BookOpen, Brain, Clock, Flame, Target, Trophy, Sparkles, ArrowRight, Play, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        const fetchStats = async () => {
            try {
                const res = await api.get(`/dashboard/overview/${user.id}`);
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard stats:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [user?.id]);

    // Use stats or defaults
    const xp = stats?.user?.xp || 0;
    const streak = stats?.user?.streak || 0;
    const recentTopic = stats?.recentActivity?.[0]?.topic || "No recent activity";

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* ─── Stats Row ─── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Learning Time */}
                <div className="glass-card p-5 group hover:border-primary/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+2.5h</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats?.stats?.hoursLearned || 0}h</p>
                    <p className="text-xs text-slate-500 mt-0.5">This week</p>
                </div>

                {/* Topics Mastered */}
                <div className="glass-card p-5 group hover:border-secondary/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Brain className="w-5 h-5 text-secondary" />
                        </div>
                        <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">+3 new</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{xp}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Total XP</p>
                </div>

                {/* Current Streak */}
                <div className="glass-card p-5 group hover:border-orange-500/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Flame className="w-5 h-5 text-orange-500" />
                        </div>
                        <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">Best: {streak}</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{streak} days</p>
                    <p className="text-xs text-slate-500 mt-0.5">Current streak</p>
                </div>

                {/* Weekly Goal */}
                <div className="glass-card p-5 group hover:border-emerald-500/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Target className="w-5 h-5 text-emerald-500" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                                <circle cx="24" cy="24" r="20" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${0.72 * 125.6} 125.6`} strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">72%</span>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">5/7</p>
                            <p className="text-xs text-slate-500">Days active</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Main Content Grid ─── */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Continue Learning — takes 2 cols */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">Continue Learning</h3>
                        <Link href={ROUTES.DASHBOARD.LEARNING_PATHS} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                            View all <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Learning Card 1 */}
                    <div className="glass-card p-5 flex gap-5 group hover:border-primary/20 transition-all cursor-pointer">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <BookOpen className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-white text-sm truncate">Machine Learning Fundamentals</h4>
                                <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full shrink-0">IN PROGRESS</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-3">Phase 2: Supervised Learning — Decision Trees & Random Forests</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_8px_rgba(139,92,246,0.4)]" style={{ width: "68%" }} />
                                </div>
                                <span className="text-xs font-bold text-primary">68%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    {/* AI Tutor Quick Access */}
                    <div className="glass-card-elevated p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 orb orb-primary opacity-20" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <h3 className="text-sm font-bold text-white">AI Tutor</h3>
                                <span className="ml-auto text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">ONLINE</span>
                            </div>
                            <div className="space-y-3 mb-4">
                                <div className="bg-white/[0.04] p-3 rounded-xl text-xs text-slate-300 leading-relaxed">
                                    <span className="text-primary font-bold text-[10px] block mb-1">EVOLVE AI</span>
                                    Ready to continue exploring {recentTopic}?
                                </div>
                            </div>
                            <Link href={ROUTES.DASHBOARD.AI_TUTOR} className="block w-full py-2.5 bg-primary/15 hover:bg-primary/25 text-primary text-xs font-bold rounded-xl text-center transition-colors border border-primary/15">
                                Continue Session →
                            </Link>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-sm font-bold text-white">Quick Actions</h3>
                        <div className="space-y-2">
                            <Link href={ROUTES.DASHBOARD.LEARNING_PATHS} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors group">
                                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <BookOpen className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">New Learning Path</p>
                                    <p className="text-[10px] text-slate-500">Generate AI roadmap</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
