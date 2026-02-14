"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050507]">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], x: [0, 50, 0], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 ring-1 ring-white/[0.05] shadow-lg shadow-black/20">
                        <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            The Operating System for Learning
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter text-white">
                        Don&apos;t Just Learn. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary animate-gradient-text drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                            Evolve.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed">
                        The first AI-native platform that structures, personalizes, and adapts content to your unique mind. From chaos to clarity in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto px-10 py-6 rounded-full text-base font-bold shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all hover:scale-105 bg-primary hover:bg-primary/90 text-white"
                        >
                            <Link href={ROUTES.AUTH.SIGNUP}>
                                Start Your Evolution <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto px-10 py-6 rounded-full text-base font-bold bg-white/[0.02] backdrop-blur-sm border-white/[0.08] text-white hover:bg-white/[0.06] transition-all group"
                        >
                            <Play className="w-4 h-4 mr-2 fill-current group-hover:scale-110 transition-transform" />
                            Watch Demo
                        </Button>
                    </div>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-24 border-t border-white/[0.04] pt-12"
                >
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">
                        Trusted by 50,000+ high-performers from
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 hover:opacity-100 transition-opacity duration-500">
                        {/* Logos grayscale */}
                        {["Google", "Stanford", "MIT", "Microsoft"].map((brand) => (
                            <span key={brand} className="text-xl font-black text-white tracking-tighter uppercase">{brand}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
