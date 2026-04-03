import type { ReactNode } from 'react'

interface CodeBlockProps {
  children: ReactNode
}

export default function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm overflow-x-auto my-2 font-mono">
      <code>{children}</code>
    </pre>
  )
}
