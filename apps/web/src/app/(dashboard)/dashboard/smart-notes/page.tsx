"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Sparkles, FileText, Beaker, CheckCircle, MoreHorizontal } from "lucide-react";

export default function SmartNotesPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Smart Notes Engine</h2>
                    <p className="text-muted-foreground">Transform video content into structured notes instantly.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-[0_0_20px_rgba(192,37,244,0.4)]">
                    <Sparkles className="w-4 h-4 mr-2" />
                    New Analysis
                </Button>
            </div>

            {/* Main Workspace (Stitch "Live Demo" Clone) */}
            <div className="grid lg:grid-cols-[1fr_auto_1fr] items-start gap-6">

                {/* Video Player Side */}
                <div className="bg-[#1A1A24] border border-white/5 rounded-xl overflow-hidden relative shadow-2xl">
                    <div className="aspect-video relative group bg-black/50">
                        {/* Placeholder for Video Image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-primary/40">
                                <Play className="text-white w-8 h-8 ml-1" fill="white" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-primary relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#c025f4]"></div>
                                    </div>
                                </div>
                                <span className="text-xs font-mono text-white">14:22 / 20:00</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-white">Lec 04: Photosynthesis & Light Reactions</h3>
                        <p className="text-muted-foreground text-sm">Biology 101 • MIT OpenCourseWare</p>
                    </div>
                </div>

                {/* AI Stream Connector (Visible on Desktop) */}
                <div className="hidden lg:flex flex-col items-center gap-4 py-20">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-primary/40 flex items-center justify-center relative">
                        <Sparkles className="text-primary w-6 h-6 animate-pulse" />
                        <div className="absolute -inset-2 rounded-full border border-primary/20 animate-ping"></div>
                    </div>
                    <div className="w-0.5 h-32 bg-gradient-to-b from-primary/50 to-transparent"></div>
                </div>

                {/* Notes Panel Side */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 h-[600px] overflow-y-auto relative">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                            <FileText className="text-primary w-5 h-5" /> AI Generated Notes
                        </h3>
                        <span className="text-xs text-[#06b6d4] border border-[#06b6d4]/30 px-2 py-0.5 rounded-full bg-[#06b6d4]/10">Processing...</span>
                    </div>

                    <div className="space-y-6">
                        {/* Key Concept */}
                        <div className="p-4 bg-white/5 rounded-lg border-l-4 border-primary">
                            <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                                <Beaker className="w-4 h-4" /> KEY CONCEPT
                            </h4>
                            <p className="text-lg font-medium text-white">The Chemical Equation of Photosynthesis</p>
                            <div className="bg-black/40 p-4 rounded mt-2 font-mono text-[#06b6d4] text-center text-sm">
                                6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
                            </div>
                        </div>

                        {/* Diagrams & Defs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">Thylakoid</h4>
                                <div className="aspect-square bg-black/50 rounded flex items-center justify-center text-muted-foreground text-xs">
                                    [Structure Diagram]
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg flex flex-col justify-center">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">Quick Defs</h4>
                                <ul className="text-sm space-y-3 text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary">•</span>
                                        <span><strong>Stroma:</strong> Colorless fluid surrounding thylakoids.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary">•</span>
                                        <span><strong>ATP:</strong> Energy currency of cell.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="p-4 border border-white/5 rounded-lg bg-white/5">
                            <h4 className="text-sm font-bold mb-2 text-white">Key Highlights</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Chlorophyll a & b absorb blue and red light best. Green light is reflected, which is why plants appear green to the human eye...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
