/* ---------
 * Challenge
 * ---------

 * Given two integers, which can be positive and negative, find the sum of 
 * all the numbers between including them too and return it. If both numbers 
 * are equal return a or b.

 * Note! a and b are not ordered!

	Example: 
	GetSum(1, 0) == 1
	GetSum(1, 2) == 3
	GetSum(0, 1) == 1
	GetSum(1, 1) == 1
	GetSum(-1, 0) == -1
*/

function GetSum( a, b ) {
  var list = [];
  
  if ( a < b ) {
    for(var i = a; i <= b; i++) {
      list.push(i);
    }
  }
  
  else {
    for(var i = b; i <= a; i++) {
      list.push(i);
    }
  }
  
  // ES6 to the rescue
  var sum = list.reduce((a, b) => a + b);
  return sum; 
}