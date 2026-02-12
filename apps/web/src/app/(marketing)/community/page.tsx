"use client";

import { Button } from "@/components/ui/button";
import { Users, Video, MessageSquare, Trophy, Star, Flame, Lock, Globe, PlusCircle } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-[#0a060e] text-slate-100 font-sans selection:bg-[#8c25f4]/30 selection:text-white">
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32">
                {/* Hero Section */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8c25f4]/10 border border-[#8c25f4]/20 text-[#8c25f4] text-sm font-medium mb-4">
                        <Users className="w-4 h-4" />
                        Social Learning is 40% more effective
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter max-w-4xl mx-auto text-white">
                        Learn Together.<br /><span className="text-[#8c25f4]">Evolve Together.</span>
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Unlock higher retention rates through peer teaching, collaborative solving, and AI-moderated study sessions.
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <Button className="bg-[#8c25f4] hover:bg-[#8c25f4]/90 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(140,37,244,0.2)] transition-all transform hover:scale-105">
                            Start Learning With Friends
                        </Button>
                        <button className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/10 text-white">
                            Explore Groups
                        </button>
                    </div>
                </section>

                {/* Virtual Study Rooms */}
                <section className="space-y-12">
                    <div className="flex items-end justify-between">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold tracking-tight text-white">Virtual Study Rooms</h2>
                            <p className="text-slate-400">Join a live session or create your own hub.</p>
                        </div>
                        <button className="bg-[#8c25f4]/20 hover:bg-[#8c25f4]/30 text-[#8c25f4] border border-[#8c25f4]/30 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all">
                            <PlusCircle className="w-5 h-5" />
                            Create a Study Room
                        </button>
                    </div>
                    <div className="bg-[#191022]/60 backdrop-blur-md rounded-xl p-8 overflow-hidden grid lg:grid-cols-12 gap-8 relative border border-white/10 group">
                        {/* Whiteboard Visual Mockup */}
                        <div className="lg:col-span-8 bg-black/40 rounded-lg border border-white/10 p-6 relative min-h-[400px]">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-[#00f2ff]/10 text-[#00f2ff] rounded-full text-xs font-bold border border-[#00f2ff]/20">LIVE</span>
                                    <h3 className="text-xl font-bold text-white">Organic Chemistry: Molecular Bonds</h3>
                                </div>
                            </div>
                        </div>
                        {/* Chat Sidebar Mockup */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            <div className="flex-1 bg-black/20 rounded-lg border border-white/10 p-4 flex flex-col gap-4 overflow-y-auto max-h-[400px]">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#00f2ff]/20 flex items-center justify-center text-[#00f2ff]"><Users className="w-4 h-4" /></div>
                                    <div className="bg-[#00f2ff]/10 p-3 rounded-lg text-sm text-slate-200">
                                        <span className="font-bold text-[#00f2ff] block mb-1">AI Moderator</span>
                                        Who can explain why carbon forms four covalent bonds?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Group Challenges */}
                <section className="space-y-12">
                    <h2 className="text-4xl font-bold tracking-tight text-white">Group Challenges</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Challenge Cards */}
                        <div className="bg-[#191022]/60 backdrop-blur-md p-6 rounded-xl space-y-6 hover:border-[#8c25f4]/50 transition-all cursor-pointer border border-white/10 group">
                            <div className="h-40 rounded-lg bg-gradient-to-br from-[#8c25f4]/40 to-black overflow-hidden relative flex items-center justify-center">
                                <Trophy className="text-white/30 w-16 h-16" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">The Big-O Blitz</h3>
                                <p className="text-sm text-slate-400">Master time complexity analysis with the community.</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-[#191022] bg-slate-800 text-[10px] flex items-center justify-center font-bold text-white">842+</div>
                                </div>
                                <button className="bg-[#8c25f4] group-hover:bg-[#8c25f4]/80 text-white px-6 py-2 rounded-full font-bold text-sm transition-colors">Join</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leaderboard */}
                <section className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h2 className="text-4xl font-bold tracking-tight text-white">Global Leaderboard</h2>
                    </div>
                    <div className="bg-[#191022]/60 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-8 py-4 font-bold text-slate-400">Rank</th>
                                    <th className="px-8 py-4 font-bold text-slate-400">Learner</th>
                                    <th className="px-8 py-4 font-bold text-slate-400">XP Earned</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-8 py-4 font-bold">01</td>
                                    <td className="px-8 py-4 font-bold">Julian V.</td>
                                    <td className="px-8 py-4 font-bold text-[#00f2ff]">12,840 XP</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

