// ─── Shared Types for EvolveEd ─────────────────────────

export type Role = 'STUDENT' | 'TEACHER' | 'ADMIN';
export type Goal = 'EXAM' | 'SKILL' | 'INTERVIEW' | 'CURIOSITY' | 'CERTIFICATION';
export type NodeStatus = 'LOCKED' | 'ACTIVE' | 'COMPLETED';

// ─── User ──────────────────────────────────────────────

export interface UserProfile {
    id: string;
    email: string;
    name: string | null;
    avatar: string | null;
    role: Role;
    goal: Goal | null;
    xp: number;
    streak: number;
}

// ─── Auth ──────────────────────────────────────────────

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

// ─── AI Tutor ──────────────────────────────────────────

export interface TutorMessageDto {
    content: string;
    sessionId?: string;
}

export interface TutorSessionSummary {
    id: string;
    topic: string;
    createdAt: string;
    messageCount: number;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
}

// ─── Learning Paths ────────────────────────────────────

export interface GeneratePathDto {
    topic: string;
    goal: Goal;
}

export interface LearningPathSummary {
    id: string;
    topic: string;
    goal: Goal;
    progress: number;
    nodeCount: number;
    createdAt: string;
}

export interface PathNodeView {
    id: string;
    title: string;
    phase: number;
    order: number;
    status: NodeStatus;
    resources: unknown[] | null;
}

// ─── API Response ──────────────────────────────────────

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
