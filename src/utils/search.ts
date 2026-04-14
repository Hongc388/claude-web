import { SECTION_SUMMARIES as AGENT_SECTIONS }    from '@/components/local-ui/AgentPage'
import { SECTION_SUMMARIES as CLAUDE_SECTIONS }   from '@/components/local-ui/ClaudePage'
import { SECTION_SUMMARIES as DOCS_SECTIONS }     from '@/components/local-ui/DocsPage'
import { SECTION_SUMMARIES as CLIS_SECTIONS, SLASH_COMMANDS } from '@/components/local-ui/ClisPage'

export interface SearchResult {
  id: string
  title: string
  summary: string
  tabId: string
  tabLabel: string
}

// Flat index of every section across all tabs.
// To add a new tab: import its SECTION_SUMMARIES and append a new spread below.
const ALL_SECTIONS: SearchResult[] = [
  ...AGENT_SECTIONS.map(s    => ({ id: `agent-${s.id}`,    title: s.label, summary: s.description, tabId: 'agent',    tabLabel: 'Agent'    })),
  ...CLAUDE_SECTIONS.map(s   => ({ id: `claude-${s.id}`,   title: s.label, summary: s.description, tabId: 'claude',   tabLabel: 'Claude'   })),
  ...DOCS_SECTIONS.map(s     => ({ id: `mds-${s.id}`,      title: s.label, summary: s.description, tabId: 'mds',      tabLabel: '.MDs'     })),
  ...CLIS_SECTIONS.map(s     => ({ id: `clis-${s.id}`,     title: s.label, summary: s.description, tabId: 'clis',     tabLabel: 'CLIs'     })),
  ...SLASH_COMMANDS.map(([cmd, desc]: [string, string]) => ({
    id:       `clis-cmd-${cmd.replace(/[^a-z0-9]/gi, '-')}`,
    title:    cmd,
    summary:  desc,
    tabId:    'clis',
    tabLabel: 'CLIs',
  })),
]

/**
 * Returns up to `limit` sections whose title or description contains `query`.
 * Returns an empty array when `query` is blank.
 */
export function searchSections(query: string, limit = 8): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return ALL_SECTIONS
    .filter(s => s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q))
    .slice(0, limit)
}
