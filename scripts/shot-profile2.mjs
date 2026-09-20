import puppeteer from 'puppeteer-core'
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = await puppeteer.launch({
  executablePath: EDGE, headless: true,
  userDataDir: process.env.TEMP + '\\geo-folio-profile2',
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
    const y = sec.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: y - 40, behavior: 'auto' })
  })
  await new Promise((r) => setTimeout(r, 800))
  await page.screenshot({ path: '.screenshots/profile-v2-top.png' })
  await page.evaluate(() => {
    const sec = document.querySelector('#profile')
    window.scrollTo(0, sec.offsetTop + sec.offsetHeight - 720)
  })
  await new Promise((r) => setTimeout(r, 800))
  await page.screenshot({ path: '.screenshots/profile-v2-tools.png' })
  console.log('done')
} finally {
  await browser.close()
}
