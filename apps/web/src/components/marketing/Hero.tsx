"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border/50 mb-8 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                            Next Gen AI Learning
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter text-white">
                        Don't Just Learn. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient-text">
                            Evolve.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 leading-relaxed">
                        The AI-powered operating system for learning. Transform information
                        into intuition with personalized tutors, smart assessments, and
                        goal-driven paths.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto px-10 py-6 rounded-full text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-primary/50 transition-all hover:scale-105"
                        >
                            Start Your Evolution
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto px-10 py-6 rounded-full text-lg font-bold bg-card/50 backdrop-blur-sm border-border hover:bg-card hover:text-white transition-all group"
                        >
                            <Play className="w-5 h-5 mr-2 fill-current group-hover:scale-110 transition-transform" />
                            Watch Demo
                        </Button>
                    </div>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-24"
                >
                    <p className="text-muted-foreground/60 font-semibold uppercase tracking-widest text-xs mb-8">
                        Trusted by 10,000+ high-performers from
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Logos using existing URLs from Stitch design */}
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhNKHFBji1fEaBEwHnaYyVQzvZ69NKrzgRPWe76h9-m7xJ3_I47ifqbKggZ6uf0IbJ0Z1_EFSzyEorh5TR5SOf7RlgU8fzxDzafWFVS-jEWHE0m89vgU1o1KDZmqdAKo1ZG2z3Irkz15g-y_6ZFboaFaFnE86YG1qdBvY9tebYRpOezX26kytQHtibfLK3Ukwz7D6SR2RmJ2e5DZyrCjBXvgGtYojmuflqWRnBW_KH9Q-vWoaKAs_fdcXKzyPKySm7QRcE5ix94BN8"
                            alt="Google"
                            className="h-8"
                        />
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoJSAm2NkxJ86YIUhfV9qmfUzkDTDRke54DENw0oFZxWreFGSCzJYAKp7MDr5JJPx8_m9BzsyK-21vBtpIYBC7-10HMjB0ntBsmZodeKpBmm7uU5Wxm2IWyq4w-SL177at4_xyIhEAEf4gQHyXIYE0MCgAPqLPDEic6dYwZBIgRuSgzLwjRjXat6qBqfjJ9r3KolvmnOcymnHOmO412H3RzTKeuOjBBMkhBvXyC0JGkUmBn1LyWLnMPS0D3dMu7R8XzwohgXnjMXHj"
                            alt="Stanford"
                            className="h-10"
                        />
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAydyAVa_sS2gWXqssJ9ArdsOpRzuSkyN7E23r1-vJtaIwulVcJCgg15WI0BHuZm19VuI8nVOThd4quUrSmNsD0c4KUkrUnn13P8-rTypBQEXtq6WspgaZGbjyhMeaA1bnQecB9J05ZKqFhSHURVAI8FBCKMD_o_UCXIiVgjAixZTVK8lvFDbCKFyzW_qK0rUCLId51CErkFvkaxrbALTiboolbnz_hnsDEV6F_61sWVVatMzCUequ8iwd89t7DY2ufpKNZ6EbriJjD"
                            alt="MIT"
                            className="h-10"
                        />
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuGTDOL4E-xgQdp22nHV1dRjJatVKH9A1Q16vDu_TnXBTUcMP1v2tdhtV0lRPtEQTRIJaMzFHTrlx7iYNLgSmj61GJQ809CLQC6rt4sBPCHJkWd2wiKGz-oBq2HLDT2OK3wUjfNlFBqcZHoBpPS4CPz2NekMzkbZKTHj2zd59_b3km-Jt3JehWTCAXHchnBpsCdt7gcqfLIPYvwshdaBpcSd9JaVFRxDPingb-n37N5w0iVhe9oERBaBG2DtkAhcUlQ_vixlfUrYQg"
                            alt="Microsoft"
                            className="h-8"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
