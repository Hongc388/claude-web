import { useState } from 'react'
import type { ComponentType } from 'react'
import './App.css'
import NavigationHeader from '@/components/local-ui/NavigationHeader'
import HomePage from '@/components/local-ui/HomePage'
import AgentPage from '@/components/local-ui/AgentPage'
import HardnessPage from '@/components/local-ui/HardnessPage'
import DocsPage from '@/components/local-ui/DocsPage'
import ClisPage from '@/components/local-ui/ClisPage'
import { TABS } from '@/utils/constants'

const TAB_COMPONENTS: Record<string, ComponentType> = {
  agent:    AgentPage,
  hardness: HardnessPage,
  mds:      DocsPage,
  clis:     ClisPage,
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home')
  const ActiveTab = TAB_COMPONENTS[activeTab]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavigationHeader tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {activeTab === 'home'
          ? <HomePage setActiveTab={setActiveTab} />
          : <ActiveTab />
        }
      </main>
    </div>
  )
}
