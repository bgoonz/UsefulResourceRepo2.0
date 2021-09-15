
function quickSort( array ) {
  if ( array.length <= 1 ) {
    return array;
  }
  let pivot = array.shift();
  // This implementation uses filter, which returns a new array with any element that passes the criteria (ie the callback returns true).
  // We also could have iterated over the array (array.forEach(el => ...)) and pushed each value into the appropriate left/right subarray as we encountered it.
  let left = array.filter( ( el ) => el < pivot );
  let right = array.filter( ( el ) => el >= pivot );
  let leftSorted = quickSort( left );
  let rightSorted = quickSort( right );
  return [ ...leftSorted, pivot, ...rightSorted ];
  // We also could have concatenated the arrays instead of spreading their contents
  // return leftSorted.concat([pivot]).concat(rightSorted);
}
