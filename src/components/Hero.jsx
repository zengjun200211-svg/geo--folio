import { HERO_CAPABILITIES, SITE } from '../data/content.js'

export default function Hero() {
  return (
    <section id="top" className="relative flex h-screen min-h-[700px] flex-col overflow-hidden">
      {/* 暗色工作台氛围图（AI 生成，主体为多屏数据看板；非二次元插画） */}
      <div className="absolute inset-0">
        <img
          src="/hero-workbench.jpg"
          alt="暗色多屏数据看板工作台氛围图"
          className="h-full w-full object-cover object-center opacity-55"
          loading="eager"
          fetchPriority="high"
        />
        {/* 左侧压暗给文字留呼吸区 + 底部渐变接正文 */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
      </div>

      {/* 超大红色 Portfolio 字标（与下方正文左对齐） */}
      <div className="pointer-events-none absolute inset-x-0 top-[20%] hidden md:block">
        <div className="mx-auto flex max-w-[1440px] items-start px-6 lg:px-10">
          <span
            className="font-display leading-[0.88] text-brand"
            style={{ fontSize: 'clamp(72px, 10vw, 170px)' }}
            aria-hidden="true"
          >
            Portfolio
          </span>
          <span className="ml-4 mt-3 h-[clamp(52px,6.5vw,120px)] w-px bg-brand/70" aria-hidden="true" />
        </div>
      </div>

      {/* 主内容：能力行在左下（对齐参考帧 f13），落在画面最暗区域 */}
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
                className="flex items-baseline gap-3 border-b border-line/60 pb-2.5"
              >
                <span className="mono w-44 shrink-0 text-[12px] tracking-[0.12em] text-text">
                  {en}
                </span>
                <span className="cn text-[13px] text-sub">{cn}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 底部信息行 */}
        <div className="mt-12 flex items-end justify-between gap-6">
          <div className="mono space-y-1 text-[10px] leading-relaxed tracking-[0.18em] text-mute">
            <p>
              TEL — <span className="pending">待补</span>
            </p>
            <p>
              MAIL — <span className="pending">待补</span>
            </p>
            <p>BASE — {SITE.base}</p>
          </div>

          <a href="#index" className="group flex flex-col items-center gap-2" aria-label="向下滚动到目录">
            <span className="mono text-[10px] tracking-[0.25em] text-sub transition-colors group-hover:text-brand">
              SCROLL DOWN / 向下滑动
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
