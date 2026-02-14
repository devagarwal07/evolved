"use client";

import { useState, useEffect } from "react";
import { History, Sparkles, Send, Brain, Lightbulb, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
            >
                <h2 className="text-3xl font-bold mb-4 text-white">Your Intelligence Workspace</h2>
                <p className="text-slate-400">Deep dive into complex topics with real-time feedback and visualization.</p>
            </motion.div>

            <div className="grid grid-cols-12 gap-6 h-[700px]">
                {/* Chat History Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="col-span-12 lg:col-span-3 glass-card rounded-xl flex flex-col overflow-hidden"
                >
                    <div className="p-6 border-b border-white/5">
                        <h3 className="font-bold flex items-center gap-2 text-white">
                            <History className="text-primary w-4 h-4" />
                            Past Sessions
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                            <div className="text-xs text-primary mb-1 font-semibold uppercase tracking-wider">Active Now</div>
                            <div className="text-sm font-medium text-white">Neural Networks 101</div>
                            <div className="text-[10px] text-slate-500 mt-2">12:45 PM • Backpropagation</div>
                        </div>
                        <div className="p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent">
                            <div className="text-sm font-medium text-slate-300">Quantum Mechanics</div>
                            <div className="text-[10px] text-slate-500 mt-1">Yesterday • Entanglement</div>
                        </div>
                        <div className="p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent">
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
                    className="col-span-12 lg:col-span-6 glass-card rounded-xl flex flex-col relative overflow-hidden"
                >
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {/* AI Message */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="space-y-4 max-w-full w-full">
                                <p className="text-slate-200 leading-relaxed text-sm min-h-[40px]">
                                    {typedText}
                                    <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse align-middle" />
                                </p>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.5, duration: 0.5 }}
                                    className="bg-black/50 rounded-lg p-4 font-mono text-sm border border-white/10 text-emerald-400 overflow-x-auto shadow-inner shadow-black/50"
                                >
                                    <span className="text-purple-400">def</span> <span className="text-blue-400">sigmoid</span>(x):<br />
                                    &nbsp;&nbsp;<span className="text-purple-400">return</span> 1 / (1 + np.exp(-x))
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 3, duration: 0.5 }}
                                    className="p-6 bg-white/5 rounded-lg border border-white/10"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Concept Diagram: Perceptron</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-4 py-4 overflow-x-auto">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-10 h-10 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center text-[10px] text-white shrink-0"
                                        >
                                            Inputs
                                        </motion.div>
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: 3.5, duration: 0.5 }}
                                            className="h-[2px] w-8 bg-slate-700 shrink-0 origin-left"
                                        />
                                        <div className="w-16 h-16 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center text-xs text-center font-bold text-white shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                            Sum &<br />Activate
                                        </div>
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: 4, duration: 0.5 }}
                                            className="h-[2px] w-8 bg-slate-700 shrink-0 origin-left"
                                        />
                                        <div className="w-10 h-10 rounded-full border-2 border-slate-500 bg-slate-500/20 flex items-center justify-center text-[10px] text-slate-300 shrink-0">Output</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* User Message */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex gap-4 justify-end"
                        >
                            <div className="bg-primary/20 border border-primary/30 p-4 rounded-xl rounded-tr-none max-w-[80%]">
                                <p className="text-sm text-white">How does the error actually flow back through these layers during training?</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                                <User className="w-4 h-4 text-white" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-6 border-t border-white/10 bg-black/20">
                        <div className="relative">
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 focus:border-primary focus:ring-0 transition-all text-white placeholder:text-slate-500 outline-none"
                                placeholder="Ask about backpropagation..."
                                type="text"
                                readOnly
                            />
                            <button className="absolute right-2 top-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                                <Send className="w-4 h-4 text-white" />
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
                    className="col-span-12 lg:col-span-3 glass-card rounded-xl p-6"
                >
                    <h3 className="font-bold mb-6 flex items-center gap-2 text-white">
                        <Brain className="text-primary w-4 h-4" />
                        Learning Profile
                    </h3>

                    {/* Radar Chart Mockup */}
                    <div className="aspect-square relative flex items-center justify-center mb-8 bg-white/5 rounded-full border border-white/5 mx-auto w-48 h-48">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 border border-white/10 rotate-45" />
                        </div>
                        <motion.div
                            animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="w-20 h-20 bg-primary/20 border border-primary/40 rotate-12 backdrop-blur-sm" />
                        </motion.div>
                        <div className="z-10 text-[10px] absolute top-2 font-bold text-primary">Logic</div>
                        <div className="z-10 text-[10px] absolute bottom-2 font-bold text-slate-400">Theory</div>
                        <div className="z-10 text-[10px] absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">Coding</div>
                        <div className="z-10 text-[10px] absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">Recall</div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-slate-400 uppercase tracking-wider font-bold">Confidence Score</span>
                                <span className="text-primary font-bold">84%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "84%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    className="h-full bg-primary rounded-full"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-slate-400 uppercase tracking-wider font-bold">Concept Clarity</span>
                                <span className="text-primary font-bold">62%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "62%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 1 }}
                                    className="h-full bg-primary/60 rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="text-xs font-bold uppercase text-slate-500 mb-4 tracking-widest">Next Recommended</div>
                        <motion.div
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer"
                        >
                            <Lightbulb className="text-primary w-4 h-4" />
                            <span className="text-sm text-slate-200">Cost Function Visualizer</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
