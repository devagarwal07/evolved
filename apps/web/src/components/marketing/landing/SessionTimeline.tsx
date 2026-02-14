"use client";

import { Star, History, AlertTriangle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function SessionTimeline() {
    const sessions = [
        { day: "Mon", status: "Breakthrough", icon: Star, color: "text-white", bg: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
        { day: "Tue", status: "Steady Pace", icon: History, color: "text-slate-400", bg: "bg-white/10", border: "border-white/20" },
        { day: "Wed", status: "Struggle Point", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/20", border: "border-red-500/50" },
        { day: "Thu", status: "AI Remediation", icon: Sparkles, color: "text-white", bg: "bg-primary", glow: "shadow-[0_0_20px_rgba(139,92,246,0.5)]" },
        { day: "Fri", status: "New Mastery", icon: Star, color: "text-white", bg: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-12 text-center text-white"
            >
                Your Last 5 Sessions
            </motion.h2>
            <div className="relative px-4 md:px-12">
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full origin-left"
                />
                <div className="flex justify-between relative z-10 w-full">
                    {sessions.map((session, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (index * 0.2), type: "spring" }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${session.bg} ${session.color} ${session.border ? `border ${session.border}` : ''} ${session.shadow ? `shadow-lg ${session.shadow}` : ''} ${session.glow || ''} transition-all cursor-pointer`}
                            >
                                <session.icon className="w-5 h-5" />
                            </motion.div>
                            <div className="text-sm font-bold text-white">{session.day}</div>
                            <div className="text-[10px] text-slate-500 text-center">{session.status}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
