import type { ForumPost } from '@/data/forum'

// Returns an empty list — all posts are created by users at runtime.
// Swap this implementation for a real API call when a backend is available.
export async function fetchAllPosts(): Promise<ForumPost[]> {
  return []
}
