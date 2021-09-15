// path: /js/modulename.js

// This is how you define a module with dependencies. require.js will take care of
// situations where this file is loaded before its dependencies.

// require.js uses the file name as the module name. This module will be referenced
// as "modulename" when required by other modules.

define(["list", "of", "dependencies"], function (list, of, dependencies) {
  // Now you have access to the "list", "of", and "dependencies" modules. require.js
  // doesn't care what you do with them or what you put here, just as long as you
  // return an object. What you return here is what other modules will get when
  // "requiring" this module.
  return {
    list: list,
    of: of,
    dependencies: dependencies,
  };
});
