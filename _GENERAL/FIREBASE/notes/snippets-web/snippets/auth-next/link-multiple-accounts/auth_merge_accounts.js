// This snippet file was generated by processing the source file:
// ./auth-next/link-multiple-accounts.js
//
// To make edits to the snippets in this file, please edit the source

// [START auth_merge_accounts_modular]
import {
  getAuth,
  signInWithCredential,
  linkWithCredential,
  OAuthProvider,
} from "firebase/auth";

// The implementation of how you store your user data depends on your application
const repo = new MyUserDataRepo();

// Get reference to the currently signed-in user
const auth = getAuth();
const prevUser = auth.currentUser;

// Get the data which you will want to merge. This should be done now
// while the app is still signed in as this user.
const prevUserData = repo.get(prevUser);

// Delete the user's data now, we will restore it if the merge fails
repo.delete(prevUser);

// Sign in user with the account you want to link to
signInWithCredential(auth, newCredential)
  .then((result) => {
    console.log("Sign In Success", result);
    const currentUser = result.user;
    const currentUserData = repo.get(currentUser);

    // Merge prevUser and currentUser data stored in Firebase.
    // Note: How you handle this is specific to your application
    const mergedData = repo.merge(prevUserData, currentUserData);

    const credential = OAuthProvider.credentialFromResult(result);
    return linkWithCredential(prevUser, credential)
      .then((linkResult) => {
        // Sign in with the newly linked credential
        const linkCredential = OAuthProvider.credentialFromResult(linkResult);
        return signInWithCredential(auth, linkCredential);
      })
      .then((signInResult) => {
        // Save the merged data to the new user
        repo.set(signInResult.user, mergedData);
      });
  })
  .catch((error) => {
    // If there are errors we want to undo the data merge/deletion
    console.log("Sign In Error", error);
    repo.set(prevUser, prevUserData);
  });
// [END auth_merge_accounts_modular]
