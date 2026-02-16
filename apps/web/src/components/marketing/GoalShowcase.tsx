"use client";

import { GraduationCap, Code2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import dynamic from "next/dynamic";

const FloatingBrain = dynamic(
    () => import("@/components/marketing/3d/FloatingBrain").then((m) => m.FloatingBrain),
    { ssr: false }
);

const goals = [
    {
        icon: GraduationCap,
        title: "Exam Mastery",
        tags: "SAT • MCAT • BAR • CFA",
        color: "#ef4444",
        bg: "bg-red-500/10",
        border: "hover:border-red-500/30",
    },
    {
        icon: Code2,
        title: "Skill Acquisition",
        tags: "CODING • DESIGN • LANGUAGES",
        color: "#3b82f6",
        bg: "bg-blue-500/10",
        border: "hover:border-blue-500/30",
    },
    {
        icon: Briefcase,
        title: "Interview Prep",
        tags: "FAANG • CONSULTING • LEADERSHIP",
        color: "#10b981",
        bg: "bg-emerald-500/10",
        border: "hover:border-emerald-500/30",
    },
];

export function GoalShowcase() {
    return (
        <section className="py-32 px-6 relative">
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#7C3AED] rounded-full blur-[250px] opacity-[0.04] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal animation="fade-left">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                                🎯 Domain Expertise
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                                Master Any Domain <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A855F7]">With Precision.</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                                Whether you&apos;re prepping for the bar exam or learning quantum
                                physics, EvolveEd adapts its pedagogical approach to the specific
                                domain requirements.
                            </p>

                            <StaggerContainer className="space-y-4" staggerDelay={0.12}>
                                {goals.map((goal, i) => (
                                    <StaggerItem key={i}>
                                        <motion.div
                                            whileHover={{ x: 8, transition: { duration: 0.2 } }}
                                            className={`flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] ${goal.border} transition-all cursor-default group`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl ${goal.bg} flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5`}>
                                                <goal.icon className="w-5 h-5" style={{ color: goal.color }} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{goal.title}</h4>
                                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">
                                                    {goal.tags}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </ScrollReveal>

                    {/* 3D Brain Visual */}
                    <ScrollReveal animation="fade-right" delay={0.2}>
                        <div className="relative">
                            <div className="rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] p-4 relative">
                                <FloatingBrain />

                                {/* Floating Stats Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 }}
                                    className="absolute bottom-8 left-8 bg-[#030305]/90 backdrop-blur-xl p-5 rounded-2xl w-64 shadow-2xl border border-white/10"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-bold text-white">Progress Velocity</span>
                                        <span className="text-[#39FF14] text-sm font-mono font-bold">+42%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "75%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 1 }}
                                            className="h-full rounded-full"
                                            style={{ background: "linear-gradient(90deg, #7C3AED, #00D4FF)" }}
                                        />
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                                        EvolveEd students learn concepts 3x faster than traditional methods.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
