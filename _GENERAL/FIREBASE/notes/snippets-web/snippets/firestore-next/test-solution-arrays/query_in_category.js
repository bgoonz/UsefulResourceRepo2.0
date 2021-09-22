// This snippet file was generated by processing the source file:
// ./firestore-next/test.solution-arrays.js
//
// To make edits to the snippets in this file, please edit the source

// [START query_in_category_modular]
import { collection, getDocs, query, where } from "firebase/firestore";

// Find all documents in the 'posts' collection that are
// in the 'cats' category.
const q = query(collection(db, "posts"), where("categories.cats", "==", true));
const docs = await getDocs(q);
// ...
// [END query_in_category_modular]
