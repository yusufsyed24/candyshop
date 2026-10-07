/* Blesscon Candy - hero fruit & juice splash (canvas, no dependencies) */
(()=>{
"use strict";
const hero=document.querySelector(".hero"), cv=document.getElementById("splash");
if(!hero||!cv||matchMedia("(prefers-reduced-motion: reduce)").matches) return;
const ctx=cv.getContext("2d"), TAU=Math.PI*2, G=1300, mobile=innerWidth<860;
const R=(a,b)=>a+Math.random()*(b-a);

/* ---- glossy fruit artwork, same look/colours as the RANI flavour range ---- */
const sh=(t,a,c)=>`<${t} ${a} fill="${c}"/><${t} ${a} fill="url(#g)"/>`;
const gloss=d=>`<path d="${d}" stroke="#fff" stroke-opacity=".6" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
const leaf=d=>`<path d="${d}" fill="#37a85a"/>`;
const svg=(c,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100"><defs><radialGradient id="g" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".35" stop-color="${c}" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></radialGradient></defs>${body}</svg>`;
const dots=(p,r,c,o)=>p.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="${r}" fill="${c}" opacity="${o}"/>`).join("");

const FR=[
 {c:"#e6335a",j:"#ff86a3",svg:svg("#e6335a",
  sh("path",'d="M50 92C24 80 10 56 13 38C15 25 30 21 50 26C70 21 85 25 87 38C90 56 76 80 50 92Z"',"#e6335a")+
  [[35,42],[50,38],[65,42],[30,58],[44,54],[58,54],[70,58],[38,72],[50,68],[62,72],[50,82]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="1.8" ry="2.6" fill="#ffe7a0"/>`).join("")+
  `<path d="M50 28L36 20L28 26L40 30L34 38L46 33L50 42L54 33L66 38L60 30L72 26L64 20Z" fill="#3aa655"/><rect x="48" y="10" width="4" height="14" rx="2" fill="#2d8a47"/>`+
  gloss("M24 42Q32 32 44 35"))},
 {c:"#ff8a1f",j:"#ffc36b",svg:svg("#ff8a1f",
  sh("circle",'cx="50" cy="55" r="38"',"#ff8a1f")+dots([[35,45],[62,40],[70,62],[40,72],[55,55],[28,62]],1.2,"#d96a00",.5)+
  leaf("M52 18C58 6 74 6 82 12C74 24 60 24 52 18Z")+`<circle cx="50" cy="18" r="3.2" fill="#2d8a47"/>`+gloss("M24 50Q30 34 46 30"))},
 {c:"#ffb400",j:"#ffe066",svg:svg("#ffb400",
  sh("path",'d="M18 58C16 30 42 14 66 20C88 27 92 60 68 80C48 95 20 86 18 58Z"',"#ffb400")+
  `<ellipse cx="64" cy="64" rx="13" ry="17" fill="#ff6a2b" opacity=".3" transform="rotate(-30 64 64)"/>`+
  leaf("M54 20C58 6 76 4 86 10C80 22 64 26 54 20Z")+`<path d="M52 22Q50 12 46 8" stroke="#6b4a2b" stroke-width="3" fill="none" stroke-linecap="round"/>`+gloss("M26 52Q30 34 46 28"))},
 {c:"#ff9a76",j:"#ffc7b0",svg:svg("#ff9a76",
  sh("path",'d="M50 90C22 90 10 64 18 44C25 26 42 22 50 32C58 22 75 26 82 44C90 64 78 90 50 90Z"',"#ff9a76")+
  `<ellipse cx="68" cy="60" rx="13" ry="22" fill="#ff5a6a" opacity=".3"/><path d="M50 32C45 50 47 70 53 88" stroke="#d9603f" stroke-opacity=".5" stroke-width="2.5" fill="none" stroke-linecap="round"/>`+
  leaf("M50 30C56 14 72 12 80 18C72 30 58 34 50 30Z")+gloss("M24 50Q28 38 38 33"))},
 {c:"#8e3fbf",j:"#c48be6",svg:svg("#8e3fbf",
  [[30,42],[70,42],[50,36],[38,60],[62,60],[50,80]].map(p=>sh("circle",`cx="${p[0]}" cy="${p[1]}" r="16"`,"#8e3fbf")+`<ellipse cx="${p[0]-6}" cy="${p[1]-7}" rx="4" ry="2.4" fill="#fff" opacity=".6"/>`).join("")+
  `<path d="M50 24Q50 12 60 8" stroke="#6b4a2b" stroke-width="4" fill="none" stroke-linecap="round"/>`+leaf("M56 14C62 2 80 4 88 10C80 22 64 22 56 14Z"))},
 {c:"#3f5bd6",j:"#8ea3f5",svg:svg("#3f5bd6",
  sh("circle",'cx="50" cy="56" r="36"',"#3f5bd6")+`<circle cx="50" cy="56" r="36" fill="#fff" opacity=".1"/>`+
  `<path d="M50 40L54 47L62 45L57 52L62 59L54 57L50 64L46 57L38 59L43 52L38 45L46 47Z" fill="#1f2f8f" opacity=".85"/>`+gloss("M24 50Q30 34 44 30"))},
 {c:"#f2c500",j:"#fff08a",svg:svg("#f2c500",
  `<clipPath id="k"><ellipse cx="50" cy="67" rx="27" ry="33"/></clipPath>`+sh("ellipse",'cx="50" cy="67" rx="27" ry="33"',"#f2c500")+
  `<g clip-path="url(#k)" stroke="#b98a00" stroke-width="1.6" opacity=".55">`+[-4,-3,-2,-1,0,1,2,3,4,5,6].map(i=>`<path d="M${i*12} 30L${i*12+50} 100M${i*12+50} 30L${i*12} 100"/>`).join("")+`</g>`+
  `<path d="M50 40L26 22L46 32Z M50 40L74 22L54 32Z" fill="#2d8a47"/><path d="M50 40L30 10L44 26L40 2L50 24L60 2L56 26L70 10Z" fill="#37a85a"/>`+gloss("M32 56Q34 46 40 40"))}
];
FR.forEach(f=>{f.img=null});

/* ---- state ---- */
let W=0,H=0,box={x:0,y:0,w:0,h:0},size=80,fr=[],hv=[],dr=[],fx=[],order=[],oi=0;
function fit(){
  const r=hero.getBoundingClientRect(), d=Math.min(devicePixelRatio||1,2);
  W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
  size=Math.max(52,Math.min(92,W*.075));
}
function shuffle(){order=FR.map((_,i)=>i);for(let i=order.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[order[i],order[j]]=[order[j],order[i]];}oi=0;}

function launch(){
  if(oi>=order.length) shuffle();
  const f=FR[order[oi++]], s=size*R(.85,1.15);
  /* burst across the banner; on desktop keep them to the right so the headline stays readable */
  const desk=W>=860, tx=desk?R(W*.4,W-50):R(50,W-50), ty=desk?H*R(.1,.5):Math.min(H*.5,W*1.35)*R(.2,.85);
  const sx=tx+R(-110,110), sy=H+s, vy=-Math.sqrt(2*G*(sy-ty)), t=-vy/G;
  fr.push({f,x:sx,y:sy,vx:(tx-sx)/t,vy,rot:R(-.5,.5),vr:R(-3,3),s});
}
function burst(x,y,f,s){
  const k=s/80, N=mobile?18:32;
  fx.push({k:"mist",x,y,t:0,d:.75,r:s*1.6,c:f.c});
  for(let i=0;i<11;i++){const a=i/11*TAU+R(-.2,.2);fx.push({k:"arm",x,y,a,t:0,d:R(.45,.65),L:s*R(.9,1.7),w:s*R(.13,.24),c:i%3?f.c:f.j});}
  for(let i=0;i<N;i++){const a=R(0,TAU),v=R(160,560)*k;dr.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-80,r:R(2.5,7)*Math.max(.8,k),t:0,d:R(.9,1.6),c:i%4?f.c:f.j});}
  for(let i=0;i<5;i++){const a=R(0,TAU),v=R(90,240)*k;dr.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,r:R(8,13)*Math.max(.8,k),t:0,d:R(1.1,1.7),c:f.c});}
}

function update(dt){
  for(let i=fr.length-1;i>=0;i--){
    const f=fr[i]; f.vy+=G*dt; f.x+=f.vx*dt; f.y+=f.vy*dt; f.rot+=f.vr*dt;
    if(f.vy>=0){
      burst(f.x,f.y,f.f,f.s);
      for(const side of[-1,1]) hv.push({img:f.f.img,side,x:f.x,y:f.y,vx:side*R(90,170)+f.vx*.3,vy:-R(60,140),rot:f.rot,vr:side*R(1.5,3.5),s:f.s,t:0,d:1.1});
      fr.splice(i,1);
    }
  }
  for(let i=hv.length-1;i>=0;i--){const h=hv[i];h.t+=dt;h.vy+=G*.8*dt;h.x+=h.vx*dt;h.y+=h.vy*dt;h.rot+=h.vr*dt;if(h.t>h.d)hv.splice(i,1);}
  for(let i=dr.length-1;i>=0;i--){const p=dr[i];p.t+=dt;p.vy+=900*dt;p.vx*=Math.pow(.35,dt);p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.t>p.d||p.y>H+40)dr.splice(i,1);}
  for(let i=fx.length-1;i>=0;i--){fx[i].t+=dt;if(fx[i].t>fx[i].d)fx.splice(i,1);}
}

function draw(){
  ctx.clearRect(0,0,W,H);
  for(const e of fx){
    const u=e.t/e.d;
    if(e.k==="mist"){
      const r=e.r*(.3+u*.9), g=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,r);
      g.addColorStop(0,e.c);g.addColorStop(1,e.c+"00");
      ctx.globalAlpha=.42*(1-u);ctx.fillStyle=g;ctx.beginPath();ctx.arc(e.x,e.y,r,0,TAU);ctx.fill();
    }else{
      const p=1-Math.pow(1-u,3), w=e.w*(1-p*.75), ca=Math.cos(e.a), sa=Math.sin(e.a);
      ctx.globalAlpha=1-Math.pow(u,1.5);ctx.strokeStyle=ctx.fillStyle=e.c;ctx.lineWidth=w;ctx.lineCap="round";
      ctx.beginPath();ctx.moveTo(e.x+ca*e.L*.25*p,e.y+sa*e.L*.25*p);ctx.lineTo(e.x+ca*e.L*p,e.y+sa*e.L*p);ctx.stroke();
      ctx.beginPath();ctx.arc(e.x+ca*e.L*p,e.y+sa*e.L*p,w*.8,0,TAU);ctx.fill();
    }
  }
  ctx.globalAlpha=1;
  for(const f of fr){ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.rot);ctx.drawImage(f.f.img,-f.s/2,-f.s/2,f.s,f.s);ctx.restore();}
  for(const h of hv){
    ctx.save();ctx.globalAlpha=Math.max(0,1-Math.pow(h.t/h.d,2));ctx.translate(h.x,h.y);ctx.rotate(h.rot);
    ctx.drawImage(h.img,h.side<0?0:100,0,100,200,h.side<0?-h.s/2:0,-h.s/2,h.s/2,h.s);ctx.restore();
  }
  for(const p of dr){
    const u=p.t/p.d, sp=Math.hypot(p.vx,p.vy), r=p.r*(.35+.65*(1-u)), st=1+Math.min(sp/320,1.6);
    ctx.globalAlpha=Math.min(1,(p.d-p.t)/.35);ctx.fillStyle=p.c;
    ctx.beginPath();ctx.ellipse(p.x,p.y,r*st,r,Math.atan2(p.vy,p.vx),0,TAU);ctx.fill();
    if(r>4){ctx.globalAlpha*=.6;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(p.x-r*.3,p.y-r*.35,r*.28,0,TAU);ctx.fill();}
  }
  ctx.globalAlpha=1;
}

/* ---- loop (pauses when hero is off-screen or tab hidden) ---- */
let last=0,acc=0,next=.4,raf=0,seen=true;
function loop(ts){
  raf=0; if(!seen||document.hidden){last=0;return;}
  const dt=Math.min(.033,(ts-(last||ts))/1000); last=ts;
  acc+=dt; if(acc>=next&&fr.length<(mobile?3:3)){acc=0;next=mobile?R(.6,1.1):R(.9,1.5);launch();}
  update(dt);draw();raf=requestAnimationFrame(loop);
}
const kick=()=>{if(!raf&&seen&&!document.hidden)raf=requestAnimationFrame(loop);};

Promise.all(FR.map(f=>new Promise(res=>{
  const i=new Image();i.onload=()=>{f.img=i;res();};i.onerror=res;
  i.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(f.svg);
}))).then(()=>{
  for(let i=FR.length-1;i>=0;i--) if(!FR[i].img) FR.splice(i,1);
  if(!FR.length) return;
  fit();shuffle();
  new ResizeObserver(fit).observe(hero);
  new IntersectionObserver(e=>{seen=e[0].isIntersecting;kick();}).observe(hero);
  document.addEventListener("visibilitychange",kick);
  hero.addEventListener("pointerdown",e=>{
    if(e.target.closest("a,button"))return;
    const r=hero.getBoundingClientRect();
    burst(e.clientX-r.left,e.clientY-r.top,FR[(Math.random()*FR.length)|0],size*.9);kick();
  });
  kick();
});
})();
