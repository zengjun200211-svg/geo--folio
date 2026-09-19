// 下半区滚动截图：node scripts/shots2.mjs
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const BASE = 'http://127.0.0.1:4173/'
const OUT = '.screenshots'

const shots = [
  ['b1-hits-panel', '#hits aside', 'center'],
  ['b2-hits-method', '#hits .mt-14', 'center'],
  ['b3-commercial-geo', '#commercial .border-2', 'center'],
  ['b4-profile-quote', '#profile blockquote', 'center'],
  ['b5-geo-flow', '#geo-lab .grid.grid-cols-2', 'center'],
  ['b6-geo-stance', '#geo-lab blockquote', 'center'],
  ['b7-contact-faq', '#contact details', 'center'],
  ['b8-footer', '#site-footer', 'center'],
]

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  userDataDir: process.env.TEMP + '\\geo-folio-shots2',
  args: ['--no-first-run', '--disable-gpu', '--hide-scrollbars'],
})
try {
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.setViewport({ width: 1440, height: 900 })
  const hashBySel = {}
  for (const [name, sel] of shots) hashBySel[name] = sel

  const groups = [
    ['hits', ['b1-hits-panel', 'b2-hits-method']],
    ['commercial', ['b3-commercial-geo']],
    ['profile', ['b4-profile-quote']],
    ['geo-lab', ['b5-geo-flow', 'b6-geo-stance']],
    ['contact', ['b7-contact-faq', 'b8-footer']],
  ]
  for (const [hash, names] of groups) {
    await page.goto(BASE + '#' + hash, { waitUntil: 'load' })
    await new Promise((r) => setTimeout(r, 600))
    for (const name of names) {
      const sel = hashBySel[name]
      await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), sel)
      await new Promise((r) => setTimeout(r, 400))
      await page.screenshot({ path: `${OUT}/${name}.png` })
      console.log('shot', name)
    }
  }

  // 展开第一条 FAQ 再截一张
  await page.evaluate(() => document.querySelector('#contact details')?.setAttribute('open', ''))
  await new Promise((r) => setTimeout(r, 300))
  await page.screenshot({ path: `${OUT}/b9-faq-open.png` })
  console.log('shot b9-faq-open')
} finally {
  await browser.close()
}
