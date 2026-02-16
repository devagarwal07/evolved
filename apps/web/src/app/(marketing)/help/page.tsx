"use client";

import { motion } from "framer-motion";
import { Search, HelpCircle, Book, MessageSquare, Monitor, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/marketing/ScrollReveal";

const categories = [
    { icon: Book, title: "Getting Started", desc: "Setting up your account and first learning path." },
    { icon: Monitor, title: "Dashboard Guide", desc: "Navigating your analytics and progress tracking." },
    { icon: MessageSquare, title: "Community Rules", desc: "Guidelines for participating in study rooms." },
];

export default function HelpPage() {
    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Hero */}
                <ScrollReveal className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#39FF14] uppercase tracking-widest mb-6">
                        <HelpCircle className="w-3 h-3" /> Help Center
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight text-white">
                        How can we{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#10b981]">
                            help?
                        </span>
                    </h1>

                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-0 bg-[#39FF14]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-[#39FF14] transition-colors" />
                            <Input
                                placeholder="Search articles, guides, and FAQs..."
                                className="h-14 pl-12 bg-white/[0.02] border-white/[0.06] rounded-2xl text-lg text-white placeholder:text-slate-600 focus:border-[#39FF14]/30 transition-all"
                            />
                        </div>
                    </div>
                </ScrollReveal>

                {/* Categories */}
                <StaggerContainer className="grid md:grid-cols-3 gap-5 mb-20" staggerDelay={0.1}>
                    {categories.map((card, i) => (
                        <StaggerItem key={i}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:border-[#39FF14]/20 hover:shadow-[0_0_30px_rgba(57,255,20,0.06)] transition-all cursor-pointer group h-full"
                            >
                                <div className="w-12 h-12 bg-white/[0.03] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#39FF14]/10 transition-all duration-300 border border-white/5">
                                    <card.icon className="w-6 h-6 text-slate-400 group-hover:text-[#39FF14] transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                                <p className="text-slate-400">{card.desc}</p>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Support CTA */}
                <ScrollReveal animation="scale-in">
                    <div className="text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl p-12">
                        <h2 className="text-2xl font-black text-white mb-4">Still need support?</h2>
                        <p className="text-slate-400 mb-8">Our team is available 24/7 to assist you with any issues.</p>
                        <Button className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-full px-8 py-6 text-lg font-black shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105 transition-all">
                            Contact Support
                        </Button>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
