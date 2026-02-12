"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle, Sparkles, Code, Rocket, Languages, Trophy, Flame, Send, MessageSquare, Users } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="space-y-20 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center space-y-6 pt-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                    <Users className="w-4 h-4" />
                    Social Learning is 40% more effective
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                    Learn Together.<br /><span className="text-[#c025f4]">Evolve Together.</span>
                </h1>
                <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                    Unlock higher retention rates through peer teaching, collaborative solving, and AI-moderated study sessions.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full font-bold text-lg shadow-xl shadow-primary/20">
                        Start Learning With Friends
                    </Button>
                    <Button variant="outline" className="px-8 py-6 rounded-full font-bold text-lg border-white/10 hover:bg-white/5">
                        Explore Groups
                    </Button>
                </div>
            </div>

            {/* Virtual Study Rooms */}
            <div className="space-y-8">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">Virtual Study Rooms</h2>
                        <p className="text-muted-foreground">Join a live session or create your own hub.</p>
                    </div>
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 gap-2 rounded-full">
                        <PlusCircle className="w-4 h-4" /> Create Room
                    </Button>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/5 grid lg:grid-cols-12 gap-8">
                    {/* Whiteboard / Live Session */}
                    <div className="lg:col-span-8 bg-black/40 rounded-lg border border-white/10 p-6 relative min-h-[400px] flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-[#06b6d4]/10 text-[#06b6d4] rounded-full text-xs font-bold border border-[#06b6d4]/20">LIVE</span>
                                <h3 className="text-xl font-bold text-white">Organic Chemistry: Molecular Bonds</h3>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary rounded-lg text-xs font-bold animate-pulse">
                                <Sparkles className="w-3 h-3" /> AI MODERATOR ACTIVE
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center opacity-50 border-2 border-dashed border-white/10 rounded-lg">
                            <span className="text-muted-foreground text-sm">[Interactive Whiteboard Mockup]</span>
                        </div>
                        <div className="mt-4 flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <Avatar key={i} className="border-2 border-[#1A1A24] w-10 h-10">
                                    <AvatarImage src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i + 30}`} />
                                </Avatar>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-[#1A1A24] bg-primary flex items-center justify-center text-xs font-bold text-white">+12</div>
                        </div>
                    </div>

                    {/* Chat Side */}
                    <div className="lg:col-span-4 flex flex-col gap-4 h-full">
                        <div className="flex-1 bg-black/20 rounded-lg border border-white/10 p-4 space-y-4 overflow-y-auto">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#06b6d4]/20 flex items-center justify-center text-[#06b6d4] shrink-0">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div className="bg-[#06b6d4]/10 p-3 rounded-lg text-sm text-slate-200">
                                    <span className="font-bold text-[#06b6d4] block mb-1 text-xs">AI Moderator</span>
                                    Who can explain why carbon forms four covalent bonds?
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <div className="bg-primary/20 p-3 rounded-lg text-sm text-slate-200">
                                    <span className="font-bold text-primary block mb-1 text-xs">Alex</span>
                                    It has 4 valence electrons?
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <input className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary" placeholder="Type..." />
                            <div className="absolute right-1 top-1 bg-primary p-1.5 rounded-full cursor-pointer">
                                <Send className="w-3 h-3 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Group Challenges */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight text-white">Group Challenges</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
                        <div className="h-32 mb-6 rounded-lg bg-gradient-to-br from-primary/40 to-black relative flex items-center justify-center">
                            <Code className="text-white/30 w-12 h-12" />
                            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-[#06b6d4] font-bold border border-[#06b6d4]/30">Computer Science</div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">The Big-O Blitz</h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-xs font-bold text-muted-foreground">
                                <span>Progress</span>
                                <span className="text-[#06b6d4]">72%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#06b6d4] w-[72%]"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400">842+ joined</span>
                            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/80">Join</Button>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-primary/30 shadow-lg shadow-primary/5 cursor-pointer group hover:scale-[1.02] transition-all">
                        <div className="h-32 mb-6 rounded-lg bg-gradient-to-br from-blue-600/40 to-black relative flex items-center justify-center">
                            <Rocket className="text-white/30 w-12 h-12" />
                            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-[#06b6d4] font-bold border border-[#06b6d4]/30">Physics</div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Relativity Deep Dive</h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-xs font-bold text-muted-foreground">
                                <span>Progress</span>
                                <span className="text-[#06b6d4]">15%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#06b6d4] w-[15%]"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400">2.1k joined</span>
                            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/80">Join</Button>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
                        <div className="h-32 mb-6 rounded-lg bg-gradient-to-br from-green-600/40 to-black relative flex items-center justify-center">
                            <Languages className="text-white/30 w-12 h-12" />
                            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-[#06b6d4] font-bold border border-[#06b6d4]/30">Languages</div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Global Literature Club</h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-xs font-bold text-muted-foreground">
                                <span>Progress</span>
                                <span className="text-[#06b6d4]">45%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#06b6d4] w-[45%]"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400">450 joined</span>
                            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/80">Join</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Leaderboard Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Global Leaderboard</h2>
                    <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-white">Weekly</button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-muted-foreground hover:bg-white/5">Monthly</button>
                    </div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-4 font-bold">Rank</th>
                                <th className="px-6 py-4 font-bold">Learner</th>
                                <th className="px-6 py-4 font-bold">XP</th>
                                <th className="px-6 py-4 font-bold">Streak</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-bold text-yellow-500">01</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <Avatar className="w-8 h-8"><AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=Julian" /></Avatar>
                                    <span className="font-bold text-white">Julian V.</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-[#06b6d4]">12,840 XP</td>
                                <td className="px-6 py-4 font-bold text-orange-500 flex items-center gap-1"><Flame className="w-3 h-3" /> 42 days</td>
                            </tr>
                            <tr className="bg-primary/20 border-y border-primary/50">
                                <td className="px-6 py-4 font-bold text-white">14</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <Avatar className="w-8 h-8 border border-white"><AvatarImage src="https://github.com/shadcn.png" /></Avatar>
                                    <span className="font-bold text-white">Alex Morgan (You)</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-[#06b6d4]">4,210 XP</td>
                                <td className="px-6 py-4 font-bold text-orange-500 flex items-center gap-1"><Flame className="w-3 h-3" /> 12 days</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-bold text-muted-foreground">15</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <Avatar className="w-8 h-8"><AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=Elena" /></Avatar>
                                    <span className="font-bold text-white">Elena R.</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-[#06b6d4]">4,195 XP</td>
                                <td className="px-6 py-4 font-bold text-orange-500 flex items-center gap-1"><Flame className="w-3 h-3" /> 5 days</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
