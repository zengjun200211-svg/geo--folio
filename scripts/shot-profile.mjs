import puppeteer from 'puppeteer-core'
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = await puppeteer.launch({
  executablePath: EDGE, headless: true,
  userDataDir: process.env.TEMP + '\\geo-folio-profile',
  args: ['--no-first-run', '--disable-gpu', '--hide-scrollbars'],
})
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 1200))
  await page.evaluate(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none' })
    const sec = document.querySelector('#profile')
    window.scrollTo(0, sec.offsetTop + sec.offsetHeight - 760)
  })
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: '.screenshots/profile-tools.png' })
  console.log('shot2')
} finally {
  await browser.close()
}
