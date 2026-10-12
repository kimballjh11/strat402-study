/** Top-level switch between the two courses. Each tab remembers where you were in that course. */
const KEY = 'course-tabs-last'

export const is401Path = (p: string) => p === '/401' || p.startsWith('/401/')

function readLast(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function rememberPath(course: '401' | '402', raw: string) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ ...readLast(), [course]: raw }))
  } catch {
    /* storage unavailable: tabs just go to each course's home */
  }
}

export function CourseTabs({ active }: { active: '401' | '402' }) {
  const last = readLast()
  const tabs = [
    { id: '401', label: 'STRAT 401', sub: 'Foundations of Strategy', href: '#' + (last['401'] && is401Path(last['401'].split('?')[0]) ? last['401'] : '/401') },
    { id: '402', label: 'STRAT 402', sub: 'Economics of Strategy', href: '#' + (last['402'] && !is401Path(last['402'].split('?')[0]) ? last['402'] : '/') },
  ] as const
  return (
    <nav aria-label="Course" className="no-print border-b line" style={{ background: 'var(--surface-2)' }}>
      <ul className="max-w-6xl mx-auto px-4 flex gap-1 pt-1.5" role="list">
        {tabs.map((t) => {
          const on = t.id === active
          return (
            <li key={t.id}>
              <a
                href={t.href}
                aria-current={on ? 'page' : undefined}
                data-testid={`course-tab-${t.id}`}
                className="flex items-baseline gap-2 rounded-t-lg px-3 py-1.5 text-sm font-semibold border border-b-0"
                style={
                  on
                    ? { background: 'var(--surface)', borderColor: 'var(--line)', color: 'var(--ink)' }
                    : { borderColor: 'transparent', color: 'var(--ink-2)' }
                }
              >
                {t.label}
                <span className="hidden sm:inline font-normal text-xs">{t.sub}</span>
                {on && <span className="sr-only">(current course)</span>}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
