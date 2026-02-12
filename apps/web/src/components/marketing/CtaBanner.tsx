import { Button } from "@/components/ui/button";

export function CtaBanner() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-primary via-purple-500 to-secondary p-[2px]">
                <div className="bg-background rounded-[2.4rem] p-12 md:p-24 text-center relative overflow-hidden">
                    {/* Inner Orbs */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-[80px]" />
                        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-[80px]" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 leading-tight">
                        Ready to Evolve?
                    </h2>
                    <p className="text-muted-foreground text-xl mb-12 max-w-xl mx-auto relative z-10 leading-relaxed">
                        Join thousands of students and professionals who have unlocked their
                        peak cognitive potential.
                    </p>

                    <Button
                        size="lg"
                        className="px-12 py-8 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-xl transition-all shadow-2xl shadow-primary/40 relative z-10 hover:scale-105"
                    >
                        Get Started Now
                    </Button>
                </div>
            </div>
        </section>
    );
}
