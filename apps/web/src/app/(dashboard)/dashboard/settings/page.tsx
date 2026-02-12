
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
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
            </motion.div>

            <div className="grid gap-8">
                {/* Profile Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-black/40 border border-white/5 rounded-2xl p-6 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#8a2ce2]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />

                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#8a2ce2]" />
                        Profile Information
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group cursor-pointer">
                                <Avatar className="w-24 h-24 border-4 border-black ring-4 ring-white/10 group-hover:ring-[#8a2ce2]/50 transition-all">
                                    <AvatarImage src="/avatar-placeholder.png" alt="User" />
                                    <AvatarFallback className="bg-slate-800 text-2xl font-bold">DA</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs text-white font-medium">Change</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 w-full">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Full Name</label>
                                    <input type="text" defaultValue="Dev Agarwal" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8a2ce2] transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Username</label>
                                    <input type="text" defaultValue="@devagarwal" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8a2ce2] transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Bio</label>
                                <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-300 min-h-[100px] focus:outline-none focus:border-[#8a2ce2] transition-colors" defaultValue="Computer Science student passionate about AI and Web Development." />
                            </div>
                            <div className="flex justify-end">
                                <Button className="bg-white/10 hover:bg-white/20 text-white">Save Changes</Button>
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
                        className="bg-black/40 border border-white/5 rounded-2xl p-6"
                    >
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-blue-500" />
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
                                        <div className="text-xs text-slate-500">{item.desc}</div>
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
                        className="bg-black/40 border border-white/5 rounded-2xl p-6"
                    >
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Moon className="w-5 h-5 text-purple-500" />
                            Appearance
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg border border-[#8a2ce2]/50 bg-[#8a2ce2]/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#0a050c] border border-white/10"></div>
                                    <span className="text-sm font-bold text-white">Evolve Dark</span>
                                </div>
                                <Check className="w-4 h-4 text-[#8a2ce2]" />
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10"></div>
                                    <span className="text-sm font-medium text-slate-400">Midnight Blue</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
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
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group">
                            <div className="flex items-center gap-4">
                                <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                    ))}

                    <button className="w-full flex items-center justify-center p-4 mt-6 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-bold text-sm gap-2">
                        <LogOut className="w-4 h-4" />
                        Log Out of All Devices
                    </button>
                </motion.section>
            </div>
        </div>
    );
}
