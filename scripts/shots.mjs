// 桌面端截图自检脚本：node scripts/shots.mjs
// 用本机 Edge（Chromium）无头模式按 1440×900 逐板块截图，输出到 .screenshots/
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const BASE = 'http://127.0.0.1:4173/'
const OUT = '.screenshots'

const TARGETS = [
  ['01-hero', ''],
  ['02-index', '#index'],
  ['03-profile', '#profile'],
  ['04-hits', '#hits'],
  ['05-commercial', '#commercial'],
  ['06-ai-workflow', '#ai-workflow'],
  ['07-data-ops', '#data-ops'],
  ['08-geo-lab', '#geo-lab'],
  ['09-contact', '#contact'],
]

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  userDataDir: process.env.TEMP + '\\geo-folio-shots',
  args: ['--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars'],
})
try {
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })

  for (const [name, hash] of TARGETS) {
    await page.goto(BASE + hash, { waitUntil: 'load', timeout: 30000 })
    await new Promise((r) => setTimeout(r, 1200))
    await page.screenshot({ path: `${OUT}/${name}.png` })
    console.log('shot', name)
  }

  // 整页长图
  await page.goto(BASE, { waitUntil: 'load', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 1500))
  await page.screenshot({ path: `${OUT}/00-full.png`, fullPage: true })
  console.log('shot 00-full')
} finally {
  await browser.close()
}
