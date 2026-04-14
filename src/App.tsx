import { useState } from 'react'
import type { ComponentType } from 'react'
import './App.css'
import NavigationHeader from '@/components/local-ui/NavigationHeader'
import HomePage from '@/components/local-ui/HomePage'
import LearnPage from '@/components/local-ui/LearnPage'
import PracticePage from '@/components/local-ui/PracticePage'
import ProgressPage from '@/components/local-ui/ProgressPage'
import DocsPage from '@/components/local-ui/DocsPage'
import { TABS } from '@/utils/constants'

const TAB_COMPONENTS: Record<string, ComponentType> = {
  home: HomePage,
  learn: LearnPage,
  practice: PracticePage,
  progress: ProgressPage,
  docs: DocsPage,
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home')
  const ActiveTab = TAB_COMPONENTS[activeTab]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavigationHeader tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <ActiveTab />
      </main>
    </div>
  )
}
