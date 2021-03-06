// This snippet file was generated by processing the source file:
// ./auth-next/manage.js
//
// To make edits to the snippets in this file, please edit the source

// [START auth_update_user_profile_modular]
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg",
})
  .then(() => {
    // Profile updated!
    // ...
  })
  .catch((error) => {
    // An error occurred
    // ...
  });
// [END auth_update_user_profile_modular]
