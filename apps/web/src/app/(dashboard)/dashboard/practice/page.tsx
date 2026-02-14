"use client";

import { Button } from "@/components/ui/button";
import { Brain, Layers, FileQuestion, Timer, ArrowRight, Lightbulb, LineChart } from "lucide-react";

export default function PracticePage() {
    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center space-y-4 py-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest">
                    <Brain className="w-4 h-4" />
                    NEURAL-SYNC TECHNOLOGY
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                    Retention, Not <br />
                    <span className="text-gradient-primary">Repetition.</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    The Smart Practice Engine uses Spaced Repetition (SRS) and AI-driven memory optimization to ensure you never forget what you learn.
                </p>
            </div>

            {/* Interactive Modes Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Flashcards */}
                <div className="glass-card p-8 border-primary/20 relative overflow-hidden group cursor-pointer hover:border-primary/40 transition-all">
                    <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                        <Layers className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Flashcards</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">Active recall powered by Anki-optimized algorithms.</p>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        ACTIVE <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Smart Quizzes */}
                <div className="glass-card p-8 relative overflow-hidden group cursor-pointer hover:border-emerald-500/20 transition-all">
                    <div className="w-12 h-12 bg-emerald-500/15 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                        <FileQuestion className="text-emerald-500 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Smart Quizzes</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Adaptive assessments that find and fix your weak spots.</p>
                </div>

                {/* Exam Simulator */}
                <div className="glass-card p-8 relative overflow-hidden group cursor-pointer hover:border-red-500/20 transition-all">
                    <div className="w-12 h-12 bg-red-500/15 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                        <Timer className="text-red-500 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Exam Simulator</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">High-stakes mock exams with real negative marking rules.</p>
                </div>
            </div>

            {/* Daily Review / Flashcard Workspace Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card p-8">
                <div className="lg:col-span-8">
                    <div className="bg-black/40 aspect-video md:aspect-[2/1] rounded-xl border border-primary/20 flex flex-col items-center justify-center text-center relative p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute top-6 left-6 text-xs font-mono opacity-40 text-white">CARD 42/150 • MACHINE LEARNING</div>
                        <Lightbulb className="text-primary/40 w-16 h-16 mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What is backpropagation?</h2>
                        <div className="w-24 h-1 bg-primary/20 rounded-full mb-8"></div>
                        <p className="text-slate-500 italic text-sm">Click to flip and reveal answer</p>
                    </div>
                </div>
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-card p-6">
                        <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">Due Today</h4>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold text-white">142</span>
                            <span className="text-emerald-500 text-sm font-medium mb-1">+12 new</span>
                        </div>
                        <div className="xp-bar">
                            <div className="xp-bar-fill" style={{ width: "66%" }} />
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                            <LineChart className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Adaptive Logic</span>
                        </div>
                        <p className="text-sm text-slate-400">
                            &quot;You&apos;re struggling with <strong className="text-white">Gradient Descent</strong>. We&apos;ve queued 3 visual breakdown cards for your next session.&quot;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
