const quizzes = [
  { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1 },
  { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correct: 2 },
]

export default function PracticeTab() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises ✏️</h2>
      <div className="space-y-4">
        {quizzes.map((quiz, idx) => (
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
  )
}
