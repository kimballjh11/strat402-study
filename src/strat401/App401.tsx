import { useEffect } from 'react'
import { mapById } from './content/map'
import type { SessionId } from './content/types'
import { Layout401 } from './Layout401'
import { useRoute401 } from './lib/router'
import { Dashboard } from './pages/Dashboard'
import { Flashcards } from './pages/Flashcards'
import { Learn } from './pages/Learn'
import { ModulePage } from './pages/Module'
import { Settings } from './pages/Settings'
import './s401.css'

export default function App401() {
  const { path } = useRoute401()
  useEffect(() => {
    const t = path.split('/')[1] || 'dashboard'
    const mod = path.match(/^\/learn\/(S\d\d)/)
    document.title = `STRAT 401 · ${mod ? mod[1] : t.charAt(0).toUpperCase() + t.slice(1)}`
  }, [path])
  let page
  const m = path.match(/^\/learn\/(S\d\d)$/)
  if (m && mapById[m[1] as SessionId]) page = <ModulePage key={m[1]} id={m[1] as SessionId} />
  else if (path === '/') page = <Dashboard />
  else if (path === '/learn') page = <Learn />
  else if (path === '/flashcards') page = <Flashcards />
  else if (path === '/settings') page = <Settings />
  else
    page = (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <a className="underline" href="#/401">
          Go to the STRAT 401 dashboard
        </a>
      </div>
    )
  return <Layout401>{page}</Layout401>
}
