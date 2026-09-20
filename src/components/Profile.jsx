import { useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import { EXPERIENCE, TOOLS } from '../data/content.js'

const TOOL_GRADIENTS = [
  ['#FF6A64', '#A78BFA'],
  ['#67E8F9', '#A78BFA'],
  ['#FFB86B', '#FF6A64'],
  ['#7EE787', '#67E8F9'],
  ['#A78BFA', '#FF6A64'],
  ['#FFD166', '#FF6A64'],
  ['#67E8F9', '#7EE787'],
  ['#FF6A64', '#FFD166'],
  ['#A78BFA', '#67E8F9'],
  ['#7EE787', '#FFD166'],
]

function ToolTile({ name, slug, glyph, gradient }) {
  const [broken, setBroken] = useState(false)
  return (
    <div
      title={name}
      className="group flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 hover:-translate-y-1"
      style={{
        backgroundImage: `linear-gradient(#121319, #121319) padding-box, linear-gradient(135deg, ${gradient[0]}, ${gradient[1]}) border-box`,
        border: '1px solid transparent',
      }}
    >
      <span className="flex h-9 w-9 items-center justify-center transition-transform duration-300 group-hover:scale-125">
        {!broken ? (
          <img
            src={`https://cdn.simpleicons.org/${slug}/e6e6e6`}
            alt={name}
            loading="lazy"
            className="h-9 w-9"
            onError={() => setBroken(true)}
          />
        ) : (
          <span className="mono text-[12px] font-bold text-text">{glyph}</span>
        )}
      </span>
    </div>
  )
}

export default function Profile() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="profile" className="scroll-mt-16 border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionHeader
          no="01"
          code="PROFILE"
          title="PROFILE / EXPERIENCE"
          cn="关于我 · 从内容运营到 GEO 的能力地图"
          tags={['CONTENT OPS', 'HIT-MAKING', 'DATA', 'AI', 'GEO']}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
          {/* 左：形象照 + 姓名合并卡片 */}
          <aside data-reveal>
            <div className="group relative overflow-hidden rounded-xl border border-line bg-panel transition-colors duration-300 hover:border-brand/50">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-line bg-gradient-to-br from-panel2 to-panel">
                <svg
                  className="h-20 w-20 text-mute/50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
                </svg>
                <span className="absolute left-4 top-4 mono text-[9px] tracking-[0.25em] text-mute">
                  PORTRAIT
                </span>
                <span className="absolute bottom-4 right-4 cn rounded border border-line/70 bg-bg/70 px-2 py-1 text-[10px] text-mute">
                  【待补：个人形象照】
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[22px] leading-tight text-text">
                  曾俊 <span className="text-mute">ZENG JUN</span>
                </h3>
                <p className="mono mt-1.5 text-[10px] tracking-[0.2em] text-sub">
                  CONTENT OPS <span className="text-brand">→</span> GEO
                </p>
                <p className="cn mt-3 text-[12.5px] leading-[1.9] text-sub">
                  仲恺农业工程学院 · 环境工程 2021–2025。让好内容，被 AI 看见。
                </p>
              </div>
            </div>
          </aside>

          {/* 右：任职经历手风琴 */}
          <div data-reveal data-reveal-delay="0.08">
            <p className="mono mb-3 flex items-center gap-2 text-[10px] tracking-[0.22em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> WORK EXPERIENCE / 任职经历（点击模块展开）
            </p>

            <div className="space-y-3">
              {EXPERIENCE.map((exp, i) => {
                const open = openIdx === i
                return (
                  <div
                    key={exp.company}
                    className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                      open ? 'border-brand/50 bg-panel' : 'border-line bg-panel/60 hover:border-line/80'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx(open ? -1 : i)}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6"
                      aria-expanded={open}
                    >
                      <span className="flex-1 min-w-0">
                        <span className="mono block text-[9px] tracking-[0.2em] text-mute">
                          {String(i + 1).padStart(2, '0')} · {exp.dept} · {exp.period}
                        </span>
                        <span className="cn mt-1 block text-[15px] font-bold text-text">
                          {exp.company}
                        </span>
                        <span className="cn mt-0.5 block text-[11px] text-sub">{exp.role}</span>
                      </span>
                      {/* iOS 风胶囊开关 */}
                      <span
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 ${
                          open ? 'bg-brand' : 'bg-panel2 border border-line'
                        }`}
                        aria-hidden="true"
                      >
                        <span
                          className={`absolute h-4 w-4 rounded-full transition-all duration-300 ${
                            open ? 'left-[26px] bg-white' : 'left-1 bg-mute'
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <div className="mx-4 mb-4 rounded-lg border border-line/60 bg-bg/40 p-4 md:p-5">
                          <ul className="cn space-y-2 text-[12.5px] leading-[1.85] text-sub">
                            {exp.points.map((pt) => (
                              <li key={pt} className="flex gap-2">
                                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand/70" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-2 border-t border-line/60 pt-3">
                            {exp.keywords.map((k) => (
                              <span
                                key={k}
                                className="cn rounded-full border border-line bg-panel2 px-2.5 py-0.5 text-[11px] text-text"
                              >
                                {k}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 常用工具墙：纯图标一排，悬停放大 */}
        <div className="mt-14" data-reveal>
          <p className="mono mb-6 text-center text-[10px] tracking-[0.22em] text-brand">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" /> DAILY TOOLS / 我常用的工具 <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />
          </p>
          <div className="marquee relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee-track flex w-max gap-4">
              {[...TOOLS, ...TOOLS].map((t, i) => (
                <ToolTile
                  key={`${t.name}-${i}`}
                  {...t}
                  gradient={TOOL_GRADIENTS[i % TOOL_GRADIENTS.length]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
