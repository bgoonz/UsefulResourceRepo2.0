/* Challenge 

After calling the function findSum() with any number of non-negative 
integer arguments, it should return the sum of all those arguments. 
If no arguments are given, the function should return 0, if negative 
arguments are given, it should return -1.

*/

function findSum(){
  var total = 0;
  if(arguments) {
    for(var i = 0; i < arguments.length; i++) {
       if(arguments[i] < 0) {
         return -1;
       }
       total += arguments[i];
    }
    return total;
  } else {
    return 0;
  }
}