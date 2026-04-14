// Application state management

export interface LearningProgress {
  courseId: string
  completionPercentage: number
  lastAccessed: Date
}

export interface UserProgress {
  totalCoursesCompleted: number
  totalLessonCompleted: number
  currentLevel: 'Beginner' | 'Intermediate' | 'Advanced'
  courseProgress: LearningProgress[]
}

// Initialize default user progress
export const getDefaultUserProgress = (): UserProgress => ({
  totalCoursesCompleted: 0,
  totalLessonCompleted: 0,
  currentLevel: 'Beginner',
  courseProgress: [],
})

// Update progress for a course
export const updateCourseProgress = (
  progress: UserProgress,
  courseId: string,
  completionPercentage: number
): UserProgress => {
  const existingProgress = progress.courseProgress.find(p => p.courseId === courseId)

  if (existingProgress) {
    existingProgress.completionPercentage = completionPercentage
    existingProgress.lastAccessed = new Date()
  } else {
    progress.courseProgress.push({
      courseId,
      completionPercentage,
      lastAccessed: new Date(),
    })
  }

  return { ...progress }
}
