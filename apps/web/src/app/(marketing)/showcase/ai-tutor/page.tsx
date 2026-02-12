"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, History, Brain, TrendingUp, Send, Database } from "lucide-react";

export default function AITutorPage() {
    return (
        <div className="min-h-screen bg-[#0a050c] text-slate-100 font-sans selection:bg-[#c025f4]/30 selection:text-white">
            <main className="pt-32">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center mb-32">
                    <div>
                        <span className="inline-block px-4 py-1 rounded-full bg-[#c025f4]/10 border border-[#c025f4]/20 text-[#c025f4] text-sm font-semibold mb-6">
                            Next-Gen Learning
                        </span>
                        <h1 className="text-6xl font-bold leading-tight mb-6 text-white">
                            Meet Your Personal <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c025f4] to-purple-400">AI Tutor</span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                            EvolveEd adapts in real-time to your unique cognitive patterns, bridging the gap between confusion and mastery with precision guidance.
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="bg-[#c025f4] text-white px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(192,37,244,0.4)] flex items-center gap-2 group">
                                Start Learning Now
                            </button>
                            <button className="bg-white/[0.03] backdrop-blur-md px-8 py-4 rounded-full font-semibold border border-white/10 hover:bg-white/5 transition-colors text-white">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-[#c025f4]/20 blur-3xl rounded-full"></div>
                        <div className="relative bg-white/[0.03] backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-2xl h-[400px] flex items-center justify-center bg-black/50">
                            <div className="text-slate-500 font-mono">[Interactive AI Visual Mockup]</div>
                        </div>
                    </div>
                </section>

                {/* Main Workspace Section */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold mb-4 text-white">Your Intelligence Workspace</h2>
                        <p className="text-slate-400">Deep dive into complex topics with real-time feedback and visualization.</p>
                    </div>
                    <div className="grid grid-cols-12 gap-6 h-[700px]">
                        {/* Chat History Sidebar */}
                        <div className="col-span-3 bg-white/[0.03] backdrop-blur-md rounded-xl flex flex-col overflow-hidden border border-white/10">
                            <div className="p-6 border-b border-white/5">
                                <h3 className="font-bold flex items-center gap-2 text-white">
                                    <History className="text-[#c025f4] w-4 h-4" />
                                    Past Sessions
                                </h3>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                <div className="p-4 rounded-lg bg-[#c025f4]/10 border border-[#c025f4]/30">
                                    <div className="text-xs text-[#c025f4] mb-1 font-semibold uppercase tracking-wider">Active Now</div>
                                    <div className="text-sm font-medium text-white">Neural Networks 101</div>
                                </div>
                            </div>
                        </div>

                        {/* Central Chat */}
                        <div className="col-span-6 bg-white/[0.03] backdrop-blur-md rounded-xl flex flex-col relative overflow-hidden border border-white/10">
                            <div className="flex-1 p-8 space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#c025f4] flex items-center justify-center shrink-0">
                                        <Sparkles className="text-white w-4 h-4" />
                                    </div>
                                    <div className="space-y-4 max-w-full">
                                        <p className="text-slate-200 leading-relaxed">Let's break down **Neural Networks**...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-white/10 bg-black/20">
                                <div className="relative">
                                    <input type="text" placeholder="Ask about backpropagation..." className="w-full bg-white/5 border-white/10 rounded-full py-4 pl-6 pr-16 focus:border-[#c025f4] focus:ring-0 transition-all text-white" />
                                    <button className="absolute right-2 top-2 w-10 h-10 bg-[#c025f4] rounded-full flex items-center justify-center hover:bg-[#c025f4]/80">
                                        <Send className="text-white w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-span-3 bg-white/[0.03] backdrop-blur-md rounded-xl p-6 border border-white/10">
                            <h3 className="font-bold mb-6 flex items-center gap-2 text-white">
                                <Brain className="text-[#c025f4] w-4 h-4" />
                                Learning Profile
                            </h3>
                            {/* Radar chart placeholder */}
                            <div className="aspect-square bg-white/5 rounded-lg mb-4 flex items-center justify-center text-xs text-slate-500">[Radar Chart]</div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-slate-400 uppercase tracking-wider font-bold">Confidence Score</span>
                                        <span className="text-[#c025f4] font-bold">84%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full">
                                        <div className="h-full bg-[#c025f4] rounded-full w-[84%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Capabilities */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Mastery-Driven Core</h2>
                        <p className="text-slate-400">Built on four pillars of cognitive science and adaptive computing.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/[0.03] backdrop-blur-md p-10 rounded-xl hover:border-[#c025f4]/50 border border-white/10 transition-all duration-500">
                            <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                                <TrendingUp className="text-cyan-400 w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Level Detection</h3>
                            <p className="text-slate-400 leading-relaxed">Instantly assesses your current knowledge base.</p>
                        </div>
                        <div className="bg-white/[0.03] backdrop-blur-md p-10 rounded-xl hover:border-[#c025f4]/50 border border-white/10 transition-all duration-500">
                            <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Database className="text-cyan-400 w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Performance Memory</h3>
                            <p className="text-slate-400 leading-relaxed">The AI tracks your struggle points over months.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

