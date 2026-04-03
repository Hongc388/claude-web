const modules = [
  { title: 'Introduction', level: 'Beginner', duration: '10 min' },
  { title: 'Core Concepts', level: 'Intermediate', duration: '20 min' },
  { title: 'Advanced Topics', level: 'Advanced', duration: '30 min' },
  { title: 'Practice Problems', level: 'All Levels', duration: '15 min' },
]

export default function LearnTab() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Modules 📚</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, idx) => (
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
  )
}
