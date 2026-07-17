# AGENTS.md — Inventra Frontend

## Project Context
- Monorepo sibling: `../inventra-backend` (separate origin, CORS-compatible)
- Frontend origin: configurable via `NEXT_PUBLIC_API_URL`
- Backend origin: configurable via backend `FRONTEND_URL` env

## Conventions

### Code Style
- TypeScript strict mode, no `any` unless absolutely necessary
- Use path aliases: `@/components/*`, `@/hooks/*`, `@/services/*`, `@/types/*`, `@/utils/*`, `@/config/*`
- React components: PascalCase, co-located styles, named exports
- Hooks: `use*` camelCase, custom hooks in `src/hooks/`
- Services: Axios instance in `src/services/`, one module per domain
- Types: Interfaces in `src/types/`, prefer `interface` over `type` for object shapes

### Styling
- Tailwind CSS utility classes, no CSS modules unless required
- Hero UI components for complex UI (modals, dropdowns, tables)
- Theme colors via Tailwind config (cyber-violet, electric-cyan, radiant-emerald)
- Ambient glow wrappers for container backgrounds

### State Management
- TanStack Query for all server state (fetch, cache, mutate)
- React Context only for global UI state (auth)
- Avoid Redux / Zustand

### Commands
```bash
npm run dev       # Development server
npm run build     # Production build
npm run lint      # ESLint
npm run typecheck # TypeScript check (if configured)
```

## Workflow
1. Read `tasks.md` to understand what needs to be done
2. Update `tasks.md` (`[~]` for in-progress, `[X]` for completed)
3. Update `project-status.md` with progress notes
4. Run lint + typecheck before marking tasks complete
