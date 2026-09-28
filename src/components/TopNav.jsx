import { useEffect, useRef, useState } from 'react'
import { NAV, SITE } from '../data/content.js'

export default function TopNav() {
  const [active, setActive] = useState('top')
  const [soundOn, setSoundOn] = useState(false)
  const listRef = useRef(null)
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const ids = ['top', 'index', ...NAV.map((n) => n.id).slice(1), 'contact']
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const movePill = (e) => {
    const li = e.currentTarget
    const rect = li.getBoundingClientRect()
    const parentRect = listRef.current.getBoundingClientRect()
    setPill({
      left: rect.left - parentRect.left - 6,
      width: rect.width + 12,
      opacity: 1,
    })
  }
  const hidePill = () => setPill((p) => ({ ...p, opacity: 0 }))

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-line/70 bg-bg/75 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-[1440px] items-center gap-6 px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="回到首页">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-display text-[15px] text-white">
            {SITE.brand}
          </span>
          <span className="hidden lg:block">
            <span className="label block leading-tight">GEO FOLIO</span>
            <span className="mono block text-[9px] tracking-[0.25em] text-mute">
              PORTFOLIO / {SITE.year}
            </span>
          </span>
        </a>

        <ul
          ref={listRef}
          className="relative ml-4 hidden flex-1 items-center gap-4 md:flex lg:gap-5"
          onMouseLeave={hidePill}
        >
          {/* Jelly pill */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 h-8 -translate-y-1/2 rounded-full border border-brand/30 bg-brand/10"
            style={{
              left: pill.left,
              width: pill.width,
              opacity: pill.opacity,
              transition:
                'left 0.45s cubic-bezier(0.34,1.56,0.64,1), width 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
            }}
          />
          {NAV.map((n) => (
            <li key={n.id} className="relative z-10" onMouseEnter={movePill}>
              <a
                href={`#${n.id}`}
                className={`mono block px-1 py-2 text-[11px] tracking-[0.14em] transition-colors ${
                  active === n.id ? 'text-brand' : 'text-sub hover:text-text'
                }`}
              >
                {active === n.id && (
                  <span className="mr-1 inline-block h-1 w-1 rounded-full bg-brand align-middle" />
                )}
                {n.en}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end gap-4 md:flex-none">
          <button
            type="button"
            onClick={() => setSoundOn((v) => !v)}
            className="mono hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[10px] tracking-[0.18em] text-sub transition-colors hover:border-brand hover:text-text sm:flex"
            aria-pressed={soundOn}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${soundOn ? 'bg-brand blink' : 'bg-mute'}`} />
            SOUND {soundOn ? 'ON' : 'OFF'}
          </button>
          <a
            href="#contact"
            className="rounded-full bg-brand px-5 py-2 font-heading text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-hover"
          >
            CONTACT <span className="ml-0.5">›</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
