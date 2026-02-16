"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Send,
    Bot,
    User,
    Sparkles,
    BookOpen,
    Lightbulb,
    Brain,
    Plus,
    MessageSquare,
    Trash2,
    PanelLeftClose,
    PanelLeftOpen,
    RefreshCw,
    X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import { api } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    id?: string;
    role: "user" | "ai";
    content: string;
    createdAt?: string;
    failed?: boolean;
}

interface Session {
    id: string;
    topic: string;
    updatedAt: string;
    messages?: { content: string; role: string }[];
}

function formatRelativeTime(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return date.toLocaleDateString();
}

function TypingIndicator() {
    return (
        <div className="flex gap-3">
            <Avatar className="h-9 w-9 border-2 border-primary/30">
                <AvatarFallback className="bg-primary/20 text-primary">
                    <Bot size={16} />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 items-start">
                <div className="p-4 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.06]">
                    <span className="font-bold text-primary mb-1 block text-[10px] uppercase tracking-wider">
                        EvolveEd AI
                    </span>
                    <div className="flex items-center gap-1.5 py-1">
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AiTutorPage() {
    const { user } = useAuth();
    const { showXPToast } = useGamification();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showNewSessionInput, setShowNewSessionInput] = useState(false);
    const [newTopic, setNewTopic] = useState("");
    const [isInitializing, setIsInitializing] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // Load sessions on mount
    useEffect(() => {
        if (!user?.id) return;
        loadSessions();
    }, [user?.id]);

    const loadSessions = async () => {
        try {
            setIsInitializing(true);
            const res = await api.get("/tutor/sessions");
            const sessionList: Session[] = res.data;
            setSessions(sessionList);

            if (sessionList.length > 0) {
                await loadSession(sessionList[0].id);
            }
        } catch (err) {
            console.error("Failed to load sessions:", err);
        } finally {
            setIsInitializing(false);
        }
    };

    const loadSession = async (id: string) => {
        try {
            const res = await api.get(`/tutor/session/${id}`);
            const session = res.data;
            setSessionId(session.id);
            setMessages(
                session.messages.map((m: any) => ({
                    id: m.id,
                    role: m.role === "assistant" ? "ai" : "user",
                    content: m.content,
                    createdAt: m.createdAt,
                }))
            );
        } catch (err) {
            console.error("Failed to load session:", err);
        }
    };

    const createNewSession = async (topic: string) => {
        if (!topic.trim()) return;
        try {
            const res = await api.post("/tutor/session", { topic });
            const newSession = res.data;
            setSessionId(newSession.id);
            setMessages(
                newSession.messages.map((m: any) => ({
                    id: m.id,
                    role: m.role === "assistant" ? "ai" : "user",
                    content: m.content,
                    createdAt: m.createdAt,
                }))
            );
            setSessions((prev) => [
                { id: newSession.id, topic, updatedAt: new Date().toISOString(), messages: newSession.messages },
                ...prev,
            ]);
            setShowNewSessionInput(false);
            setNewTopic("");
            inputRef.current?.focus();
        } catch (err) {
            console.error("Failed to create session:", err);
        }
    };

    const deleteSession = async (id: string) => {
        try {
            await api.delete(`/tutor/session/${id}`);
            setSessions((prev) => prev.filter((s) => s.id !== id));
            if (sessionId === id) {
                const remaining = sessions.filter((s) => s.id !== id);
                if (remaining.length > 0) {
                    await loadSession(remaining[0].id);
                } else {
                    setSessionId(null);
                    setMessages([]);
                }
            }
        } catch (err) {
            console.error("Failed to delete session:", err);
        }
    };

    const handleSend = async (messageContent?: string) => {
        const text = messageContent || input;
        if (!text.trim() || !sessionId) return;

        const userMsg = text;
        setInput("");

        const tempMessage: Message = { role: "user", content: userMsg, createdAt: new Date().toISOString() };
        setMessages((prev) => [...prev, tempMessage]);
        setIsLoading(true);

        try {
            const res = await api.post("/tutor/message", {
                sessionId,
                content: userMsg,
            });

            const aiMsg = res.data;
            setMessages((prev) => [
                ...prev,
                {
                    id: aiMsg.id,
                    role: "ai",
                    content: aiMsg.content,
                    createdAt: aiMsg.createdAt,
                },
            ]);

            // Update session list order
            showXPToast(3, 'AI tutor chat');
            setSessions((prev) => {
                const updated = prev.map((s) =>
                    s.id === sessionId ? { ...s, updatedAt: new Date().toISOString() } : s
                );
                return updated.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            });
        } catch (err) {
            console.error("Failed to send message:", err);
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...updated[updated.length - 1], failed: true };
                return updated;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const retryMessage = (msg: Message) => {
        setMessages((prev) => prev.filter((m) => m !== msg));
        handleSend(msg.content);
    };

    const currentSessionTopic = sessions.find((s) => s.id === sessionId)?.topic || "General";

    if (isInitializing) {
        return (
            <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-slate-500">Loading AI Tutor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-4">
            {/* Session Sidebar */}
            {isSidebarOpen && (
                <div className="w-72 flex-shrink-0 glass-card flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                        <h3 className="font-semibold text-sm text-white">Sessions</h3>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-slate-500 hover:text-white transition-colors"
                        >
                            <PanelLeftClose size={16} />
                        </button>
                    </div>

                    <div className="p-3">
                        {showNewSessionInput ? (
                            <div className="flex gap-2">
                                <input
                                    autoFocus
                                    placeholder="Topic name..."
                                    className="flex-1 pill-input text-xs py-1.5 px-3"
                                    value={newTopic}
                                    onChange={(e) => setNewTopic(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") createNewSession(newTopic);
                                        if (e.key === "Escape") setShowNewSessionInput(false);
                                    }}
                                />
                                <Button
                                    size="icon"
                                    className="h-8 w-8 bg-primary/20 hover:bg-primary/30"
                                    onClick={() => createNewSession(newTopic)}
                                >
                                    <Plus size={14} />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                className="w-full gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs h-9"
                                onClick={() => setShowNewSessionInput(true)}
                            >
                                <Plus size={14} /> New Session
                            </Button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all text-xs ${sessionId === session.id
                                    ? "bg-primary/15 text-white border border-primary/20"
                                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                                    }`}
                                onClick={() => loadSession(session.id)}
                            >
                                <MessageSquare size={14} className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="truncate font-medium">{session.topic}</p>
                                    <p className="text-[10px] text-slate-600">{formatRelativeTime(session.updatedAt)}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteSession(session.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ))}
                        {sessions.length === 0 && (
                            <p className="text-center text-slate-600 text-xs py-8">No sessions yet. Start one!</p>
                        )}
                    </div>
                </div>
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="text-slate-500 hover:text-white transition-colors"
                            >
                                <PanelLeftOpen size={18} />
                            </button>
                        )}
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                                AI Tutor <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                            </h2>
                            <p className="text-sm text-slate-500">Your persistent AI mentor — it remembers everything.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-full text-xs">
                        <Brain className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-slate-300 font-medium">{currentSessionTopic}</span>
                    </div>
                </div>

                {/* Suggestion Chips — only show when no messages or few messages */}
                {messages.length <= 1 && (
                    <div className="flex gap-2 flex-wrap">
                        {[
                            { icon: Lightbulb, text: "Explain this topic from scratch" },
                            { icon: BookOpen, text: "Give me practice questions" },
                            { icon: Brain, text: "What are common mistakes to avoid?" },
                        ].map((chip, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    if (sessionId) {
                                        setInput(chip.text);
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-xs text-slate-400 hover:text-white hover:border-primary/20 transition-all"
                            >
                                <chip.icon className="w-3.5 h-3.5" />
                                {chip.text}
                            </button>
                        ))}
                    </div>
                )}

                {/* Chat Container */}
                <div className="flex-1 flex flex-col glass-card-elevated overflow-hidden relative">
                    {!sessionId ? (
                        /* Empty state */
                        <div className="flex-1 flex items-center justify-center p-6">
                            <div className="text-center max-w-md">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Bot className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Start a Learning Session</h3>
                                <p className="text-sm text-slate-500 mb-6">
                                    Create a new session to start learning any topic with your AI tutor.
                                </p>
                                <Button
                                    className="gap-2 bg-primary hover:bg-primary/90"
                                    onClick={() => {
                                        setIsSidebarOpen(true);
                                        setShowNewSessionInput(true);
                                    }}
                                >
                                    <Plus size={16} /> New Session
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 scroll-smooth" ref={scrollRef}>
                                <div className="space-y-6 max-w-3xl mx-auto">
                                    {messages.map((msg, i) => (
                                        <div
                                            key={msg.id || i}
                                            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                        >
                                            <Avatar
                                                className={
                                                    msg.role === "ai"
                                                        ? "h-9 w-9 border-2 border-primary/30 flex-shrink-0"
                                                        : "h-9 w-9 border-2 border-white/10 flex-shrink-0"
                                                }
                                            >
                                                <AvatarFallback
                                                    className={
                                                        msg.role === "ai" ? "bg-primary/20 text-primary" : "bg-white/[0.06]"
                                                    }
                                                >
                                                    {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div
                                                className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"
                                                    }`}
                                            >
                                                <div
                                                    className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                        ? `bg-primary/15 text-white border border-primary/10 rounded-tr-sm ${msg.failed ? "border-red-500/30" : ""
                                                        }`
                                                        : "bg-white/[0.04] border border-white/[0.06] rounded-tl-sm text-slate-200"
                                                        }`}
                                                >
                                                    {msg.role === "ai" ? (
                                                        <>
                                                            <span className="font-bold text-primary mb-2 block text-[10px] uppercase tracking-wider">
                                                                EvolveEd AI
                                                            </span>
                                                            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-semibold prose-p:text-slate-300 prose-strong:text-white prose-code:text-secondary prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-[#0d0d14] prose-pre:border prose-pre:border-white/[0.06] prose-a:text-secondary prose-li:text-slate-300 prose-blockquote:border-primary/30 prose-blockquote:text-slate-400 prose-hr:border-white/[0.06] prose-table:text-sm prose-th:text-white prose-td:text-slate-300">
                                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                                    {msg.content}
                                                                </ReactMarkdown>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        msg.content
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-slate-600 px-2">
                                                        {msg.createdAt
                                                            ? formatRelativeTime(msg.createdAt)
                                                            : "just now"}
                                                    </span>
                                                    {msg.failed && (
                                                        <button
                                                            onClick={() => retryMessage(msg)}
                                                            className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300 transition-colors"
                                                        >
                                                            <RefreshCw size={10} /> Retry
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && <TypingIndicator />}
                                    <div />
                                </div>
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-[#050507]/60 backdrop-blur-xl border-t border-white/[0.06]">
                                <div className="max-w-3xl mx-auto flex gap-3 relative">
                                    <input
                                        ref={inputRef}
                                        placeholder={`Ask anything about ${currentSessionTopic}...`}
                                        className="flex-1 pill-input pl-4 pr-12"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                                        disabled={isLoading}
                                    />
                                    <Button
                                        className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90"
                                        size="icon"
                                        onClick={() => handleSend()}
                                        disabled={isLoading || !input.trim()}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
