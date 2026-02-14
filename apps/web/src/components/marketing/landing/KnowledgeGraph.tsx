"use client";

import { motion } from "framer-motion";

export function KnowledgeGraph() {
    return (
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card rounded-xl p-12 overflow-hidden relative border border-white/10"
            >
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-white">Mental Model Visualizer</h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Watch your knowledge evolve in real-time. Our Knowledge Graph maps your progress across entire disciplines, showing the invisible connections between everything you learn.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div> Mastered
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]"></div> In-Progress
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div> Weak Spot
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[400px]">
                        {/* Network Graph Visual (Mockup) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 400 300">
                                {/* Lines */}
                                <motion.line
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    x1="100" y1="150" x2="200" y2="80" stroke="#8B5CF6" strokeWidth="1"
                                />
                                <motion.line
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                                    transition={{ duration: 1.5, delay: 0.7 }}
                                    x1="100" y1="150" x2="200" y2="220" stroke="#8B5CF6" strokeWidth="1"
                                />
                                <motion.line
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                                    transition={{ duration: 1.5, delay: 0.9 }}
                                    x1="200" y1="80" x2="320" y2="100" stroke="#8B5CF6" strokeWidth="1"
                                />
                                <motion.line
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                                    transition={{ duration: 1.5, delay: 1.1 }}
                                    x1="200" y1="220" x2="300" y2="180" stroke="#8B5CF6" strokeWidth="1"
                                />

                                {/* Nodes */}
                                <motion.circle
                                    initial={{ r: 0 }} whileInView={{ r: 12 }} transition={{ type: "spring", delay: 0.2 }}
                                    cx="100" cy="150" fill="#10b981" className="animate-pulse" filter="url(#glow)"
                                />
                                <motion.circle
                                    initial={{ r: 0 }} whileInView={{ r: 8 }} transition={{ type: "spring", delay: 0.4 }}
                                    cx="200" cy="80" fill="#10b981" filter="url(#glow)"
                                />
                                <motion.circle
                                    initial={{ r: 0 }} whileInView={{ r: 10 }} transition={{ type: "spring", delay: 0.6 }}
                                    cx="200" cy="220" fill="#f59e0b" filter="url(#glow)"
                                />
                                <motion.circle
                                    initial={{ r: 0 }} whileInView={{ r: 6 }} transition={{ type: "spring", delay: 0.8 }}
                                    cx="320" cy="100" fill="#ef4444" filter="url(#glow)"
                                />
                                <motion.circle
                                    initial={{ r: 0 }} whileInView={{ r: 8 }} transition={{ type: "spring", delay: 1.0 }}
                                    cx="300" cy="180" fill="#10b981" filter="url(#glow)"
                                />

                                {/* Glowing filter */}
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Background Texture */}
                <motion.img
                    animate={{ opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-5 pointer-events-none mix-blend-screen"
                    alt="Digital neural network background texture"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwDS8KNgUPe7_dUNcm7UupOfuQO4NytaQi0pn2PghepgrCDyNLcczgzKXcoi-qoe7_ZSDkopysHB9mEmmbg6nuKPw1LK5i7ibKLQU02vMhZAxfkgb2mP_xRN4-25q_gZspiEOGfX3V9ezvzosKR8p4qWqEVMMAu1LYUojaZeZlbTn5bRyA8yXkVq6PEGJT3YKjcKaOQPBZdimrhnrk3N4oCphKjaPwOdfVxG9_azi4rYL3EmJD18Jv77RSkTHuoB3bvDxYArnj8vhL"
                />
            </motion.div>
        </section>
    );
}
