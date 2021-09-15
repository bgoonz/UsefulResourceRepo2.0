/* ---------
 * Challenge
 * ---------

 Your job is to write a function which increments a string, 
 to create a new string. If the string already ends with a number, 
 the number should be incremented by 1. If the string does not end 
 with a number the number 1 should be appended to the new string.
*/

function incrementString (string) {

  var numberPattern = /\d+/g;
  lastChar = parseInt(string.substr(string.length - 1), 10);

  if (lastChar >= 0) {
    var matches = parseInt(string.match(numberPattern)[0]) + 1;
    var slicer = matches.toString().length * -1;

    if(string.match(numberPattern)[0].length < matches.toString().length) {
      slicer += 1; 
    };   
    
    return string.slice(0, slicer) + matches; 
  } else {
    return string + 1; 
  }
}