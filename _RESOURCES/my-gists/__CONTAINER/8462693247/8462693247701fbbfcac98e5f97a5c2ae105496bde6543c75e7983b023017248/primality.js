/* ---------
 * Challenge
 * ---------

 Write a function that checks whether a number is prime 
 or not (should return true or false). A prime number is 
 any natural number that is greater than 1 and is divisible 
 only by itself and 1.
*/

function PrimeTest(a){
  if (isNaN(a) || !isFinite(a) || a % 1 || a < 2) return false; 
   var m = Math.sqrt(a);
   for (var i = 2; i <= m; i++) if (a % i==0) return false;
   return true;
};