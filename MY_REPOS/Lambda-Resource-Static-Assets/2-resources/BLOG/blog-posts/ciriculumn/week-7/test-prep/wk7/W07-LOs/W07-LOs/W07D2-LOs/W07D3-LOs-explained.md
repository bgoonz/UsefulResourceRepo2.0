# Sorting Algorithms (W7D2) - Learning Objectives

## Sorting Algorithms

1. Write a function that performs bubble sort on an array of numbers.
    - Code example for bubbleSort:

      ```javascript
      function bubbleSort(array) {
      // this variable will be used to track whether or not we made a swap on the
      // previous pass. If we did not make any swap on the previous pass, then the 
      // array must already be sorted
        let swapped = true;

        // this while will keep doing passes if a swap was made
        // on the previous pass
        while (swapped) {
          swapped = false; // reset swap to false

          // this for will perform a single pass
          for (let i = 0; i < array.length; i++) {
            // if the two value are not ordered...
            if (array[i] > array[i + 1]) {
              // swap the two values
              swap(array, i, i + 1);
              //we can also use array destructuring to swap items
              //[array[i],array[i+1]] = [array[i+1],array[i]]

              // since you made a swap, remember that you did so
              // b/c we should perform another pass after this one
              swapped = true;
            }
          }
        }

        return array;
      }
      
      function swap(arr, index1, index2) {
        let temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
      }
      ```

2. Write a function that performs selection sort on an array of numbers.
    - Code example for selectSort:

      ```javascript
      function selectionSort(arr) {
      // the `i` loop will track the index that points to the first element of the
      // unsorted region: this means that the sorted region is everything left of
      // index i and the unsorted region is everything to the right of index i
        for (let i = 0; i < arr.length; i++) {
          let minIndex = i;

          // the `j` loop will iterate through the unsorted region and find the
          // index of the smallest element
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
              minIndex = j;
            }
          }

          // after we find the minIndex in the unsorted region,
          // swap that minIndex with the first index of the unsorted region
          swap(arr, i, minIndex);
        }
        return arr;
      }

      function swap(arr, index1, index2) {
        let temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
      }
      ```

3. Write a function that performs insertion sort on an array of numbers.
    - Code example for insertionSort:

      ```javascript
      function insertionSortV1(arr) {
      // the `i` loop will iterate through every element of the array we begin at
      // i = 1, because we can consider the first element of the array as a
      // trivially sorted region of only one element insertion sort allows us to
      // insert new elements anywhere within the sorted region
        for (let i = 1; i < arr.length; i++) {
          // grab the first element of the unsorted region
          let currElement = arr[i];

          // the `j` loop will iterate left through the sorted region,
          // looking for a legal spot to insert currElement
          let j = i - 1;
          // keep moving left while currElement is less than the j-th element
          while (j >= 0 && currElement < arr[j]) {
            arr[j + 1] = arr[j];
            // the line above will move the j-th element to the right,
            // leaving a gap to potentially insert currElement
            // we have to remember to decrement in our while loop!
            j--;
          }
          // insert currElement into that gap
          arr[j + 1] = currElement;
        }
        return arr;
      }
      ```

      ```javascript
      // Here is another implementation of insertion sort. Both keep a sorted left
      // region working from left to right examining each item and comparing it to
      // items on its left then inserting the item in the correct oposition in the array.
      function insertionSortV2(arr) {
        for (let i = 1; i < arr.length; i++) {
          let j = i;
          while(j>0 && arr[j-1] > arr[j]){
            swap(arr,j-1,j);
            j--;
          }
        }
        return arr;
      }

      function swap(arr, index1, index2) {
        let temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
      }
      ```

4. Write a function that performs merge sort on an array of numbers.
    - Code example for mergeSort:

      ```javascript
      // The merge function is what is combining our sorted sub-arrays
      function merge(array1, array2) {
        let merged = [];

        // keep running while either array still contains elements
        while (array1.length || array2.length) {
          // if array1 is nonempty, take its the first element as ele1
          // otherwise array1 is empty, so take Infinity as ele1
          let ele1 = array1.length ? array1[0] : Infinity;
          // do the same for array2, ele2
          let ele2 = array2.length ? array2[0] : Infinity;

          let next;
          // remove the smaller of the eles from it's array
          if (ele1 < ele2) {
            next = array1.shift();
          } else {
            next = array2.shift();
          }

          // and add that ele to the new array
          merged.push(next);
        }

        return merged;
      }

      // The mergeSort function breaks apart our input into smaller sub-arrays until
      // we have an input of length <= 1, which is inherently sorted.
      // Once we have a left and right subarray that's sorted, we can merge them
      // together to get our sorted result of this sub-problem, passing the sorted 
      // version back up the call stack.
      function mergeSort(array) {
        if (array.length <= 1) {
          return array;
        }

        let midIdx = Math.floor(array.length / 2);
        let leftHalf = array.slice(0, midIdx);
        let rightHalf = array.slice(midIdx);

        let sortedLeft = mergeSort(leftHalf);
        let sortedRight = mergeSort(rightHalf);

        return merge(sortedLeft, sortedRight);
      }
      ```

5. Write a function that performs quick sort on an array of numbers.
    - Code example for quickSort:

      ```javascript
      function quickSort(array) {
        if (array.length <= 1) {
            return array;
        }

        let pivot = array.shift();
        // This implementation uses filter, which returns a new array with any element that passes the criteria (ie the callback returns true).
        // We also could have iterated over the array (array.forEach(el => ...)) and pushed each value into the appropriate left/right subarray as we encountered it.
        let left = array.filter(el => el < pivot);
        let right = array.filter(el => el >= pivot);

        let leftSorted = quickSort(left);
        let rightSorted = quickSort(right);

        return [ ...leftSorted, pivot, ...rightSorted ];
        // We also could have concatenated the arrays instead of spreading their contents
        // return leftSorted.concat([pivot]).concat(rightSorted);
      }
      ```
