(function(root){
 'use strict';
 const EPS=1e-7;
 function validate(p){
  const bounds={pvKw:[0,1000000],storageKw:[0,1000000],storageKwh:[0,10000000],dod:[1,100],efficiency:[1,100],reserve:[0,95],pvCost:[0,100000],storageCost:[0,100000],siteCost:[0,1e10],pvOm:[0,100],storageOm:[0,100],annualFixed:[0,1e9],days:[1,365],years:[1,30],discount:[0,50],pvDegrade:[0,30],storageDegrade:[0,30],replaceYear:[0,30],replacePct:[0,200],exportLimit:[0,1000000],mechanismPct:[0,100],mechanismPrice:[-10,10],referencePrice:[-10,10],mechanismYears:[0,30],responseAnnual:[0,1e9],demandAnnual:[0,1e9]};
  for(const [k,[lo,hi]] of Object.entries(bounds))if(!Number.isFinite(p[k])||p[k]<lo||p[k]>hi)throw Error(`${k} 超出允许范围`);
  for(const k of ['years','replaceYear','mechanismYears','days'])if(!Number.isInteger(p[k]))throw Error(`${k} 必须为整数`);
  for(const k of ['load','solar','buy','sell']){
   if(!Array.isArray(p[k])||p[k].length!==24||p[k].some(v=>!Number.isFinite(v)))throw Error(`${k} 必须有 24 个有效数值`);
  }
  if(p.load.some(v=>v<0||v>1000000)||p.solar.some(v=>v<0||v>1)||p.buy.concat(p.sell).some(v=>v< -10||v>10))throw Error('曲线超出范围：负荷 0–1000000，光伏 0–1，电价 -10–10');
  if((p.storageKw===0)!==(p.storageKwh===0))throw Error('储能功率与容量应同时为零或同时大于零');
  if(p.mechanismConfirmed&&p.mechanismPct>0&&p.mechanismYears<1)throw Error('计入机制差价时须填写剩余执行年限');
  if(p.extrasConfirmed&&p.responseAnnual>0&&p.reserve<=0)throw Error('需求响应需预留资源比例，不能把全部储能同时用于套利');
  return p;
 }
 function hour(p,h,pvKw,delta,eta){
  const pv=pvKw*p.solar[h], direct=Math.min(p.load[h],pv),surplus=pv-direct,net=p.load[h]-direct;
  let charge=0,discharge=0,pvCharge=0,gridCharge=0;
  if(delta>EPS){charge=delta/eta;pvCharge=Math.min(surplus,charge);gridCharge=charge-pvCharge;}
  if(delta< -EPS){discharge=-delta*eta;if(discharge>net+EPS)return null;}
  const importKwh=Math.max(0,net-discharge)+gridCharge;
  const exportKwh=p.sell[h]+p.mechanismAdder>=0?Math.min(Math.max(0,surplus-pvCharge),p.exportLimit):0;
  const curtail=Math.max(0,surplus-pvCharge-exportKwh);
  return {h,load:p.load[h],pv,direct,charge,discharge,pvCharge,gridCharge,importKwh,exportKwh,curtail,cost:importKwh*p.buy[h]-exportKwh*(p.sell[h]+p.mechanismAdder)};
 }
 function dispatch(p,pvKw,storageKw,storageKwh){
  const eta=Math.sqrt(p.efficiency/100),cap=storageKwh*p.dod/100*(1-p.reserve/100),power=storageKw*(1-p.reserve/100);
  if(cap<=EPS||power<=EPS){const hours=Array.from({length:24},(_,h)=>({...hour(p,h,pvKw,0,eta),soc:0}));return aggregate(hours);}
  // Daily cyclic SOC, 60 steps. Only one charge/discharge mode per hour.
  const n=60,step=cap/n;let costs=new Float64Array(n+1);costs.fill(Infinity);costs[0]=0;
  const parents=[];
  for(let h=0;h<24;h++){
   const next=new Float64Array(n+1);next.fill(Infinity);const prev=new Int16Array(n+1);prev.fill(-1);
   const net=Math.max(0,p.load[h]-pvKw*p.solar[h]);
   const chargeSteps=Math.floor((power*eta+EPS)/step), dischargeSteps=Math.floor((Math.min(power,net)/eta+EPS)/step);
   for(let s=0;s<=n;s++)if(Number.isFinite(costs[s]))for(let t=Math.max(0,s-dischargeSteps);t<=Math.min(n,s+chargeSteps);t++){
    const rec=hour(p,h,pvKw,(t-s)*step,eta);if(!rec)continue;const c=costs[s]+rec.cost;if(c<next[t]-EPS){next[t]=c;prev[t]=s;}
   }
   parents.push(prev);costs=next;
  }
  let end=0;const hours=[];
  for(let h=23;h>=0;h--){const start=parents[h][end];if(start<0)throw Error('未找到满足约束的调度方案');hours.push({...hour(p,h,pvKw,(end-start)*step,eta),soc:end*step});end=start;}
  return aggregate(hours.reverse());
 }
 function aggregate(hours){const totals={};for(const k of ['load','pv','direct','charge','discharge','pvCharge','gridCharge','importKwh','exportKwh','curtail','cost'])totals[k]=hours.reduce((s,h)=>s+h[k],0);return {...totals,hours};}
 function npv(flows,rate){return flows.reduce((s,c,i)=>s+c/Math.pow(1+rate,i),0);}
 function irr(flows){const signs=flows.filter(c=>Math.abs(c)>EPS).map(c=>Math.sign(c));let flips=0;for(let i=1;i<signs.length;i++)if(signs[i]!==signs[i-1])flips++;if(flips!==1)return null;let lo=-.95,hi=10,a=npv(flows,lo),b=npv(flows,hi);if(a*b>0)return null;for(let i=0;i<100;i++){const mid=(lo+hi)/2,c=npv(flows,mid);if(a*c<=0){hi=mid;b=c;}else{lo=mid;a=c;}}return (lo+hi)/2;}
 function evaluate(raw,mode){
  const p={...raw};validate(p);const hasPv=mode==='pv'||mode==='combo',hasStorage=mode==='storage'||mode==='combo';
  const pvKw=hasPv?p.pvKw:0,kw=hasStorage?p.storageKw:0,kwh=hasStorage?p.storageKwh:0;
  const pvCapex=pvKw*p.pvCost,storageCapex=kwh*p.storageCost,hasAssets=pvKw>0||kwh>0;
  const capex=pvCapex+storageCapex+(hasAssets?p.siteCost:0),flows=[-capex],rows=[];
  const baseDaily=p.load.reduce((s,v,h)=>s+v*p.buy[h],0),extra=hasStorage&&kwh>0&&p.extrasConfirmed?p.responseAnnual+p.demandAnnual:0;
  let first,firstPv,age=0;
  for(let year=1;year<=p.years;year++){
   const replaced=hasStorage&&kwh>0&&p.replaceYear===year; if(replaced)age=0;
   const currentPv=pvKw*Math.pow(1-p.pvDegrade/100,year-1),currentKwh=kwh*Math.pow(1-p.storageDegrade/100,age);
   const eligible=p.mechanismConfirmed&&year<=p.mechanismYears&&hasPv;
   const adder=eligible?p.mechanismPct/100*(p.mechanismPrice-p.referencePrice):0;
   const dispatchParams={...p,mechanismAdder:adder};
   const day=dispatch(dispatchParams,currentPv,kw,currentKwh);
   const savings=(baseDaily-day.hours.reduce((s,h)=>s+h.importKwh*p.buy[h.h],0))*p.days;
   const exports=day.hours.reduce((s,h)=>s+h.exportKwh*p.sell[h.h],0)*p.days;
   const mechanism=day.exportKwh*adder*p.days;
   const om=pvCapex*p.pvOm/100+storageCapex*p.storageOm/100+(hasAssets?p.annualFixed:0);
   const replacement=replaced?storageCapex*p.replacePct/100:0;
   const cash=savings+exports+mechanism+extra-om-replacement;
   rows.push({year,savings,exports,mechanism,extra,om,replacement,cash});flows.push(cash);age++;
   if(year===1){first=day;firstPv=hasPv?dispatch(dispatchParams,currentPv,0,0):null;}
  }
  let accumulated=-capex,payback=capex===0?0:null;for(const row of rows){const before=accumulated;accumulated+=row.cash;if(payback===null&&before<0&&accumulated>=0&&row.cash>0)payback=row.year-1+(-before)/row.cash;}
  const firstEnergy=rows[0].savings+rows[0].exports+rows[0].mechanism;
  const pvReference=firstPv?(baseDaily-firstPv.cost)*p.days:0;
  return {mode,capex,flows,rows,npv:npv(flows,p.discount/100),irr:capex>0?irr(flows):null,payback,first,annualEnergy:firstEnergy,pvReference,storageIncrement:firstEnergy-pvReference,cycles:kwh>0?first.discharge/(kwh*p.dod/100*Math.sqrt(p.efficiency/100)):0};
 }
 const api={validate,dispatch,npv,irr,evaluate};root.PlannerEngine=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
