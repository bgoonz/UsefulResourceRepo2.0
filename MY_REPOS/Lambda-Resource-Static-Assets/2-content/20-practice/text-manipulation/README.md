# Text Manipulation


## Overview
Manipulating and changing text ranges can be tricky and tedious at times.
The intent of this project was to offer interfaces and functions that would
make text ranges and buffers easy to operate on. Allowing for easy text 
transformations, that may span over multiple lines. 

This library is supported in both **TypeScript** and **JavaScript**.

**Typescript declaration files are contained within the library module.**

## Getting Stated

```bash
npm install -S text-manipulation 
```

## Text Manipulation Documentation
[Documentation (Click Here)](./docs/README.md)

## JavaScript Examples

### Manipulating a Text Range in a Buffer
```javascript
const textManipulation = require('text-manipulation');

// Create a text buffer
const buffer = textManipulation.createBuffer('Hello, World Again');

// Create a range
const range = textManipulation.createTextRange({column: 7, line: 0}, {column: 12, line: 0});

// Replace the range
buffer.replaceRange(range, 'Alex');

const text = buffer.getText();
console.log(text); // 'Hello, Alex Again'

```

### Changing a Range with a MutableTextRange
The MutableTextRange class provides the abstraction to change a given range

```javascript
const textManipulation = require('text-manipulation');

// Create a text buffer
const buffer = textManipulation.createBuffer('Hello, World Again');

// Create a range
const range = new MutableTextRange([{column: 7, line: 0}, {column: 12, line: 0}], buffer);

// Replace the range
range.setText('Alex');
console.log(range.getText()); // Alex

const text = buffer.getText();
console.log(text); // 'Hello, Alex Again'
```
