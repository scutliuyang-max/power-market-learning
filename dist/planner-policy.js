const plannerPolicies={
 '山东':{focus:'现货价格与光伏消纳',notes:['先核对用户的零售合同和实际结算曲线，午间余电价格不能按全天均价推算。','山东绿电直连有单独的申报与源荷匹配要求；本模型仅为厂区用户侧光储，不代表取得直连资格。'],sources:[['山东电力市场规则（试行）· 鲁监能市场规〔2025〕57号','https://sdb.nea.gov.cn/dtyw/tzgg/202512/t20251217_292527.html'],['山东绿电直连实施方案 · 2025-10-13','https://nyj.shandong.gov.cn/art/2025/10/13/art_59960_10309995.html']]},
 '山西':{focus:'合同曲线与现货衔接',notes:['光储规划需要确认合同电量、小时分解与实际偏差的结算责任。','已有中长期细则修订；历史 V15.0 不能视为当前完整规则。用户侧容量补偿资格尚未核实，不自动计入。'],sources:[['山西中长期市场实施细则政策解读 · 晋监能市场规〔2026〕1号','https://sxb.nea.gov.cn/xxgk/zcjd/202605/t20260527_301835.html']]},
 '广东':{focus:'分布式光伏机制电量与区域市场',notes:['新能源改革方案自 2025-11-01 执行，项目存量或增量身份、并网电压与竞价结果影响机制资格。','机制差价采用规定的同类型电源参考均价；不能直接拿项目的单个小时成交价代替。','纳入机制的电量不重复获得绿证收益；用户侧储能不自动享受独立储能容量电价。'],sources:[['广东新能源电价市场化实施方案 · 2025年方案','https://drc.gd.gov.cn/ywtz/content/post_4775501.html'],['南方区域电力市场运行规则 · 2025年V1.0','https://nfj.nea.gov.cn/xwzx/tzgg/202506/t20250625_283322.html']]},
 '浙江':{focus:'零售价格与光伏自用匹配',notes:['核对零售套餐、分时用电价格与最新计量结算口径，不能将现货批发价直接当成用户到户价。','已找到现货、调频和管理细则的修订说明；本版尚未完成新能源机制参数正文核验，因此不预填官方数值。'],sources:[['浙江三项电力市场实施细则修订动态 · 2025-12-02','https://zjb.nea.gov.cn/dtyw/jgdt/202512/t20251202_291553.html']]},
 '江苏':{focus:'分时套餐与午间价格结构',notes:['2026年交易通知明确分时零售套餐与政策分时计价的衔接，不能在已约定分时价格上重复叠加峰谷浮动。','分布式光伏可按计量、注册条件直接或聚合参与交易，余电结算需核对实际市场路径。','需按月份和用户分类核对时段；演示曲线不是苏发改价格发〔2025〕426号的完整实现。'],sources:[['江苏2026年电力市场交易通知 · 苏发改能源发〔2025〕1141号','https://fzggw.jiangsu.gov.cn/art/2025/12/19/art_51012_11702429.html'],['江苏新能源电价市场化实施方案 · 2025年','https://fzggw.jiangsu.gov.cn/art/2025/10/21/art_51007_11659583.html']]},
 '蒙西':{focus:'蒙西电网边界与新能源入市',notes:['本配置仅针对蒙西，不适用于蒙东；项目须先确认所在电网、注册与计量关系。','2026年多边交易通知将符合条件的分布式光伏纳入主体范围；独立储能发、用电单元另有中长期交易与安全校核安排。','蒙西新能源改革方案需区分存量与增量；机制覆盖和剩余年限依据项目文件填写，机制电量不重复计绿证收益。'],sources:[['蒙西新能源电价改革 · 内发改价费字〔2025〕660号','https://nyj.nmg.gov.cn/zwgk/zfxxgkzl/fdzdgknr/zcwj_16462/202506/t20250626_2746342.html'],['2026年多边交易通知 · 内能源电力字〔2025〕783号','https://nyj.nmg.gov.cn/tzgg/202512/t20251230_2843227.html']]}
};
const plannerNationalSources=[['新能源上网电价改革 · 发改价格〔2025〕136号（官方解读）','https://www.ndrc.gov.cn/xxgk/jd/jd/202502/t20250209_1396070.html'],['容量电价机制 · 发改价格〔2026〕114号','https://www.ndrc.gov.cn/xxgk/zcfb/tz/202601/t20260130_1403524.html']];
// Expose the same verified official entry points in the learning library.
if(typeof rules!=='undefined'){
 const details={
  'https://nyj.shandong.gov.cn/art/2025/10/13/art_59960_10309995.html':['2025-10-13','绿电直连','山东省能源局','官方实施方案'],
  'https://drc.gd.gov.cn/ywtz/content/post_4775501.html':['2025-11-01','新能源电价','广东省发展改革委','官方实施方案 · 日期为执行日'],
  'https://fzggw.jiangsu.gov.cn/art/2025/12/19/art_51012_11702429.html':['2025-12-19','综合规则','江苏省发展改革委','官方交易通知'],
  'https://fzggw.jiangsu.gov.cn/art/2025/10/21/art_51007_11659583.html':['2025-10-21','新能源电价','江苏省发展改革委','官方实施方案'],
  'https://nyj.nmg.gov.cn/zwgk/zfxxgkzl/fdzdgknr/zcwj_16462/202506/t20250626_2746342.html':['2025-05-29','新能源电价','内蒙古自治区能源局','官方实施方案 · 蒙西'],
  'https://nyj.nmg.gov.cn/tzgg/202512/t20251230_2843227.html':['2025-12-30','中长期','内蒙古自治区能源局','官方交易通知 · 蒙西']
 };
 for(const [region,policy] of Object.entries(plannerPolicies))for(const [title,url] of policy.sources){if(rules.some(r=>r.url===url)||!details[url])continue;const [date,type,source,status]=details[url];rules.push({title,region,url,date,type,source,status,version:title.split('·')[1]?.trim()||'参见官方文件',desc:policy.notes[0]});}
 if(typeof provinces!=='undefined'&&!provinces.includes('蒙西'))provinces.push('蒙西');
}
