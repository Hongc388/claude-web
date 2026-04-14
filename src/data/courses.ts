import type { Course } from '@/utils/courseUtils'

export const COURSES_DATA: Course[] = [
  {
    id: 'agent-intro',
    title: 'Introduction to AI Agents',
    description: 'Understand what agents are, how they differ from simple LLMs, and the core agent loop: observe → reason → act.',
    level: 'Beginner',
    lessons: [
      { id: 'agent-intro-1', title: 'What Is an AI Agent?', content: 'Overview of autonomous agents vs. single-turn models', duration: 10 },
      { id: 'agent-intro-2', title: 'The Agent Loop', content: 'Observe, reason, and act — the ReAct pattern', duration: 12 },
      { id: 'agent-intro-3', title: 'Agents vs. Chatbots', content: 'Key differences in autonomy, memory, and tool use', duration: 8 },
    ],
    estimatedTime: 30,
  },
  {
    id: 'agent-tools',
    title: 'Tools & Function Calling',
    description: 'Learn how agents use tools — from web search to code execution — and how to define tool schemas for LLMs.',
    level: 'Beginner',
    lessons: [
      { id: 'tools-1', title: 'Defining Tools', content: 'JSON Schema for function calling', duration: 15 },
      { id: 'tools-2', title: 'Tool Execution Flow', content: 'How the model calls tools and processes results', duration: 15 },
      { id: 'tools-3', title: 'Built-in vs. Custom Tools', content: 'Web search, code interpreters, and custom APIs', duration: 10 },
    ],
    estimatedTime: 40,
  },
  {
    id: 'agent-memory',
    title: 'Memory & Context Management',
    description: 'Explore the four types of agent memory — in-context, external, episodic, and semantic — and when to use each.',
    level: 'Intermediate',
    lessons: [
      { id: 'mem-1', title: 'In-Context Memory', content: 'Managing the conversation window effectively', duration: 12 },
      { id: 'mem-2', title: 'External Memory with Vector DBs', content: 'RAG and semantic retrieval', duration: 20 },
      { id: 'mem-3', title: 'Episodic & Procedural Memory', content: 'Storing past experiences and learned skills', duration: 15 },
    ],
    estimatedTime: 47,
  },
  {
    id: 'agent-planning',
    title: 'Planning & Reasoning',
    description: 'Dive into planning strategies like Chain-of-Thought, Tree of Thoughts, and ReAct to improve agent decision-making.',
    level: 'Intermediate',
    lessons: [
      { id: 'plan-1', title: 'Chain-of-Thought Prompting', content: 'Eliciting step-by-step reasoning', duration: 15 },
      { id: 'plan-2', title: 'ReAct: Reason + Act', content: 'Interleaving reasoning traces with tool calls', duration: 18 },
      { id: 'plan-3', title: 'Tree of Thoughts', content: 'Exploring multiple reasoning branches', duration: 20 },
    ],
    estimatedTime: 53,
  },
  {
    id: 'multi-agent',
    title: 'Multi-Agent Systems',
    description: 'Build systems where multiple specialized agents collaborate — orchestrators, sub-agents, and communication protocols.',
    level: 'Advanced',
    lessons: [
      { id: 'multi-1', title: 'Orchestrator Pattern', content: 'One agent coordinating many sub-agents', duration: 20 },
      { id: 'multi-2', title: 'Agent Communication', content: 'Message passing, shared state, and handoffs', duration: 18 },
      { id: 'multi-3', title: 'Parallelism & Task Splitting', content: 'Spawning agents for concurrent work', duration: 15 },
      { id: 'multi-4', title: 'Trust & Safety in Multi-Agent', content: 'Prompt injection, authorization, and guardrails', duration: 20 },
    ],
    estimatedTime: 73,
  },
  {
    id: 'agent-safety',
    title: 'Agent Safety & Guardrails',
    description: 'Learn how to build reliable, safe agents with proper error handling, human-in-the-loop checkpoints, and minimal footprint design.',
    level: 'Advanced',
    lessons: [
      { id: 'safe-1', title: 'Minimal Footprint Principle', content: 'Request only necessary permissions', duration: 12 },
      { id: 'safe-2', title: 'Human-in-the-Loop', content: 'When and how to pause for confirmation', duration: 15 },
      { id: 'safe-3', title: 'Prompt Injection Defenses', content: 'Protecting agents from malicious inputs', duration: 18 },
      { id: 'safe-4', title: 'Error Recovery Strategies', content: 'Graceful degradation and retry logic', duration: 12 },
    ],
    estimatedTime: 57,
  },
]
