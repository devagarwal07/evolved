
"use client";

import { motion } from "framer-motion";
import { Search, HelpCircle, Book, MessageSquare, Monitor } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                        <HelpCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
                        How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">help?</span>
                    </h1>

                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                            <Input
                                placeholder="Search articles, guides, and FAQs..."
                                className="h-14 pl-12 bg-white/5 border-white/10 rounded-2xl text-lg text-white placeholder:text-slate-500 focus:border-green-500/50 focus:ring-green-500/20 transition-all"
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    {[
                        { icon: Book, title: "Getting Started", desc: "Setting up your account and first learning path." },
                        { icon: Monitor, title: "Dashboard Guide", desc: "Navigating your analytics and progress tracking." },
                        { icon: MessageSquare, title: "Community Rules", desc: "Guidelines for participating in study rooms." },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all cursor-pointer group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-500/20">
                                <card.icon className="w-6 h-6 text-slate-300 group-hover:text-green-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                            <p className="text-slate-400">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-3xl p-12"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Still need support?</h2>
                    <p className="text-slate-400 mb-8">Our team is available 24/7 to assist you with any issues.</p>
                    <Button className="bg-green-600 hover:bg-green-500 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-green-500/20">
                        Contact Support
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
