"use client";

import { Button } from "@/components/ui/button";
import { Zap, CheckCircle, X, Sparkles, ShieldCheck } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-[#8c25f4]/30 selection:text-white overflow-x-hidden">
            {/* Background Orbs */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8c25f4]/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00f5ff]/10 blur-[100px] rounded-full"></div>
            </div>

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="max-w-4xl mx-auto text-center px-6 mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                        Invest in Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8c25f4] to-[#00f5ff]">Evolution</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Unlock the full potential of AI-driven learning. Choose the path that fits your journey from individual discovery to institutional mastery.
                    </p>
                    {/* Billing Toggle */}
                    <div className="mt-12 flex items-center justify-center space-x-4">
                        <span className="text-sm font-medium text-slate-400">Monthly billing</span>
                        <button className="w-16 h-8 bg-white/10 rounded-full p-1 flex items-center transition-all relative">
                            <div className="w-6 h-6 bg-[#8c25f4] rounded-full translate-x-8 transition-transform"></div>
                        </button>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-white">Annual billing</span>
                            <span className="bg-[#00f5ff]/20 text-[#00f5ff] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#00f5ff]/30 shadow-[0_0_15px_rgba(0,245,255,0.4)] uppercase tracking-wider">Save 20%</span>
                        </div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-32">
                    {/* Explorer */}
                    <div className="bg-white/[0.03] backdrop-blur-md p-8 rounded-xl border border-white/5 transition-transform hover:-translate-y-2">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">Explorer</h3>
                            <p className="text-slate-400 text-sm">For curious minds starting their journey.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-white">$0</span>
                            <span className="text-slate-400 text-sm ml-2">/forever</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="text-[#00f5ff] w-4 h-4 mr-2" />
                                5 AI Tutor Sessions /mo
                            </li>
                            <li className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="text-[#00f5ff] w-4 h-4 mr-2" />
                                Basic Smart Notes
                            </li>
                            <li className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="text-[#00f5ff] w-4 h-4 mr-2" />
                                Access to 50+ Free Courses
                            </li>
                            <li className="flex items-center text-sm text-slate-300">
                                <X className="text-slate-600 w-4 h-4 mr-2" />
                                Priority AI Response
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 border border-white/20 rounded-full text-sm font-bold hover:bg-white/5 transition-colors text-white">Start for Free</button>
                    </div>

                    {/* Evolver (Pro) */}
                    <div className="relative bg-white/[0.03] backdrop-blur-md p-10 rounded-xl border-2 border-[#8c25f4] shadow-[0_0_20px_rgba(140,37,244,0.3)] transform scale-105 z-10 bg-[#8c25f4]/5">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8c25f4] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Most Popular</div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Evolver</h3>
                            <p className="text-slate-300 text-sm">The ultimate AI-powered learning experience.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-bold text-white">$19</span>
                            <span className="text-slate-400 text-sm ml-2">/month billed annually</span>
                        </div>
                        <ul className="space-y-4 mb-10">
                            <li className="flex items-center text-sm text-slate-200">
                                <Sparkles className="text-[#8c25f4] w-4 h-4 mr-2" />
                                Unlimited AI Tutoring
                            </li>
                            <li className="flex items-center text-sm text-slate-200">
                                <Sparkles className="text-[#8c25f4] w-4 h-4 mr-2" />
                                Pro Smart Notes & Synthesis
                            </li>
                            <li className="flex items-center text-sm text-slate-200">
                                <Sparkles className="text-[#8c25f4] w-4 h-4 mr-2" />
                                Priority Response Speed
                            </li>
                            <li className="flex items-center text-sm text-slate-200">
                                <Sparkles className="text-[#8c25f4] w-4 h-4 mr-2" />
                                Curated Learning Paths
                            </li>
                            <li className="flex items-center text-sm text-slate-200">
                                <Sparkles className="text-[#8c25f4] w-4 h-4 mr-2" />
                                Offline Mode Access
                            </li>
                        </ul>
                        <button className="w-full py-4 px-6 bg-[#8c25f4] text-white rounded-full text-sm font-bold hover:bg-[#8c25f4]/90 transition-all shadow-lg shadow-[#8c25f4]/40">Get Started Now</button>
                    </div>

                    {/* Master */}
                    <div className="bg-white/[0.03] backdrop-blur-md p-8 rounded-xl border border-white/5 transition-transform hover:-translate-y-2">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">Master</h3>
                            <p className="text-slate-400 text-sm">For professionals seeking mastery.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-white">$49</span>
                            <span className="text-slate-400 text-sm ml-2">/month</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="text-[#00f5ff] w-4 h-4 mr-2" />
                                Everything in Evolver
                            </li>
                            <li className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="text-[#00f5ff] w-4 h-4 mr-2" />
                                1-on-1 Human Mentor Session
                            </li>
                            <li className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="text-[#00f5ff] w-4 h-4 mr-2" />
                                Advanced Exam Simulations
                            </li>
                            <li className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="text-[#00f5ff] w-4 h-4 mr-2" />
                                API Access for Extensions
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 border border-white/20 rounded-full text-sm font-bold hover:bg-white/5 transition-colors text-white">Go Master</button>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="max-w-6xl mx-auto px-6 mb-32">
                    <h2 className="text-3xl font-bold text-center mb-16 text-white">Compare Feature Sets</h2>
                    <div className="bg-white/[0.03] backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#120a1a]/50">
                                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-400">Features</th>
                                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-white text-center">Explorer</th>
                                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-[#8c25f4] text-center">Evolver</th>
                                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-white text-center">Master</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr>
                                    <td className="p-6 text-sm text-slate-300">AI Tutoring Sessions</td>
                                    <td className="p-6 text-sm text-center text-slate-500">5 / mo</td>
                                    <td className="p-6 text-sm text-center font-bold text-[#8c25f4]">Unlimited</td>
                                    <td className="p-6 text-sm text-center text-white">Unlimited</td>
                                </tr>
                                <tr className="bg-white/[0.02]">
                                    <td className="p-6 text-sm text-slate-300">Smart Synthesis Notes</td>
                                    <td className="p-6 text-sm text-center flex justify-center"><X className="text-slate-600 w-5 h-5" /></td>
                                    <td className="p-6 text-sm text-center"><div className="flex justify-center"><CheckCircle className="text-[#00f5ff] w-5 h-5" /></div></td>
                                    <td className="p-6 text-sm text-center"><div className="flex justify-center"><CheckCircle className="text-[#00f5ff] w-5 h-5" /></div></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm text-slate-300">Priority AI Queue</td>
                                    <td className="p-6 text-sm text-center flex justify-center"><X className="text-slate-600 w-5 h-5" /></td>
                                    <td className="p-6 text-sm text-center"><div className="flex justify-center"><CheckCircle className="text-[#00f5ff] w-5 h-5" /></div></td>
                                    <td className="p-6 text-sm text-center"><div className="flex justify-center"><CheckCircle className="text-[#00f5ff] w-5 h-5" /></div></td>
                                </tr>
                                <tr className="bg-white/[0.02]">
                                    <td className="p-6 text-sm text-slate-300">Exam Simulation Mode</td>
                                    <td className="p-6 text-sm text-center flex justify-center"><X className="text-slate-600 w-5 h-5" /></td>
                                    <td className="p-6 text-sm text-center flex justify-center"><X className="text-slate-600 w-5 h-5" /></td>
                                    <td className="p-6 text-sm text-center"><div className="flex justify-center"><CheckCircle className="text-[#00f5ff] w-5 h-5" /></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Enterprise CTA */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="bg-white/[0.03] backdrop-blur-md p-12 rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-[#8c25f4]/20 blur-[100px] -z-10"></div>
                        <div className="mb-8 md:mb-0 md:max-w-xl">
                            <h2 className="text-3xl font-bold text-white mb-4">EvolveEd for Institutions</h2>
                            <p className="text-slate-400">Scaling intelligence across your entire school or company? We offer custom deployments, LMS integration, and administrative controls.</p>
                        </div>
                        <button className="bg-white text-black hover:bg-slate-200 px-10 py-4 rounded-full text-sm font-bold transition-all transform hover:scale-105">Contact Sales</button>
                    </div>
                </section>

                {/* Trust Signal */}
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="flex items-center space-x-2 text-slate-400">
                        <ShieldCheck className="text-[#00f5ff] w-5 h-5" />
                        <span className="text-sm font-medium">30-day money-back guarantee</span>
                    </div>
                    <p className="text-xs text-slate-600 max-w-sm">No questions asked. If you're not satisfied with your evolution, we'll refund your last payment in full.</p>
                </div>
            </main>
        </div>
    );
}
