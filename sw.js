self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static-v1').then((cache) => {
            return cache.addAll(
                ['/',
                '/css/styles.css',
                '/js/dbhelper.js',
                '/js/restaurant_info.js',
                '/data/restaurants.json',
                '/js/main.js',
                ]
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});