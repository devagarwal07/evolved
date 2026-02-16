"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X, Sparkles, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/marketing/ScrollReveal";

const plans = [
    {
        name: "Explorer",
        desc: "For curious minds starting their journey.",
        price: "$0",
        frequency: "/forever",
        features: [
            { text: "5 AI Tutor Sessions /mo", included: true },
            { text: "Basic Smart Notes", included: true },
            { text: "Access to 50+ Free Courses", included: true },
            { text: "Priority AI Response", included: false },
        ],
        cta: "Start for Free",
        popular: false,
    },
    {
        name: "Evolver",
        desc: "The ultimate AI-powered learning experience.",
        price: "$19",
        frequency: "/month",
        features: [
            { text: "Unlimited AI Tutoring", included: true },
            { text: "Pro Smart Notes & Synthesis", included: true },
            { text: "Priority Response Speed", included: true },
            { text: "Curated Learning Paths", included: true },
            { text: "Offline Mode Access", included: true },
        ],
        cta: "Get Started Now",
        popular: true,
    },
    {
        name: "Master",
        desc: "For professionals seeking mastery.",
        price: "$49",
        frequency: "/month",
        features: [
            { text: "Everything in Evolver", included: true },
            { text: "1-on-1 Human Mentor Session", included: true },
            { text: "Advanced Exam Simulations", included: true },
            { text: "API Access for Extensions", included: true },
        ],
        cta: "Go Master",
        popular: false,
    },
];

const comparisonRows = [
    { feature: "AI Tutoring Sessions", explorer: "5 / mo", evolver: "Unlimited", master: "Unlimited" },
    { feature: "Smart Synthesis Notes", explorer: false, evolver: true, master: true },
    { feature: "Priority AI Queue", explorer: false, evolver: true, master: true },
    { feature: "Exam Simulation Mode", explorer: false, evolver: false, master: true },
];

export default function PricingPage() {
    return (
        <div className="pt-32 pb-20">
            {/* Background orbs */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7C3AED]/10 blur-[200px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D4FF]/8 blur-[150px] rounded-full" />
            </div>

            {/* Hero */}
            <ScrollReveal className="max-w-4xl mx-auto text-center px-6 mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00D4FF] uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3" /> Transparent Pricing
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
                    Invest in Your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">
                        Evolution
                    </span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Unlock the full potential of AI-driven learning. Choose the path that fits your journey.
                </p>
            </ScrollReveal>

            {/* Pricing Cards */}
            <StaggerContainer className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-32" staggerDelay={0.15}>
                {plans.map((plan, i) => (
                    <StaggerItem key={i}>
                        <motion.div
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className={`relative bg-white/[0.02] backdrop-blur-sm p-8 rounded-2xl border flex flex-col h-full transition-all duration-500 ${plan.popular
                                    ? "border-[#7C3AED]/50 shadow-[0_0_50px_rgba(124,58,237,0.15)] md:scale-105 z-10"
                                    : "border-white/[0.06] hover:border-white/[0.12]"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                            <p className="text-sm text-slate-500 mb-6">{plan.desc}</p>
                            <div className="flex items-baseline mb-8">
                                <span className={`font-black text-white ${plan.popular ? "text-5xl" : "text-4xl"}`}>{plan.price}</span>
                                <span className="text-slate-500 text-sm ml-2">{plan.frequency}</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center text-sm text-slate-300 gap-2.5">
                                        {f.included ? (
                                            plan.popular ? (
                                                <Sparkles className="w-4 h-4 text-[#7C3AED] shrink-0" />
                                            ) : (
                                                <CheckCircle2 className="w-4 h-4 text-[#00D4FF] shrink-0" />
                                            )
                                        ) : (
                                            <X className="w-4 h-4 text-slate-600 shrink-0" />
                                        )}
                                        <span className={!f.included ? "text-slate-600" : ""}>{f.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                asChild
                                size="lg"
                                className={`w-full rounded-full font-bold py-6 text-base transition-all ${plan.popular
                                        ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:scale-105"
                                        : "bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] hover:scale-105"
                                    }`}
                            >
                                <Link href={ROUTES.AUTH.SIGNUP}>{plan.cta}</Link>
                            </Button>
                        </motion.div>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            {/* Comparison Table */}
            <ScrollReveal className="max-w-6xl mx-auto px-6 mb-32">
                <h2 className="text-3xl font-black text-center mb-12 text-white">
                    Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Feature Sets</span>
                </h2>
                <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.06]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                                <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-400">Features</th>
                                <th className="p-6 text-sm font-bold uppercase tracking-wider text-white text-center">Explorer</th>
                                <th className="p-6 text-sm font-bold uppercase tracking-wider text-center">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A855F7]">Evolver</span>
                                </th>
                                <th className="p-6 text-sm font-bold uppercase tracking-wider text-white text-center">Master</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {comparisonRows.map((row, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="p-6 text-sm text-slate-300">{row.feature}</td>
                                    <td className="p-6 text-sm text-center">
                                        {typeof row.explorer === "string" ? (
                                            <span className="text-slate-500">{row.explorer}</span>
                                        ) : row.explorer ? (
                                            <div className="flex justify-center"><CheckCircle2 className="text-[#00D4FF] w-5 h-5" /></div>
                                        ) : (
                                            <div className="flex justify-center"><X className="text-slate-600 w-5 h-5" /></div>
                                        )}
                                    </td>
                                    <td className="p-6 text-sm text-center">
                                        {typeof row.evolver === "string" ? (
                                            <span className="font-bold text-[#7C3AED]">{row.evolver}</span>
                                        ) : row.evolver ? (
                                            <div className="flex justify-center"><CheckCircle2 className="text-[#00D4FF] w-5 h-5" /></div>
                                        ) : (
                                            <div className="flex justify-center"><X className="text-slate-600 w-5 h-5" /></div>
                                        )}
                                    </td>
                                    <td className="p-6 text-sm text-center">
                                        {typeof row.master === "string" ? (
                                            <span className="text-white">{row.master}</span>
                                        ) : row.master ? (
                                            <div className="flex justify-center"><CheckCircle2 className="text-[#00D4FF] w-5 h-5" /></div>
                                        ) : (
                                            <div className="flex justify-center"><X className="text-slate-600 w-5 h-5" /></div>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ScrollReveal>

            {/* Enterprise CTA */}
            <ScrollReveal className="max-w-7xl mx-auto px-6 mb-32">
                <div className="bg-white/[0.02] backdrop-blur-sm p-12 rounded-2xl border border-white/[0.06] flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-[#7C3AED]/10 blur-[150px] -z-10" />
                    <div className="mb-8 md:mb-0 md:max-w-xl">
                        <h2 className="text-3xl font-black text-white mb-4">EvolveEd for Institutions</h2>
                        <p className="text-slate-400">Scaling intelligence across your entire school or company? We offer custom deployments, LMS integration, and administrative controls.</p>
                    </div>
                    <Button className="bg-white text-[#030305] hover:bg-slate-200 px-10 py-6 rounded-full font-bold transition-all hover:scale-105">
                        Contact Sales
                    </Button>
                </div>
            </ScrollReveal>

            {/* Trust */}
            <ScrollReveal className="flex flex-col items-center justify-center space-y-4 text-center px-6">
                <div className="flex items-center space-x-2 text-slate-400">
                    <ShieldCheck className="text-[#39FF14] w-5 h-5" />
                    <span className="text-sm font-bold">30-day money-back guarantee</span>
                </div>
                <p className="text-xs text-slate-600 max-w-sm">No questions asked. If you&apos;re not satisfied with your evolution, we&apos;ll refund your last payment in full.</p>
            </ScrollReveal>
        </div>
    );
}
