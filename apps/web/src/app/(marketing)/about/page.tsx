"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                        Democratizing <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Elite Education.
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        We believe that high-quality, personalized mentorship shouldn't be a luxury. EvolveEd uses AI to scale the "Oxford Tutorial" model to everyone on the planet.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 border-y border-border/50 bg-card/30">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <div className="text-4xl font-black text-white mb-2">10k+</div>
                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Active Learners</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white mb-2">500k</div>
                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">AI Sessions</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white mb-2">98%</div>
                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Goal Completion</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white mb-2">150+</div>
                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Countries</div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-16 text-center">Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-card/50 p-8 rounded-3xl border border-input hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Outcome Obsessed</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We don't care about "hours spent" or "videos watched". We care about skills acquired and goals achieved.
                            </p>
                        </div>
                        <div className="bg-card/50 p-8 rounded-3xl border border-input hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Speed Matters</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                The world is moving fast. Our AI engine is designed to cut learning time in half through hyper-personalization.
                            </p>
                        </div>
                        <div className="bg-card/50 p-8 rounded-3xl border border-input hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-500 mb-6">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Global Access</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Intelligence is distributed equally, opportunity is not. We're fixing that bug in the system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 px-6 bg-secondary/5">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-16">Built by Builders</h2>
                    <div className="flex flex-wrap justify-center gap-12">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="text-center group">
                                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-background shadow-xl grayscale group-hover:grayscale-0 transition-all">
                                    <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=dev${i}`} alt="Team Member" />
                                </div>
                                <h4 className="font-bold text-white text-lg">Alex Chen</h4>
                                <p className="text-sm text-primary font-medium">Co-Founder & CTO</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-4xl font-black text-white mb-6">Join the Revolution</h2>
                    <p className="text-muted-foreground mb-10 text-lg">
                        We're hiring engineers, designers, and educators who want to change the world.
                    </p>
                    <Button size="lg" className="rounded-full px-12 py-6 text-lg font-bold shadow-xl shadow-primary/25 hover:scale-105 transition-transform">
                        View Careers
                    </Button>
                </div>
            </section>
        </div>
    );
}
