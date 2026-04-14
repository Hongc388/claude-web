import { REFERENCE_DATA } from '@/data/reference'
import type { ReferenceEntry, ReferenceCategory } from '@/data/reference'

export async function fetchAllEntries(): Promise<ReferenceEntry[]> {
  return REFERENCE_DATA
}

export async function fetchEntriesByCategory(category: ReferenceCategory): Promise<ReferenceEntry[]> {
  if (category === 'All') return REFERENCE_DATA
  return REFERENCE_DATA.filter(e => e.category === category)
}

export function searchEntries(entries: ReferenceEntry[], query: string): ReferenceEntry[] {
  const q = query.toLowerCase().trim()
  if (!q) return entries
  return entries.filter(e =>
    e.title.toLowerCase().includes(q) ||
    e.summary.toLowerCase().includes(q) ||
    e.details.toLowerCase().includes(q) ||
    e.tags.some(tag => tag.includes(q))
  )
}
