import { useRef, useState, useEffect, useMemo } from 'react'
import SectionHeader from './SectionHeader.jsx'
import ViewFrame from './ViewFrame.jsx'
import CircularCarousel from './CircularCarousel.jsx'
import {
  HIT_GROUPS,
  HIT_STATS,
  HIT_TABS,
} from '../data/content.js'

const METHOD_STEPS = [
  '前3秒钩子定生死：开头直接抛冲突/反常识结论/高收益承诺，3秒内留人再进正文',
  '热点借势快半拍：蹭热榜/热梗要在48小时内出片，用自己账号视角二次解读而非硬贴',
  '选题-脚本-钩子三件套：先定一句话爆点，再倒推脚本结构，钩子重复3次强化记忆点',
  '数据复盘闭环：24小时看完播/5s留存/转评赞，低完播改前3秒，低互动改结尾CTA',
]

function Pending({ children = '待补' }) {
  return <span className="pending">{children}</span>
}

function HitCard({ item, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative h-[384px] w-[230px] shrink-0 overflow-hidden rounded-xl border bg-panel2 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand ${
        selected ? 'border-brand' : 'border-line'
      }`}
      aria-pressed={selected}
    >
      {/* 封面区 */}
      <div className="relative h-[268px] overflow-hidden">
        <img
          src={item.cover}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute right-2 top-2 rounded bg-black/50 px-1.5 py-0.5 backdrop-blur-sm">
          <span className="mono text-[9px] tracking-[0.1em] text-white/90">{item.code}</span>
        </div>
        {/* 播放按钮 */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        )}
      </div>
      {/* 信息区 */}
      <div className="border-t border-line p-3.5">
        <p className="cn truncate text-[13px] font-bold text-text">{item.title}</p>
        <p className="mono mt-1.5 text-[9px] tracking-[0.14em] text-mute">{item.code} · {item.account}</p>
      </div>
    </button>
  )
}

function SpecRow({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/50 py-2">
      <span className="mono shrink-0 text-[10px] tracking-[0.16em] text-mute">{k}</span>
      <span className="cn text-right text-[12px] text-text">
        {v ? v : <Pending />}
      </span>
    </div>
  )
}

export default function ContentHits() {
  const [tab, setTab] = useState('managed')
  const [account, setAccount] = useState(null)
  const [sel, setSel] = useState({ own: 0, managed: 0 })
  const scrollRef = useRef(null)

  const allItems = HIT_GROUPS[tab]
  const items = account ? allItems.filter((it) => it.account === account) : allItems
  const current = items[sel[tab]] ?? items[0] ?? null

  // 所有账号列表
  const accountList = useMemo(() => {
    const map = {}
    allItems.forEach((it) => { map[it.account] = (map[it.account] || 0) + 1 })
    return Object.entries(map)
  }, [allItems])

  const onWheel = (e) => {
    const el = scrollRef.current
    if (!el) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
      el.scrollLeft += e.deltaY
      e.preventDefault()
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let raf = null, hovering = false, mx = 0
    const onMove = (e) => { hovering = true; mx = e.clientX }
    const onLeave = () => { hovering = false }
    const loop = () => {
      if (hovering) {
        const rect = el.getBoundingClientRect()
        const edge = 140
        const x = mx - rect.left
        if (x < edge) el.scrollLeft -= (edge - x) / 5
        else if (x > rect.width - edge) el.scrollLeft += (x - (rect.width - edge)) / 5
      }
      raf = requestAnimationFrame(loop)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [tab])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = (e) => {
      if (el.scrollWidth <= el.clientWidth) return
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const atStart = el.scrollLeft <= 0
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return
      el.scrollLeft += e.deltaY
      e.preventDefault()
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [tab])

  return (
    <section id="hits" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionHeader
          no="02"
          code="CONTENT HITS"
          title="CONTENT HITS"
          cn="爆款内容 · 自有账号与操盘账号"
          tags={['SHORT VIDEO', 'HOOK', 'MATRIX']}
          right={
            <div className="text-right">
              <p className="mono text-[10px] tracking-[0.25em] text-mute">ARCHIVE</p>
              <p className="mono mt-1 text-[10px] tracking-[0.25em] text-sub">
                THE MOVING IMAGINATION
                <br />
                IN CONTENT ERA
              </p>
            </div>
          }
        />

        {/* 数据汇总大卡 */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4" data-reveal>
          {HIT_STATS.map((s) => (
            <div key={s.en} className="group bg-panel p-6 transition-colors hover:bg-panel2">
              <p className="font-display text-[30px] leading-tight text-text md:text-[34px]">
                {s.num}
              </p>
              <p className="mono mt-1 text-[9px] tracking-[0.18em] text-brand">{s.en}</p>
              <p className="cn mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-sub">
                <span className="cn mr-1 rounded bg-line px-1 py-px text-[9px] tracking-[0.1em] text-mute">
                  说明
                </span>
                {s.note}
              </p>
            </div>
          ))}
        </div>

        {/* 分类 Tab */}
        <div className="mt-12 flex flex-wrap gap-3" data-reveal>
          {HIT_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTab(t.id); setAccount(null) }}
              className={`rounded-full border px-5 py-2 transition-all duration-200 ${
                tab === t.id
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-panel text-sub hover:border-sub hover:text-text'
              }`}
            >
              <span className="cn text-[12px]">{t.cn}</span>
              <span className="mono ml-2 text-[9px] tracking-[0.16em] opacity-80">{t.en}</span>
            </button>
          ))}
        </div>

        {/* 账号筛选（仅多账号时显示） */}
        {allItems.length > 0 && accountList.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2" data-reveal>
          <button
            type="button"
            onClick={() => setAccount(null)}
            className={`rounded-full border px-3 py-1.5 text-[11px] transition-all ${
              !account ? 'border-brand bg-brand/20 text-brand' : 'border-line bg-panel text-sub hover:text-text'
            }`}
          >
            全部 <span className="mono ml-1 text-[9px] opacity-60">{allItems.length}</span>
          </button>
          {accountList.map(([name, count]) => (
            <button
              key={name}
              type="button"
              onClick={() => setAccount(name === account ? null : name)}
              className={`rounded-full border px-3 py-1.5 text-[11px] transition-all ${
                account === name ? 'border-brand bg-brand/20 text-brand' : 'border-line bg-panel text-sub hover:text-text'
              }`}
            >
              {name} <span className="mono ml-1 text-[9px] opacity-60">{count}</span>
            </button>
          ))}
        </div>
        )}
        <p className="mono mt-10 mb-4 text-[9px] tracking-[0.2em] text-mute" data-reveal>
          CLICK COVER ▶ TO PLAY ON DOUYIN · 点击卡片封面播放按钮，跳转抖音查看原视频
        </p>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div
            ref={scrollRef}
            onWheel={onWheel}
            className="hscroll flex gap-4 overflow-x-auto pb-5"
            data-reveal
          >
            {items.map((item, i) => (
              <HitCard
                key={item.code}
                item={item}
                selected={sel[tab] === i}
                onSelect={() => setSel((s) => ({ ...s, [tab]: i }))}
              />
            ))}
          </div>

          <aside className="h-fit max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-line bg-panel p-5 lg:sticky lg:top-24" data-reveal>
            {current ? (
            <>
            <div className="mb-4 flex items-center justify-between">
              <span className="mono flex items-center gap-2 text-[10px] tracking-[0.2em] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand blink" /> NOW VIEWING
              </span>
              <span className="mono text-[10px] tracking-[0.2em] text-mute">{current.code}</span>
            </div>

            <h3 className="cn text-[15px] font-bold text-text">{current.title}</h3>

            <div className="mt-3">
              <SpecRow k="平台 / 账号" v={current.account} />
              <SpecRow k="发布时间" v={current.date} />
              <SpecRow k="播放" v={current.plays} />
              <SpecRow k="点赞" v={current.likes} />
              <SpecRow k="评论" v={current.comments} />
              <SpecRow k="收藏" v={current.collects} />
              <SpecRow k="转发" v={current.shares} />
              <SpecRow k="我负责的环节" v={current.role} />
            </div>

            <div className="mt-4">
              {current.link ? (
                <a
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-brand/40 bg-brand/10 px-4 py-3 transition-colors hover:bg-brand/20"
                >
                  <span className="cn text-[12px] font-bold text-brand">▶ 观看原视频</span>
                  <span className="mono text-[10px] tracking-[0.16em] text-brand/80">DOUYIN ↗</span>
                </a>
              ) : (
                <div className="flex items-center justify-between rounded-lg border border-line/60 bg-panel px-4 py-3">
                  <span className="cn text-[12px] text-sub">▶ 观看原视频</span>
                  <span className="cn text-[10px] text-mute">
                    <Pending />
                  </span>
                </div>
              )}
            </div>
            </>
            ) : (
              <p className="cn text-[12px] text-mute">暂无作品</p>
            )}
          </aside>
        </div>

        {/* 方法论条 */}
        <div className="mt-14 grid gap-6 rounded-xl border border-line bg-darkzone p-6 md:grid-cols-[260px_minmax(0,1fr)] md:p-8" data-reveal>
          <div>
            <p className="mono text-[10px] tracking-[0.22em] text-brand">METHOD / PLAYBOOK</p>
            <h3 className="cn mt-3 text-[20px] font-bold leading-snug text-text">
              「热点＋钩子」
              <br />
              爆款方法论
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {METHOD_STEPS.map((text, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-line/60 bg-panel/60 p-4 transition-colors hover:border-brand/50"
              >
                <span className="font-display text-[20px] leading-none text-brand">{String(i + 1).padStart(2, '0')}</span>
                <span className="cn text-[12.5px] leading-relaxed text-sub">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
