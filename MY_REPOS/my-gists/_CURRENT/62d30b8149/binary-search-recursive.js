

// Returns simply true/false for presence
function binarySearchRecursive(array, target) {
  // Our base case
  // If our array is empty, we do not have the target
  if (array.length === 0) {
    return false;
  }

  // Get a reference to the middle index, ie what we want to check
  let midIdx = Math.floor(array.length / 2);

  // If our target is smaller than the middle element, repeat this process with
  // the left half of our array.
  // We get a subarray that represents our left half by slicing up to but not
  // including our midIdx.
  if (target < array[midIdx]) {
    let leftHalf = array.slice(0, midIdx);
    return binarySearch(leftHalf, target);
    // If our target is larger than the middle element, repeat this process with
    // the right half of our array.
    // We get a subarray that represents our right half by slicing from the
    // midIdx + 1 all the way to the end of our array (no second argument needed).
  } else if (target > array[midIdx]) {
    let rightHalf = array.slice(midIdx + 1);
    return binarySearch(rightHalf, target);
    // If neither of these occurred, we found our element and return true.
  } else {
    return true;
  }
}
