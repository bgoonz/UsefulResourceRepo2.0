// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START listen_with_metadata_modular]
import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(
  doc(db, "cities", "SF"),
  { includeMetadataChanges: true },
  (doc) => {
    // ...
  }
);
// [END listen_with_metadata_modular]
