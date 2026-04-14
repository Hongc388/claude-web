# Educational Web App 
This is an interactive learning platform built with React 18, TypeScript, Vite, and Tailwind CSS. It provides features for learning modules, practice exercises, progress tracking, and documentation.

## Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production (output in /dist)
npm run preview      # Preview production build locally
```

## Architecture & Structure

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 with path alias support (`@` → `/src`)
- **Styling**: Tailwind CSS + PostCSS
- **Type Safety**: TypeScript (ES modules)

### Directory Organization

```
src/
├── utils/              # Shared utilities, constants, and state management
│   ├── constants.ts    # App configuration (TABS, difficulty levels, colors)
│   ├── appState.ts     # User progress state interfaces
│   └── courseUtils.ts  # Course filtering, search, stats functions
├── context/            # Global state context
│   └── AppContext.tsx  # App-level state shape and provider
├── components/
│   ├── ui/             # Reusable UI components (CodeBlock, DocSection, HoverCard)
│   └── local-ui/       # Page-level components (HomePage, LearnPage, etc.)
├── App.tsx             # Root component with tab routing
├── main.tsx            # Entry point
└── index.css           # Global Tailwind styles
```

### Key Design Patterns

**Page Components** (in `components/local-ui/`):
- Each tab is a separate page component (HomePage, LearnPage, PracticePage, ProgressPage, DocsPage)
- Imported and mapped in App.tsx via `TAB_COMPONENTS` object
- Tab configuration lives in `utils/constants.ts`

**State Management**:
- Component-level state via React hooks (useState)
- Ready for global state via AppContext.tsx
- User progress tracked in `utils/appState.ts`

**Utilities**:
- `constants.ts` — Centralized configuration (tabs, difficulty levels, color schemes)
- `courseUtils.ts` — Pure utility functions for course filtering, searching, stats
- `appState.ts` — State shape and helper functions for managing user progress

## Data Management

Data flows through a service layer that decouples components from data sources. This makes it easy to swap hardcoded data for API calls later.

### Data Layer Structure

```
src/
├── data/                    # Hardcoded data definitions
│   ├── courses.ts          # Course list (COURSES_DATA)
│   ├── quizzes.ts          # Quiz list (QUIZZES_DATA)
│   └── achievements.ts     # Achievement definitions (ACHIEVEMENTS_DATA)
└── services/                # Service functions for fetching/manipulating data
    ├── courseService.ts    # fetchAllCourses, fetchCoursesByLevel, etc.
    ├── quizService.ts      # fetchAllQuizzes, validateAnswer, etc.
    └── achievementService.ts # fetchAllAchievements, getUserUnlockedAchievements, etc.
```

### How It Works

1. **Data files** (`src/data/`) contain plain data structures (arrays of objects)
2. **Service files** (`src/services/`) provide async functions to fetch/query data
3. **Components** call services via `useEffect`, store results in `useState`, and render

Example:
```tsx
// Component
const [courses, setCourses] = useState<Course[]>([])

useEffect(() => {
  fetchAllCourses().then(setCourses)
}, [])
```

### Replacing with Real APIs

To migrate from hardcoded data to an API:

1. Update the service function (e.g., `courseService.ts`) to call your API instead of returning hardcoded data
2. Components don't change — they already handle async loading
3. Add loading and error states as needed

Example:
```ts
// Before: Returns hardcoded data
export async function fetchAllCourses(): Promise<Course[]> {
  return COURSES_DATA
}

// After: Call real API
export async function fetchAllCourses(): Promise<Course[]> {
  const response = await fetch('/api/courses')
  return response.json()
}
```

## Adding New Features

**New Tab/Page**:
1. Create component in `src/components/local-ui/NewPage.tsx`
2. Add tab config to `TABS` array in `utils/constants.ts`
3. Add mapping in `TAB_COMPONENTS` object in `App.tsx`

**New Utility Function**:
- Organize by domain in `utils/` (courseUtils, appState, etc.)
- Export pure functions, not components

**New Reusable Component**:
- Place in `src/components/ui/` (not local-ui)
- Keep scope narrow; local-ui components are for page-level features

## Path Aliases

Vite is configured with `@` alias pointing to `/src`:
```ts
import Header from '@/components/local-ui/NavigationHeader'
import { TABS } from '@/utils/constants'
```

Always use `@/` for imports from the src directory.



## Important Notes

- The app is fully responsive with mobile-first navigation (bottom bar on mobile, top nav on desktop)
- Data is managed through services (`src/services/`) that fetch from `src/data/`; never hardcode data in components
- When adding data (courses, quizzes, achievements), add to the appropriate file in `src/data/` and create/update service functions in `src/services/`
- TypeScript is strict; add types for all props and state
- Tailwind's primary color is defined in CSS (use `primary-600`, `primary-700` classes)
