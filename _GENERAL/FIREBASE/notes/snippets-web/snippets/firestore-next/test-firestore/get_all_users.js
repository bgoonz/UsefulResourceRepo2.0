// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START get_all_users_modular]
import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
// [END get_all_users_modular]
