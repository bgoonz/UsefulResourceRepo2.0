// This snippet file was generated by processing the source file:
// ./auth-next/emulator-suite.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_emulator_google_credential_modular]
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
signInWithCredential(auth, GoogleAuthProvider.credential(
  '{"sub": "abc123", "email": "foo@example.com", "email_verified": true}'
));  
// [END auth_emulator_google_credential_modular]