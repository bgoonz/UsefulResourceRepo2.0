// This snippet file was generated by processing the source file:
// ./messaging-next/service-worker.js
//
// To make edits to the snippets in this file, please edit the source

// [START messaging_init_in_sw_modular]
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
// [END messaging_init_in_sw_modular]
