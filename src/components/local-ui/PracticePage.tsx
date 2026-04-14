import { useEffect, useState, useMemo } from 'react'
import { fetchAllEntries, searchEntries } from '@/services/referenceService'
import { REFERENCE_CATEGORIES } from '@/data/reference'
import type { ReferenceEntry, ReferenceCategory } from '@/data/reference'

/* ─── category pill ───────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  'Core Concepts':            'bg-violet-100 text-violet-700',
  'Tools & Function Calling': 'bg-blue-100 text-blue-700',
  'Memory':                   'bg-cyan-100 text-cyan-700',
  'Planning & Reasoning':     'bg-amber-100 text-amber-700',
  'Multi-Agent Systems':      'bg-emerald-100 text-emerald-700',
  'Safety & Guardrails':      'bg-rose-100 text-rose-700',
}

function CategoryPill({ category }: { category: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[category] ?? 'bg-gray-100 text-gray-600'}`}>
      {category}
    </span>
  )
}

/* ─── reference card ──────────────────────────────────────── */
function ReferenceCard({ entry, query }: { entry: ReferenceEntry; query: string }) {
  const [expanded, setExpanded] = useState(false)

  // Auto-expand when a search query matches details but not summary
  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase()
      const inDetails = entry.details.toLowerCase().includes(q)
      const inSummary = entry.summary.toLowerCase().includes(q) || entry.title.toLowerCase().includes(q)
      setExpanded(inDetails && !inSummary)
    } else {
      setExpanded(false)
    }
  }, [query, entry])

  return (
    <article className="rounded-xl border border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm transition-all">
      <button
        className="w-full text-left px-5 py-4"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <CategoryPill category={entry.category} />
            </div>
            <h3 className="text-gray-900 font-semibold text-base leading-snug">{entry.title}</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{entry.summary}</p>
          </div>
          <span className={`shrink-0 text-gray-400 text-lg mt-1 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            ›
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed pt-4">{entry.details}</p>
        </div>
      )}
    </article>
  )
}

/* ─── empty state ─────────────────────────────────────────── */
function EmptyState({ query }: { query: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 p-12 text-center">
      <p className="text-gray-400 text-sm">
        No entries match <span className="font-mono text-gray-600">"{query}"</span>
      </p>
      <p className="text-gray-400 text-xs mt-1">Try a different keyword or clear the search</p>
    </div>
  )
}

/* ─── main page ───────────────────────────────────────────── */
export default function PracticePage() {
  const [entries, setEntries]         = useState<ReferenceEntry[]>([])
  const [loading, setLoading]         = useState(true)
  const [query, setQuery]             = useState('')
  const [activeCategory, setCategory] = useState<ReferenceCategory>('All')

  useEffect(() => {
    fetchAllEntries()
      .then(setEntries)
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const byCategory = activeCategory === 'All'
      ? entries
      : entries.filter(e => e.category === activeCategory)
    return searchEntries(byCategory, query)
  }, [entries, query, activeCategory])

  // Group visible entries by category for section headers
  const grouped = useMemo(() => {
    const map = new Map<string, ReferenceEntry[]>()
    for (const entry of filtered) {
      const list = map.get(entry.category) ?? []
      list.push(entry)
      map.set(entry.category, list)
    }
    return map
  }, [filtered])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-gray-500 animate-pulse">Loading reference…</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reference</h2>
        <p className="text-sm text-gray-500 mt-1">
          Quick-reference guide to AI agent concepts — search or browse by topic
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none text-sm">
          ⌕
        </span>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search concepts, terms, tags…"
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {REFERENCE_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {(query || activeCategory !== 'All') && (
        <p className="text-xs text-gray-400 mb-4">
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'} found
        </p>
      )}

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState query={query} />
      ) : query ? (
        /* Flat list when searching — no section headers */
        <div className="space-y-3">
          {filtered.map(entry => (
            <ReferenceCard key={entry.id} entry={entry} query={query} />
          ))}
        </div>
      ) : (
        /* Grouped by category when browsing */
        <div className="space-y-10">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <section key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {category}
              </h3>
              <div className="space-y-3">
                {items.map(entry => (
                  <ReferenceCard key={entry.id} entry={entry} query={query} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
