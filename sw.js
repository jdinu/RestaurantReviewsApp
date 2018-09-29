
 console.log('Service Worker : Registered');
//const statCacheName = 'v1';

//list of urls we want to cache
const cacheFiles = [
'/',
'/index.html',
'/restaurant.html',
'/css/styles.css',
'/js/dbhelper.js',
'/js/main.js',
'/js/restaurant_info.js',
'/data/restaurants.json',
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
];
//installing the service worker by using the event listener
// to cache an array of file names
self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open('v1').then(function(cache){
            return cache.addAll(cacheFiles);
        })
    );
});

// Fetch event listener
//use the respondWith method to prevent the default fetch event and provide it a promise:
self.addEventListener('fetch', function(e){
    e.respondWith(
        //response will be the result of whether or not the cache match was successful
        caches.match(e.request).then(function(response){
            if (response){
                // requested page already exist within the cache; return it
                console.log('Found ',e.request, ' in cache');
                return response;
            }
            else{
                //requested page does'nt exist in cache; fetch the request and add it o cache for later use
                console.log('could not found ',e.request, ' in cache, Fetching ');
                return fetch(e.request)
                //chaining the then method which takes the response from the fetch
                .then(function(response){
                    //cloning the response object as the same response object can't be used twice
                    const clonedResponse = response.clone();
                    caches.open('v1').then(function(cache){
                      // using put method,pair the request with the cloned response
                       cache.put(e.request,clonedResponse); 
                       })
                       return response;
                })
                .catch(function(err){
                    console.error(err);
                });
            }            
        })

    );
});

/*
// activate the service worke
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
  */