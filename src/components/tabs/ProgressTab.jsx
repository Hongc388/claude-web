const achievements = ['First Step', 'Quick Learner', 'Perfect Score', 'Dedicated']

export default function ProgressTab() {
  return (
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
            {achievements.map((achievement, idx) => (
              <div key={idx} className="bg-gray-100 rounded-lg p-4 text-center opacity-50">
                <div className="text-3xl mb-2">🔒</div>
                <div className="text-sm font-medium text-gray-600">{achievement}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
