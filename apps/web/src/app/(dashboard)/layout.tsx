"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useAuth } from "@/context/AuthContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/lib/routes";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push(ROUTES.AUTH.LOGIN);
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#050507] text-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-slate-400 font-medium animate-pulse">Initializing Learning OS...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <GamificationProvider>
            <div className="flex min-h-screen bg-[#050507] text-foreground">
                {/* Desktop Sidebar */}
                <div className="hidden md:block md:w-72 fixed h-full z-30">
                    <Sidebar className="h-full" />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col flex-1 md:pl-72 transition-all duration-300">
                    <Header />
                    <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </GamificationProvider>
    );
}

