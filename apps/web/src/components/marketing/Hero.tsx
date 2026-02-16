"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, Zap, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const ParticleField = dynamic(
    () => import("@/components/marketing/3d/ParticleField").then((m) => m.ParticleField),
    { ssr: false }
);

const FloatingBrain = dynamic(
    () => import("@/components/marketing/3d/FloatingBrain").then((m) => m.FloatingBrain),
    { ssr: false }
);

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
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
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#00D4FF] rounded-full blur-[200px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.12, 0.05] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#39FF14] rounded-full blur-[180px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 ring-1 ring-white/[0.05] shadow-lg shadow-black/20">
                                <span className="flex h-2 w-2 rounded-full bg-[#39FF14] animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D4FF]">
                                    The Operating System for Learning
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tighter text-white">
                                Don&apos;t Just Learn. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#00D4FF] animate-gradient-shift bg-[length:200%_auto]">
                                    Evolve.
                                </span>
                            </h1>

                            <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                                The first AI-native platform that structures, personalizes, and adapts content to your unique mind. From chaos to clarity in seconds.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm">
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full sm:w-auto px-10 py-7 rounded-full text-base font-black shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all hover:scale-105 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white"
                                >
                                    <Link href={ROUTES.AUTH.SIGNUP}>
                                        Start Your Evolution <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto px-10 py-7 rounded-full text-base font-bold bg-white/[0.02] backdrop-blur-sm border-white/[0.08] text-white hover:bg-white/[0.06] transition-all group"
                                >
                                    <Play className="w-4 h-4 mr-2 fill-current group-hover:scale-110 transition-transform" />
                                    Watch Demo
                                </Button>
                            </div>
                        </motion.div>

                        {/* Floating Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12"
                        >
                            {[
                                { icon: Zap, label: "50K+ Active Users", color: "#7C3AED" },
                                { icon: BookOpen, label: "1M+ Lessons", color: "#00D4FF" },
                                { icon: Users, label: "98% Satisfaction", color: "#39FF14" },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                                >
                                    <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                                    <span className="text-xs font-bold text-slate-300">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: 3D Brain */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:block"
                    >
                        <FloatingBrain />
                    </motion.div>
                </div>
            </div>

            {/* Social Proof */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-0 left-0 w-full border-t border-white/[0.04] py-8 z-10"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-6 text-center">
                        Trusted by 50,000+ high-performers from
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 hover:opacity-100 transition-opacity duration-500">
                        {["Google", "Stanford", "MIT", "Microsoft"].map((brand) => (
                            <span key={brand} className="text-xl font-black text-white tracking-tighter uppercase">{brand}</span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
