import puppeteer from 'puppeteer-core'
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = await puppeteer.launch({
  executablePath: EDGE, headless: true,
  userDataDir: process.env.TEMP + '\\geo-folio-shots3',
  args: ['--no-first-run', '--disable-gpu', '--hide-scrollbars'],
})
try {
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://127.0.0.1:4173/#contact', { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 700))
  await page.evaluate(() => document.querySelector('#contact details')?.setAttribute('open', ''))
  await page.evaluate(() => document.querySelector('#contact .space-y-2\\.5')?.scrollIntoView({ block: 'center' }))
  await new Promise((r) => setTimeout(r, 400))
  await page.screenshot({ path: '.screenshots/b9-faq-open.png' })
  await page.evaluate(() => document.querySelector('#site-footer')?.scrollIntoView({ block: 'end' }))
  await new Promise((r) => setTimeout(r, 400))
  const sy = await page.evaluate(() => Math.round(window.scrollY))
  console.log('footer scrollY:', sy, 'docH:', await page.evaluate(() => document.body.scrollHeight))
  await page.screenshot({ path: '.screenshots/b8-footer.png' })
} finally {
  await browser.close()
}
