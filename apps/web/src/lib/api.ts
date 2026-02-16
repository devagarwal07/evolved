"use client";

import axios from "axios";

// Ensure baseURL always ends with /api
const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const API_URL = rawUrl.endsWith("/api") ? rawUrl : `${rawUrl}/api`;

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor — always attach token from localStorage
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("evolveed_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — redirect to login on 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
            // Don't redirect if we're already on the login/register page
            const path = window.location.pathname;
            if (!path.includes("/login") && !path.includes("/register")) {
                console.warn("Token expired or invalid — redirecting to login");
                localStorage.removeItem("evolveed_token");
                localStorage.removeItem("evolveed_user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};
