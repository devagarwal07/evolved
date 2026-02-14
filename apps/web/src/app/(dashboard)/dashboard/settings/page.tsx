
"use client";

import { motion } from "framer-motion";
import { User, Bell, Lock, Globe, Moon, CreditCard, LogOut, ChevronRight, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Settings</h1>
                <p className="text-sm text-slate-500">Manage your account preferences and application settings.</p>
            </motion.div>

            <div className="grid gap-8">
                {/* Profile Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-card p-6 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 orb orb-primary opacity-10 -translate-y-1/2 translate-x-1/3" />

                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                        <User className="w-5 h-5 text-primary" />
                        Profile Information
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group cursor-pointer">
                                <Avatar className="w-24 h-24 border-4 border-[#050507] ring-4 ring-white/10 group-hover:ring-primary/30 transition-all">
                                    <AvatarImage src="/avatar-placeholder.png" alt="User" />
                                    <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">DA</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs text-white font-medium">Change</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 w-full">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Full Name</label>
                                    <input type="text" defaultValue="Dev Agarwal" className="pill-input pl-4" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Username</label>
                                    <input type="text" defaultValue="@devagarwal" className="pill-input pl-4" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Bio</label>
                                <textarea className="w-full pill-input pl-4 min-h-[100px] rounded-xl" defaultValue="Computer Science student passionate about AI and Web Development." />
                            </div>
                            <div className="flex justify-end">
                                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">Save Changes</Button>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Preferences Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Notifications */}
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-card p-6"
                    >
                        <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-secondary" />
                            Notifications
                        </h2>
                        <div className="space-y-6">
                            {[
                                { label: "Study Reminders", desc: "Get notified when it's time to learn" },
                                { label: "Goal Progress", desc: "Weekly summaries of your achievements" },
                                { label: "Community Updates", desc: "New challenge invites and friend requests" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-bold text-slate-200">{item.label}</div>
                                        <div className="text-[10px] text-slate-500">{item.desc}</div>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Appearance */}
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="glass-card p-6"
                    >
                        <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                            <Moon className="w-5 h-5 text-primary" />
                            Appearance
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl border border-primary/30 bg-primary/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#050507] border border-white/10"></div>
                                    <span className="text-sm font-bold text-white">Evolve Dark</span>
                                </div>
                                <Check className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10"></div>
                                    <span className="text-sm font-medium text-slate-400">Midnight Blue</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-black border border-white/10"></div>
                                    <span className="text-sm font-medium text-slate-400">AMOLED Black</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* Account Actions */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-2"
                >
                    {[
                        { icon: CreditCard, label: "Subscription & Billing", href: "#" },
                        { icon: Lock, label: "Privacy & Security", href: "#" },
                        { icon: Globe, label: "Language & Region", href: "#" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 glass-card hover:bg-white/[0.06] cursor-pointer transition-colors group">
                            <div className="flex items-center gap-4">
                                <item.icon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                <span className="font-medium text-slate-300 group-hover:text-white transition-colors text-sm">{item.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                    ))}

                    <button className="w-full flex items-center justify-center p-4 mt-6 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-bold text-sm gap-2 border border-transparent hover:border-red-500/20">
                        <LogOut className="w-4 h-4" />
                        Log Out of All Devices
                    </button>
                </motion.section>
            </div>
        </div>
    );
}
