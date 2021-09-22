// This snippet file was generated by processing the source file:
// ./database-next/sharding.js
//
// To make edits to the snippets in this file, please edit the source

// [START rtdb_multiple_instances_modular]
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const app1 = initializeApp({
  databaseURL: "https://testapp-1234-1.firebaseio.com",
});

const app2 = initializeApp(
  {
    databaseURL: "https://testapp-1234-2.firebaseio.com",
  },
  "app2"
);

// Get the default database instance for an app1
const database1 = getDatabase(app1);

// Get a database instance for app2
const database2 = getDatabase(app2);
// [END rtdb_multiple_instances_modular]
