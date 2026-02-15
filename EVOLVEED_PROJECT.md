# EvolveEd — Complete Project Document

> **"Don't just learn. Evolve."**
> An AI-native, outcome-driven learning platform that transforms how students learn — not by adding more content, but by structuring, personalizing, and adapting it.

---

## Table of Contents

1. [Vision & Positioning](#1-vision--positioning)
2. [Platform Architecture](#2-platform-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Database Schema](#4-database-schema)
5. [Core Features — Detailed Plan](#5-core-features--detailed-plan)
6. [Design System](#6-design-system)
7. [Site Pages & Routing](#7-site-pages--routing)
8. [Backend API Reference](#8-backend-api-reference)
9. [Frontend Structure](#9-frontend-structure)
10. [Infrastructure & DevOps](#10-infrastructure--devops)
11. [Code Quality Observations](#11-code-quality-observations)
12. [Monetization Strategy](#12-monetization-strategy)
13. [Development Roadmap](#13-development-roadmap)
14. [Recommended Next Steps](#14-recommended-next-steps)

---

## 1. Vision & Positioning

**Name:** EvolveEd
**Tagline:** *"Don't just learn. Evolve."*
**Target Audience:** Students (16–30), competitive exam aspirants, self-learners, skill-builders
**Positioning:** All-in-one AI learning platform that replaces YouTube + Notion + Anki + ChatGPT + Quizlet

EvolveEd is not another edtech app. It's a **thinking partner** that understands *what* you're learning, *why* you're learning it, and *how* you learn best — then adapts everything around that.

### Key Positioning Statements

1. **Not a chatbot** — A persistent AI tutor with memory
2. **Not a content dump** — A structured learning engine
3. **Not one-size-fits-all** — Outcome-driven personalization
4. **Not another app** — The Operating System for Learning

### Brand Identity

- **Colors:** Deep Space Black background, Electric Violet (#7C3AED / #8B5CF6) primary accent, Neon Cyan (#06B6D4) secondary accent, Warm White (#F8FAFC) text
- **Vibe:** Futuristic, premium, intelligent, alive. Dark-mode-first with glowing gradients, micro-animations, glassmorphism cards
- **Font:** Inter / Google Sans — clean, modern, highly readable
- **Mood:** Like a fusion of Notion's clarity + Discord's energy + Apple's premium feel

---

## 2. Platform Architecture

The project is a **Turborepo monorepo** with two main applications:

```
evolveed/
├── evolve-v1/                    # Main monorepo root
│   ├── apps/
│   │   ├── api/                  # NestJS + Fastify backend
│   │   │   ├── prisma/           # Prisma schema & migrations
│   │   │   │   └── schema.prisma # 12 data models
│   │   │   └── src/
│   │   │       ├── auth/         # JWT + argon2 authentication
│   │   │       ├── dashboard/    # Dashboard stats & overview
│   │   │       ├── tutor/        # AI Tutor with Gemini integration
│   │   │       ├── users/        # User CRUD operations
│   │   │       ├── prisma/       # Prisma service module
│   │   │       ├── app.module.ts # Root module (imports all modules)
│   │   │       └── main.ts       # Bootstrap: Fastify, CORS, Swagger, pipes
│   │   │
│   │   └── web/                  # Next.js 16 frontend
│   │       └── src/
│   │           ├── app/
│   │           │   ├── (auth)/         # Login & Register pages
│   │           │   ├── (dashboard)/    # Protected dashboard (8 pages)
│   │           │   ├── (marketing)/    # Public pages (8 pages)
│   │           │   ├── globals.css     # Full design system
│   │           │   └── layout.tsx      # Root layout with AuthProvider
│   │           ├── components/
│   │           │   ├── dashboard/      # Sidebar, Header
│   │           │   ├── marketing/      # Landing page components
│   │           │   └── ui/             # shadcn/ui components
│   │           ├── context/
│   │           │   └── AuthContext.tsx  # Auth state management
│   │           ├── hooks/              # Custom React hooks
│   │           └── lib/
│   │               ├── api.ts          # Axios instance + interceptors
│   │               ├── routes.ts       # Centralized route constants
│   │               └── utils.ts        # Utility functions (cn)
│   │
│   ├── packages/                 # Shared packages (future)
│   ├── docker-compose.yml        # PostgreSQL 17 + Redis 7
│   ├── turbo.json                # Turborepo pipeline config
│   ├── pnpm-workspace.yaml       # Workspace definition
│   └── .env                      # Environment variables
│
├── EVOLVEED_PLATFORM_PLAN.md     # Full feature plan (this doc's source)
├── DESIGN.md                     # Design system tokens
├── SITE.md                       # Site vision & page roadmap
└── next-prompt.md                # Stitch prompt for features page
```

### System Architecture Diagram

```mermaid
graph TB
    subgraph Client["Frontend - Next.js 16"]
        PAGES["Pages"]
        AUTH_CTX["AuthContext"]
        AXIOS["Axios Client"]
        PAGES --> AUTH_CTX
        PAGES --> AXIOS
    end

    subgraph Server["Backend - NestJS + Fastify"]
        AUTH_MOD["AuthModule"]
        TUTOR_MOD["TutorModule"]
        DASH_MOD["DashboardModule"]
        USERS_MOD["UsersModule"]
        PRISMA_SVC["PrismaService"]
        AUTH_MOD --> PRISMA_SVC
        TUTOR_MOD --> PRISMA_SVC
        DASH_MOD --> PRISMA_SVC
        USERS_MOD --> PRISMA_SVC
    end

    DB[("PostgreSQL 17")]
    REDIS[("Redis 7")]
    GEMINI["Google Gemini AI"]

    AXIOS -->|"REST API calls"| Server
    PRISMA_SVC -->|"Prisma ORM"| DB
    Server -.->|"planned"| REDIS
    TUTOR_MOD -->|"generative-ai SDK"| GEMINI

    style Client fill:#1a1a2e,stroke:#8B5CF6,color:#fff
    style Server fill:#16213e,stroke:#06B6D4,color:#fff
    style DB fill:#0f3460,stroke:#10b981,color:#fff
    style REDIS fill:#0f3460,stroke:#94a3b8,color:#94a3b8
    style GEMINI fill:#1a1a2e,stroke:#f97316,color:#fff
```

### How the services communicate:

- **Frontend → Backend:** The Next.js app uses `axios` to make REST API calls to the NestJS backend at `http://localhost:4000/api`
- **Backend → Database:** NestJS uses Prisma ORM to query PostgreSQL
- **Backend → AI:** The Tutor service uses `@google/generative-ai` SDK to call Google's Gemini Pro model for chat responses
- **Auth Flow:** On login/register, the API returns a JWT access token. The frontend stores it in `localStorage` and attaches it to all subsequent API requests via an axios interceptor. The dashboard layout checks `isAuthenticated` state and redirects to login if not authenticated.

---

## 3. Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Monorepo** | Turborepo | 2.4 | Pipeline orchestration for multi-app builds |
| **Package Manager** | pnpm | 10.8.1 | Fast, disk-efficient package management |
| **Frontend Framework** | Next.js | 16.1.6 | Server-side rendering, file-based routing, App Router |
| **UI Library** | React | 19.2.3 | Component-based UI with latest features |
| **Styling** | Tailwind CSS | 4.1.18 (v4) | Utility-first CSS with `@theme` config |
| **Component Library** | shadcn/ui | Latest | Pre-built accessible UI components (Button, Avatar, Switch, ScrollArea) |
| **Animations** | Framer Motion | 12.34 | Page transitions, micro-interactions |
| **Icons** | Lucide React | 0.563 | Consistent, lightweight icon set |
| **HTTP Client** | Axios | 1.13.5 | API communication with interceptors |
| **Backend Framework** | NestJS | 11.x | Modular, TypeScript-first server framework |
| **HTTP Adapter** | Fastify | 5.7.4 | High-performance HTTP server (replaces Express) |
| **ORM** | Prisma | 6 | Type-safe database access with schema-driven models |
| **Database** | PostgreSQL | 17 (Alpine) | Relational data store for all app data |
| **Cache** | Redis | 7 (Alpine) | Planned: caching, session store, real-time |
| **Authentication** | JWT + argon2 + Passport | Custom | Token-based auth with password hashing |
| **AI / LLM** | Google Gemini Pro | 0.24.1 SDK | AI tutor chat with context memory |
| **API Documentation** | Swagger (NestJS) | Built-in | Auto-generated docs at `/api/docs` |
| **Containerization** | Docker Compose | Latest | Local dev environment for Postgres + Redis |

---

## 4. Database Schema

The Prisma schema defines **12 models** organized into 6 domains. The database uses PostgreSQL with all tables mapped to snake_case names.

### Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Session : "has refresh tokens"
    User ||--o{ TutorSession : "has chat sessions"
    User ||--o{ LearningPath : "has paths"
    User ||--o{ Note : "has notes"
    User ||--o{ FlashcardDeck : "has decks"
    User ||--o{ QuizAttempt : "has attempts"
    User ||--o{ RoomMember : "joins rooms"
    TutorSession ||--o{ TutorMessage : "contains messages"
    LearningPath ||--o{ PathNode : "has nodes"
    FlashcardDeck ||--o{ Flashcard : "has cards"
    StudyRoom ||--o{ RoomMember : "has members"

    User {
        string id PK
        string email UK
        string name
        string passwordHash
        Role role
        Goal goal
        int xp
        int streak
    }
    TutorSession {
        string id PK
        string topic
        string userId FK
    }
    TutorMessage {
        string id PK
        string role
        string content
        string sessionId FK
    }
    LearningPath {
        string id PK
        string topic
        Goal goal
        float progress
        string userId FK
    }
    PathNode {
        string id PK
        string title
        int phase
        NodeStatus status
        string pathId FK
    }
    FlashcardDeck {
        string id PK
        string title
        string userId FK
    }
    Flashcard {
        string id PK
        string front
        string back
        float easeFactor
        string deckId FK
    }
    Note {
        string id PK
        string title
        string sourceUrl
        json content
        string userId FK
    }
    QuizAttempt {
        string id PK
        string topic
        float score
        string userId FK
    }
    StudyRoom {
        string id PK
        string name
        string topic
        boolean isActive
    }
    RoomMember {
        string id PK
        string role
        string userId FK
        string roomId FK
    }
    Session {
        string id PK
        string refreshToken UK
        datetime expiresAt
        string userId FK
    }
```

### Enums

| Enum | Values | Used In |
|------|--------|---------|
| **Role** | `STUDENT`, `TEACHER`, `ADMIN` | `User.role` — controls access levels |
| **Goal** | `EXAM`, `SKILL`, `INTERVIEW`, `CURIOSITY`, `CERTIFICATION` | `User.goal`, `LearningPath.goal` — drives AI behavior adaptation |
| **NodeStatus** | `LOCKED`, `ACTIVE`, `COMPLETED` | `PathNode.status` — tracks progress through learning paths |

### Models — Detailed

#### User (`users`)
The central entity. Every other model relates back to a user.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (cuid) | Primary key |
| `email` | String (unique) | Login identifier |
| `name` | String? | Display name |
| `avatar` | String? | Profile image URL |
| `passwordHash` | String? | Argon2 hash (null for OAuth users) |
| `provider` | String? | `google`, `github`, `email` |
| `providerId` | String? | OAuth provider's user ID |
| `role` | Role | Defaults to `STUDENT` |
| `goal` | Goal? | Current learning goal mode |
| `xp` | Int | Experience points (defaults 0) |
| `streak` | Int | Consecutive active days (defaults 0) |
| `lastActiveAt` | DateTime? | Last activity timestamp |
| `createdAt` | DateTime | Account creation time |
| `updatedAt` | DateTime | Auto-updated on changes |

**Relations:** Sessions, LearningPaths, TutorSessions, Notes, FlashcardDecks, QuizAttempts, RoomMemberships

#### Session (`sessions`)
Stores refresh tokens for JWT rotation (schema exists but **not yet implemented** in code).

| Field | Type | Notes |
|-------|------|-------|
| `refreshToken` | String (unique) | Token for silent refresh |
| `userAgent` | String? | Browser/device info |
| `ipAddress` | String? | Request origin |
| `expiresAt` | DateTime | Token expiry |

#### TutorSession (`tutor_sessions`)
Each AI tutoring conversation is a session tied to a topic.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (cuid) | Primary key |
| `topic` | String | Subject of the tutoring session |
| `userId` | String | Foreign key to User |
| `messages` | TutorMessage[] | All chat messages in this session |

#### TutorMessage (`tutor_messages`)
Individual messages within a tutor session.

| Field | Type | Notes |
|-------|------|-------|
| `role` | String | `user` or `assistant` |
| `content` | String (Text) | Full message content |
| `metadata` | Json? | AI insights, confidence scores, etc. |
| `sessionId` | String | Foreign key to TutorSession |

#### LearningPath (`learning_paths`)
AI-generated structured learning roadmaps.

| Field | Type | Notes |
|-------|------|-------|
| `topic` | String | What is being learned |
| `goal` | Goal | Exam, Skill, Interview, etc. |
| `phases` | Json | Structured phases with metadata |
| `progress` | Float | Completion percentage (0–100) |
| `nodes` | PathNode[] | Individual learning nodes |

#### PathNode (`path_nodes`)
Individual topics within a learning path.

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Node/topic name |
| `phase` | Int | Which phase this belongs to |
| `order` | Int | Order within the phase |
| `status` | NodeStatus | `LOCKED` / `ACTIVE` / `COMPLETED` |
| `resources` | Json? | Curated resources for this node |

#### Note (`notes`)
Smart notes generated from video lectures.

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Note title |
| `sourceUrl` | String? | Original video/content URL |
| `sourceType` | String? | `youtube`, `nptel`, `coursera`, etc. |
| `content` | Json | Structured: concepts, formulas, diagrams, definitions |

#### FlashcardDeck (`flashcard_decks`)
Collections of flashcards with spaced repetition.

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Deck name |
| `cards` | Flashcard[] | Individual flashcards |

#### Flashcard (`flashcards`)
Individual flashcards with full SRS (Spaced Repetition System) fields.

| Field | Type | Notes |
|-------|------|-------|
| `front` | String | Question/prompt side |
| `back` | String | Answer side |
| `nextReview` | DateTime | When to show again (SRS) |
| `interval` | Int | Days between reviews (defaults 0) |
| `easeFactor` | Float | SM-2 ease factor (defaults 2.5) |

#### QuizAttempt (`quiz_attempts`)
Records of quiz attempts with performance data.

| Field | Type | Notes |
|-------|------|-------|
| `topic` | String | Quiz topic |
| `score` | Float | Score achieved |
| `totalQs` | Int | Total questions |
| `weakAreas` | Json? | AI-identified weak areas |

#### StudyRoom (`study_rooms`)
Virtual rooms for collaborative studying.

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Room name |
| `topic` | String | Study topic |
| `isActive` | Boolean | Whether room is currently active |
| `members` | RoomMember[] | Room participants |

#### RoomMember (`room_members`)
Membership in a study room.

| Field | Type | Notes |
|-------|------|-------|
| `role` | String | `host` or `member` |
| `userId` | String | Foreign key to User |
| `roomId` | String | Foreign key to StudyRoom |

---

## 5. Core Features — Detailed Plan

### Feature 1: 🎯 Personalized AI Tutor — *"Data-Driven, Not Just a Chatbot"*

> *"An AI that knows you better than you know yourself."*

**What It Does:**
- **Learner Level Detection** — AI diagnostic assessment on first use (not self-reported)
- **Performance Memory** — Tracks every interaction, quiz, and struggle point
- **Speed Adaptation** — Adjusts pacing based on how fast you grasp concepts
- **Weakness Tracking** — Builds a real-time weakness map per subject

**Technical Implementation:**

| Component | Description |
|-----------|-------------|
| **Knowledge Graph** | Maps what the student knows vs. what they need to know |
| **Learning Profile** | Stores learning style, pace, strengths, weaknesses |
| **Adaptive Engine** | Adjusts content difficulty, format, and depth in real-time |
| **Session Memory** | Remembers past conversations, mistakes, and breakthroughs |

**Current Status:** ✅ **Working** — Integrated with Google Gemini Pro. The tutor creates sessions per topic, maintains full chat history in the database, sanitizes message roles for the Gemini API (merging consecutive same-role messages, ensuring history starts with 'user'), and generates contextual AI responses. Falls back to mock responses if `GEMINI_API_KEY` is not configured.

**Key Differentiator:** Not a generic chatbot — it's a persistent tutor that builds a mental model of each student over time.

---

### Feature 2: 🗺️ AI Learning Path Generator — *"Structure from Chaos"*

> *"Turn any topic into a clear learning roadmap."*

**What It Does:**
- Input: Any topic (e.g., "Machine Learning", "Indian Constitution", "Organic Chemistry")
- Output: A structured learning path with phases, ordered concepts, resources, and milestones

**Example Output:**
```
📌 Topic: Machine Learning
│
├── Phase 1: Foundations
│   ├── Linear Algebra Basics
│   ├── Probability & Statistics
│   └── Python for ML
│
├── Phase 2: Core ML
│   ├── Supervised Learning
│   ├── Unsupervised Learning
│   └── Model Evaluation
│
├── Phase 3: Deep Learning
│   ├── Neural Networks
│   ├── CNNs & RNNs
│   └── Transfer Learning
│
└── Phase 4: Projects & Assessment
    ├── Capstone Project
    ├── Revision Sprint
    └── Final Assessment
```

**The Learning Loop:** `Concepts (ordered) → Resources → Practice → Revision → Assessment → Repeat`

**Current Status:** ⚠️ Prisma schema exists (`LearningPath` + `PathNode` models), UI page exists, but **no API endpoint or AI generation logic** is built yet.

**Key Differentiator:** Students don't lack content — they lack structure. This is EvolveEd's engine, not just a search tool.

---

### Feature 3: 🧪 Smart Level Assessment — *"Don't Guess, Diagnose"*

> *"Know exactly where you stand before you start."*

**What It Does:**
- AI Diagnostic Quiz before starting any topic
- Replaces manual level selection (Basic/Intermediate/Advanced)
- Prevents overestimation/underestimation of skills

**How It Works:**
1. Student types a topic
2. AI generates a 5–10 question adaptive quiz
3. Questions get harder/easier based on responses
4. AI places student at the precise level
5. Student can still override if they disagree

**Example Output:**
```
📊 Your Level: Intermediate (Score: 68/100)
   ✅ Strong: Basic concepts, terminology
   ⚠️ Gaps: Application problems, edge cases
   🎯 Recommended Start: Chapter 4 — Advanced Applications
```

**Current Status:** ❌ Not started — no backend or frontend implementation.

---

### Feature 4: 📚 AI-Curated Learning Resources — *"Not Best, but Right for You"*

> *"AI-curated resources ranked by clarity, depth, and your level."*

**What It Does:**
- Curates videos + articles + interactive explanations
- Ranks resources by clarity, depth, learner level, and community rating

| Type | Source | Use Case |
|------|--------|----------|
| Video Lectures | YouTube, NPTEL, Khan Academy | Visual learners |
| Articles | Medium, Docs, Textbooks | Reading learners |
| Interactive | Simulations, Codepens | Hands-on learners |
| Diagrams | AI-generated | Quick reference |

**Current Status:** ❌ Not started — no backend or frontend implementation.

**Key Differentiator:** Not "best" (subjective) — "right for you" (data-driven). Avoids copyright risk by linking, not hosting.

---

### Feature 5: 📝 Smart Notes Engine — *"Exam-Ready, Not Raw Transcripts"*

> *"From video to exam-ready notes in seconds."*

**What It Does:** Converts any video lecture into structured, intelligent notes — not raw transcripts.

**Output Structure:**
```
📝 Smart Notes: Photosynthesis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔑 Key Concepts
   • Light-dependent reactions occur in thylakoid membranes
   • Calvin cycle fixes CO₂ into glucose

📐 Formulas
   • 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂

📊 Diagram Summary
   [AI-generated diagram of light reactions]

💡 Examples
   • Real-world: Why plants are green (chlorophyll absorption spectrum)

📌 Definitions
   • Photosynthesis: Process by which plants convert light energy...
   • Chloroplast: Organelle where photosynthesis occurs...

⚡ Quick Revision Points
   • 3 things to remember for exam...
```

**Current Status:** ❌ UI shell only — Prisma `Note` model exists, frontend page exists, but **no video processing or note generation logic**.

#### Smart Notes Pipeline

```mermaid
flowchart LR
    A["Video URL"] --> B["Whisper API"]
    B --> C["Raw Transcript"]
    C --> D["Gemini AI"]
    D --> E["Key Concepts"]
    D --> F["Formulas"]
    D --> G["Diagrams"]
    D --> H["Definitions"]
    D --> I["Revision Points"]
    E --> J["Structured Note"]
    F --> J
    G --> J
    H --> J
    I --> J
    J --> K[("Save to DB")]

    style A fill:#94a3b8,color:#000
    style D fill:#8B5CF6,color:#fff
    style J fill:#06B6D4,color:#fff
    style K fill:#10b981,color:#fff
```

**Key Differentiator:** Not a transcript dump — exam-ready notes with concepts, formulas, diagrams, and definitions automatically extracted.

---

### Feature 6: 🎯 Goal-Based Learning — *"Outcome-Driven, Not Content-Driven"*

> *"Tell us WHY you're learning, and we'll change HOW we teach."*

**What It Does:** AI changes its entire teaching approach based on the student's goal:

| Goal | AI Behavior | Focus Areas |
|------|-------------|-------------|
| 🎓 **Exam Prep** | Scoring topics, MCQs, previous year patterns | Speed, accuracy, coverage |
| 💼 **Skill Building** | Projects, real-world use cases, portfolio | Depth, application, building |
| 🎤 **Interview Prep** | Questions, problem-solving, mock interviews | Communication, thinking process |
| 🔍 **Curiosity** | Deep concept exploration, "why" explanations | Understanding, connections |
| 📜 **Certification** | Syllabus-mapped, practice tests, requirements | Completion, compliance |

**User Flow:**
```
Step 1: "What are you learning?" → Machine Learning
Step 2: "Why are you learning it?" → Job Interview
Step 3: AI configures → Interview-focused path with mock questions
```

**Current Status:** ❌ UI shell only — `Goal` enum exists in schema and `User.goal` field is defined, but **no goal-based adaptation logic**.

**Key Differentiator:** 🔥 This is what most edtech misses. Same topic, completely different experience based on intent.

---

### Feature 7: 🔄 Continuous Learning Loop — *"AI That Learns You"*

> *"A thinking partner that evolves with every session."*

| Feature | Description |
|---------|-------------|
| **Pace Detection** | Learns how fast you grasp new concepts |
| **Confusion Detection** | Identifies when you're stuck (repeated questions, wrong answers) |
| **Auto-Revision** | Automatically schedules review of weak areas |
| **Progressive Difficulty** | Gradually increases challenge level |
| **Style Adaptation** | Switches between visual/textual/interactive based on engagement |

**The Loop:** `Learn → Practice → Struggle? → AI Adapts → Re-teach differently → Practice again → Master ✅`

#### Continuous Learning Loop Diagram

```mermaid
flowchart LR
    A["Learn New Concept"] --> B["Practice"]
    B --> C{"Struggling?"}
    C -->|"Yes"| D["AI Detects Confusion"]
    D --> E["AI Adapts Approach"]
    E --> F["Re-teach Differently"]
    F --> B
    C -->|"No"| G["Increase Difficulty"]
    G --> H["Master"]
    H --> A

    style A fill:#8B5CF6,color:#fff
    style D fill:#f97316,color:#fff
    style E fill:#06B6D4,color:#fff
    style H fill:#10b981,color:#fff
```

**Behind the Scenes:**
- **Engagement Score:** Tracks time-on-task, interaction frequency
- **Comprehension Score:** Tracks quiz performance, question quality
- **Confidence Score:** Tracks self-reported + AI-estimated confidence

**Current Status:** ❌ Not started — this is a complex, data-driven system requiring significant backend work.

---

### Feature 8: 🃏 Smart Practice Engine — *"Retention, Not Repetition"*

> *"AI-powered flashcards, quizzes, and exam simulations."*

**a) Flashcards with Spaced Repetition:**
```
Card appears → You answer → AI schedules next review:
  ✅ Got it right → Show again in 3 days
  ❌ Got it wrong → Show again in 1 hour
  🤔 Partially right → Show again tomorrow
```
The Prisma `Flashcard` model already has `nextReview`, `interval`, and `easeFactor` fields implementing the SM-2 algorithm.

**b) Weak-Topic-Focused Quizzes:**
- AI generates quizzes targeting your weakest areas
- Not random questions — strategically selected for maximum improvement

**c) Exam Simulation Mode:**
- Full-length mock exams matching real exam patterns
- Timer, negative marking, section-wise analysis
- Post-exam AI analysis: "You lost 12 marks in Thermodynamics — here's why"

**Current Status:** ❌ Prisma schemas exist (`FlashcardDeck`, `Flashcard`, `QuizAttempt`), UI shell exists, but **no backend API or logic**.

#### Spaced Repetition Flow

```mermaid
flowchart TD
    A["Show Flashcard"] --> B{"User Answers"}
    B -->|"Correct"| C["Increase Interval"]
    B -->|"Wrong"| D["Reset Interval"]
    B -->|"Partial"| E["Slight Decrease"]
    C --> F["Update easeFactor"]
    D --> F
    E --> F
    F --> G["Calculate nextReview"]
    G --> H[("Save to DB")]
    H --> I{"More cards due?"}
    I -->|"Yes"| A
    I -->|"No"| J["Session Complete"]

    style A fill:#8B5CF6,color:#fff
    style G fill:#06B6D4,color:#fff
    style J fill:#10b981,color:#fff
```

---

### Feature 9: 👥 Community Learning — *"Learn Together, Grow Together"*

> *"Social learning with AI as your moderator."*

| Feature | Description |
|---------|-------------|
| **Study Rooms** | Virtual rooms where friends study together with AI assistance |
| **Group Challenges** | Weekly topic challenges with leaderboards |
| **AI Moderator** | AI explains concepts when the group is stuck |
| **Peer Teaching** | Students earn XP by helping others |
| **Leaderboards** | Competitive motivation through ranking |

**Study Room Flow:** `Create Room → Invite Friends → Set Topic → AI Guides Discussion → AI asks questions → Group solves → AI scores & explains`

**Current Status:** ❌ Prisma schemas exist (`StudyRoom`, `RoomMember`), UI shell exists, but **no backend API or real-time logic**.

---

### Feature 10: 🖥️ All-in-One Platform — *"The Operating System for Learning"*

> *"Everything you need. Nothing you don't. Zero app switching."*

| Before (Multiple Apps) | After (EvolveEd) |
|------------------------|-------------------|
| YouTube for videos | ✅ Built-in |
| Notion for notes | ✅ Built-in |
| Anki for flashcards | ✅ Built-in |
| ChatGPT for doubts | ✅ Built-in |
| Google for resources | ✅ Built-in |
| Quizlet for quizzes | ✅ Built-in |

---

## 6. Design System

The design aesthetic is **Futuristic, Neon-Dark, and Deep Space**. It uses a very dark, near-black background with vibrant violet primary accents and cyan secondary highlights. The interface relies heavily on glassmorphism, glows, and rounded elements.

### Color Palette

| Token | Value | HSL | Role |
|-------|-------|-----|------|
| `--color-primary` | `#8B5CF6` | Violet | Core brand: buttons, accents, focus rings, CTAs |
| `--color-secondary` | `#06B6D4` | Cyan | Data viz, XP, tech accents, links, badges |
| `--color-background` | `#050507` | Near-black | Main page background |
| `--color-card` | `rgba(255,255,255,0.03)` | — | Card backgrounds with transparency |
| `--color-foreground` | `#f0f0f5` | Warm white | Primary text color |
| `--color-muted-foreground` | `#94a3b8` | Silver mist | Secondary/body text |
| `--color-border` | `rgba(255,255,255,0.08)` | — | Subtle borders |
| `--color-success` | `#10b981` | Emerald | Mastery indicators, positive states |
| `--color-streak` | `#f97316` | Orange | Streak badges, gamification |
| `--color-destructive` | `#ef4444` | Red | Error states, destructive actions |

### Component Styles

| Component | Classes | Description |
|-----------|---------|-------------|
| **Glass Card** | `glass-card` | `bg-white/3`, `backdrop-blur(24px)`, `border-white/8`, `rounded-xl` |
| **Elevated Card** | `glass-card-elevated` | Same + stronger opacity, `box-shadow: 0 8px 32px rgba(0,0,0,0.3)` |
| **Primary Glow** | `glow-primary` | `box-shadow: 0 0 20px rgba(139,92,246,0.3)` |
| **Text Gradient** | `text-gradient-primary` | Violet → Cyan gradient on text |
| **Pill Input** | `pill-input` | Rounded input with glass background, purple focus glow |
| **XP Bar** | `xp-bar` + `xp-bar-fill` | Cyan→Violet gradient progress bar with glow |
| **Animated Orbs** | `orb orb-primary` | Floating, pulsing background blobs |
| **Streak Badge** | `streak-badge` | Orange-themed badge with gradient background |
| **Level Badge** | `level-badge` | Violet-themed badge with gradient background |

### Typography

- **Font Family:** `Inter` (via `--font-geist-sans`)
- **Headings:** Bold, tight tracking
- **Body:** Readable, `text-slate-400` for secondary text on dark backgrounds

### Layout Principles

- **Spacing:** Generous whitespace (`gap-8`, section padding 80–120px)
- **Container:** `max-w-7xl` for main content areas
- **Grid:** Heavily used for dashboard card layouts
- **Animations:** Smooth 300ms transitions, hover scale effects, floating elements
- **Scrollbar:** Minimal custom scrollbar (6px wide, translucent thumb)

---

## 7. Site Pages & Routing

### Route Configuration

All routes are centralized in `lib/routes.ts`:

```typescript
export const ROUTES = {
    HOME: "/",
    FEATURES: "/#features",
    PRICING: "/pricing",
    ABOUT: "/about",
    COMMUNITY: "/community",
    CONTACT: "/contact",
    PRIVACY: "/privacy",
    TERMS: "/terms",
    HELP: "/help",

    SHOWCASE: {
        AI_TUTOR: "/showcase/ai-tutor",
        SMART_NOTES: "/showcase/smart-notes",
        GOALS: "/showcase/goal-learning",
    },

    AUTH: {
        LOGIN: "/login",
        SIGNUP: "/register",
        FORGOT_PASSWORD: "/auth/forgot-password",
    },

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
```

### Page Map

| Route Group | Page | Path | Connected to API? |
|-------------|------|------|--------------------|
| **Marketing** | Landing Page | `/` | No |
| **Marketing** | About | `/about` | No |
| **Marketing** | Pricing | `/pricing` | No |
| **Marketing** | Community | `/community` | No |
| **Marketing** | Contact | `/contact` | No |
| **Marketing** | Privacy | `/privacy` | No |
| **Marketing** | Terms | `/terms` | No |
| **Marketing** | Help | `/help` | No |
| **Marketing** | AI Tutor Showcase | `/showcase/ai-tutor` | No |
| **Marketing** | Smart Notes Showcase | `/showcase/smart-notes` | No |
| **Marketing** | Goal Learning Showcase | `/showcase/goal-learning` | No |
| **Auth** | Login | `/login` | ✅ `POST /api/auth/login` |
| **Auth** | Register | `/register` | ✅ `POST /api/auth/register` |
| **Dashboard** | Home | `/dashboard` | ✅ `GET /api/dashboard/overview/:userId` |
| **Dashboard** | AI Tutor | `/dashboard/ai-tutor` | ✅ Full Gemini chat flow |
| **Dashboard** | Learning Paths | `/dashboard/learning-paths` | ❌ UI only |
| **Dashboard** | Practice | `/dashboard/practice` | ❌ UI only |
| **Dashboard** | Smart Notes | `/dashboard/smart-notes` | ❌ UI only |
| **Dashboard** | Community | `/dashboard/community` | ❌ UI only |
| **Dashboard** | Goals | `/dashboard/goals` | ❌ UI only |
| **Dashboard** | Settings | `/dashboard/settings` | ⚠️ Partial (no PATCH endpoint) |

### Dashboard Layout

The dashboard uses a fixed sidebar (hidden on mobile) + top header layout:
- **Sidebar:** Navigation links to all dashboard pages, user info at bottom
- **Header:** Search, notifications, user avatar
- **Auth Guard:** The `(dashboard)/layout.tsx` checks `isAuthenticated` from `AuthContext` and redirects to `/login` if not logged in. Shows a loading spinner while checking auth state.

#### Frontend Page Hierarchy

```mermaid
graph TD
    ROOT["RootLayout"] --> MKT["Marketing Pages"]
    ROOT --> AUTH_PAGES["Auth Pages"]
    ROOT --> DASH["Dashboard Layout"]

    MKT --> HOME["/"]
    MKT --> ABOUT["/about"]
    MKT --> PRICING["/pricing"]
    MKT --> COMMUNITY["/community"]
    MKT --> SHOWCASE["Showcase Pages"]

    AUTH_PAGES --> LOGIN["/login"]
    AUTH_PAGES --> REGISTER["/register"]

    DASH --> DHOME["/dashboard"]
    DASH --> TUTOR["/dashboard/ai-tutor"]
    DASH --> PATHS["/dashboard/learning-paths"]
    DASH --> PRACTICE["/dashboard/practice"]
    DASH --> NOTES["/dashboard/smart-notes"]
    DASH --> COMM["/dashboard/community"]
    DASH --> GOALS["/dashboard/goals"]
    DASH --> SETTINGS["/dashboard/settings"]

    style DHOME fill:#10b981,color:#fff
    style TUTOR fill:#10b981,color:#fff
    style PATHS fill:#f97316,color:#fff
    style PRACTICE fill:#f97316,color:#fff
    style NOTES fill:#f97316,color:#fff
    style COMM fill:#f97316,color:#fff
    style GOALS fill:#f97316,color:#fff
    style SETTINGS fill:#f97316,color:#fff
    style LOGIN fill:#10b981,color:#fff
    style REGISTER fill:#10b981,color:#fff
```

> **Legend:** 🟢 Green = Connected to API | 🟠 Orange = UI shell only

---

## 8. Backend API Reference

### NestJS Module Structure

```mermaid
graph TD
    APP["AppModule"] --> CONFIG["ConfigModule"]
    APP --> PRISMA["PrismaModule"]
    APP --> AUTH["AuthModule"]
    APP --> USERS["UsersModule"]
    APP --> TUTOR["TutorModule"]
    APP --> DASH["DashboardModule"]

    AUTH --> USERS
    AUTH --> JWT["JwtModule"]
    AUTH --> PASSPORT["PassportModule"]

    TUTOR --> PRISMA
    DASH --> PRISMA
    USERS --> PRISMA
    AUTH --> PRISMA

    TUTOR --> GEMINI["Gemini AI SDK"]

    style APP fill:#8B5CF6,color:#fff
    style PRISMA fill:#06B6D4,color:#fff
    style AUTH fill:#10b981,color:#fff
    style GEMINI fill:#f97316,color:#fff
```

### Authentication Endpoints

| Method | Endpoint | Body | Response | Notes |
|--------|----------|------|----------|-------|
| `POST` | `/api/auth/register` | `{ email, name, password }` | `{ access_token, user }` | Creates user with argon2-hashed password |
| `POST` | `/api/auth/login` | `{ email, password }` | `{ access_token, user }` | Validates credentials, returns JWT |
| `GET` | `/api/auth/me` | — | `{ user }` | **JWT Protected** — returns current user from token |

**Auth Flow Details:**
1. `RegisterDto` and `LoginDto` use `class-validator` for input validation
2. Passwords are hashed with `argon2` in `UsersService.create()`
3. JWT payload includes `{ email, sub: userId, role }`
4. JWT strategy uses `DIRECT_URL` secret from env vars
5. `JwtAuthGuard` protects routes and extracts user from token

#### Authentication Flow Diagram

```mermaid
sequenceDiagram
    participant U as User Browser
    participant FE as Next.js Frontend
    participant API as NestJS API
    participant DB as PostgreSQL

    Note over U,DB: Registration Flow
    U->>FE: Fill register form
    FE->>API: POST /api/auth/register
    API->>API: Check if email exists
    API->>API: Hash password with argon2
    API->>DB: Create User record
    DB-->>API: User created
    API->>API: Sign JWT token
    API-->>FE: { access_token, user }
    FE->>FE: Store in localStorage
    FE-->>U: Redirect to /dashboard

    Note over U,DB: Login Flow
    U->>FE: Fill login form
    FE->>API: POST /api/auth/login
    API->>DB: Find user by email
    DB-->>API: User record
    API->>API: Verify password with argon2
    API->>API: Sign JWT token
    API-->>FE: { access_token, user }
    FE->>FE: Store in localStorage
    FE-->>U: Redirect to /dashboard

    Note over U,DB: Protected Request
    U->>FE: Navigate to dashboard
    FE->>API: GET /api/auth/me + Bearer token
    API->>API: JwtAuthGuard validates token
    API-->>FE: { user }
    FE-->>U: Render dashboard
```

### AI Tutor Endpoints

| Method | Endpoint | Body/Params | Response | Notes |
|--------|----------|-------------|----------|-------|
| `POST` | `/api/tutor/session` | `{ userId, topic }` | `TutorSession` with initial greeting | Creates new chat session |
| `GET` | `/api/tutor/sessions/:userId` | — | `TutorSession[]` (latest first) | Lists all sessions (1 message preview each) |
| `GET` | `/api/tutor/session/:id/:userId` | — | `TutorSession` with all messages | Full session with complete chat history |
| `POST` | `/api/tutor/message` | `{ sessionId, userId, content }` | `TutorMessage` (AI response) | Sends user message, generates Gemini AI response |

**Gemini Integration Details:**
1. Initializes `GoogleGenerativeAI` with `GEMINI_API_KEY` from env
2. Uses `gemini-pro` model
3. For each message, fetches last 50 messages as context
4. Sanitizes history: merges consecutive same-role messages
5. Ensures history starts with `user` role (Gemini requirement)
6. Creates a chat session with history and sends the new message
7. Falls back to mock response if API key is missing or API errors

#### AI Tutor Message Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as TutorService
    participant DB as PostgreSQL
    participant AI as Gemini AI

    U->>FE: Type message and send
    FE->>API: POST /api/tutor/message
    API->>DB: Save user message
    API->>DB: Fetch last 50 messages
    DB-->>API: Chat history
    API->>API: Sanitize history for Gemini
    API->>API: Merge consecutive same-role
    API->>API: Ensure starts with user role
    API->>AI: Send chat with history
    AI-->>API: AI response text
    API->>DB: Save assistant message
    API->>DB: Update session timestamp
    API-->>FE: Return AI message
    FE-->>U: Display response
```

### Dashboard Endpoints

| Method | Endpoint | Body/Params | Response | Notes |
|--------|----------|-------------|----------|-------|
| `GET` | `/api/dashboard/overview/:userId` | — | `{ user, stats, recentActivity, recommended }` | Stats are partially mock |
| `GET` | `/api/dashboard/courses/:userId` | — | `LearningPath[]` or mock data | Falls back to mock if no paths exist |

### User Endpoints

The `UsersService` has full CRUD methods (`create`, `findAll`, `findOne`, `findByEmail`, `update`, `remove`) but the `UsersController` does **not** expose `update` or `remove` routes yet. The Settings page tries to call `PATCH /users/:id` which will fail.

---

## 9. Frontend Structure

### State Management

Auth state is managed via React Context (`AuthContext`):
- **State:** `user`, `token`, `isAuthenticated`, `isLoading`
- **Actions:** `login()`, `logout()`, `updateUser()`
- **Persistence:** JWT and user object stored in `localStorage` as `evolveed_token` and `evolveed_user`
- **Initialization:** On mount, checks localStorage for existing session

### API Client

The `lib/api.ts` file creates an axios instance pointing to `http://localhost:4000/api` with:
- Content-Type JSON header
- Response interceptor that logs 401 errors
- `setAuthToken()` helper that sets/clears the `Authorization: Bearer` header

### Component Library

| Folder | Components | Purpose |
|--------|-----------|---------|
| `components/ui/` | Button, Avatar, AvatarFallback, AvatarImage, Switch, ScrollArea | shadcn/ui primitives |
| `components/dashboard/` | Sidebar, Header | Dashboard chrome |
| `components/marketing/` | Various landing page sections | Public marketing pages |

### Key Dashboard Pages — Implementation Details

**Dashboard Home (`/dashboard`):**
- Fetches `GET /api/dashboard/overview/:userId` on mount
- Displays 4 stat cards: Learning Time, XP, Streak, Weekly Goal
- Shows "Continue Learning" section with progress bars (currently hardcoded)
- AI Tutor quick access card showing recent topic
- Quick actions linking to Learning Paths

**AI Tutor (`/dashboard/ai-tutor`):**
- On mount, fetches existing sessions → loads latest, or creates new one
- Chat interface with user/AI message bubbles
- Suggestion chips for quick prompts
- "New Session" button to create fresh sessions
- Auto-scroll on new messages
- Loading state shows "AI is thinking..."

**Settings (`/dashboard/settings`):**
- Profile editing (name, bio) with Framer Motion animations
- Notification toggles (Study Reminders, Goal Progress, Community Updates)
- Theme selector (Evolve Dark, Midnight Blue, AMOLED Black) — UI only
- Account actions: Subscription, Privacy, Language, Logout

---

## 10. Infrastructure & DevOps

### Docker Setup (`docker-compose.yml`)

```yaml
services:
  postgres:
    image: postgres:17-alpine
    container_name: evolveed-db
    environment:
      POSTGRES_USER: evolveed
      POSTGRES_PASSWORD: evolveed_dev
      POSTGRES_DB: evolveed
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: evolveed-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
```

### Environment Variables

| Variable | Example | Used By |
|----------|---------|---------|
| `DATABASE_URL` | `postgresql://evolveed:evolveed_dev@localhost:5432/evolveed` | Prisma / API |
| `DIRECT_URL` | Same as DATABASE_URL | Prisma (direct connection) |
| `REDIS_URL` | `redis://localhost:6379` | Planned |
| `JWT_SECRET` | Secret key string | Auth module |
| `JWT_REFRESH_SECRET` | Secret key string | Planned (refresh tokens) |
| `GEMINI_API_KEY` | Google AI API key | AI Tutor |
| `API_PORT` | `4000` | NestJS server |
| `FRONTEND_URL` | `http://localhost:3000` | CORS config |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api` | Frontend axios client |
| `GOOGLE_CLIENT_ID` | OAuth client ID | Planned (Google login) |
| `GITHUB_CLIENT_ID` | OAuth client ID | Planned (GitHub login) |

### Development Commands

| Command | Purpose |
|---------|---------|
| `pnpm run dev` | Start both frontend and backend (via Turborepo) |
| `pnpm run dev:web` | Start only the Next.js frontend |
| `pnpm run dev:api` | Start only the NestJS backend |
| `pnpm run db:push` | Push Prisma schema to database (no migration) |
| `pnpm run db:migrate` | Create and run Prisma migrations |
| `pnpm run db:studio` | Open Prisma Studio (database GUI) |
| `pnpm run build` | Build both apps for production |

### Server Configuration

The NestJS server (`main.ts`) configures:
- **Fastify adapter** for high-performance HTTP
- **Global ValidationPipe** with `whitelist`, `forbidNonWhitelisted`, `transform`
- **CORS** allowing `FRONTEND_URL` (defaults to `http://localhost:3000`)
- **Global prefix** `/api` for all routes
- **Swagger** documentation at `/api/docs`
- **Port** from `API_PORT` env (defaults to 4000), binding to `0.0.0.0`

---

## 11. Code Quality Observations

### ✅ Strengths

1. **Clean monorepo structure** — Turborepo + pnpm workspaces with clear app separation
2. **Well-designed Prisma schema** — All 12 models have proper relations with cascading deletes, mapped table names, and appropriate field types
3. **Production-quality UI** — The glassmorphism design system with animated orbs, glow effects, and smooth transitions is polished and cohesive
4. **Centralized routes** — `routes.ts` prevents hardcoded path strings across the frontend
5. **Solid auth flow** — argon2 password hashing, JWT tokens, protected dashboard layout with redirect
6. **API documentation** — Swagger auto-generated from NestJS decorators

### ⚠️ Issues & Risks

| # | Issue | Severity | Location | Impact |
|---|-------|----------|----------|--------|
| 1 | **No auth guards on tutor/dashboard routes** | 🔴 Critical | `tutor.controller.ts`, `dashboard.controller.ts` | Any user can access another user's data by guessing their userId |
| 2 | **Debug file writes in production code** | 🟡 Medium | `tutor.service.ts` lines 124–127 | `fs.writeFileSync` writes `history_dump.json` on every message send |
| 3 | **Hardcoded absolute paths** for error logging | 🟡 Medium | `tutor.service.ts` lines 144–145 | Uses `d:\\evolveed\\...` path — will break in any other environment |
| 4 | **TypeScript `any` types** used throughout | 🟡 Medium | Dashboard page, AI Tutor page | `useState<any>` loses type safety; should use proper interfaces |
| 5 | **Settings page calls missing endpoint** | 🟡 Medium | `settings/page.tsx` line 30 | `PATCH /users/:id` is not defined in `UsersController` |
| 6 | **Mock/hardcoded data** in Dashboard service | 🟠 Low | `dashboard.service.ts` lines 36–43 | Stats like `hoursLearned: 12.5` and `recommended` courses are fake |
| 7 | **Session model unused** | 🟠 Low | `schema.prisma` | Refresh token table exists but no implementation |
| 8 | **No input DTOs** on tutor endpoints | 🟡 Medium | `tutor.controller.ts` | Body params are destructured directly without validation decorators |
| 9 | **`history` variable scope issue** | 🟡 Medium | `tutor.service.ts` line 144 | `history` is referenced in the catch block but declared in the try block |
| 10 | **localStorage for auth** | 🟠 Low | `AuthContext.tsx` | Vulnerable to XSS; httpOnly cookies would be more secure |

---

## 12. Monetization Strategy

| Tier | Price | Features |
|------|-------|----------|
| **Free (Explorer)** | ₹0 | 3 topics/month, basic AI tutor, limited quizzes |
| **Pro (Evolver)** | ₹299/month | Unlimited topics, Smart Notes, full practice engine |
| **Premium (Master)** | ₹599/month | Everything + Study Rooms, Exam Simulations, Priority AI |
| **Institutional** | Custom | Bulk licensing for schools/coaching centers |

---

## 13. Development Roadmap

### Phase 1 — MVP (Weeks 1–4)
- [x] Project setup (Turborepo monorepo, NestJS, Next.js, Prisma, Docker)
- [x] Authentication (JWT + argon2 register/login)
- [x] AI Tutor — basic chat with Gemini + session memory
- [x] Basic Dashboard — stats overview + recent activity
- [x] UI design system — glassmorphism, dark theme, component library
- [ ] Learning Path Generator — AI-powered path creation
- [ ] Level Assessment Quiz — adaptive diagnostic
- [ ] Resource Curation — video + article recommendations

### Phase 2 — Core Features (Weeks 5–8)
- [ ] Smart Notes Engine (video → notes via Whisper + Gemini)
- [ ] Goal-Based Learning adaptation logic
- [ ] Flashcards with Spaced Repetition (SM-2 algorithm)
- [ ] Quiz Generator with weak-area targeting
- [ ] Progress Analytics dashboard (real computed data)

### Phase 3 — Social & Advanced (Weeks 9–12)
- [ ] Study Rooms with real-time communication
- [ ] Community Features & Leaderboards
- [ ] Exam Simulation Mode
- [ ] Continuous Learning Loop (full adaptation engine)
- [ ] Mobile Responsive / PWA

### Phase 4 — Scale & Polish (Weeks 13–16)
- [ ] Performance optimization
- [ ] Advanced analytics & predictions
- [ ] Gamification logic (XP earning, badge system, streak tracking)
- [ ] API for institutional integration
- [ ] Beta launch

---

## 14. Recommended Next Steps

Based on the gap between plan and implementation, here are the highest-impact actions in priority order:

1. **🔒 Secure All Endpoints** — Add `@UseGuards(JwtAuthGuard)` to tutor and dashboard controllers. Extract `userId` from the JWT token (`@Request() req`) instead of URL params. This is the most critical fix.

2. **🧹 Code Cleanup** — Remove debug `fs.writeFileSync` from tutor service, remove hardcoded absolute paths, add proper DTOs with `class-validator` decorators for tutor endpoints, replace `any` types with proper TypeScript interfaces.

3. **🗺️ Build Learning Path Generator** — This is the platform's core differentiator. Use Gemini to generate structured learning paths from a topic + goal. Wire up to the existing `LearningPath` and `PathNode` Prisma models.

4. **📝 Implement Smart Notes** — Integrate Whisper API for video transcription, then Gemini for structured note extraction. Connect to the existing `Note` model.

5. **🃏 Wire Up Practice Engine** — The `Flashcard` schema already has SM-2 fields. Build the spaced repetition scheduling logic and quiz generation API.

6. **📊 Replace Mock Dashboard Data** — Compute real stats from the database: actual learning hours, computed XP from activity, streak from `lastActiveAt`, and recommended paths based on user's goal.

7. **⚙️ Add Missing Endpoints** — Implement `PATCH /users/:id` in `UsersController` so the Settings page works. Add `DELETE` route if needed.

8. **🔑 Implement OAuth** — The schema supports `provider` and `providerId` for Google/GitHub login. The env vars are configured. Wire up Passport strategies.
