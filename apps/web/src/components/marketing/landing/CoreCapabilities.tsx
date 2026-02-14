"use client";

import { ScanEye, BrainCircuit, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

export function CoreCapabilities() {
    const capabilities = [
        {
            icon: ScanEye,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            title: "Level Detection",
            description: "Instantly assesses your current knowledge base to skip what you know and focus on what you don't. No more redundant lectures."
        },
        {
            icon: BrainCircuit,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            title: "Performance Memory",
            description: "The AI tracks your struggle points over months, resurfacing difficult concepts at the perfect time to ensure long-term retention."
        },
        {
            icon: Zap,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            title: "Speed Adaptation",
            description: "Feeling energized? The AI ramps up complexity. Feeling tired? It shifts to conceptual basics and intuitive analogies."
        },
        {
            icon: Target,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            title: "Weakness Tracking",
            description: "Precision identifies \"blind spots\" in your mental model, providing targeted micro-drills to fix foundations before moving forward."
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold mb-4 text-white">Mastery-Driven Core</h2>
                <p className="text-slate-400">Built on four pillars of cognitive science and adaptive computing.</p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-8"
            >
                {capabilities.map((cap, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ scale: 1.02, borderColor: "rgba(139,92,246,0.3)" }}
                        className="glass-card p-10 rounded-xl group hover:border-primary/50 transition-all duration-300 border border-white/5"
                    >
                        <div className={`w-14 h-14 ${cap.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <cap.icon className={`${cap.color} w-8 h-8`} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{cap.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">{cap.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
