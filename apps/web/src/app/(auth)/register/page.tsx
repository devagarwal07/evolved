
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Github } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export default function RegisterPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col text-center space-y-2 lg:hidden">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-violet-500 rounded-lg flex items-center justify-center">
                        <Zap className="text-white fill-current" size={16} />
                    </div>
                    <span className="text-xl font-black tracking-tight text-white">
                        Evolve<span className="text-primary">Ed</span>
                    </span>
                </div>
            </div>

            <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Create an account</h1>
                <p className="text-muted-foreground mt-2">
                    Start your evolution journey today
                </p>
            </div>

            <div className="grid gap-6">
                <form>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Max"
                                    type="text"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    className="bg-card/50 border-input hover:border-primary/50 focus:border-primary transition-colors h-11"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Planck"
                                    type="text"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    className="bg-card/50 border-input hover:border-primary/50 focus:border-primary transition-colors h-11"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                className="bg-card/50 border-input hover:border-primary/50 focus:border-primary transition-colors h-11"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                className="bg-card/50 border-input hover:border-primary/50 focus:border-primary transition-colors h-11"
                            />
                        </div>
                        <Button className="w-full h-11 font-bold shadow-lg shadow-primary/20">
                            Create Account
                        </Button>
                    </div>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or convert via
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-11 bg-card hover:bg-card/80">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
                    <Button variant="outline" className="h-11 bg-card hover:bg-card/80">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </Button>
                </div>

                <p className="px-8 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href={ROUTES.AUTH.LOGIN}
                        className="underline underline-offset-4 hover:text-primary transition-colors font-medium"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
