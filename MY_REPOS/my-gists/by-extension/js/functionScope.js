// This is a function and it defines its own
// local scope. argumentVariable is part of the
// function's scope, as it is an argument in its
// definition.
function parentFunction(argumentVariable){
  // functionVariable and anotherVariable are both
  // part of parentFunction's local scope.
  var functionVariable = 10;
  let anotherVariable = 15;
  
  // This is another function enclosed inside the
  // first one. It also defines its own scope, but
  // it has access to its parent function's scope.
  function childFunction(){
    // childVariable is part of childFunction's local
    // scope.
    var childVariable = 20;
    // anotherVariable is not the same as the one
    // defined in parentFunction's scope, due to it
    // being defined using the keyword 'let'.
    let anotherVariable = 25;
    // childFunction has access to variables defined
    // in parentFunction and childFunction, however
    // it does contain its own definition of
    // anotherVariable and has no access to parentFunction's
    // anotherVariable.
    console.log("Child function: ");
    console.log(functionVariable);
    console.log(childVariable);
    console.log(anotherVariable);
  }
  
  // parentFunction does not have access to variables
  // defined in childFunction, thus it cannot access
  // childVariable and it can only see its definition
  // of anotherVariable.
  console.log("Parent function: ");
  console.log(functionVariable);
  console.log(anotherVariable);
  
  childFunction();
}

parentFunction();