
"use client";

import { motion } from "framer-motion";
import { Scale, CheckCircle, AlertCircle } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                        <Scale className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Service</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The rules of the game. By using EvolveEd, you agree to these terms.
                    </p>
                </motion.div>

                <div className="grid gap-6">
                    {[
                        { title: "1. Acceptance of Terms", content: "By accessing and using EvolveEd, you accept and agree to be bound by the terms and provision of this agreement." },
                        { title: "2. Use License", content: "Permission is granted to temporarily download one copy of the materials (information or software) on EvolveEd's website for personal, non-commercial transitory viewing only." },
                        { title: "3. User Accounts", content: "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer." },
                        { title: "4. Intellectual Property", content: "The service and its original content, features, and functionality are and will remain the exclusive property of EvolveEd and its licensors." }
                    ].map((term, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                        >
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                {term.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                {term.content}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
