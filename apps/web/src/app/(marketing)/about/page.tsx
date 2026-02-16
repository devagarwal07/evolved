"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/marketing/ScrollReveal";

const stats = [
    { value: "50K+", label: "Active Learners" },
    { value: "1M+", label: "AI Sessions" },
    { value: "98%", label: "Goal Completion" },
    { value: "150+", label: "Countries" },
];

const values = [
    {
        icon: Target,
        title: "Outcome Obsessed",
        desc: "We don't care about \"hours spent\" or \"videos watched\". We care about skills acquired and goals achieved.",
        color: "#7C3AED",
        bg: "bg-[#7C3AED]/10",
    },
    {
        icon: Zap,
        title: "Speed Matters",
        desc: "The world is moving fast. Our AI engine is designed to cut learning time in half through hyper-personalization.",
        color: "#00D4FF",
        bg: "bg-[#00D4FF]/10",
    },
    {
        icon: Globe,
        title: "Global Access",
        desc: "Intelligence is distributed equally, opportunity is not. We're fixing that bug in the system.",
        color: "#39FF14",
        bg: "bg-[#39FF14]/10",
    },
];

const team = [
    { name: "Alex Chen", role: "Co-Founder & CEO", seed: "dev1" },
    { name: "Priya Sharma", role: "Co-Founder & CTO", seed: "dev2" },
    { name: "Marcus Kim", role: "Head of AI", seed: "dev3" },
    { name: "Sofia Rivera", role: "Head of Design", seed: "dev4" },
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20">
            {/* Background orb */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#7C3AED]/8 rounded-full blur-[200px]" />
            </div>

            {/* Hero */}
            <ScrollReveal className="max-w-4xl mx-auto text-center px-6 mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00D4FF] uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3" /> Our Mission
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                    Democratizing <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#00D4FF]">
                        Elite Education.
                    </span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    We believe that high-quality, personalized mentorship shouldn&apos;t be a luxury. EvolveEd uses AI to scale the &quot;Oxford Tutorial&quot; model to everyone on the planet.
                </p>
            </ScrollReveal>

            {/* Stats */}
            <section className="py-20 border-y border-white/[0.06] bg-white/[0.01] mb-20">
                <StaggerContainer className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center" staggerDelay={0.1}>
                    {stats.map((stat, i) => (
                        <StaggerItem key={i}>
                            <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>

            {/* Values */}
            <section className="py-20 px-6 mb-20">
                <ScrollReveal className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-black text-white mb-12 text-center">
                        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Values</span>
                    </h2>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
                        {values.map((v, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.06] hover:border-[#7C3AED]/30 transition-all duration-500 group cursor-default h-full"
                                >
                                    <div className={`w-12 h-12 ${v.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/5`}>
                                        <v.icon className="w-6 h-6" style={{ color: v.color }} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{v.desc}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </ScrollReveal>
            </section>

            {/* Team */}
            <section className="py-20 px-6 bg-white/[0.01] mb-20">
                <ScrollReveal className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-black text-white mb-12">
                        Built by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A855F7]">Builders</span>
                    </h2>
                    <StaggerContainer className="flex flex-wrap justify-center gap-12" staggerDelay={0.1}>
                        {team.map((member, i) => (
                            <StaggerItem key={i}>
                                <motion.div whileHover={{ y: -4 }} className="text-center group cursor-default">
                                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-2 border-white/[0.06] shadow-xl grayscale group-hover:grayscale-0 group-hover:border-[#7C3AED]/50 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all duration-500">
                                        <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${member.seed}`} alt={member.name} />
                                    </div>
                                    <h4 className="font-bold text-white text-lg">{member.name}</h4>
                                    <p className="text-sm text-[#7C3AED] font-medium">{member.role}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </ScrollReveal>
            </section>

            {/* CTA */}
            <ScrollReveal className="py-20 px-6 text-center">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-4xl font-black text-white mb-6">
                        Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Revolution</span>
                    </h2>
                    <p className="text-slate-400 mb-10 text-lg">
                        We&apos;re hiring engineers, designers, and educators who want to change the world.
                    </p>
                    <Button size="lg" className="rounded-full px-12 py-6 text-lg font-black bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:scale-105 transition-all">
                        View Careers
                    </Button>
                </div>
            </ScrollReveal>
        </div>
    );
}
