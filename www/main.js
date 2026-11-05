// ===== Vault X =====
// सेक्शन यहाँ बदलो: [id, नाम, आइकन]
const SECTIONS=[["identity","Identity (पहचान)","🪪"],["bank","Bank (बैंक)","🏦"],["education","Education (शिक्षा)","🎓"],["medical","Medical (मेडिकल)","🩺"],["other","Other Documents (अन्य)","📁"]];

const V=()=>Capacitor.Plugins.Vault;
const app=document.getElementById("app");
const esc=t=>String(t).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const te=new TextEncoder(),td=new TextDecoder();
let key=null,busy=false,inExt=false,cur={};

function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),2500)}
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
function lock(){key=null;try{V().wipe()}catch(e){}lockUI("")}
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
  lockUI("गलत PIN ❌");
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
  const setup=!localStorage.chk,L=+localStorage.len;let pin="",first=null,note=setup?"नया PIN बनाओ (4–8 अंक)":(msg||"PIN डालो");
  const draw=()=>{
    const n=setup?Math.max(4,pin.length):L;
    app.innerHTML=`<div class="lock"><h1>🔐 Vault X</h1><p>${esc(note)}</p><div class="dots">${Array.from({length:n},(_,i)=>`<i class="${i<pin.length?"on":""}"></i>`).join("")}</div><div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,setup?"OK":(bioOn()?"👆":"")].map(k=>`<button data-k="${k}">${k}</button>`).join("")}</div></div>`;
    app.querySelectorAll(".pad button").forEach(b=>b.onclick=()=>press(b.dataset.k));
  };
  const press=k=>{
    if(!k)return;
    if(k==="⌫")pin=pin.slice(0,-1);
    else if(k==="👆")return bioUnlock();
    else if(k==="OK"){
      if(pin.length<4){note="कम से कम 4 अंक";return draw()}
      if(first===null){first=pin;pin="";note="PIN फिर से डालो";return draw()}
      if(first!==pin){first=null;pin="";note="मैच नहीं हुआ, फिर से बनाओ";return draw()}
      return createPin(pin);
    }
    else if(pin.length<(setup?8:L))pin+=k;
    draw();
    if(!setup&&pin.length===L)tryPin(pin);
  };
  draw();
}

// ----- screens -----
function home(){
  app.innerHTML=`<header><h2>Vault X</h2><button id="st">⚙️</button></header><div class="grid">${SECTIONS.map(s=>`<button class="card" data-s="${s[0]}"><span>${s[2]}</span>${s[1]}</button>`).join("")}</div>`;
  app.querySelectorAll(".card").forEach(b=>b.onclick=()=>section(b.dataset.s));
  document.getElementById("st").onclick=settings;
}
async function section(id){
  const sec=SECTIONS.find(s=>s[0]===id);
  const docs=(await dbAll()).filter(d=>d.section===id).sort((a,b)=>b.ts-a.ts);
  app.innerHTML=`<header><button id="bk">←</button><h2>${sec[2]} ${esc(sec[1])}</h2></header><div class="list">${docs.length?docs.map(d=>`<button class="row" data-id="${d.id}">📄 ${esc(d.title)}</button>`).join(""):'<div class="empty">अभी कोई डॉक्यूमेंट नहीं</div>'}</div><div class="body"><button class="btn" id="add">➕ डॉक्यूमेंट जोड़ो</button></div>`;
  document.getElementById("bk").onclick=home;
  document.getElementById("add").onclick=()=>addForm(id);
  app.querySelectorAll(".row").forEach(b=>b.onclick=()=>detail(b.dataset.id));
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
    const p=document.getElementById("p_"+side);p.src="data:image/jpeg;base64,"+cur[side];p.style.display="block";
  };
  i.click();
}
function addForm(sec){
  cur={front:null,back:null};
  const side=(k,t)=>`<div class="side"><h4>${t}</h4><img id="p_${k}" style="display:none;width:100%;border-radius:10px;margin-bottom:8px"><div class="two"><button data-k="${k}" data-c="1">📷 कैमरा</button><button data-k="${k}" data-c="0">🖼️ गैलरी</button></div></div>`;
  app.innerHTML=`<header><button id="bk">←</button><h2>नया डॉक्यूमेंट</h2></header><div class="body"><input type="text" id="tt" placeholder="नाम (जैसे: आधार कार्ड)">${side("front","फ्रंट साइड")}${side("back","बैक साइड (ज़रूरी नहीं)")}<button class="btn" id="sv">💾 सेव करो</button></div>`;
  document.getElementById("bk").onclick=()=>section(sec);
  app.querySelectorAll(".two button").forEach(b=>b.onclick=()=>pick(b.dataset.k,b.dataset.c==="1"));
  document.getElementById("sv").onclick=async()=>{
    const title=document.getElementById("tt").value.trim();
    if(!title)return toast("नाम डालो");
    if(!cur.front)return toast("फ्रंट साइड की फोटो ज़रूरी है");
    const payload=JSON.stringify({front:cur.front,back:cur.back});
    await dbPut({id:crypto.randomUUID(),section:sec,title,ts:Date.now(),enc:await enc(key,te.encode(payload))});
    toast("सेव हो गया 🔒");section(sec);
  };
}
async function detail(id){
  const d=await dbGet(id);
  let p;try{p=JSON.parse(td.decode(await dec(key,d.enc)))}catch(e){return toast("खुल नहीं पाया")}
  const img=(s,t)=>`<img alt="${t}" src="data:image/jpeg;base64,${s}">`;
  app.innerHTML=`<header><button id="bk">←</button><h2>${esc(d.title)}</h2></header><div class="body">${img(p.front,"front")}${p.back?img(p.back,"back"):""}
  ${p.back?`<label><input type="radio" name="lay" value="one" checked> एक पेज पर फ्रंट + बैक</label><label><input type="radio" name="lay" value="sep"> अलग-अलग पेज पर (फ्रंट एक पेज, बैक दूसरा)</label><label><input type="radio" name="lay" value="full"> पूरे पेज पर, आगे-पीछे (बड़े डॉक्यूमेंट के लिए)</label><p style="color:var(--mu);font-size:12px;margin:2px 0 8px">PDF हमेशा A4 साइज़ में बनेगा</p>`:""}
  <label><input type="checkbox" id="pwc" ${localStorage.pw?"checked":""}> 🔐 PDF पर पासवर्ड लगाओ</label><button class="btn" id="pv">📄 PDF बनाओ / प्रिंट</button><button class="btn alt" id="ps">📤 PDF शेयर करो</button>
  <button class="btn alt" id="sf">🖼️ फ्रंट शेयर करो</button>${p.back?'<button class="btn alt" id="sb">🖼️ बैक शेयर करो</button>':""}
  <button class="btn alt" id="rn">✏️ नाम बदलो</button><button class="btn alt" id="rf">🔄 फ्रंट फोटो बदलो</button><button class="btn alt" id="rb">🔄 बैक फोटो ${p.back?"बदलो":"जोड़ो"}</button><button class="btn red" id="dl">🗑️ डिलीट</button></div>`;
  document.getElementById("bk").onclick=()=>section(d.section);
  const pdf=async mode=>{let pw;if(document.getElementById("pwc").checked){pw=await getPw();if(!pw)return}hold();const lay=(document.querySelector("input[name=lay]:checked")||{}).value||"one";
    V().pdf({images:p.back?[p.front,p.back]:[p.front],layout:lay,name:d.title,mode,password:pw}).catch(()=>toast("PDF नहीं खुला"))};
  document.getElementById("pv").onclick=()=>pdf("view");
  document.getElementById("ps").onclick=()=>pdf("send");
  const shr=(data,n)=>{hold();V().share({data,name:n,mime:"image/jpeg"}).catch(()=>toast("शेयर नहीं हुआ"))};
  document.getElementById("sf").onclick=()=>shr(p.front,d.title+"_front");
  if(p.back)document.getElementById("sb").onclick=()=>shr(p.back,d.title+"_back");
  document.getElementById("rn").onclick=async()=>{const t=prompt("नया नाम",d.title);if(t&&t.trim()){d.title=t.trim();await dbPut(d);detail(id)}};
  document.getElementById("rf").onclick=()=>replacePhoto(id,"front");
  document.getElementById("rb").onclick=()=>replacePhoto(id,"back");
  document.getElementById("dl").onclick=async()=>{if(confirm("पक्का डिलीट करना है?")){await dbDel(id);section(d.section)}};
}

// ----- PDF password, photo replace, PIN change -----
async function setPw(){
  const p=prompt("PDF / बैकअप का पासवर्ड सेट करो (कम से कम 4 अक्षर)");
  if(!p||p.length<4){toast("पासवर्ड सेट नहीं हुआ");return null}
  localStorage.pw=b64(await enc(key,te.encode(p)));
  toast("पासवर्ड सेट हो गया ✅");return p;
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
    toast("फोटो बदल गई ✅");detail(id);
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
  toast("PIN बदल गया ✅");
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
    toast(docs.length+" डॉक्यूमेंट का बैकअप हो गया ✅");
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
    toast(n+" डॉक्यूमेंट रिस्टोर हुए ✅");
  }catch(e){toast("रिस्टोर नहीं हुआ")}
}
function settings(){
  app.innerHTML=`<header><button id="bk">←</button><h2>सेटिंग्स</h2></header><div class="body">
  <button class="btn" id="b1">💾 बैकअप अभी लो</button>
  <button class="btn alt" id="b2">♻️ बैकअप से रिस्टोर करो</button>
  <button class="btn alt" id="b3">📁 बैकअप फोल्डर बदलो</button>
  <button class="btn alt" id="b4">👆 फिंगरप्रिंट चालू करो</button>
  <button class="btn alt" id="b6">🔑 PDF / बैकअप पासवर्ड ${localStorage.pw?"बदलो":"सेट करो"}</button>
  <button class="btn alt" id="b7">🔢 PIN बदलो</button>
  <button class="btn alt" id="b5">🔒 अभी लॉक करो</button></div>`;
  document.getElementById("b6").onclick=async()=>{if(await setPw())settings()};
  document.getElementById("b7").onclick=changePin;
  document.getElementById("bk").onclick=home;
  document.getElementById("b1").onclick=backup;
  document.getElementById("b2").onclick=restore;
  document.getElementById("b3").onclick=async()=>{hold();try{await V().pickFolder();toast("फोल्डर सेट हो गया")}catch(e){}};
  document.getElementById("b4").onclick=async()=>{
    const ok=await V().bioAvailable().then(r=>r.ok).catch(()=>false);
    if(!ok)return toast("इस फ़ोन में फिंगरप्रिंट उपलब्ध नहीं");
    const pin=prompt("अपना PIN डालो");if(!pin)return;
    try{const k=await derive(pin,unb64(localStorage.salt));await dec(k,unb64(localStorage.chk));enableBio(pin)}catch(e){toast("PIN गलत है")}
  };
  document.getElementById("b5").onclick=lock;
}

// शुरू में हमेशा लॉक
lockUI("");
if(localStorage.chk&&bioOn())setTimeout(bioUnlock,300);
