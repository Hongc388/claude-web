import { useEffect, useRef, useState } from 'react'
import { fetchAllCourses } from '@/services/courseService'
import type { Course } from '@/utils/courseUtils'

/* ─── level meta ──────────────────────────────────────────── */
const LEVEL_CONFIG: Record<
  Course['level'],
  { badge: string; border: string; heading: string; dot: string; accent: string }
> = {
  Beginner: {
    badge:   'bg-emerald-100 text-emerald-700 border border-emerald-200',
    border:  'border-emerald-300',
    heading: 'text-emerald-700',
    dot:     'bg-emerald-400',
    accent:  'bg-emerald-50',
  },
  Intermediate: {
    badge:   'bg-amber-100 text-amber-700 border border-amber-200',
    border:  'border-amber-300',
    heading: 'text-amber-700',
    dot:     'bg-amber-400',
    accent:  'bg-amber-50',
  },
  Advanced: {
    badge:   'bg-rose-100 text-rose-700 border border-rose-200',
    border:  'border-rose-300',
    heading: 'text-rose-700',
    dot:     'bg-rose-400',
    accent:  'bg-rose-50',
  },
}

const LEVEL_ORDER: Record<Course['level'], number> = {
  Beginner: 0, Intermediate: 1, Advanced: 2,
}

const LEVEL_ANCHORS: Record<Course['level'], string> = {
  Beginner: 'level-beginner',
  Intermediate: 'level-intermediate',
  Advanced: 'level-advanced',
}

/* ─── helpers ─────────────────────────────────────────────── */
function groupByLevel(courses: Course[]) {
  return (['Beginner', 'Intermediate', 'Advanced'] as Course['level'][])
    .map(level => ({ level, courses: courses.filter(c => c.level === level) }))
    .filter(g => g.courses.length > 0)
}

/* ─── sub-components ──────────────────────────────────────── */

/** Inline monospace tag — mimics Markdown backtick spans */
function MonoTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
      {children}
    </span>
  )
}

/** Decorative horizontal rule — mirrors `---` in Markdown */
function MdRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px bg-gray-200" />
      <span className="font-mono text-xs text-gray-300 select-none">---</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )
}

/** Front-matter block at the top of the "document" */
function FrontMatter({ courses }: { courses: Course[] }) {
  const total = courses.length
  const totalTime = courses.reduce((s, c) => s + c.estimatedTime, 0)
  const levels = [...new Set(courses.map(c => c.level))]

  return (
    <div className="font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
      <p className="text-gray-400 mb-1 select-none">---</p>
      <p><span className="text-primary-600 font-semibold">title:</span> <span className="text-gray-700">AI Agent Learning Path</span></p>
      <p><span className="text-primary-600 font-semibold">courses:</span> <span className="text-gray-700">{total}</span></p>
      <p><span className="text-primary-600 font-semibold">total_time:</span> <span className="text-gray-700">{totalTime} min</span></p>
      <p>
        <span className="text-primary-600 font-semibold">levels:</span>{' '}
        <span className="text-gray-700">[{levels.map(l => `"${l}"`).join(', ')}]</span>
      </p>
      <p className="text-gray-400 mt-1 select-none">---</p>
    </div>
  )
}

/** Table of contents sidebar */
function TableOfContents({
  groups,
  activeLevel,
}: {
  groups: { level: Course['level']; courses: Course[] }[]
  activeLevel: string | null
}) {
  return (
    <nav className="w-52 shrink-0 hidden lg:block">
      <div className="sticky top-6">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">Contents</p>
        <ul className="space-y-3">
          {groups.map(({ level, courses }) => {
            const cfg = LEVEL_CONFIG[level]
            const isActive = activeLevel === LEVEL_ANCHORS[level]
            return (
              <li key={level}>
                <a
                  href={`#${LEVEL_ANCHORS[level]}`}
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                    isActive ? cfg.heading : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <span className="font-mono text-gray-300">#</span>
                  {level}
                </a>
                <ul className="mt-1.5 ml-4 space-y-1.5 border-l-2 border-gray-100 pl-3">
                  {courses.map(c => (
                    <li key={c.id}>
                      <a
                        href={`#course-${c.id}`}
                        className="text-xs text-gray-400 hover:text-gray-700 transition-colors line-clamp-1"
                      >
                        {c.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

/** A single lesson row — styled like a code-fence list item */
function LessonRow({ lesson, index }: { lesson: Course['lessons'][number]; index: number }) {
  return (
    <div className="flex items-start gap-3 py-1.5">
      <span className="font-mono text-xs text-gray-300 w-5 text-right shrink-0 mt-0.5 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-sm text-gray-700 flex-1 leading-snug">{lesson.title}</span>
      <MonoTag>{lesson.duration}m</MonoTag>
    </div>
  )
}

/** A course rendered as a markdown "section" */
function CourseSection({ course }: { course: Course }) {
  const cfg = LEVEL_CONFIG[course.level]
  const [expanded, setExpanded] = useState(false)

  return (
    <div id={`course-${course.id}`} className="scroll-mt-4">
      {/* ### Heading */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-mono text-lg text-gray-300 select-none">###</span>
        <h3 className="text-lg font-bold text-gray-900 leading-snug">{course.title}</h3>
        <span className="ml-auto font-mono text-xs text-gray-400 shrink-0">{course.estimatedTime} min</span>
      </div>

      {/* > Blockquote description */}
      <div className={`flex gap-0 mb-3 rounded-r-md overflow-hidden`}>
        <div className={`w-1 shrink-0 ${cfg.dot} rounded-l`} />
        <p className="text-sm text-gray-500 italic leading-relaxed bg-gray-50 px-4 py-2 flex-1 border border-l-0 border-gray-100 rounded-r-md">
          {course.description}
        </p>
      </div>

      {/* Code-fence lesson list */}
      <div className={`rounded-lg border ${cfg.border} overflow-hidden mb-1`}>
        {/* fence header */}
        <div className={`flex items-center gap-2 px-4 py-1.5 ${cfg.accent} border-b ${cfg.border}`}>
          <span className="font-mono text-xs text-gray-400">lessons</span>
          <span className="font-mono text-xs text-gray-300 ml-auto">{course.lessons.length} items</span>
        </div>
        {/* lesson rows */}
        <div className="divide-y divide-gray-100 px-4 bg-white">
          {(expanded ? course.lessons : course.lessons.slice(0, 3)).map((lesson, i) => (
            <LessonRow key={lesson.id} lesson={lesson} index={i} />
          ))}
          {!expanded && course.lessons.length > 3 && (
            <button
              onClick={() => setExpanded(true)}
              className="w-full py-1.5 font-mono text-xs text-gray-400 hover:text-primary-600 transition-colors text-left"
            >
              + {course.lessons.length - 3} more lessons…
            </button>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between mt-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
          {course.level}
        </span>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline transition-colors font-mono">
          → Start Learning
        </button>
      </div>
    </div>
  )
}

/** A level section — H2 in the document */
function LevelSection({
  level,
  courses,
  sectionRef,
}: {
  level: Course['level']
  courses: Course[]
  sectionRef: (el: HTMLElement | null) => void
}) {
  const cfg = LEVEL_CONFIG[level]

  return (
    <section
      id={LEVEL_ANCHORS[level]}
      ref={sectionRef}
      className="scroll-mt-6 mb-12"
    >
      {/* ## Heading */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xl text-gray-300 select-none">##</span>
        <h2 className={`text-xl font-bold ${cfg.heading}`}>{level}</h2>
        <span className={`ml-2 font-mono text-xs px-2 py-0.5 rounded ${cfg.badge}`}>
          {courses.length} courses
        </span>
      </div>

      <MdRule className="mb-6" />

      <div className="space-y-8">
        {courses.map((course) => (
          <CourseSection key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}

/* ─── main page ───────────────────────────────────────────── */
export default function LearnPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [activeLevel, setActiveLevel] = useState<string | null>(null)

  // refs for intersection observer
  const sectionEls = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    fetchAllCourses()
      .then(data => setCourses([...data].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level])))
      .finally(() => setLoading(false))
  }, [])

  // track which section is in view for TOC highlight
  useEffect(() => {
    if (sectionEls.current.size === 0) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveLevel(visible[0].target.id)
      },
      { rootMargin: '-10% 0px -60% 0px' },
    )
    sectionEls.current.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [courses])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 font-mono text-sm text-gray-400 text-center">
        <span className="animate-pulse">Loading document…</span>
      </div>
    )
  }

  const groups = groupByLevel(courses)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
      {/* Document title — # H1 */}
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-mono text-2xl text-gray-300 select-none">#</span>
        <h1 className="text-2xl font-bold text-gray-900">AI Agent Learning Path</h1>
      </div>
      <p className="font-mono text-xs text-gray-400 mb-6 ml-8">
        {courses.length} courses &nbsp;·&nbsp; from agent fundamentals to multi-agent systems
      </p>

      <FrontMatter courses={courses} />

      {/* Two-column layout: TOC + document body */}
      <div className="flex gap-10">
        <TableOfContents groups={groups} activeLevel={activeLevel} />

        {/* Main document */}
        <div className="flex-1 min-w-0">
          {groups.map(({ level, courses: lvlCourses }) => (
            <LevelSection
              key={level}
              level={level}
              courses={lvlCourses}
              sectionRef={el => {
                if (el) sectionEls.current.set(LEVEL_ANCHORS[level], el)
                else sectionEls.current.delete(LEVEL_ANCHORS[level])
              }}
            />
          ))}

          {/* Document footer */}
          <MdRule className="mb-4" />
          <p className="font-mono text-xs text-gray-300 text-center select-none">
            end of document
          </p>
        </div>
      </div>
    </div>
  )
}
