// path: /js/config.js

// require.config lets you tell require where certain modules exist, how to load
// libraries, etc.

// This file is loaded automatically by require.js because we referenced it in
// the 'data-main' attribute when including the require.js library.

require.config({
  // main.js is your application starting point (call it whatever you want). This
  // references /path/to/configjs/main.js, in this case: /js/main.js
  deps: ["main"]

  // You can do more with require.config, such as managing dependencies not built
  // with require.js, but this is really all you need to get started.
});
