export interface ForumAnswer {
  id: string
  text: string
  author: string
  timestamp: string // ISO 8601
}

export interface ForumPost {
  id: string
  question: string
  author: string
  timestamp: string // ISO 8601
  answers: ForumAnswer[]
}
