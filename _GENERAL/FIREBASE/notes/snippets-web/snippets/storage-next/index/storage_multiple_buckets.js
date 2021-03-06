// This snippet file was generated by processing the source file:
// ./storage-next/index.js
//
// To make edits to the snippets in this file, please edit the source

// [START storage_multiple_buckets_modular]
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Get a non-default Storage bucket
const firebaseApp = getApp();
const storage = getStorage(firebaseApp, "gs://my-custom-bucket");
// [END storage_multiple_buckets_modular]
