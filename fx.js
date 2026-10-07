/* Blesscon Candy - floating RANI candy pieces page background (no dependencies) */
(()=>{
"use strict";
const calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
const small=innerWidth<700;
const mk=(t,c,p)=>{const e=document.createElement(t);e.className=c;(p||document.body).appendChild(e);return e;};

const bg=mk("div","bgfx");bg.setAttribute("aria-hidden","true");

/* file, left%, top%, width px, rotation deg, opacity, blur px, scroll-drift depth */
const CANDY=[
 ["mango-r",     -2,  8,132,-18,.55,0,1.0],
 ["strawberry-m",92,  4,118, 22,.50,0,.8],
 ["blueberry-r", 95, 30, 98,-12,.40,1,.5],
 ["peach-m",     -3, 36,112, 14,.52,0,.9],
 ["pineapple-r", 91, 55,140,-24,.55,0,1.1],
 ["red-grapes-m",-1, 62, 96, 30,.42,.8,.6],
 ["orange-r",    46,  6, 70, 10,.18,2.5,.4],
 ["mango-m",     93, 78,108, -8,.48,0,.9],
 ["blueberry-m",  1, 86,128, 18,.52,0,1.0],
 ["strawberry-r",70, 92, 90,-30,.30,1.2,.7],
 ["peach-r",     34, 48, 58,-20,.14,3,.3],
 ["orange-m",    64, 24, 64, 25,.16,3,.4],
 ["pineapple-m", 50, 93, 84,-15,.26,1.5,.6],
 ["red-grapes-r", 5, 18, 78,-35,.34,1,.5]
];
/* on phones show fewer, slightly smaller pieces (spread across the screen) */
const list=small?[0,1,2,3,4,5,7,8,9,12,13].map(i=>CANDY[i]):CANDY;

const items=list.map((c,i)=>{
  const w=mk("div","cd",bg);
  w.style.cssText=`left:${c[1]}%;top:${c[2]}%;width:${Math.round(c[3]*(small?.8:1))}px;rotate:${c[4]}deg;opacity:${(Math.min(.8,c[5]*(small?1.25:1))).toFixed(2)};--dur:${(7+(i*1.7)%6).toFixed(1)}s;--dl:${(-(i*1.3)%9).toFixed(1)}s;--bl:${c[6]}px`;
  const im=document.createElement("img");
  im.src=`assets/candy/${c[0]}.webp`;im.alt="";im.decoding="async";im.draggable=false;
  w.appendChild(im);
  return {w,dp:c[7],ph:i*.9};
});

/* a few tiny gold twinkles for extra sparkle */
if(!calm){for(let i=0;i<(small?6:12);i++){const s=mk("i","tw",bg);
  s.style.cssText=`left:${(6+(i*37)%90)}%;top:${(4+(i*53)%92)}%;--s:${(.6+(i%4)*.25).toFixed(2)};--d:${(-(i*1.1)%7).toFixed(1)}s`;}}

/* gentle scroll drift: each candy floats at its own depth */
if(!calm){
  let tick=0;
  const move=()=>{tick=0;const y=scrollY;
    items.forEach(o=>{o.w.style.translate=`0 ${(Math.sin(y/700+o.ph)*90*o.dp).toFixed(0)}px`;});};
  addEventListener("scroll",()=>{if(!tick)tick=requestAnimationFrame(move);},{passive:true});
  move();
}
/* ---- candy BLAST for phones & tablets: candies burst out of the screen on load, on every tap, and every few seconds ---- */
if(!calm&&matchMedia("(max-width:860px)").matches&&"animate" in Element.prototype){
  const FILES=["mango-r","strawberry-m","blueberry-r","peach-m","pineapple-r","red-grapes-m","orange-r","mango-m","blueberry-m","strawberry-r","peach-r","orange-m","pineapple-m","red-grapes-r"];
  FILES.forEach(f=>{const i=new Image();i.src=`assets/candy/${f}.webp`;});
  const layer=mk("div","blastfx");layer.setAttribute("aria-hidden","true");
  const R=(a,b)=>a+Math.random()*(b-a);
  const blast=(x,y,n)=>{
    for(let i=0;i<n;i++){
      const im=document.createElement("img");
      im.src=`assets/candy/${FILES[(Math.random()*FILES.length)|0]}.webp`;im.alt="";im.draggable=false;
      const w=R(34,70);im.style.cssText=`left:${x-w/2}px;top:${y-w/2}px;width:${w}px`;
      layer.appendChild(im);
      const a=R(0,Math.PI*2),d=R(90,Math.min(innerWidth*.75,300)),dx=Math.cos(a)*d,dy=Math.sin(a)*d,r=R(-300,300);
      const an=im.animate([
        {transform:"translate(0,0) scale(.2) rotate(0deg)",opacity:0},
        {transform:`translate(${dx*.55}px,${dy*.55-30}px) scale(1.1) rotate(${r*.5}deg)`,opacity:1,offset:.3},
        {transform:`translate(${dx}px,${dy+R(60,160)}px) scale(.8) rotate(${r}deg)`,opacity:0}
      ],{duration:R(1100,1700),easing:"cubic-bezier(.2,.7,.3,1)",fill:"forwards"});
      an.onfinish=()=>im.remove();
    }
    /* tiny sparkle dots */
    for(let i=0;i<10;i++){
      const d=document.createElement("i");d.style.cssText=`left:${x}px;top:${y}px;background:${["#ff4d94","#ffd23f","#b48af0","#ff8a1f","#3fd0a0"][i%5]}`;
      layer.appendChild(d);
      const a=R(0,Math.PI*2),k=R(40,150);
      d.animate([{transform:"translate(0,0) scale(1)",opacity:1},{transform:`translate(${Math.cos(a)*k}px,${Math.sin(a)*k}px) scale(0)`,opacity:0}],{duration:R(500,900),easing:"ease-out",fill:"forwards"}).onfinish=()=>d.remove();
    }
  };
  /* opening blast + a gentle burst every few seconds from a random spot */
  setTimeout(()=>{blast(innerWidth*.5,innerHeight*.42,14);},500);
  setTimeout(()=>{blast(innerWidth*.2,innerHeight*.3,8);blast(innerWidth*.8,innerHeight*.35,8);},900);
  setInterval(()=>{if(document.hidden)return;blast(R(innerWidth*.12,innerWidth*.88),R(innerHeight*.15,innerHeight*.8),R(5,8)|0);},4200);
  /* tap anywhere (not on buttons/links/fields) to pop candies */
  addEventListener("pointerdown",e=>{if(e.target.closest("a,button,input,select,textarea,label,summary,.drawer"))return;blast(e.clientX,e.clientY,8);},{passive:true});
}
})();
