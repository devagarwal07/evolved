
export const ROUTES = {
    // Public Marketing Pages
    HOME: "/",
    FEATURES: "/#features",
    PRICING: "/pricing",
    ABOUT: "/about",
    COMMUNITY: "/community",
    CONTACT: "/contact",
    PRIVACY: "/privacy",
    TERMS: "/terms",
    HELP: "/help",

    // Showcase Pages (Marketing)
    SHOWCASE: {
        AI_TUTOR: "/showcase/ai-tutor",
        SMART_NOTES: "/showcase/smart-notes",
        GOALS: "/showcase/goal-learning",
    },

    // Auth Pages
    AUTH: {
        LOGIN: "/login",
        SIGNUP: "/register",
        FORGOT_PASSWORD: "/auth/forgot-password",
    },

    // Dashboard Pages (Protected)
    DASHBOARD: {
        ROOT: "/dashboard",
        GOALS: "/dashboard/goals",
        AI_TUTOR: "/dashboard/ai-tutor",
        LEARNING_PATHS: "/dashboard/learning-paths",
        PRACTICE: "/dashboard/practice",
        SMART_NOTES: "/dashboard/smart-notes",
        COMMUNITY: "/dashboard/community",
        SETTINGS: "/dashboard/settings",
    },
} as const;

export type AppRoutes = typeof ROUTES;
