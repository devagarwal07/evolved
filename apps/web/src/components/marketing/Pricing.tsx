import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const plans = [
    {
        name: "Explorer",
        price: "$0",
        frequency: "/forever",
        features: ["5 AI Tutor credits / mo", "Basic Learning Paths", "Community Access"],
        cta: "Start Free",
        popular: false,
        gradient: "",
    },
    {
        name: "Evolver",
        price: "$19",
        frequency: "/month",
        features: [
            "Unlimited AI Tutoring",
            "Custom Resource Curation",
            "Smart Practice Engine",
            "Priority Goal Processing",
        ],
        cta: "Get Pro",
        popular: true,
        gradient: "border-primary shadow-primary/20",
    },
    {
        name: "Master",
        price: "$49",
        frequency: "/month",
        features: [
            "Everything in Pro",
            "API Access for Developers",
            "1-on-1 Human Mentor Check-ins",
        ],
        cta: "Go Premium",
        popular: false,
        gradient: "",
    },
];

export function Pricing() {
    return (
        <section className="py-32 px-6 bg-background relative" id="pricing">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-black mb-6 text-white">
                        Transparent Pricing
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Choose the path that fits your ambition.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-border/50 flex flex-col h-full hover:border-primary/30 transition-all ${plan.popular ? `border-primary shadow-2xl ${plan.gradient}` : ""
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline mb-8">
                                <span className="text-5xl font-black text-white">
                                    {plan.price}
                                </span>
                                <span className="text-muted-foreground ml-2 font-medium">
                                    {plan.frequency}
                                </span>
                            </div>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle2
                                            className={`w-5 h-5 shrink-0 ${plan.popular ? "text-primary" : "text-muted-foreground"
                                                }`}
                                        />
                                        <span className="text-sm leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                size="lg"
                                variant={plan.popular ? "default" : "outline"}
                                className={`w-full rounded-full font-bold py-6 text-base ${plan.popular
                                        ? "shadow-lg shadow-primary/25 hover:shadow-primary/50"
                                        : "bg-transparent border-white/10 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
