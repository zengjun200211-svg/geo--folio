import SectionHeader from './SectionHeader.jsx'
import { GEO_EN_STEPS, GEO_LIBS, GEO_METRICS, GEO_STANCE, GEO_STEPS } from '../data/content.js'

export default function GeoLab() {
  return (
    <section id="geo-lab" className="scroll-mt-16 border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionHeader
          no="06"
          code="GEO LAB"
          title="GEO LAB"
          cn="生成式引擎优化 · 学习与实验"
          tags={['DIAGNOSE', 'CONTENT', 'DISTRIBUTE', 'MONITOR', 'REVIEW']}
        />

        {/* 六步流程 */}
        <p className="mono mb-4 text-[10px] tracking-[0.22em] text-brand" data-reveal>
          METHOD · GEO 六步闭环
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6" data-reveal>
          {GEO_STEPS.map((s, i) => (
            <div
              key={s}
              className="group relative rounded-xl border border-line bg-panel p-5 transition-colors hover:border-brand"
            >
              <span className="mono text-[10px] tracking-[0.18em] text-brand">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="cn mt-3 text-[16px] font-bold text-text">{s}</p>
              <p className="mono mt-1 text-[8px] tracking-[0.16em] text-mute">{GEO_EN_STEPS[i]}</p>
              {i < GEO_STEPS.length - 1 && (
                <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-brand xl:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* 五库 + 四指标 */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-panel p-7" data-reveal>
            <p className="mono text-[10px] tracking-[0.22em] text-brand">FIVE LIBRARIES · 五库</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {GEO_LIBS.map((l) => (
                <span
                  key={l}
                  className="cn rounded-full border border-line bg-panel2 px-4 py-2 text-[12px] text-text"
                >
                  {l}
                </span>
              ))}
            </div>
            <p className="cn mt-5 text-[12px] leading-relaxed text-sub">
              问题库驱动选题，事实库保证可引用，内容库组织生产，信源库对齐 AI 抓取偏好，监测库沉淀时间序列。
            </p>
          </div>

          <div className="rounded-xl border border-line bg-panel p-7" data-reveal data-reveal-delay="0.06">
            <p className="mono text-[10px] tracking-[0.22em] text-brand">
              MONITORING METRICS · 监测指标
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {GEO_METRICS.map(([cn, en]) => (
                <div key={cn} className="rounded-lg border border-line/70 bg-panel2/60 p-4">
                  <p className="cn text-[14px] font-bold text-text">{cn}</p>
                  <p className="mono mt-1 text-[8px] tracking-[0.14em] text-mute">{en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 实验记录位 */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]" data-reveal>
          <div className="flex flex-col justify-center rounded-xl border border-line bg-darkzone p-7">
            <span className="mono text-[11px] tracking-[0.2em] text-brand">G-01 · EXPERIMENT LOG</span>
            <h3 className="cn mt-3 text-[18px] font-bold text-text">AI 可见度监测实验</h3>
            <p className="cn mt-2 text-[12px] leading-relaxed text-mute">
              真实监测记录 / 内容被 AI 引用截图（最有价值，有多少给多少）；暂无则标注「实验进行中」，放 GEO 知识库目录与学习笔记。
            </p>
          </div>
          <div className="placeholder-box flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-xl p-8 text-center">
            <span className="flex items-center gap-2 rounded-full border border-brand/50 px-4 py-1.5 mono text-[10px] tracking-[0.2em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand blink" /> 实验进行中 · IN PROGRESS
            </span>
            <p className="cn text-[13px] text-mute">
              【待补：各 AI 平台测试记录 / 可见度监测表 / 被引用截图，或 GEO 知识库体系截图】
            </p>
          </div>
        </div>

        {/* 立场句收尾 */}
        <blockquote className="mt-12 text-center" data-reveal>
          <p className="cn mx-auto max-w-4xl text-[22px] font-bold leading-relaxed text-text md:text-[30px]">
            {GEO_STANCE}
          </p>
          <p className="mono mt-5 text-[10px] tracking-[0.3em] text-mute">
            MAKE CONTENT VISIBLE IN THE AI ERA.
          </p>
        </blockquote>
      </div>
    </section>
  )
}
