// See https://developers.google.com/web/fundamentals/primers/service-workers/

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
                    '/img/1.jpg',
                    '/img/2.jpg',
                    '/img/3.jpg',
                    '/img/4.jpg',
                    '/img/5.jpg',
                    '/img/6.jpg',
                    '/img/7.jpg',
                    '/img/8.jpg',
                    '/img/9.jpg',
                    '/img/10.jpg'
                ]
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // Clone the request
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    var responseToCache = response.clone();

                    caches.open('static-v1')
                        .then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});