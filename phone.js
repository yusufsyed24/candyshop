/* Blesscon Candy - international phone field
   Adds a searchable country-code picker (default: Pakistan) and validates the
   mobile number against the selected country's rules.
   Usage: any <input name="phone|p"> inside a form is enhanced via BCPhone.enhance(root).
   The original input becomes hidden and always holds the full number, e.g. "+92 3138993279",
   so existing submit handlers keep working unchanged. */
(function(){
"use strict";

/* ISO | Name | Dial code | National mobile length (n or min-max, without trunk 0) | Mobile regex (optional) */
const RAW = String.raw`
AF|Afghanistan|93|9|^7\d{8}$
AL|Albania|355|9|^6\d{8}$
DZ|Algeria|213|9|^[567]\d{8}$
AS|American Samoa|1684|7|
AD|Andorra|376|6|^[346]\d{5}$
AO|Angola|244|9|^9\d{8}$
AI|Anguilla|1264|7|
AG|Antigua and Barbuda|1268|7|
AR|Argentina|54|10-11|^9?\d{10}$
AM|Armenia|374|8|^[3-9]\d{7}$
AW|Aruba|297|7|^[5679]\d{6}$
AU|Australia|61|9|^4\d{8}$
AT|Austria|43|10-13|^6\d{9,12}$
AZ|Azerbaijan|994|9|^(?:10|50|51|55|60|70|77|99)\d{7}$
BS|Bahamas|1242|7|
BH|Bahrain|973|8|^[36]\d{7}$
BD|Bangladesh|880|10|^1[3-9]\d{8}$
BB|Barbados|1246|7|
BY|Belarus|375|9|^(?:25|29|33|44)\d{7}$
BE|Belgium|32|9|^4\d{8}$
BZ|Belize|501|7|^6\d{6}$
BJ|Benin|229|8-10|^(?:\d{8}|01\d{8})$
BM|Bermuda|1441|7|
BT|Bhutan|975|8|^(?:17|77)\d{6}$
BO|Bolivia|591|8|^[67]\d{7}$
BQ|Bonaire, Sint Eustatius and Saba|599|7|^[3-9]\d{6}$
BA|Bosnia and Herzegovina|387|8-9|^6\d{7,8}$
BW|Botswana|267|8|^7\d{7}$
BR|Brazil|55|11|^[1-9][1-9]9\d{8}$
IO|British Indian Ocean Territory|246|7|^3\d{6}$
VG|British Virgin Islands|1284|7|
BN|Brunei|673|7|^[78]\d{6}$
BG|Bulgaria|359|9|^(?:8[7-9]|98)\d{7}$
BF|Burkina Faso|226|8|^[5-7]\d{7}$
BI|Burundi|257|8|^[67]\d{7}$
KH|Cambodia|855|8-9|^[1-9]\d{7,8}$
CM|Cameroon|237|9|^6\d{8}$
CA|Canada|1|10|^[2-9]\d{2}[2-9]\d{6}$
CV|Cape Verde|238|7|^[59]\d{6}$
KY|Cayman Islands|1345|7|
CF|Central African Republic|236|8|^7\d{7}$
TD|Chad|235|8|^[679]\d{7}$
CL|Chile|56|9|^9\d{8}$
CN|China|86|11|^1[3-9]\d{9}$
CX|Christmas Island|61|9|^4\d{8}$
CC|Cocos (Keeling) Islands|61|9|^4\d{8}$
CO|Colombia|57|10|^3\d{9}$
KM|Comoros|269|7|^3\d{6}$
CG|Congo (Republic)|242|9|^0[456]\d{7}$
CD|Congo (DR)|243|9|^[89]\d{8}$
CK|Cook Islands|682|5|^[5-8]\d{4}$
CR|Costa Rica|506|8|^[5-8]\d{7}$
CI|Côte d'Ivoire|225|10|^0[157]\d{8}$
HR|Croatia|385|8-9|^9\d{7,8}$
CU|Cuba|53|8|^5\d{7}$
CW|Curaçao|599|8|^9\d{7}$
CY|Cyprus|357|8|^9\d{7}$
CZ|Czech Republic|420|9|^[67]\d{8}$
DK|Denmark|45|8|^[2-9]\d{7}$
DJ|Djibouti|253|8|^[1-9]\d{7}$
DM|Dominica|1767|7|
DO|Dominican Republic|1|10|^(?:809|829|849)\d{7}$
EC|Ecuador|593|9|^9\d{8}$
EG|Egypt|20|10|^1[0125]\d{8}$
SV|El Salvador|503|8|^[67]\d{7}$
GQ|Equatorial Guinea|240|9|^[25]\d{8}$
ER|Eritrea|291|7|^[17]\d{6}$
EE|Estonia|372|7-8|^5\d{6,7}$
SZ|Eswatini|268|8|^[67]\d{7}$
ET|Ethiopia|251|9|^[79]\d{8}$
FK|Falkland Islands|500|5|^[56]\d{4}$
FO|Faroe Islands|298|6|^[2-9]\d{5}$
FJ|Fiji|679|7|^[7-9]\d{6}$
FI|Finland|358|7-10|^[45]\d{6,9}$
FR|France|33|9|^[67]\d{8}$
GF|French Guiana|594|9|^694\d{6}$
PF|French Polynesia|689|8|^8\d{7}$
GA|Gabon|241|7-8|^[67]\d{6,7}$
GM|Gambia|220|7|^[3679]\d{6}$
GE|Georgia|995|9|^[57]\d{8}$
DE|Germany|49|10-11|^1[5-7]\d{8,9}$
GH|Ghana|233|9|^[235]\d{8}$
GI|Gibraltar|350|8|^[56]\d{7}$
GR|Greece|30|10|^69\d{8}$
GL|Greenland|299|6|^[2-9]\d{5}$
GD|Grenada|1473|7|
GP|Guadeloupe|590|9|^69\d{7}$
GU|Guam|1671|7|
GT|Guatemala|502|8|^[3-5]\d{7}$
GG|Guernsey|44|10|^7\d{9}$
GN|Guinea|224|9|^6\d{8}$
GW|Guinea-Bissau|245|7-9|^[5-7]\d{6,8}$
GY|Guyana|592|7|^6\d{6}$
HT|Haiti|509|8|^[34]\d{7}$
HN|Honduras|504|8|^[3789]\d{7}$
HK|Hong Kong|852|8|^[569]\d{7}$
HU|Hungary|36|9|^(?:20|30|31|50|70)\d{7}$
IS|Iceland|354|7|^[6-8]\d{6}$
IN|India|91|10|^[6-9]\d{9}$
ID|Indonesia|62|9-12|^8\d{8,11}$
IR|Iran|98|10|^9\d{9}$
IQ|Iraq|964|10|^7\d{9}$
IE|Ireland|353|9|^8\d{8}$
IM|Isle of Man|44|10|^7\d{9}$
IL|Israel|972|9|^5\d{8}$
IT|Italy|39|9-10|^3\d{8,9}$
JM|Jamaica|1|10|^(?:876|658)\d{7}$
JP|Japan|81|10|^[789]0\d{8}$
JE|Jersey|44|10|^7\d{9}$
JO|Jordan|962|9|^7\d{8}$
KZ|Kazakhstan|7|10|^7\d{9}$
KE|Kenya|254|9|^[17]\d{8}$
KI|Kiribati|686|8|^[3-9]\d{7}$
XK|Kosovo|383|8-9|^4\d{7,8}$
KW|Kuwait|965|8|^[569]\d{7}$
KG|Kyrgyzstan|996|9|^[2579]\d{8}$
LA|Laos|856|9-10|^(?:20\d{8}|30\d{7})$
LV|Latvia|371|8|^2\d{7}$
LB|Lebanon|961|7-8|^(?:3\d{6}|(?:7\d|81)\d{6})$
LS|Lesotho|266|8|^[56]\d{7}$
LR|Liberia|231|7-9|^[4-8]\d{6,8}$
LY|Libya|218|9|^9\d{8}$
LI|Liechtenstein|423|7-9|^[67]\d{6,8}$
LT|Lithuania|370|8|^6\d{7}$
LU|Luxembourg|352|9|^6\d{8}$
MO|Macau|853|8|^6\d{7}$
MG|Madagascar|261|9|^3\d{8}$
MW|Malawi|265|9|^[189]\d{8}$
MY|Malaysia|60|9-10|^1\d{8,9}$
MV|Maldives|960|7|^[79]\d{6}$
ML|Mali|223|8|^[67]\d{7}$
MT|Malta|356|8|^[79]\d{7}$
MH|Marshall Islands|692|7|^[2-9]\d{6}$
MQ|Martinique|596|9|^69\d{7}$
MR|Mauritania|222|8|^[2-4]\d{7}$
MU|Mauritius|230|8|^5\d{7}$
YT|Mayotte|262|9|^6\d{8}$
MX|Mexico|52|10|^[1-9]\d{9}$
FM|Micronesia|691|7|^[2-9]\d{6}$
MD|Moldova|373|8|^[67]\d{7}$
MC|Monaco|377|8-9|^(?:4\d{7}|6\d{7,8})$
MN|Mongolia|976|8|^[5-9]\d{7}$
ME|Montenegro|382|8|^6\d{7}$
MS|Montserrat|1664|7|
MA|Morocco|212|9|^[67]\d{8}$
MZ|Mozambique|258|9|^8[2-7]\d{7}$
MM|Myanmar|95|8-10|^9\d{7,9}$
NA|Namibia|264|9|^8\d{8}$
NR|Nauru|674|7|^[2-9]\d{6}$
NP|Nepal|977|10|^9[78]\d{8}$
NL|Netherlands|31|9|^6\d{8}$
NC|New Caledonia|687|6|^[5-9]\d{5}$
NZ|New Zealand|64|8-10|^2\d{7,9}$
NI|Nicaragua|505|8|^[578]\d{7}$
NE|Niger|227|8|^[89]\d{7}$
NG|Nigeria|234|10|^[789][01]\d{8}$
NU|Niue|683|4|
NF|Norfolk Island|672|6|^[1-9]\d{5}$
KP|North Korea|850|10|^19\d{8}$
MK|North Macedonia|389|8|^7\d{7}$
MP|Northern Mariana Islands|1670|7|
NO|Norway|47|8|^[49]\d{7}$
OM|Oman|968|8|^[79]\d{7}$
PK|Pakistan|92|10|^3(?:[0-4]\d|55)\d{7}$
PW|Palau|680|7|^[2-9]\d{6}$
PS|Palestine|970|9|^5\d{8}$
PA|Panama|507|8|^6\d{7}$
PG|Papua New Guinea|675|8|^[78]\d{7}$
PY|Paraguay|595|9|^9\d{8}$
PE|Peru|51|9|^9\d{8}$
PH|Philippines|63|10|^9\d{9}$
PL|Poland|48|9|^[4-8]\d{8}$
PT|Portugal|351|9|^9[1236]\d{7}$
PR|Puerto Rico|1|10|^(?:787|939)\d{7}$
QA|Qatar|974|8|^[3567]\d{7}$
RE|Réunion|262|9|^69\d{7}$
RO|Romania|40|9|^7\d{8}$
RU|Russia|7|10|^9\d{9}$
RW|Rwanda|250|9|^7\d{8}$
WS|Samoa|685|5-7|^[2-9]\d{4,6}$
SM|San Marino|378|6-10|^6\d{5,9}$
ST|São Tomé and Príncipe|239|7|^9\d{6}$
SA|Saudi Arabia|966|9|^5\d{8}$
SN|Senegal|221|9|^7\d{8}$
RS|Serbia|381|8-9|^6\d{7,8}$
SC|Seychelles|248|7|^2\d{6}$
SL|Sierra Leone|232|8|^[2-9]\d{7}$
SG|Singapore|65|8|^[89]\d{7}$
SX|Sint Maarten|1721|7|
SK|Slovakia|421|9|^9\d{8}$
SI|Slovenia|386|8|^[3-7]\d{7}$
SB|Solomon Islands|677|7|^[78]\d{6}$
SO|Somalia|252|7-9|^[67]\d{6,8}$
ZA|South Africa|27|9|^[6-8]\d{8}$
KR|South Korea|82|9-10|^1\d{8,9}$
SS|South Sudan|211|9|^[19]\d{8}$
ES|Spain|34|9|^[67]\d{8}$
LK|Sri Lanka|94|9|^7\d{8}$
SH|Saint Helena|290|5|^[56]\d{4}$
KN|Saint Kitts and Nevis|1869|7|
LC|Saint Lucia|1758|7|
PM|Saint Pierre and Miquelon|508|6|^[45]\d{5}$
VC|Saint Vincent and the Grenadines|1784|7|
SD|Sudan|249|9|^[19]\d{8}$
SR|Suriname|597|7|^[6-8]\d{6}$
SE|Sweden|46|9|^7\d{8}$
CH|Switzerland|41|9|^7\d{8}$
SY|Syria|963|9|^9\d{8}$
TW|Taiwan|886|9|^9\d{8}$
TJ|Tajikistan|992|9|^[3-9]\d{8}$
TZ|Tanzania|255|9|^[67]\d{8}$
TH|Thailand|66|9|^[689]\d{8}$
TL|Timor-Leste|670|8|^7\d{7}$
TG|Togo|228|8|^[79]\d{7}$
TK|Tokelau|690|4|
TO|Tonga|676|5-7|^[1-9]\d{4,6}$
TT|Trinidad and Tobago|1868|7|
TN|Tunisia|216|8|^[2459]\d{7}$
TR|Turkey|90|10|^5\d{9}$
TM|Turkmenistan|993|8|^6\d{7}$
TC|Turks and Caicos Islands|1649|7|
TV|Tuvalu|688|5-7|^[79]\d{4,6}$
UG|Uganda|256|9|^7\d{8}$
UA|Ukraine|380|9|^(?:39|50|6\d|7\d|9\d)\d{7}$
AE|United Arab Emirates|971|9|^5[024568]\d{7}$
GB|United Kingdom|44|10|^7[1-57-9]\d{8}$
US|United States|1|10|^[2-9]\d{2}[2-9]\d{6}$
VI|US Virgin Islands|1340|7|
UY|Uruguay|598|8|^9\d{7}$
UZ|Uzbekistan|998|9|^[3-9]\d{8}$
VU|Vanuatu|678|7|^[5-7]\d{6}$
VE|Venezuela|58|10|^4\d{9}$
VN|Vietnam|84|9|^[35789]\d{8}$
WF|Wallis and Futuna|681|6|^[1-9]\d{5}$
YE|Yemen|967|9|^7\d{8}$
ZM|Zambia|260|9|^[79]\d{8}$
ZW|Zimbabwe|263|9|^7\d{8}$
`;

/* countries whose numbers legitimately start with 0 (so the leading 0 is NOT a trunk prefix) */
const KEEP_ZERO = new Set(["CG","CI"]);
/* placeholder examples */
const EG = {PK:"3XX XXXXXXX",IN:"9XXXX XXXXX",AE:"5X XXX XXXX",SA:"5X XXX XXXX",GB:"7XXX XXXXXX",US:"XXX XXX XXXX",CA:"XXX XXX XXXX",BD:"1XXX XXXXXX",CN:"1XX XXXX XXXX"};
const DEFAULT_ISO = "PK";

const flag = iso => iso.replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));
const COUNTRIES = RAW.trim().split("\n").map(l=>{
  const parts = l.split("|"), [iso,name,dial,len] = parts, re = parts.slice(4).join("|");
  const [mn,mx] = len.includes("-") ? len.split("-").map(Number) : [+len,+len];
  return {iso,name,dial,min:mn,max:mx,re:re?new RegExp(re):null,flag:flag(iso),keepZero:KEEP_ZERO.has(iso)};
});
const BY_ISO = Object.fromEntries(COUNTRIES.map(c=>[c.iso,c]));
/* longest-dial-code-first list for detecting pasted "+92..." numbers (US/RU win ties on shared codes) */
const BY_DIAL = [...COUNTRIES].sort((a,b)=>b.dial.length-a.dial.length);
const PREFER = {"1":"US","7":"RU","44":"GB","61":"AU","39":"IT","358":"FI","262":"RE","590":"GP","599":"CW"};

let lastIso = DEFAULT_ISO;   /* remembered while the page is open (cart re-renders) */
let uid = 0;

const digits = s => (s||"").replace(/\D/g,"");
function national(c, raw){
  let d = digits(raw);
  if(!c.keepZero) d = d.replace(/^0+/,"");
  return d;
}
function check(c, raw){
  const n = national(c, raw);
  if(!n) return {ok:false, msg: digits(raw) ? "Please enter a real phone number." : "Please enter your phone number.", n};
  const lenTxt = c.min===c.max ? `${c.min} digits` : `${c.min} to ${c.max} digits`;
  const zeroNote = c.keepZero ? "" : " (without the leading 0)";
  if(n.length<c.min || n.length>c.max)
    return {ok:false, msg:`${c.name} mobile numbers have ${lenTxt}${zeroNote}. You entered ${n.length}.`, n};
  if(/^(\d)\1+$/.test(n)) return {ok:false, msg:"Please enter a real phone number.", n};
  if(c.re && !c.re.test(n))
    return {ok:false, msg:`That doesn't look like a valid ${c.name} mobile number.`, n};
  return {ok:true, msg:"", n};
}
function placeholder(c){
  if(EG[c.iso]) return EG[c.iso];
  return "X".repeat(Math.min(c.max,10)).replace(/(.{3})(?=.)/g,"$1 ");
}

function build(orig){
  if(orig.dataset.phoneReady) return;
  orig.dataset.phoneReady = "1";
  const form = orig.form;
  const id = orig.id || ("bcp"+(++uid));
  const required = orig.required;
  let cur = BY_ISO[lastIso] || BY_ISO[DEFAULT_ISO];

  const wrap = document.createElement("div"); wrap.className = "phone";
  wrap.innerHTML = `
    <div class="phone-row">
      <button type="button" class="pc" aria-haspopup="listbox" aria-expanded="false" aria-label="Country code">
        <span class="pf-flag"></span><span class="pf-dial"></span><span class="pf-caret">▾</span>
      </button>
      <input class="f pn" type="tel" inputmode="tel" autocomplete="tel-national" maxlength="24">
    </div>
    <div class="pcl" hidden>
      <input class="f pcs" type="search" placeholder="Search country or code" aria-label="Search country" autocomplete="off">
      <ul role="listbox"></ul>
    </div>
    <div class="phone-err" role="alert" hidden></div>`;
  orig.parentNode.insertBefore(wrap, orig);
  orig.type = "hidden"; orig.removeAttribute("required"); orig.removeAttribute("id");
  orig.removeAttribute("autocomplete");
  wrap.appendChild(orig);

  const btn = wrap.querySelector(".pc"), inp = wrap.querySelector(".pn"),
        panel = wrap.querySelector(".pcl"), search = wrap.querySelector(".pcs"),
        list = wrap.querySelector("ul"), err = wrap.querySelector(".phone-err");
  inp.id = id; inp.required = required; inp.value = orig.value.replace(/^\+\d+\s*/,"");
  let touched = false, active = -1;

  function paint(){
    btn.querySelector(".pf-flag").textContent = cur.flag;
    btn.querySelector(".pf-dial").textContent = "+"+cur.dial;
    btn.title = cur.name+" (+"+cur.dial+")";
    inp.placeholder = placeholder(cur);
  }
  function validate(show){
    const r = check(cur, inp.value);
    inp.setCustomValidity(r.ok || (!inp.value && !required) ? "" : r.msg);
    orig.value = inp.value && r.ok ? `+${cur.dial} ${r.n}` : (inp.value && !required ? `+${cur.dial} ${r.n}` : "");
    const bad = !r.ok && (inp.value || required) && (show||touched);
    err.hidden = !bad; err.textContent = bad ? r.msg : "";
    inp.classList.toggle("bad", !!bad);
    wrap.classList.toggle("ok", r.ok && !!inp.value);
    return r.ok;
  }
  function setCountry(c){
    cur = c; lastIso = c.iso; paint(); validate(false);
  }
  /* pasted/typed international numbers: +92 313..., 0092313... */
  function detectIntl(){
    const v = inp.value.trim();
    let d = null;
    if(v.startsWith("+")) d = digits(v);
    else if(/^00\d/.test(v)) d = digits(v).slice(2);
    if(!d) return;
    const hits = BY_DIAL.filter(c=>d.startsWith(c.dial));
    if(!hits.length) return;
    const L = hits[0].dial.length, same = hits.filter(c=>c.dial.length===L);
    const c = same.find(x=>x.iso===PREFER[x.dial]) || same.find(x=>x.re && x.re.test(d.slice(L))) || same[0];
    inp.value = d.slice(c.dial.length);
    setCountry(c);
  }

  /* dropdown */
  function renderList(q){
    const t = (q||"").trim().toLowerCase().replace(/^\+/,"");
    const rank = c => { const n=c.name.toLowerCase();
      return n.startsWith(t)?0 : c.iso.toLowerCase()===t?1 : n.split(/[\s,(]+/).some(w=>w.startsWith(t))?2 : c.dial===t?3 : n.includes(t)||c.dial.startsWith(t)?4 : 9; };
    const items = t ? COUNTRIES.filter(c=>rank(c)<9).sort((a,b)=>rank(a)-rank(b)) : COUNTRIES;
    list.innerHTML = items.map(c=>`<li role="option" data-iso="${c.iso}" class="${c.iso===cur.iso?"sel":""}" aria-selected="${c.iso===cur.iso}"><span class="lf">${c.flag}</span><span class="ln">${c.name}</span><span class="ld">+${c.dial}</span></li>`).join("") || `<li class="none">No match</li>`;
    active = -1;
  }
  function move(d){
    const els = [...list.querySelectorAll("li[data-iso]")]; if(!els.length) return;
    active = (active + d + els.length) % els.length;
    els.forEach((e,i)=>e.classList.toggle("act",i===active));
    els[active].scrollIntoView({block:"nearest"});
  }
  function open(){
    renderList(""); search.value = "";
    const r = btn.getBoundingClientRect();
    wrap.classList.toggle("up", innerHeight - r.bottom < 300 && r.top > innerHeight - r.bottom);
    panel.hidden = false; btn.setAttribute("aria-expanded","true");
    const s = list.querySelector(".sel"); if(s) s.scrollIntoView({block:"center"});
    setTimeout(()=>search.focus(),0);
  }
  function close(focus){
    if(panel.hidden) return;
    panel.hidden = true; btn.setAttribute("aria-expanded","false");
    if(focus) inp.focus();
  }
  function pick(iso){ setCountry(BY_ISO[iso]); close(true); }

  btn.addEventListener("click",()=> panel.hidden ? open() : close());
  search.addEventListener("input",()=>renderList(search.value));
  search.addEventListener("keydown",e=>{
    if(e.key==="ArrowDown"){e.preventDefault();move(1);}
    else if(e.key==="ArrowUp"){e.preventDefault();move(-1);}
    else if(e.key==="Enter"){
      e.preventDefault();
      const els=[...list.querySelectorAll("li[data-iso]")];
      const el = els[active>=0?active:0]; if(el) pick(el.dataset.iso);
    } else if(e.key==="Escape"){e.preventDefault();close(true);}
  });
  list.addEventListener("click",e=>{ const li=e.target.closest("li[data-iso]"); if(li) pick(li.dataset.iso); });
  document.addEventListener("click",e=>{ if(!wrap.contains(e.target)) close(); });

  /* number input */
  inp.addEventListener("input",()=>{
    const clean = inp.value.replace(/[^\d\s\-().+]/g,"");
    if(clean!==inp.value) inp.value = clean;
    detectIntl(); validate(false);
  });
  inp.addEventListener("blur",()=>{ if(inp.value||required){ touched = true; validate(true);} });
  inp.addEventListener("invalid",()=>{ touched = true; validate(true); });
  if(form) form.addEventListener("reset",()=>setTimeout(()=>{inp.value="";touched=false;setCountry(BY_ISO[DEFAULT_ISO]);},0));

  paint(); detectIntl(); validate(false);
}

function enhance(root){
  (root||document).querySelectorAll('input[name="phone"],input[name="p"]').forEach(i=>{
    if(i.form && i.type!=="hidden") build(i);
  });
}

window.BCPhone = {enhance, countries:COUNTRIES, check:(iso,v)=>check(BY_ISO[iso],v)};
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",()=>enhance());
else enhance();
})();
