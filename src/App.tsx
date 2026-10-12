import { useEffect } from 'react'
import { sessionById } from './content'
import type { SessionId } from './content/types'
import { Layout } from './components/Layout'
import { useRoute } from './lib/router'
import { markStudyToday } from './lib/store'
import { Exam } from './pages/Exam'
import { ExcelLab } from './pages/ExcelLab'
import { Flashcards } from './pages/Flashcards'
import { FormulaSheet } from './pages/FormulaSheet'
import { Home } from './pages/Home'
import { Learn } from './pages/Learn'
import { Mistakes } from './pages/Mistakes'
import { ModulePage } from './pages/ModulePage'
import { More } from './pages/More'
import { Plan } from './pages/Plan'
import { Practice } from './pages/Practice'
import { Quizzes } from './pages/Quizzes'
import { Settings } from './pages/Settings'
import { Tracker } from './pages/Tracker'

export default function App() {
  const { path } = useRoute()
  useEffect(() => {
    markStudyToday()
  }, [])
  useEffect(() => {
    const t = path.split('/')[1] || 'home'
    document.title = `STRAT 402 · ${t.charAt(0).toUpperCase() + t.slice(1)}`
  }, [path])

  let page
  const m = path.match(/^\/learn\/(S\d\d)$/)
  if (m && sessionById[m[1] as SessionId]) page = <ModulePage id={m[1] as SessionId} />
  else
    switch (path) {
      case '/':
        page = <Home />
        break
      case '/learn':
        page = <Learn />
        break
      case '/practice':
        page = <Practice />
        break
      case '/quizzes':
        page = <Quizzes />
        break
      case '/flashcards':
        page = <Flashcards />
        break
      case '/tracker':
        page = <Tracker />
        break
      case '/exam':
        page = <Exam />
        break
      case '/formulas':
        page = <FormulaSheet />
        break
      case '/mistakes':
        page = <Mistakes />
        break
      case '/excel':
        page = <ExcelLab />
        break
      case '/settings':
        page = <Settings />
        break
      case '/plan':
        page = <Plan />
        break
      case '/more':
        page = <More />
        break
      default:
        page = (
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Page not found</h1>
            <a className="underline" href="#/">
              Go home
            </a>
          </div>
        )
    }
  return <Layout>{page}</Layout>
}
