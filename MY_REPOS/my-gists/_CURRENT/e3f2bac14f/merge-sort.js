

// The merge function is what is combining our sorted sub-arrays
function merge( array1, array2 ) {
  let merged = [];
  // keep running while either array still contains elements
  while ( array1.length || array2.length ) {
    // if array1 is nonempty, take its the first element as ele1
    // otherwise array1 is empty, so take Infinity as ele1
    let ele1 = array1.length ? array1[ 0 ] : Infinity;
    // do the same for array2, ele2
    let ele2 = array2.length ? array2[ 0 ] : Infinity;
    let next;
    // remove the smaller of the eles from it's array
    if ( ele1 < ele2 ) {
      next = array1.shift();
    } else {
      next = array2.shift();
    }
    // and add that ele to the new array
    merged.push( next );
  }
  return merged;
}
// The mergeSort function breaks apart our input into smaller sub-arrays until we have an input of length <= 1, which is inherently sorted.
// Once we have a left and right subarray that's sorted, we can merge them together to get our sorted result of this sub-problem, passing the sorted version back up the call stack.
function mergeSort( array ) {
  if ( array.length <= 1 ) {
    return array;
  }
  let midIdx = Math.floor( array.length / 2 );
  let leftHalf = array.slice( 0, midIdx );
  let rightHalf = array.slice( midIdx );
  let sortedLeft = mergeSort( leftHalf );
  let sortedRight = mergeSort( rightHalf );
  return merge( sortedLeft, sortedRight );
}
