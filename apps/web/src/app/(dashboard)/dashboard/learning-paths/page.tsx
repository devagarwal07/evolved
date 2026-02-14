"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Search, Sparkles, CheckCircle, GraduationCap, Lock, Lightbulb, BarChart, Video, ListOrdered, ClipboardCheck, ArrowRight, Circle } from "lucide-react";

export default function LearningPathsPage() {
    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center space-y-6 pt-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium uppercase tracking-widest">
                    AI Powered Roadmaps
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                    Turn Any Topic Into a Clear <span className="text-gradient-primary">Learning Roadmap</span>
                </h1>

                <div className="max-w-2xl mx-auto glass-card-elevated p-2 rounded-full flex items-center mt-8">
                    <div className="flex-1 flex items-center px-6 gap-3">
                        <Search className="text-slate-500 w-5 h-5" />
                        <span className="text-lg text-slate-500 font-light">
                            Machine Learnin<span className="border-r-2 border-primary animate-pulse h-5 inline-block align-middle ml-0.5"></span>
                        </span>
                    </div>
                    <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 font-bold text-lg shadow-lg shadow-primary/20">
                        Generate Path <Sparkles className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>

            {/* Path Visualization Area */}
            <div className="grid lg:grid-cols-12 gap-8 items-start pt-12">
                {/* Control Panel */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-card p-6 space-y-8">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Select Level</label>
                            <div className="grid grid-cols-3 gap-2 p-1 bg-white/[0.03] rounded-full border border-white/[0.06]">
                                <button className="py-2 px-3 rounded-full text-xs font-bold bg-primary text-white shadow-lg shadow-primary/20">Beginner</button>
                                <button className="py-2 px-3 rounded-full text-xs font-bold hover:bg-white/[0.05] text-slate-500 transition-colors">Pro</button>
                                <button className="py-2 px-3 rounded-full text-xs font-bold hover:bg-white/[0.05] text-slate-500 transition-colors">Expert</button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Ultimate Goal</label>
                            <div className="space-y-3">
                                <button className="w-full text-left p-4 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-between transition-all">
                                    <span className="font-medium text-white text-sm">Mastering Skills</span>
                                    <CheckCircle className="text-primary w-5 h-5" />
                                </button>
                                <button className="w-full text-left p-4 rounded-xl border border-white/[0.06] hover:border-white/20 bg-white/[0.03] flex items-center justify-between transition-all">
                                    <span className="font-medium text-slate-500 text-sm">Exam Preparation</span>
                                    <Circle className="text-slate-600 w-5 h-5" />
                                </button>
                                <button className="w-full text-left p-4 rounded-xl border border-white/[0.06] hover:border-white/20 bg-white/[0.03] flex items-center justify-between transition-all">
                                    <span className="font-medium text-slate-500 text-sm">Job Interview</span>
                                    <Circle className="text-slate-600 w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-white">Generating Path...</span>
                                <span className="text-xs text-primary font-bold">85%</span>
                            </div>
                            <div className="[&_[data-slot=progress-indicator]]:bg-primary">
                                <Progress value={85} className="h-1.5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Roadmap */}
                <div className="lg:col-span-8 glass-card p-10 min-h-[600px] border relative overflow-hidden flex flex-col">
                    <div className="absolute top-8 left-10 z-10">
                        <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
                            <span className="text-secondary">●</span> Machine Learning Path
                        </h3>
                        <p className="text-slate-500 text-xs mt-1">Created in 2.4 seconds via EvolveEd AI</p>
                    </div>

                    <div className="flex-1 relative flex items-center justify-center mt-12">
                        {/* SVG Lines Layer */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 600 400">
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
                                    <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M100 200 C 200 200, 300 100, 400 100" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                            <path d="M100 200 C 200 200, 300 300, 400 300" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                            <path d="M400 100 L 500 100" stroke="var(--color-secondary)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                            <circle cx="100" cy="200" r="4" fill="var(--color-primary)" />
                            <circle cx="400" cy="100" r="4" fill="var(--color-secondary)" />
                            <circle cx="400" cy="300" r="4" fill="var(--color-secondary)" />
                        </svg>

                        {/* Node 1: Foundations (Completed) */}
                        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 transform -translate-x-1/2">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                <CheckCircle className="text-emerald-500 w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-sm text-white">Foundations</p>
                                <p className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest">Completed</p>
                            </div>
                        </div>

                        {/* Node 2: Core ML (Current) */}
                        <div className="absolute left-[50%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 transform -translate-x-1/2">
                            <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)] relative">
                                <GraduationCap className="text-white w-10 h-10" />
                                <div className="absolute -top-3 -right-3 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full animate-bounce shadow-lg">LIVE</div>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg text-white">Core ML</p>
                                <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Current Phase</p>
                            </div>
                        </div>

                        {/* Node 3: Future Branches */}
                        <div className="absolute right-[10%] top-[20%] flex flex-col items-center gap-2 opacity-50">
                            <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/20 flex items-center justify-center">
                                <Lock className="text-slate-500 w-5 h-5" />
                            </div>
                            <p className="font-medium text-xs text-slate-500">Deep Learning</p>
                        </div>
                        <div className="absolute right-[10%] bottom-[20%] flex flex-col items-center gap-2 opacity-50">
                            <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/20 flex items-center justify-center">
                                <Lock className="text-slate-500 w-5 h-5" />
                            </div>
                            <p className="font-medium text-xs text-slate-500">Projects</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Feature Cards Loop */}
            <div className="grid md:grid-cols-3 gap-6 pt-12">
                <div className="glass-card p-8 border-t-2 border-t-primary/50 hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                        <ListOrdered className="text-primary w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Adaptive Ordering</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">AI ensures you learn prerequisite skills in the optimal logical sequence.</p>
                </div>
                <div className="glass-card p-8 border-t-2 border-t-secondary/50 hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center mb-6">
                        <Video className="text-secondary w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Curated Resources</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">We pull the highest-rated videos and articles for every single node.</p>
                </div>
                <div className="glass-card p-8 border-t-2 border-t-emerald-500/50 hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mb-6">
                        <ClipboardCheck className="text-emerald-500 w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Built-in Checkpoints</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Confirm your mastery with instant AI-generated quizzes.</p>
                </div>
            </div>
        </div>
    );
}
