// This snippet file was generated by processing the source file:
// ./database-next/lists-of-data.js
//
// To make edits to the snippets in this file, please edit the source

// [START rtdb_social_recent_modular]
import { getDatabase, ref, query, limitToLast } from "firebase/database";

const db = getDatabase();
const recentPostsRef = query(ref(db, "posts"), limitToLast(100));
// [END rtdb_social_recent_modular]
