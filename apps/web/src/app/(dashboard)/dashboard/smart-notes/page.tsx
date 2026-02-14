"use client";

import { Button } from "@/components/ui/button";
import { Play, Sparkles, FileText, Beaker } from "lucide-react";

export default function SmartNotesPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Smart Notes Engine</h2>
                    <p className="text-sm text-slate-500">Transform video content into exam-ready notes instantly.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">
                    <Sparkles className="w-4 h-4 mr-2" />
                    New Analysis
                </Button>
            </div>

            {/* Main Workspace */}
            <div className="grid lg:grid-cols-[1fr_auto_1fr] items-start gap-6">

                {/* Video Player Side */}
                <div className="glass-card overflow-hidden shadow-2xl">
                    <div className="aspect-video relative group bg-black/50">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                                <Play className="text-white w-8 h-8 ml-1" fill="white" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-primary relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_var(--color-primary)]"></div>
                                    </div>
                                </div>
                                <span className="text-xs font-mono text-white">14:22 / 20:00</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-white">Lec 04: Photosynthesis & Light Reactions</h3>
                        <p className="text-slate-500 text-sm">Biology 101 • MIT OpenCourseWare</p>
                    </div>
                </div>

                {/* AI Stream Connector */}
                <div className="hidden lg:flex flex-col items-center gap-4 py-20">
                    <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-primary/30 flex items-center justify-center relative">
                        <Sparkles className="text-primary w-6 h-6 animate-pulse" />
                        <div className="absolute -inset-2 rounded-full border border-primary/15 animate-ping"></div>
                    </div>
                    <div className="w-0.5 h-32 bg-gradient-to-b from-primary/50 to-transparent"></div>
                </div>

                {/* Notes Panel Side */}
                <div className="glass-card-elevated p-8 h-[600px] overflow-y-auto relative">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                            <FileText className="text-primary w-5 h-5" /> AI Generated Notes
                        </h3>
                        <span className="text-[10px] text-secondary border border-secondary/30 px-2 py-0.5 rounded-full bg-secondary/10 font-bold">Processing...</span>
                    </div>

                    <div className="space-y-6">
                        {/* Key Concept */}
                        <div className="p-4 bg-white/[0.04] rounded-xl border-l-4 border-primary">
                            <h4 className="text-xs font-bold text-primary mb-2 flex items-center gap-2 uppercase tracking-wider">
                                <Beaker className="w-4 h-4" /> KEY CONCEPT
                            </h4>
                            <p className="text-base font-medium text-white">The Chemical Equation of Photosynthesis</p>
                            <div className="bg-black/40 p-4 rounded-lg mt-3 font-mono text-secondary text-center text-sm">
                                6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
                            </div>
                        </div>

                        {/* Diagrams & Defs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 glass-card">
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Thylakoid</h4>
                                <div className="aspect-square bg-black/40 rounded-lg flex items-center justify-center text-slate-600 text-xs">
                                    [Structure Diagram]
                                </div>
                            </div>
                            <div className="p-4 glass-card flex flex-col justify-center">
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Quick Defs</h4>
                                <ul className="text-sm space-y-3 text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary">•</span>
                                        <span><strong className="text-white">Stroma:</strong> Colorless fluid surrounding thylakoids.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary">•</span>
                                        <span><strong className="text-white">ATP:</strong> Energy currency of cell.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="p-4 glass-card">
                            <h4 className="text-sm font-bold mb-2 text-white">Key Highlights</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Chlorophyll a & b absorb blue and red light best. Green light is reflected, which is why plants appear green to the human eye...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
