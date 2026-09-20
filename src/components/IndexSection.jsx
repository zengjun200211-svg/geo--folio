import { useRef, useState } from 'react'
import { INDEX_CARDS } from '../data/content.js'

const STEP = 150 // 拖动多少 px 切换一张

function Card({ card, isActive, tone }) {
  const paper = tone === 'paper'
  return (
    <article
      className={`relative flex h-[420px] w-[272px] select-none flex-col rounded-[18px] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${
        paper ? 'bg-paper text-ink' : 'bg-brand text-paper'
      }`}
    >
      {/* 装订孔（参考实体卡） */}
      <span
        className={`absolute right-3 top-[38%] h-2 w-2 rounded-full border ${
          paper ? 'border-ink/50 bg-ink/10' : 'border-paper/60 bg-paper/15'
        }`}
      />
      <span
        className={`absolute right-3 top-[60%] h-2 w-2 rounded-full border ${
          paper ? 'border-ink/50 bg-ink/10' : 'border-paper/60 bg-paper/15'
        }`}
      />

      <header className="flex items-start justify-between">
        <span className="font-display text-[62px] leading-none text-ink">{card.no}</span>
        <span
          className={`mono mt-1 text-[9px] tracking-[0.2em] ${
            paper ? 'text-ink/45' : 'text-paper/70'
          }`}
        >
          CONTENT×GEO
          <br />
          PORTFOLIO / 2026
        </span>
      </header>

      <h3 className="mt-4 font-heading text-[21px] font-black leading-[1.08] tracking-tight text-ink">
        {card.en.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>
      <p
        className={`cn mt-2 text-[15px] leading-snug ${
          paper ? 'text-ink/60' : 'text-paper/90'
        }`}
      >
        {card.cn}
      </p>

      {/* 卡面缩略区：素材未提交，显式占位 */}
      <div
        className={`placeholder-box mt-4 flex flex-1 flex-col items-center justify-center gap-1.5 rounded-lg p-3 text-center ${
          paper ? 'dark-on-paper' : ''
        }`}
      >
        <span
          className={`mono text-[9px] tracking-[0.18em] ${
            paper ? 'text-ink/50' : 'text-paper/80'
          }`}
        >
          {card.thumbEn}
        </span>
        <span className={`cn text-[11px] ${paper ? 'text-ink/45' : 'text-paper/65'}`}>
          {card.thumbCn} · 【待补】
        </span>
      </div>

      <footer
        className={`mono mt-4 flex items-center justify-between text-[9px] tracking-[0.2em] ${
          paper ? 'text-ink/50' : 'text-paper/75'
        }`}
      >
        <span>{card.foot}</span>
        <span
          className={`transition-opacity duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0'
          } ${paper ? 'text-brand' : 'text-paper'}`}
        >
          点击进入 →
        </span>
      </footer>
    </article>
  )
}

export default function IndexSection() {
  const [active, setActive] = useState(2) // 默认居中 03，六张卡均衡露出（样板 02 可点圆点/卡片进入）
  const [dragging, setDragging] = useState(false)
  const [live, setLive] = useState(0)
  const stageRef = useRef(null)
  const startX = useRef(0)
  const committed = useRef(0)
  const moved = useRef(false)
  const activeRef = useRef(active)
  activeRef.current = active

  const go = (i) => setActive(Math.max(0, Math.min(INDEX_CARDS.length - 1, i)))

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    stageRef.current.setPointerCapture(e.pointerId)
    startX.current = e.clientX
    committed.current = 0
    moved.current = false
    setDragging(true)
    setLive(0)
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    const raw = e.clientX - startX.current
    if (Math.abs(raw) > 8) moved.current = true
    let next = activeRef.current
    let c = committed.current
    // 向左拖（raw 为负）→ 下一张
    while (raw - c <= -STEP) {
      c -= STEP
      next += 1
    }
    while (raw - c >= STEP) {
      c += STEP
      next -= 1
    }
    next = Math.max(0, Math.min(INDEX_CARDS.length - 1, next))
    if (next !== activeRef.current) {
      committed.current = c
      setActive(next)
    }
    setLive(raw - c)
  }

  const endDrag = (e) => {
    if (!dragging) return
    setDragging(false)
    setLive(0)
    try {
      stageRef.current.releasePointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
  }

  const enter = (id) => {
    if (moved.current) return
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') go(active - 1)
    if (e.key === 'ArrowRight') go(active + 1)
  }

  return (
    <section id="index" className="relative min-h-screen overflow-hidden py-24 md:py-28">
      {/* 右侧竖排文案 */}
      <div className="pointer-events-none absolute right-8 top-32 z-10 hidden flex-col items-center gap-5 xl:flex">
        <span
          className="mono text-[10px] tracking-[0.3em] text-mute"
          style={{ writingMode: 'vertical-rl' }}
        >
          MAKE CONTENT VISIBLE · IN THE AI ERA
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line mono text-[9px] tracking-[0.15em] text-sub">
          GEO
          <br />
          2026
        </span>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* 页头 */}
        <div className="flex flex-wrap items-end gap-x-10 gap-y-4" data-reveal>
          <h2 className="display text-text" style={{ fontSize: 'clamp(72px,10vw,148px)' }}>
            INDEX
          </h2>
          <div className="pb-3">
            <p className="cn text-[26px] font-bold text-text">系统目录</p>
            <p className="mono mt-1 text-[11px] tracking-[0.22em] text-sub">/ SYSTEM DIRECTORY</p>
            <p className="mono mt-1 text-[10px] tracking-[0.22em] text-mute">
              PORTFOLIO NAVIGATION 2026
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3" data-reveal>
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span className="mono text-[10px] tracking-[0.28em] text-mute">
            CONTENT · HITS · DATA · AI · GEO
          </span>
        </div>

        {/* 卡片舞台 */}
        <div
          ref={stageRef}
          tabIndex={0}
          role="group"
          aria-label="系统目录卡片，左右拖动或方向键切换，回车进入板块"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKey}
          className="relative mt-6 h-[500px] touch-pan-y outline-none"
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        >
          {INDEX_CARDS.map((card, i) => {
            const offset = i - active
            const abs = Math.abs(offset)
            const x = offset * 186 + (dragging ? live : 0)
            const rot = Math.max(-26, Math.min(26, offset * 7 + (dragging ? live / 26 : 0)))
            const y = abs * 26
            const scale = offset === 0 ? 1 : 0.9
            return (
              <div
                key={card.no}
                className="absolute left-1/2 top-1/2"
                onPointerEnter={() => !dragging && setActive(i)}
                onClick={() => enter(card.id)}
                role="link"
                aria-label={`${card.no} ${card.en.join(' ')} ${card.cn}`}
                style={{
                  transform: `translate(-50%,-50%) translateX(${x}px) translateY(${y}px) rotate(${rot}deg) scale(${scale})`,
                  zIndex: 100 - abs,
                  opacity: abs > 3 ? 0 : 1,
                  transition: dragging
                    ? 'none'
                    : 'transform .45s cubic-bezier(.16,1,.3,1), opacity .3s ease-out',
                  pointerEvents: abs > 3 ? 'none' : 'auto',
                  cursor: 'pointer',
                }}
              >
                <Card card={card} tone={card.tone} isActive={offset === 0} />
              </div>
            )
          })}

          {/* 红色拉线装饰（指向当前卡，呼应案例光标拉线） */}
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-6 h-16 w-full"
            viewBox="0 0 1000 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 500 0 Q 500 60 500 70"
              stroke="#EE211E"
              strokeWidth="1.4"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* 分页圆点 */}
        <div className="mt-2 flex items-center justify-center gap-2.5">
          {INDEX_CARDS.map((c, i) => (
            <button
              key={c.no}
              type="button"
              aria-label={`切换到第 ${c.no} 张卡片`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-brand' : 'w-2 bg-line hover:bg-sub'
              }`}
            />
          ))}
        </div>
        <p className="mono mt-5 text-center text-[10px] tracking-[0.2em] text-mute">
          按住鼠标左右拖动 / 移到卡片上让它弹出摆正 / 点击进入对应板块
        </p>
      </div>
    </section>
  )
}
