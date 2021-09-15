# App Academy Open

> Learn to code online with access to App Academy’s entire full-stack course for free

*   Catalog
*   Full Stack Online
*   Data Structures And Algorithms
*   Quick Sort Notes

Time for another efficient sorting algorithm! Let's learn `quickSort`. Like we did previously for `mergeSort`, let's build up the the algorithm together. You'll see that `quickSort` has a similar "divide and conquer" strategy to `mergeSort`. Here are a few key ideas that will motivate our design:

*   it is easy to sort elements of an array relative to a particular target value
    *   for example given `[7, 3, 8, 9, 2]` and a target of `5`, we know `[3, 2]` are numbers less than `5` and `[7, 8, 9]` are numbers greater than `5`.
*   we can consider an array of 0 or 1 elements as already trivially sorted

How does it work?
-----------------

In general, the strategy is to divide the input array into two subarrays; one with the smaller elements, and one with the larger elements. Then, it recursively operates on the two new subarrays, and continues this process until we reach subarrays of length 1 or smaller. As we have seen with Merge Sort, arrays of such length are automatically sorted (for obvious reasons).

The steps, when discussed on a high level, are simple:

*   Select one element called the "pivot". (This step varies by the implementation.)
*   Find the index in the final output at which the pivot element should end up. To do this:
    *   Move all elements smaller than the pivot to the pivot's left, and all elements greater than than the pivot to the pivot's right.
*   Repeat the process, individually, for the left side, and then for the right side, by recursively calling Quick Sort on each subarray.

Before we move forward, see if you can observe the behavior described above in the following animation:

![Source: https://visualgo.net](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/quick_sort/images/QuickSort.gif)

The Algorithm: "Divide and Conquer"
-----------------------------------

Let's hone in on the first major point above. Formally, we want to partition elements of an array relative to a pivot value. That is, we want elements less than the pivot to be separated from elements that are greater than or equal to the pivot. Our goal is to create a function with this behavior:

    let arr = [7, 3, 8, 9, 2];
    partition(arr, 5);  // => [[3, 2], [7,8,9]]

### Partition

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

Both of the above implementations are correct, but we'll use the second one as it is cleaner. It's worth mentioning that the `partition` function will have a runtime of `O(n)`. `forEach` and `filter` both have linear, `O(n)`, time complexity. Although our fancy `partition` does filter twice, this is a constant we drop, `O(2n) = O(n)`. Linear time is fast so we are quite happy with `partition`.

We won't be using an explicit `partition` helper function in our `quickSort` implementation, however we will borrow heavily from this pattern. As you design algorithms, it helps to think about key patterns in isolation, although your solution may not feature that exact helper. Some would say we like to divide and conquer :).

### Quick Sort Recursion

Let's begin structuring the recursion. The base case of any recursive problem is where the input is so trivial, we immediately know the answer without calculation. If our problem is to sort an array, what is the trivial array? An array of 1 or 0 elements! Let's establish the code:

    function quickSort(array) {
        if (array.length <= 1) {
            return array;
        }
        // ...
    }

If our base case pretains to an array of a very small size, then the design of our recursive case should make progress toward hitting this base scenario. In other words, we should recursively call `quickSort` on smaller and smaller arrays. This is very similar to our previous `mergeSort`, except we don't just split the array down the middle. Instead we should arbitrarily choose an element of the array as a pivot and partition the remaining elements relative to this pivot:

    function quickSort(array) {
        if (array.length <= 1) {
            return array;
        }
    
        let pivot = array.shift();
        let left = array.filter(el => el < pivot);
        let right = array.filter(el => el >= pivot);
        // ...

Here is what to notice about the partition step above: 1. the pivot is an element of the array; we arbitrarily chose the first element 2. we removed the pivot from the master array before we filter into the left and right partitions

Now that we have the two subarrays of `left` and `right` we have our subproblems! To solve these subproblems we must sort the subarrays. I wish we had a function that sorts an array...oh wait we do, `quickSort`! Recursively:

    function quickSort(array) {
        if (array.length <= 1) {
            return array;
        }
    
        let pivot = array.shift();
        let left = array.filter(el => el < pivot);
        let right = array.filter(el => el >= pivot);
    
        let leftSorted = quickSort(left);
        let rightSorted = quickSort(right);
        // ...

Okay, so we have the two sorted partitions. This means we have the two subsolutions. But how do we put them together? Think about how we partitioned them in the first place. Everything in `leftSorted` is **guaranteed** to be less than everything in `rightSorted`. On top of that, `pivot` should be placed after the last element in `leftSorted`, but before the first element in `rightSorted`. So all we need to do is to combine the elements in the order "left, pivot, right"!

    function quickSort(array) {
        if (array.length <= 1) {
            return array;
        }
    
        let pivot = array.shift();
        let left = array.filter(el => el < pivot);
        let right = array.filter(el => el >= pivot);
    
        let leftSorted = quickSort(left);
        let rightSorted = quickSort(right);
    
        return leftSorted.concat([pivot]).concat(rightSorted);
    }

That last `concat` line is a bit clunky. Bonus JS Lesson: we can use the spread `...` operator to elegantly concat arrays. In general:

    let one = ['a', 'b']
    let two = ['d', 'e', 'f']
    let newArr = [ ...one, 'c', ...two  ];
    newArr; // =>  [ 'a', 'b', 'c', 'd', 'e', 'f' ]

Utilizing that spread pattern gives us this final implementation:

    function quickSort(array) {
        if (array.length <= 1) {
            return array;
        }
    
        let pivot = array.shift();
        let left = array.filter(el => el < pivot);
        let right = array.filter(el => el >= pivot);
    
        let leftSorted = quickSort(left);
        let rightSorted = quickSort(right);
    
        return [ ...leftSorted, pivot, ...rightSorted ];
    }

I'd hire that programmer.

### Quicksort Sort JS Implementation

That code was so clean we should show it again. Here's the complete code for your reference, for when you `ctrl+F "quicksort"` the night before an interview:

    function quickSort(array) {
        if (array.length <= 1) {
            return array;
        }
    
        let pivot = array.shift();
        let left = array.filter(el => el < pivot);
        let right = array.filter(el => el >= pivot);
    
        let leftSorted = quickSort(left);
        let rightSorted = quickSort(right);
    
        return [ ...leftSorted, pivot, ...rightSorted ];
    }

Time and Space Complexity Analysis
----------------------------------

The complexity analysis of this algorithm is easier to explain through visuals, so we **highly encourage** you to watch the lecture that accompanies this reading. In any case, here is a summary of the complexity.

### Time Complexity

*   Avg Case: O(n log(n))
*   Worst Case: O(n2)

The runtime analysis of `quickSort` is more complex than `mergeSort`

*   `n` is the length of the input array
*   The partition step alone is `O(n)`
*   We must calculate how many recursive calls we make. The number of recursive calls is the number of times we must split the array to reach the base case. This is dependent on how we choose the pivot. Let's analyze the best and worst case:
    *   **Best Case:** We are lucky and always choose the median as the pivot. This means the left and right partitions will have equal length. This will halve the array length at every step of the recursion. We benefit from this halving with `O(log(n))` recursive calls to reach the base case.
    *   **Worst Case:** We are unlucky and always choose the min or max as the pivot. This means one partition will contain everything, and the other partition is empty. This will decrease the array length by 1 at every step of the recursion. We suffer from `O(n)` recursive calls to reach the base case.
*   The partition step occurs in every recursive call, so our total complexities are:
    *   **Best Case:** O(n \* log(n))
    *   **Worst Case:** O(n2)

Although we typically take the worst case when describing Big-O for an algorithm, much research on `quickSort` has shown the worst case to be an exceedingly rare occurance even if we choose the pivot at random. Because of this we still consider `quickSort` an efficient algorithm. This is a common interview talking point, so you should be familiar with the relationship between the choice of pivot and efficiency of the algorithm.

Just in case: A somewhat common question a student may ask when studying `quickSort` is, "If the median is the best pivot, why don't we always just choose the median when we partition?" Don't overthink this. To know the median of an array, it must be sorted in the first place.

### Space Complexity

Our implementation of `quickSort` uses `O(n)` space because of the partition arrays we create. There is an in-place version of `quickSort` that uses `O(log(n))` space. `O(log(n))` space is not huge benefit over `O(n)`. You'll also find our version of `quickSort` as easier to remember, easier to implement. Just know that a `O(logn)` space `quickSort` exists.

### When should we use Quick Sort?

*   When you are in a pinch and need to throw down an efficent sort (on average). The recursive code is light and simple to implement; much smaller than `mergeSort`.
*   When constant space is important to you, use the in-place version. This will of course trade off some simplicity of implementation.

If you know some constraints about dataset you can make some modifications to optimize pivot choice. Here's some food for thought. Our implementation of `quickSort` will always take the first element as the pivot. This means we will suffer from the worst case time complexity in the event that we are given an already sorted array (ironic isn't it?). If you know your input data to be mostly already sorted, randomize the choice of pivot - this is a very easy change. Bam. Solved like a true engineer.

Did you find this lesson helpful?


[Source](https://open.appacademy.io/learn/full-stack-online/data-structures-and-algorithms/quick-sort-notes)