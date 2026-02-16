"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

const plans = [
    {
        name: "Explorer",
        price: "$0",
        frequency: "/forever",
        features: ["5 AI Tutor credits / mo", "Basic Learning Paths", "Community Access"],
        cta: "Start Free",
        popular: false,
        color: "#94a3b8",
    },
    {
        name: "Evolver",
        price: "$19",
        frequency: "/month",
        features: [
            "Unlimited AI Tutoring",
            "Custom Resource Curation",
            "Smart Practice Engine",
            "Priority Goal Processing",
        ],
        cta: "Get Pro",
        popular: true,
        color: "#7C3AED",
    },
    {
        name: "Master",
        price: "$49",
        frequency: "/month",
        features: [
            "Everything in Pro",
            "API Access for Developers",
            "1-on-1 Human Mentor Check-ins",
        ],
        cta: "Go Premium",
        popular: false,
        color: "#00D4FF",
    },
];

export function Pricing() {
    return (
        <section className="py-32 px-6 relative" id="pricing">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/5 rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                        💎 Pricing
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                        Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Pricing</span>
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Choose the path that fits your ambition.
                    </p>
                </ScrollReveal>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
                    {plans.map((plan, i) => (
                        <StaggerItem key={i}>
                            <motion.div
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className={`relative bg-white/[0.02] backdrop-blur-sm p-8 rounded-2xl border flex flex-col h-full transition-all duration-500 ${plan.popular
                                    ? "border-[#7C3AED]/50 shadow-[0_0_40px_rgba(124,58,237,0.15)]"
                                    : "border-white/[0.06] hover:border-white/[0.12]"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-8">
                                    <span className="text-5xl font-black text-white">{plan.price}</span>
                                    <span className="text-slate-500 ml-2 font-medium">{plan.frequency}</span>
                                </div>

                                <ul className="space-y-4 mb-12 flex-grow">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-3 text-slate-300">
                                            <CheckCircle2
                                                className="w-5 h-5 shrink-0"
                                                style={{ color: plan.popular ? "#7C3AED" : "#64748b" }}
                                            />
                                            <span className="text-sm leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    size="lg"
                                    className={`w-full rounded-full font-bold py-6 text-base transition-all ${plan.popular
                                        ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:scale-105"
                                        : "bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] hover:scale-105"
                                        }`}
                                >
                                    {plan.cta}
                                </Button>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
