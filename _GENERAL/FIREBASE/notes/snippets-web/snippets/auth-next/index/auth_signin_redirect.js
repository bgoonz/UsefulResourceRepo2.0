// This snippet file was generated by processing the source file:
// ./auth-next/index.js
//
// To make edits to the snippets in this file, please edit the source

// [START auth_signin_redirect_modular]
import { getAuth, signInWithRedirect } from "firebase/auth";

const auth = getAuth();
signInWithRedirect(auth, provider);
// [END auth_signin_redirect_modular]
