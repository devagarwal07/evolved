"use client";

import { Star, History, AlertTriangle, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal";

export function SessionTimeline() {
    const sessions = [
        { day: "Mon", status: "Breakthrough", icon: Star, color: "#10b981", bg: "bg-emerald-500", glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]" },
        { day: "Tue", status: "Steady Pace", icon: TrendingUp, color: "#00D4FF", bg: "bg-[#00D4FF]/20", glow: "" },
        { day: "Wed", status: "Struggle Point", icon: AlertTriangle, color: "#ef4444", bg: "bg-red-500/20", glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]" },
        { day: "Thu", status: "AI Remediation", icon: Sparkles, color: "#7C3AED", bg: "bg-[#7C3AED]", glow: "shadow-[0_0_30px_rgba(124,58,237,0.5)]" },
        { day: "Fri", status: "New Mastery", icon: Star, color: "#39FF14", bg: "bg-[#39FF14]/20", glow: "shadow-[0_0_20px_rgba(57,255,20,0.3)]" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-32 relative">
            <ScrollReveal className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                    📊 Learning Journey
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Your Last 5 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#39FF14]">Sessions</span>
                </h2>
            </ScrollReveal>

            <div className="relative px-4 md:px-16">
                {/* Animated connecting line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-[28px] left-0 w-full h-[2px] origin-left"
                    style={{
                        background: "linear-gradient(90deg, #7C3AED, #00D4FF, #39FF14)",
                        opacity: 0.3,
                    }}
                />

                <div className="flex justify-between relative z-10 w-full">
                    {sessions.map((session, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (index * 0.15), type: "spring", stiffness: 300 }}
                            className="flex flex-col items-center group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${session.bg} ${session.glow} transition-all cursor-pointer border border-white/10`}
                                style={{ color: session.color }}
                            >
                                <session.icon className="w-5 h-5" />
                            </motion.div>
                            <div className="text-sm font-bold text-white">{session.day}</div>
                            <div className="text-[10px] text-slate-500 text-center mt-1 font-medium">{session.status}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
