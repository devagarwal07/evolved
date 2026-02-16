"use client";

import { motion } from "framer-motion";
import { Scale, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/marketing/ScrollReveal";

const terms = [
    { title: "1. Acceptance of Terms", content: "By accessing and using EvolveEd, you accept and agree to be bound by the terms and provision of this agreement." },
    { title: "2. Use License", content: "Permission is granted to temporarily download one copy of the materials (information or software) on EvolveEd's website for personal, non-commercial transitory viewing only." },
    { title: "3. User Accounts", content: "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer." },
    { title: "4. Intellectual Property", content: "The service and its original content, features, and functionality are and will remain the exclusive property of EvolveEd and its licensors." },
];

export default function TermsPage() {
    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Hero */}
                <ScrollReveal className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00D4FF] uppercase tracking-widest mb-6">
                        <Scale className="w-3 h-3" /> Legal
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">
                        Terms of{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7C3AED]">
                            Service
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The rules of the game. By using EvolveEd, you agree to these terms.
                    </p>
                </ScrollReveal>

                {/* Terms */}
                <StaggerContainer className="grid gap-5" staggerDelay={0.1}>
                    {terms.map((term, i) => (
                        <StaggerItem key={i}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 hover:border-[#00D4FF]/20 hover:shadow-[0_0_30px_rgba(0,212,255,0.05)] transition-all"
                            >
                                <h3 className="text-xl font-bold text-white mb-3">{term.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{term.content}</p>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </div>
    );
}
