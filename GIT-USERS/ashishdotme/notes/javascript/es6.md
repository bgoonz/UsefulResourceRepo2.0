---
id: es6
title: es6
---

## Let vs Const

In javascript, `var` is used to create variable. With ES6, `let` and `const` were introduced. `Var` still works but its recommended to use `let` and `const`. Use `const` to create constant value whose value never changes and use `let` to create variables whose value is going to change.

## Arrow functions

Arrow function syntax is a bit shorter than the normal syntax since it omits the `function` keyword. When we use `this` inside an arrow function it will keep its context and not change it.

```javascript
const multiply = (number) => number * 2;
```

## Three dots as Rest/Collector

`...names` in the below example is a collector which collects rest of parameters

```javascript
var [city, ...names] = ["Pune", "Ashish", "Ansu", "Anju"];
console.log(city); // Pune
console.log(names); // ["Ashish", "Ansu", "Anju]
```

## Three dots as Spread

Spread takes all elements, all properties and distributes them in new array. Spread is use to create new object to prevent
reference copying as objects and arrays are reference types. So when we reassign arrays or objects, we are copying the pointer,
not the value.

```javascript
const names = ["Pune", "Ashish", "Ansu", "Anju"];
const updatedNames = [...names, "Patel"];
console.log(updatedNames); // [ 'Pune', 'Ashish', 'Ansu', 'Anju', 'Patel' ]
```

## Destructuring

Destructing allows extracting array elements or object properties and store them in variable.

```javascript
// Array destructuring
[firstName, lastName] = ["Ashish", "Patel"];
console.log(firstName); // Ashish
console.log(lastName); // Patel

// Object destructuring
const { firstName } = { firstName: "Ashish", lastName: "Patel" };
console.log(firstName); // Ashish
```
