var staticCacheName = 'rian-mws-static-v1';
const cacheURLs = [
    '/',
    'css/main.css',
    'js/register-sw.js',
    '/images/calculator.jpg',
    '/images/mapview.png',
    '/images/photo372.jpg',
    '/project1/',
    '/project2/',
    'https://fonts.googleapis.com/css?family=Lato:400,700',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css'
];

// self.addEventListener('install', event => {
//     event.waitUntill(
//         caches.open(staticCacheName).then( cache => cache.addAll(cacheURLs) )
//     );
// });
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
        return cache.addAll(cacheURLs);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.filter( cacheName => 
                    cacheName.startsWith('rian-mws-') && cacheName != staticCacheName
                ).map( cacheName =>
                    caches.delete(cacheName)    
                )
            );
        })
    );
});

// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then( response => {
//             return response || fetch(event.request);
//         })
//     );
// });
self.addEventListener('fetch', function(event) {  
    event.respondWith(
        caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
        })
    );
});