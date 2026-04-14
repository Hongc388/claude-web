import { QUIZZES_DATA } from '@/data/quizzes'
import type { Quiz } from '@/utils/courseUtils'

/**
 * Fetch all quizzes
 * Currently returns hardcoded data, can be replaced with API call
 */
export async function fetchAllQuizzes(): Promise<Quiz[]> {
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => resolve(QUIZZES_DATA), 100)
  })
}

/**
 * Fetch a single quiz by ID
 */
export async function fetchQuizById(id: string): Promise<Quiz | undefined> {
  const quizzes = await fetchAllQuizzes()
  return quizzes.find(quiz => quiz.id === id)
}

/**
 * Validate quiz answer
 */
export function validateAnswer(quiz: Quiz, selectedOptionIndex: number): boolean {
  return selectedOptionIndex === quiz.correctAnswer
}
