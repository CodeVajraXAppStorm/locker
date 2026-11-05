// ===== Vault X =====
// सेक्शन यहाँ बदलो: [id, नाम, आइकन, छोटा विवरण, रंग(hue)]
const SECTIONS=[
["identity","Identity","id","आधार, PAN, लाइसेंस, वोटर ID",40],
["bank","Bank","bank","पासबुक, चेक, कार्ड, स्टेटमेंट",175],
["education","Education","cap","मार्कशीट, सर्टिफिकेट, डिग्री",265],
["medical","Medical","heart","रिपोर्ट, पर्ची, बीमा",345],
["other","Other Documents","folder","बाकी सारे डॉक्यूमेंट",215]];

const IC={
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
fingerprint:'<path d="M12 11v3a6 6 0 0 1-1 3"/><path d="M8 11a4 4 0 0 1 8 0v2a10 10 0 0 1-2 6"/><path d="M5 12a7 7 0 0 1 14 0v1a14 14 0 0 1-1 5"/><path d="M8 17c0 1.5-.5 3-1 4"/>',
sliders:'<path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0"/><circle cx="15" cy="6" r="2.2"/><circle cx="9" cy="12" r="2.2"/><circle cx="17" cy="18" r="2.2"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/>',
id:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-2 5.5-2 6 0M14 10h4M14 14h4"/>',
bank:'<path d="M3 10l9-6 9 6zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
heart:'<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>',
folder:'<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
back:'<path d="M15 5l-7 7 7 7"/>',
chev:'<path d="M9 5l7 7-7 7"/>',
file:'<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/>',
share:'<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
pencil:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
refresh:'<path d="M20 11a8 8 0 0 0-14-4M4 5v4h4M4 13a8 8 0 0 0 14 4M20 19v-4h-4"/>',
backspace:'<path d="M9 5h11v14H9l-6-7z"/><path d="M12 9l5 6M17 9l-5 6"/>',
down:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
key:'<circle cx="8" cy="14" r="4"/><path d="M11 11l9-9M16 6l3 3"/>',
check:'<path d="M5 12l5 5 9-10"/>',
printer:'<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3"/><path d="M7 14h10v7H7z"/>',
power:'<path d="M12 3v9"/><path d="M6.3 6.3a8 8 0 1 0 11.4 0"/>'
};
const ic=(n,s=22)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;

const V=()=>Capacitor.Plugins.Vault;
const app=document.getElementById("app");
const esc=t=>String(t).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const te=new TextEncoder(),td=new TextDecoder();
let key=null,busy=false,inExt=false,cur={};
const view=h=>{app.innerHTML=`<div class="screen">${h}</div>`;window.scrollTo(0,0)};
const $=id=>document.getElementById(id);

function toast(m){const t=$("toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),2500)}
// कैमरा/गैलरी/शेयर/फोल्डर जैसे बाहरी स्क्रीन खुलते समय ऐप लॉक न हो
function hold(){busy=true;setTimeout(()=>{if(!inExt)busy=false},4000)}

// ----- crypto (AES-GCM, PBKDF2) -----
const b64=u=>{u=new Uint8Array(u);let s="";for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(0,u.subarray(i,i+8192));return btoa(s)};
const unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function derive(pin,salt){const m=await crypto.subtle.importKey("raw",te.encode(pin),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:250000,hash:"SHA-256"},m,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])}
async function enc(k,bytes){const iv=crypto.getRandomValues(new Uint8Array(12));const ct=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv},k,bytes));const o=new Uint8Array(12+ct.length);o.set(iv);o.set(ct,12);return o}
async function dec(k,o){o=new Uint8Array(o);return new Uint8Array(await crypto.subtle.decrypt({name:"AES-GCM",iv:o.slice(0,12)},k,o.slice(12)))}

// ----- storage (IndexedDB, सब कुछ encrypted) -----
const dbp=new Promise(r=>{const q=indexedDB.open("vaultx",1);q.onupgradeneeded=()=>q.result.createObjectStore("docs",{keyPath:"id"});q.onsuccess=()=>r(q.result)});
const tx=async(m,f)=>{const d=await dbp;return new Promise((ok,no)=>{const t=d.transaction("docs",m),r=f(t.objectStore("docs"));t.oncomplete=()=>ok(r.result);t.onerror=()=>no(t.error)})};
const dbAll=()=>tx("readonly",s=>s.getAll());
const dbGet=id=>tx("readonly",s=>s.get(id));
const dbPut=d=>tx("readwrite",s=>s.put(d));
const dbDel=id=>tx("readwrite",s=>s.delete(id));

// ----- lock -----
const bioOn=()=>localStorage.bio==="1";
function lock(){key=null;document.querySelectorAll(".ov").forEach(o=>o.remove());try{V().wipe()}catch(e){}lockUI("")}
function onBg(){if(busy){inExt=true;return}lock()}
function onFg(){inExt=false;busy=false;if(!key&&localStorage.chk&&bioOn())bioUnlock()}
document.addEventListener("visibilitychange",()=>document.hidden?onBg():onFg());
document.addEventListener("pause",onBg);
document.addEventListener("resume",onFg);

let fails=0,until=0;
async function tryPin(pin){
  if(Date.now()<until)return lockUI("30 सेकंड बाद कोशिश करो");
  try{
    const k=await derive(pin,unb64(localStorage.salt));
    if(td.decode(await dec(k,unb64(localStorage.chk)))==="VAULTX"){key=k;fails=0;return home()}
  }catch(e){}
  if(++fails>=5){until=Date.now()+30000;fails=0}
  lockUI("गलत PIN, फिर से कोशिश करो");
}
async function bioUnlock(){
  try{const r=await V().bioUnlock();await tryPin(r.secret)}
  catch(e){if(String(e&&e.message||e).includes("invalid")){localStorage.bio="0";lockUI("फिंगरप्रिंट बदल गया, PIN डालो")}}
}
async function enableBio(pin){
  try{await V().bioEnroll({secret:pin});localStorage.bio="1";toast("फिंगरप्रिंट चालू हो गया")}
  catch(e){toast("फिंगरप्रिंट चालू नहीं हुआ")}
}
async function createPin(pin){
  const salt=crypto.getRandomValues(new Uint8Array(16));
  key=await derive(pin,salt);
  localStorage.salt=b64(salt);localStorage.chk=b64(await enc(key,te.encode("VAULTX")));localStorage.len=pin.length;
  home();
  const ok=await V().bioAvailable().then(r=>r.ok).catch(()=>false);
  if(ok&&confirm("फिंगरप्रिंट से भी खोलना चालू करूँ?"))enableBio(pin);
}
function lockUI(msg){
  const setup=!localStorage.chk,L=+localStorage.len;let pin="",first=null,note=setup?"नया PIN बनाओ (4–8 अंक)":(msg||"अपना PIN डालो"),bad=!!msg;
  const draw=()=>{
    const n=setup?Math.max(4,pin.length):L;
    const left=setup?`<button class="key ghost" data-k="⌫">${ic("backspace",26)}</button>`:(bioOn()?`<button class="key ghost" data-k="bio">${ic("fingerprint",32)}</button>`:`<button class="key ghost" data-k=""></button>`);
    const right=setup?`<button class="key ghost" data-k="OK">${ic("check",30)}</button>`:`<button class="key ghost" data-k="⌫">${ic("backspace",26)}</button>`;
    app.innerHTML=`<div class="lock"><div class="logo">${ic("shield",38)}</div><h1>VAULT <b>X</b></h1><p class="sub">सुरक्षित डॉक्यूमेंट लॉकर</p>
    <div class="dots">${Array.from({length:n},(_,i)=>`<i class="${i<pin.length?"on":""}"></i>`).join("")}</div>
    <p class="note ${bad?"err":""}">${esc(note)}</p>
    <div class="pad">${[1,2,3,4,5,6,7,8,9].map(k=>`<button class="key" data-k="${k}">${k}</button>`).join("")}${left}<button class="key" data-k="0">0</button>${right}</div>
    <div class="enc">${ic("lock",13)} AES-256 एन्क्रिप्टेड</div></div>`;
    app.querySelectorAll(".key").forEach(b=>b.onclick=()=>press(b.dataset.k));
  };
  const press=k=>{
    if(!k)return;
    if(navigator.vibrate)navigator.vibrate(8);
    bad=false;
    if(k==="⌫")pin=pin.slice(0,-1);
    else if(k==="bio")return bioUnlock();
    else if(k==="OK"){
      if(pin.length<4){note="कम से कम 4 अंक";bad=true;return draw()}
      if(first===null){first=pin;pin="";note="PIN फिर से डालो";return draw()}
      if(first!==pin){first=null;pin="";note="मैच नहीं हुआ, फिर से बनाओ";bad=true;return draw()}
      return createPin(pin);
    }
    else if(pin.length<(setup?8:L))pin+=k;
    draw();
    if(!setup&&pin.length===L)tryPin(pin);
  };
  draw();
}

// ----- screens -----
async function home(){
  const docs=await dbAll();const cnt=id=>docs.filter(d=>d.section===id).length;
  view(`<div class="top"><div class="brand"><div class="mini">${ic("shield",22)}</div><div><h2>Vault X</h2><span>${docs.length} डॉक्यूमेंट सुरक्षित</span></div></div><button class="ibtn" id="st">${ic("sliders",21)}</button></div>
  <div class="hero"><div class="hi">${ic("lock",18)}</div><div><b>आपका लॉकर सुरक्षित है</b><span>सारे डॉक्यूमेंट इस फ़ोन में एन्क्रिप्टेड हैं</span></div></div>
  <div class="sec-title">श्रेणियाँ</div>
  <div class="cats">${SECTIONS.map(s=>`<button class="cat" data-s="${s[0]}" style="--h:${s[4]}"><span class="tile">${ic(s[2],24)}</span><span class="ct"><b>${s[1]}</b><small>${s[3]}</small></span><span class="badge">${cnt(s[0])}</span>${ic("chev",18)}</button>`).join("")}</div>
  <button class="fab" id="add">${ic("plus",24)} डॉक्यूमेंट जोड़ो</button>`);
  app.querySelectorAll(".cat").forEach(b=>b.onclick=()=>section(b.dataset.s));
  $("st").onclick=settings;
  $("add").onclick=()=>addForm("identity",true);
}
async function section(id){
  const sec=SECTIONS.find(s=>s[0]===id);
  const docs=(await dbAll()).filter(d=>d.section===id).sort((a,b)=>b.ts-a.ts);
  const dt=t=>new Date(t).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">${sec[1]}</h2><span class="badge">${docs.length}</span></div>
  ${docs.length?`<div class="docs">${docs.map(d=>`<button class="doc" data-id="${d.id}" style="--h:${sec[4]}"><span class="tile">${ic("file",22)}</span><span class="ct"><b>${esc(d.title)}</b><small>${dt(d.ts)}</small></span>${ic("chev",18)}</button>`).join("")}</div>`
  :`<div class="empty"><div class="ring">${ic(sec[2],34)}</div>अभी कोई डॉक्यूमेंट नहीं<br>नीचे बटन दबाकर पहला जोड़ो</div>`}
  <button class="fab" id="add">${ic("plus",24)} जोड़ो</button>`);
  $("bk").onclick=home;
  $("add").onclick=()=>addForm(id);
  app.querySelectorAll(".doc").forEach(b=>b.onclick=()=>detail(b.dataset.id));
}
async function shrink(file){
  const bmp=await createImageBitmap(file);
  const s=Math.min(1,1600/Math.max(bmp.width,bmp.height));
  const c=document.createElement("canvas");c.width=Math.round(bmp.width*s);c.height=Math.round(bmp.height*s);
  c.getContext("2d").drawImage(bmp,0,0,c.width,c.height);
  return c.toDataURL("image/jpeg",0.85).split(",")[1];
}
function pick(side,cam){
  hold();
  const i=document.createElement("input");i.type="file";i.accept="image/*";if(cam)i.capture="environment";
  i.onchange=async()=>{
    const f=i.files[0];if(!f)return;
    cur[side]=await shrink(f);
    $("p_"+side).src="data:image/jpeg;base64,"+cur[side];
    $("u_"+side).classList.add("has");
  };
  i.click();
}
function addForm(sec,fromHome){
  cur={front:null,back:null,sec};
  const up=(k,t,p)=>`<div class="up" id="u_${k}"><h4>${t}</h4><p>${p}</p><img id="p_${k}" alt=""><div class="two"><button class="cam" data-k="${k}" data-c="1">${ic("camera",19)} कैमरा</button><button class="gal" data-k="${k}" data-c="0">${ic("image",19)} गैलरी</button></div></div>`;
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">नया डॉक्यूमेंट</h2></div>
  <input class="fld" id="tt" placeholder="डॉक्यूमेंट का नाम (जैसे: आधार कार्ड)" maxlength="60">
  <div class="sec-title" style="margin-top:18px">श्रेणी</div>
  <div class="chips">${SECTIONS.map(s=>`<button class="chip ${s[0]===sec?"on":""}" data-s="${s[0]}">${s[1]}</button>`).join("")}</div>
  ${up("front","फ्रंट साइड","ज़रूरी")}${up("back","बैक साइड","ज़रूरी नहीं")}
  <div class="bar"><button class="btn gold" id="sv">${ic("check",20)} सेव करो</button></div>`);
  $("bk").onclick=()=>fromHome?home():section(sec);
  app.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{cur.sec=b.dataset.s;app.querySelectorAll(".chip").forEach(x=>x.classList.toggle("on",x===b))});
  app.querySelectorAll(".two button").forEach(b=>b.onclick=()=>pick(b.dataset.k,b.dataset.c==="1"));
  $("sv").onclick=async()=>{
    const title=$("tt").value.trim();
    if(!title)return toast("डॉक्यूमेंट का नाम डालो");
    if(!cur.front)return toast("फ्रंट साइड की फोटो ज़रूरी है");
    const payload=JSON.stringify({front:cur.front,back:cur.back});
    await dbPut({id:crypto.randomUUID(),section:cur.sec,title,ts:Date.now(),enc:await enc(key,te.encode(payload))});
    toast("सुरक्षित सेव हो गया");section(cur.sec);
  };
}
async function detail(id){
  const d=await dbGet(id);
  let p;try{p=JSON.parse(td.decode(await dec(key,d.enc)))}catch(e){return toast("खुल नहीं पाया")}
  let lay="one";
  const pic=(k,t)=>`<div class="pic"><img src="data:image/jpeg;base64,${p[k]}" alt="${t}"><span class="lbl">${t}</span><div class="pa"><button data-a="s${k}">${ic("share",17)}</button><button data-a="r${k}">${ic("refresh",17)}</button></div></div>`;
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">${esc(d.title)}</h2><button class="ibtn" id="rn">${ic("pencil",19)}</button><button class="ibtn danger" id="dl">${ic("trash",19)}</button></div>
  <div class="pics">${pic("front","फ्रंट")}${p.back?pic("back","बैक"):`<button class="pic empty" id="ab">${ic("plus",26)}बैक साइड जोड़ो</button>`}</div>
  <div class="sec-title">PDF सेटिंग · A4</div>
  ${p.back?`<div class="seg"><button data-l="one" class="on">एक पेज पर</button><button data-l="sep">अलग पेज</button><button data-l="full">पूरा पेज</button></div>`:""}
  <label class="sw"><span>${ic("key",18)} PDF पर पासवर्ड लगाओ</span><input type="checkbox" id="pwc" ${localStorage.pw?"checked":""}><i></i></label>
  <div class="bar"><button class="btn ghost" id="ps">${ic("share",19)} PDF शेयर</button><button class="btn gold" id="pv">${ic("printer",19)} PDF देखो / प्रिंट</button></div>`);
  $("bk").onclick=()=>section(d.section);
  app.querySelectorAll(".seg button").forEach(b=>b.onclick=()=>{lay=b.dataset.l;app.querySelectorAll(".seg button").forEach(x=>x.classList.toggle("on",x===b))});
  app.querySelectorAll(".pic img").forEach(im=>im.onclick=()=>{const o=document.createElement("div");o.className="ov";o.innerHTML=`<img src="${im.src}" alt="">`;o.onclick=()=>o.remove();document.body.appendChild(o)});
  app.querySelectorAll(".pa button").forEach(b=>b.onclick=e=>{
    e.stopPropagation();const a=b.dataset.a,k=a.slice(1);
    if(a[0]==="s"){hold();V().share({data:p[k],name:d.title+"_"+k,mime:"image/jpeg"}).catch(()=>toast("शेयर नहीं हुआ"))}
    else replacePhoto(id,k);
  });
  if($("ab"))$("ab").onclick=()=>replacePhoto(id,"back");
  const pdf=async mode=>{
    let pw;if($("pwc").checked){pw=await getPw();if(!pw)return}
    hold();
    V().pdf({images:p.back?[p.front,p.back]:[p.front],layout:p.back?lay:"one",name:d.title,mode,password:pw}).catch(()=>toast("PDF नहीं खुला"));
  };
  $("pv").onclick=()=>pdf("view");
  $("ps").onclick=()=>pdf("send");
  $("rn").onclick=async()=>{const t=prompt("नया नाम",d.title);if(t&&t.trim()){d.title=t.trim();await dbPut(d);detail(id)}};
  $("dl").onclick=async()=>{if(confirm("पक्का डिलीट करना है?")){await dbDel(id);section(d.section)}};
}

// ----- PDF password, photo replace, PIN change -----
async function setPw(){
  const p=prompt("PDF / बैकअप का पासवर्ड सेट करो (कम से कम 4 अक्षर)");
  if(!p||p.length<4){toast("पासवर्ड सेट नहीं हुआ");return null}
  localStorage.pw=b64(await enc(key,te.encode(p)));
  toast("पासवर्ड सेट हो गया");return p;
}
async function getPw(){
  if(localStorage.pw)return td.decode(await dec(key,unb64(localStorage.pw)));
  return setPw();
}
function replacePhoto(id,side){
  const cam=confirm("कैमरा से फोटो लेनी है?\nOK = कैमरा, Cancel = गैलरी");
  hold();
  const i=document.createElement("input");i.type="file";i.accept="image/*";if(cam)i.capture="environment";
  i.onchange=async()=>{
    const f=i.files[0];if(!f)return;
    const d=await dbGet(id);const p=JSON.parse(td.decode(await dec(key,d.enc)));
    p[side]=await shrink(f);
    d.enc=await enc(key,te.encode(JSON.stringify(p)));await dbPut(d);
    toast("फोटो बदल गई");detail(id);
  };
  i.click();
}
async function changePin(){
  const old=prompt("पुराना PIN डालो");if(!old)return;
  try{await dec(await derive(old,unb64(localStorage.salt)),unb64(localStorage.chk))}catch(e){return toast("पुराना PIN गलत है")}
  const n1=prompt("नया PIN डालो (4–8 अंक)");
  if(!n1||!/^\d{4,8}$/.test(n1))return toast("PIN 4 से 8 अंक का होना चाहिए");
  if(prompt("नया PIN फिर से डालो")!==n1)return toast("PIN मैच नहीं हुआ");
  const salt=crypto.getRandomValues(new Uint8Array(16)),nk=await derive(n1,salt);
  for(const d of await dbAll()){d.enc=await enc(nk,await dec(key,d.enc));await dbPut(d)}
  if(localStorage.pw)localStorage.pw=b64(await enc(nk,await dec(key,unb64(localStorage.pw))));
  localStorage.salt=b64(salt);localStorage.chk=b64(await enc(nk,te.encode("VAULTX")));localStorage.len=n1.length;
  key=nk;
  if(bioOn())enableBio(n1);
  toast("PIN बदल गया");
}

// ----- settings / backup / restore -----
async function ensureFolder(){hold();let f=await V().folder();if(!f.uri)f=await V().pickFolder();return f}
async function backup(){
  try{
    await ensureFolder();
    await V().write({name:"vault.meta",data:b64(te.encode(JSON.stringify({salt:localStorage.salt,chk:localStorage.chk,len:localStorage.len})))});
    const pw=await getPw();if(!pw)return toast("पहले पासवर्ड सेट करो");
    const docs=await dbAll();
    for(const d of docs){
      const rec=JSON.stringify({id:d.id,section:d.section,title:d.title,ts:d.ts,enc:b64(d.enc)});
      await V().write({name:d.id+".vx",data:b64(await enc(key,te.encode(rec)))});
      const pl=JSON.parse(td.decode(await dec(key,d.enc)));
      await V().pdf({images:pl.back?[pl.front,pl.back]:[pl.front],layout:"one",name:d.title+"_"+d.id.slice(0,4),password:pw,toFolder:true});
    }
    toast(docs.length+" डॉक्यूमेंट का बैकअप हो गया");
  }catch(e){toast("बैकअप नहीं हुआ")}
}
async function restore(){
  try{
    await ensureFolder();
    const names=(await V().list()).names;
    if(!names.includes("vault.meta"))return toast("इस फोल्डर में बैकअप नहीं मिला");
    const m=JSON.parse(td.decode(unb64((await V().read({name:"vault.meta"})).data)));
    const pw=prompt("बैकअप के समय वाला PIN डालो");if(!pw)return;
    const ok=await derive(pw,unb64(m.salt));
    try{if(td.decode(await dec(ok,unb64(m.chk)))!=="VAULTX")throw 0}catch(e){return toast("PIN गलत है")}
    let n=0;
    for(const nm of names.filter(x=>x.endsWith(".vx"))){
      const r=JSON.parse(td.decode(await dec(ok,unb64((await V().read({name:nm})).data))));
      const inner=await dec(ok,unb64(r.enc));
      r.enc=await enc(key,inner);await dbPut(r);n++;
    }
    toast(n+" डॉक्यूमेंट रिस्टोर हुए");
  }catch(e){toast("रिस्टोर नहीं हुआ")}
}
function settings(){
  const row=(id,icn,t,s,h,cls="")=>`<button class="set ${cls}" id="${id}" style="--h:${h}"><span class="tile sm">${ic(icn,20)}</span><span class="ct"><b>${t}</b><small>${s}</small></span>${ic("chev",18)}</button>`;
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">सेटिंग्स</h2></div>
  <div class="sec-title">सुरक्षा</div>
  <div class="sets">${row("b4","fingerprint","फिंगरप्रिंट",bioOn()?"चालू है · दोबारा सेट करो":"उँगली से लॉक खोलो",40)}
  ${row("b7","lock","PIN बदलो","नया PIN बनाओ",215)}
  ${row("b6","key","PDF / बैकअप पासवर्ड",localStorage.pw?"पासवर्ड बदलो":"पासवर्ड सेट करो",265)}</div>
  <div class="sec-title" style="margin-top:22px">बैकअप</div>
  <div class="sets">${row("b1","down","बैकअप अभी लो","encrypted फाइलें + पासवर्ड वाली PDF",175)}
  ${row("b2","refresh","बैकअप से रिस्टोर करो","पुराना बैकअप वापस लाओ",345)}
  ${row("b3","folder","बैकअप फोल्डर बदलो","दूसरा फोल्डर चुनो",215)}</div>
  <div class="sets" style="margin-top:22px">${row("b5","power","अभी लॉक करो","ऐप तुरंत लॉक हो जाएगा",0,"danger")}</div>`);
  $("bk").onclick=home;
  $("b1").onclick=backup;
  $("b2").onclick=restore;
  $("b3").onclick=async()=>{hold();try{await V().pickFolder();toast("फोल्डर सेट हो गया")}catch(e){}};
  $("b4").onclick=async()=>{
    const ok=await V().bioAvailable().then(r=>r.ok).catch(()=>false);
    if(!ok)return toast("इस फ़ोन में फिंगरप्रिंट उपलब्ध नहीं");
    const pin=prompt("अपना PIN डालो");if(!pin)return;
    try{const k=await derive(pin,unb64(localStorage.salt));await dec(k,unb64(localStorage.chk));await enableBio(pin);settings()}catch(e){toast("PIN गलत है")}
  };
  $("b6").onclick=async()=>{if(await setPw())settings()};
  $("b7").onclick=changePin;
  $("b5").onclick=lock;
}

// शुरू में हमेशा लॉक
lockUI("");
if(localStorage.chk&&bioOn())setTimeout(bioUnlock,300);
