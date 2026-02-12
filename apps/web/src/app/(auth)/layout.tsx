import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Visual Side (Left) -- Hidden on mobile */}
            <div className="hidden lg:flex flex-col justify-between bg-card border-r border-border p-10 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 group w-fit">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-violet-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                            <Zap className="text-white fill-current" size={20} />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-white">
                            Evolve<span className="text-primary">Ed</span>
                        </span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                        Unlock your full learning potential.
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        "EvolveEd isn't just a platform; it's a cognitive upgrade. The AI
                        tutor feels like it can read my mind."
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full bg-muted border-2 border-card overflow-hidden"
                                >
                                    <img
                                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i * 123
                                            }`}
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            <span className="font-bold text-white">5,000+</span> students
                            joined this week
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-muted-foreground">
                    © 2026 EvolveEd Inc. All rights reserved.
                </div>
            </div>

            {/* Form Side (Right) */}
            <div className="flex items-center justify-center p-6 sm:p-10 relative bg-background">
                <div className="absolute top-4 right-4 lg:top-10 lg:right-10">
                    <Link
                        href="/"
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                    >
                        Back to home
                    </Link>
                </div>
                <div className="max-w-md w-full">{children}</div>
            </div>
        </div>
    );
}
