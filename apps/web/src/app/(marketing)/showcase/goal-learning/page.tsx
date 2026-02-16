"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, GraduationCap, History, Hammer, Users, Timer, Terminal, Code, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/marketing/ScrollReveal";

const goals = [
    { icon: History, title: "Exam Prep", desc: "Optimize for recall and test-taking speed." },
    { icon: Hammer, title: "Skill Building", desc: "Project-based mastery and implementation.", active: true },
    { icon: Users, title: "Interview Prep", desc: "Focus on communication and problem-solving." },
];

export default function GoalLearningPage() {
    return (
        <div className="pt-32 pb-20">
            {/* Background orb */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#7C3AED]/6 blur-[200px] rounded-full" />
            </div>

            {/* Hero */}
            <ScrollReveal className="relative pb-20 px-6 text-center">
                <div className="max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#39FF14] uppercase tracking-widest mb-6">
                        <Sparkles className="w-3 h-3" /> Adaptive Intelligence 2.0
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-white tracking-tight">
                        Tell Us WHY You&apos;re Learning.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#00D4FF]">
                            We&apos;ll Change HOW We Teach.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        One course doesn&apos;t fit all. EvolveEd reshapes your entire learning environment, resources, and assessment style based on your ultimate goal.
                    </p>
                </div>
            </ScrollReveal>

            {/* Goal Selection */}
            <ScrollReveal animation="scale-in" className="py-20 px-6">
                <div className="max-w-6xl mx-auto bg-white/[0.02] backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-[#7C3AED]/30 shadow-[0_0_40px_rgba(124,58,237,0.1)]">
                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] flex items-center justify-center font-black text-white text-sm">1</div>
                                <h2 className="text-2xl font-black text-white">What are you learning today?</h2>
                            </div>
                            <div className="relative max-w-2xl">
                                <input type="text" className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full px-8 py-5 text-xl focus:border-[#7C3AED]/50 focus:ring-0 text-white transition-all placeholder:text-slate-600" placeholder="e.g. Machine Learning" defaultValue="Machine Learning" />
                                <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-[#7C3AED] w-6 h-6" />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] flex items-center justify-center font-black text-white text-sm">2</div>
                                <h2 className="text-2xl font-black text-white">Select your primary goal</h2>
                            </div>
                            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.1}>
                                {goals.map((goal, i) => (
                                    <StaggerItem key={i}>
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            className={`p-6 rounded-2xl text-center flex flex-col items-center cursor-pointer transition-all ${goal.active
                                                    ? "bg-[#7C3AED]/10 border-2 border-[#7C3AED] shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                                                    : "bg-white/[0.02] border border-white/[0.06] hover:border-[#7C3AED]/30"
                                                }`}
                                        >
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${goal.active
                                                    ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9]"
                                                    : "bg-white/[0.03] group-hover:bg-[#7C3AED]/10"
                                                }`}>
                                                <goal.icon className={`w-6 h-6 ${goal.active ? "text-white" : "text-[#7C3AED]"}`} />
                                            </div>
                                            <h3 className="font-bold mb-2 text-white">{goal.title}</h3>
                                            <p className={`text-xs ${goal.active ? "text-white/70" : "text-slate-400"}`}>{goal.desc}</p>
                                        </motion.div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Adaptation Engine */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-16">
                        <h2 className="text-3xl font-black mb-4 text-white">
                            The Adaptation <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Engine</span>
                        </h2>
                        <p className="text-slate-400">See how our UI and curriculum morph based on your selected mode.</p>
                    </ScrollReveal>

                    <div className="space-y-8">
                        {/* Exam Prep Mode */}
                        <ScrollReveal animation="fade-left">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/[0.02] p-8 rounded-2xl border border-white/[0.06]">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Timer className="text-[#7C3AED] w-6 h-6" />
                                        <h3 className="text-2xl font-bold text-white">Exam Prep Mode</h3>
                                    </div>
                                    <p className="text-slate-400 text-lg leading-relaxed">EvolveEd prioritizes high-frequency exam topics, introduces spaced repetition, and activates a countdown-driven practice environment.</p>
                                </div>
                                <div className="bg-[#030305]/60 p-6 rounded-xl min-h-[250px] border border-white/[0.06]">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="text-xs font-black uppercase tracking-widest text-[#7C3AED]">Mock Exam Alpha</div>
                                        <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">00:14:59</div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 w-3/4 bg-white/[0.04] rounded-full" />
                                        <div className="h-3 w-1/2 bg-white/[0.04] rounded-full" />
                                        <div className="h-3 w-2/3 bg-white/[0.04] rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Skill Building Mode */}
                        <ScrollReveal animation="fade-right">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/[0.02] p-8 rounded-2xl border border-white/[0.06]">
                                <div className="order-2 lg:order-1 bg-[#030305]/60 p-6 rounded-xl min-h-[250px] border border-white/[0.06]">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center"><Terminal className="text-[#7C3AED] w-5 h-5" /></div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Project: Predictor_v1</div>
                                            <div className="text-[10px] text-slate-600">Last commit: 2 mins ago</div>
                                        </div>
                                    </div>
                                    <div className="font-mono text-xs text-slate-500 space-y-1">
                                        <p><span className="text-[#39FF14]">+</span> model.fit(X_train, y_train)</p>
                                        <p><span className="text-[#39FF14]">+</span> print(model.score(X_test, y_test))</p>
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Code className="text-[#7C3AED] w-6 h-6" />
                                        <h3 className="text-2xl font-bold text-white">Skill Building Mode</h3>
                                    </div>
                                    <p className="text-slate-400 text-lg leading-relaxed">The UI transforms into a GitHub-synced workspace. Lectures are replaced by technical documentation and hands-on projects.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
