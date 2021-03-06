// This snippet file was generated by processing the source file:
// ./database-next/offline.js
//
// To make edits to the snippets in this file, please edit the source

// [START rtdb_detect_connection_state_modular]
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();
const connectedRef = ref(db, ".info/connected");
onValue(connectedRef, (snap) => {
  if (snap.val() === true) {
    console.log("connected");
  } else {
    console.log("not connected");
  }
});
// [END rtdb_detect_connection_state_modular]
