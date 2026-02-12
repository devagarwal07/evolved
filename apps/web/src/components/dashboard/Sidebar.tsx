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
    Settings,
    LogOut,
    Target,
} from "lucide-react";

import { ROUTES } from "@/lib/routes";

const navItems = [
    {
        category: "Overview",
        items: [
            { name: "Dashboard", href: ROUTES.DASHBOARD.ROOT, icon: LayoutDashboard },
            { name: "My Goals", href: ROUTES.DASHBOARD.GOALS, icon: Target },
        ],
    },
    {
        category: "Learning",
        items: [
            { name: "AI Tutor", href: ROUTES.DASHBOARD.AI_TUTOR, icon: Brain },
            { name: "Learning Paths", href: ROUTES.DASHBOARD.LEARNING_PATHS, icon: BookOpen },
            { name: "Practice", href: ROUTES.DASHBOARD.PRACTICE, icon: Dumbbell },
            { name: "Smart Notes", href: ROUTES.DASHBOARD.SMART_NOTES, icon: FileText },
        ],
    },
    {
        category: "Community",
        items: [
            { name: "Community", href: ROUTES.DASHBOARD.COMMUNITY, icon: Users },
        ],
    },
    {
        category: "Settings",
        items: [
            { name: "Settings", href: ROUTES.DASHBOARD.SETTINGS, icon: Settings },
        ],
    },
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <aside className={cn("pb-12 w-64", className)}>
            <div className="space-y-4 py-4">
                <div className="px-6 py-2">
                    <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-violet-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                            <Zap className="text-white fill-current" size={16} />
                        </div>
                        <span className="text-xl font-black tracking-tight text-white">
                            Evolve<span className="text-primary">Ed</span>
                        </span>
                    </Link>
                </div>
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {navItems.map((group, i) => (
                            <div key={i} className="mb-6">
                                <h3 className="px-4 pb-2 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                                    {group.category}
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item, j) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={j}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                                                    isActive
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-muted-foreground hover:bg-muted hover:text-white"
                                                )}
                                            >
                                                <item.icon
                                                    className={cn("w-4 h-4", isActive ? "text-primary" : "")}
                                                />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-6 mt-auto absolute bottom-8 w-full">
                <button className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors w-full px-4 py-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
