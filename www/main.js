// ===== Vault X =====
const LS=localStorage;
let LANG=LS.lang||"hi";
const EN={
"सुरक्षित डॉक्यूमेंट लॉकर":"Secure Document Locker","अपना PIN डालो":"Enter your PIN","नया PIN बनाओ (4–8 अंक)":"Create a new PIN (4–8 digits)",
"कम से कम 4 अंक":"At least 4 digits","PIN फिर से डालो":"Re-enter PIN","मैच नहीं हुआ, फिर से बनाओ":"Did not match, try again",
"गलत PIN, फिर से कोशिश करो":"Wrong PIN, try again","30 सेकंड बाद कोशिश करो":"Try again after 30 seconds","फिंगरप्रिंट बदल गया, PIN डालो":"Fingerprint changed, enter PIN",
"फिंगरप्रिंट से भी खोलना चालू करूँ?":"Enable fingerprint unlock too?","AES-256 एन्क्रिप्टेड":"AES-256 encrypted",
"डॉक्यूमेंट सुरक्षित":"documents secured","आपका लॉकर सुरक्षित है":"Your locker is secure","सारे डॉक्यूमेंट इस फ़ोन में एन्क्रिप्टेड हैं":"All documents are encrypted on this phone",
"डॉक्यूमेंट जल्द एक्सपायर हो रहे हैं":"documents expiring soon","एक्सपायरी तारीख देख लो":"Please check the expiry dates",
"श्रेणियाँ":"Categories","डॉक्यूमेंट जोड़ो":"Add document","जोड़ो":"Add","खोजो…":"Search…","सब":"All","नतीजे":"Results","कुछ नहीं मिला":"Nothing found","मैं":"Me",
"आधार, PAN, लाइसेंस, वोटर ID":"Aadhaar, PAN, licence, voter ID","पासबुक, चेक, कार्ड, स्टेटमेंट":"Passbook, cheque, cards, statements","मार्कशीट, सर्टिफिकेट, डिग्री":"Marksheets, certificates, degrees",
"रिपोर्ट, पर्ची, बीमा":"Reports, prescriptions, insurance","बाकी सारे डॉक्यूमेंट":"Everything else","अपनी श्रेणी":"Custom category",
"अभी कोई डॉक्यूमेंट नहीं":"No documents yet","नीचे बटन दबाकर पहला जोड़ो":"Tap the button below to add the first",
"नया डॉक्यूमेंट":"New document","डॉक्यूमेंट का नाम (जैसे: आधार कार्ड)":"Document name (e.g. Aadhaar card)","नंबर (वैकल्पिक) जैसे आधार नंबर":"Number (optional), e.g. Aadhaar no.",
"एक्सपायरी तारीख (वैकल्पिक)":"Expiry date (optional)","श्रेणी":"Category","सदस्य":"Member","स्कैन सेटिंग":"Scan settings","ऑटो-क्रॉप":"Auto-crop","ओरिजिनल":"Original","साफ़":"Clean","B&W":"B&W",
"पेज":"Pages","अभी कोई पेज नहीं":"No pages yet","कैमरा":"Camera","गैलरी":"Gallery","सेव करो":"Save","पेज जोड़ो":"Add page","प्रोसेस हो रहा है…":"Processing…",
"डॉक्यूमेंट का नाम डालो":"Enter a document name","कम से कम एक पेज ज़रूरी है":"At least one page is required","सुरक्षित सेव हो गया":"Saved securely",
"फ्रंट":"Front","बैक":"Back","नंबर":"Number","नंबर जोड़ो":"Add number","एक्सपायरी":"Expiry","एक्सपायरी जोड़ो":"Add expiry","कॉपी हो गया":"Copied","नंबर बदलो":"Edit number",
"एक्सपायर हो गया":"Expired","दिन बाकी":"days left","PDF सेटिंग · A4":"PDF settings · A4","एक पेज पर":"One page","अलग पेज":"Separate","पूरा पेज":"Full page",
"PDF और इमेज पर पासवर्ड लगाओ":"Password for PDF & images","PDF शेयर":"Share PDF","इमेज शेयर":"Share images","शेयर नहीं हुआ":"Could not share","PDF नहीं खुला":"PDF did not open",
"नया नाम":"New name","पक्का डिलीट करना है?":"Delete for sure?","खुल नहीं पाया":"Could not open",
"PDF / बैकअप का पासवर्ड सेट करो (कम से कम 4 अक्षर)":"Set a PDF / backup password (min 4 characters)","पासवर्ड सेट नहीं हुआ":"Password not set","पासवर्ड सेट हो गया":"Password set",
"कैमरा से फोटो लेनी है?\nOK = कैमरा, Cancel = गैलरी":"Take photo with camera?\nOK = Camera, Cancel = Gallery","फोटो बदल गई":"Photo replaced","पेज जुड़ गया":"Page added",
"पुराना PIN डालो":"Enter old PIN","पुराना PIN गलत है":"Old PIN is wrong","नया PIN डालो (4–8 अंक)":"Enter new PIN (4–8 digits)","PIN 4 से 8 अंक का होना चाहिए":"PIN must be 4–8 digits",
"नया PIN फिर से डालो":"Re-enter new PIN","PIN मैच नहीं हुआ":"PINs did not match","PIN बदल गया":"PIN changed",
"पहले पासवर्ड सेट करो":"Set the password first","डॉक्यूमेंट का बैकअप हो गया":"documents backed up","बैकअप नहीं हुआ":"Backup failed","इस फोल्डर में बैकअप नहीं मिला":"No backup found in this folder",
"बैकअप के समय वाला PIN डालो":"Enter the PIN used at backup time","PIN गलत है":"PIN is wrong","डॉक्यूमेंट रिस्टोर हुए":"documents restored","रिस्टोर नहीं हुआ":"Restore failed",
"सेटिंग्स":"Settings","सुरक्षा":"Security","फिंगरप्रिंट":"Fingerprint","चालू है · दोबारा सेट करो":"On · set again","उँगली से लॉक खोलो":"Unlock with your finger",
"PIN बदलो":"Change PIN","नया PIN बनाओ":"Set a new PIN","PDF / बैकअप पासवर्ड":"PDF / backup password","पासवर्ड बदलो":"Change password","पासवर्ड सेट करो":"Set password",
"घुसपैठिया फोटो चालू":"Intruder photo on","घुसपैठिया फोटो बंद":"Intruder photo off","3 बार गलत PIN पर चुपचाप फोटो":"Silent photo after 3 wrong PINs","चालू है":"On","बंद है":"Off",
"घुसपैठिया फोटो देखो":"View intruder photos","गलत PIN डालने वालों की फोटो":"Photos of wrong-PIN attempts","अभी कोई फोटो नहीं":"No photos yet","सब हटाओ":"Delete all","सारी फोटो हटानी हैं?":"Delete all photos?",
"बैकअप":"Backup","बैकअप अभी लो":"Back up now","encrypted फाइलें + पासवर्ड वाली PDF और इमेज ZIP":"Encrypted files, PDF & image ZIP","बैकअप से रिस्टोर करो":"Restore from backup",
"पुराना बैकअप वापस लाओ":"Bring back an old backup","बैकअप फोल्डर बदलो":"Change backup folder","दूसरा फोल्डर चुनो":"Choose another folder","फोल्डर सेट हो गया":"Folder set",
"सामान्य":"General","भाषा":"Language","हिंदी":"Hindi","श्रेणियाँ संभालो":"Manage categories","नई जोड़ो, नाम बदलो, हटाओ":"Add, rename, remove","परिवार के सदस्य":"Family members",
"हर सदस्य के अलग डॉक्यूमेंट":"Separate documents for each person","अभी लॉक करो":"Lock now","ऐप तुरंत लॉक हो जाएगा":"The app will lock immediately",
"इस फ़ोन में फिंगरप्रिंट उपलब्ध नहीं":"Fingerprint not available on this phone","अपना PIN डालो ":"Enter your PIN","फिंगरप्रिंट चालू हो गया":"Fingerprint enabled","फिंगरप्रिंट चालू नहीं हुआ":"Could not enable fingerprint",
"नई श्रेणी का नाम":"New category name","नया सदस्य (नाम)":"New member (name)","नाम बदलो":"Rename","इस श्रेणी में डॉक्यूमेंट हैं, पहले उन्हें हटाओ":"This category has documents, remove them first",
"इस सदस्य के डॉक्यूमेंट हैं, पहले उन्हें हटाओ":"This member has documents, remove them first","कम से कम एक चाहिए":"At least one is required","नई श्रेणी":"New category","नया सदस्य":"New member",
"30 दिन में एक्सपायर होगा":"expires in 30 days","7 दिन में एक्सपायर होगा":"expires in 7 days","आज एक्सपायर हो रहा है":"expires today","फोटो नहीं खुली":"Could not open photo"
};
const t=s=>(LANG==="en"&&EN[s])||s;
document.documentElement.lang=LANG;

const load=(k,d)=>{try{return JSON.parse(LS[k])||d}catch(e){return d}};
const store=(k,v)=>{LS[k]=JSON.stringify(v)};
const DEF_CATS=[
{id:"identity",name:"Identity",icon:"id",sub:"आधार, PAN, लाइसेंस, वोटर ID",hue:40},
{id:"bank",name:"Bank",icon:"bank",sub:"पासबुक, चेक, कार्ड, स्टेटमेंट",hue:175},
{id:"education",name:"Education",icon:"cap",sub:"मार्कशीट, सर्टिफिकेट, डिग्री",hue:265},
{id:"medical",name:"Medical",icon:"heart",sub:"रिपोर्ट, पर्ची, बीमा",hue:345},
{id:"other",name:"Other Documents",icon:"folder",sub:"बाकी सारे डॉक्यूमेंट",hue:215}];
let CATS=load("cats",DEF_CATS),MEMBERS=load("members",[{id:"me",name:"मैं"}]),MFILTER="all";
const catOf=id=>CATS.find(c=>c.id===id)||CATS[CATS.length-1]||DEF_CATS[4];
const memOf=id=>MEMBERS.find(m=>m.id===id)||MEMBERS[0];

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
back:'<path d="M15 5l-7 7 7 7"/>',chev:'<path d="M9 5l7 7-7 7"/>',
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
power:'<path d="M12 3v9"/><path d="M6.3 6.3a8 8 0 1 0 11.4 0"/>',
search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',
copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-4 3.2-6 6.5-6s5.9 2 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17.5 14c2.5.3 4 2 4.5 5"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
alert:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.5"/>'
};
const ic=(n,s=22)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;

const V=()=>Capacitor.Plugins.Vault;
const app=document.getElementById("app");
const esc=s=>String(s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const te=new TextEncoder(),td=new TextDecoder();
let key=null,cur={};
const view=h=>{app.innerHTML=`<div class="screen">${h}</div>`;window.scrollTo(0,0)};
const $=id=>document.getElementById(id);
const toast=m=>{const e=$("toast");e.textContent=m;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),2500)};
const dt=ts=>new Date(ts).toLocaleDateString(LANG==="en"?"en-IN":"hi-IN",{day:"numeric",month:"short",year:"numeric"});
const daysLeft=e=>e?Math.ceil((new Date(e+"T23:59:59")-Date.now())/864e5):null;
const expTag=e=>{const d=daysLeft(e);if(d===null)return"";if(d<0)return`<span class="tag red">${t("एक्सपायर हो गया")}</span>`;if(d<=30)return`<span class="tag amber">${d} ${t("दिन बाकी")}</span>`;return""};
const norm=p=>p.pages?p:{pages:[p.front,p.back].filter(Boolean),number:""};

// ----- बाहरी स्क्रीन (कैमरा/गैलरी/शेयर) खुलते समय ऐप लॉक न हो -----
let extUntil=0,bgAt=0,ht=null;
function hold(){extUntil=Date.now()+180000;bgAt=0;clearTimeout(ht);ht=setTimeout(()=>{if(!bgAt)extUntil=0},6000)}

// ----- crypto (AES-GCM, PBKDF2) -----
const b64=u=>{u=new Uint8Array(u);let s="";for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(0,u.subarray(i,i+8192));return btoa(s)};
const unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function derive(pin,salt){const m=await crypto.subtle.importKey("raw",te.encode(pin),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:250000,hash:"SHA-256"},m,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])}
async function enc(k,bytes){const iv=crypto.getRandomValues(new Uint8Array(12));const ct=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv},k,bytes));const o=new Uint8Array(12+ct.length);o.set(iv);o.set(ct,12);return o}
async function dec(k,o){o=new Uint8Array(o);return new Uint8Array(await crypto.subtle.decrypt({name:"AES-GCM",iv:o.slice(0,12)},k,o.slice(12)))}
const openPayload=async d=>norm(JSON.parse(td.decode(await dec(key,d.enc))));
const sealPayload=p=>enc(key,te.encode(JSON.stringify(p)));

// ----- storage (IndexedDB, सब कुछ encrypted) -----
const dbp=new Promise(r=>{const q=indexedDB.open("vaultx",1);q.onupgradeneeded=()=>q.result.createObjectStore("docs",{keyPath:"id"});q.onsuccess=()=>r(q.result)});
const tx=async(m,f)=>{const d=await dbp;return new Promise((ok,no)=>{const t=d.transaction("docs",m),r=f(t.objectStore("docs"));t.oncomplete=()=>ok(r.result);t.onerror=()=>no(t.error)})};
const dbAll=()=>tx("readonly",s=>s.getAll());
const dbGet=id=>tx("readonly",s=>s.get(id));
const dbPut=d=>tx("readwrite",s=>s.put(d));
const dbDel=id=>tx("readwrite",s=>s.delete(id));

// ----- स्कैन: ऑटो-क्रॉप + साफ़ फ़िल्टर -----
const loadImg=b=>new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src="data:image/jpeg;base64,"+b});
function otsu(hist,total){let sum=0;for(let i=0;i<256;i++)sum+=i*hist[i];let sB=0,wB=0,max=0,thr=0;for(let i=0;i<256;i++){wB+=hist[i];if(!wB)continue;const wF=total-wB;if(!wF)break;sB+=i*hist[i];const mB=sB/wB,mF=(sum-sB)/wF,v=wB*wF*(mB-mF)*(mB-mF);if(v>max){max=v;thr=i}}return thr}
function detectBox(img){
  const s=320/Math.max(img.width,img.height),w=Math.max(8,Math.round(img.width*s)),h=Math.max(8,Math.round(img.height*s));
  const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");x.drawImage(img,0,0,w,h);
  const d=x.getImageData(0,0,w,h).data;
  let br=0,bg=0,bb=0,n=0;const add=(px,py)=>{const i=(py*w+px)*4;br+=d[i];bg+=d[i+1];bb+=d[i+2];n++};
  for(let i=0;i<w;i++){add(i,0);add(i,h-1)}for(let j=0;j<h;j++){add(0,j);add(w-1,j)}
  br/=n;bg/=n;bb/=n;
  const dist=new Uint8Array(w*h),hist=new Uint32Array(256);
  for(let i=0;i<w*h;i++){const q=Math.min(255,Math.round((Math.abs(d[i*4]-br)+Math.abs(d[i*4+1]-bg)+Math.abs(d[i*4+2]-bb))/3));dist[i]=q;hist[q]++}
  const thr=Math.max(18,otsu(hist,w*h));
  const rows=new Uint32Array(h),cols=new Uint32Array(w);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(dist[j*w+i]>thr){rows[j]++;cols[i]++}
  const rt=w*0.1,ct=h*0.1;let y0=0,y1=h-1,x0=0,x1=w-1;
  while(y0<h&&rows[y0]<rt)y0++;while(y1>y0&&rows[y1]<rt)y1--;while(x0<w&&cols[x0]<ct)x0++;while(x1>x0&&cols[x1]<ct)x1--;
  if(x1-x0<w*0.2||y1-y0<h*0.2)return null;
  const area=((x1-x0+1)*(y1-y0+1))/(w*h);if(area<0.25||area>0.97)return null;
  const px=0.015*w,py=0.015*h;x0=Math.max(0,x0-px);y0=Math.max(0,y0-py);x1=Math.min(w-1,x1+px);y1=Math.min(h-1,y1+py);
  const k=img.width/w;return{x:Math.round(x0*k),y:Math.round(y0*k),w:Math.round((x1-x0+1)*k),h:Math.round((y1-y0+1)*k)};
}
function cleanFilter(x,w,h){
  const im=x.getImageData(0,0,w,h),d=im.data,hist=new Uint32Array(256);
  for(let i=0;i<d.length;i+=4)hist[(d[i]*77+d[i+1]*150+d[i+2]*29)>>8]++;
  const N=w*h;let a=0,lo=0,hi=255;
  for(let v=0;v<256;v++){a+=hist[v];if(a>=N*.01){lo=v;break}}a=0;
  for(let v=255;v>=0;v--){a+=hist[v];if(a>=N*.01){hi=v;break}}
  if(hi-lo<30)return;const k=255/(hi-lo);
  for(let i=0;i<d.length;i+=4){d[i]=Math.max(0,Math.min(255,(d[i]-lo)*k));d[i+1]=Math.max(0,Math.min(255,(d[i+1]-lo)*k));d[i+2]=Math.max(0,Math.min(255,(d[i+2]-lo)*k))}
  x.putImageData(im,0,0);
}
function bwFilter(x,w,h){
  const im=x.getImageData(0,0,w,h),d=im.data,g=new Uint8Array(w*h);
  for(let i=0;i<w*h;i++)g[i]=(d[i*4]*77+d[i*4+1]*150+d[i*4+2]*29)>>8;
  const W=w+1,I=new Float64Array(W*(h+1));
  for(let j=1;j<=h;j++){let r=0;for(let i=1;i<=w;i++){r+=g[(j-1)*w+i-1];I[j*W+i]=I[(j-1)*W+i]+r}}
  const R=Math.max(8,Math.round(Math.min(w,h)/16));
  for(let j=0;j<h;j++){const y0=Math.max(0,j-R),y1=Math.min(h-1,j+R);for(let i=0;i<w;i++){
    const x0=Math.max(0,i-R),x1=Math.min(w-1,i+R),c=(x1-x0+1)*(y1-y0+1);
    const s=I[(y1+1)*W+x1+1]-I[y0*W+x1+1]-I[(y1+1)*W+x0]+I[y0*W+x0];
    const v=g[j*w+i]>(s/c)*0.9?255:0,o=(j*w+i)*4;d[o]=d[o+1]=d[o+2]=v}}
  x.putImageData(im,0,0);
}
async function processImg(b,o){
  if(!o.crop&&o.filter==="orig")return b;
  const img=await loadImg(b);let sx=0,sy=0,sw=img.width,sh=img.height;
  if(o.crop){const bb=detectBox(img);if(bb){sx=bb.x;sy=bb.y;sw=bb.w;sh=bb.h}}
  const c=document.createElement("canvas");c.width=sw;c.height=sh;const x=c.getContext("2d");
  x.drawImage(img,sx,sy,sw,sh,0,0,sw,sh);
  if(o.filter==="clean")cleanFilter(x,sw,sh);else if(o.filter==="bw")bwFilter(x,sw,sh);
  return c.toDataURL("image/jpeg",0.88).split(",")[1];
}
async function shrink(file){
  const bmp=await createImageBitmap(file);
  const s=Math.min(1,1600/Math.max(bmp.width,bmp.height));
  const c=document.createElement("canvas");c.width=Math.round(bmp.width*s);c.height=Math.round(bmp.height*s);
  c.getContext("2d").drawImage(bmp,0,0,c.width,c.height);
  return c.toDataURL("image/jpeg",0.85).split(",")[1];
}
const scanOpts=()=>({crop:LS.crop!=="0",filter:LS.filter||"clean"});
function pickFile(cam){return new Promise(ok=>{hold();const i=document.createElement("input");i.type="file";i.accept="image/*";if(cam)i.capture="environment";i.onchange=()=>ok(i.files[0]||null);i.oncancel=()=>ok(null);i.click()})}
async function newPage(cam){const f=await pickFile(cam);if(!f)return null;const o=await shrink(f);return{o,p:await processImg(o,scanOpts())}}

// ----- एक्सपायरी रिमाइंडर -----
function scheduleReminders(docs){
  try{
    const items=[],now=Date.now();
    for(const d of docs){if(!d.exp)continue;const end=new Date(d.exp+"T09:00:00").getTime();
      [[30,"30 दिन में एक्सपायर होगा"],[7,"7 दिन में एक्सपायर होगा"],[0,"आज एक्सपायर हो रहा है"]].forEach(([n,m])=>{
        const at=end-n*864e5;if(at>now)items.push({key:d.id+"|"+n,time:at,title:"Vault X",text:d.title+" · "+t(m)})})}
    V().setReminders({items}).catch(()=>{});
  }catch(e){}
}

// ----- lock -----
const bioOn=()=>LS.bio==="1";
function lock(){key=null;document.querySelectorAll(".ov").forEach(o=>o.remove());try{V().wipe()}catch(e){}lockUI("")}
function onBg(){if(Date.now()<extUntil){if(!bgAt)bgAt=Date.now();return}lock()}
function onFg(){
  if(bgAt&&Date.now()-bgAt>300000&&key)lock();
  else if(bgAt)extUntil=Date.now()+5000;
  bgAt=0;
  if(!key&&LS.chk&&bioOn())bioUnlock();
}
document.addEventListener("visibilitychange",()=>document.hidden?onBg():onFg());
document.addEventListener("pause",onBg);
document.addEventListener("resume",onFg);

let fails=0,until=0,wrong=0;
async function tryPin(pin){
  if(Date.now()<until)return lockUI(t("30 सेकंड बाद कोशिश करो"));
  try{
    const k=await derive(pin,unb64(LS.salt));
    if(td.decode(await dec(k,unb64(LS.chk)))==="VAULTX"){key=k;fails=0;wrong=0;return home()}
  }catch(e){}
  wrong++;
  if(LS.intr==="1"&&wrong%3===0){try{V().intruderCapture().catch(()=>{})}catch(e){}}
  if(++fails>=5){until=Date.now()+30000;fails=0}
  lockUI(t("गलत PIN, फिर से कोशिश करो"));
}
async function bioUnlock(){
  try{const r=await V().bioUnlock();await tryPin(r.secret)}
  catch(e){if(String(e&&e.message||e).includes("invalid")){LS.bio="0";lockUI(t("फिंगरप्रिंट बदल गया, PIN डालो"))}}
}
async function enableBio(pin){
  try{await V().bioEnroll({secret:pin});LS.bio="1";toast(t("फिंगरप्रिंट चालू हो गया"))}
  catch(e){toast(t("फिंगरप्रिंट चालू नहीं हुआ"))}
}
async function createPin(pin){
  const salt=crypto.getRandomValues(new Uint8Array(16));
  key=await derive(pin,salt);
  LS.salt=b64(salt);LS.chk=b64(await enc(key,te.encode("VAULTX")));LS.len=pin.length;
  home();
  const ok=await V().bioAvailable().then(r=>r.ok).catch(()=>false);
  if(ok&&confirm(t("फिंगरप्रिंट से भी खोलना चालू करूँ?")))enableBio(pin);
}
function lockUI(msg){
  const setup=!LS.chk,L=+LS.len;let pin="",first=null,note=setup?t("नया PIN बनाओ (4–8 अंक)"):(msg||t("अपना PIN डालो")),bad=!!msg&&!setup;
  const draw=()=>{
    const n=setup?Math.max(4,pin.length):L;
    const left=setup?`<button class="key ghost" data-k="⌫">${ic("backspace",26)}</button>`:(bioOn()?`<button class="key ghost" data-k="bio">${ic("fingerprint",32)}</button>`:`<button class="key ghost" data-k=""></button>`);
    const right=setup?`<button class="key ghost" data-k="OK">${ic("check",30)}</button>`:`<button class="key ghost" data-k="⌫">${ic("backspace",26)}</button>`;
    app.innerHTML=`<div class="lock"><div class="logo">${ic("shield",38)}</div><h1>VAULT <b>X</b></h1><p class="sub">${t("सुरक्षित डॉक्यूमेंट लॉकर")}</p>
    <div class="dots">${Array.from({length:n},(_,i)=>`<i class="${i<pin.length?"on":""}"></i>`).join("")}</div>
    <p class="note ${bad?"err":""}">${esc(note)}</p>
    <div class="pad">${[1,2,3,4,5,6,7,8,9].map(k=>`<button class="key" data-k="${k}">${k}</button>`).join("")}${left}<button class="key" data-k="0">0</button>${right}</div>
    <div class="enc">${ic("lock",13)} ${t("AES-256 एन्क्रिप्टेड")}</div></div>`;
    app.querySelectorAll(".key").forEach(b=>b.onclick=()=>press(b.dataset.k));
  };
  const press=k=>{
    if(!k)return;
    if(navigator.vibrate)navigator.vibrate(8);
    bad=false;
    if(k==="⌫")pin=pin.slice(0,-1);
    else if(k==="bio")return bioUnlock();
    else if(k==="OK"){
      if(pin.length<4){note=t("कम से कम 4 अंक");bad=true;return draw()}
      if(first===null){first=pin;pin="";note=t("PIN फिर से डालो");return draw()}
      if(first!==pin){first=null;pin="";note=t("मैच नहीं हुआ, फिर से बनाओ");bad=true;return draw()}
      return createPin(pin);
    }
    else if(pin.length<(setup?8:L))pin+=k;
    draw();
    if(!setup&&pin.length===L)tryPin(pin);
  };
  draw();
}

// ----- होम + सर्च -----
let HD=[],Q="";
const docCard=d=>{const c=catOf(d.section);return`<button class="doc" data-id="${d.id}" style="--h:${c.hue}"><span class="tile">${ic("file",22)}</span><span class="ct"><b>${esc(d.title)}</b><small>${esc(c.name)}${MEMBERS.length>1?" · "+esc(t(memOf(d.member||"me").name)):""} · ${dt(d.ts)}</small></span>${expTag(d.exp)}${ic("chev",18)}</button>`};
const byMember=docs=>docs.filter(d=>MFILTER==="all"||(d.member||"me")===MFILTER);
function renderHB(){
  const q=Q.trim().toLowerCase(),docs=byMember(HD),box=$("hb");
  if(!q){
    box.innerHTML=`<div class="sec-title">${t("श्रेणियाँ")}</div><div class="cats">${CATS.map(c=>`<button class="cat" data-s="${c.id}" style="--h:${c.hue}"><span class="tile">${ic(c.icon,24)}</span><span class="ct"><b>${esc(c.name)}</b><small>${esc(t(c.sub||"अपनी श्रेणी"))}</small></span><span class="badge">${docs.filter(d=>d.section===c.id).length}</span>${ic("chev",18)}</button>`).join("")}</div>`;
    box.querySelectorAll(".cat").forEach(b=>b.onclick=()=>section(b.dataset.s));return;
  }
  const res=docs.filter(d=>(d.title+" "+catOf(d.section).name+" "+t(memOf(d.member||"me").name)).toLowerCase().includes(q)).sort((a,b)=>b.ts-a.ts);
  box.innerHTML=`<div class="sec-title">${t("नतीजे")} · ${res.length}</div>`+(res.length?`<div class="docs">${res.map(docCard).join("")}</div>`:`<div class="empty"><div class="ring">${ic("search",34)}</div>${t("कुछ नहीं मिला")}</div>`);
  box.querySelectorAll(".doc").forEach(b=>b.onclick=()=>detail(b.dataset.id));
}
async function home(){
  HD=await dbAll();scheduleReminders(HD);Q="";
  if(MFILTER!=="all"&&!MEMBERS.find(m=>m.id===MFILTER))MFILTER="all";
  const soon=HD.filter(d=>{const n=daysLeft(d.exp);return n!==null&&n<=30}).length;
  const mf=[{id:"all",name:t("सब")}].concat(MEMBERS.map(m=>({id:m.id,name:t(m.name)})));
  view(`<div class="top"><div class="brand"><div class="mini">${ic("shield",22)}</div><div><h2>Vault X</h2><span>${HD.length} ${t("डॉक्यूमेंट सुरक्षित")}</span></div></div><button class="ibtn" id="st">${ic("sliders",21)}</button></div>
  <div class="srch">${ic("search",19)}<input id="q" placeholder="${t("खोजो…")}" autocomplete="off"></div>
  ${soon?`<div class="hero warn"><div class="hi">${ic("alert",18)}</div><div><b>${soon} ${t("डॉक्यूमेंट जल्द एक्सपायर हो रहे हैं")}</b><span>${t("एक्सपायरी तारीख देख लो")}</span></div></div>`
  :`<div class="hero"><div class="hi">${ic("lock",18)}</div><div><b>${t("आपका लॉकर सुरक्षित है")}</b><span>${t("सारे डॉक्यूमेंट इस फ़ोन में एन्क्रिप्टेड हैं")}</span></div></div>`}
  ${MEMBERS.length>1?`<div class="chips" id="mf">${mf.map(m=>`<button class="chip ${MFILTER===m.id?"on":""}" data-m="${m.id}">${esc(m.name)}</button>`).join("")}</div>`:""}
  <div id="hb"></div>
  <button class="fab" id="add">${ic("plus",24)} ${t("डॉक्यूमेंट जोड़ो")}</button>`);
  $("st").onclick=settings;
  $("add").onclick=()=>addForm(CATS[0].id,true);
  $("q").oninput=e=>{Q=e.target.value;renderHB()};
  if($("mf"))$("mf").querySelectorAll(".chip").forEach(b=>b.onclick=()=>{MFILTER=b.dataset.m;home()});
  renderHB();
}
async function section(id){
  const c=catOf(id),docs=byMember(await dbAll()).filter(d=>d.section===id).sort((a,b)=>b.ts-a.ts);
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">${esc(c.name)}</h2><span class="badge">${docs.length}</span></div>
  ${docs.length?`<div class="docs">${docs.map(docCard).join("")}</div>`:`<div class="empty"><div class="ring" style="--h:${c.hue}">${ic(c.icon,34)}</div>${t("अभी कोई डॉक्यूमेंट नहीं")}<br>${t("नीचे बटन दबाकर पहला जोड़ो")}</div>`}
  <button class="fab" id="add">${ic("plus",24)} ${t("जोड़ो")}</button>`);
  $("bk").onclick=home;$("add").onclick=()=>addForm(id);
  app.querySelectorAll(".doc").forEach(b=>b.onclick=()=>detail(b.dataset.id));
}

// ----- नया डॉक्यूमेंट (कई पेज) -----
function addForm(sec,fromHome){
  const o=scanOpts();
  cur={pages:[],sec,member:MFILTER!=="all"?MFILTER:"me",crop:o.crop,filter:o.filter};
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">${t("नया डॉक्यूमेंट")}</h2></div>
  <input class="fld" id="tt" placeholder="${t("डॉक्यूमेंट का नाम (जैसे: आधार कार्ड)")}" maxlength="60">
  <input class="fld" id="nn" style="margin-top:10px" placeholder="${t("नंबर (वैकल्पिक) जैसे आधार नंबर")}" maxlength="40" autocomplete="off">
  <label class="dlab">${ic("calendar",16)} ${t("एक्सपायरी तारीख (वैकल्पिक)")}</label><input class="fld" type="date" id="ee">
  <div class="sec-title" style="margin-top:16px">${t("श्रेणी")}</div>
  <div class="chips" id="cc">${CATS.map(c=>`<button class="chip ${c.id===sec?"on":""}" data-s="${c.id}">${esc(c.name)}</button>`).join("")}</div>
  ${MEMBERS.length>1?`<div class="sec-title">${t("सदस्य")}</div><div class="chips" id="mm">${MEMBERS.map(m=>`<button class="chip ${m.id===cur.member?"on":""}" data-m="${m.id}">${esc(t(m.name))}</button>`).join("")}</div>`:""}
  <div class="sec-title">${t("स्कैन सेटिंग")}</div>
  <div class="chips"><button class="chip ${cur.crop?"on":""}" id="cr">${ic("check",13)} ${t("ऑटो-क्रॉप")}</button></div>
  <div class="seg" id="fl">${[["orig","ओरिजिनल"],["clean","साफ़"],["bw","B&W"]].map(f=>`<button data-f="${f[0]}" class="${cur.filter===f[0]?"on":""}">${t(f[1])}</button>`).join("")}</div>
  <div class="sec-title">${t("पेज")} · <span id="pn">0</span></div>
  <div class="strip" id="pgs"></div>
  <div class="two"><button class="cam" id="pc">${ic("camera",19)} ${t("कैमरा")}</button><button class="gal" id="pg">${ic("image",19)} ${t("गैलरी")}</button></div>
  <div class="bar"><button class="btn gold" id="sv">${ic("check",20)} ${t("सेव करो")}</button></div>`);
  const renderPgs=()=>{
    $("pgs").innerHTML=cur.pages.map((g,i)=>`<div class="th"><img src="data:image/jpeg;base64,${g.p}" alt=""><b>${i+1}</b><button data-x="${i}">${ic("x",15)}</button></div>`).join("")||`<div class="nopg">${t("अभी कोई पेज नहीं")}</div>`;
    $("pn").textContent=cur.pages.length;
    $("pgs").querySelectorAll("button").forEach(b=>b.onclick=()=>{cur.pages.splice(+b.dataset.x,1);renderPgs()});
  };
  const reprocess=async()=>{
    LS.crop=cur.crop?"1":"0";LS.filter=cur.filter;
    if(!cur.pages.length)return;toast(t("प्रोसेस हो रहा है…"));
    for(const g of cur.pages)g.p=await processImg(g.o,{crop:cur.crop,filter:cur.filter});
    renderPgs();
  };
  renderPgs();
  $("bk").onclick=()=>fromHome?home():section(sec);
  $("cc").querySelectorAll(".chip").forEach(b=>b.onclick=()=>{cur.sec=b.dataset.s;$("cc").querySelectorAll(".chip").forEach(x=>x.classList.toggle("on",x===b))});
  if($("mm"))$("mm").querySelectorAll(".chip").forEach(b=>b.onclick=()=>{cur.member=b.dataset.m;$("mm").querySelectorAll(".chip").forEach(x=>x.classList.toggle("on",x===b))});
  $("cr").onclick=()=>{cur.crop=!cur.crop;$("cr").classList.toggle("on",cur.crop);reprocess()};
  $("fl").querySelectorAll("button").forEach(b=>b.onclick=()=>{cur.filter=b.dataset.f;$("fl").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));reprocess()});
  const add=async cam=>{
    const f=await pickFile(cam);if(!f)return;
    const o2=await shrink(f);cur.pages.push({o:o2,p:await processImg(o2,{crop:cur.crop,filter:cur.filter})});renderPgs();
  };
  $("pc").onclick=()=>add(true);$("pg").onclick=()=>add(false);
  $("sv").onclick=async()=>{
    const title=$("tt").value.trim();
    if(!title)return toast(t("डॉक्यूमेंट का नाम डालो"));
    if(!cur.pages.length)return toast(t("कम से कम एक पेज ज़रूरी है"));
    const exp=$("ee").value||"";
    await dbPut({id:crypto.randomUUID(),section:cur.sec,member:cur.member,title,exp,ts:Date.now(),enc:await sealPayload({pages:cur.pages.map(g=>g.p),number:$("nn").value.trim()})});
    if(exp){hold();try{V().askNotif().catch(()=>{})}catch(e){}}
    scheduleReminders(await dbAll());
    toast(t("सुरक्षित सेव हो गया"));section(cur.sec);
  };
}

// ----- डॉक्यूमेंट खोलना -----
function copyText(s){
  const done=()=>toast(t("कॉपी हो गया"));
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(s).then(done,()=>{});
  else{const a=document.createElement("textarea");a.value=s;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();done()}
}
async function detail(id){
  const d=await dbGet(id);
  let p;try{p=await openPayload(d)}catch(e){return toast(t("खुल नहीं पाया"))}
  const n=p.pages.length;let lay=n>2?"sep":"one",shown=false;
  const mask=s=>s.length>4?"•".repeat(Math.min(8,s.length-4))+" "+s.slice(-4):s;
  const seg=n===1?"":`<div class="seg">${(n===2?[["one","एक पेज पर"],["sep","अलग पेज"],["full","पूरा पेज"]]:[["sep","अलग पेज"],["full","पूरा पेज"]]).map(l=>`<button data-l="${l[0]}" class="${l[0]===lay?"on":""}">${t(l[1])}</button>`).join("")}</div>`;
  const numHtml=()=>p.number?`<small>${t("नंबर")}</small><b>${esc(shown?p.number:mask(p.number))}</b><div class="ia"><span id="eye">${ic("eye",15)}</span><span id="cp">${ic("copy",15)}</span></div>`:`<small>${t("नंबर")}</small><b style="color:var(--g1)">+ ${t("नंबर जोड़ो")}</b>`;
  const dl=daysLeft(d.exp);
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">${esc(d.title)}</h2><button class="ibtn" id="rn">${ic("pencil",19)}</button><button class="ibtn danger" id="dl">${ic("trash",19)}</button></div>
  <div class="pics">${p.pages.map((g,i)=>`<div class="pic"><img data-i="${i}" src="data:image/jpeg;base64,${g}" alt=""><span class="lbl">${n===2?(i?t("बैक"):t("फ्रंट")):t("पेज")+" "+(i+1)}</span><div class="pa"><button data-r="${i}">${ic("refresh",17)}</button></div></div>`).join("")}<button class="pic empty" id="ap">${ic("plus",26)}${t("पेज जोड़ो")}</button></div>
  <div class="info"><div class="icard" id="nm">${numHtml()}</div>
  <div class="icard" id="ex"><small>${t("एक्सपायरी")}</small>${d.exp?`<b>${dt(d.exp+"T00:00:00")}</b>${expTag(d.exp)}<div class="ia"><span id="ec">${ic("x",15)}</span></div>`:`<b style="color:var(--g1)">+ ${t("एक्सपायरी जोड़ो")}</b>`}</div></div>
  <input type="date" id="ed" class="hid" value="${d.exp||""}">
  <div class="sec-title">${t("PDF सेटिंग · A4")}</div>${seg}
  <label class="sw"><span>${ic("key",18)} ${t("PDF और इमेज पर पासवर्ड लगाओ")}</span><input type="checkbox" id="pwc" ${LS.pw?"checked":""}><i></i></label>
  <div class="bar"><button class="btn gold" id="ps">${ic("file",19)} ${t("PDF शेयर")}</button><button class="btn ghost" id="pi">${ic("image",19)} ${t("इमेज शेयर")}</button><button class="ibtn big" id="pv" aria-label="PDF">${ic("printer",22)}</button></div>`);
  $("bk").onclick=()=>section(d.section);
  app.querySelectorAll(".seg button").forEach(b=>b.onclick=()=>{lay=b.dataset.l;app.querySelectorAll(".seg button").forEach(x=>x.classList.toggle("on",x===b))});
  app.querySelectorAll(".pic img").forEach(im=>im.onclick=()=>{const o=document.createElement("div");o.className="ov";o.innerHTML=`<img src="${im.src}" alt="">`;o.onclick=()=>o.remove();document.body.appendChild(o)});
  app.querySelectorAll(".pa button").forEach(b=>b.onclick=e=>{e.stopPropagation();replacePhoto(id,+b.dataset.r)});
  $("ap").onclick=async()=>{
    const cam=confirm(t("कैमरा से फोटो लेनी है?\nOK = कैमरा, Cancel = गैलरी"));
    const g=await newPage(cam);if(!g)return;
    p.pages.push(g.p);d.enc=await sealPayload(p);await dbPut(d);toast(t("पेज जुड़ गया"));detail(id);
  };
  const bindNum=()=>{
    $("nm").onclick=async()=>{const v=prompt(t("नंबर बदलो"),p.number||"");if(v===null)return;p.number=v.trim();d.enc=await sealPayload(p);await dbPut(d);detail(id)};
    if($("eye")){$("eye").onclick=e=>{e.stopPropagation();shown=!shown;$("nm").innerHTML=numHtml();bindNum()};$("cp").onclick=e=>{e.stopPropagation();copyText(p.number)}}
  };
  bindNum();
  $("ex").onclick=()=>{const i=$("ed");if(i.showPicker){try{i.showPicker();return}catch(e){}}i.click()};
  if($("ec"))$("ec").onclick=async e=>{e.stopPropagation();d.exp="";await dbPut(d);scheduleReminders(await dbAll());detail(id)};
  $("ed").onchange=async()=>{d.exp=$("ed").value||"";await dbPut(d);if(d.exp){hold();try{V().askNotif().catch(()=>{})}catch(e){}}scheduleReminders(await dbAll());detail(id)};
  const names=n>1?p.pages.map((_,i)=>`${d.title}_${i+1}`):[d.title];
  const pdf=async mode=>{
    let pw;if($("pwc").checked){pw=await getPw();if(!pw)return}
    hold();V().pdf({images:p.pages,layout:n===1?"one":lay,name:d.title,mode,password:pw}).catch(()=>toast(t("PDF नहीं खुला")));
  };
  $("pv").onclick=()=>pdf("view");$("ps").onclick=()=>pdf("send");
  $("pi").onclick=async()=>{
    if($("pwc").checked){const pw=await getPw();if(!pw)return;hold();V().zip({images:p.pages,names,name:d.title,password:pw,mode:"send"}).catch(()=>toast(t("शेयर नहीं हुआ")))}
    else{hold();V().shareMany({images:p.pages,names}).catch(()=>toast(t("शेयर नहीं हुआ")))}
  };
  $("rn").onclick=async()=>{const v=prompt(t("नया नाम"),d.title);if(v&&v.trim()){d.title=v.trim();await dbPut(d);scheduleReminders(await dbAll());detail(id)}};
  $("dl").onclick=async()=>{if(confirm(t("पक्का डिलीट करना है?"))){await dbDel(id);scheduleReminders(await dbAll());section(d.section)}};
}

// ----- पासवर्ड, फोटो बदलना, PIN बदलना -----
async function setPw(){
  const p=prompt(t("PDF / बैकअप का पासवर्ड सेट करो (कम से कम 4 अक्षर)"));
  if(!p||p.length<4){toast(t("पासवर्ड सेट नहीं हुआ"));return null}
  LS.pw=b64(await enc(key,te.encode(p)));toast(t("पासवर्ड सेट हो गया"));return p;
}
async function getPw(){return LS.pw?td.decode(await dec(key,unb64(LS.pw))):setPw()}
async function replacePhoto(id,idx){
  const cam=confirm(t("कैमरा से फोटो लेनी है?\nOK = कैमरा, Cancel = गैलरी"));
  const g=await newPage(cam);if(!g)return;
  const d=await dbGet(id),p=await openPayload(d);p.pages[idx]=g.p;d.enc=await sealPayload(p);await dbPut(d);
  toast(t("फोटो बदल गई"));detail(id);
}
async function changePin(){
  const old=prompt(t("पुराना PIN डालो"));if(!old)return;
  try{await dec(await derive(old,unb64(LS.salt)),unb64(LS.chk))}catch(e){return toast(t("पुराना PIN गलत है"))}
  const n1=prompt(t("नया PIN डालो (4–8 अंक)"));
  if(!n1||!/^\d{4,8}$/.test(n1))return toast(t("PIN 4 से 8 अंक का होना चाहिए"));
  if(prompt(t("नया PIN फिर से डालो"))!==n1)return toast(t("PIN मैच नहीं हुआ"));
  const salt=crypto.getRandomValues(new Uint8Array(16)),nk=await derive(n1,salt);
  for(const d of await dbAll()){d.enc=await enc(nk,await dec(key,d.enc));await dbPut(d)}
  if(LS.pw)LS.pw=b64(await enc(nk,await dec(key,unb64(LS.pw))));
  LS.salt=b64(salt);LS.chk=b64(await enc(nk,te.encode("VAULTX")));LS.len=n1.length;key=nk;
  if(bioOn())enableBio(n1);
  toast(t("PIN बदल गया"));
}

// ----- बैकअप / रिस्टोर -----
async function ensureFolder(){hold();let f=await V().folder();if(!f.uri)f=await V().pickFolder();return f}
async function backup(){
  try{
    await ensureFolder();
    await V().write({name:"vault.meta",data:b64(te.encode(JSON.stringify({salt:LS.salt,chk:LS.chk,len:LS.len,cats:CATS,members:MEMBERS})))});
    const pw=await getPw();if(!pw)return toast(t("पहले पासवर्ड सेट करो"));
    const docs=await dbAll();
    for(const d of docs){
      const rec=JSON.stringify({id:d.id,section:d.section,member:d.member||"me",title:d.title,exp:d.exp||"",ts:d.ts,enc:b64(d.enc)});
      await V().write({name:d.id+".vx",data:b64(await enc(key,te.encode(rec)))});
      const pl=await openPayload(d),nm=pl.pages.length>1?pl.pages.map((_,i)=>`${d.title}_${i+1}`):[d.title],base=d.title+"_"+d.id.slice(0,4);
      await V().pdf({images:pl.pages,layout:pl.pages.length===2?"one":"sep",name:base,password:pw,toFolder:true});
      await V().zip({images:pl.pages,names:nm,name:base,password:pw,toFolder:true});
    }
    toast(docs.length+" "+t("डॉक्यूमेंट का बैकअप हो गया"));
  }catch(e){toast(t("बैकअप नहीं हुआ"))}
}
async function restore(){
  try{
    await ensureFolder();
    const names=(await V().list()).names;
    if(!names.includes("vault.meta"))return toast(t("इस फोल्डर में बैकअप नहीं मिला"));
    const m=JSON.parse(td.decode(unb64((await V().read({name:"vault.meta"})).data)));
    const pw=prompt(t("बैकअप के समय वाला PIN डालो"));if(!pw)return;
    const ok=await derive(pw,unb64(m.salt));
    try{if(td.decode(await dec(ok,unb64(m.chk)))!=="VAULTX")throw 0}catch(e){return toast(t("PIN गलत है"))}
    (m.cats||[]).forEach(c=>{if(!CATS.find(x=>x.id===c.id))CATS.push(c)});store("cats",CATS);
    (m.members||[]).forEach(c=>{if(!MEMBERS.find(x=>x.id===c.id))MEMBERS.push(c)});store("members",MEMBERS);
    let n=0;
    for(const nm of names.filter(x=>x.endsWith(".vx"))){
      const r=JSON.parse(td.decode(await dec(ok,unb64((await V().read({name:nm})).data))));
      r.enc=await enc(key,await dec(ok,unb64(r.enc)));await dbPut(r);n++;
    }
    toast(n+" "+t("डॉक्यूमेंट रिस्टोर हुए"));
  }catch(e){toast(t("रिस्टोर नहीं हुआ"))}
}

// ----- श्रेणी / सदस्य संभालना -----
function manage(kind){
  const isC=kind==="cats",list=isC?CATS:MEMBERS;
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">${t(isC?"श्रेणियाँ संभालो":"परिवार के सदस्य")}</h2></div>
  <div class="sets">${list.map(x=>`<div class="set" style="--h:${x.hue||40}"><span class="tile sm">${ic(isC?x.icon:"users",20)}</span><span class="ct"><b>${esc(isC?x.name:t(x.name))}</b></span><button class="ibtn" data-r="${x.id}">${ic("pencil",18)}</button><button class="ibtn danger" data-d="${x.id}">${ic("trash",18)}</button></div>`).join("")}</div>
  <div class="bar"><button class="btn gold" id="nw">${ic("plus",20)} ${t(isC?"नई श्रेणी":"नया सदस्य")}</button></div>`);
  $("bk").onclick=settings;
  const save=()=>{store(kind,list);manage(kind)};
  $("nw").onclick=()=>{const v=prompt(t(isC?"नई श्रेणी का नाम":"नया सदस्य (नाम)"));if(!v||!v.trim())return;
    list.push(isC?{id:"c"+Date.now().toString(36),name:v.trim(),icon:"folder",sub:"",hue:[10,95,300,200,25,150][list.length%6]}:{id:"m"+Date.now().toString(36),name:v.trim()});save()};
  app.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{const x=list.find(i=>i.id===b.dataset.r),v=prompt(t("नाम बदलो"),isC?x.name:t(x.name));if(v&&v.trim()){x.name=v.trim();save()}});
  app.querySelectorAll("[data-d]").forEach(b=>b.onclick=async()=>{
    if(list.length<2)return toast(t("कम से कम एक चाहिए"));
    const used=(await dbAll()).some(d=>isC?d.section===b.dataset.d:(d.member||"me")===b.dataset.d);
    if(used)return toast(t(isC?"इस श्रेणी में डॉक्यूमेंट हैं, पहले उन्हें हटाओ":"इस सदस्य के डॉक्यूमेंट हैं, पहले उन्हें हटाओ"));
    if(!confirm(t("पक्का डिलीट करना है?")))return;
    const i=list.findIndex(x=>x.id===b.dataset.d);list.splice(i,1);save()});
}

// ----- घुसपैठिया फोटो -----
async function intruders(){
  const r=await V().intruderList().catch(()=>({items:[]}));
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">${t("घुसपैठिया फोटो देखो")}</h2>${r.items.length?`<button class="ibtn danger" id="ia">${ic("trash",19)}</button>`:""}</div>
  ${r.items.length?`<div class="igrid">${r.items.map(i=>`<div class="ig" data-n="${i.name}"><img alt=""><div class="cap">${new Date(parseInt(i.name)).toLocaleString(LANG==="en"?"en-IN":"hi-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</div><button data-x="${i.name}">${ic("x",15)}</button></div>`).join("")}</div>`
  :`<div class="empty"><div class="ring">${ic("eye",34)}</div>${t("अभी कोई फोटो नहीं")}</div>`}`);
  $("bk").onclick=settings;
  if($("ia"))$("ia").onclick=async()=>{if(confirm(t("सारी फोटो हटानी हैं?"))){await V().intruderDelete({name:"all"});intruders()}};
  app.querySelectorAll(".ig").forEach(el=>{
    const im=el.querySelector("img");
    V().intruderRead({name:el.dataset.n}).then(x=>{im.src="data:image/jpeg;base64,"+x.data}).catch(()=>{});
    im.onclick=()=>{if(!im.src)return;const o=document.createElement("div");o.className="ov";o.innerHTML=`<img src="${im.src}" alt="">`;o.onclick=()=>o.remove();document.body.appendChild(o)};
    el.querySelector("button").onclick=async e=>{e.stopPropagation();await V().intruderDelete({name:el.dataset.n});intruders()};
  });
}

// ----- सेटिंग्स -----
function settings(){
  const row=(id,icn,ti,s,h,cls="")=>`<button class="set ${cls}" id="${id}" style="--h:${h}"><span class="tile sm">${ic(icn,20)}</span><span class="ct"><b>${t(ti)}</b><small>${t(s)}</small></span>${ic("chev",18)}</button>`;
  const on=LS.intr==="1";
  view(`<div class="top"><button class="ibtn" id="bk">${ic("back")}</button><h2 class="ttl">${t("सेटिंग्स")}</h2></div>
  <div class="sec-title">${t("सुरक्षा")}</div>
  <div class="sets">${row("b4","fingerprint","फिंगरप्रिंट",bioOn()?"चालू है · दोबारा सेट करो":"उँगली से लॉक खोलो",40)}
  ${row("b7","lock","PIN बदलो","नया PIN बनाओ",215)}
  ${row("b6","key","PDF / बैकअप पासवर्ड",LS.pw?"पासवर्ड बदलो":"पासवर्ड सेट करो",265)}
  ${row("b8","eye",on?"घुसपैठिया फोटो चालू":"घुसपैठिया फोटो बंद","3 बार गलत PIN पर चुपचाप फोटो",345)}</div>
  <div class="sec-title" style="margin-top:22px">${t("बैकअप")}</div>
  <div class="sets">${row("b1","down","बैकअप अभी लो","encrypted फाइलें + पासवर्ड वाली PDF और इमेज ZIP",175)}
  ${row("b2","refresh","बैकअप से रिस्टोर करो","पुराना बैकअप वापस लाओ",345)}
  ${row("b3","folder","बैकअप फोल्डर बदलो","दूसरा फोल्डर चुनो",215)}
  ${row("b9","eye","घुसपैठिया फोटो देखो","गलत PIN डालने वालों की फोटो",30)}</div>
  <div class="sec-title" style="margin-top:22px">${t("सामान्य")}</div>
  <div class="sets">${row("c1","globe","भाषा",LANG==="en"?"English":"हिंदी",200)}
  ${row("c2","folder","श्रेणियाँ संभालो","नई जोड़ो, नाम बदलो, हटाओ",95)}
  ${row("c3","users","परिवार के सदस्य","हर सदस्य के अलग डॉक्यूमेंट",300)}</div>
  <div class="sets" style="margin-top:22px">${row("b5","power","अभी लॉक करो","ऐप तुरंत लॉक हो जाएगा",0,"danger")}</div>`);
  $("bk").onclick=home;$("b1").onclick=backup;$("b2").onclick=restore;
  $("b3").onclick=async()=>{hold();try{await V().pickFolder();toast(t("फोल्डर सेट हो गया"))}catch(e){}};
  $("b4").onclick=async()=>{
    const ok=await V().bioAvailable().then(r=>r.ok).catch(()=>false);
    if(!ok)return toast(t("इस फ़ोन में फिंगरप्रिंट उपलब्ध नहीं"));
    const pin=prompt(t("अपना PIN डालो"));if(!pin)return;
    try{const k=await derive(pin,unb64(LS.salt));await dec(k,unb64(LS.chk));await enableBio(pin);settings()}catch(e){toast(t("PIN गलत है"))}
  };
  $("b6").onclick=async()=>{if(await setPw())settings()};
  $("b7").onclick=changePin;
  $("b8").onclick=async()=>{if(on){LS.intr="0"}else{hold();try{await V().askCamera()}catch(e){}LS.intr="1"}settings()};
  $("b9").onclick=intruders;
  $("c1").onclick=()=>{LANG=LANG==="en"?"hi":"en";LS.lang=LANG;document.documentElement.lang=LANG;settings()};
  $("c2").onclick=()=>manage("cats");$("c3").onclick=()=>manage("members");
  $("b5").onclick=lock;
}

// शुरू में हमेशा लॉक
lockUI("");
if(LS.chk&&bioOn())setTimeout(bioUnlock,300);
