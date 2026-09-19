import SectionHeader from './SectionHeader.jsx'
import { CAPABILITY_MAP, PROFILE_BLOCKS, PROFILE_QUOTE } from '../data/content.js'

export default function Profile() {
  return (
    <section id="profile" className="scroll-mt-16 border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionHeader
          no="01"
          code="PROFILE"
          title="PROFILE / EXPERIENCE"
          cn="关于我 · 从内容运营到 GEO 的能力地图"
          tags={['CONTENT OPS', 'HIT-MAKING', 'DATA', 'AI', 'GEO']}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* 自我介绍（50 秒版，可直接上墙） */}
          <article className="rounded-xl border border-line bg-panel p-7 md:p-9" data-reveal>
            <p className="mono mb-6 flex items-center gap-2 text-[10px] tracking-[0.22em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> ABOUT ME 关于我
            </p>
            <div className="space-y-7">
              {PROFILE_BLOCKS.map((b) => (
                <div key={b.tag}>
                  <p className="mono mb-2 text-[9px] tracking-[0.2em] text-mute">{b.tag}</p>
                  <p
                    className="cn text-[13.5px] leading-[1.9] text-sub"
                    dangerouslySetInnerHTML={{
                      __html: b.html.replace(/<b>/g, '<b class="text-text font-bold">'),
                    }}
                  />
                </div>
              ))}
            </div>
          </article>

          {/* 可迁移能力映射表（本板块核心卡片） */}
          <article className="rounded-xl border border-line bg-panel p-7 md:p-9" data-reveal data-reveal-delay="0.08">
            <div className="mb-6 flex items-center justify-between">
              <p className="mono text-[10px] tracking-[0.22em] text-brand">
                SKILL TRANSFER MAP / 可迁移能力映射
              </p>
              <p className="mono text-[9px] tracking-[0.2em] text-mute">CONTENT → GEO</p>
            </div>
            <div className="overflow-hidden rounded-lg border border-line">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-panel2">
                    <th className="cn px-4 py-3 text-[11px] font-bold text-text">我的经历</th>
                    <th className="cn px-4 py-3 text-[11px] font-bold text-brand">
                      对应 GEO 岗位能力
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CAPABILITY_MAP.map(([from, to], i) => (
                    <tr
                      key={from}
                      className={`align-top ${i !== CAPABILITY_MAP.length - 1 ? 'border-t border-line/60' : 'border-t border-line/60'}`}
                    >
                      <td className="cn px-4 py-3.5 text-[12px] leading-relaxed text-sub">
                        <span className="mono mr-2 text-[9px] text-mute">{String(i + 1).padStart(2, '0')}</span>
                        {from}
                      </td>
                      <td className="cn border-l border-line/60 px-4 py-3.5 text-[12px] leading-relaxed text-text">
                        {to}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mono mt-4 text-[9px] tracking-[0.18em] text-mute">
              * 经历与能力逐项对应，GEO 并非转行，而是已有分发与数据能力的延伸
            </p>
          </article>
        </div>

        {/* 亮点句 */}
        <blockquote
          className="mt-10 rounded-xl border-l-4 border-brand bg-darkzone p-8 md:p-10"
          data-reveal
        >
          <p className="cn text-[20px] font-bold leading-relaxed text-text md:text-[26px]">
            <span className="mr-2 font-display text-brand">“</span>
            {PROFILE_QUOTE}
          </p>
        </blockquote>
      </div>
    </section>
  )
}
