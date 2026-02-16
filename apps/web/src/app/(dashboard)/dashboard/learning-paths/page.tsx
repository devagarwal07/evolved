"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Sparkles, CheckCircle, GraduationCap, Lock,
    Loader2, Plus, Trash2, Target, BookOpen,
    Clock, Play, ChevronDown, ChevronRight, Eye, ArrowLeft, SkipForward, X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import { api } from "@/lib/api";

interface Video {
    videoId: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    viewCount: number;
    duration: string;
    watched: boolean;
}

interface PathNode {
    id: string;
    title: string;
    phase: number;
    order: number;
    status: "LOCKED" | "ACTIVE" | "COMPLETED";
    resources: any;
}

interface LearningPath {
    id: string;
    topic: string;
    goal: string;
    progress: number;
    phases: any;
    nodes: PathNode[];
    createdAt: string;
}

const GOALS = [
    { value: "SKILL", label: "Master Skills", icon: GraduationCap },
    { value: "EXAM", label: "Exam Prep", icon: Target },
    { value: "INTERVIEW", label: "Job Interview", icon: BookOpen },
];

const LEVELS = ["beginner", "intermediate", "advanced"];

function formatViews(n: number): string {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
}

export default function LearningPathsPage() {
    const { user } = useAuth();
    const { showXPToast } = useGamification();
    const [paths, setPaths] = useState<LearningPath[]>([]);
    const [activePath, setActivePath] = useState<LearningPath | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [topic, setTopic] = useState("");
    const [goal, setGoal] = useState("SKILL");
    const [level, setLevel] = useState("beginner");

    // Course view state
    const [courseMode, setCourseMode] = useState(false);
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
    const [activeVideo, setActiveVideo] = useState<Video | null>(null);
    const [nodeVideos, setNodeVideos] = useState<Video[]>([]);
    const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1]));
    const [loadingVideos, setLoadingVideos] = useState(false);

    useEffect(() => {
        if (!user?.id) return;
        loadPaths();
    }, [user?.id]);

    const loadPaths = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/paths");
            setPaths(res.data);
            if (res.data.length > 0 && !activePath) setActivePath(res.data[0]);
        } catch (err) { console.error(err); }
        finally { setIsLoading(false); }
    };

    const generatePath = async () => {
        if (!topic.trim()) return;
        setIsGenerating(true);
        try {
            const res = await api.post("/paths/generate", { topic: topic.trim(), goal, level });
            setActivePath(res.data);
            setPaths(prev => [res.data, ...prev]);
            setShowForm(false);
            setTopic("");
        } catch (err) { console.error(err); }
        finally { setIsGenerating(false); }
    };

    const deletePath = async (id: string) => {
        try {
            await api.delete(`/paths/${id}`);
            setPaths(prev => prev.filter(p => p.id !== id));
            if (activePath?.id === id) {
                const remaining = paths.filter(p => p.id !== id);
                setActivePath(remaining[0] || null);
            }
        } catch (err) { console.error(err); }
    };

    // ─── Course View Functions ─────────────────────────────

    const openCourseView = useCallback(async (path: LearningPath) => {
        setActivePath(path);
        setCourseMode(true);
        // Find first active/unlocked node
        const firstActive = path.nodes.find(n => n.status === "ACTIVE") || path.nodes[0];
        if (firstActive) {
            await loadNodeVideos(path.id, firstActive);
        }
        // Expand phase of active node
        if (firstActive) {
            setExpandedPhases(new Set([firstActive.phase]));
        }
    }, []);

    const loadNodeVideos = async (pathId: string, node: PathNode) => {
        setActiveNodeId(node.id);
        setLoadingVideos(true);
        try {
            const res = await api.get(`/paths/${pathId}/nodes/${node.id}/videos`);
            const videos = res.data.videos || [];
            setNodeVideos(videos);
            // Set first unwatched video as active, or first video
            const firstUnwatched = videos.find((v: Video) => !v.watched) || videos[0];
            setActiveVideo(firstUnwatched || null);
        } catch (err) {
            // Fallback: use resources from node directly
            const videos = (node.resources?.videos || []).map((v: any) => ({
                ...v,
                watched: (node.resources?.watchedVideos || []).includes(v.videoId),
            }));
            setNodeVideos(videos);
            setActiveVideo(videos[0] || null);
        }
        finally { setLoadingVideos(false); }
    };

    const markWatched = async (videoId: string) => {
        if (!activePath || !activeNodeId) return;
        try {
            const res = await api.post(`/paths/${activePath.id}/nodes/${activeNodeId}/watched`, { videoId });
            showXPToast(10, 'Video watched');
            // Update local video state
            setNodeVideos(prev => prev.map(v => v.videoId === videoId ? { ...v, watched: true } : v));
            // Update local path progress
            setActivePath(prev => prev ? { ...prev, progress: res.data.pathProgress } : null);
            setPaths(prev => prev.map(p => p.id === activePath.id ? { ...p, progress: res.data.pathProgress } : p));
            // If all watched, refresh path data for node status updates
            if (res.data.allWatched) {
                const pathRes = await api.get(`/paths/${activePath.id}`);
                setActivePath(pathRes.data);
                setPaths(prev => prev.map(p => p.id === activePath.id ? pathRes.data : p));
            }
        } catch (err) { console.error(err); }
    };

    const playNext = () => {
        const currentIdx = nodeVideos.findIndex(v => v.videoId === activeVideo?.videoId);
        const nextUnwatched = nodeVideos.find((v, i) => i > currentIdx && !v.watched);
        if (nextUnwatched) {
            setActiveVideo(nextUnwatched);
        } else if (currentIdx < nodeVideos.length - 1) {
            setActiveVideo(nodeVideos[currentIdx + 1]);
        }
    };

    const togglePhase = (phase: number) => {
        setExpandedPhases(prev => {
            const next = new Set(prev);
            if (next.has(phase)) next.delete(phase); else next.add(phase);
            return next;
        });
    };

    // Group nodes by phase
    const phaseMap = activePath?.nodes?.reduce((acc: Record<number, PathNode[]>, node) => {
        (acc[node.phase] = acc[node.phase] || []).push(node);
        return acc;
    }, {}) || {};

    const phaseInfo = activePath?.phases?.phases || [];

    // ─── COURSE VIEW (Udemy-style) ─────────────────────────

    if (courseMode && activePath) {
        const activeNode = activePath.nodes.find(n => n.id === activeNodeId);
        const watchedCount = nodeVideos.filter(v => v.watched).length;

        return (
            <div className="flex h-[calc(100vh-80px)]">
                {/* ─ Video Player Area ─ */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Bar */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border-b border-white/[0.06]">
                        <button onClick={() => setCourseMode(false)} className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-colors">
                            <ArrowLeft size={18} className="text-slate-400" />
                        </button>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-sm font-bold text-white truncate">{activePath.topic}</h2>
                            <p className="text-[10px] text-slate-500">{activeNode?.title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-primary font-bold">{Math.round(activePath.progress)}% complete</span>
                            <div className="w-24 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${activePath.progress}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="flex-1 bg-black flex items-center justify-center">
                        {activeVideo ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${activeVideo.videoId}?rel=0&modestbranding=1`}
                                title={activeVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : loadingVideos ? (
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        ) : (
                            <div className="text-center text-slate-500">
                                <Play size={48} className="mx-auto mb-2 opacity-30" />
                                <p className="text-sm">No videos available</p>
                            </div>
                        )}
                    </div>

                    {/* Video Info Bar */}
                    {activeVideo && (
                        <div className="px-5 py-3 bg-[#0a0a0c] border-t border-white/[0.06] flex items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-white truncate">{activeVideo.title}</h3>
                                <p className="text-[10px] text-slate-500">{activeVideo.channelTitle} · {formatViews(activeVideo.viewCount)} views · {activeVideo.duration}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {activeVideo.watched ? (
                                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 font-bold">
                                        <CheckCircle size={12} /> Watched
                                    </span>
                                ) : (
                                    <Button size="sm" onClick={() => markWatched(activeVideo.videoId)} className="bg-primary hover:bg-primary/90 text-white rounded-full text-xs h-8 px-4 shadow-sm shadow-primary/20">
                                        <CheckCircle size={14} className="mr-1.5" /> Mark Complete
                                    </Button>
                                )}
                                <Button size="sm" variant="ghost" onClick={playNext} className="text-slate-400 hover:text-white rounded-full h-8">
                                    <SkipForward size={14} className="mr-1" /> Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ─ Course Sidebar ─ */}
                <div className="w-80 flex-shrink-0 border-l border-white/[0.06] flex flex-col bg-[#070709]">
                    <div className="p-4 border-b border-white/[0.06]">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Content</h3>
                        <p className="text-[10px] text-slate-600 mt-1">{activePath.nodes.length} lessons · {watchedCount}/{nodeVideos.length} videos watched</p>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {Object.entries(phaseMap).map(([phaseNum, nodes]) => {
                            const info = phaseInfo.find((p: any) => p.phase === Number(phaseNum));
                            const expanded = expandedPhases.has(Number(phaseNum));
                            const phaseCompleted = nodes.every(n => n.status === "COMPLETED");
                            return (
                                <div key={phaseNum}>
                                    <button onClick={() => togglePhase(Number(phaseNum))}
                                        className={`w-full flex items-center gap-2 px-4 py-3 text-left border-b border-white/[0.04] transition-colors ${phaseCompleted ? "bg-emerald-500/[0.03]" : "hover:bg-white/[0.02]"}`}>
                                        {expanded ? <ChevronDown size={14} className="text-slate-500 flex-shrink-0" /> : <ChevronRight size={14} className="text-slate-500 flex-shrink-0" />}
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs font-bold text-white">{info?.title || `Phase ${phaseNum}`}</span>
                                            <span className="text-[10px] text-slate-600 ml-2">{nodes.length} lessons</span>
                                        </div>
                                        {phaseCompleted && <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />}
                                    </button>
                                    {expanded && (
                                        <div className="bg-white/[0.01]">
                                            {nodes.map(node => (
                                                <button key={node.id} onClick={() => { if (node.status !== "LOCKED") loadNodeVideos(activePath.id, node); }}
                                                    disabled={node.status === "LOCKED"}
                                                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all border-l-2 ${node.id === activeNodeId
                                                        ? "border-l-primary bg-primary/5"
                                                        : node.status === "COMPLETED"
                                                            ? "border-l-emerald-500/30 hover:bg-white/[0.02]"
                                                            : node.status === "LOCKED"
                                                                ? "border-l-transparent opacity-40 cursor-not-allowed"
                                                                : "border-l-transparent hover:bg-white/[0.02]"
                                                        }`}>
                                                    {node.status === "COMPLETED" ? (
                                                        <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                                                    ) : node.status === "LOCKED" ? (
                                                        <Lock size={14} className="text-slate-600 flex-shrink-0" />
                                                    ) : (
                                                        <Play size={14} className={`flex-shrink-0 ${node.id === activeNodeId ? "text-primary" : "text-slate-400"}`} />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-xs truncate ${node.id === activeNodeId ? "text-primary font-bold" : node.status === "COMPLETED" ? "text-emerald-300" : "text-slate-300"}`}>
                                                            {node.title}
                                                        </p>
                                                        {node.resources?.estimatedHours && (
                                                            <p className="text-[10px] text-slate-600 flex items-center gap-1 mt-0.5">
                                                                <Clock size={9} /> {node.resources.estimatedHours}h · {(node.resources?.videos || []).length} videos
                                                            </p>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Video List for Active Node */}
                    <div className="border-t border-white/[0.06] max-h-64 overflow-y-auto">
                        <div className="p-3 bg-white/[0.02] border-b border-white/[0.04]">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Videos — {activeNode?.title}</h4>
                        </div>
                        {nodeVideos.map((video, i) => (
                            <button key={`${video.videoId}-${i}`} onClick={() => setActiveVideo(video)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all ${activeVideo?.videoId === video.videoId && activeVideo?.title === video.title
                                    ? "bg-primary/5 border-l-2 border-l-primary"
                                    : "hover:bg-white/[0.03] border-l-2 border-l-transparent"
                                    }`}>
                                <div className="relative w-16 h-9 rounded overflow-hidden flex-shrink-0 bg-white/[0.05]">
                                    <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                                    {video.watched && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <CheckCircle size={14} className="text-emerald-400" />
                                        </div>
                                    )}
                                    <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-black/80 text-white px-1 rounded">{video.duration}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] text-slate-300 truncate leading-tight">{video.title}</p>
                                    <p className="text-[9px] text-slate-600">{video.channelTitle} · {formatViews(video.viewCount)}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ─── PATH LIST VIEW ─────────────────────────────────────

    return (
        <div className="flex h-[calc(100vh-80px)] gap-0">
            {/* Sidebar */}
            <div className="w-72 flex-shrink-0 border-r border-white/[0.06] flex flex-col bg-white/[0.01]">
                <div className="p-4 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-white">Learning Paths</h3>
                        <button onClick={() => setShowForm(true)} className="w-8 h-8 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center text-primary transition-colors">
                            <Plus size={16} />
                        </button>
                    </div>
                    <p className="text-[11px] text-slate-500">YouTube-powered AI courses</p>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {paths.map(path => (
                        <div key={path.id} onClick={() => setActivePath(path)}
                            className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activePath?.id === path.id ? "bg-primary/10 border border-primary/20" : "hover:bg-white/[0.04] border border-transparent"}`}>
                            <GraduationCap size={16} className={activePath?.id === path.id ? "text-primary" : "text-slate-500"} />
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${activePath?.id === path.id ? "text-primary" : "text-slate-300"}`}>{path.topic}</p>
                                <p className="text-[10px] text-slate-600">{Math.round(path.progress)}% complete</p>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); deletePath(path.id); }} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded-md transition-all">
                                <Trash2 size={12} className="text-red-400" />
                            </button>
                        </div>
                    ))}
                    {paths.length === 0 && !isLoading && (
                        <div className="text-center py-12 text-slate-600">
                            <GraduationCap size={32} className="mx-auto mb-3 opacity-40" />
                            <p className="text-sm">No paths yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {showForm && (
                    <div className="p-6 border-b border-white/[0.06] bg-white/[0.02]">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Sparkles className="text-primary w-5 h-5" /> Generate Learning Path</h3>
                        <div className="space-y-4 max-w-xl">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Topic *</label>
                                <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
                                    placeholder="e.g., Machine Learning, React, Organic Chemistry"
                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/40 text-sm"
                                    onKeyDown={e => e.key === "Enter" && generatePath()} autoFocus />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Goal</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {GOALS.map(g => (
                                        <button key={g.value} onClick={() => setGoal(g.value)}
                                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${goal === g.value ? "border-primary/30 bg-primary/10 text-primary" : "border-white/[0.06] bg-white/[0.03] text-slate-400 hover:border-white/20"}`}>
                                            <g.icon size={16} className="mx-auto mb-1" /> {g.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Level</label>
                                <div className="grid grid-cols-3 gap-2 p-1 bg-white/[0.03] rounded-full border border-white/[0.06]">
                                    {LEVELS.map(l => (
                                        <button key={l} onClick={() => setLevel(l)}
                                            className={`py-2 px-3 rounded-full text-xs font-bold capitalize transition-all ${level === l ? "bg-primary text-white shadow" : "text-slate-500 hover:bg-white/[0.05]"}`}>
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={generatePath} disabled={!topic.trim() || isGenerating} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">
                                    {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4 mr-2" /> Generate Path</>}
                                </Button>
                                <Button onClick={() => setShowForm(false)} variant="ghost" className="text-slate-400 rounded-xl">Cancel</Button>
                            </div>
                        </div>
                    </div>
                )}

                {isGenerating && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 relative">
                            <Sparkles className="text-primary w-8 h-8 animate-pulse" />
                            <div className="absolute -inset-3 rounded-full border border-primary/10 animate-ping" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Generating Learning Path</h3>
                        <p className="text-sm text-slate-500">AI is building your course with YouTube videos for <span className="text-primary">{topic}</span>...</p>
                    </div>
                )}

                {activePath && !isGenerating && (
                    <div className="p-8 max-w-4xl mx-auto space-y-6">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] text-primary border border-primary/30 px-2 py-0.5 rounded-full bg-primary/10 font-bold uppercase">AI Course</span>
                                <span className="text-[10px] text-secondary border border-secondary/30 px-2 py-0.5 rounded-full bg-secondary/10 font-bold uppercase">{activePath.goal}</span>
                                <span className="text-[10px] text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full bg-red-500/10 font-bold flex items-center gap-0.5"><Play size={8} /> YouTube</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">{activePath.topic}</h2>
                                <Button onClick={() => openCourseView(activePath)} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow shadow-primary/20">
                                    <Play size={16} className="mr-2" /> Start Course
                                </Button>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${activePath.progress}%` }} />
                                </div>
                                <span className="text-sm font-bold text-primary">{Math.round(activePath.progress)}%</span>
                            </div>
                        </div>

                        {/* "Start Course" CTA */}
                        <div className="glass-card p-6 flex items-center gap-5 group hover:border-primary/20 transition-all cursor-pointer" onClick={() => openCourseView(activePath)}>
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-red-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Play className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-bold text-white">Watch Course Videos</h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    {activePath.nodes.length} lessons with curated YouTube tutorials · Track your progress as you watch
                                </p>
                            </div>
                            <ChevronRight className="text-primary" />
                        </div>

                        {/* Phases & Nodes */}
                        <div className="space-y-4">
                            {Object.entries(phaseMap).map(([phaseNum, nodes]) => {
                                const info = phaseInfo.find((p: any) => p.phase === Number(phaseNum));
                                const allCompleted = nodes.every(n => n.status === "COMPLETED");
                                const nodeCount = nodes.length;
                                const completedCount = nodes.filter(n => n.status === "COMPLETED").length;
                                return (
                                    <div key={phaseNum} className={`rounded-xl border transition-all ${allCompleted ? "bg-emerald-500/5 border-emerald-500/20" : "bg-white/[0.02] border-white/[0.06]"}`}>
                                        <div className="flex items-center gap-3 p-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${allCompleted ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-primary/10 text-primary border border-primary/20"}`}>
                                                {allCompleted ? <CheckCircle size={16} /> : phaseNum}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-bold text-white">{info?.title || `Phase ${phaseNum}`}</h3>
                                                <p className="text-[10px] text-slate-500">{completedCount}/{nodeCount} lessons · {info?.description || ""}</p>
                                            </div>
                                        </div>
                                        <div className="px-4 pb-4 space-y-1.5 ml-4">
                                            {nodes.map(node => {
                                                const videoCount = (node.resources?.videos || []).length;
                                                const watchedCount = (node.resources?.watchedVideos || []).length;
                                                return (
                                                    <div key={node.id} onClick={() => { if (node.status !== "LOCKED") openCourseView(activePath); }}
                                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${node.status === "COMPLETED" ? "bg-emerald-500/5" : node.status === "ACTIVE" ? "bg-primary/5 border border-primary/10 hover:bg-primary/10" : "opacity-50 cursor-not-allowed"}`}>
                                                        {node.status === "COMPLETED" ? (
                                                            <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
                                                        ) : node.status === "ACTIVE" ? (
                                                            <Play size={16} className="text-primary flex-shrink-0" />
                                                        ) : (
                                                            <Lock size={16} className="text-slate-600 flex-shrink-0" />
                                                        )}
                                                        <span className={`text-sm flex-1 ${node.status === "COMPLETED" ? "text-emerald-300 line-through" : node.status === "ACTIVE" ? "text-white font-medium" : "text-slate-500"}`}>
                                                            {node.title}
                                                        </span>
                                                        <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                                            {videoCount > 0 && (
                                                                <span className="flex items-center gap-0.5"><Eye size={10} /> {watchedCount}/{videoCount}</span>
                                                            )}
                                                            {node.resources?.estimatedHours && (
                                                                <span className="flex items-center gap-0.5"><Clock size={10} /> {node.resources.estimatedHours}h</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {!activePath && !isGenerating && !isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                            <GraduationCap size={32} className="text-primary/40" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">AI Learning Paths</h3>
                        <p className="text-sm text-slate-500 max-w-md mb-6">Turn any topic into a Udemy-style course with YouTube tutorials, powered by AI.</p>
                        <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">
                            <Sparkles className="w-4 h-4 mr-2" /> Generate Your First Course
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
