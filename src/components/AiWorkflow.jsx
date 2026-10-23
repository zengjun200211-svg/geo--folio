import { useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import ViewFrame from './ViewFrame.jsx'
import BounceCards from './BounceCards.jsx'
import { AI_TOOLS } from '../data/content.js'

const LABELS = {
  'images/agent/chatgpt.webp': 'ChatGPT',
  'images/agent/gemini.webp': 'Gemini',
  'images/agent/deepseek.webp': 'DeepSeek',
  'images/agent/doubao-home.webp': '豆包 AI',
  'images/agent/qwen.webp': '千问 Agent',
  'images/agent/doubao.webp': '豆包工作',
  'images/agent/workbuddy-1.webp': 'WorkBuddy',
  'images/agent/todo.webp': '项目待办工作台',
  'images/agent/zhongtai.webp': '数据中台',
  'images/agent/zhongtai-2.webp': '数据看板',
  'images/knowledge/obsidian-1.webp': 'Obsidian 笔记',
  'images/knowledge/obsidian-2.webp': 'Obsidian MOC',
  'images/knowledge/github-1.webp': 'GitHub 仓库',
  'images/knowledge/github-2.webp': 'GitHub 提交',
  'images/agent/notebooklm-1.webp': 'NotebookLM',
  'images/knowledge/notebooklm-detail.webp': 'NotebookLM 复盘',
  'images/agent/vibe-coding.webp': 'Vibe Coding',
}

export default function AiWorkflow() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="ai-workflow" className="scroll-mt-16 border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionHeader
          no="04"
          code="AI WORKFLOW"
          title="AI WORKFLOW"
          cn="模型 · Agent · 知识库的提效痕迹"
          tags={['LLM', 'AGENT', 'KNOWLEDGE BASE', 'SOP']}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {AI_TOOLS.map((t, i) => (
            <article
              key={t.code}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand"
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 0.06}s` }}
            >
              <ViewFrame className="auto" />
              <div className="flex items-center justify-between">
                <span className="mono text-[11px] tracking-[0.18em] text-brand">{t.code}</span>
                <span className="mono text-[8px] tracking-[0.2em] text-mute">{t.en}</span>
              </div>

              <h3 className="cn mt-4 text-[17px] font-bold leading-snug text-text">{t.name}</h3>
              <p className="cn mt-2 max-w-prose text-[12.5px] leading-relaxed text-sub">{t.use}</p>

              {t.images && t.images.length > 0 ? (
                <div className="mt-auto pt-4">
                  <p className="mono mb-1 text-center text-[8px] tracking-[0.2em] text-mute/60">
                    点击图片查看原图 →
                  </p>
                  <div className="flex justify-center">
                    <BounceCards
                    images={t.images.map(src => ({ src, alt: LABELS[src] || t.name }))}
                    containerWidth={300}
                    containerHeight={200}
                    cardSize={170}
                    spread={55}
                    rotation={8}
                    pushDistance={80}
                    hoverScale={1.12}
                    borderWidth={2}
                    borderColor="#EE211E"
                    radius={12}
                    onCardClick={(idx) => setLightbox({ src: t.images[idx], alt: LABELS[t.images[idx]] || t.name })}
                    />
                  </div>
                </div>
              ) : (
                <div className="placeholder-box mt-5 rounded-lg p-4">
                  <p className="mono text-[9px] tracking-[0.18em] text-mute">EVIDENCE / 实际产出截图</p>
                  <p className="cn mt-1.5 text-[11.5px] leading-relaxed text-mute">
                    【待补：{t.pendingText}】
                  </p>
                </div>
              )}
            </article>
          ))}

          <article
            className="flex flex-col justify-between rounded-xl border border-brand/60 bg-darkzone p-6"
            data-reveal
          >
            <p className="mono text-[10px] tracking-[0.22em] text-brand">ROUTING PRINCIPLE</p>
            <p className="cn mt-3 text-[15px] font-bold leading-relaxed text-text">
              不同需求配不同工具——模型负责生成，Agent 负责编排，知识库负责沉淀，看板负责决策。
            </p>
            <p className="mono mt-4 text-[9px] tracking-[0.18em] text-mute">
              LLM × AGENT × BITABLE × OBSIDIAN
            </p>
          </article>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-8 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 mono text-[11px] tracking-[0.2em] text-white/60">
            {lightbox.alt} · 点击任意处关闭
          </p>
        </div>
      )}
    </section>
  )
}
