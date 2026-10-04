const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const root=path.join(__dirname,'../dist');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'documents/manifest.json'),'utf8'));
assert.equal(new Set(manifest.map(d=>d.id)).size,manifest.length);
assert.equal(new Set(manifest.map(d=>d.ruleUrl)).size,manifest.length);
let count=0;
for(const d of manifest)for(const f of d.files){
 assert.match(f.path,/^documents\/doc-\d{3}\.(pdf|html)$/);
 const b=fs.readFileSync(path.join(root,f.path));assert.equal(b.length,f.bytes);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);
 assert.match(f.sourceUrl,/^https?:\/\//);
 if(f.format==='PDF原件'){assert.equal(b.subarray(0,5).toString(),'%PDF-');assert.ok(f.pages>0)}
 else {const html=b.toString('utf8');assert.match(html,/官方网页正文留存/);assert.match(html,/Content-Security-Policy/);assert.doesNotMatch(html,/<script|javascript:| onerror=/i)}
 count++;
}
const c={};vm.createContext(c);
for(const name of ['data.js','planner-policy.js','document-library.js','library-ui.js'])vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),c);
vm.runInContext(`for(const r of rules){if(r.files?.length){if(!libraryLinks(r).includes('站内阅读'))throw new Error('missing reader')}}`,c);
const markup=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.ok(markup.indexOf('document-library.js')>markup.indexOf('planner-policy.js'));assert.ok(markup.indexOf('library-ui.js')<markup.indexOf('app.js'));
console.log(`Library checks passed: ${manifest.length} records, ${count} archived files; bytes, hashes and links verified.`);
