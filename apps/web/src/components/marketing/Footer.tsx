
import Link from "next/link";
import { Zap, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border/50 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2">
                        <Link href={ROUTES.HOME} className="flex items-center gap-2 mb-8 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-violet-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Zap className="text-white fill-current" size={16} />
                            </div>
                            <span className="text-xl font-black text-white tracking-tight">
                                EvolveEd
                            </span>
                        </Link>
                        <p className="text-muted-foreground max-w-xs mb-8 leading-relaxed">
                            The first operating system for human learning, powered by artificial
                            intelligence.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all"
                            >
                                <Twitter size={18} />
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all"
                            >
                                <Github size={18} />
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all"
                            >
                                <Linkedin size={18} />
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all"
                            >
                                <Mail size={18} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-muted-foreground text-sm">
                            <li>
                                <Link
                                    href={ROUTES.FEATURES}
                                    className="hover:text-primary transition-colors"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={ROUTES.SHOWCASE.AI_TUTOR}
                                    className="hover:text-primary transition-colors"
                                >
                                    AI Tutor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={ROUTES.PRICING}
                                    className="hover:text-primary transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/changelog"
                                    className="hover:text-primary transition-colors"
                                >
                                    Changelog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-muted-foreground text-sm">
                            <li>
                                <Link
                                    href={ROUTES.ABOUT}
                                    className="hover:text-primary transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="hover:text-primary transition-colors"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="hover:text-primary transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={ROUTES.PRIVACY}
                                    className="hover:text-primary transition-colors"
                                >
                                    Privacy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Support</h4>
                        <ul className="space-y-4 text-muted-foreground text-sm">
                            <li>
                                <Link
                                    href={ROUTES.HELP}
                                    className="hover:text-primary transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={ROUTES.COMMUNITY}
                                    className="hover:text-primary transition-colors"
                                >
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={ROUTES.CONTACT}
                                    className="hover:text-primary transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-muted-foreground text-xs">
                    <p>© 2026 EvolveEd Inc. All rights reserved.</p>
                    <p>Designed for the future of education.</p>
                </div>
            </div>
        </footer>
    );
}
