const CACHE_NAME = 'pwa_matheus_cachev4';

const urlToCache = [
    'static/js/bundle.js',
    'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10'
]


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(urlToCache))
    )
})

self.addEventListener('activate', (event) => {
    const cacheWhiteList = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(keyList.map(key => {
                if(cacheWhiteList.includes(key))return caches.delete(key)
            }))
        )
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
    )
})