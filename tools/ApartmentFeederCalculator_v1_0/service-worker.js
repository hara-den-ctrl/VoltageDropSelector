const APP_VERSION = "1.0";
const CACHE_NAME = `ApartmentFeederCalculator-v${APP_VERSION}`;
const ASSETS = ["./","./index.html","./manifest.json","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install", event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", event => { if (event.request.method !== "GET") return; event.respondWith(fetch(event.request).then(res => { const copy = res.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); return res; }).catch(() => caches.match(event.request).then(r => r || caches.match("./index.html")))); });
