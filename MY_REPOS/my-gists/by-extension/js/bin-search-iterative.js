
// Returns simply true/false for presence
function binarySearchIterative(array, target) {
  // Get a reference to our lower and upper bounds that we would like to search
  // within our array. At the start, this is the entire array, so the indices are
  // 0 and our length - 1.
  let lowerIdx = 0;
  let upperIdx = array.length - 1;
  // We also create a midIdx variable because we will reassign it at each iteration
  let midIdx;

  // While our lowerIdx <= upperIdx, we still have elements that we haven't ruled
  // out as being our target, so we want our iteration to continue.
  while (lowerIdx <= upperIdx) {
    // Get a reference to the middle element within our current bounds.
    // We are using Math.floor in order to get an integer/valid index.
    // (If we used ceiling, we would have to do some subtraction in order to get
    // our first element. For example, [14] has a length 1, so
    // Math.ceil((0 + 1)/2)) = 1, which is outside our bounds.
    midIdx = Math.floor((lowerIdx + upperIdx) / 2);
    // If our target is larger than our current middle element, our lower bound
    // needs to be moved up past our midIdx so that we look at the right half.
    if (array[midIdx] < target) {
      lowerIdx = midIdx + 1;
      // If our target is smaller than our current middle element, our upper bound
      // needs to be moved down past our midIdx so that we look at the left half.
    } else if (array[midIdx] > target) {
      upperIdx = midIdx - 1;
      // Otherwise, we have found our target at the midIdx and can return true.
    } else {
      return true;
    }
  }

  // If we made it outside of our loop without returning, our target is not in
  // the array, so we can return false.
  return false;
}
