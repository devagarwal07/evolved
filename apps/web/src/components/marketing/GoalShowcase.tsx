import { GraduationCap, Code2, Briefcase } from "lucide-react";

export function GoalShowcase() {
    return (
        <section className="py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                            Master Any Domain <br />
                            <span className="text-primary">With Precision.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Whether you&apos;re prepping for the bar exam or learning quantum
                            physics, EvolveEd adapts its pedagogical approach to the specific
                            domain requirements.
                        </p>

                        <div className="space-y-6">
                            {/* Item 1 */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500">
                                    <GraduationCap />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Exam Mastery</h4>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">
                                        SAT • MCAT • BAR • CFA
                                    </p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                                    <Code2 />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">
                                        Skill Acquisition
                                    </h4>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">
                                        CODING • DESIGN • LANGUAGES
                                    </p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500">
                                    <Briefcase />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">
                                        Interview Prep
                                    </h4>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">
                                        FAANG • CONSULTING • LEADERSHIP
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoSOj7h7swXQSK4Zujg_0F-1YKGmlgc-xdaOlfi7-_LQeUbbeUbnggo7qDyU0a2gGsqHAubJyamMKlu1A6dm_BfbYOjXyMpyGgKYJ2gDOsTJ_spma4Amu3EFS0pTb46Qdq9WB2VHPo2oQYlfD3LTnmF0yELfL_QdyUg7uJPicIIWRaDK9q3C0z8Hcus9UvrAe_xE016I6IIyTtMqC18kpsdU1LRAxKVzW6GcquPvdAE6nnRFrSj_384c-qlF525MOGRfVLOxNQ-Nzf"
                                alt="Futuristic interface"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -bottom-10 -left-10 bg-card/80 backdrop-blur-xl p-6 rounded-2xl w-72 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-white">
                                    Progress Velocity
                                </span>
                                <span className="text-secondary text-sm font-mono">+42%</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-secondary w-3/4 rounded-full animate-pulse"
                                    style={{ width: "75%" }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                                EvolveEd students learn concepts 3x faster than traditional
                                methods.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
