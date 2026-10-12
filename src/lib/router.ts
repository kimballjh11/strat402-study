import { useSyncExternalStore } from 'react'

/** Minimal hash router: #/learn/S08?screen=3 */
function read() {
  const h = window.location.hash.replace(/^#/, '') || '/'
  const [path, query = ''] = h.split('?')
  return { path, query: new URLSearchParams(query), raw: h }
}

let cache = read()
const subs = new Set<() => void>()
window.addEventListener('hashchange', () => {
  cache = read()
  subs.forEach((s) => s())
})

export function useRoute() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => cache,
  )
}

export function navigate(to: string) {
  const target = to.startsWith('#') ? to : '#' + to
  if (window.location.hash !== target) window.location.hash = target
}

export function href(to: string) {
  return '#' + to
}
