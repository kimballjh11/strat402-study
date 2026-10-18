import { useEffect } from 'react'

/**
 * The STRAT 401 tab shows only the midterm walkthrough page (public/401/midterm-walkthrough.html),
 * unchanged, filling the space under the course tabs. The older 401 modules stay in the repo but are not routed.
 */
export default function App401() {
  useEffect(() => {
    document.title = 'STRAT 401 · Midterm Walkthrough'
  }, [])
  return (
    <iframe
      src="./401/midterm-walkthrough.html"
      title="STRAT 401 Midterm Walkthrough"
      style={{ display: 'block', width: '100%', height: 'calc(100dvh - 42px)', border: 0 }}
    />
  )
}
