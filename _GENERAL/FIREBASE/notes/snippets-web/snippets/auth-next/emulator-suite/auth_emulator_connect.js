// This snippet file was generated by processing the source file:
// ./auth-next/emulator-suite.js
//
// To make edits to the snippets in this file, please edit the source

// [START auth_emulator_connect_modular]
import { getAuth, useAuthEmulator } from "firebase/auth";

const auth = getAuth();
useAuthEmulator(auth, "http://localhost:9099");
// [END auth_emulator_connect_modular]
