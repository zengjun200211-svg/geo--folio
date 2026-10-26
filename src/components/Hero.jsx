import { HERO_CAPABILITIES, SITE } from '../data/content.js'
import PatternWaves from './PatternWaves.jsx'

export default function Hero() {
  return (
    <section id="top" className="relative flex h-screen min-h-[700px] flex-col overflow-hidden">
      {/* 点阵波浪背景 */}
      <PatternWaves
        preset="silk"
        color="#EE211E"
        backgroundColor="rgba(10,10,12,0)"
        opacity={0.85}
        spacing={9}
        speed={0.3}
        interactive={true}
        cursorSize={80}
        cursorStrength={0.7}
        fade="edges"
        fadeSize={0.4}
      />

      {/* 超大红色 Portfolio 字标 */}
      <div className="pointer-events-none absolute inset-x-0 top-[15%] md:top-[20%]">
        <div className="mx-auto flex max-w-[1440px] items-start px-6 lg:px-10">
          <span
            className="font-display leading-[0.88] text-brand hero-float"
            style={{ fontSize: 'clamp(48px, 10vw, 170px)' }}
            aria-hidden="true"
          >
            Portfolio
          </span>
          <span className="ml-4 mt-3 hidden h-[clamp(52px,6.5vw,120px)] w-px bg-brand/70 md:block" aria-hidden="true" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-6 pb-24 pt-28 lg:px-10">
        <div className="w-full max-w-md">
          <p className="label label-red mb-6" data-reveal>
            PORTFOLIO BY {SITE.authorEn} {SITE.authorCn} · {SITE.year}
          </p>
          <h1 className="sr-only">
            曾俊 ZENG JUN · GEO 方向作品集 —— 让好内容，被 AI 看见
          </h1>
          <ul className="max-w-md">
            {HERO_CAPABILITIES.map(([en, cn], i) => (
              <li
                key={en}
                data-reveal
                style={{ '--reveal-delay': `${0.06 * i}s` }}
                className="hero-cap-row flex cursor-default items-baseline gap-3 border-b border-line/60 pb-2.5"
              >
                <span className="cap-en mono w-44 shrink-0 text-[12px] tracking-[0.12em] text-text transition-colors">
                  {en}
                </span>
                <span className="cn text-[13px] text-sub">{cn}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex items-end justify-between gap-6">
          <div className="mono space-y-1 rounded-lg border border-white/5 bg-bg/55 px-3 py-2 text-[10px] leading-relaxed tracking-[0.18em] text-sub shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <p>TEL — <a href="tel:15019181937" className="hover:text-brand">15019181937</a></p>
            <p>MAIL — <a href="mailto:1075584739@qq.com" className="hover:text-brand">1075584739@qq.com</a></p>
            <p>BASE — {SITE.base}</p>
          </div>

          <a href="#index" className="group flex flex-col items-center gap-2" aria-label="向下滚动到目录">
            <span className="mono text-[10px] tracking-[0.25em] text-sub transition-colors group-hover:text-brand hero-pulse">
              SCROLL DOWN<span className="hidden sm:inline"> / 向下滑动</span>
            </span>
            <span className="h-9 w-px bg-line">
              <span className="scroll-line block h-full w-px bg-brand" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
