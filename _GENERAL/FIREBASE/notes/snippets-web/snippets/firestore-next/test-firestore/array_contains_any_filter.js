// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START array_contains_any_filter_modular]
import { query, where } from "firebase/firestore";

const q = query(
  citiesRef,
  where("regions", "array-contains-any", ["west_coast", "east_coast"])
);
// [END array_contains_any_filter_modular]
