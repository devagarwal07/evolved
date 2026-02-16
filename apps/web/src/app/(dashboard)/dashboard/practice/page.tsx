"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Brain, Layers, FileQuestion, Loader2, Sparkles, Plus, Trash2,
    RotateCcw, Check, X, ChevronRight, Trophy, Clock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import { api } from "@/lib/api";

type Mode = "home" | "flashcards" | "study" | "quiz" | "results";

interface FlashcardDeck {
    id: string;
    title: string;
    _count?: { cards: number };
    cards?: Flashcard[];
    createdAt: string;
}

interface Flashcard {
    id: string;
    front: string;
    back: string;
    nextReview: string;
    interval: number;
    easeFactor: number;
}

interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export default function PracticePage() {
    const { user } = useAuth();
    const { showXPToast } = useGamification();
    const [mode, setMode] = useState<Mode>("home");
    const [decks, setDecks] = useState<FlashcardDeck[]>([]);
    const [activeDeck, setActiveDeck] = useState<FlashcardDeck | null>(null);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [topic, setTopic] = useState("");

    // Quiz state
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [quizTopic, setQuizTopic] = useState("");
    const [currentQ, setCurrentQ] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<boolean[]>([]);

    useEffect(() => {
        if (user?.id) loadDecks();
    }, [user?.id]);

    const loadDecks = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/practice/flashcards");
            setDecks(res.data);
        } catch (err) { console.error(err); }
        finally { setIsLoading(false); }
    };

    const generateFlashcards = async () => {
        if (!topic.trim()) return;
        setIsGenerating(true);
        try {
            const res = await api.post("/practice/flashcards/generate", { topic: topic.trim() });
            setActiveDeck(res.data);
            setMode("study");
            setCurrentCardIdx(0);
            setIsFlipped(false);
            setTopic("");
            loadDecks();
        } catch (err) { console.error(err); }
        finally { setIsGenerating(false); }
    };

    const openDeck = async (id: string) => {
        try {
            const res = await api.get(`/practice/flashcards/${id}`);
            setActiveDeck(res.data);
            setCurrentCardIdx(0);
            setIsFlipped(false);
            setMode("study");
        } catch (err) { console.error(err); }
    };

    const reviewCard = async (quality: number) => {
        if (!activeDeck?.cards) return;
        const card = activeDeck.cards[currentCardIdx];
        try { await api.post(`/practice/flashcards/${card.id}/review`, { quality }); showXPToast(3, 'Flashcard reviewed'); } catch (err) { console.error(err); }
        if (currentCardIdx < activeDeck.cards.length - 1) {
            setCurrentCardIdx(prev => prev + 1);
            setIsFlipped(false);
        } else {
            setMode("home");
            loadDecks();
        }
    };

    const deleteDeck = async (id: string) => {
        try {
            await api.delete(`/practice/flashcards/${id}`);
            setDecks(prev => prev.filter(d => d.id !== id));
        } catch (err) { console.error(err); }
    };

    const generateQuiz = async () => {
        if (!topic.trim()) return;
        setIsGenerating(true);
        try {
            const res = await api.post("/practice/quiz/generate", { topic: topic.trim() });
            setQuizQuestions(res.data.questions);
            setQuizTopic(res.data.topic);
            setCurrentQ(0);
            setScore(0);
            setQuizAnswers([]);
            setSelectedAnswer(null);
            setShowAnswer(false);
            setMode("quiz");
            setTopic("");
        } catch (err) { console.error(err); }
        finally { setIsGenerating(false); }
    };

    const selectQuizAnswer = (idx: number) => {
        if (showAnswer) return;
        setSelectedAnswer(idx);
        setShowAnswer(true);
        const correct = idx === quizQuestions[currentQ].correctIndex;
        if (correct) setScore(prev => prev + 1);
        setQuizAnswers(prev => [...prev, correct]);
    };

    const nextQuestion = async () => {
        if (currentQ < quizQuestions.length - 1) {
            setCurrentQ(prev => prev + 1);
            setSelectedAnswer(null);
            setShowAnswer(false);
        } else {
            // Submit quiz
            try {
                await api.post("/practice/quiz/submit", {
                    topic: quizTopic,
                    score,
                    totalQs: quizQuestions.length,
                    weakAreas: quizQuestions.filter((_, i) => !quizAnswers[i]).map(q => q.question),
                });
                showXPToast(20, 'Quiz completed');
                if (score === quizQuestions.length) showXPToast(50, 'Perfect score!');
            } catch (err) { console.error(err); }
            setMode("results");
        }
    };

    const currentCard = activeDeck?.cards?.[currentCardIdx];

    // ─── HOME ─────────────────────────────────────────────

    if (mode === "home" || mode === "flashcards") return (
        <div className="max-w-5xl mx-auto space-y-8 p-6">
            <div className="text-center space-y-3">
                <h1 className="text-3xl font-bold text-white">Smart Practice Engine</h1>
                <p className="text-slate-500 text-sm">AI-powered flashcards & quizzes with spaced repetition</p>
            </div>

            {/* Generate Section */}
            <div className="glass-card p-6 space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Generate from topic</label>
                <div className="flex gap-3">
                    <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
                        placeholder="e.g., Machine Learning, Thermodynamics, React Hooks"
                        className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/40 text-sm"
                        onKeyDown={e => e.key === "Enter" && generateFlashcards()} />
                    <Button onClick={generateFlashcards} disabled={!topic.trim() || isGenerating} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow shadow-primary/20">
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Layers size={16} className="mr-2" /> Cards</>}
                    </Button>
                    <Button onClick={generateQuiz} disabled={!topic.trim() || isGenerating} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow shadow-emerald-600/20">
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <><FileQuestion size={16} className="mr-2" /> Quiz</>}
                    </Button>
                </div>
            </div>

            {/* Decks Grid */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4">Your Flashcard Decks</h2>
                {isLoading ? (
                    <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
                ) : decks.length === 0 ? (
                    <div className="text-center py-12 glass-card">
                        <Layers size={40} className="mx-auto mb-3 text-primary/30" />
                        <p className="text-slate-500 text-sm">No decks yet — generate some above!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {decks.map(deck => (
                            <div key={deck.id} className="glass-card p-5 group hover:border-primary/20 transition-all cursor-pointer" onClick={() => openDeck(deck.id)}>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
                                        <Layers className="text-primary w-5 h-5" />
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); deleteDeck(deck.id); }} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded-lg transition-all">
                                        <Trash2 size={14} className="text-red-400" />
                                    </button>
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1">{deck.title}</h3>
                                <p className="text-xs text-slate-500">{deck._count?.cards || 0} cards</p>
                                <div className="mt-3 flex items-center text-xs text-primary font-medium">Study <ChevronRight size={14} /></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    // ─── FLASHCARD STUDY ──────────────────────────────────

    if (mode === "study" && currentCard) return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-white">{activeDeck?.title}</h2>
                <p className="text-xs text-slate-500 mt-1">Card {currentCardIdx + 1} / {activeDeck?.cards?.length}</p>
            </div>

            {/* Card */}
            <div onClick={() => setIsFlipped(!isFlipped)}
                className={`w-full max-w-lg aspect-[3/2] rounded-2xl cursor-pointer transition-all duration-500 relative ${isFlipped ? "bg-primary/5 border-primary/20" : "bg-white/[0.03] border-white/[0.08]"} border p-8 flex flex-col items-center justify-center text-center hover:shadow-xl`}>
                <div className="absolute top-3 right-3 text-[10px] font-bold text-slate-600 bg-white/[0.05] px-2 py-0.5 rounded">
                    {isFlipped ? "ANSWER" : "QUESTION"}
                </div>
                <p className={`text-lg font-medium ${isFlipped ? "text-primary" : "text-white"} leading-relaxed`}>
                    {isFlipped ? currentCard.back : currentCard.front}
                </p>
                {!isFlipped && <p className="text-xs text-slate-600 mt-4">Click to flip</p>}
            </div>

            {/* Rating Buttons (show after flip) */}
            {isFlipped && (
                <div className="flex gap-3 mt-6">
                    <Button onClick={() => reviewCard(0)} size="sm" className="bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl"><X size={14} className="mr-1" /> Again</Button>
                    <Button onClick={() => reviewCard(3)} size="sm" className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 rounded-xl"><RotateCcw size={14} className="mr-1" /> Hard</Button>
                    <Button onClick={() => reviewCard(4)} size="sm" className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-xl"><Check size={14} className="mr-1" /> Good</Button>
                    <Button onClick={() => reviewCard(5)} size="sm" className="bg-primary/20 text-primary hover:bg-primary/30 rounded-xl"><Sparkles size={14} className="mr-1" /> Easy</Button>
                </div>
            )}

            <Button onClick={() => setMode("home")} variant="ghost" className="mt-8 text-slate-500">Back to Decks</Button>
        </div>
    );

    // ─── QUIZ ─────────────────────────────────────────────

    if (mode === "quiz" && quizQuestions.length > 0) {
        const q = quizQuestions[currentQ];
        return (
            <div className="max-w-2xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Quiz: {quizTopic}</h2>
                    <span className="text-xs text-slate-500 bg-white/[0.05] px-3 py-1 rounded-full font-bold">{currentQ + 1}/{quizQuestions.length}</span>
                </div>

                <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }} />
                </div>

                <div className="glass-card p-6">
                    <p className="text-white font-medium mb-6">{q.question}</p>
                    <div className="space-y-3">
                        {q.options.map((opt, i) => (
                            <button key={i} onClick={() => selectQuizAnswer(i)}
                                disabled={showAnswer}
                                className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${showAnswer
                                    ? i === q.correctIndex
                                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                                        : i === selectedAnswer
                                            ? "border-red-500/40 bg-red-500/10 text-red-300"
                                            : "border-white/[0.04] text-slate-500"
                                    : selectedAnswer === i
                                        ? "border-primary/30 bg-primary/10 text-white"
                                        : "border-white/[0.06] bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.04]"
                                    }`}>
                                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                            </button>
                        ))}
                    </div>

                    {showAnswer && (
                        <div className="mt-4 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                            <p className="text-xs text-slate-400"><span className="text-primary font-bold">Explanation:</span> {q.explanation}</p>
                        </div>
                    )}
                </div>

                {showAnswer && (
                    <Button onClick={nextQuestion} className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                        {currentQ < quizQuestions.length - 1 ? "Next Question" : "View Results"} <ChevronRight size={16} className="ml-1" />
                    </Button>
                )}
            </div>
        );
    }

    // ─── RESULTS ──────────────────────────────────────────

    if (mode === "results") return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
            <div className="glass-card p-10 text-center max-w-md w-full">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                    <Trophy size={36} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
                <p className="text-slate-500 mb-6">{quizTopic}</p>
                <div className="text-5xl font-black text-primary mb-2">{score}/{quizQuestions.length}</div>
                <p className="text-sm text-slate-400 mb-8">{Math.round((score / quizQuestions.length) * 100)}% correct</p>
                <div className="flex gap-3 justify-center">
                    <Button onClick={() => setMode("home")} className="bg-primary hover:bg-primary/90 text-white rounded-xl">Back to Practice</Button>
                </div>
            </div>
        </div>
    );

    // Fallback
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>;
}
