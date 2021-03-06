// This snippet file was generated by processing the source file:
// ./storage-next/create-reference.js
//
// To make edits to the snippets in this file, please edit the source

// [START storage_ref_properties_modular]
import { getStorage, ref } from "firebase/storage";

const storage = getStorage();
const spaceRef = ref(storage, "images/space.jpg");

// Reference's path is: 'images/space.jpg'
// This is analogous to a file path on disk
spaceRef.fullPath;

// Reference's name is the last segment of the full path: 'space.jpg'
// This is analogous to the file name
spaceRef.name;

// Reference's bucket is the name of the storage bucket where files are stored
spaceRef.bucket;
// [END storage_ref_properties_modular]
