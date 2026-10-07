/* Blesscon Candy - custom event order designer (needs main.js for PRODUCTS, CFG, find, money, toast) */
(()=>{
"use strict";
const form=document.getElementById("czForm"); if(!form) return;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- design tokens ---------- */
const THEMES={
  ivory:  {n:"Ivory & Gold", bg:"#fff6df", tx:"#7a4e00", ring:"#d9a21b", tint:"#fdf1d6"},
  royal:  {n:"Royal & Gold", bg:"#5b2a8c", tx:"#ffd75e", ring:"#ffd75e", tint:"#efe2fb"},
  blush:  {n:"Blush Rose",   bg:"#ffd6e5", tx:"#a3103f", ring:"#e91e63", tint:"#ffe6f0"},
  sky:    {n:"Sky Blue",     bg:"#cfe6ff", tx:"#0b2a7a", ring:"#3b82f6", tint:"#e3f0ff"},
  emerald:{n:"Emerald",      bg:"#0f6b4f", tx:"#fff1c2", ring:"#ffd75e", tint:"#dcf3ea"},
  ruby:   {n:"Ruby Red",     bg:"#b3124a", tx:"#ffffff", ring:"#ffd75e", tint:"#ffe0e8"}
};
const RIBBONS={gold:{n:"Gold",c:"#f5b400"},pink:{n:"Pink",c:"#ff4d94"},blue:{n:"Royal blue",c:"#2f5bd6"},purple:{n:"Purple",c:"#7a3fc0"},white:{n:"White",c:"#ffffff"},red:{n:"Red",c:"#d62839"}};
const FONTS={
  script:{n:"Script",  f:"'Great Vibes','Brush Script MT',cursive",w:400,k:.40,m:1.18},
  classic:{n:"Classic",f:"Fraunces,Georgia,serif",w:800,k:.56,m:1},
  modern:{n:"Modern",  f:"Poppins,system-ui,sans-serif",w:600,k:.58,m:.9}
};
const EVENTS={
  "Wedding":          {theme:"ivory", ribbon:"gold", text:"Ayesha & Ali", small:"Walima"},
  "Dholki / Mehndi":  {theme:"royal", ribbon:"gold", text:"Hamad ki dholki", small:"Mehndi night"},
  "Birthday party":   {theme:"sky",   ribbon:"blue", text:"Zayan turns 5", small:"Thank you for coming"},
  "Other celebration":{theme:"blush", ribbon:"pink", text:"Thank you", small:"with love"}
};
const DEFAULT_COLS=["#ff3b5c","#ff9a1f","#ffc928","#8b3fb8","#3b5bdb","#6cc24a"];
const COLOUR_WORDS=[["strawberry","#ff3b5c"],["orange","#ff9a1f"],["mango","#ffc928"],["peach","#ff9f80"],["grapes","#8b3fb8"],["blueberry","#3b5bdb"],["pineapple","#f5d90a"],["cherry","#d6224a"],["lychee","#ff8fc0"],["green apple","#6cc24a"],["blackcurrant","#4a2a73"],["toffee","#8b5a2b"],["saunf","#8fa84a"],["eggs","#f4e6d0"],["pan masala","#5a7d3a"]];
const colourOf=n=>{n=n.toLowerCase();for(const [w,c] of COLOUR_WORDS) if(n.includes(w)) return c;return "#ff6fa5";};

/* ---------- pack illustration ---------- */
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function bow(c){
  const s='stroke="rgba(0,0,0,.18)" stroke-width="1"';
  return `<g>
  <path d="M0 0C-12 24-30 40-38 56L-22 58L-13 47L-6 62L5 58C6 36 4 16 0 0Z" fill="${c}" ${s}/>
  <path d="M0 0C12 24 30 40 38 56L22 58L13 47L6 62L-5 58C-6 36 -4 16 0 0Z" fill="${c}" ${s}/>
  <path d="M0 0C-36-38-64-10-44 12C-32 24-10 10 0 0Z" fill="${c}" ${s}/>
  <path d="M0 0C36-38 64-10 44 12C32 24 10 10 0 0Z" fill="${c}" ${s}/>
  <path d="M-4 -2C-26 -20 -44 -6 -36 6" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M4 -2C26 -20 44 -6 36 6" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2.4" stroke-linecap="round"/>
  <circle r="8.5" fill="${c}" ${s}/><circle cx="-2" cy="-2.5" r="3" fill="rgba(255,255,255,.4)"/></g>`;
}
function wrapText(t,max){
  const w=t.trim().split(/\s+/).filter(Boolean),L=[];let c="";
  w.forEach(x=>{ if(!c) c=x; else if((c+" "+x).length<=max) c+=" "+x; else {L.push(c);c=x;} });
  if(c) L.push(c);
  while(L.length>3){const a=L.pop();L[L.length-1]+=" "+a;}
  return L;
}
function label(R,o,T,F){
  const lines=wrapText(o.text,R>56?12:10), n=lines.length||1, long=Math.max(...lines.map(l=>l.length),1);
  const base=(n===1?26:n===2?22:17)*(R/54)*F.m;
  const size=Math.max(9,Math.min(base,(R*1.58)/(long*F.k)));
  const lh=size*1.08, blockH=n*lh, smallH=o.small?14:0, y0=-(blockH+smallH)/2+(n<3?4:0);
  const txt=lines.map((l,i)=>`<text y="${(y0+(i+.8)*lh).toFixed(1)}" text-anchor="middle" font-family="${F.f}" font-weight="${F.w}" font-size="${size.toFixed(1)}" fill="${T.tx}">${esc(l)}</text>`).join("");
  const sm=o.small?`<text y="${(y0+blockH+11).toFixed(1)}" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="500" font-size="${Math.min(9.5,R*.17).toFixed(1)}" fill="${T.tx}" opacity=".9">${esc(o.small)}</text>`:"";
  const sp=n<3?`<path transform="translate(0 ${-R+15})" d="M0-6L1.6-1.6L6 0L1.6 1.6L0 6L-1.6 1.6L-6 0L-1.6-1.6Z" fill="${T.ring}"/>`:"";
  return `<circle r="${R}" fill="${T.bg}" stroke="${T.ring}" stroke-width="3"/><circle r="${R-6}" fill="none" stroke="${T.ring}" stroke-width="1.3" stroke-dasharray="1.5 4.5" stroke-linecap="round"/>${sp}${txt}${sm}`;
}
function packSVG(o,uid){
  const T=THEMES[o.theme],F=FONTS[o.font],rib=RIBBONS[o.ribbon].c,cone=o.style!=="bag";
  const cols=o.colors.length?o.colors:DEFAULT_COLS, rnd=rng(7), body=[];
  let bodyPath,cello,tie,lab,bounds;
  if(cone){
    bodyPath="M70 122L250 122L168 400Q160 412 152 400Z";
    cello="M72 122C56 98 72 60 102 44C118 36 132 52 146 46C152 42 156 36 160 36C164 36 168 42 174 46C188 52 202 36 218 44C248 60 264 98 248 122Z";
    tie=[160,122]; lab=[160,224,50]; bounds=[70,122,250,412];
    for(let i=0;i<200;i++){
      const y=124+rnd()*282, hw=90*(404-y)/282+4, x=160+(rnd()*2-1)*hw, r=5.4+rnd()*3.2, c=cols[(i*5+Math.floor(rnd()*3))%cols.length];
      body.push([y,`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" stroke="rgba(0,0,0,.14)" stroke-width=".8"/><circle cx="${(x-r*.3).toFixed(1)}" cy="${(y-r*.3).toFixed(1)}" r="${(r*.28).toFixed(1)}" fill="#fff" opacity=".55"/>`]);
    }
  } else {
    bodyPath="M82 152L238 152L250 392Q250 406 236 406L84 406Q70 406 70 392Z";
    cello="M82 152C68 120 84 78 112 58C128 48 140 68 150 62C155 58 157 52 160 52C163 52 165 58 170 62C180 68 192 48 208 58C236 78 252 120 238 152Z";
    tie=[160,152]; lab=[160,296,62]; bounds=[70,152,250,406];
    for(let i=0;i<64;i++){
      const x=80+rnd()*160, y=160+rnd()*240, a=(rnd()*140-70).toFixed(0), c=cols[(i*3+Math.floor(rnd()*3))%cols.length];
      body.push([y,`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a})"><path d="M-9 0L-17-6L-17 6ZM9 0L17-6L17 6Z" fill="${c}" opacity=".85" stroke="rgba(0,0,0,.12)" stroke-width=".6"/><ellipse rx="11" ry="7" fill="${c}" stroke="rgba(0,0,0,.16)" stroke-width=".8"/><ellipse cx="-2" cy="-2.4" rx="5" ry="1.7" fill="#fff" opacity=".5"/></g>`]);
    }
  }
  body.sort((a,b)=>a[0]-b[0]);
  const shadow=cone?`<ellipse cx="160" cy="424" rx="40" ry="5" fill="rgba(40,10,60,.14)"/>`:`<ellipse cx="160" cy="414" rx="96" ry="8" fill="rgba(40,10,60,.2)"/>`;
  const tilt=cone?`transform="rotate(-9 160 250)"`:"";
  return `<svg viewBox="0 0 320 436" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Preview of your ${cone?"favour cone":"candy gift bag"} with the label ${esc(o.text)}">
<defs><clipPath id="c${uid}"><path d="${bodyPath}"/></clipPath>
<linearGradient id="s${uid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#2a0f3d" stop-opacity=".16"/></linearGradient>
<linearGradient id="g${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#cfd9ff" stop-opacity=".45"/></linearGradient></defs>
${shadow}<g ${tilt}>
<g clip-path="url(#c${uid})"><rect x="${bounds[0]}" y="${bounds[1]}" width="${bounds[2]-bounds[0]}" height="${bounds[3]-bounds[1]}" fill="#fff" fill-opacity=".6"/>${body.map(b=>b[1]).join("")}</g>
<path d="${bodyPath}" fill="url(#s${uid})" stroke="rgba(255,255,255,.95)" stroke-width="2"/>
<path d="${cello}" fill="url(#g${uid})" stroke="rgba(120,80,170,.35)" stroke-width="1.2"/>
<path d="${cello}" fill="none" stroke="#fff" stroke-width="1" transform="translate(2 2)" opacity=".7"/>
<g transform="translate(${tie[0]} ${tie[1]})">${bow(rib)}</g>
<g transform="translate(${lab[0]} ${lab[1]})">${label(lab[2],o,T,F)}</g></g></svg>`;
}

/* ---------- build the option lists ---------- */
const FL=[
  {g:"RANI Fruit Candy",items:PRODUCTS.filter(p=>p.cat==="rani").map(p=>({id:p.id,img:p.img,name:"RANI "+p.name}))},
  {g:"Fruity Galas Jumbo",items:PRODUCTS.filter(p=>p.cat==="fruity").map(p=>({id:p.id,img:p.img,name:"Fruity Galas "+p.name.replace(/^.*\u2013\s*/,"")}))},
  {g:"Mix in from our range",items:["eclair-toffee","sweet-saunf-cone","sweet-eggs-cone","pan-masala-cone"].map(find).filter(Boolean).map(p=>({id:p.id,img:p.img,name:p.name.replace(" Cone","")}))}
];
const flById={};
$("#czFlavours").innerHTML=FL.map(g=>`<div class="cz-fgroup"><h4>${g.g}</h4><div class="cz-fchips">${g.items.map(i=>{flById[i.id]=i;return `<label class="cz-fchip"><input type="checkbox" name="fl" value="${esc(i.name)}" data-id="${i.id}"><span><img src="assets/${i.img}" alt="" width="34" height="34" loading="lazy" onerror="this.style.display='none'">${esc(i.name.replace(/^(RANI|Fruity Galas) /,""))}</span></label>`;}).join("")}</div></div>`).join("")+`<p class="cz-fcount" id="czFc"></p>`;
$("#czPills").innerHTML=[50,100,150,200,300,500].map(n=>`<label class="cz-pill"><input type="radio" name="qp" value="${n}"><span>${n}</span></label>`).join("");
$("#czThemes").innerHTML=Object.entries(THEMES).map(([k,t],i)=>`<label class="cz-sw"><input type="radio" name="theme" value="${k}"${i===0?" checked":""}><span style="--a:${t.bg};--b:${t.ring}">${t.n}</span></label>`).join("");
$("#czRibbons").classList.add("rib");
$("#czRibbons").innerHTML=Object.entries(RIBBONS).map(([k,r],i)=>`<label class="cz-sw"><input type="radio" name="ribbon" value="${k}"${i===0?" checked":""}><span style="--a:${r.c}">${r.n}</span></label>`).join("");
$("#czFonts").innerHTML=Object.entries(FONTS).map(([k,f],i)=>`<label class="cz-pill lf-${k}"><input type="radio" name="font" value="${k}"${i===0?" checked":""}><span>${f.n}</span></label>`).join("");
$("#czDate").min=new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);

/* ---------- state ---------- */
const touched={look:false};
const val=n=>form.elements[n].value;
function read(){
  const fl=[...form.querySelectorAll('input[name="fl"]:checked')];
  const ev=val("event"), s=EVENTS[ev];
  return {event:ev, style:val("style"), fl:fl.map(i=>i.value), colors:fl.map(i=>colourOf(i.value)),
    qty:Math.max(1,parseInt(val("qty"))||1), theme:val("theme"), ribbon:val("ribbon"), font:val("font"),
    textRaw:val("text").trim(), smallRaw:val("small").trim(),
    text:val("text").trim()||s.text, small:val("text").trim()||val("small").trim()?val("small").trim():s.small};
}
const STYLE_NAME={cone:"Favour cone",bag:"Candy gift bag",unsure:"Team to suggest"};
let uidn=0, lastSig="";
function render(){
  const o=read(), st=$("#czStage"), T=THEMES[o.theme], s=EVENTS[o.event];
  form.elements.text.placeholder=s.text; form.elements.small.placeholder=s.small;
  st.style.setProperty("--tint",T.tint);
  const sig=JSON.stringify([o.style,o.colors,o.theme,o.ribbon,o.font,o.text,o.small]);
  if(sig!==lastSig){ st.innerHTML=packSVG(o,"m"+(++uidn)); if(lastSig){st.classList.remove("bump");void st.offsetWidth;st.classList.add("bump");} lastSig=sig; $("#czBarImg").innerHTML=packSVG(o,"b"+uidn); }
  const bag=find("rani-gift-pack"), est=o.style==="bag"&&bag?money(o.qty*bag.rate)+" (estimate)":"Quoted by our team";
  const rows=[["Occasion",o.event],["Pack",STYLE_NAME[o.style]],["Quantity",o.qty.toLocaleString("en-US")],
    ["Flavours",o.fl.length?o.fl.length+" chosen":"Team to suggest"],
    ["Label",o.textRaw?o.textRaw+(o.smallRaw?" / "+o.smallRaw:""):"Sample text for now"]];
  $("#czSum").innerHTML=rows.map(r=>`<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join("")+`<div class="est"><dt>Price</dt><dd>${esc(est)}</dd></div>`;
  $("#czFc").textContent=o.fl.length?`${o.fl.length} flavour${o.fl.length>1?"s":""} selected`:"No flavours picked yet. We will suggest a mix.";
  $("#czBarA").textContent=`${o.qty.toLocaleString("en-US")} ${o.style==="bag"?"gift bags":o.style==="cone"?"favour cones":"packs"}`;
  $("#czBarB").textContent=o.style==="bag"&&bag?"About "+money(o.qty*bag.rate):"Price on request";
  const pr=form.querySelector(`input[name="qp"][value="${o.qty}"]`);
  form.querySelectorAll('input[name="qp"]').forEach(r=>r.checked=r===pr);
}
function setRadio(n,v){const r=form.querySelector(`input[name="${n}"][value="${CSS.escape?CSS.escape(v):v}"]`);if(r) r.checked=true;}

form.addEventListener("input",e=>{ if(e.target.name==="theme"||e.target.name==="ribbon") touched.look=true; render(); });
form.addEventListener("change",e=>{
  const n=e.target.name;
  if(n==="event"&&!touched.look){const s=EVENTS[val("event")];setRadio("theme",s.theme);setRadio("ribbon",s.ribbon);}
  if(n==="qp"){form.elements.qty.value=e.target.value;}
  render();
});
const q=form.elements.qty;
$("#czMinus").onclick=()=>{q.value=Math.max(1,(parseInt(q.value)||1)-10);render();};
$("#czPlus").onclick=()=>{q.value=(parseInt(q.value)||0)+10;render();};

/* ---------- starter ideas ---------- */
const IDEAS=[
  {t:"Wedding classic",d:"Ivory and gold cones",ev:"Wedding",style:"cone",theme:"ivory",ribbon:"gold",font:"script",text:"Ayesha & Ali",small:"Walima",fl:["RANI Strawberry","RANI Mango","RANI Peach","RANI Pineapple"]},
  {t:"Dholki night",d:"Royal purple and gold",ev:"Dholki / Mehndi",style:"cone",theme:"royal",ribbon:"gold",font:"script",text:"Hamad ki dholki",small:"",fl:["RANI Strawberry","RANI Orange","RANI Mango","RANI Red Grapes"]},
  {t:"Birthday return gifts",d:"Sky blue gift bags",ev:"Birthday party",style:"bag",theme:"sky",ribbon:"blue",font:"modern",text:"Zayan turns 5",small:"Thank you for coming",fl:["RANI Strawberry","RANI Orange","RANI Pineapple","RANI Blueberry"]},
  {t:"Sweet thank-you",d:"Ruby red gift bags",ev:"Other celebration",style:"bag",theme:"ruby",ribbon:"pink",font:"classic",text:"Thank you",small:"from our family",fl:["RANI Strawberry","RANI Peach","RANI Red Grapes"]}
];
$("#czIdeas").innerHTML=IDEAS.map((d,i)=>`<button type="button" class="cz-idea" data-i="${i}" aria-label="Use the idea: ${esc(d.t)}"><span class="mini" style="background:radial-gradient(circle at 50% 36%,#fff 0,${THEMES[d.theme].tint} 100%)">${packSVG({style:d.style,colors:d.fl.map(colourOf),theme:d.theme,ribbon:d.ribbon,font:d.font,text:d.text,small:d.small},"i"+i)}</span><b>${d.t}</b><small>${d.d}</small></button>`).join("");
$("#czIdeas").addEventListener("click",e=>{
  const b=e.target.closest(".cz-idea"); if(!b) return; const d=IDEAS[+b.dataset.i];
  setRadio("event",d.ev);setRadio("style",d.style);setRadio("theme",d.theme);setRadio("ribbon",d.ribbon);setRadio("font",d.font);
  form.elements.text.value=d.text;form.elements.small.value=d.small;touched.look=true;
  form.querySelectorAll('input[name="fl"]').forEach(c=>c.checked=d.fl.includes(c.value));
  render(); toast("Idea applied. Change the label text in step 5 to use your own names.");
  if(matchMedia("(max-width:980px)").matches) $("#czAside").scrollIntoView({behavior:"smooth",block:"start"});
});

/* ---------- send ---------- */
form.addEventListener("submit",e=>{
  e.preventDefault();
  const o=read(), f=Object.fromEntries(new FormData(form));
  const id="BC-C"+Date.now().toString().slice(-6);
  const bag=find("rani-gift-pack");
  const est=o.style==="bag"&&bag?`${money(o.qty*bag.rate)} (estimate at ${money(bag.rate)} per bag)`:"To be quoted by Blesscon team";
  const lines=[`NEW CUSTOM EVENT ORDER ${id}`,"",
    `Occasion: ${o.event}`,`Pack: ${STYLE_NAME[o.style]}`,`Quantity: ${o.qty}`,
    `Flavours: ${o.fl.length?o.fl.join(", "):"Please suggest a mix"}`,"",
    `Label text: ${o.textRaw||"(not provided yet)"}`,`Small line: ${o.smallRaw||"-"}`,
    `Label colours: ${THEMES[o.theme].n}`,`Ribbon: ${RIBBONS[o.ribbon].n}`,`Lettering: ${FONTS[o.font].n}`,
    `Will send logo/artwork: ${f.logo?"Yes":"No"}`,"",
    `Event date: ${f.date||"-"}`,`City / area: ${f.city}`,`Delivery: ${f.deliver}`,
    `Venue / address: ${(f.addr||"").trim()||"-"}`,`Price: ${est}`,"",
    `Name: ${f.name}`,`Phone: ${f.phone}`];
  if((f.note||"").trim()) lines.push("",`Notes: ${f.note.trim()}`);
  const msg=lines.join("\n");
  const url=f.via==="wa"?`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`
    :`mailto:${CFG.email}?subject=${encodeURIComponent("Custom event order "+id+" - Blesscon Candy")}&body=${encodeURIComponent(msg)}`;
  window.open(url,f.via==="wa"?"_blank":"_self");
  $("#czDoneId").textContent=id;
  $("#czDoneVia").textContent=f.via==="wa"?"WhatsApp":"your email app";
  $("#czDoneLogo").hidden=!f.logo;
  form.hidden=true; $(".cz-ideawrap").hidden=true; $("#czBar").hidden=true; $("#czDone").hidden=false;
  $("#czDone").scrollIntoView({behavior:"smooth",block:"center"});
});
$("#czBack").onclick=()=>{ $("#czDone").hidden=true; form.hidden=false; $(".cz-ideawrap").hidden=false; $("#czBar").hidden=false; $("#builder").scrollIntoView({behavior:"smooth"}); };

/* ---------- misc ---------- */
const wa=t=>`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(t)}`;
$("#czHeroWa").href=wa("Hello Blesscon Candy, I'd like custom candy packs for my event.");
$("#czBanWa").href=wa("Hello Blesscon Candy, I'd like help choosing candy favours for my event.");
const bar=$("#czBar"), aside=$("#czAside"), steps=$(".cz-steps");
if("IntersectionObserver" in window){
  let inSteps=false, inAside=false; const upd=()=>bar.classList.toggle("off",!(inSteps&&!inAside));
  new IntersectionObserver(es=>{es.forEach(en=>{inAside=en.isIntersecting;});upd();},{threshold:.15}).observe(aside);
  new IntersectionObserver(es=>{es.forEach(en=>{inSteps=en.isIntersecting;});upd();},{threshold:0}).observe(steps);
}
render();
})();
