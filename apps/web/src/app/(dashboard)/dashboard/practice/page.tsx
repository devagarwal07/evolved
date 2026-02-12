"use client";

import { Button } from "@/components/ui/button";
import { Brain, Layers, FileQuestion, Timer, ArrowRight, Lightbulb, LineChart, Zap } from "lucide-react";

export default function PracticePage() {
    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center space-y-4 py-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                    <Brain className="w-4 h-4" />
                    NEURAL-SYNC TECHNOLOGY
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                    Retention, Not <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c025f4]">Repetition.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    The Smart Practice Engine uses Spaced Repetition (SRS) and AI-driven memory optimization to ensure you never forget what you learn.
                </p>
            </div>

            {/* Interactive Modes Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Flashcards */}
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-primary/30 relative overflow-hidden group cursor-pointer hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                        <Layers className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Flashcards</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">Active recall powered by Anki-optimized algorithms.</p>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        ACTIVE <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Smart Quizzes */}
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                        <FileQuestion className="text-emerald-500 w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Smart Quizzes</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Adaptive assessments that find and fix your weak spots.</p>
                </div>

                {/* Exam Simulator */}
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-rose-500/20 rounded-lg flex items-center justify-center mb-6">
                        <Timer className="text-rose-500 w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Exam Simulator</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">High-stakes mock exams with real negative marking rules.</p>
                </div>
            </div>

            {/* Daily Review / Flashcard Workspace Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 rounded-2xl p-8 border border-white/5">
                <div className="lg:col-span-8">
                    <div className="bg-[#1A1A24] aspect-video md:aspect-[2/1] rounded-xl border border-primary/20 flex flex-col items-center justify-center text-center relative p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute top-6 left-6 text-xs font-mono opacity-40 text-white">CARD 42/150 • MACHINE LEARNING</div>
                        <Lightbulb className="text-primary/40 w-16 h-16 mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What is backpropagation?</h2>
                        <div className="w-24 h-1 bg-primary/20 rounded-full mb-8"></div>
                        <p className="text-muted-foreground italic text-sm">Click to flip and reveal answer</p>
                    </div>
                </div>
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Due Today</h4>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-5xl font-bold text-white">142</span>
                            <span className="text-emerald-500 text-sm font-medium mb-2">+12 new</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-primary"></div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                            <LineChart className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Adaptive Logic</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            "You're struggling with <strong>Gradient Descent</strong>. We've queued 3 visual breakdown cards for your next session."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
