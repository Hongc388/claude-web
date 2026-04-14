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
  // ── INSTALLATION ─────────────────────────────────────────────────────────────
  {
    id: 'install',
    label: 'Installation',
    icon: '📦',
    description: 'Install Claude Code, authenticate, and initialise your first project.',
    content: [
      {
        type: 'paragraph',
        text: 'Claude Code is distributed as an npm package. Install it globally, set your Anthropic auth token, then run /init in any project to create a CLAUDE.md and .claude/ directory.',
      },
      {
        type: 'code',
        text: `# Install globally
npm install -g @anthropic-ai/claude-code

# Set auth token (add to ~/.zshrc or ~/.bashrc for persistence)
export ANTHROPIC_AUTH_TOKEN="sk-ant-..."

# Start Claude Code in a project
cd my-project
claude

# Initialise project settings (creates CLAUDE.md + .claude/)
> /init`,
      },
      {
        type: 'table',
        header: ['File / Directory', 'Purpose'],
        rows: [
          ['CLAUDE.md', 'Project context loaded into every session automatically'],
          ['.claude/settings.json', 'Permissions, hooks, and model config for the project'],
          ['.claude/settings.local.json', 'Personal overrides — gitignored, not committed'],
          ['~/.claude/settings.json', 'Global defaults applied across all projects'],
        ],
      },
    ],
  },

  // ── SLASH COMMANDS ───────────────────────────────────────────────────────────
  {
    id: 'slash',
    label: 'Slash Commands',
    icon: '/',
    description: 'Built-in commands available inside a Claude Code session.',
    content: [
      {
        type: 'paragraph',
        text: 'Type any of these commands at the Claude Code prompt. Skills (user-defined slash commands) extend this list — see the Skills section.',
      },
      {
        type: 'table',
        header: ['Command', 'What It Does'],
        rows: [
          ['/help', 'Show all available commands and current settings'],
          ['/clear', 'Wipe conversation history (CLAUDE.md is reloaded fresh)'],
          ['/init', 'Create or update CLAUDE.md and .claude/ for this project'],
          ['/commit', 'Auto-generate a conventional commit message and commit staged files'],
          ['/simplify', 'Review recently changed code for quality, reuse, and efficiency'],
          ['/fast', 'Toggle faster output mode (same model, optimised for speed)'],
          ['/debug', 'Enable debug logging — full request/response details'],
          ['/loop <interval> <cmd>', 'Run a command on a repeating interval (e.g. /loop 5m /simplify)'],
          ['/review-pr <number>', 'Pull and review a GitHub pull request by number'],
          ['/tasks', 'Open the background tasks panel'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Skills are user-defined slash commands stored in ~/.claude/skills/ or .claude/skills/. They expand to a full prompt when invoked, allowing you to build custom workflows.',
      },
    ],
  },

  // ── CLI FLAGS ────────────────────────────────────────────────────────────────
  {
    id: 'flags',
    label: 'CLI Flags',
    icon: '🚩',
    description: 'Flags passed when launching Claude Code from the terminal.',
    content: [
      {
        type: 'code',
        text: `# Common launch patterns
claude                          # Interactive session, default model
claude --model opus             # Use claude-opus-4-6
claude --model haiku            # Use claude-haiku-4-5 (fast, cheap)
claude --debug                  # Verbose request/response logs
claude -p "Fix the auth bug"    # One-shot non-interactive prompt`,
      },
      {
        type: 'table',
        header: ['Flag', 'Description'],
        rows: [
          ['--model <name>', 'Model to use: opus | sonnet | haiku (or full model ID)'],
          ['-p "<prompt>"', 'Run a single prompt non-interactively, then exit'],
          ['--debug', 'Enable full request/response debug logging'],
          ['--verbose', 'Show detailed output including tool calls'],
          ['--quiet', 'Suppress non-essential output'],
          ['--max-tokens <n>', 'Limit response token count'],
          ['--timeout <ms>', 'Request timeout in milliseconds (default: 120000)'],
          ['--output-format', 'Output mode: text | json | stream-json'],
          ['--no-color', 'Disable ANSI colour output'],
        ],
      },
    ],
  },

  // ── IDE EXTENSIONS ───────────────────────────────────────────────────────────
  {
    id: 'ide',
    label: 'IDE Extensions',
    icon: '🖥️',
    description: 'Integrating Claude Code into your editor for in-context AI assistance.',
    content: [
      {
        type: 'cards',
        items: [
          {
            title: 'VS Code',
            color: 'blue',
            body: 'Install the "Claude Code" extension from the VS Code Marketplace. Adds a Claude panel, inline suggestions, and the same slash commands available in the terminal.',
          },
          {
            title: 'JetBrains',
            color: 'green',
            body: 'Install from JetBrains Marketplace. Compatible with IntelliJ IDEA, PyCharm, WebStorm, GoLand, and others. Provides a tool window and editor actions.',
          },
          {
            title: 'Web App',
            color: 'purple',
            body: 'claude.ai/code provides a browser-based Claude Code session — useful on machines where installing npm packages is restricted.',
          },
          {
            title: 'Desktop App',
            color: 'orange',
            body: 'The Claude desktop app (Mac/Windows) includes Claude Code with full file system access and no terminal required.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'All IDE integrations share the same CLAUDE.md context, .claude/settings.json permissions, and hooks configuration as the CLI. Settings changed in one surface apply everywhere.',
      },
    ],
  },

  // ── MCP SERVERS ──────────────────────────────────────────────────────────────
  {
    id: 'mcp',
    label: 'MCP Servers',
    icon: '🔌',
    description: 'Model Context Protocol — extend Claude Code with custom tool servers.',
    content: [
      {
        type: 'paragraph',
        text: 'MCP (Model Context Protocol) is an open standard for connecting language models to external tools and data sources. You run an MCP server (a local process), and Claude Code connects to it — gaining access to its tools like any built-in tool.',
      },
      {
        type: 'code',
        text: `# .claude/settings.json — register an MCP server
{
  "mcpServers": {
    "my-db-server": {
      "command": "node",
      "args": ["./mcp-servers/database.js"],
      "env": {
        "DATABASE_URL": "postgres://localhost/mydb"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}`,
      },
      {
        type: 'table',
        header: ['MCP Server', 'What It Provides'],
        rows: [
          ['@mcp/filesystem', 'Read/write local files beyond the project directory'],
          ['@mcp/postgres', 'Query a PostgreSQL database with natural language'],
          ['@mcp/github', 'Full GitHub API — issues, PRs, repos, actions'],
          ['@mcp/brave-search', 'Web search via Brave Search API'],
          ['Custom server', 'Any tool you implement using the MCP SDK'],
        ],
      },
    ],
  },

  // ── MEMORY SYSTEM ────────────────────────────────────────────────────────────
  {
    id: 'memory',
    label: 'Memory System',
    icon: '💾',
    description: 'Claude Code\'s file-based persistent memory across sessions.',
    content: [
      {
        type: 'paragraph',
        text: 'Claude Code maintains a persistent memory system at ~/.claude/projects/<project-hash>/memory/. Memories are markdown files with YAML frontmatter, indexed in a MEMORY.md file that is loaded into every session.',
      },
      {
        type: 'code',
        text: `# Memory file format (e.g. memory/feedback_commits.md)
---
name: Commit style preference
description: User prefers conventional commits with scope
type: feedback
---

Always use conventional commit format: type(scope): message
Why: User enforces it in CI and wants consistency across sessions.
How to apply: Default to this on every /commit call.`,
      },
      {
        type: 'table',
        header: ['Memory Type', 'What to Store'],
        rows: [
          ['user', 'Role, expertise level, collaboration preferences'],
          ['feedback', 'Corrections and validated approaches from past sessions'],
          ['project', 'Goals, constraints, decisions, deadlines'],
          ['reference', 'Pointers to external systems (Jira, Linear, Grafana, Slack)'],
        ],
      },
      {
        type: 'cards',
        items: [
          {
            title: 'MEMORY.md is the index',
            color: 'blue',
            body: 'Each entry is one line under ~150 chars. Lines past 200 are truncated. Keep it concise — it loads into every session.',
          },
          {
            title: 'Save immediately',
            color: 'green',
            body: 'Write a memory as soon as you learn something worth keeping. Don\'t wait — context you have now may be gone next session.',
          },
          {
            title: 'Verify before citing',
            color: 'orange',
            body: 'Memories can go stale. Before recommending a file path or function name from memory, verify it still exists in the current code.',
          },
          {
            title: 'What NOT to save',
            color: 'gray',
            body: 'Skip code architecture (read the code), git history (use git log), debugging recipes (the fix is in the code), and in-progress task state.',
          },
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

export default function ClisPage(): ReactNode {
  const [activeSectionId, setActiveSectionId] = useState<string>('install')
  const active = SECTIONS.find(s => s.id === activeSectionId) ?? SECTIONS[0]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-3 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">💻</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Claude Code CLI Reference</h2>
            <p className="text-gray-500 text-sm">Installation, commands, flags, IDE extensions, MCP, and memory</p>
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
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
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
