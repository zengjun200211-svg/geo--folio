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

const CORE_SKILLS = [
  { en: 'BUSINESS', cn: '业务能力', desc: '品牌种草+IP孵化全流程操盘' },
  { en: 'PLATFORM', cn: '平台生态', desc: '多平台分发与信源运营' },
  { en: 'AI AGENT', cn: 'AI Agent', desc: '工作流自动化与提效' },
  { en: 'KNOWLEDGE', cn: '知识库搭建', desc: '知识沉淀、结构化以及自我更新迭代' },
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
          {/* 左：形象照 + 姓名 + 核心能力 */}
          <aside data-reveal>
            <div className="group relative overflow-hidden rounded-xl border border-line bg-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_-20px_rgba(238,33,30,0.25)]">
              {/* 人像区：红色对角光晕 + 细网格 */}
              <div
                className="relative flex h-44 items-center justify-center overflow-hidden border-b border-line"
                style={{
                  background:
                    'radial-gradient(120% 120% at 15% 0%, rgba(238,33,30,0.28) 0%, rgba(238,33,30,0.04) 45%, transparent 70%), linear-gradient(135deg, #14151a 0%, #0d0e13 100%)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    maskImage: 'radial-gradient(80% 80% at 30% 20%, black, transparent)',
                  }}
                />
                <svg
                  className="h-16 w-16 text-mute/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
                </svg>
                <span className="absolute left-4 top-3 mono text-[9px] tracking-[0.25em] text-mute">
                  PORTRAIT
                </span>
                <span className="absolute bottom-3 right-4 cn rounded border border-line/70 bg-bg/70 px-2 py-0.5 text-[10px] text-mute backdrop-blur-sm">
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
              {/* 核心能力 */}
              <div className="border-t border-line/70 px-6 py-5">
                <p className="mono mb-3 text-[9px] tracking-[0.25em] text-mute">
                  CORE SKILLS / 核心能力
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {CORE_SKILLS.map((s) => (
                    <div
                      key={s.en}
                      className="group/skill rounded-lg border border-line/70 bg-panel2 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-[#1a1416] hover:shadow-[0_8px_20px_-8px_rgba(238,33,30,0.4)]"
                    >
                      <p className="mono text-[9px] tracking-[0.18em] text-brand">{s.en}</p>
                      <p className="cn mt-0.5 text-[13px] font-bold text-text">{s.cn}</p>
                      <p className="cn mt-0.5 text-[10.5px] leading-snug text-mute">{s.desc}</p>
                    </div>
                  ))}
                </div>
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
                        <span className="mono block text-[11px] tracking-[0.18em] text-sub">
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
