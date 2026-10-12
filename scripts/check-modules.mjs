// Visit every screen of the given modules at 1280px and 375px; report console errors and horizontal overflow.
// usage: node scripts/check-modules.mjs S08 S09 ...   (preview must be running on :4173)
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
const SCREENS = ['why', 'intuition', 'terms', 'math', 'examples', 'widgets', 'check', 'apply', 'traps', 'explain', 'deeper', 'mastery', 'summary']
const mods = process.argv.slice(2)
const b = await chromium.launch()
let bad = 0
mkdirSync('work/screenshots/modules', { recursive: true })
for (const [w, h, tag] of [[1280, 900, 'desktop'], [375, 812, 'phone']]) {
  const page = await (await b.newContext({ viewport: { width: w, height: h } })).newPage()
  const errs = []
  page.on('pageerror', (e) => errs.push(String(e)))
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  for (const m of mods)
    for (const s of SCREENS) {
      await page.goto(`http://localhost:4173/#/learn/${m}?screen=${s}`)
      await page.waitForTimeout(s === 'widgets' ? 700 : 200)
      if (s === 'examples') for (const btn of await page.getByRole('button', { name: 'Reveal all steps' }).all()) await btn.click().catch(() => {})
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
      const katexErr = await page.locator('.katex-error').count()
      if (ov > 1 || katexErr) {
        bad++
        console.log(`${tag} ${m}/${s}: overflow ${ov}px, katex errors ${katexErr}`)
      }
      if (s === 'widgets') await page.screenshot({ path: `work/screenshots/modules/${m}-${s}-${tag}.png`, fullPage: true })
    }
  if (errs.length) {
    bad += errs.length
    console.log(tag, 'console errors:', [...new Set(errs)])
  }
}
await b.close()
console.log(bad ? `${bad} problem(s)` : `OK: ${mods.join(', ')} — all screens clean`)
