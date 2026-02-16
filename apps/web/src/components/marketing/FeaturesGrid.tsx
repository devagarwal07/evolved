"use client";

import {
    Brain,
    Route,
    Target,
    Search,
    FileText,
    Rocket,
    RefreshCw,
    Dumbbell,
    Users,
    Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

const features = [
    {
        icon: Brain,
        title: "Personalized AI Tutor",
        desc: "A 24/7 mentor that understands your learning style and explains complex topics in simple terms.",
        gradient: "from-purple-400 to-violet-500",
        bg: "bg-purple-500/10",
        border: "hover:border-purple-500/40",
        glow: "group-hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]",
    },
    {
        icon: Route,
        title: "Learning Path Generator",
        desc: "Dynamic curriculums that adapt in real-time based on your progress and mastery levels.",
        gradient: "from-cyan-400 to-blue-500",
        bg: "bg-cyan-500/10",
        border: "hover:border-cyan-500/40",
        glow: "group-hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]",
    },
    {
        icon: Target,
        title: "Smart Level Assessment",
        desc: "Know exactly where you stand with AI-driven benchmarking against global industry standards.",
        gradient: "from-emerald-400 to-green-500",
        bg: "bg-emerald-500/10",
        border: "hover:border-emerald-500/40",
        glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    },
    {
        icon: Search,
        title: "AI-Curated Resources",
        desc: "Stop searching. We find the best videos, articles, and papers tailored to your specific goals.",
        gradient: "from-pink-400 to-rose-500",
        bg: "bg-pink-500/10",
        border: "hover:border-pink-500/40",
        glow: "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]",
    },
    {
        icon: FileText,
        title: "Smart Notes Engine",
        desc: "Automatically summarizes your lectures and readings into structured, searchable insights.",
        gradient: "from-amber-400 to-orange-500",
        bg: "bg-amber-500/10",
        border: "hover:border-amber-500/40",
        glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
    },
    {
        icon: Rocket,
        title: "Goal-Based Learning",
        desc: "Define your North Star and EvolveEd reverse-engineers the most efficient way to reach it.",
        gradient: "from-lime-400 to-emerald-500",
        bg: "bg-lime-500/10",
        border: "hover:border-lime-500/40",
        glow: "group-hover:shadow-[0_0_40px_rgba(132,204,22,0.15)]",
    },
    {
        icon: RefreshCw,
        title: "Continuous Learning Loop",
        desc: "Reinforce knowledge through spaced repetition and AI-triggered review sessions.",
        gradient: "from-indigo-400 to-violet-500",
        bg: "bg-indigo-500/10",
        border: "hover:border-indigo-500/40",
        glow: "group-hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]",
    },
    {
        icon: Dumbbell,
        title: "Smart Practice Engine",
        desc: "Endless, adaptive practice problems that focus specifically on your weak areas.",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-500/10",
        border: "hover:border-red-500/40",
        glow: "group-hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]",
    },
    {
        icon: Users,
        title: "Community Learning",
        desc: "Connect with fellow evolvers on the same path. Learn, compete, and grow together.",
        gradient: "from-violet-400 to-purple-500",
        bg: "bg-violet-500/10",
        border: "hover:border-violet-500/40",
        glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
    },
];

export function FeaturesGrid() {
    return (
        <section id="features" className="py-32 px-6 relative">
            {/* Background orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED] rounded-full blur-[300px] opacity-[0.05] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                        <Sparkles className="w-3 h-3 text-[#00D4FF]" />
                        Full Suite
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                        Everything You Need. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Nothing You Don&apos;t.</span>
                    </h2>
                </ScrollReveal>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
                    {features.map((feature, i) => (
                        <StaggerItem key={i}>
                            <motion.div
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className={`group relative p-7 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] ${feature.border} ${feature.glow} transition-all duration-500 overflow-hidden cursor-default h-full`}
                            >
                                {/* Hover gradient fill */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `linear-gradient(135deg, transparent 40%, rgba(124,58,237,0.04) 60%, rgba(0,212,255,0.04))` }}
                                />
                                <div className="relative z-10">
                                    <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                                        <feature.icon className={`w-6 h-6 bg-gradient-to-br ${feature.gradient} bg-clip-text`} style={{ color: 'inherit' }} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
