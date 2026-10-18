/**
 * End-to-end: the Learn scroll, a mastery check, a full practice exam, quiz retake,
 * diagnostic, and progress export/import — at 1280px and 375px. Zero console errors, no horizontal scroll.
 */
import { expect, test, type Page } from '@playwright/test'
import { mkdirSync, readFileSync } from 'node:fs'

const MODULES = ['S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10', 'S11']
const SHOTS = 'work/screenshots/e2e'
mkdirSync(SHOTS, { recursive: true })

function watch(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  return errors
}
async function noOverflow(page: Page, where: string) {
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(ov, `horizontal overflow on ${where}`).toBeLessThanOrEqual(1)
}

test('learn is one scroll, without the group project', async ({ page }, info) => {
  const errors = watch(page)
  await page.goto('/#/learn')
  await expect(page.getByRole('heading', { level: 1, name: 'Learn' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Home', exact: true })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Group Project', exact: true })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Course Introduction', exact: true })).toHaveCount(0)
  for (const m of MODULES) await expect(page.getByTestId(`session-${m}`)).toBeAttached()
  await expect(page.locator('.katex-error')).toHaveCount(0)
  await page.goto('/#/learn/S08?screen=widgets')
  await expect(page.getByTestId('screen-S08-widgets')).toBeInViewport()
  await expect(page.getByText('Loading interactive…')).toHaveCount(0, { timeout: 10_000 })
  await page.goto('/#/formulas')
  await expect(page.getByText('Participation and project grade')).toHaveCount(0)
  await page.screenshot({ path: `${SHOTS}/${info.project.name}-learn.png` })
  await noOverflow(page, 'formulas')
  expect(errors, errors.join('\n')).toEqual([])
})

test('mastery check end-to-end (S10)', async ({ page }) => {
  const errors = watch(page)
  await page.goto('/#/learn/S10?screen=mastery')
  const mastery = page.getByTestId('screen-S10-mastery')
  await mastery.getByTestId('start-mastery-S10').click()
  for (let i = 0; i < 9; i++) {
    const opt = mastery.locator('[data-testid=mcq] .opt').first()
    if (await opt.count()) await opt.click()
    const inp = mastery.locator('[data-testid=problem] input').first()
    if (await inp.count()) await inp.fill('1')
    const next = mastery.getByRole('button', { name: 'Next →' })
    if (await next.isEnabled()) await next.click()
  }
  await mastery.getByTestId('submit-quiz').click()
  await expect(page.getByTestId('quiz-results')).toBeVisible()
  expect(errors).toEqual([])
})

test('full practice exam (30 MC + 6 SA, flag, submit, results)', async ({ page }, info) => {
  const errors = watch(page)
  await page.goto('/#/exam')
  await page.getByTestId('start-exam').click()
  await expect(page.getByTestId('timer')).toBeVisible()
  for (let i = 0; i < 36; i++) {
    const opt = page.locator('[data-testid=mcq] .opt').nth(i % 2)
    if (await opt.count()) await opt.click()
    const inp = page.locator('[data-testid=problem] input').first()
    if (await inp.count()) await inp.fill('0.5')
    if (i === 3) await page.getByRole('button', { name: /Flag for review/ }).click()
    // in exam mode: no feedback shown
    await expect(page.getByText('Not quite.')).toHaveCount(0)
    const next = page.getByRole('button', { name: 'Next →' })
    if (await next.isEnabled()) await next.click()
  }
  await page.getByTestId('submit-quiz').click()
  await expect(page.getByTestId('quiz-results')).toBeVisible()
  await expect(page.getByText(/By learning objective/)).toBeVisible()
  await page.screenshot({ path: `${SHOTS}/${info.project.name}-exam-results.png` })
  expect(errors).toEqual([])
})

test('diagnostic', async ({ page }) => {
  const errors = watch(page)
  await page.goto('/#/exam?mode=diagnostic')
  await page.getByTestId('start-diagnostic').click()
  await page.getByTestId('submit-quiz').click()
  await expect(page.getByTestId('quiz-results')).toBeVisible()
  expect(errors).toEqual([])
})

test('quiz retake with professor feedback (all four CQs)', async ({ page }) => {
  const errors = watch(page)
  for (const n of [1, 3, 4, 5]) {
    await page.goto(`/#/quizzes?q=${n}`)
    const q = page.getByTestId('cq-question')
    await q.locator('.opt').first().click()
    await q.getByRole('button', { name: 'Check' }).click()
    await expect(page.getByText(/Professor.s explanation/)).toBeVisible()
    await noOverflow(page, `CQ${n}`)
  }
  expect(errors).toEqual([])
})

test('practice: MC keyboard + calculation check', async ({ page }) => {
  const errors = watch(page)
  await page.goto('/#/practice')
  await page.getByRole('button', { name: 'Concepts' }).click()
  await page.locator('[data-testid=mcq]').focus()
  await page.keyboard.press('1')
  await page.keyboard.press('Enter')
  await expect(page.getByText(/Correct\.|Not quite\./).first()).toBeVisible()
  await page.getByRole('button', { name: 'Calculations' }).click()
  await page.locator('[data-testid=problem] input').first().fill('1')
  await page.locator('[data-testid=problem]').getByRole('button', { name: 'Check' }).click()
  await page.locator('[data-testid=problem]').getByRole('button', { name: /step-by-step/ }).click()
  expect(errors).toEqual([])
})

test('export and import progress round-trip', async ({ page }) => {
  const errors = watch(page)
  await page.goto('/#/practice')
  await page.getByRole('button', { name: 'Concepts' }).click()
  await page.locator('[data-testid=mcq]').focus()
  await page.keyboard.press('1')
  await page.keyboard.press('Enter')
  await page.goto('/#/settings')
  const [dl] = await Promise.all([page.waitForEvent('download'), page.getByTestId('export').click()])
  const path = await dl.path()
  const json = JSON.parse(readFileSync(path!, 'utf8'))
  expect(json.app).toBe('strat402')
  expect(Object.keys(json.progress.answers).length).toBeGreaterThan(0)
  await page.getByLabel(/Type RESET/).fill('RESET')
  await page.getByRole('button', { name: 'Erase' }).click()
  expect(await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('strat402-progress-v1') || '{}').answers ?? {}).length)).toBe(0)
  await page.getByTestId('import-file').setInputFiles(path!)
  await expect(page.getByText('Progress imported.')).toBeVisible()
  expect(await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('strat402-progress-v1') || '{}').answers ?? {}).length)).toBeGreaterThan(0)
  expect(errors).toEqual([])
})

test('core pages render without errors or overflow', async ({ page }, info) => {
  const errors = watch(page)
  for (const p of ['/', '/learn', '/practice', '/quizzes', '/exam', '/formulas', '/formulas?tab=drill', '/excel', '/settings', '/plan', '/more']) {
    await page.goto('/#' + p)
    await page.waitForTimeout(150)
    await noOverflow(page, p)
    await page.screenshot({ path: `${SHOTS}/${info.project.name}-page${p.replace(/[^a-z]+/gi, '_')}.png` })
  }
  // dark mode readable
  await page.evaluate(() => localStorage.setItem('strat402-theme', 'dark'))
  await page.goto('/#/learn/S08?screen=widgets')
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.screenshot({ path: `${SHOTS}/${info.project.name}-dark-S08.png` })
  expect(errors).toEqual([])
})

test('keyboard: skip link and visible focus', async ({ page }) => {
  await page.goto('/#/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle)
  expect(outline).not.toBe('none')
})
