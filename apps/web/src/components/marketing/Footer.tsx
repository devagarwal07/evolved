"use client";

import Link from "next/link";
import { Zap, Twitter, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export function Footer() {
    return (
        <footer className="bg-[#050507] border-t border-white/[0.08] pt-24 pb-12 px-6 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2 space-y-6">
                        <Link href={ROUTES.HOME} className="flex items-center gap-3 group w-fit">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                                <Zap className="text-white fill-current" size={20} />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                EvolveEd
                            </span>
                        </Link>
                        <p className="text-slate-400 max-w-xs leading-relaxed text-sm">
                            The first AI-native operating system for human learning. Transform information into intuition.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Twitter, href: "#" },
                                { icon: Github, href: "#" },
                                { icon: Linkedin, href: "#" },
                                { icon: Mail, href: "#" },
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all hover:scale-110"
                                >
                                    <social.icon size={16} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Product</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href={ROUTES.FEATURES} className="hover:text-primary transition-colors flex items-center gap-1 group">Features <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li><Link href={ROUTES.SHOWCASE.AI_TUTOR} className="hover:text-primary transition-colors">AI Tutor</Link></li>
                            <li><Link href={ROUTES.PRICING} className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="/changelog" className="hover:text-primary transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href={ROUTES.ABOUT} className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href={ROUTES.PRIVACY} className="hover:text-primary transition-colors">Privacy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Support</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href={ROUTES.HELP} className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href={ROUTES.COMMUNITY} className="hover:text-primary transition-colors">Community</Link></li>
                            <li><Link href={ROUTES.CONTACT} className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.08] text-slate-600 text-xs">
                    <p>© 2026 EvolveEd Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <span>Designed with <span className="text-red-500">♥</span> for the future</span>
                        <Link href={ROUTES.PRIVACY} className="hover:text-slate-400 transition-colors">Privacy</Link>
                        <Link href={ROUTES.TERMS} className="hover:text-slate-400 transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
