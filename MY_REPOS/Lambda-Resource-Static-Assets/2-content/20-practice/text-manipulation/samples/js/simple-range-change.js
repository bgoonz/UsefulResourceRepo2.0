const textManipulation = require('../../dist');

// Create a text buffer
const buffer = textManipulation.createBuffer('Hello, World Again');

// Create a range
const range = textManipulation.createTextRange({column: 7, line: 0}, {column: 12, line: 0});

// Replace the range
buffer.replaceRange(range, 'Alex');

const text = buffer.getText();
console.log(text); // 'Hello, Alex Again'
