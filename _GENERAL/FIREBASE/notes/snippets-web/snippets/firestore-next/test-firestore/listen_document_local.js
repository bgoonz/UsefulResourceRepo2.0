// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START listen_document_local_modular]
import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
  const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  console.log(source, " data: ", doc.data());
});
// [END listen_document_local_modular]
