// n := length(array)
// repeat
//  swapped = false
//  for i := 1 to n - 1 inclusive do
//
//     /* if this pair is out of order */
//     if A[i - 1] > A[i] then
//
//       /* swap them and remember something changed */
//       swap(A[i - 1], A[i])
//       swapped := true
//
//     end if
//   end for
// until not swapped

// Use this pseudocode to implement the bubble sort

function swap( array, idx1, idx2 ) {
  let temp = array[ idx1 ]; // save a copy of the first value
  array[ idx1 ] = array[ idx2 ]; // overwrite the first value with the second value
  array[ idx2 ] = temp; // overwrite the second value with the first value
}

function bubbleSort( array ) {
  let length = array.length;
  let swapped = false;
  do {
    swapped = false;
    for ( let i = 1; i < length; i++ ) {
      if ( array[ i - 1 ] > array[ i ] ) {
        swap( array, i - 1, i )
        swapped = true;
      }
    }
  } while ( swapped )
}

//* Those two loops are nested so the total time complexity is O(n * n) = O(n2).
module.exports = {
  bubbleSort,
  swap
};
