Sorting is a very classic problem of reordering items (that can be compared, e.g. integers, floating-point numbers, strings, etc) of an array (or a list) in a certain order (increasing, non-decreasing, decreasing, non-increasing, lexicographical, etc).


There are many different sorting algorithms, each has its own advantages and limitations.


Sorting is commonly used as the introductory problem in various Computer Science classes to showcase a range of algorithmic ideas.


Without loss of generality, we assume that we will sort only Integers, not necessarily distinct, in non-decreasing order in this visualization. 
Sorting problem has a variety of interesting algorithmic solutions that embody many Computer Science ideas:

Comparison versus non-comparison based strategies,
Iterative versus Recursive implementation,
Divide-and-Conquer paradigm (this or that),
Best/Worst/Average-case Time Complexity analysis,
Randomized Algorithms, etc.


When an (integer) array A is sorted, many problems involving A become easy (or easier):

Searching for a specific value v in array A,
Finding the min/max or the k-th smallest/largest value in (static) array A,
Testing for uniqueness and deleting duplicates in array A,
Counting how many time a specific value v appear in array A,
Set intersection/union between array A and another sorted array B,
Finding a target pair x ∈ A and y ∈ A such that x+y equals to a target z, et,

Bubble sort is a simple sorting algorithm. This sorting algorithm is comparison-based algorithm in which each pair of adjacent elements is compared and the elements are swapped if they are not in order. This algorithm is not suitable for large data sets as its average and worst case complexity are of Ο(n2) where n is the number of items.

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

Linked List is a data structure consisting of a group of vertices (nodes) which together represent a sequence. Under the simplest form, each vertex is composed of a data and a reference (link) to the next vertex in the sequence. Try clicking Search(77) for a sample animation on searching a value in a (Singly) Linked List.


Linked List and its variations are used as underlying data structure to implement List, Stack, Queue, and Deque ADTs (read this Wikipedia article about ADT if you are not familiar with that term).


In this visualization, we discuss (Singly) Linked List (LL) — with a single next pointer — and its two variants: Stack and Queue, and also Doubly Linked List (DLL) — with both next and previous pointers — and its variant: Deque.

![linked list](https://www.vikingcodeschool.com/dashboard#/files-data-structures-and-algorithms/linked-lists)


# <===============(Selection Sort)================>
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

# <===============(Insertion Sort)================>

![insertion](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/insertion_sort/images/InsertionSort.gif)![](https://thumbs.gfycat.com/CornyThickGordonsetter-small.gif)![](https://i.pinimg.com/originals/92/b0/34/92b034385c440e08bc8551c97df0a2e3.gif)
The algorithm: insert into the sorted region
Insertion Sort is similar to Selection Sort in that it gradually builds up a larger and larger sorted region at the left-most end of the array.

However, Insertion Sort differs from Selection Sort because this algorithm does not focus on searching for the right element to place (the next smallest in our Selection Sort) on each pass through the array. Instead, it focuses on sorting each element in the order they appear from left to right, regardless of their value, and inserting them in the most appropriate position in the sorted region.

![insertion](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)

# <===============(Merge Sort)================>
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

# <===============(Quick Sort)================>
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
