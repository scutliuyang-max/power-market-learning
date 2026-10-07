// Resource metadata and original reading guides. Third-party books/course files are not bundled.
// Course dates identify historical teaching materials; checked is a link-review date, not a policy effective date.
const learningResources = [
  {
    id: 'china-market-foundation',
    title: '电力市场运行基本规则（2024 年第 20 号令）',
    organization: '国家发展改革委',
    kind: '官方规则', language: '中文', access: '公开原文与附件',
    license: '官方公开规章；此处提供原文链接与原创导读，不推定网站内其他内容具有开放许可。',
    url: 'https://www.ndrc.gov.cn/xxgk/zcfb/fzggwl/202405/t20240510_1377245_ext.html',
    description: '先用这份总规则建立中国电力市场的框架：谁可以参与、有哪些交易、谁组织市场、如何结算和监管。阅读时画一张“主体—交易—资金”关系图，再到省级文件寻找具体参数；国家框架不能代替当地实施细则。',
    topics: ['市场主体', '市场组织', '电能量交易', '辅助服务', '监督管理'],
    path: ['先识别经营主体、运营机构与电网企业各自职责', '按电能量、辅助服务和容量等维度整理交易', '选一个省份核对实施细则与结算口径'],
    lessonIds: [1, 2, 3, 5, 18, 19, 23, 29],
    date: '2024-04-25（2024-07-01 施行）', checked: '2026-10-07'
  },
  {
    id: 'china-spot-rules',
    title: '电力现货市场基本规则（试行）',
    organization: '国家发展改革委、国家能源局',
    kind: '官方规则', language: '中文', access: '公开原文与附件',
    license: '官方公开规范性文件；此处提供原文链接与原创导读。',
    url: 'https://www.ndrc.gov.cn/xxgk/zcfb/ghxwj/202309/t20230915_1360625.html',
    description: '把现货市场看作带有安全约束的交易与调度过程，而不是只有一条供给曲线。先找日前、日内和实时相关安排，再读出清、价格、计量结算及市场衔接。用课程中的小算例理解原理，具体实施仍要核对省级规则。',
    topics: ['现货交易', '交易时序', '安全约束', '价格形成', '市场衔接'],
    path: ['将交易时序整理成一条时间轴', '区分出清结果、实际执行与结算结果', '标记需要由当地规则确定的参数'],
    lessonIds: [4, 6, 7, 13, 15, 17, 18, 20, 28, 29],
    date: '2023-09-07', checked: '2026-10-07'
  },
  {
    id: 'china-ancillary-rules',
    title: '电力辅助服务市场基本规则（2025）',
    organization: '国家发展改革委、国家能源局',
    kind: '官方规则', language: '中文', access: '公开原文与附件',
    license: '官方公开规范性文件；此处提供原文链接与原创导读。',
    url: 'https://www.ndrc.gov.cn/xxgk/zcfb/ghxwj/202504/t20250429_1397483.html',
    description: '重点追问三件事：提供什么服务、必须达到什么技术条件、服务收益如何与电能量收益衔接。通知对连续运行现货地区的调峰类市场提出衔接要求，不能把各时期的补偿项目直接相加。再查当地服务品种、考核和费用分摊。',
    topics: ['辅助服务', '技术准入', '现货衔接', '考核', '收益边界'],
    path: ['先读通知中的现货与调峰市场衔接安排', '分别记录服务品种、技术要求和结算机制', '检查储能方案是否重复计算同一能力收益'],
    lessonIds: [18, 24, 25, 29],
    date: '2025-04-03', checked: '2026-10-07'
  },
  {
    id: 'china-forward-rules-2025',
    title: '电力中长期市场基本规则（2025 修订，2026 年施行）',
    organization: '国家发展改革委、国家能源局',
    kind: '官方规则', language: '中文', access: '公开全文',
    license: '官方公开规范性文件；此处提供原文链接与原创导读。',
    url: 'https://zfxxgk.ndrc.gov.cn/web/iteminfo.jsp?id=20581',
    description: '学习合同不能只看全年电量和均价，还要看交割曲线、交易周期、价格机制、绿电环境价值和结算衔接。本规则自 2026 年 3 月 1 日施行，并废止原 2020 年基本规则及 2024 年绿电交易专章；阅读旧资料时需辨别版本。',
    topics: ['中长期合同', '交割曲线', '绿色电力', 'PPA', '零售关系'],
    path: ['先查第 98 条的施行和替代关系', '整理合同电量、电力曲线、电价和环境价值条款', '比较固定价格与灵活价格机制承担的风险'],
    lessonIds: [5, 8, 9, 10, 21, 22, 25, 29],
    date: '2025-12-17（2026-03-01 施行）', checked: '2026-10-07'
  },
  {
    id: 'pjm-learning',
    title: 'PJM Learning Center：Market for Electricity',
    organization: 'PJM Interconnection',
    kind: '官方教程', language: '英文', access: '官网教程',
    license: '未发现该页面的开放再分发许可；仅提供链接与原创阅读指南。',
    url: 'https://learn.pjm.com/electricity-basics/market-for-electricity.aspx',
    description: '适合第一次接触国际市场时阅读。先理解发电企业、批发买方和零售用户之间的关系，再辨认电能量、容量和辅助服务的区别。PJM 是美国的一个区域市场，其做法不能代表全美国，更不能直接套用到中国省级市场。',
    topics: ['批发与零售', '市场主体', '电能量', '容量', '美国区域市场'],
    path: ['画出电力流与资金流并辨认批发、零售边界', '理解市场出清的含义，再比较其他产品', '用国际比较表记录 PJM 的区域适用范围'],
    lessonIds: [1, 2, 3, 6, 18, 19, 22, 27],
    date: '页面未标注', checked: '2026-10-07'
  },
  {
    id: 'ferc-energy-primer',
    title: 'Energy Primer: A Handbook of Energy Market Basics（2024）',
    organization: '美国联邦能源监管委员会 FERC',
    kind: '官方教程', language: '英文', access: '公开全文 PDF',
    license: '美国联邦机构公开手册；第三方图片、引用等可能保留权利。本站仅链接，不将整份手册一概标为无版权。',
    url: 'https://www.ferc.gov/media/energy-primer-handbook-energy-market-basics',
    description: '把它当作能源市场参考手册，优先读电力相关内容，暂时跳过天然气和石油细节。遇到 ISO、RTO、节点价格和输电等术语时回查定义。用手册解释制度和流程，用运营者最新规则判断某一市场当前如何执行。',
    topics: ['美国监管', 'ISO/RTO', '批发市场', '输电', '价格与风险'],
    path: ['定位目录中的电力市场部分', '建立 ISO、RTO、LMP 等术语对照表', '再到具体区域运营者网站核对最新规则'],
    lessonIds: [1, 2, 17, 18, 19, 23, 27, 28],
    date: '2024-01-17', checked: '2026-10-07'
  },
  {
    id: 'aemo-nem',
    title: 'AEMO：About the National Electricity Market（NEM）',
    organization: '澳大利亚能源市场运营机构 AEMO',
    kind: '官方教程', language: '英文', access: '官网教程与公开事实手册',
    license: '未在本资源页确认开放再分发许可；仅提供链接与原创阅读指南。',
    url: 'https://www.aemo.com.au/energy-systems/electricity/national-electricity-market-nem/about-the-national-electricity-market-nem',
    description: '用这份官方说明理解集中电力池、五分钟调度和区域之间的联系。先核对 NEM 的覆盖范围，再看系统如何持续匹配供需。澳大利亚西部和北部不属于 NEM；研究储能时还要继续查当地注册、服务品种和结算文件。',
    topics: ['澳大利亚', 'NEM', '电力池', '五分钟调度', '区域市场'],
    path: ['先确认 NEM 与西澳 WEM 的地域边界', '理解五分钟调度与供需匹配的含义', '对照中国的交易时序并列出待核对参数'],
    lessonIds: [13, 15, 20, 24, 27, 28, 29],
    date: '页面事实手册标注 2026-01-20', checked: '2026-10-07'
  },
  {
    id: 'nordpool-exchange',
    title: 'Nord Pool：How Does a Power Exchange Work?',
    organization: 'Nord Pool',
    kind: '官方教程', language: '英文', access: '官网教程',
    license: '未发现该页面的开放再分发许可；仅提供链接与原创阅读指南。',
    url: 'https://www.nordpoolgroup.com/en/the-power-market/how-does-a-power-exchange-work/',
    description: '从电力交易所的角度学习日前与日内交易、清算和担保品。区分“交易所撮合交易”和“系统运营者保持实时平衡”的职责。欧洲各市场的边界、交易产品与关门时间并不完全一样，应继续查所研究区域的具体规则。',
    topics: ['欧洲市场', '日前与日内', '交易所', '清算', '担保品'],
    path: ['比较日前拍卖与临近交割时的调整交易', '整理交易、清算和担保品的关系', '分清交易所与输电系统运营者的职责'],
    lessonIds: [2, 5, 7, 9, 22, 27, 28],
    date: '页面未标注', checked: '2026-10-07'
  },
  {
    id: 'mit-power-regulation',
    title: 'MIT OCW：Engineering, Economics and Regulation of the Electric Power Sector',
    organization: 'MIT OpenCourseWare', author: 'Ignacio Pérez-Arriaga',
    kind: '开放课程', language: '英文', access: '公开讲义与作业',
    license: 'OCW 一般采用 CC BY-NC-SA 4.0（署名、非商业、相同方式共享）；个别第三方或特别标注材料需单独核查。本站提供链接与原创导读。',
    licenseUrl: 'https://ocw.mit.edu/pages/privacy-and-terms-of-use/',
    url: 'https://ocw.mit.edu/courses/ids-505j-engineering-economics-and-regulation-of-the-electric-power-sector-spring-2010/pages/lecture-notes/',
    description: '这门课程把工程、经济与监管连接起来。建议先读电力行业组织和监管，再读网络价格、零售及需求响应，最后做一个制度比较报告。课程开设于 2010 年，适合学习分析框架；历史案例的制度状态应另查最新官方来源。',
    topics: ['监管', '网络定价', '需求响应', '市场力', '国际比较'],
    path: ['先选 L3、L4 理解组织结构与监管问题', '按兴趣阅读 L14、L17、L18 的网络和零售主题', '用同一组问题比较两个市场并更新案例来源'],
    lessonIds: [2, 14, 17, 19, 22, 23, 25, 27, 28, 29],
    date: '2010 年春季课程', checked: '2026-10-07'
  },
  {
    id: 'mit-energy-economics',
    title: 'MIT OCW：Energy Economics — Problem Sets and Solutions',
    organization: 'MIT OpenCourseWare', author: 'Paul Joskow；部分题目与解答由 Arthur Campbell 提供',
    kind: '开放课程', language: '英文', access: '公开习题与部分解答',
    license: 'OCW 一般采用 CC BY-NC-SA 4.0；第三方或特别标注材料需单独核查，部分资源注明经作者许可。本站仅链接并编写原创导读。',
    licenseUrl: 'https://ocw.mit.edu/pages/privacy-and-terms-of-use/',
    url: 'https://ocw.mit.edu/courses/14-44-energy-economics-spring-2007/pages/assignments/',
    description: '用它训练“先建模再计算”的习惯，而不是先看答案。做题前写清需求、成本和约束，做完再核对可用解答，并解释结果对应的经济含义。这是 2007 年能源经济课程，包含电力之外的主题，宜按当前课程知识点选择题目。',
    topics: ['经济学基础', '需求与成本', '价格监管', '独立练习', '模型假设'],
    path: ['先看课程简介和阅读要求，选择已学过的主题', '独立写出假设、单位、公式与结果', '对照部分解答并记录思路差异'],
    lessonIds: [13, 14, 19, 23, 26],
    date: '2007 年春季课程', checked: '2026-10-07'
  },
  {
    id: 'nptel-restructured',
    title: 'NPTEL：Restructured Power Systems',
    organization: 'NPTEL / IIT Delhi（课程页标注）', author: 'S. A. Khaparde、A. R. Abhyankar',
    kind: '开放课程', language: '英文', access: '公开课程页与教学大纲',
    license: '未确认该课程材料的统一开放再分发许可；仅提供官网链接。公开可访问不等于允许转载。',
    url: 'https://nptel.ac.in/courses/108101005',
    description: '课程大纲从传统系统与重组系统的区别出发，再进入微观经济学、市场设计、拥塞和辅助服务。适合将已学过的电力系统知识接到市场分析上。遇到复杂技术公式时先回到双节点与机会成本小算例，再继续阅读。',
    topics: ['电力重组', '微观经济学', '市场设计', '拥塞管理', '辅助服务'],
    path: ['先按官网 Syllabus 确认知识先后顺序', '复习成本、需求和竞争市场概念', '结合拥塞与辅助服务算例检查理解'],
    lessonIds: [2, 13, 14, 15, 17, 18, 23, 28],
    date: '页面未标注', checked: '2026-10-07'
  },
  {
    id: 'textbook-kirschen-strbac',
    title: 'Fundamentals of Power System Economics',
    organization: 'Wiley', author: 'Daniel Kirschen、Goran Strbac',
    kind: '教材书目', language: '英文', access: '出版社书目与目录；部分前后材料可公开访问，非开放全文',
    license: '出版社保留版权；未发现全书开放再分发许可，仅提供书目链接，不保存教材全文。',
    url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/0470020598',
    description: '这本基础书把竞争市场的经济逻辑与电网工程约束放在一起。适合按经济概念、电能量市场、辅助服务、输电与投资逐步阅读。当前链接对应 2004 年出版版，学习原理时有参考价值，研究今天的政策必须补充最新官方文件。',
    topics: ['经济学基础', '电能量市场', '辅助服务', '输电网络', '投资'],
    path: ['从目录判断需要补哪些经济学概念', '完成网络与辅助服务课后再对应阅读相关章节', '区分教材中的一般原理与历史制度案例'],
    lessonIds: [13, 14, 17, 18, 19, 23, 26, 28],
    date: '2004-03-26（本链接版本）', checked: '2026-10-07'
  },
  {
    id: 'textbook-creti-fontini',
    title: 'Economics of Electricity: Markets, Competition and Rules',
    organization: 'Cambridge University Press', author: 'Anna Cretì、Fulvio Fontini',
    kind: '教材书目', language: '英文', access: '出版社书目、目录与简介；全文需购买或机构权限',
    license: '未发现全书开放再分发许可；仅提供出版社书目链接，不保存教材全文。',
    url: 'https://www.cambridge.org/core/books/economics-of-electricity/143CDE0ABA103D4C2B2A50A938E3D868',
    description: '适合希望理解“为什么这样设计市场”的学习者。先掌握行业组织和产品时间维度，再看竞争、网络、零售、投资与环境问题。阅读每个市场机制时都问：它解决什么约束、分配什么风险、在什么条件下可能失效？',
    topics: ['市场设计', '竞争', '网络拥塞', '零售', '环境与投资'],
    path: ['先看行业结构、市场设计和产品时间维度的目录', '把竞争与网络章节对应到本课程算例', '用零售、投资及环境主题完成综合分析'],
    lessonIds: [2, 13, 14, 17, 19, 21, 22, 23, 26, 27],
    date: '2019-05-30', checked: '2026-10-07'
  },
  {
    id: 'textbook-papavasiliou',
    title: 'Optimization Models in Electricity Markets',
    organization: 'Cambridge University Press', author: 'Anthony Papavasiliou',
    kind: '教材书目', language: '英文', access: '出版社书目；部分配套资源免费，部分仅限教师；教材非开放全文',
    license: '未发现教材全文开放再分发许可；配套资源须按各自条款使用。此处仅提供出版社链接。',
    url: 'https://www.cambridge.org/highereducation/books/optimization-models-in-electricity-markets/0D2D36891FB5EB6AAC3A4EFC78A8F1D3',
    description: '适合从手算走向模型：先学如何表示目标、变量和约束，再研究网络、备用、机组组合及投资。数学基础较弱时先完成站内小算例，再通过同作者配套讲义巩固。程序求出的数字仍需要检验单位、边界和制度假设。',
    topics: ['优化模型', '网络定价', '备用', '机组组合', '需求响应'],
    path: ['先阅读目录并补充线性规划基础', '把手算题转成变量、约束与目标函数', '比较结果与配套示例并做参数敏感性分析'],
    lessonIds: [13, 14, 15, 17, 18, 19, 24, 25, 26, 28],
    date: '2024-06-13（纸本）；2025-01-09（数字版）', checked: '2026-10-07'
  },
  {
    id: 'papavasiliou-companion',
    title: 'Optimization Models in Electricity Markets：作者配套讲义、补充习题与勘误',
    organization: 'Anthony Papavasiliou 研究组', author: 'Anthony Papavasiliou',
    kind: '开放课程', language: '英文', access: '作者公开讲义、补充习题与解答',
    license: '页面未明确统一开放再分发许可；材料由作者公开提供，本站仅链接，不转载讲义或题集。',
    url: 'https://ap-rg.eu/courses/optimization-models-in-electricity-markets-book/',
    description: '这是教材作者提供的配套入口，含主题讲义、额外练习及勘误。建议先选经济调度、节点价格和备用，再进到机组组合。做补充练习时先关闭解答，列出模型后独立求解；最后读勘误，避免把已更正的表达沿用到自己的分析。',
    topics: ['经济调度', '节点与分区价格', '辅助服务', '机组组合', '模型练习'],
    path: ['从 Economic dispatch 讲义复习模型语言', '再按 Locational marginal pricing、Ancillary services 递进', '独立做补充练习，最后对照解答和勘误'],
    lessonIds: [13, 14, 15, 17, 18, 19, 24, 25, 26, 28],
    date: '页面未标注', checked: '2026-10-07'
  }
];

const resourceReadingPaths = [
  {
    title: '中文起步：先建框架，再读规则',
    goal: '先完成站内基础课，再用国家文件建立主体、交易与结算的关系，随后核对省级实施细则。',
    ids: ['china-market-foundation', 'china-spot-rules', 'china-forward-rules-2025', 'china-ancillary-rules']
  },
  {
    title: '国际入门：按同一组问题比较市场',
    goal: '从官方教程辨认地域边界、运营主体、价格方式和交易时序，形成有来源的比较表。',
    ids: ['pjm-learning', 'ferc-energy-primer', 'aemo-nem', 'nordpool-exchange', 'mit-power-regulation']
  },
  {
    title: '模型进阶：从手算到独立建模',
    goal: '先补经济学与约束语言，再用教材书目和公开配套资源训练网络、备用、机组组合与投资分析。',
    ids: ['mit-energy-economics', 'nptel-restructured', 'textbook-kirschen-strbac', 'textbook-creti-fontini', 'textbook-papavasiliou', 'papavasiliou-companion']
  }
];
