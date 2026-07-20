# Inventra — Design Reference

> Design inspiration taken from [Addina Multipurpose eCommerce Template](https://gramentheme.com/html/addina/?storefront=envato-elements)
> Adapted for Inventra's AI Product Catalog with our own theme colors (cyber-violet, electric-cyan, radiant-emerald).

---

## 1. Layout Hierarchy (Per Page)

### Landing Page
```
Hero (Swiper slider, split text/image)
Features / Services Grid (4-col icons)
Products / Catalog Grid (4-col cards)
Testimonials (carousel)
Blog / Insights (3-col grid)
Newsletter / CTA
Footer (4-col dark)
```

### Catalog / Explore Page
```
Search Bar + Filter Panel (sidebar or top)
Sort Dropdown
Product Card Grid (4-col → responsive)
Cursor Pagination
Recommendation Sidebar (anchored right)
```

### Product Details Page
```
Split View: Media Gallery (left) + Description (right)
  → Tabbed thumbnails below main image
  → Title, Rating, Price, Short description
Technical Specs Matrix
User Reviews Timeline
```

### Auth Pages (Login / Register)
```
Centered Card Layout
  → Logo top
  → Form fields (stacked)
  → Submit button (full-width)
  → Divider with "or continue with"
  → Social OAuth buttons (Google)
  → Link to alternate page
```

---

## 2. Section Heading Pattern

Every section uses the same structure:

```
┌─────────────────────────────────────┐
│  • Badge/Pill Subtitle              │  <- small, colored bg, dot indicator
│                                     │
│  Big Section Title                  │  <- 52px → 32px responsive
│                                     │
│  Supporting description text...     │  <- optional, 16px, #555
└─────────────────────────────────────┘
```

**Implementation:**
- Subtitle: pill badge with `bg-opacity-10` of primary color + dot before text
- Title: font-semibold, leading-tight, responsive sizing
- Gap between subtitle and title: ~8px

---

## 3. Hero Section (Swiper Slider)

| Element | Style |
|---------|-------|
| Background | Image + solid color fallback |
| Layout | Split: text left (50%) / image right (50%) |
| Heading | 60–80px, bold, leading-tight |
| Description | 16px, max-width ~500px |
| CTAs | Two buttons stacked: solid primary + outline |
| Decoration | Floating circle / glow behind image |
| Navigation | Dot indicators below (centered) |
| Animation | Swiper slide + fade |

---

## 4. Product Card

| Element | Style |
|---------|-------|
| Container | Rounded-xl, border, bg-white, overflow-hidden, hover:shadow-lg |
| Image | 16:9 or 4:3 aspect ratio, object-cover |
| Category Badge | Pill top-left overlay, small text, semi-transparent bg |
| Rating | Star icons row, small gap |
| Title | 16–18px, font-semibold, 2-line clamp |
| Price | Old price (strikethrough, gray) + current price (primary color) |
| Tags | Small comma-separated pills below |
| Action | "Add to Cart" / "View Details" button on hover |
| Skeleton | Gray pulse anim placeholder matching card shape |

**Grid:** 4 columns → 3 (lg) → 2 (md) → 1 (sm). Gap: 24px.

---

## 5. Buttons

| Type | Style |
|------|-------|
| **Solid Primary** | `bg-primary text-white`, rounded-full, px-8 py-4, hover:brightness-110 |
| **Outline** | `border border-primary text-primary`, rounded-full, px-8 py-4, hover:bg-primary hover:text-white |
| **Icon Round** | 40x40 or 60x60 rounded-full, flex-center, border or bg |
| **Text Link** | Inline with underline-on-hover anim, arrow icon suffix |

**Hover animation (from Addina):** Button bg slides up from bottom on hover, text lifts momentarily. `transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1)`

---

## 6. Form Elements

| Element | Style |
|---------|-------|
| Input | `h-14 px-6 border rounded-xl bg-white`, focus:ring-2 ring-primary |
| Textarea | Same as input, min-h-32 |
| Label | `text-sm font-medium mb-1` above input |
| Error | `text-red-500 text-sm mt-1` below input |
| Checkbox/Radio | Custom styled, primary color |
| Select | Custom dropdown with chevron icon |

---

## 7. Color Palette (Inventra Theme)

| Token | Hex | Usage |
|-------|-----|-------|
| `--clr-primary` | cyber-violet | Buttons, links, active states |
| `--clr-secondary` | electric-cyan | Accents, hover states, badges |
| `--clr-accent` | radiant-emerald | Success, positive indicators |
| `--clr-bg` | slate-deep | Page background |
| `--clr-surface` | white / slate-50 | Cards, modals, inputs |
| `--clr-text` | text-crisp | Body text |
| `--clr-heading` | near-black | Headings |
| `--clr-muted` | slate-400 | Subtle text, placeholders |
| `--clr-border` | slate-200 | Borders, dividers |

---

## 8. Typography

| Level | Size | Weight | Line Height |
|-------|------|--------|-------------|
| H1 | 80px → 36px | 700 | 1.1 |
| H2 | 52px → 32px | 600 | 1.2 |
| H3 | 28px → 24px | 600 | 1.3 |
| H4 | 24px | 600 | 1.3 |
| H5 | 20px | 600 | 1.4 |
| H6 | 16px | 600 | 1.4 |
| Body | 16px | 400 | 1.6 |
| Small | 14px | 400 | 1.5 |

**Font stack:** `Sora, sans-serif` (from Addina) or keep the current Geist font from Next.js scaffold. Either works.

---

## 9. Spacing System

| Token | Value |
|-------|-------|
| Section padding | `py-24` (96px) desktop → `py-16` tablet |
| Card gap | `gap-6` (24px) |
| Container max | `max-w-7xl` (1280px) |
| Grid cols | `grid-cols-4` → `3` → `2` → `1` |
| Component gap | `gap-4` (16px) internal |
| Stack spacing | `space-y-4` between stacked elements |

---

## 10. Navigation & Header

### Top Bar
- Announcement/promo text centered
- Phone number left, language/currency dropdowns right
- Subtle border below

### Main Nav
- Logo left
- Nav links center (Home, About, Shop, Pages, Blog, Contact)
- Search icon + Wishlist icon + Cart icon (with badge counts) right
- Mobile: Hamburger → offcanvas slide-in menu

### User Menu (Logged In)
- Avatar + name dropdown
- Links: Dashboard, Inventory, Analytics, Support, Sign Out

---

## 11. Component Patterns to Steal

| Pattern | Where |
|---------|-------|
| **Section badge subtitle with dot** | Every section heading |
| **Button fill-slide hover anim** | All CTA buttons |
| **Product card with image + badge + rating + price** | Catalog grid |
| **Split hero layout** | Landing page hero |
| **Swiper/slider for hero** | Landing page |
| **Offcanvas cart/mobile menu** | Navbar |
| **Tabbed product image gallery** | Product details |
| **Old/new price display** | Product cards + details |
| **Feature grid with SVG icons** | Landing page features |
| **Dark footer multi-column** | Footer |
| **Pill category tags** | Product cards + details |

---

## 12. Animation & Transitions

- All interactive elements: `transition-all duration-300 ease-out`
- Button hover: bottom-to-top bg fill (0.5s cubic-bezier)
- Card hover: translateY(-4px) + shadow-lg
- Page section entrance: fade-in-up on scroll (Intersection Observer)
- Skeleton loading: pulse animation (Tailwind `animate-pulse`)
- Modal/offcanvas: slide-in from right, overlay fade
- Swiper: default slide transition with autoplay
