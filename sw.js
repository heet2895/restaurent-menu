const CACHE_NAME = 'aura-menu-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './images/signature_steak.png',
  './images/raw_bar.png',
  './images/tasting_course.png',
  './images/dish_1.png',
  './images/dish_2.png',
  './images/dish_3.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
