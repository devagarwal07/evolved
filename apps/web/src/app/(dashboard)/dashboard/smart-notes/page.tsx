"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Sparkles,
    FileText,
    Beaker,
    BookOpen,
    Lightbulb,
    AlertTriangle,
    Loader2,
    Plus,
    Trash2,
    ChevronRight,
    Link as LinkIcon,
    Hash,
    RotateCcw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import { api } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface NoteContent {
    keyConcepts: Array<{ title: string; explanation: string; importance: string }>;
    formulas: Array<{ name: string; formula: string; explanation: string }>;
    definitions: Array<{ term: string; definition: string }>;
    examples: Array<{ title: string; description: string }>;
    revisionPoints: string[];
    summary: string;
}

interface Note {
    id: string;
    title: string;
    sourceUrl?: string;
    sourceType?: string;
    content: NoteContent;
    createdAt: string;
    updatedAt: string;
}

interface NoteSummary {
    id: string;
    title: string;
    sourceUrl?: string;
    sourceType?: string;
    createdAt: string;
}

function ImportanceBadge({ level }: { level: string }) {
    const colors: Record<string, string> = {
        high: "bg-red-500/10 text-red-400 border-red-500/20",
        medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        low: "bg-green-500/10 text-green-400 border-green-500/20",
    };
    return (
        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${colors[level] || colors.medium}`}>
            {level}
        </span>
    );
}

export default function SmartNotesPage() {
    const { user } = useAuth();
    const { showXPToast } = useGamification();
    const [notes, setNotes] = useState<NoteSummary[]>([]);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showNewForm, setShowNewForm] = useState(false);
    const [topic, setTopic] = useState("");
    const [sourceUrl, setSourceUrl] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Load notes on mount
    useEffect(() => {
        if (!user?.id) return;
        loadNotes();
    }, [user?.id]);

    const loadNotes = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/notes");
            setNotes(res.data);
            if (res.data.length > 0 && !activeNote) {
                await loadNote(res.data[0].id);
            }
        } catch (err) {
            console.error("Failed to load notes:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const loadNote = async (id: string) => {
        try {
            const res = await api.get(`/notes/${id}`);
            setActiveNote(res.data);
        } catch (err) {
            console.error("Failed to load note:", err);
        }
    };

    const generateNote = async () => {
        if (!topic.trim()) return;
        setError(null);
        setIsGenerating(true);

        try {
            const res = await api.post("/notes/generate", {
                topic: topic.trim(),
                sourceUrl: sourceUrl.trim() || undefined,
                sourceType: sourceUrl.includes("youtube") ? "youtube" : sourceUrl.includes("nptel") ? "nptel" : sourceUrl ? "web" : undefined,
            });
            setActiveNote(res.data);
            showXPToast(15, 'Smart note generated');
            setNotes((prev) => [
                { id: res.data.id, title: res.data.title, sourceUrl: res.data.sourceUrl, sourceType: res.data.sourceType, createdAt: res.data.createdAt },
                ...prev,
            ]);
            setShowNewForm(false);
            setTopic("");
            setSourceUrl("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to generate notes. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const deleteNote = async (id: string) => {
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter((n) => n.id !== id));
            if (activeNote?.id === id) {
                const remaining = notes.filter((n) => n.id !== id);
                if (remaining.length > 0) {
                    await loadNote(remaining[0].id);
                } else {
                    setActiveNote(null);
                }
            }
        } catch (err) {
            console.error("Failed to delete note:", err);
        }
    };

    const content = activeNote?.content;

    return (
        <div className="flex h-[calc(100vh-80px)] gap-0">
            {/* Sidebar — Notes List */}
            <div className="w-72 flex-shrink-0 border-r border-white/[0.06] flex flex-col bg-white/[0.01]">
                <div className="p-4 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-white">Smart Notes</h3>
                        <button
                            onClick={() => setShowNewForm(true)}
                            className="w-8 h-8 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center text-primary transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <p className="text-[11px] text-slate-500">AI-generated exam-ready notes</p>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => loadNote(note.id)}
                            className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeNote?.id === note.id
                                ? "bg-primary/10 border border-primary/20"
                                : "hover:bg-white/[0.04] border border-transparent"
                                }`}
                        >
                            <FileText size={16} className={activeNote?.id === note.id ? "text-primary" : "text-slate-500"} />
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${activeNote?.id === note.id ? "text-primary" : "text-slate-300"}`}>
                                    {note.title}
                                </p>
                                <p className="text-[10px] text-slate-600">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded-md transition-all"
                            >
                                <Trash2 size={12} className="text-red-400" />
                            </button>
                        </div>
                    ))}

                    {notes.length === 0 && !isLoading && (
                        <div className="text-center py-12 text-slate-600">
                            <FileText size={32} className="mx-auto mb-3 opacity-40" />
                            <p className="text-sm">No notes yet</p>
                            <p className="text-xs mt-1">Generate your first note!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
                {/* New Note Form */}
                {showNewForm && (
                    <div className="p-6 border-b border-white/[0.06] bg-white/[0.02]">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Sparkles className="text-primary w-5 h-5" />
                            Generate New Notes
                        </h3>
                        <div className="space-y-4 max-w-xl">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Topic *</label>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., Photosynthesis, Machine Learning, Indian Constitution"
                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 text-sm"
                                    onKeyDown={(e) => e.key === "Enter" && generateNote()}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                                    Source URL <span className="text-slate-600">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={sourceUrl}
                                    onChange={(e) => setSourceUrl(e.target.value)}
                                    placeholder="e.g., https://youtube.com/watch?v=..."
                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 text-sm"
                                />
                            </div>
                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                    <AlertTriangle size={16} />
                                    {error}
                                </div>
                            )}
                            <div className="flex gap-3">
                                <Button
                                    onClick={generateNote}
                                    disabled={!topic.trim() || isGenerating}
                                    className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 disabled:opacity-50"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Generate Notes
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={() => { setShowNewForm(false); setError(null); }}
                                    variant="ghost"
                                    className="text-slate-400 hover:text-white rounded-xl"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Generating State */}
                {isGenerating && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 relative">
                            <Sparkles className="text-primary w-8 h-8 animate-pulse" />
                            <div className="absolute -inset-3 rounded-full border border-primary/10 animate-ping" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Generating Smart Notes</h3>
                        <p className="text-sm text-slate-500">AI is analyzing and structuring notes for <span className="text-primary font-medium">{topic}</span>...</p>
                        <div className="flex gap-2 mt-4">
                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0ms]" />
                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:150ms]" />
                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:300ms]" />
                        </div>
                    </div>
                )}

                {/* Active Note Display */}
                {activeNote && content && !isGenerating && (
                    <div className="p-8 max-w-4xl mx-auto space-y-8">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] text-primary border border-primary/30 px-2 py-0.5 rounded-full bg-primary/10 font-bold uppercase tracking-wider">
                                    AI Generated
                                </span>
                                {activeNote.sourceUrl && (
                                    <a href={activeNote.sourceUrl} target="_blank" rel="noopener noreferrer"
                                        className="text-[10px] text-secondary border border-secondary/30 px-2 py-0.5 rounded-full bg-secondary/10 font-bold flex items-center gap-1 hover:bg-secondary/20 transition-colors">
                                        <LinkIcon size={10} /> Source
                                    </a>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white">{activeNote.title}</h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Generated on {new Date(activeNote.createdAt).toLocaleDateString("en-US", {
                                    weekday: "long", year: "numeric", month: "long", day: "numeric"
                                })}
                            </p>
                        </div>

                        {/* Summary */}
                        {content.summary && (
                            <div className="p-5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                    <BookOpen size={16} className="text-primary" /> Summary
                                </h3>
                                <div className="text-sm text-slate-300 leading-relaxed prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.summary}</ReactMarkdown>
                                </div>
                            </div>
                        )}

                        {/* Key Concepts */}
                        {content.keyConcepts?.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <Beaker size={16} className="text-primary" /> Key Concepts
                                </h3>
                                <div className="space-y-3">
                                    {content.keyConcepts.map((concept, i) => (
                                        <div key={i} className="p-4 bg-white/[0.03] rounded-xl border-l-4 border-primary hover:bg-white/[0.05] transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-base font-bold text-white">{concept.title}</h4>
                                                <ImportanceBadge level={concept.importance} />
                                            </div>
                                            <p className="text-sm text-slate-400 leading-relaxed">{concept.explanation}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Formulas */}
                        {content.formulas?.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <Hash size={16} className="text-secondary" /> Formulas
                                </h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {content.formulas.map((formula, i) => (
                                        <div key={i} className="p-4 glass-card">
                                            <h4 className="text-sm font-bold text-white mb-2">{formula.name}</h4>
                                            <div className="bg-black/40 p-3 rounded-lg font-mono text-secondary text-center text-sm mb-2">
                                                {formula.formula}
                                            </div>
                                            <p className="text-xs text-slate-500">{formula.explanation}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Definitions */}
                        {content.definitions?.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <BookOpen size={16} className="text-emerald-400" /> Definitions
                                </h3>
                                <div className="space-y-2">
                                    {content.definitions.map((def, i) => (
                                        <div key={i} className="p-4 bg-white/[0.03] rounded-xl hover:bg-white/[0.05] transition-colors">
                                            <span className="font-bold text-white">{def.term}:</span>{" "}
                                            <span className="text-slate-400 text-sm">{def.definition}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Examples */}
                        {content.examples?.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <Lightbulb size={16} className="text-amber-400" /> Examples
                                </h3>
                                <div className="space-y-3">
                                    {content.examples.map((example, i) => (
                                        <div key={i} className="p-4 bg-white/[0.03] rounded-xl border-l-4 border-amber-500/30">
                                            <h4 className="text-sm font-bold text-white mb-1">{example.title}</h4>
                                            <p className="text-sm text-slate-400">{example.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Revision Points */}
                        {content.revisionPoints?.length > 0 && (
                            <div className="p-5 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <RotateCcw size={16} className="text-primary" /> Quick Revision Points
                                </h3>
                                <ul className="space-y-2">
                                    {content.revisionPoints.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                            <span className="text-primary font-bold mt-0.5">•</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!activeNote && !isGenerating && !isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                            <Sparkles size={32} className="text-primary/40" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Smart Notes Engine</h3>
                        <p className="text-sm text-slate-500 max-w-md mb-6">
                            Transform any topic into structured, exam-ready notes powered by AI.
                            Get key concepts, formulas, definitions, and revision points instantly.
                        </p>
                        <Button
                            onClick={() => setShowNewForm(true)}
                            className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Your First Note
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
