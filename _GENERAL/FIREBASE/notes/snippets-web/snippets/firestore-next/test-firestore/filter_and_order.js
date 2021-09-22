// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START filter_and_order_modular]
import { query, where, orderBy, limit } from "firebase/firestore";

const q = query(
  citiesRef,
  where("population", ">", 100000),
  orderBy("population"),
  limit(2)
);
// [END filter_and_order_modular]
