// Tab configuration
export interface Tab {
  id: string
  label: string
  icon: string
}

export const TABS: Tab[] = [
  { id: 'home',     label: 'Home',     icon: '🏠' },
  { id: 'agent',    label: 'Agent',    icon: '🤖' },
  { id: 'claude',   label: 'Claude',   icon: '🤖' },
  { id: 'mds',      label: '.MDs',     icon: '📄' },
  { id: 'clis',     label: 'CLIs',     icon: '💻' },
]

// Learning levels
export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const

// App colors and styling
export const COLORS = {
  primary: 'from-blue-50 to-indigo-100',
  accent: 'indigo',
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    muted: 'text-gray-400',
  },
} as const
