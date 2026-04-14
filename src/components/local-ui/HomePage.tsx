import React, { useState, useMemo } from 'react'
import { searchSections } from '@/utils/search'
import type { ForumPost, ForumAnswer } from '@/data/forum'

interface HomePageProps {
  setActiveTab: (tab: string) => void
}

// ─── Tab navigation cards ────────────────────────────────────────────────────
const NAV_CARDS = [
  { id: 'agent',    label: 'Agent',    icon: '🤖', color: 'from-blue-500 to-blue-600',   desc: 'AI agent learning path & courses' },
  { id: 'claude',   label: 'Claude',   icon: '🤖', color: 'from-indigo-500 to-blue-600',   desc: 'Model family, config, workflows & settings' },
  { id: 'mds',      label: '.MDs',     icon: '📄', color: 'from-orange-400 to-rose-500',  desc: 'Claude Code documentation' },
  { id: 'clis',     label: 'CLIs',     icon: '💻', color: 'from-emerald-500 to-green-600', desc: 'CLI commands & tools reference' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days  = Math.floor(diff / 86_400_000)
  const hours = Math.floor(diff / 3_600_000)
  const mins  = Math.floor(diff / 60_000)
  if (days  > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (mins  > 0) return `${mins}m ago`
  return 'just now'
}

// ─── Forum: single post card ──────────────────────────────────────────────────
interface PostCardProps {
  post: ForumPost
  onAnswer: (postId: string, text: string, author: string) => void
}

function PostCard({ post, onAnswer }: PostCardProps) {
  const [expanded,   setExpanded]   = useState(false)
  const [showForm,   setShowForm]   = useState(false)
  const [answerText, setAnswerText] = useState('')
  const [answerName, setAnswerName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!answerText.trim()) return
    onAnswer(post.id, answerText.trim(), answerName.trim() || 'Anonymous')
    setAnswerText('')
    setAnswerName('')
    setShowForm(false)
  }

  return (
    <article className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      {/* Question row */}
      <button
        className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="font-medium text-gray-900 leading-snug">{post.question}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
              <span className="font-mono">@{post.author}</span>
              <span>{timeAgo(post.timestamp)}</span>
              <span className={`px-2 py-0.5 rounded-full font-medium ${
                post.answers.length > 0
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {post.answers.length} {post.answers.length === 1 ? 'answer' : 'answers'}
              </span>
            </div>
          </div>
          <span className={`text-gray-400 text-lg transition-transform duration-200 shrink-0 mt-0.5 select-none ${expanded ? 'rotate-180' : ''}`}>
            ›
          </span>
        </div>
      </button>

      {/* Expanded: answers + answer form */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 pb-5">
          {post.answers.length > 0 && (
            <div className="mt-4 space-y-3">
              {post.answers.map(ans => (
                <div key={ans.id} className="bg-gray-50 rounded-lg px-4 py-3 text-sm">
                  <p className="text-gray-700 leading-relaxed">{ans.text}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span className="font-mono">@{ans.author}</span>
                    <span>{timeAgo(ans.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showForm ? (
            <form onSubmit={handleSubmit} className="mt-4 space-y-2">
              <input
                type="text"
                value={answerName}
                onChange={e => setAnswerName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <textarea
                value={answerText}
                onChange={e => setAnswerText(e.target.value)}
                placeholder="Write your answer…"
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Post Answer
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-1.5 text-gray-500 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              + Add an answer
            </button>
          )}
        </div>
      )}
    </article>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function HomePage({ setActiveTab }: HomePageProps) {
  const [posts,      setPosts]      = useState<ForumPost[]>([])

  const [query,        setQuery]        = useState('')
  const [showAskForm,  setShowAskForm]  = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [authorName,   setAuthorName]   = useState('')

  const searchResults = useMemo(() => searchSections(query), [query])

  // ── Forum handlers ──────────────────────────────────────────────────────────
  const handleAddAnswer = (postId: string, text: string, author: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p
        const newAnswer: ForumAnswer = {
          id:        `ans-${Date.now()}`,
          text,
          author,
          timestamp: new Date().toISOString(),
        }
        return { ...p, answers: [...p.answers, newAnswer] }
      })
    )
  }

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!questionText.trim()) return
    const newPost: ForumPost = {
      id:        `post-${Date.now()}`,
      question:  questionText.trim(),
      author:    authorName.trim() || 'Anonymous',
      timestamp: new Date().toISOString(),
      answers:   [],
    }
    setPosts(prev => [newPost, ...prev])
    setQuestionText('')
    setAuthorName('')
    setShowAskForm(false)
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Welcome + tab navigation cards ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome to Claudipedia</h2>
        <p className="text-gray-500 mb-6">Your interactive learning platform for AI agent concepts.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {NAV_CARDS.map(card => (
            <button
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              className={`bg-gradient-to-br ${card.color} text-white p-5 rounded-xl text-left hover:opacity-90 active:scale-95 transition-all`}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="font-bold text-base mb-1">{card.label}</h3>
              <p className="text-white/80 text-xs leading-snug">{card.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Cross-tab search ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Search</h3>
        <div className="relative">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none text-sm select-none">
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search courses, concepts, tools…"
            className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
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

        {query && (
          <div className="mt-3 space-y-2">
            {searchResults.length === 0 ? (
              <p className="text-sm text-gray-400 py-2 text-center">
                No results for <span className="font-mono text-gray-600">"{query}"</span>
              </p>
            ) : (
              <>
                <p className="text-xs text-gray-400 mb-1">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</p>
                {searchResults.map(r => (
                  <div
                    key={r.id}
                    className="flex items-start justify-between gap-3 px-4 py-3 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                          {r.tabLabel}
                        </span>
                        <p className="text-sm font-medium text-gray-900 truncate">{r.title}</p>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">{r.summary}</p>
                    </div>
                    <button
                      onClick={() => { setActiveTab(r.tabId); setQuery('') }}
                      className="shrink-0 text-xs font-medium text-primary-600 hover:text-primary-700 px-3 py-1.5 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors whitespace-nowrap"
                    >
                      → {r.tabLabel}
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* ── Community Forum ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Community Forum</h3>
            <p className="text-sm text-gray-500 mt-0.5">Ask questions and help others learn AI agent concepts</p>
          </div>
          <button
            onClick={() => setShowAskForm(v => !v)}
            className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            {showAskForm ? 'Cancel' : 'Ask a Question'}
          </button>
        </div>

        {/* Ask form */}
        {showAskForm && (
          <form onSubmit={handleAskQuestion} className="mb-5 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <textarea
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              placeholder="What's your question about AI agents?"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Post Question
            </button>
          </form>
        )}

        {/* Post list */}
        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center">
            <p className="text-gray-400 text-sm">No questions yet.</p>
            <p className="text-gray-400 text-xs mt-1">Be the first to ask something!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <PostCard key={post.id} post={post} onAnswer={handleAddAnswer} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
