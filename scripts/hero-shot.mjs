import puppeteer from 'puppeteer-core'
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = await puppeteer.launch({
  executablePath: EDGE, headless: true,
  userDataDir: process.env.TEMP + '\\geo-folio-hero',
  args: ['--no-first-run', '--disable-gpu', '--hide-scrollbars'],
})
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 1500))
  await page.screenshot({ path: '.screenshots/hero-portfolio.png' })
  console.log('shot')
} finally {
  await browser.close()
}
