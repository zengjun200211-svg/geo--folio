import { useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import ViewFrame from './ViewFrame.jsx'
import { DATA_OPS_ANNOTATIONS } from '../data/content.js'

const SHOTS = [
  {
    src: 'images/dataops/dashboard-1280.webp',
    full: 'images/dataops/dashboard.webp',
    en: 'DASHBOARD OVERVIEW',
    cn: '账号运营数据看板 · 中台总览',
    note: '作品总数 416 / 9 月发布 57 条 / 总播放 221 万 / 互动 7.9 万',
  },
  {
    src: 'images/dataops/detail-1280.webp',
    full: 'images/dataops/detail.webp',
    en: 'WORKS DETAIL TABLE',
    cn: '作品数据明细表 · 全量作品台账',
    note: '444 条记录 · 播放 / 点赞 / 评论 / 收藏 / 转发 / 互动全字段',
  },
  {
    src: 'images/dataops/project-1280.webp',
    full: 'images/dataops/project.webp',
    en: 'PROJECT TRACKER',
    cn: '助力项目数据表 · 商单进度跟踪',
    note: '13 条项目 · KVL 发布量 vs 团队执行量双口径',
  },
  {
    src: 'images/dataops/account-1280.webp',
    full: 'images/dataops/account.webp',
    en: 'ACCOUNT CONFIG & TARGET',
    cn: '账号配置表及月目标 · 达标监控',
    note: '6 账号 · 含 v 量 / 达标状态 / 播放互动环比',
  },
  {
    src: 'images/dataops/archive-1280.webp',
    full: 'images/dataops/archive.webp',
    en: 'MONTHLY ARCHIVE',
    cn: '账号月度验收存档 · 数据留存',
    note: '24 条月度存档 · 月末粉丝 / 截图证据链',
  },
]

export default function DataOps() {
  const [idx, setIdx] = useState(0)
  const [zoom, setZoom] = useState(false)
  const shot = SHOTS[idx]
  const prev = () => setIdx((i) => (i - 1 + SHOTS.length) % SHOTS.length)
  const next = () => setIdx((i) => (i + 1) % SHOTS.length)

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
          {/* 主视觉：中台看板图库 */}
          <div data-reveal>
            <div
              className="group relative cursor-zoom-in overflow-hidden rounded-[24px] border border-line/60 bg-panel2/40"
              onClick={() => setZoom(true)}
            >
              <ViewFrame on />

              {/* 图片窗口：正常流 + aspect 撑高度，圆角裁切，边角圆润 */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.65)] ring-1 ring-white/10 sm:aspect-[2.35/1]">
                {SHOTS.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.cn}
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                      i === idx ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                  />
                ))}
                {/* 边角极淡晕染：只柔和过渡，不压暗 */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_44px_6px_rgba(0,0,0,0.12)]" />
              </div>

              {/* 左上角编号 */}
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                <span className="mono text-[10px] tracking-[0.2em] text-brand">D-01</span>
                <span className="mono text-[10px] tracking-[0.2em] text-white/80">{shot.en}</span>
              </div>

              {/* 左右箭头 */}
              <button
                type="button"
                aria-label="上一张"
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:border-brand hover:bg-brand hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="下一张"
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:border-brand hover:bg-brand hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>

              {/* 右下角放大提示 + 计数 */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                  <span className="mono text-[9px] tracking-[0.18em] text-white/70">
                    {String(idx + 1).padStart(2, '0')} / {String(SHOTS.length).padStart(2, '0')}
                  </span>
                </span>
                <span className="rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                  <span className="mono text-[9px] tracking-[0.18em] text-white/70">点击放大 ↗</span>
                </span>
              </div>

              {/* 左下角标题条：渐变浮层 */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-5 pb-3.5 pt-10">
                <p className="cn text-[13px] font-bold leading-tight text-white">{shot.cn}</p>
                <p className="mono mt-1 text-[9.5px] leading-snug tracking-[0.1em] text-white/70">{shot.note}</p>
              </div>
            </div>

            {/* 缩略图导航 */}
            <div className="mt-4 flex gap-2.5">
              {SHOTS.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`group h-14 flex-1 overflow-hidden rounded-lg border transition-all duration-300 ${
                    i === idx
                      ? 'border-brand/80 opacity-100 shadow-[0_6px_20px_-8px_rgba(238,33,30,0.45)]'
                      : 'border-line/60 opacity-55 hover:opacity-90'
                  }`}
                  aria-label={s.cn}
                >
                  <img
                    src={s.src}
                    alt={s.cn}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            <p className="mono mt-3.5 text-[9px] tracking-[0.18em] text-mute">
              飞书多维表格 · 数据中台全景（实时截图）· 左右箭头或缩略图切换，点击放大
            </p>

            {/* 口径速览：填充左列高度，与右侧 D 卡平衡 */}
            <div className="mt-5 rounded-xl border border-line/60 bg-panel p-5" data-reveal>
              <div className="flex items-baseline justify-between">
                <p className="mono text-[10px] tracking-[0.22em] text-brand">KPI SNAPSHOT · 口径速览</p>
                <span className="mono text-[8px] tracking-[0.16em] text-mute">2026-09</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {[
                  ['416', '作品总数'],
                  ['57', '9月发布'],
                  ['221万', '9月总播放'],
                  ['7.9万', '9月互动'],
                  ['33', '商业执行'],
                  ['444', '明细记录'],
                ].map(([v, k]) => (
                  <div key={k}>
                    <p className="font-display text-[22px] leading-none text-text">{v}</p>
                    <p className="cn mt-1.5 text-[10px] text-mute">{k}</p>
                  </div>
                ))}
              </div>
              <p className="cn mt-4 border-t border-line/60 pt-3 text-[11px] leading-relaxed text-sub">
                双维度：按账号 × 按月跟踪播放 / 互动；v 量类型「主含 / 轻含 / 未含」判断内容结构健康度。
              </p>
            </div>
          </div>

          {/* 标注说明 + 呼应块 */}
          <div className="flex flex-col gap-5" data-reveal data-reveal-delay="0.08">
            {DATA_OPS_ANNOTATIONS.map(([label, desc], i) => (
              <div
                key={label}
                className="group flex items-start gap-4 rounded-xl border border-line bg-panel p-5 transition-colors hover:border-brand"
              >
                <span className="font-display text-[22px] leading-none text-brand">
                  D-{String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <p className="cn text-[13.5px] font-bold text-text">{label}</p>
                  {desc && (
                    <p className="cn mt-1 text-[12px] leading-relaxed text-sub">{desc}</p>
                  )}
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

      {zoom && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-8 cursor-zoom-out"
          onClick={() => setZoom(false)}
        >
          <img
            src={shot.full}
            alt={shot.cn}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 mono text-[11px] tracking-[0.2em] text-white/60">
            {shot.cn} · 点击任意处关闭
          </p>
        </div>
      )}
    </section>
  )
}
