//First, check if service worker is supported or not
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceWorker.js", {scope: "./"}) //Passing serviceWorker file and scope
    .then(function (event) {
      console.log("Service Worker is registered ", event);
    })
    .catch(function (error) {
      console.error("Service Worker is failed to register ", error);
    });
  }
  else {
    console.error("Service Worker is not supported in your browser.");
  }