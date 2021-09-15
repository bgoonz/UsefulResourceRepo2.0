---
slug: Data structures
title: Data Structures
author: Bryan Guner
author_title: Web Developer
author_url: https://github.com/bgoonz
author_image_url: https://avatars.githubusercontent.com/u/66654881?s=460&u=4614c45125eb6ab7e4b04468cb9cdf5c998c879d&v=4
tags: [Data Structures, Algorithms]
---

[Home](/)

**Big-O Notation** {#bbig-o-notationb .mume-header}
==================

### Jump to... {#jump-to .mume-header}

-   [Complexity Classes](#complexityclasses)
-   [Sorting Algorithms](#sortingalgorithms)
-   [Memoization](#memoization)
-   [Tabulation](#tabulation)

* * * * *

-   We use the Big-O notation to classify algorithms based on their
    running time or space (memory used) as the input grows. The O
    function is the growth rate in function of the input size n.
    -   describes an algorithm's *worst* case
    -   We can measure both time and space complexity, but are mostly
        concerned with time (memory is cheap and abundant)
    -   should be simplified to show only its most dominant mathematical
        term
-   #### Asymptomatic Behavior

    -   The asymptotic behavior of a function refers to its rate of
        growth as its input size approaches infinity
        -   Allows us to focus on the big picture and compare algorithms
            from a high level
        -   Big-O notation is a tool for understanding asymptotic
            behavior

### Time Complexity {#time-complexity .mume-header}

-   estimates how an algorithm performs regardless kind of machine it
    runs on
    -   calculated by "counting" the number of operations performed

### Complexity Classes []() {#complexity-classes-a-idcomplexityclassesa .mume-header}

-   Algorithms are ranked by efficiency
    -   *Smaller growth* complexity classes are more efficient because
        they require fewer resources
-   The following are in order from smallest growth to largest:

  Time Complexity   Algorithm
  ----------------- ---------------------------------------
  O(1)              [Constant](#constant)
  O(log n)          [Logarithmic](#logarithmic)
  O(n)              [Linear](#linear)
  O(n log n)        [Linearithmic](#linearithmic)
  O(n \* log(n))    [Loglinear](#loglinear)
  O(n^2^)           [Polynomial](#polynomial) (Quadratic)
  O(n ^3^ )         [Polynomial](#polynomial) (Cubic)
  O(2 ^n^ )         [Exponential](#exponential)
  O(n!)             [Factorial](#factorial)

*Click algorithm name for more details*

![](https://miro.medium.com/max/2928/1*5ZLci3SuR0zM_QlZOADv8Q.jpeg)

### **O(1) Constant** []() {#bo1-constantb-a-nameconstanta .mume-header}

-   ##### Take roughly the same number of steps for any input size

-   there is no relationship between the size of the input and the
    number of steps required
-   Examples of constant runtime algorithms:
    -   Find if a number is even or odd.
    -   Check if an item on an array is null.
    -   Print the first element from a list.
    -   Find a value on a map.
-   Constant growth indicates the behavior stays constant for all values
    of n

###  {.mume-header}

#### Constant Growth {#constant-growth .mume-header}

  n     O(1)
  ----- ------
  1     \~1
  2     \~1
  3     \~1
  ...   ...
  128   \~1

#### Example Constant Code {#example-constant-code .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
function constant1(n) {
  return n * 2 + 1;
}

function constant2(n) {
  for (let i = 1; i <= 100; i++) {
    console.log(i);
  }
}
```

### **O(log(n)) Logarithmic** {#bologn-logarithmicb .mume-header}

-   ##### Halves the size of the input

-   Typically, the hidden base of O(log(n)) is 2, meaning O(log2(n))
-   don't have to access every element of the input
    -   every time we double the size of the input, we only require one
        additional step
-   a large increase of input size will increase the number of steps
    required by a small amount
-   Logarithmic growth only requires one additional "step" when the
    input size is doubled:

#### Logarithmic Growth {#logarithmic-growth .mume-header}

  n     O(log~2~(n))
  ----- --------------
  2     \~1
  4     \~2
  8     \~3
  16    \~4
  ...   ...
  128   \~7

#### Example Logarithmic Code {#example-logarithmic-code .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
function logarithmic1(n) {
  if (n <= 1) return;
  logarithmic1(n / 2);
}

function logarithmic2(n) {
  let i = n;
  while (i > 1) {
    i /= 2;
  }
}
```

### **O(n) Linear** {#bon-linearb .mume-header}

-   ##### Will access each item of the input *once*

-   Algorithms that iterate through the input without nested loops or
    recurse by reducing the size of the input by "one" each time are
    typically linear.
-   Linear time complexity O(n) means that as the input grows, the
    algorithms take proportionally longer to complete.
-   Examples of linear time algorithms:
    -   Get the max/min value in an array.
    -   Find a given element in a collection.
    -   Print all the values in a list.

#### Linear Growth: {#linear-growth .mume-header}

  n     O(n)
  ----- -------
  1     \~1
  2     \~2
  3     \~3
  ...   ...
  128   \~128

#### Example Linear Code {#example-linear-code .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
function linear1(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}

function linear2(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(i);
  }
}

function linear3(n) {
  if (n === 1) return;
  linear3(n - 1);
}
```

### **O(n \* log(n)) Loglinear** {#bon-logn-loglinearb .mume-header}

-   ##### Combination of linear and logarithmic behaviors

-   Will use both recursion and iteration
    -   the recursive calls will halve the input each time (logarithmic)
        but iterations are also performed on the input (linear).

#### Loglinear Growth: {#loglinear-growth .mume-header}

  n     O(n \* log~2~(n))
  ----- -------------------
  2     \~2
  4     \~8
  8     \~24
  ...   ...
  128   \~896

#### Example Loglinear Code {#example-loglinear-code .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
function loglinear(n) {
  if (n <= 1) return;

  for (let i = 1; i <= n; i++) {
    console.log(i);
  }

  loglinear(n / 2);
  loglinear(n / 2);
}
```

### **O(n^c^) Polynomial** {#bonsupcsup-polynomialb .mume-header}

-   ##### `n`{.language-javascript} is the size of the input, `c`{.language-javascript} is a fixed constant

-   Nested loops are usually the indicator of this class

#### Polynomial Growth: {#polynomial-growth .mume-header}

  n     O(n^2^)
  ----- ----------
  1     \~1
  2     \~4
  3     \~9
  ...   ...
  128   \~16,384

  n     O(n^3^)
  ----- -------------
  1     \~1
  2     \~8
  3     \~27
  ...   ...
  128   \~2,097,152

#### Example Polynomial Code {#example-polynomial-code .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
// O(n^2)
function quadratic(n) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {}
  }
}

// O(n^3)
function cubic(n) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {}
    }
  }
}
```

### **O(c^n^) Exponential** []() {#bocsupnsup-exponentialb-a-idexponentiala .mume-header}

-   ##### `n`{.language-javascript} is the size of the input and `c`{.language-javascript} is some fixed constant

    -   A common indicator of this complexity class is recursive code
        where there is a constant number of recursive calls in each
        stack frame.
    -   The c will be the number of recursive calls made in each stack
        frame.
    -   Algorithms with this complexity are considered quite slow.

#### Exponential Growth: {#exponential-growth .mume-header}

  n     O(2^n^)
  ----- --------------------
  1     \~2
  2     \~4
  3     \~8
  ...   ...
  128   \~3.4028 \* 10^38^

  n     O(2^3^)
  ----- --------------------
  1     \~3
  2     \~9
  3     \~27
  3     \~81
  ...   ...
  128   \~1.1790 \* 10^61^

#### Example Exponential Code {#example-exponential-code .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
// O(2^n)
function exponential2n(n) {
  if (n === 1) return;
  exponential_2n(n - 1);
  exponential_2n(n - 1);
}

// O(3^n)
function exponential3n(n) {
  if (n === 0) return;
  exponential_3n(n - 1);
  exponential_3n(n - 1);
  exponential_3n(n - 1);
}
```

### **O(n!) Factorial** {#bon-factorialb .mume-header}

-   ##### Variable number of recursive calls in each stack frame

    -   Largest/worst complexity class

#### Factorial Growth: {#factorial-growth .mume-header}

  n     O(n!)
  ----- ---------------------
  1     \~1
  2     \~2
  3     \~6
  ...   ...
  128   \~3.8562 \* 10^215^

#### Example Factorial Code {#example-factorial-code .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
function factorial(n) {
  if (n === 1) return;

  for (let i = 1; i <= n; i++) {
    factorial(n - 1);
  }
}
```

* * * * *

**Sorting Algorithms** []() {#sorting-algorithms-a-idsortingalgorithmsa .mume-header}
===========================

### Complexity Classes of Common Sorting Methods {#complexity-classes-of-common-sorting-methods .mume-header}

  Sort Name                     Time Complexity      Space Complexity
  ----------------------------- -------------------- ------------------
  [bubble](#bubblesort)         O(n\^2)              O(1)
  [selection](#selectionsort)   O(n\^2)              O(1)
  [insertion](#insertionsort)   O(n\^2)              O(1)
  [merge](#mergesort)           O(n log n)           O(n)
  [quick](#quicksort)           O(n log n)/O(n\^2)   O(n)/O(log n)
  [binary](#binarysearch)       O(log(n))            O(1)

*Click sort name for more details*

**Bubble Sort** []() {#bbubble-sortb-a-idbubblesorta .mume-header}
--------------------

**Time Complexity**: Quadratic O(n\^2)

-   The inner for-loop contributes to O(n), however in a worst case
    scenario the while loop will need to run n times before bringing all
    n elements to their final resting spot.

**Space Complexity**: O(1)

-   Bubble Sort will always use the same amount of memory regardless of
    n.

``` {.language-javascript data-role="codeBlock" data-info="js"}
function bubbleSort(array) {
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > array[i + 1]) {
        let temp = arr[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        sorted = false;
      }
    }
  }
  return array;
}
```

#### Bubble Sort Pseudocode {#bubble-sort-pseudocode .mume-header}

-   Start looping from the end of the array towards the beginning
    -   Start an inner loop from the beginning until
        `i - 1`{.language-javascript}
        -   If the current value of the outer loop is greater than the
            current value of the inner loop, swap those two values

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/bubble_sort/images/BubbleSort.gif)

* * * * *

**Selection Sort** []() {#bselection-sortb-a-idselectionsorta .mume-header}
-----------------------

**Time Complexity**: Quadratic O(n\^2)

-   Our outer loop will contribute O(n) while the inner loop will
    contribute O(n / 2) on average. Because our loops are nested we will
    get O(n\^2);

**Space Complexity**: O(1)

-   Selection Sort will always use the same amount of memory regardless
    of n.

``` {.language-javascript data-role="codeBlock" data-info="js"}
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let lowest = i;
    for (let j = 0; j < array.length; j++) {
      if (array[j] < array[i]) {
        lowest = j;
      }
    }
    if (lowest !== i) {
      let temp = array[i];
      array[i] = array[lowest];
      array[lowest] = temp;
    }
  }
  return array;
}
```

#### Selection Sort Pseudocode {#selection-sort-pseudocode .mume-header}

-   Store the first element as the smallest value you've seen so far
    -   Compare current element to the next element in the array until
        you find a smaller number.
        -   If a smaller number is found, designate that smaller number
            to be the new *minimum* and continue until the end of the
            array.
    -   If the *minimum* is not the value you initially began with, swap
        the two values.
    -   Repeat this with the next element until the array is sorted.

![selection](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/selection_sort/images/SelectionSort.gif)

* * * * *

**Insertion Sort** []() {#binsertion-sortb-a-idinsertionsorta .mume-header}
-----------------------

**Time Complexity**: Quadratic O(n\^2)

-   Our outer loop will contribute O(n) while the inner loop will
    contribute O(n / 2) on average. Because our loops are nested we will
    get O(n\^2);

**Space Complexity**: O(n)

-   Because we are creating a subArray for each element in the original
    input, our Space Comlexity becomes linear.

``` {.language-javascript data-role="codeBlock" data-info="js"}
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j > -1 && current < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
```

#### Insertion Sort Pseudocode {#insertion-sort-pseudocode .mume-header}

-   Loop through array elements and compare first element with all other
    elements
    -   Swap if necessary
    -   Repeat until array is sorted

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/naive_sorting_algorithms/insertion_sort/images/InsertionSort.gif)

**Merge Sort** []() {#bmerge-sortb-a-idmergesorta .mume-header}
-------------------

**Time Complexity**: Log Linear O(nlog(n))

-   Since our array gets split in half every single time we contribute
    O(log(n)). The while loop contained in our helper merge function
    contributes O(n) therefore our time complexity is O(nlog(n))

**Space Complexity**: O(n)

-   We are linear O(n) time because we are creating subArrays.

``` {.language-javascript data-role="codeBlock" data-info="js"}
// Iterative merge
function merge(arr1, arr2) {
  let result = [];
  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      result.push(arr1.shift());
    } else {
      result.push(arr2.shift());
    }
  }
  return [...result, ...arr1, ...arr2];
}

// Recursive merge
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}
```

#### Merge Sort Pseudocode {#merge-sort-pseudocode .mume-header}

-   Create an empty array to store smallest values
    -   While there are still values in each array
        -   Compare current values from both arrays
            -   Remove whichever is smaller from its array and add it to
                the results array

![mergesort](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/merge_sort/images/MergeSort.gif)

* * * * *

**Quick Sort** []() {#bquick-sortb-a-idquicksorta .mume-header}
-------------------

**Time Complexity**: Quadratic O(n\^2)

-   Even though the average time complexity O(nLog(n)), the worst case
    scenario is always quadratic.

**Space Complexity**: O(n)

-   Our space complexity is linear O(n) because of the partition arrays
    we create.

``` {.language-javascript data-role="codeBlock" data-info="js"}
function quickSort(array) {
  if (array.length <= 1) return array;

  let pivot = array.shift();

  let left = array.filter((x) => x < pivot);
  let right = array.filter((x) => x >= pivot);

  let sortedLeft = quickSort(left);
  let sortedRight = quickSort(right);

  return [...sortedLeft, pivot, ...sortedRight];
}
```

#### Quick Sort Pseudocode {#quick-sort-pseudocode .mume-header}

-   Set up a stop case for when the array is empty
    -   Create a pivot variable to compare array values with
    -   Create an array that will store all array values smaller than
        the pivot
    -   Create an array that will store all array values greater than
        the pivot
    -   Call the quickSort function on both array recursively until they
        are empty
    -   Return an array containg values smallest to largest in order

![quick](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/quick_sort/images/QuickSort.gif)

* * * * *

**Binary Search** {#bbinary-searchb .mume-header}
-----------------

**Time Complexity**: Log Time O(log(n))

**Space Complexity**: O(1)

> Recursive Solution

``` {.language-javascript data-role="codeBlock" data-info="js"}
function binarySearch(array, target) {
  if (array.length === 0) return false;

  let midPt = Math.floor(array.length / 2);

  if (array[midPt] === target) {
    return true;
  } else if (list[midPt] > target) {
    return binarySearch(list.slice(0, mid), target);
  } else {
    return binarySearch(list.slice(midPt + 1), target);
  }
}
```

> Min Max Solution

``` {.language-javascript data-role="codeBlock" data-info="js"}
function binarySearch(array, target) {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    let midpoint = Math.floor((start + end) / 2);

    if (target === array[midpoint]) {
      return midpoint;
    }

    if (target > array[midpoint]) {
      start = midpoint + 1;
    }

    if (target < array[midpoint]) {
      end = midpoint - 1;
    }
  }
  return -1;
}
```

* * * * *

**Memoization** []() {#memoization-a-idmemoizationa .mume-header}
--------------------

-   **Memoization** is a design pattern used to reduce the overall
    number of calculations that can occur in algorithms that use
    recursive strategies to solve

-   There are two features that comprise memoization:

    -   the function is recursive
    -   the additional data structure used is typically an object (we
        refer to this as the memo!)

    ##### Main steps for memoizing a problem:

    1.  Write out the brute force recursion
    2.  Add the memo object as an additional argument

    -   Keys on this object represent input, values are the
        corresponding output

    3.  Add a base condition that returns the stored value if the
        argument is already in the memo
    4.  Before returning a calculation, store the result in the memo for
        future use

    ##### Example of a standard and memoized fibonacci:

    ``` {.language-javascript data-role="codeBlock" data-info="javascript"}
    // Standard Implementation
    // Time Complexity: O(2^n)
    //   - For each call to fib, we have to make two branches, with n levels to this tree
    function fib(n) {
      if (n === 1 || n === 2) return 1;
      return fib(n - 1) + fib(n - 2);
    }

    // Using memoization
    // Time Complexity: O(n)
    //   - We only ever have to calculate fib(x) one time, every other time that we use it in a larger problem, the result is immediately accessible in our memo
    //   - The memo removes the repeated trees of calculations from our original code
    function fib(n, memo = {}) {
      if (n in memo) return memo[n]; // If we already calculated this value, return it
      if (n === 1 || n === 2) return 1;

      // Store the result in the memo first before returning
      // Make sure to pass the memo in to your calls to fib!
      memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
      return memo[n];
    }
    ```

* * * * *

**Tabulation** []() {#tabulation-a-idtabulationa .mume-header}
-------------------

-   **Tabulation** has to look through the entire search space;
    memoization does not
    -   tabulation requires careful ordering of the subproblems is;
        memoization doesn't care much about the order of recursive
        calls.

##### Main considerations for using tabulation: {#main-considerations-for-using-tabulation .mume-header}

-   Figure out how big is your table
    -   Typically going to be base on input size (number in fibonacci,
        length of string in wordBreak)
-   What does my table represent?
    -   You are generally building up your answer.
    -   In fibonacci, we used the table to store the fib number at the
        corresponding index.
    -   In stepper, we stored the boolean of whether it was possible to
        get to that location.
-   What initial values do I need to seed?
    -   Consider what your end result should be (boolean, number, etc.).
    -   Your seed data is generally going to be the immediate answer
        that we know from our base condition.
    -   In fibonacci, we knew the first two numbers of the series.
    -   In stepper, we knew that it was possible to get to our starting
        location, so we seeded it as true, defaulting the rest to false
        so that we could later change its value if we could make that
        step.
-   How do I iterate and fill out my table?
    -   We typically need to iterate over or up to our input in some way
        in order to update and build up our table until we get our final
        result.
    -   In fibonacci, we iterated up to our input number in order to
        calculate the fib number at each step.
    -   In stepper, we iterated over each possible stepping location. If
        we could have made it to that point from our previous steps (ie
        that index was true in our table), we continued updating our
        table by marking the possible landing spots as true.

##### Example of a tabulated fibonacci: {#example-of-a-tabulated-fibonacci .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="javascript"}
// Using tabulation
// Time Complexity: O(n)
//   - We are iterating through an array directly related to the size of the input and performing a constant number of calculations at each step (adding our two previous values together and storing the result in the array).
function fib(n) {
  // We create a table to track our values as we build them up
  // We're making it n+1 here so that table[n] lines up with the nth fib number
  // This is because arrays are zero-indexed.
  // We could have used an array of length n, but we would have to remember that
  // the nth fib number would then be stored at table[n-1]. Completely doable,
  // but I think making them line up is more intuitive.
  let table = new Array(n + 1);
  // Seed our table with our starting values.
  // Again, if we had a table of length n, we could have seeded table[0] = 1
  // and table[1] = 1 and had the same final result with our indices shifted.
  table[0] = 0;
  table[1] = 1;

  // Iterate through our input and fill out our table as we go.
  for (let i = 2; i < table.length; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }

  // At the end, the final entry in our table is the result we are looking for.
  // The table holds all of the sub-answers that we used to get to this result.
  return table[n];
}
```

-   [Big-O Notation](#bbig-o-notationb)
    -   [Jump to...](#jump-to)
    -   [Time Complexity](#time-complexity)
    -   [Complexity Classes](#complexity-classes-a-idcomplexityclassesa)
    -   [O(1) Constant](#bo1-constantb-a-nameconstanta)
    -   [](#)
        -   [Constant Growth](#constant-growth)
        -   [Example Constant Code](#example-constant-code)
    -   [O(log(n)) Logarithmic](#bologn-logarithmicb)
        -   [Logarithmic Growth](#logarithmic-growth)
        -   [Example Logarithmic Code](#example-logarithmic-code)
    -   [O(n) Linear](#bon-linearb)
        -   [Linear Growth:](#linear-growth)
        -   [Example Linear Code](#example-linear-code)
    -   [O(n \* log(n)) Loglinear](#bon-logn-loglinearb)
        -   [Loglinear Growth:](#loglinear-growth)
        -   [Example Loglinear Code](#example-loglinear-code)
    -   [**O(nc) Polynomial**](#bonsupcsup-polynomialb)
        -   [Polynomial Growth:](#polynomial-growth)
        -   [Example Polynomial Code](#example-polynomial-code)
    -   [**O(cn)
        Exponential**](#bocsupnsup-exponentialb-a-idexponentiala)
        -   [Exponential Growth:](#exponential-growth)
        -   [Example Exponential Code](#example-exponential-code)
    -   [O(n!) Factorial](#bon-factorialb)
        -   [Factorial Growth:](#factorial-growth)
        -   [Example Factorial Code](#example-factorial-code)
-   [**Sorting Algorithms**](#sorting-algorithms-a-idsortingalgorithmsa)
    -   [Complexity Classes of Common Sorting
        Methods](#complexity-classes-of-common-sorting-methods)
    -   [Bubble Sort](#bbubble-sortb-a-idbubblesorta)
        -   [Bubble Sort Pseudocode](#bubble-sort-pseudocode)
    -   [Selection Sort](#bselection-sortb-a-idselectionsorta)
        -   [Selection Sort Pseudocode](#selection-sort-pseudocode)
    -   [Insertion Sort](#binsertion-sortb-a-idinsertionsorta)
        -   [Insertion Sort Pseudocode](#insertion-sort-pseudocode)
    -   [Merge Sort](#bmerge-sortb-a-idmergesorta)
        -   [Merge Sort Pseudocode](#merge-sort-pseudocode)
    -   [Quick Sort](#bquick-sortb-a-idquicksorta)
        -   [Quick Sort Pseudocode](#quick-sort-pseudocode)
    -   [Binary Search](#bbinary-searchb)
    -   [**Memoization**](#memoization-a-idmemoizationa)
    -   [**Tabulation**](#tabulation-a-idtabulationa)\
         - [Main considerations for using
        tabulation:](#main-considerations-for-using-tabulation)\
         - [Example of a tabulated
        fibonacci:](#example-of-a-tabulated-fibonacci)

≡
