/**
 * 板块页头三件套：编号行（红点 + 等宽大写）→ 超大英文标题 → 中文副题 → 标签行
 * right 插槽可放右侧辅助文字（参考 f79 ARCHIVE）
 */
export default function SectionHeader({ no, code, title, cn, tags = [], right = null, dark = false }) {
  return (
    <div className="relative mb-12 md:mb-16">
      <div className="mb-5 flex items-center gap-3" data-reveal>
        <span className="h-1.5 w-1.5 rounded-full bg-brand blink" />
        <span className="mono text-[11px] tracking-[0.24em] text-brand">
          {no} — {code}
        </span>
      </div>
      <h2
        data-reveal
        className="display text-text"
        style={{ fontSize: 'clamp(42px, 5.6vw, 88px)' }}
      >
        {title}
      </h2>
      <p data-reveal className="cn mt-4 text-[15px] text-sub">
        {cn}
      </p>
      <p data-reveal className="mono mt-3 text-[10px] tracking-[0.22em] text-mute">
        {tags.join(' / ')}
      </p>
      {right && <div className="absolute right-0 top-0 hidden lg:block">{right}</div>}
    </div>
  )
}
