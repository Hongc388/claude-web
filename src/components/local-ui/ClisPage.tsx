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
      {
        type: 'paragraph',
        text: 'Start sessions, pipe content, resume conversations, and manage updates with these top-level CLI commands:',
      },
      {
        type: 'table',
        header: ['Command', 'Description — Example'],
        rows: [
          ['claude', 'Start interactive session — claude'],
          ['claude "query"', 'Start session with initial prompt — claude "explain this project"'],
          ['claude -p "query"', 'Run query non-interactively and exit — claude -p "explain this function"'],
          ['cat file | claude -p "query"', 'Process piped content — cat logs.txt | claude -p "explain"'],
          ['claude -c', 'Continue most recent conversation in current directory — claude -c'],
          ['claude -c -p "query"', 'Continue most recent conversation non-interactively — claude -c -p "Check for type errors"'],
          ['claude -r "<session>" "query"', 'Resume session by ID or name — claude -r "auth-refactor" "Finish this PR"'],
          ['claude update', 'Update Claude Code to the latest version'],
          ['claude auth login', 'Sign in to your Anthropic account; use --console for API key billing — claude auth login --console'],
          ['claude auth logout', 'Log out from your Anthropic account'],
          ['claude auth status', 'Show authentication status as JSON; use --text for human-readable output'],
          ['claude agents', 'List all configured subagents grouped by source'],
          ['claude auto-mode defaults', 'Print built-in auto mode classifier rules as JSON — claude auto-mode defaults > rules.json'],
          ['claude mcp', 'Configure Model Context Protocol (MCP) servers'],
          ['claude plugin', 'Manage Claude Code plugins (alias: claude plugins) — claude plugin install code-review@claude-plugins-official'],
          ['claude remote-control', 'Start a Remote Control server — claude remote-control --name "My Project"'],
          ['claude setup-token', 'Generate a long-lived OAuth token for CI and scripts'],
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
          ['?', 'Show a list of available slash commands and their descriptions (alias: /help)'],
          ['/add-dir <path>', 'Add a working directory for file access during the current session'],
          ['/agents', 'Manage agent configurations'],
          ['/autofix-pr [prompt]', 'Spawn a session that watches the current branch\'s PR and pushes fixes when CI fails or reviewers comment'],
          ['/batch <instruction>', 'Orchestrate large-scale changes across a codebase in parallel using background agents in isolated worktrees'],
          ['/branch [name]', 'Create a branch of the current conversation at this point (alias: /fork)'],
          ['/btw <question>', 'Ask a quick side question without adding it to the main conversation context'],
          ['/chrome', 'Configure Claude in Chrome settings'],
          ['/clear', 'Clear conversation history and free up context (aliases: /reset, /new)'],
          ['/claude-api', 'Load Claude API reference material for your project\'s language (Python, TS, Go, etc.)'],
          ['/color [color|default]', 'Set the prompt bar color for the current session (red, blue, green, yellow, purple, orange, pink, cyan)'],
          ['/commit', 'Auto-generate a conventional commit message and commit staged files'],
          ['/compact [instructions]', 'Compact conversation with optional focus instructions to reduce context size'],
          ['/config', 'Open the Settings interface to adjust theme, model, output style, and preferences (alias: /settings)'],
          ['/context', 'Visualize current context usage as a colored grid with optimization suggestions'],
          ['/copy [N]', 'Copy the last assistant response to clipboard; pass N to copy the Nth-latest response'],
          ['/cost', 'Show token usage statistics for the current session'],
          ['/debug [description]', 'Enable debug logging and optionally describe the issue to focus the analysis'],
          ['/desktop', 'Continue the current session in the Claude Code Desktop app — macOS and Windows only (alias: /app)'],
          ['/diff', 'Open an interactive diff viewer showing uncommitted changes and per-turn diffs'],
          ['/doctor', 'Diagnose and verify your Claude Code installation and settings; press f to auto-fix reported issues'],
          ['/effort [low|medium|high|max|auto]', 'Set the model effort level; max applies to the current session only and requires Opus 4.6'],
          ['/exit', 'Exit the CLI (alias: /quit)'],
          ['/export [filename]', 'Export the current conversation as plain text to clipboard or a file'],
          ['/extra-usage', 'Configure extra usage to keep working when rate limits are hit'],
          ['/fast [on|off]', 'Toggle fast mode on or off'],
          ['/feedback [report]', 'Submit feedback about Claude Code (alias: /bug)'],
          ['/help', 'Show help and all available commands'],
          ['/hooks', 'View hook configurations for tool events'],
          ['/ide', 'Manage IDE integrations and show connection status'],
          ['/init', 'Initialize project with a CLAUDE.md guide; set CLAUDE_CODE_NEW_INIT=1 for an interactive setup flow'],
          ['/insights', 'Generate a report analyzing your Claude Code sessions, interaction patterns, and friction points'],
          ['/install-github-app', 'Set up the Claude GitHub Actions app for a repository'],
          ['/install-slack-app', 'Install the Claude Slack app via OAuth flow in the browser'],
          ['/keybindings', 'Open or create your keybindings configuration file'],
          ['/login', 'Sign in to your Anthropic account'],
          ['/logout', 'Sign out from your Anthropic account'],
          ['/loop [interval] [prompt]', 'Run a prompt repeatedly; Claude self-paces if no interval given (alias: /proactive)'],
          ['/mcp', 'Manage MCP server connections and OAuth authentication'],
          ['/memory', 'Edit CLAUDE.md memory files, enable or disable auto-memory, and view auto-memory entries'],
          ['/mobile', 'Show QR code to download the Claude mobile app (aliases: /ios, /android)'],
          ['/model [model]', 'Select or change the AI model; use arrow keys to adjust effort level for supported models'],
          ['/passes', 'Share a free week of Claude Code with friends (only visible if your account is eligible)'],
          ['/permissions', 'Manage allow, ask, and deny rules for tool permissions (alias: /allowed-tools)'],
          ['/plan [description]', 'Enter plan mode; pass a description to immediately start planning that task'],
          ['/plugin', 'Manage Claude Code plugins'],
          ['/powerup', 'Discover Claude Code features through quick interactive lessons with animated demos'],
          ['/privacy-settings', 'View and update your privacy settings (Pro and Max plan only)'],
          ['/release-notes', 'View the changelog in an interactive version picker'],
          ['/reload-plugins', 'Reload all active plugins to apply pending changes without restarting'],
          ['/remote-control', 'Make this session available for remote control from claude.ai (alias: /rc)'],
          ['/remote-env', 'Configure the default remote environment for web sessions started with --remote'],
          ['/rename [name]', 'Rename the current session; auto-generates a name from history if none is passed'],
          ['/resume [session]', 'Resume a conversation by ID or name, or open the session picker (alias: /continue)'],
          ['/review-pr <number>', 'Pull and review a GitHub pull request by number'],
          ['/rewind', 'Rewind the conversation and/or code to a previous point (alias: /checkpoint)'],
          ['/sandbox', 'Toggle sandbox mode (available on supported platforms only)'],
          ['/schedule [description]', 'Create, update, list, or run Cloud scheduled tasks conversationally'],
          ['/security-review', 'Analyze pending changes on the current branch for security vulnerabilities'],
          ['/setup-bedrock', 'Configure Amazon Bedrock authentication, region, and model pins (requires CLAUDE_CODE_USE_BEDROCK=1)'],
          ['/setup-vertex', 'Configure Google Vertex AI authentication, project, and region (requires CLAUDE_CODE_USE_VERTEX=1)'],
          ['/simplify [focus]', 'Review recently changed code for quality and efficiency via parallel agents, then apply fixes'],
          ['/skills', 'List available skills'],
          ['/stats', 'Visualize daily usage, session history, streaks, and model preferences'],
          ['/status', 'Open the Settings interface (Status tab) showing version, model, account, and connectivity'],
          ['/statusline', 'Configure Claude Code\'s status line; describe what you want or run without args to auto-configure'],
          ['/stickers', 'Order Claude Code stickers'],
          ['/tasks', 'List and manage background tasks (alias: /bashes)'],
          ['/team-onboarding', 'Generate a team onboarding guide from your Claude Code usage history over the past 30 days'],
          ['/teleport', 'Pull a Claude Code on the web session into this terminal (alias: /tp)'],
          ['/terminal-setup', 'Configure terminal keybindings for Shift+Enter and other shortcuts'],
          ['/theme', 'Change the color theme including light, dark, colorblind-accessible, and ANSI variants'],
          ['/ultraplan <prompt>', 'Draft a plan in an ultraplan session, review it in your browser, then execute remotely or locally'],
          ['/upgrade', 'Open the upgrade page to switch to a higher plan tier'],
          ['/usage', 'Show plan usage limits and rate limit status'],
          ['/voice', 'Toggle push-to-talk voice dictation (requires a Claude.ai account)'],
          ['/web-setup', 'Connect your GitHub account to Claude Code on the web using your local gh CLI credentials'],
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
claude                                      # Interactive session
claude "explain this project"               # Start with initial prompt
claude -p "Fix the auth bug"                # Non-interactive, then exit
cat logs.txt | claude -p "explain"          # Process piped content
claude -c                                   # Continue last conversation
claude -r "auth-refactor" "Finish the PR"   # Resume named session
claude --model claude-sonnet-4-6            # Specific model
claude --permission-mode plan               # Start in plan mode
claude -w feature-auth                      # Isolated git worktree
claude --bare -p "query"                    # Minimal mode, no hooks`,
      },
      {
        type: 'paragraph',
        text: 'Note: claude --help does not list every flag — a flag\'s absence from --help does not mean it is unavailable.',
      },
      {
        type: 'table',
        header: ['Flag', 'Description'],
        rows: [
          ['--add-dir', 'Add extra working directories for file access — claude --add-dir ../apps ../lib'],
          ['--agent', 'Specify an agent for the current session — claude --agent my-custom-agent'],
          ['--agents', 'Define custom subagents dynamically via JSON with description and prompt fields'],
          ['--allow-dangerously-skip-permissions', 'Add bypassPermissions to the Shift+Tab mode cycle without starting in it'],
          ['--allowedTools', 'Tools that run without permission prompts — "Bash(git log *)" "Read"'],
          ['--append-system-prompt', 'Append custom text to the end of the default system prompt'],
          ['--append-system-prompt-file', 'Load additional system prompt text from a file and append it'],
          ['--bare', 'Minimal mode: skip hooks, skills, plugins, MCP, and CLAUDE.md for faster scripted calls'],
          ['--betas', 'Beta headers to include in API requests (API key users only)'],
          ['--channels', '(Research preview) MCP servers whose channel notifications Claude should listen for'],
          ['--chrome', 'Enable Chrome browser integration for web automation and testing'],
          ['--continue, -c', 'Load the most recent conversation in the current directory'],
          ['--dangerously-skip-permissions', 'Skip all permission prompts — equivalent to bypassPermissions mode'],
          ['--debug', 'Enable debug mode with optional category filter — claude --debug "api,mcp"'],
          ['--debug-file <path>', 'Write debug logs to a specific file path; implicitly enables debug mode'],
          ['--disable-slash-commands', 'Disable all skills and commands for this session'],
          ['--disallowedTools', 'Tools removed from model context; cannot be used in this session'],
          ['--effort', 'Set effort level: low, medium, high, max (Opus 4.6 only) — claude --effort high'],
          ['--exclude-dynamic-system-prompt-sections', 'Move per-machine sections to the first user message to improve prompt-cache reuse'],
          ['--fallback-model', 'Fallback model when default is overloaded (print mode only)'],
          ['--fork-session', 'Create a new session ID when resuming instead of reusing the original'],
          ['--from-pr', 'Resume sessions linked to a specific GitHub PR number or URL — claude --from-pr 123'],
          ['--ide', 'Auto-connect to IDE on startup if exactly one valid IDE is available'],
          ['--init', 'Run initialization hooks and start interactive mode'],
          ['--init-only', 'Run initialization hooks and exit without starting an interactive session'],
          ['--include-hook-events', 'Include hook lifecycle events in output stream (requires --output-format stream-json)'],
          ['--include-partial-messages', 'Include partial streaming events (requires -p and stream-json)'],
          ['--input-format', 'Input format for print mode: text or stream-json'],
          ['--json-schema', 'Return validated JSON output matching a JSON Schema after the agent completes (print mode only)'],
          ['--maintenance', 'Run maintenance hooks and start interactive mode'],
          ['--max-budget-usd', 'Max dollar amount to spend on API calls before stopping (print mode only)'],
          ['--max-turns', 'Limit agentic turns in print mode; exits with error when reached (no limit by default)'],
          ['--mcp-config', 'Load MCP servers from JSON files or strings — claude --mcp-config ./mcp.json'],
          ['--model', 'Set model by alias (sonnet, opus) or full ID — claude --model claude-sonnet-4-6'],
          ['--name, -n', 'Set a display name for the session — claude -n "my-feature-work"'],
          ['--no-chrome', 'Disable Chrome browser integration for this session'],
          ['--no-session-persistence', 'Disable session saving to disk so it cannot be resumed (print mode only)'],
          ['--output-format', 'Output format for print mode: text, json, or stream-json'],
          ['--enable-auto-mode', 'Unlock auto mode in the Shift+Tab cycle (Team/Enterprise/API plan, Sonnet/Opus 4.6 only)'],
          ['--permission-mode', 'Begin in a specified permission mode: default, acceptEdits, plan, auto, or bypassPermissions'],
          ['--permission-prompt-tool', 'MCP tool to handle permission prompts in non-interactive mode'],
          ['--plugin-dir', 'Load plugins from a directory for this session only; repeat the flag for multiple dirs'],
          ['--print, -p', 'Run non-interactively and print the response without opening interactive mode'],
          ['--remote', 'Create a new web session on claude.ai with the provided task description'],
          ['--remote-control, --rc', 'Start an interactive session with Remote Control enabled from claude.ai or the Claude app'],
          ['--remote-control-session-name-prefix', 'Prefix for auto-generated Remote Control session names (defaults to machine hostname)'],
          ['--replay-user-messages', 'Re-emit user messages from stdin back on stdout (requires stream-json input and output)'],
          ['--resume, -r', 'Resume a specific session by ID or name, or show an interactive picker'],
          ['--session-id', 'Use a specific session ID for the conversation (must be a valid UUID)'],
          ['--setting-sources', 'Comma-separated setting sources to load: user, project, local'],
          ['--settings', 'Path to a settings JSON file or JSON string for additional settings'],
          ['--strict-mcp-config', 'Only use MCP servers from --mcp-config, ignoring all other MCP configurations'],
          ['--system-prompt', 'Replace the entire system prompt with custom text'],
          ['--system-prompt-file', 'Load system prompt from a file, replacing the default prompt'],
          ['--teleport', 'Resume a web session in your local terminal'],
          ['--teammate-mode', 'Set how agent team teammates display: auto (default), in-process, or tmux'],
          ['--tmux', 'Create a tmux session for the worktree (requires --worktree); pass --tmux=classic for traditional tmux'],
          ['--tools', 'Restrict which built-in tools Claude can use — claude --tools "Bash,Edit,Read"'],
          ['--verbose', 'Enable verbose logging; shows full turn-by-turn output'],
          ['--version, -v', 'Output the version number'],
          ['--worktree, -w', 'Start Claude in an isolated git worktree — claude -w feature-auth'],
        ],
      },
      {
        type: 'paragraph',
        text: 'System prompt flags — four flags for customizing the system prompt, all work in both interactive and non-interactive modes. --system-prompt and --system-prompt-file are mutually exclusive; append flags can combine with either. For most use cases, prefer an append flag to preserve built-in capabilities.',
      },
      {
        type: 'table',
        header: ['Flag', 'Behavior'],
        rows: [
          ['--system-prompt', 'Replaces the entire default system prompt — claude --system-prompt "You are a Python expert"'],
          ['--system-prompt-file', 'Replaces default prompt with file contents — claude --system-prompt-file ./prompts/review.txt'],
          ['--append-system-prompt', 'Appends to the default prompt — claude --append-system-prompt "Always use TypeScript"'],
          ['--append-system-prompt-file', 'Appends file contents to the default prompt — claude --append-system-prompt-file ./style-rules.txt'],
        ],
      },
    ],
  },

  // ── HOOKS REFERENCE ──────────────────────────────────────────────────────────
  {
    id: 'hooks',
    label: 'Hooks Reference',
    icon: '🪝',
    description: 'Shell commands that execute automatically on Claude Code lifecycle events.',
    content: [
      {
        type: 'paragraph',
        text: 'Hooks are shell commands defined in .claude/settings.json that run automatically when Claude Code events fire. They let you enforce standards, trigger side effects, or block actions — without relying on Claude\'s judgment.',
      },
      {
        type: 'table',
        header: ['Hook Event', 'When It Fires'],
        rows: [
          ['PreToolUse', 'Before any tool call executes — can block it by exiting non-zero'],
          ['PostToolUse', 'After a tool call completes — receives the tool result'],
          ['Notification', 'When Claude Code emits a user-facing notification'],
          ['Stop', 'When the main agent finishes its turn'],
          ['SubagentStop', 'When a subagent finishes its turn'],
        ],
      },
      {
        type: 'code',
        text: `# .claude/settings.json — hook configuration
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "echo '[Hook] Bash tool called' >> ~/.claude/bash-audit.log"
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "npx prettier --write $CLAUDE_TOOL_INPUT_FILE_PATH 2>/dev/null || true"
        }]
      }
    ],
    "Stop": [
      {
        "hooks": [{
          "type": "command",
          "command": "osascript -e 'display notification \"Claude finished\" with title \"Claude Code\"'"
        }]
      }
    ]
  }
}`,
      },
      {
        type: 'cards',
        items: [
          {
            title: 'matcher field',
            color: 'blue',
            body: 'A regex matched against the tool name. "Bash" matches only Bash; "Edit|Write" matches either. Omit matcher to fire on every tool call.',
          },
          {
            title: 'Exit code controls blocking',
            color: 'red',
            body: 'For PreToolUse, exiting with a non-zero code blocks the tool from running. Use this to enforce allow/deny rules beyond the built-in permissions system.',
          },
          {
            title: 'Environment variables',
            color: 'green',
            body: 'Hooks receive context via env vars: CLAUDE_TOOL_NAME, CLAUDE_TOOL_INPUT_FILE_PATH, CLAUDE_SESSION_ID, and others depending on the event.',
          },
          {
            title: '/hooks slash command',
            color: 'purple',
            body: 'Run /hooks inside a session to view all active hook configurations, their matchers, and which events they are registered for.',
          },
        ],
      },
    ],
  },

  // ── TOOLS REFERENCE ──────────────────────────────────────────────────────────
  {
    id: 'tools',
    label: 'Tools Reference',
    icon: '🔧',
    description: 'Built-in tools Claude Code can call during a session, and how to control access to them.',
    content: [
      {
        type: 'paragraph',
        text: 'Claude Code has a set of built-in tools it can call to read files, run commands, search code, and browse the web. You can restrict, allow, or block specific tools using flags or settings.',
      },
      {
        type: 'table',
        header: ['Tool', 'What It Does'],
        rows: [
          ['Bash', 'Execute shell commands in the project directory'],
          ['Read', 'Read file contents — supports text, images, PDFs, and Jupyter notebooks'],
          ['Write', 'Create or overwrite a file with new content'],
          ['Edit', 'Make targeted string replacements in an existing file (diff-based)'],
          ['Glob', 'Find files by glob pattern, sorted by modification time'],
          ['Grep', 'Search file contents with ripgrep regex patterns'],
          ['Agent', 'Spawn a subagent to handle a subtask; optionally in an isolated worktree'],
          ['WebFetch', 'Fetch and read a URL (HTML, JSON, plain text)'],
          ['WebSearch', 'Search the web and return a summary of results'],
          ['NotebookEdit', 'Edit cells in a Jupyter notebook (.ipynb)'],
          ['mcp__<server>__<tool>', 'Any tool exposed by a registered MCP server'],
        ],
      },
      {
        type: 'code',
        text: `# Restrict tools via CLI flags
claude --tools "Bash,Edit,Read"          # Only these tools available
claude --tools ""                         # Disable all tools
claude --tools "default"                  # All tools (explicit default)

# Allow specific patterns without prompting (settings.json)
{
  "permissions": {
    "allow": [
      "Bash(git log *)",
      "Bash(git diff *)",
      "Read"
    ],
    "deny": [
      "Bash(rm *)",
      "Bash(curl *)"
    ]
  }
}`,
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Permission modes',
            color: 'blue',
            body: 'default — prompts for risky tools. acceptEdits — auto-approves file edits. plan — read-only, no writes. bypassPermissions — skips all prompts (use carefully).',
          },
          {
            title: '--allowedTools vs --tools',
            color: 'green',
            body: '--tools restricts which tools exist in the session. --allowedTools controls which of those run without a permission prompt. They serve different purposes.',
          },
          {
            title: 'Permission rule syntax',
            color: 'purple',
            body: 'Rules support glob-style patterns: "Bash(git *)" matches any git command. "Read" matches any Read call. Deny rules take precedence over allow rules.',
          },
          {
            title: '/permissions command',
            color: 'orange',
            body: 'Run /permissions inside a session to view, add, or remove allow/deny rules interactively without editing settings.json by hand.',
          },
        ],
      },
    ],
  },

  // ── INTERACTIVE MODE ─────────────────────────────────────────────────────────
  {
    id: 'interactive',
    label: 'Interactive Mode',
    icon: '⌨️',
    description: 'Keyboard shortcuts, input modes, and session features for interactive Claude Code sessions.',
    content: [
      {
        type: 'paragraph',
        text: 'Interactive mode is the default when you run claude without -p. It keeps a live session open where you type prompts, Claude responds, and conversation history accumulates. Several keyboard shortcuts and modes change how you interact.',
      },
      {
        type: 'table',
        header: ['Shortcut', 'Action'],
        rows: [
          ['Enter', 'Submit the current prompt'],
          ['Shift+Enter', 'Insert a newline without submitting (configure with /terminal-setup)'],
          ['Ctrl+C', 'Cancel the current in-progress response'],
          ['Ctrl+C (at empty prompt)', 'Exit the session'],
          ['Ctrl+L', 'Clear the terminal screen (conversation history preserved)'],
          ['Up / Down arrows', 'Navigate prompt history'],
          ['Tab', 'Autocomplete slash commands'],
          ['Shift+Tab', 'Cycle through permission modes: default → acceptEdits → plan → bypassPermissions'],
          ['Esc', 'Cancel a multi-line edit or dismiss a dialog'],
        ],
      },
      {
        type: 'table',
        header: ['Permission Mode', 'Behaviour'],
        rows: [
          ['default', 'Prompts before risky tool calls (file writes, shell commands)'],
          ['acceptEdits', 'Auto-approves all file edits without prompting; still prompts for Bash'],
          ['plan', 'Read-only — Claude can read and search but cannot write files or run commands'],
          ['auto', 'Classifier decides automatically; skips prompts for low-risk actions (Team/Enterprise/API plans only)'],
          ['bypassPermissions', 'Skips all permission prompts — use only in trusted, sandboxed environments'],
        ],
      },
      {
        type: 'cards',
        items: [
          {
            title: 'Vim editing mode',
            color: 'blue',
            body: 'Enable Vim keybindings for the prompt input via /config → Editor mode. Normal, Insert, and Visual modes work as expected. Esc enters Normal mode.',
          },
          {
            title: 'Multi-line input',
            color: 'green',
            body: 'Use Shift+Enter to write multi-line prompts or paste code blocks before submitting. Run /terminal-setup if Shift+Enter doesn\'t work in your terminal.',
          },
          {
            title: 'Context tracking',
            color: 'purple',
            body: 'Run /context to see a visual grid of context usage. When context fills up, use /compact to summarise the conversation and reclaim space without starting over.',
          },
          {
            title: 'Session persistence',
            color: 'orange',
            body: 'Sessions are saved automatically and can be resumed with claude -c (most recent) or claude -r "<name>" (by name). Name a session with /rename or -n flag.',
          },
        ],
      },
    ],
  },
]

// Exported for cross-tab search in HomePage
export const SECTION_SUMMARIES = SECTIONS.map(({ id, label, description }) => ({ id, label, description }))

// Exported so the search index can match individual slash commands by name and purpose
export const SLASH_COMMANDS: [string, string][] =
  (SECTIONS.find(s => s.id === 'slash')
    ?.content.find((b): b is Extract<ContentBlock, { type: 'table' }> => b.type === 'table')
    ?.rows ?? []) as [string, string][]

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
