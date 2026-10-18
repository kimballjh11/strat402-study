import { useEffect, useState, type ReactNode } from 'react'
import { daysBetween, parseIsoDay } from './lib/format'
import { to, useRoute401 } from './lib/router'
import { useP } from './lib/store'

export const NAV = [
  { to: '/', label: 'Dashboard', icon: '⌂' },
  { to: '/learn', label: 'Learn', icon: '📖' },
  { to: '/flashcards', label: 'Flashcards', icon: '🗂' },
  { to: '/settings', label: 'Settings & backup', icon: '⚙' },
]
/** Static pages that live outside the 401 hash router (served from public/401/). */
export const EXTRA = [{ href: './401/midterm-walkthrough.html', label: 'Midterm walkthrough', icon: '🧭' }]
const THEME = 'strat401-theme'

function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const t = localStorage.getItem(THEME)
      if (t) return t === 'dark'
    } catch {
      /* ignore */
    }
    return document.documentElement.classList.contains('dark')
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem(THEME, dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }, [dark])
  return [dark, setDark] as const
}

export function Layout401({ children }: { children: ReactNode }) {
  const { path } = useRoute401()
  const examDate = useP((p) => p.examDate)
  const [dark, setDark] = useTheme()
  const left = examDate ? daysBetween(new Date(), parseIsoDay(examDate)) : null
  const active = (t: string) => (t === '/' ? path === '/' : path === t || path.startsWith(t + '/'))
  return (
    <div className="s401 min-h-screen">
      <a href="#main401" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn">
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b line" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <a href={to('/')} className="flex items-center gap-2 font-bold" aria-label="STRAT 401 dashboard">
            <span className="grid place-items-center size-8 rounded-lg text-xs" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
              401
            </span>
            <span className="hidden sm:inline font-serif text-lg">Foundations of Strategy</span>
          </a>
          <div className="ml-auto flex items-center gap-2">
            <a href={to('/')} className="chip" data-testid="countdown-401">
              {left === null ? 'Set exam date' : left > 0 ? `${left} day${left === 1 ? '' : 's'} to exam` : left === 0 ? 'Exam day' : 'Exam done'}
            </a>
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setDark((d) => !d)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? '☀' : '☾'}
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 flex gap-6">
        <nav aria-label="STRAT 401" className="hidden lg:block w-52 flex-none py-6 sticky top-14 self-start">
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <a href={to(n.to)} aria-current={active(n.to) ? 'page' : undefined} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${active(n.to) ? 'surface-2' : ''}`} style={active(n.to) ? { color: 'var(--accent)' } : undefined}>
                  <span aria-hidden className="w-5 text-center">
                    {n.icon}
                  </span>
                  {n.label}
                </a>
              </li>
            ))}
            {EXTRA.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium">
                  <span aria-hidden className="w-5 text-center">
                    {n.icon}
                  </span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main id="main401" className="flex-1 min-w-0 py-6 pb-28 lg:pb-10">
          {children}
        </main>
      </div>
      <nav aria-label="STRAT 401 (mobile)" className="lg:hidden fixed bottom-0 inset-x-0 z-20 border-t line no-print" style={{ background: 'var(--surface)' }}>
        <ul className="grid grid-cols-5">
          {NAV.map((n) => (
            <li key={n.to}>
              <a href={to(n.to)} aria-current={active(n.to) ? 'page' : undefined} className="flex flex-col items-center py-2 text-xs min-h-14 justify-center" style={active(n.to) ? { color: 'var(--accent)', fontWeight: 700 } : undefined}>
                <span aria-hidden className="text-lg leading-none">
                  {n.icon}
                </span>
                {n.label.split(' ')[0]}
              </a>
            </li>
          ))}
          {EXTRA.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="flex flex-col items-center py-2 text-xs min-h-14 justify-center">
                <span aria-hidden className="text-lg leading-none">
                  {n.icon}
                </span>
                Walkthrough
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
