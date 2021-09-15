function someFunction(){
  if (true){
    // This variable is defined inside these
    // curly braces, which means its part of the
    // scope of this block and cannot be accessed
    // by other parts of someFunction.
    let blockVariable = 30;
    
    // However, using the 'var' keyword this variable,
    // while defined inside the same block, is part of
    // the scope of the someFunction.
    var functionVariable = 30;
    // Inside the block, both variables are accessible.
    console.log("Block scope: ");
    console.log(blockVariable);
    console.log(functionVariable); 
  }
  // Outside the block, only the variable defined using
  // the keyword 'var' is accessible.
  console.log("Function scope: ");
  try { console.log(blockVariable); }
  catch (e) { console.log("The variable 'blockVariable' is not accessible!"); }
  try { console.log(functionVariable); }
  catch (e) { console.log("The variable 'functionVariable' is not accessible!"); }
    
}

someFunction();