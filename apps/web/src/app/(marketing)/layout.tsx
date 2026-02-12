import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Github, Twitter, Linkedin, Menu } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Universal Marketing Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
                <div className="pointer-events-auto bg-[#1A1A24]/80 backdrop-blur-md max-w-7xl w-full px-8 py-4 rounded-full flex justify-between items-center border border-white/10 shadow-lg">
                    <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-[#8a2ce2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="text-white w-4 h-4 fill-current" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">EvolveEd</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href={ROUTES.SHOWCASE.AI_TUTOR} className="text-sm font-medium text-slate-300 hover:text-[#8a2ce2] transition-colors">
                            AI Tutor
                        </Link>
                        <Link href={ROUTES.SHOWCASE.SMART_NOTES} className="text-sm font-medium text-slate-300 hover:text-[#8a2ce2] transition-colors">
                            Smart Notes
                        </Link>
                        <Link href={ROUTES.SHOWCASE.GOALS} className="text-sm font-medium text-slate-300 hover:text-[#8a2ce2] transition-colors">
                            Goals
                        </Link>
                        <Link href={ROUTES.COMMUNITY} className="text-sm font-medium text-slate-300 hover:text-[#8a2ce2] transition-colors">
                            Community
                        </Link>
                        <Link href={ROUTES.PRICING} className="text-sm font-medium text-slate-300 hover:text-[#8a2ce2] transition-colors">
                            Pricing
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href={ROUTES.AUTH.LOGIN} className="hidden sm:block text-sm font-medium text-white hover:text-[#8a2ce2] transition-colors">
                            Login
                        </Link>
                        <Button asChild className="bg-[#8a2ce2] hover:bg-[#8a2ce2]/90 text-white rounded-full px-6 font-bold shadow-[0_0_15px_rgba(138,44,226,0.3)]">
                            <Link href={ROUTES.AUTH.SIGNUP}>Get Started</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            {children}

            {/* Universal Footer */}
            <footer className="border-t border-white/5 bg-[#050505] py-12 px-6 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#8a2ce2] rounded-full flex items-center justify-center">
                            <Zap className="text-white w-3 h-3 fill-current" />
                        </div>
                        <span className="font-bold text-white">EvolveEd</span>
                    </div>

                    <div className="flex gap-8 text-sm text-slate-500">
                        <Link href={ROUTES.PRIVACY} className="hover:text-[#8a2ce2] transition-colors">Privacy Policy</Link>
                        <Link href={ROUTES.TERMS} className="hover:text-[#8a2ce2] transition-colors">Terms of Service</Link>
                        <Link href={ROUTES.HELP} className="hover:text-[#8a2ce2] transition-colors">Help Center</Link>
                        <Link href={ROUTES.CONTACT} className="hover:text-[#8a2ce2] transition-colors">Contact</Link>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-slate-400 hover:text-white">
                            <Twitter className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-slate-400 hover:text-white">
                            <Github className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-slate-400 hover:text-white">
                            <Linkedin className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-8 text-center text-xs text-slate-600">
                    © 2024 EvolveEd AI. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
