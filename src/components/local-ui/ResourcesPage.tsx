import { useState } from 'react'

interface Resource {
  icon: string
  category: string
  title: string
  description: string
  tags: string[]
}

const RESOURCES: Resource[] = [
  // Getting Started
  {
    icon: '🚀',
    category: 'Getting Started',
    title: 'What is Claude Code?',
    description: 'Claude Code is an agentic coding tool that lives in your terminal. It understands your codebase, writes and edits files, runs commands, and coordinates complex multi-step tasks autonomously.',
    tags: ['CLI', 'overview', 'install'],
  },
  {
    icon: '⚙️',
    category: 'Getting Started',
    title: 'Installation & Setup',
    description: 'Install Claude Code globally via npm, authenticate with your Anthropic API key, and configure your first project. Covers IDE integrations for VS Code and JetBrains.',
    tags: ['npm', 'auth', 'IDE'],
  },
  {
    icon: '💬',
    category: 'Getting Started',
    title: 'Your First Conversation',
    description: 'Learn how to start a session, ask questions about a codebase, request edits, and build a mental model of how Claude Code interprets context from files and git history.',
    tags: ['prompting', 'context', 'REPL'],
  },

  // Core Concepts
  {
    icon: '📋',
    category: 'Core Concepts',
    title: 'CLAUDE.md — Project Memory',
    description: 'CLAUDE.md files teach Claude about your project: conventions, architecture, commands, and rules. Placed at the repo root or any subdirectory, they load automatically at session start.',
    tags: ['CLAUDE.md', 'memory', 'config'],
  },
  {
    icon: '🧠',
    category: 'Core Concepts',
    title: 'How Claude Reads Context',
    description: 'Claude Code builds context from open files, git history, directory structure, and CLAUDE.md. Understanding this context model helps you write prompts that get precise results.',
    tags: ['context', 'git', 'prompting'],
  },
  {
    icon: '🔐',
    category: 'Core Concepts',
    title: 'Permissions & Trust Model',
    description: 'Claude Code uses a layered permission system: managed policies, project settings, and user overrides. Learn how to grant or restrict access to tools, bash commands, and file paths.',
    tags: ['permissions', 'security', 'settings'],
  },
  {
    icon: '🛠️',
    category: 'Core Concepts',
    title: 'Built-in Tools',
    description: 'Read, Write, Edit, Glob, Grep, Bash, WebFetch, and more. Each tool has a specific contract — understanding which tool to use (and when not to use Bash) makes Claude more precise.',
    tags: ['tools', 'Read', 'Bash', 'Edit'],
  },

  // Configuration
  {
    icon: '📐',
    category: 'Configuration',
    title: 'Rules & Restrictions',
    description: 'Rules files (`.claude/rules/*.md`) define behavior boundaries — coding style, testing requirements, security constraints. Rules are scoped per-path and compose with imports.',
    tags: ['rules', '.claude', 'style'],
  },
  {
    icon: '📁',
    category: 'Configuration',
    title: 'The .claude/ Directory',
    description: 'Your project\'s `.claude/` directory is the control plane: `settings.json`, `rules/`, `agents/`, and `skills/` subdirectories each configure a different layer of Claude\'s behavior.',
    tags: ['.claude', 'settings', 'directory'],
  },
  {
    icon: '🔧',
    category: 'Configuration',
    title: 'settings.json Reference',
    description: 'Complete reference for `settings.json` and `settings.local.json`. Covers permissions, allowed/disallowed tools, hooks, environment variables, and model selection overrides.',
    tags: ['settings.json', 'config', 'permissions'],
  },

  // Skills & Agents
  {
    icon: '✨',
    category: 'Skills & Agents',
    title: 'What are Skills?',
    description: 'Skills are reusable slash commands that expand into full task prompts. Store them in `.claude/skills/` or `~/.claude/skills/` and invoke with `/skill-name` from any session.',
    tags: ['skills', 'slash commands', 'reuse'],
  },
  {
    icon: '🤖',
    category: 'Skills & Agents',
    title: 'Building Subagents',
    description: 'Subagents are specialized Claude instances launched via the Agent tool. Define them in `.claude/agents/` with frontmatter controlling their model, tools, context, and hooks.',
    tags: ['subagents', 'agents', 'automation'],
  },
  {
    icon: '⚡',
    category: 'Skills & Agents',
    title: 'Parallel Agent Patterns',
    description: 'Spawn multiple subagents simultaneously to parallelize independent tasks. Learn orchestrator/worker patterns, when to use background agents, and how to aggregate results.',
    tags: ['parallel', 'orchestration', 'patterns'],
  },

  // Automation
  {
    icon: '🪝',
    category: 'Automation',
    title: 'Hooks: PreToolUse & PostToolUse',
    description: 'Hooks run shell scripts at key lifecycle points — before/after tool calls, on session start/stop, when subagents spawn. Use them to validate, log, lint, or block operations.',
    tags: ['hooks', 'PreToolUse', 'PostToolUse'],
  },
  {
    icon: '📅',
    category: 'Automation',
    title: 'Scheduled Tasks with CronCreate',
    description: 'CronCreate schedules Claude Code sessions to run on a cron expression or after a delay. Combine with autonomous loops (`/loop`) to build self-managing maintenance agents.',
    tags: ['cron', 'scheduling', 'loops'],
  },
  {
    icon: '🔄',
    category: 'Automation',
    title: 'Autonomous Loops',
    description: 'The `/loop` command lets Claude iterate on a task without human intervention, self-pacing with `ScheduleWakeup`. Ideal for background monitoring, report generation, or refactors.',
    tags: ['autonomous', 'loop', 'background'],
  },

  // Advanced
  {
    icon: '🌐',
    category: 'Advanced',
    title: 'MCP Server Integration',
    description: 'Model Context Protocol servers expose external tools to Claude — databases, APIs, Slack, GitHub. Configure MCP servers in `settings.json` to extend what Claude can interact with.',
    tags: ['MCP', 'integrations', 'tools'],
  },
  {
    icon: '🏢',
    category: 'Advanced',
    title: 'Team & Enterprise Deployment',
    description: 'Deploy Claude Code across a team with organization-wide CLAUDE.md files, managed `settings.json` policies, and shared `.claude/` directories committed to version control.',
    tags: ['team', 'enterprise', 'deployment'],
  },
  {
    icon: '🔍',
    category: 'Advanced',
    title: 'Debugging Claude Sessions',
    description: 'Diagnose unexpected behavior with debug logs, the `--verbose` flag, session transcripts, and hook stderr output. Covers common failure modes and how to trace tool permission issues.',
    tags: ['debugging', 'verbose', 'logs'],
  },

  // Best Practices
  {
    icon: '📝',
    category: 'Best Practices',
    title: 'Writing Effective CLAUDE.md',
    description: 'The best CLAUDE.md files are concise, specific, and organized. Learn what to include (commands, conventions, gotchas) and what to leave out (things derivable from code).',
    tags: ['CLAUDE.md', 'writing', 'tips'],
  },
  {
    icon: '🎯',
    category: 'Best Practices',
    title: 'Prompting for Precision',
    description: 'Vague prompts produce vague results. Learn to specify scope, reference exact file paths, describe the "why" not just the "what", and give Claude the context it needs to act precisely.',
    tags: ['prompting', 'precision', 'workflow'],
  },
  {
    icon: '🔒',
    category: 'Best Practices',
    title: 'Security Considerations',
    description: 'Best practices for running Claude Code safely: restricting bash access, reviewing diffs before commit, avoiding sensitive credentials in context, and auditing hooks.',
    tags: ['security', 'review', 'credentials'],
  },
]

const ALL_CATEGORIES = ['All', ...Array.from(new Set(RESOURCES.map(r => r.category)))]

const CATEGORY_COLORS: Record<string, string> = {
  'Getting Started': 'bg-green-100 text-green-800',
  'Core Concepts':   'bg-blue-100 text-blue-800',
  'Configuration':   'bg-purple-100 text-purple-800',
  'Skills & Agents': 'bg-orange-100 text-orange-800',
  'Automation':      'bg-yellow-100 text-yellow-800',
  'Advanced':        'bg-red-100 text-red-800',
  'Best Practices':  'bg-teal-100 text-teal-800',
}

// Export for cross-tab search in HomePage
export const RESOURCE_SUMMARIES = RESOURCES.map(r => ({
  id: r.title.toLowerCase().replace(/\s+/g, '-'),
  label: r.title,
  icon: r.icon,
  description: r.description,
}))

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = RESOURCES.filter(r => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📚</span>
          <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        </div>
        <p className="text-gray-600 text-sm max-w-2xl">
          Articles and reference guides about Claude Code — from first install to advanced automation patterns.
        </p>
      </div>

      {/* Search + Category Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {search && (
        <p className="text-sm text-gray-500 px-1">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
        </p>
      )}

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => (
            <div
              key={r.title}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-2xl">{r.icon}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[r.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {r.category}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{r.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{r.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 mt-auto pt-1">
                {r.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">No resources match your search.</p>
        </div>
      )}
    </div>
  )
}
