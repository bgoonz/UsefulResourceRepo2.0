// This snippet file was generated by processing the source file:
// ./auth-next/index.js
//
// To make edits to the snippets in this file, please edit the source

// [START auth_make_email_credential_modular]
import { EmailAuthProvider } from "firebase/auth";

const credential = EmailAuthProvider.credential(email, password);
// [END auth_make_email_credential_modular]
