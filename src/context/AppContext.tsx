import { createContext } from 'react'
import type { UserProgress } from '@/utils/appState'
import { getDefaultUserProgress } from '@/utils/appState'

export interface AppContextType {
  userProgress: UserProgress
  updateUserProgress: (progress: UserProgress) => void
  activeTab: string
  setActiveTab: (tabId: string) => void
  isDark: boolean
  toggleDarkMode: () => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const getDefaultAppContext = (): AppContextType => ({
  userProgress: getDefaultUserProgress(),
  updateUserProgress: () => {},
  activeTab: 'home',
  setActiveTab: () => {},
  isDark: false,
  toggleDarkMode: () => {},
})
