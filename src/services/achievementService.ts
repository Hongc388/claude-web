import { ACHIEVEMENTS_DATA } from '@/data/achievements'
import type { Achievement } from '@/data/achievements'

/**
 * Fetch all achievements
 * Currently returns hardcoded data, can be replaced with API call
 */
export async function fetchAllAchievements(): Promise<Achievement[]> {
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => resolve(ACHIEVEMENTS_DATA), 100)
  })
}

/**
 * Fetch a single achievement by ID
 */
export async function fetchAchievementById(id: string): Promise<Achievement | undefined> {
  const achievements = await fetchAllAchievements()
  return achievements.find(achievement => achievement.id === id)
}

/**
 * Get user unlocked achievements
 */
export function getUserUnlockedAchievements(achievements: Achievement[]): Achievement[] {
  return achievements.filter(a => a.unlockedAt !== undefined)
}
