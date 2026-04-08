import { useState } from 'react'
import type { ReactNode } from 'react'
import CodeBlock from '../ui/CodeBlock'
import DocSection from '../ui/DocSection'
import HoverCard from '../ui/HoverCard'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DocSectionNav {
  id: string
  label: string
}

interface AgentInfo {
  name: string
  color: string
  desc: string
  use: string
}

interface SecurityPractice {
  title: string
  content: string
}

interface TroubleshootIssue {
  error: string
  title: string
  fix: string
}

interface ShortcutGroup {
  title: string
  rows: [string, string][]
}

interface Capability {
  label: string
  icon: string
  description: string
  imageSrc: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DOC_SECTIONS: DocSectionNav[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'install', label: 'Installation' },
  { id: 'commands', label: 'Commands' },
  { id: 'shortcuts', label: 'Shortcuts' },
  { id: 'config', label: 'Configuration' },
  { id: 'agents', label: 'Agents' },
  { id: 'git', label: 'Git Integration' },
  { id: 'security', label: 'Security' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
]

// ---------------------------------------------------------------------------
// Section Components
// ---------------------------------------------------------------------------

function OverviewSection(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Overview</h3>
      <p className="text-gray-600">Claude Code CLI is Anthropic's official command-line interface for Claude, providing developers with AI-powered assistance directly in their terminal. It supports multiple interfaces including terminal, desktop app, web app, and IDE extensions.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-2 border border-gray-200">Model</th>
              <th className="text-left px-4 py-2 border border-gray-200">Speed</th>
              <th className="text-left px-4 py-2 border border-gray-200">Capability</th>
              <th className="text-left px-4 py-2 border border-gray-200">Best For</th>
            </tr>
          </thead>
          <tbody>
            {([
              ['Haiku', 'Fast', 'Basic', 'Quick tasks, simple queries'],
              ['Sonnet', 'Medium', 'High', 'Most development work'],
              ['Opus', 'Slow', 'Maximum', 'Complex reasoning, architecture'],
            ] as const).map(([m, s, c, b]) => (
              <tr key={m} className="border-b border-gray-100">
                <td className="px-4 py-2 border border-gray-200 font-mono text-blue-700">{m}</td>
                <td className="px-4 py-2 border border-gray-200">{s}</td>
                <td className="px-4 py-2 border border-gray-200">{c}</td>
                <td className="px-4 py-2 border border-gray-200 text-gray-600">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function InstallSection(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Installation & Setup</h3>
      <div className="space-y-3">
        <p className="font-semibold text-gray-700">Global Installation (Recommended)</p>
        <CodeBlock>npm install -g @anthropic-ai/claude-code</CodeBlock>
        <p className="font-semibold text-gray-700">Project-Specific Installation</p>
        <CodeBlock>npm install --save-dev @anthropic-ai/claude-code</CodeBlock>
        <p className="font-semibold text-gray-700">Initialize New Project</p>
        <CodeBlock>claude init</CodeBlock>
        <p className="text-sm text-gray-600">
          Creates: <code className="bg-gray-100 px-1 rounded">.claude/</code> directory,{' '}
          <code className="bg-gray-100 px-1 rounded">CLAUDE.md</code>, and default{' '}
          <code className="bg-gray-100 px-1 rounded">settings.json</code>
        </p>
        <p className="font-semibold text-gray-700">Authentication via Environment Variable</p>
        <CodeBlock>export ANTHROPIC_AUTH_TOKEN="your-token-here"</CodeBlock>
      </div>
    </div>
  )
}

function CommandsSection(): ReactNode {
  const slashCommands: [string, string][] = [
    ['/help', 'Show help & available commands'],
    ['/clear', 'Clear conversation history'],
    ['/exit', 'Exit Claude Code CLI'],
    ['/commit', 'Auto-generate git commit message'],
    ['/init', 'Initialize CLAUDE.md documentation'],
    ['/simplify', 'Review & optimize changed code'],
    ['/debug', 'Enable debug logging'],
    ['/loop 5m /cmd', 'Run a command on recurring interval'],
    ['/claude-api', 'Claude API / Anthropic SDK assistance'],
  ]
  const cliFlags: [string, string][] = [
    ['--help', 'Show help'],
    ['--version', 'Display version'],
    ['--config <path>', 'Custom config file'],
    ['--debug', 'Enable debug mode'],
    ['--verbose', 'Detailed output'],
    ['--quiet', 'Suppress verbose output'],
    ['--model <model>', 'Specify model (opus/sonnet/haiku)'],
    ['--timeout <ms>', 'Request timeout (default 120000)'],
    ['--max-tokens <n>', 'Limit response tokens'],
  ]
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Commands</h3>
      <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide">Slash Commands</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-gray-50"><th className="text-left px-4 py-2 border border-gray-200">Command</th><th className="text-left px-4 py-2 border border-gray-200">Description</th></tr></thead>
          <tbody>
            {slashCommands.map(([cmd, desc]) => (
              <tr key={cmd} className="border-b border-gray-100">
                <td className="px-4 py-2 border border-gray-200 font-mono text-purple-700 whitespace-nowrap">{cmd}</td>
                <td className="px-4 py-2 border border-gray-200 text-gray-600">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mt-4">CLI Flags</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-gray-50"><th className="text-left px-4 py-2 border border-gray-200">Flag</th><th className="text-left px-4 py-2 border border-gray-200">Description</th></tr></thead>
          <tbody>
            {cliFlags.map(([flag, desc]) => (
              <tr key={flag} className="border-b border-gray-100">
                <td className="px-4 py-2 border border-gray-200 font-mono text-blue-700 whitespace-nowrap">{flag}</td>
                <td className="px-4 py-2 border border-gray-200 text-gray-600">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ShortcutsSection(): ReactNode {
  const groups: ShortcutGroup[] = [
    { title: 'General Shortcuts', rows: [['!', 'Bash Mode'], ['/', 'Commannds'], ['@', 'File Path'], ['&', 'For Background'], ['Ctrl+C', 'Cancel current operation']] },
    { title: 'Session Control', rows: [['Ctrl+C', 'Cancel current operation'], ['Ctrl+D', 'Exit Claude Code CLI'], ['Ctrl+L', 'Clear screen'], ['↑ / ↓', 'Navigate command history'], ['Tab', 'Auto-complete commands']] },
    { title: 'Editing', rows: [['Ctrl+A', 'Move to beginning of line'], ['Ctrl+E', 'Move to end of line'], ['Ctrl+U', 'Delete to beginning of line'], ['Ctrl+K', 'Delete to end of line'], ['Ctrl+W', 'Delete word'], ['Ctrl+Y', 'Paste deleted text'], ['Double Tap Esc', 'Clear the Input']] },
    { title: 'Search', rows: [['Ctrl+R', 'Search command history'], ['Ctrl+S', 'Forward search'], ['Ctrl+F', 'Search within files']] },
  ]
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Keyboard Shortcuts</h3>
      {groups.map(({ title, rows }) => (
        <div key={title}>
          <p className="font-semibold text-gray-700 mb-2">{title}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-gray-50"><th className="text-left px-4 py-2 border border-gray-200">Shortcut</th><th className="text-left px-4 py-2 border border-gray-200">Action</th></tr></thead>
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k} className="border-b border-gray-100">
                    <td className="px-4 py-2 border border-gray-200 font-mono text-orange-600">{k}</td>
                    <td className="px-4 py-2 border border-gray-200 text-gray-600">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

function ConfigSection(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Configuration System</h3>
      <p className="text-gray-600">Config is loaded in priority order (highest to lowest): CLI flags → <code className="bg-gray-100 px-1 rounded">settings.local.json</code> → <code className="bg-gray-100 px-1 rounded">settings.json</code> → global settings.</p>
      <DocSection title="File Locations">
        <CodeBlock>{`~/.claude/settings.json          # Global defaults
~/.claude/settings.local.json   # User overrides
.claude/settings.json            # Project defaults
.claude/settings.local.json     # Project overrides
CLAUDE.md                        # Project documentation`}</CodeBlock>
      </DocSection>
      <DocSection title="Permissions">
        <CodeBlock>{`{
  "permissions": {
    "allow": [
      "Bash(command:git)",
      "Bash(command:npm)",
      "WebFetch(domain:github.com)"
    ],
    "deny": [
      "Bash(command:rm -rf)",
      "WebFetch(domain:*)"
    ]
  }
}`}</CodeBlock>
      </DocSection>
      <DocSection title="Hooks">
        <CodeBlock>{`{
  "hooks": {
    "pre-git-push": { "run": "npm run lint && npm run test" },
    "post-git-commit": { "run": "echo 'Committed!'" },
    "pre-file-write": { "run": "echo 'Writing file...'" }
  }
}`}</CodeBlock>
      </DocSection>
      <DocSection title="Sandbox">
        <CodeBlock>{`{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "read": { "allow": ["./src"], "deny": [".env"] },
      "write": { "allow": ["./dist"], "deny": ["./src"] }
    },
    "network": {
      "allowedHosts": ["github.com", "registry.npmjs.org"]
    }
  }
}`}</CodeBlock>
      </DocSection>
    </div>
  )
}

function AgentsSection(): ReactNode {
  const agents: AgentInfo[] = [
    { name: 'General-Purpose', color: 'blue', desc: 'Complex multi-step tasks, autonomous execution. Has access to all tools.', use: 'Complex research, multi-step code gen, autonomous problem-solving' },
    { name: 'Explore', color: 'green', desc: 'Fast codebase exploration. No write/edit tools.', use: 'Finding files, searching keywords, understanding structure' },
    { name: 'Plan', color: 'purple', desc: 'Software architect for designing implementation plans.', use: 'Planning strategies, identifying critical files, architecture trade-offs' },
    { name: 'Quant Research', color: 'orange', desc: 'Specialized for quantitative trading research and financial algorithms.', use: 'Alpha signals, backtesting, risk models, academic research' },
  ]
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Agent System</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map(({ name, color, desc, use }) => (
          <div key={name} className={`border border-${color}-200 bg-${color}-50 rounded-xl p-4`}>
            <h4 className={`font-bold text-${color}-800 mb-1`}>{name}</h4>
            <p className="text-sm text-gray-600 mb-2">{desc}</p>
            <p className="text-xs text-gray-500"><span className="font-medium">Use when:</span> {use}</p>
          </div>
        ))}
      </div>
      <p className="font-semibold text-gray-700 mt-2">Agent Commands</p>
      <CodeBlock>{`claude agent general-purpose "Fix authentication bug"
claude agent explore --thoroughness medium
claude agent send <agent-id> "Update the report"
claude agent status <agent-id>
claude agent stop <agent-id>`}</CodeBlock>
    </div>
  )
}

function GitSection(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Git Integration</h3>
      <p className="text-gray-600">Claude Code automatically detects git repositories and provides smart commit message generation, branch-aware operations, and conflict resolution assistance.</p>
      <DocSection title="Feature Development Workflow">
        <CodeBlock>{`git checkout -b feature/new-feature
claude
> Implement user authentication
claude /simplify
claude /commit
git push -u origin feature/new-feature`}</CodeBlock>
      </DocSection>
      <DocSection title="GitHub PR & Issue Operations">
        <CodeBlock>{`# Pull Requests
gh pr create --title "Fix bug" --body "Description"
gh pr view 123
gh pr list
gh pr merge 123

# Issues
gh issue create --title "Bug report" --body "Description"
gh issue view 456
gh issue list`}</CodeBlock>
      </DocSection>
      <DocSection title="Branch Management">
        <CodeBlock>{`git checkout -b feature-branch   # Create & switch
git checkout main                # Switch existing
git branch -a                    # List all branches
git remote add origin <url>      # Add remote
git push -u origin main          # Push branch
git pull origin main             # Pull changes`}</CodeBlock>
      </DocSection>
    </div>
  )
}

function SecuritySection(): ReactNode {
  const practices: SecurityPractice[] = [
    { title: '1. Never Commit Secrets', content: 'Add .env, *.key, *.pem, credentials.json to .gitignore' },
    { title: '2. Use Environment Variables', content: 'Reference secrets via ${API_KEY} in config instead of hardcoding' },
    { title: '3. Enable Sandbox', content: 'Set sandbox.enabled: true to isolate execution environment' },
    { title: '4. Principle of Least Privilege', content: 'Deny by default, allow explicitly only what is needed' },
  ]
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Security Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {practices.map(({ title, content }) => (
          <div key={title} className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="font-bold text-red-800 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{content}</p>
          </div>
        ))}
      </div>
      <DocSection title="Permission Categories">
        <div className="flex flex-wrap gap-2">
          {['Bash — Command execution', 'WebFetch — Network requests', 'Read — File reading', 'Write — File writing', 'Edit — File modification'].map((p) => (
            <span key={p} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{p}</span>
          ))}
        </div>
      </DocSection>
    </div>
  )
}

function TroubleshootSection(): ReactNode {
  const issues: TroubleshootIssue[] = [
    { error: 'EPERM: operation not permitted', title: 'Permission Denied', fix: 'Check sandbox settings, update permissions in settings.json, or check macOS Firewall settings.' },
    { error: 'EADDRINUSE: address already in use', title: 'Cannot Bind to Port', fix: 'Run: lsof -ti:3000 | xargs kill -9  or use a different port with: npm run dev -- --port 3001' },
    { error: '403: Permission denied', title: 'Authentication Failed', fix: 'Verify token with: echo $ANTHROPIC_AUTH_TOKEN  — generate a new token and update settings.json.' },
    { error: 'Slow responses', title: 'Slow Response', fix: 'Use haiku model instead of opus, reduce context window, or use background tasks for long operations.' },
    { error: 'Context too large', title: 'Memory Issues', fix: 'Run /clear to reset conversation, reduce file context, or break into smaller tasks.' },
  ]
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Troubleshooting</h3>
      <div className="space-y-3">
        {issues.map(({ error, title, fix }) => (
          <div key={title} className="border border-yellow-200 bg-yellow-50 rounded-xl p-4">
            <h4 className="font-bold text-yellow-800 mb-1">{title}</h4>
            <code className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded block mb-2">{error}</code>
            <p className="text-sm text-gray-600">{fix}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="font-semibold text-gray-700 mb-2">Enable Debug Mode</p>
        <CodeBlock>claude --debug</CodeBlock>
        <p className="text-sm text-gray-500 mt-2">Provides: request/response logs, error stack traces, performance metrics, tool execution details.</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section map & main component
// ---------------------------------------------------------------------------

type SectionId = typeof DOC_SECTIONS[number]['id']

const SECTION_MAP: Record<string, () => ReactNode> = {
  overview: OverviewSection,
  install: InstallSection,
  commands: CommandsSection,
  shortcuts: ShortcutsSection,
  config: ConfigSection,
  agents: AgentsSection,
  git: GitSection,
  security: SecuritySection,
  troubleshoot: TroubleshootSection,
}

export default function DocsTab(): ReactNode {
  const [activeDocSection, setActiveDocSection] = useState<SectionId>('overview')
  const ActiveSection = SECTION_MAP[activeDocSection]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-900 text-green-400 p-3 rounded-xl text-2xl font-mono">{'>'}_</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Claude Code CLI Documentation</h2>
            <p className="text-gray-500 text-sm">Version: Claude Sonnet 4.6 — Generated April 1, 2026</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {([
            {
              label: 'Code Generation',
              icon: '✍️',
              description:
                'Generate code in any language directly from natural-language prompts. Claude reads surrounding files to match your project style and conventions.',
              imageSrc: '/images/code-generation.png',
            },
            {
              label: 'File Operations',
              icon: '📁',
              description:
                'Read, write, edit, and search across your codebase with dedicated tools. Operations are scoped by sandbox and permission settings.',
              imageSrc: '/images/file-operations.png',
            },
            {
              label: 'Git Integration',
              icon: '🔀',
              description:
                'Auto-detects git repos, generates commit messages, manages branches, and integrates with the gh CLI for PRs and issues.',
              imageSrc: '/images/git-integration.png',
            },
            {
              label: 'Multi-Agent System',
              icon: '🤖',
              description:
                'Spawn specialized subagents (general-purpose, explore, plan) in parallel to handle research, planning, and execution independently.',
              imageSrc: '/images/multi-agent.png',
            },
            {
              label: 'Custom Skills',
              icon: '🔧',
              description:
                'Define reusable skills via slash commands (/commit, /simplify, /loop) that bundle prompts and tools into one-shot workflows.',
              imageSrc: '/images/custom-skills.png',
            },
            {
              label: 'Security Controls',
              icon: '🔒',
              description:
                'Sandbox filesystem and network access, allow/deny permission rules, and hooks for auditing every tool call.',
              imageSrc: '/images/security-controls.png',
            },
          ] as Capability[]).map((cap) => (
            <HoverCard
              key={cap.label}
              title={cap.label}
              description={cap.description}
              imageSrc={cap.imageSrc}
            >
              <div className="bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2 text-sm text-gray-700 cursor-pointer transition-colors">
                <span>{cap.icon}</span>
                {cap.label}
              </div>
            </HoverCard>
          ))}
        </div>
      </div>

      {/* Section Nav */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex flex-wrap gap-2">
          {DOC_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveDocSection(s.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeDocSection === s.id
                  ? 'bg-gray-900 text-green-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <ActiveSection />
      </div>
    </div>
  )
}
