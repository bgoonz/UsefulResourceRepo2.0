/* ---------
 * Challenge 
 * ---------

 Create an addition function that does not utilize the + or - operators.

 Note: You may not use the + and - operators within a subroutine, or use eval or new Function.
*/

function add (x, y) {
 while(y) {
   x^=y, y=(y&x^y)<<1;   
 } 
 return x;
}