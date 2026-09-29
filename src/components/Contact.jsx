import { useState } from 'react'
import { CONTACT_ROWS, FAQ, SITE } from '../data/content.js'

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(0)
  const [toast, setToast] = useState('')

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText('kFcVMe616')
      setToast('微信号已复制：kFcVMe616')
    } catch {
      setToast('复制失败，请手动添加：kFcVMe616')
    }
    setTimeout(() => setToast(''), 2000)
  }

  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText('1075584739@qq.com')
      setToast('邮箱已复制：1075584739@qq.com')
    } catch {
      setToast('复制失败，请手动添加：1075584739@qq.com')
    }
    setTimeout(() => setToast(''), 2000)
  }

  return (
    <section id="contact" className="scroll-mt-16 border-t border-line/60 bg-darkzone py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <p className="mono mb-5 flex items-center gap-3 text-[11px] tracking-[0.24em] text-brand" data-reveal>
          <span className="h-1.5 w-1.5 rounded-full bg-brand blink" /> 07 — CONTACT
        </p>
        <h2 className="display text-text" style={{ fontSize: 'clamp(40px,6.4vw,104px)' }} data-reveal>
          LET&rsquo;S WORK
          <br />
          TOGETHER<span className="text-brand">.</span>
        </h2>
        <p className="cn mt-5 text-[15px] text-sub" data-reveal>
          欢迎内容运营 / GEO 方向的工作机会 · {SITE.stanceCn}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div data-reveal>
            <ul className="divide-y divide-line/70 border-y border-line/70">
              <li className="flex items-center justify-between gap-4 py-4">
                <span className="mono text-[10px] tracking-[0.2em] text-mute">MAIL · 邮箱</span>
                <button
                  type="button"
                  onClick={copyMail}
                  className="cn rounded text-[14px] text-text underline-offset-4 transition-colors hover:text-brand hover:underline"
                  title="点击复制邮箱"
                >
                  1075584739@qq.com<span className="ml-1 text-brand">（点击复制）</span>
                </button>
              </li>
              <li className="flex items-center justify-between gap-4 py-4">
                <span className="mono text-[10px] tracking-[0.2em] text-mute">TEL · 电话</span>
                <a href="tel:15019181937" className="cn text-[14px] text-text underline-offset-4 hover:text-brand hover:underline">
                  15019181937
                </a>
              </li>
              <li className="flex items-center justify-between gap-4 py-4">
                <span className="mono text-[10px] tracking-[0.2em] text-mute">WECHAT · 微信</span>
                <button
                  type="button"
                  onClick={copyWechat}
                  className="cn rounded text-[14px] text-text underline-offset-4 transition-colors hover:text-brand hover:underline"
                  title="点击复制微信号"
                >
                  kFcVMe616<span className="ml-1 text-brand">（点击复制）</span>
                </button>
              </li>
              <li className="flex items-center justify-between gap-4 py-4">
                <span className="mono text-[10px] tracking-[0.2em] text-mute">BASE · 常驻</span>
                <span className="cn text-[14px] text-text">GUANGZHOU, CHINA · 广州</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              {['下载 CV（PDF）', '下载作品集（PDF）'].map((label) => (
                <button
                  key={label}
                  type="button"
                  disabled
                  title="文件待补"
                  className="group flex items-center gap-3 rounded-full border border-dashed border-line px-6 py-3 text-left opacity-70"
                >
                  <span className="cn text-[13px] text-sub">{label}</span>
                  <span className="mono text-[9px] tracking-[0.16em] text-mute">待补文件 ↓</span>
                </button>
              ))}
            </div>
            <p className="cn mt-3 text-[11px] text-mute">
              PDF 请放入「素材/07_简历与PDF/」，上线前替换为真实下载链接。
            </p>
          </div>

          <div data-reveal data-reveal-delay="0.08">
            <p className="mono mb-4 text-[10px] tracking-[0.22em] text-brand">
              FAQ · 面试高频问题（问题库）
            </p>
            <div className="space-y-2.5">
              {FAQ.map((f, i) => {
                const open = openFaq === i
                return (
                  <div
                    key={f.q}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className={`group cursor-pointer rounded-lg border bg-panel px-5 py-4 transition-colors duration-300 ${open ? 'border-brand/60' : 'border-line'}`}
                  >
                    <div className="cn flex w-full items-center justify-between gap-4 text-left text-[13.5px] font-bold text-text">
                      {f.q}
                      <span className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border bg-panel2 transition-colors duration-300 ${open ? 'border-brand bg-brand' : 'border-line'}`}>
                        <span className={`absolute h-4 w-4 rounded-full transition-all duration-300 ${open ? 'left-[26px] bg-white' : 'left-1 bg-mute'}`} />
                      </span>
                    </div>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="cn mt-3 max-w-prose text-[12.5px] leading-[1.9] text-sub">{f.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full border border-brand/60 bg-bg/95 px-5 py-2.5 text-[12px] text-text shadow-lg">
          {toast}
        </div>
      )}
    </section>
  )
}
