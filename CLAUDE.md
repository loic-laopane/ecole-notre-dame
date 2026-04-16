# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for **Ensemble Scolaire Notre-Dame Saint-Louis** (Mantes-la-Jolie). Full-stack monorepo:
- `frontend/` — Next.js 15 (App Router, React 19, Tailwind CSS)
- `backend/` — Symfony 7 + API Platform 3 (PHP)

## Commands

All frontend commands must be run from `frontend/`:

```bash
cd frontend
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint (next lint)
npm run type-check   # tsc --noEmit
```

Full stack via Docker Compose (from repo root):
```bash
docker compose up -d
```

## Architecture

### Frontend (`frontend/src/`)

**Routing**: Next.js App Router. All pages are async Server Components that fetch data at the top level and pass props down to presentational section components.

**Data flow pattern**:
```
page.tsx (async, fetches data)
  → Section components (pure, receive props)
    → Card components (pure, receive props)
```

**API layer** (`src/lib/api.ts`): Single file containing all TypeScript types, API fetch functions, and mock data. Key function: `apiFetch<T>()` returns `T | null` on failure. All page fetches fall back to hardcoded mock constants (`MOCK_ACTUALITES`, `MOCK_EVENEMENTS`, etc.) when the API is unavailable.

**ISR**: Pages use `export const revalidate = 60` (seconds). Cache tags are used for on-demand revalidation.

**Styling**: Tailwind CSS with a custom theme in `tailwind.config.ts`:
- Colors: `navy`, `gold`, `gold2`, `sky`, `rose`, `sage`, `cream`, `muted`, `border`
- Fonts: Cormorant Garamond (display/headings), DM Sans (body)
- Custom utilities in `globals.css`: `.ndsl-tag`, `.ndsl-divider`, `.ndsl-card`, `.btn-primary`, `.btn-dark`, `.btn-outline-white`, `.btn-ghost-dark`, `.event-date-badge`

**Path alias**: `@/` → `src/`

**Authentication**: NextAuth v4 wired to the Symfony OAuth2 backend. Session uses JWT.

### Backend (`backend/`)

Symfony 7 + API Platform 3 serving a Hydra (JSON-LD) REST API. Primary entities: `Actualite`, `Evenement`, `Etablissement`. Images are served from `/uploads/` on the backend.

### Next.js ↔ Backend connection

- Frontend rewrites `/api/backend/*` → `${NEXT_PUBLIC_API_URL}/*`
- `next.config.ts` whitelists backend hostnames in `remotePatterns` for `<Image>`

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<min 32 chars>
API_HOSTNAME=localhost
```

## Key Files

| File | Purpose |
|------|---------|
| `frontend/src/lib/api.ts` | All types, API functions, mock data |
| `frontend/src/app/globals.css` | Global Tailwind utilities and custom component classes |
| `frontend/tailwind.config.ts` | Theme: colors, fonts, animations |
| `frontend/next.config.ts` | Image remotePatterns, API rewrites |
| `frontend/src/components/layout/Header.tsx` | Client component — nav dropdowns |

## Conventions

- Language: French (fr-FR). All UI labels, dates (`Intl.DateTimeFormat('fr-FR')`), and copy are in French.
- No test suite is currently set up.
- No global client-side state management (no Redux/Zustand). Server Components handle data fetching.
- `'use client'` is only added when interactivity is required (e.g., Header dropdowns, ContactForm).
