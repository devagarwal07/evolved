"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal";

const nodes = [
    { x: 80, y: 140, r: 16, color: "#10b981", label: "Neural Networks", status: "mastered" },
    { x: 200, y: 60, r: 12, color: "#10b981", label: "Backpropagation", status: "mastered" },
    { x: 220, y: 220, r: 14, color: "#f59e0b", label: "GANs", status: "learning" },
    { x: 340, y: 90, r: 8, color: "#ef4444", label: "Attention", status: "weak" },
    { x: 320, y: 200, r: 10, color: "#10b981", label: "CNNs", status: "mastered" },
    { x: 160, y: 150, r: 8, color: "#f59e0b", label: "Loss Functions", status: "learning" },
];

const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [0, 5], [1, 5], [5, 2],
];

export function KnowledgeGraph() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-32 relative">
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#00D4FF] rounded-full blur-[250px] opacity-[0.04] pointer-events-none" />

            <ScrollReveal animation="scale-in">
                <div className="rounded-2xl p-8 md:p-12 overflow-hidden relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.06]">
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                                🧠 Knowledge Mapping
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                                Mental Model <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#39FF14]">Visualizer</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Watch your knowledge evolve in real-time. Our Knowledge Graph maps progress across entire disciplines, revealing invisible connections.
                            </p>
                            <div className="flex flex-wrap gap-6">
                                {[
                                    { color: "#10b981", label: "Mastered" },
                                    { color: "#f59e0b", label: "Learning" },
                                    { color: "#ef4444", label: "Weak Spot" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-3 h-3 rounded-full" style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }} />
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-[350px]">
                            <svg className="w-full h-full" viewBox="0 0 400 280">
                                <defs>
                                    <filter id="node-glow">
                                        <feGaussianBlur stdDeviation="6" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Edges */}
                                {edges.map(([a, b], i) => (
                                    <motion.line
                                        key={`edge-${i}`}
                                        x1={nodes[a].x} y1={nodes[a].y}
                                        x2={nodes[b].x} y2={nodes[b].y}
                                        stroke="#7C3AED"
                                        strokeWidth="1"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 0.3 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                                    />
                                ))}

                                {/* Animated data pulses along edges */}
                                {edges.slice(0, 3).map(([a, b], i) => (
                                    <motion.circle
                                        key={`pulse-${i}`}
                                        r="2"
                                        fill="#7C3AED"
                                        filter="url(#node-glow)"
                                        initial={{ cx: nodes[a].x, cy: nodes[a].y, opacity: 0 }}
                                        whileInView={{
                                            cx: [nodes[a].x, nodes[b].x],
                                            cy: [nodes[a].y, nodes[b].y],
                                            opacity: [0, 0.8, 0],
                                        }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 2, delay: 1.5 + i * 0.6, repeat: Infinity, repeatDelay: 3 }}
                                    />
                                ))}

                                {/* Nodes */}
                                {nodes.map((node, i) => (
                                    <g key={i}>
                                        <motion.circle
                                            cx={node.x} cy={node.y}
                                            r={0}
                                            fill={node.color}
                                            filter="url(#node-glow)"
                                            initial={{ r: 0 }}
                                            whileInView={{ r: node.r }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", delay: 0.2 + i * 0.15, stiffness: 200 }}
                                        />
                                        {/* Outer ring pulse */}
                                        <motion.circle
                                            cx={node.x} cy={node.y}
                                            r={node.r + 6}
                                            fill="none"
                                            stroke={node.color}
                                            strokeWidth="1"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: [0, 0.3, 0] }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 2, delay: 1 + i * 0.2, repeat: Infinity }}
                                        />
                                        <motion.text
                                            x={node.x}
                                            y={node.y - node.r - 8}
                                            textAnchor="middle"
                                            fill="#94a3b8"
                                            fontSize="9"
                                            fontWeight="600"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.8 + i * 0.1 }}
                                        >
                                            {node.label}
                                        </motion.text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>

                    {/* Background gradient */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#7C3AED]/[0.03] to-transparent pointer-events-none" />
                </div>
            </ScrollReveal>
        </section>
    );
}
