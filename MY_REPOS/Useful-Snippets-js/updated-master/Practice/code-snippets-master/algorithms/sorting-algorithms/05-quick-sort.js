/*Quick sort works by selecting a pivot point and sorting all the elements in the list
into a group smaller then the pivot and a group larger then the pivot. It does this
recursively until all the subgroups are sorted and then recombines the groups
Avg Case: O(n log(n)) / Worst Case: O(n^2) */

function quickSort(array) {
  if (array.length <= 1) return array;

  let pivot = array.shift();
  let left = array.filter((ele) => ele < pivot);
  let right = array.filter((ele) => ele >= pivot);

  let leftSort = quickSort(left);
  let rightSort = quickSort(right);

  return [...leftSort, pivot, ...rightSort];
}
