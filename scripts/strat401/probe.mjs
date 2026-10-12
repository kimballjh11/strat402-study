import { chromium } from '@playwright/test'
const url = process.argv[2]
const b = await chromium.launch(); const p = await b.newPage()
p.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', m.text()))
p.on('pageerror', (e) => console.log('PAGEERR', String(e)))
await p.goto(url); await p.waitForTimeout(1500)
console.log((await p.locator('body').innerText()).slice(0, 1500))
await b.close()
