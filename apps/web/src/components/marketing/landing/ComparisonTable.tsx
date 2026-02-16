"use client";

import { CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal";

export function ComparisonTable() {
    const rows = [
        { feature: "Concept Continuity", generic: "Resets every session", evolve: "Infinite Memory" },
        { feature: "Difficulty Level", generic: "One size fits all", evolve: "Hyper-Adaptive" },
        { feature: "Visual Learning", generic: "Text only", evolve: "Dynamic Diagrams" },
        { feature: "Feedback Loop", generic: "Basic Correction", evolve: "Cognitive Remediation" },
        { feature: "Progress Tracking", generic: "None", evolve: "Real-time Analytics" },
    ];

    return (
        <section className="max-w-5xl mx-auto px-6 py-32 relative">
            <ScrollReveal className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A855F7]">EvolveEd</span>?
                </h2>
                <p className="text-slate-400">See how we compare to generic AI chatbots.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-in">
                <div className="rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.06]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                                <th className="p-6 font-bold text-white text-sm">Feature</th>
                                <th className="p-6 font-bold text-slate-500 text-sm">Generic Chatbot</th>
                                <th className="p-6 font-bold text-sm">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">EvolveEd AI</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08, duration: 0.4 }}
                                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="p-6 text-white font-medium text-sm">{row.feature}</td>
                                    <td className="p-6 text-sm">
                                        <span className="flex items-center gap-2 text-slate-500">
                                            <X className="w-4 h-4 text-red-500/60" />
                                            {row.generic}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm">
                                        <span className="flex items-center gap-2 text-[#39FF14] font-bold">
                                            <CheckCircle2 className="w-4 h-4" />
                                            {row.evolve}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ScrollReveal>
        </section>
    );
}
