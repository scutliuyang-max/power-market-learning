// 原创中文教学摘要；数字算例均为演示假设。官方页面核查日见 checked。
// 区域市场的机制不能直接外推到该国全部地区，最新业务适用规则以官方版本为准。
const internationalMarkets = [
  {
    id: 'us-pjm', name: '美国 · PJM', country: '美国',
    scope: '覆盖美国东部及中西部部分州的区域批发市场，不能代表全美国。', region: '美洲',
    model: '节点集中出清', tags: ['节点电价', '日前与实时', '容量市场', '储能与需求响应'],
    summary: 'PJM 将电量、短期系统服务与未来可用容量分开交易。理解它的关键是：一度电送到不同位置，边际成本可能不同；能够在紧张时供电，也具有独立的容量价值。',
    governance: 'PJM 是区域输电组织，协调跨州电网并运营批发市场。发电商、售电及负荷服务主体、需求响应等参与交易，FERC 监管相关批发规则。各州的零售选择和配电安排另有制度，区域批发市场不等于家庭电价。',
    sequence: '日前市场安排次日电量并形成财务结算结果；实时市场按五分钟时段处理实际运行。参与者用日前交易管理风险，实际电量相对日前安排的偏差按实时价格结算。机组启停、爬坡、备用和输电限制都会影响出清。',
    pricing: '节点边际电价 LMP 表示某地点增加一单位电量需求的边际成本，包含能量、阻塞和损耗成分。线路畅通时节点价格较接近；输电瓶颈会造成价差。节点价格不是平均发电成本，也不包含居民账单的全部收费。',
    balance: 'PJM 采购调频与备用等辅助服务，帮助频率稳定并应对机组故障。能量和备用之间存在机会成本：留出上调空间可能减少当期发电。能量与相关服务的联合优化，需要同时满足资源能力和系统安全约束。',
    adequacy: 'Reliability Pricing Model 容量市场用于采购未来满足可靠性要求的可用资源。容量承诺与实际售电是两种产品：前者强调特定交付期可用性及履约，后者按实际电量结算。容量收入也伴随资格、性能和违约约束。',
    transition: '储能可参与能量、容量和辅助服务，但每种产品都有注册与能力要求。FERC 第 841 号令要求相关 RTO/ISO 为储能建立适当参与模型；不能据此推断任一小型电池已自动取得全部市场资格，也不能重复占用同一能力。',
    caution: '以区域规则学习机制。PJM Manual 11 当前核查版本为第 137 次修订，2026-07-28 生效；容量参数与后续手册修订应重新查验。不要把 PJM 的制度套用于 ERCOT 或其他美国地区。',
    case: {
      title: '为什么两个节点会出现不同价格？',
      body: '假设 A 节点机组报价 30 美元/MWh，B 节点机组报价 70 美元/MWh。B 节点一小时需要 80 MWh，A 到 B 的线路只能传送 50 MWh，A 的便宜机组还有余力。',
      formula: '供电成本 = 50 × 30 + 30 × 70 = 3,600 美元；B 比 A 的边际价高 70 − 30 = 40 美元/MWh。',
      result: '先输送 50 MWh 的便宜电，再由 B 供给 30 MWh。此简化模型下 A 的边际价为 30，B 为 70。',
      boundary: '原创教学假设；忽略损耗、环流、启停、爬坡和备用。总供电成本不能直接当作用户账单或机组利润。'
    },
    sources: [
      { title: 'Manual 11: Energy & Ancillary Services Market Operations', url: 'https://www.pjm.com/-/media/DotCom/documents/manuals/m11.pdf', organization: 'PJM', note: '第 137 次修订；能量、LMP、五分钟偏差结算及辅助服务。', date: '2026-07-28' },
      { title: 'Capacity Market (RPM)', url: 'https://www.pjm.com/markets-and-operations/rpm', organization: 'PJM', note: '容量市场目的与官方业务入口；动态页面按核查日记录。' },
      { title: 'Order No. 841', url: 'https://www.ferc.gov/media/order-no-841', organization: 'FERC', note: '储能参与 RTO/ISO 能量、容量与辅助服务的监管框架；各市场实施细则仍需另查。', date: '2018-02-15' }
    ], fieldSources: { governance: [0, 2], sequence: [0], pricing: [0], balance: [0], adequacy: [1], transition: [2] }, checked: '2026-10-07'
  },
  {
    id: 'us-ercot', name: '美国 · ERCOT', country: '美国',
    scope: '得克萨斯州 ERCOT 区域案例；不覆盖得州所有地区，也不代表全美国。', region: '美洲',
    model: '节点集中出清', tags: ['能量为主', '实时联合优化', '稀缺价格', '储能 SOC'],
    summary: 'ERCOT 是比较能量型市场的典型案例。没有 PJM 式远期容量拍卖，不意味着没有备用产品或可靠性措施；能量价格、辅助服务和短缺时的价格信号共同影响经营。',
    governance: 'ERCOT 负责本区域电网调度、批发市场与结算，得州公用事业委员会 PUCT 制定监管规则。发电及负荷主体可通过市场和双边安排交易。部分地区有竞争性零售，合作社及市营公用事业的零售安排可能不同。',
    sequence: '日前市场提供次日电量、阻塞风险和辅助服务交易工具；实时 SCED 在资源及输电限制内进行经济调度，通常每五分钟运行。实时结算点电价按十五分钟形成，不能把调度频率与结算时间尺度混为一谈。',
    pricing: '实时出清计算节点边际电价，资源节点、交易枢纽和负荷区有不同结算点。输电约束与系统供需会影响电价，低备用时还需结合适用的稀缺及可靠性定价规则。报价上限及触发参数会调整，本课程不把历史数值当现值。',
    balance: '调频和不同备用产品用于保持实时可靠性。2025-12-05 上线的 RTC+B 将实时能量和辅助服务联合优化，并改进电池建模。辅助服务的容量价格是在短时间内提供服务的价格，不能误读为远期容量市场的价格。',
    adequacy: '官方把 ERCOT 描述为能量型批发市场，而非采用 PJM 式集中远期容量拍卖。投资信号依赖能量、短缺及辅助服务收入；同时还有可靠性评估、应急及其他政策措施。能量型不等于只交易电量，更不等于无监管。',
    transition: 'RTC+B 明确考虑电池可用于能量和辅助服务的荷电状态 SOC。储能报价需要兼顾充放电、剩余电量和服务履约。同一电池不能一边把全部功率安排卖电，一边把同一全部功率重复承诺为上调备用。',
    caution: 'RTC+B 已在 2025-12-05 投运，不能继续按旧版“实时能量与备用完全分开”讲解。这里比较结构，不承诺实际套利收益；价格上限、短缺机制和项目资格需查阅当期 Nodal Protocols。',
    case: {
      title: '日前安排与实时增发收入',
      body: '假设发电商日前卖出 10 MWh，价格 40 美元/MWh；实际在相同结算口径下发电 12 MWh，偏差实时价格为 80 美元/MWh。先判断需要按实时价格结算的是全部电量还是增量。',
      formula: '简化收入 = 10 × 40 + (12 − 10) × 80 = 560 美元。',
      result: '日前部分收入 400 美元，额外 2 MWh 的实时部分收入 160 美元。',
      boundary: '原创演示，视为各时段同价后的等效汇总；忽略十五分钟内分解、节点差异、费用、辅助服务及调整项目，不是 ERCOT 完整结算账单。'
    },
    sources: [
      { title: 'ERCOT Grid Insights: Energy-Only Wholesale Market', url: 'https://www.ercot.com/files/docs/2025/10/16/ERCOT-Grid-Insights-Energy-Only-Wholesale-Market.pdf', organization: 'ERCOT', note: '能量型、监管及日前/实时/辅助服务的官方入门说明。', date: '2025-10' },
      { title: 'Real-Time Market', url: 'https://www.ercot.com/mktinfo/rtm', organization: 'ERCOT', note: 'SCED、节点电价、五分钟运行和十五分钟结算点价格说明；动态页面。' },
      { title: 'ERCOT Goes Live with Real-Time Co-optimization Plus Batteries', url: 'https://www.ercot.com/news/release/12052025-ercot-goes-live', organization: 'ERCOT', note: '明确确认 RTC+B 已投运及电池 SOC 建模。', date: '2025-12-05' }
    ], fieldSources: { governance: [0], sequence: [0, 1], pricing: [0, 1], balance: [1, 2], adequacy: [0], transition: [2] }, checked: '2026-10-07'
  },
  {
    id: 'gb', name: '英国 · 大不列颠', country: '英国',
    scope: '英格兰、苏格兰和威尔士的 GB 市场；北爱尔兰参加另一套全岛市场，未在此覆盖。', region: '欧洲',
    model: '自主交易与平衡', tags: ['全国批发价格', '自主交易', '偏差结算', '容量与 CfD'],
    summary: 'GB 以参与者自主交易和计划为基础，NESO 在接近实时的阶段处理剩余平衡及网络问题。统一批发价格不表示电网没有阻塞，也不表示每份双边合同价格相同。',
    governance: '政府确定能源政策，Ofgem 承担监管，NESO 负责系统平衡及相关市场，Elexon 承担 BSC 平衡与结算职能。发电商、供应商、交易者和灵活性提供者各有职责；批发采购、系统调度与零售电费应分开理解。',
    sequence: '参与者先通过长期、日前和日内交易管理供需及价格风险，并提交运行计划。交割前后的剩余不平衡由 NESO 通过平衡机制和服务处理。BSC 对每半小时结算期计算合同与计量之间的偏差，交易价格和偏差价格并非同一概念。',
    pricing: 'GB 保留全国批发定价结构，交易所和双边交易仍可形成不同成交价格。电网瓶颈主要通过调度、再调度及其他措施解决。2025 年政府决定保留并改革全国定价；2026 年的交付计划不是已经实施分区电价的证据。',
    balance: '平衡机制接收可增减发电或用电的报价，NESO 根据系统需要选择行动；另有频率响应、备用、无功和恢复等服务。Elexon 以适用的平衡行动及规则计算偏差价格，因此缺口采购与系统辅助服务需要分别记账。',
    adequacy: '容量市场向符合条件的资源采购未来在需要时可用的供电能力，常规设有 T-4 和 T-1 拍卖。容量合同强调系统紧张时履约并可能处罚不履约。它不替代日常售电收入，也不等同于低碳发电的差价合约支持。',
    transition: '低碳投资常用 Contracts for Difference 差价合约，可靠性另由容量市场等安排保障。电池和需求侧灵活性可在相应资格下提供平衡服务，但项目应同时评估合同限制、功率占用、SOC 和网络费用，而非简单累加收入。',
    caution: '这里只讲 GB。北爱尔兰不可用该条目代替。改革全国定价计划中的待决定或待交付事项，应与已运行的市场区分；本课程没有把任何咨询方案写成既成的分区市场。',
    case: {
      title: '半小时缺口为什么要另算？',
      body: '假设供应商为一个半小时买入 7 MWh，合同价格 80 英镑/MWh，实际客户用电 8 MWh。为教学假设该结算期的缺口按 300 英镑/MWh 结算。',
      formula: '简化采购成本 = 7 × 80 + (8 − 7) × 300 = 860 英镑。',
      result: '合同电量成本 560 英镑，额外 1 MWh 缺口成本 300 英镑。偏差价格较高，预测与日内调整因此有价值。',
      boundary: '原创价格假设，忽略损耗调整、其他 BSC 现金流、网络费与税。偏差价格不恒定为正，也不是所有情况下的固定罚金。'
    },
    sources: [
      { title: 'Electricity markets explained', url: 'https://www.neso.energy/what-we-do/energy-markets/electricity-markets-explained', organization: 'NESO', note: '参与者、全国定价、平衡服务以及容量市场/CfD 的官方教学说明。' },
      { title: 'Trading in the electricity market', url: 'https://www.elexon.co.uk/bsc/about/trading-electricty-market/', organization: 'Elexon', note: 'BSC、半小时偏差结算及不同参与机构职能。' },
      { title: 'Capacity Market', url: 'https://www.neso.energy/what-we-do/energy-markets/electricity-market-reform-emr-delivery-body/capacity-market', organization: 'NESO', note: '容量采购、资格、拍卖及系统紧张事件履约。' },
      { title: 'Reformed National Pricing: delivery plan', url: 'https://www.gov.uk/government/publications/reformed-national-pricing-rnp-delivery-plan/reformed-national-pricing-rnp-delivery-plan-accessible-webpage', organization: '英国能源安全与净零部', note: '2026 年改革交付计划；确认保留全国定价，计划事项不当作已实施机制。', date: '2026' }
    ], fieldSources: { governance: [0, 1], sequence: [1], pricing: [0, 3], balance: [0, 1], adequacy: [0, 2], transition: [0, 3] }, checked: '2026-10-07'
  },
  {
    id: 'de-eu', name: '德国 · 欧盟框架', country: '德国',
    scope: '以德国/卢森堡报价区为案例，结合欧盟共同市场框架；不能代表各欧盟国家的全部政策。', region: '欧洲',
    model: '分区市场耦合', tags: ['报价区', '跨境市场耦合', '平衡责任', 'PPA 与双向 CfD'],
    summary: '欧洲跨境交易把报价区之间的输电能力与交易一起协调，但仍存在地区价格差异。德国例子适合同时学习：区内统一价格、区际价差、平衡责任与市场外网络保障。',
    governance: '欧盟法规提供共同市场框架，各国监管机构、输电运营商及指定市场运营者分工实施。德国监管机构 Bundesnetzagentur 提供 SMARD 教学与公开数据。交易所负责交易组织，输电运营商负责物理安全，不能把二者视为同一角色。',
    sequence: '长期合约或期货先管理价格风险，日前市场集中安排次日交割，日内市场继续修正预测。欧盟共同日前市场在 2025 年已切换为十五分钟产品。旧教学页面的小时级描述需结合该更新，不能继续当作当前统一时间尺度。',
    pricing: '德国/卢森堡构成共同报价区，日前出清形成报价区价格，而非给每个电网节点单独定价。跨境耦合利用可交易的输电能力；能力受限时区际价格可能不同。区内仍可发生线路阻塞，需要再调度等网络措施处理。',
    balance: '发电与用电被纳入平衡组，平衡责任方管理计划和组合偏差。输电运营商采购 FCR、aFRR、mFRR 等不同响应速度的服务修正物理偏差，再按规则结算不平衡。偏差结算与辅助服务采购是相互关联但不同的环节。',
    adequacy: '应先区分总体供电能力不足和某条输电线路阻塞。德国网络备用用于保障安全再调度，特定备用电厂在市场外接受指令，不能直接当作普遍容量市场。欧盟各国容量保障机制并不统一，改革中的新采购安排需另查生效规则。',
    transition: '2024 年欧盟市场设计改革强调长期 PPA 和双向差价合约等工具，减少部分投资及用电成本对短期波动的暴露。储能与需求侧灵活性帮助调节新能源波动，但适用支持机制、准入与收费由具体国家和项目条件决定。',
    caution: '德国报价区案例与欧盟共同规则分开阅读。这里不声称全欧盟都有同一种容量机制，也不把德国容量机制改革设想当作已经投运。SMARD 旧文章的小时级日前说明已经用欧盟官方十五分钟更新补充。',
    case: {
      title: '跨区输电容量如何影响采购？',
      body: '假设 A 区可向 B 区提供 40 MWh 的一小时余量，报价 20 欧元/MWh；B 区需要 70 MWh，本地机组报价 60 欧元/MWh。区际可交易容量为 40 MW。',
      formula: '采购成本 = 40 × 20 + 30 × 60 = 2,600 欧元；相对全部本地供电，节省 70 × 60 − 2,600 = 1,600 欧元。',
      result: 'B 区仍需要本地供电 30 MWh。在此简化模型中 B 区边际价格为 60，便宜跨区电量受线路上限限制。',
      boundary: '原创假设；非欧洲真实报价。忽略环流、流量耦合计算、损耗、复杂订单和再调度，展示的是区际约束而非完整出清算法。'
    },
    sources: [
      { title: 'This is how the electricity market works', url: 'https://www.smard.de/page/en/wiki-article/5884/5840/this-is-how-the-electricity-market-works', organization: 'Bundesnetzagentur / SMARD', note: '长期/日前/日内、平衡组与 FCR/aFRR/mFRR；时间尺度以欧盟较新材料补充。' },
      { title: 'Großhandelspreise', url: 'https://www.smard.de/blueprint/servlet/page/home/wiki-article/446/562', organization: 'Bundesnetzagentur / SMARD', note: '确认德国与卢森堡共同报价区。' },
      { title: 'Electricity market design', url: 'https://energy.ec.europa.eu/topics/markets-and-consumers/electricity-market-design_en', organization: '欧盟委员会', note: '2024 改革、长期 PPA/双向 CfD 及 2025 年共同日前十五分钟产品更新。' },
      { title: 'Domestic grid reserve', url: 'https://www.bundesnetzagentur.de/EN/RulingChambers/Chamber8/RC8_07_Generation%20issues/71_Domestic%20grid%20reserve/71_Domestic%20grid%20reserve.html', organization: 'Bundesnetzagentur', note: '网络备用厂的市场外使用及再调度定位。' }
    ], fieldSources: { governance: [0, 2], sequence: [0, 2], pricing: [1, 2, 3], balance: [0], adequacy: [3], transition: [2] }, checked: '2026-10-07'
  },
  {
    id: 'jp', name: '日本', country: '日本',
    scope: 'JEPX 电能交易与 OCCTO 跨区域协调框架；具体区域及非互联地区须分别核对。', region: '亚太',
    model: '分区交易与平衡', tags: ['半小时产品', '区域价格', 'kWh/kW/ΔkW', 'FIT 与 FIP'],
    summary: '日本把电能量 kWh、未来供电能力 kW 和短期调节能力 ΔkW 作为不同价值安排交易。初学者可用这三个单位判断收入来自“发了多少电”“可提供多少容量”还是“能多快调整”。',
    governance: '经济产业省及相关监管部门制定政策，JEPX 运营电能交易市场，OCCTO 承担跨区域协调及容量机制等工作，一般输配电企业负责区域运行。发电商、零售商及聚合主体通过相应资格参加，机构分工与产品价值要分开看。',
    sequence: 'JEPX 日前现货交易包含次日四十八个半小时产品，采用盲报统一价格拍卖。之后的时间前市场以连续交易修正需求或发电变化。接近实时还需由区域运行和平衡安排处理实际偏差，不可把时间前交易等同于调度指令。',
    pricing: 'JEPX 会计算系统价格和考虑区域间联络线限制后的区域价格。实际交易按适用区域价格成交，不能用全国参考系统价格替代项目所在区域价格。联络线不足时即使在同一天，同一半小时也可能出现区域价差。',
    balance: '调节市场采购短期平衡所需的调节能力，OCCTO 的官方说明明确区分电能量、供电容量和调节容量。区域运行者根据需要调整物理供需；新能源预测修正、偏差承担与辅助服务资格都会影响聚合及储能方案的经营边界。',
    adequacy: 'OCCTO 运营容量市场，在实际供需前采购未来供电能力，主拍卖通常提前四个财年，必要时追加拍卖。容量报酬针对符合义务的 kW 能力，日常 kWh 电量另行交易；长期脱碳电源拍卖又是需单独理解的安排。',
    transition: '日本同时存在 FIT 和市场联动型 FIP 支持，FIP 自 2022 财年引入。FIP 项目需要通过批发市场或双边方式售电，因而更重视预测、聚合与交易管理。储能方案还要核对并网、产品测试、寿命和偏差责任，不能只算价差。',
    caution: '采用 JEPX 日文交易概要区分日前“现货”与当日“时间前”，避免英文页面的命名歧义。区域价格与系统参考价不是同一概念。长期脱碳拍卖的具体资格及最新产品参数，应阅读当期官方文件。',
    case: {
      title: '半小时容量换算与电量收入',
      body: '假设某电站一个半小时平均出力 2 MW，适用区域电价为 15 日元/kWh。先把功率换成该半小时交付电量，再计算电量收入；不要将 2 MW 直接乘价格。',
      formula: '电量 = 2 × 0.5 = 1 MWh = 1,000 kWh；电量收入 = 1,000 × 15 = 15,000 日元。',
      result: '该半小时的简化电量收入为 15,000 日元，容量报酬和调节收入需要另有产品承诺才能计算。',
      boundary: '原创演示价格；忽略交易费、损耗、FIP 溢价、偏差和税费。kW 容量的年度报酬不能直接与 kWh 电量单价相乘。'
    },
    sources: [
      { title: '取引概要', url: 'https://www.jepx.jp/electricpower/outline/', organization: 'JEPX', note: '日文官方概要；日前四十八个半小时产品、统一价格拍卖与当日连续交易。' },
      { title: 'JEPX 取引ガイド', url: 'https://www.jepx.jp/electricpower/outline/pdf/Guide_2.00.pdf', organization: 'JEPX', note: '系统价格、联络线约束与区域价格的基础说明；业务细则仍应核对当期版本。', date: '2019-01' },
      { title: 'OCCTO English Pamphlet', url: 'https://www.occto.or.jp/assets/en/about_occto/files/occto_pamphlet2023_English.pdf', organization: 'OCCTO', note: '机构分工、kWh/kW/ΔkW、容量及调节市场；基础结构材料。', date: '2023' },
      { title: 'Energy White Paper 2022: Evolution of the renewable energy industry', url: 'https://www.enecho.meti.go.jp/about/whitepaper/2022/html/3-3-1.html', organization: '日本资源能源厅', note: '2022 财年 FIP 引入及市场售电、聚合安排的政策解释。', date: '2022' }
    ], fieldSources: { governance: [0, 2, 3], sequence: [0], pricing: [1], balance: [2], adequacy: [2], transition: [3] }, checked: '2026-10-07'
  },
  {
    id: 'au-nem', name: '澳大利亚 · NEM', country: '澳大利亚',
    scope: '昆士兰、新南威尔士（含 ACT）、维多利亚、南澳、塔斯马尼亚；不覆盖西澳 WEM 和北领地。', region: '亚太',
    model: '区域集中调度', tags: ['五分钟结算', '区域参考价', 'FCAS', '储能双向单元'],
    summary: 'NEM 适合学习短时间尺度如何改变储能经营。五分钟调度和结算让快速响应有明确电量价值；区域价格、系统服务和市场外可靠性措施又需要分别认识。',
    governance: 'AEMO 运营 NEM 电网和市场，AEMC 制定相关市场规则，AER 监督市场及执行监管职能。发电商、零售商、大用户与综合资源等按资格参加。名称中的“全国”不表示整个澳大利亚共享这一套批发市场。',
    sequence: 'NEM 通过集中池式现货市场安排资源，每五分钟调度，并自 2021-10-01 实施五分钟电量结算。预调度等信息用于提前判断，参与者还可签订风险管理合同。预测结果不是已承诺的日前成交，不能套用 PJM 式日前机制。',
    pricing: '市场按五个区域形成区域参考价格，并考虑区域间输电能力及适用损耗处理。一个区域的批发价不能直接代表每个节点的所有交付成本，更不等于居民零售单价。区域联络线约束可能使各区域价格分离。',
    balance: '频率控制辅助服务 FCAS 包括调节及不同速度的应急响应。能量和 FCAS 需共同考虑资源能力，网络支持及系统恢复服务还有其他采购安排。不要因为电池响应快，就假定其可以同时把所有功率卖给多个产品。',
    adequacy: '供电可靠性需要投资、预测、需求响应及应急保障共同支持。AEMO 的 RERT 是市场外的可靠性与应急备用机制，不能视为常规远期容量拍卖。NEM 和西澳 WEM 应分开比较，当前改革及容量采购安排需按地区确认。',
    transition: 'IESS 改革通过综合资源提供者 IRP 与双向单元 BDU 更好纳入电池和混合设施，相关主要发布阶段在 2024 年完成。规划光储收益时，应同时约束连接点净功率、能量余额与 FCAS 能力，区分电量收入和备用承诺。',
    caution: '官方辅助服务网页可能保留旧数量描述，因此本条不照搬“八个 FCAS 市场”；较新官方指南介绍十个 FCAS 市场。这里不把 NEM 规则延伸到西澳，也不把预调度预测写成日前交易承诺。',
    case: {
      title: '五分钟电池放电究竟卖了多少电？',
      body: '假设电池在某个五分钟结算期平均放电 6 MW，区域电价为 200 澳元/MWh。先换算五分钟电量；再思考如果同时承诺上调备用，是否还能满功率放电。',
      formula: '售电量 = 6 × 5 ÷ 60 = 0.5 MWh；电量收入 = 0.5 × 200 = 100 澳元。',
      result: '该五分钟的简化售电收入为 100 澳元。若功率上限为 6 MW，满功率放电时没有额外上调功率空间。',
      boundary: '原创价格假设；忽略损耗、FCAS 结算、限额、费用和退化。备用可用性还受 SOC、产品性能与具体规则限制。'
    },
    sources: [
      { title: 'About the National Electricity Market', url: 'https://aemo.com.au/energy-systems/electricity/national-electricity-market-nem/about-the-national-electricity-market-nem', organization: 'AEMO', note: '五个区域、集中池式市场与五分钟调度；明确排除西澳和北领地。' },
      { title: 'Five Minute Settlement', url: 'https://www.aemc.gov.au/rule-changes/five-minute-settlement', organization: 'AEMC', note: '从半小时结算改为五分钟，2021-10-01 实施。' },
      { title: 'Guide to Frequency Control Ancillary Services', url: 'https://www.aemo.com.au/-/media/files/electricity/nem/security_and_reliability/ancillary_services/guide-to-frequency-control-ancillary-services.pdf', organization: 'AEMO', note: '第 4 版：十个 FCAS 市场、五分钟产品与能量/FCAS 联合优化；已核对 PDF 正文。', date: '2025-09-17' },
      { title: 'Integrating energy storage systems into the NEM', url: 'https://www.aemc.gov.au/rule-changes/integrating-energy-storage-systems-nem', organization: 'AEMC', note: 'IRP、储能及混合设施参与框架与实施阶段。' },
      { title: 'Enhancement to the Reliability and Emergency Reserve Trader', url: 'https://www.aemc.gov.au/rule-changes/enhancement-reliability-and-emergency-reserve-trader', organization: 'AEMC', note: 'RERT 市场外应急可靠性储备的定位。', date: '2019-05-02' },
      { title: 'Market bodies', url: 'https://www.aemo.com.au/learn/market-bodies', organization: 'AEMO', note: 'AEMO/AEMC/AER 的运营、规则制定和监管分工。' },
      { title: 'How power is dispatched across the system', url: 'https://www.aemc.gov.au/energy-system/electricity/electricity-market/how-power-dispatched-across-system', organization: 'AEMC', note: '用于区域参考价与联络线限制的基础解释；该页旧结算时间说明不作为现状，时间尺度采用上述五分钟改革文件。' }
    ], fieldSources: { governance: [0, 5], sequence: [0, 1], pricing: [6], balance: [2], adequacy: [4], transition: [3] }, checked: '2026-10-07'
  },
  {
    id: 'sg', name: '新加坡', country: '新加坡',
    scope: '新加坡批发市场 SWEM/NEMS 与配套零售选择；批发价不能直接替代全部用户账单。', region: '亚太',
    model: '节点集中出清', tags: ['半小时出清', 'USEP', '集中供电能力规划', '储能与调节'],
    summary: '新加坡展示“小型互联系统也有多种产品”。批发能量、调节和备用共同支持系统；用户侧还需分清节点价格、统一系统能量价格 USEP 与最终零售或批发账单。',
    governance: 'EMA 负责监管并承担系统运营者职能，Energy Market Company 运营批发市场及其出清结算。发电商提交报价，零售商采购后面向用户售电。SP 的受监管电价、零售合同和直接批发购买，是不同的价格风险选择。',
    sequence: '发电商按半小时交易期提供价格与数量报价，出清引擎协调能量、调节及备用的需求。预测和市场展望帮助提前计划，但不应照搬其他市场的强制日前出清概念。长期合约及期货可管理半小时现货波动。',
    pricing: '市场计算网络节点价格；USEP 为各用电节点价格按需求加权的统一能量价格。它是半小时能量价格参考，不等于批发采购全部费用或零售单价。临时价格上限等保护机制的参数需查当期公告，而非引用旧上限作为现值。',
    balance: '调节服务持续修正供需和频率，备用应对突然失去供电等事件；市场分别形成相关服务价格。系统运营者实施调度，市场运营者进行计算结算。服务采购的容量、响应速度与实际激活电量是不同概念。',
    adequacy: 'EMA 通过 Centralised Process 预测供需和备用裕度，在需要时征集民间新建发电能力，协调投资进入。该规划和采购程序不能简单称为 PJM 式远期容量市场。2026 年已发布相关更新，具体时限及参数应阅读最新决定文件。',
    transition: '储能可通过能量时移、调节和备用支持光伏接入及系统可靠性，EMA 已提供参与政策和部署材料。经营方案必须约束储能持续时间、可用功率、热环境与并网条件；技术具备用途不表示任何项目自动满足全部交易资格。',
    caution: 'USEP、节点价格与最终电费要分清。这里不复用历史批发上限，也不预测价格收益。容量集中规划页面的 2026 更新涉及制度调整，应以其链接的最终决定为准。',
    case: {
      title: '统一价格怎样由节点价格形成？',
      body: '假设一个半小时，两个用电节点分别需 3 MWh 和 1 MWh，节点电价为 100 和 140 新加坡元/MWh。用需求加权求教学版 USEP，再解释为什么不是简单算术平均。',
      formula: '加权价格 = (3 × 100 + 1 × 140) ÷ (3 + 1) = 110 新加坡元/MWh。',
      result: '需求更多的节点权重更大，因此结果为 110，而不是两个价格的简单平均 120。',
      boundary: '原创两节点演示；真实 USEP 由全部相关用电节点和规则计算，费用、调节备用成本及其他账单项目未纳入。'
    },
    sources: [
      { title: 'Electricity Market', url: 'https://www.ema.gov.sg/our-energy-story/energy-market-landscape/electricity', organization: 'EMA', note: '半小时批发、零售选择、期货及临时价格上限等制度入口。' },
      { title: 'Guide To Prices', url: 'https://www.nems.emcsg.com/Guide-To-Prices', organization: 'Energy Market Company', note: '节点价格、USEP 需求加权，以及调节/备用价格的官方解释。' },
      { title: 'Centralised Process', url: 'https://www.ema.gov.sg/regulations-licences/regulations/policies-frameworks/centralised-process', organization: 'EMA', note: '新建供电能力集中规划与 2026-04-07 更新入口。' },
      { title: 'Energy Storage Systems', url: 'https://www.ema.gov.sg/our-energy-story/energy-grid/energy-storage-systems', organization: 'EMA', note: '光伏整合、能量时移、调节备用与储能部署政策资料。' }
    ], fieldSources: { governance: [0], sequence: [0, 1], pricing: [0, 1], balance: [1, 3], adequacy: [2], transition: [3] }, checked: '2026-10-07'
  },
  {
    id: 'kr', name: '韩国 · 成本型市场', country: '韩国',
    scope: '以本土传统成本型市场 CBP 为入门主线；济州试点和储能中央合同采购另列，不能视为全国同一种竞价制度。', region: '亚太',
    model: '成本型集中调度', tags: ['核定变动成本', 'SMP', '容量支付', '济州试点'],
    summary: '韩国提供另一种集中市场范式：集中调度并不必然等于发电商自由申报能量价格。学习顺序应从核定成本、边际机组和 SMP 开始，再分开理解容量支付、辅助服务与区域改革。',
    governance: 'KPX 负责市场组织、计量结算和电力系统运行，发电企业等依资格参加。传统 CBP 的关键是按规则评估发电成本，包括燃料与启动等项目，再用于调度和定价；不能把“参加竞价”直接解释成自主报出任意能量价格。',
    sequence: '传统 CBP 在交付前一天依据需求预测、机组可用能力及核定成本，编制价格确定计划并形成逐小时 SMP。交付时 KPX 持续平衡实际供需，结算还涉及实测及调度信息。日前价格计划、实际运行和最终收入需要分开学习。',
    pricing: 'SMP 是价格确定计划中的系统边际价格，由相关边际机组的成本形成，并非各厂平均成本。完整结算还含容量价格、调整系数及其他适用项目，因此不能用“全部电量乘 SMP”代替所有电厂的真实收入，也不能称为 PJM 式节点报价市场。',
    balance: 'KPX 持续监控和调整机组出力，处理需求波动与系统安全要求。辅助服务的结算单价另有成本评估规则，电量定价与备用能力应分开理解；济州实时、备用和新能源竞价试点有专门安排，不能将其直接推广为本土全部市场现状。',
    adequacy: '长期供需规划与运行备用共同支持充裕性。成本评估规则规定基准容量价格及时间、性能等相关系数，适用资源依规则获得容量报酬。这种容量支付不能直接等同于 PJM 的远期容量拍卖；电量、可用功率与绩效评价是不同层次。',
    transition: '济州的官方试点安排涉及实时市场、备用市场与新能源竞价。KPX 又于 2026-09-22 发布本土 ESS 中央合同市场招标公告，说明储能还存在合同采购渠道。规划光储收入须核对地域、资格与交付义务，招标公告不表示项目已经投运。',
    caution: '成本细则采用已核查的 2026 年 2 月版作基础教学，实际业务应核对最新修订。英文介绍用于机制解释，不引用其中旧会员数量或备用参数。济州试点与本土 CBP 需要分别查规则，成本型市场也不表示每项收入都按成本直接报销。',
    case: {
      title: '核定成本怎样形成边际价？',
      body: '假设一小时需供电 80 MW：A 可供 50 MW，核定变动成本 60 韩元/kWh；B 可供 50 MW，成本 100 韩元/kWh。无其他约束时，先安排 A，再由 B 补足。这里的成本为教学假设，不是企业自由报价。',
      formula: 'A 发 50 MWh，B 发 30 MWh；总变动成本 = 50,000 × 60 + 30,000 × 100 = 6,000,000 韩元。',
      result: 'B 为边际机组，简化 SMP 为 100 韩元/kWh；平均变动成本为 75 韩元/kWh。边际价格与平均成本不同。',
      boundary: '原创演示；忽略启停、空载、网络与安全约束、容量支付及结算调整。真实 KPX 价格计划和最终结算更复杂，不能据此估算项目净利润。'
    },
    sources: [
      { title: 'Key Roles & Functions', url: 'https://kpx.or.kr/menu.es?mid=a20101020000', organization: 'KPX', note: '市场运营、实时调度、系统运行和供需规划支持的官方职责说明。' },
      { title: '비용평가 세부운영규정（成本评估详细运行规则）', url: 'https://www.kpx.or.kr/boardDownload.es?bid=0031&list_no=76966&seq=2', organization: 'KPX', note: '已核对 PDF：CBP 成本评估、基准容量价格、结算调整、辅助服务及有效容量等；作为该版基础说明，不宣称是查询日最新修订。', date: '2026-02' },
      { title: 'Market Price Determination', url: 'https://kpx.or.kr/menu.es?mid=a20203000000', organization: 'KPX', note: '传统市场的日前逐小时价格计划、成本最小化与 SMP 边际机组解释；区域试点另查专门文件。' },
      { title: '전력시장 제도개선 제주 시범사업 시행일정 안내（济州试点实施安排）', url: 'https://new.kpx.or.kr/board.es?act=view&bid=0209&list_no=71849&mid=a10501050000&nPage=1&tag=', organization: 'KPX', note: '济州实时、备用和新能源竞价试点文件；不据此宣称全国采用同一种制度。', date: '2024-02-23' },
      { title: '2026년 ESS 중앙계약시장(육지) 경쟁입찰 공고（本土 ESS 中央合同市场招标）', url: 'https://new.kpx.or.kr/board.es?act=view&bid=0042&list_no=78164&mid=a11201000000&nPage=1&tag=', organization: 'KPX', note: '依据市场规则第 15 章发布的竞争招标公告；公告阶段与项目投运阶段分开。', date: '2026-09-22' }
    ], fieldSources: { governance: [0, 1], sequence: [0, 2], pricing: [1, 2], balance: [0, 1, 3], adequacy: [0, 1], transition: [3, 4] }, checked: '2026-10-07'
  },
  {
    id: 'br', name: '巴西 · 合同与差额结算', country: '巴西',
    scope: '国家互联系统 SIN 的 ACR/ACL 合同、CCEE 差额结算和 ONS 运行；不涵盖孤立系统的全部安排或所有零售用户资格。', region: '美洲',
    model: '合同交易与模型定价', tags: ['ACR/ACL', '小时 PLD', '短期差额 MCP', '容量储备采购'],
    summary: '巴西适合学习商业合同和物理运行如何分工：合同约定价格及电量，ONS 安排系统运行，CCEE 将实际电量与合同头寸的差额结算。小时 PLD 是模型定价的差额价格，不能等同于自由报价的日前拍卖。',
    governance: 'ANEEL 监管市场，ONS 协调 SIN 的发电与输电运行，CCEE 负责电力商业计量核算及结算。ACR 为受监管合同环境，配电企业通常经受规则约束的拍卖采购；ACL 为自由合同环境，合资格主体可双边协商，参与资格仍有条件。',
    sequence: '参与者先按 ACR 或 ACL 安排和登记合同。CCEE 每日计算次日逐小时、逐子市场的 PLD；实际交付后，合同电量与实际用电或发电的差额进入短期市场 MCP 核算。因此“提前发布小时价格”不表示按 PJM 的报价方式成交了日前电量。',
    pricing: 'PLD 基于边际运行成本 CMO 形成，并适用当期最低、小时最高和结构性最高限值；按子市场而非每个网络节点公布。合同价格可以与 PLD 不同，小时价格用于差额风险分析，不能直接替换全部合同电费或套用其他国家的价格上限。',
    balance: 'ONS 处理系统实际调度和安全需求，并通过受监管的 CPSA 等安排组织辅助服务、监测履约，向有关机构提供结算数据。CCEE 的 MCP 是合同与实际电量差额的财务核算；物理频率控制与商业差额结算需要分别理解和建模。',
    adequacy: '长期合同采购、系统规划与容量储备采购共同支持供电保障。MME 的 2026 年 4 月监测报告记载当年 3 月已举行容量储备拍卖，资源交付期依合同而异。购买可供功率与购买发电量用途不同，不能把短期 PLD 当成完整的充裕性机制。',
    transition: '光伏等发电项目要结合合同、实际交付差额及并网条件设计收入。2026 年电池储能容量采购已有技术要求、项目登记和可接入容量资料，属于采购准备阶段；截至本条查询日，不据这些文件宣称全部拍卖已完成或储能已开始交付。',
    caution: '本条限于 SIN 商业与运行结构，孤立系统另查专门制度。ACL 资格、价格限值及商业核算规则应查当期版本；2026 年电池容量采购的准备文件不等于已投运项目。示例不含水电能量再分配、系统费用及复杂合同调制。',
    case: {
      title: '合同覆盖不足时，哪部分电量按 PLD 结算？',
      body: '假设某个子市场、某一小时，用户合同购电 100 MWh，合同价 200 巴西雷亚尔/MWh，实际用电 110 MWh，PLD 为 300 雷亚尔/MWh。先计算合同费用，再计算未覆盖的 10 MWh 差额。',
      formula: '合同费用 = 100 × 200 = 20,000；差额费用 = (110 − 100) × 300 = 3,000；合计 = 23,000 雷亚尔。',
      result: '简化电量成本为 23,000 雷亚尔；按 PLD 处理的是 10 MWh 差额，不能把 110 MWh 全部按 PLD 重算。',
      boundary: '原创价格与单小时假设；合同账单与 MCP 核算是不同环节。忽略损耗、合同调制、系统费用、税费、担保及其他商业核算项目，不代表真实用户完整账单。'
    },
    sources: [
      { title: 'Mercado（巴西电力市场）', url: 'https://www.gov.br/aneel/pt-br/assuntos/mercado', organization: 'ANEEL', note: 'SIN 内 ACR/ACL、CCEE 商业组织与 ONS 运行分工；基础制度说明，资格变化另查新规。', date: '2022-03-30' },
      { title: 'PLD', url: 'https://www.ccee.org.br/web/guest/dados-e-analises/dados-pld', organization: 'CCEE', note: '官方定义：每日为次日各小时、各子市场按 CMO 和适用限值计算 PLD；不采用网页模板中的 1970 日期。' },
      { title: 'CCEE Explica: Mercado de Curto Prazo', url: 'https://www.ccee.org.br/pt/web/guest/-/ccee-explica-te-ajuda-a-entender-o-que-e-o-mercado-de-curto-prazo', organization: 'CCEE', note: '官方教学资源：合同电量与实际发用电差额，在 MCP 以 PLD 计价。', date: '2022-11-09' },
      { title: 'Contratações（系统运行服务合同）', url: 'https://www.ons.org.br/paginas/energia-no-futuro/transmissao/contratacoes', organization: 'ONS', note: 'CPSA 辅助服务的组织、合同管理、绩效监测以及 ANEEL/CCEE 相关数据处理职责。' },
      { title: 'Agenda Eletroenergética 2026: Relatório de Monitoramento', url: 'https://www.gov.br/mme/pt-br/assuntos/secretarias/secretaria-nacional-energia-eletrica/agenda-estrategica-eletroenergetica-2026/RELATRIODEMONITORAMENTO_AGENDA_ELETROENERGTICA_300426online.v2.pdf', organization: '巴西矿产能源部 MME', note: '2026 年 4 月官方监测报告，记录 3 月容量储备采购结果及不同交付年份；不把签约当作全部容量即时投运。', date: '2026-04-30' },
      { title: 'LRCAP Armazenamento 2026（储能容量储备采购）', url: 'https://www.epe.gov.br/pt/leiloes-de-energia/leiloes/leilao-de-reserva-de-capacidade-na-forma-de-potencia-armazenamento-2026', organization: 'EPE', note: '2026-06 项目登记及技术文件、2026-09-30 可接入容量资料；登记指引所述计划运行起点为 2028-08-01，不能视为当前交付。' }
    ], fieldSources: { governance: [0], sequence: [0, 1, 2], pricing: [1], balance: [0, 2, 3], adequacy: [0, 4], transition: [0, 2, 5] }, checked: '2026-10-07'
  }
];
