// This snippet file was generated by processing the source file:
// ./storage-next/download-files.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START storage_download_via_url_modular]
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();
getDownloadURL(ref(storage, 'images/stars.jpg'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });
// [END storage_download_via_url_modular]