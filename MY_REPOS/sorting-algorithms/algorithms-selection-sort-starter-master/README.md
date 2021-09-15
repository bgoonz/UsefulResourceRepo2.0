# Selection Sort

This project contains a skeleton for you to implement Selection Sort. In the
file **lib/selection_sort.js**, you should implement the Selection Sort. You
can use the same `swap` function from Bubble Sort; however, try to implement it
on your own, first.

The algorithm can be summarized as the following:

1. Set MIN to location 0
2. Search the minimum element in the list
3. Swap with value at location MIN
4. Increment MIN to point to next element
5. Repeat until list is sorted

This is a description of how the Selection Sort works (and is also in the code
file).

```
procedure selection sort(list)
   list  : array of items
   n     : size of list

   for i = 1 to n - 1
   /* set current element as minimum*/
      min = i

      /* check the element to be minimum */

      for j = i+1 to n
         if list[j] < list[min] then
            min = j;
         end if
      end for

      /* swap the minimum element with the current element*/
      if indexMin != i  then
         swap list[min] and list[i]
      end if
   end for
end procedure
```

* Clone the project from
  https://github.com/appacademy-starters/algorithms-selection-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/selection_sort.js` that implements the Selection Sort.
