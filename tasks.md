# Inventra Frontend — Task Tracker

## Legend
- `[ ]` Pending
- `[~]` In Progress
- `[X]` Completed

---

## Phase 1: Project Scaffolding & Tooling

- [X] Initialize Next.js 15 project with `/src` directory, App Router, TypeScript strict mode
- [X] Install & configure core dependencies: Tailwind CSS, Hero UI v3, TanStack Query, Recharts, React Toastify
- [X] Configure Tailwind theme (colors: cyber-violet, electric-cyan, radiant-emerald, slate neutrals)
- [X] Enable React Compiler in Next.js config
- [X] Set up ESLint, Prettier, and project-wide TypeScript path aliases (`@/` -> `src/`)
- [X] Create `.env.local` with `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL`

## Phase 2: Directory Structure

- [ ] Create `/src/app` route groups: `(auth)`, `(protected)`, `explore`, `items/[id]`
- [ ] Create `/src/components` sub-dirs: `ai/`, `cards/`, `common/`, `data/`
- [ ] Create `/src/config/`, `/src/hooks/`, `/src/services/`, `/src/types/`, `/src/utils/`

## Phase 3: Global Layout & Theme System

- [ ] Build ambient glow wrapper component (blurred radial gradients behind containers)
- [ ] Build sticky Navbar with backdrop blur, responsive hamburger drawer
  - [ ] Logged-out nav items: Explore Catalog, Features, Pricing
  - [ ] Logged-in nav items: Dashboard/Explore, Create AI Asset, Manage Inventory, Analytics, Support
  - [ ] User profile dropdown
- [ ] Build Footer component
- [ ] Create root `layout.tsx` wrapping all providers (QueryClient, Auth, Toast)

## Phase 4: Landing Page — 7 Mandatory Sections

- [ ] **Hero Section** — 60–70vh, interactive model selector, CTA to `/explore`, animated canvas
- [ ] **Core Features Grid** — Agentic execution, real-time memory sync, external tool engines
- [ ] **Live Platform Metrics** — Real-time counters via TanStack Query (execution count, latency, token volume)
- [ ] **Interactive Category Showcase** — Pre-built agent classifications with glow frames
- [ ] **Verified Client Testimonials** — Real technical use case cards
- [ ] **Curated Industry Insights** — Blog snippet grid
- [ ] **Dynamic CTA & Newsletter** — Email verification, automated onboarding

## Phase 5: Authentication UI

- [ ] Build Login page with validation schema, error display, Demo Login button
- [ ] Build Register page with validation, error display
- [ ] Integrate Google OAuth via Better Auth
- [ ] Implement `AuthContext` / session management hook

## Phase 6: Protected Routes & Middleware

- [ ] Create middleware that redirects unauthenticated users to `/login` with return URL
- [ ] Protect `/items/add`, `/items/manage`, `/analytics`, `/support` routes

## Phase 7: Explore / Catalog Page

- [ ] Build search bar + multi-field filter panel (Category, Pricing Tier, LLM Engine, Min Accuracy)
- [ ] Build sorting dropdown (Highest Rated, Most Downloaded, Lowest Latency, Recently Published)
- [ ] Build cursor-based pagination with active state & loading locks
- [ ] Build product card component (uniform 4-col grid, skeleton loading states)
- [ ] Wire up TanStack Query for fetching, caching, and optimistic updates

## Phase 8: Product Details Page

- [ ] Build split-view layout (media/code block + description)
- [ ] Render markdown `fullDescription` with parser
- [ ] Build Technical Specifications matrix (operational limits, context window, etc.)
- [ ] Build User Reviews timeline with ratings & timestamps

## Phase 9: AI Asset Content Generator (`/items/add`)

- [ ] Build multi-step form with core variable inputs
- [ ] Add dynamic sliders for output length, template parameters (Technical, Conversational, Enterprise)
- [ ] Integrate `POST /api/v1/ai/generate` for AI copy generation
- [ ] Allow human editing before submission
- [ ] Submit final asset to `POST /api/v1/items`

## Phase 10: Smart Recommendation Canvas

- [ ] Build sidebar anchored in Explore view
- [ ] Fetch recommendations via `POST /api/v1/ai/recommend` based on active filters
- [ ] Display recommended cards with click-to-view

## Phase 11: Inventory Management (`/items/manage`)

- [ ] Build tabular data table with deployed assets
- [ ] Add row actions: View Details, Edit Config modal, Delete with confirmation
- [ ] Wire up TanStack Query mutations for create/update/delete

## Phase 12: Analytics & Support Pages

- [ ] Build Analytics Panel with Recharts (usage, telemetry, charts)
- [ ] Build Support Desk page (ticket list + create ticket form)

## Phase 13: Services & API Layer

- [ ] Create Axios instance with base URL, interceptors, credentials config
- [ ] Create service modules: `auth`, `items`, `ai`, `users`
- [ ] Create TanStack Query hooks for all API endpoints

## Phase 14: Types & Utils

- [ ] Define TypeScript interfaces: `User`, `Product`, `AuthResponse`, `AIRequest`, `Pagination`
- [ ] Build utility functions: formatters, validators, helpers

## Phase 15: Deployment

- [ ] Configure production build scripts
- [ ] Set up CORS-compatible deployment (separate origin from backend)
- [ ] Deploy to Vercel / Netlify / Railway
