"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function ComparisonTable() {
    return (
        <section className="max-w-5xl mx-auto px-6 mb-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white">Why EvolveEd?</h2>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card rounded-xl overflow-hidden border border-white/10"
            >
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="p-6 font-semibold text-white">Feature</th>
                            <th className="p-6 font-semibold text-slate-500">Generic Chatbot</th>
                            <th className="p-6 font-semibold text-primary">EvolveEd AI</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-400 text-sm md:text-base">
                        {[
                            { feature: "Concept Continuity", generic: "Resets every session", evolve: "Infinite Memory" },
                            { feature: "Difficulty Level", generic: "One size fits all", evolve: "Hyper-Adaptive" },
                            { feature: "Visual Learning", generic: "Text only", evolve: "Dynamic Diagrams" },
                            { feature: "Feedback Loop", generic: "Basic Correction", evolve: "Cognitive Remediation" },
                        ].map((row, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="p-6 text-white font-medium">{row.feature}</td>
                                <td className="p-6">{row.generic}</td>
                                <td className="p-6 text-emerald-400 flex items-center gap-2 font-bold">
                                    <CheckCircle2 className="w-5 h-5" /> {row.evolve}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </section>
    );
}
