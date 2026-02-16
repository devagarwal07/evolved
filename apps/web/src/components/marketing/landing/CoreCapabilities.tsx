"use client";

import { ScanEye, BrainCircuit, Zap, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../ScrollReveal";

export function CoreCapabilities() {
    const capabilities = [
        {
            icon: ScanEye,
            gradient: "from-cyan-400 to-blue-500",
            bg: "bg-cyan-500/10",
            border: "hover:border-cyan-500/40",
            glow: "group-hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]",
            title: "Level Detection",
            description: "Instantly assesses your current knowledge base to skip what you know and focus on what you don't."
        },
        {
            icon: BrainCircuit,
            gradient: "from-purple-400 to-violet-500",
            bg: "bg-purple-500/10",
            border: "hover:border-purple-500/40",
            glow: "group-hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]",
            title: "Performance Memory",
            description: "Tracks your struggle points over months, resurfacing difficult concepts at the perfect time for retention."
        },
        {
            icon: Zap,
            gradient: "from-amber-400 to-orange-500",
            bg: "bg-amber-500/10",
            border: "hover:border-amber-500/40",
            glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
            title: "Speed Adaptation",
            description: "Feeling energized? AI ramps up complexity. Tired? It shifts to conceptual basics and intuitive analogies."
        },
        {
            icon: Target,
            gradient: "from-emerald-400 to-green-500",
            bg: "bg-emerald-500/10",
            border: "hover:border-emerald-500/40",
            glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
            title: "Weakness Tracking",
            description: "Identifies \"blind spots\" in your mental model, providing targeted micro-drills to fix foundations."
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-32 relative">
            {/* Background orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED] rounded-full blur-[250px] opacity-[0.06] pointer-events-none" />

            <ScrollReveal className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3 text-[#00D4FF]" />
                    Core Engine
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                    Mastery-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Core</span>
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto">
                    Built on four pillars of cognitive science and adaptive computing.
                </p>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
                {capabilities.map((cap, index) => (
                    <StaggerItem key={index}>
                        <motion.div
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`group relative p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] ${cap.border} ${cap.glow} transition-all duration-500 overflow-hidden cursor-default`}
                        >
                            {/* Animated gradient border on hover */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `linear-gradient(135deg, transparent 40%, rgba(124,58,237,0.05) 60%, rgba(0,212,255,0.05))`,
                                }}
                            />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 ${cap.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                                    <cap.icon className={`w-7 h-7 bg-gradient-to-br ${cap.gradient} bg-clip-text`} style={{ color: 'inherit' }} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">{cap.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-[15px]">{cap.description}</p>
                            </div>
                        </motion.div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </section>
    );
}
