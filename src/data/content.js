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
    thumb: 'images/hits/h-01-01.jpg',
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
    thumb: 'images/commercial/liyuanyu-1-1280.webp',
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
    thumb: 'images/commercial/seeding-iqoo.webp',
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
    thumb: 'images/commercial/seeding-s60.webp',
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
    thumb: 'images/commercial/seeding-xfold6.webp',
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
    html: '<b>数据与 AI</b>——用飞书多维表格搭部门级数据看板，自动出数、异常预警；日常重度使用 ChatGPT、Gemini、DeepSeek 做内容生产与分析，用 Obsidian 沉淀个人知识库。',
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

const v = (code, account, cover, title, link) => ({
  code, account, cover, title,
  link: link || null,
  date: null, plays: null, likes: null, comments: null, follows: null, hook: null,
})

export const HIT_GROUPS = {
  own: [
    v('H-36', '自有账号', 'images/hits/h-01-01.jpg', '自有爆款 01'),
    v('H-37', '自有账号', 'images/hits/h-02-01.jpg', '自有爆款 02'),
    v('H-38', '自有账号', 'images/hits/h-03-01.jpg', '自有爆款 03'),
    v('H-39', '自有账号', 'images/hits/h-06-01.jpg', '自有爆款 04'),
  ],
  managed: [
    // 回声屏幕所（6条）
    { ...v('H-01', '回声屏幕所', 'images/hits/h-01-01.jpg', 'vivo X500 屏幕开箱', 'https://v.douyin.com/R6B3fbkzkss/'), date:'2026-09-10', likes:12000, comments:141, collects:137, shares:308, follows:2130, role:'审核、跟拍、发布内容' },
    v('H-02', '回声屏幕所', 'images/hits/h-01-02.jpg', 'vivo X500 屏幕测试'),
    v('H-03', '回声屏幕所', 'images/hits/h-01-03.jpg', 'vivo X Fold6 屏幕测试'),
    v('H-04', '回声屏幕所', 'images/hits/h-01-04.jpg', '屏幕之王爆款'),
    v('H-05', '回声屏幕所', 'images/hits/h-01-05.jpg', '旗舰机户外发热测试'),
    v('H-06', '回声屏幕所', 'images/hits/h-01-06.jpg', '曲面屏慢慢消失'),
    // 回声现场影像对比（12条）
    v('H-07', '回声现场影像对比', 'images/hits/h-02-01.jpg', 'F4 影像爆款'),
    v('H-08', '回声现场影像对比', 'images/hits/h-02-02.jpg', 'vivo S60 影像 4K Live'),
    v('H-09', '回声现场影像对比', 'images/hits/h-02-03.jpg', 'vivo X300E 调色盘创意'),
    v('H-10', '回声现场影像对比', 'images/hits/h-02-04.jpg', 'X300s 蔡依林演唱会'),
    v('H-11', '回声现场影像对比', 'images/hits/h-02-05.jpg', 'vivo X300 国风 01'),
    v('H-12', '回声现场影像对比', 'images/hits/h-02-06.jpg', 'vivo X300 国风 02'),
    v('H-13', '回声现场影像对比', 'images/hits/h-02-07.jpg', 'vivo X300 歌手'),
    v('H-14', '回声现场影像对比', 'images/hits/h-02-08.jpg', 'vivo X300 长视频'),
    v('H-15', '回声现场影像对比', 'images/hits/h-02-09.jpg', 'X Fold6 时尚之夜'),
    v('H-16', '回声现场影像对比', 'images/hits/h-02-10.jpg', 'X Fold6 测评长视频'),
    v('H-17', '回声现场影像对比', 'images/hits/h-02-11.jpg', '年度机皇爆款'),
    v('H-18', '回声现场影像对比', 'images/hits/h-02-12.jpg', '邓紫棋爆款'),
    // 回声拆机少女（7条）
    v('H-19', '回声拆机少女', 'images/hits/h-03-01.jpg', 'iQOO 15T 拆机'),
    v('H-20', '回声拆机少女', 'images/hits/h-03-02.jpg', 'iQOO Neo 跑分爆款'),
    v('H-21', '回声拆机少女', 'images/hits/h-03-03.jpg', 'iQOO Z11s 开箱'),
    v('H-22', '回声拆机少女', 'images/hits/h-03-04.jpg', 'vivo X300E 开箱'),
    v('H-23', '回声拆机少女', 'images/hits/h-03-05.jpg', 'vivo X Fold6 拆机'),
    v('H-24', '回声拆机少女', 'images/hits/h-03-06.jpg', '小米 17U 维修爆款'),
    v('H-25', '回声拆机少女', 'images/hits/h-03-07.jpg', 'X500 拆机开箱'),
    // 回声数码站（2条）
    v('H-26', '回声数码站', 'images/hits/h-04-01.jpg', '华为爆款'),
    v('H-27', '回声数码站', 'images/hits/h-04-02.jpg', '玄戎芯片爆款'),
    // 回声系统测评（2条）
    v('H-28', '回声系统测评', 'images/hits/h-05-01.jpg', 'X Fold6 原子工作台'),
    v('H-29', '回声系统测评', 'images/hits/h-05-02.jpg', 'WWDC Tim 谢幕之作'),
    // 回声行业观察（6条）
    v('H-30', '回声行业观察', 'images/hits/h-06-01.jpg', 'iQOO 16 开发者大会'),
    v('H-31', '回声行业观察', 'images/hits/h-06-02.jpg', 'X500 主摄爆料'),
    v('H-32', '回声行业观察', 'images/hits/h-06-03.jpg', '真我 GT8 Pro'),
    v('H-33', '回声行业观察', 'images/hits/h-06-04.jpg', '高通长鑫爆款'),
    v('H-34', '回声行业观察', 'images/hits/h-06-05.jpg', '魅族 Flyme 爆款'),
    v('H-35', '回声行业观察', 'images/hits/h-06-06.jpg', '魅族落寞爆款'),
  ],
}

// 方法论示例标签（02 文档举例，成片后按实际替换）
export const METHOD_TAGS_DEMO = ['热点+钩子', '反差开头', '评论区运营']

// ---------- 03 COMMERCIAL ----------
export const COMMERCIAL_CASES = [
  {
    code: 'B-01',
    title: '双鱼体育 × 十五运合作项目',
    tagline: '#诗与远方 乒出广东力量#',
    role: '执行 + 部分对客',
    actions: [
      '百家号、今日头条、搜狐、网易、公众号的体育内容发布',
      '里程碑倒排、多方统筹',
      '借势而不造势：借「人民满意的十五运」叙事，把品牌行动做成全民健康运动宣传',
      '先算清三个平衡：品牌宣传 × 公众共鸣 / 内容锐度 × 渠道力度 / 团队荣誉 × 团队美誉',
    ],
    win: ['政府赢 · 口号具象化', '品牌赢 · 美誉 + 流量 + 转化', '代言人赢 · 形象进阶'],
    phases: [
      { name: '星聚预热', desc: '赛前持续铺双鱼预热稿件' },
      { name: '星耀夺冠', desc: '夺冠夜官微联动矩阵 30 分钟内齐发' },
      { name: '星动全民', desc: '「全民运动时」官宣号召' },
      { name: '星续全民', desc: '深度稿 + 体验稿长效沉淀' },
    ],
    badges: ['湾区十五纪念球礼盒', '十五运乒乓器材独家供应商'],
    result: '发布 275 篇，累计阅读 10w+，互动 1000+',
    geoNote:
      '飞书多维表格 + AI Agent 搭部门级数据中台：自动监控、异常预警、定期复盘；推动 AIGC 内容生产线落地为 SOP',
    sources: ['百家号', '今日头条', '搜狐', '网易', '公众号'],
  },
  {
    code: 'B-02',
    title: '李原宇篮球 · 公众号代运营',
    role: '公众号内容运营',
    actions: [
      '从 0 搭建「李原宇篮球」公众号内容体系：选题策划、文案撰写、视觉排版、发布全流程',
      '结合 CBA 职业球员教练 IP，输出寒假训练营招生、双十一课程促销、学员福利等系列推文',
      '围绕家长决策路径设计转化链路：课程优惠、抽奖、老带新、集赞兑换，推文内嵌报名引导',
      '配合活动节奏（开学季/寒假班/大促节点）做内容排期，多校区信息统一口径',
    ],
    result: '发布推文 10+ 篇，累计阅读 5000+',
    geoNote: null,
    sources: ['微信公众号'],
    images: [
      'images/commercial/liyuanyu-1-1280.webp',
      'images/commercial/liyuanyu-2-1280.webp',
      'images/commercial/liyuanyu-3-1280.webp',
      'images/commercial/liyuanyu-4-1280.webp',
      'images/commercial/liyuanyu-5-1280.webp',
      'images/commercial/liyuanyu-6-1280.webp',
      'images/commercial/liyuanyu-7-1280.webp',
    ],
  },
  {
    code: 'B-03',
    kind: '商单种草',
    title: 'iQOO 618 大促 · 商单种草',
    role: '信息流项目 · 供应商对接 + 内容审核',
    actions: [
      '供应商对接：排期 / 交付 / 验收，让多方按同一节奏跑',
      '内容审核：合规 / 品牌表达 / 转化钩子逐项过审',
      '好价攻略 + 教育优惠两阶段精准锁人群',
      '交付 + 复盘成套：客户拿到结果，我拿到方法',
    ],
    result: '72 篇种草内容 · 总互动量 1.9 万+ · 高互动率占比 18%',
    geoNote: null,
    sources: [],
  },
  {
    code: 'B-04',
    kind: '商单种草',
    title: 'vivo S60 商单种草',
    role: '信息流项目 · 供应商对接 + 内容审核',
    actions: [
      '供应商对接：排期 / 交付 / 验收，让多方按同一节奏跑',
      '内容审核：合规 / 品牌表达 / 转化钩子逐项过审',
      '决策 + 产品力双轨，预热引爆到长尾转化',
      '交付 + 复盘成套：客户拿到结果，我拿到方法',
    ],
    result: '320 篇种草内容 · 小红书 + 抖音双平台 · 总互动量 12.8 万+ · 高互动率占比 25%',
    geoNote: null,
    sources: ['小红书', '抖音'],
  },
  {
    code: 'B-05',
    kind: '商单种草',
    title: 'vivo X Fold6 商单种草',
    role: '信息流项目 · 供应商对接 + 内容审核',
    actions: [
      '供应商对接：排期 / 交付 / 验收，让多方按同一节奏跑',
      '内容审核：合规 / 品牌表达 / 转化钩子逐项过审',
      '苹果搭子 + AI 轻办公场景，首销周口碑破圈',
      '交付 + 复盘成套：客户拿到结果，我拿到方法',
    ],
    result: '282 篇（图文 162 + 视频 120）· 总阅读量 20.1 万 · 总互动量 5000+',
    geoNote: null,
    sources: [],
  },
  {
    code: 'B-06',
    kind: '商单种草',
    title: '助力项目投放 · 商单创意内容',
    role: '商单项目执行 · 创意内容投放管理',
    actions: [
      'KVL 账号发布 + 团队执行双口径管理：KVL 发布数量为自有账号发布内容，团队执行数量为项目团队交付内容',
      '创意内容按产品归类投放：爆料解读 / 8K Live / 多机对比 / MV 传播 / 探店 / 评测等类型矩阵',
      '播放空值统一按 1500 估算计入，待实际播放回填后重算（只读统计，未修改中台数据）',
      '互动量 = 点赞 + 评论 + 收藏 + 转发，按互动率监控高互动内容',
    ],
    phasesTitle: 'EXECUTION BREAKDOWN / 项目执行明细',
    phases: [
      { name: '阿如那 vivo X300U 宣传', desc: 'X300 Ultra · 2026-07 · KVL 2 / 团队 2 · 长尾期' },
      { name: 'X300E 探店视频', desc: 'X300E · 2026-07 · KVL 0 / 团队 6 · 预热期' },
      { name: '线条小狗 vivo S60', desc: 'X300E · 2026-07 · KVL 0 / 团队 1 · 引爆期' },
      { name: 'Neo11 零售机评测', desc: 'iQOO Neo11 至尊版 · 2026-08 · KVL 2 / 团队 2 · 引爆期' },
      { name: '线条小狗 vivoX300E', desc: 'S60 · 2026-09 · KVL 1 / 团队 0 · 引爆期' },
      { name: '周杰伦《西西里》MV × X500 Pro Max 短视频', desc: 'X500 Pro Max · 2026-09 · KVL 4 / 团队 5 · 预热期' },
      { name: '晴天相册小组件', desc: 'X500 · 2026-09 · KVL 0 / 团队 2 · 预热期' },
      { name: 'X500 系列视频传播', desc: 'X500 · 2026-09 · KVL 2 / 团队 15 · 预热期' },
    ],
    badges: ['vivo X 500', 'X 500 Pro Max', 'X 300 Ultra', 'X 300E', 'S60', 'iQOO Neo11'],
    result:
      '投放记录 205 条 · 覆盖 6 款产品 · 总播放 44.0 万（含估算）· 总互动 1.7 万；8 个执行项目 · KVL 发布 11 条 · 团队执行 33 条',
    geoNote: null,
    sources: ['抖音', '小红书', '视频号', '微博', '快手'],
  },
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
    en: 'MULTI-MODEL ROUTING',
    name: 'Gemini/ChatGPT/DeepSeek 等 LLM 大模型',
    output: null,
    use: '按任务分工使用，不同需求配不同工具',
    images: ['images/agent/chatgpt.webp', 'images/agent/gemini.webp', 'images/agent/deepseek.webp'],
    pendingText: '各模型分工举例 2-3 个真实场景 + 对话截图',
  },
  {
    code: 'A-02',
    name: 'Agent 大模型编排',
    en: 'AGENT ORCHESTRATION',
    use: '用 Agent 搭建轻量化工具：模型 + Skill + 个人知识库组合调用，持续更新迭代，精准完成任务',
    output: null,
    images: ['images/agent/qwen.webp', 'images/agent/doubao.webp', 'images/agent/workbuddy-1.webp', 'images/agent/todo.webp'],
    pendingText: '工作流画布、节点、运行记录截图',
  },
  {
    code: 'A-03',
    name: '飞书多维表格',
    en: 'BITABLE DASHBOARD',
    use: '部门级数据看板（详见 05 DATA OPS）',
    output: null,
    images: ['images/agent/zhongtai.webp', 'images/agent/zhongtai-2.webp'],
    pendingText: '看板截图随 05 板块素材一并提交',
  },
  {
    code: 'A-04',
    name: 'Obsidian 个人 + 工作知识库',
    en: 'PERSONAL + WORK KNOWLEDGE',
    use: 'Obsidian 是主力：个人知识更新迭代、工作方法论、工作内容整理都沉淀在这里；飞书知识库与 NotebookLM 侧重工作场景协同——用 NotebookLM 上传复盘录音/会议纪要，自动整理账号运营问题与整改建议，飞书知识库沉淀团队共享 SOP',
    output: null,
    images: ['images/knowledge/obsidian-1.webp', 'images/knowledge/obsidian-2.webp', 'images/knowledge/github-1.webp', 'images/agent/notebooklm-1.webp', 'images/knowledge/notebooklm-detail.webp'],
    pendingText: '目录树、MOC 首页、笔记正文截图（重点证据）',
  },
  {
    code: 'A-05',
    name: '本作品集网站的制作过程',
    en: 'VIBE CODING LOG',
    use: '确立风格 → 搭 Hero+Profile+Hits 样板 → 整理内容利用 Agent 放入 → 接入 GlowCursor / 手风琴经历 / 工具 Dock → 补 AI Workflow 手风琴画廊、FAQ 丝滑展开、HITS 横条滚轮接管 → 每轮按截图反馈微调排版 / 字号 / 配色 / 响应式 → Git 多台设备同步打磨。',
    output: null,
    images: ['images/agent/vibe-coding.webp', 'images/agent/doubao.webp', 'images/knowledge/github-2.webp'],
    pendingText: '建站过程截图同步留存，最后补入本卡',
  },
]

// ---------- 05 DATA OPS ----------
export const DATA_OPS_ANNOTATIONS = [
  [
    '监控什么指标',
    '作品总数 416、9 月发布 57 条、9 月总播放 221 万、9 月互动总量 7.9 万、商业团队执行 33 条（2026-09 口径）；按账号、按月度双维度跟踪播放量与互动量趋势，并用 v 量类型分布（主含 / 轻含 / 未含）判断内容结构健康度。',
  ],
  [
    '数据怎么自动汇总',
    '从「作品数据明细表」「账号配置表及月目标」自动聚合到看板，播放量、互动量按账号 × 月度实时汇总，替代手工拉 Excel 拼表，打开仪表盘即出全局结果。',
  ],
  [
    '异常怎么预警',
    '账号月度验收存档 + 助力项目执行数据表联动，对断更、低播放、目标差异率做监控标记；本月 33 条商业执行进度逐条可见，未达标自动亮出，不用等人汇报。',
  ],
  [
    '复盘报告怎么自动出',
    '月度验收存档按账号自动沉淀，周报 / 月报直接取看板数据生成，复盘结论从「临时翻数据」变成「打开即见」，每次复盘省 1 小时以上手工整理。',
  ],
]

// ---------- 06 GEO LAB ----------
export const GEO_STEPS = ['诊断', '规划', '内容', '分发', '监测', '复盘']
export const GEO_EN_STEPS = ['DIAGNOSE', 'PLAN', 'CONTENT', 'DISTRIBUTE', 'MONITOR', 'REVIEW']
export const GEO_STEP_DEFS = {
  诊断: '测 AI 怎么看这个品牌，看竞品、找缺口',
  规划: '建问题库、排优先级、统一品牌信息',
  内容: '先给结论、结构化、带数据、FAQ',
  分发: '按平台偏好，铺知乎 / 百家号 / 第三方背书',
  监测: '固定问题库，分平台跑题，记提及率',
  复盘: '定位归因，调整验证，形成闭环',
}
export const GEO_LIBS = [
  {
    cn: '问题库',
    en: 'QUESTION',
    def: '用户到底怎么问',
    tags: '场景词 · 决策词 · 长尾词 · 联想词',
  },
  {
    cn: '事实库',
    en: 'FACTS',
    def: '品牌有什么可说可证',
    tags: '产品 · 案例 · 资质 · 每句话有据可查',
  },
  {
    cn: '内容库',
    en: 'CONTENT',
    def: '用什么承接问题',
    tags: '官网 · FAQ · 对比 · 案例 · 白皮书',
  },
  {
    cn: '信源库',
    en: 'SOURCES',
    def: 'AI 从哪里相信你',
    tags: '官网 · 媒体 · 平台 · 第三方口碑',
  },
  {
    cn: '监测库',
    en: 'MONITOR',
    def: '优化有没有效果',
    tags: 'AI 答案记录 · 竞品 · 错误事实',
  },
]
export const GEO_METRICS = [
  { cn: '提及率', en: 'MENTION RATE', def: '问 100 个问题，AI 提到你几次', rel: '有没有被看见' },
  { cn: '首推率', en: 'TOP RECOMMEND RATE', def: '提到你时，排在第几位', rel: '被推荐的深度' },
  { cn: '引用来源', en: 'CITATION SOURCES', def: 'AI 引用你哪篇、哪家媒体', rel: '信源是否有效' },
  { cn: '情感倾向', en: 'SENTIMENT', def: 'AI 说你好话还是坏话', rel: '口碑是否正向' },
  { cn: '可见度占比', en: 'VISIBILITY SHARE', def: '同主题 AI 回答中品牌的出现份额', rel: '整体可见度' },
]
export const GEO_STANCE =
  'GEO 不是写文章，是建设一套 AI 愿意采用、用户愿意相信、业务能承接的知识资产。'

// ---------- CONTACT / FAQ ----------
export const CONTACT_ROWS = [
  ['MAIL', '邮箱', '1075584739@qq.com'],
  ['WECHAT', '微信', 'kFcVMe616'],
  ['TEL', '电话', '15019181937'],
  ['BASE', '常驻', 'GUANGZHOU, CHINA · 广州'],
]

export const FAQ = [
  {
    q: '你为什么想转 GEO 方向？核心优势是什么？',
    a: '内容运营做了两年，账号从 0 跑到破万粉、矩阵累计 1400W+ 播放，越来越发现 AI 正在接管搜索与内容分发入口——品牌要被 AI 看见、被用户信任，内容就必须结构化、可被引用。我的优势是真干过：品牌种草+IP孵化全流程、多平台分发与信源运营、数据看板、AI Agent 工作流、Obsidian 知识库，这套从方法论到落地的动作我都自己跑通过，能把 GEO 真正落到内容和数据上。',
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
    a: '模型按任务分工选型（ChatGPT / Gemini / DeepSeek）；用 Agent 编排搭建轻量化工具，模型+Skill+个人知识库组合、持续迭代精准完成任务；飞书多维表格做部门级数据看板与自动出数；Obsidian 沉淀个人+工作知识库。',
  },
  {
    q: '什么是 GEO？你怎么理解 GEO？',
    a: 'GEO 是 Generative Engine Optimization（生成式引擎优化），让品牌与内容成为 AI 愿意采用、用户愿意相信、业务能承接的知识资产。方法论分六步：诊断 → 规划 → 内容 → 分发 → 监测 → 复盘，并配套问题库、事实库、内容库、信源库、监测库五库。',
  },
]

// ---------- 01 PROFILE 改版：任职经历（依据简历） + 常用工具墙 ----------
export const EXPERIENCE = [
  {
    company: '广州索伦信息科技有限公司',
    dept: 'MCN 中心',
    role: '运营专员',
    period: '2025.08 - 至今',
    points: [
      '主导 6 个 3C 数码矩阵账号从 0→1 的内容定位、选题、审核与发布节奏，跑通 5 个万粉标杆 IP；矩阵累计发布 286 条内容，全网总播放 1413W+、总互动 21W+、净增粉丝 6.6W+（矩阵口径）',
      '独立完成抖音垂直 IP 0→1：热点捕捉 → 脚本 → 拍摄剪辑 → 发布 → 粉丝运营全流程，单账号 0→1.06W 粉、累计获赞 124W+；用豆+/内容加热放大冷启动，沉淀「热点＋钩子结构」爆款方法论',
      '品牌商单交付：解读 Brief、跨平台种草整合营销，管理 KOC/素人资源与稿件合规，助力团队月营业额 30W+；负责里程碑倒排、走款跟进与成本核算',
      '双鱼体育 × 十五运事件营销执行：对接其他部门进行沟通审稿，管理百家号、搜狐号、网易号、公众号、今日头条内容发布',
      '用飞书多维表格 + AI Agent 搭部门级数据中台：自动监控、异常预警、定期复盘；推动 AIGC 内容生产线（生图/文案/视频）落地为 SOP',
    ],
    keywords: ['账号矩阵', '爆款方法论', '抖音 IP 0-1', '商单交付', '项目统筹', '飞书多维表格', 'AI Agent', 'AIGC SOP'],
  },
  {
    company: '广州科奥信息技术有限公司',
    dept: '市场部',
    role: '用户运营实习生',
    period: '2025.03 - 2025.06',
    points: [
      '参与制定艾思科蓝品牌全网运营策略，统筹公众号 / 小红书 / B站 / CSDN 多平台矩阵 0→1，累计产出 232 篇内容，全网总曝光 43W+、互动 8.8K+，渗透目标科研用户圈层',
      '主导公众号与小红书选题图文策划，打造高粘性干货内容：小红书单篇浏览 30W+（互动 6K+）、公众号 3.1W+，公域流量沉淀至品牌私域',
      '搭建「内容 → 线索 → 成交」转化路径，促成 2 单高客单论文辅导、变现 4.7W，验证内容商业化闭环',
      '专家/学者等高价值用户全周期维系，横向协调商务/开发/学术资源，保障交付按时按质',
    ],
    keywords: ['品牌矩阵 0-1', '小红书运营', '公众号运营', '用户增长', '私域转化', '高客单变现', '用户维系'],
  },
  {
    company: '广东环境科学学会',
    dept: '运营部',
    role: '用户运营实习生',
    period: '2024.03 - 2024.09',
    points: [
      '对接环境科学领域专家与教授，开展定制化需求分析与分层维系；把控材料申报流程与技术规范，为多位专家提供专业合规的申报咨询',
      '协助统筹省级大型职称评审大会与学术活动，用数字化会务系统做精细化座席规划与资源调度',
      '建立专家需求、申报进度与会务数据（参会人数/到场率/现场反馈）数据表，形成定期复盘机制',
    ],
    keywords: ['专家用户运营', '活动/会务统筹', '申报材料', '数据复盘', '跨部门协同'],
  },
]

// slug 对应 simple-icons CDN，图标加载失败自动回退字母块
export const TOOL_GROUPS = [
  { label: 'AI 模型', items: [
    { name: 'ChatGPT', use: '通用推理 / 文案', local: '/icons/chatgpt.jpg', glyph: 'GPT' },
    { name: 'Gemini', use: '长文 / 多模态', slug: 'googlegemini', color: '4796E3', glyph: 'G' },
    { name: 'DeepSeek', use: '深度推理 / 代码', slug: 'deepseek', color: '4D6BFE', glyph: 'DS' },
    { name: '豆包工作', use: '办公 / Agent', local: '/icons/doubao.jpg', glyph: '豆' },
    { name: 'Qwen Agent', use: '通义智能体', slug: 'qwen', color: '615CED', glyph: 'QW' },
    { name: 'WorkBuddy', use: '工作助手', local: '/icons/workbuddy.jpg', glyph: 'WB' },
  ]},
  { label: '设计', items: [
    { name: 'Photoshop', use: '视觉修图 / 海报', slug: 'adobephotoshop', color: '31A8FF', glyph: 'Ps' },
  ]},
  { label: '协同与知识', items: [
    { name: '飞书', use: '协同 / 多维表格', local: '/icons/lark.jpg', glyph: '飞' },
    { name: 'NotebookLM', use: '笔记 / 知识库', local: '/icons/notebooklm.jpg', glyph: 'NB' },
    { name: 'Obsidian', use: '个人知识库', slug: 'obsidian', color: '7C3AED', glyph: 'OB' },
  ]},
]
