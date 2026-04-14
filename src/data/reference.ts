export interface ReferenceEntry {
  id: string
  title: string
  category: string
  summary: string
  details: string
  tags: string[]
}

export const REFERENCE_DATA: ReferenceEntry[] = [
  // ── Core Concepts ─────────────────────────────────────────────────────────
  {
    id: 'ref-agent-loop',
    title: 'The Agent Loop (ReAct)',
    category: 'Core Concepts',
    summary: 'The fundamental cycle that drives autonomous agent behaviour: Observe → Reason → Act, repeated until the goal is reached.',
    details:
      'An agent continuously perceives its environment (Observe), decides what to do based on that perception (Reason), then executes an action (Act). Each action changes the environment, producing new observations that restart the cycle. This pattern — called ReAct — interleaves reasoning traces with tool calls, making the agent\'s decision process transparent and correctable.',
    tags: ['react', 'loop', 'observe', 'reason', 'act', 'cycle', 'autonomous'],
  },
  {
    id: 'ref-agents-vs-chatbots',
    title: 'Agents vs. Chatbots',
    category: 'Core Concepts',
    summary: 'Agents are autonomous, goal-driven systems that can take actions over multiple steps; chatbots respond to single-turn inputs.',
    details:
      'A chatbot answers one message at a time and has no persistent goal. An agent, by contrast, is given a high-level objective and works toward it across many steps — calling tools, storing intermediate results, and adapting its plan as new information arrives. Key differentiators: autonomy (multi-step), tool use, and persistent memory.',
    tags: ['agent', 'chatbot', 'autonomy', 'multi-step', 'goal'],
  },

  // ── Tools & Function Calling ───────────────────────────────────────────────
  {
    id: 'ref-tool-schema',
    title: 'Tool Definition (JSON Schema)',
    category: 'Tools & Function Calling',
    summary: 'Tools are described to the LLM using JSON Schema: a name, a natural-language description, and a parameters schema.',
    details:
      'The model reads the tool\'s description to decide when to call it, and the parameters schema tells it what arguments to supply. A minimal schema has three fields: `name` (string identifier), `description` (what the tool does and when to use it), and `parameters` (a JSON Schema object defining required and optional arguments with their types).',
    tags: ['json schema', 'tool', 'function calling', 'parameters', 'definition'],
  },
  {
    id: 'ref-tool-execution',
    title: 'Tool Execution Flow',
    category: 'Tools & Function Calling',
    summary: 'The model emits a tool-call request; the host executes it and returns the result; the model incorporates the result into its next reasoning step.',
    details:
      'Execution is always performed by the host application, not the model itself. Flow: (1) model outputs a structured tool-call block, (2) host validates and runs the function, (3) result is appended to the conversation as a tool-result message, (4) model continues reasoning with that result in context. The model never directly touches external systems.',
    tags: ['tool call', 'execution', 'host', 'result', 'flow'],
  },
  {
    id: 'ref-built-in-tools',
    title: 'Built-in vs. Custom Tools',
    category: 'Tools & Function Calling',
    summary: 'Built-in tools (web search, code interpreter) are provided by the platform; custom tools are defined by the developer for domain-specific actions.',
    details:
      'Platforms like Claude.ai provide first-party tools out of the box. For custom agents, developers write their own tool functions (e.g., database queries, REST API calls, file I/O) and register them via JSON Schema. Custom tools let agents integrate with any system, but the developer is responsible for security, validation, and error handling.',
    tags: ['built-in', 'custom', 'web search', 'code interpreter', 'api'],
  },

  // ── Memory ─────────────────────────────────────────────────────────────────
  {
    id: 'ref-in-context-memory',
    title: 'In-Context Memory',
    category: 'Memory',
    summary: 'Information held directly in the active conversation window — fast but limited by the model\'s context length.',
    details:
      'The simplest form of agent memory: everything in the current prompt and message history. It requires no external infrastructure but is ephemeral (lost when the context ends) and bounded by the context window size. Effective context management — summarisation, pruning, and selective retention — is key to keeping in-context memory useful over long sessions.',
    tags: ['context window', 'in-context', 'memory', 'conversation'],
  },
  {
    id: 'ref-external-memory',
    title: 'External Memory (Vector DBs / RAG)',
    category: 'Memory',
    summary: 'Knowledge stored outside the context window in a vector database, retrieved at runtime via semantic similarity search.',
    details:
      'Retrieval-Augmented Generation (RAG) embeds documents as vectors and stores them in a database (e.g., Pinecone, Weaviate, pgvector). At query time, the agent embeds its current query, finds the most semantically similar stored chunks, and injects them into the context. This allows agents to access vast knowledge bases without fitting everything into a single prompt.',
    tags: ['rag', 'vector db', 'embedding', 'semantic search', 'pinecone', 'retrieval'],
  },
  {
    id: 'ref-episodic-memory',
    title: 'Episodic & Procedural Memory',
    category: 'Memory',
    summary: 'Episodic memory stores past interaction summaries; procedural memory encodes learned skills or workflows the agent can reuse.',
    details:
      'Episodic memory lets an agent recall what happened in previous sessions (stored as structured summaries in a database). Procedural memory stores reusable "how-to" knowledge — sequences of steps that worked well — so the agent can apply proven strategies without re-deriving them. Together they enable agents that improve over time and maintain continuity across sessions.',
    tags: ['episodic', 'procedural', 'long-term', 'skills', 'session'],
  },

  // ── Planning & Reasoning ───────────────────────────────────────────────────
  {
    id: 'ref-cot',
    title: 'Chain-of-Thought (CoT) Prompting',
    category: 'Planning & Reasoning',
    summary: 'Asking the model to reason step-by-step before giving a final answer, significantly improving accuracy on multi-step tasks.',
    details:
      'Adding "think step by step" (or providing few-shot reasoning examples) causes the model to externalise its reasoning trace. This reduces errors on arithmetic, logic, and multi-hop problems because each intermediate step can be checked for consistency. Zero-shot CoT ("Let\'s think step by step") works surprisingly well without examples.',
    tags: ['chain of thought', 'cot', 'reasoning', 'step by step', 'accuracy'],
  },
  {
    id: 'ref-react',
    title: 'ReAct: Reason + Act',
    category: 'Planning & Reasoning',
    summary: 'A prompting strategy that interleaves reasoning traces (Thought) with tool calls (Action) and their results (Observation).',
    details:
      'ReAct structures agent output as alternating Thought → Action → Observation blocks. The Thought makes the reasoning explicit; the Action executes a tool; the Observation records the result. This interleaving grounds reasoning in real-world feedback, reducing hallucination and allowing the agent to adjust its plan dynamically.',
    tags: ['react', 'thought', 'action', 'observation', 'interleaved', 'prompting'],
  },
  {
    id: 'ref-tree-of-thoughts',
    title: 'Tree of Thoughts (ToT)',
    category: 'Planning & Reasoning',
    summary: 'An extension of CoT that explores multiple reasoning branches simultaneously, backtracking from dead ends to find better solutions.',
    details:
      'Where CoT follows a single linear path, ToT generates several candidate next steps at each decision point, evaluates them (via the model or a heuristic), and continues from the most promising ones. It is analogous to beam search or MCTS applied to reasoning. Useful for complex planning, puzzle-solving, and tasks where greedy reasoning tends to get stuck.',
    tags: ['tree of thoughts', 'tot', 'search', 'branching', 'backtrack', 'beam search'],
  },

  // ── Multi-Agent Systems ────────────────────────────────────────────────────
  {
    id: 'ref-orchestrator',
    title: 'Orchestrator Pattern',
    category: 'Multi-Agent Systems',
    summary: 'A top-level agent that breaks a goal into sub-tasks and delegates each to a specialised sub-agent, then aggregates results.',
    details:
      'The orchestrator holds the high-level plan and communicates with sub-agents via a shared message bus or direct calls. It does not perform ground-level work itself — it routes, sequences, and synthesises. Common implementation: the orchestrator is a powerful model; sub-agents are faster, cheaper, or domain-specific models.',
    tags: ['orchestrator', 'sub-agent', 'coordination', 'delegation', 'plan'],
  },
  {
    id: 'ref-agent-communication',
    title: 'Agent Communication Protocols',
    category: 'Multi-Agent Systems',
    summary: 'Agents exchange structured messages — via shared state, message queues, or direct tool calls — to coordinate complex workflows.',
    details:
      'Common patterns: (1) shared memory/database all agents read/write, (2) event-driven message queues (each agent subscribes to relevant events), (3) direct tool calls where one agent calls another as if it were a function. Handoff protocols define what context must be passed when transitioning work between agents.',
    tags: ['communication', 'message passing', 'shared state', 'handoff', 'queue'],
  },
  {
    id: 'ref-parallelism',
    title: 'Parallelism & Task Splitting',
    category: 'Multi-Agent Systems',
    summary: 'Independent sub-tasks can be dispatched to multiple agents simultaneously, dramatically reducing end-to-end latency.',
    details:
      'When a complex task can be decomposed into independent parts (e.g., researching 5 topics at once), spawning parallel agents is far more efficient than sequential execution. The orchestrator must identify which tasks have no data dependencies, launch them concurrently, and then join/merge the results. Watch for race conditions on shared resources.',
    tags: ['parallel', 'concurrent', 'spawn', 'latency', 'independent', 'fan-out'],
  },

  // ── Safety & Guardrails ────────────────────────────────────────────────────
  {
    id: 'ref-minimal-footprint',
    title: 'Minimal Footprint Principle',
    category: 'Safety & Guardrails',
    summary: 'Agents should request only the permissions, data, and resources they actually need — nothing more.',
    details:
      'This limits blast radius when something goes wrong. If an agent is compromised via prompt injection or makes a logic error, a minimal permission set prevents it from causing widespread damage. Practical rules: prefer read-only access where possible, avoid storing sensitive data beyond immediate use, and confirm with the user before taking irreversible actions.',
    tags: ['minimal footprint', 'permissions', 'blast radius', 'safety', 'principle'],
  },
  {
    id: 'ref-human-in-loop',
    title: 'Human-in-the-Loop (HITL)',
    category: 'Safety & Guardrails',
    summary: 'Pausing agent execution at critical decision points to request explicit human approval before proceeding.',
    details:
      'HITL is essential for high-stakes or irreversible actions (sending emails, deleting data, making purchases). Design checkpoints into the agent workflow: the agent proposes an action, shows its reasoning, and waits for user confirmation. This creates an audit trail and allows humans to catch errors before they propagate. Balance with automation — too many checkpoints break the user experience.',
    tags: ['human in loop', 'hitl', 'confirmation', 'approval', 'checkpoints', 'irreversible'],
  },
  {
    id: 'ref-prompt-injection',
    title: 'Prompt Injection Defenses',
    category: 'Safety & Guardrails',
    summary: 'Prompt injection occurs when malicious content in the environment tricks the agent into executing unintended instructions.',
    details:
      'Defenses: (1) treat all external content (web pages, files, tool results) as untrusted data, not instructions; (2) use a separate "system" layer for developer instructions that external data cannot override; (3) validate all tool outputs before passing them back to the model; (4) use constrained output schemas so the model can only call known tools with known parameters. No single defense is foolproof — layer them.',
    tags: ['prompt injection', 'security', 'malicious', 'defense', 'external content'],
  },
  {
    id: 'ref-error-recovery',
    title: 'Error Recovery Strategies',
    category: 'Safety & Guardrails',
    summary: 'Well-designed agents detect failures, retry with adjusted strategies, and gracefully degrade rather than crashing silently.',
    details:
      'Key strategies: (1) exponential back-off for transient tool failures (rate limits, timeouts); (2) fallback tools — if the primary tool fails, try an alternative; (3) partial-progress checkpointing so a restart resumes from where it left off; (4) structured error messages returned to the model so it can reason about the failure and adjust its approach; (5) hard stop after N retries to prevent infinite loops.',
    tags: ['error recovery', 'retry', 'fallback', 'backoff', 'graceful degradation'],
  },
]

export const REFERENCE_CATEGORIES = [
  'All',
  'Core Concepts',
  'Tools & Function Calling',
  'Memory',
  'Planning & Reasoning',
  'Multi-Agent Systems',
  'Safety & Guardrails',
] as const

export type ReferenceCategory = typeof REFERENCE_CATEGORIES[number]
