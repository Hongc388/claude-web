import { useState } from 'react'

export default function DocSection({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="font-bold text-gray-900">{title}</span>
        <span className="text-gray-500 text-lg">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="px-6 py-4 space-y-4">{children}</div>}
    </div>
  )
}
