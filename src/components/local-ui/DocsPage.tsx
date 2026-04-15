import { useState } from 'react'
import type { ReactNode } from 'react'
import CodeBlock from '@/components/ui/CodeBlock'
import claudeHierarchyImg from '@/asset/claude-md-hierarcy.png'
import claudeOrderImg from '@/asset/claude-order.png'

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
//   { type: 'heading', text: '...', level?: 2 | 3 }   ← feeds the sidebar TOC
//   { type: 'filedemo' }                               ← interactive file explorer
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
  | { type: 'heading'; text: string; level?: 2 | 3 }
  | { type: 'filedemo' }

interface DocSection {
  id: string
  label: string
  icon: string
  description: string
  content: ContentBlock[]
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const SECTIONS: DocSection[] = [
  // ── CLAUDE.MD ─────────────────────────────────────────────────────────────
  {
    id: 'claude',
    label: 'CLAUDE.md',
    icon: '📋',
    description: 'Persistent instructions that give Claude context about your project, workflow, and team standards.',
    content: [
      { type: 'heading', text: 'Memory Systems' },
      {
        type: 'paragraph',
        text: 'Each Claude Code session begins with a fresh context window. Two mechanisms carry knowledge across sessions: CLAUDE.md files (instructions you write) and Auto memory (notes Claude writes itself based on your corrections and preferences).',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'CLAUDE.md Files',
            color: 'blue',
            body: 'Instructions you write once and Claude reads every session. Covers build commands, coding standards, architecture, and "always do X" rules.',
          },
          {
            title: 'Auto Memory',
            color: 'green',
            body: 'Notes Claude accumulates automatically from your corrections and preferences. Stored per-project in ~/.claude/projects/<project>/memory/.',
          },
        ],
      },

      { type: 'heading', text: 'CLAUDE.md vs Auto Memory' },
      {
        type: 'table',
        header: ['Aspect', 'CLAUDE.md → Auto Memory'],
        rows: [
          ['Who writes it', 'You → Claude'],
          ['What it contains', 'Instructions & rules → Learnings & patterns'],
          ['Scope', 'Project, user, or org → Per working tree'],
          ['Loaded into', 'Every session → Every session (first 200 lines or 25KB)'],
          ['Use for', 'Coding standards, workflows → Build commands, debugging insights'],
        ],
      },

      { type: 'heading', text: 'File Locations & Scope' },
      {
        type: 'paragraph',
        text: 'CLAUDE.md files can live in several locations, each with a different scope. More specific locations take precedence over broader ones.',
      },
      {
        type: 'table',
        header: ['Scope', 'Location'],
        rows: [
          ['Managed policy', '/Library/Application Support/ClaudeCode/CLAUDE.md (macOS)'],
          ['Project instructions', './CLAUDE.md or ./.claude/CLAUDE.md'],
          ['User instructions', '~/.claude/CLAUDE.md'],
          ['Local instructions', './CLAUDE.local.md (add to .gitignore)'],
        ],
      },
      {
        type: 'image',
        src: claudeHierarchyImg,
        alt: 'CLAUDE.md hierarchy',
        caption: 'CLAUDE.md files load from most general (managed policy) to most specific (local)',
      },

      { type: 'heading', text: 'Write Effective Instructions' },
      {
        type: 'paragraph',
        text: 'Target under 200 lines per file. Use markdown headers and bullets to group related instructions. Write instructions that are concrete enough to verify.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Be Specific',
            color: 'purple',
            body: '"Use 2-space indentation" not "Format code properly". Specific rules are consistently followed.',
          },
          {
            title: 'Stay Concise',
            color: 'orange',
            body: 'Under 200 lines per file. Longer files consume more context and reduce adherence. Split using @imports or .claude/rules/.',
          },
          {
            title: 'Avoid Conflicts',
            color: 'red',
            body: 'If two rules contradict each other, Claude may pick one arbitrarily. Review your CLAUDE.md files periodically.',
          },
          {
            title: 'Use /init',
            color: 'gray',
            body: 'Run /init to auto-generate a starting CLAUDE.md. Claude analyzes your codebase and creates build commands and conventions.',
          },
        ],
      },

      { type: 'heading', text: 'Import External Files' },
      {
        type: 'paragraph',
        text: 'CLAUDE.md files can import additional files using @path/to/import syntax. Imported files are expanded and loaded into context at launch alongside the CLAUDE.md that references them.',
      },
      {
        type: 'code',
        text: `# CLAUDE.md — project root
See @README for project overview and @package.json for available npm commands.

# Additional Instructions
- git workflow @docs/git-instructions.md

# Import shared agent instructions, then add Claude-specific overrides
@AGENTS.md

## Claude Code
Use plan mode for changes under src/billing/.`,
      },

      { type: 'heading', text: 'How Files Load' },
      {
        type: 'paragraph',
        text: 'Claude Code walks up the directory tree from your current working directory, loading CLAUDE.md and CLAUDE.local.md from each directory. All discovered files are concatenated — not overriding each other. Within each directory, CLAUDE.local.md is appended after CLAUDE.md, so personal notes are the last thing Claude reads at that level.',
      },
      {
        type: 'image',
        src: claudeOrderImg,
        alt: 'CLAUDE.md load order',
        caption: 'Files discovered by walking up from the working directory are concatenated into context',
      },

      { type: 'heading', text: 'Auto Memory' },
      {
        type: 'paragraph',
        text: 'Auto memory lets Claude accumulate knowledge across sessions. Claude saves build commands, debugging insights, architecture notes, and code style preferences — only when the information would be useful in a future conversation.',
      },
      {
        type: 'code',
        text: `# Storage location per project
~/.claude/projects/<project>/memory/
├── MEMORY.md          # Concise index, loaded every session (first 200 lines)
├── debugging.md       # Debugging patterns Claude discovered
├── api-conventions.md # API design decisions
└── ...                # Other topic files Claude creates on demand

# Toggle auto memory or browse saved notes
/memory`,
      },
    ],
  },

  // ── SKILLS ────────────────────────────────────────────────────────────────
  {
    id: 'skills',
    label: 'Skills',
    icon: '🛠️',
    description: 'Extend Claude with reusable playbooks, checklists, and step-by-step procedures stored as SKILL.md files.',
    content: [
      { type: 'heading', text: 'What are Skills' },
      {
        type: 'paragraph',
        text: 'Skills extend what Claude can do. Create a SKILL.md file with instructions, and Claude adds it to its toolkit. Claude uses skills when relevant, or you can invoke one directly with /skill-name.',
      },
      {
        type: 'paragraph',
        text: "Create a skill when you keep pasting the same playbook or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill's body loads only when it's used — long reference material costs almost nothing until you need it.",
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Reference Skills',
            color: 'blue',
            body: 'Add knowledge Claude applies to your current work: conventions, patterns, style guides, domain knowledge. Loads inline alongside your conversation.',
          },
          {
            title: 'Task Skills',
            color: 'green',
            body: 'Step-by-step instructions for a specific action like deployments, commits, or code generation. Add disable-model-invocation: true to prevent Claude auto-triggering.',
          },
          {
            title: 'Auto-invoked Skills',
            color: 'purple',
            body: 'Claude automatically loads skills when the description matches your prompt. Write a clear description so Claude knows when to use it.',
          },
          {
            title: 'Subagent Skills',
            color: 'orange',
            body: 'Run skills in a separate context window using context: fork. Useful for long-running tasks that would flood the main conversation.',
          },
        ],
      },

      { type: 'heading', text: 'Bundled Skills' },
      {
        type: 'paragraph',
        text: 'Claude Code includes bundled skills available in every session. Unlike built-in commands, bundled skills are prompt-based: they give Claude a detailed playbook and let it orchestrate the work. Invoke with /skill-name.',
      },
      {
        type: 'table',
        header: ['Skill', 'Purpose'],
        rows: [
          ['/simplify', 'Review changed code for reuse, quality, and efficiency, then fix issues found'],
          ['/batch', 'Run the same operation across multiple files or targets in parallel'],
          ['/debug', 'Systematically diagnose errors — reads logs, traces the call stack, proposes fixes'],
          ['/loop', 'Run a prompt or slash command on a recurring interval (self-paced or fixed)'],
          ['/claude-api', 'Build, debug, and optimize Claude API / Anthropic SDK apps with prompt caching'],
        ],
      },

      { type: 'heading', text: 'Create Your First Skill' },
      {
        type: 'paragraph',
        text: 'Create a directory for the skill and add a SKILL.md file with YAML frontmatter and markdown instructions. The name field becomes the /slash-command.',
      },
      {
        type: 'code',
        text: `# Step 1 — Create skill directory (personal: available in all projects)
mkdir -p ~/.claude/skills/explain-code

# Step 2 — Write SKILL.md
cat > ~/.claude/skills/explain-code/SKILL.md << 'EOF'
---
name: explain-code
description: Explains code with visual diagrams and analogies. Use when explaining how code works or when asked "how does this work?"
---

When explaining code, always include:

1. **Start with an analogy** — compare to something from everyday life
2. **Draw a diagram** — use ASCII art to show flow or structure
3. **Walk through the code** — explain step-by-step what happens
4. **Highlight a gotcha** — common mistake or misconception
EOF

# Step 3 — Let Claude invoke it automatically (matches the description)
# "How does this code work?"

# Or invoke directly:
/explain-code src/auth/login.ts`,
      },

      { type: 'heading', text: 'Skill Locations' },
      {
        type: 'paragraph',
        text: 'Where you store a skill determines who can use it. When skills share the same name, higher-priority locations win: enterprise > personal > project. Claude Code watches skill directories for file changes — edits take effect within the current session.',
      },
      {
        type: 'table',
        header: ['Location', 'Scope'],
        rows: [
          ['Enterprise managed settings', 'All users in your organization'],
          ['~/.claude/skills/<name>/SKILL.md', 'All your projects (personal)'],
          ['.claude/skills/<name>/SKILL.md', 'This project only'],
          ['<plugin>/skills/<name>/SKILL.md', 'Where plugin is enabled'],
        ],
      },

      { type: 'heading', text: 'Configure Skills' },
      {
        type: 'paragraph',
        text: 'Skills are configured through YAML frontmatter at the top of SKILL.md. A skill directory can also include supporting files like templates, examples, and scripts that the SKILL.md references.',
      },
      {
        type: 'code',
        text: `---
name: my-skill
description: What this skill does and when Claude should invoke it automatically
context: fork                    # run in subagent (fork) or inline (default)
disable-model-invocation: true   # only /slash-command invocation, not auto
---

# Skill instructions follow the frontmatter
Your markdown playbook goes here. Claude reads this when the skill is invoked.

# Skill directory structure (optional supporting files)
my-skill/
├── SKILL.md           # Main instructions (required)
├── template.md        # Template for Claude to fill in
├── examples/
│   └── sample.md      # Example showing expected output format
└── scripts/
    └── validate.sh    # Script Claude can execute`,
      },
    ],
  },

  // ── RULES ─────────────────────────────────────────────────────────────────
  {
    id: 'rules',
    label: 'Rules',
    icon: '📐',
    description: 'Modular, path-scoped instructions in .claude/rules/ that keep your CLAUDE.md focused and team-friendly.',
    content: [
      { type: 'heading', text: 'What are Rules' },
      {
        type: 'paragraph',
        text: "Rules are markdown files in your project's .claude/rules/ directory. Each file covers one topic with a descriptive filename like testing.md or api-design.md. Rules without paths frontmatter are loaded at launch with the same priority as .claude/CLAUDE.md. Path-scoped rules only load when Claude works with matching files — saving context space.",
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Always-loaded Rules',
            color: 'blue',
            body: 'Files without paths frontmatter load at session start, same as CLAUDE.md. Use for universal project conventions.',
          },
          {
            title: 'Path-scoped Rules',
            color: 'green',
            body: 'Files with paths frontmatter only load when Claude reads matching files. Reduces noise and saves context for unrelated work.',
          },
          {
            title: 'Nested Directories',
            color: 'purple',
            body: 'All .md files in .claude/rules/ are discovered recursively. Organize by topic: frontend/, backend/, etc.',
          },
          {
            title: 'User-level Rules',
            color: 'orange',
            body: '~/.claude/rules/ applies to every project on your machine. For preferences that are not project-specific.',
          },
        ],
      },

      { type: 'heading', text: 'Set Up Rules' },
      {
        type: 'paragraph',
        text: "Place markdown files in your project's .claude/rules/ directory. Each file should cover one topic. All .md files are discovered recursively, so you can organize rules into subdirectories.",
      },
      {
        type: 'code',
        text: `your-project/
├── .claude/
│   ├── CLAUDE.md           # Main project instructions
│   └── rules/
│       ├── code-style.md   # Code style guidelines (always loaded)
│       ├── testing.md      # Testing conventions (always loaded)
│       ├── security.md     # Security requirements (path-scoped)
│       ├── frontend/
│       │   └── react.md    # React-specific rules
│       └── backend/
│           └── api.md      # API design rules`,
      },

      { type: 'heading', text: 'Path-Specific Rules' },
      {
        type: 'paragraph',
        text: 'Rules can be scoped to specific files using YAML frontmatter with the paths field. These conditional rules only apply when Claude is working with files matching the specified glob patterns.',
      },
      {
        type: 'code',
        text: `---
paths:
  - "src/api/**/*.ts"
  - "lib/**/*.ts"
---

# API Development Rules

- All API endpoints must include input validation
- Use the standard error response format: { error, message, code }
- Include OpenAPI documentation comments for all public endpoints
- Never log request bodies that may contain sensitive data`,
      },

      { type: 'heading', text: 'Pattern Reference' },
      {
        type: 'paragraph',
        text: 'Use glob patterns in the paths field to match files by extension, directory, or any combination. You can specify multiple patterns and use brace expansion to match multiple extensions.',
      },
      {
        type: 'table',
        header: ['Pattern', 'Matches'],
        rows: [
          ['**/*.ts', 'All TypeScript files in any directory'],
          ['src/**/*', 'All files under src/ directory'],
          ['*.md', 'Markdown files in the project root'],
          ['src/components/*.tsx', 'React components in a specific directory'],
          ['**/*.{ts,tsx}', 'TypeScript and TSX files anywhere (brace expansion)'],
          ['tests/**/*.test.ts', 'Test files only'],
        ],
      },

      { type: 'heading', text: 'Symlinks & User Rules' },
      {
        type: 'paragraph',
        text: 'The .claude/rules/ directory supports symlinks, so you can maintain a shared set of rules and link them into multiple projects. User-level rules in ~/.claude/rules/ apply to every project on your machine and are loaded before project rules, giving project rules higher priority.',
      },
      {
        type: 'code',
        text: `# Share rules across projects with symlinks
ln -s ~/shared-claude-rules .claude/rules/shared
ln -s ~/company-standards/security.md .claude/rules/security.md

# User-level rules — apply to ALL your projects
~/.claude/rules/
├── preferences.md    # Your personal coding preferences
└── workflows.md      # Your preferred workflows

# User-level rules load first; project rules have higher priority
# (project rules override your personal defaults when they conflict)`,
      },
    ],
  },

  // ── AGENTS ────────────────────────────────────────────────────────────────
  {
    id: 'agents',
    label: 'Agents',
    icon: '🤖',
    description: 'Specialized AI subagents that handle specific types of tasks in their own context windows with custom system prompts, tool access, and permissions.',
    content: [
      { type: 'heading', text: 'What are Subagents' },
      {
        type: 'paragraph',
        text: "Subagents are specialized AI assistants that handle specific types of tasks. Use one when a side task would flood your main conversation with search results, logs, or file contents you won't reference again — the subagent does that work in its own context and returns only the summary. Define a custom subagent when you keep spawning the same kind of worker with the same instructions.",
      },
      {
        type: 'cards',
        items: [
          { title: 'Preserve Context', color: 'blue', body: 'Keep exploration and implementation out of your main conversation. Verbose output stays in the subagent context; only the summary returns.' },
          { title: 'Enforce Constraints', color: 'green', body: 'Limit which tools a subagent can use — e.g., a read-only reviewer that cannot modify files using the tools allowlist.' },
          { title: 'Reuse Configs', color: 'purple', body: 'User-level subagents (~/.claude/agents/) are available across all your projects without repeating setup each time.' },
          { title: 'Control Costs', color: 'orange', body: 'Route tasks to faster, cheaper models like Haiku by setting model: haiku in the subagent frontmatter.' },
        ],
      },

      { type: 'heading', text: 'Built-in Subagents' },
      {
        type: 'paragraph',
        text: "Claude Code includes built-in subagents that Claude automatically uses when appropriate. Each inherits the parent conversation's permissions with additional tool restrictions.",
      },
      {
        type: 'table',
        header: ['Agent', 'Model · Purpose'],
        rows: [
          ['Explore', 'Haiku · Fast read-only agent for searching and analyzing codebases; keeps exploration out of main context'],
          ['Plan', 'Inherits · Research agent used during plan mode to gather context before presenting a plan (read-only)'],
          ['General-purpose', 'Inherits · All tools; for complex multi-step tasks requiring both exploration and modification'],
          ['statusline-setup', 'Sonnet · Configures your Claude Code status line when you run /statusline'],
          ['Claude Code Guide', 'Haiku · Answers questions about Claude Code features and capabilities'],
        ],
      },
      {
        type: 'paragraph',
        text: 'When invoking Explore, Claude specifies a thoroughness level: quick for targeted lookups, medium for balanced exploration, or very thorough for comprehensive analysis.',
      },

      { type: 'heading', text: 'Create Your First Subagent' },
      {
        type: 'paragraph',
        text: 'The quickest way is the /agents command. Open it, switch to the Library tab, select Create new agent, then choose Personal (saves to ~/.claude/agents/) or Project. You can generate the prompt with Claude by describing what the subagent should do.',
      },
      {
        type: 'code',
        text: `# ~/.claude/agents/code-reviewer.md  (personal — all projects)
---
name: code-reviewer
description: Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer ensuring high standards of code quality.

When invoked:
1. Run git diff to see recent changes
2. Focus on modified files and begin review immediately

Review checklist:
- Code is clear and readable
- No duplicated code or exposed secrets
- Proper error handling and input validation
- Good test coverage

Provide feedback organized by priority:
- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)`,
      },
      {
        type: 'paragraph',
        text: 'Subagents are loaded at session start. If you add a file manually, restart your session or use /agents to load it immediately.',
      },

      { type: 'heading', text: 'Subagent Scope & Locations' },
      {
        type: 'paragraph',
        text: 'When multiple subagents share the same name, the higher-priority location wins. Project subagents in .claude/agents/ should be checked into version control so your team can use and improve them.',
      },
      {
        type: 'table',
        header: ['Location', 'Scope · Priority'],
        rows: [
          ['Managed settings', 'Organization-wide · 1 (highest, cannot be overridden)'],
          ['--agents CLI flag', 'Current session only · 2 (not saved to disk)'],
          ['.claude/agents/', 'Current project · 3 (commit to version control)'],
          ['~/.claude/agents/', 'All your projects · 4 (personal)'],
          ["Plugin's agents/ directory", 'Where plugin is enabled · 5 (lowest)'],
        ],
      },
      {
        type: 'code',
        text: `# CLI-defined subagents — session only, not saved to disk
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer...",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  },
  "debugger": {
    "description": "Debugging specialist for errors and test failures.",
    "prompt": "You are an expert debugger..."
  }
}'`,
      },

      { type: 'heading', text: 'Frontmatter Fields' },
      {
        type: 'paragraph',
        text: 'Subagent files use YAML frontmatter for configuration, followed by the system prompt in Markdown. Only name and description are required.',
      },
      {
        type: 'table',
        header: ['Field', 'Description'],
        rows: [
          ['name', 'Required. Unique identifier using lowercase letters and hyphens'],
          ['description', 'Required. When Claude should delegate to this subagent'],
          ['tools', 'Tools the subagent can use (allowlist). Inherits all tools if omitted'],
          ['disallowedTools', 'Tools to deny, removed from inherited or specified list'],
          ['model', 'Model to use: sonnet, opus, haiku, full model ID, or inherit (default)'],
          ['permissionMode', 'Permission mode: default, acceptEdits, auto, dontAsk, bypassPermissions, or plan'],
          ['maxTurns', 'Maximum number of agentic turns before the subagent stops'],
          ['skills', 'Skills to inject into the subagent context at startup (full content, not just available)'],
          ['mcpServers', 'MCP servers available to this subagent (inline definitions or named references)'],
          ['hooks', 'Lifecycle hooks scoped to this subagent (PreToolUse, PostToolUse, Stop)'],
          ['memory', 'Persistent memory scope: user, project, or local — enables cross-session learning'],
          ['background', 'Set to true to always run as a background task (default: false)'],
          ['effort', 'Effort level: low, medium, high, max (Opus 4.6 only). Overrides session effort'],
          ['isolation', 'Set to worktree to run in a temporary git worktree — auto-cleaned if no changes'],
          ['color', 'Display color in the UI: red, blue, green, yellow, purple, orange, pink, or cyan'],
          ['initialPrompt', 'Auto-submitted as first user turn when agent runs as main session via --agent'],
        ],
      },

      { type: 'heading', text: 'Choose a Model' },
      {
        type: 'paragraph',
        text: 'The model field controls which AI model the subagent uses. Claude Code resolves the model in priority order: CLAUDE_CODE_SUBAGENT_MODEL env var → per-invocation model param → frontmatter model → main conversation model.',
      },
      {
        type: 'table',
        header: ['Value', 'Behavior'],
        rows: [
          ['sonnet', 'Alias for the latest Claude Sonnet — good balance of capability and speed'],
          ['opus', 'Alias for the latest Claude Opus — most capable, use for complex reasoning'],
          ['haiku', 'Alias for the latest Claude Haiku — fastest and cheapest, great for simple tasks'],
          ['claude-opus-4-6', 'Full model ID — pins to a specific model version'],
          ['inherit (default)', 'Uses the same model as the main conversation'],
        ],
      },

      { type: 'heading', text: 'Control Tools & Permissions' },
      {
        type: 'paragraph',
        text: 'Control what subagents can do through tool access (allowlist or denylist) and permission modes. If both tools and disallowedTools are set, disallowedTools is applied first, then tools is resolved against the remaining pool.',
      },
      {
        type: 'code',
        text: `# Allowlist: only these tools, nothing else
---
name: safe-researcher
tools: Read, Grep, Glob, Bash
---

# Denylist: everything except Write and Edit
---
name: no-writes
disallowedTools: Write, Edit
---

# Restrict which subagents this agent can spawn (when run as --agent)
---
name: coordinator
tools: Agent(worker, researcher), Read, Bash
---
# Agent without parentheses = can spawn any subagent
# Omitting Agent entirely = cannot spawn any subagents`,
      },
      {
        type: 'table',
        header: ['permissionMode', 'Behavior'],
        rows: [
          ['default', 'Standard permission checking with prompts for risky operations'],
          ['acceptEdits', 'Auto-accept file edits and common filesystem commands'],
          ['auto', 'Background classifier reviews commands; skips prompts for low-risk actions'],
          ['dontAsk', 'Auto-deny permission prompts (explicitly allowed tools still work)'],
          ['bypassPermissions', 'Skip all permission prompts — use with caution'],
          ['plan', 'Read-only exploration mode, no writes or shell commands'],
        ],
      },

      { type: 'heading', text: 'MCP Servers' },
      {
        type: 'paragraph',
        text: 'Use the mcpServers field to scope MCP servers to a specific subagent. Inline servers connect when the subagent starts and disconnect when it finishes. String references share the parent session\'s connection.',
      },
      {
        type: 'code',
        text: `---
name: browser-tester
description: Tests features in a real browser using Playwright
mcpServers:
  # Inline: connected only while this subagent runs
  - playwright:
      type: stdio
      command: npx
      args: ["-y", "@playwright/mcp@latest"]
  # Named reference: reuses an already-configured session server
  - github
---

Use the Playwright tools to navigate, screenshot, and interact with pages.`,
      },

      { type: 'heading', text: 'Preload Skills' },
      {
        type: 'paragraph',
        text: 'Use the skills field to inject skill content into a subagent\'s context at startup. The full content of each skill is injected — not just made available for invocation. Subagents don\'t inherit skills from the parent conversation; you must list them explicitly.',
      },
      {
        type: 'code',
        text: `---
name: api-developer
description: Implement API endpoints following team conventions
skills:
  - api-conventions
  - error-handling-patterns
---

Implement API endpoints. Follow the conventions and patterns from the preloaded skills.`,
      },

      { type: 'heading', text: 'Persistent Memory' },
      {
        type: 'paragraph',
        text: 'The memory field gives the subagent a persistent directory that survives across conversations. The subagent reads the first 200 lines or 25KB of MEMORY.md at startup and maintains it throughout the session.',
      },
      {
        type: 'table',
        header: ['Scope', 'Location · Use when'],
        rows: [
          ['user', '~/.claude/agent-memory/<name>/ · knowledge applies across all projects'],
          ['project', '.claude/agent-memory/<name>/ · knowledge is project-specific and shareable via git'],
          ['local', '.claude/agent-memory-local/<name>/ · project-specific but should not be committed'],
        ],
      },
      {
        type: 'code',
        text: `---
name: code-reviewer
description: Reviews code for quality and best practices
memory: user
---

You are a code reviewer. As you review code, update your agent memory with
patterns, conventions, and recurring issues you discover.

# Tip: ask the subagent to consult memory before starting
# "Review this PR, and check your memory for patterns you've seen before."

# Tip: ask it to update memory after tasks
# "Now that you're done, save what you learned to your memory."`,
      },

      { type: 'heading', text: 'Work with Subagents' },
      {
        type: 'paragraph',
        text: 'Claude automatically delegates tasks based on the description field in subagent configurations. To encourage proactive delegation, include phrases like "use proactively" in your subagent\'s description.',
      },
      {
        type: 'cards',
        items: [
          { title: 'Natural language', color: 'blue', body: 'Name the subagent in your prompt — "Use the test-runner subagent to fix failing tests". Claude typically delegates.' },
          { title: '@-mention', color: 'green', body: 'Type @ and pick the subagent from the typeahead. This guarantees that specific subagent runs for one task.' },
          { title: '--agent flag', color: 'purple', body: 'Run claude --agent code-reviewer to start the whole session using that subagent\'s system prompt, tools, and model.' },
          { title: 'agent setting', color: 'orange', body: 'Set "agent": "code-reviewer" in .claude/settings.json to make it the default for every session in a project.' },
        ],
      },

      { type: 'heading', text: 'Foreground vs Background' },
      {
        type: 'table',
        header: ['Mode', 'Behavior'],
        rows: [
          ['Foreground (default)', 'Blocks main conversation until complete. Permission prompts and AskUserQuestion pass through to you.'],
          ['Background', 'Runs concurrently while you continue working. Claude prompts for permissions upfront; auto-denies anything not pre-approved.'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Ask Claude to "run this in the background", or press Ctrl+B to background a running task. Set background: true in frontmatter to always run a subagent in background mode.',
      },

      { type: 'heading', text: 'Common Patterns' },
      {
        type: 'cards',
        items: [
          { title: 'Isolate high-volume ops', color: 'blue', body: 'Delegate test runs, log processing, or doc fetching. Verbose output stays in the subagent context; only the relevant summary returns.' },
          { title: 'Parallel research', color: 'green', body: '"Research the auth, database, and API modules in parallel using separate subagents." Each explores independently, then Claude synthesizes.' },
          { title: 'Chain subagents', color: 'purple', body: '"Use the code-reviewer to find issues, then the optimizer to fix them." Each completes and passes context to the next.' },
          { title: 'Resume subagents', color: 'orange', body: 'Ask Claude to continue previous work. Resumed subagents retain full conversation history — all tool calls, results, and reasoning.' },
        ],
      },
      {
        type: 'table',
        header: ['Use main conversation when…', 'Use subagents when…'],
        rows: [
          ['Task needs frequent back-and-forth', 'Task produces verbose output you won\'t need later'],
          ['Multiple phases share significant context', 'You want to enforce specific tool restrictions'],
          ['You\'re making a quick targeted change', 'The work is self-contained and can return a summary'],
          ['Latency matters (subagents start fresh)', 'Running multiple independent tasks in parallel'],
        ],
      },

      { type: 'heading', text: 'Example Subagents' },
      { type: 'heading', text: 'Debugger', level: 3 },
      {
        type: 'paragraph',
        text: 'A subagent that can both analyze and fix issues. Includes Edit because fixing bugs requires modifying code. The prompt provides a clear workflow from diagnosis to verification.',
      },
      {
        type: 'code',
        text: `---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.
tools: Read, Edit, Bash, Grep, Glob
---

You are an expert debugger specializing in root cause analysis.

When invoked:
1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Implement minimal fix
5. Verify solution works

For each issue provide:
- Root cause explanation with supporting evidence
- Specific code fix
- Testing approach and prevention recommendations`,
      },

      { type: 'heading', text: 'Data Scientist', level: 3 },
      {
        type: 'paragraph',
        text: 'A domain-specific subagent for data analysis. Shows how to create subagents for specialized workflows outside typical coding tasks. Sets model: sonnet for more capable analysis.',
      },
      {
        type: 'code',
        text: `---
name: data-scientist
description: Data analysis expert for SQL queries, BigQuery operations, and data insights. Use proactively for data analysis tasks.
tools: Bash, Read, Write
model: sonnet
---

You are a data scientist specializing in SQL and BigQuery analysis.

When invoked:
1. Understand the data analysis requirement
2. Write efficient SQL queries with proper filters and aggregations
3. Use BigQuery CLI tools (bq) when appropriate
4. Analyze, summarize, and present findings clearly

Always ensure queries are optimized and cost-effective.`,
      },

      { type: 'heading', text: 'Database Query Validator', level: 3 },
      {
        type: 'paragraph',
        text: 'Shows how to use PreToolUse hooks for conditional validation — finer control than the tools field alone. Allows Bash but validates every command to permit only read-only SQL queries.',
      },
      {
        type: 'code',
        text: `---
name: db-reader
description: Execute read-only database queries. Use when analyzing data or generating reports.
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---

You are a database analyst with read-only access. Execute SELECT queries to answer questions.
You cannot modify data. If asked to INSERT, UPDATE, or DELETE, explain you only have read access.`,
      },
      {
        type: 'code',
        text: `#!/bin/bash
# ./scripts/validate-readonly-query.sh  (make executable: chmod +x)
# Claude Code passes hook input as JSON via stdin

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then exit 0; fi

# Exit code 2 blocks the operation and sends error message to Claude
if echo "$COMMAND" | grep -iE '\\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|REPLACE|MERGE)\\b' > /dev/null; then
  echo "Blocked: Write operations not allowed. Use SELECT queries only." >&2
  exit 2
fi

exit 0`,
      },
    ],
  },

  // ── TEAMWORK ──────────────────────────────────────────────────────────────
  {
    id: 'teamwork',
    label: 'Teamwork',
    icon: '👥',
    description: 'Deploy and manage Claude Code configurations across large teams and organizations with centralized control.',
    content: [
      { type: 'heading', text: 'Team Management Overview' },
      {
        type: 'paragraph',
        text: 'For organizations deploying Claude Code across teams, you can centralize instructions, enforce security policies, and control which CLAUDE.md files are loaded using managed settings and organization-wide CLAUDE.md deployment.',
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Managed CLAUDE.md',
            color: 'blue',
            body: 'Behavioral guidance for Claude — coding standards, data handling reminders, compliance instructions. Cannot be excluded by individual users.',
          },
          {
            title: 'Managed Settings',
            color: 'red',
            body: 'Technical enforcement via settings.json — tool permissions, sandbox rules, env vars. Enforced by the client regardless of what Claude decides.',
          },
          {
            title: 'Project CLAUDE.md',
            color: 'green',
            body: 'Team-shared instructions via version control — architecture, coding standards, workflows. Use for team-level standards.',
          },
          {
            title: 'User CLAUDE.md',
            color: 'purple',
            body: 'Personal preferences at ~/.claude/CLAUDE.md — applies to all your projects but does not affect teammates.',
          },
        ],
      },

      { type: 'heading', text: 'Organization-wide CLAUDE.md' },
      {
        type: 'paragraph',
        text: 'Deploy a centrally managed CLAUDE.md that applies to all users on a machine. This file cannot be excluded by individual settings and is the highest-priority instruction source.',
      },
      {
        type: 'code',
        text: `# Managed policy locations (cannot be excluded by users)
macOS:   /Library/Application Support/ClaudeCode/CLAUDE.md
Linux:   /etc/claude-code/CLAUDE.md
Windows: C:\\Program Files\\ClaudeCode\\CLAUDE.md

# Deploy with your configuration management system:
# MDM, Group Policy, Ansible, Chef, Puppet, etc.

# Example managed CLAUDE.md content:
## Company Coding Standards
- Use 4-space indentation for all languages
- All public APIs must have documentation comments
- Never commit secrets or API keys to version control

## Compliance
- Do not process PII outside approved data regions
- Log all database schema changes for audit purposes`,
      },

      { type: 'heading', text: 'Managed Settings vs CLAUDE.md' },
      {
        type: 'paragraph',
        text: "Settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer.",
      },
      {
        type: 'table',
        header: ['Concern', 'Configure in'],
        rows: [
          ['Block specific tools, commands, or file paths', 'Managed settings: permissions.deny'],
          ['Enforce sandbox isolation', 'Managed settings: sandbox.enabled'],
          ['Environment variables and API routing', 'Managed settings: env'],
          ['Authentication method and org lock', 'Managed settings: forceLoginMethod'],
          ['Code style and quality guidelines', 'Managed CLAUDE.md'],
          ['Data handling and compliance reminders', 'Managed CLAUDE.md'],
          ['Behavioral instructions for Claude', 'Managed CLAUDE.md'],
        ],
      },

      { type: 'heading', text: 'Exclude CLAUDE.md Files' },
      {
        type: 'paragraph',
        text: "In large monorepos, ancestor CLAUDE.md files may contain instructions that aren't relevant to your work. The claudeMdExcludes setting lets you skip specific files by path or glob pattern.",
      },
      {
        type: 'code',
        text: `// .claude/settings.local.json — stays local to your machine
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/user/monorepo/other-team/.claude/rules/**"
  ]
}

// Patterns match absolute file paths using glob syntax
// Arrays merge across settings layers: user, project, local, managed policy
// NOTE: Managed policy CLAUDE.md files cannot be excluded`,
      },
    ],
  },

  // ── FILE DEMO ─────────────────────────────────────────────────────────────
  {
    id: 'filedemo',
    label: 'File Demo',
    icon: '📁',
    description: 'Explore an example .claude/ directory — click any file to preview its contents and understand its purpose.',
    content: [
      { type: 'filedemo' },
    ],
  },
]

// Exported for cross-tab search in HomePage
export const SECTION_SUMMARIES = SECTIONS.map(({ id, label, description }) => ({ id, label, description }))

// =============================================================================
// FILE DEMO COMPONENT — Interactive .claude/ directory explorer
// =============================================================================

type DemoFile = {
  kind: 'file'
  name: string
  label: string
  content: string
}
type DemoDir = {
  kind: 'dir'
  name: string
  children: (DemoFile | DemoDir)[]
}
type DemoNode = DemoFile | DemoDir

const DEMO_TREE: DemoDir = {
  kind: 'dir',
  name: '.claude',
  children: [
    {
      kind: 'file',
      name: 'CLAUDE.md',
      label: 'Main project instructions for Claude',
      content: `# Project Instructions

## Build Commands
- \`npm run dev\`       — Start development server
- \`npm run build\`    — Build for production
- \`npx tsc --noEmit\` — Type-check without emitting

## Coding Standards
- Use TypeScript strict mode
- Prefer \`const\` over \`let\`
- Use \`@/\` imports for src/ paths
- Tailwind CSS only — no inline styles

## Architecture
React 18 + TypeScript + Vite app.
Tab routing managed in App.tsx via TABS constant.
Content lives in each page's SECTIONS array, not in src/data/.`,
    },
    {
      kind: 'file',
      name: 'settings.json',
      label: 'Shared team settings (commit to version control)',
      content: `{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(npx tsc *)",
      "Bash(git log *)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)"
    ]
  }
}`,
    },
    {
      kind: 'file',
      name: 'settings.local.json',
      label: 'Your personal local settings (add to .gitignore)',
      content: `{
  "outputStyle": "Explanatory",
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": false
  },
  "autoMemoryEnabled": true
}`,
    },
    {
      kind: 'dir',
      name: 'rules',
      children: [
        {
          kind: 'file',
          name: 'code-style.md',
          label: 'Code formatting rules — always loaded',
          content: `# Code Style Rules

- Use 2-space indentation for TypeScript/JavaScript
- Prefer arrow functions over function declarations
- Always add TypeScript types to props and state
- Use Tailwind CSS classes — no inline styles
- Prefer named exports over default exports for utilities`,
        },
        {
          kind: 'file',
          name: 'testing.md',
          label: 'Testing conventions — always loaded',
          content: `# Testing Conventions

- Test files go in __tests__/ next to the source file
- Use Vitest for unit tests
- Integration tests must use a real database, not mocks
- Run tests before every commit: \`npm test\`
- Mock only at system boundaries (external APIs, third-party SDKs)`,
        },
        {
          kind: 'file',
          name: 'security.md',
          label: 'Security rules — loaded only for API/service files',
          content: `---
paths:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# Security Requirements

- Validate all user inputs at API boundaries
- Never log sensitive data (tokens, passwords, PII)
- Use parameterized queries — no string concatenation in SQL
- Return generic error messages to clients; log details server-side
- All endpoints require authentication unless explicitly public`,
        },
      ],
    },
    {
      kind: 'dir',
      name: 'agents',
      children: [
        {
          kind: 'file',
          name: 'reviewer.md',
          label: 'Custom code reviewer subagent',
          content: `---
name: reviewer
description: Reviews code changes for quality, security, and best practices. Use proactively after code changes.
model: sonnet
tools:
  - Read
  - Grep
  - Glob
---

You are a senior code reviewer. When reviewing code:

1. Check for security vulnerabilities (XSS, injection, etc.)
2. Verify TypeScript types are correct and complete
3. Suggest performance improvements where material
4. Confirm coding standards are followed

Return a structured review:
- **Summary**: Overall assessment (1-2 sentences)
- **Issues Found**: Numbered list with severity (High/Med/Low)
- **Suggestions**: Optional improvements that are not blockers`,
        },
      ],
    },
    {
      kind: 'dir',
      name: 'skills',
      children: [
        {
          kind: 'dir',
          name: 'explain-code',
          children: [
            {
              kind: 'file',
              name: 'SKILL.md',
              label: 'Code explanation skill — auto-invoked by Claude',
              content: `---
name: explain-code
description: Explains code with analogies and diagrams. Use when explaining how code works, teaching about a codebase, or when the user asks "how does this work?"
---

When explaining code, always include:

1. **Start with an analogy** — compare to something from everyday life
2. **Draw a diagram** — use ASCII art to show flow or structure
3. **Walk through the code** — explain step-by-step what happens
4. **Highlight a gotcha** — common mistake or misconception

Keep explanations conversational. For complex concepts, use multiple analogies.`,
            },
          ],
        },
        {
          kind: 'file',
          name: 'deploy.md',
          label: 'Deployment skill — user-invoked only',
          content: `---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
---

Deploy the application:

1. Run \`npm test\` — confirm all tests pass (abort if any fail)
2. Run \`npm run build\` — build for production
3. Check the /dist output for expected files
4. Push to deployment target: \`git push heroku main\`
5. Verify at https://your-app.herokuapp.com/health`,
        },
      ],
    },
  ],
}

function FileDemoBlock(): ReactNode {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(['.claude', '.claude/rules', '.claude/agents', '.claude/skills', '.claude/skills/explain-code']),
  )
  const [selected, setSelected] = useState<DemoFile | null>(null)

  function toggleDir(path: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  function renderNode(node: DemoNode, parentPath: string, depth: number): ReactNode {
    const path = parentPath ? `${parentPath}/${node.name}` : node.name

    if (node.kind === 'dir') {
      const isOpen = expanded.has(path)
      return (
        <div key={path}>
          <button
            onClick={() => toggleDir(path)}
            className="w-full flex items-center gap-1.5 py-1 rounded hover:bg-gray-700 text-left text-sm transition-colors"
            style={{ paddingLeft: `${8 + depth * 16}px`, paddingRight: '8px' }}
          >
            <span className="text-gray-400 text-xs w-3 shrink-0">{isOpen ? '▾' : '▸'}</span>
            <span className="text-yellow-400 text-sm shrink-0">📁</span>
            <span className="font-medium text-gray-300">{node.name}/</span>
          </button>
          {isOpen && node.children.map(child => renderNode(child, path, depth + 1))}
        </div>
      )
    }

    const isSelected = selected === node
    const icon = node.name.endsWith('.json') ? '⚙️' : node.name.endsWith('.sh') ? '🔧' : '📄'
    return (
      <button
        key={path}
        onClick={() => setSelected(node)}
        className={`w-full flex items-center gap-1.5 py-1 rounded text-left text-sm transition-colors ${
          isSelected ? 'bg-orange-900/40 text-orange-300' : 'hover:bg-gray-700 text-gray-400'
        }`}
        style={{ paddingLeft: `${8 + depth * 16}px`, paddingRight: '8px' }}
      >
        <span className="w-3 shrink-0" />
        <span className="shrink-0">{icon}</span>
        <span className={isSelected ? 'font-medium text-orange-300' : ''}>{node.name}</span>
      </button>
    )
  }

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden shadow-lg">
      {/* Window chrome */}
      <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2 border-b border-gray-700">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 font-mono text-xs text-gray-400">your-project/.claude/</span>
      </div>

      {/* Body */}
      <div className="flex" style={{ minHeight: '22rem' }}>
        {/* File tree */}
        <div className="w-52 border-r border-gray-700 bg-gray-900 py-2 shrink-0 overflow-y-auto">
          <p className="px-3 py-1 text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Explorer</p>
          {renderNode(DEMO_TREE, '', 0)}
        </div>

        {/* Preview pane */}
        <div className="flex-1 bg-gray-950 overflow-auto flex flex-col">
          {selected ? (
            <>
              <div className="px-4 py-2 border-b border-gray-800 bg-gray-900 flex items-center gap-3 shrink-0">
                <span className="font-mono text-sm text-gray-200">{selected.name}</span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{selected.label}</span>
              </div>
              <pre className="flex-1 p-4 text-xs font-mono text-green-300 overflow-auto leading-relaxed whitespace-pre-wrap">
                {selected.content}
              </pre>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col gap-3 text-gray-600">
              <span className="text-4xl">📄</span>
              <p className="text-sm">Select a file to preview its contents</p>
              <p className="text-xs text-gray-700">Click any file in the explorer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

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
    case 'heading': {
      const id = slugify(block.text)
      return block.level === 3
        ? (
          <h4 key={index} id={id} className="text-base font-bold text-gray-800 mt-2 scroll-mt-4">
            {block.text}
          </h4>
        )
        : (
          <h3 key={index} id={id} className="text-lg font-bold text-gray-900 mt-2 border-b border-gray-100 pb-1 scroll-mt-4">
            {block.text}
          </h3>
        )
    }

    case 'filedemo':
      return <FileDemoBlock key={index} />

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
  const [activeSectionId, setActiveSectionId] = useState<string>('claude')
  const active = SECTIONS.find(s => s.id === activeSectionId) ?? SECTIONS[0]

  // Auto-generate TOC from heading blocks in the active section
  const tocItems = active.content.filter(
    (b): b is { type: 'heading'; text: string; level?: 2 | 3 } => b.type === 'heading',
  )

  function scrollTo(text: string) {
    document.getElementById(slugify(text))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="bg-gradient-to-br from-orange-400 to-rose-500 text-white p-3 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" fillOpacity="0.2"/>
              <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">.claude/ Reference</h2>
            <p className="text-gray-500 text-sm">Instructions · Skills · Rules · Agents · Team config</p>
          </div>
        </div>

        {/* Section quick-links */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSectionId(s.id)}
              className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
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

      {/* Two-column layout: sidebar TOC + content */}
      <div className="flex gap-4 items-start">

        {/* Sidebar TOC (desktop only) */}
        {tocItems.length > 0 && (
          <aside className="hidden md:block w-48 shrink-0 sticky top-4">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">On this page</p>
              <nav className="space-y-0.5">
                {tocItems.map((item) => (
                  <button
                    key={item.text}
                    onClick={() => scrollTo(item.text)}
                    className={`w-full text-left rounded-lg text-xs transition-colors hover:bg-orange-50 hover:text-orange-700 text-gray-600 leading-snug py-1.5 ${
                      item.level === 3 ? 'pl-5 pr-2 text-gray-500' : 'px-2'
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Section content */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-lg p-6 space-y-5">
          {/* Section header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{active.icon}</span>
              <h3 className="text-xl font-bold text-gray-900">{active.label}</h3>
            </div>
            <p className="text-gray-500 text-sm">{active.description}</p>
          </div>

          <hr className="border-gray-100" />

          {/* Mobile TOC (pill chips) */}
          {tocItems.length > 0 && (
            <div className="md:hidden bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">On this page</p>
              <div className="flex flex-wrap gap-1.5">
                {tocItems.map((item) => (
                  <button
                    key={item.text}
                    onClick={() => scrollTo(item.text)}
                    className="text-xs px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-700 transition-colors"
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content blocks */}
          {active.content.map((block, i) => renderBlock(block, i))}
        </div>
      </div>
    </div>
  )
}
