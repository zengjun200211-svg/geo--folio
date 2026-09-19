// 移动端宽度巡检（桌面端优先，仅确认不破版）：node scripts/mshots.mjs
import puppeteer from 'puppeteer-core'
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = await puppeteer.launch({
  executablePath: EDGE, headless: true,
  userDataDir: process.env.TEMP + '\\geo-folio-mshots',
  args: ['--no-first-run', '--disable-gpu', '--hide-scrollbars'],
})
try {
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.setViewport({ width: 430, height: 900, isMobile: true, hasTouch: true })
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 700))
  await page.screenshot({ path: '.screenshots/m1-hero.png' })
  await page.goto('http://127.0.0.1:4173/#index', { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 700))
  await page.screenshot({ path: '.screenshots/m2-index.png' })
  await page.goto('http://127.0.0.1:4173/#hits', { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 700))
  await page.screenshot({ path: '.screenshots/m3-hits.png' })
  console.log('mobile shots done')
} finally {
  await browser.close()
}
