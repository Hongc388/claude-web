import { useState } from 'react'
import type { ReactNode } from 'react'
import CodeBlock from '@/components/ui/CodeBlock'
import modelAbilityImg from '@/asset/model-ability.png'

// =============================================================================
// CONTENT DATA — edit this section to update page content
//
// Each section has an `id`, `label`, `icon`, `description`, and `content` array.
// Content block types:
//   { type: 'paragraph', text: '...' }
//   { type: 'code', text: '...' }
//   { type: 'cards', items: [{ title, color, body }] }
//   { type: 'table', header: ['Col1', 'Col2'], rows: [['cell', 'cell'], ...] }
//   { type: 'image', src: importedImg, alt: '...', caption: '...' }
//
// Card colors: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray'
// =============================================================================

type CardColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray'

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'code'; text: string }
  | { type: 'cards'; items: { title: string; color: CardColor; body: string }[] }
  | { type: 'table'; header: [string, string]; rows: [string, string][] }
  | { type: 'image'; src: string; alt: string; caption?: string }

interface DocSection {
  id: string
  label: string
  icon: string
  description: string
  content: ContentBlock[]
}

const SECTIONS: DocSection[] = [
  // ── HOME ────────────────────────────────────────────────────────────────────
  {
    id: 'home',
    label: 'Home',
    icon: '🏠',
    description: 'Welcome to Claude Code — Anthropic\'s official AI coding assistant.',
    content: [
      {
        type: 'paragraph',
        text: 'Claude Code is Anthropic\'s official CLI and IDE extension for AI-powered development. It integrates directly into your terminal, VS Code, JetBrains, and more — letting Claude read, write, and run code alongside you.',
      },
      {
        type: 'paragraph',
        text: 'Core capabilities: code generation, file operations, git integration, multi-agent task delegation, custom hooks, and configurable permission controls.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Code Generation',
            color: 'blue',
            body: 'Generate code in any language from natural-language prompts. Claude reads surrounding files to match your project style and conventions.',
          },
          {
            title: 'Git Integration',
            color: 'green',
            body: 'Auto-generates commit messages, manages branches, and integrates with the gh CLI for pull requests and issues.',
          },
          {
            title: 'Multi-Agent',
            color: 'purple',
            body: 'Spawn specialized sub-agents in parallel for research, planning, and execution without blocking your main session.',
          },
          {
            title: 'Security Controls',
            color: 'red',
            body: 'Sandbox filesystem and network access with explicit allow/deny permission rules and hooks for auditing every tool call.',
          },
        ],
      },
      {
        type: 'table',
        header: ['Model', 'Best For'],
        rows: [
          ['claude-haiku-4-5', 'Fast tasks, simple queries, high-volume operations'],
          ['claude-sonnet-4-6', 'Most development work — balanced speed and capability'],
          ['claude-opus-4-6', 'Complex reasoning, architecture decisions, deep analysis'],
        ],
      },
      {
        type: 'image',
        src: modelAbilityImg,
        alt: 'Claude model ability benchmark comparison',
        caption: 'Claude 3 benchmark performance across reasoning, vision, and science tasks compared to GPT-4V and Gemini.',
      },
    ],
  },

  // ── GUIDES ──────────────────────────────────────────────────────────────────
  {
    id: 'guides',
    label: 'Guides',
    icon: '📖',
    description: 'Installation, setup, common commands, and everyday workflows.',
    content: [
      {
        type: 'paragraph',
        text: 'Install Claude Code globally, authenticate with your Anthropic token, and initialize a project. The /init command creates a CLAUDE.md file and .claude/ directory for project-level settings.',
      },
      {
        type: 'code',
        text: 'npm install -g @anthropic-ai/claude-code\nexport ANTHROPIC_AUTH_TOKEN="your-token-here"\nclaude init',
      },
      {
        type: 'paragraph',
        text: 'Slash commands available inside a Claude Code session:',
      },
      {
        type: 'table',
        header: ['Command', 'Description'],
        rows: [
          ['/help', 'Show help and all available commands'],
          ['/clear', 'Clear conversation history'],
          ['/commit', 'Auto-generate a git commit message'],
          ['/init', 'Initialize CLAUDE.md for this project'],
          ['/simplify', 'Review and optimize recently changed code'],
          ['/loop 5m /cmd', 'Run a command on a recurring interval'],
          ['/debug', 'Enable debug logging'],
          ['/fast', 'Toggle faster output mode'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Typical feature development workflow:',
      },
      {
        type: 'code',
        text: 'git checkout -b feature/my-feature\nclaude\n> Implement user authentication with JWT\nclaude /simplify\nclaude /commit\ngit push -u origin feature/my-feature',
      },
      {
        type: 'paragraph',
        text: 'Useful CLI flags when launching Claude Code:',
      },
      {
        type: 'table',
        header: ['Flag', 'Description'],
        rows: [
          ['--model <model>', 'Set model: opus, sonnet, or haiku'],
          ['--debug', 'Enable debug mode with full request/response logs'],
          ['--verbose', 'Show detailed output'],
          ['--quiet', 'Suppress non-essential output'],
          ['--max-tokens <n>', 'Limit response token count'],
          ['--timeout <ms>', 'Request timeout in ms (default 120000)'],
        ],
      },
    ],
  },

  // ── HOOKS ───────────────────────────────────────────────────────────────────
  {
    id: 'hooks',
    label: 'Hooks',
    icon: '🪝',
    description: 'Automate actions before and after Claude Code events.',
    content: [
      {
        type: 'paragraph',
        text: 'Hooks are shell commands that execute automatically in response to Claude Code lifecycle events. They let you enforce policies, run tests, send notifications, or audit Claude\'s actions without manual intervention.',
      },
      {
        type: 'paragraph',
        text: 'Define hooks in .claude/settings.json under the "hooks" key. Each hook specifies a "run" command that is executed in your project root.',
      },
      {
        type: 'code',
        text: `{
  "hooks": {
    "pre-git-push":    { "run": "npm run lint && npm run test" },
    "post-git-commit": { "run": "echo 'Committed successfully'" },
    "pre-file-write":  { "run": "echo 'About to write a file'" },
    "post-file-write": { "run": "npx tsc --noEmit" },
    "pre-tool-call":   { "run": "echo 'Tool call starting'" },
    "post-tool-call":  { "run": "echo 'Tool call completed'" }
  }
}`,
      },
      {
        type: 'cards',
        items: [
          {
            title: 'pre-git-push',
            color: 'blue',
            body: 'Runs before every git push. Use it to block pushes that fail lint or tests.',
          },
          {
            title: 'post-git-commit',
            color: 'green',
            body: 'Runs after a commit completes. Good for changelog updates or Slack notifications.',
          },
          {
            title: 'pre-file-write',
            color: 'purple',
            body: 'Runs before any file write. Use it to validate paths or log what Claude is about to change.',
          },
          {
            title: 'post-file-write',
            color: 'orange',
            body: 'Runs after a file is written. Good for triggering type-checks or formatting.',
          },
          {
            title: 'pre-tool-call',
            color: 'red',
            body: 'Runs before every tool call. Use for auditing or rate-limiting Claude\'s actions.',
          },
          {
            title: 'post-tool-call',
            color: 'gray',
            body: 'Runs after every tool call completes. Useful for logging or downstream automation.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Hook commands run in your project root and have access to all environment variables. If a pre- hook exits with a non-zero status, the corresponding action is blocked.',
      },
    ],
  },

  // ── PERMISSIONS ─────────────────────────────────────────────────────────────
  {
    id: 'permissions',
    label: 'Permissions',
    icon: '🔒',
    description: 'Control exactly what Claude Code is allowed to read, write, and execute.',
    content: [
      {
        type: 'paragraph',
        text: 'Claude Code uses a deny-by-default permission model. You explicitly list what Claude is allowed to do. Config is resolved in priority order (highest wins): CLI flags → settings.local.json → settings.json → global ~/.claude/settings.json.',
      },
      {
        type: 'code',
        text: `{
  "permissions": {
    "allow": [
      "Bash(command:git)",
      "Bash(command:npm)",
      "Read(path:./src)",
      "Write(path:./src)",
      "WebFetch(domain:github.com)"
    ],
    "deny": [
      "Bash(command:rm -rf)",
      "Write(path:.env)",
      "WebFetch(domain:*)"
    ]
  }
}`,
      },
      {
        type: 'table',
        header: ['Category', 'What It Controls'],
        rows: [
          ['Bash', 'Shell commands Claude may execute'],
          ['Read', 'File paths Claude may read'],
          ['Write', 'File paths Claude may create or overwrite'],
          ['Edit', 'File paths Claude may modify in-place'],
          ['WebFetch', 'Domains Claude may send HTTP requests to'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Sandbox mode provides filesystem and network isolation on top of permission rules:',
      },
      {
        type: 'code',
        text: `{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "read":  { "allow": ["./src", "./docs"], "deny": [".env", "*.key"] },
      "write": { "allow": ["./dist", "./src"], "deny": [".env"] }
    },
    "network": {
      "allowedHosts": ["github.com", "registry.npmjs.org", "api.anthropic.com"]
    }
  }
}`,
      },
      {
        type: 'paragraph',
        text: 'Best practice: start with a locked-down config and expand allowances as needed. Use settings.local.json (gitignored) for personal overrides that shouldn\'t be committed.',
      },
    ],
  },

  // ── CONTEXT MANAGEMENT ──────────────────────────────────────────────────────
  {
    id: 'context',
    label: 'Context Management',
    icon: '🧠',
    description: 'Manage what Claude knows about your project and conversation.',
    content: [
      {
        type: 'paragraph',
        text: 'CLAUDE.md is the primary mechanism for persistent project context. It is loaded automatically at the start of every session. You can place it at the project root for global context, or in subdirectories for scoped instructions that only apply in that folder.',
      },
      {
        type: 'paragraph',
        text: 'What to put in CLAUDE.md: common commands, architecture overview, key design decisions, important constraints, and anything that would take Claude more than 30 seconds to infer from reading the code.',
      },
      {
        type: 'code',
        text: `# CLAUDE.md — example structure

## Common Commands
npm run dev          # Start dev server
npm run build        # Production build
npx tsc --noEmit     # Type-check

## Architecture
- React 18 + TypeScript + Vite
- Tab routing via TAB_COMPONENTS map in App.tsx
- Data lives in src/data/, accessed only through src/services/

## Important Notes
- Always use @/ imports from src
- Never hardcode data in components`,
      },
      {
        type: 'paragraph',
        text: 'Session-level context controls:',
      },
      {
        type: 'table',
        header: ['Action', 'Effect'],
        rows: [
          ['/clear', 'Wipe conversation history (CLAUDE.md is reloaded fresh)'],
          ['@filename', 'Explicitly include a file in the current context'],
          ['--max-tokens <n>', 'Limit response length to avoid context overflow'],
          ['--model haiku', 'Switch to a model with faster, cheaper context usage'],
          ['Ctrl+C', 'Cancel the current operation without losing session context'],
        ],
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Keep CLAUDE.md concise',
            color: 'blue',
            body: 'Aim for under 200 lines. The file is loaded into every session — bloated CLAUDE.md wastes context on every turn.',
          },
          {
            title: 'Use /clear between tasks',
            color: 'green',
            body: 'Switching from a bug fix to a new feature? Clear the conversation to avoid stale context influencing Claude\'s decisions.',
          },
          {
            title: 'Scope large tasks',
            color: 'purple',
            body: 'Break large refactors into small sessions. Each session starts fresh from CLAUDE.md, keeping context lean and focused.',
          },
          {
            title: 'Layer CLAUDE.md files',
            color: 'orange',
            body: 'Place a CLAUDE.md in src/api/ with API-specific rules. Claude reads all CLAUDE.md files from root down to the current directory.',
          },
        ],
      },
    ],
  },

  // ── AGENT TEAMS ─────────────────────────────────────────────────────────────
  {
    id: 'agent-teams',
    label: 'Agent Teams',
    icon: '🤖',
    description: 'Spawn and coordinate multiple specialized agents for complex workflows.',
    content: [
      {
        type: 'paragraph',
        text: 'Agent Teams let you delegate independent subtasks to specialized sub-agents running in parallel. The main Claude session acts as the orchestrator — coordinating agents, synthesizing results — while sub-agents do the focused work.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'general-purpose',
            color: 'blue',
            body: 'Full access to all tools. Use for complex, multi-step tasks that require autonomous problem-solving and code generation.',
          },
          {
            title: 'explore',
            color: 'green',
            body: 'Read-only codebase explorer. No write/edit tools. Use for finding files, searching keywords, and understanding structure without risk.',
          },
          {
            title: 'plan',
            color: 'purple',
            body: 'Software architect agent. Use for implementation strategy, identifying critical files, and evaluating architectural trade-offs.',
          },
          {
            title: 'claude-code-guide',
            color: 'orange',
            body: 'Answers questions about Claude Code CLI, the Claude API, and the Anthropic SDK. Useful for capability lookups during development.',
          },
        ],
      },
      {
        type: 'code',
        text: `# Spawn an agent for a specific task
claude agent general-purpose "Fix the authentication bug in src/auth/"

# Send a follow-up message to a running agent
claude agent send <agent-id> "Also update the corresponding tests"

# Check what an agent is currently doing
claude agent status <agent-id>

# Stop an agent
claude agent stop <agent-id>`,
      },
      {
        type: 'paragraph',
        text: 'Use worktree isolation (isolation: "worktree") for agents that make file changes. The agent works on a separate git branch, preventing conflicts with your working tree. The branch is cleaned up automatically if no changes are made.',
      },
      {
        type: 'table',
        header: ['Pattern', 'When to Use'],
        rows: [
          ['Single agent', 'Self-contained task that doesn\'t need parallelism'],
          ['Parallel agents', 'Multiple independent subtasks (e.g., research 4 topics at once)'],
          ['Orchestrator + sub-agents', 'Complex goal that needs planning then delegated execution'],
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

    case 'image':
      return (
        <figure key={index} className="rounded-xl overflow-hidden border border-gray-200">
          <img src={block.src} alt={block.alt} className="w-full object-contain" />
          {block.caption && (
            <figcaption className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center border-t border-gray-200">
              {block.caption}
            </figcaption>
          )}
        </figure>
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

export default function DocsPage(): ReactNode {
  const [activeSectionId, setActiveSectionId] = useState<string>('home')
  const active = SECTIONS.find(s => s.id === activeSectionId) ?? SECTIONS[0]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          {/* Claude-branded icon */}
          <div className="bg-gradient-to-br from-orange-400 to-rose-500 text-white p-3 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" fillOpacity="0.2"/>
              <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Claude Code Documentation</h2>
            <p className="text-gray-500 text-sm">Anthropic — claude-sonnet-4-6 · claude-opus-4-6 · claude-haiku-4-5</p>
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
                  ? 'bg-orange-50 border-orange-300 text-orange-700'
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
