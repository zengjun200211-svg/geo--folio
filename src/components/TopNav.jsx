import { useEffect, useState } from 'react'
import { NAV, SITE } from '../data/content.js'

export default function TopNav() {
  const [active, setActive] = useState('top')
  const [soundOn, setSoundOn] = useState(false)

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-line/70 bg-bg/75 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-[1440px] items-center gap-6 px-6 lg:px-10">
        {/* 角标 */}
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

        {/* 中部导航 */}
        <ul className="ml-4 hidden flex-1 items-center gap-5 xl:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`mono text-[11px] tracking-[0.14em] transition-colors ${
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

        <div className="flex flex-1 items-center justify-end gap-4 xl:flex-none">
          {/* SOUND 开关（第一版仅视觉态，音效后补） */}
          <button
            type="button"
            onClick={() => setSoundOn((v) => !v)}
            className="mono hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[10px] tracking-[0.18em] text-sub transition-colors hover:border-brand hover:text-text sm:flex"
            aria-pressed={soundOn}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${soundOn ? 'bg-brand blink' : 'bg-mute'}`} />
            SOUND {soundOn ? 'ON' : 'OFF'}
          </button>
          {/* CONTACT */}
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
