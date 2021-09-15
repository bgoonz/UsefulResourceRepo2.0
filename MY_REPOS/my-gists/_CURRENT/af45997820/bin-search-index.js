
// Returns simply true/false for presence
function binarySearch( array, target ) {
  if ( array.length === 0 ) {
    return false;
  }
  let midIdx = Math.floor( array.length / 2 );
  let leftHalf = array.slice( 0, midIdx );
  let rightHalf = array.slice( midIdx + 1 );
  if ( target < array[ midIdx ] ) {
    return binarySearch( leftHalf, target );
  } else if ( target > array[ midIdx ] ) {
    return binarySearch( rightHalf, target );
  } else {
    return true;
  }
}
// Returns the index or -1 if not found
function binarySearchIndex( array, target ) {
  if ( !array.length ) return -1;
  const midIdx = Math.floor( array.length / 2 );
  const midEl = array[ midIdx ];
  if ( target < midEl ) {
    return binarySearchIndex( array.slice( 0, midIdx ), target );
  } else if ( target > midEl ) {
    // Since our recursive call will have new indices for the subarray, we have to adjust the return value to align it with the indices of our original array.
    // If the recursive call returns -1, it was not found and we can immediately return -1
    // If it was found in the subarray, we have to add on the number of elements that were removed from the beginning of our larger original array.
    // For example, if we try to find 15 in an array of [5, 10, 15]:
    // - Our first call to binarySearchIndex will check our middle element of 10
    // - Since our target is greater, we will recursively call our search on elements to the right, being the subarray [15]
    // - On our recursive call we found our target! It's index in this call is 0.
    // - When we return 0 to where binarySearchIndex was called, we need to adjust it to line up with this larger array (the 0th element of this larger array is 5, but our target was at the 0th index of the subarray)
    // - Since we sliced off 2 elements from the beginning before making our recursive call, we add 2 to the return value to adjust it back to line up with our original array.
    const idxShift = binarySearchIndex( array.slice( midIdx + 1 ), target );
    return idxShift === -1 ? -1 : idxShift + midIdx + 1;
  } else {
    return midIdx;
  }
}
