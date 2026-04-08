import { useState } from 'react'
import type { ReactNode } from 'react'

interface HoverCardProps {
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  children: ReactNode
}

export default function HoverCard({
  title,
  description,
  imageSrc,
  imageAlt,
  children,
}: HoverCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}

      {open && (
        <div
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-3 pointer-events-none"
        >
          {imageSrc && (
            <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
              <img
                src={imageSrc}
                alt={imageAlt ?? title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
          <p className="font-bold text-gray-900 text-sm mb-1">{title}</p>
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  )
}
