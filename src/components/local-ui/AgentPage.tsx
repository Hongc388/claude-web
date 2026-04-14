import { useState } from 'react'
import type { ReactNode } from 'react'
import CodeBlock from '@/components/ui/CodeBlock'

// =============================================================================
// CONTENT DATA — edit this section to update page content
//
// Each section has an `id`, `label`, `icon`, `description`, and `content` array.
// Content block types:
//   { type: 'paragraph', text: '...' }
//   { type: 'code', text: '...' }
//   { type: 'cards', items: [{ title, color, body }] }
//   { type: 'table', header: ['Col1', 'Col2'], rows: [['cell', 'cell'], ...] }
//
// Card colors: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray'
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
  // ── OVERVIEW ────────────────────────────────────────────────────────────────
  {
    id: 'overview',
    label: 'Overview',
    icon: '🤖',
    description: 'What AI agents are and how they differ from simple LLMs.',
    content: [
      {
        type: 'paragraph',
        text: 'An AI agent is an autonomous system built on top of a large language model. Unlike a chatbot — which responds to a single message — an agent pursues a goal over many steps: it perceives its environment, reasons about what to do, takes actions (via tools), observes the results, and continues until the goal is reached.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Autonomy',
            color: 'blue',
            body: 'Agents work toward a high-level goal across many steps without needing a human prompt at every turn.',
          },
          {
            title: 'Tool Use',
            color: 'green',
            body: 'Agents call external functions (search, code execution, file I/O, APIs) to act on the world beyond text generation.',
          },
          {
            title: 'Memory',
            color: 'purple',
            body: 'Agents maintain state — in the context window, in external databases, or in structured memory systems — across a session.',
          },
          {
            title: 'Goal-Driven',
            color: 'orange',
            body: 'Agents are given an objective and plan the sequence of actions needed to achieve it, adapting as results arrive.',
          },
        ],
      },
      {
        type: 'table',
        header: ['Property', 'Chatbot vs. Agent'],
        rows: [
          ['Scope', 'Chatbot: single turn · Agent: multi-step goal'],
          ['Tools', 'Chatbot: text only · Agent: calls external functions'],
          ['Memory', 'Chatbot: conversation window · Agent: persistent state'],
          ['Autonomy', 'Chatbot: reacts to prompts · Agent: self-directed planning'],
        ],
      },
    ],
  },

  // ── AGENT LOOP ──────────────────────────────────────────────────────────────
  {
    id: 'agent-loop',
    label: 'Agent Loop',
    icon: '🔄',
    description: 'The Observe → Reason → Act cycle that drives autonomous agent behaviour.',
    content: [
      {
        type: 'paragraph',
        text: 'Every agent runs an continuous loop: it observes the current state of the environment, reasons about what action to take next, executes that action, and incorporates the result into its next observation. This is called the ReAct pattern (Reason + Act).',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Observe',
            color: 'blue',
            body: 'The agent reads its inputs: the user goal, conversation history, tool results, and any other context injected into the prompt.',
          },
          {
            title: 'Reason',
            color: 'purple',
            body: 'The model produces a Thought — a step-by-step reasoning trace that decides what action to take next and why.',
          },
          {
            title: 'Act',
            color: 'green',
            body: 'The agent calls a tool or produces a final answer. If a tool is called, the result becomes the next Observation.',
          },
          {
            title: 'Repeat',
            color: 'orange',
            body: 'The loop continues until the agent reaches the goal, hits a stopping condition, or exhausts its tool budget.',
          },
        ],
      },
      {
        type: 'code',
        text: `# Simplified ReAct trace
Goal: "What is the current price of AAPL?"

Thought: I need to look up the current stock price. I'll use the search tool.
Action: search("AAPL stock price today")
Observation: AAPL is trading at $213.07 as of market close.

Thought: I have the answer. No more tools needed.
Final Answer: AAPL is currently trading at $213.07.`,
      },
    ],
  },

  // ── TOOLS ───────────────────────────────────────────────────────────────────
  {
    id: 'tools',
    label: 'Tools',
    icon: '🛠️',
    description: 'How agents call external functions — from web search to code execution.',
    content: [
      {
        type: 'paragraph',
        text: 'Tools are functions that agents can call to take actions beyond text generation. Each tool is described to the model using a JSON Schema that includes its name, what it does, and the parameters it accepts. The model decides when to call a tool based on this description.',
      },
      {
        type: 'code',
        text: `// Minimal tool definition (JSON Schema)
{
  "name": "search",
  "description": "Search the web and return the top results.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The search query"
      }
    },
    "required": ["query"]
  }
}`,
      },
      {
        type: 'paragraph',
        text: 'Tool execution is always performed by the host application, not by the model. The model outputs a structured tool-call block; the host runs the function; the result is appended to the conversation as a tool-result message.',
      },
      {
        type: 'table',
        header: ['Tool Type', 'Examples'],
        rows: [
          ['Search', 'Web search, document retrieval, vector DB lookup'],
          ['Code', 'Execute Python, run shell commands, evaluate expressions'],
          ['I/O', 'Read/write files, call REST APIs, query databases'],
          ['Agentic', 'Spawn sub-agents, send messages, manage tasks'],
        ],
      },
    ],
  },

  // ── MEMORY ──────────────────────────────────────────────────────────────────
  {
    id: 'memory',
    label: 'Memory',
    icon: '🧠',
    description: 'The four types of agent memory and when to use each.',
    content: [
      {
        type: 'paragraph',
        text: 'Agents need memory to maintain continuity and access knowledge. There are four main memory types, each with different scope, persistence, and retrieval characteristics.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'In-Context',
            color: 'blue',
            body: 'Everything in the active conversation window. Fast, zero infrastructure, but ephemeral and bounded by the context limit.',
          },
          {
            title: 'External (RAG)',
            color: 'green',
            body: 'Documents stored in a vector database, retrieved at query time via semantic similarity. Scales to millions of records.',
          },
          {
            title: 'Episodic',
            color: 'purple',
            body: 'Structured summaries of past sessions stored in a database. Lets agents recall what happened in previous interactions.',
          },
          {
            title: 'Procedural',
            color: 'orange',
            body: 'Reusable "how-to" workflows the agent has learned — stored skills it can apply without re-deriving from scratch.',
          },
        ],
      },
      {
        type: 'table',
        header: ['Type', 'Persistence'],
        rows: [
          ['In-Context', 'Lost when the session ends'],
          ['External (RAG)', 'Permanent — stored in vector DB'],
          ['Episodic', 'Permanent — stored in structured DB'],
          ['Procedural', 'Permanent — stored as workflow definitions'],
        ],
      },
    ],
  },

  // ── PLANNING ────────────────────────────────────────────────────────────────
  {
    id: 'planning',
    label: 'Planning',
    icon: '🗺️',
    description: 'Reasoning strategies that improve agent decision-making on complex tasks.',
    content: [
      {
        type: 'paragraph',
        text: 'Out-of-the-box, LLMs make greedy decisions. Planning strategies force the model to reason more carefully before acting — dramatically improving accuracy on multi-step tasks.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Chain-of-Thought (CoT)',
            color: 'blue',
            body: 'Ask the model to reason step-by-step before answering. "Think step by step" triggers explicit reasoning traces that reduce errors on logic and arithmetic.',
          },
          {
            title: 'ReAct',
            color: 'green',
            body: 'Interleave Thought → Action → Observation blocks. Grounding reasoning in real tool results prevents hallucination and allows mid-course correction.',
          },
          {
            title: 'Tree of Thoughts (ToT)',
            color: 'purple',
            body: 'Explore multiple reasoning branches simultaneously, evaluate each, and backtrack from dead ends. Analogous to beam search applied to reasoning.',
          },
          {
            title: 'Plan-then-Execute',
            color: 'orange',
            body: 'Generate a full plan up front, then execute each step. Good for well-defined tasks; brittle if the environment changes mid-execution.',
          },
        ],
      },
    ],
  },

  // ── MULTI-AGENT ─────────────────────────────────────────────────────────────
  {
    id: 'multi-agent',
    label: 'Multi-Agent',
    icon: '👥',
    description: 'Patterns for coordinating multiple specialized agents on complex workflows.',
    content: [
      {
        type: 'paragraph',
        text: 'When a task is too large for a single context window, or when independent subtasks benefit from parallelism, multiple agents can collaborate. The orchestrator pattern is the most common structure.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Orchestrator',
            color: 'blue',
            body: 'A top-level agent that holds the plan and delegates sub-tasks to specialized sub-agents, then aggregates their results.',
          },
          {
            title: 'Sub-Agent',
            color: 'green',
            body: 'A focused agent that does one specific type of work (research, coding, summarization) without needing to understand the overall goal.',
          },
          {
            title: 'Parallel Agents',
            color: 'purple',
            body: 'Independent subtasks dispatched concurrently. Dramatically reduces latency when tasks have no data dependencies between them.',
          },
          {
            title: 'Shared Memory',
            color: 'orange',
            body: 'Agents communicate through a shared state store (database, message queue) rather than direct calls — loose coupling and easier auditing.',
          },
        ],
      },
      {
        type: 'table',
        header: ['Pattern', 'When to Use'],
        rows: [
          ['Single agent', 'Self-contained task that fits in one context window'],
          ['Parallel agents', 'Multiple independent subtasks (e.g. research 5 topics at once)'],
          ['Orchestrator + sub-agents', 'Complex goal needing planning then delegated execution'],
          ['Background agent', 'Long-running task you don\'t need results from immediately'],
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

export default function AgentPage(): ReactNode {
  const [activeSectionId, setActiveSectionId] = useState<string>('overview')
  const active = SECTIONS.find(s => s.id === activeSectionId) ?? SECTIONS[0]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Agent Reference</h2>
            <p className="text-gray-500 text-sm">Core concepts, patterns, and building blocks for autonomous agents</p>
          </div>
        </div>

        {/* Section quick-links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSectionId(s.id)}
              className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-sm font-medium transition-colors border ${
                activeSectionId === s.id
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
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
