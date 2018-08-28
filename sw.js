const CACHE_NAME = 'A';
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'restaurant.html',
  'serviceworker.js',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/css/styles.css',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/img/1-med.jpg',
  '/img/2-med.jpg',
  '/img/3-med.jpg',
  '/img/4-med.jpg',
  '/img/5-med.jpg',
  '/img/6-med.jpg',
  '/img/7-med.jpg',
  '/img/8-med.jpg',
  '/img/9-med.jpg',
  '/img/10-med.jpg',
  '/img/1-sm.jpg',
  '/img/2-sm.jpg',
  '/img/3-sm.jpg',
  '/img/4-sm.jpg',
  '/img/5-sm.jpg',
  '/img/6-sm.jpg',
  '/img/7-sm.jpg',
  '/img/8-sm.jpg',
  '/img/9-sm.jpg',
  '/img/10-sm.jpg'
];

/**
 * @description Installs service worker for the first time, give it a name and populates it with cache date.
 * @param {object} event
 * @returns none - Installed Service worker
 */

self.addEventListener('install', function(evt) {
  console.log('[SERVICE-WORKER] Install ');
  evt.waitUntil(precache());
});

function precache() {
  return caches.open(CACHE_NAME).then(function (cache) {
    console.log('[SERVICE-WORKER] PreCache');
    return cache.addAll(URLS_TO_CACHE);
  });
}

/* self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
      .then(() => {
        console.log('SW Installed by ES6 arrow funtion');
        return self.skipWaiting();
      })
  );
});
 */
/**
 * @description Service worker is activating at this point and deletes old caches.
 * @param  {object} e
 * @returns none - Activated Service worker
 */

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    }));
  console.log('[SERVICE-WORKER] Activate');
  // return self.clients.claim();
});

/**
 * @description Intercepts all fetch requests. It will then respond with the cached response if one is found, if not it will fetch the data from network using the fetch API.
 * @param {object} event
 * @returns {object} event.request - Resource from cache or network
 */

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       console.log('SW Fetch Response', event.request);
//       return response || fetch(event.request);
//     })
//   );
// });

self.addEventListener('fetch', function(evt) {
  console.log('[SERVICE-WORKER] fetch', evt.request);
 evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});

function fromCache(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.match(request).then(function (matching) {
      console.log('[SERVICE-WORKER] fromCache', request);
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      console.log('[SERVICE-WORKER] Update cache', response);
      return cache.put(request, response);
    });
  });
}


/* self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch', e.request.url);

	// e.respondWidth Responds to the fetch event
	e.respondWith(

		// Check in cache for the request being made
		caches.match(e.request)


			.then(function(response) {

				// If the request is in the cache
				if ( response ) {
					console.log("[ServiceWorker] Found in Cache", e.request.url, response);
					// Return the cached version
					return response;
				}

				// If the request is NOT in the cache, fetch and cache

				var requestClone = e.request.clone();
				return fetch(requestClone)
					.then(function(response) {

						if ( !response ) {
							console.log("[ServiceWorker] No response from fetch ")
							return response;
						}

						var responseClone = response.clone();

						//  Open the cache
						caches.open(CACHE_NAME).then(function(cache) {

							// Put the fetched response in the cache
							cache.put(e.request, responseClone);
							console.log('[ServiceWorker] New Data Cached', e.request.url);

							// Return the response
							return response;

				        }); // end caches.open

					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
					});


			}) // end caches.match(e.request)
	); // end e.respondWith
}); */
