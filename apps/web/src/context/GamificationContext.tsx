"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, ArrowUp } from "lucide-react";

interface XPEvent {
    id: string;
    amount: number;
    reason: string;
    leveledUp?: boolean;
    newLevel?: number;
    newBadges?: string[];
}

interface GamificationContextType {
    showXPToast: (amount: number, reason: string, extra?: { leveledUp?: boolean; newLevel?: number; newBadges?: string[] }) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<XPEvent[]>([]);

    const showXPToast = useCallback((amount: number, reason: string, extra?: { leveledUp?: boolean; newLevel?: number; newBadges?: string[] }) => {
        const id = Math.random().toString(36).slice(2);
        const event: XPEvent = { id, amount, reason, ...extra };
        setEvents(prev => [...prev, event]);

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            setEvents(prev => prev.filter(e => e.id !== id));
        }, 3000);
    }, []);

    return (
        <GamificationContext.Provider value={{ showXPToast }}>
            {children}
            {/* Toast Container — fixed bottom-right */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 40, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="pointer-events-auto"
                        >
                            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0a0a12]/95 border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.2)] backdrop-blur-md">
                                <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-secondary" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-black text-secondary">+{event.amount} XP</span>
                                        <span className="text-xs text-slate-400">{event.reason}</span>
                                    </div>
                                    {event.leveledUp && (
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <ArrowUp className="w-3 h-3 text-yellow-400" />
                                            <span className="text-[11px] font-bold text-yellow-300">Level Up! → Level {event.newLevel}</span>
                                        </div>
                                    )}
                                    {event.newBadges && event.newBadges.length > 0 && (
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <Trophy className="w-3 h-3 text-yellow-400" />
                                            <span className="text-[11px] font-bold text-yellow-300">
                                                New badge{event.newBadges.length > 1 ? 's' : ''} earned!
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </GamificationContext.Provider>
    );
}

export function useGamification() {
    const context = useContext(GamificationContext);
    if (context === undefined) {
        throw new Error("useGamification must be used within a GamificationProvider");
    }
    return context;
}
