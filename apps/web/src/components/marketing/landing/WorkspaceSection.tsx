"use client";

import { useState, useEffect } from "react";
import { History, Sparkles, Send, Brain, Lightbulb, User } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal";

export function WorkspaceSection() {
    const [typedText, setTypedText] = useState("");
    const fullText = "Let's break down Neural Networks. Think of them as a stack of filters. Here's a basic implementation of a neuron's activation:";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 py-32 relative">
            {/* Background gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED] rounded-full blur-[300px] opacity-[0.04] pointer-events-none" />

            <ScrollReveal className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                    🎓 Live Preview
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                    Your Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Workspace</span>
                </h2>
                <p className="text-slate-400 max-w-md mx-auto">Deep dive into complex topics with real-time AI feedback and visualization.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-in" delay={0.2}>
                <div className="grid grid-cols-12 gap-4 h-[650px]">
                    {/* Chat History Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="col-span-12 lg:col-span-3 rounded-2xl flex flex-col overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.06]"
                    >
                        <div className="p-5 border-b border-white/[0.06]">
                            <h3 className="font-bold flex items-center gap-2 text-white text-sm">
                                <History className="text-[#00D4FF] w-4 h-4" />
                                Past Sessions
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-3">
                            <div className="p-4 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30">
                                <div className="text-[10px] text-[#00D4FF] mb-1 font-bold uppercase tracking-wider">Active Now</div>
                                <div className="text-sm font-semibold text-white">Neural Networks 101</div>
                                <div className="text-[10px] text-slate-500 mt-2">12:45 PM • Backpropagation</div>
                            </div>
                            <div className="p-4 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors border border-transparent hover:border-white/10">
                                <div className="text-sm font-medium text-slate-300">Quantum Mechanics</div>
                                <div className="text-[10px] text-slate-500 mt-1">Yesterday • Entanglement</div>
                            </div>
                            <div className="p-4 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors border border-transparent hover:border-white/10">
                                <div className="text-sm font-medium text-slate-300">Microeconomics</div>
                                <div className="text-[10px] text-slate-500 mt-1">2 days ago • Supply & Demand</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Central Chat Interface */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="col-span-12 lg:col-span-6 rounded-2xl flex flex-col relative overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.06]"
                    >
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* AI Message */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div className="space-y-4 max-w-full w-full">
                                    <p className="text-slate-200 leading-relaxed text-sm min-h-[40px]">
                                        {typedText}
                                        <span className="inline-block w-1.5 h-4 bg-[#7C3AED] ml-1 animate-pulse align-middle rounded-sm" />
                                    </p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.5, duration: 0.5 }}
                                        className="bg-black/50 rounded-xl p-4 font-mono text-sm border border-white/10 text-emerald-400 overflow-x-auto shadow-inner shadow-black/50"
                                    >
                                        <span className="text-purple-400">def</span> <span className="text-[#00D4FF]">sigmoid</span>(x):<br />
                                        &nbsp;&nbsp;<span className="text-purple-400">return</span> 1 / (1 + np.exp(-x))
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 3, duration: 0.5 }}
                                        className="p-5 bg-white/[0.03] rounded-xl border border-white/[0.06]"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Concept Diagram: Perceptron</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-4 py-3 overflow-x-auto">
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="w-10 h-10 rounded-full border-2 border-[#7C3AED] bg-[#7C3AED]/20 flex items-center justify-center text-[10px] text-white shrink-0"
                                            >
                                                Inputs
                                            </motion.div>
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ delay: 3.5, duration: 0.5 }}
                                                className="h-[2px] w-8 shrink-0 origin-left"
                                                style={{ background: "linear-gradient(90deg, #7C3AED, #00D4FF)" }}
                                            />
                                            <div className="w-14 h-14 rounded-full border-2 border-[#00D4FF] bg-[#00D4FF]/10 flex items-center justify-center text-[10px] text-center font-bold text-white shrink-0 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                                                Sum &<br />Activate
                                            </div>
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ delay: 4, duration: 0.5 }}
                                                className="h-[2px] w-8 shrink-0 origin-left"
                                                style={{ background: "linear-gradient(90deg, #00D4FF, #39FF14)" }}
                                            />
                                            <div className="w-10 h-10 rounded-full border-2 border-[#39FF14]/60 bg-[#39FF14]/10 flex items-center justify-center text-[10px] text-[#39FF14] shrink-0">Output</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* User Message */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex gap-3 justify-end"
                            >
                                <div className="bg-[#7C3AED]/15 border border-[#7C3AED]/30 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                                    <p className="text-sm text-white">How does the error actually flow back through these layers during training?</p>
                                </div>
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-white/[0.06] bg-black/20">
                            <div className="relative">
                                <input
                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full py-3.5 pl-5 pr-14 focus:border-[#7C3AED] focus:ring-0 transition-all text-white placeholder:text-slate-500 outline-none text-sm focus:shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                                    placeholder="Ask about backpropagation..."
                                    type="text"
                                    readOnly
                                />
                                <button className="absolute right-2 top-1.5 w-9 h-9 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center hover:from-[#6D28D9] hover:to-[#5B21B6] transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                                    <Send className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Sidebar: Learning Profile */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="col-span-12 lg:col-span-3 rounded-2xl p-5 bg-white/[0.02] backdrop-blur-sm border border-white/[0.06]"
                    >
                        <h3 className="font-bold mb-6 flex items-center gap-2 text-white text-sm">
                            <Brain className="text-[#00D4FF] w-4 h-4" />
                            Learning Profile
                        </h3>

                        {/* Radar Chart */}
                        <div className="aspect-square relative flex items-center justify-center mb-6 bg-white/[0.03] rounded-2xl border border-white/[0.06] mx-auto w-44 h-44">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-28 h-28 border border-white/10 rotate-45 rounded-sm" />
                            </div>
                            <motion.div
                                animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-16 h-16 bg-[#7C3AED]/15 border border-[#7C3AED]/30 rotate-12 backdrop-blur-sm rounded-sm" />
                            </motion.div>
                            <div className="z-10 text-[9px] absolute top-2 font-bold text-[#00D4FF]">Logic</div>
                            <div className="z-10 text-[9px] absolute bottom-2 font-bold text-slate-500">Theory</div>
                            <div className="z-10 text-[9px] absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-500">Coding</div>
                            <div className="z-10 text-[9px] absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500">Recall</div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-slate-500 uppercase tracking-wider font-bold text-[10px]">Confidence</span>
                                    <span className="text-[#00D4FF] font-bold">84%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "84%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.8 }}
                                        className="h-full rounded-full"
                                        style={{ background: "linear-gradient(90deg, #7C3AED, #00D4FF)" }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-slate-500 uppercase tracking-wider font-bold text-[10px]">Clarity</span>
                                    <span className="text-[#7C3AED] font-bold">62%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "62%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 1 }}
                                        className="h-full bg-[#7C3AED]/60 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/[0.06]">
                            <div className="text-[10px] font-bold uppercase text-slate-600 mb-3 tracking-widest">Next Up</div>
                            <motion.div
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)" }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#7C3AED]/30 transition-colors cursor-pointer"
                            >
                                <Lightbulb className="text-[#39FF14] w-4 h-4" />
                                <span className="text-xs text-slate-200 font-medium">Cost Function Visualizer</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </ScrollReveal>
        </section>
    );
}
