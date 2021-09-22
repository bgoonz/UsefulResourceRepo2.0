//After install, fetch event is triggered for every page request
self.addEventListener("fetch", function (event) {
	console.log("Request -->", event.request.url);

	//To tell browser to evaluate the result of event
	event.respondWith(
		caches.match(event.request) //To match current request with cached request it
		.then(function(response) {
			//If response found return it, else fetch again.
			return response || fetch(event.request);
		})
		.catch(function(error) {
			console.error("Error: ", error);
		})
  );
});