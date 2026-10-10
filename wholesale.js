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
          <span class="wprice">Price: shared by our Sales Team</span></div>
        <label class="wq"><span>Cartons</span><input type="number" min="0" step="1" inputmode="numeric" data-id="${p.id}" data-u="carton" placeholder="0"></label>
        <label class="wq"><span>${p.unitName==="Box"?"Boxes":p.unitName==="Pouch"?"Pouches":"Packs"}</span><input type="number" min="0" step="1" inputmode="numeric" data-id="${p.id}" data-u="pack" placeholder="0"></label>
      </div>`).join("")}</div>`;
  }).join("");
  $("#wsProducts").innerHTML = html;
  form.addEventListener("input",refresh);

  function picked(){
    return [...form.querySelectorAll("input[data-id]")].map(i=>({p:find(i.dataset.id),u:i.dataset.u,n:Math.floor(+i.value)||0})).filter(x=>x.n>0);
  }
  function refresh(){
    const it=picked(), ct=it.filter(x=>x.u==="carton").reduce((s,x)=>s+x.n,0), pk=it.filter(x=>x.u==="pack").reduce((s,x)=>s+x.n,0);
    $("#wsSum").textContent = it.length ? `${it.length} item${it.length>1?"s":""} selected · ${ct} carton${ct===1?"":"s"} · ${pk} box/pouch/pack${pk===1?"":"s"}` : "No products selected yet";
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
    const body = it.map((x,i)=>`${i+1}. ${x.p.name}: ${x.n} ${x.u==="carton"?(x.n>1?"cartons":"carton"):(x.n>1?many(x.p):x.p.unitName.toLowerCase())}`).join("\n");
    const msg = `WHOLESALE ORDER ${id}\n\nState: ${st}\nCity: ${ci}\n\n${body}\n\nPrices: to be shared by Sales Team\n\nName: ${f.name}\nShop/Business: ${f.biz}\nPhone: ${f.phone}\nAddress: ${f.addr}`+(f.note?`\nNotes: ${f.note}`:"");
    const url = f.via==="wa" ? `https://wa.me/${WA}?text=${encodeURIComponent(msg)}` : `mailto:${MAIL}?subject=${encodeURIComponent("Wholesale order "+id+" - Blesscon Candy")}&body=${encodeURIComponent(msg)}`;
    window.open(url, f.via==="wa"?"_blank":"_self");
    form.hidden=true;
    $("#wsDone").hidden=false;
    $("#wsDoneId").textContent=id;
    $("#wsDoneVia").textContent = f.via==="wa" ? "WhatsApp" : "your email app";
    $("#wsDone").scrollIntoView({behavior:"smooth"});
  });
}
})();
