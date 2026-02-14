"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles, BookOpen, Lightbulb, Brain } from "lucide-react";

export default function AiTutorPage() {
    const [messages, setMessages] = useState([
        {
            role: "ai",
            content:
                "Hello Alex! I'm your AI Tutor. I see you're working on Machine Learning — specifically Decision Trees. Ready to explore Random Forests next, or should we review ensemble methods first?",
        },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: "user", content: input }]);
        setInput("");
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content:
                        "Great question! Random Forests work by creating multiple decision trees and averaging their predictions. The key insight is that each tree sees a random subset of features, which reduces overfitting...",
                },
            ]);
        }, 1000);
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        AI Tutor <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    </h2>
                    <p className="text-sm text-slate-500">
                        Your persistent AI mentor — it remembers everything.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-full text-xs">
                        <Brain className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-slate-300 font-medium">Machine Learning</span>
                    </div>
                    <Button variant="outline" className="gap-2 rounded-xl border-white/10 hover:bg-white/[0.04]">
                        New Session
                    </Button>
                </div>
            </div>

            {/* Suggestion chips */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { icon: Lightbulb, text: "Explain Random Forests" },
                    { icon: BookOpen, text: "Quiz me on Decision Trees" },
                    { icon: Brain, text: "How does bagging work?" },
                ].map((chip, i) => (
                    <button
                        key={i}
                        onClick={() => setInput(chip.text)}
                        className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-xs text-slate-400 hover:text-white hover:border-primary/20 transition-all"
                    >
                        <chip.icon className="w-3.5 h-3.5" />
                        {chip.text}
                    </button>
                ))}
            </div>

            <div className="flex-1 flex flex-col glass-card-elevated overflow-hidden">
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6 max-w-3xl mx-auto">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <Avatar className={msg.role === "ai" ? "h-9 w-9 border-2 border-primary/30" : "h-9 w-9 border-2 border-white/10"}>
                                    <AvatarImage src={msg.role === "ai" ? "" : "https://github.com/shadcn.png"} />
                                    <AvatarFallback className={msg.role === "ai" ? "bg-primary/20 text-primary" : "bg-white/[0.06]"}>
                                        {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}
                                >
                                    <div
                                        className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-primary/15 text-white border border-primary/10 rounded-tr-sm"
                                            : "bg-white/[0.04] border border-white/[0.06] rounded-tl-sm text-slate-200"
                                            }`}
                                    >
                                        {msg.role === "ai" ? (
                                            <>
                                                <span className="font-bold text-primary mb-1 block text-[10px] uppercase tracking-wider">EvolveEd AI</span>
                                                {msg.content}
                                            </>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                    <span className="text-[10px] text-slate-600 px-2">Just now</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-4 bg-[#050507]/60 backdrop-blur-xl border-t border-white/[0.06]">
                    <div className="max-w-3xl mx-auto flex gap-3 relative">
                        <input
                            placeholder="Ask anything about your current topic..."
                            className="flex-1 pill-input pl-4 pr-12"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <Button
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90"
                            size="icon"
                            onClick={handleSend}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
