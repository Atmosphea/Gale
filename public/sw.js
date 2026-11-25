/* The Reading Room — service worker.
   NETWORK-FIRST for the app shell so new versions always come through when online
   (the old cache-first strategy froze the app at its first cached version).
   Cache fallback keeps offline launch + <1s relaunch working.
   Reading content + progress live in localStorage/IndexedDB (handled by the app),
   which the SW never touches, so persistent progress is never cleared here. */
const CACHE = 'reading-room-v4';
const FONT_N = 42; // fonts/gf0..gf41.woff2
const SHELL = [
  './',
  './index.html',
  './TextualReverie.dc.html',
  './support.js',
  './reverie-config.js',
  './reverie-books.js',
  './image-slot.js',
  './manifest.webmanifest',
  // offline parser libs
  './libs/jszip.min.js',
  './libs/pdf.min.js',
  './libs/pdf.worker.min.js',
  './libs/mammoth.browser.min.js',
  // fonts (local, so type renders instantly offline)
  './fonts/fonts.css',
  './fonts/odenburgh.woff2',
  './fonts/odenburgh-deco.woff2',
  // background scenes
  './backgrounds/home-01.png',
  './backgrounds/pano-mid.png',
  './backgrounds/pano-fg.png',
  './backgrounds/cloud-a.png',
  './backgrounds/cloud-b.png',
  './backgrounds/cloud-c.png',
  './backgrounds/cloud-d.png',
  './backgrounds/cloud-wide.png'
].concat(Array.from({ length: FONT_N }, (_, i) => './fonts/gf' + i + '.woff2'));

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(
    SHELL.map((u) => c.add(u).catch(() => null))   // tolerate any missing asset
  )));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))   // drop stale v1 cache
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // The reading-list iframe is cross-origin. Leave it to the browser so a failed
  // fetch is not replaced with the app shell inside the signup frame.
  try { if (new URL(req.url).hostname === 'galerocks.substack.com') return; } catch (err) {}
  // Network-first everywhere: fresh code when online, cached copy when offline.
  e.respondWith(
    fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() =>
      caches.match(req).then((hit) => hit || caches.match('./TextualReverie.dc.html'))
    )
  );
});
