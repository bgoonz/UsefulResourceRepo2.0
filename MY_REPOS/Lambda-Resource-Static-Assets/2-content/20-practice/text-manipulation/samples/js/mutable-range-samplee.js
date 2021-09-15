const textManipulation = require('../../dist');
const MutableTextRange = require('../../dist').MutableTextRange;

// Create a text buffer
const buffer = textManipulation.createBuffer('Hello, World Again');

// Create a range
const range = new MutableTextRange([{column: 7, line: 0}, {column: 12, line: 0}], buffer);

// Replace the range
range.setText('Alex');
console.log(range.getText()); // Alex

const text = buffer.getText();
console.log(text); // 'Hello, Alex Again'
