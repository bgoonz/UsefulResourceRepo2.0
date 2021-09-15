// This variable is part of the global scope
var globalVariable = 10;

function someFunction(){
  // globalVariable is accessible from someFunction,
  // as it is part of the global scope
  console.log(globalVariable);
}

someFunction(); // Prints 10