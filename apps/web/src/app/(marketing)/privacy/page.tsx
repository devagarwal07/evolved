
"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-[#8a2ce2]/10 rounded-2xl border border-[#8a2ce2]/20">
                        <Shield className="w-8 h-8 text-[#8a2ce2]" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8a2ce2] to-blue-500">Policy</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        We value your trust. Here's how we protect your data while you master your skills.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {[
                        {
                            icon: Eye,
                            title: "Data Collection",
                            content: "We collect only what is necessary to provide our educational services: account details, learning progress, and usage metrics."
                        },
                        {
                            icon: Lock,
                            title: "Data Security",
                            content: "Your data is encrypted at rest and in transit using industry-standard AES-256 encryption. We do not sell your personal information."
                        },
                        {
                            icon: FileText,
                            title: "Your Rights",
                            content: "You have the right to access, correct, or delete your personal data at any time through your account settings or by contacting support."
                        }
                    ].map((section, i) => (
                        <motion.section
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-xl">
                                    <section.icon className="w-6 h-6 text-[#8a2ce2]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 text-white">{section.title}</h2>
                                    <p className="text-slate-400 leading-relaxed text-lg">{section.content}</p>
                                </div>
                            </div>
                        </motion.section>
                    ))}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 p-8 border-l-4 border-[#8a2ce2] bg-[#8a2ce2]/5 rounded-r-2xl"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">Last Updated</h3>
                        <p className="text-slate-400">February 11, 2026</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
