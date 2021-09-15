# Insertion Sort

This project contains a skeleton for you to implement Insertion Sort. In the
file **lib/insertion_sort.js**, you should implement the Insertion Sort.

The algorithm can be summarized as the following:

1. If it is the first element, it is already sorted. return 1;
2. Pick next element
3. Compare with all elements in the sorted sub-list
4. Shift all the elements in the sorted sub-list that is greater than the
   value to be sorted
5. Insert the value
6. Repeat until list is sorted

This is a description of how the Insertion Sort works (and is also in the code
file).

```
procedure insertionSort( A : array of items )
   int holePosition
   int valueToInsert

   for i = 1 to length(A) inclusive do:

      /* select value to be inserted */
      valueToInsert = A[i]
      holePosition = i

      /*locate hole position for the element to be inserted */

      while holePosition > 0 and A[holePosition-1] > valueToInsert do:
         A[holePosition] = A[holePosition-1]
         holePosition = holePosition -1
      end while

      /* insert the number at hole position */
      A[holePosition] = valueToInsert

   end for

end procedure
```

* Clone the project from
  https://github.com/appacademy-starters/algorithms-insertion-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/insertion_sort.js` that implements the Insertion Sort.
