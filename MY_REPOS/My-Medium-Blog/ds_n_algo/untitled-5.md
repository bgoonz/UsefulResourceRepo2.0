# A Quick Guide to Big-O Notation, Memoization, Tabulation, and Sorting Algorithms by Example

Curating Complexity: A Guide to Big-O Notation

## A Quick Guide to Big-O Notation, Memoization, Tabulation, and Sorting Algorithms by Example <a id="794e"></a>

![](https://cdn-images-1.medium.com/max/800/0*yjlSk3T9c2_14in1.png)

_**Curating Complexity: A Guide to Big-O Notation**_

* Why is looking at runtime not a reliable method of calculating time complexity?
* Not all computers are made equal\( some may be stronger and therefore boost our runtime speed \)
* How many background processes ran concurrently with our program that was being tested?
* We also need to ask if our code remains performant if we increase the size of the input.
* The real question we need to answering is: `How does our performance scale?`.

## big ‘O’ notation <a id="5fc8"></a>

* Big O Notation is a tool for describing the efficiency of algorithms with respect to the size of the input arguments.
* Since we use mathematical functions in Big-O, there are a few big picture ideas that we’ll want to keep in mind:
* The function should be defined by the size of the input.
* `Smaller` Big O is better \(lower time complexity\)
* Big O is used to describe the worst case scenario.
* Big O is simplified to show only its most dominant mathematical term.

## Simplifying Math Terms <a id="6083"></a>

* We can use the following rules to simplify the our Big O functions:
* `Simplify Products` : If the function is a product of many terms, we drop the terms that don't depend on n.
* `Simplify Sums` : If the function is a sum of many terms, we drop the non-dominant terms.
* `n` : size of the input
* `T(f)` : unsimplified math function
* `O(f)` : simplified math function.

`Putting it all together` ![](https://cdn-images-1.medium.com/max/800/1*TT8uuv1x3nmGUw5rvtoZ8A.png)

* First we apply the product rule to drop all constants.
* Then we apply the sum rule to select the single most dominant term.

## Complexity Classes <a id="915e"></a>

Common Complexity Classes

### There are 7 major classes in Time Complexity <a id="e9a1"></a>

![](https://cdn-images-1.medium.com/max/800/1*6zKhmJoHkvDbrd8jfUDf3A.png)

### `O(1) Constant` <a id="a022"></a>

> **The algorithm takes roughly the same number of steps for any input size.**

### `O(log(n)) Logarithmic` <a id="81af"></a>

> **In most cases our hidden base of Logarithmic time is 2, log complexity algorithm’s will typically display ‘halving’ the size of the input \(like binary search!\)**

### `O(n) Linear` <a id="be35"></a>

> **Linear algorithm’s will access each item of the input “once”.**

## `O(nlog(n)) Log Linear Time` <a id="b965"></a>

> **Combination of linear and logarithmic behavior, we will see features from both classes.**
>
> Algorithm’s that are log-linear will use **both recursion AND iteration.**

## `O(nc) Polynomial` <a id="fb10"></a>

> **C is a fixed constant.**

## `O(c^n) Exponential` <a id="2736"></a>

> **C is now the number of recursive calls made in each stack frame.**
>
> **Algorithm’s with exponential time are VERY SLOW.**

## Tabulation <a id="c4a7"></a>

### Tabulation Strategy <a id="d926"></a>

> Use When:

* **The function is iterative and not recursive.**
* _The accompanying DS is usually an array._

### Steps for tabulation <a id="e9d4"></a>

* _Create a table array based off the size of the input._
* _Initialize some values in the table to ‘answer’ the trivially small subproblem._
* _Iterate through the array and fill in the remaining entries._
* _Your final answer is usually the last entry in the table._

## Memo and Tab Demo with Fibonacci <a id="7366"></a>

> _Normal Recursive Fibonacci_

```text
function fibonacci(n) {
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

> _Memoization Fibonacci 1_
>
> _Memoization Fibonacci 2_
>
> _Tabulated Fibonacci_

## Example of Linear Search <a id="a8cd"></a>

* _Worst Case Scenario: The term does not even exist in the array._
* _Meaning: If it doesn’t exist then our for loop would run until the end therefore making our time complexity O\(n\)._

## Sorting Algorithms <a id="5bf0"></a>

## Bubble Sort <a id="ad34"></a>

`Time Complexity`: Quadratic O\(n^2\)

* The inner for-loop contributes to O\(n\), however in a worst case scenario the while loop will need to run n times before bringing all n elements to their final resting spot.

`Space Complexity`: O\(1\)

* Bubble Sort will always use the same amount of memory regardless of n.

![](https://cdn-images-1.medium.com/max/800/0*Ck9aeGY-d5tbz7dT)

* The first major sorting algorithm one learns in introductory programming courses.
* Gives an intro on how to convert unsorted data into sorted data.

> It’s almost never used in production code because:

* _It’s not efficient_
* _It’s not commonly used_
* _There is stigma attached to it_
* _`Bubbling Up` : Term that infers that an item is in motion, moving in some direction, and has some final resting destination._
* _Bubble sort, sorts an array of integers by bubbling the largest integer to the top._
* _Worst Case & Best Case are always the same because it makes nested loops._
* _Double for loops are polynomial time complexity or more specifically in this case Quadratic \(Big O\) of: O\(n²\)_

## Selection Sort <a id="dda6"></a>

`Time Complexity`: Quadratic O\(n^2\)

* Our outer loop will contribute O\(n\) while the inner loop will contribute O\(n / 2\) on average. Because our loops are nested we will get O\(n²\);

`Space Complexity`: O\(1\)

* Selection Sort will always use the same amount of memory regardless of n.

![](https://cdn-images-1.medium.com/max/800/0*AByxtBjFrPVVYmyu)

* Selection sort organizes the smallest elements to the start of the array.

![](https://cdn-images-1.medium.com/max/800/0*GeYNxlRcbt2cf0rY)

> Summary of how Selection Sort should work:

1. _Set MIN to location 0_
2. _Search the minimum element in the list._
3. _Swap with value at location Min_
4. _Increment Min to point to next element._
5. _Repeat until list is sorted._

## Insertion Sort <a id="1ce8"></a>

`Time Complexity`: Quadratic O\(n^2\)

* Our outer loop will contribute O\(n\) while the inner loop will contribute O\(n / 2\) on average. Because our loops are nested we will get O\(n²\);

`Space Complexity`: O\(n\)

* Because we are creating a subArray for each element in the original input, our Space Comlexity becomes linear.

![](https://cdn-images-1.medium.com/max/800/0*gbNU6wrszGPrfAZG)

## Merge Sort <a id="377f"></a>

`Time Complexity`: Log Linear O\(nlog\(n\)\)

* Since our array gets split in half every single time we contribute O\(log\(n\)\). The while loop contained in our helper merge function contributes O\(n\) therefore our time complexity is O\(nlog\(n\)\); `Space Complexity`: O\(n\)
* We are linear O\(n\) time because we are creating subArrays.

![](https://cdn-images-1.medium.com/max/800/0*GeU8YwwCoK8GiSTD) ![](https://cdn-images-1.medium.com/max/800/0*IxqGb72XDVDeeiMl)

## Example of Merge Sort <a id="3aa9"></a>

![](https://cdn-images-1.medium.com/max/800/0*HMCR--9niDt5zY6M)

* **Merge sort is O\(nlog\(n\)\) time.**
* _We need a function for merging and a function for sorting._

> Steps:

1. _If there is only one element in the list, it is already sorted; return the array._
2. _Otherwise, divide the list recursively into two halves until it can no longer be divided._
3. _Merge the smallest lists into new list in a sorted order._

## Quick Sort <a id="b50b"></a>

`Time Complexity`: Quadratic O\(n^2\)

* Even though the average time complexity O\(nLog\(n\)\), the worst case scenario is always quadratic.

`Space Complexity`: O\(n\)

* Our space complexity is linear O\(n\) because of the partition arrays we create.
* QS is another Divide and Conquer strategy.
* Some key ideas to keep in mind:
* It is easy to sort elements of an array relative to a particular target value.
* An array of 0 or 1 elements is already trivially sorted.

![](https://cdn-images-1.medium.com/max/800/0*WLl_HpdBGXYx284T) ![](https://cdn-images-1.medium.com/max/800/0*-LyHJXGPTYsWLDZf)

## Binary Search <a id="a2ba"></a>

`Time Complexity`: Log Time O\(log\(n\)\)

`Space Complexity`: O\(1\) ![](https://cdn-images-1.medium.com/max/800/0*-naVYGTXzE2Yoali)

> _Recursive Solution_
>
> _Min Max Solution_

* _Must be conducted on a sorted array._
* _Binary search is logarithmic time, not exponential b/c n is cut down by two, not growing._
* _Binary Search is part of Divide and Conquer._

## Insertion Sort <a id="d7dd"></a>

* **Works by building a larger and larger sorted region at the left-most end of the array.**

> Steps:

1. _If it is the first element, and it is already sorted; return 1._
2. _Pick next element._
3. _Compare with all elements in the sorted sub list_
4. _Shift all the elements in the sorted sub list that is greater than the value to be sorted._
5. _Insert the value_
6. _Repeat until list is sorted._

## If you found this guide helpful feel free to checkout my GitHub/gists where I host similar content: <a id="3695"></a>

## Or Checkout my personal Resource Site: <a id="cb1a"></a>

![](https://cdn-images-1.medium.com/max/800/1*VCmj_H9AHs41oC9Yx1hZFQ.png)

## Discover More: <a id="5b9e"></a>

