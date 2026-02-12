import {
    Brain,
    Route,
    Target,
    Search,
    FileText,
    Rocket,
    RefreshCw,
    Dumbbell,
    Users,
} from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "Personalized AI Tutor",
        desc: "A 24/7 mentor that understands your learning style and explains complex topics in simple terms.",
        color: "text-primary",
        bg: "bg-primary/20",
    },
    {
        icon: Route,
        title: "Learning Path Generator",
        desc: "Dynamic curriculums that adapt in real-time based on your progress and mastery levels.",
        color: "text-secondary",
        bg: "bg-secondary/20",
    },
    {
        icon: Target,
        title: "Smart Level Assessment",
        desc: "Know exactly where you stand with AI-driven benchmarking against global industry standards.",
        color: "text-cyan-400",
        bg: "bg-cyan-400/20",
    },
    {
        icon: Search,
        title: "AI-Curated Resources",
        desc: "Stop searching. We find the best videos, articles, and papers tailored to your specific goals.",
        color: "text-pink-500",
        bg: "bg-pink-500/20",
    },
    {
        icon: FileText,
        title: "Smart Notes Engine",
        desc: "Automatically summarizes your lectures and readings into structured, searchable insights.",
        color: "text-amber-500",
        bg: "bg-amber-500/20",
    },
    {
        icon: Rocket,
        title: "Goal-Based Learning",
        desc: "Define your North Star and EvolveEd reverse-engineers the most efficient way to reach it.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/20",
    },
    {
        icon: RefreshCw,
        title: "Continuous Learning Loop",
        desc: "Reinforce knowledge through spaced repetition and AI-triggered review sessions.",
        color: "text-indigo-500",
        bg: "bg-indigo-500/20",
    },
    {
        icon: Dumbbell,
        title: "Smart Practice Engine",
        desc: "Endless, adaptive practice problems that focus specifically on your weak areas.",
        color: "text-red-500",
        bg: "bg-red-500/20",
    },
    {
        icon: Users,
        title: "Community Learning",
        desc: "Connect with fellow evolvers on the same path. Learn, compete, and grow together.",
        color: "text-violet-500",
        bg: "bg-violet-500/20",
    },
];

export function FeaturesGrid() {
    return (
        <section id="features" className="py-32 px-6 bg-background relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                        Everything You Need. <br />
                        <span className="text-muted-foreground">Nothing You Don't.</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="bg-card/40 backdrop-blur-md border border-border/50 p-8 rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all group hover:-translate-y-1"
                        >
                            <div
                                className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                            >
                                <feature.icon className={`${feature.color} w-8 h-8`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
