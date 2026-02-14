"use client";

import { Bell, Search, Flame, ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { useAuth } from "@/context/AuthContext";

export function Header() {
    const { user, logout } = useAuth();
    const firstName = user?.name ? user.name.split(" ")[0] : "Learner";
    const initials = user?.name
        ? user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
        : "EV";

    return (
        <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-8 bg-[#050507]/80 backdrop-blur-xl sticky top-0 z-30">
            {/* Left: Greeting */}
            <div>
                <h2 className="text-sm font-semibold text-white">
                    Welcome back, <span className="text-gradient-primary">{firstName}</span> 👋
                </h2>
                <p className="text-[11px] text-slate-500">Ready to evolve today?</p>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        placeholder="Search topics..."
                        className="pl-9 pr-4 py-2 w-56 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>

                {/* Streak Badge */}
                <div className="streak-badge flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{user?.streak || 0}</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-white/[0.04] transition-colors">
                    <Bell className="w-4.5 h-4.5 text-slate-400" />
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                </button>

                {/* User */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/[0.04] transition-colors">
                            <Avatar className="w-8 h-8 border-2 border-primary/30">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">{initials}</AvatarFallback>
                            </Avatar>
                            <ChevronDown className="w-3 h-3 text-slate-500" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-[#0a0a0f] border-white/10">
                        <DropdownMenuItem asChild>
                            <Link href={ROUTES.DASHBOARD.SETTINGS} className="cursor-pointer">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={ROUTES.DASHBOARD.SETTINGS} className="cursor-pointer">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/[0.06]" />
                        <DropdownMenuItem
                            className="text-red-400 focus:text-red-400 cursor-pointer flex justify-between"
                            onClick={logout}
                        >
                            Sign Out
                            <LogOut className="w-3.5 h-3.5 ml-2" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
