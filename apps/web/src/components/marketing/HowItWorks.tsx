export function HowItWorks() {
    return (
        <section className="py-32 px-6 bg-secondary/5 relative overflow-hidden" id="how-it-works">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                        The Evolution Process
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Master any subject in three simple steps.
                    </p>
                </div>

                <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-0.5 bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-30" />

                    {/* Step 1 */}
                    <div className="relative flex-1 text-center group">
                        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 text-2xl font-bold z-10 relative border-8 border-background shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                            1
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Define Goal</h3>
                        <p className="text-muted-foreground px-6 leading-relaxed">
                            Tell us what you want to achieve, whether it&apos;s a new career or
                            mastering a niche skill.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex-1 text-center group delay-100">
                        <div className="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-2xl font-bold z-10 relative border-8 border-background shadow-xl shadow-purple-500/20 group-hover:scale-110 transition-transform">
                            2
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">AI Mapping</h3>
                        <p className="text-muted-foreground px-6 leading-relaxed">
                            Our engine builds a hyper-personalized roadmap tailored to your
                            current knowledge.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex-1 text-center group delay-200">
                        <div className="w-20 h-20 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-8 text-2xl font-bold z-10 relative border-8 border-background shadow-xl shadow-secondary/20 group-hover:scale-110 transition-transform">
                            3
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Daily Growth</h3>
                        <p className="text-muted-foreground px-6 leading-relaxed">
                            Engage with bite-sized lessons and AI tutors to evolve your
                            understanding every single day.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
