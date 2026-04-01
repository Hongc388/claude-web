import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState([])

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'practice', label: 'Practice', icon: '✏️' },
    { id: 'progress', label: 'Progress', icon: '📊' },
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (userInput.trim()) {
      setMessages([...messages, { text: userInput, sender: 'user', timestamp: new Date() }])
      setUserInput('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <span className="text-2xl">🎓</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Educational Platform</h1>
            </div>
            <nav className="hidden md:flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id ? 'text-primary-600' : 'text-gray-600'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Your Learning Journey! 🚀
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Explore interactive lessons, practice exercises, and track your progress.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-bold text-lg mb-1">Learn</h3>
                  <p className="text-blue-100 text-sm">Access interactive lessons</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">✏️</div>
                  <h3 className="font-bold text-lg mb-1">Practice</h3>
                  <p className="text-purple-100 text-sm">Test your knowledge</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="font-bold text-lg mb-1">Track Progress</h3>
                  <p className="text-green-100 text-sm">Monitor your growth</p>
                </div>
              </div>
            </div>

            {/* Interactive Chat Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Question 💬</h3>
              <div className="space-y-4">
                <div className="h-64 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-2">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-center">Ask a question to get started!</p>
                  ) : (
                    messages.map((msg, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-gray-900">{msg.text}</p>
                        <span className="text-xs text-gray-500">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Modules 📚</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Introduction', level: 'Beginner', duration: '10 min' },
                { title: 'Core Concepts', level: 'Intermediate', duration: '20 min' },
                { title: 'Advanced Topics', level: 'Advanced', duration: '30 min' },
                { title: 'Practice Problems', level: 'All Levels', duration: '15 min' },
              ].map((module, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{module.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{module.level}</span>
                    <span>⏱️ {module.duration}</span>
                  </div>
                  <button className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Start Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises ✏️</h2>
            <div className="space-y-4">
              {[
                { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1 },
                { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correct: 2 },
              ].map((quiz, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">{quiz.question}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quiz.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress 📊</h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600">0</div>
                    <div className="text-gray-600">Lessons Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600">0%</div>
                    <div className="text-gray-600">Quiz Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">0</div>
                    <div className="text-gray-600">Day Streak</div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Achievements 🏆</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['First Step', 'Quick Learner', 'Perfect Score', 'Dedicated'].map((achievement, idx) => (
                    <div key={idx} className="bg-gray-100 rounded-lg p-4 text-center opacity-50">
                      <div className="text-3xl mb-2">🔒</div>
                      <div className="text-sm font-medium text-gray-600">{achievement}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
