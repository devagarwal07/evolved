"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, setAuthToken } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";

// Define User type based on backend (User entity)
export interface User {
    id: string;
    email: string;
    name: string;
    role?: string;
    xp?: number;
    streak?: number;
    bio?: string;
    // Add other fields as needed
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Check for existing session on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("evolveed_token");
        const storedUser = localStorage.getItem("evolveed_user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setAuthToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        setAuthToken(newToken);
        localStorage.setItem("evolveed_token", newToken);
        localStorage.setItem("evolveed_user", JSON.stringify(newUser));
        router.push(ROUTES.DASHBOARD.ROOT);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("evolveed_token");
        localStorage.removeItem("evolveed_user");
        router.push(ROUTES.AUTH.LOGIN);
    };

    const updateUser = (updates: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return null;
            const updated = { ...prev, ...updates };
            localStorage.setItem("evolveed_user", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated: !!token,
            isLoading,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
