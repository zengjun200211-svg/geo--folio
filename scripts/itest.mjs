// 交互自检：node scripts/itest.mjs
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const BASE = 'http://127.0.0.1:4173/'
const OUT = '.screenshots'

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  userDataDir: process.env.TEMP + '\\geo-folio-itest',
  args: ['--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars'],
})
const errors = []
try {
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.setViewport({ width: 1440, height: 900 })
  page.on('console', (m) => m.type() === 'error' && errors.push('console: ' + m.text()))
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))

  await page.goto(BASE, { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 800))
  const heroIndicator = await page.$eval('body', () => {
    const el = [...document.querySelectorAll('div,span')].find((n) => /\/\s*09$/.test(n.textContent.trim()) && n.textContent.trim().length < 10)
    return el ? el.textContent.trim() : null
  })
  console.log('hero page indicator:', heroIndicator)
  await page.screenshot({ path: `${OUT}/i1-hero.png` })

  // INDEX 默认扇形
  await page.goto(BASE + '#index', { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 700))
  await page.screenshot({ path: `${OUT}/i2-index-default.png` })

  // 点第 6 个圆点 → 06 居中
  const dots = await page.$$('#index .mt-2 button')
  console.log('dots:', dots.length)
  await dots[5].click()
  await new Promise((r) => setTimeout(r, 600))
  await page.screenshot({ path: `${OUT}/i3-index-dot6.png` })

  // 点击居中卡片（DOM 级）→ 跳转 #geo-lab
  const clickedHash = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#index [role="link"]')]
    const target = cards.find((c) => c.getAttribute('aria-label')?.startsWith('06'))
    target && target.click()
    return target ? 'found' : 'missing'
  })
  await new Promise((r) => setTimeout(r, 900))
  const geoTop = await page.evaluate(() => Math.round(document.getElementById('geo-lab').getBoundingClientRect().top))
  console.log('center card:', clickedHash, '→ hash:', page.url().split('#')[1] || '(top)', 'geo-lab top:', geoTop)

  // 02 HITS：切到操盘账号 Tab
  await page.goto(BASE + '#hits', { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 700))
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent.includes('MANAGED ACCOUNTS'))
    b && b.click()
  })
  await new Promise((r) => setTimeout(r, 500))
  const viewing = await page.evaluate(() => document.body.textContent.includes('H-05'))
  console.log('managed tab shows H-05:', viewing)
  await page.evaluate(() => document.querySelector('#hits .grid')?.scrollIntoView({ block: 'center' }))
  await new Promise((r) => setTimeout(r, 500))
  await page.screenshot({ path: `${OUT}/i4-hits-managed.png` })

  // 横滑行滚轮测试（不报错即可）
  await page.evaluate(() => {
    const el = document.querySelector('#hits .hscroll')
    el.dispatchEvent(new WheelEvent('wheel', { deltaY: 300, bubbles: true, cancelable: true }))
  })
  await new Promise((r) => setTimeout(r, 300))

  console.log('JS errors:', errors.length ? errors : 'none')
} finally {
  await browser.close()
}
