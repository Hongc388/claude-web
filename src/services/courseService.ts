import { COURSES_DATA } from '@/data/courses'
import type { Course } from '@/utils/courseUtils'
import { filterCoursesByLevel, searchCourses } from '@/utils/courseUtils'

/**
 * Fetch all courses
 * Currently returns hardcoded data, can be replaced with API call
 */
export async function fetchAllCourses(): Promise<Course[]> {
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => resolve(COURSES_DATA), 100)
  })
}

/**
 * Fetch courses by difficulty level
 */
export async function fetchCoursesByLevel(
  level: 'Beginner' | 'Intermediate' | 'Advanced'
): Promise<Course[]> {
  const courses = await fetchAllCourses()
  return filterCoursesByLevel(courses, level)
}

/**
 * Search courses by title or description
 */
export async function searchCoursesQuery(query: string): Promise<Course[]> {
  const courses = await fetchAllCourses()
  return searchCourses(courses, query)
}

/**
 * Fetch a single course by ID
 */
export async function fetchCourseById(id: string): Promise<Course | undefined> {
  const courses = await fetchAllCourses()
  return courses.find(course => course.id === id)
}
