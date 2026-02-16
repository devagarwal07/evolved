"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Trophy, PlusCircle, Sparkles, MessageSquare, Flame } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/marketing/ScrollReveal";

const challenges = [
    { title: "The Big-O Blitz", desc: "Master time complexity analysis with the community.", participants: "842+", color: "#7C3AED" },
    { title: "React Mastery Race", desc: "Build 10 real-world components in 10 days.", participants: "1.2K+", color: "#00D4FF" },
    { title: "ML Paper Reading Club", desc: "Deep dive into latest research papers together.", participants: "634+", color: "#39FF14" },
];

const leaderboard = [
    { rank: "01", name: "Julian V.", xp: "12,840 XP", color: "#FFD700" },
    { rank: "02", name: "Aria M.", xp: "11,420 XP", color: "#C0C0C0" },
    { rank: "03", name: "Dev K.", xp: "10,890 XP", color: "#CD7F32" },
];

export default function CommunityPage() {
    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto space-y-32">
                {/* Hero */}
                <ScrollReveal className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00D4FF] uppercase tracking-widest mb-4">
                        <Users className="w-3 h-3" /> Social Learning is 40% more effective
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto text-white">
                        Learn Together.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A855F7]">Evolve Together.</span>
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Unlock higher retention rates through peer teaching, collaborative solving, and AI-moderated study sessions.
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <Button className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white px-8 py-6 rounded-full font-black text-lg shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:scale-105 transition-all">
                            Start Learning With Friends
                        </Button>
                        <Button variant="outline" className="bg-white/[0.02] border-white/[0.08] text-white px-8 py-6 rounded-full font-bold text-lg hover:bg-white/[0.06] transition-all">
                            Explore Groups
                        </Button>
                    </div>
                </ScrollReveal>

                {/* Virtual Study Rooms */}
                <section className="space-y-8">
                    <ScrollReveal>
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl font-black text-white mb-2">Virtual Study Rooms</h2>
                                <p className="text-slate-400">Join a live session or create your own hub.</p>
                            </div>
                            <Button variant="outline" className="bg-[#7C3AED]/10 border-[#7C3AED]/30 text-[#7C3AED] hover:bg-[#7C3AED]/20 rounded-full font-bold">
                                <PlusCircle className="w-4 h-4 mr-2" /> Create a Study Room
                            </Button>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal animation="scale-in">
                        <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 grid lg:grid-cols-12 gap-8 border border-white/[0.06]">
                            <div className="lg:col-span-8 bg-[#030305]/60 rounded-xl border border-white/[0.06] p-6 min-h-[350px]">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-[#39FF14]/10 text-[#39FF14] rounded-full text-[10px] font-black border border-[#39FF14]/20 uppercase tracking-widest">LIVE</span>
                                    <h3 className="text-lg font-bold text-white">Organic Chemistry: Molecular Bonds</h3>
                                </div>
                                <div className="flex items-center justify-center h-[250px] text-slate-600 font-mono text-sm">[Interactive Whiteboard]</div>
                            </div>
                            <div className="lg:col-span-4 flex flex-col gap-4">
                                <div className="flex-1 bg-[#030305]/40 rounded-xl border border-white/[0.06] p-4 flex flex-col gap-4 max-h-[350px] overflow-y-auto">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF] shrink-0"><MessageSquare className="w-4 h-4" /></div>
                                        <div className="bg-[#00D4FF]/5 p-3 rounded-xl text-sm text-slate-300 border border-[#00D4FF]/10">
                                            <span className="font-bold text-[#00D4FF] block mb-1 text-xs">AI Moderator</span>
                                            Who can explain why carbon forms four covalent bonds?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </section>

                {/* Group Challenges */}
                <section className="space-y-8">
                    <ScrollReveal>
                        <h2 className="text-3xl font-black text-white">
                            Group <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Challenges</span>
                        </h2>
                    </ScrollReveal>
                    <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
                        {challenges.map((c, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white/[0.02] backdrop-blur-sm p-6 rounded-2xl border border-white/[0.06] hover:border-[#7C3AED]/30 transition-all cursor-pointer group space-y-5"
                                >
                                    <div className="h-36 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${c.color}20, transparent)` }}>
                                        <Trophy className="text-white/20 w-14 h-14" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{c.title}</h3>
                                        <p className="text-sm text-slate-400">{c.desc}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-500 font-bold">{c.participants} learners</span>
                                        <Button size="sm" className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white rounded-full font-bold text-xs px-5 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                                            Join
                                        </Button>
                                    </div>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* Leaderboard */}
                <section className="space-y-8">
                    <ScrollReveal>
                        <h2 className="text-3xl font-black text-white">
                            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">Leaderboard</span>
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal animation="scale-in">
                        <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.06]">
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.03] border-b border-white/[0.06]">
                                    <tr>
                                        <th className="px-8 py-4 font-bold text-slate-400 text-sm uppercase tracking-wider">Rank</th>
                                        <th className="px-8 py-4 font-bold text-slate-400 text-sm uppercase tracking-wider">Learner</th>
                                        <th className="px-8 py-4 font-bold text-slate-400 text-sm uppercase tracking-wider">XP Earned</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.04]">
                                    {leaderboard.map((entry, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="px-8 py-5 font-black text-white">{entry.rank}</td>
                                            <td className="px-8 py-5 font-bold text-white">{entry.name}</td>
                                            <td className="px-8 py-5 font-bold" style={{ color: entry.color }}>{entry.xp}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </section>
            </div>
        </div>
    );
}
