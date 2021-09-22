/* ---------
 * Challenge
 * ---------

 Calculate the sum of all the arguments passed to a function.

 Note: If any of the arguments is not a finite number the function 
 should return false/False instead of the sum of the arguments.
*/

function sum() {

  var total = 0;

  for(var i = 0; i < arguments.length; i++) {
    if( arguments[i] != null && (arguments[i] >= 0 || arguments[i] <= 0) ) {
      total += arguments[i]; 
    } else {
      return false; 
    }
  }
  
  return total;
}