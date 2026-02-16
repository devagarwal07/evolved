"use client";

import { motion } from "framer-motion";

/**
 * Full-page ambient background with:
 * 1. Subtle dot grid overlay
 * 2. Animated aurora gradient blobs
 * 3. Floating accent orbs with slow drift
 * 4. Radial scan lines for depth
 *
 * Uses z-0 — content above must use relative z-10
 */
export function AmbientBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* Base color */}
            <div className="absolute inset-0 bg-[#030305]" />

            {/* Dot grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Aurora blob 1 — top-left violet */}
            <motion.div
                animate={{
                    x: [0, 100, -60, 0],
                    y: [0, -80, 40, 0],
                    scale: [1, 1.3, 0.9, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[15%] -left-[5%] w-[55vw] h-[55vh] rounded-full bg-[#7C3AED]/[0.15] blur-[150px]"
            />

            {/* Aurora blob 2 — mid-right cyan */}
            <motion.div
                animate={{
                    x: [0, -80, 60, 0],
                    y: [0, 100, -60, 0],
                    scale: [1, 0.85, 1.2, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute top-[25%] -right-[10%] w-[50vw] h-[50vh] rounded-full bg-[#00D4FF]/[0.08] blur-[150px]"
            />

            {/* Aurora blob 3 — bottom-center green */}
            <motion.div
                animate={{
                    x: [0, 60, -40, 0],
                    y: [0, -50, 70, 0],
                    scale: [1, 1.15, 0.85, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 6 }}
                className="absolute bottom-[10%] left-[25%] w-[40vw] h-[40vh] rounded-full bg-[#39FF14]/[0.05] blur-[200px]"
            />

            {/* Aurora blob 4 — deep violet center glow */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.08, 0.18, 0.08],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[55%] left-[35%] w-[50vw] h-[50vh] rounded-full bg-[#6D28D9] blur-[200px]"
            />

            {/* Aurora blob 5 — top-right purple accent */}
            <motion.div
                animate={{
                    x: [0, -40, 30, 0],
                    y: [0, 50, -30, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 8 }}
                className="absolute top-[5%] right-[5%] w-[30vw] h-[30vh] rounded-full bg-[#A855F7]/[0.1] blur-[160px]"
            />

            {/* Small floating accent particles */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{ y: [-20, 20, -20], x: [0, 15, 0], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] left-[25%] w-1.5 h-1.5 bg-[#7C3AED] rounded-full shadow-[0_0_8px_2px_rgba(124,58,237,0.6)]"
                />
                <motion.div
                    animate={{ y: [10, -30, 10], x: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[45%] right-[20%] w-2 h-2 bg-[#00D4FF] rounded-full shadow-[0_0_10px_3px_rgba(0,212,255,0.5)]"
                />
                <motion.div
                    animate={{ y: [-15, 25, -15], x: [5, -15, 5], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[70%] left-[60%] w-1.5 h-1.5 bg-[#39FF14] rounded-full shadow-[0_0_8px_2px_rgba(57,255,20,0.5)]"
                />
                <motion.div
                    animate={{ y: [0, -20, 0], x: [-5, 8, -5], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute top-[30%] right-[40%] w-1 h-1 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]"
                />
                <motion.div
                    animate={{ y: [15, -10, 15], x: [8, -8, 8], opacity: [0.25, 0.6, 0.25] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute top-[55%] left-[12%] w-1.5 h-1.5 bg-[#A855F7] rounded-full shadow-[0_0_8px_2px_rgba(168,85,247,0.5)]"
                />
                <motion.div
                    animate={{ y: [-10, 18, -10], x: [-6, 12, -6], opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    className="absolute top-[82%] left-[48%] w-1 h-1 bg-[#00D4FF] rounded-full shadow-[0_0_6px_2px_rgba(0,212,255,0.4)]"
                />
                <motion.div
                    animate={{ y: [12, -16, 12], x: [10, -5, 10], opacity: [0.2, 0.55, 0.2] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 7 }}
                    className="absolute top-[8%] left-[70%] w-1 h-1 bg-[#7C3AED] rounded-full shadow-[0_0_6px_2px_rgba(124,58,237,0.5)]"
                />
                <motion.div
                    animate={{ y: [-8, 22, -8], x: [-12, 6, -12], opacity: [0.3, 0.65, 0.3] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                    className="absolute top-[40%] left-[80%] w-1.5 h-1.5 bg-[#39FF14] rounded-full shadow-[0_0_8px_2px_rgba(57,255,20,0.4)]"
                />
            </div>

            {/* Horizontal scan line (subtle) */}
            <motion.div
                animate={{ y: ["-100vh", "200vh"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent"
            />
        </div>
    );
}
