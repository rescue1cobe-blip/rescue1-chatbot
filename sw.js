// RESCUE-1 配車記録 Service Worker
// アプリ本体・アイコン・フォントをキャッシュし、オフラインでも起動できるようにする
const CACHE = 'rescue1-dispatch-v1';
const APP_SHELL = [
  './dispatch.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // ナビゲーション（アプリ起動）はオフライン時に dispatch.html を返す
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./dispatch.html')));
    return;
  }
  // それ以外は cache-first（フォント等を含む）。取得できたら次回用にキャッシュ。
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => hit))
  );
});
