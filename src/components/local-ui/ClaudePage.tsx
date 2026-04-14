import { useState } from 'react'
import type { ReactNode } from 'react'
import CodeBlock from '@/components/ui/CodeBlock'

// =============================================================================
// CONTENT DATA — edit this section to update page content
// =============================================================================

type CardColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray'

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'code'; text: string }
  | { type: 'cards'; items: { title: string; color: CardColor; body: string }[] }
  | { type: 'table'; header: [string, string]; rows: [string, string][] }

interface DocSection {
  id: string
  label: string
  icon: string
  description: string
  content: ContentBlock[]
}

const SECTIONS: DocSection[] = [
  // ── BEGINNER ─────────────────────────────────────────────────────────────────
  {
    id: 'beginner',
    label: 'Beginner',
    icon: '🟢',
    description: 'Foundational concepts every agent developer needs before building anything.',
    content: [
      {
        type: 'paragraph',
        text: 'Start here. These concepts underpin everything else. Understanding them well makes intermediate and advanced topics much easier to grasp.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Prompt Engineering',
            color: 'green',
            body: 'Writing clear, structured prompts that reliably produce the behaviour you want. Includes system prompts, few-shot examples, and output formatting.',
          },
          {
            title: 'The Agent Loop',
            color: 'green',
            body: 'Observe → Reason → Act, repeated. Every agent — no matter how complex — reduces to this cycle. Master it before adding complexity.',
          },
          {
            title: 'Tool Calling Basics',
            color: 'green',
            body: 'Defining a tool with a JSON Schema name/description/parameters, calling it from the model, and returning the result back to the model.',
          },
          {
            title: 'In-Context Memory',
            color: 'green',
            body: 'Managing what stays in the conversation window. Trimming irrelevant history, injecting relevant context, and understanding the context limit.',
          },
        ],
      },
      {
        type: 'table',
        header: ['Concept', 'Why It Matters'],
        rows: [
          ['System prompts', 'Set the agent\'s role, constraints, and output format reliably'],
          ['Few-shot examples', 'Show the model exactly what good output looks like'],
          ['Tool JSON Schema', 'The model reads this to decide when and how to call the tool'],
          ['Stop sequences', 'Signal to the model when to stop generating (e.g. end of tool call)'],
        ],
      },
    ],
  },

  // ── INTERMEDIATE ─────────────────────────────────────────────────────────────
  {
    id: 'intermediate',
    label: 'Intermediate',
    icon: '🟡',
    description: 'Patterns that handle real-world complexity: memory, planning, and error recovery.',
    content: [
      {
        type: 'paragraph',
        text: 'Intermediate agents go beyond single-step tool calls. They manage state across many steps, reason more carefully with structured planning, and handle the failures that always happen in production.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Retrieval-Augmented Generation',
            color: 'blue',
            body: 'Embed documents as vectors, store in a vector DB, and retrieve relevant chunks at query time. Gives agents access to knowledge bases too large for the context window.',
          },
          {
            title: 'Chain-of-Thought Prompting',
            color: 'blue',
            body: 'Eliciting step-by-step reasoning before the final answer. Reduces errors on multi-hop logic and arithmetic by making intermediate reasoning visible.',
          },
          {
            title: 'ReAct Pattern',
            color: 'blue',
            body: 'Interleave Thought → Action → Observation blocks. Grounds reasoning in real tool feedback and allows mid-course correction when a tool returns unexpected results.',
          },
          {
            title: 'Error Recovery',
            color: 'orange',
            body: 'Exponential back-off for transient failures, fallback tools, partial-progress checkpointing, and structured error messages the model can reason about.',
          },
        ],
      },
      {
        type: 'code',
        text: `# ReAct trace showing mid-course correction
Goal: "Summarise the top 3 news stories about AI today"

Thought: I'll search for today's AI news.
Action: search("AI news today")
Observation: Error: rate limit exceeded.

Thought: Search failed. I'll try a different tool.
Action: fetch_rss("https://feeds.example.com/ai-news")
Observation: Retrieved 12 articles from the past 24 hours.

Thought: I have the data. I'll pick the top 3 by engagement.
Final Answer: ...`,
      },
    ],
  },

  // ── ADVANCED ─────────────────────────────────────────────────────────────────
  {
    id: 'advanced',
    label: 'Advanced',
    icon: '🔴',
    description: 'Multi-agent systems, safety, and production-grade design.',
    content: [
      {
        type: 'paragraph',
        text: 'Advanced agent systems coordinate multiple models, manage trust boundaries across agent teams, and are designed to fail safely. These patterns are necessary for any production deployment.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Orchestrator Pattern',
            color: 'purple',
            body: 'A planner agent breaks a goal into sub-tasks and delegates each to a specialized sub-agent. The orchestrator synthesizes results without doing ground-level work itself.',
          },
          {
            title: 'Tree of Thoughts',
            color: 'purple',
            body: 'Explore multiple reasoning branches simultaneously, evaluate each with a heuristic, and backtrack from dead ends. Effective for tasks where greedy reasoning gets stuck.',
          },
          {
            title: 'Prompt Injection Defense',
            color: 'red',
            body: 'Treat all external data as untrusted. Separate system instructions from user/tool content. Validate tool outputs before passing back to the model. Layer multiple defenses.',
          },
          {
            title: 'Minimal Footprint',
            color: 'red',
            body: 'Grant agents only the permissions they need for the current task. Limits blast radius when something goes wrong, whether from a bug or an adversarial input.',
          },
        ],
      },
      {
        type: 'table',
        header: ['Pattern', 'Problem It Solves'],
        rows: [
          ['Worktree isolation', 'Agent file changes don\'t pollute the main working directory'],
          ['Human-in-the-Loop', 'Irreversible actions (delete, send, publish) require explicit approval'],
          ['Background agents', 'Long-running tasks don\'t block the main session'],
          ['Parallel agents', 'Independent subtasks complete in a fraction of sequential time'],
        ],
      },
    ],
  },

  // ── CONCEPTS MAP ─────────────────────────────────────────────────────────────
  {
    id: 'map',
    label: 'Concepts Map',
    icon: '🗺️',
    description: 'All key AI agent concepts organised by difficulty at a glance.',
    content: [
      {
        type: 'paragraph',
        text: 'Use this map to find the right concept for your current skill level or to plan your learning path.',
      },
      {
        type: 'table',
        header: ['Concept', 'Level'],
        rows: [
          ['Prompt Engineering',            '🟢 Beginner'],
          ['The Agent Loop (ReAct)',         '🟢 Beginner'],
          ['Tool Calling (JSON Schema)',     '🟢 Beginner'],
          ['In-Context Memory',             '🟢 Beginner'],
          ['Chain-of-Thought Prompting',    '🟡 Intermediate'],
          ['Retrieval-Augmented Generation','🟡 Intermediate'],
          ['ReAct Pattern',                 '🟡 Intermediate'],
          ['Error Recovery Strategies',     '🟡 Intermediate'],
          ['Episodic & Procedural Memory',  '🟡 Intermediate'],
          ['Orchestrator Pattern',          '🔴 Advanced'],
          ['Tree of Thoughts',              '🔴 Advanced'],
          ['Prompt Injection Defense',      '🔴 Advanced'],
          ['Minimal Footprint Principle',   '🔴 Advanced'],
          ['Multi-Agent Communication',     '🔴 Advanced'],
        ],
      },
    ],
  },
]

// Exported for cross-tab search in HomePage
export const SECTION_SUMMARIES = SECTIONS.map(({ id, label, description }) => ({ id, label, description }))

// =============================================================================
// Rendering — no need to edit below this line to update content
// =============================================================================

const CARD_COLORS: Record<CardColor, { border: string; bg: string; title: string }> = {
  blue:   { border: 'border-blue-200',   bg: 'bg-blue-50',   title: 'text-blue-800'   },
  green:  { border: 'border-green-200',  bg: 'bg-green-50',  title: 'text-green-800'  },
  purple: { border: 'border-purple-200', bg: 'bg-purple-50', title: 'text-purple-800' },
  orange: { border: 'border-orange-200', bg: 'bg-orange-50', title: 'text-orange-800' },
  red:    { border: 'border-red-200',    bg: 'bg-red-50',    title: 'text-red-800'    },
  gray:   { border: 'border-gray-200',   bg: 'bg-gray-50',   title: 'text-gray-800'   },
}

function renderBlock(block: ContentBlock, index: number): ReactNode {
  switch (block.type) {
    case 'paragraph':
      return <p key={index} className="text-gray-600 leading-relaxed">{block.text}</p>

    case 'code':
      return <CodeBlock key={index}>{block.text}</CodeBlock>

    case 'cards':
      return (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {block.items.map((item) => {
            const c = CARD_COLORS[item.color]
            return (
              <div key={item.title} className={`border ${c.border} ${c.bg} rounded-xl p-4`}>
                <h4 className={`font-bold ${c.title} mb-1`}>{item.title}</h4>
                <p className="text-sm text-gray-600">{item.body}</p>
              </div>
            )
          })}
        </div>
      )

    case 'table':
      return (
        <div key={index} className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 border border-gray-200">{block.header[0]}</th>
                <th className="text-left px-4 py-2 border border-gray-200">{block.header[1]}</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([a, b]) => (
                <tr key={a} className="border-b border-gray-100">
                  <td className="px-4 py-2 border border-gray-200 font-mono text-purple-700 whitespace-nowrap text-xs">{a}</td>
                  <td className="px-4 py-2 border border-gray-200 text-gray-600">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export default function HardnessPage(): ReactNode {
  const [activeSectionId, setActiveSectionId] = useState<string>('beginner')
  const active = SECTIONS.find(s => s.id === activeSectionId) ?? SECTIONS[0]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white p-3 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🧠</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Difficulty Reference</h2>
            <p className="text-gray-500 text-sm">AI agent concepts organised by complexity — Beginner to Advanced</p>
          </div>
        </div>

        {/* Section quick-links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSectionId(s.id)}
              className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-sm font-medium transition-colors border ${
                activeSectionId === s.id
                  ? 'bg-violet-50 border-violet-300 text-violet-700'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{s.icon}</span>
              <span className="text-xs text-center leading-tight">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{active.label}</h3>
          <p className="text-gray-500 text-sm mt-1">{active.description}</p>
        </div>
        <hr className="border-gray-100" />
        {active.content.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  )
}
