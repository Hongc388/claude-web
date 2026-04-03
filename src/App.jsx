import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import HomeTab from './components/tabs/HomeTab'
import LearnTab from './components/tabs/LearnTab'
import PracticeTab from './components/tabs/PracticeTab'
import ProgressTab from './components/tabs/ProgressTab'
import DocsTab from './components/tabs/DocsTab'

const TABS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'learn', label: 'Learn', icon: '📚' },
  { id: 'practice', label: 'Practice', icon: '✏️' },
  { id: 'progress', label: 'Progress', icon: '📊' },
  { id: 'docs', label: 'CLI Docs', icon: '🤖' },
]

const TAB_COMPONENTS = {
  home: HomeTab,
  learn: LearnTab,
  practice: PracticeTab,
  progress: ProgressTab,
  docs: DocsTab,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const ActiveTab = TAB_COMPONENTS[activeTab]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <ActiveTab />
      </main>
    </div>
  )
}
