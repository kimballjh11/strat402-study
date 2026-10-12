import { useSyncExternalStore } from 'react'

/** STRAT 401's own hash router. Paths look like #/401/learn/S07?screen=framework */
function read() {
  const h = window.location.hash.replace(/^#/, '') || '/'
  const [full, query = ''] = h.split('?')
  const path = full.replace(/^\/401/, '') || '/'
  return { path, query: new URLSearchParams(query), raw: h }
}

let cache = read()
const subs = new Set<() => void>()
window.addEventListener('hashchange', () => {
  cache = read()
  subs.forEach((s) => s())
})

export function useRoute401() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => cache,
  )
}

/** Build an href inside the 401 app. */
export const to = (p: string) => '#/401' + (p === '/' ? '' : p)

export function go(p: string) {
  const target = to(p)
  if (window.location.hash !== target) window.location.hash = target
}
