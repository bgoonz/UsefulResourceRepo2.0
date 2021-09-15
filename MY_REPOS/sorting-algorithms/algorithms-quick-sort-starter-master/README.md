# Quick Sort

This project contains a skeleton for you to implement Quick Sort. In the
file **lib/quick_sort.js**, you should implement the Quick Sort. This is a
description of how the Quick Sort works (and is also in the code file).

```
procedure quick sort (array)
  if the length of the array is 0 or 1, return the array

  set the pivot to the first element of the array
  remove the first element of the array

  put all values less than the pivot value into an array called left
  put all values greater than the pivot value into an array called right

  call quick sort on left and assign the return value to leftSorted
  call quick sort on right and assign the return value to rightSorted

  return the concatenation of leftSorted, the pivot value, and rightSorted
end procedure quick sort
```

* Clone the project from
  https://github.com/appacademy-starters/algorithms-quick-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/quick_sort.js` that implements the Quick Sort.
