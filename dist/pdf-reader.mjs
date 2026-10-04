const $=id=>document.getElementById(id);
let pdf,renderTask,pageNumber=1,revision=0;
const entryId=new URLSearchParams(location.search).get('id');
const controls=['prev','next','page','zoom'];
function busy(value){controls.forEach(id=>$(id).disabled=value);if(pdf&&!value){$('prev').disabled=pageNumber<=1;$('next').disabled=pageNumber>=pdf.numPages}}
async function renderPage(){
 const token=++revision;busy(true);$('status').textContent=`正在显示第 ${pageNumber} 页…`;
 if(renderTask){renderTask.cancel();try{await renderTask.promise}catch{}}
 try{
  const page=await pdf.getPage(pageNumber);if(token!==revision)return;
  const base=page.getViewport({scale:1});const available=Math.max(160,$('viewport').clientWidth-16);
  const scale=$('zoom').value==='fit'?available/base.width:Number($('zoom').value);
  const viewport=page.getViewport({scale});
  // Limit canvas memory on phones; render only the requested page.
  const pixelScale=Math.min(window.devicePixelRatio||1,2,Math.sqrt(4000000/(viewport.width*viewport.height)));
  const canvas=$('canvas');canvas.width=Math.max(1,Math.floor(viewport.width*pixelScale));canvas.height=Math.max(1,Math.floor(viewport.height*pixelScale));canvas.style.width=viewport.width+'px';canvas.style.height=viewport.height+'px';
  renderTask=page.render({canvasContext:canvas.getContext('2d'),viewport,transform:pixelScale===1?null:[pixelScale,0,0,pixelScale,0,0]});await renderTask.promise;
  if(token!==revision)return;
  $('page').value=pageNumber;$('status').textContent=`第 ${pageNumber} / ${pdf.numPages} 页`;page.cleanup();busy(false);
 }catch(error){if(token!==revision)return;$('status').textContent='此页暂未显示，请重试或选择文字阅读版。';busy(false);console.error(error)}
}
try{
 const entries=await fetch('documents/manifest.json').then(r=>{if(!r.ok)throw Error('manifest');return r.json()});
 const entry=entries.find(d=>d.id===entryId),file=entry?.files?.find(f=>f.format==='PDF原件');
 if(!file||!/^documents\/doc-\d{3}\.pdf$/.test(file.path))throw Error('Document unavailable');
 document.title=entry.title+' · 网页阅读';$('title').textContent=entry.title;$('back').href='index.html#rules/'+entry.id;
 $('download').href=file.path;$('download').hidden=false;
 if(file.textPath){$('textLink').href=file.textPath;$('textLink').hidden=false}
 const lib=await import('./vendor/pdfjs/pdf.mjs');lib.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdfjs/pdf.worker.mjs',import.meta.url).href;
 const task=lib.getDocument({url:file.path,cMapUrl:'vendor/pdfjs/cmaps/',cMapPacked:true,standardFontDataUrl:'vendor/pdfjs/standard_fonts/',wasmUrl:'vendor/pdfjs/wasm/',isEvalSupported:false});
 task.onProgress=p=>{$('status').textContent=p.total?`正在加载 PDF：${Math.min(100,Math.round(p.loaded/p.total*100))}%`:'正在加载 PDF…'};
 pdf=await task.promise;$('total').textContent=pdf.numPages;$('page').max=pdf.numPages;
 $('prev').onclick=()=>{if(pageNumber>1){pageNumber--;renderPage()}};
 $('next').onclick=()=>{if(pageNumber<pdf.numPages){pageNumber++;renderPage()}};
 $('page').onchange=()=>{const n=Number($('page').value);if(Number.isInteger(n)&&n>=1&&n<=pdf.numPages){pageNumber=n;renderPage()}else $('page').value=pageNumber};
 $('zoom').onchange=renderPage;let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if($('zoom').value==='fit')renderPage()},200)});
 await renderPage();
}catch(error){$('status').textContent='阅读器暂未加载成功。请选择文字阅读版，或下载原件后查看。';console.error(error)}
