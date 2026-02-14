
"use client";

import { motion } from "framer-motion";
import { Target, Trophy, TrendingUp, Calendar, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function GoalsPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">My Goals</h1>
                    <p className="text-sm text-slate-500">Track your progress and set new learning milestones.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    New Goal
                </Button>
            </motion.div>

            {/* Active Goal Hero */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative overflow-hidden glass-card-elevated p-8"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="absolute top-0 right-0 w-64 h-64 orb orb-primary opacity-15 -translate-y-1/2 translate-x-1/3" />

                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                            <Target className="w-3 h-3" />
                            Current Focus
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4 leading-tight">
                            Master Machine Learning <br />
                            <span className="text-gradient-primary">by December 2026</span>
                        </h2>
                        <p className="text-slate-400 mb-8 text-base">
                            You&apos;re ahead of schedule! Complete the &quot;Neural Networks&quot; module to maintain your 12-day streak.
                        </p>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-white">Progress</span>
                                <span className="text-primary">68%</span>
                            </div>
                            <Progress value={68} className="h-3 bg-white/[0.06] [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-5 hover:border-yellow-500/20 transition-colors">
                            <Trophy className="w-7 h-7 text-yellow-500 mb-3" />
                            <div className="text-2xl font-bold text-white mb-1">12</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Day Streak</div>
                        </div>
                        <div className="glass-card p-5 hover:border-emerald-500/20 transition-colors">
                            <TrendingUp className="w-7 h-7 text-emerald-500 mb-3" />
                            <div className="text-2xl font-bold text-white mb-1">Top 5%</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Among Peers</div>
                        </div>
                        <div className="glass-card p-5 col-span-2 hover:border-secondary/20 transition-colors">
                            <div className="flex justify-between items-center mb-3">
                                <Calendar className="w-7 h-7 text-secondary" />
                                <span className="text-[10px] font-bold text-slate-500 bg-white/[0.06] px-2 py-1 rounded">NEXT MILESTONE</span>
                            </div>
                            <div className="text-base font-bold text-white">Complete Capstone Project</div>
                            <div className="text-xs text-slate-500 mt-1">Due in 5 days</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Other Goals Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { name: "Learn Spanish", status: "ON TRACK", progress: 30 },
                    { name: "System Design", status: "PAUSED", progress: 60 },
                    { name: "React Performance", status: "PAUSED", progress: 90 },
                ].map((goal, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * i + 0.2 }}
                        className="group relative glass-card p-6 hover:border-primary/20 transition-all overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-5">
                                <div className="p-2.5 bg-white/[0.05] rounded-xl group-hover:scale-110 transition-transform duration-300 border border-white/[0.06] group-hover:border-primary/20">
                                    <Target className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${goal.status === "ON TRACK"
                                    ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/10"
                                    : "border-white/[0.08] text-slate-500 bg-white/[0.04]"
                                    }`}>
                                    {goal.status}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                {goal.name}
                            </h3>
                            <p className="text-xs text-slate-500 mb-5 line-clamp-2">
                                Focused practice with daily vocabulary and structured exercises.
                            </p>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-500">Progress</span>
                                    <span className="text-white font-bold">{goal.progress}%</span>
                                </div>
                                <Progress value={goal.progress} className="h-1.5 bg-white/[0.06] [&>div]:bg-slate-600 group-hover:[&>div]:bg-primary" />
                            </div>

                            <div className="mt-5 flex items-center text-xs font-medium text-slate-500 group-hover:text-white transition-colors cursor-pointer">
                                View Details <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
