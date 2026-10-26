import { useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import { EXPERIENCE, TOOL_GROUPS } from '../data/content.js'

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
  { en: 'BUSINESS', cn: '业务能力', desc: '3C 品牌种草 + IP 0→1 孵化全流程操盘，选题策划到复盘优化闭环' },
  { en: 'PLATFORM', cn: '平台生态', desc: '抖音 / 小红书 / B站多平台矩阵分发，熟悉平台算法与信源运营，构建 GEO 布局' },
  { en: 'AI AGENT', cn: 'AI Agent', desc: 'AI Agent 工作流自动化提效，AI 文案 / 绘图 / 剪辑全链路落地应用' },
  { en: 'KNOWLEDGE', cn: '知识库搭建', desc: '飞书多维表格 + Obsidian 搭建知识库与数据中台，SOP 沉淀并持续迭代' },
]

function ToolTile({ name, slug, color, local, glyph, cardColor }) {
  const [broken, setBroken] = useState(false)
  const src = local || (slug && `https://cdn.simpleicons.org/${slug}/${color}`)
  return (
    <div
      className="tool-tile group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-[5px] hover:bg-white/[0.12] hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_24px_-10px_rgba(238,33,30,0.35)]"
      style={{ "--glow": (cardColor || color) ? `#${cardColor || color}` : "#22d3ee" }}
    >
      <span className="tip">{name}</span>
      {!src || broken ? (
        <span
          className="flex h-6 w-6 items-center justify-center rounded-lg mono text-[11px] font-bold text-white"
          style={{ background: (cardColor || color) ? `linear-gradient(135deg, #${cardColor || color}, #${cardColor || color}88)` : "#333" }}
        >
          {glyph}
        </span>
      ) : (
        <img
          src={src}
          alt={name}
          loading="lazy"
          className="h-6 w-6 rounded-[6px] object-contain opacity-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_var(--glow)]"
          onError={() => setBroken(true)}
        />
      )}
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

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
          {/* 左：形象照 + 姓名 + 核心能力 */}
          <aside data-reveal>
            <div className="group relative overflow-hidden rounded-xl border border-line bg-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_-20px_rgba(238,33,30,0.25)]">
              {/* 人像区：红色对角光晕 + 细网格 + 风格化形象照 */}
              <div
                className="relative h-60 overflow-hidden border-b border-line"
                style={{
                  background:
                    'radial-gradient(120% 120% at 15% 0%, rgba(238,33,30,0.28) 0%, rgba(238,33,30,0.04) 45%, transparent 70%), linear-gradient(135deg, #14151a 0%, #0d0e13 100%)',
                }}
              >
                {/* 底层网格 */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    maskImage: 'radial-gradient(80% 80% at 30% 20%, black, transparent)',
                  }}
                />
                {/* 照片：左移 + 轻微调色统一站点色调 */}
                <img
                  src="images/profile/portrait.webp"
                  alt="曾俊 ZENG JUN 个人形象照"
                  className="absolute inset-y-0 left-0 h-full w-full object-cover object-[36%_22%]"
                  style={{ filter: 'saturate(0.86) brightness(1.04) contrast(1.08)' }}
                  loading="lazy"
                />
                {/* 红色光晕叠加到照片（screen 混合，带氛围） */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(110% 110% at 12% 0%, rgba(238,33,30,0.32) 0%, rgba(238,33,30,0.06) 42%, transparent 68%)',
                    mixBlendMode: 'screen',
                  }}
                />
                {/* 网格覆盖照片（overlay 混合，与控件组呼应） */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.18]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    maskImage: 'radial-gradient(90% 90% at 30% 15%, black, transparent)',
                    mixBlendMode: 'overlay',
                  }}
                />
                {/* 边缘渐隐：底部 + 右侧溶入卡片背景 */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, #0d0e13 0%, rgba(13,14,19,0.45) 18%, transparent 42%), linear-gradient(to left, #0d0e13 0%, rgba(13,14,19,0.35) 14%, transparent 40%)',
                  }}
                />
                <span className="absolute left-4 top-3 mono rounded bg-black/45 px-2 py-1 text-[9px] tracking-[0.25em] text-white/90 backdrop-blur-sm">
                  PORTRAIT
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
                  仲恺农业工程学院 · 环境工程 2021–2025。专注内容运营：主导 6 个 3C 数码矩阵账号从 0→1，孵化 5 个万粉 IP，矩阵累计 1400W+ 播放；熟悉抖音 / 小红书 / B站等多平台生态；擅长用 AI + Agent + 知识库，把内容生产结构化、可规模化。
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
                    className={`exp-card relative overflow-hidden rounded-xl border transition-all duration-300 ${
                      open ? 'border-brand/50 bg-panel' : 'border-line bg-panel/60 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(238,33,30,0.5)]'
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
          <div className="flex max-w-full justify-center overflow-x-clip py-2">
            <div className="dock inline-flex max-w-full flex-wrap items-end justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              {TOOL_GROUPS.flatMap((g) => g.items).map((t) => (
                <ToolTile key={t.name} {...t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
