self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static-v2').then((cache) => {
            return cache.addAll(
                ['/',
                    '/restaurant.html',
                    '/css/styles.css',
                    '/js/dbhelper.js'
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
