// See https://developers.google.com/web/fundamentals/primers/service-workers/

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static-v1').then((cache) => {
            return cache.addAll(
                ['https://magicmart.github.io/mws-restaurant-stage-1/',
                    'https://magicmart.github.io/mws-restaurant-stage-1/index.html',
                    'https://magicmart.github.io/mws-restaurant-stage-1/restaurant.html',
                    'https://magicmart.github.io/mws-restaurant-stage-1/css/styles.css',
                    'https://magicmart.github.io/mws-restaurant-stage-1/js/dbhelper.js',
                    'https://magicmart.github.io/mws-restaurant-stage-1/js/restaurant_info.js',
                    'https://magicmart.github.io/mws-restaurant-stage-1/js/main.js',
                    'https://magicmart.github.io/mws-restaurant-stage-1/data/restaurants.json',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/1.jpg',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/2.jpg',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/3.jpg',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/4.jpg',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/5.jpg',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/6.jpg',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/7.jpg',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/8.jpg',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/9.jpg',
                    'https://magicmart.github.io/mws-restaurant-stage-1/img/10.jpg'
                ]
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response;
            }
            console.log('Network request for ', event.request.url);
            return fetch(event.request)
                .then(function (response) {
                    return caches.open('static-v1').then(function (cache) {
                        if (event.request.url.indexOf('test') < 0) {
                            cache.put(event.request.url, response.clone());
                        }
                        return response;
                    });
                });

        })
    );
});