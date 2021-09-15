
---
#  <======<----------->=========~===========(Bubble Sort)=============~=======<------------>==>
---
# Bubble Sort



![alt-text](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)


![bubble sort]((https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/bubble_sort/images/BubbleSort.gif)


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
  
This sorting algorithm is comparison-based algorithm in which each pair of adjacent elements is compared and the elements are swapped if they are not in order. This algorithm is not suitable for large data sets as its average and worst case complexity are of Ο(n2) where n is the number of items.

How Bubble Sort Works?
We take an unsorted array for our example. Bubble sort takes Ο(n^2) time so we're keeping it short and precise.

Bubble Sort
Bubble sort starts with very first two elements, comparing them to check which one is greater.

Bubble Sort
In this case, value 33 is greater than 14, so it is already in sorted locations. Next, we compare 33 with 27.

Bubble Sort
We find that 27 is smaller than 33 and these two values must be swapped.

Bubble Sort
The new array should look like this −

Bubble Sort
Next we compare 33 and 35. We find that both are in already sorted positions.

Bubble Sort
Then we move to the next two values, 35 and 10.

Bubble Sort
We know then that 10 is smaller 35. Hence they are not sorted.

Bubble Sort
We swap these values. We find that we have reached the end of the array. After one iteration, the array should look like this −

Bubble Sort
To be precise, we are now showing how an array should look like after each iteration. After the second iteration, it should look like this −

Bubble Sort
Notice that after each iteration, at least one value moves at the end.

Bubble Sort
And when there's no swap required, bubble sorts learns that an array is completely sorted.

Bubble Sort
Now we should look into some practical aspects of bubble sort.

Algorithm
We assume list is an array of n elements. We further assume that swap function swaps the values of the given array elements.

begin BubbleSort(list)

   for all elements of list
      if list[i] > list[i+1]
         swap(list[i], list[i+1])
      end if
   end for
   
   return list
   
end BubbleSort
Pseudocode
We observe in algorithm that Bubble Sort compares each pair of array element unless the whole array is completely sorted in an ascending order. This may cause a few complexity issues like what if the array needs no more swapping as all the elements are already ascending.

To ease-out the issue, we use one flag variable swapped which will help us see if any swap has happened or not. If no swap has occurred, i.e. the array requires no more processing to be sorted, it will come out of the loop.

Pseudocode of BubbleSort algorithm can be written as follows −

procedure bubbleSort( list : array of items )

   loop = list.count;
   
   for i = 0 to loop-1 do:
      swapped = false
		
      for j = 0 to loop-1 do:
      
         /* compare the adjacent elements */   
         if list[j] > list[j+1] then
            /* swap them */
            swap( list[j], list[j+1] )		 
            swapped = true
         end if
         
      end for
      
      /*if no number was swapped that means 
      array is sorted now, break the loop.*/
      
      if(not swapped) then
         break
      end if
      
   end for
   
end procedure return list

![alt-text](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)


![bubble sort](![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/bubble_sort/images/BubbleSort.gif)


![bubble](https://java2blog.com/wp-content/uploads/2017/12/BubbleSort_Avg_case.gif)

The algorithm bubbles up
As you progress through the algorithms and data structures of this course, you'll eventually notice that there are some recurring funny terms. "Bubbling up" is one of those terms.

When someone writes that an item in a collection "bubbles up," you should infer that:

The item is in motion
The item is moving in some direction
The item has some final resting destination
When invoking Bubble Sort to sort an array of integers in ascending order, the largest integers will "bubble up" to the "top" (the end) of the array, one at a time.

The largest values are captured, put into motion in the direction defined by the desired sort (ascending right now), and traverse the array until they arrive at their end destination

How does a pass of Bubble Sort work?
Bubble sort works by performing multiple passes to move elements closer to their final positions. A single pass will iterate through the entire array once.

A pass works by scanning the array from left to right, two elements at a time, and checking if they are ordered correctly. To be ordered correctly the first element must be less than or equal to the second. If the two elements are not ordered properly, then we swap them to correct their order. Afterwards, it scans the next two numbers and continue repeat this process until we have gone through the entire array.

See one pass of bubble sort on the array [2, 8, 5, 2, 6]. On each step the elements currently being scanned are in bold.

2, 8, 5, 2, 6 - ordered, so leave them alone
2, 8, 5, 2, 6 - not ordered, so swap
2, 5, 8, 2, 6 - not ordered, so swap
2, 5, 2, 8, 6 - not ordered, so swap
2, 5, 2, 6, 8 - the first pass is complete
Because at least one swap occurred, the algorithm knows that it wasn't sorted. It needs to make another pass. It starts over again at the first entry and goes to the next-to-last entry doing the comparisons, again. It only needs to go to the next-to-last entry because the previous "bubbling" put the largest entry in the last position.

2, 5, 2, 6, 8 - ordered, so leave them alone
2, 5, 2, 6, 8 - not ordered, so swap
2, 2, 5, 6, 8 - ordered, so leave them alone
2, 2, 5, 6, 8 - the second pass is complete
Because at least one swap occurred, the algorithm knows that it wasn't sorted. Now, it can bubble from the first position to the last-2 position because the last two values are sorted.

2, 2, 5, 6, 8 - ordered, so leave them alone
2, 2, 5, 6, 8 - ordered, so leave them alone
2, 2, 5, 6, 8 - the third pass is complete
No swap occurred, so the Bubble Sort stops.

Ending the Bubble Sort
During Bubble Sort, you can tell if the array is in sorted order by checking if a swap was made during the previous pass performed. If a swap was not performed during the previous pass, then the array must be totally sorted and the algorithm can stop.

You're probably wondering why that makes sense. Recall that a pass of Bubble Sort checks if any adjacent elements are out of order and swaps them if they are. If we don't make any swaps during a pass, then everything must be already in order, so our job is done.

```js
function swap(array, idx1, idx2) {
  let temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
}

function bubbleSort(array) {
  let swapped = true;

  while (swapped) {
    swapped = false;

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);

        swapped = true;
      }
    }
  }

  return array;
}

let array1 = [2, -1, 4, 3, 7, 3];
bubbleSort(array1);
console.log(" bubbleSort(array): ", bubbleSort(array1));
module.exports = { bubbleSort: bubbleSort, swap: swap };
```





---
  #  <======<---------->=======~===========(Selection Sort)============~=======<---------->=====>
---

![selection](![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/selection_sort/images/SelectionSort.gif)




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

The algorithm can be summarized as the following:

Set MIN to location 0
Search the minimum element in the list
Swap with value at location MIN
Increment MIN to point to next element
Repeat until list is sorted

![selection](![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/selection_sort/images/SelectionSort.gif)
![](https://upload.wikimedia.org/wikipedia/commons/f/f6/Selection_Sort_Animation.gif)![](https://res.cloudinary.com/practicaldev/image/fetch/s--T7PUry2L--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://miro.medium.com/max/3840/1%2Ak0dHMa2l2bRr95VB4llOqw.gif)

Starting from the beginning of the list,

1, Find the minimum unsorted element
2 Swap it with the current index (front of the unsorted list)
3 Move to the next index and repeat from step 1
4 Repeat until at the end of the list

The algorithm: select the next smallest
Selection sort works by maintaining a sorted region on the left side of the input array; this sorted region will grow by one element with every "pass" of the algorithm. A single "pass" of selection sort will select the next smallest element of unsorted region of the array and move it to the sorted region. Because a single pass of selection sort will move an element of the unsorted region into the sorted region, this means a single pass will shrink the unsorted region by 1 element whilst increasing the sorted region by 1 element. Selection sort is complete when the sorted region spans the entire array and the unsorted region is empty!


```js
function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function selectionSort(list) {
  let length = list.length;
  for (let i = 0; i < length - 1; i++) {
    let minPos = i;

    for (let j = i + 1; j < length; j++) {
      if (list[j] < list[minPos]) {
        minPos = j;
      }
    }

    if (minPos !== i) {
      swap(list, minPos, i);
    }
  }
}
module.exports = {
  selectionSort,
  swap,
};

```

---
  #  <=======<---------->=======~=========(Insertion Sort)===========~=======<------------>=====>
---
# Insertion Sort

![insertion](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)


![insertion](![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/insertion_sort/images/InsertionSort.gif)


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
![insertion](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/insertion_sort/images/InsertionSort.gif)![](https://thumbs.gfycat.com/CornyThickGordonsetter-small.gif)![](https://i.pinimg.com/originals/92/b0/34/92b034385c440e08bc8551c97df0a2e3.gif)
The algorithm: insert into the sorted region
Insertion Sort is similar to Selection Sort in that it gradually builds up a larger and larger sorted region at the left-most end of the array.

However, Insertion Sort differs from Selection Sort because this algorithm does not focus on searching for the right element to place (the next smallest in our Selection Sort) on each pass through the array. Instead, it focuses on sorting each element in the order they appear from left to right, regardless of their value, and inserting them in the most appropriate position in the sorted region.

![insertion](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)

```js
function insertionSort(list) {
  for (let i = 1; i < list.length; i++) {
    let val = list[i];
    let pos = i;
    // console.trace("1");
    while (pos > 0 && list[pos - 1] > val) {
      // console.trace("2");
      list[pos] = list[pos - 1];
      pos -= 1;
    }
    list[pos] = val;
  }
}
let array = [2, -1, 4, 3, 7, 3];
insertionSort(array);
module.exports = {
  insertionSort,
};

```


---
  #  <=======<------------>=======~===========(Merge Sort)=============~=======<------------>=====>
---

# Merge Sort

![merge sort](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/merge_sort/images/MergeSort.gif)

This project contains a skeleton for you to implement Merge Sort. In the
file **lib/merge_sort.js**, you should implement the Merge Sort.

The algorithm can be summarized as the following:

1. if there is only one element in the list, it is already sorted. return that
   array.
2. otherwise, divide the list recursively into two halves until it can no more
   be divided.
3. merge the smaller lists into new list in sorted order.

This is a description of how the Merge Sort works (and is also in the code
file).

```
procedure mergesort( a as array )
   if ( n == 1 ) return a

   /* Split the array into two */
   var l1 as array = a[0] ... a[n/2]
   var l2 as array = a[n/2+1] ... a[n]

   l1 = mergesort( l1 )
   l2 = mergesort( l2 )

   return merge( l1, l2 )
end procedure

procedure merge( a as array, b as array )
   var result as array
   while ( a and b have elements )
      if ( a[0] > b[0] )
         add b[0] to the end of result
         remove b[0] from b
      else
         add a[0] to the end of result
         remove a[0] from a
      end if
   end while

   while ( a has elements )
      add a[0] to the end of result
      remove a[0] from a
   end while

   while ( b has elements )
      add b[0] to the end of result
      remove b[0] from b
   end while

   return result
end procedure
```

* Clone the project from
  https://github.com/appacademy-starters/algorithms-merge-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/merge_sort.js` that implements the Merge Sort.

![merge sort](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/merge_sort/images/MergeSort.gif)![alttext](http://btholt.github.io/four-semesters-of-cs/img/merge.gif)![alt](https://i.imgur.com/HU2tfzo.gif) 
![alttext](https://media1.giphy.com/media/Jl1q5AiIyO7AAdMOG8/giphy.gif)![](https://res.cloudinary.com/practicaldev/image/fetch/s--pdU-IP47--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)
it is easy to merge elements of two sorted arrays into a single sorted array
you can consider an array containing only a single element as already trivially sorted
you can also consider an empty array as trivially sorted
The algorithm: divide and conquer
You're going to need a helper function that solves the first major point from above. How might you merge two sorted arrays? In other words you want a merge function that will behave like so:

let arr1 = [1, 5, 10, 15];
let arr2 = [0, 2, 3, 7, 10];
merge(arr1, arr2); // => [0, 1, 2, 3, 5, 7, 10, 10, 15]
Once you have that, you get to the "divide and conquer" bit.

The algorithm for merge sort is actually really simple.

if there is only one element in the list, it is already sorted. return that array.
otherwise, divide the list recursively into two halves until it can no more be divided.
merge the smaller lists into new list in sorted order.
```js
// Implement Merge Sort

function merge(array1, array2) {
  let merged = [];

  while (array1.length || array2.length) {
    let el1 = array1.length ? array1[0] : Infinity;
    let el2 = array2.length ? array2[0] : Infinity;

    el1 < el2 ? merged.push(array1.shift()) : merged.push(array2.shift());
  }

  return merged;
}

merge([1, 5, 10, 15], [0, 2, 3, 7, 10]);

function mergeSort(array) {
  if (array.length <= 1) return array;

  let midIdx = Math.floor(array.length / 2);
  let left = array.slice(0, midIdx);
  let right = array.slice(midIdx);

  let sortedLeft = mergeSort(left);
  let sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);
}

module.exports = {
  merge,
  mergeSort,
};
```

---
  #  <=======<------------>=======~===========(Quick Sort)=============~=======<------------>=====>
---


# Quick Sort


![quick sort](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/quick_sort/images/QuickSort.gif)

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

![quick sort](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/quick_sort/images/QuickSort.gif)
![alt-text](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)![alt-text](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)![alttext](http://btholt.github.io/four-semesters-of-cs/img/bubble.gif)







it is easy to sort elements of an array relative to a particular target value
an array of 0 or 1 elements is already trivially sorted
Regarding that first point, for example given [7, 3, 8, 9, 2] and a target of 5, we know [3, 2] are numbers less than 5 and [7, 8, 9] are numbers greater than 5.

How does it work?
In general, the strategy is to divide the input array into two subarrays: one with the smaller elements, and one with the larger elements. Then, it recursively operates on the two new subarrays. It continues this process until of dividing into smaller arrays until it reaches subarrays of length 1 or smaller. As you have seen with Merge Sort, arrays of such length are automatically sorted.

The steps, when discussed on a high level, are simple:

choose an element called "the pivot", how that's done is up to the implementation
take two variables to point left and right of the list excluding pivot
left points to the low index
right points to the high
while value at left is less than pivot move right
while value at right is greater than pivot move left
if both step 5 and step 6 does not match swap left and right
if left ≥ right, the point where they met is new pivot
repeat, recursively calling this for smaller and smaller arrays


The algorithm: divide and conquer
Formally, we want to partition elements of an array relative to a pivot value. That is, we want elements less than the pivot to be separated from elements that are greater than or equal to the pivot. Our goal is to create a function with this behavior:

let arr = [7, 3, 8, 9, 2];
partition(arr, 5);  // => [[3, 2], [7,8,9]]
Partition
Seems simple enough! Let's implement it in JavaScript:

// nothing fancy
function partition(array, pivot) {
  let left = [];
  let right = [];

  array.forEach(el => {
    if (el < pivot) {
      left.push(el);
    } else {
      right.push(el);
    }
  });

  return [ left, right ];
}

// if you fancy
function partition(array, pivot) {
  let left = array.filter(el => el < pivot);
  let right = array.filter(el => el >= pivot);
  return [ left, right ];
}
You don't have to use an explicit partition helper function in your Quick Sort implementation; however, we will borrow heavily from this pattern




![](https://i.imgur.com/fq0A8hx.gif)



```js
// Implement Quick Sort

function quickSort(array) {
  if (array.length <= 1) return array;

  let pivot = array.shift();

  let left = array.filter((el) => el < pivot);
  let right = array.filter((el) => el >= pivot);

  let sortedLeft = quickSort(left);
  let sortedRight = quickSort(right);

  return [...sortedLeft, pivot, ...sortedRight];
}

module.exports = {
  quickSort,
};

/*
bryan@LAPTOP-F699FFV1:/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week7-outer/week-7/projects/D2/first-attempt/algorithms-sorting-starter/algorithms-sorting-starter-master/problems$ npm test

> bubble_sort_project_solution@1.0.0 test /mnt/c/Users/15512/Google Drive/a-A-September/weeks/week7-outer/week-7/projects/D2/first-attempt/algorithms-sorting-starter/algorithms-sorting-starter-master
> mocha

 bubbleSort(array):  [ -1, 2, 3, 3, 4, 7 ]


  bubbleSort()
    ✓ should sort the elements of the array in increasing order, in-place

  swap()
    ✓ should swap the elements at the given indices, mutating the original array

  selectionSort()
    ✓ should sort the elements of the array in increasing order, in-place

  insertionSort()
    ✓ should sort the elements of the array in increasing order, in-place

  merge()
    ✓ should return a single array containing elements of the original sorted arrays, in order

  mergeSort()
    when the input array contains 0 or 1 elements
      ✓ should return the array
    when the input array contains more than 1 element
      ✓ should return an array containing the elements in increasing order

  quickSort()
    when the input array contains 0 or 1 elements
      1) should return the array
    when the input array contains more than 1 element
      2) should return an array containing the elements in increasing order


  7 passing (210ms)
  2 failing

  1) quickSort()
       when the input array contains 0 or 1 elements
         should return the array:
     AssertionError: expected undefined to deeply equal []
      at Context.<anonymous> (test/05-quick-sort-spec.js:9:32)
      at processImmediate (internal/timers.js:456:21)

  2) quickSort()
       when the input array contains more than 1 element
         should return an array containing the elements in increasing order:
     AssertionError: expected undefined to deeply equal [ -1, 2, 3, 3, 4, 7 ]
      at Context.<anonymous> (test/05-quick-sort-spec.js:16:49)
      at processImmediate (internal/timers.js:456:21)



npm ERR! Test failed.  See above for more details.
bryan@LAPTOP-F699FFV1:/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week7-outer/week-7/projects/D2/first-attempt/algorithms-sorting-starter/algorithms-sorting-starter-master/problems$ npm test

> bubble_sort_project_solution@1.0.0 test /mnt/c/Users/15512/Google Drive/a-A-September/weeks/week7-outer/week-7/projects/D2/first-attempt/algorithms-sorting-starter/algorithms-sorting-starter-master
> mocha

 bubbleSort(array):  [ -1, 2, 3, 3, 4, 7 ]


  bubbleSort()
    ✓ should sort the elements of the array in increasing order, in-place

  swap()
    ✓ should swap the elements at the given indices, mutating the original array

  selectionSort()
    ✓ should sort the elements of the array in increasing order, in-place

  insertionSort()
    ✓ should sort the elements of the array in increasing order, in-place

  merge()
    ✓ should return a single array containing elements of the original sorted arrays, in order

  mergeSort()
    when the input array contains 0 or 1 elements
      ✓ should return the array
    when the input array contains more than 1 element
      ✓ should return an array containing the elements in increasing order

  quickSort()
    when the input array contains 0 or 1 elements
      ✓ should return the array
    when the input array contains more than 1 element
      ✓ should return an array containing the elements in increasing order


  9 passing (149ms)

*/


```


---
  #  <=======<---------->=======~===========(Binary Search)=============~=======<---------->=====>
---


# Binary Search

This project contains a skeleton for you to implement Binary Search. In the
file **lib/binary_search.js**, you should implement the Binary Search and its
cousin Binary Search Index.

The Binary Search algorithm can be summarized as the following:

1. If the array is empty, then return false
2. Check the value in the middle of the array against the target value
3. If the value is equal to the target value, then return true
4. If the value is less than the target value, then return the binary search on
   the left half of the array for the target
5. If the value is greater than the target value, then return the binary search
   on the right half of the array for the target

This is a description of how the Binary Search works (and is also in the code
file).

```
procedure binary search (list, target)
  parameter list: a list of sorted value
  parameter target: the value to search for

  if the list has zero length, then return false

  determine the slice point:
    if the list has an even number of elements,
      the slice point is the number of elements
      divided by two
    if the list has an odd number of elements,
      the slice point is the number of elements
      minus one divided by two

  create an list of the elements from 0 to the
    slice point, not including the slice point,
    which is known as the "left half"
  create an list of the elements from the
    slice point to the end of the list which is
    known as the "right half"

  if the target is less than the value in the
    original array at the slice point, then
    return the binary search of the "left half"
    and the target
  if the target is greater than the value in the
    original array at the slice point, then
    return the binary search of the "right half"
    and the target
  if neither of those is true, return true
end procedure binary search
```

Then you need to adapt that to return _the index_ of the found item rather than
a Boolean value. The pseudocode is also in the code file.

```
procedure binary search index(list, target, low, high)
  parameter list: a list of sorted value
  parameter target: the value to search for
  parameter low: the lower index for the search
  parameter high: the upper index for the search

  if low is equal to high, then return -1 to indicate
    that the value was not found

  determine the slice point:
    if the list has an even number of elements,
      the slice point is the number of elements
      divided by two
    if the list has an odd number of elements,
      the slice point is the number of elements
      minus one divided by two

  if the target is less than the value in the
    original array at the slice point, then
    return the binary search of the array,
    the target, low, and the slice point
  if the target is greater than the value in the
    original array at the slice point, then return
    the binary search of the array, the target,
    the slice point plus one, and high
  if neither of those is true, return true
end procedure binary search index
```


* Clone the project from
  https://github.com/appacademy-starters/algorithms-binary-search-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/binary_search.js` that implements the Binary Search and Binary
  Search Index.


![](https://blog.penjee.com/wp-content/uploads/2015/11/binary-search-tree-sorted-array-animation.gif)![](https://i.pinimg.com/originals/e2/9a/31/e29a31c78bcc0d07c612adc77acc09a0.gif)]
