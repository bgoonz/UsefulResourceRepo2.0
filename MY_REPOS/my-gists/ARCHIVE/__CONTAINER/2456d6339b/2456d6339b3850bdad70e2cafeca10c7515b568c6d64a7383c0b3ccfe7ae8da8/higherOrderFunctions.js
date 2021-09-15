// Create a function.
function f(x){
  return x * x;
}
// Use the function.
f(5); // 25

// Create an anonymous function and assign 
// it to a variable.
var g = function(x){
  return x * x;
}
// Now you can pass the function around.
var h = g;
// And use it
h(5); // 25