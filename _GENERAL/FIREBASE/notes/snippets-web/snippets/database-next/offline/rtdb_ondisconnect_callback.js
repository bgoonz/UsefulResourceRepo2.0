// This snippet file was generated by processing the source file:
// ./database-next/offline.js
//
// To make edits to the snippets in this file, please edit the source

// [START rtdb_ondisconnect_callback_modular]
onDisconnect(presenceRef)
  .remove()
  .catch((err) => {
    if (err) {
      console.error("could not establish onDisconnect event", err);
    }
  });
// [END rtdb_ondisconnect_callback_modular]
