// Visit every screen of every built 401 module at 1280 and 375: console errors + horizontal overflow.
// usage: node scripts/strat401/smoke.mjs http://localhost:5174 S01 S02 ...
import { chromium } from '@playwright/test'
const [base, ...mods] = process.argv.slice(2)
const SCREENS = ['question', 'framework', 'drill', 'terms', 'argument', 'fails', 'case', 'run', 'coldcall', 'devil', 'present', 'check', 'summary']
const b = await chromium.launch()
let bad = 0
for (const [w, h] of [[1280, 900], [375, 812]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } })
  const errs = []
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  p.on('pageerror', (e) => errs.push(String(e)))
  for (const m of mods) for (const s of SCREENS) {
    await p.goto(`${base}/#/401/learn/${m}?screen=${s}`)
    await p.locator(`[data-testid="screen-${s}"]`).waitFor({ timeout: 10000 }).catch(() => { errs.push(`${m}/${s}: screen missing`) })
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    if (ov > 1) { bad++; console.log(`OVERFLOW ${ov}px @${w} ${m}/${s}`) }
    if (errs.length) { bad++; console.log(`ERR @${w} ${m}/${s}: ${errs.splice(0).join(' | ').slice(0, 300)}`) }
  }
  await p.close()
}
await b.close()
console.log(bad ? `${bad} problem(s)` : 'SMOKE OK')
