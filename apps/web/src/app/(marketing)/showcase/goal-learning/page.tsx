"use client";

import { Button } from "@/components/ui/button";
import { Search, GraduationCap, History, Hammer, Users, Timer, Terminal, Code } from "lucide-react";

export default function GoalLearningPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#8a2ce2]/30 selection:text-white transition-colors duration-300">
            {/* Hero */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#8a2ce2]/10 blur-[120px] rounded-full -z-10"></div>
                <div className="max-w-5xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#8a2ce2]/10 border border-[#8a2ce2]/20 text-[#8a2ce2] text-xs font-bold uppercase tracking-[0.2em] mb-6">Adaptive Intelligence 2.0</span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8a2ce2]">
                        Tell Us WHY You're Learning.<br />We'll Change HOW We Teach.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        One course doesn't fit all. EvolveEd reshapes your entire learning environment, resources, and assessment style based on your ultimate goal.
                    </p>
                </div>
            </section>

            {/* Goal Selection Interface */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto bg-[#121212]/70 backdrop-blur-md p-8 md:p-12 rounded-xl border border-[#8a2ce2]/50 shadow-[0_0_20px_rgba(138,44,226,0.3)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-12">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 rounded-full bg-[#8a2ce2] flex items-center justify-center font-bold text-white">1</div>
                                <h2 className="text-2xl font-bold text-white">What are you learning today?</h2>
                            </div>
                            <div className="relative max-w-2xl">
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-xl focus:outline-none focus:ring-2 focus:ring-[#8a2ce2]/50 transition-all font-sans text-white" placeholder="e.g. Machine Learning" defaultValue="Machine Learning" />
                                <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8a2ce2] w-6 h-6" />
                            </div>
                        </div>

                        <div className="lg:col-span-12">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 rounded-full bg-[#8a2ce2] flex items-center justify-center font-bold text-white">2</div>
                                <h2 className="text-2xl font-bold text-white">Select your primary goal</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {/* Card 1 */}
                                <div className="group p-6 bg-[#121212]/70 backdrop-blur-md rounded-xl border border-white/5 hover:border-[#8a2ce2]/50 hover:bg-[#8a2ce2]/5 transition-all cursor-pointer text-center flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#8a2ce2]/20 transition-all">
                                        <History className="text-[#8a2ce2] w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-white">Exam Prep</h3>
                                    <p className="text-xs text-slate-400 font-light">Optimize for recall and test-taking speed.</p>
                                </div>
                                {/* Card 2 */}
                                <div className="group p-6 bg-[#8a2ce2]/10 backdrop-blur-md rounded-xl border border-[#8a2ce2] shadow-[0_0_20px_rgba(138,44,226,0.3)] text-center flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full bg-[#8a2ce2] flex items-center justify-center mb-4">
                                        <Hammer className="text-white w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-white">Skill Building</h3>
                                    <p className="text-xs text-white/70 font-light">Project-based mastery and implementation.</p>
                                </div>
                                {/* Card 3 */}
                                <div className="group p-6 bg-[#121212]/70 backdrop-blur-md rounded-xl border border-white/5 hover:border-[#8a2ce2]/50 hover:bg-[#8a2ce2]/5 transition-all cursor-pointer text-center flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#8a2ce2]/20 transition-all">
                                        <Users className="text-[#8a2ce2] w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-white">Interview Prep</h3>
                                    <p className="text-xs text-slate-400 font-light">Focus on communication and problem-solving.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Adaptive Behavior Showcase */}
            <section className="py-20 px-6 bg-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">The Adaptation Engine</h2>
                        <p className="text-slate-400">See how our UI and curriculum morph based on your selected mode.</p>
                    </div>
                    <div className="space-y-12">
                        {/* Mode 1 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#121212]/50 p-8 rounded-xl border border-white/5">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Timer className="text-[#8a2ce2] w-6 h-6" />
                                    <h3 className="text-2xl font-bold text-white">Exam Prep Mode</h3>
                                </div>
                                <p className="text-slate-400 mb-6 text-lg">EvolveEd prioritizes high-frequency exam topics, introduces spaced repetition, and activates a countdown-driven practice environment.</p>
                            </div>
                            <div className="bg-[#121212]/70 backdrop-blur-md p-6 rounded-lg relative min-h-[300px] overflow-hidden border border-white/10">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-sm font-bold uppercase tracking-widest text-[#8a2ce2]">Mock Exam Alpha</div>
                                    <div className="px-4 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">00:14:59</div>
                                </div>
                                {/* Mockup Content */}
                                <div className="space-y-4">
                                    <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
                                    <div className="h-4 w-1/2 bg-white/10 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Mode 2 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#121212]/50 p-8 rounded-xl border border-white/5">
                            <div className="order-2 lg:order-1 bg-[#121212]/70 backdrop-blur-md p-6 rounded-lg relative min-h-[300px] overflow-hidden border border-white/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-lg bg-[#8a2ce2]/20 flex items-center justify-center">
                                        <Terminal className="text-[#8a2ce2] w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">Project: Predictor_v1</div>
                                        <div className="text-[10px] text-slate-500">Last commit: 2 mins ago</div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <Code className="text-[#8a2ce2] w-6 h-6" />
                                    <h3 className="text-2xl font-bold text-white">Skill Building Mode</h3>
                                </div>
                                <p className="text-slate-400 mb-6 text-lg">The UI transforms into a GitHub-synced workspace. Lectures are replaced by technical documentation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
