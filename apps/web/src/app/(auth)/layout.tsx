import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-[#050507]">
            {/* Left Panel — Brand */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12">
                {/* Orbs */}
                <div className="absolute top-1/4 left-1/3 w-96 h-96 orb orb-primary opacity-30" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 orb orb-secondary opacity-25" style={{ animationDelay: "4s" }} />

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                        <Zap className="text-white fill-current" size={20} />
                    </div>
                    <span className="text-xl font-bold text-gradient-brand">EvolveEd</span>
                </Link>

                {/* Hero Text */}
                <div className="relative z-10 space-y-6">
                    <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
                        Don&apos;t just learn.<br />
                        <span className="text-gradient-primary">Evolve.</span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                        The AI-native operating system for learning that structures, personalizes, and adapts to how you learn best.
                    </p>
                </div>

                {/* Trust Badges */}
                <div className="relative z-10 flex items-center gap-8">
                    <div className="text-center">
                        <p className="text-2xl font-black text-white">50K+</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Learners</p>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                        <p className="text-2xl font-black text-white">4.9★</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Rating</p>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                        <p className="text-2xl font-black text-white">500+</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Topics</p>
                    </div>
                </div>
            </div>

            {/* Right Panel — Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </div>
    );
}
