// Interaction pass + checkpoint screenshots against a running preview (default http://localhost:4173).
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
const B = (process.argv[2] ?? 'http://localhost:4173') + '/#'
const out = process.argv[3] ?? 'work/screenshots/checkpoint2'
mkdirSync(out, { recursive: true })
const b = await chromium.launch()
const errors = []
async function ctx(w, h, s) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: s })
  const p = await c.newPage()
  p.on('pageerror', (e) => errors.push(String(e)))
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  return p
}
const btn = (scope, name) => scope.getByRole('button', { name, exact: true })

let p = await ctx(1280, 900, 1)
// 1. worked example stepped through
await p.goto(B + '/learn/S08?screen=examples')
await p.waitForTimeout(500)
for (let i = 0; i < 4; i++) {
  await btn(p, 'Show step').first().click()
  await p.waitForTimeout(100)
}
await p.screenshot({ path: `${out}/1-desktop-worked-example.png` })
// 2. MCQ answered (wrong on purpose) → per-option explanations
await p.goto(B + '/learn/S08?screen=check')
await p.waitForTimeout(400)
const card = p.locator('[data-testid=mcq]').first()
await card.locator('.opt').nth(3).click()
await btn(card, 'Check').click()
await p.waitForTimeout(200)
await card.locator('text=Not quite.').scrollIntoViewIfNeeded()
await p.evaluate(() => scrollBy(0, -250))
await p.screenshot({ path: `${out}/2-desktop-mcq-feedback.png` })
// 3. apply problem checked + steps
await p.goto(B + '/learn/S08?screen=apply')
await p.waitForTimeout(400)
const prob = p.locator('[data-testid=problem]').first()
const inputs = prob.locator('input')
for (let i = 0; i < (await inputs.count()); i++) await inputs.nth(i).fill('-0.5')
await btn(prob, 'Check').click()
await btn(prob, 'Show step-by-step').click()
await p.waitForTimeout(200)
await prob.scrollIntoViewIfNeeded()
await p.screenshot({ path: `${out}/3-desktop-apply-steps.png` })
// mastery check end-to-end
await p.goto(B + '/learn/S08?screen=mastery')
await p.waitForTimeout(300)
await p.click('[data-testid=start-mastery]')
await p.waitForTimeout(300)
for (let i = 0; i < 9; i++) {
  const opt = p.locator('[data-testid=mcq] .opt').first()
  if (await opt.count()) await opt.click()
  const nx = btn(p, 'Next →')
  if (await nx.isEnabled()) await nx.click()
}
await p.click('[data-testid=submit-quiz]')
await p.waitForTimeout(400)
const res = await p.locator('[data-testid=quiz-results] p').first().innerText()
await p.screenshot({ path: `${out}/6-desktop-mastery-results.png` })

// 4. phone: explorer
p = await ctx(375, 812, 2)
await p.goto(B + '/learn/S08?screen=widgets')
await p.waitForTimeout(600)
await p.locator('[data-testid=elasticity-explorer] svg').first().scrollIntoViewIfNeeded()
await p.evaluate(() => scrollBy(0, 140))
await p.screenshot({ path: `${out}/4-phone-elasticity-explorer.png` })
// 5. phone dark: CQ retake with professor feedback
await p.evaluate(() => localStorage.setItem('strat402-theme', 'dark'))
await p.goto(B + '/quizzes?q=4')
await p.reload()
await p.waitForTimeout(400)
await p.locator('.opt').nth(1).click()
await btn(p, 'Check').click()
await p.waitForTimeout(200)
await p.evaluate(() => scrollBy(0, 330))
await p.screenshot({ path: `${out}/5-phone-dark-quiz-retake.png` })
// flashcards flip via Space
await p.goto(B + '/flashcards')
await p.waitForTimeout(300)
await p.keyboard.press('Space')
await p.waitForTimeout(150)
const flipped = await p.locator('text=Knew it').count()
console.log({ mastery: res, flipped, errors })
await b.close()
