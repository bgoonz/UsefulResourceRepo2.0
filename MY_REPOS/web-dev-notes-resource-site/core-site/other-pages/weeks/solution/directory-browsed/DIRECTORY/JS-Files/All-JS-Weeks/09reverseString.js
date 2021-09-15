// 9. Write a function that reverses a string.
let reverse = function ( string ) {
   
      let count;
      if (count === undefined) {
        count = string.length - 1;
      }
      if (count === 0) {
        return string;
      }
      let front = string.slice(0, 1);
      let back = 1;
      let newString = back + front;
      count--;
      return reverse(newString);
 
    
};


// b   a   r   k   ===>     k  r   a   b
// 0   1   2   3            3  2   1   0
