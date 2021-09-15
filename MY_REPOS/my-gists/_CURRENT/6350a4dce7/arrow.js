let arrowFunction = (param1, param2) => {
  let sum = param1 + param2;
  return sum;
};
// with 1 param you can remove parens around parameters
let arrowFunction = (param) => {
  return "not implicit";
};
// if your return statement is one line, you can use implied return
let ImplicitArrowFunction = (param) => param + 1;
// you don't have to assign to variable, it can be anonymous
// if you never need to use it again
(param) => param + 1;
