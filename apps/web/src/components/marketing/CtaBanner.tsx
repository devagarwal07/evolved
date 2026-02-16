"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const ParticleField = dynamic(
    () => import("@/components/marketing/3d/ParticleField").then((m) => m.ParticleField),
    { ssr: false }
);

export function CtaBanner() {
    return (
        <section className="py-32 px-6">
            <ScrollReveal animation="scale-in">
                <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden p-12 md:p-20 text-center bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] group">
                    {/* Particle background */}
                    <ParticleField className="opacity-40" />

                    {/* Gradient orbs */}
                    <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#7C3AED]/20 blur-[150px] rounded-full group-hover:bg-[#7C3AED]/30 transition-colors duration-1000 pointer-events-none" />
                    <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#00D4FF]/15 blur-[150px] rounded-full group-hover:bg-[#00D4FF]/25 transition-colors duration-1000 pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#39FF14]/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00D4FF] uppercase tracking-widest mb-8"
                        >
                            <Sparkles className="w-3 h-3" />
                            Free to Start
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
                            Ready to <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#00D4FF] to-[#39FF14] animate-gradient-shift bg-[length:200%_auto]">
                                Evolve?
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
                            Join thousands of students and professionals who have unlocked their
                            peak cognitive potential.
                        </p>

                        <Button
                            asChild
                            size="lg"
                            className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white px-12 py-8 rounded-full text-xl font-black shadow-[0_0_50px_rgba(124,58,237,0.4)] hover:shadow-[0_0_80px_rgba(124,58,237,0.6)] hover:scale-105 transition-all duration-300"
                        >
                            <Link href={ROUTES.AUTH.SIGNUP}>
                                Get Started Now
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}
