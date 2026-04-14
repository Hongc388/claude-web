# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Claudipedia
A **reference dictionary** web app for AI agent and Claude Code concepts — like MDN but for AI agents. Users browse or search to look things up. Built with React 18, TypeScript, Vite, and Tailwind CSS.

## Common Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production (output in /dist)
npm run preview      # Preview production build locally
npx tsc --noEmit     # Type-check without emitting (no lint script exists)
```

## Architecture & Structure

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 with `@` path alias → `/src`
- **Styling**: Tailwind CSS + PostCSS (primary color defined in CSS: use `primary-600`, `primary-700`)

### Tab Routing

`App.tsx` is a simple tab router — no React Router. `TABS` in `utils/constants.ts` drives both the navigation and the `TAB_COMPONENTS` map that resolves each tab ID to its page component.

The five tabs: **Home**, **Agent**, **Hardness**, **.MDs**, **CLIs**.

| Tab | ID | Page Component | Content |
|-----|----|----------------|---------|
| Home | `home` | `HomePage` | Search bar, forum, redirect buttons |
| Agent | `agent` | `AgentPage` | AI agent concepts reference |
| Hardness | `hardness` | `HardnessPage` | Agent topics grouped by difficulty |
| .MDs | `mds` | `DocsPage` | Claude Code documentation |
| CLIs | `clis` | `ClisPage` | Claude Code CLI command reference |

### The DocsPage Pattern (CRITICAL — all non-Home tabs follow this)

Every non-Home tab is a **self-contained reference page** that follows `DocsPage.tsx` exactly.
**Do NOT deviate from this pattern.**

Structure of every tab page:

```
src/components/local-ui/SomePage.tsx
│
├── SECTIONS array          ← EDIT HERE to update content
│   └── each section has: id, label, icon, description, content: ContentBlock[]
│
├── ContentBlock types:
│   ├── { type: 'paragraph'; text: string }
│   ├── { type: 'code'; text: string }
│   ├── { type: 'cards'; items: [{ title, color, body }] }
│   ├── { type: 'table'; header: [string, string]; rows: [string, string][] }
│   └── { type: 'image'; src: importedImg; alt: string; caption?: string }
│
├── CARD_COLORS map         ← colors: blue | green | purple | orange | red | gray
├── renderBlock()           ← renders any ContentBlock to JSX
└── Page component          ← header + section nav buttons + active section content
```

The rendering logic is identical across all tab pages. **Only the SECTIONS data changes.**
See `src/components/local-ui/DocsPage.tsx` as the canonical reference implementation.

To add a new tab:
1. Create `src/components/local-ui/NewPage.tsx` — copy DocsPage.tsx, replace SECTIONS
2. Add entry to `TABS` in `utils/constants.ts`
3. Add mapping in `TAB_COMPONENTS` in `App.tsx`

### HomePage (special case)

Home does NOT follow the DocsPage pattern. It has three distinct sections:
1. **Redirect cards** — buttons for each of the 4 non-Home tabs (calls `setActiveTab`)
2. **Search bar** — searches across Agent (courses content) and Hardness (reference content)
3. **Forum** — users post questions and answers in real time (no seed data, starts empty)

`App.tsx` renders `<HomePage setActiveTab={setActiveTab} />` directly (not through `TAB_COMPONENTS`).

### Data Layer

**Tab content is NOT served from data files or services.** It lives directly in each page's `SECTIONS` array — this is intentional and keeps content easy to find and edit.

`src/data/` contains only type definitions:
- `src/data/forum.ts` — `ForumPost` / `ForumAnswer` interfaces (state managed in `HomePage`)

`src/services/forumService.ts` exists as a stub for a future backend. All other services in `src/services/` are legacy and should not be used.

**Do not add course services, achievement services, or quiz services.** This is a reference dictionary, not an LMS.

### Reusable Components (`components/ui/`)

`CodeBlock`, `DocSection`, `HoverCard` — narrow-scope primitives used inside page content.

## Important Notes

- [I1] Always use `@/` imports for anything under `src/`
- [I2] Tab content lives in the page component's `SECTIONS` array — never in `src/data/` or `src/services/`
- [I3] The app is fully responsive: bottom nav bar on mobile, top nav on desktop
- [I4] TypeScript is strict; add types for all props and state
- [I5] All non-Home tabs must follow the DocsPage.tsx pattern exactly — same types, same render logic, only SECTIONS data differs
