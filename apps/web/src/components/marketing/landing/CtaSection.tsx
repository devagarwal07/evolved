"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { motion } from "framer-motion";

export function CtaSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden p-12 md:p-20 text-center glass-card border-primary/20 group"
            >
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors duration-1000" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-1000" />

                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white relative z-10">
                    Ready to unlock your <br />
                    full potential?
                </h2>
                <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto relative z-10">
                    Experience the future of personalized education. No subscriptions, no pressure, just progress.
                </p>

                <div className="flex justify-center relative z-10">
                    <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white px-12 py-8 rounded-full text-xl font-bold shadow-2xl shadow-primary/40 hover:scale-105 transition-all duration-300 hover:shadow-primary/60"
                    >
                        <Link href={ROUTES.AUTH.SIGNUP}>
                            Try the AI Tutor Now — It&apos;s Free
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}
