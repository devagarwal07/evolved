"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const steps = [
    {
        num: "01",
        title: "Define Goal",
        desc: "Tell us what you want to achieve, whether it's a new career or mastering a niche skill.",
        color: "#7C3AED",
        glow: "shadow-[0_0_30px_rgba(124,58,237,0.3)]",
    },
    {
        num: "02",
        title: "AI Mapping",
        desc: "Our engine builds a hyper-personalized roadmap tailored to your current knowledge.",
        color: "#00D4FF",
        glow: "shadow-[0_0_30px_rgba(0,212,255,0.3)]",
    },
    {
        num: "03",
        title: "Daily Growth",
        desc: "Engage with bite-sized lessons and AI tutors to evolve your understanding every single day.",
        color: "#39FF14",
        glow: "shadow-[0_0_30px_rgba(57,255,20,0.3)]",
    },
];

export function HowItWorks() {
    return (
        <section className="py-32 px-6 relative overflow-hidden" id="how-it-works">
            {/* Background subtle gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#7C3AED]/[0.02] to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                        ⚡ 3-Step Process
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Evolution</span> Process
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Master any subject in three simple steps.
                    </p>
                </ScrollReveal>

                <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Animated Connecting Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        className="hidden md:block absolute top-[3rem] left-0 w-full h-[2px] origin-left"
                        style={{ background: "linear-gradient(90deg, #7C3AED, #00D4FF, #39FF14)" }}
                    />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
                            className="relative flex-1 text-center group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 text-3xl font-black z-10 relative border border-white/10 ${step.glow} transition-all cursor-default`}
                                style={{
                                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                                    color: step.color,
                                }}
                            >
                                {step.num}
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                            <p className="text-slate-400 px-6 leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
