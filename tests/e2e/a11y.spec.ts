/** Accessibility: axe scan (WCAG 2 A/AA) of key pages in light and dark themes. */
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const PAGES = ['/', '/learn', '/practice', '/quizzes?q=3', '/exam', '/formulas', '/excel', '/settings', '/plan']

for (const theme of ['light', 'dark']) {
  test(`axe: no serious/critical violations (${theme})`, async ({ page }) => {
    await page.addInitScript((t) => localStorage.setItem('strat402-theme', t), theme)
    const report: string[] = []
    for (const p of PAGES) {
      await page.goto('/#' + p)
      await page.waitForTimeout(300)
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).exclude('.katex').analyze()
      for (const v of r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical'))
        report.push(`${p} [${v.id}] ${v.help}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)
    }
    expect(report, report.join('\n')).toEqual([])
  })
}
