"use client";

import Link from "next/link";
import { Zap, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export function Navbar() {
    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
            <div className="pointer-events-auto bg-[#050507]/80 backdrop-blur-xl max-w-7xl w-full px-6 py-4 rounded-full flex justify-between items-center border border-white/[0.08] shadow-2xl shadow-black/50">
                {/* Logo */}
                <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
                        <Zap className="text-white fill-current" size={18} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                        EvolveEd
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href={ROUTES.FEATURES} className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
                        Features
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
                        How It Works
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href={ROUTES.PRICING} className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
                        Pricing
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href={ROUTES.COMMUNITY} className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
                        Community
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <Link href={ROUTES.AUTH.LOGIN} className="hidden sm:block text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
                        Log In
                    </Link>
                    <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all transform hover:-translate-y-0.5">
                        <Link href={ROUTES.AUTH.SIGNUP}>
                            Get Started <Sparkles className="w-3 h-3 ml-2 animate-pulse" />
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
