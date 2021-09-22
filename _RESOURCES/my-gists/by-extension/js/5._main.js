// path: /js/main.js

// This is how you use modules without defining a new module at the same time. Think
// of this as "import ..." or "include ...".
require(["modulename", "modulewithnodeps"], function (
  modulename,
  modulewithnodeps
) {
  // Prints: modulename: {"list":["a","list"],"of":"the word 'of'","dependencies":{"a dependency":["a","list"]}}
  console.log("modulename:", JSON.stringify(modulename));

  // Prints: modulewithnodeps: {"this":"is","just":["an","object"]}
  console.log("modulewithnodeps:", JSON.stringify(modulewithnodeps));
});
