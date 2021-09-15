//Cache polyfil to support cacheAPI in browsers
importScripts('/cache-polyfill.js');

//Cache name
var staticCache = "my-static-files"; 

//Files to cache
var filesToCache = [
  "/",
  "images/logo.jpg",
  "css/main.css",
  "js/app.js"
];

//Adding a eventlistener to install event
self.addEventListener("install", function (event) {
  //Installation steps
  event.waitUntil(
    caches.open(staticCache)
    .then(function (cache) {
      //[] of files to cache & if any of the file not present compelete `addAll` will fail
      return cache.addAll(urlsToCache)
      .then(function () {
        console.log("Successfully cached.");
      })
      .cache(function (error) {
        console.log("Failed to cache ", error);
      })
    })
  );
});