import puppeteer from 'puppeteer-core'
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = await puppeteer.launch({
  executablePath: EDGE, headless: true,
  userDataDir: process.env.TEMP + '\\geo-folio-cursor-live',
  args: ['--no-first-run', '--disable-gpu', '--hide-scrollbars'],
})
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 1200))
  // 页面内持续派发 pointermove（画圆），保证截图瞬间拖尾不淡出
  await page.evaluate(() => {
    let a = 0
    window.__stopMove = false
    window.__moveTimer = setInterval(() => {
      a += 0.12
      window.dispatchEvent(new PointerEvent('pointermove', {
        bubbles: true, pointerId: 1, pointerType: 'mouse',
        clientX: 420 + Math.cos(a) * 170,
        clientY: 470 + Math.sin(a) * 120,
      }))
    }, 16)
  })
  await new Promise((r) => setTimeout(r, 800))
  await page.screenshot({ path: '.screenshots/cursor-live.png' })
  await page.evaluate(() => clearInterval(window.__moveTimer))
  console.log('shot')
} finally {
  await browser.close()
}
