const statCacheName = 'v1';

//list of urls we want to cache
const allCacheURLs = [
'/',
'/restaurant.html',
'/index.html',
'/css/styles.css',
'/js/dbhelper.js',
'/js/main.js',
'/js/restaurant_info.js',
'/data/restaurants.json',
];
//installing the service worker
self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open(statCacheName).then((cache)=>{
            return cache.addAll(allCacheURLs);
        })
    );
});
// activate the service worker
self.addEventListener('activate', function(e) {
    console.log('Activating new service worker');  
            e.waitUntil(
                  caches.keys().then(function(cacheNames) {
                        return Promise.all(
                              cacheNames.filter(function(cacheName) {
                                return cacheName.startsWith('') && cacheName !== staticCacheName;
                                }).map(function(cacheName){
                                  return caches.delete(cacheName);
                                })
                          );
                  })
            );
  });