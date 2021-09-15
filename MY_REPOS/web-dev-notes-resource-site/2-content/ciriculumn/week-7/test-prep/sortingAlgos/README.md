# Sorting Algos


## Binary Search
Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value, and repeating this until the target value is found. If the search ends with the remaining half being empty, the target is not in the array.
### Steps
1. Compare x with the middle element.
If x matches with middle element, we return the mid index.
2. Else If x is greater than the mid element, then x can only lie in right half subarray after the mid element. So we recur for right half.
3. Else (x is smaller) recur for the left half.
### Time Complexity >>> **O(\log n) **

## Selection Sort
The algorithm can be summarized as the following:

1. Set MIN to location 0
2. Search the minimum element in the list
3. Swap with value at location MIN
4. Increment MIN to point to next element
5. Repeat until list is sorted

### Time Complexity >>> **O(n^2) **

## Insertion Sort
1. If it is the first element, it is already sorted. return 1;
2. Pick next element
3. Compare with all elements in the sorted sub-list
4. Shift all the elements in the sorted sub-list that is greater than the value to be sorted
5. Insert the value
6. Repeat until list is sorted

### Time Complexity >>> **O(n^2) **

## Merge Sort
1. if there is only one element in the list, it is already sorted. return that array.
2. otherwise, divide the list recursively into two halves until it can no more be divided.
3. merge the smaller lists into new list in sorted order.

### Time Complexity >>> **O(n log(n)) **


## Bubble Sort 
Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.

## **runs** 0(n^2)

## Quick Sort
1. choose an element called "the pivot", how that's done is up to the implementation
2. take two variables to point left and right of the list excluding pivot
3. left points to the low index
4. right points to the high
5. while value at left is less than pivot move right
6. while value at right is greater than pivot move left
7. if both step 5 and step 6 does not match swap left and right
8.if left ≥ right, the point where they met is new pivot
repeat, recursively calling this for smaller and smaller arrays

## **runs** 0(n^2)
