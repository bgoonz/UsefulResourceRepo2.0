// This snippet file was generated by processing the source file:
// ./firestore-next/test.solution-arrays.js
//
// To make edits to the snippets in this file, please edit the source

// [START query_in_category_timestamp_invalid_modular]
import {
  collection,
  query,
  where,
  orderBy,
  FirebaseFirestore,
} from "firebase/firestore";

const q = query(
  collection(db, "posts"),
  where("categories.cats", "==", true),
  orderBy("timestamp")
);
// [END query_in_category_timestamp_invalid_modular]
