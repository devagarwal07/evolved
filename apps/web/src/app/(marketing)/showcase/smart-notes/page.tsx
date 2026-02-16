"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Play, FileText, FlaskConical, Network, Layers, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/marketing/ScrollReveal";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const outputs = [
    { icon: Network, title: "Concept Maps", desc: "Visual node-based summaries showing connections between ideas." },
    { icon: Layers, title: "Flashcard Ready", desc: "Instant export to Anki, Quizlet, or Notion for spaced repetition." },
];

export default function SmartNotesPage() {
    return (
        <div className="pt-32 pb-20">
            {/* Background orbs */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#7C3AED]/6 blur-[200px] rounded-full" />
            </div>

            {/* Hero */}
            <ScrollReveal className="pt-10 pb-20 px-6 text-center">
                <div className="max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#7C3AED] uppercase tracking-widest mb-6">
                        <Sparkles className="w-3 h-3" /> AI Notes Engine
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-white">
                        From Video to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#00D4FF]">
                            Exam-Ready Notes
                        </span>{" "}
                        in Seconds
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Unlock the power of your learning content. Our Smart Notes Engine synthesizes complex lectures into structured study guides instantly.
                    </p>
                    <Button asChild className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white px-10 py-6 rounded-full text-lg font-black shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:scale-105 transition-all">
                        <Link href={ROUTES.AUTH.SIGNUP}>
                            <Zap className="w-5 h-5 mr-2" /> Convert Your First Video — Free
                        </Link>
                    </Button>
                </div>
            </ScrollReveal>

            {/* Live Demo */}
            <ScrollReveal className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
                        {/* Video Player */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="aspect-video relative flex items-center justify-center bg-[#030305]/60">
                                <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                                    <Play className="text-white w-8 h-8 fill-current ml-1" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Connector */}
                        <div className="hidden lg:flex flex-col items-center gap-4 py-10">
                            <div className="w-14 h-14 rounded-full bg-white/[0.02] flex items-center justify-center border border-[#7C3AED]/30 text-[#7C3AED]">
                                <Zap className="w-6 h-6 animate-pulse" />
                            </div>
                            <div className="w-0.5 h-32 bg-gradient-to-b from-[#7C3AED]/40 to-transparent" />
                        </div>

                        {/* Notes Panel */}
                        <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 h-[400px] overflow-y-auto border border-white/[0.06]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                                    <FileText className="text-[#7C3AED] w-5 h-5" /> AI Generated Notes
                                </h3>
                                <span className="text-[10px] text-[#39FF14] border border-[#39FF14]/20 px-2 py-0.5 rounded-full font-bold bg-[#39FF14]/5">Processing...</span>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/[0.02] rounded-xl border-l-4 border-[#7C3AED]">
                                    <h4 className="text-xs font-black text-[#7C3AED] mb-2 flex items-center gap-2 uppercase tracking-widest">
                                        <FlaskConical className="w-3 h-3" /> Key Concept
                                    </h4>
                                    <p className="text-base font-medium text-white">The Chemical Equation of Photosynthesis</p>
                                </div>
                                <div className="p-4 bg-white/[0.02] rounded-xl border-l-4 border-[#00D4FF]">
                                    <h4 className="text-xs font-black text-[#00D4FF] mb-2 uppercase tracking-widest">Definition</h4>
                                    <p className="text-sm text-slate-300">6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Output Types */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal className="mb-12">
                        <h2 className="text-3xl font-black mb-4 text-white">
                            Export in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Any Format</span>
                        </h2>
                    </ScrollReveal>
                    <StaggerContainer className="grid md:grid-cols-2 gap-5" staggerDelay={0.12}>
                        {outputs.map((output, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.06] hover:border-[#7C3AED]/20 transition-all cursor-pointer h-full"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-[#7C3AED]/10 rounded-xl border border-white/5">
                                            <output.icon className="text-[#7C3AED] w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{output.title}</h3>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed">{output.desc}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>
        </div>
    );
}
