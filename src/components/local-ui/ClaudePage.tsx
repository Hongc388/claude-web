import { useState } from 'react'
import type { ReactNode } from 'react'
import CodeBlock from '@/components/ui/CodeBlock'
import configOutputstyleCustomed from '@/asset/config-outputstyle-customed.png'
import configOutputstyleExplationary from '@/asset/config-outputstyle-explationary.png'
import configOutputstyleLearning from '@/asset/config-outputstyle-learning.png'

// =============================================================================
// CONTENT DATA — edit this section to update page content
// =============================================================================

type CardColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray'

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'code'; text: string }
  | { type: 'cards'; items: { title: string; color: CardColor; body: string }[] }
  | { type: 'table'; header: [string, string]; rows: [string, string][] }
  | { type: 'image'; src: string; alt: string; caption?: string; description?: string }
  | { type: 'image-gallery'; description?: string; bullets?: { title: string; body: string }[]; items: { src: string; alt: string; caption?: string }[] }

interface DocSection {
  id: string
  label: string
  icon: string
  description: string
  content: ContentBlock[]
}

const SECTIONS: DocSection[] = [
  // ── MODEL ─────────────────────────────────────────────────────────────────
  {
    id: 'model',
    label: 'Model',
    icon: '🤖',
    description: 'Claude model family overview — Opus 4.6, Sonnet 4.6, Haiku 4.5 — with capability comparison and selection guidance.',
    content: [
      {
        type: 'paragraph',
        text: 'The Claude model family offers three tiers optimised for different trade-offs between capability, speed, and cost. All three are available in Claude Code via the --model flag or the model field in settings.json.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'claude-opus-4-6',
            color: 'purple',
            body: "Anthropic's most capable model. Best for complex reasoning, architecture decisions, large-scale refactors, and anything where quality matters more than speed.",
          },
          {
            title: 'claude-sonnet-4-6',
            color: 'blue',
            body: 'The recommended default for most development work. Balances strong capability with practical speed and cost. Used by this app.',
          },
          {
            title: 'claude-haiku-4-5',
            color: 'green',
            body: 'Fastest and most cost-efficient. Ideal for high-volume operations, simple queries, CI pipelines, and tasks where latency matters most.',
          },
          {
            title: 'Model Selection',
            color: 'gray',
            body: 'Rule of thumb: start with Sonnet. Escalate to Opus only when output quality is insufficient. Use Haiku for automated, repetitive, or latency-sensitive tasks.',
          },
        ],
      },
      {
        type: 'table',
        header: ['Model ID', 'Best For'],
        rows: [
          ['claude-opus-4-6',   'Complex reasoning, architecture, deep analysis'],
          ['claude-sonnet-4-6', 'General development — balanced speed and capability'],
          ['claude-haiku-4-5',  'Fast tasks, CI pipelines, high-volume operations'],
        ],
      },
      {
        type: 'table',
        header: ['Capability', 'Opus 4.6 / Sonnet 4.6 / Haiku 4.5'],
        rows: [
          ['Code generation quality', 'Highest / High / Good'],
          ['Reasoning depth',         'Deep / Strong / Basic'],
          ['Response speed',          'Slowest / Fast / Fastest'],
          ['Cost (relative)',         'Highest / Medium / Lowest'],
          ['Context window',          '200K / 200K / 200K'],
        ],
      },
    ],
  },

  // ── CONFIGURATION ────────────────────────────────────────────────────────
  {
    id: 'configuration',
    label: 'Configuration',
    icon: '⚙️',
    description: 'CLAUDE.md format, settings.json schema, permission rules, MCP server config, and output style settings.',
    content: [
      {
        type: 'paragraph',
        text: 'Claude Code reads configuration from three sources in priority order (highest wins): CLI flags, project-level .claude/settings.json, and global ~/.claude/settings.json. CLAUDE.md is the plain-text context file loaded automatically at session start.',
      },
      {
        type: 'code',
        text: `# CLAUDE.md — project context file

## Common Commands
npm run dev        # Start dev server
npm run build      # Production build
npx tsc --noEmit   # Type-check only

## Architecture
- React 18 + TypeScript + Vite + Tailwind
- Tab routing: state in App.tsx, no React Router
- Data in src/data/, accessed via src/services/

## Conventions
- Always use @/ alias imports from src/
- Never hardcode data inside components
- Keep CLAUDE.md under 200 lines`,
      },
      {
        type: 'code',
        text: `// .claude/settings.json — full schema
{
  "model": "claude-sonnet-4-6",
  "defaultMode": "ask",
  "outputStyle": "concise",

  "permissions": {
    "allow": [
      "Bash(command:git)",
      "Bash(command:npm)",
      "Read(path:./src)",
      "Write(path:./src)",
      "WebFetch(domain:api.anthropic.com)"
    ],
    "deny": [
      "Bash(command:rm -rf)",
      "Write(path:.env)",
      "WebFetch(domain:*)"
    ]
  },

  "hooks": {
    "post-file-write": { "run": "npx tsc --noEmit" },
    "pre-git-push":    { "run": "npm run lint && npm run test" }
  },

  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./src"]
    }
  }
}`,
      },
      {
        type: 'table',
        header: ['settings.json Key', 'Purpose'],
        rows: [
          ['model',        'Pin the Claude model for this project'],
          ['permissions',  'allow/deny rules for Bash, Read, Write, Edit, WebFetch'],
          ['hooks',        'Shell commands triggered by lifecycle events'],
          ['mcpServers',   'MCP server definitions (command + args)'],
          ['defaultMode',  '"accept" | "ask" | "reject" — default tool approval behaviour'],
          ['outputStyle',  '"concise" | "verbose" — controls response verbosity'],
        ],
      },
      {
        type: 'heading',
        text: 'Output Style Demo',
      },
      {
        type: 'image-gallery',
        description: "Claude Code's Default output style is the existing system prompt, designed to help you complete software engineering tasks efficiently. There are two additional built-in output styles focused on teaching you the codebase and how Claude operates:",
        bullets: [
          { title: 'Explanatory', body: 'Provides educational "Insights" in between helping you complete software engineering tasks. Helps you understand implementation choices and codebase patterns.' },
          { title: 'Learning', body: 'Collaborative, learn-by-doing mode where Claude will not only share "Insights" while coding, but also ask you to contribute small, strategic pieces of code yourself. Claude Code will add TODO(human) markers in your code for you to implement.' },
        ],
        items: [
          { src: configOutputstyleCustomed,     alt: 'config-outputstyle-customed',     caption: 'config-outputstyle-customed'     },
          { src: configOutputstyleExplationary, alt: 'config-outputstyle-explationary', caption: 'config-outputstyle-explationary' },
          { src: configOutputstyleLearning,     alt: 'config-outputstyle-learning',     caption: 'config-outputstyle-learning'     },
        ],
      },
    ],
  },

  // ── WORKFLOW ─────────────────────────────────────────────────────────────
  {
    id: 'workflow',
    label: 'Workflow',
    icon: '🔄',
    description: 'Common Claude Code usage patterns: interactive session, one-shot headless, CI pipelines, parallel worktrees, and agent teams.',
    content: [
      {
        type: 'paragraph',
        text: 'Claude Code supports multiple execution modes to fit different development contexts — from interactive pair-programming to fully automated CI pipelines. Choosing the right mode prevents wasted tokens and avoids blocking workflows.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Interactive Session',
            color: 'blue',
            body: 'Run claude in your terminal for conversational, back-and-forth development. Best for exploratory work, design decisions, and debugging where you need to guide Claude step by step.',
          },
          {
            title: 'One-Shot (-p flag)',
            color: 'green',
            body: 'Run claude -p "prompt" to execute a single task non-interactively. Claude completes the task and exits. Best for scripting, automation, and well-specified tasks.',
          },
          {
            title: 'Headless / CI',
            color: 'purple',
            body: 'Combine -p with --output-format json and pipe into downstream tools. Claude Code has no TTY requirement — safe to run in GitHub Actions, Jenkins, or any CI runner.',
          },
          {
            title: 'Parallel Worktrees',
            color: 'orange',
            body: 'Use git worktree add to create isolated branches, then run a Claude agent in each. Multiple features develop in parallel without contaminating each other\'s working directories.',
          },
          {
            title: 'Agent Teams',
            color: 'gray',
            body: 'Spawn specialised subagents (general-purpose, explore, plan) from an orchestrator session. Each subagent operates independently; the orchestrator synthesises results.',
          },
        ],
      },
      {
        type: 'code',
        text: `# One-shot: implement a feature and exit
claude -p "Add input validation to src/auth/LoginForm.tsx"

# CI: run in GitHub Actions, capture JSON output
claude -p "Review src/ for security issues" --output-format json > review.json

# Parallel worktrees: two features at once
git worktree add ../feature-a -b feature/a
git worktree add ../feature-b -b feature/b
cd ../feature-a && claude -p "Implement feature A"
cd ../feature-b && claude -p "Implement feature B"

# Resume a named session later
claude -r "auth-refactor" "Continue where we left off"`,
      },
      {
        type: 'table',
        header: ['Mode', 'When to Use'],
        rows: [
          ['Interactive session',  'Exploratory work, debugging, design decisions'],
          ['One-shot (-p)',        'Well-specified tasks, automation scripts, batch jobs'],
          ['Headless / CI',        'GitHub Actions, pre-commit hooks, scheduled pipelines'],
          ['Parallel worktrees',   'Multiple independent features developed simultaneously'],
          ['Agent teams',          'Complex goals requiring specialised roles: plan, explore, execute'],
        ],
      },
    ],
  },

  // ── SETTINGS ─────────────────────────────────────────────────────────────
  {
    id: 'settings',
    label: 'Settings',
    icon: '🔧',
    description: 'Full settings.json reference: permission rule syntax, defaultMode, hooks structure, model pinning, and environment variables.',
    content: [
      {
        type: 'paragraph',
        text: 'Settings are resolved with this priority: CLI flags override settings.local.json, which overrides .claude/settings.json, which overrides ~/.claude/settings.json. Use settings.local.json (gitignored) for personal developer overrides that should not be committed.',
      },
      {
        type: 'table',
        header: ['Permission Prefix', 'Controls'],
        rows: [
          ['Bash(command:git)',           'Allow/deny git commands in Bash'],
          ['Read(path:./src)',            'Allow/deny reading a path or glob'],
          ['Write(path:./src)',           'Allow/deny writing to a path or glob'],
          ['Edit(path:./src)',            'Allow/deny in-place edits to a path'],
          ['WebFetch(domain:github.com)', 'Allow/deny HTTP requests to a specific domain'],
          ['WebFetch(domain:*)',          'Wildcard — allow/deny all domains'],
        ],
      },
      {
        type: 'table',
        header: ['Hook Event', 'Triggered When'],
        rows: [
          ['pre-tool-call',   'Before every tool call — use for audit or rate-limiting'],
          ['post-tool-call',  'After every tool call completes'],
          ['pre-file-write',  'Before any file is written — use to validate paths'],
          ['post-file-write', 'After a file is written — use to type-check or format'],
          ['pre-git-push',    'Before a git push — use to run lint and tests'],
          ['post-git-commit', 'After a commit — use for changelogs or notifications'],
        ],
      },
      {
        type: 'table',
        header: ['Environment Variable', 'Purpose'],
        rows: [
          ['ANTHROPIC_API_KEY',    'API key for Anthropic (required unless using Claude.ai)'],
          ['ANTHROPIC_AUTH_TOKEN', 'OAuth token — alternative to API key'],
          ['CLAUDE_MODEL',         'Override model without editing settings.json'],
          ['CLAUDE_OUTPUT_STYLE',  '"concise" or "verbose"'],
          ['CLAUDE_TIMEOUT',       'Request timeout in ms (default: 120000)'],
          ['CLAUDE_MAX_TOKENS',    'Hard cap on response token length'],
        ],
      },
      {
        type: 'code',
        text: `// Complete annotated settings.json
{
  // Pin the model for this project
  "model": "claude-sonnet-4-6",

  // Default tool approval: "accept" | "ask" | "reject"
  "defaultMode": "ask",

  // Response verbosity: "concise" | "verbose"
  "outputStyle": "concise",

  "permissions": {
    "allow": [
      "Bash(command:git)",           // git commands always allowed
      "Bash(command:npm)",           // npm commands always allowed
      "Read(path:./src)",            // read anything in src/
      "Write(path:./src)",           // write anything in src/
      "WebFetch(domain:api.anthropic.com)"
    ],
    "deny": [
      "Bash(command:rm -rf)",        // block destructive rm
      "Write(path:.env)",            // never write secrets file
      "WebFetch(domain:*)"           // block all other domains
    ]
  },

  // Hooks: shell commands on lifecycle events
  "hooks": {
    "post-file-write": { "run": "npx tsc --noEmit" },
    "pre-git-push":    { "run": "npm run lint && npm run test" }
  },

  // MCP servers available in this project
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./src"]
    }
  }
}`,
      },
    ],
  },

  // ── SANDBOX ──────────────────────────────────────────────────────────────
  {
    id: 'sandbox',
    label: 'Sandbox',
    icon: '🧪',
    description: 'Claude Code sandbox mode — what it is, why it matter, how to use it, and when to use it.',
    content: [
      {
        type: 'heading',
        text: 'What is it',
      },
      {
        type: 'paragraph',
        text: 'Claude Code’s sandboxed bash tool provides filesystem and network isolation for safer, more autonomous agent execution.',
      },
      {
        type: 'heading',
        text: 'why it matters',
      },
      {
        type: 'paragraph',
        text: 'Traditional permission-based security requires constant user approval for bash commands. While this provides control, it can lead to approval fatigue, reduced productivity, and limited autonomy. Sandboxing addresses these challenges by defining clear boundaries — specifying exactly which directories and network hosts Claude Code can access. Safe commands within the sandbox run without prompts, attempts outside trigger immediate notifications, and Claude Code can work more independently within defined limits.',
      },
      
      {
        type: 'heading',
        text: 'How to use it',
      },
      {
        type: 'paragraph',
        text: 'Toggle sandbox mode from inside a Claude Code session with the /sandbox slash command. Each invocation flips the current state — run it once to enable, again to disable. You can also inspect current sandbox settings at any time using /status.',
      },
      {
        type: 'code',
        text: `# Inside a Claude Code session — toggle sandbox on
> /sandbox
✓ Sandbox enabled

  Filesystem  read  : unrestricted
  Filesystem  write : [ ".", "$TMPDIR", "/tmp/claude" ]
  Network     fetch : unrestricted

# Run some commands — safe paths work silently
> ls src/
  App.tsx  components/  utils/  ...

# Attempt a write outside the allowlist — blocked automatically
> echo "test" > /etc/hosts
  ✗ Operation not permitted (path outside sandbox write allowlist)

# Toggle sandbox back off
> /sandbox
✓ Sandbox disabled — full bash permissions restored`,
      },
      {
        type: 'heading',
        text: 'Notes !!',
      },
      {
        type: 'paragraph',
        text: 'Effective sandboxing requires both filesystem and network isolation. Without network isolation, a compromised agent could exfiltrate sensitive files like SSH keys. Without filesystem isolation, a compromised agent could backdoor system resources to gain network access. When configuring sandboxing it is important to ensure that your configured settings do not create bypasses in these systems.',
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

    case 'heading':
      return (
        <div key={index} className="flex items-center gap-3 mt-2">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-blue-400 flex-shrink-0" />
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-widest">{block.text}</h4>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
      )

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

    case 'image':
      return (
        <figure key={index} className="rounded-xl overflow-hidden shadow-sm border border-gray-100 max-w-sm">
          <div className="bg-gray-900">
            <img src={block.src} alt={block.alt} className="w-full max-h-48 object-contain object-top" />
          </div>
          {block.caption && (
            <div className="px-3 py-2 bg-gradient-to-r from-indigo-50 to-blue-50">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-mono font-semibold rounded-full">
                {block.caption}
              </span>
            </div>
          )}
        </figure>
      )

    case 'image-gallery':
      return (
        <div key={index} className="rounded-2xl border border-gray-100 shadow-sm">
          {/* Description text */}
          {(block.description || block.bullets) && (
            <div className="px-5 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100 space-y-3 rounded-t-2xl">
              {block.description && (
                <p className="text-sm text-gray-700 leading-relaxed">{block.description}</p>
              )}
              {block.bullets && (
                <ul className="space-y-2">
                  {block.bullets.map(b => (
                    <li key={b.title} className="flex gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                      <span><span className="font-semibold text-indigo-700">{b.title}:</span> {b.body}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {/* Images grid — no overflow clipping so zoom can break out */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 bg-white">
            {block.items.map((item) => (
              <div key={item.alt} className="bg-gray-50 relative cursor-zoom-in">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full max-h-44 object-contain object-top transition-transform duration-300 ease-in-out hover:scale-[2] hover:z-[200] relative"
                />
              </div>
            ))}
          </div>
          {/* Caption strip */}
          <div className="grid grid-cols-3 divide-x divide-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50 border-t border-indigo-100 rounded-b-2xl">
            {block.items.map((item) => (
              <div key={item.alt} className="px-2 py-2 text-center">
                <span className="text-xs font-mono text-indigo-600 font-medium">{item.caption}</span>
              </div>
            ))}
          </div>
        </div>
      )
  }
}

export default function ClaudePage(): ReactNode {
  const [activeSectionId, setActiveSectionId] = useState<string>('model')
  const active = SECTIONS.find(s => s.id === activeSectionId) ?? SECTIONS[0]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-3 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Claude Reference</h2>
            <p className="text-gray-500 text-sm">Claude model family, configuration, workflows, and settings reference</p>
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
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
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
