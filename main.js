/* ============ CONFIGURE HERE ============ */
const CFG = {
  whatsapp: "923138993279",            // digits only, with country code
  email: "blessconcandy@gmail.com",
  currency: "Rs.",
  facebook:  "https://www.facebook.com/profile.php?id=61595253893686",
  instagram: "https://www.instagram.com/blessconcandy",
  tiktok:    "https://www.tiktok.com/@blessconcandy",   // <- replace with your exact TikTok link
  assets: "assets/",                                   // product photos live in the assets folder
  remote: "https://www.blessconcandy.com/assets/"      // only used as a fallback for the older RANI photos
};
const CATS = [
  {id:"rani",    title:"RANI Fruit Candy",        sub:"Seven fruit flavors · 60 candies per box"},
  {id:"fruity",  title:"Fruity Galas Jumbo",      sub:"Rs. 2 chewy fruit sweets · 9 flavours · 100 pieces per box"},
  {id:"zoombie", title:"Zoombie Sour Chew",       sub:"Rs. 10 sour chew bars · 5 flavours · 24 pieces per box"},
  {id:"toffee",  title:"Toffees & Jelly Candies", sub:"Eclair Toffee, Big Butter Toffee and Kish"},
  {id:"energy",  title:"Energy Candies",          sub:"Red Bull, Sting, Monster & Booster energy candy · 100 pieces per pouch"},
  {id:"cones",   title:"Candy Cones",             sub:"Pan Masala, Sweet Eggs, Sweet Saunf & Mix Pan Masala · 24 cones per pack · 100 packs per carton"},
  {id:"gift",    title:"Customised Gift Packs",   sub:"Rani Candy Gift Packs · 12 bags per pack · 24 packs per carton"}
];
const PLURAL = {Box:"boxes", Pouch:"pouches", Pack:"packs"};
/* rate = price per piece.  Pack price = pcs x rate.  Carton price = pack price x perCarton.  Edit prices here only. */
const mk = o => ({unitName:"Box", local:1, bg:"#fff", ...o, box:o.pcs*o.rate, carton:o.pcs*o.rate*o.perCarton});
const PRODUCTS = [
  ...[["strawberry","Strawberry","BC-RC-001","🍓","#ffe0e6"],["orange","Orange","BC-RC-002","🍊","#ffe8cc"],["mango","Mango","BC-RC-003","🥭","#fff0b8"],
      ["peach","Peach","BC-RC-004","🍑","#ffe3d6"],["red-grapes","Red Grapes","BC-RC-005","🍇","#eadcf7"],["blueberry","Blueberry","BC-RC-006","🫐","#dbe4ff"],
      ["pineapple","Pineapple","BC-RC-007","🍍","#fff6c2"]]
    .map(([id,name,sku,emo,bg])=>mk({id,name,sku,emo,bg,img:id+".webp",cat:"rani",pcs:60,perCarton:24,rate:5,local:0})),
  mk({id:"zoombie-blackcurrant",name:"Zoombie Sour Chew – Blackcurrant",img:"zoombie-blackcurrant.webp",emo:"🍇",cat:"zoombie",pcs:24,perCarton:24,rate:10}),
  mk({id:"zoombie-mango",        name:"Zoombie Sour Chew – Mango",       img:"zoombie-mango.webp",       emo:"🥭",cat:"zoombie",pcs:24,perCarton:24,rate:10}),
  mk({id:"zoombie-cherry",       name:"Zoombie Sour Chew – Cherry",      img:"zoombie-cherry.webp",      emo:"🍒",cat:"zoombie",pcs:24,perCarton:24,rate:10}),
  mk({id:"zoombie-cola",         name:"Zoombie Sour Chew – Fizzy Cola",  img:"zoombie-cola.webp",        emo:"🥤",cat:"zoombie",pcs:24,perCarton:24,rate:10}),
  mk({id:"zoombie-chilly-tamarind",name:"Zoombie Sour Chew – Chilly & Tamarind",img:"zoombie-chilly-tamarind.webp",emo:"🌶️",cat:"zoombie",pcs:24,perCarton:24,rate:10}),
  mk({id:"eclair-toffee",   name:"Eclair Toffee",        img:"eclair-toffee.webp",        emo:"🍫",cat:"toffee",pcs:60,perCarton:24,rate:5}),
  mk({id:"big-butter-toffee",name:"Big Butter Toffee with Almond",img:"big-butter-toffee.webp",emo:"🧈",cat:"toffee",pcs:15,perCarton:32,rate:10}),
  mk({id:"kish-candy-pouch",name:"Kish Candy (Pouch)",   img:"kish-candy-pouch.webp",     emo:"🍬",cat:"toffee",pcs:80,perCarton:24,rate:5,unitName:"Pouch"}),
  mk({id:"kish-fruit-candy-box",name:"Kish Fruit Candy (Box)",img:"kish-fruit-candy-box.webp",emo:"🍬",cat:"toffee",pcs:75,perCarton:36,rate:2}),
  mk({id:"red-bull-energy-candy",name:"Red Bull Energy Candy",img:"red-bull-energy-candy.webp",emo:"⚡",cat:"energy",pcs:100,perCarton:18,rate:5,unitName:"Pouch"}),
  mk({id:"sting-energy-candy",   name:"Sting Energy Candy",   img:"sting-energy-candy.webp",   emo:"⚡",cat:"energy",pcs:100,perCarton:18,rate:5,unitName:"Pouch"}),
  mk({id:"monster-energy-candy", name:"Monster Energy Candy", img:"monster-energy-candy.webp", emo:"⚡",cat:"energy",pcs:100,perCarton:18,rate:5,unitName:"Pouch"}),
  mk({id:"booster-energy-candy", name:"Booster Energy Candy", img:"booster-energy-candy.webp", emo:"⚡",cat:"energy",pcs:100,perCarton:18,rate:5,unitName:"Pouch"}),
  /* ---- Fruity Galas Jumbo: Rs 2/pc, 100 pcs box = Rs 200, 24 boxes/carton = Rs 4,800 ---- */
  ...[["orange","Orange","🍊","#ffe8cc"],["peach","Peach","🍑","#ffe3d6"],["blueberry","Blueberry","🫐","#dbe4ff"],["cherry","Cherry","🍒","#ffdce3"],
      ["strawberry","Strawberry","🍓","#ffe0e6"],["mango","Mango","🥭","#fff0b8"],["lychee","Lychee","🌸","#ffe0f0"],["green-apple","Green Apple","🍏","#e3f6d8"],
      ["blackcurrant","Blackcurrant","🍇","#eadcf7"]]
    .map(([id,name,emo,bg],i)=>mk({id:"fruity-galas-"+id,name:"Fruity Galas Jumbo – "+name,sku:"BC-FG-00"+(i+1),img:"fruity-galas-"+id+".webp",emo,bg,cat:"fruity",pcs:100,perCarton:24,rate:2})),
  /* ---- Candy Cones: 24 cones per pack, 100 packs per carton ---- */
  mk({id:"pan-masala-cone",name:"Pan Masala Cone",sku:"BC-CC-001",img:"pan-masala-cone.webp",gal:["pan-masala-cone.webp","pan-masala-cone-2.webp","pan-masala-cone-3.webp"],emo:"🍬",cat:"cones",pcs:24,perCarton:100,rate:10,unitName:"Pack"}),
  mk({id:"sweet-eggs-cone",name:"Sweet Eggs Cone",sku:"BC-CC-002",img:"sweet-eggs-cone.webp",gal:["sweet-eggs-cone.webp","sweet-eggs-cone-2.webp","sweet-eggs-cone-3.webp","sweet-eggs-cone-4.webp"],emo:"🥚",cat:"cones",pcs:24,perCarton:100,rate:10,unitName:"Pack"}),
  mk({id:"sweet-saunf-cone",name:"Sweet Saunf Cone",sku:"BC-CC-003",img:"sweet-saunf-cone.webp",gal:["sweet-saunf-cone.webp","sweet-saunf-cone-2.webp","sweet-saunf-cone-3.webp"],emo:"🌿",cat:"cones",pcs:24,perCarton:100,rate:10,unitName:"Pack"}),
  mk({id:"mix-pan-masala-cone",name:"Mix Pan Masala Cone",sku:"BC-CC-004",img:"mix-pan-masala-cone.webp",gal:["mix-pan-masala-cone.webp","mix-pan-masala-cone-2.webp"],emo:"🍬",cat:"cones",pcs:24,perCarton:100,rate:15,unitName:"Pack"}),
  mk({id:"custom-dholki-cone",name:"Custom Dholki Favour Cones",sku:"BC-CC-005",img:"custom-dholki-cone.webp",gal:["custom-dholki-cone.webp","custom-dholki-cone-2.webp"],emo:"🎉",cat:"cones",pcs:24,perCarton:1,rate:0,unitName:"Pack",enquiry:true}),
  /* ---- Customised gift packs: Rs 45 per bag, 12 bags per pack = Rs 540, 24 packs per carton = Rs 12,960 ---- */
  mk({id:"rani-gift-pack",       name:"Rani Candy Gift Pack – Assorted Flavours",sku:"BC-GP-001",img:"rani-gift-pack.webp",       emo:"🎁",cat:"gift",pcs:12,perCarton:24,rate:45,unitName:"Pack"}),
  mk({id:"rani-gift-pack-12pcs", name:"Rani Candy Gift Pack – 12 Pcs Set",       sku:"BC-GP-002",img:"rani-gift-pack-12pcs.webp", emo:"🎁",cat:"gift",pcs:12,perCarton:24,rate:45,unitName:"Pack"}),
  mk({id:"rani-gift-pack-carton",name:"Rani Candy Gift Pack – Carton Pack",      sku:"BC-GP-003",img:"rani-gift-pack-carton.webp",emo:"🎁",cat:"gift",pcs:12,perCarton:24,rate:45,unitName:"Pack"})
];
const FEATURED = ["fruity-galas-orange","zoombie-mango","eclair-toffee","big-butter-toffee","red-bull-energy-candy","pan-masala-cone" ,"sweet-eggs-cone","rani-gift-pack"];
/* ========================================= */

/* image loader: assets/ folder -> live site -> built-in SVG artwork */
function fb(el){
  const f=el.dataset.a, s=+el.dataset.s||0; el.dataset.s=s+1;
  if(el.dataset.l){ el.style.display="none"; return; }
  if(s===0) el.src=CFG.remote+f;
  else if(s===1) el.src=CFG.assets+f.replace(/\.\w+$/,".svg");
  else el.style.display="none";
}
const img=(f,alt,cls="",local=0)=>`<img class="${cls}" data-a="${f}" ${local?'data-l="1" ':""}src="${CFG.assets}${f}" alt="${alt}" loading="lazy" decoding="async" onload="this.parentNode.classList.add('ok')" onerror="fb(this)">`;
const $ = s => document.querySelector(s);

/* ---------- shared layout (header, footer, cart drawer) ---------- */
const SOCIAL=[
 ["Facebook",CFG.facebook,"fb",'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 22v-8.2h2.8l.5-3.4h-3.3V8.3c0-1 .4-1.7 1.8-1.7h1.6V3.5c-.3 0-1.3-.2-2.4-.2-2.5 0-4.1 1.5-4.1 4.2v2.9H7.6v3.4h2.8V22h3.1z"/></svg>'],
 ["Instagram",CFG.instagram,"ig",'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.9" d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3z"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>'],
 ["TikTok",CFG.tiktok,"tt",'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 2h-3.2v13.1a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .8.1V9a6.1 6.1 0 1 0 5.3 6V8.6a7.4 7.4 0 0 0 4.3 1.4V6.8a4.3 4.3 0 0 1-4.3-4.8z"/></svg>']
];
const socialHTML=cls=>`<div class="social ${cls||""}">${SOCIAL.map(s=>`<a class="soc ${s[2]}" href="${s[1]}" target="_blank" rel="noopener me" aria-label="Blesscon Candy on ${s[0]}" title="${s[0]}">${s[3]}</a>`).join("")}</div>`;
function layout(){
  const cur=document.body.dataset.page;
  const L=[["home","index.html","Home"],["products","products.html","Order Now"],["wholesale","wholesale.html","Wholesale"],["custom","custom-order.html","Custom Orders"],["about","about.html","About Us"],["careers","careers.html","Careers"],["contact","contact.html","Contact"]];
  document.body.insertAdjacentHTML("afterbegin",`
  <a class="announce" href="custom-order.html"><span class="ann-in"><span class="ann-ico" aria-hidden="true">🎉</span><span class="ann-txt"><b>We accept customized orders</b> for weddings, parties &amp; functions</span><span class="ann-go">Customize →</span></span></a>
  <header><div class="wrap nav">
    <a href="index.html" class="logo">${img("logo.png","Blesscon Candy")}<span class="sr">Blesscon Candy</span></a>
    <nav id="nav"><ul>${L.map(l=>`<li><a href="${l[1]}" class="${cur===l[0]?"on":""}">${l[2]}</a></li>`).join("")}</ul></nav>
    <div class="row">
      <button class="cartbtn" onclick="openCart()">🛒 Cart <span class="badge" id="cnt">0</span></button>
      <button class="burger" onclick="document.getElementById('nav').classList.toggle('on')" aria-label="Menu">☰</button>
    </div></div></header>`);
  document.body.insertAdjacentHTML("beforeend",`
  <footer><div class="wrap"><div class="fgrid">
    <div><h4>Blesscon Candy</h4><p>Fruit candy, sour chews, toffees and energy candies for retailers, wholesalers and distribution partners.</p></div>
    <div><h4>Explore</h4>${L.map(l=>`<a href="${l[1]}">${l[2]}</a>`).join("")}<a href="catalogue.html">Product Catalogue</a></div>
    <div><h4>Contact</h4><a href="https://wa.me/${CFG.whatsapp}">WhatsApp: +92 313 8993279</a><a href="mailto:${CFG.email}">${CFG.email}</a><h4 class="fol">Follow us</h4>${socialHTML()}</div>
    <div class="copy">© 2026 Blesscon Candy. All rights reserved.</div>
  </div></div></footer>
  <a class="wafloat" id="wafloat" href="#" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
  <div class="overlay" id="ov" onclick="closeCart()"></div>
  <aside class="drawer" id="drawer" aria-label="Your order"><div class="dh"><h3>Your Order</h3><button onclick="closeCart()" aria-label="Close">×</button></div><div class="db" id="cartBody"></div></aside>
  <div class="toast" id="toast"></div>`);
}
layout();
let cart = [];
try { cart = JSON.parse(localStorage.getItem("bc_cart") || "[]"); } catch(e){}
const save = () => { try { localStorage.setItem("bc_cart", JSON.stringify(cart)); } catch(e){} };
const money = n => CFG.currency + " " + n.toLocaleString("en-US");
const find = id => PRODUCTS.find(p => p.id === id);
const priceOf = (p,u) => u === "carton" ? p.carton : p.box;
const many = p => PLURAL[p.unitName] || (p.unitName.toLowerCase()+"s");
const lbl = (p,u,n) => u === "carton" ? (n>1?"cartons":"carton") : (n>1 ? many(p) : p.unitName.toLowerCase());
cart = cart.filter(c => find(c.id) && (c.unit==="box"||c.unit==="carton") && c.qty>0);

const thumbs = p => p.gal && p.gal.length>1 ? `<div class="thumbs">${p.gal.map((g,i)=>`<button type="button" class="${i?"":"on"}" onclick="swapImg('${p.id}','${g}',this)" aria-label="Photo ${i+1} of ${p.name}"><img src="${CFG.assets}${g}" alt="" loading="lazy" decoding="async"></button>`).join("")}</div>` : "";
function swapImg(id,f,btn){
  const im=document.querySelector("#"+id+" .pimg img"); if(im){ im.src=CFG.assets+f; im.dataset.a=f; }
  btn.parentNode.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===btn));
}
function card(p){
  if(p.enquiry) return `<div class="card" id="${p.id}">
    <div class="pimg" style="background:${p.bg}"><span class="emo">${p.emo}</span><span class="ptag">Made to order</span>${img(p.img,p.name,"",p.local)}</div>${thumbs(p)}
    <div class="pbody">
      <h3>${p.name}</h3>${p.sku?`<div class="sku">${p.sku}</div>`:""}
      <p class="tnote">Cones with your own name or event label, ideal for Dholki, Mehndi and wedding favours. ${p.pcs} cones per pack.</p>
      <div class="pl"><span>Price</span><b>On request</b></div>
      <a class="btn wa" style="text-align:center" target="_blank" rel="noopener" href="https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent("Hello Blesscon Candy, I'd like a quote for customised Dholki favour cones.")}">Ask for a quote</a>
    </div></div>`;
  return `<div class="card" id="${p.id}">
    <div class="pimg" style="background:${p.bg}"><span class="emo">${p.emo}</span><span class="ptag">${money(p.rate)} / pc</span>${img(p.img,p.name,"",p.local)}</div>${thumbs(p)}
    <div class="pbody">
      <h3>${p.name}</h3>${p.sku?`<div class="sku">${p.sku}</div>`:""}
      <div class="pl"><span>${p.unitName} · ${p.pcs} pcs</span><b>${money(p.box)}</b></div>
      <div class="pl"><span>Carton · ${p.perCarton} ${many(p)}</span><b>${money(p.carton)}</b></div>
      <select id="u-${p.id}" onchange="upd('${p.id}')" aria-label="Pack size"><option value="box" data-l="${p.unitName} (${p.pcs} pcs)" data-s="${p.unitName}">${p.unitName} (${p.pcs} pcs)</option><option value="carton" data-l="Carton (${p.perCarton} ${many(p)})" data-s="Carton">Carton (${p.perCarton} ${many(p)})</option></select>
      <div class="row2">
        <div class="qty"><button onclick="step('${p.id}',-1)" aria-label="Less">−</button><input id="q-${p.id}" type="number" min="1" value="1" oninput="upd('${p.id}')"><button onclick="step('${p.id}',1)" aria-label="More">+</button></div>
        <button class="btn" id="b-${p.id}" onclick="add('${p.id}')">Add · ${money(p.box)}</button>
      </div>
    </div></div>`;
}
const grid = ids => ids.map(card).join("");
if($("#homeGrid")) $("#homeGrid").innerHTML = PRODUCTS.filter(p=>p.cat==="rani").map(card).join("");
if($("#moreGrid")) $("#moreGrid").innerHTML = FEATURED.map(id=>card(find(id))).join("");
if($("#orderSections")) $("#orderSections").innerHTML =
  `<div class="chips">${CATS.map(c=>`<a href="#cat-${c.id}">${c.title}</a>`).join("")}<a href="#faq">FAQ</a></div>` +
  CATS.map(c=>`<div class="cathead" id="cat-${c.id}"><h2>${c.title}</h2><p>${c.sub}</p></div><div class="grid">${PRODUCTS.filter(p=>p.cat===c.id).map(card).join("")}</div>`).join("");
if($("#packTable")){
  const rows=[];
  PRODUCTS.filter(p=>!p.enquiry && !["rani","fruity"].includes(p.cat)).forEach(p=>rows.push([p.name,p.unitName,p.pcs,p.perCarton]));
  rows.push(["RANI Fruit Candy (all 7 flavors)","Box",60,24],["Fruity Galas Jumbo (all 9 flavors)","Box",100,24]);
  $("#packTable").innerHTML=`<table class="ptab"><thead><tr><th>Product</th><th>Pack</th><th>Candies per pack</th><th>Packs per carton</th><th>Candies per carton</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="n">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${(r[2]*r[3]).toLocaleString("en-US")}</td></tr>`).join("")}</tbody></table>`;
}
const q = (pre,id) => document.getElementById(pre+"-"+id);

function upd(id){
  const p=find(id), u=q("u",id).value, n=Math.max(1,parseInt(q("q",id).value)||1);
  q("b",id).textContent = "Add · " + money(priceOf(p,u)*n);
}
function step(id,d){ const i=q("q",id); i.value=Math.max(1,(parseInt(i.value)||1)+d); upd(id); }
function add(id){
  const p=find(id), u=q("u",id).value, n=Math.max(1,parseInt(q("q",id).value)||1);
  const l=cart.find(c=>c.id===id&&c.unit===u);
  l ? l.qty+=n : cart.push({id,unit:u,qty:n});
  save(); render(); toast(`${n} ${lbl(p,u,n)} of ${p.name} added`);
}
function chg(i,d){ cart[i].qty=Math.max(1,cart[i].qty+d); save(); render(); }
function del(i){ cart.splice(i,1); save(); render(); }

function totals(){
  let packs=0, cartons=0, pieces=0, amt=0;
  cart.forEach(c=>{ const p=find(c.id); amt+=priceOf(p,c.unit)*c.qty;
    if(c.unit==="carton"){ cartons+=c.qty; pieces+=c.qty*p.pcs*p.perCarton; } else { packs+=c.qty; pieces+=c.qty*p.pcs; } });
  return {packs, cartons, pieces, amt};
}

function render(){
  const t=totals();
  $("#cnt").textContent = cart.reduce((s,c)=>s+c.qty,0);
  const body=$("#cartBody");
  if(!cart.length){ body.innerHTML=`<div class="empty">🍬<br>Your order is empty.<br><br><a class="btn" href="products.html" onclick="closeCart()">Browse Products</a></div>`; return; }
  body.innerHTML = cart.map((c,i)=>{ const p=find(c.id), pr=priceOf(p,c.unit); return `
    <div class="item"><div class="th" style="background:${p.bg}"><span class="emo">${p.emo}</span>${img(p.img,p.name,"",p.local)}</div>
      <div class="in"><b>${p.name}</b><small>${c.unit==="carton"?`Carton (${p.perCarton} ${many(p)})`:`${p.unitName} (${p.pcs} pcs)`} · ${money(pr)} each</small><small><b style="color:var(--pink-d)">${money(pr*c.qty)}</b></small></div>
      <div class="qty"><button onclick="chg(${i},-1)">−</button><input value="${c.qty}" readonly><button onclick="chg(${i},1)">+</button></div>
      <button class="x" onclick="del(${i})" aria-label="Remove">🗑</button></div>`;}).join("") + `
    <div class="sum">
      ${t.packs?`<div><span>Boxes / pouches</span><span>${t.packs}</span></div>`:""}
      ${t.cartons?`<div><span>Cartons</span><span>${t.cartons}</span></div>`:""}
      <div><span>Total pieces</span><span>${t.pieces.toLocaleString("en-US")}</span></div>
      <div class="t"><span>Total amount</span><span>${money(t.amt)}</span></div>
    </div>
    <form id="chk" onsubmit="return place(event)">
      <label>Full name / Shop name</label><input class="f" name="name" required>
      <label>Phone / WhatsApp</label><input class="f" name="phone" required>
      <label>City / Area</label><input class="f" name="city" required>
      <label>Delivery address</label><textarea class="f" name="addr" required></textarea>
      <label>Notes (optional)</label><input class="f" name="note">
      <label>Send order via</label>
      <select class="f" name="via"><option value="wa">WhatsApp (fastest)</option><option value="mail">Email</option></select>
      <p style="margin-top:16px"><button class="btn wa block" type="submit">Place Order · ${money(t.amt)}</button></p>
      <p style="font-size:.78rem;color:var(--muted);margin-top:8px;text-align:center">Total shown is for the candy. Delivery is confirmed by our team before dispatch.</p>
    </form>`;
  if(window.BCPhone) BCPhone.enhance(body);
}

function place(e){
  e.preventDefault();
  const f=Object.fromEntries(new FormData(e.target)), t=totals();
  const id="BC-"+Date.now().toString().slice(-6);
  const lines=cart.map((c,i)=>{ const p=find(c.id), pr=priceOf(p,c.unit);
    return `${i+1}. ${p.name}: ${c.qty} ${lbl(p,c.unit,c.qty)} x ${money(pr)} = ${money(pr*c.qty)}`; }).join("\n");
  const msg=`NEW ORDER ${id}\n\n${lines}\n\nTotal pieces: ${t.pieces.toLocaleString("en-US")}\nTOTAL AMOUNT: ${money(t.amt)}`+
    `\n\nName: ${f.name}\nPhone: ${f.phone}\nCity: ${f.city}\nAddress: ${f.addr}`+(f.note?`\nNotes: ${f.note}`:"");
  const url = f.via==="wa"
    ? `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`
    : `mailto:${CFG.email}?subject=${encodeURIComponent("Order "+id+" - Blesscon Candy")}&body=${encodeURIComponent(msg)}`;
  window.open(url, f.via==="wa"?"_blank":"_self");
  cart=[]; save(); $("#cnt").textContent="0";
  $("#cartBody").innerHTML=`<div class="done"><div style="font-size:3rem">🎉</div><h3>Order ${id} prepared!</h3><p style="font-size:1.1rem">Total: <b>${money(t.amt)}</b></p>
    <p>Please press <b>Send</b> in ${f.via==="wa"?"WhatsApp":"your email app"} to complete it. Our team will confirm delivery.</p><br>
    <button class="btn" onclick="closeCart()">Close</button></div>`;
  return false;
}

function openCart(){ render(); $("#drawer").classList.add("on"); $("#ov").classList.add("on"); }
function closeCart(){ $("#drawer").classList.remove("on"); $("#ov").classList.remove("on"); }
function toast(m){ const t=$("#toast"); t.textContent=m; t.classList.add("on"); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove("on"),2200); }


/* enquiry form */
const enq=$("#enq"); if(enq) enq.addEventListener("submit",e=>{
  e.preventDefault(); const f=Object.fromEntries(new FormData(e.target));
  const body=`Name: ${f.n}\nEmail: ${f.e||"-"}\nPhone: ${f.p}\n\n${f.m}`;
  location.href=`mailto:${CFG.email}?subject=${encodeURIComponent(f.s)}&body=${encodeURIComponent(body)}`;
});
/* phones: short pack-size labels (full detail is already shown in the price lines above) */
(function(){const mq=matchMedia("(max-width:560px)");
  const set=()=>document.querySelectorAll("select[id^=u-] option[data-s]").forEach(o=>{o.textContent=mq.matches?o.dataset.s:o.dataset.l});
  set(); (mq.addEventListener?mq.addEventListener("change",set):mq.addListener(set));})();
$("#wafloat").href=`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent("Hello Blesscon Candy, I'd like to place an order.")}`;
render();
