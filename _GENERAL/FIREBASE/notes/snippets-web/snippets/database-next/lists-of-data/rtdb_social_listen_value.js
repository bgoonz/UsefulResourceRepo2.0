// This snippet file was generated by processing the source file:
// ./database-next/lists-of-data.js
//
// To make edits to the snippets in this file, please edit the source

// [START rtdb_social_listen_value_modular]
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();
const dbRef = ref(db, "/a/b/c");

onValue(
  dbRef,
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      // ...
    });
  },
  {
    onlyOnce: true,
  }
);
// [END rtdb_social_listen_value_modular]
