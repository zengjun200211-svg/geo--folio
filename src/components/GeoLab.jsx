import { useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import DepthCarousel from './DepthCarousel.jsx'
import {
  GEO_EN_STEPS,
  GEO_LIBS,
  GEO_METRICS,
  GEO_STANCE,
  GEO_STEP_DEFS,
  GEO_STEPS,
} from '../data/content.js'

const GEO_TEST_SHOTS = [
  {
    src: 'images/geo/geo-doubao-q1.png',
    en: 'DOUBAO · Q1',
    cn: '豆包 · 短视频 / 种草引用',
    note: '参考 27 篇 · 抖音小红书式带话题内容',
  },
  {
    src: 'images/geo/geo-kimi-refs.png',
    en: 'KIMI · Q1',
    cn: 'Kimi · 通用网页内联引用',
    note: '搜索 49 结果 · 厂商官网 / 门户 / 评测混合',
  },
  {
    src: 'images/geo/geo-deepseek-deep.png',
    en: 'DEEPSEEK · DEEP Q3',
    cn: 'DeepSeek · 深度思考补测',
    note: '搜索放大至 109 网页 · 引用密度最高',
  },
  {
    src: 'images/geo/geo-wenxin-refs.png',
    en: 'WENXIN · Q1',
    cn: '文心一言 · 百家号生态',
    note: '引用 30 条 · 混入 SEO 站群域名',
  },
  {
    src: 'images/geo/geo-yuanbao-refs.png',
    en: 'YUANBAO · Q1',
    cn: '腾讯元宝 · 垂直参数库',
    note: '引用来源（50）面板 · 中关村在线 / 太平洋',
  },
  {
    src: 'images/geo/geo-qianwen-q2.png',
    en: 'QWEN · Q2',
    cn: '通义千问 · 短视频博主来源',
    note: 'B站 / 抖音博主视频占比约八成',
  },
]

export default function GeoLab() {
  const [zoomIdx, setZoom] = useState(-1)
  const zoomShot = zoomIdx >= 0 ? GEO_TEST_SHOTS[zoomIdx] : null
  const [active, setActive] = useState(0)

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
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6" data-reveal>
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
              <p className="cn mt-2.5 text-[11px] leading-relaxed text-sub">
                {GEO_STEP_DEFS[s]}
              </p>
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
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {GEO_LIBS.map((lib) => (
                <div
                  key={lib.cn}
                  className="rounded-lg border border-line/70 bg-panel2/60 p-4 transition-colors hover:border-brand/60"
                >
                  <div className="flex items-center justify-between">
                    <p className="cn text-[14px] font-bold text-text">{lib.cn}</p>
                    <p className="mono text-[8px] tracking-[0.14em] text-mute">{lib.en}</p>
                  </div>
                  <p className="cn mt-2 text-[12px] font-bold leading-snug text-brand/90">
                    {lib.def}
                  </p>
                  <p className="cn mt-1.5 text-[10.5px] leading-relaxed text-mute">{lib.tags}</p>
                </div>
              ))}
            </div>
            <p className="cn mt-5 text-[12px] leading-relaxed text-sub">
              没事实库内容就空，没信源库 AI 不信，没监测库闭环不了。
            </p>
          </div>

          <div className="rounded-xl border border-line bg-panel p-7" data-reveal data-reveal-delay="0.06">
            <p className="mono text-[10px] tracking-[0.22em] text-brand">
              MONITORING METRICS · 监测指标
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {GEO_METRICS.map((m) => (
                <div key={m.cn} className="rounded-lg border border-line/70 bg-panel2/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="cn text-[14px] font-bold text-text">{m.cn}</p>
                    <p className="mono text-[8px] tracking-[0.14em] text-mute">{m.en}</p>
                  </div>
                  <p className="cn mt-2 text-[12px] leading-snug text-sub">{m.def}</p>
                  <p className="cn mt-1.5 text-[10.5px] text-mute">→ 反映「{m.rel}」</p>
                </div>
              ))}
            </div>
            <p className="cn mt-5 text-[12px] leading-relaxed text-sub">
              问题要固定才看趋势，分平台各算各的，问中性问题（「哪款好」而非「XX 好不好」）。
            </p>
          </div>
        </div>

        {/* 实验记录位：G-01 */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]" data-reveal>
          <div className="flex flex-col justify-center rounded-xl border border-line bg-darkzone p-7">
            <span className="mono text-[11px] tracking-[0.2em] text-brand">G-01 · EXPERIMENT LOG</span>
            <h3 className="cn mt-3 text-[18px] font-bold text-text">AI 可见度监测实验</h3>
            <p className="cn mt-2 text-[12px] leading-relaxed text-mute">
              六平台 × 三题对照实验（2026-10-14）：同一组 3C 数码问题，逐一问遍豆包、Kimi、DeepSeek、文心一言、元宝、通义千问，留存回答全文、引用来源与页面截图。
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {[['6', '被测 AI 平台'], ['18', '快速思考回答'], ['3', 'DeepSeek 深度补测'], ['25+', '留存截图 / 档案']].map(
                ([n, label]) => (
                  <div key={label} className="rounded-lg border border-line/70 bg-panel2/50 px-3 py-2">
                    <p className="font-display text-[20px] leading-none text-brand">{n}</p>
                    <p className="cn mt-1 text-[10px] text-mute">{label}</p>
                  </div>
                )
              )}
            </div>
            <p className="cn mt-4 text-[11.5px] leading-relaxed text-sub">
              核心发现：<b className="text-text">AI 引用生态 = 厂商内容生态的镜像</b>——文心首选百家号、元宝首选中关村/太平洋、千问首选 B站/抖音博主、豆包首选短视频种草。
            </p>
            <a
              href="geo-report/index.html"
              target="_blank"
              rel="noreferrer"
              className="mono mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-brand bg-brand/10 px-4 py-2 text-[10px] tracking-[0.18em] text-brand transition-colors hover:bg-brand hover:text-white"
            >
              查看完整测试报告 ↗
            </a>
          </div>

          <div className="min-w-0">
            <div className="flex items-baseline justify-between" data-reveal>
              <p className="mono text-[10px] tracking-[0.22em] text-brand">
                GALLERY · 六平台实测截图
              </p>
              <p className="mono text-[9px] tracking-[0.16em] text-mute">
                DRAG / WHEEL / ARROWS TO BROWSE · 点击查看原图
              </p>
            </div>

            {/* 3D 深度轮播 */}
            <div
              className="relative mt-2 h-[420px] cursor-zoom-in overflow-hidden rounded-xl border border-line bg-panel"
              data-reveal
              onClick={(e) => {
                if (e.target.closest('.depth-carousel__arrow, .depth-carousel__dot')) return
                setZoom(active)
              }}
            >
              <DepthCarousel
                items={GEO_TEST_SHOTS.map((s) => ({ image: s.src, alt: s.cn }))}
                cardWidth={240}
                cardHeight={300}
                radius={14}
                tint="#0a0a0c"
                depth={150}
                spread={70}
                tilt={18}
                tiltDirection="right"
                perspective={1300}
                visibleCards={4}
                falloff={0.18}
                blur={4}
                duration={700}
                autoplay
                autoplayDelay={3500}
                loop
                showControls
                showIndicators
                onChange={(i) => setActive(i)}
              />
            </div>

            {/* 当前卡片信息条 */}
            <div className="mt-3 flex items-center justify-between" data-reveal>
              <div>
                <p className="cn text-[13px] font-bold text-text">{GEO_TEST_SHOTS[active].cn}</p>
                <p className="mono mt-0.5 text-[9px] leading-relaxed tracking-[0.08em] text-mute">
                  {GEO_TEST_SHOTS[active].note}
                </p>
              </div>
              <span className="mono shrink-0 text-[9px] tracking-[0.18em] text-mute">
                G-01-{String(active + 1).padStart(2, '0')} · {String(active + 1).padStart(2, '0')} /{' '}
                {String(GEO_TEST_SHOTS.length).padStart(2, '0')}
              </span>
            </div>
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

      {zoomShot && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-8 cursor-zoom-out"
          onClick={() => setZoom(-1)}
        >
          <img
            src={zoomShot.src}
            alt={zoomShot.cn}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 mono text-[11px] tracking-[0.2em] text-white/60">
            {zoomShot.cn} · 点击任意处关闭
          </p>
        </div>
      )}
    </section>
  )
}
