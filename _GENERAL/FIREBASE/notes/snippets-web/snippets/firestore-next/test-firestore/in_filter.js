// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START in_filter_modular]
import { query, where } from "firebase/firestore";

const q = query(citiesRef, where("country", "in", ["USA", "Japan"]));
// [END in_filter_modular]
