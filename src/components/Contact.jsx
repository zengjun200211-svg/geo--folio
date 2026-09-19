import { CONTACT_ROWS, FAQ, SITE } from '../data/content.js'

export default function Contact() {
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

        <div className="mt-12 grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* 联系方式 */}
          <div data-reveal>
            <ul className="divide-y divide-line/70 border-y border-line/70">
              {CONTACT_ROWS.map(([en, cn, v]) => (
                <li key={en} className="flex items-center justify-between gap-4 py-4">
                  <span className="mono text-[10px] tracking-[0.2em] text-mute">
                    {en} · {cn}
                  </span>
                  <span className="cn text-[14px] text-text">{v || <span className="pending">待补</span>}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              {['下载 CV（PDF）', '下载作品集（PDF）'].map((label) => (
                <button
                  key={label}
                  type="button"
                  disabled
                  title="文件待补：放入 素材/07_简历与PDF/ 后启用"
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

          {/* FAQ（问题库思路组织，同时供 AI 抽取） */}
          <div data-reveal data-reveal-delay="0.08">
            <p className="mono mb-4 text-[10px] tracking-[0.22em] text-brand">
              FAQ · 面试高频问题（问题库）
            </p>
            <div className="space-y-2.5">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-lg border border-line bg-panel px-5 py-4 [&[open]]:border-brand/60"
                >
                  <summary className="cn flex cursor-pointer list-none items-center justify-between gap-4 text-[13.5px] font-bold text-text marker:hidden">
                    {f.q}
                    <span className="mono shrink-0 text-brand transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="cn mt-3 text-[12.5px] leading-[1.9] text-sub">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
