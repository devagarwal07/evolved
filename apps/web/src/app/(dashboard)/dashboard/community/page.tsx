"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle, Sparkles, Code, Rocket, Languages, Flame, Send, Users } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="space-y-16 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center space-y-6 pt-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                    <Users className="w-4 h-4" />
                    Social Learning is 40% more effective
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                    Learn Together.<br /><span className="text-gradient-primary">Evolve Together.</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                    Unlock higher retention rates through peer teaching, collaborative solving, and AI-moderated study sessions.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl font-bold text-base shadow-xl shadow-primary/20">
                        Start Learning With Friends
                    </Button>
                    <Button variant="outline" className="px-8 py-6 rounded-xl font-bold text-base border-white/10 hover:bg-white/[0.04]">
                        Explore Groups
                    </Button>
                </div>
            </div>

            {/* Virtual Study Rooms */}
            <div className="space-y-6">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">Virtual Study Rooms</h2>
                        <p className="text-sm text-slate-500">Join a live session or create your own hub.</p>
                    </div>
                    <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 gap-2 rounded-xl">
                        <PlusCircle className="w-4 h-4" /> Create Room
                    </Button>
                </div>

                <div className="glass-card p-8 grid lg:grid-cols-12 gap-8">
                    {/* Whiteboard / Live Session */}
                    <div className="lg:col-span-8 bg-black/40 rounded-xl border border-white/10 p-6 relative min-h-[400px] flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold border border-secondary/20">LIVE</span>
                                <h3 className="text-lg font-bold text-white">Organic Chemistry: Molecular Bonds</h3>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-primary/15 text-primary rounded-lg text-[10px] font-bold animate-pulse border border-primary/15">
                                <Sparkles className="w-3 h-3" /> AI MODERATOR ACTIVE
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center opacity-50 border-2 border-dashed border-white/10 rounded-xl">
                            <span className="text-slate-600 text-sm">[Interactive Whiteboard]</span>
                        </div>
                        <div className="mt-4 flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <Avatar key={i} className="border-2 border-[#050507] w-10 h-10">
                                    <AvatarImage src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i + 30}`} />
                                </Avatar>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-[#050507] bg-primary flex items-center justify-center text-[10px] font-bold text-white">+12</div>
                        </div>
                    </div>

                    {/* Chat Side */}
                    <div className="lg:col-span-4 flex flex-col gap-4 h-full">
                        <div className="flex-1 bg-black/20 rounded-xl border border-white/[0.08] p-4 space-y-4 overflow-y-auto">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div className="bg-secondary/10 p-3 rounded-xl text-sm text-slate-200 border border-secondary/10">
                                    <span className="font-bold text-secondary block mb-1 text-[10px]">AI Moderator</span>
                                    Who can explain why carbon forms four covalent bonds?
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <div className="bg-primary/10 p-3 rounded-xl text-sm text-slate-200 border border-primary/10">
                                    <span className="font-bold text-primary block mb-1 text-[10px]">Alex</span>
                                    It has 4 valence electrons?
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <input className="w-full pill-input pl-4 pr-10 py-2.5 rounded-xl" placeholder="Type..." />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-1.5 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                                <Send className="w-3.5 h-3.5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Group Challenges */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-white">Group Challenges</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { name: "The Big-O Blitz", subject: "Computer Science", icon: Code, progress: 72, joined: "842+", gradient: "from-primary/30" },
                        { name: "Relativity Deep Dive", subject: "Physics", icon: Rocket, progress: 15, joined: "2.1k", gradient: "from-blue-600/30", featured: true },
                        { name: "Global Literature Club", subject: "Languages", icon: Languages, progress: 45, joined: "450", gradient: "from-emerald-500/30" },
                    ].map((challenge, i) => (
                        <div key={i} className={`glass-card p-6 ${challenge.featured ? "border-primary/20 shadow-lg shadow-primary/5" : ""} hover:border-primary/20 transition-all cursor-pointer group`}>
                            <div className={`h-28 mb-6 rounded-xl bg-gradient-to-br ${challenge.gradient} to-black relative flex items-center justify-center`}>
                                <challenge.icon className="text-white/20 w-10 h-10" />
                                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-secondary font-bold border border-secondary/20">{challenge.subject}</div>
                            </div>
                            <h3 className="text-base font-bold text-white mb-3">{challenge.name}</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                    <span>Progress</span>
                                    <span className="text-secondary">{challenge.progress}%</span>
                                </div>
                                <div className="xp-bar">
                                    <div className="xp-bar-fill" style={{ width: `${challenge.progress}%` }} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-500">{challenge.joined} joined</span>
                                <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/80 text-xs">Join</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leaderboard Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Global Leaderboard</h2>
                    <div className="flex glass-card p-1 rounded-full">
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-white">Weekly</button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:bg-white/[0.04]">Monthly</button>
                    </div>
                </div>
                <div className="glass-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.03] text-[10px] uppercase text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-bold">Rank</th>
                                <th className="px-6 py-4 font-bold">Learner</th>
                                <th className="px-6 py-4 font-bold">XP</th>
                                <th className="px-6 py-4 font-bold">Streak</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04] text-sm">
                            <tr className="hover:bg-white/[0.03] transition-colors">
                                <td className="px-6 py-4 font-bold text-yellow-500">01</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <Avatar className="w-8 h-8"><AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=Julian" /></Avatar>
                                    <span className="font-bold text-white">Julian V.</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-secondary">12,840 XP</td>
                                <td className="px-6 py-4 font-bold text-orange-500 flex items-center gap-1"><Flame className="w-3 h-3" /> 42 days</td>
                            </tr>
                            <tr className="bg-primary/10 border-y border-primary/20">
                                <td className="px-6 py-4 font-bold text-white">14</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <Avatar className="w-8 h-8 border border-white"><AvatarImage src="https://github.com/shadcn.png" /></Avatar>
                                    <span className="font-bold text-white">Alex Morgan (You)</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-secondary">4,210 XP</td>
                                <td className="px-6 py-4 font-bold text-orange-500 flex items-center gap-1"><Flame className="w-3 h-3" /> 12 days</td>
                            </tr>
                            <tr className="hover:bg-white/[0.03] transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-500">15</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <Avatar className="w-8 h-8"><AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=Elena" /></Avatar>
                                    <span className="font-bold text-white">Elena R.</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-secondary">4,195 XP</td>
                                <td className="px-6 py-4 font-bold text-orange-500 flex items-center gap-1"><Flame className="w-3 h-3" /> 5 days</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
