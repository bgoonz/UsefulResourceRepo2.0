/* ---------
 * Challenge
 * ---------

 In this Kata you will create a function that takes a list of 
 lists as an input and returns a flat list.

 flatten([[1,2],[3,4]]) == [1,2,3,4]
 flatten([[1],[2],[3],[4]]) == [1,2,3,4]
*/

function flatten(l){
  return [].concat.apply([], l); 
}