var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAMrpqr2_zOIB7D7V0GGWvyJL1gk8Ow0tI",
  authDomain: "jergus-app-todo.firebaseapp.com",
  databaseURL: "https://jergus-app-todo.firebaseio.com",
  storageBucket: "",
};

var mainApp = firebase.initializeApp({
  databaseURL: "https://jergus-app-todo.firebaseio.com",
  serviceAccount: {
    type: "service_account",
    project_id: "jergus-app-todo",
    private_key_id: "bdaab56dbeef5dd6134f3bf3f650b47ba6780374",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCROZv9hp/feQOZ\nFIQMzDPQZUh5t08YlbpgOnvxKknvBFnwpX6ZdMRmcN8K6kR+HcgABb72FnfX6WiY\nVEC2vn4cx0HbjylGGRoRGgkuZu4gg19GD/Di0biu6w3bl5aYXFM3XrUmSONsFSk5\nApcwYfUvKugNZWH5uqZTj3HDbjYLJbBEioUXKXNC4/I+lJcd7AGkL6NT5Cf7dxoX\nHzgYI/WSA5pEhnLUUju12/zReftS2sJoPE1eZnjz8MfTVKajItsyjbq7iwTVz/bL\nK+fXbycqv6O/VWWj43FGVoTLmcHf8cZ561wOll5iVAtp2IdrYd9FHHCTloZMDsJN\nSs/JrrJvAgMBAAECggEAEn8O4hRyakkEb0vQobykYMd1mqMBPPVc/oKUZJvpPLsG\nJYM+g5b+qLl5fu9ld9adMXuJ3dfwvZwpyTT55QyQDWRHfApYzGfIDSOOxc0wSQ3S\nZZ8EJC9n4UdoxW4iLRedNbEnS0//PzXWwT8WOIBRdQd29LXT67WdF4luiOCRm4uo\n5srL6g8a+Mzl++bspmFyfLsg2Z1/dBlOiWFcBbcAqlNa4hhOq64qaZcWt3RKjQcm\n9rMmW72D4IE02zXwfpimldbOWmiZvhk9vumI40/Sg8B/th5KBPxHV1RC4K16syme\nk1RVKj/v+D+UdupLKj1VaB4ukWEIYK0wivYIGyiBgQKBgQDW7igEAdBNgIs5Eqxa\nsqUV+QTjvqUrSoimJXa3Jy2QcVsHkZlCWctttPVrVbf2uHQ30pr2DCzbEarNYBmJ\n8b1CcbJpkAe0V4LA7wzXGHZbIoo/c44gkdSen9/B0PeSVlj6K8MoEA9Jj8K4KTQ+\n3ulywJMuiJX0iCP80/KwsuprwQKBgQCs+aYb+EXTG3IvkAvrKmhax4xaKokVPUCw\nhrdV4PO+6xvK7vD4C/eivG42An1ZLi0gv3XRqn8QjqpJsBX66MBP5dUV0Ui7DJQv\nUo8jfWivdgF0Kfr5hcvUiHsr9prYFBdpHv1nWR9xEkB1QAFNWPXvZvPYRtIFLy6q\n2RurXcdqLwKBgCS1Lh5pFON3tc98kfU3l5xmGGCxOdJn+2is81aamVyXD53+TveX\nEHhfNJ8tV6sKm8bA8HhfYfXUUaCb7iCyKcnEU11WHQq++3TqHv5JjkVIY+YsXTTQ\n00h4M6YNg4r5tl6bxMv92i6NIAuF9gda2PIhU8HZ0Aqgiczvgf6NwB3BAoGAGHYl\nm4b8uOIEv90rElKo902I96dUQ4CqCUzD2I07ayBsicJIqYtntcfX/iNT/qydDSiG\nTORDm9/RDSKtuRH5QFNMUw2Jr4oT2q1eOLKff1C82+Sj7W2SabfzU0BInY4Z0W/k\nfh0IaUEfhHVMudd+0CBLE6bQRJNrkhWp6A4XCVkCgYBz7M0B9jb6yKlctCOB63y6\n6wZJIGKvcWLG9BWvXelR5ukKhvQCygAk6GWinIKDtJlgFcMQ7uykemple1SmcanR\nMHlswv8xd0LcKRYp0RlsPWg2Juk/aerDLwzUB+1UR914uFx3TL8a/FW/JfLeBtSg\nmUwlF7Ke4MM2HgOdQcVJQQ==\n-----END PRIVATE KEY-----\n",
    client_email: "jergus-app-todo@appspot.gserviceaccount.com",
    client_id: "103070389817034897292",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://accounts.google.com/o/oauth2/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/jergus-app-todo%40appspot.gserviceaccount.com",
  },
});

var rootRef = firebase.database().ref();

rootRef.set({
  isRunning: true,
  app: {
    name: "Todo App",
    version: "0.0.1",
  },
  filipjerga: {
    name: "Filip",
    age: 25,
  },
});

// rootRef.child('app/version').root.remove().then(() => {
//   console.log("data removed");
// }, (e) => {
//   console.log('Not removed', e);
// });

var nameRef = rootRef.child("app/name");

nameRef.root
  .child("filipjerga/age")
  .remove()
  .then(
    () => {
      console.log("removed");
    },
    (e) => {
      console.log("Not removed");
    }
  );

nameRef.root
  .child("isRunnig")
  .remove()
  .then(
    () => {
      console.log("removed");
    },
    (e) => {
      console.log("error");
    }
  );
