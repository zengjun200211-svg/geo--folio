# ZENG JUN・GEO FOLIO — 作品集网站第一版

> 让好内容，被 AI 看见・MAKE CONTENT VISIBLE IN THE AI ERA.
> 技术栈：
>
> **Vite + React 18 + Tailwind CSS v4**
>
> ，桌面端优先，单页锚点导航。

## 运行



```
cd 站点

npm install        # 已安装可跳过

npm run dev        # 开发：http://localhost:5173

npm run build      # 生产构建 → dist/

npm run preview    # 预览构建：http://localhost:4173
```

Node 建议 ≥ 18（开发机实测 v22）。

## 第一版内容范围



| 区块                                                                                                 | id             | 状态                                 |
| -------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------- |
| Hero 首屏（红色 V 大字 + 能力分类行 + 署名 + 联系占位 + SCROLL）                                                      | `#top`         | ✅ 完成（背景为 AI 生成的暗色多屏数据看板氛围图，非二次元插画） |
| INDEX 系统目录（01-06 米白 / 红交替扇形卡，拖拽切换 /hover 摆正 / 点击进入 / 圆点分页 / 键盘←→）                                  | `#index`       | ✅ 完成                               |
| 01 PROFILE 关于我（50 秒自我介绍 + 可迁移能力映射表 + 亮点句）                                                          | `#profile`     | ✅ 文案完整                             |
| **02 CONTENT HITS 样板板块**（三件套页头 + 4 个数据汇总大卡（带口径）+ 自有 / 操盘 Tab + H-01\~H-07 编号项目卡 + 右侧选中大图详情 + 方法论条） | `#hits`        | ✅ 结构完整，**素材待补**                    |
| 03 COMMERCIAL（B-01 双鱼 × 十五运档案 + 详情 + 平台→大模型信源注解、实习矩阵小卡）                                            | `#commercial`  | 框架完整，结果数据待补                        |
| 04 AI WORKFLOW（A-01\~A-05 工具矩阵卡 + 分工逻辑卡）                                                           | `#ai-workflow` | 框架完整，截图待补                          |
| 05 DATA OPS（D-01 看板占位 + 4 条标注位 + GEO 呼应块）                                                          | `#data-ops`    | 框架完整，截图待补                          |
| 06 GEO LAB（六步闭环 + 五库 + 五项监测指标 + G-01 实验进行中 + 立场句）                                                  | `#geo-lab`     | 框架完整，实验记录待补                        |
| CONTACT（联系字段 + CV / 作品集 PDF 占位按钮 + 可见 FAQ）                                                         | `#contact`     | 框架完整，联系方式 / PDF 待补                 |
| Footer（立场句 / KEEP TESTING / KEEP PUBLISHING / 版权）                                                  | —              | ✅                                  |

已实现的交互：自定义红点光标 + 红色拖尾拉线（仅桌面端，移动端回退系统光标）、目录卡拖拽与 hover 摆正、滚动 stagger 入场、卡片红色取景框四角选中态、横滑卡滚轮横滑、SOUND 开关视觉态、左下路由面包屑、右下页码 / 回顶。

## GEO 技术加分项（已落实）



* 语义化结构：`header / nav / main / section / article / table / details / footer`，每板块一个 `<section id>`。

* **静态 JSON-LD**（Person / ProfilePage / FAQPage，5 条 FAQ）直接写在 `index.html`，无 JS 也可被抓取；另有 `<noscript>` 核心信息兜底。

* FAQ 用原生 `<details>` 可见渲染，按「问题库」思路组织。

* 所有数据点附近带「口径」小字。

## 目录结构



```
站点/

├── index.html              # 静态 JSON-LD / noscript / Google Fonts

├── vite.config.js

├── src/

│   ├── main.jsx

│   ├── App.jsx

│   ├── index.css           # Tailwind v4 @theme：实测色值/字体/动效/取景框

│   ├── data/content.js     # ★ 全站文案唯一数据源（改文案先改这里）

│   ├── hooks/useReveal.js

│   └── components/         # TopNav/Hero/IndexSection/Profile/ContentHits/…

├── public/

│   ├── favicon.svg

│   └── hero-workbench.jpg  # AI 生成的 Hero 氛围图

└── scripts/                # 自检脚本（puppeteer-core 调本机 Edge）

&#x20;   ├── shots.mjs           # 逐板块 1440×900 截图

&#x20;   ├── shots2.mjs / shots3.mjs / mshots.mjs

&#x20;   └── itest.mjs           # 交互自检（Tab/圆点/卡片跳转/JS 报错）
```

## 红线与待补（重要）



1. **数据口径以《02\_信息架构与文案.md》第十节为准**：粉数统一写「破万粉」；「6.6W+」必须标「矩阵净增」；「1400W+」标「6 账号矩阵累计」；「百万赞」标「累计」；实习 200+/40W 与科奥 30W 不混。

2. 所有 `【待补】` 均为显式占位，**严禁编造数字、客户名、项目名**。素材到位后：

* 视频 / 封面 / 截图：按 03 清单命名（H-/B-/A-/D-/G-），放入 `素材/` 对应文件夹，再替换组件中的占位块；

* 联系方式 / CV / 作品集 PDF：放 `素材/07_简历与PDF/`，更新 `src/data/content.js` 的 `CONTACT_ROWS` 与下载按钮；

* 客户名公开范围上线前逐项确认，后台截图统一脱敏。

1. 站名角标当前为占位 `ZJ`（见 `content.js` 的 `SITE.brand`），定稿后全局替换。

2. SOUND 开关第一版仅视觉态，音效 / BGM、CRT 转场属第二版。

3. 移动端做了不破版适配，但本版按桌面端优先验收。

## 自检结果（2026-09-19）



* `npm run build` 通过（JS gzip ≈ 62KB，CSS gzip ≈ 8KB）。

* 1440×900 下 Hero / INDEX / 01-06 / CONTACT / Footer 逐屏截图自检通过；430px 移动端巡检无破版。

* 交互自检：Tab 切换、圆点分页、卡片点击跳转、FAQ 展开均正常，控制台无 JS 报错。

* 截图存于 `.screenshots/`（可用 `node scripts/shots.mjs` 重新生成）。