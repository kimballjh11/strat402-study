// Find elements that stick out past the viewport at 375px: node scripts/strat401/overflow.mjs <url>
import { chromium } from '@playwright/test'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 375, height: 812 } })
await p.goto(process.argv[2]); await p.waitForTimeout(1200)
const bad = await p.evaluate(() => {
  const out = []
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.right > window.innerWidth + 1 && !el.closest('.scroll-x')) out.push(`${el.tagName}.${el.className}`.slice(0, 120) + ` right=${Math.round(r.right)}`)
  }
  return out.slice(0, 15)
})
console.log(bad.join('\n') || 'none')
await b.close()
