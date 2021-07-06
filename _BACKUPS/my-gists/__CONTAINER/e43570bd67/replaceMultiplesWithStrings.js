/* ---------
 * Challenge
 * ---------
 * 
 * Method 1
   --------
	The first method takes in a valid int (positive or negative) and returns the following:

	for any multiple of 3 the string "THREE",
	for any multiple of 5 the string "FIVE",
	for any multiple of both the string "BOTH",
	for all other numbers the original int.
 
 * Method 2
   --------

 	The second method takes valid ints (positive or negative) and returns a list of the values that follow the above rules.
	The first value may be greater than or less than the second and the list should increment/decrement appropriately
	For example an input of 10,13 should generate a response of ['FIVE', 11, 'THREE', 13].
*/

function getNumber(number){
  //your code here
  if (number % 5 == 0 && number % 3 == 0) {
      return "BOTH";
  }
  
  else if (number % 3 == 0) {
      return "THREE";
  }
  
  else if (number % 5 == 0) {
      return "FIVE";
  }
  
  else {
      return number;
  }
};

function getNumberRange(first, last){
    let list = [];

    if (first < last) {
      for(var i = first; i <= last; i++) {
        list.push(i);
      }
    } 

    // Last is greater 
    else {
        for(var i = last; i <= first; i++) {
          list.push(i);
        }
        if (last < 0) {
          list = list.reverse(); 
        }
    }
    
    const response = [];
    for(var i = 0; i < list.length; i++) {
        response.push(getNumber(list[i]));
    }

    return response; 
};
