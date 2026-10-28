const CACHE='bus-tracker-51bdb0b56157',FILES=["./","./index.html","./manifest.webmanifest","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png","./assets/index-Bo3YJhOa.js","./assets/index-flwjm8Qw.css"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bus-tracker-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url),root=new URL('./',self.location.href);if(e.request.method!=='GET'||u.origin!==root.origin||!u.pathname.startsWith(root.pathname)||u.pathname.includes('/api-proxy/'))return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match(new URL('index.html',root))));return;}
if(FILES.some(f=>new URL(f,root).href===u.href))e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request)));});