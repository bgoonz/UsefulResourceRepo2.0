// This snippet file was generated by processing the source file:
// ./database-next/lists-of-data.js
//
// To make edits to the snippets in this file, please edit the source

// [START rtdb_social_push_modular]
import { getDatabase, ref, push, set } from "firebase/database";

// Create a new post reference with an auto-generated id
const db = getDatabase();
const postListRef = ref(db, "posts");
const newPostRef = push(postListRef);
set(newPostRef, {
  // ...
});
// [END rtdb_social_push_modular]
