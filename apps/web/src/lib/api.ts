"use client";

import axios from "axios";

// Default to localhost:4000/api if not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors (e.g., 401 Unauthorized)
        if (error.response?.status === 401) {
            // Optional: trigger logout or redirect
            console.warn("Unauthorized access - redirecting to login");
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
