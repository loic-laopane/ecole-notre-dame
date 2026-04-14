# CLAUDE.md — Ecole Notre Dame Website

This file provides guidance for AI assistants (Claude Code and others) working on this repository.

---

## Project Overview

**Project:** Réfection du site de l'école Notre Dame  
**Goal:** Redesign / rebuild the Ecole Notre Dame school website.  
**Repository:** `loic-laopane/ecole-notre-dame`  
**Status:** Early planning phase — no application code exists yet.

---

## Current Repository State

```
ecole-notre-dame/
├── CLAUDE.md       ← this file
└── README.md       ← one-line project description
```

No framework, package manager, build tooling, or application code has been committed yet. The first substantive task is to agree on a technology stack and scaffold the project.

---

## Development Branch

Always develop on a feature branch. The default integration branch is `main`.  
Never push directly to `main` without a pull request and review.

---

## Recommended Technology Decisions (to be confirmed)

Because the project is a school website the following lightweight defaults are suggested. Update this section once the stack is finalised.

| Concern | Recommendation |
|---------|---------------|
| Frontend | Next.js (React) with TypeScript |
| Styling | Tailwind CSS |
| CMS / Content | Markdown files or a headless CMS (e.g. Sanity, Contentful) |
| Hosting | Vercel or Netlify (static/edge-friendly) |
| Package manager | `npm` (lock file committed) |
| Linting | ESLint + Prettier |
| Testing | Jest + React Testing Library |
| CI | GitHub Actions |

---

## Conventions (to apply once code exists)

### File & Folder Naming
- React components: `PascalCase.tsx`
- Utility functions / hooks: `camelCase.ts`
- Page routes (Next.js): `kebab-case/` directory names
- Test files: colocated next to the source file, suffix `.test.ts(x)`

### Code Style
- TypeScript strict mode enabled
- No `any` types without an explanatory comment
- Functional components only; no class components
- Props interfaces defined above the component they belong to
- Imports ordered: external libraries → internal modules → relative imports

### Git Commits
- Follow Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- Keep commits small and focused; one logical change per commit
- Write commit messages in English

### Pull Requests
- Open as **draft** until ready for review
- Include a short description of what changed and why
- Reference any related issue number in the PR description

---

## Key Commands (to be added once scaffolded)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Run type checker
npm run type-check

# Run tests
npm test

# Build for production
npm run build
```

Update this section with actual scripts once `package.json` exists.

---

## Environment Variables

Document all required environment variables in a `.env.example` file at the repository root. Never commit real secrets or `.env` files.

---

## AI Assistant Guidelines

1. **Read before editing.** Always read a file before modifying it.
2. **Minimal changes.** Only change what is needed for the task at hand — no speculative refactoring.
3. **No generated secrets.** Never hardcode credentials, API keys, or tokens.
4. **Security first.** Avoid introducing XSS, SQL injection, or other OWASP top-10 vulnerabilities.
5. **French-language content.** The website serves a French-speaking school community — UI copy should be in French unless instructed otherwise.
6. **Accessibility.** Follow WCAG 2.1 AA guidelines for all UI components (semantic HTML, ARIA labels, sufficient colour contrast).
7. **Always update this file** when the stack, folder structure, or workflows change significantly.
