import { useRef, useState, useEffect } from 'react'
import SectionHeader from './SectionHeader.jsx'
import ViewFrame from './ViewFrame.jsx'
import {
  HIT_GROUPS,
  HIT_STATS,
  HIT_TABS,
  METHOD_TAGS_DEMO,
} from '../data/content.js'

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
      <ViewFrame className={selected ? 'is-on' : 'auto'} />
      {/* 封面区 */}
      <div className="placeholder-box relative flex h-[268px] flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <span className="font-display text-[40px] leading-none text-brand">{item.code.slice(2)}</span>
          <span
            className="mono text-[9px] tracking-[0.2em] text-mute"
            style={{ writingMode: 'vertical-rl' }}
          >
            SHORT VIDEO / HOOK
          </span>
        </div>
        <div className="text-center">
          <p className="mono text-[10px] tracking-[0.18em] text-sub">
            {item.account || '【待补：操盘账号名】'}
          </p>
          <p className="cn mt-2 text-[12px] text-mute">视频封面 / 原片 · 【待补】</p>
        </div>
      </div>
      {/* 信息区 */}
      <div className="border-t border-line p-3.5">
        <p className="cn truncate text-[13px] font-bold text-text">
          <Pending>待补：视频标题</Pending>
        </p>
        <p className="mono mt-1.5 text-[9px] tracking-[0.14em] text-mute">
          {item.code} · PLAY/LIKE/GAIN 【待补】
        </p>
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
  const [tab, setTab] = useState('own')
  const [sel, setSel] = useState({ own: 0, managed: 0 })
  const scrollRef = useRef(null)

  const items = HIT_GROUPS[tab]
  const current = items[sel[tab]] ?? items[0]

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
      e.preventDefault()
    }
    el.addEventListener('wheel', handler, { passive: false })
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

        {/* 数据汇总大卡（数字严格按口径红线） */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4" data-reveal>
          {HIT_STATS.map((s) => (
            <div key={s.en} className="group bg-panel p-6 transition-colors hover:bg-panel2">
              <p className="font-display text-[30px] leading-tight text-text md:text-[34px]">
                {s.num}
              </p>
              <p className="mono mt-1 text-[9px] tracking-[0.18em] text-brand">{s.en}</p>
              <p className="cn mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-sub">
                <span className="cn mr-1 rounded bg-line px-1 py-px text-[9px] tracking-[0.1em] text-mute">
                  口径
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
              onClick={() => setTab(t.id)}
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

        {/* 编号项目卡 + 右侧选中大图（参考 f54） */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div
            ref={scrollRef}
            onWheel={onWheel}
            className="hscroll drag-scroll flex cursor-grab gap-4 overflow-x-auto pb-5 active:cursor-grabbing"
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
            {/* 空位提示卡 */}
            <div className="placeholder-box flex h-[384px] w-[180px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl p-4 text-center">
              <span className="mono text-[9px] tracking-[0.2em] text-mute">MORE HITS</span>
              <span className="cn text-[11px] leading-relaxed text-mute">
                每个账号补 3-8 条最能打的视频
                <br />
                （见 03 素材清单）
              </span>
            </div>
          </div>

          {/* 右侧选中详情 */}
          <aside className="h-fit max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-line bg-panel p-5 lg:sticky lg:top-24" data-reveal>
            <div className="mb-4 flex items-center justify-between">
              <span className="mono flex items-center gap-2 text-[10px] tracking-[0.2em] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand blink" /> NOW VIEWING
              </span>
              <span className="mono text-[10px] tracking-[0.2em] text-mute">{current.code}</span>
            </div>

            <div className="placeholder-box relative aspect-[4/3] overflow-hidden rounded-lg">
              <ViewFrame on />
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <span className="mono text-[10px] tracking-[0.2em] text-sub">SELECTED PREVIEW</span>
                <span className="cn text-[12px] text-mute">竖版封面 / 内嵌播放器 · 【待补素材】</span>
              </div>
              <span className="absolute bottom-3 left-3 mono text-[9px] tracking-[0.16em] text-brand">
                | {current.code}
              </span>
            </div>

            <h3 className="cn mt-4 text-[15px] font-bold text-text">
              <Pending>待补：视频标题</Pending>
            </h3>

            <div className="mt-3">
              <SpecRow k="平台 / 账号" v={current.account} />
              <SpecRow k="发布时间" v={current.date} />
              <SpecRow k="播放" v={current.plays} />
              <SpecRow k="点赞" v={current.likes} />
              <SpecRow k="评论" v={current.comments} />
              <SpecRow k="涨粉" v={current.follows} />
              <SpecRow k="我负责的环节" v={current.role} />
              <SpecRow k="一句话爆点" v={current.hook} />
            </div>

            <div className="mt-4">
              <p className="mono mb-2 text-[9px] tracking-[0.2em] text-mute">
                METHOD TAGS · 方法论标签（示例，按实际替换）
              </p>
              <div className="flex flex-wrap gap-2">
                {METHOD_TAGS_DEMO.map((t) => (
                  <span
                    key={t}
                    className="cn rounded-full border border-line px-3 py-1 text-[11px] text-sub"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
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
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="placeholder-box flex items-center gap-3 rounded-lg p-4"
              >
                <span className="font-display text-[20px] text-brand">{String(n).padStart(2, '0')}</span>
                <span className="cn text-[12px] text-mute">
                  <Pending>待补：从个人 SOP 摘第 {n} 条方法论</Pending>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
