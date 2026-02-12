
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
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Goals</h1>
                    <p className="text-muted-foreground">Track your progress and set new learning milestones.</p>
                </div>
                <Button className="bg-[#8a2ce2] hover:bg-[#8a2ce2]/90 text-white shadow-[0_0_15px_rgba(138,44,226,0.5)] transition-all hover:scale-105">
                    <Plus className="w-4 h-4 mr-2" />
                    New Goal
                </Button>
            </motion.div>

            {/* Active Goal Hero */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8a2ce2]/10 via-transparent to-blue-500/10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8a2ce2]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8a2ce2]/20 text-[#8a2ce2] text-xs font-bold uppercase tracking-wider mb-4 border border-[#8a2ce2]/20">
                            <Target className="w-3 h-3" />
                            Current Focus
                        </div>
                        <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                            Master Machine Learning <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8a2ce2] to-blue-400">by December 2026</span>
                        </h2>
                        <p className="text-slate-400 mb-8 text-lg">
                            You're ahead of schedule! Complete the "Neural Networks" module to maintain your 12-day streak.
                        </p>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-white">Progress</span>
                                <span className="text-[#8a2ce2]">68%</span>
                            </div>
                            <Progress value={68} className="h-3 bg-white/5 [&>div]:bg-gradient-to-r [&>div]:from-[#8a2ce2] [&>div]:to-blue-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
                            <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
                            <div className="text-2xl font-bold text-white mb-1">12</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Day Streak</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
                            <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
                            <div className="text-2xl font-bold text-white mb-1">Top 5%</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Among Peers</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors col-span-2">
                            <div className="flex justify-between items-center mb-4">
                                <Calendar className="w-8 h-8 text-blue-500" />
                                <span className="text-xs font-bold text-slate-500 bg-white/5 px-2 py-1 rounded">NEXT MILESTONE</span>
                            </div>
                            <div className="text-lg font-bold text-white">Complete Capstone Project</div>
                            <div className="text-sm text-slate-400 mt-1">Due in 5 days</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Other Goals Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * i + 0.2 }}
                        className="group relative bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-[#8a2ce2]/50 transition-all hover:bg-white/5 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8a2ce2]/0 to-[#8a2ce2]/0 group-hover:from-[#8a2ce2]/5 group-hover:to-transparent transition-all duration-500" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-[#8a2ce2]/20">
                                    <Target className="w-6 h-6 text-slate-400 group-hover:text-[#8a2ce2] transition-colors" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded border ${i === 1 ? 'border-green-500/20 text-green-500 bg-green-500/10' : 'border-slate-700 text-slate-500 bg-slate-800/50'}`}>
                                    {i === 1 ? 'ON TRACK' : 'PAUSED'}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#8a2ce2] transition-colors">
                                {i === 1 ? 'Learn Spanish' : i === 2 ? 'System Design' : 'React Performance'}
                            </h3>
                            <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                                Achieve fluency focusing on conversational skills and daily vocabulary practice.
                            </p>

                            <div className="space-y-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Progress</span>
                                    <span className="text-white font-medium">{30 * i}%</span>
                                </div>
                                <Progress value={30 * i} className="h-1.5 bg-white/5 [&>div]:bg-slate-600 group-hover:[&>div]:bg-[#8a2ce2]" />
                            </div>

                            <div className="mt-6 flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-colors cursor-pointer">
                                View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
