
"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* Left Column - Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-pink-500/10 rounded-2xl border border-pink-500/20">
                        <Mail className="w-8 h-8 text-pink-500" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Touch</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                        Have questions about EvolveEd? We'd love to hear from you. Fill out the form and we'll be in touch shortly.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <Mail className="w-5 h-5 text-pink-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Email Us</h3>
                                <p className="text-slate-400">support@evolveed.ai</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <MapPin className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Visit Us</h3>
                                <p className="text-slate-400">123 Innovation Dr, Tech City, CA</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <Phone className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Call Us</h3>
                                <p className="text-slate-400">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column - Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                    <form className="space-y-6 relative z-10">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">First Name</label>
                                <Input className="bg-black/40 border-white/10 focus:border-pink-500" placeholder="Jane" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Last Name</label>
                                <Input className="bg-black/40 border-white/10 focus:border-pink-500" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Email Address</label>
                            <Input className="bg-black/40 border-white/10 focus:border-pink-500" placeholder="jane@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Message</label>
                            <Textarea className="bg-black/40 border-white/10 focus:border-pink-500 min-h-[150px]" placeholder="Tell us how we can help..." />
                        </div>

                        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold py-6 rounded-xl shadow-lg shadow-pink-500/20">
                            Send Message <Send className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
