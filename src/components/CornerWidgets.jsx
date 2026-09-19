import { useEffect, useState } from 'react'
import { NAV, SITE } from '../data/content.js'

/** 左下路由面包屑 + 右下悬浮按钮组（回顶 / 页码） */
export default function CornerWidgets() {
  const [active, setActive] = useState('top')
  const [showTop, setShowTop] = useState(false)

  const order = ['top', 'index', ...NAV.slice(1).map((n) => n.id), 'contact']

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    order.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const pageNo = String(order.indexOf(active) + 1).padStart(2, '0')
  const pageTotal = String(order.length).padStart(2, '0')
  const activeNav = NAV.find((n) => n.id === active)

  return (
    <>
      {/* 左下路由面包屑 */}
      <div className="pointer-events-none fixed bottom-5 left-6 z-40 hidden md:block">
        <p className="mono text-[10px] tracking-[0.2em] text-mute">
          {SITE.brand} / <span className="text-sub">{activeNav ? activeNav.en : active === 'contact' ? 'CONTACT' : 'HERO'}</span>
        </p>
      </div>

      {/* 右下按钮组 */}
      <div className="fixed bottom-5 right-6 z-40 flex flex-col items-end gap-2">
        <span className="mono hidden rounded-full border border-line bg-bg/70 px-3 py-1 text-[10px] tracking-[0.2em] text-mute backdrop-blur sm:block">
          {pageNo} / {pageTotal}
        </span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="回到顶部"
          className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-panel/80 text-sub backdrop-blur transition-all hover:border-brand hover:text-brand ${
            showTop ? 'opacity-100' : 'pointer-events-none opacity-30'
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M7.5 12V3M2.5 7.5L7.5 2.5L12.5 7.5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>
    </>
  )
}
