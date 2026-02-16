"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Trophy, TrendingUp, Calendar, Plus, Trash2, Check, Pause, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface UserGoal {
    id: string;
    name: string;
    targetDate: string | null;
    progress: number;
    status: string;
    createdAt: string;
}

interface Stats {
    xp: number;
    streak: number;
    activeGoals: number;
    completedGoals: number;
    totalPaths: number;
    totalNotes: number;
}

export default function GoalsPage() {
    const { user } = useAuth();
    const [goals, setGoals] = useState<UserGoal[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDate, setNewDate] = useState("");

    useEffect(() => {
        if (user?.id) loadData();
    }, [user?.id]);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const [goalsRes, statsRes] = await Promise.all([
                api.get("/goals"),
                api.get("/goals/stats"),
            ]);
            setGoals(goalsRes.data);
            setStats(statsRes.data);
        } catch (err) { console.error(err); }
        finally { setIsLoading(false); }
    };

    const createGoal = async () => {
        if (!newName.trim()) return;
        try {
            const res = await api.post("/goals", { name: newName.trim(), targetDate: newDate || undefined });
            setGoals(prev => [res.data, ...prev]);
            setNewName("");
            setNewDate("");
            setShowForm(false);
            loadData();
        } catch (err) { console.error(err); }
    };

    const updateGoal = async (id: string, data: Partial<UserGoal>) => {
        try {
            const res = await api.patch(`/goals/${id}`, data);
            setGoals(prev => prev.map(g => g.id === id ? res.data : g));
            loadData();
        } catch (err) { console.error(err); }
    };

    const deleteGoal = async (id: string) => {
        try {
            await api.delete(`/goals/${id}`);
            setGoals(prev => prev.filter(g => g.id !== id));
            loadData();
        } catch (err) { console.error(err); }
    };

    const activeGoals = goals.filter(g => g.status === "active");
    const completedGoals = goals.filter(g => g.status === "completed");
    const pausedGoals = goals.filter(g => g.status === "paused");

    return (
        <div className="space-y-8 max-w-5xl mx-auto p-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">My Goals</h1>
                    <p className="text-sm text-slate-500">Track your progress and set new learning milestones.</p>
                </div>
                <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl">
                    <Plus className="w-4 h-4 mr-2" /> New Goal
                </Button>
            </motion.div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-card p-5 hover:border-yellow-500/20 transition-colors">
                        <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                        <div className="text-2xl font-bold text-white">{stats.streak}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Day Streak</div>
                    </div>
                    <div className="glass-card p-5 hover:border-primary/20 transition-colors">
                        <TrendingUp className="w-6 h-6 text-primary mb-2" />
                        <div className="text-2xl font-bold text-white">{stats.xp}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total XP</div>
                    </div>
                    <div className="glass-card p-5 hover:border-emerald-500/20 transition-colors">
                        <Target className="w-6 h-6 text-emerald-500 mb-2" />
                        <div className="text-2xl font-bold text-white">{stats.activeGoals}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Active Goals</div>
                    </div>
                    <div className="glass-card p-5 hover:border-secondary/20 transition-colors">
                        <Calendar className="w-6 h-6 text-secondary mb-2" />
                        <div className="text-2xl font-bold text-white">{stats.totalPaths + stats.totalNotes}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Resources</div>
                    </div>
                </div>
            )}

            {/* Create Goal Form */}
            {showForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">Create New Goal</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)}
                            placeholder="Goal name (e.g., Master React by March)"
                            className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/40 text-sm"
                            onKeyDown={e => e.key === "Enter" && createGoal()} autoFocus />
                        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
                            className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/40 text-sm [color-scheme:dark]" />
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={createGoal} disabled={!newName.trim()} className="bg-primary hover:bg-primary/90 text-white rounded-xl">Create Goal</Button>
                        <Button onClick={() => setShowForm(false)} variant="ghost" className="text-slate-400 rounded-xl">Cancel</Button>
                    </div>
                </motion.div>
            )}

            {/* Active Goals */}
            {activeGoals.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white">Active Goals</h2>
                    {activeGoals.map((goal, i) => (
                        <motion.div key={goal.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="glass-card p-5 group hover:border-primary/20 transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/20"><Target className="w-4 h-4 text-primary" /></div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white">{goal.name}</h3>
                                        {goal.targetDate && <p className="text-[10px] text-slate-500">Due: {new Date(goal.targetDate).toLocaleDateString()}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => updateGoal(goal.id, { status: "completed" })} className="p-1.5 hover:bg-emerald-500/20 rounded-lg transition-colors" title="Complete">
                                        <Check size={14} className="text-emerald-400" />
                                    </button>
                                    <button onClick={() => updateGoal(goal.id, { status: "paused" })} className="p-1.5 hover:bg-yellow-500/20 rounded-lg transition-colors" title="Pause">
                                        <Pause size={14} className="text-yellow-400" />
                                    </button>
                                    <button onClick={() => deleteGoal(goal.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
                                        <Trash2 size={14} className="text-red-400" />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-500">Progress</span>
                                    <span className="text-primary font-bold">{Math.round(goal.progress)}%</span>
                                </div>
                                <Progress value={goal.progress} className="h-1.5 bg-white/[0.06] [&>div]:bg-primary" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Paused */}
            {pausedGoals.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-base font-bold text-slate-400">Paused</h2>
                    {pausedGoals.map(goal => (
                        <div key={goal.id} className="glass-card p-4 opacity-60 flex items-center justify-between group hover:opacity-100 transition-all">
                            <span className="text-sm text-slate-400">{goal.name}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => updateGoal(goal.id, { status: "active" })} className="p-1.5 hover:bg-primary/20 rounded-lg" title="Resume"><Play size={14} className="text-primary" /></button>
                                <button onClick={() => deleteGoal(goal.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg" title="Delete"><Trash2 size={14} className="text-red-400" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Completed */}
            {completedGoals.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-base font-bold text-emerald-400">Completed 🎉</h2>
                    {completedGoals.map(goal => (
                        <div key={goal.id} className="glass-card p-4 border-emerald-500/10 bg-emerald-500/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-emerald-400" />
                                <span className="text-sm text-emerald-300 line-through">{goal.name}</span>
                            </div>
                            <button onClick={() => deleteGoal(goal.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg opacity-30 hover:opacity-100 transition-opacity"><Trash2 size={12} className="text-red-400" /></button>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && goals.length === 0 && (
                <div className="text-center py-16 glass-card">
                    <Target size={40} className="mx-auto mb-3 text-primary/30" />
                    <h3 className="text-lg font-bold text-white mb-2">Set Your First Goal</h3>
                    <p className="text-sm text-slate-500 mb-4">Track your learning journey with measurable goals.</p>
                    <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 text-white rounded-xl"><Plus className="w-4 h-4 mr-2" /> New Goal</Button>
                </div>
            )}
        </div>
    );
}
