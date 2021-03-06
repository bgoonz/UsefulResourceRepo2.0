// This snippet file was generated by processing the source file:
// ./database-next/read-and-write.js
//
// To make edits to the snippets in this file, please edit the source

// [START rtdb_social_completion_callback_modular]
import { getDatabase, ref, set } from "firebase/database";

const db = getDatabase();
set(ref(db, "users/" + userId), {
  username: name,
  email: email,
  profile_picture: imageUrl,
})
  .then(() => {
    // Data saved successfully!
  })
  .catch((error) => {
    // The write failed...
  });
// [END rtdb_social_completion_callback_modular]
