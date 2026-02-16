"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen, Zap } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const FloatingBrain = dynamic(
    () => import("@/components/marketing/3d/FloatingBrain").then((m) => m.FloatingBrain),
    { ssr: false, loading: () => <div className="w-full h-[450px] flex items-center justify-center"><div className="w-32 h-32 rounded-full bg-primary/20 blur-[60px] animate-pulse" /></div> }
);

const ParticleField = dynamic(
    () => import("@/components/marketing/3d/ParticleField").then((m) => m.ParticleField),
    { ssr: false }
);

const stats = [
    { icon: Users, label: "Active Learners", value: "10K+" },
    { icon: BookOpen, label: "Topics Covered", value: "200+" },
    { icon: Zap, label: "AI-Powered", value: "24/7" },
];

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Particle Background */}
            <ParticleField className="z-0 opacity-60" />

            {/* Gradient mesh orbs */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#7C3AED] rounded-full blur-[200px]"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#00D4FF] rounded-full blur-[200px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#39FF14] rounded-full blur-[200px] opacity-[0.05]"
                />
            </div>

            {/* Animated grid background */}
            <div
                className="absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.3) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 pt-32 pb-16">
                {/* Left: Text */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7C3AED]/15 to-[#00D4FF]/15 border border-[#7C3AED]/30 text-sm font-semibold text-[#00D4FF] shadow-[0_0_30px_rgba(124,58,237,0.15)]">
                            <Sparkles className="w-3.5 h-3.5" />
                            Next-Gen AI Learning Platform
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight"
                    >
                        <span className="text-white">Learn </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#00D4FF] animate-gradient-shift bg-[length:200%_auto]">
                            Smarter
                        </span>
                        <br />
                        <span className="text-white">with </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#39FF14] to-[#00D4FF] animate-gradient-shift bg-[length:200%_auto]">
                            AI Power
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed"
                    >
                        EvolveEd adapts to your cognitive patterns in real-time,
                        building personalized paths from confusion to mastery with
                        precision AI guidance.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="relative bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white rounded-full font-bold px-8 py-6 text-base group transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] overflow-hidden"
                        >
                            <Link href={ROUTES.AUTH.SIGNUP}>
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Learning Free
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-6 text-base font-semibold border-white/10 hover:bg-white/5 text-white hover:text-white transition-all bg-white/[0.03] backdrop-blur-sm group hover:border-[#00D4FF]/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]"
                        >
                            <Link href={ROUTES.AUTH.LOGIN}>
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#39FF14] shadow-[0_0_10px_rgba(57,255,20,0.5)] animate-pulse" />
                                    Log In
                                </span>
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex gap-8 mt-12 pt-8 border-t border-white/5"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <stat.icon className="w-4 h-4 text-[#00D4FF]" />
                                </div>
                                <div>
                                    <div className="text-lg font-black text-white">{stat.value}</div>
                                    <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Right: 3D Brain */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative"
                >
                    <FloatingBrain />
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030305] to-transparent z-10" />
        </section>
    );
}
