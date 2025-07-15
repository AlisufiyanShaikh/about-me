const CACHE_NAME = 'alisufiyan-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/about-me/',
  '/about-me/index.html',
  '/about-me/manifest.json',
  '/favicon.ico',
  '/favicon-32x32.png',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://res.cloudinary.com/dpm27lokj/image/upload/v1751126335/IMG_20250429_140003_711_u0aftl.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
