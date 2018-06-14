// See https://developers.google.com/web/fundamentals/primers/service-workers/

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static-v1').then((cache) => {
            return cache.addAll(
                ['https://magicmart.github.io/mws-restaurant-stage-1/',
                'https://magicmart.github.io/mws-restaurant-stage-1/css/styles.css',
                'https://magicmart.github.io/mws-restaurant-stage-1/js/dbhelper.js',
                'https://magicmart.github.io/mws-restaurant-stage-1/js/restaurant_info.js',
                'https://magicmart.github.io/mws-restaurant-stage-1/js/main.js',
                'https://magicmart.github.io/mws-restaurant-stage-1/data/restaurants.json'
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
            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

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