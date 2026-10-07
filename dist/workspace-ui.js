(function(){
 const theme=document.getElementById('themeToggle'),menu=document.getElementById('menuToggle');
 function applyTheme(value){document.body.dataset.theme=value;theme.textContent=value==='dark'?'浅色模式':'深色模式';theme.setAttribute('aria-label',value==='dark'?'切换浅色模式':'切换深色模式')}
 let saved='light';try{saved=localStorage.getItem('power-learning-theme')==='dark'?'dark':'light'}catch{}applyTheme(saved);
 theme.onclick=()=>{const value=document.body.dataset.theme==='dark'?'light':'dark';applyTheme(value);try{localStorage.setItem('power-learning-theme',value)}catch{}};
 function closeNav(){document.body.classList.remove('nav-open');menu.setAttribute('aria-expanded','false')}
 menu.onclick=()=>{const open=document.body.classList.toggle('nav-open');menu.setAttribute('aria-expanded',String(open))};
 document.getElementById('navOverlay').onclick=closeNav;document.querySelectorAll('.sidebar nav a').forEach(a=>a.addEventListener('click',closeNav));window.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});window.addEventListener('hashchange',closeNav);
})();
