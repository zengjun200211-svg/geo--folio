import SectionHeader from './SectionHeader.jsx'
import ViewFrame from './ViewFrame.jsx'
import AccordionGallery from './AccordionGallery.jsx'
import { AI_TOOLS } from '../data/content.js'

const LABELS = {
  'images/agent/chatgpt.png': 'ChatGPT',
  'images/agent/gemini.png': 'Gemini',
  'images/agent/deepseek.png': 'DeepSeek',
  'images/agent/qwen.png': '千问 Agent',
  'images/agent/doubao.png': '豆包工作',
  'images/agent/workbuddy-1.png': 'WorkBuddy',
  'images/agent/todo.png': '项目待办工作台',
  'images/agent/zhongtai.png': '数据中台',
  'images/agent/zhongtai-2.png': '数据看板',
  'images/knowledge/obsidian-1.png': 'Obsidian 笔记',
  'images/knowledge/obsidian-2.png': 'Obsidian MOC',
  'images/knowledge/github-1.png': 'GitHub 仓库',
  'images/knowledge/github-2.png': 'GitHub 提交',
  'images/agent/notebooklm-1.png': 'NotebookLM',
  'images/knowledge/notebooklm-detail.png': 'NotebookLM 复盘',
  'images/agent/vibe-coding.png': 'Vibe Coding',
}

export default function AiWorkflow() {
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
              <p className="cn mt-2 text-[12.5px] leading-relaxed text-sub">{t.use}</p>

              {t.images && t.images.length > 0 ? (
                <div className="mt-auto pt-4">
                  <AccordionGallery
                    items={t.images.map((src) => ({ image: src, label: LABELS[src] || t.name }))}
                    defaultIndex={0}
                    height={260}
                    gap={6}
                    radius={8}
                    expandRatio={0.75}
                    accentColor="#EE211E"
                    trigger="click"
                    grayscale={true}
                  />
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
    </section>
  )
}
