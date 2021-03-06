// This snippet file was generated by processing the source file:
// ./auth-next/service-worker-sessions.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_svc_sign_in_email_modular]
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Sign in screen.
const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((result) => {
    // Redirect to profile page after sign-in. The service worker will detect
    // this and append the ID token to the header.
    window.location.assign('/profile');
  })
  .catch((error) => {
    // Error occurred.
  });
// [END auth_svc_sign_in_email_modular]