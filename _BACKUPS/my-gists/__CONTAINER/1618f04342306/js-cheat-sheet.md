# Modern JavaScript cheatsheet

## Introduction

### Motivation

This document is a cheatsheet for JavaScript you will frequently encounter in modern projects and in most contemporary sample code.

This guide is not intended to teach you JavaScript from the ground up, but to help developers with basic knowledge who may struggle to get familiar with modern codebases (or let's say to learn React for instance) because of the JavaScript concepts used.

Besides, I will sometimes provide personal tips that may be debatable, but will take care to mention that it's a personal recommendation when I do so.

> **Note :** Most of the concepts introduced here are coming from a JavaScript language update (ES2015, often called ES6). You can find new features added by this update [here](http://es6-features.org); it's very well done.

### Complementary resources

When you struggle to understand a notion, I suggest you look for answers on the following resources:

- [MDN (Mozilla Developer Network)](https://developer.mozilla.org/fr/search?q=)
- [You don't know JS (book)](https://github.com/getify/You-Dont-Know-JS)
- [ES6 Features with examples](http://es6-features.org)
- [WesBos blog (ES6)](http://wesbos.com/category/es6/)
- [Reddit (JavaScript)](https://www.reddit.com/r/javascript/)
- [Google](https://www.google.com/) to find specific blog and resources

## Table of contents

- [Modern JavaScript cheatsheet](#modern-javascript-cheatsheet)
  - [Introduction](#introduction)
    - [Motivation](#motivation)
    - [Complementary resources](#complementary-resources)
  - [Table of contents](#table-of-contents)
  - [Notions](#notions)
    - [Variable declaration: var, const, let](#variable-declaration-var-const-let)
      - [Short explanation](#short-explanation)
      - [Sample code](#sample-code)
      - [Detailed explanation](#detailed-explanation)
      - [External resource](#external-resource)
    - [Arrow function](#-arrow-function)
      - [Sample code](#sample-code-1)
      - [Detailed explanation](#detailed-explanation-1)
        - [Concision](#concision)
        - [_this_ reference](#this-reference)
      - [Useful resources](#useful-resources)
    - [Function default parameter value](#function-default-parameter-value)
      - [External resource](#external-resource-1)
    - [Destructuring objects and arrays](#destructuring-objects-and-arrays)
      - [Explanation with sample code](#explanation-with-sample-code)
      - [Useful resources](#useful-resources-1)
    - [Array methods - map / filter / reduce](#array-methods---map--filter--reduce)
      - [Sample code](#sample-code-2)
      - [Explanation](#explanation)
        - [Array.prototype.map()](#arrayprototypemap)
        - [Array.prototype.filter()](#arrayprototypefilter)
        - [Array.prototype.reduce()](#arrayprototypereduce)
      - [External Resource](#external-resource)
    - [Spread operator "..."](#spread-operator-)
      - [Sample code](#sample-code-3)
      - [Explanation](#explanation-1)
        - [In iterables (like array)](#in-iterables-like-array)
        - [Function rest parameter](#function-rest-parameter)
        - [Object properties spreading](#object-properties-spreading)
      - [External resources](#external-resources)
    - [Object property shorthand](#object-property-shorthand)
      - [Explanation](#explanation-2)
      - [External resources](#external-resources-1)
    - [Promises](#promises)
      - [Sample code](#sample-code-4)
      - [Explanation](#explanation-3)
        - [Create the promise](#create-the-promise)
        - [Use the promise](#use-the-promise)
      - [External Resources](#external-resources)
    - [Template literals](#template-literals)
      - [Sample code](#sample-code-5)
      - [External resources](#external-resources-2)
    - [Imports / Exports](#imports--exports)
      - [Explanation with sample code](#explanation-with-sample-code-1)
      - [External resources](#external-resources-3)
    - [JavaScript _this_](#-javascript-this)
      - [External resources](#external-resources-4)
    - [Class](#class)
      - [Samples](#samples)
      - [External resources](#external-resources-5)
  - [Glossary](#glossary)
    - [Scope](#-scope)
    - [Variable mutation](#-variable-mutation)

## Notions

### Variable declaration: var, const, let

In JavaScript, there are three keywords available to declare a variable, and each has its differences. Those are `var`, `let` and `const`.

#### Short explanation

Variables declared with `const` keyword can't be reassigned, while `let` and `var` can.

I recommend always declaring your variables with `const` by default, and with `let` if you need to _mutate_ it or reassign it later.

<table>
  <tr>
    <th></th>
    <th>Scope</th>
    <th>Reassignable</th>
    <th>Mutable</th>
   <th><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting">Hoisting</a></th>
  </tr>
  <tr>
    <th>const</th>
    <td>Block</td>
    <td>No</td>
    <td><a href="#const_mutable_sample">Yes</a></td>
    <td>No</td>
  </tr>
  <tr>
    <th>let</th>
    <td>Block</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
   <tr>
    <th>var</th>
    <td>Function</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
</table>

#### Sample code

```javascript
const person = "Nick";
person = "John"; // Will raise an error, person can't be reassigned
```

```javascript
let person = "Nick";
person = "John";
console.log(person); // "John", reassignment is allowed with let
```

#### Detailed explanation

The [_scope_](#scope_def) of a variable roughly means "where is this variable available in the code".

- **var**

`var` declared variables are _function scoped_, meaning that when a variable is created in a function, everything in that function can access that variable. Conversely, a _block scoped_ variable created in a function can't be accessed outside this function.

I recommend you to picture it as if an _X scoped_ variable meant that this variable was a property of X.

```javascript
function myFunction() {
  var myVar = "Nick";
  console.log(myVar); // "Nick" - myVar is accessible inside the function
}
console.log(myVar); // Undefined, myVar is not accessible outside the function.
```

Still focusing on the variable scope, here is a more subtle example:

```javascript
function myFunction() {
  var myVar = "Nick";
  if (true) {
    var myVar = "John";
    console.log(myVar); // "John"
    // actually, myVar being function scoped, we just erased the previous myVar value "Nick" for "John"
  }
  console.log(myVar); // "John" - see how the instructions in the if block affected this value
}
console.log(myVar); // Undefined, myVar is not accessible outside the function.
```

Besides, _var_ declared variables are moved to the top of the scope at execution. This is what we call [var hoisting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting).

This portion of code:

```js
console.log(myVar); // undefined -- no error raised
var myVar = 2;
```

is understood at execution like:

```js
var myVar;
console.log(myVar); // undefined -- no error raised
myVar = 2;
```

- **let**

`var` and `let ` are about the same, but `let` declared variables are _block scoped_ and they are **not** hoisted.

Let's see the impact of block-scoping taking our previous example:

```javascript
function myFunction() {
  let myVar = "Nick";
  if (true) {
    let myVar = "John";
    console.log(myVar); // "John"
    // actually, myVar being block scoped, we just created a new variable myVar.
    // this variable is not accessible outside this block and totally independent
    // from the first myVar created !
  }
  console.log(myVar); // "Nick", see how the instructions in the if block DID NOT affect this value
}
console.log(myVar); // Undefined, myVar is not accessible outside the function.
```

Now, what it means for _let_ (and _const_) variables for not being hoisted:

```js
console.log(myVar); // raises an error !
let myVar = 2;
```

- **const**

A `const`, as well as `let`, declared variables are _block scoped_ and not hoisted, but they can't be reassigned nor re-declared afterwards.

```js
const myVar = "Nick";
myVar = "John"; // raises an error, reassignment is not allowed
```

```js
const myVar = "Nick";
const myVar = "John"; // raises an error, re-declaration is not allowed
```

<a name="const_mutable_sample"></a> But there is a subtlety : `const` variables are not [**immutable**](#mutation_def) ! Concretely, it means that _object_ and _array_ `const` declared variables **can** be mutated.

For objects:

```js
const person = {
  name: "Nick",
};
person.name = "John"; // this will work ! person variable is not completely reassigned, but mutated
console.log(person.name); // "John"
person = "Sandra"; // raises an error, because reassignment is not allowed with const declared variables
```

For arrays:

```js
const person = [];
person.push("John"); // this will work ! person variable is not completely reassigned, but mutated
console.log(person[0]); // "John"
person = ["Nick"]; // raises an error, because reassignment is not allowed with const declared variables
```

#### External resource

- [How let and const are scoped in JavaScript - WesBos](http://wesbos.com/javascript-scoping/)
- [Temporal Dead Zone (TDZ) Demystified](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified)

### <a name="arrow_func_concept"></a> Arrow function

The ES6 JavaScript update has introduced _arrow functions_, which are another way to declare and use functions. Here are the benefits they bring:

- More concise
- _this_ is picked up from surroundings
- implicit return

#### Sample code

- Concision and implicit return

```js
function double(x) {
  return x * 2;
} // Traditional way
console.log(double(2)); // 4
```

```js
const double = (x) => x * 2; // Same function written as an arrow function with implicit return
console.log(double(2)); // 4
```

- _this_ reference

In an arrow function, _this_ is equal to the _this_ value of the enclosing execution context. Basically, with arrow functions you don't have to do the "that = this" trick before calling a function inside a function anymore.

```js
function myFunc() {
  this.myVar = 0;
  setTimeout(() => {
    this.myVar++;
    console.log(this.myVar); // 1
  }, 0);
}
```

#### Detailed explanation

##### Concision

Arrow functions are more concise than traditional functions in many ways. Let's review all the possible cases:

- Implicit VS Explicit return

An **explicit return** is a function where the _return_ keyword is used in its body.

```js
function double(x) {
  return x * 2; // this function explicitly returns x * 2, *return* keyword is used
}
```

In the traditional way of writing functions, the return was always explicit. But with arrow functions, you can do _implicit return_ which means that you don't need to use the keyword _return_ to return a value.

To do an implicit return, the code must be written in a one-line sentence.

```js
const double = (x) => {
  return x * 2; // Explicit return here
};
```

Since there only is a return value here, we can do an implicit return.

```js
const double = (x) => x * 2;
```

To do so, we only need to **remove the brackets** and the **return** keyword. That's why it's called an _implicit_ return, the _return_ keyword is not there but this function will indeed return `x * 2`.

> **Note :** If your function does not return a value (with _side effects_), it doesn't do an explicit nor an implicit return.

- Only one argument

If your function only takes one parameter, you can omit the parenthesis around it. If we take back the above _double_ code:

```js
const double = (x) => x * 2; // this arrow function only takes one parameter
```

Parenthesis around the parameter can be avoided:

```js
const double = (x) => x * 2; // this arrow function only takes one parameter
```

- No arguments

When there is no argument provided to an arrow function, you need to provide parentheses or it won't be valid syntax.

```js
() => {
  // parenthesis are provided, everything is fine
  const x = 2;
  return x;
};
```

```js
  => { // No parenthesis, this won't work!
    const x = 2;
    return x;
  }
```

##### _this_ reference

To understand this subtlety introduced with arrow functions, you must understand how [this](#this_def) behaves in JavaScript.

In an arrow function, _this_ is equal to the _this_ value of the enclosing execution context. What it means is that an arrow function doesn't create a new _this_, it grabs it from its surrounding instead.

Without arrow function, if you wanted to access a variable from _this_ in a function inside a function, you had to use the _that = this_ or _self = this_ trick.

For instance, using setTimeout function inside myFunc:

```js
function myFunc() {
  this.myVar = 0;
  var that = this; // that = this trick
  setTimeout(function () {
    // A new *this* is created in this function scope
    that.myVar++;
    console.log(that.myVar); // 1

    console.log(this.myVar); // undefined -- see function declaration above
  }, 0);
}
```

But with arrow function, _this_ is taken from its surrounding:

```js
function myFunc() {
  this.myVar = 0;
  setTimeout(() => {
    // this taken from surrounding, meaning myFunc here
    this.myVar++;
    console.log(this.myVar); // 1
  }, 0);
}
```

#### Useful resources

- [Arrow functions introduction - WesBos](http://wesbos.com/arrow-functions/)
- [JavaScript arrow function - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Arrow function and lexical _this_](https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4)

### Function default parameter value

Starting from ES2015 JavaScript update, you can set default value to your function parameters using the following syntax:

```js
function myFunc(x = 10) {
  return x;
}
console.log(myFunc()); // 10 -- no value is provided so x default value 10 is assigned to x in myFunc
console.log(myFunc(5)); // 5 -- a value is provided so x is equal to 5 in myFunc

console.log(myFunc(undefined)); // 10 -- undefined value is provided so default value is assigned to x
console.log(myFunc(null)); // null -- a value (null) is provided, see below for more details
```

The default parameter is applied in two and only two situations:

- No parameter provided
- _undefined_ parameter provided

In other words, if you pass in _null_ the default parameter **won't be applied**.

> **Note :** Default value assignment can be used with destructured parameters as well (see next notion to see an example)

#### External resource

- [Default parameter value - ES6 Features](http://es6-features.org/#DefaultParameterValues)
- [Default parameters - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

### Destructuring objects and arrays

_Destructuring_ is a convenient way of creating new variables by extracting some values from data stored in objects or arrays.

To name a few useful cases, _destructuring_ can be used to destructure function parameters or _this.props_ in React projects for instance.

#### Explanation with sample code

- Object

Lets consider the following object for all the samples:

```js
const person = {
  firstName: "Nick",
  lastName: "Anderson",
  age: 35,
  sex: "M",
};
```

Without destructuring

```js
const first = person.firstName;
const age = person.age;
const city = person.city || "Paris";
```

With destructuring, all in one line:

```js
const { firstName: first, age, city = "Paris" } = person; // That's it !

console.log(age); // 35 -- A new variable age is created and is equal to person.age
console.log(first); // "Nick" -- A new variable first is created and is equal to person.firstName
console.log(firstName); // Undefined -- person.firstName exists BUT the new variable created is named first
console.log(city); // "Paris" -- A new variable city is created and since person.city is undefined, city is equal to the default value provided "Paris".
```

**Note :** In `const { age } = person;`, the brackets after _const_ keyword are not used to declare an object nor a block but is the _destructuring_ syntax.

- Function parameters

_Destructuring_ is often used to destructure objects parameters in functions.

Without destructuring

```js
function joinFirstLastName(person) {
  const firstName = person.firstName;
  const lastName = person.lastName;
  return firstName + "-" + lastName;
}

joinFirstLastName(person); // "Nick-Anderson"
```

In destructuring the object parameter _person_, we get a more concise function:

```js
function joinFirstLastName({ firstName, lastName }) {
  // we create firstName and lastName variables by destructuring person parameter
  return firstName + "-" + lastName;
}

joinFirstLastName(person); // "Nick-Anderson"
```

Destructuring is even more pleasant to use with [arrow functions](#arrow_func_concept):

```js
const joinFirstLastName = ({ firstName, lastName }) =>
  firstName + "-" + lastName;

joinFirstLastName(person); // "Nick-Anderson"
```

- Array

Lets consider the following array:

```js
const myArray = ["a", "b", "c"];
```

Without destructuring

```js
const x = myArray[0];
const y = myArray[1];
```

With destructuring

```js
const [x, y] = myArray; // That's it !

console.log(x); // "a"
console.log(y); // "b"
```

#### Useful resources

- [ES6 Features - Destructuring Assignment](http://es6-features.org/#ArrayMatching)
- [Destructuring Objects - WesBos](http://wesbos.com/destructuring-objects/)
- [ExploringJS - Destructuring](http://exploringjs.com/es6/ch_destructuring.html)

### Array methods - map / filter / reduce

_Map_, _filter_ and _reduce_ are array methods that are coming from a programming paradigm named [_functional programming_](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0).

To sum it up:

- **Array.prototype.map()** takes an array, does something on its elements and returns an array with the transformed elements.
- **Array.prototype.filter()** takes an array, decides element by element if it should keep it or not and returns an array with the kept elements only
- **Array.prototype.reduce()** takes an array and aggregates the elements into a single value (which is returned)

I recommend to use them as much as possible in following the principles of functional programming, because they are composable, concise and elegant.

With those three methods you can avoid the use of _for_ and _forEach_ loops in must situations. When you are tempted to do a _for_ loop, try to do it with _map_, _filter_ and _reduce_ composed. You might struggle to do it at first because it requires you to learn a new way of thinking, but once you've got it things gets easier.

#### Sample code

```js
const numbers = [0, 1, 2, 3, 4, 5, 6];
const doubledNumbers = numbers.map((n) => n * 2); // [0, 2, 4, 6, 8, 10, 12]
const parNumbers = numbers.filter((n) => n % 2 === 0); // [0, 2, 4, 6]
const sum = numbers.reduce((prev, next) => prev + next, 0); // 21
```

Compute total grade sum for students above 10 by composing map, filter and reduce:

```js
const students = [
  { name: "Nick", grade: 10 },
  { name: "John", grade: 15 },
  { name: "Julia", grade: 19 },
  { name: "Nathalie", grade: 9 },
];

const aboveTenSum = students
  .map((student) => student.grade) // we map the students array to an array of their grades
  .filter((grade) => grade >= 10) // we filter the grades array to keep those above 10
  .reduce((prev, next) => prev + next, 0); // we sum all the grades above 10 one by one

console.log(aboveTenSum); // 44 -- 10 (Nick) + 15 (John) + 19 (Julia), Nathalie below 10 is ignored
```

#### Explanation

Let's consider the following array of numbers for our examples:

```js
const numbers = [0, 1, 2, 3, 4, 5, 6];
```

##### Array.prototype.map()

```js
const doubledNumbers = numbers.map(function (n) {
  return n * 2;
});
console.log(doubledNumbers); // [0, 2, 4, 6, 8, 10, 12]
```

What's happening here ? We are using .map on the _numbers_ array, map is iterating on each element of the array and passes it to our function. The goal of the function is to produce and return a new value from the one passed so that map can replace it.

Lets extract this function to make it more clear, just for this once:

```js
const doubleN = function (n) {
  return n * 2;
};
const doubledNumbers = numbers.map(doubleN);
console.log(doubledNumbers); // [0, 2, 4, 6, 8, 10, 12]
```

`numbers.map(doubleN)` produces `[doubleN(0), doubleN(1), doubleN(2), doubleN(3), doubleN(4), doubleN(5), doubleN(6)]` which is equal to `[0, 2, 4, 6, 8, 10, 12]`.

> **Note :** If you do not need to return a new array and just want to do a loop that have side effects, you might just want to use a for / forEach loop instead of a map.

##### Array.prototype.filter()

```js
const parNumbers = numbers.filter(function (n) {
  return n % 2 === 0; // true if "n" is par, false if "n" isn't
});
console.log(parNumbers); // [0, 2, 4, 6]
```

We are using .filter on the _numbers_ array, filter is iterating on each element of the array and passes it to our function. The goal of the function is to return a boolean that will determine whether the current value will be kept or not. Filter then returns the array with only the kept values.

##### Array.prototype.reduce()

The reduce method goal is to _reduce_ all elements of the array it iterates on into a single value. How it aggregates those elements is up to you.

```js
const sum = numbers.reduce(
  function (acc, n) {
    return acc + n;
  },
  0 // accumulator variable value at first iteration step
);

console.log(sum); //21
```

Just like for .map and .filter methods, .reduce is applied on an array and takes a function as first parameter.

This time though, there are changes:

- .reduce takes two parameters

The first parameter is a function that will be called at each iteration step.

The second parameter is the value of the accumulator variable (_acc_ here) at the first iteration step (read next point to understand).

- Function parameters

The function you pass as the first parameter of .reduce takes two parameters. The first one (_acc_ here) is the accumulator variable, whereas the second parameter (_n_) is the current element.

The accumulator variable is equal to the return value of your function at the **previous** iteration step. At the first step of the iteration, _acc_ is equal to the value you passed as .reduce second parameter.

###### At first iteration step

`acc = 0` because we passed in 0 as second parameter for reduce

`n = 0` first element of the _number_ array

Function returns _acc_ + _n_ --> 0 + 0 --> 0

###### At second iteration step

`acc = 0` because its the value the function returned at the previous iteration step

`n = 1` second element of the _number_ array

Function returns _acc_ + _n_ --> 0 + 1 --> 1

###### At third iteration step

`acc = 1` because its the value the function returned at the previous iteration step

`n = 2` third element of the _number_ array

Function returns _acc_ + _n_ --> 1 + 2 --> 3

###### At fourth iteration step

`acc = 3` because it's the value the function returned at the previous iteration step

`n = 3` fourth element of the _number_ array

Function returns _acc_ + _n_ --> 3 + 3 --> 6

###### [...] At last iteration step

`acc = 15` because it's the value the function returned at the previous iteration step

`n = 6` last element of the _number_ array

Function returns _acc_ + _n_ --> 15 + 6 --> 21

As it is the last iteration step, **.reduce** returns 21.

#### External Resource

- [Understanding map / filter / reduce in JS](https://hackernoon.com/understanding-map-filter-and-reduce-in-javascript-5df1c7eee464)

### Spread operator "..."

The spread operator `...` has been introduced with ES2015 and is used to expand elements of an iterable (like an array) into places where multiple elements can fit.

#### Sample code

```js
const arr1 = ["a", "b", "c"];
const arr2 = [...arr1, "d", "e", "f"]; // ["a", "b", "c", "d", "e", "f"]
```

```js
function myFunc(x, y, ...params) {
  console.log(x);
  console.log(y);
  console.log(params);
}

myFunc("a", "b", "c", "d", "e", "f");
// "a"
// "b"
// ["c", "d", "e", "f"]
```

```js
const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

const n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

#### Explanation

##### In iterables (like arrays)

If we have the two following arrays:

```js
const arr1 = ["a", "b", "c"];
const arr2 = [arr1, "d", "e", "f"]; // [["a", "b", "c"], "d", "e", "f"]
```

_arr2_ first element is an array, because _arr1_ is injected as is into _arr2_. But what we want is _arr2_ to be an array of letters. To do so, we can _spread_ the elements of _arr1_ into _arr2_.

With spread operator

```js
const arr1 = ["a", "b", "c"];
const arr2 = [...arr1, "d", "e", "f"]; // ["a", "b", "c", "d", "e", "f"]
```

##### Function rest parameter

In function parameters, we can use the rest operator in order to inject parameters into an array we can loop in. There is already an **argument** object bound to every function that is equal to an array of all the parameters passed-in to the function.

```js
function myFunc() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

myFunc("Nick", "Anderson", 10, 12, 6);
// "Nick"
// "Anderson"
// 10
// 12
// 6
```

But lets say that we want this function to create a new student with its grades and with its average grade. Wouldn't it be more convenient to extract the first two parameters into two separated variables, and then have all the grades in an array we can iterate over?

That's exactly what the rest operator allows us to do!

```js
function createStudent(firstName, lastName, ...grades) {
  // firstName = "Nick"
  // lastName = "Anderson"
  // [10, 12, 6] -- "..." takes all other parameters passed and creates a "grades" array variable that contains them

  const avgGrade = grades.reduce((acc, curr) => acc + curr, 0) / grades.length; // computes average grade from grades

  return {
    firstName: firstName,
    lastName: lastName,
    grades: grades,
    avgGrade: avgGrade,
  };
}

const student = createStudent("Nick", "Anderson", 10, 12, 6);
console.log(student);
// {
//   firstName: "Nick",
//   lastName: "Anderson",
//   grades: [10, 12, 6],
//   avgGrade: 9,33
// }
```

> **Note :** createStudent function is bad because we don't check if grades.length exists or is different from 0. But its easier to read this way so I didn't handled this case.

##### Object properties spreading

For this one I recommend you read previous explanations about the rest operator on iterables and function parameters.

```js
const myObj = { x: 1, y: 2, a: 3, b: 4 };
const { x, y, ...z } = myObj; // object destructuring here
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// z is the rest of the object destructured : myObj object minus x and y properties destructured

const n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }

// Here z object properties are spread into n
```

#### External resources

- [TC39 - Object rest/spread](https://github.com/tc39/proposal-object-rest-spread)
- [Spread operator introduction - WesBos](https://github.com/wesbos/es6-articles/blob/master/28%20-%20Spread%20Operator%20Introduction.md)
- [JavaScript & the spread operator](https://codeburst.io/javascript-the-spread-operator-a867a71668ca)
- [6 Great uses of the spread operator](https://davidwalsh.name/spread-operator)

### Object property shorthand

When assigning a variable to an object property, if the variable name is equal to the property name, you can do the following:

```js
const x = 10;
const myObj = { x };
console.log(myObj.x); // 10
```

#### Explanation

Usually (pre-ES2015) when you declare a new _object literal_ and want to use variables as object properties values, you would write this kind of code:

```js
const x = 10;
const y = 20;

const myObj = {
  x: x, // assigning x variable value to myObj.x
  y: y, // assigning y variable value to myObj.y
};

console.log(myObj.x); // 10
console.log(myObj.y); // 20
```

As you can see, this is quite repetitive because the properties name of myObj are the same as the variable names you want to assign to those properties.

With ES2015, when the variable name is the same as the property name, you can do this shorthand:

```js
const x = 10;
const y = 20;

const myObj = {
  x,
  y,
};

console.log(myObj.x); // 10
console.log(myObj.y); // 20
```

#### External resources

- [Property shorthand - ES6 Features](http://es6-features.org/#PropertyShorthand)

### Promises

A promise is an object which can be returned synchronously from an asynchronous function ([ref](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261#3cd0)).

Promises can be used to avoid [callback hell](http://callbackhell.com/) and they are more and more frequently encountered in modern JavaScript projects.

#### Sample code

```js
const fetchingPosts = new Promise((res, rej) => {
  $.get("/posts")
    .done((posts) => res(posts))
    .fail((err) => rej(err));
});

fetchingPosts
  .then((posts) => console.log(posts))
  .catch((err) => console.log(err));
```

#### Explanation

When you do an _AJAX request_ the response is not synchronous because you want a resource that takes some time to come. It even may never come if the resource you have requested is unavailable for some reason (404).

To handle that kind of situations, ES2015 has given us _promises_. Promises can have three different states:

- Pending
- Resolved
- Rejected

Let's say we want to use promises to handle an AJAX request to fetch the resource X.

##### Create the promise

We firstly are going to create a promise. We will use the jQuery get method to do our AJAX request to X.

```js
const xFetcherPromise = new Promise(function (resolve, reject) {
  // Create promise using "new" keyword and store it into a variable
  // Promise constructor takes a function parameter which has resolve and reject parameters itself
  $.get("X") // Launch the AJAX request
    .done(function (X) {
      // Once the request is done...
      resolve(X); // ... resolve the promise with the X value as parameter
    })
    .fail(function (error) {
      // If the request has failed...
      reject(error); // ... reject the promise with the error as parameter
    });
});
```

As seen in the above sample, the Promise object takes a function which takes two parameters **resolve** and **reject**. Those parameters are functions which when called are going to move the promise _pending_ state to respectively a _resolved_ and _rejected_ state.

But at the moment, the promise has not been used but only has been declared and stored into _xFetcherPromise_ variable! So it doesn't have a current state.

##### Use the promise

To use the promise, we do the following:

```js
xFetcherPromise
  .then(function (X) {
    console.log(X);
  })
  .catch(function (err) {
    console.log(err);
  });
```

`.then` is a method that once called will put the xFetcherPromise in **pending** state. When called, the promise body runs and in this case an AJAX call is being done.

If it succeeds, _resolve_ is called and the function passed as `.then` parameter is executed.

If it fails, _reject_ is called and the function passed as `.catch` parameter is executed.

#### External Resources

- [JavaScript Promises for dummies - Jecelyn Yeen](https://scotch.io/tutorials/javascript-promises-for-dummies)
- [JavaScript Promise API - David Walsh](https://davidwalsh.name/promises)
- [Using promises - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [What is a promise - Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
- [JavaScript Promises: an Introduction - Jake Archibald](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
- [Promise documentation - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### Template literals

Template literals is an [_expression interpolation_](https://en.wikipedia.org/wiki/String_interpolation) for single and multiple-line strings.

In other words, it is a new string syntax in which you can conveniently use any JavaScript expressions (variables for instance).

#### Sample code

```js
const name = "Nick";
`Hello ${name}, the following expression is equal to four : ${2 + 2}`;

// Hello Nick, the following expression is equal to four: 4
```

#### External resources

- [String interpolation - ES6 Features](http://es6-features.org/#StringInterpolation)
- [ES6 Template Strings - Addy Osmani](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings)

### Imports / Exports

ES6 modules are used to access variables or functions in a module explicitly exported by the modules it imports.

I highly recommend to take a look at MDN resources on import / export (see external resources below), it is both simple and complete.

#### Explanation with sample code

- Named exports

Named exports are useful to export several values from a module. You can only name-export variables (not functions or class), so if you want to name-export a function, you have to store it in a variable before.

```js
// mathConstants.js
export const pi = 3.14;
export const exp = 2.7;
export const alpha = 0.35;

// -------------

// myFile.js
import { pi, exp } from "./mathConstants.js"; // Destructuring import
console.log(pi); // 3.14
console.log(exp); // 2.7

// -------------

// mySecondFile.js
import * as constants from "./mathConstants.js"; // Inject all exported values into constants variable
console.log(constants.pi); // 3.14
console.log(constants.exp); // 2.7
```

- Default import / export

Concerning the default export, there is only a single default export per module. A default export can be a function, a class, an object or anything else. This value is considered the "main" exported value since it will be the simplest to import. [Ref: MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#Description)

```js
// coolNumber.js
const ultimateNumber = 42;
export default ultimateNumber;

// ------------

// myFile.js
import number from "./coolNumber.js";
// Default export, independently from its name, is automatically injected into number variable;
console.log(number); // 42
```

Function exporting:

```js
// sum.js
export default function sum(x, y) {
  return x + y;
}
// -------------

// myFile.js
import sum from "./sum.js";
const result = sum(1, 2);
console.log(result); // 3
```

#### External resources

- [Export - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [Import - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Understanding ES6 Modules](https://www.sitepoint.com/understanding-es6-modules/)
- [Modules in JavaScript](http://exploringjs.com/es6/ch_modules.html#sec_modules-in-javascript)

### <a name="this_def"></a> JavaScript _this_

_this_ operator behaves differently than in other languages and is in most cases determined by how a function is called. ([Ref: MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)).

This notion having many subtleties and being quite hard, I highly suggest you to deep dive in the external resources below. Thus, I will provide what I personally have in mind to determine what _this_ is equal to. I have learned this tip from [this article written by Yehuda Katz](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/).

```js
function myFunc() {
  ...
}

// After each statement you find the value of *this* in myFunc

myFunc.call("myString", "hello") // "myString" -- first .call parameter value is injected into *this*

// In non-strict-mode
myFunc("hello") // window -- myFunc() is syntax sugar for myFunc.call(window, "hello")

// In strict-mode
myFunc("hello") // undefined -- myFunc() is syntax sugar for myFunc.call(undefined, "hello")
```

```js
var person = {
  myFunc: function() { ... }
}

person.myFunc.call(person, "test") // person Object -- first call parameter is injected into *this*
person.myFunc("test") // person Object -- person.myFunc() is syntax sugar for person.myFunc.call(person, "test")

var myBoundFunc = person.myFunc.bind("hello") // Creates a new function in which we inject "hello" in *this* value
person.myFunc("test") // person Object -- The bind method has no effect on the original method
myBoundFunc("test") // "hello" -- myBoundFunc is person.myFunc with "hello" bound to *this*
```

#### External resources

- [Understanding JavaScript Function Invocation and "this" - Yehuda Katz](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)
- [JavaScript this - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

### Class

JavaScript is a [prototype-based](https://en.wikipedia.org/wiki/Prototype-based_programming) language (whereas Java is [class-based](https://en.wikipedia.org/wiki/Class-based_programming) language, for instance). ES6 has introduced JavaScript classes which are meant to be a syntactic sugar for prototype-based inheritance and **not** a new class-based inheritance model ([ref](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)).

The word _class_ is indeed error prone if you are familiar with classes in other languages. If you do, avoid assuming how JavaScript classes work on this basis and consider it an entirely different notion.

Since this document is not an attempt to teach you the language from the ground up, I will consider you know what prototypes are and how they behave. But here are some links I found great to understand this notion:

- [Understanding Prototypes in JS - Yehuda Katz](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
- [A plain english guide to JS prototypes - Sebastian Porto](http://sporto.github.io/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/)
- [Inheritance and the prototype chain - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

#### Samples

Before ES6, prototype syntax:

```js
var Person = function (name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.stringSentence = function () {
  return "Hello, my name is " + this.name + " and I'm " + this.age;
};
```

With ES6 class syntax:

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  stringSentence() {
    return "Hello, my name is " + this.name + " and I'm " + this.age;
  }
}

const myPerson = new Person("Manu", 23);
console.log(myPerson.age); // 23
console.log(myPerson.stringSentence()); // "Hello, my name is Manu and I'm 23
```

#### External resources

For prototype understanding:

- [Understanding Prototypes in JS - Yehuda Katz](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
- [A plain english guide to JS prototypes - Sebastian Porto](http://sporto.github.io/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/)
- [Inheritance and the prototype chain - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

For classes understanding:

- [ES6 Classes in Depth - Nicolas Bevacqua](https://ponyfoo.com/articles/es6-classes-in-depth)
- [ES6 Features - Classes](http://es6-features.org/#ClassDefinition)
- [JavaScript Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Glossary

### <a name="scope_def"></a> Scope

The context in which values and expressions are "visible," or can be referenced. If a variable or other expression is not "in the current scope," then it is unavailable for use.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Scope)

### <a name="mutation_def"></a> Variable mutation

A variable is said to have been mutated when its initial value has changed afterwards.

```js
var myArray = [];
myArray.push("firstEl"); // myArray is being mutated
```

A variable is said to be _immutable_ if it can't be mutated.

[Check MDN Mutable article](https://developer.mozilla.org/en-US/docs/Glossary/Mutable) for more details.
