import { useEffect, useState, type ReactNode } from 'react'
import { daysBetween, parseIsoDay } from '../lib/format'
import { useRoute } from '../lib/router'
import { streak, useProgress } from '../lib/store'

export const NAV = [
  { to: '/learn', label: 'Learn', icon: '📖' },
  { to: '/practice', label: 'Practice', icon: '✎' },
  { to: '/quizzes', label: 'Quiz retakes', icon: '★' },
  { to: '/exam', label: 'Exam Mode', icon: '⏱' },
  { to: '/formulas', label: 'Formula Sheet', icon: 'ƒ' },
  { to: '/excel', label: 'Excel Lab', icon: '⊞' },
  { to: '/settings', label: 'Settings & backup', icon: '⚙' },
]
const MOBILE = ['/learn', '/practice', '/quizzes', '/exam', '/more']

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('strat402-theme', dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }, [dark])
  return [dark, setDark] as const
}

export function Layout({ children }: { children: ReactNode }) {
  const { path } = useRoute()
  const examDate = useProgress((p) => p.examDate)
  const days = useProgress((p) => p.studyDays)
  const [dark, setDark] = useTheme()
  const left = daysBetween(new Date(), parseIsoDay(examDate))
  const st = streak(days)
  const active = (to: string) => (to === '/learn' ? path === '/' || path === '/learn' || path.startsWith('/learn/') : path === to || path.startsWith(to + '/'))

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn">
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b line" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <a href="#/learn" className="flex items-center gap-2 font-bold" aria-label="STRAT 402">
            <span className="grid place-items-center size-8 rounded-lg text-white text-xs" style={{ background: '#002E5D' }}>
              402
            </span>
            <span className="hidden sm:inline font-serif text-lg">Economics of Strategy</span>
          </a>
          <div className="ml-auto flex items-center gap-2">
            <span className="chip" title={`Exam day: ${examDate}`} data-testid="countdown">
              {left > 0 ? `${left} day${left === 1 ? '' : 's'} to exam` : left === 0 ? 'Exam day' : 'Exam done'}
            </span>
            {st > 0 && <span className="chip" title="Study streak">🔥 {st}</span>}
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setDark((d) => !d)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? '☀' : '☾'}
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 flex gap-6">
        <nav aria-label="Main" className="hidden lg:block w-52 flex-none py-6 sticky top-14 self-start">
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <a
                  href={'#' + n.to}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${active(n.to) ? 'surface-2' : ''}`}
                  aria-current={active(n.to) ? 'page' : undefined}
                  style={active(n.to) ? { color: 'var(--accent)' } : undefined}
                >
                  <span aria-hidden className="w-5 text-center">
                    {n.icon}
                  </span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main id="main" className="flex-1 min-w-0 py-6 pb-28 lg:pb-10">
          {children}
        </main>
      </div>
      <nav aria-label="Main (mobile)" className="lg:hidden fixed bottom-0 inset-x-0 z-20 border-t line" style={{ background: 'var(--surface)' }}>
        <ul className="grid grid-cols-5">
          {MOBILE.map((to) => {
            const n = to === '/more' ? { to, label: 'More', icon: '☰' } : NAV.find((x) => x.to === to)!
            const on = to === '/more' ? !MOBILE.slice(0, 4).some((m) => active(m)) : active(to)
            return (
              <li key={to}>
                <a href={'#' + to} className="flex flex-col items-center py-2 text-xs min-h-14 justify-center" aria-current={on ? 'page' : undefined} style={on ? { color: 'var(--accent)', fontWeight: 700 } : undefined}>
                  <span aria-hidden className="text-lg leading-none">
                    {n.icon}
                  </span>
                  {n.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
