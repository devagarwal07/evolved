"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Zap,
    BookOpen,
    Brain,
    FileText,
    Dumbbell,
    Users,
    Target,
    Settings,
    Sparkles,
    Crown,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { name: "Dashboard", href: ROUTES.DASHBOARD.ROOT, icon: LayoutDashboard },
    { name: "Learning Paths", href: ROUTES.DASHBOARD.LEARNING_PATHS, icon: BookOpen },
    { name: "AI Tutor", href: ROUTES.DASHBOARD.AI_TUTOR, icon: Brain },
    { name: "Smart Notes", href: ROUTES.DASHBOARD.SMART_NOTES, icon: FileText },
    { name: "Practice", href: ROUTES.DASHBOARD.PRACTICE, icon: Dumbbell },
    { name: "Goals", href: ROUTES.DASHBOARD.GOALS, icon: Target },
    { name: "Community", href: ROUTES.DASHBOARD.COMMUNITY, icon: Users },
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const { user } = useAuth();

    // Fallback or real data
    const xp = user?.xp || 0;
    const level = Math.floor(xp / 1000) + 1;
    const nextLevelXp = level * 1000;
    const progress = ((xp % 1000) / 1000) * 100;

    return (
        <aside className={cn("w-72 bg-[#050507] border-r border-white/[0.08] flex flex-col h-screen", className)}>
            {/* Logo */}
            <div className="p-6 pb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                    <Zap className="text-white fill-current" size={20} />
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-gradient-brand">
                        EvolveEd
                    </h1>
                    <p className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">
                        Learning OS
                    </p>
                </div>
            </div>

            {/* XP Level Bar */}
            <div className="mx-6 mt-3 mb-6 p-3 glass-card rounded-xl">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="level-badge px-2 py-0.5 rounded-full text-[10px] font-bold">
                            LVL {level}
                        </div>
                        <span className="text-xs font-medium text-slate-300">Explorer</span>
                    </div>
                    <span className="text-[10px] font-bold text-secondary">{xp.toLocaleString()} XP</span>
                </div>
                <div className="xp-bar">
                    <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-1.5">{(nextLevelXp - xp).toLocaleString()} XP to Level {level + 1}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-200 group text-sm",
                                isActive
                                    ? "bg-primary/15 text-white border border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                            )}
                        >
                            <item.icon className={cn("w-[18px] h-[18px]", isActive && "text-primary")} />
                            <span className="font-medium">{item.name}</span>
                            {item.name === "AI Tutor" && (
                                <Sparkles className="w-3 h-3 text-secondary ml-auto animate-pulse" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Pro Upgrade CTA */}
            <div className="mx-4 mb-4">
                <div className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 border border-primary/20">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Crown className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs font-bold text-white">Upgrade to Pro</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                            Unlimited AI tutor, exam simulations, and smart notes.
                        </p>
                        <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-colors glow-primary">
                            Get Pro — ₹299/mo
                        </button>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="px-4 pb-4 border-t border-white/[0.06] pt-3">
                <Link
                    href={ROUTES.DASHBOARD.SETTINGS}
                    className={cn(
                        "flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all text-sm",
                        pathname === ROUTES.DASHBOARD.SETTINGS
                            ? "bg-primary/15 text-white border border-primary/20"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    )}
                >
                    <Settings className="w-[18px] h-[18px]" />
                    <span className="font-medium">Settings</span>
                </Link>
            </div>
        </aside>
    );
}
