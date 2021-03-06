// This snippet file was generated by processing the source file:
// ./auth-next/link-multiple-accounts.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_unlink_provider_modular]
import { getAuth, unlink } from "firebase/auth";

const auth = getAuth();
unlink(auth.currentUser, providerId).then(() => {
  // Auth provider unlinked from account
  // ...
}).catch((error) => {
  // An error happened
  // ...
});
// [END auth_unlink_provider_modular]