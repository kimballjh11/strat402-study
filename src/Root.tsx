import { lazy, Suspense, useEffect } from 'react'
import App from './App'
import { CourseTabs, is401Path, rememberPath } from './CourseTabs'
import { navigate, useRoute } from './lib/router'

/** STRAT 401 is a completely separate app mounted under #/401. STRAT 402 keeps every existing route. */
const App401 = lazy(() => import('./strat401/App401'))

export function Root() {
  const { path, raw } = useRoute()
  const on401 = is401Path(path)
  useEffect(() => {
    if (!on401 && path === '/') navigate('/learn')
  }, [on401, path])
  useEffect(() => rememberPath(on401 ? '401' : '402', raw), [on401, raw])
  // The tabs come AFTER the app in the DOM so each app's "Skip to content" link stays the first Tab stop;
  // CSS order puts them visually on top.
  return (
    <div className="flex flex-col">
      <div className="order-2">
      {on401 ? (
        <Suspense fallback={<p className="p-6 muted">Loading STRAT 401…</p>}>
          <App401 />
        </Suspense>
      ) : (
        <App />
      )}
      </div>
      <div className="order-1">
        <CourseTabs active={on401 ? '401' : '402'} />
      </div>
    </div>
  )
}
