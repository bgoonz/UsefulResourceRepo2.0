# Bubble Sort

This project contains a skeleton for you to implement Bubble Sort. In the
file **lib/bubble_sort.js**, you should implement the Bubble Sort. This is a
description of how the Bubble Sort works (and is also in the code file).

```
Bubble Sort: (array)
  n := length(array)
  repeat
  swapped = false
  for i := 1 to n - 1 inclusive do

      /* if this pair is out of order */
      if array[i - 1] > array[i] then

        /* swap them and remember something changed */
        swap(array, i - 1, i)
        swapped := true

      end if
    end for
  until not swapped
```

* Clone the project from
  https://github.com/appacademy-starters/algorithms-bubble-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/bubble_sort.js` that implements the Bubble Sort.
