// This snippet file was generated by processing the source file:
// ./messaging-next/index.js
//
// To make edits to the snippets in this file, please edit the source

// [START messaging_receive_message_modular]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
import { getMessaging, onMessage } from "firebase/messaging";

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});
// [END messaging_receive_message_modular]
