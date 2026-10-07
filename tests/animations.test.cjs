const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'../dist'),c={document:{getElementById:()=>null},window:{addEventListener:()=>{}}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'lesson-animations.js'),'utf8')+';globalThis.model=AnimationModel;globalThis.frame=animationFrame;',c);
const m=c.model;assert.equal(m.energy().energy,6);assert.equal(m.energy().kwh,6000);assert.equal(m.energy().cost,1800);
for(const [d,p] of [[80,180],[81,300],[150,300],[180,300],[181,480],[220,480],[300,480],[320,null]]){const s=m.dispatch(d);assert.equal(s.price,p);assert.equal(s.quantities.reduce((a,b)=>a+b,0)+s.shortfall,d);s.quantities.forEach((q,i)=>assert.ok(q<=[80,100,120][i]))}
assert.equal(m.settlement(110).total,34500);assert.equal(m.settlement(90).total,25500);assert.equal(m.settlement(90).delta,-10);
const s=m.storage();assert.equal(s.output+s.loss,100);assert.equal(s.output,88);assert.ok(Math.abs(s.gross-40.4)<1e-9);assert.ok(Math.abs(m.storage(.88,.4).gross-5.2)<1e-9);
const params={demand:320,actual:90,efficiency:.88,avoidedPrice:.8};
assert.match(c.frame('dispatch',params,4,1).explain,/缺额 20 MW/);assert.match(c.frame('settlement',params,3,1).explain,/25,500/);
assert.match(c.frame('storage',params,0,1).svg,/绿色：充入电量/);assert.match(c.frame('storage',params,1,1).svg,/绿色：可放出电量/);
assert.match(c.frame('storage',params,3,1).explain,/还不是项目净利润/);assert.equal(c.frame('energy',params,1,0).explain,c.frame('energy',params,1,.8).explain);
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.ok(index.indexOf('lesson-animations.js')<index.indexOf('learning.js'));
console.log('PASS animation arithmetic, energy conservation, dispatch price boundaries/shortfall, negative deviations and consistent phase labels.');
