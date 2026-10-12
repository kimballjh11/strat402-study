// Screenshot helper: node scripts/shoot.mjs <baseUrl> <outDir> <path1> <path2> ...
// Captures each hash path at 1280px and 375px, reports console errors and horizontal overflow.
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const [base, out, ...paths] = process.argv.slice(2)
mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
let problems = 0
for (const [w, h, tag] of [[1280, 900, 'desktop'], [375, 812, 'phone']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: tag === 'phone' ? 2 : 1 })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  for (const p of paths) {
    const [route, action] = p.split('|')
    await page.goto(`${base}/#${route}`)
    await page.waitForTimeout(400)
    if (action) {
      for (const a of action.split(';')) {
        const [verb, arg] = a.split(':')
        if (verb === 'click') await page.click(arg)
        if (verb === 'scroll') await page.evaluate((y) => window.scrollTo(0, Number(y)), arg)
        if (verb === 'dark') await page.evaluate(() => document.documentElement.classList.add('dark'))
        await page.waitForTimeout(250)
      }
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    const name = `${tag}-${route.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home'}${action ? '-' + action.replace(/[^a-z0-9]+/gi, '_').slice(0, 30) : ''}.png`
    await page.screenshot({ path: `${out}/${name}`, fullPage: false })
    if (overflow > 1) {
      problems++
      console.log(`OVERFLOW ${overflow}px ${tag} ${p}`)
    }
  }
  if (errors.length) {
    problems += errors.length
    console.log(`CONSOLE ERRORS (${tag}):\n` + [...new Set(errors)].join('\n'))
  }
  await ctx.close()
}
await browser.close()
console.log(problems ? `${problems} problem(s)` : 'OK: no console errors, no horizontal overflow')
