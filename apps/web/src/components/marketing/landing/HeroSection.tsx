"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center mb-32 pt-32 relative">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 shadow-lg shadow-primary/10"
                >
                    Next-Gen Learning
                </motion.span>
                <h1 className="text-6xl font-bold leading-tight mb-6 text-white">
                    Meet Your Personal <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary animate-gradient-text bg-300% drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                        AI Tutor
                    </span>
                </h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed"
                >
                    EvolveEd adapts in real-time to your unique cognitive patterns, bridging the gap between confusion and mastery with precision guidance.
                </motion.p>
                <div className="flex items-center gap-4">
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white rounded-full font-bold shadow-[0_0_30px_rgba(192,37,244,0.4)] hover:shadow-[0_0_50px_rgba(192,37,244,0.6)] px-8 py-6 text-base group transition-all duration-300 hover:scale-105"
                    >
                        Start Learning Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 py-6 text-base font-semibold border-white/10 hover:bg-white/5 text-white hover:text-white transition-all bg-white/[0.03] backdrop-blur-sm group hover:border-white/20"
                    >
                        <Play className="w-4 h-4 mr-2 fill-current group-hover:scale-110 transition-transform" />
                        Watch Demo
                    </Button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full"
                />
                <div className="relative glass-card rounded-xl overflow-hidden border border-white/10 shadow-2xl group hover:border-primary/30 transition-all duration-500">
                    <img
                        className="w-full h-[400px] object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                        alt="Futuristic AI interface with glowing data nodes"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuANfq3fAnAMj4i6DLlMzefR2RMmfeEMKME_0AYqTqiaZH8z50vXKHAi2qyo73XcV3W5Jj7-iPEsCVMadLxWXLD3ipg7SD7UcOkLX4vPzD998IKg7Usw4vQOlYqWWNhCci8Kme9q6xtE92ziPFfWMPQyqRMejAX7EtdxJQH9r-vcagydwLFH32hAG-7A1sLOHxYKjPWlaE-UU2k7QHxPwN5i_Se0qSda1liTa53p0aywAA4iQpbMOK3ERM0w0Bz_kjfJ0rQp6w3-7EJF"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            <span className="text-sm font-mono text-slate-300 tracking-widest uppercase text-xs">System Online: Analyzing Retention</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "66%" }}
                                transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                                className="h-full bg-primary animate-pulse"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
