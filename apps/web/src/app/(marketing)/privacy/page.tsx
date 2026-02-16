"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/marketing/ScrollReveal";

const sections = [
    {
        icon: Eye,
        title: "Data Collection",
        content: "We collect only what is necessary to provide our educational services: account details, learning progress, and usage metrics.",
        color: "#7C3AED",
    },
    {
        icon: Lock,
        title: "Data Security",
        content: "Your data is encrypted at rest and in transit using industry-standard AES-256 encryption. We do not sell your personal information.",
        color: "#00D4FF",
    },
    {
        icon: FileText,
        title: "Your Rights",
        content: "You have the right to access, correct, or delete your personal data at any time through your account settings or by contacting support.",
        color: "#39FF14",
    },
];

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Hero */}
                <ScrollReveal className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#7C3AED] uppercase tracking-widest mb-6">
                        <Shield className="w-3 h-3" /> Privacy
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">
                        Privacy{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">
                            Policy
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        We value your trust. Here&apos;s how we protect your data while you master your skills.
                    </p>
                </ScrollReveal>

                {/* Sections */}
                <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                    {sections.map((section, i) => (
                        <StaggerItem key={i}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:border-[#7C3AED]/20 transition-all"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 shrink-0">
                                        <section.icon className="w-6 h-6" style={{ color: section.color }} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold mb-3 text-white">{section.title}</h2>
                                        <p className="text-slate-400 leading-relaxed text-lg">{section.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Last updated */}
                <ScrollReveal className="mt-12">
                    <div className="p-8 border-l-4 border-[#7C3AED] bg-[#7C3AED]/5 rounded-r-2xl">
                        <h3 className="text-xl font-bold text-white mb-2">Last Updated</h3>
                        <p className="text-slate-400">February 17, 2026</p>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
