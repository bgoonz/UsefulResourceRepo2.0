// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START new_document_modular]
import { collection, doc, setDoc } from "firebase/firestore";

// Add a new document with a generated id
const newCityRef = doc(collection(db, "cities"));

// later...
await setDoc(newCityRef, data);
// [END new_document_modular]
