// This snippet file was generated by processing the source file:
// ./database-next/offline.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START rtdb_ondisconnect_callback_modular]
onDisconnect(presenceRef).remove().catch((err) => {
  if (err) {
    console.error("could not establish onDisconnect event", err);
  }
});
// [END rtdb_ondisconnect_callback_modular]