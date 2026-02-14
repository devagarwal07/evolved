"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth(); // We can log them in directly after registration

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Register
            await api.post("/auth/register", { email, password, name });

            // Auto Login
            const res = await api.post("/auth/login", { email, password });
            const { access_token, user } = res.data;

            if (access_token) {
                // If user is not returned, we fetch it
                const userData = user || (await api.get("/auth/me", {
                    headers: { Authorization: `Bearer ${access_token}` }
                })).data;
                login(access_token, userData);
            }
        } catch (err: any) {
            console.error("Registration failed", err);
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card-elevated p-8 md:p-10 relative overflow-hidden">
            {/* Glow accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />

            {/* Tab Switcher */}
            <div className="flex mb-8 bg-white/[0.03] rounded-full p-1 border border-white/[0.06]">
                <Link
                    href={ROUTES.AUTH.LOGIN}
                    className="flex-1 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-white text-center transition-colors"
                >
                    Sign In
                </Link>
                <button className="flex-1 py-2.5 rounded-full text-sm font-bold bg-primary text-white shadow-lg shadow-primary/25">
                    Sign Up
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Full name"
                        className="pill-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="pill-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pill-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>

                {/* Password Strength Indicator */}
                <div className="flex gap-1.5">
                    <div className={`flex-1 h-1 rounded-full ${password.length > 4 ? "bg-primary" : "bg-white/[0.06]"}`} />
                    <div className={`flex-1 h-1 rounded-full ${password.length > 8 ? "bg-primary" : "bg-white/[0.06]"}`} />
                    <div className={`flex-1 h-1 rounded-full ${password.length > 10 ? "bg-primary" : "bg-white/[0.06]"}`} />
                    <div className="flex-1 h-1 rounded-full bg-white/[0.06]" />
                </div>

                <div className="flex items-start gap-2">
                    <input type="checkbox" required className="mt-1 rounded border-white/20 bg-white/[0.05] accent-primary" />
                    <label className="text-xs text-slate-400 leading-relaxed">
                        I agree to the{" "}
                        <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                        {" "}and{" "}
                        <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all glow-primary text-sm flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Start Evolving — It's Free"}
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/[0.08]" />
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">or continue with</span>
                <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { name: "Google", icon: "G" },
                    { name: "GitHub", icon: "GH" },
                    { name: "Apple", icon: "AP" },
                ].map((provider) => (
                    <button
                        key={provider.name}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all text-sm font-medium text-slate-300"
                    >
                        <span className="text-xs font-bold">{provider.icon}</span>
                    </button>
                ))}
            </div>

            {/* Bottom Link */}
            <p className="text-center text-sm text-slate-500 mt-6">
                Already have an account?{" "}
                <Link href={ROUTES.AUTH.LOGIN} className="text-primary font-bold hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
}
