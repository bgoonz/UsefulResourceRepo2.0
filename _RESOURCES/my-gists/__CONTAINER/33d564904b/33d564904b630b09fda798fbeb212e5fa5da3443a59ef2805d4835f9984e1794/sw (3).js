//Activate event will be triggered once after registering, also used to clean up caches

self.addEventListener("activate", function (event) {
  var cacheWhitelist = ['my-static-files'];
  
	event.waitUntil(
		caches.keys()
		.then(function (allCaches) {
			//Check all caches and delete old caches here
			allCaches.map(function (cacheName) {
				if (cacheWhitelist.indexOf(cacheName) === -1) {
					return caches.delete(cacheName);
				}
			});
		})
	);
});