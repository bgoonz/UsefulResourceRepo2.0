// This snippet file was generated by processing the source file:
// ./auth-next/manage.js
//
// To make edits to the snippets in this file, please edit the source

// [START send_email_verification_modular]
import { getAuth, sendEmailVerification } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

sendEmailVerification(user)
  .then(() => {
    // Email sent.
  })
  .catch((error) => {
    // An error ocurred
    // ...
  });
// [END send_email_verification_modular]
