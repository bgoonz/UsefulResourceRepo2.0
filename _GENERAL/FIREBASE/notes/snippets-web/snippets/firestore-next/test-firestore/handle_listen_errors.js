// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START handle_listen_errors_modular]
import { collection, onSnapshot } from "firebase/firestore";

const unsubscribe = onSnapshot(
  collection(db, "cities"),
  (snapshot) => {
    // ...
  },
  (error) => {
    // ...
  }
);
// [END handle_listen_errors_modular]
