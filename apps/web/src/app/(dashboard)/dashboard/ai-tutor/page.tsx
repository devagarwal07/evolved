"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Zap, Bot, User, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AiTutorPage() {
    const [messages, setMessages] = useState([
        {
            role: "ai",
            content:
                "Hello Alex! I'm your AI Tutor. I see you're working on System Design. Ready to dive into Load Balancers or should we review CAP theorem first?",
        },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: "user", content: input }]);
        setInput("");
        // Simulate AI response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content:
                        "That's a great question! Let's break it down. In consistent hashing, when a node is added or removed, only k/n keys need to be remapped...",
                },
            ]);
        }, 1000);
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                        AI Tutor <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    </h2>
                    <p className="text-muted-foreground">
                        Your personal mentor, available 24/7.
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    New Session
                </Button>
            </div>

            <Card className="flex-1 flex flex-col bg-card/60 border-input backdrop-blur-sm shadow-xl p-0 overflow-hidden">
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-6 max-w-3xl mx-auto">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""
                                    }`}
                            >
                                <Avatar className={msg.role === "ai" ? "h-10 w-10 border-2 border-primary" : "h-10 w-10 border-2 border-border"}>
                                    <AvatarImage src={msg.role === "ai" ? "" : "https://github.com/shadcn.png"} />
                                    <AvatarFallback className={msg.role === "ai" ? "bg-primary text-white" : "bg-muted"}>
                                        {msg.role === "ai" ? <Bot size={20} /> : <User size={20} />}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"
                                        }`}
                                >
                                    <div
                                        className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted/50 border border-border/50 rounded-tl-none text-foreground"
                                            }`}
                                    >
                                        {msg.role === "ai" ? (
                                            <>
                                                <span className="font-bold text-primary mb-1 block text-xs uppercase tracking-wide">EvolveEd Intelligence</span>
                                                {msg.content}
                                            </>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground px-2">
                                        Just now
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-4 bg-background/40 backdrop-blur-md border-t border-border">
                    <div className="max-w-3xl mx-auto flex gap-4 relative">
                        <Input
                            placeholder="Ask anything about System Design..."
                            className="bg-card/80 border-input focus:border-primary pr-12 h-12 rounded-xl shadow-lg"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <Button
                            className="absolute right-1 top-1 h-10 w-10 rounded-lg"
                            size="icon"
                            onClick={handleSend}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
