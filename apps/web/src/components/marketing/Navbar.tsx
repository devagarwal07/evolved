import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-md border-b border-white/5 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-violet-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                        <Zap className="text-white fill-current" size={20} />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-white">
                        Evolve<span className="text-primary">Ed</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href={ROUTES.FEATURES} className="hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link href="/#how-it-works" className="hover:text-primary transition-colors">
                        How It Works
                    </Link>
                    <Link href={ROUTES.PRICING} className="hover:text-primary transition-colors">
                        Pricing
                    </Link>
                    <Link href={ROUTES.COMMUNITY} className="hover:text-primary transition-colors">
                        Community
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href={ROUTES.AUTH.LOGIN} className="hidden md:block text-sm font-medium text-white hover:text-primary transition-colors">
                        Log in
                    </Link>
                    <Button asChild className="rounded-full font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                        <Link href={ROUTES.AUTH.SIGNUP}>Get Started</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
