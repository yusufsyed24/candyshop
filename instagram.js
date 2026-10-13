/* Instagram feed section: loads /api/instagram and shows an Instagram-style scroller + post viewer */
(function(){
  const root = document.getElementById("igFeed");
  if(!root) return;
  const PROFILE = "https://www.instagram.com/blessconcandy/";
  const $ = (s,el=root)=>el.querySelector(s);
  const ICON = {
    video:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
    multi:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 7h13v13H3zM8 3h13v13h-2V5H8z"/></svg>'
  };
  const fmt = n => n==null ? "" : n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e4?Math.round(n/1e3)+"K":n>=1e3?(n/1e3).toFixed(1)+"K":String(n);
  const ago = iso => {
    const s=(Date.now()-new Date(iso))/1000;
    if(s<3600) return Math.max(1,Math.round(s/60))+"m";
    if(s<86400) return Math.round(s/3600)+"h";
    if(s<604800) return Math.round(s/86400)+"d";
    return new Date(iso).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
  };
  const el=(tag,cls,html)=>{const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e;};
  const img=(src,alt)=>{const i=new Image(); i.src=src; i.alt=alt||""; i.loading="eager"; i.decoding="async"; i.referrerPolicy="no-referrer"; return i;};

  let posts=[], profile=null;

  function renderHead(){
    const h=$(".ig-head");
    const p=profile||{username:"blessconcandy",name:"Blesscon Candy",avatar:""};
    const av = p.avatar ? `<img src="${p.avatar}" alt="" referrerpolicy="no-referrer">` : `<img src="assets/logo.png" alt="">`;
    const stats=[];
    if(p.posts!=null) stats.push(`<li><b>${fmt(p.posts)}</b> posts</li>`);
    if(p.followers!=null) stats.push(`<li><b>${fmt(p.followers)}</b> followers</li>`);
    h.innerHTML=`<span class="ig-av"><span>${av}</span></span>
      <div class="ig-who"><h3>@${p.username}</h3><p>${p.name}</p>${stats.length?`<ul>${stats.join("")}</ul>`:""}</div>
      <a class="btn ig-follow" href="${PROFILE}" target="_blank" rel="noopener">Follow on Instagram</a>`;
  }

  function renderTrack(){
    const t=$(".ig-track"); t.innerHTML="";
    posts.forEach((p,i)=>{
      const a=el("button","ig-card"); a.type="button";
      a.setAttribute("aria-label","Open post "+(i+1));
      a.appendChild(img(p.thumb,p.caption.slice(0,100)));
      if(p.type==="VIDEO") a.appendChild(el("span","ig-badge",ICON.video));
      else if(p.type==="CAROUSEL_ALBUM") a.appendChild(el("span","ig-badge",ICON.multi));
      const o=el("span","ig-over"); o.textContent=p.caption.replace(/\s+/g," ").slice(0,90); a.appendChild(o);
      a.addEventListener("click",()=>openPost(i));
      t.appendChild(a);
    });
  }

  /* ---------- fallback when the feed is not connected yet ---------- */
  function fallback(){
    $(".ig-state").remove();
    renderHead();
    const t=$(".ig-track");
    ["rani-gift-pack","zoombie-mango","fruity-galas-strawberry","sweet-eggs-cone","big-butter-toffee","kish-candy-pouch"].forEach(n=>{
      const a=el("a","ig-card"); a.href=PROFILE; a.target="_blank"; a.rel="noopener"; a.setAttribute("aria-label","Open Blesscon Candy on Instagram");
      a.appendChild(img("assets/"+n+".webp","")); a.appendChild(el("span","ig-over","See our latest on Instagram")); t.appendChild(a);
    });
  }

  /* ---------- viewer ---------- */
  let modal, cur=0, slide=0;
  function ensureModal(){
    if(modal) return;
    modal=el("div","ig-modal");
    modal.hidden=true;
    modal.innerHTML=`<div class="ig-back"></div>
      <div class="ig-dlg" role="dialog" aria-modal="true" aria-label="Instagram post">
        <button class="ig-x" aria-label="Close">&times;</button>
        <div class="ig-media"><div class="ig-mwrap"></div><button class="ig-sl prev" aria-label="Previous photo">&#8249;</button><button class="ig-sl next" aria-label="Next photo">&#8250;</button><div class="ig-dots"></div></div>
        <div class="ig-side"><div class="ig-sh"></div><div class="ig-cap"></div><div class="ig-sf"></div></div>
      </div>
      <button class="ig-nav prev" aria-label="Previous post">&#8249;</button>
      <button class="ig-nav next" aria-label="Next post">&#8250;</button>`;
    document.body.appendChild(modal);
    modal.querySelector(".ig-back").onclick=close;
    modal.querySelector(".ig-x").onclick=close;
    modal.querySelector(".ig-nav.prev").onclick=()=>openPost((cur-1+posts.length)%posts.length);
    modal.querySelector(".ig-nav.next").onclick=()=>openPost((cur+1)%posts.length);
    modal.querySelector(".ig-sl.prev").onclick=()=>showSlide(slide-1);
    modal.querySelector(".ig-sl.next").onclick=()=>showSlide(slide+1);
    document.addEventListener("keydown",e=>{
      if(modal.hidden) return;
      if(e.key==="Escape") close();
      if(e.key==="ArrowLeft") modal.querySelector(".ig-nav.prev").click();
      if(e.key==="ArrowRight") modal.querySelector(".ig-nav.next").click();
    });
  }
  function close(){ modal.hidden=true; document.body.style.overflow=""; modal.querySelector(".ig-mwrap").innerHTML=""; }
  function slidesOf(p){ return p.type==="CAROUSEL_ALBUM" && p.children.length ? p.children : [{type:p.type,src:p.src,thumb:p.thumb}]; }
  function showSlide(n){
    const p=posts[cur], s=slidesOf(p); slide=Math.max(0,Math.min(s.length-1,n));
    const w=modal.querySelector(".ig-mwrap"); w.innerHTML="";
    const m=s[slide];
    if(m.type==="VIDEO"){
      const v=document.createElement("video"); v.src=m.src; v.poster=m.thumb; v.controls=true; v.autoplay=true; v.loop=true; v.muted=true; v.playsInline=true; w.appendChild(v);
    } else { const i=new Image(); i.src=m.src; i.alt=""; i.referrerPolicy="no-referrer"; w.appendChild(i); }
    modal.querySelector(".ig-sl.prev").hidden = slide===0;
    modal.querySelector(".ig-sl.next").hidden = slide>=s.length-1;
    const d=modal.querySelector(".ig-dots"); d.innerHTML="";
    if(s.length>1) s.forEach((_,k)=>d.appendChild(el("i",k===slide?"on":"")));
  }
  function openPost(i){
    ensureModal(); cur=i; const p=posts[i];
    modal.hidden=false; document.body.style.overflow="hidden";
    showSlide(0);
    const pr=profile||{username:"blessconcandy",avatar:""};
    modal.querySelector(".ig-sh").innerHTML=`<span class="ig-av sm"><span><img src="${pr.avatar||"assets/logo.png"}" alt="" referrerpolicy="no-referrer"></span></span><b>${pr.username}</b>`;
    const cap=modal.querySelector(".ig-cap"); cap.textContent=p.caption||""; 
    modal.querySelector(".ig-sf").innerHTML=`<small>${ago(p.time)} ago</small><a class="btn ig-follow" href="${p.link}" target="_blank" rel="noopener">View on Instagram</a>`;
    modal.querySelector(".ig-x").focus();
  }

  /* ---------- scroller arrows ---------- */
  const track=$(".ig-track");
  $(".ig-arrow.prev").onclick=()=>track.scrollBy({left:-track.clientWidth*.8,behavior:"smooth"});
  $(".ig-arrow.next").onclick=()=>track.scrollBy({left: track.clientWidth*.8,behavior:"smooth"});

  fetch("/api/instagram",{headers:{Accept:"application/json"}})
    .then(r=>r.ok?r.json():Promise.reject())
    .then(d=>{
      if(!d.configured || !d.posts || !d.posts.length) return fallback();
      posts=d.posts; profile=d.profile; $(".ig-state").remove(); renderHead(); renderTrack();
    })
    .catch(fallback);
})();
