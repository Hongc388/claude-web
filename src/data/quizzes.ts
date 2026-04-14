import type { Quiz } from '@/utils/courseUtils'

export const QUIZZES_DATA: Quiz[] = [
  {
    id: 'quiz-agent-loop',
    question: 'What is the correct order of the core agent loop?',
    options: [
      'Act → Observe → Reason',
      'Observe → Reason → Act',
      'Reason → Act → Observe',
      'Plan → Execute → Reflect',
    ],
    correctAnswer: 1,
    explanation:
      'The ReAct pattern follows Observe → Reason → Act. The agent first perceives its environment, then reasons about what to do, then executes an action — repeating this cycle until the goal is reached.',
  },
  {
    id: 'quiz-tool-calling',
    question: 'What format does an LLM typically use to define a callable tool?',
    options: [
      'Plain English descriptions only',
      'XML configuration files',
      'JSON Schema with name, description, and parameters',
      'Python type annotations',
    ],
    correctAnswer: 2,
    explanation:
      'Tools are defined using JSON Schema — a structured format that includes the tool name, a natural-language description the model reads, and a parameters schema. This allows the LLM to know when and how to call the tool.',
  },
  {
    id: 'quiz-memory-types',
    question: 'Which type of agent memory uses a vector database for semantic search?',
    options: [
      'In-context memory',
      'Episodic memory',
      'Procedural memory',
      'External (semantic) memory',
    ],
    correctAnswer: 3,
    explanation:
      'External semantic memory stores information outside the context window in a vector database, enabling retrieval-augmented generation (RAG). The agent embeds queries and retrieves semantically similar documents at runtime.',
  },
  {
    id: 'quiz-cot',
    question: 'What does Chain-of-Thought (CoT) prompting primarily improve in agents?',
    options: [
      'Response speed',
      'Token efficiency',
      'Step-by-step reasoning accuracy',
      'Tool execution latency',
    ],
    correctAnswer: 2,
    explanation:
      'CoT prompting asks the model to "think step by step" before giving a final answer. This externalises the reasoning trace, which significantly improves accuracy on multi-step and arithmetic tasks by reducing reasoning errors.',
  },
  {
    id: 'quiz-multi-agent',
    question: 'In the Orchestrator pattern, what is the orchestrator agent responsible for?',
    options: [
      'Executing all tasks itself in sequence',
      'Storing shared state for sub-agents',
      'Coordinating and delegating tasks to specialised sub-agents',
      'Monitoring sub-agents for security violations',
    ],
    correctAnswer: 2,
    explanation:
      'The orchestrator breaks a high-level goal into sub-tasks and dispatches each to a specialised sub-agent. It then aggregates results and decides next steps — it rarely does the ground-level work itself.',
  },
  {
    id: 'quiz-minimal-footprint',
    question: 'What does the "minimal footprint" safety principle mean for agents?',
    options: [
      'Agents should use the smallest model possible',
      'Agents should request only the permissions they actually need',
      'Agents should produce short responses',
      'Agents should avoid using external tools',
    ],
    correctAnswer: 1,
    explanation:
      'Minimal footprint means an agent acquires only the permissions, data access, and resources required for the current task. This limits blast radius if the agent makes a mistake or is compromised via prompt injection.',
  },
]
