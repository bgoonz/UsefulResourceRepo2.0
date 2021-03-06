// This snippet file was generated by processing the source file:
// ./storage-next/delete-files.js
//
// To make edits to the snippets in this file, please edit the source

// [START storage_delete_file_modular]
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

// Create a reference to the file to delete
const desertRef = ref(storage, "images/desert.jpg");

// Delete the file
deleteObject(desertRef)
  .then(() => {
    // File deleted successfully
  })
  .catch((error) => {
    // Uh-oh, an error occurred!
  });
// [END storage_delete_file_modular]
