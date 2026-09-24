import { useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import ViewFrame from './ViewFrame.jsx'
import { COMMERCIAL_CASES, INTERNSHIP } from '../data/content.js'

const SOURCE_MAP = [
  ['百家号', '文心一言'],
  ['今日头条', '豆包'],
  ['公众号', '元宝'],
  ['搜狐 / 网易', '通义、DeepSeek'],
]

function CaseDetail({ item }) {
  if (!item.title) {
    return (
      <div className="placeholder-box flex h-full min-h-[420px] flex-col items-center justify-center gap-3 rounded-lg p-10 text-center">
        <span className="font-display text-[40px] text-mute">{item.code}</span>
        <p className="cn text-[13px] text-mute">
          其他商单项目 · 按「客户 + 我的角色 + 动作 + 结果」补充
        </p>
        <p className="mono text-[10px] tracking-[0.18em] text-mute">
          CLIENT / ROLE / ACTION / RESULT · 【待补】
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-lg border border-line bg-paper p-7 text-ink md:p-10">
      <p className="mono text-[10px] tracking-[0.22em] text-brand">{item.code} · COMMERCIAL CASE</p>
      <h3 className="cn mt-3 text-[24px] font-bold leading-snug md:text-[30px]">{item.title}</h3>

      <div className="mt-7 grid gap-7 md:grid-cols-2">
        <div>
          <p className="mono mb-2 text-[10px] tracking-[0.2em] text-ink/50">ROLE / 我的角色</p>
          <p className="cn text-[14px] font-bold">{item.role}</p>
        </div>
        <div>
          <p className="mono mb-2 text-[10px] tracking-[0.2em] text-ink/50">RESULT / 结果数据</p>
          <p className="cn text-[14px]">
            <span className="text-ink/40">【发布篇数 / 阅读 / 播放等，待用户提供】</span>
          </p>
        </div>
      </div>

      <div className="mt-7">
        <p className="mono mb-3 text-[10px] tracking-[0.2em] text-ink/50">ACTIONS / 我的动作</p>
        <ul className="space-y-2">
          {item.actions.map((a) => (
            <li key={a} className="cn flex gap-3 text-[13.5px] leading-relaxed text-ink/85">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
              {a}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7">
        <p className="mono mb-3 text-[10px] tracking-[0.2em] text-ink/50">
          DISTRIBUTION CHANNELS / 发布平台
        </p>
        <div className="flex flex-wrap gap-2">
          {item.sources.map((s) => (
            <span
              key={s}
              className="cn rounded-full border border-ink/25 px-3 py-1 text-[11px] text-ink/80"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* GEO 注解：平台 → 大模型信源 */}
      <div className="mt-8 rounded-lg border-2 border-brand bg-white/60 p-5">
        <p className="mono mb-3 text-[10px] tracking-[0.22em] text-brand">
          GEO NOTE · 为什么这些平台重要
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {SOURCE_MAP.map(([src, model]) => (
            <div key={src} className="flex items-center gap-2 cn text-[12.5px] text-ink/85">
              <span className="font-bold">{src}</span>
              <span className="mono text-[12px] text-ink/40">→</span>
              <span>{model}</span>
            </div>
          ))}
        </div>
        <p className="cn mt-3 text-[11.5px] leading-relaxed text-ink/60">{item.geoNote}</p>
      </div>
    </div>
  )
}

export default function Commercial() {
  const [sel, setSel] = useState(0)
  return (
    <section id="commercial" className="scroll-mt-16 border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionHeader
          no="03"
          code="COMMERCIAL"
          title="COMMERCIAL PROJECTS"
          cn="商单项目 · 多平台分发"
          tags={['BRIEF', 'DELIVERY', 'DISTRIBUTION']}
        />

        <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* 档案列表（参考 f56） */}
          <div data-reveal>
            <div className="overflow-hidden rounded-xl border border-line bg-panel">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="mono text-[10px] tracking-[0.2em] text-sub">企业档案 ARCHIVE</span>
                <span className="mono text-[10px] text-mute">{String(COMMERCIAL_CASES.length).padStart(2, '0')} 份</span>
              </div>
              {COMMERCIAL_CASES.map((c, i) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSel(i)}
                  className={`relative flex w-full items-center gap-4 border-b border-line/60 px-5 py-4 text-left transition-colors last:border-b-0 ${
                    sel === i ? 'bg-panel2' : 'hover:bg-panel2/60'
                  }`}
                >
                  {sel === i && <span className="absolute left-0 top-0 h-full w-[3px] bg-brand" />}
                  <span className="mono text-[11px] tracking-[0.1em] text-brand">{c.code}</span>
                  <span className="cn flex-1 text-[13px] font-bold text-text">
                    {c.title || '【待补：其他商单项目】'}
                  </span>
                  <span className="mono text-[12px] text-mute">›</span>
                </button>
              ))}
            </div>

            {/* 实习矩阵小卡 */}
            <div className="mt-6 rounded-xl border border-line bg-panel p-5">
              <p className="mono text-[10px] tracking-[0.2em] text-brand">INTERNSHIP · 实习矩阵</p>
              <p className="cn mt-2 text-[14px] font-bold text-text">{INTERNSHIP.title}</p>
              <ul className="mt-3 space-y-2">
                {INTERNSHIP.lines.map((l) => (
                  <li key={l} className="cn flex gap-2.5 text-[11.5px] leading-relaxed text-sub">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand/70" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右侧详情大内容区 */}
          <div data-reveal data-reveal-delay="0.06">
            <div className="relative">
              <ViewFrame on />
              <CaseDetail item={COMMERCIAL_CASES[sel]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
