---
title: 'JavaScript: const, function, execution context, call stack'
categories:
  - programming
tags:
  - JavaScript
---

### What's `const`?

It's a piece of data whose position in memory cannot be changed. That means the value of `const` cannot be changed through reassignment, and it can't be redeclared.

```javascript
const constA = 'a';
const constB = { zero: 0, one: 1, two: 2 };
const constC = [0, 1, 2];
```

### What does the keyword _function_ mean?

It means _**go save in memory this particular functionality**_.

```javascript
function functionA() {
  console.log('I am function A');
}

console.log(functionA);
> ƒ functionA(){
		console.log("I am function A");
	}
```

### What is _global execution context_?

It's a space in which we execute our code. It's created as soon as we start executing the code. It's made up of:

- _**thread of execution**_ (parsing and executing the code line
  after line)
- _**live memory**_ of variables with data (_Global
  Variable Environment_)

### What happens when we run/call/invoke a function?

A new execution context, a local one, is created. It's made up of a _**thread of execution**_ and a _**live memory**_ (_Variable environment_), just as the global one.

```javascript
function functionB() {
  return 'I am the output of the functionB';
}

const outputB = functionB();
```

### What are a function's _parameter_ and a function's _argument_?

The _**parameter**_ is a placeholder. The **_argument_** is a value get passed to the function.

```javascript
function functionC(parameter) {
  return 'The argument passed to the function is: ' + parameter;
}

const argument = 'value';
const output = functionC(argument);
```

### What is the Call stack?

The Call stack is JavaScript way to track which execution context we are in (what function is currently being run) and where to return to after the execution context thread is topped off.
