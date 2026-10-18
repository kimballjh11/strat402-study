import { useEffect } from 'react'
import { sessionById } from './content'
import type { SessionId } from './content/types'
import { Layout } from './components/Layout'
import { useRoute } from './lib/router'
import { markStudyToday } from './lib/store'
import { Exam } from './pages/Exam'
import { ExcelLab } from './pages/ExcelLab'
import { FormulaSheet } from './pages/FormulaSheet'
import { Learn } from './pages/Learn'
import { More } from './pages/More'
import { Plan } from './pages/Plan'
import { Practice } from './pages/Practice'
import { Quizzes } from './pages/Quizzes'
import { Settings } from './pages/Settings'

export default function App() {
  const { path } = useRoute()
  useEffect(() => {
    markStudyToday()
  }, [])
  useEffect(() => {
    const t = path.split('/')[1] || 'learn'
    document.title = `STRAT 402 · ${t.charAt(0).toUpperCase() + t.slice(1)}`
  }, [path])

  let page
  const m = path.match(/^\/learn\/(S\d\d)$/)
  if (path === '/' || path === '/learn' || (m && sessionById[m[1] as SessionId])) page = <Learn key={m?.[1] ?? 'all'} focus={m ? (m[1] as SessionId) : undefined} />
  else
    switch (path) {
      case '/practice':
        page = <Practice />
        break
      case '/quizzes':
        page = <Quizzes />
        break
      case '/exam':
        page = <Exam />
        break
      case '/formulas':
        page = <FormulaSheet />
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
            <a className="underline" href="#/learn">
              Back to Learn
            </a>
          </div>
        )
    }
  return <Layout>{page}</Layout>
}
