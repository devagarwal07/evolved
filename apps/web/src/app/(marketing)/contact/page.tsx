"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";

const contactInfo = [
    { icon: Mail, title: "Email Us", value: "support@evolveed.ai", color: "#7C3AED" },
    { icon: MapPin, title: "Visit Us", value: "123 Innovation Dr, Tech City, CA", color: "#00D4FF" },
    { icon: Phone, title: "Call Us", value: "+1 (555) 123-4567", color: "#39FF14" },
];

export default function ContactPage() {
    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Left */}
                <ScrollReveal animation="fade-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00D4FF] uppercase tracking-widest mb-6">
                        <Sparkles className="w-3 h-3" /> Get in Touch
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">
                        Get in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A855F7]">
                            Touch
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                        Have questions about EvolveEd? We&apos;d love to hear from you. Fill out the form and we&apos;ll be in touch shortly.
                    </p>

                    <div className="space-y-6">
                        {contactInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-5"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/[0.06]">
                                    <info.icon className="w-5 h-5" style={{ color: info.color }} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">{info.title}</h3>
                                    <p className="text-slate-400 text-sm">{info.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Right - Form */}
                <ScrollReveal animation="fade-right" delay={0.2}>
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <form className="space-y-6 relative z-10">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">First Name</label>
                                    <Input className="bg-[#030305]/60 border-white/[0.06] focus:border-[#7C3AED]/50 rounded-xl text-white" placeholder="Jane" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Last Name</label>
                                    <Input className="bg-[#030305]/60 border-white/[0.06] focus:border-[#7C3AED]/50 rounded-xl text-white" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Email Address</label>
                                <Input className="bg-[#030305]/60 border-white/[0.06] focus:border-[#7C3AED]/50 rounded-xl text-white" placeholder="jane@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Message</label>
                                <Textarea className="bg-[#030305]/60 border-white/[0.06] focus:border-[#7C3AED]/50 min-h-[150px] rounded-xl text-white" placeholder="Tell us how we can help..." />
                            </div>
                            <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white font-black py-6 rounded-xl shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] transition-all hover:scale-[1.02]">
                                Send Message <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
