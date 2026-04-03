import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'

interface Message {
  text: string
  sender: string
  timestamp: Date
}

export default function HomeTab() {
  const [userInput, setUserInput] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userInput.trim()) {
      setMessages([...messages, { text: userInput, sender: 'user', timestamp: new Date() }])
      setUserInput('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Learning Journey! {'\uD83D\uDE80'}
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Explore interactive lessons, practice exercises, and track your progress.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
            <div className="text-3xl mb-2">{'\uD83D\uDCDA'}</div>
            <h3 className="font-bold text-lg mb-1">Learn</h3>
            <p className="text-blue-100 text-sm">Access interactive lessons</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
            <div className="text-3xl mb-2">{'\u270F\uFE0F'}</div>
            <h3 className="font-bold text-lg mb-1">Practice</h3>
            <p className="text-purple-100 text-sm">Test your knowledge</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
            <div className="text-3xl mb-2">{'\uD83D\uDCCA'}</div>
            <h3 className="font-bold text-lg mb-1">Track Progress</h3>
            <p className="text-green-100 text-sm">Monitor your growth</p>
          </div>
        </div>
      </div>

      {/* Interactive Chat Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Question {'\uD83D\uDCAC'}</h3>
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
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
  )
}
