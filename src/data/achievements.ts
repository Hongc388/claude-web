export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first lesson',
    icon: '🎯',
  },
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    description: 'Complete 5 lessons in one day',
    icon: '⚡',
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Score 100% on a quiz',
    icon: '⭐',
  },
  {
    id: 'dedicated',
    title: 'Dedicated',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
  },
]
