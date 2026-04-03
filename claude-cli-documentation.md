# Claude Code CLI - Comprehensive Documentation Report

**Generated:** April 1, 2026
**Version:** Claude Sonnet 4.6
**Report Type:** Technical Documentation

---

## Table of Contents
1. [Overview](#overview)
2. [Installation & Setup](#installation--setup)
3. [Core Slash Commands](#core-slash-commands)
4. [Custom Skills & Plugins](#custom-skills--plugins)
5. [Command-Line Options](#command-line-options)
6. [Keyboard Shortcuts](#keyboard-shortcuts)
7. [Configuration System](#configuration-system)
8. [Agent System](#agent-system)
9. [Git Integration](#git-integration)
10. [Security Features](#security-features)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

---

## Overview

Claude Code CLI is Anthropic's official command-line interface for Claude, providing developers with AI-powered assistance directly in their terminal. It supports multiple interfaces including terminal, desktop app, web app, and IDE extensions.

### Key Capabilities
- **Code Generation & Refactoring** - Write, modify, and improve code
- **File Operations** - Read, write, and manage files
- **Git Integration** - Version control operations
- **Multi-Agent System** - Specialized agents for specific tasks
- **Extensible Architecture** - Custom skills and plugins
- **Security Controls** - Sandboxed execution and permission management

---

## Installation & Setup

### Installation Methods

#### Global Installation (Recommended)
```bash
npm install -g @anthropic-ai/claude-code
```

#### Project-Specific Installation
```bash
npm install --save-dev @anthropic-ai/claude-code
```

### Initialization

#### Initialize New Project
```bash
claude init
```
This creates:
- `.claude/` directory for project-specific configuration
- `CLAUDE.md` file for codebase documentation
- Default `settings.json` configuration

#### Start Interactive Session
```bash
claude
```

### Authentication
Claude Code uses the Anthropic API. Configure your authentication token:

**Via Environment Variable:**
```bash
export ANTHROPIC_AUTH_TOKEN="your-token-here"
```

**Via Configuration File:**
```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your-token-here"
  }
}
```

---

## Core Slash Commands

### Navigation & Control

#### `/help`
Display help information and available commands.

```bash
/help
```

**Usage:** Show comprehensive help with all available commands and their descriptions.

---

#### `/clear`
Clear the current conversation history.

```bash
/clear
```

**Usage:** Start fresh without losing session context. Useful when you want to begin a new task.

---

#### `/exit`
Exit Claude Code CLI.

```bash
/exit
```

**Usage:** Safely terminate the session and save any pending work.

---

### Development Workflow

#### `/commit`
Create a git commit with an auto-generated message.

```bash
/commit
```

**Features:**
- Stages relevant files automatically
- Generates descriptive commit messages
- Follows git commit conventions
- Includes co-author attribution

**Best Practices:**
- Use after completing a logical unit of work
- Review staged files before committing
- Claude will ask for confirmation if needed

---

#### `/init`
Initialize a new CLAUDE.md file with codebase documentation.

```bash
/init
```

**Creates:**
- `CLAUDE.md` with project structure
- Documentation of main components
- Setup instructions
- Development guidelines

---

### Git Operations

#### Branch Management
```bash
# Create and switch branches
git checkout -b feature-branch

# Switch existing branch
git checkout main

# List branches
git branch -a
```

#### Remote Operations
```bash
# Add remote
git remote add origin <url>

# Push branches
git push -u origin main

# Pull changes
git pull origin main
```

---

## Custom Skills & Plugins

### Available Custom Skills

#### `/update-config`
Configure Claude Code harness via settings.json.

```bash
/update-config
```

**Usage:** Modify configuration for automated behaviors and settings.

---

#### `/simplify`
Review changed code for reuse, quality, and efficiency.

```bash
/simplify
```

**Features:**
- Identifies code duplication
- Suggests optimizations
- Improves code quality
- Removes redundancy

---

#### `/loop`
Run a command on recurring intervals.

```bash
/loop 5m /status
```

**Parameters:**
- Interval: `5m` (5 minutes), `1h` (1 hour), etc.
- Command: Any slash command or prompt

**Use Cases:**
- Periodic status checks
- Automated testing
- Scheduled deployments

---

#### `/claude-api`
Build applications with Claude API or Anthropic SDK.

```bash
/claude-api
```

**Triggers When:**
- Code imports `anthropic` or `@anthropic-ai/sdk`
- User asks about Claude API usage
- Implementing Agent SDK features

---

#### `/debug`
Enable debug logging for troubleshooting.

```bash
/debug
```

**Provides:**
- Detailed error messages
- Execution trace
- Performance metrics
- Request/response logs

---

### Plugin System

#### Official Plugins
```json
{
  "enabledPlugins": {
    "github@claude-plugins-official": true
  }
}
```

**Available Plugins:**
- **GitHub Plugin** - Pull requests, issues, comments
- **GitLab Plugin** - GitLab integration
- **Jira Plugin** - Issue tracking
- **Slack Plugin** - Team notifications

---

## Command-Line Options

### Basic Options

#### `--help`
Show help information.

```bash
claude --help
```

---

#### `--version`
Display version information.

```bash
claude --version
```

**Output:** Claude Code version and model information.

---

#### `--config <path>`
Specify custom configuration file.

```bash
claude --config path/to/config.json
```

**Usage:** Use project-specific settings instead of defaults.

---

#### `--debug`
Enable debug mode.

```bash
claude --debug
```

**Provides:**
- Verbose logging
- Error stack traces
- Performance metrics

---

#### `--verbose`
Show detailed output.

```bash
claude --verbose
```

**Usage:** Get more information about operations.

---

#### `--quiet`
Suppress verbose output.

```bash
claude --quiet
```

**Usage:** Minimize output, show only essential information.

---

#### `--no-prompt`
Run without interactive prompts.

```bash
claude --no-prompt
```

**Usage:** Automated execution, CI/CD pipelines.

---

### Advanced Options

#### `--model <model>`
Specify which model to use.

```bash
claude --model opus
```

**Available Models:**
- `sonnet` (default) - Balanced performance
- `opus` - Maximum capability
- `haiku` - Fast responses

---

#### `--timeout <ms>`
Set request timeout in milliseconds.

```bash
claude --timeout 300000
```

**Default:** 120,000ms (2 minutes)

---

#### `--max-tokens <n>`
Limit response tokens.

```bash
claude --max-tokens 4096
```

**Usage:** Control response length and cost.

---

## Keyboard Shortcuts

### Session Control

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Cancel current operation |
| `Ctrl+D` | Exit Claude Code CLI |
| `Ctrl+L` | Clear screen |
| `Up/Down Arrows` | Navigate command history |
| `Tab` | Auto-complete commands |

### Editing

| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Move to beginning of line |
| `Ctrl+E` | Move to end of line |
| `Ctrl+U` | Delete to beginning of line |
| `Ctrl+K` | Delete to end of line |
| `Ctrl+W` | Delete word |
| `Ctrl+Y` | Paste deleted text |

### Search

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` | Search command history |
| `Ctrl+S` | Forward search |
| `Ctrl+F` | Search within files |

---

## Configuration System

### Configuration Files

#### File Locations

1. **Global Settings**
   - `~/.claude/settings.json` - User-wide configuration
   - `~/.claude/settings.local.json` - Local overrides

2. **Project Settings**
   - `.claude/settings.json` - Project-specific configuration
   - `.claude/settings.local.json` - Project local overrides

3. **Documentation**
   - `CLAUDE.md` - Project documentation and guidelines

#### Configuration Priority
1. Command-line flags (highest)
2. `settings.local.json`
3. `settings.json`
4. Global settings (lowest)

---

### Key Configuration Options

#### Environment Variables
```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your-token",
    "ANTHROPIC_BASE_URL": "https://api.anthropic.com",
    "API_TIMEOUT_MS": "300000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  }
}
```

---

#### Permissions System
```json
{
  "permissions": {
    "allow": [
      "Bash(command:git)",
      "Bash(command:npm)",
      "WebFetch(domain:github.com)",
      "WebFetch(domain:registry.npmjs.org)"
    ],
    "deny": [
      "Bash(command:rm)",
      "WebFetch(domain:malicious-site.com)"
    ]
  }
}
```

**Permission Categories:**
- `Bash` - Command execution
- `WebFetch` - Network requests
- `Read` - File reading
- `Write` - File writing
- `Edit` - File modification

---

#### Sandbox Configuration
```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "filesystem": {
      "read": {
        "allow": ["./src", "./tests"],
        "deny": [".env", "credentials.json"]
      },
      "write": {
        "allow": ["./dist", "./build"],
        "deny": ["./src"]
      }
    },
    "network": {
      "allowedHosts": [
        "github.com",
        "registry.npmjs.org"
      ]
    }
  }
}
```

**Sandbox Benefits:**
- Isolates execution environment
- Prevents unauthorized access
- Controls file operations
- Restricts network access

---

#### Agent Configuration
```json
{
  "agents": {
    "quant-research-analyst": {
      "model": "opus",
      "description": "Research quantitative trading strategies",
      "capabilities": [
        "Glob", "Grep", "Read", "WebFetch",
        "WebSearch", "Edit", "NotebookEdit", "Write"
      ]
    },
    "project-report-generator": {
      "model": "sonnet",
      "description": "Generate comprehensive project reports",
      "capabilities": [
        "Edit", "Write", "TaskList", "TaskCreate",
        "Glob", "Grep", "Read"
      ]
    }
  }
}
```

---

#### Skills Configuration
```json
{
  "skills": {
    "debug": {
      "description": "Enable debug logging for troubleshooting",
      "trigger": "user asks about debugging or errors"
    },
    "simplify": {
      "description": "Review and optimize code",
      "trigger": "user asks to simplify or optimize"
    },
    "batch": {
      "description": "Execute large-scale changes",
      "trigger": "user mentions batch operations"
    }
  }
}
```

---

#### Hooks System
```json
{
  "hooks": {
    "pre-command": {
      "run": "echo 'About to run command: $CLAUDE_COMMAND'"
    },
    "post-command": {
      "run": "echo 'Command completed: $CLAUDE_COMMAND'"
    },
    "pre-git-push": {
      "run": "npm run lint && npm run test"
    },
    "post-git-commit": {
      "run": "echo 'Committed: $GIT_COMMIT_MESSAGE'"
    }
  }
}
```

**Available Hooks:**
- `pre-command` - Before any command
- `post-command` - After any command
- `pre-git-push` - Before git push
- `post-git-commit` - After git commit
- `pre-file-write` - Before writing files
- `post-file-read` - After reading files

---

## Agent System

### Built-in Agent Types

#### General-Purpose Agent
For complex, multi-step tasks requiring autonomous execution.

**Capabilities:** All tools available

**Use When:**
- Complex research tasks
- Multi-step code generation
- Autonomous problem-solving

**Launch:**
```bash
claude agent general-purpose
```

---

#### Explore Agent
Fast agent for exploring codebases.

**Capabilities:** All tools except Agent, ExitPlanMode, Edit, Write, NotebookEdit

**Use When:**
- Finding files by patterns
- Searching code keywords
- Understanding codebase structure

**Launch:**
```bash
claude agent explore --thoroughness medium
```

**Thoroughness Levels:**
- `quick` - Basic searches
- `medium` - Moderate exploration
- `very thorough` - Comprehensive analysis

---

#### Plan Agent
Software architect agent for designing implementation plans.

**Use When:**
- Planning implementation strategies
- Identifying critical files
- Considering architectural trade-offs

**Launch:**
```bash
claude agent plan
```

---

### Custom Agents

#### Quant Research Analyst
Specialized for quantitative trading research.

**Description:** Research quantitative trading strategies, analyze mathematical models, evaluate financial algorithms

**Tools:** Glob, Grep, Read, WebFetch, WebSearch, Edit, NotebookEdit, Write

**Usage:**
```bash
/quant research mean-reversion strategy
```

---

#### Project Report Generator
Generate comprehensive project reports.

**Description:** Create status reports, documentation summaries, codebase overviews

**Tools:** Edit, NotebookEdit, Write, TaskList, TaskCreate, Glob, Grep, Read, WebFetch, WebSearch

**Usage:**
```bash
/project report current sprint
```

---

### Agent Usage Patterns

#### Launching Agents
```bash
# Direct launch
claude agent <agent-type>

# With specific task
claude agent general-purpose "Fix authentication bug"

# In background
claude agent explore --background
```

#### Agent Communication
```bash
# Send message to agent
claude agent send <agent-id> "Update the report"

# Get agent status
claude agent status <agent-id>

# Stop agent
claude agent stop <agent-id>
```

---

## Git Integration

### Automatic Git Operations

#### Smart Commit Detection
Claude Code automatically detects git repositories and provides git-aware assistance.

**Features:**
- Automatic staging of relevant files
- Intelligent commit message generation
- Branch-aware operations
- Conflict resolution assistance

---

#### Commit Message Generation
```bash
/commit
```

**Generates messages that:**
- Summarize changes (1-2 sentences)
- Follow commit conventions
- Include proper attribution
- Reference issues when applicable

---

#### Branch Management
```bash
# Create feature branch
git checkout -b feature/user-auth

# Switch branches
git checkout main

# List all branches
git branch -a
```

---

### Git Workflows

#### Feature Development
1. Create feature branch
2. Make changes
3. Commit with `/commit`
4. Push to remote
5. Create pull request

#### Bug Fix
1. Create bugfix branch
2. Fix the issue
3. Test changes
4. Commit with `/commit`
5. Push and create PR

#### Hotfix
1. Create hotfix branch from main
2. Apply fix
3. Commit with `/commit`
4. Merge to main
5. Tag release

---

### GitHub Integration

#### Pull Request Operations
```bash
# Create PR
gh pr create --title "Fix bug" --body "Description"

# View PR
gh pr view 123

# List PRs
gh pr list

# Merge PR
gh pr merge 123
```

---

#### Issue Management
```bash
# Create issue
gh issue create --title "Bug report" --body "Description"

# View issue
gh issue view 456

# List issues
gh issue list
```

---

## Security Features

### Sandboxed Execution

#### What is Sandboxing?
Sandboxing restricts what operations Claude Code can perform, protecting your system from unintended actions.

#### Sandbox Controls

**Filesystem Restrictions:**
```json
{
  "sandbox": {
    "filesystem": {
      "read": {
        "allow": ["./src", "./tests"],
        "deny": [".env", "*.secret"]
      },
      "write": {
        "allow": ["./dist", "./build"],
        "deny": ["./src", "./config"]
      }
    }
  }
}
```

**Network Restrictions:**
```json
{
  "sandbox": {
    "network": {
      "allowedHosts": [
        "github.com",
        "registry.npmjs.org",
        "api.anthropic.com"
      ]
    }
  }
}
```

---

### Permission System

#### Permission Types

**Bash Permissions:**
```json
{
  "permissions": {
    "allow": [
      "Bash(command:git)",
      "Bash(command:npm install)",
      "Bash(command:npm test)"
    ],
    "deny": [
      "Bash(command:rm -rf)",
      "Bash(command:dd)"
    ]
  }
}
```

**Network Permissions:**
```json
{
  "permissions": {
    "allow": [
      "WebFetch(domain:github.com)",
      "WebFetch(domain:registry.npmjs.org)"
    ],
    "deny": [
      "WebFetch(domain:*)"
    ]
  }
}
```

---

### Security Best Practices

#### 1. Never Commit Secrets
```bash
# .gitignore
.env
*.key
*.pem
credentials.json
```

#### 2. Use Environment Variables
```json
{
  "env": {
    "API_KEY": "${API_KEY}",
    "DATABASE_URL": "${DATABASE_URL}"
  }
}
```

#### 3. Enable Sandbox
```json
{
  "sandbox": {
    "enabled": true
  }
}
```

#### 4. Review Permissions
- Regularly audit `settings.json`
- Use principle of least privilege
- Deny by default, allow explicitly

#### 5. Monitor Background Tasks
```bash
# List background tasks
claude tasks list

# Stop task if needed
claude tasks stop <task-id>
```

---

## Best Practices

### Development Workflow

#### 1. Project Initialization
```bash
# Start new project
mkdir my-project
cd my-project
npm init -y
claude init

# Configure Claude Code
claude /update-config
```

---

#### 2. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature

# Develop with Claude
claude
> Implement user authentication

# Review changes
claude /simplify

# Commit
claude /commit

# Push
git push -u origin feature/new-feature
```

---

#### 3. Code Review
```bash
# Review PR
claude /review 123

# Security review
claude /security-review

# Get insights
claude /insights
```

---

#### 4. Documentation
```bash
# Initialize docs
claude /init

# Update docs
claude
> Update CLAUDE.md with new feature

# Generate report
claude /project report documentation status
```

---

### Configuration Management

#### 1. Use Hierarchical Configuration
```
~/.claude/settings.json          # Global defaults
~/.claude/settings.local.json   # User overrides
.claude/settings.json            # Project defaults
.claude/settings.local.json     # Project overrides
```

---

#### 2. Environment-Specific Settings
```json
{
  "env": {
    "development": {
      "debug": true,
      "verbose": true
    },
    "production": {
      "debug": false,
      "verbose": false
    }
  }
}
```

---

#### 3. Team Configuration
Share `.claude/settings.json` in version control for team consistency.

---

### Performance Optimization

#### 1. Use Appropriate Models
- `haiku` - Quick tasks, simple queries
- `sonnet` - Most development work (default)
- `opus` - Complex reasoning, architecture

---

#### 2. Limit Context
```bash
claude --max-tokens 2048
```

---

#### 3. Use Background Tasks
```bash
claude agent general-purpose --background
```

---

#### 4. Cache Results
Claude Code automatically caches file reads and command outputs.

---

### Collaboration

#### 1. Share CLAUDE.md
Commit `CLAUDE.md` to share project knowledge with team.

---

#### 2. Use Git Hooks
```json
{
  "hooks": {
    "pre-commit": "npm run lint",
    "pre-push": "npm run test"
  }
}
```

---

#### 3. Document Skills
Create custom skills for team-specific workflows.

---

## Troubleshooting

### Common Issues

#### Issue: Permission Denied
**Error:** `EPERM: operation not permitted`

**Solutions:**
1. Check sandbox settings
2. Update permissions in `settings.json`
3. Use `dangerouslyDisableSandbox` flag (not recommended)
4. Check macOS Firewall settings

---

#### Issue: Cannot Bind to Port
**Error:** `EADDRINUSE: address already in use`

**Solutions:**
1. Kill process using the port:
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```
2. Use different port:
   ```bash
   npm run dev -- --port 3001
   ```
3. Check firewall settings

---

#### Issue: Authentication Failed
**Error:** `403: Permission denied`

**Solutions:**
1. Verify API token:
   ```bash
   echo $ANTHROPIC_AUTH_TOKEN
   ```
2. Generate new token at https://github.com/settings/tokens
3. Update token in `settings.json`
4. Check token permissions (needs `repo` scope)

---

#### Issue: Slow Response
**Solutions:**
1. Check network connection
2. Use faster model (haiku instead of opus)
3. Reduce context window
4. Use background tasks for long operations

---

#### Issue: Memory Issues
**Solutions:**
1. Clear conversation: `/clear`
2. Reduce file context
3. Use more specific queries
4. Break into smaller tasks

---

### Debug Mode

Enable detailed logging:
```bash
claude --debug
```

**Provides:**
- Request/response logs
- Error stack traces
- Performance metrics
- Tool execution details

---

### Getting Help

#### Built-in Help
```bash
/help
```

#### Documentation
- Claude Code Docs: https://docs.anthropic.com/claude-code
- GitHub Issues: https://github.com/anthropics/claude-code/issues

#### Community
- Discord: Claude Code community
- Forums: Developer discussions

---

## Appendix

### Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_AUTH_TOKEN` | API authentication token | - |
| `ANTHROPIC_BASE_URL` | API base URL | https://api.anthropic.com |
| `API_TIMEOUT_MS` | Request timeout | 120000 |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | Disable analytics | 0 |
| `CLAUDE_MODEL` | Default model | sonnet |

---

### File Structure

```
.claude/
├── settings.json           # Project configuration
├── settings.local.json     # Local overrides
├── skills/                 # Custom skills
│   ├── debug.md
│   └── simplify.md
└── memory/                 # Persistent memory
    ├── user/
    ├── feedback/
    └── project/

CLAUDE.md                   # Project documentation
.gitignore                  # Ignored files
```

---

### Model Comparison

| Model | Speed | Capability | Best For |
|-------|-------|------------|----------|
| Haiku | Fast | Basic | Quick tasks, simple queries |
| Sonnet | Medium | High | Most development work |
| Opus | Slow | Maximum | Complex reasoning, architecture |

---

### Keyboard Shortcuts Reference

| Category | Shortcuts |
|----------|-----------|
| Session | `Ctrl+C`, `Ctrl+D`, `Ctrl+L` |
| Navigation | `Up/Down`, `Tab`, `Ctrl+R` |
| Editing | `Ctrl+A`, `Ctrl+E`, `Ctrl+W` |
| Search | `Ctrl+F`, `Ctrl+R`, `Ctrl+S` |

---

### Command Quick Reference

| Command | Description |
|---------|-------------|
| `/help` | Show help |
| `/clear` | Clear conversation |
| `/commit` | Create git commit |
| `/init` | Initialize documentation |
| `/debug` | Enable debug mode |
| `/simplify` | Optimize code |
| `/loop` | Schedule recurring task |
| `/claude-api` | Claude API assistance |

---

## Conclusion

Claude Code CLI is a powerful development assistant that integrates AI directly into your workflow. With its extensible architecture, robust security features, and comprehensive toolset, it can significantly boost productivity and code quality.

For the latest updates and detailed documentation, visit:
- Official Docs: https://docs.anthropic.com/claude-code
- GitHub: https://github.com/anthropics/claude-code
- Community: https://community.anthropic.com

---

**Report End**

*This documentation was generated by Claude Sonnet 4.6 on April 1, 2026. For the most up-to-date information, refer to the official Claude Code documentation.*