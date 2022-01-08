const cache_name = "v3"

const install_sw = async event => {
    const precache = async() => {
        const cache = await self.caches.open(cache_name);
        return cache.addAll([
            '/index.css',
            '/prism.css',
            '/index.js',
            '/sw.js',
            '/favicon.svg',
            '/offline.html',
            '/'
        ])
    }
    event.waitUntil(precache())
}

const activate_sw = async event => {
    const cachepreserve = ['v3'];

    const invalidatecache = async() => {
        const keys = await self.caches.keys()
        Promise.all(
            keys.map((key) => {
                if (cachepreserve.indexOf(key) === -1) {
                    return self.caches.delete(key)
                }
            }))
    }
    event.waitUntil(invalidatecache())
}

const fetch_sw = async event => {
    const cache_fetch = async() => {
        if (event.request.method != 'GET') {
            return
        }
        const cacheres = await self.caches.match(event.request)
        if (cacheres !== undefined) {
            return cacheres
        }
        try {
            const response = await self.fetch(event.request)
            const cache = await self.caches.open(cache_name)
            cache.put(event.request, response.clone())
            return response
        } catch {
            return self.caches.match('/offline.html')
        }
    }

    event.respondWith(cache_fetch())
}

const main = async() => {
    self.addEventListener('install', install_sw)
    self.addEventListener('activate', activate_sw)
    self.addEventListener('fetch', fetch_sw)

}

main()