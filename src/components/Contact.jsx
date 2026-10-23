import { useState } from 'react'
import { CONTACT_ROWS, FAQ, SITE } from '../data/content.js'

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(-1)
  const [toast, setToast] = useState('')

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(ta)
        return ok
      } catch {
        return false
      }
    }
  }

  const copyWechat = async () => {
    const ok = await copyText('kFcVMe616')
    setToast(ok ? '微信号已复制：kFcVMe616' : '复制失败，请手动添加：kFcVMe616')
    setTimeout(() => setToast(''), 2000)
  }

  const copyMail = async () => {
    const ok = await copyText('1075584739@qq.com')
    setToast(ok ? '邮箱已复制：1075584739@qq.com' : '复制失败，请手动添加：1075584739@qq.com')
    setTimeout(() => setToast(''), 2000)
  }

  const copyTel = async () => {
    const ok = await copyText('15019181937')
    setToast(ok ? '电话号码已复制：15019181937' : '复制失败，请手动拨打：15019181937')
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
                <button
                  type="button"
                  onClick={copyTel}
                  className="cn rounded text-[14px] text-text underline-offset-4 transition-colors hover:text-brand hover:underline"
                  title="点击复制电话号码"
                >
                  15019181937<span className="ml-1 text-brand">（点击复制）</span>
                </button>
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
              <a
                href={`${import.meta.env.BASE_URL}files/resume-zengjun.pdf`}
                download="曾俊-个人简历.pdf"
                className="group flex items-center gap-3 rounded-full border border-brand/50 bg-brand/10 px-6 py-3 text-left transition-colors hover:border-brand hover:bg-brand/20"
              >
                <span className="cn text-[13px] text-text">下载 CV（PDF）</span>
                <span className="mono text-[9px] tracking-[0.16em] text-brand">↓</span>
              </a>
              <a
                href={`${import.meta.env.BASE_URL}files/portfolio-matrix-h1.pptx`}
                download="矩阵账号孵化H1季度复盘.pptx"
                className="group flex items-center gap-3 rounded-full border border-brand/50 bg-brand/10 px-6 py-3 text-left transition-colors hover:border-brand hover:bg-brand/20"
              >
                <span className="cn text-[13px] text-text">作品集 · 账号孵化 H1 复盘</span>
                <span className="mono text-[9px] tracking-[0.16em] text-brand">PPT ↓</span>
              </a>
              <a
                href={`${import.meta.env.BASE_URL}files/portfolio-geo-v6.pptx`}
                download="GEO认知与执行-曾俊-优化版v6.pptx"
                className="group flex items-center gap-3 rounded-full border border-brand/50 bg-brand/10 px-6 py-3 text-left transition-colors hover:border-brand hover:bg-brand/20"
              >
                <span className="cn text-[13px] text-text">作品集 · GEO 认知与执行</span>
                <span className="mono text-[9px] tracking-[0.16em] text-brand">PPT ↓</span>
              </a>
              <a
                href={`${import.meta.env.BASE_URL}files/portfolio-personal.pptx`}
                download="矩阵运营个人作品集_曾俊 更新版.pptx"
                className="group flex items-center gap-3 rounded-full border border-brand/50 bg-brand/10 px-6 py-3 text-left transition-colors hover:border-brand hover:bg-brand/20"
              >
                <span className="cn text-[13px] text-text">作品集 · 矩阵运营个人能力</span>
                <span className="mono text-[9px] tracking-[0.16em] text-brand">PPT ↓</span>
              </a>
            </div>
            <p className="cn mt-3 text-[11px] text-mute">
              三份作品集 PPT 可直接下载：账号孵化季度复盘 / GEO 认知与执行 / 矩阵运营个人能力。
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
