const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'../dist'),c={document:{getElementById:()=>null},window:{addEventListener:()=>{}}};vm.createContext(c);
vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+fs.readFileSync(path.join(root,'lesson-animations.js'),'utf8')+fs.readFileSync(path.join(root,'learning.js'),'utf8')+';globalThis.courseData={lessons,learningGroups,learningOrder,lessonGuides,glossary}',c);
const d=c.courseData;assert.equal(d.lessons.length,13);assert.equal(new Set(d.learningOrder).size,13);
for(const l of d.lessons){assert.ok(d.learningOrder.includes(l.id));const g=d.lessonGuides[l.id];assert.ok(g.goal&&g.example.length===2);for(const id of g.pre)assert.ok(d.learningOrder.indexOf(id)<d.learningOrder.indexOf(l.id),`prerequisite cycle ${l.id}`);for(const term of g.terms)assert.ok(d.glossary[term]);assert.ok(l.quiz.answer>=0&&l.quiz.answer<l.quiz.options.length)}
assert.equal(d.lessonGuides[0].task[1],50*.5);assert.equal(d.lessonGuides[3].task[1],110*500+80*(350-500));assert.equal(d.lessonGuides[6].task[1],175-80);assert.equal(d.lessonGuides[7].task[1],100*300+(92-100)*450);assert.equal(d.lessonGuides[12].task[1],100*.88*.5-100*.3);
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.ok(index.indexOf('learning.js')<index.indexOf('app.js'));assert.ok(index.includes('workspace.css'));
console.log('PASS 13 stable lesson IDs, acyclic prerequisites, glossary coverage, varied numerical practice and answer arithmetic.');
