"use client";

import { Button } from "@/components/ui/button";
import { Zap, Play, FileText, FlaskConical, Network, Layers } from "lucide-react";

export default function SmartNotesPage() {
    return (
        <div className="min-h-screen bg-[#0F0F14] text-slate-100 font-sans selection:bg-[#8a2ce2]/30 selection:text-white">
            <section className="pt-40 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#8a2ce2]/10 blur-[120px] rounded-full -z-10"></div>
                <div className="max-w-5xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#8a2ce2]/10 border border-[#8a2ce2]/20 text-[#8a2ce2] text-xs font-bold uppercase tracking-widest mb-6">
                        Next-Gen AI Notes
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter text-white">
                        From Video to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8a2ce2] to-[#00f2ff]">Exam-Ready Notes</span> in Seconds
                    </h1>
                    <p className="text-xl text-[#b0b0b8] max-w-2xl mx-auto mb-10 leading-relaxed">
                        Unlock the power of your learning content. Our Smart Notes Engine synthesizes complex lectures into structured study guides instantly.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button className="bg-[#8a2ce2] text-white px-10 py-4 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(138,44,226,0.4)] hover:scale-105 transition-transform flex items-center gap-2">
                            <Zap className="w-5 h-5" /> Convert Your First Video — Free
                        </button>
                    </div>
                </div>
            </section>

            {/* Live Demo Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
                        {/* Video Player Side */}
                        <div className="bg-[#1A1A24] border border-white/5 rounded-xl overflow-hidden relative shadow-2xl">
                            <div className="aspect-video relative group bg-black/50 flex items-center justify-center">
                                <div className="w-16 h-16 bg-[#8a2ce2] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                                    <Play className="text-white w-8 h-8 fill-current ml-1" />
                                </div>
                            </div>
                        </div>

                        {/* AI Stream Connector */}
                        <div className="hidden lg:flex flex-col items-center gap-4 py-10">
                            <div className="w-16 h-16 rounded-full bg-[#1A1A24]/70 flex items-center justify-center border border-[#8a2ce2]/40 relative text-[#8a2ce2]">
                                <Zap className="w-6 h-6 animate-pulse" />
                            </div>
                            <div className="w-0.5 h-32 bg-gradient-to-b from-[#8a2ce2]/50 to-transparent"></div>
                        </div>

                        {/* Notes Panel */}
                        <div className="bg-[#1A1A24]/70 backdrop-blur-md rounded-xl p-8 h-[550px] overflow-y-auto relative border border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                    <FileText className="text-[#8a2ce2] w-5 h-5" /> AI Generated Notes
                                </h3>
                                <span className="text-xs text-[#00f2ff] border border-[#00f2ff]/30 px-2 py-0.5 rounded-full">Processing...</span>
                            </div>
                            <div className="space-y-6">
                                <div className="p-4 bg-white/5 rounded-lg border-l-4 border-[#8a2ce2]">
                                    <h4 className="text-sm font-bold text-[#8a2ce2] mb-2 flex items-center gap-2">
                                        <FlaskConical className="w-3 h-3" /> KEY CONCEPT
                                    </h4>
                                    <p className="text-lg font-medium text-white">The Chemical Equation of Photosynthesis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Output Types */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-white">Export in Any Format</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#1A1A24]/70 p-8 rounded-xl border border-white/5 hover:border-[#8a2ce2]/60 transition-all cursor-pointer">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-[#8a2ce2]/20 rounded-lg"><Network className="text-[#8a2ce2] w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-white">Concept Maps</h3>
                            </div>
                            <p className="text-[#b0b0b8] mb-6">Visual node-based summaries showing connections.</p>
                        </div>
                        <div className="bg-[#1A1A24]/70 p-8 rounded-xl border border-white/5 hover:border-[#8a2ce2]/60 transition-all cursor-pointer">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-[#8a2ce2]/20 rounded-lg"><Layers className="text-[#8a2ce2] w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-white">Flashcard Ready</h3>
                            </div>
                            <p className="text-[#b0b0b8] mb-6">Instant export to Anki, Quizlet, or Notion.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

