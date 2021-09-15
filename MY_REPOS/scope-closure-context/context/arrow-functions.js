/*

Arrow Functions aka Fat Arrows
=> : A more concise way of declaring a function and also considers the behavior of this and context.

*/
let average = function (num1, num2) {
  let avg = (num1 + num2) / 2;
  return avg;
};

let averageArrow = (num1, num2) => {
  let avg = (num1 + num2) / 2;
  return avg;
};
/*
As you can see the arrow function is shorter and easier to read.

Anatomy of an Arrow Function

If there is only a single parameter there is no need to add parenthesis before the arrow function.
However if there are zero parameters then you must add an empty set of parentheses.
Single Expression Arrow Functions

Arrow functions, unlike normal functions, carry over context, binding this lexically.
Value of this inside an arrow function is not dependent on how it is invoked.
Because arrow functions already have a bound context, you can't reassign this.

*/
