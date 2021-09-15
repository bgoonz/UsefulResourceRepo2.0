/*******************************************************************
While you are working on the following problems, it DEFINITELY HELPS to
visualize these things in action, so use the below arrays as example inputs.
[1, 2, 3, 4, 5, 6, 7, 8, 9]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*******************************************************************/

/*******************************************************************
BINARY SEARCH VERSION 1:
Write a Recursive Binary Search that returns a Boolean value indicating if
targetNum is within the nums array.
*******************************************************************/
const recurBSearch = ( nums, targetNum ) => {
  let startIndex = 0;
  let endIndex = nums.length - 1;
  // if nums has no length, return false because we've run out of items to
  // search and haven't found targetNum
  if ( nums.length === 0 ) {
    return false;
  }
  // determine the slice point
  let mid = Math.floor( ( startIndex + endIndex ) / 2 )
  // create "left half" and "right half" arrays
  if ( targetNum < nums[ mid ] ) {
    // if targetNum is less than the slice point, return this search on the left half
    let left = nums.slice( 0, mid );
    return recurBSearch( left, targetNum );
  } else if ( targetNum > nums[ mid ] ) {
    //slice :first param begin index , end index where we cut (cut before end index)
    let right = nums.slice( mid + 1 );
    return recurBSearch( right, targetNum );
  } else {
    return true;
  }
  // if it's not greater than or less than, we know it's equal so return true
}
let oddNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let evenNums = [1, 2, 3, 4, 5, 42069, 7, 8, 9, 10];

console.log('recurBSearch( oddNums, 6 ): ', recurBSearch( oddNums, 6 ));
console.log("recurBSearch( evenNums, 6 ): ", recurBSearch(evenNums, 6));
/*******************************************************************
BINARY SEARCH VERSION 2:
Write an Iterative Binary Search that returns a Boolean value indicating if
targetNum is within the nums array.
*******************************************************************/
// const iterBSearch = ( nums, targetNum ) => {
//   // Save references to the beginning, middle, and end of the array into
//   // variables: lowerIdx, midIdx, and upperIdx
//   // while the lowerIdx is less than or equal to the upperIdx, there are still
//   // values to be searched
//   // reassign the midIdx to the the middle of the new lower and upper indices 
//   // if targetNum is larger than the value in the middle, we know targetNum is
//   // not between the current lower and current middle, so raise the lowerIdx
//   // value
//   // if targetNum is less than the value in the middle, we know targetNum is not
//   // between the current upper and current middle, so lower the upperIdx 
//   // if it's not greater than or less than, we have found our target at the
//   // midIdx and can return true and stop iterating.
//   // if we finish iterating and haven't returned true, we've looked over the
//   // entire array and didn't find targetNum, so return false 
// }
// /*******************************************************************
// BINARY SEARCH VERSION 3:
// Write a Recursive Binary Search that returns the Index value of targetNum if it
// is in the nums array, and -1 if it is not found.
// *******************************************************************/
// const recurBSearchIdx = ( nums, targetNum ) => {
//   // this implementation is identical to version 1, except rather than
//   // returning true/false, return the index where you found the item
//   // (instead of true) or -1 (instead of false).
//   // HINT: the index value you return should be the index in the ORIGINAL array
//   // and not the index of the sliced array. Think about how you can calculate
//   // this.
// }
// /*******************************************************************
// BINARY SEARCH VERSION 4:
// Write a Recursive Binary Search that returns the Index value of targetNum if it
// is in the nums array, and -1 if it is not found.
// *******************************************************************/
// const recurBSearchIdxV2 = ( nums, targetNum, low = null, hi = null ) => {
//   /*
//   This implementation is recursive, but borrows the low/hi logic from Version 2
//   to establish a different base case. Rather than shrinking the array until its
//   length is 0, this implementation passes in low and hi indices to determine
//   what part of the original array is being searched.
//   Base Case: 
//   if low is equal to high and we haven't found targetNum, then return -1 to
//   indicate that the value was not found
//   Determine the slice point (the middle of lower and upper)
//   If targetNum is less than nums[slicepoint], then
//   return the binary search of nums passing in low and hi pointing at the
//   'left' half of the array
//   If targetNum is less than nums[slicepoint], then
//   return the binary search of nums passing in low and hi pointing at the
//   'right' half of the array
//   If neither of those is true, return the slice point
//   */
// }
// /*******************************************************************
// BINARY SEARCH VERSION 5:
// Write an Iterative Binary Search that returns the Index value of targetNum if
// it is in the nums array, and -1 if it is not found.
// *******************************************************************/
// const iterBSearchIdx = ( nums, targetNum ) => {
//   // this is the exact same as Version 2, but return the index or -1 rather than
//   // true or false
// }
module.exports = {
  recurBSearch,
  iterBSearch,
  recurBSearchIdx,
  recurBSearchIdxV2,
  iterBSearchIdx
};
