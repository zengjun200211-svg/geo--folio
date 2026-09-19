// ============================================================
// 全站文案数据 —— 全部来自《02_信息架构与文案.md》初稿
// 规则：用户没给的数字/名称一律 null，渲染为【待补】，严禁编造
// 数据口径红线见 02 文档第十节，改动口径前先读红线
// ============================================================

export const SITE = {
  brand: 'ZJ',
  brandFull: 'ZJ · GEO FOLIO',
  stanceEn: 'MAKE CONTENT VISIBLE IN THE AI ERA.',
  stanceCn: '让好内容，被 AI 看见',
  authorEn: 'ZENG JUN',
  authorCn: '曾俊',
  year: '2026',
  base: 'GUANGZHOU, CHINA',
}

// 顶栏导航（顺序见 02 文档第二节）
export const NAV = [
  { id: 'index', en: 'INDEX', cn: '目录' },
  { id: 'profile', en: 'PROFILE', cn: '关于' },
  { id: 'hits', en: 'HITS', cn: '爆款' },
  { id: 'commercial', en: 'COMMERCIAL', cn: '商单' },
  { id: 'ai-workflow', en: 'AI WORKFLOW', cn: '提效' },
  { id: 'data-ops', en: 'DATA OPS', cn: '中台' },
  { id: 'geo-lab', en: 'GEO LAB', cn: '实践' },
]

// INDEX 六张系统目录卡（配色：米白/红交替）
export const INDEX_CARDS = [
  {
    no: '01',
    id: 'profile',
    en: ['PROFILE /', 'EXPERIENCE'],
    cn: '个人简介与能力地图',
    tone: 'paper',
    thumbEn: 'PORTRAIT + SKILL MAP',
    thumbCn: '头像 / 能力映射表',
    foot: 'CONTENT OPS / GEO',
  },
  {
    no: '02',
    id: 'hits',
    en: ['CONTENT', 'HITS'],
    cn: '爆款内容与方法论',
    tone: 'red',
    thumbEn: 'VIDEO COVERS × 3-8',
    thumbCn: '爆款视频封面拼贴',
    foot: 'SHORT VIDEO / HOOK',
  },
  {
    no: '03',
    id: 'commercial',
    en: ['COMMERCIAL', 'PROJECTS'],
    cn: '商单项目与多平台分发',
    tone: 'paper',
    thumbEn: 'SHUANGYU × 15TH GAMES',
    thumbCn: '双鱼体育 × 十五运',
    foot: 'BRIEF / DELIVERY',
  },
  {
    no: '04',
    id: 'ai-workflow',
    en: ['AI', 'WORKFLOW'],
    cn: '模型 · Agent · 知识库提效',
    tone: 'red',
    thumbEn: 'LLM / AGENT / VAULT',
    thumbCn: '工具矩阵界面拼贴',
    foot: 'LLM / AGENT / SOP',
  },
  {
    no: '05',
    id: 'data-ops',
    en: ['DATA', 'OPS'],
    cn: 'Agent 数据中台',
    tone: 'paper',
    thumbEn: 'BITABLE DASHBOARD',
    thumbCn: '飞书多维表格 / 看板',
    foot: 'BITABLE / COZE',
  },
  {
    no: '06',
    id: 'geo-lab',
    en: ['GEO', 'LAB'],
    cn: '生成式引擎优化实践',
    tone: 'red',
    thumbEn: 'MONITOR + KNOWLEDGE BASE',
    thumbCn: '监测看板 / 知识库',
    foot: 'DIAGNOSE / REVIEW',
  },
]

// Hero 能力分类行（中英成对）
export const HERO_CAPABILITIES = [
  ['Content Operations', '内容运营'],
  ['Hit-making', '爆款孵化'],
  ['Data Ops', '数据中台'],
  ['AI Workflow', 'AI 提效'],
  ['GEO Practice', '生成式引擎优化'],
]

// ---------- 01 PROFILE ----------
export const PROFILE_BLOCKS = [
  {
    tag: 'CONTENT OPS · 内容运营',
    html: '我叫曾俊，广州索伦信息科技 MCN 运营专员。做过三块事：<b>内容运营</b>——从零孵化抖音 3C 账号，独立跑通选题、脚本、拍摄、剪辑到发布，做到破万粉、累计百万赞，沉淀出「热点＋钩子」爆款方法论；现带 6 个 3C 账号矩阵，累计播放 1400 多万、净增 6.6 万粉。',
  },
  {
    tag: 'DISTRIBUTION · 多平台分发',
    html: '<b>多平台分发</b>——负责过双鱼体育 × 十五运合作项目，在百家号、今日头条、搜狐、网易、公众号做体育内容发布；实习期间从零做过公众号、小红书、B 站、CSDN 账号矩阵，跑通内容引流到私域成交的链路。',
  },
  {
    tag: 'DATA × AI · 数据与 AI',
    html: '<b>数据与 AI</b>——用飞书多维表格 + Coze 搭过部门级数据中台，日常重度使用 ChatGPT、Gemini、DeepSeek，不同需求配不同工具。',
  },
]

export const CAPABILITY_MAP = [
  ['双鱼体育多平台分发（百家号/头条/公众号/搜狐/网易）', '国内 AI 重点抓取媒体矩阵的内容分发实操'],
  ['6 个 3C 账号矩阵 + 抖音 IP 0-1', 'GEO 内容选题、生产、审核全流程'],
  ['飞书多维表格 + Coze Agent', '监测看板、自动出数、异常预警'],
  ['AIGC 内容生产 SOP', 'GEO 内容量产、Prompt 沉淀、理解 AI 抓取偏好'],
  ['用户运营 · 内容→线索→成交', '用户意图理解、问题库搭建'],
  ['项目统筹 · 里程碑倒排 · 走款核算', '项目交付辅助、客户对接'],
]

export const PROFILE_QUOTE = '我当时做的内容分发，其实已经做了一半 GEO——只是那会儿没人叫这个名字。'

// ---------- 02 CONTENT HITS ----------
// 汇总大卡：数字口径严格按 02 文档第十节
export const HIT_STATS = [
  {
    num: '破万粉',
    en: '10K+ FOLLOWERS',
    note: '自有抖音账号 0→1 孵化 · 站方统一口径，不写具体值',
  },
  {
    num: '累计百万赞',
    en: '1M+ LIKES',
    note: '自有账号累计获赞百万以上',
  },
  {
    num: '1400W+ 播放',
    en: '14M+ VIEWS',
    note: '6 账号矩阵累计口径',
  },
  {
    num: '6.6W+ 净增粉丝',
    en: '66K+ NEW FOLLOWERS',
    note: '6 账号矩阵净增口径 · 非单账号',
  },
]

export const HIT_TABS = [
  { id: 'own', cn: '自有账号', en: 'OWNED ACCOUNTS' },
  { id: 'managed', cn: '操盘账号', en: 'MANAGED ACCOUNTS' },
]

const blankVideo = (code, account, role) => ({
  code,
  account,
  role,
  title: null,
  date: null,
  plays: null,
  likes: null,
  comments: null,
  follows: null,
  hook: null,
})

export const HIT_GROUPS = {
  own: [
    blankVideo('H-01', '抖音 · 3C 自有账号', '选题 / 脚本 / 拍摄 / 剪辑 / 发布（全流程独立）'),
    blankVideo('H-02', '抖音 · 3C 自有账号', '选题 / 脚本 / 拍摄 / 剪辑 / 发布（全流程独立）'),
    blankVideo('H-03', '抖音 · 3C 自有账号', '选题 / 脚本 / 拍摄 / 剪辑 / 发布（全流程独立）'),
    blankVideo('H-04', '抖音 · 3C 自有账号', '选题 / 脚本 / 拍摄 / 剪辑 / 发布（全流程独立）'),
  ],
  managed: [
    blankVideo('H-05', null, null),
    blankVideo('H-06', null, null),
    blankVideo('H-07', null, null),
  ],
}

// 方法论示例标签（02 文档举例，成片后按实际替换）
export const METHOD_TAGS_DEMO = ['热点+钩子', '反差开头', '评论区运营']

// ---------- 03 COMMERCIAL ----------
export const COMMERCIAL_CASES = [
  {
    code: 'B-01',
    title: '双鱼体育 × 十五运合作项目',
    role: '执行 + 部分对客',
    actions: [
      '百家号、今日头条、搜狐、网易、公众号的体育内容发布',
      '里程碑倒排、多方统筹',
    ],
    result: null,
    geoNote:
      '这些平台恰好是国内大模型重点抓取的信源：百家号→文心一言；头条→豆包；公众号→元宝；搜狐/网易→通义、DeepSeek。',
    sources: ['百家号', '今日头条', '搜狐', '网易', '公众号'],
  },
  { code: 'B-02', title: null, role: null, actions: [], result: null, geoNote: null, sources: [] },
]

export const INTERNSHIP = {
  title: '实习期间 · 多账号矩阵 0→1',
  lines: [
    '公众号 / 小红书 / B 站 / CSDN 账号矩阵，200+ 篇内容、全网 40W+ 曝光（实习多账号矩阵口径）',
    '跑通「内容 → 私域 → 成交」链路',
    '科奥实习小红书 30W+ 浏览（单平台口径，待用户确认后单列）',
  ],
}

// ---------- 04 AI WORKFLOW ----------
export const AI_TOOLS = [
  {
    code: 'A-01',
    name: 'ChatGPT / Gemini / DeepSeek',
    en: 'MULTI-MODEL ROUTING',
    use: '按任务分工使用，不同需求配不同工具',
    output: null,
    pendingText: '各模型分工举例 2-3 个真实场景 + 对话截图',
  },
  {
    code: 'A-02',
    name: 'Coze',
    en: 'AGENT / AUTOMATION',
    use: '机器人 / 自动化工作流，与 05 数据中台联动',
    output: null,
    pendingText: '工作流画布、节点、运行记录截图',
  },
  {
    code: 'A-03',
    name: '飞书多维表格',
    en: 'BITABLE DASHBOARD',
    use: '部门级数据看板（详见 05 DATA OPS）',
    output: null,
    pendingText: '看板截图随 05 板块素材一并提交',
  },
  {
    code: 'A-04',
    name: 'Obsidian 个人知识库',
    en: 'KNOWLEDGE BASE',
    use: '本 GEO 知识库本身：概念 / 业务流程 / 平台信源 / 监测迭代 / 面试准备 / 行业调研',
    output: null,
    pendingText: '目录树、MOC 首页、笔记正文截图（重点证据）',
  },
  {
    code: 'A-05',
    name: '本作品集网站的制作过程',
    en: 'VIBE CODING LOG',
    use: '用 AI vibe coding 建站的过程记录',
    output: null,
    pendingText: '建站过程截图同步留存，最后补入本卡',
  },
]

// ---------- 05 DATA OPS ----------
export const DATA_OPS_ANNOTATIONS = [
  ['监控什么指标', null],
  ['数据怎么自动汇总', null],
  ['异常怎么预警', null],
  ['复盘报告怎么自动出', null],
]

// ---------- 06 GEO LAB ----------
export const GEO_STEPS = ['诊断', '规划', '内容', '分发', '监测', '复盘']
export const GEO_EN_STEPS = ['DIAGNOSE', 'PLAN', 'CONTENT', 'DISTRIBUTE', 'MONITOR', 'REVIEW']
export const GEO_LIBS = ['问题库', '事实库', '内容库', '信源库', '监测库']
export const GEO_METRICS = [
  ['提及率', 'MENTION RATE'],
  ['首推率', 'TOP RECOMMEND RATE'],
  ['引用来源分布', 'CITATION SOURCES'],
  ['情感倾向', 'SENTIMENT'],
  ['可见度占比', 'VISIBILITY SHARE'],
]
export const GEO_STANCE =
  'GEO 不是写文章，是建设一套 AI 愿意采用、用户愿意相信、业务能承接的知识资产。'

// ---------- CONTACT / FAQ ----------
export const CONTACT_ROWS = [
  ['MAIL', '邮箱', null],
  ['WECHAT', '微信', null],
  ['TEL', '电话', null],
  ['BASE', '常驻', 'GUANGZHOU, CHINA · 广州'],
]

export const FAQ = [
  {
    q: '曾俊是谁？',
    a: '曾俊（ZENG JUN），仲恺农业工程学院毕业，现任广州索伦信息科技 MCN 运营专员，base 广州，求职方向为 GEO（Generative Engine Optimization，生成式引擎优化）业务岗位。',
  },
  {
    q: '你在内容运营上有什么成果？',
    a: '从零孵化抖音 3C 账号，独立跑通选题、脚本、拍摄、剪辑到发布，做到破万粉、累计百万赞；目前带 6 个 3C 账号矩阵，矩阵累计播放 1400 多万、矩阵净增 6.6 万粉（净增为矩阵口径，非单账号）。',
  },
  {
    q: '你做过哪些多平台内容分发？',
    a: '负责过双鱼体育 × 十五运合作项目，在百家号、今日头条、搜狐、网易、公众号发布体育内容；实习期间从零运营公众号、小红书、B 站、CSDN 账号矩阵，200+ 篇内容、全网 40W+ 曝光，跑通内容引流到私域成交的链路。',
  },
  {
    q: '你如何用 AI 和数据工具提效？',
    a: '用飞书多维表格 + Coze 搭过部门级数据中台，实现自动出数、异常预警与复盘；日常重度使用 ChatGPT、Gemini、DeepSeek，按任务分工选型，并用 Obsidian 维护个人 GEO 知识库。',
  },
  {
    q: '什么是 GEO？你怎么理解 GEO？',
    a: 'GEO 是 Generative Engine Optimization（生成式引擎优化），让品牌与内容成为 AI 愿意采用、用户愿意相信、业务能承接的知识资产。方法论分六步：诊断 → 规划 → 内容 → 分发 → 监测 → 复盘，并配套问题库、事实库、内容库、信源库、监测库五库。',
  },
]
