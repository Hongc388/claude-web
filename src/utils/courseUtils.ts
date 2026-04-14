// Utility functions for course management

export interface Course {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  lessons: Lesson[]
  estimatedTime: number // in minutes
}

export interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  duration: number // in minutes
}

export interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

// Filter courses by level
export const filterCoursesByLevel = (
  courses: Course[],
  level: 'Beginner' | 'Intermediate' | 'Advanced'
): Course[] => {
  return courses.filter(course => course.level === level)
}

// Calculate course completion time
export const calculateCourseTime = (course: Course): number => {
  return course.lessons.reduce((total, lesson) => total + lesson.duration, 0)
}

// Search courses by title or description
export const searchCourses = (courses: Course[], query: string): Course[] => {
  const lowerQuery = query.toLowerCase()
  return courses.filter(
    course =>
      course.title.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery)
  )
}

// Get course statistics
export const getCourseStats = (courses: Course[]) => {
  return {
    total: courses.length,
    byLevel: {
      Beginner: courses.filter(c => c.level === 'Beginner').length,
      Intermediate: courses.filter(c => c.level === 'Intermediate').length,
      Advanced: courses.filter(c => c.level === 'Advanced').length,
    },
    totalLessons: courses.reduce((sum, c) => sum + c.lessons.length, 0),
  }
}
