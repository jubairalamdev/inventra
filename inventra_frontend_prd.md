# Product Requirement Document (PRD) - Inventra Frontend
## Category: Full-Stack AI Product Catalog & E-Commerce Application
## Version: 1.1.0

---

### 1. Executive Summary & Project Overview
**Inventra** is a Next-Generation Full-Stack Agentic AI Product Catalog and E-Commerce platform designed to showcase, filter, test, and purchase production-grade AI assets, agents, and custom models. This document details the complete frontend architecture, layout configurations, page layouts, UI/UX systems, and integration points with the backend services.

#### Design Language & Theme System
*   **Visual Enhancements:** Ambient background glows (blurred radial gradients) behind container elements to soften borders, reduce cognitive load, and give a modern, premium "SaaS" appearance.
*   **Color Palette (Max 3 Primary/Accent Colors + Neutrals):**
    *   *Primary Accent (Brand identity):* Cyber Violet (`#6366f1` / Indigo-500)
    *   *Secondary Accent (Interactive elements):* Electric Cyan (`#06b6d4` / Cyan-500)
    *   *Semantic/Highlight Accent:* Radiant Emerald (`#10b981` / Emerald-500)
    *   *Neutrals:* Slate Deep (`#0f172a`), Dark Card (`#1e293b`), Text Muted (`#94a3b8`), Text Crisp (`#f8fafc`).

---

### 2. Technology Stack & Directory Architecture
The frontend application is built using modern, highly reactive, and structured layers to maximize scalability and type safety.

#### Core Dependencies
*   **Framework:** Next.js 15+ (App Router, using the `/src` directory architecture).
*   **Compilation:** React Compiler enabled for automated dependency and memoization optimizations.
*   **Language:** TypeScript (Strict Mode enabled).
*   **Styling:** Tailwind CSS with Hero UI v3 component suite for design uniformity.
*   **Data Fetching & State:** TanStack Query (`@tanstack/react-query`) for optimistic updates, server cache invalidation, and synchronized UI states.
*   **Visualizations:** Recharts for telemetry, usage analytics, and product interaction charts.
*   **Notifications:** React Toastify for reactive notifications and status updates.

#### Directory Layout (`/src`)
```text
src/
├── app/                  # App Router Pages & Layouts
│   ├── (auth)/           # Authentication Routes (login, register)
│   ├── (protected)/      # Protected Route Middleware Groups
│   │   ├── items/add     # Add Asset Multi-step Form
│   │   └── items/manage  # Admin/Vendor Inventory Control Table
│   ├── explore/          # Paginated & Filterable Catalog Explore Page
│   ├── items/[id]/       # Public Product Details Page with AI Features
│   ├── layout.tsx        # Global Layout with Global Context Providers
│   └── page.tsx          # 7-Section Interactive Landing Page
├── components/           # Reusable Atomic UI Blocks
│   ├── ai/               # AI Assistant Drawer, Recommendation Blocks
│   ├── cards/            # Unified Geometric Grid Cards & Skeletons
│   ├── common/           # Navbar, Footer, Glow Wrappers
│   └── data/             # Recharts Charts & Telemetry Visualizations
├── config/               # Theme configurations, Environment variables, API routes
├── hooks/                # Custom React & TanStack Hooks
├── services/             # Core Axios / Fetch abstractions mapped to API
├── types/                # Domain-Specific TypeScript Interfaces
└── utils/                # Functional formatters, validations, helpers
```

---

### 3. Comprehensive Layout & Routing Specifications

#### 3.1 Global Navigation Bar (Navbar)
*   **Behavior:** Sticky position (`top-0`), high `z-index`, backdrop blur filter with adaptive transparent borders.
*   **Logged-Out State Routes (Minimum 3):**
    1.  `Explore Catalog` (`/explore`)
    2.  `Features & Benchmarks` (`/#features`)
    3.  `Pricing / API Access` (`/#pricing`)
*   **Logged-In State Routes (Minimum 5):**
    1.  `Dashboard / Explore` (`/explore`)
    2.  `Create AI Asset` (`/items/add`)
    3.  `Manage Inventory` (`/items/manage`)
    4.  `Analytics Panel` (`/analytics`)
    5.  `Support Desk` (`/support`)
*   **Controls:** Integrates User Profile Dropdown and fully interactive mobile hamburger collapsible drawer.

#### 3.2 Home / Landing Page Layout (7 Mandatory Sections)
The landing page must maintain a strict vertical flow capped by visual ambient color glows behind individual layout blocks.
1.  **Hero Section:** Constrained strictly to `60-70vh` of the view window. Features an interactive model selector slider, direct Primary CTA to `/explore`, and an interactive visual canvas showing streaming AI agent requests.
2.  **Core Features Grid:** Alternating visual blocks spotlighting Agentic execution, real-time memory synchronization, and external tool execution engines.
3.  **Live Platform Metrics / Statistics:** Real-time counter components tracked via TanStack Query displaying global execution count, response latency matrices, and token volume efficiencies using modern typography.
4.  **Interactive Category Showcase:** Grid displaying pre-built agent classifications (e.g., Multimodal Vision, Generative Code, Autonomous Agents) backed by soft radial glowing frames.
5.  **Verified Client Testimonials:** Card layouts using standardized border radiuses and shadows with actual technical use cases (no dummy data allowed).
6.  **Curated Industry Insights (Blog Snippets):** Grid detailing specific production implementations, engineering guidelines, and agent prompt design strategies.
7.  **Dynamic Call To Action (CTA) & Newsletter:** Centered high-impact zone with email verification bindings linked directly to automated onboarding logic.

#### 3.3 Product Listing & Exploration Page (`/explore`)
*   **Search & Multi-Field Filtering:** Live search input coupled with a multi-parameter selector box (Filter fields: *Category*, *Pricing Tier*, *LLM Engine Architecture*, *Minimum Execution Accuracy*).
*   **Sorting Panel:** Dropdown interface supporting *Highest Rated*, *Most Downloaded*, *Lowest Latency*, and *Recently Published*.
*   **Pagination Layer:** Fully interactive cursor-based pagination footer showing active states and data loading locks.
*   **Card Uniformity Engine:** A strict 4-card per row desktop configuration grid. Every single card shares pixel-perfect uniform dimensions, border-radius specs, descriptive segments, evaluation metrics, and a structural view details button. Skeletons override the view dynamically when TanStack Query handles loading states.

#### 3.4 Multi-Media Product Details Page (`/items/[id]`)
*   **Visual Layout:** Split-view layout containing interactive code blocks or deployment media assets alongside primary descriptions.
*   **Overview Segment:** High-fidelity documentation markdown parser exposing product goals and base context parameters.
*   **Technical Specifications:** Structural layout matrix rendering operational limits, context window ceilings, and multi-node execution profiles.
*   **User Reviews Matrix:** Customer feedback timeline displaying real evaluation grades and timestamp telemetry.

---

### 4. Advanced Agentic AI Integrations
Inventra natively interfaces with two production-ready Agentic UI flows:

#### Feature A: Dynamic AI Asset Content Generator (`/items/add`)
*   **Execution Profile:** Integrated within the submission workflow. Users enter core variables (e.g., Application Core Identity, Base Domain Target).
*   **Interface Controls:** Dynamic slider adjustments for target text output layout lengths, custom template parameters (Technical, Conversational, Enterprise), and a standalone "Regenerate Content Matrix" interaction hook.
*   **State Control:** Integrates with local forms, permitting human editing before executing database state pushes.

#### Feature B: Context-Aware Smart Recommendation Canvas
*   **Execution Profile:** Real-time sidebar layout anchored inside the explorer view.
*   **Interface Controls:** Maps queries to endpoint hooks fetching relative multi-model agent options directly based on active catalog filters.

---

### 5. Secure Identity & Asset Management UI

#### 5.1 Authentication Canvas
*   **Login & Registration Views:** Complete schema validation layers with immediate visual errors for malicious or formatting anomalies.
*   **Demo Login Button:** Single-click operational execution that auto-injects authenticated sandbox credentials for immediate evaluation.
*   **Social OAuth Layer:** Explicit Google Auth binding hook using the Better Auth UI integration framework.

#### 5.2 Protected Asset Administration (`/items/add` & `/items/manage`)
*   **Access Rules:** Intercepted by middleware routers; unauthorized hits automatically append targeted return parameters and push routes back to `/login`.
*   **Management Framework:** Tabular data spreadsheet interface showing deployed assets. Features individual line action buttons to trigger details routing, configuration adjustment modals, or secure deletion workflows.

---

### 6. Performance, UX & Validation Standards
*   **Zero Text Placeholders:** Every segment, message, asset name, and review contains practical real-world data mappings.
*   **State Synchronization:** Instantaneous feedback loaders paired with optimistic state modifications when dealing with interactions or status mutations.
*   **Visual Continuity:** Fluid responsiveness transitions moving from ultra-wide display rigs down to mobile form factors.
