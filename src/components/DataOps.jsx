import SectionHeader from './SectionHeader.jsx'
import ViewFrame from './ViewFrame.jsx'
import { DATA_OPS_ANNOTATIONS } from '../data/content.js'

export default function DataOps() {
  return (
    <section id="data-ops" className="scroll-mt-16 border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionHeader
          no="05"
          code="DATA OPS"
          title="DATA OPS"
          cn="用 Agent 搭的部门级数据中台"
          tags={['BITABLE', 'COZE', 'DASHBOARD', 'ALERT']}
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* 主视觉：中台看板大图（待截图） */}
          <div data-reveal>
            <div className="placeholder-box relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-panel">
              <ViewFrame on />
              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span className="mono text-[10px] tracking-[0.2em] text-brand">D-01</span>
                <span className="mono text-[10px] tracking-[0.2em] text-mute">
                  DASHBOARD OVERVIEW / 中台总览
                </span>
              </div>
              {/* 伪看板线框，提示截图落位 */}
              <div className="absolute inset-x-5 bottom-5 top-16 grid grid-cols-3 gap-3">
                {['METRICS', 'CHARTS', 'TABLES'].map((g, gi) => (
                  <div key={g} className="flex flex-col gap-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-md border border-line/70 bg-panel2/40"
                        style={{ opacity: 0.35 + ((gi + i) % 3) * 0.18 }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="cn rounded-full border border-line bg-bg/80 px-5 py-2 text-[12px] text-mute">
                  【待补：飞书多维表格中台完整看板截图 · 高清整屏】
                </p>
              </div>
            </div>
            <p className="mono mt-3 text-[9px] tracking-[0.18em] text-mute">
              截图提交后按区域加标注线：监控指标 / 自动汇总 / 异常预警 / 自动复盘
            </p>
          </div>

          {/* 标注说明 + 呼应块 */}
          <div className="flex flex-col gap-5" data-reveal data-reveal-delay="0.08">
            {DATA_OPS_ANNOTATIONS.map(([label], i) => (
              <div
                key={label}
                className="group flex items-center gap-4 rounded-xl border border-line bg-panel p-5 transition-colors hover:border-brand"
              >
                <span className="font-display text-[22px] text-brand">
                  D-{String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <p className="cn text-[13.5px] font-bold text-text">{label}</p>
                  <p className="cn mt-0.5 text-[11.5px] text-mute">
                    【待补：解决了什么问题 / 省了多少事 · 提效数字】
                  </p>
                </div>
              </div>
            ))}

            <div className="rounded-xl border-l-4 border-brand bg-darkzone p-6">
              <p className="mono text-[10px] tracking-[0.22em] text-brand">SAME LOGIC → GEO</p>
              <p className="cn mt-3 text-[13.5px] leading-[1.9] text-sub">
                同一套思路可平移到 GEO 监测——<b className="text-text">固定问题库、定期跑题、分平台记录、看时间序列趋势</b>。
                中台能力本身就是 GEO 监测看板的原型。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
