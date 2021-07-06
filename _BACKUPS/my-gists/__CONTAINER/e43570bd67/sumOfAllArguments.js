/* ---------
 * Challenge
 * ---------

 Calculate the sum of all the arguments passed to a function.

 Note: If any of the arguments is not a finite number the function 
 should return false/False instead of the sum of the arguments.
*/

function sum(...args) {

  let total = 0;

  for(let i = 0; i < args.length; i++) {
    if( args[i] != null && (args[i] >= 0 || args[i] <= 0) ) {
      total += args[i]; 
    } else {
      return false; 
    }
  }
  
  return total;
}
