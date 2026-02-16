"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, History, Brain, TrendingUp, Send, Database, Cpu, Eye } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/marketing/ScrollReveal";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const capabilities = [
    { icon: TrendingUp, title: "Level Detection", desc: "Instantly assesses your current knowledge base and adjusts difficulty in real-time.", color: "#00D4FF" },
    { icon: Database, title: "Performance Memory", desc: "The AI tracks your struggle points over months, building a deep understanding of your patterns.", color: "#7C3AED" },
    { icon: Cpu, title: "Adaptive Pacing", desc: "Dynamically adjusts the speed and depth of explanations based on your comprehension signals.", color: "#39FF14" },
    { icon: Eye, title: "Gap Analysis", desc: "Identifies blind spots in your knowledge graph and proactively fills them before they compound.", color: "#00D4FF" },
];

export default function AITutorPage() {
    return (
        <div className="pt-32 pb-20">
            {/* Background orbs */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7C3AED]/8 blur-[200px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#00D4FF]/5 blur-[150px] rounded-full" />
            </div>

            {/* Hero */}
            <ScrollReveal className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center mb-32">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#7C3AED] uppercase tracking-widest mb-6">
                        <Sparkles className="w-3 h-3" /> Next-Gen Learning
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6 text-white tracking-tight">
                        Meet Your Personal <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#00D4FF]">
                            AI Tutor
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                        EvolveEd adapts in real-time to your unique cognitive patterns, bridging the gap between confusion and mastery.
                    </p>
                    <div className="flex items-center gap-4">
                        <Button asChild className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white px-8 py-6 rounded-full font-black text-lg shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:scale-105 transition-all">
                            <Link href={ROUTES.AUTH.SIGNUP}>Start Learning Now</Link>
                        </Button>
                        <Button variant="outline" className="bg-white/[0.02] border-white/[0.08] text-white px-8 py-6 rounded-full font-bold text-lg hover:bg-white/[0.06] transition-all">
                            Watch Demo
                        </Button>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-[#7C3AED]/10 blur-[60px] rounded-full pointer-events-none" />
                    <div className="relative bg-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl h-[400px] flex items-center justify-center">
                        <div className="text-slate-600 font-mono text-sm">[Interactive AI Visual]</div>
                    </div>
                </motion.div>
            </ScrollReveal>

            {/* Workspace */}
            <ScrollReveal className="max-w-7xl mx-auto px-6 mb-32">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-black mb-4 text-white">
                        Your Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Workspace</span>
                    </h2>
                    <p className="text-slate-400">Deep dive into complex topics with real-time feedback and visualization.</p>
                </div>
                <div className="grid grid-cols-12 gap-4 h-[600px]">
                    {/* Chat History Sidebar */}
                    <div className="col-span-3 bg-white/[0.02] backdrop-blur-sm rounded-2xl flex flex-col overflow-hidden border border-white/[0.06]">
                        <div className="p-5 border-b border-white/[0.06]">
                            <h3 className="font-bold flex items-center gap-2 text-white text-sm">
                                <History className="text-[#7C3AED] w-4 h-4" /> Past Sessions
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            <div className="p-3 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30">
                                <div className="text-[10px] text-[#7C3AED] mb-1 font-black uppercase tracking-widest">Active Now</div>
                                <div className="text-sm font-medium text-white">Neural Networks 101</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                <div className="text-[10px] text-slate-600 mb-1 font-bold">Yesterday</div>
                                <div className="text-sm font-medium text-slate-400">Linear Algebra</div>
                            </div>
                        </div>
                    </div>

                    {/* Central Chat */}
                    <div className="col-span-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl flex flex-col overflow-hidden border border-white/[0.06]">
                        <div className="flex-1 p-8 space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shrink-0">
                                    <Sparkles className="text-white w-4 h-4" />
                                </div>
                                <div className="bg-white/[0.02] p-4 rounded-2xl rounded-tl-none border border-white/[0.06]">
                                    <p className="text-slate-200 leading-relaxed text-sm">Let&apos;s break down <strong>Neural Networks</strong>. A neural network is a series of algorithms that endeavors to recognize patterns...</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 border-t border-white/[0.06] bg-[#030305]/40">
                            <div className="relative">
                                <input type="text" placeholder="Ask about backpropagation..." className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full py-4 pl-6 pr-16 focus:border-[#7C3AED]/50 focus:ring-0 text-white text-sm transition-all placeholder:text-slate-600" />
                                <button className="absolute right-2 top-2 w-10 h-10 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                    <Send className="text-white w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-span-3 bg-white/[0.02] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
                        <h3 className="font-bold mb-5 flex items-center gap-2 text-white text-sm">
                            <Brain className="text-[#7C3AED] w-4 h-4" /> Learning Profile
                        </h3>
                        <div className="aspect-square bg-white/[0.02] rounded-xl mb-4 flex items-center justify-center text-xs text-slate-600 border border-white/[0.04]">[Radar Chart]</div>
                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-slate-500 uppercase tracking-wider font-bold">Confidence</span>
                                    <span className="text-[#7C3AED] font-bold">84%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/[0.04] rounded-full">
                                    <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7] rounded-full w-[84%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-slate-500 uppercase tracking-wider font-bold">Retention</span>
                                    <span className="text-[#00D4FF] font-bold">92%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/[0.04] rounded-full">
                                    <div className="h-full bg-gradient-to-r from-[#00D4FF] to-[#06b6d4] rounded-full w-[92%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Capabilities */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <ScrollReveal className="text-center mb-12">
                    <h2 className="text-3xl font-black mb-4 text-white">
                        Mastery-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Core</span>
                    </h2>
                    <p className="text-slate-400">Built on four pillars of cognitive science and adaptive computing.</p>
                </ScrollReveal>
                <StaggerContainer className="grid md:grid-cols-2 gap-5" staggerDelay={0.1}>
                    {capabilities.map((cap, i) => (
                        <StaggerItem key={i}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="bg-white/[0.02] backdrop-blur-sm p-8 rounded-2xl border border-white/[0.06] hover:border-[#7C3AED]/20 transition-all duration-500 h-full"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/5" style={{ backgroundColor: `${cap.color}10` }}>
                                    <cap.icon className="w-6 h-6" style={{ color: cap.color }} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{cap.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{cap.desc}</p>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>
        </div>
    );
}
