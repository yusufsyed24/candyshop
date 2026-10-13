/* Blesscon Candy - wholesale pages: dependent State -> City dropdowns, prefilled order form */
(()=>{
"use strict";
const STATES = {
 "Punjab":["Lahore","Faisalabad","Rawalpindi","Multan","Gujranwala","Sialkot","Bahawalpur","Sargodha","Sahiwal","Gujrat","Sheikhupura","Jhelum","Rahim Yar Khan","Kasur","Okara","Dera Ghazi Khan","Chiniot","Mandi Bahauddin","Hafizabad","Attock","Chakwal","Jhang","Khanewal","Vehari","Muzaffargarh","Layyah","Narowal","Toba Tek Singh","Bhakkar","Mianwali","Khushab","Pakpattan","Lodhran","Bahawalnagar","Nankana Sahib","Rajanpur","Wazirabad","Murree","Taxila"],
 "Sindh":["Karachi","Hyderabad","Sukkur","Larkana","Nawabshah (Shaheed Benazirabad)","Mirpur Khas","Jacobabad","Shikarpur","Khairpur","Dadu","Thatta","Badin","Sanghar","Umerkot","Tando Allahyar","Tando Muhammad Khan","Jamshoro","Ghotki","Kashmore","Matiari","Naushahro Feroze","Mithi (Tharparkar)"],
 "Khyber Pakhtunkhwa":["Peshawar","Mardan","Abbottabad","Mingora (Swat)","Kohat","Mansehra","Nowshera","Charsadda","Swabi","Dera Ismail Khan","Bannu","Haripur","Chitral","Dir","Buner","Hangu","Karak","Lakki Marwat","Battagram","Landi Kotal (Khyber)"],
 "Balochistan":["Quetta","Gwadar","Turbat","Khuzdar","Sibi","Chaman","Zhob","Loralai","Hub","Dera Murad Jamali","Nushki","Kharan","Panjgur","Mastung","Kalat","Pishin","Dera Allah Yar (Jaffarabad)","Usta Muhammad"],
 "Islamabad Capital Territory":["Islamabad"],
 "Azad Jammu & Kashmir":["Muzaffarabad","Mirpur","Kotli","Bhimber","Rawalakot","Bagh","Athmuqam (Neelum)"],
 "Gilgit-Baltistan":["Gilgit","Skardu","Karimabad (Hunza)","Chilas","Gahkuch (Ghizer)","Khaplu (Ghanche)","Astore"]
};
const OTHER = "Other (type your city)";
const $ = s => document.querySelector(s);
const WA = (typeof CFG!=="undefined" && CFG.whatsapp) || "923413905030";
const MAIL = (typeof CFG!=="undefined" && CFG.email) || "blessconcandy@gmail.com";

function opt(v,t,sel){ const o=document.createElement("option"); o.value=v; o.textContent=t||v; if(sel) o.selected=true; return o; }

/* wire a state <select>, city <select> and optional free-text city input */
function wire(stateSel, citySel, otherInp, onChange){
  stateSel.replaceChildren(opt("","Select your state / province"));
  Object.keys(STATES).forEach(s=>stateSel.appendChild(opt(s)));
  function fillCities(){
    const list = STATES[stateSel.value];
    citySel.replaceChildren(opt("", list ? "Select your city" : "Select a state first"));
    citySel.disabled = !list;
    if(list){ list.forEach(c=>citySel.appendChild(opt(c))); citySel.appendChild(opt(OTHER)); }
    toggleOther();
  }
  function toggleOther(){
    if(!otherInp) return;
    const on = citySel.value===OTHER;
    otherInp.hidden = !on; otherInp.required = on; if(!on) otherInp.value="";
  }
  stateSel.addEventListener("change",()=>{ fillCities(); onChange&&onChange(); });
  citySel.addEventListener("change",()=>{ toggleOther(); onChange&&onChange(); });
  if(otherInp) otherInp.addEventListener("input",()=>onChange&&onChange());
  fillCities();
  return {
    set(state,city){
      if(!STATES[state]) return;
      stateSel.value=state; fillCities();
      if(!city) return;
      if(STATES[state].includes(city)) citySel.value=city;
      else { citySel.value=OTHER; toggleOther(); if(otherInp) otherInp.value=city; }
      onChange&&onChange();
    },
    city(){ return citySel.value===OTHER && otherInp ? otherInp.value.trim() : citySel.value; },
    state(){ return stateSel.value; }
  };
}
function remember(state,city){ try{ sessionStorage.setItem("bc_ws_loc", JSON.stringify({state,city})); }catch(e){} }
function recall(){ try{ return JSON.parse(sessionStorage.getItem("bc_ws_loc")||"null"); }catch(e){ return null; } }

/* ---------- page 1: choose location ---------- */
const loc = $("#locForm");
if(loc){
  const go = $("#locGo");
  const w = wire($("#wsState"), $("#wsCity"), $("#wsCityOther"), ()=>{ go.disabled = !(w.state() && w.city()); });
  const prev = recall(); if(prev) w.set(prev.state, prev.city);
  go.disabled = !(w.state() && w.city());
  loc.addEventListener("submit",e=>{
    e.preventDefault();
    if(!(w.state() && w.city())) return;
    remember(w.state(), w.city());
    location.href = "wholesale-order.html?state="+encodeURIComponent(w.state())+"&city="+encodeURIComponent(w.city());
  });
}

/* ---------- page 2: wholesale order form ---------- */
const form = $("#wsForm");
if(form){
  const qs = new URLSearchParams(location.search);
  const w = wire($("#wsState"), $("#wsCity"), $("#wsCityOther"), refresh);
  const prev = recall();
  w.set(qs.get("state") || (prev&&prev.state) || "", qs.get("city") || (prev&&prev.city) || "");

  const lines = PRODUCTS;
  const html = CATS.map(c=>{
    const items = lines.filter(p=>p.cat===c.id); if(!items.length) return "";
    return `<div class="cathead" style="margin-top:34px"><h2 style="font-size:1.35rem">${c.title}</h2></div>
    <div class="wlist">${items.map(p=>`
      <div class="wrow">
        <div class="wth" style="background:${p.bg}">${img(p.img,p.name,"",p.local)}</div>
        <div class="wi"><b>${p.name}</b>
          <small>${p.enquiry?`Made to order · ${p.pcs} cones per pack`:`${p.unitName} · ${p.pcs} pcs &nbsp;|&nbsp; Carton · ${p.perCarton} ${many(p)}`}</small>
          <span class="wprice"${p.cat==="rani"?' data-rani="1"':""}>${p.cat==="rani"?"":"Price: shared by our Sales Team"}</span><span class="wlinetot" data-tot="${p.id}" hidden></span></div>
        <label class="wq"><span>Cartons</span><input type="number" min="0" step="1" inputmode="numeric" data-id="${p.id}" data-u="carton" placeholder="0"></label>
        <label class="wq"><span>${p.unitName==="Box"?"Boxes":p.unitName==="Pouch"?"Pouches":"Packs"}</span><input type="number" min="0" step="1" inputmode="numeric" data-id="${p.id}" data-u="pack" placeholder="0"></label>
      </div>`).join("")}</div>`;
  }).join("");
  $("#wsProducts").innerHTML = html;
  form.addEventListener("input",refresh); form.addEventListener("change",refresh);

  function picked(){
    return [...form.querySelectorAll("input[data-id]")].map(i=>({p:find(i.dataset.id),u:i.dataset.u,n:Math.floor(+i.value)||0})).filter(x=>x.n>0);
  }
  /* ---- RANI Candy estimate (rates from the 13 Oct 2026 quotation) ---- */
  var TIERS = {250:"Retail Shop",240:"Supplier \u2014 Regular Order",230:"Supplier / Wholesaler \u2014 Bulk Order"};
  function rs(n){ return "Rs. " + Math.round(n).toLocaleString("en-US"); }
  function tierRate(){ return +($("#wsTier") && $("#wsTier").value) || 250; }
  function estimate(){
    const r=tierRate(), lines=[]; let total=0, unpriced=0;
    picked().forEach(x=>{
      if(x.p.cat!=="rani"){ unpriced++; return; }
      const unit = x.u==="carton" ? r*x.p.perCarton : r, amt = unit*x.n;
      total += amt; lines.push({p:x.p,u:x.u,n:x.n,unit,amt});
    });
    return {r,lines,total,unpriced};
  }
  function refresh(){
    const it=picked(), ct=it.filter(x=>x.u==="carton").reduce((s,x)=>s+x.n,0), pk=it.filter(x=>x.u==="pack").reduce((s,x)=>s+x.n,0);
    $("#wsSum").textContent = it.length ? `${it.length} item${it.length>1?"s":""} selected · ${ct} carton${ct===1?"":"s"} · ${pk} box/pouch/pack${pk===1?"":"s"}` : "No products selected yet";
    const E=estimate();
    form.querySelectorAll(".wprice[data-rani]").forEach(el=>{ const p=find(el.closest(".wrow").querySelector("input[data-id]").dataset.id); el.textContent = `${rs(E.r)} / box \u00b7 ${rs(E.r*p.perCarton)} / carton`; });
    form.querySelectorAll(".wlinetot").forEach(el=>{ const l=E.lines.filter(x=>x.p.id===el.dataset.tot), a=l.reduce((t,x)=>t+x.amt,0); el.hidden=!a; el.textContent=a?"Est. "+rs(a):""; });
    if(E.lines.length) $("#wsSum").textContent += ` \u00b7 Est. total ${rs(E.total)}`;
    const box=$("#wsEst");
    if(E.lines.length){
      box.hidden=false; box.replaceChildren();
      const h=document.createElement("b"); h.textContent="Estimated RANI Candy total"; box.appendChild(h);
      const t=document.createElement("div"); t.className="west-rows";
      E.lines.forEach(x=>{ const row=document.createElement("div");
        const a=document.createElement("span"); a.textContent=`${x.p.name.replace(/^RANI\s*/i,"")}: ${x.n} ${x.u==="carton"?(x.n>1?"cartons":"carton"):(x.n>1?"boxes":"box")} \u00d7 ${rs(x.unit)}`;
        const c=document.createElement("b"); c.textContent=rs(x.amt); row.append(a,c); t.appendChild(row); });
      const tot=document.createElement("div"); tot.className="west-total";
      const ta=document.createElement("span"); ta.textContent=`Estimated total (${TIERS[E.r]})`;
      const tb=document.createElement("b"); tb.textContent=rs(E.total); tot.append(ta,tb); t.appendChild(tot);
      box.appendChild(t);
      const n=document.createElement("small");
      n.textContent="This is an estimate only. It uses the RANI Candy quotation dated 13 October 2026 for the category you chose; the bulk rate applies to orders our sales team confirms as bulk quantity. Excludes transport and other charges. Final prices are confirmed by our Sales Team."+(E.unpriced?` ${E.unpriced} other item${E.unpriced>1?"s":""} will be priced by our Sales Team.`:"");
      box.appendChild(n);
    } else box.hidden=true;
    const st=w.state(), ci=w.city();
    $("#wsLoc").textContent = st && ci ? `${ci}, ${st}` : "Please choose your state and city";
  }
  refresh();

  form.addEventListener("submit",e=>{
    e.preventDefault();
    const it=picked();
    if(!it.length){ $("#wsSum").textContent="Please enter a quantity for at least one product."; $("#wsProducts").scrollIntoView({behavior:"smooth"}); return; }
    const f=Object.fromEntries(new FormData(form)), st=w.state(), ci=w.city();
    remember(st,ci);
    const id="BCW-"+Date.now().toString().slice(-6);
    const E=estimate();
    const body = it.map((x,i)=>{ const l=E.lines.find(y=>y.p===x.p&&y.u===x.u); return `${i+1}. ${x.p.name}: ${x.n} ${x.u==="carton"?(x.n>1?"cartons":"carton"):(x.n>1?many(x.p):x.p.unitName.toLowerCase())}`+(l?` (est. ${rs(l.amt)})`:""); }).join("\n");
    const priceLine = E.lines.length ? `Estimated RANI Candy total: ${rs(E.total)} (${TIERS[E.r]} rate, quotation 13 Oct 2026; estimate only, final price to be confirmed by Sales Team)`+(E.unpriced?`\nOther items: prices to be shared by Sales Team`:"") : "Prices: to be shared by Sales Team";
    const msg = `WHOLESALE ORDER ${id}\n\nState: ${st}\nCity: ${ci}\n\n${body}\n\n${priceLine}\n\nName: ${f.name}\nShop/Business: ${f.biz}\nPhone: ${f.phone}\nAddress: ${f.addr}`+(f.note?`\nNotes: ${f.note}`:"");
    const url = f.via==="wa" ? `https://wa.me/${WA}?text=${encodeURIComponent(msg)}` : `mailto:${MAIL}?subject=${encodeURIComponent("Wholesale order "+id+" - Blesscon Candy")}&body=${encodeURIComponent(msg)}`;
    window.open(url, f.via==="wa"?"_blank":"_self");
    form.hidden=true;
    $("#wsDone").hidden=false;
    $("#wsDoneId").textContent=id;
    const de=$("#wsDoneEst"); if(de){ de.hidden=!E.lines.length; de.textContent=E.lines.length?`Estimated RANI Candy total: ${rs(E.total)} (estimate only \u2014 final prices confirmed by our Sales Team).`:""; }
    $("#wsDoneVia").textContent = f.via==="wa" ? "WhatsApp" : "your email app";
    $("#wsDone").scrollIntoView({behavior:"smooth"});
  });
}
})();
