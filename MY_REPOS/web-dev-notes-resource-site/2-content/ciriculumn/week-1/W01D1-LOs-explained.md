## Expressions and Functions (W1D1) - Learning Objectives

### Expressions
1. Given a working REPL interface, write and execute a statement that will print "hello world" using console.log
- We can use the `console.log` function to print out statements during code execution. While we are learning introductory material, this may be our end goal. Moving forward, `console.log` will become very valuable not as an end result, but as a tool to aid us in debugging larger and more complex pieces of code.
```js
console.log("hello world");
```

2. Identify that strings are a list of characters defined by using double or single quotes
- In JavaScript, we can define a string using either double or single quotes. Both implementations will be treated the same.
```js
let validString = "hello";
let anotherValidString = 'hello';
```
- In general, we want to be consistent in our code. If we start out using single quotes, use them throughout!

3. Given an arithmetic expression using +, -, *, /, %, compute its value
- We can use the following expressions for mathematical operations in our code:

| Symbol |     Meaning    | Example Usage | Expected Output |
|:------:|:-------------- |:-------------:|:---------------:|
|   +    | Addition       |     7 + 4     |       11        |
|   -    | Subtraction    |     8 - 3     |        5        |
|   *    | Multiplication |     3 * 6     |       18        |
|   /    | Division       |     9 / 3     |        3        |
|   %    | *Modulo        |     7 % 5     |        2        |

- If you are unfamiliar with the term, modulo can be though of as the remainder when doing division.

4. Given an expression, predict if its value is NaN
- In general, any nonsensical arithmetic will result in NaN.
- Math operations involving `undefined` is perhaps the most common mistake:
```js
console.log(undefined + 3); // NaN
console.log("fish" * 2); // NaN
```

5. Construct the truth tables for &&, ||, !
- `&&` means both sides must be true. (AND)
-  `||` means at least one side must be true. (OR)
- `!` negates a value, flipping true/false. (NOT)
- The following table could be expanded to many combinations of `&&`, `||`, `!`, and `()` to group those operations:

|  `A`  |  `B`  | `A && B` | `A || B` | `!A`  | `!B`  |
|:-----:|:-----:|:--------:|:--------:|:-----:|:-----:|
| True  | True  |   True   |   True   | False | False |
| True  | False |   False  |   True   | False | True  |
| False | True  |   False  |   True   | True  | False |
| False | False |   False  |   False  | True  | True  |

6. Given an expression consisting of >, >=, ===, <, <=, compute it’s value

| Operator | Meaning                  | Example Usage  | Example Output |
|:--------:|:------------------------ |:-------------- |:--------------:|
|    >     | greater than             | 10 > 4         | True           |
|    >=    | greater than or equal to | 10 >= (6 + 4)  | True           |
|    ===   | equal to                 | 10 === (5 + 5) | False          |
|    <     | less than                | 10 < (12 - 2)  | False          |
|    <=    | less than or equal to    | 10 <= (12 - 2) | True           |

7. Apply De Morgan’s law to a boolean expression
- De Morgan's law explains how to distribute `!` (a negation) across parentheses.
- If we would like to distribute the negation, we also have to flip the comparison operator between `&&` and `||`:
  - `!(A || B)` is equivalent to `!A && !B`
    - In words: "Neither A or B can be true -> Both A and B must be false"
  - `!(A && B)` is equivalent to `!A || !B`
    - In words: "A and B cannot both be true -> A is false or B is false"

8. Given an expression that utilizes operator precedence, compute its value
- Standard mathematical operator precedence takes place in JavaScript (PEMDAS)
  - 2 + 3 * 4 === 14
  - 4 % 3 + 6 / 2 === 4 (modulo takes place with multiplication/division)

9. Given an expression, use the grouping operator to change it’s evaluation
- Reflecting on order of operations, parentheses (grouping operators) are highest priority. Anything inside is evaluated first.
  - 2 + 3 * 4 === 14
  - (2 + 3) * 4 === 20

10. Given expressions using == and ===, compute their values
- `===` is used for strict equality, while `==` may coerce a value into another type in order to compare them.
- This coercion can sometimes be hard to predict, so we generaly try to avoid it, opting for a `===` strict equality check.
```js
console.log(5 === "5"); // false
console.log(5 == "5"); // true
console.log(0 === false); // false
console.log(0 == false); //true
```

11. Given a code snippet using postfix ++, postfix --, +=, -=, /=, *=, predict the value of labeled lines
- We can use the shorthand in order to perform common mathematical operations and reassignments for a variable.
```js
let number = 0;
number++; // equivalent to number = number + 1, currently 1
number--; // equivalent to number = number - 1, currently 0
number += 10; // equivalent to number = number + 10, currently 10
number -= 2; // equivalent to number = number - 2, currently 8
number /= 4; // equivalent to number = number / 4, currently 2
number *= 7; // equivalent to number = number * 7, currently 14
console.log(number); // 14
```

12. Create and assign a variable using `let` to a string, integer, and a boolean. Read its value and print to the console.
- The keyword `let` creates a variable with the given name.
- We can assign the variable immediately, or later on in our code. If it is not given a value right away, the default value is `undefined`.
- In JavaScript, a variable can be reassigned to a completely different type without issue, so a variable that previously held an integer can be reassigned to a string, etc.
- Whenever we want to use the value in our code, we can reference the variable name.
```js
let num; // num is currently undefined
num = '5'; // num is given the value of the string '5'
num = 5; // reassigned to an integer is no issue
let sum = num + 4; // sum is assigned a value in the same line it is declared. num is also used in the calculation by simply referencing its name.
console.log(sum); // prints 9 to the console.
```

### Intro to Functions
1. Define a function using function declaration
- We can use the keyword `function` to define a function.
- A function declaration requires three components:
  - The name of the function
  - Parameters that the function will utilize, declared within `()`
  - The code to run when the function is invoked, written within `{}`
```js
function myFunction(firstParam, secondParam, thirdParam) {
  // code to run when myFunction is invoked
  // In this code block we can use the parameters passed in to the function
}
```

2. Define a function that calculates the average of two numbers, call it, pass in arguments, and print it’s return value
```js
function average(number1, number2) {
  return (number1 + number2) / 2;
}

let score = average (100, 90);
console.log(score); // 95
```

3. Identify the difference between parameters vs arguments
- Parameters are the list of variables that are specified during a function declaration. They are what are referenced in the code that is run when the function is invoked.
- Arguments are the values that are passed in to the function when it is invoked.
- In the example above, `number1` and `number2` are the parameters while `100` and `90` are the arguments.
