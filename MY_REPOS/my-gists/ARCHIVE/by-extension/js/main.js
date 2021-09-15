var jQuery = require('jQuery'); // MyJquery;

console.log(jQuery !== window.jQuery); // true
console.log(typeof jQuery.fn.asEventStream === "function"); // true
console.log(typeof window.jQuery.fn.asEventStream === "undefined"); // true
