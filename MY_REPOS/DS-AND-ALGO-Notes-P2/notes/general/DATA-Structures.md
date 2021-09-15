<!--
Created: Thu Nov 05 2020 18:40:59 GMT-0500 (Eastern Standard Time)
Modified: Thu Nov 05 2020 18:40:59 GMT-0500 (Eastern Standard Time)
-->

---

# Efficient Sorting Algorithms

---

-   it is easy to merge elements of two sorted arrays into a single sorted array
-   we can consider an array containing only a single element as already trivially sorted
    -   we can also consider an empty array as trivially sorted

## The Algorithm: "Divide and Conquer"

We're going to need a helper function that solves the first major point from above. How might we merge two sorted arrays? In other words we want a `merge` function that will behave like so:

    let arr1 = [1, 5, 10, 15];
    let arr2 = [0, 2, 3, 7, 10];
    merge(arr1, arr2); // => [0, 1, 2, 3, 5, 7, 10, 10, 15]

### Merge

Merging two sorted arrays is simple. Since both arrays are sorted, we know the smallest numbers to always be at the front of the arrays. We can construct the new array by comparing the first elements of both input arrays. We remove the smaller element from it's respective array and add it to our new array. Do this until both input arrays are empty:

```js
function merge(array1, array2) {
    let merged = [];

    while (array1.length || array2.length) {
        let ele1 = array1.length ? array1[0] : Infinity;
        let ele2 = array2.length ? array2[0] : Infinity;

        let next;
        if (ele1 < ele2) {
            next = array1.shift();
        } else {
            next = array2.shift();
        }

        merged.push(next);
    }

    return merged;
}
```

If your JavaScript is rusty, don't freak out! Here are a few cool JS patterns that we leverage above.

-   `0` is considered a falsey value, meaning it acts like `false` when used in boolean expressions. All other numbers are truthy.
-   `Infinity` is a value that is guaranteed to be greater than any other quantity
-   `shift` is an array method that removes and returns the first element

Is the code still hazy? Let's look at an annotated version:

````js
// commented```js
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
````

By using `Infinity` as the default ele when an array is empty, we are able to elegantly handle the scenario where one array empties before the other. We know that any actual element will be less than `Infinity` so we will continually take the other element into our merged array.

In other words, we can safely handle this edge case:

```js
merge([10, 13, 15, 25], []); // => [10, 13, 15, 25]
```

Nice! We now have a way to merge two sorted arrays into a single sorted array. It's worth mentioning that `merge` will have a `O(n)` runtime where `n` is the combined length of the two input arrays. This is what we meant when we said it was "easy" to merge two sorted arrays; linear time is fast! We'll find fact this useful later.

### Merge Sort Recursion

Now that we satisfied the merge idea, let's handle the second point. That is, we say an array of 1 or 0 elements is already sorted. This will be the base case of our recursion. Let's begin adding this code:

```````js
    function mergeSort(array) {
        if (array.length <= 1) {
            return array;
        }
       //...some code here.
    }

If our base case pretains to an array of a very small size, then the design of our recursive case should make progress toward hitting this base scenario. In other words, we should recursively call `mergeSort` on smaller and smaller arrays. A logical way to do this is to take the input array and split it into left and right halves.
```js
    function mergeSort(array) {
        if (array.length <= 1) {
            return array;
        }

        let midIdx = Math.floor(array.length / 2);
        let leftHalf = array.slice(0, midIdx);
        let rightHalf = array.slice(midIdx);

        let sortedLeft = mergeSort(leftHalf);
        let sortedRight = mergeSort(rightHalf);
       //...some code here
    }

Here is the part of the recursion where we do a lot of hand waving and we take things on faith. We know that `mergeSort` will take in an array and return the sorted version; we assume that it works. That means the two recursive calls will return the `sortedLeft` and `sortedRight` halves.

Okay, so we have two sorted arrays. We want to return one sorted array. So `merge` them! Using the `merge` function we designed earlier:
```js
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

```Wow. that's it. Notice how light the implementation of `mergeSort` is. Much of the heavy lifting (the actually comparisons) is done by the `merge` helper.

`mergeSort` is a classic example of a "Divide and Conquer" algorithm. In other words, we keep breaking the array into smaller and smaller sub arrays. This is the same as saying we take the problem and break it down into smaller and smaller subproblems. We do this until the subproblems are so small that we trivially know the answer to them (an array length 0 or 1 is already sorted). Once we have those subanswers we can combine to reconstruct the larger problems that we previously divided (merge the left and right subarrays).

The process is visualized below. When elements are moved to the bottom of the picture, they are going through the `merge` step:

![source: https://visualgo.net](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/merge_sort/images/MergeSort.gif)

### Merge Sort JS Implementation

Here is the full code for your reference:
```js
    function merge(array1, array2) {
        let merged = [];

        while (array1.length || array2.length) {
            let ele1 = array1.length ? array1[0] : Infinity;
            let ele2 = array2.length ? array2[0] : Infinity;

            let next;
            if (ele1 < ele2) {
                next = array1.shift();
            } else {
                next = array2.shift();
            }

            merged.push(next);
        }

        return merged;
    }

``````js
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

```````

## Time and Space Complexity Analysis

The complexity analysis of this algorithm is easier to explain through visuals, so we **highly encourage** you to watch the lecture that accompanies this reading. In any case, here is a summary of the complexity:

### Time Complexity: O(n log(n))

-   `n` is the length of the input array
-   We must calculate how many recursive calls we make. The number of recursive calls is the number of times we must split the array to reach the base case. Since we split in half each time, the number of recursive calls is `O(log(n))`.
    -   for example, say we had an array of length `32`
    -   then the length would change as `32 -> 16 -> 8 -> 4 -> 2 -> 1`, we have to split 5 times before reaching the base case, `log(32) = 5`
    -   in our algorithm, **log(n)** describes how many times we must halve **n** until the quantity reaches 1.
-   Besides the recursive calls, we must consider the while loop within the `merge` function, which contributes `O(n)` in isolation
-   We call `merge` in every recursive `mergeSort` call, so the total complexity is **O(n \* log(n))**

### Space Complexity: O(n)

Merge Sort is the first non-O(1) space sorting algorithm we've seen thus far.

The larger the size of our input array, the greater the number of subarrays we must create in memory. These are not free! They each take up finite space, and we will need a new subarray for each element in the original input. Therefore, Merge Sort has a linear space complexity, O(n).

### When should we use Merge Sort?

Unless we, the engineers, have access in advance to some unique, exploitable insight about our dataset, it turns out that O(n log n) time is _the best_ we can do when sorting unknown datasets.

That means that Merge Sort is fast! It's way faster than Bubble Sort, Selection Sort, and Insertion Sort. However, due to its linear space complexity, we must always weigh the tradeoff between speed and memory consumption when making the choice to use Merge Sort. Consider the following:

-   If you have unlimited memory available, use it, it's fast!
-   If you have a decent amount of memory available and a medium sized dataset, run some tests first, but use it!
-   If you have very limited memory and you've got time to kill, maybe you should consider other options.
-   If you have very limited memory and no time to kill...well, you're going to have to do some data analysis to look for some exploitable feature of the data set, but that takes human time.

---

---

-   it is easy to sort elements of an array relative to a particular target value
    -   for example given `[7, 3, 8, 9, 2]` and a target of `5`, we know `[3, 2]` are numbers less than `5` and `[7, 8, 9]` are numbers greater than `5`.
-   we can consider an array of 0 or 1 elements as already trivially sorted

## How does it work?

In general, the strategy is to divide the input array into two subarrays; one with the smaller elements, and one with the larger elements. Then, it recursively operates on the two new subarrays, and continues this process until we reach subarrays of length 1 or smaller. As we have seen with Merge Sort, arrays of such length are automatically sorted (for obvious reasons).

The steps, when discussed on a high level, are simple:

-   Select one element called the "pivot". (This step varies by the implementation.)
-   Find the index in the final output at which the pivot element should end up. To do this:
    -   Move all elements smaller than the pivot to the pivot's left, and all elements greater than than the pivot to the pivot's right.
-   Repeat the process, individually, for the left side, and then for the right side, by recursively calling Quick Sort on each subarray.

Before we move forward, see if you can observe the behavior described above in the following animation:

![Source: https://visualgo.net](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/quick_sort/images/QuickSort.gif)

## The Algorithm: "Divide and Conquer"

Let's hone in on the first major point above. Formally, we want to partition elements of an array relative to a pivot value. That is, we want elements less than the pivot to be separated from elements that are greater than or equal to the pivot. Our goal is to create a function with this behavior:

    let arr = [7, 3, 8, 9, 2];
    partition(arr, 5);  // => [[3, 2], [7,8,9]]

### Partition

Seems simple enough! Let's implement it in JavaScript: // nothing fancy

```js
function partition(array, pivot) {
    let left = [];
    let right = [];

    array.forEach((el) => {
        if (el < pivot) {
            left.push(el);
        } else {
            right.push(el);
        }
    });

    return [left, right];
}
```

```js
function partition(array, pivot) {
    let left = array.filter((el) => el < pivot);
    let right = array.filter((el) => el >= pivot);
    return [left, right];
}
```

Both of the above implementations are correct, but we'll use the second one as it is cleaner. It's worth mentioning that the `partition` function will have a runtime of `O(n)` . `forEach` and `filter` both have linear, `O(n)` , time complexity. Although our fancy `partition` does filter twice, this is a constant we drop, `O(2n) = O(n)` . Linear time is fast so we are quite happy with `partition` .

We won't be using an explicit `partition` helper function in our `quickSort` implementation, however we will borrow heavily from this pattern. As you design algorithms, it helps to think about key patterns in isolation, although your solution may not feature that exact helper. Some would say we like to divide and conquer :).

### Quick Sort Recursion

Let's begin structuring the recursion. The base case of any recursive problem is where the input is so trivial, we immediately know the answer without calculation. If our problem is to sort an array, what is the trivial array? An array of 1 or 0 elements! Let's establish the code:

```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }
}
```

If our base case pretains to an array of a very small size, then the design of our recursive case should make progress toward hitting this base scenario. In other words, we should recursively call `quickSort` on smaller and smaller arrays. This is very similar to our previous `mergeSort` , except we don't just split the array down the middle. Instead we should arbitrarily choose an element of the array as a pivot and partition the remaining elements relative to this pivot:

```js
    function quickSort(array) {
        if (array.length <= 1) {
            return array;
        }

```

```js
let pivot = array.shift();
let left = array.filter((el) => el < pivot);
let right = array.filter((el) => el >= pivot);
//...some code here
```

Here is what to notice about the partition step above: 1. the pivot is an element of the array; we arbitrarily chose the first element 2. we removed the pivot from the master array before we filter into the left and right partitions

Now that we have the two subarrays of `left` and `right` we have our subproblems! To solve these subproblems we must sort the subarrays. I wish we had a function that sorts an array...oh wait we do, `quickSort` ! Recursively:

```js
    function quickSort(array) {
        if (array.length <= 1) {
            return array;
        }

        let pivot = array.shift();
        let left = array.filter(el => el < pivot);
        let right = array.filter(el => el >= pivot);

        let leftSorted = quickSort(left);
        let rightSorted = quickSort(right);
       //...some code here
```

Okay, so we have the two sorted partitions. This means we have the two subsolutions. But how do we put them together? Think about how we partitioned them in the first place. Everything in `leftSorted` is **guaranteed** to be less than everything in `rightSorted` . On top of that, `pivot` should be placed after the last element in `leftSorted` , but before the first element in `rightSorted` . So all we need to do is to combine the elements in the order "left, pivot, right"!

```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter((el) => el < pivot);
    let right = array.filter((el) => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return leftSorted.concat([pivot]).concat(rightSorted);
}
```

That last `concat` line is a bit clunky. Bonus JS Lesson: we can use the spread `...` operator to elegantly concat arrays. In general:

```js
let one = ["a", "b"];
let two = ["d", "e", "f"];
let newArr = [...one, "c", ...two];
newArr; // =>  [ 'a', 'b', 'c', 'd', 'e', 'f' ]
```

Utilizing that spread pattern gives us this final implementation:

```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter((el) => el < pivot);
    let right = array.filter((el) => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return [...leftSorted, pivot, ...rightSorted];
}
```

I'd hire that programmer.

### Quicksort Sort JS Implementation

That code was so clean we should show it again. Here's the complete code for your reference, for when you `ctrl+F "quicksort"` the night before an interview:

```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter((el) => el < pivot);
    let right = array.filter((el) => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return [...leftSorted, pivot, ...rightSorted];
}
```

## Time and Space Complexity Analysis

The complexity analysis of this algorithm is easier to explain through visuals, so we **highly encourage** you to watch the lecture that accompanies this reading. In any case, here is a summary of the complexity.

### Time Complexity

-   Avg Case: O(n log(n))
-   Worst Case: O(n2)

The runtime analysis of `quickSort` is more complex than `mergeSort`

-   `n` is the length of the input array
-   The partition step alone is `O(n)`
-   We must calculate how many recursive calls we make. The number of recursive calls is the number of times we must split the array to reach the base case. This is dependent on how we choose the pivot. Let's analyze the best and worst case:
    -   **Best Case:** We are lucky and always choose the median as the pivot. This means the left and right partitions will have equal length. This will halve the array length at every step of the recursion. We benefit from this halving with `O(log(n))` recursive calls to reach the base case.
    -   **Worst Case:** We are unlucky and always choose the min or max as the pivot. This means one partition will contain everything, and the other partition is empty. This will decrease the array length by 1 at every step of the recursion. We suffer from `O(n)` recursive calls to reach the base case.
-   The partition step occurs in every recursive call, so our total complexities are:
    -   **Best Case:** O(n \* log(n))
    -   **Worst Case:** O(n2)

Although we typically take the worst case when describing Big-O for an algorithm, much research on `quickSort` has shown the worst case to be an exceedingly rare occurance even if we choose the pivot at random. Because of this we still consider `quickSort` an efficient algorithm. This is a common interview talking point, so you should be familiar with the relationship between the choice of pivot and efficiency of the algorithm.

Just in case: A somewhat common question a student may ask when studying `quickSort` is, "If the median is the best pivot, why don't we always just choose the median when we partition?" Don't overthink this. To know the median of an array, it must be sorted in the first place.

### Space Complexity

Our implementation of `quickSort` uses `O(n)` space because of the partition arrays we create. There is an in-place version of `quickSort` that uses `O(log(n))` space. `O(log(n))` space is not huge benefit over `O(n)` . You'll also find our version of `quickSort` as easier to remember, easier to implement. Just know that a `O(logn)` space `quickSort` exists.

### When should we use Quick Sort?

-   When you are in a pinch and need to throw down an efficent sort (on average). The recursive code is light and simple to implement; much smaller than `mergeSort`.
-   When constant space is important to you, use the in-place version. This will of course trade off some simplicity of implementation.

---

### End of Efficient Sorting Algorithms

---

---

# Binary Search

---

We've explored many ways to sort arrays so far, but why did we go through all of that trouble? By sorting elements of an array, we are organizing the data in a way that gives us a quick way to look up elements later on. For simplicity, we have been using arrays of numbers up until this point. However, these sorting concepts can be generalized to other data types. For example, it would be easy to modify our comparison-based sorting algorithms to sort strings: instead of leveraging facts like `0 < 1` , we can say `'A' < 'B'` .

Think of a dictionary. A dictionary contains alphabetically sorted words and their definitions. A dictionary is pretty much only useful if it is ordered in this way. Let's say you wanted to look up the definition of "stupendous." What steps might you take?

-   you open up the dictionary at the roughly middle page
    -   you land in the "m" section
-   you know "s" comes somewhere after "m" in the book, so you disregard all pages before the "m" section. Instead, you flip to the roughly middle page between "m" and "z"
    -   you land in the "u" section
-   you know "s" comes somewhere before "u", so you can disregard all pages after the "u" section. Instead, you flip to the roughly middle page between the previous "m" page and "u"
-   ...

You are essentially using the `binarySearch` algorithm in the real world.

## The Algorithm: "check the middle and half the search space"

Formally, our `binarySearch` will seek to solve the following problem:

    Given a sorted array of numbers and a target num, return a boolean indicating whether or not that target is contained in the array.

Programmatically, we want to satisfy the following behavior:

```js
binarySearch([5, 10, 12, 15, 20, 30, 70], 12); // => true
binarySearch([5, 10, 12, 15, 20, 30, 70], 24); // => false
```

Before we move on, really internalize the fact that `binarySearch` will only work on **sorted** arrays! Obviously we can search any array, sorted or unsorted, in `O(n)` time. But now our goal is be able to search the array with a sub-linear time complexity (less than `O(n)` ).

### Binary Search Recursion

We'll implement binary search recursively. As always, we start with a base case that captures the scenario of the input array being so trivial, that we know the answer without further calculation. If we are given an empty array and a target, we can be certain that the target is not inside of the array:

```js
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }
    //...some code here
}
```

Now for our recursive case. If we want to get a time complexity less than `O(n)` , we must avoid touching all `n` elements. Adopting our dictionary strategy, let's find the middle element and grab references to the left and right halves of the sorted array:

```js
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx + 1);
    //...some code here
}
```

It's worth pointing out that the left and right halves do not contain the middle element we chose.

Here is where we leverage the sorted property of the array. If the target is less than the middle, then the target must be in the left half of the array. If the target is greater than the middle, then the target must be in the right half of the array. So we can narrow our search to one of these halves, and ignore the other. Luckily we have a function that can search the half, its `binarySearch` :

```js
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx + 1);

    if (target < array[midIdx]) {
        return binarySearch(leftHalf, target);
    } else if (target > array[midIdx]) {
        return binarySearch(rightHalf, target);
    }
    //...some code here
}
```

We know `binarySeach` will return the correct boolean, so we just pass that result up by returning it ourselves. However, something is lacking in our code. It is only possible to get a false from the literal `return false` line, but there is no `return true` . Looking at our conditionals, we handle the cases where the target is less than middle or the target is greater than the middle, but what if the product is **equal** to the middle? If the target is equal to the middle, then we found the target and should `return true` ! This is easy to add with an `else` :

```js
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx + 1);

    if (target < array[midIdx]) {
        return binarySearch(leftHalf, target);
    } else if (target > array[midIdx]) {
        return binarySearch(rightHalf, target);
    } else {
        return true;
    }
}
```

To wrap up, we have confidence of our base case will eventually be hit because we are continually halving the array. We halve the array until it's length is 0 or we actually find the target.

### Binary Search JS Implementation

Here is the code again for your quick reference:

```js
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx + 1);

    if (target < array[midIdx]) {
        return binarySearch(leftHalf, target);
    } else if (target > array[midIdx]) {
        return binarySearch(rightHalf, target);
    } else {
        return true;
    }
}
```

## Time and Space Complexity Analysis

The complexity analysis of this algorithm is easier to explain through visuals, so we **highly encourage** you to watch the lecture that accompanies this reading. In any case, here is a summary of the complexity:

### Time Complexity: O(log(n))

-   `n` is the length of the input array
-   We have no loops, so we must only consider the number of recursive calls it takes to hit the base case
-   The number of recursive calls is the number of times we must halve the array until it's length becomes 0. This number can be described by `log(n)`
    -   for example, say we had an array of 8 elements, `n = 8`
    -   the length would halve as `8 -> 4 -> 2 -> 1`
    -   it takes 3 calls, `log(8) = 3`

### Space Complexity: O(n)

Our implementation uses `n` space due to half arrays we create using slice. Note that JavaScript `slice` creates a new array, so it requires additional memory to be allocated.

### When should we use Binary Search?

Use this algorithm when the input data is sorted!!! This is a heavy requirement, but if you have it, you'll have an insanely fast algorithm.

---

### End of Binary Search

---

---

# Memoization

---

## Dynamic Programming

**Dynamic Programming** is a design pattern used to solve a large problem by dividing it into smaller subproblems that are more manageable. Dynamic Programming will solve the subproblems efficiently, meaning that we avoid duplicate calculations and only "solve" each subproblem once by storing subsolutions in some additional data structure. We cannot always apply Dynamic Programming to a problem. Problems that can be solved with Dynamic Programming must have a sense of repetitive subproblems that overlap.

Here's an example of a problem that has such a structure:

    // Using pennies, nickels, dimes, and quarters,
    // what is the smallest combination of coins that
    // total 27 cents?

We'll explore this exact problem in depth later on. For now, here is some food for thought. Along the way to calculating the smallest coin combination of 27 cents, we should also calculate the smallest coin combination of say, 25 cents as a component of that problem. This is the essence of an overlapping subproblem structure.

There are two strategies we can use to implement Dynamic Programming: _Memoization_ and _Tabulation_. Let's explore Memoization first!

### Memoization

Let's first implement Dynamic Programming through _memoization_. In particular, we'll apply the memoization technique to recursive code. The underlying idea of memoization is this: every time we call a function with a particular argument, we expect to get the same result every time. Memoization allows us to store the result of a function in an object so it can be recalled later on. There are two features that comprise Memoization:

-   the function is recursive
-   the additional data structure used is typically an object (we refer to this as the memo!)

### Memoizing Factorial (kind of)

Let's begin by memoizing our previous `factorial` recursive function. As it is, our `factorial` is pretty fast with a `O(n)` runtime. This is because we simply subtract `1` from `n` for every recursive call until `n` reaches `0` . This is feasibly the fastest we could ever do, but we'll memoize it nonetheless to explore the mechanics of memoization:

```js
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

factorial(6); // => 720, requires 6 calls
factorial(6); // => 720, requires 6 calls
factorial(5); // => 120, requires 5 calls
factorial(7); // => 5040, requires 7 calls
```

From our plain `factorial` above, it is clear that every time we call `factorial(6)` we should get the same result of `720` each time. The code is somewhat inefficient because we must go down the full recursive stack for each top level call to `factorial(6)` . It would be great if we could store the result of `factorial(6)` the first time we calculate it, then on subsequent calls to `factorial(6)` we simply fetch the stored result in constant time. We can accomplish exactly this by memoizing with an object! We'll refactor the code later, but for now:

    let memo = {}

```js
function factorial(n) {
    // if we have calculated factorial(n) previously, fetch the stored result in memo
    if (n in memo) return memo[n];
    if (n === 1) return 1;

    // otherwise, we have not calculated factorial(n) previously, so calculate it now,
    // but store the result in case we need it again in the future
    memo[n] = n * factorial(n - 1);
    return memo[n];
}
```

```js
factorial(6); // => 720, requires 6 calls
factorial(6); // => 720, requires 1 call
factorial(5); // => 120, requires 1 call
factorial(7); // => 5040, requires 2 calls

memo; // => { '2': 2, '3': 6, '4': 24, '5': 120, '6': 720, '7': 5040 }
```

The `memo` object above will map an argument of `factorial` to it's return value. That is, the keys will be arguments and their values will be the corresponding results returned. By using the memo, we are able to avoid duplicate recursive calls! Here's some food for thought: By the time our first call to `factorial(6)` returns, we will not have just the arg `6` stored in the memo. Rather, we will have _all_ args 2 to 6 stored in the memo.

Hopefully you sense the efficiency we can get by memoizing our functions, but maybe you are not convinced by the last example for two reasons:

-   We didn't improve the speed of the algorithm by an order of Big-O (it is still O(n)).
-   The code uses some global variable, so it's kind of ugly.

Both of those points are true, so let's take a look at a more advanced but also practical example that benefits from memoization.

### Memoizing Fib (actually)

Let's begin with our previous `fib` implementation that calculates the n-th number in the fibonacci sequence:

```js
function fib(n) {
    if (n === 1 || n === 2) return 1;
    return fib(n - 1) + fib(n - 2);
}
```

    fib(6);     // => 8

Before we optimize this, let's ask what complexity class it falls into in the first place. Hmm, the time complexity of this function is not super intuitive to describe because the code branches twice recursively. Fret not! You'll find it useful to visualize a _tree_ when reasoning about the time complexity for recursive functions. Every node of the tree represents a call of the recursion:

![fib_tree](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/memoization/images/fib_tree.png)

In general, the height of this tree will be `n` . We derive this by following the path going straight down the left side of the tree. We can also see that each internal node leads to two more nodes. Overall, this means our tree will have roughly 2n nodes which is the same as saying our `fib` function has an exponential time complexity of 2n. That is very slow! See for yourself, try running `fib(50)` - you'll be waiting for quite a while (it took 3 minutes on our machine).

Okay. So our `fib` is slow, but is there anyway to speed it up? Take a look at the tree above. Can you find any repetitive regions of the tree? We'll highlight a few:

![fib_tree_duplicates](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/memoization/images/fib_tree_duplicates.png)

As the `n` grows bigger, the number of duplicate subtrees grows exponentially. Luckily we can fix this using memoization. We'll use a similar object strategy as before, but we'll indulge in some JavaScript default arguments to clean things up:

```js
function fastFib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n === 1 || n === 2) return 1;

    memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
    return memo[n];
}
```

    fastFib(6);     // => 8
    fastFib(50);    // => 12586269025

The code above can calculate the 50th fibonacci number almost instantly! Thanks to our memo, we only need to explore a subtree fully once. Visually, our `fastFib` recursion has this structure:

![fib_memoized](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/memoization/images/fib_memoized.png)

We marked nodes (function calls) that access the memo in green. It's easy to see that we will do far less computations as `n` grows larger! In fact, we have brought the time complexity down to linear `O(n)` time because the tree only branches on the left side. This is an enormous gain if you recall the complexity class hierarchy.

### The Memoization Formula

Now that we have memoization under our belts, when should we apply it? Memoization is useful when attacking recursive problems that have many overlapping subproblems. You'll find it most useful to draw out the visual tree first. If you notice duplicate subtrees, time to memoize. Here are the hard and fast rules you can use to memoize a slow function:

1.  Write the unoptimized, brute force recursion and make sure it works.
2.  Add the memo object as an additional arg to the function. The keys will represent unique arguments to the function, and their values will represent the results for those arguments.
3.  Add a base case condition to the function that returns the stored value if the function's arg is in the memo.
4.  Before you return the result of the recursive case, store it in the memo as a value and make the function's arg it's key.

---

### end-of-memoization

---

---

# tabulation

---

## Tabulation

Now that we are familiar with Memoization, let's explore another Dynamic Programming strategy: Tabulation. In case you forgot, Memoization and Tabulation are two distinct Dynamic Programming strategies. That being said, our goal for Tabulation is still to solve large problems efficiently by breaking them down into many subproblems. There are two main features that comprise the Tabulation strategy:

-   the function is iterative and _not_ recursive
-   the additional data structure used is typically an array (we refer to this as the table!)

Many problems that can be solved with Memoization can also be solved with Tabulation, so let's begin by attacking a familar problem with a fresh set of eyes. Don't worry, we'll also work on some brand new problems in the upcoming project.

### Tabulating Fib

Tabulation is all about creating a table (array) and filling it out with elements. In general, we will complete the table by filling entries from left to right. This means that the first entry of our table (first element of the array) will correspond to the smallest subproblem. Naturally, the final entry of our table (last element of the array) will correspond to the largest problem, which is also our final answer.

Let's tabulate `fib` . As always, we want `fib(n)` to return the n-th number of the Fibonacci sequence:

```js
// fib(0);      // => 0
// fib(1);      // => 1
// fib(2);      // => 1
// fib(6);      // => 8
// fib(7);      // => 13
```

Let's jump straight into the code:

```js
function tabulatedFib(n) {
    // create a blank array of length `n`

    let table = new Array(n);

    // seed the first two values
    table[0] = 0;
    table[1] = 1;

    // complete the table by moving from left to right,
    // following the fibonacci pattern
    for (let i = 2; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }

    return table[n];
}
```

    console.log(tabulatedFib(7));      // => 13

Visually, we initialized the table with the following structure:

| i          | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
| `table[i]` | `0` | `1` |     |     |     |     |     |     |

After our loop finishes, the final table will be:

| i          | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7    |
| ---------- | --- | --- | --- | --- | --- | --- | --- | ---- |
| `table[i]` | `0` | `1` | `1` | `2` | `3` | `5` | `8` | `13` |

Similar to our previous `memo` , by the time our function completes, our `table` will contain our final solution as well as all subsolutions calculated along the way.

#### Complexity Analysis

The analysis of our `tabulatedFib` is very straightforward, since the code is iterative. The dominant operation in the function is the loop used to fill out the entire table. The length of the table is roughly `n` elements long, so our algorithm will have an _O(n)_ runtime. The space taken by our algorithm is also _O(n)_ due to the size of the table. Overall, we should be satisfied with the effiency of our algorithm.

### Aside: Refactoring for O(1) Space

You may notice that we can cut down on the space used by our function. At any point of our loop we really only need the previous two subproblems, so there is little utility to storing the full array. This refactor is easy to do by using two variables:

```js
function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    let secondLast = 0;
    let last = 1;

    for (let i = 2; i <= n; i++) {
        let temp = last;
        last = last + secondLast;
        secondLast = temp;
    }

    return last;
}
```

Bam! We now have O(n) runtime and O(1) space. This is the most optimal algorithm for calculating `fib` . Note that this strategy is not quite Tabulation, since there is no table array being used. However, this still falls under the overarching category of Dynamic Programming since we saved previous subproblem results in order to calculate the final answer. There's no fancy name for this strategy; it's just amazing.

### The Tabulation Formula

Here are our general guidelines for implementing a Tabulation strategy. Bear in mind that Dynamic Programming (whether it be by Tabulation or Memoization) is only applicable to problems that can be divided into many subproblems of similar structure. This is just a _general_ recipe so adjust for taste depending on your problem:

1.  Create the table array based off of the size of the input
    -   this isn't always straightforward if you have multiple args
2.  Initialize some values in the table that "answer" the trivially small subproblem
    -   usually this means initializing the first entry of the table
3.  Iterate through the array and fill in remaining entries
    -   calculating the next entry should require using other entries of the table
4.  Your final answer is the last entry in the table (usually)

---

### End of Tabulation

---

---

# Linked-Lists

---

## What is a Linked List?

A Linked List data structure represents a linear sequence of "vertices" (or "nodes"), and tracks three important properties.

**Linked List Properties:**

| Property | Description                                         |
| -------- | --------------------------------------------------- |
| `head`   | The first node in the list.                         |
| `tail`   | The last node in the list.                          |
| `length` | The number of nodes in the list; the list's length. |

The data being tracked by a particular Linked List does not live inside the Linked List instance itself. Instead, each vertex is actually an instance of an even simpler, smaller data structure, often referred to as a "Node".

Depending on the type of Linked List (there are many), Node instances track some very important properties as well.

**Linked List Node Properties:**

| Property   | Description                                            |
| ---------- | ------------------------------------------------------ |
| `value`    | The actual value this node represents.                 |
| `next`     | The next node in the list (relative to this node).     |
| `previous` | The previous node in the list (relative to this node). |

**NOTE:** The `previous` property is for Doubly Linked Lists only!

Linked Lists contain _ordered_ data, just like arrays. The first node in the list is, indeed, first. From the perspective of the very first node in the list, the _next_ node is the second node. From the perspective of the second node in the list, the _previous_ node is the first node, and the _next_ node is the third node. And so it goes.

#### _"So...this sounds a lot like an Array..."_

Admittedly, this does _sound_ a lot like an Array so far, and that's because Arrays and Linked Lists are both implementations of the List ADT. However, there is an incredibly important distinction to be made between Arrays and Linked Lists, and that is how they _physically store_ their data. (As opposed to how they _represent_ the order of their data.)

Recall that Arrays contain _contiguous_ data. Each element of an array is actually stored _next to_ it's neighboring element _in the actual hardware of your machine_, in a single continuous block in memory.

![Array in Memory](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/linked_lists/images/array-in-memory.png)

_An Array's contiguous data being stored in a continuous block of addresses in memory._

Unlike Arrays, Linked Lists contain _non-contiguous_ data. Though Linked Lists _represent_ data that is ordered linearly, that mental model is just that - an interpretation of the _representation_ of information, not reality.

In reality, in the actual hardware of your machine, whether it be in disk or in memory, a Linked List's Nodes are not stored in a single continuous block of addresses. Rather, Linked List Nodes live at randomly distributed addresses throughout your machine! The only reason we know which node comes next in the list is because we've assigned its reference to the current node's `next` pointer.

![Array in Memory](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/linked_lists/images/SLL-diagram.png)

_A Singly Linked List's non-contiguous data (Nodes) being stored at randomly distributed addresses in memory._

For this reason, Linked List Nodes have _no indices_, and no _random access_. Without random access, we do not have the ability to look up an individual Linked List Node in constant time. Instead, to find a particular Node, we have to start at the very first Node and iterate through the Linked List one node at a time, checking each Node's _next_ Node until we find the one we're interested in.

So when implementing a Linked List, we actually must implement both the Linked List class _and_ the Node class. Since the actual data lives in the Nodes, it's simpler to implement the Node class first.

## Types of Linked Lists

There are four flavors of Linked List you should be familiar with when walking into your job interviews.

**Linked List Types:**

| List Type | Description | Directionality |
| --- | --- | --- |
| Singly Linked | Nodes have a single pointer connecting them in a single direction. | Head→Tail |
| Doubly Linked | Nodes have two pointers connecting them bi-directionally. | Head⇄Tail |
| Mulitply Linked | Nodes have two or more pointers, providing a variety of potential node orderings. | Head⇄Tail, A→Z, Jan→Dec, etc. |
| Circularly Linked | Final node's `next` pointer points to the first node, creating a non-linear, circular version of a Linked List. | Head→Tail→Head→Tail |

**NOTE:** These Linked List types are not always mutually exclusive.

For instance:

-   Any type of Linked List can be implemented Circularly (e.g. A Circular Doubly Linked List).
-   A Doubly Linked List is actually just a special case of a Mulitply Linked List.
-   Etc.

You are most likely to encounter Singly and Doubly Linked Lists in your upcoming job search, so we are going to focus exlusively on those two moving forward. However, in more senior level interviews, it is very valuable to have some familiarity with the other types of Linked Lists. Though you may not actually code them out, _you will win extra points by illustrating your ability to weigh the tradeoffs of your technical decisions_ by discussing how your choice of Linked List type may affect the efficiency of the solutions you propose.

## Linked List Methods

Linked Lists are great foundation builders when learning about data structures because they share a number of similar methods (and edge cases) with many other common data structures. You will find that many of the concepts discussed here will repeat themselves as we dive into some of the more complex non-linear data structures later on, like Trees and Graphs.

In the project that follows, we will implement the following Linked List methods:

| Type | Name | Description | Returns |
| --- | --- | --- | --- |
| Insertion | `addToTail` | Adds a new node to the tail of the Linked List. | Updated Linked List |
| Insertion | `addToHead` | Adds a new node to the head of the Linked List. | Updated Linked List |
| Insertion | `insertAt` | Inserts a new node at the "index", or position, specified. | Boolean |
| Deletion | `removeTail` | Removes the node at the tail of the Linked List. | Removed node |
| Deletion | `removeHead` | Removes the node at the head of the Linked List. | Removed node |
| Deletion | `removeFrom` | Removes the node at the "index", or position, specified. | Removed node |
| Search | `contains` | Searches the Linked List for a node with the value specified. | Boolean |
| Access | `get` | Gets the node at the "index", or position, specified. | Node at index |
| Access | `set` | Updates the value of a node at the "index", or position, specified. | Boolean |
| Meta | `size` | Returns the current size of the Linked List. | Integer |

## Time and Space Complexity Analysis

Before we begin our analysis, here is a quick summary of the Time and Space constraints of each Linked List Operation. The complexities below apply to both Singly and Doubly Linked Lists:

| Data Structure Operation | Time Complexity (Avg) | Time Complexity (Worst) | Space Complexity (Worst) |
| --- | --- | --- | --- |
| Access | `Θ(n)` | `O(n)` | `O(n)` |
| Search | `Θ(n)` | `O(n)` | `O(n)` |
| Insertion | `Θ(1)` | `O(1)` | `O(n)` |
| Deletion | `Θ(1)` | `O(1)` | `O(n)` |

Before moving forward, see if you can reason to yourself why each operation has the time and space complexity listed above!

## Time Complexity - Access and Search:

### Scenarios:

1.  We have a Linked List, and we'd like to find the 8th item in the list.
2.  We have a Linked List of sorted alphabet letters, and we'd like to see if the letter "Q" is inside that list.

### Discussion:

Unlike Arrays, Linked Lists Nodes are not stored contiguously in memory, and thereby do not have an indexed set of memory addresses at which we can quickly lookup individual nodes in constant time. Instead, we must begin at the head of the list (or possibly at the tail, if we have a Doubly Linked List), and iterate through the list until we arrive at the node of interest.

In Scenario 1, we'll know we're there because we've iterated 8 times. In Scenario 2, we'll know we're there because, while iterating, we've checked each node's value and found one that matches our target value, "Q".

In the worst case scenario, we may have to traverse the entire Linked List until we arrive at the final node. This makes both Access & Search **Linear Time** operations.

## Time Complexity - Insertion and Deletion:

### Scenarios:

1.  We have an empty Linked List, and we'd like to insert our first node.
2.  We have a Linked List, and we'd like to insert or delete a node at the Head or Tail.
3.  We have a Linked List, and we'd like to insert or delete a node from somewhere in the middle of the list.

### Discussion:

Since we have our Linked List Nodes stored in a non-contiguous manner that relies on pointers to keep track of where the next and previous nodes live, Linked Lists liberate us from the linear time nature of Array insertions and deletions. We no longer have to adjust the position at which each node/element is stored after making an insertion at a particular position in the list. Instead, if we want to insert a new node at position `i` , we can simply:

1.  Create a new node.
2.  Set the new node's `next` and `previous` pointers to the nodes that live at postions `i` and `i - 1`, respectively.
3.  Adjust the `next` pointer of the node that lives at position `i - 1` to point to the new node.
4.  Adjust the `previous` pointer of the node that lives at position `i` to point to the new node.

And we're done, in Constant Time. No iterating across the entire list necessary.

"But hold on one second, " you may be thinking. "In order to insert a new node in the middle of the list, don't we have to lookup its position? Doesn't that take linear time?!"

Yes, it is tempting to call insertion or deletion in the middle of a Linked List a linear time operation since there is lookup involved. However, it's usually the case that you'll already have a reference to the node where your desired insertion or deletion will occur.

For this reason, we separate the Access time complexity from the Insertion/Deletion time complexity, and formally state that Insertion and Deletion in a Linked List are **Constant Time** across the board.

### NOTE:

Without a reference to the node at which an insertion or deletion will occur, due to linear time lookup, an insertion or deletion _in the middle_ of a Linked List will still take Linear Time, sum total.

## Space Complexity:

### Scenarios:

1.  We're given a Linked List, and need to operate on it.
2.  We've decided to create a new Linked List as part of strategy to solve some problem.

### Discussion:

It's obvious that Linked Lists have one node for every one item in the list, and for that reason we know that Linked Lists take up Linear Space in memory. However, when asked in an interview setting what the Space Complexity _of your solution_ to a problem is, it's important to recognize the difference between the two scenarios above.

In Scenario 1, we _are not_ creating a new Linked List. We simply need to operate on the one given. Since we are not storing a _new_ node for every node represented in the Linked List we are provided, our solution is _not necessarily_ linear in space.

In Scenario 2, we _are_ creating a new Linked List. If the number of nodes we create is linearly correlated to the size of our input data, we are now operating in Linear Space.

### NOTE:

Linked Lists can be traversed both iteratively and recursively. _If you choose to traverse a Linked List recursively_, there will be a recursive function call added to the call stack for every node in the Linked List. Even if you're provided the Linked List, as in Scenario 1, you will still use Linear Space in the call stack, and that counts.

---

### End of Linked-List

---

---

# Stacks And Queue's

---

Stacks and Queues aren't really "data structures" by the strict definition of the term. The more appropriate terminology would be to call them abstract data types (ADTs), meaning that their definitions are more conceptual and related to the rules governing their user-facing behaviors rather than their core implementations.

For the sake of simplicity, we'll refer to them as data structures and ADTs interchangeably throughout the course, but the distinction is an important one to be familiar with as you level up as an engineer.

Now that that's out of the way, Stacks and Queues represent a linear collection of nodes or values. In this way, they are quite similar to the Linked List data structure we discussed in the previous section. In fact, you can even use a modified version of a Linked List to implement each of them. (Hint, hint.)

These two ADTs are similar to each other as well, but each obey their own special rule regarding the order with which Nodes can be added and removed from the structure.

Since we've covered Linked Lists in great length, these two data structures will be quick and easy. Let's break them down individually in the next couple of sections.

## What is a Stack?

Stacks are a Last In First Out (LIFO) data structure. The last Node added to a stack is always the first Node to be removed, and as a result, the first Node added is always the last Node removed.

The name Stack actually comes from this characteristic, as it is helpful to visualize the data structure as a vertical stack of items. Personally, I like to think of a Stack as a stack of plates, or a stack of sheets of paper. This seems to make them more approachable, because the analogy relates to something in our everyday lives.

If you can imagine adding items to, or removing items from, a Stack of...literally anything...you'll realize that every (sane) person naturally obeys the LIFO rule.

We add things to the _top_ of a stack. We remove things from the _top_ of a stack. We never add things to, or remove things from, the _bottom_ of the stack. That's just crazy.

Note: We can use JavaScript Arrays to implement a basic stack. `Array#push` adds to the top of the stack and `Array#pop` will remove from the top of the stack. In the exercise that follows, we'll build our own Stack class from scratch (without using any arrays). In an interview setting, your evaluator may be okay with you using an array as a stack.

## What is a Queue?

Queues are a First In First Out (FIFO) data structure. The first Node added to the queue is always the first Node to be removed.

The name Queue comes from this characteristic, as it is helpful to visualize this data structure as a horizontal line of items with a beginning and an end. Personally, I like to think of a Queue as the line one waits on for an amusement park, at a grocery store checkout, or to see the teller at a bank.

If you can imagine a queue of humans waiting...again, for literally anything...you'll realize that _most_ people (the civil ones) naturally obey the FIFO rule.

People add themselves to the _back_ of a queue, wait their turn in line, and make their way toward the _front_. People exit from the _front_ of a queue, but only when they have made their way to being first in line.

We never add ourselves to the front of a queue (unless there is no one else in line), otherwise we would be "cutting" the line, and other humans don't seem to appreciate that.

Note: We can use JavaScript Arrays to implement a basic queue. `Array#push` adds to the back (enqueue) and `Array#shift` will remove from the front (dequeue). In the exercise that follows, we'll build our own Queue class from scratch (without using any arrays). In an interview setting, your evaluator may be okay with you using an array as a queue.

## Stack and Queue Properties

Stacks and Queues are so similar in composition that we can discuss their properties together. They track the following three properties:

**Stack Properties | Queue Properties:**

| Stack Property | Description | Queue Property | Description |
| --- | --- | --- | --- |
| `top` | The first node in the Stack | `front` | The first node in the Queue |
| `bottom` | The last node in the Stack. (Optional) | `back` | The last node in the Queue. |
| `length` | The number of nodes in the Stack; the Stack's length. | `length` | The number of nodes in the Queue; the Queue's length. |

Notice that rather than having a `head` and a `tail` like Linked Lists, Stacks have a `top` and a `bottom` , and Queues have a `front` and a `back` instead. These properties are essentially the same; pointers to the end points of the respective List ADT where important actions way take place. The differences in naming conventions are strictly for human comprehension.

---

Similarly to Linked Lists, the values stored inside a Stack or a Queue are actually contained within Stack Node and Queue Node instances. Stack, Queue, and Singly Linked List Nodes are all identical, but just as a reminder and for the sake of completion, these List Nodes track the following two properties:

**Stack & Queue Node Properties:**

| Property | Description                                         |
| -------- | --------------------------------------------------- |
| `value`  | The actual value this node represents.              |
| `next`   | The next node in the Stack (relative to this node). |

## Stack Methods

In the exercise that follows, we will implement a Stack data structure along with the following Stack methods:

| Type | Name | Description | Returns |
| --- | --- | --- | --- |
| Insertion | `push` | Adds a Node to the top of the Stack. | Integer - New size of stack |
| Deletion | `pop` | Removes a Node from the top of the Stack. | Node removed from top of Stack |
| Meta | `size` | Returns the current size of the Stack. | Integer |

## Stack JavaScript Implementation

The following code is the preferred implementation of a `Stack` ADT:

```js
class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    push(val) {
        const newNode = new Node(val);
        if (!this.top) {
            this.top = newNode;
            this.bottom = newNode;
        } else {
            const temp = this.top;
            this.top = newNode;
            this.top.next = temp;
        }
        return ++this.length;
    }

    pop() {
        if (!this.top) {
            return null;
        }
        const temp = this.top;
        if (this.top === this.bottom) {
            this.bottom = null;
        }
        this.top = this.top.next;
        this.length--;
        return temp.value;
    }

    size() {
        return this.length;
    }
}
```

## Queue Methods

In the exercise that follows, we will implement a Queue data structure along with the following Queue methods:

| Type | Name | Description | Returns |
| --- | --- | --- | --- |
| Insertion | `enqueue` | Adds a Node to the front of the Queue. | Integer - New size of Queue |
| Deletion | `dequeue` | Removes a Node from the front of the Queue. | Node removed from front of Queue |
| Meta | `size` | Returns the current size of the Queue. | Integer |

## Queue JavaScript Implementation

The following code is the preferred implementation of a `Queue` ADT:

```js
class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.front = null;
        this.back = null;
        this.length = 0;
    }

    enqueue(val) {
        const newNode = new Node(val);
        if (!this.front) {
            this.front = newNode;
            this.back = newNode;
        } else {
            this.back.next = newNode;
            this.back = newNode;
        }
        return ++this.length;
    }

    dequeue() {
        if (!this.front) {
            return null;
        }
        const temp = this.front;
        if (this.front === this.back) {
            this.back = null;
        }
        this.front = this.front.next;
        this.length--;
        return temp.value;
    }

    size() {
        return this.length;
    }
}
```

## Time and Space Complexity Analysis

Before we begin our analysis, here is a quick summary of the Time and Space constraints of each Stack Operation.

| Data Structure Operation | Time Complexity (Avg) | Time Complexity (Worst) | Space Complexity (Worst) |
| --- | --- | --- | --- |
| Access | `Θ(n)` | `O(n)` | `O(n)` |
| Search | `Θ(n)` | `O(n)` | `O(n)` |
| Insertion | `Θ(1)` | `O(1)` | `O(n)` |
| Deletion | `Θ(1)` | `O(1)` | `O(n)` |

Before moving forward, see if you can reason to yourself why each operation has the time and space complexity listed above!

#### Time Complexity - Access and Search:

When the Stack ADT was first conceived, its inventor definitely did not prioritize searching and accessing individual Nodes or values in the list. The same idea applies for the Queue ADT. There are certainly better data structures for speedy search and lookup, and if these operations are a priority for your use case, it would be best to choose something else!

Search and Access are both linear time operations for Stacks and Queues, and that shouldn't be too unclear. Both ADTs are nearly identical to Linked Lists in this way. The only way to find a Node somewhere in the middle of a Stack or a Queue, is to start at the `top` (or the `back` ) and traverse downward (or forward) toward the `bottom` (or `front` ) one node at a time via each Node's `next` property.

This is a linear time operation, O(n).

#### Time Complexity - Insertion and Deletion:

For Stacks and Queues, insertion and deletion is what it's all about. If there is one feature a Stack absolutely must have, it's constant time insertion and removal to and from the `top` of the Stack (FIFO). The same applies for Queues, but with insertion occuring at the `back` and removal occuring at the `front` (LIFO).

Think about it. When you add a plate to the top of a stack of plates, do you have to iterate through all of the other plates first to do so? Of course not. You simply add your plate to the top of the stack, and that's that. The concept is the same for removal.

Therefore, Stacks and Queues have constant time Insertion and Deletion via their `push` and `pop` or `enqueue` and `dequeue` methods, O(1).

#### Space Complexity:

The space complexity of Stacks and Queues is very simple. Whether we are instantiating a new instance of a Stack or Queue to store a set of data, or we are using a Stack or Queue as part of a strategy to solve some problem, Stacks and Queues always store one Node for each value they receive as input.

For this reason, we always consider Stacks and Queues to have a linear space complexity, O(n).

## When should we use Stacks and Queues?

At this point, we've done a lot of work understanding the ins and outs of Stacks and Queues, but we still haven't really discussed what we can use them for. The answer is actually...a lot!

For one, Stacks and Queues can be used as intermediate data structures while implementing some of the more complicated data structures and methods we'll see in some of our upcoming sections.

For example, the implementation of the breadth-first Tree traversal algorithm takes advantage of a Queue instance, and the depth-first Graph traveral algorithm exploits the benefits of a Stack instance.

Additionally, Stacks and Queues serve as the essential underlying data structures to a wide variety of applications you use all the time. Just to name a few:

#### Stacks:

-   The Call Stack is a Stack data structure, and is used to manage the order of function invocations in your code.
-   Browser History is often implemented using a Stack, with one great example being the browser history object in the very popular React Router module.
-   Undo/Redo functionality in just about any application. For example:
    -   When you're coding in your text editor, each of the actions you take on your keyboard are recorded by `push`ing that event to a Stack.
    -   When you hit cmd + z to undo your most recent action, that event is `pop`ed off the Stack, because the last event that occured should be the first one to be undone (LIFO).
    -   When you hit cmd + y to redo your most recent action, that event is `push`ed back onto the Stack.

#### Queues:

-   Printers use a Queue to manage incoming jobs to ensure that documents are printed in the order they are received.
-   Chat rooms, online video games, and customer service phone lines use a Queue to ensure that patrons are served in the order they arrive.
    -   In the case of a Chat Room, to be admitted to a size-limited room.
    -   In the case of an Online Multi-Player Game, players wait in a lobby until there is enough space and it is their turn to be admitted to a game.
    -   In the case of a Customer Service Phone Line...you get the point.
-   As a more advanced use case, Queues are often used as components or services in the system design of a service-oriented architecture. A very popular and easy to use example of this is Amazon's Simple Queue Service (SQS), which is a part of their Amazon Web Services (AWS) offering.
    -   You would add this service to your system between two other services, one that is sending information for processing, and one that is receiving information to be processed, when the volume of incoming requests is high and the integrity of the order with which those requests are processed must be maintained.

---

### End of Stacks And Queue's

---

---

# Binary-Trees

---

Binary Trees are perhaps the most pervasive data structure in computer science. Let's take a moment to go over the basic characteristics of a Binary Tree before we explore algorithms that utilize this structure.

### What is a Graph?

Before we define what a **Tree** is, we must first understand the definition of a **Graph**. A graph is a collection of **nodes** and any **edges** between those nodes. You've likely seen depictions of graphs before, they usually exist as circles (nodes) and arrows (edges) between those circles. Below are few examples of graphs:

![graphs](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/trees/images/graphs.png)

For now, you can ignore the blue coloring. Notice how the graphs above vary greatly in their structure. A graph is indeed a very broad, overarching category. In fact, linked lists and trees are both considered subclasses of graphs. We'll cover algorithms that operate on a general graph structure later, but for now we want to focus on what graphs are trees and what graphs are not. It's worth mentioning that a single node with no edges (image 1) is considered a graph. The empty graph (a graph with 0 nodes and 0 edges, not pictured :)) is also still a graph. This line of thinking will help us later when we design graph algorithms.

### What is a Tree?

A **Tree** is a **Graph** that does not contain any cycles. A cycle is is defined as a path through edges that begins and ends at the same node. This seems straightforward, but the definition becomes a bit muddled as Mathematicians and Computer Scientists use the term "tree" in slightly different ways. Lets break it down:

-   To a Mathematician, graphs 1, 2, 3, and 4 in the above image are trees.
-   To a Computer Scientist, only graphs 1 , 2, and 3 are trees.

Well, at least both camps agree that graph 5 is most certainly not a tree! This is because of the obvious cycle that spans all three nodes. However, why is there disagreement over graph 4? The reason is this: In computer science, we use to the term "tree" to really refer to a "rooted tree." A "rooted tree" is a "tree" where there exists a special node from which every other node is accessible; we call this special node the "root". Think of the root as ultimate ancestor, the single node that all other nodes inherit from. Above we have colored all roots in blue. Like you'd probably suspect, in this course we'll subscribe to the Computer Scientist's interpretation. That is, we won't consider graph 4 a tree because there is no such root we can label.

You've probably heard the term "root" throughout your software engineering career: root directory, root user, etc.. All of these concepts branch† from the humble tree data structure!

### What is a Binary Tree?

A **Binary Tree** is a **Tree** where nodes have **at most 2 children**. This means graphs 1, 2, and 3 are all Binary Trees. There exist ternary trees (at most 3 children) and n-ary trees (at most n children), but you'll likely encounter binary trees in your job hunt, so we'll focus on them in this course. Based on our final definition for a binary tree, here is some food for thought:

-   an empty graph of 0 nodes and 0 edges is a binary tree
-   a graph of 1 node and 0 edges is a binary tree
-   a linked list is a binary tree

Take a moment to use the definitions we explored to verify that each of the three statements above is true. We bring up these three scenarios in particular because they are the simplest types of Binary Trees. We want to eventually build elegant algorithms and these simple scenarios will fuel our design.

### Representing a Tree with Node Instances

Let's explore a common way to represent binary trees using some object oriented design. A tree is a collection of nodes, so let's implement a `TreeNode` class. We'll use properties of `left` and `right` to reference the children of a `TreeNode` . That is, `left` and `right` will reference other `TreeNode` s:

```js
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

Constructing a tree is a matter of creating the nodes and setting `left` and `right` however we please. For example:

    let a = new TreeNode('a');
    let b = new TreeNode('b');
    let c = new TreeNode('c');
    let d = new TreeNode('d');
    let e = new TreeNode('e');
    let f = new TreeNode('f');

    a.left = b;
    a.right = c;
    b.left = d;
    b.right = e;
    c.right = f;
```

The visual representation of the tree is:

![graph_a](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/trees/images/graph_a.png)

To simplify our diagrams, we'll omit the arrowheads on the edges. Moving forward you can assume that the top node is the root and the direction of edges points downward. In other words, node A is the Root. Node A can access node B through `a.left` , but Node B cannot access Node A.

We now have a data structure we can use to explore Binary Tree algorithms! Creating a tree in this way may be tedious and repetitive, however it allows us to decide exactly what nodes are connected and in what direction. This is will be useful as we account for edge cases in our design.

### Basic Tree Terminology

-   tree - graph with no cycles
-   binary tree - tree where nodes have at most 2 nodes
-   root - the ultimate parent, the single node of a tree that can access every other node through edges; by definition the root will not have a parent
-   internal node - a node that has children
-   leaf - a node that does not have any children
-   path - a series of nodes that can be traveled through edges - for example A, B, E is a path through the above tree

Now that we have the basic definition of a binary tree, let's begin with three short algorithms that print out the values. The algorithms are structurally the same, however they will differ in what order the values are printed. We'll use the following tree as the input when running these algorithms:

![graph_a](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/trees/images/graph_a.png)

## In-Order

Let's begin with the `inOrderPrint` function. All three of our algorithms will be recursive and have the same base case. As always, our base case should cover the scenario where the input is trivially small enough so that we don't need to perform further calculation. Since our "problem" is to print all values in a tree, what is the simplest tree we can be given? The empty tree! A common mistake when designing recursive tree algorithms is to make the base case about the root being a leaf, instead we'll want the basecase to cover the root being empty:

```js
function inOrderPrint(root) {
    if (root === null) return;
    //...some code here
}
```

Note that taking in an entire tree as input is really just a matter of taking in the root node. This is because the root node can access every other node through a path of edges. Our base case says, "if the tree is empty, return since there is nothing to print."

Here is where the meat of the algorithm comes in. Given the root of a tree, the steps for `inOrderPrint` are:

    - print all nodes in the left subtree
    - print root
    - print all nodes in the right subtree

Translating this into code:

````js
    function inOrderPrint(root) {
        if (!root) return;

        inOrderPrint(root.left);
        console.log(root.val);
        inOrderPrint(root.right);
    }

Given our tree, `inOrderPrint` would print the values in the order: `d, b, e, a, c, f`

In-Order has the pattern of left, self, right. This means:

-   a node can only be printed once it's left subtree has been completely printed.
-   a node's right subtree can only be printed once the node itself has been printed.

## Pre-Order

Given the root of a tree, the steps for `preOrderPrint` are:

    - print root
    - print all nodes in the left subtree
    - print all nodes in the right subtree

Translating this into code:
```js
    function preOrderPrint(root) {
        if (!root) return;

        console.log(root.val);
        preOrderPrint(root.left);
        preOrderPrint(root.right);
    }

````

Given our tree, `preOrderPrint` would print the values in the order: `a, b, d, e, c, f`

Pre-Order has the patten of self, left, right. This means:

-   a node must be printed before it's children
-   a node's left subtree must be printed before it's right subtree

## Post-Order

Given the root of a tree, the steps for `postOrderPrint` are:

    - print all nodes in the left subtree
    - print all nodes in the right subtree
    - print root

Translating this into code:

```js
function postOrderPrint(root) {
    if (!root) return;

    postOrderPrint(root.left);
    postOrderPrint(root.right);
    console.log(root.val);
}
```

Given our Tree, `postOrderPrint` would print the values in the order: `d, e, b, f, c, a`

Post-Order has the pattern of left, right, self. This means:

-   a node can only be printed after it's left and right subtrees
-   a node's left subtree is printed before it's right subtree

---

### End of Binary-Trees

---

---

# Binary-Search-Trees

---

### BST Definition

We can also describe a BST using a recursive definition. A **Binary Tree** is a **Binary Search Tree** if:

-   the left subtree contains values less than the root
-   AND the right subtree contains values greater than or equal to the root
-   AND the left subtree is a Binary Search Tree
-   AND the right subtree is a Binary Search Tree

It's worth mentioning that the empty tree (a tree with 0 nodes) is indeed a BST (did someone say base case?).

Here are a few examples of BSTs:

![bsts](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/bsts.png)

Take a moment to verify that the above binary trees are BSTs. Note that image 2 has the sane chain structure as a linked list. This will come into play later.

Below is an example of a binary tree that is **not** a search tree because a left child (35) is greater than it's parent (23):

![not_bst](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/not_bst.png)

### A BST is a Sorted Data Structure

So what's the big deal with BSTs? Well, because of the properties of a BST, we can consider the tree as having an order to the values. That means the values are fully sorted! By looking at the three BST examples above, you are probably not convinced of things being sorted. This is because the ordering is encoded by an inorder traversal. Let's recall our previous `inOrderPrint` function:

```js
function inOrderPrint(root) {
    if (!root) return;

    inOrderPrint(root.left);
    console.log(root.val);
    inOrderPrint(root.right);
}
```

If we run `inOrderPrint` on the three BSTs, we will get the following output:

    BST 1: 42
    BST 2: 4, 5, 6
    BST 3: 1, 5, 7, 10, 16, 16

For each tree, we printed out values in increasing order! A binary search tree contains sorted data; this will come into play when we perform algorithms on this data structure.

### Naive BST Implementation

Let's implement a `BST` class that will maintain the ordered property through any number of insertions into the tree. We are going to avoid manually creating all nodes and explicitly setting `left` s and `right` s, so we don't have to worry about breaking order. We'll use our classic `TreeNode` as a component of `BST` . In addition, we'll need a proper `BST#insert` method that will conduct legal insertions on the tree. Interpret the code below and scroll further to our annotated version when you need clarification:

```js
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(val, root = this.root) {
        if (!this.root) {
            this.root = new TreeNode(val);
            return;
        }

        if (val < root.val) {
            if (!root.left) {
                root.left = new TreeNode(val);
            } else {
                this.insert(val, root.left);
            }
        } else {
            if (!root.right) {
                root.right = new TreeNode(val);
            } else {
                this.insert(val, root.right);
            }
        }
    }
}
```

    // commented naive BST class

```js
    class BST {
        constructor() {
            // initialize the tree to be empty
            this.root = null;
        }

        insert(val, root=this.root) {
            // if the tree is currently empty, then create the node as the 'absolute' root
            if(!this.root) {
                this.root = new TreeNode(val);
                return;
            }

            // otherwise, the tree is not empty, so...
            // if our val to insert is less than the root...
            if (val < root.val) {
                if (!root.left) {                      //...some code hereand the left child does not exist,
                    root.left = new TreeNode(val);      //      then create the node as the left child
                } else {                               //...some code hereand the left child already exists,
                    this.insert(val, root.left);        //      then recursively insert on the left subtree
                }

            // if our val to insert is greater than or equal to the root...
            } else {
                if (!root.right) {                      //  ...and the right child does not exist,
                    root.right = new TreeNode(val);     //      then create the node as the right child
                } else {                                //  ...and the right child already exists,
                    this.insert(val, root.right);       //      then recursively insert on the right subtree
                }
            }
        }
    }

We can call `insert` to build up the `BST` without worrying about breaking the search tree property. Let's build two different trees:

    let tree1 = new BST();
    tree1.insert(10);
    tree1.insert(5);
    tree1.insert(16);
    tree1.insert(1);
    tree1.insert(7);
    tree1.insert(16);

    let tree2 = new BST();
    tree2.insert(1);
    tree2.insert(5);
    tree2.insert(7);
    tree2.insert(10);
    tree2.insert(16);
    tree2.insert(16);
```

The insertions above will yield the following trees:

![good_bad_bst](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/good_bad_bst.png)

Are you cringing at `tree2` ? You should be. Although we have the same values in both trees, they display drastically different structures because of the insertion order we used. This is why we have been referring to our `BST` implementation as **naive**. Both of these trees are Binary Search Trees, however not all BSTs are created equal. A worst case BST degenerates into a linked list. The "best" BSTs are **height balanced**, we'll explore this concept soon

### Implementing Binary Search on a BST

Our goal is to implement a `#search` method on our previous `BST` class that will solve the problem:

    Given a binary search tree and a target value, return a boolean indicating whether or not the target is
    contained in the tree.

In other words, our `BST#search` should satisfy the following behavior:

```js
let tree = new BST();
tree.insert(10);
tree.insert(5);
tree.insert(16);
tree.insert(1);
tree.insert(7);
tree.insert(16);

tree.search(7); // => true
tree.search(16); // => true
tree.search(14); // => false
```

As with many tree problems, this problem lends itself nicely to recursion! Like always, our base case should capture the scenario where the input tree is trivial and we know the answer to the problem without further calculation. If the given tree is empty, then we can be certain that the target is not found in the tree. The logic of our `BST#search` method will be much the same compared to our `binarySearch` function for sorted arrays. Try to interpret the code below and scroll further to the annotated version when you need clarification

    // assuming our BST class from the previous section

```js
class BST {
    //...some code here

    search(val, root = this.root) {
        if (!root) return false;

        if (val < root.val) {
            return this.search(val, root.left);
        } else if (val > root.val) {
            return this.search(val, root.right);
        } else {
            return true;
        }
    }
}

// assuming our BST class from the previous section
class BST {
    //...some code here

    // commented
    search(val, root = this.root) {
        // if the tree is empty, then the target val is not in the tree, so return false
        if (!root) return false;

        // otherwise the tree is not empty, so...
        if (val < root.val) {
            // if the target is less than the root,
            //  then search the left subtree
            return this.search(val, root.left);
        } else if (val > root.val) {
            // if the target is greater than the root,
            //  then search the right subtree
            return this.search(val, root.right);
        } else {
            // otherwise, the target must be equal to the root
            // so return true since we found it!
            return true;
        }
    }
}
```

### Height Balance

Before we analyze the time complexity of `BST#search` , we'll first need to learn about height balance. Recalling what we touched on briefly in our chat on binary trees, **height** is defined as the number of edges between the root and farthest leaf in a tree. Note that height is dictated by the **farthest** leaf (think worst case):

![height](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/height.png)

Following this definition, a tree consisting of a single node has height 0. We consider then an empty tree as having height -1. Height is relevant because not all BSTs are created equal! That is, some BSTs have "good / small" heights, others have "bad / large" heights. Take a look at these two BSTs containing identical values, but very different heights:

![balanced_unbalanced](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/balanced_unbalanced.png)

`Tree 1` is preferred over `Tree 2` , because `Tree 1` is **balanced**. Balanced Binary Trees will be the most efficient to perform operations on.

For a binary tree to be **balanced**:

-   the left and right subtrees must differ in height by at most 1
-   AND the left subtree is balanced
-   AND the right subtree is balanced

Notice that **balanced** has a recursive definition. Like you probably guessed, the empty tree is considered balanced. This will be the base case of our definition.

### Only the Best Trees Have Logs

A balanced binary tree is incredible to have because it's height is guaranteed to be **O(log2(n))**, where n is the number of nodes in the tree. Let's take a look at a few examples:

![log_heights](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/log_heights.png)

To make the approximations above, we rounded the result of each log down to the nearest integer. If you are not convinced of how powerful this is, this means that a balanced tree of 1000 nodes will have a height of just 10.

### Time Complexity Analysis of Binary Search for BSTs

Worst case for the algorithm occurs when the target value is not present in the tree. This means that we must traverse a path from root to a leaf, so we must travel the full **height** of the tree in the worst case. However, like we discussed, the height of a tree can vary wildly. We can have a tree with minimal height (a balanced tree like `Tree 1` ), or we can have a tree with maximal height (a linked list like `Tree 2` ).

-   **O(log(n))** time for a balanced tree:
-   **O(n)** time for unbalanced tree:

### Space Complexity Analysis of Binary Search for BSTs

No additional space is needed for the algorithm, so we have constant **O(1)** space.

To play devil's advocate, what if we count the recursive stack calls as contributing to the space complexity? Some coding challenges in your job hunt may pose this. If that is the case then our recursive implementation above will use:

-   **O(log(n))** space for a balanced tree
-   **O(n)** space for unbalanced tree

---

### End of Binary-Search-Trees

---

Let's add two more tree traversal algorithms to our arsenal. **Depth-First** and **Breadth-First** are two classic traversal strategies that differ in the order nodes are hit. In this reading, our candidate tree will be:

![tree](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/trees/images/graph_a.png)

Like we are accustomed to, we can represent the tree programmatically with:

    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }


    let a = new TreeNode('a');
    let b = new TreeNode('b');
    let c = new TreeNode('c');
    let d = new TreeNode('d');
    let e = new TreeNode('e');
    let f = new TreeNode('f');

    a.left = b;
    a.right = c;
    b.left = d;
    b.right = e;
    c.right = f;

## Depth-First

To help verbalize Depth-First (DF), we'll be using a few familial terms to describe the relative positions of the nodes. Think of the words you would use if viewing a family tree! Here are some examples:

-   `B` and `C` are siblings
-   `D` and `E` are descendants of `B`
-   `B`, `C`, `D`, `E`, `F` are all descendants of `A`

A Depth-First traversal will continually travel deeper into a tree before switching branches. This means that, given a node, we must visit all of it's descendants before visiting it's sibling.

Performing DF on our tree will hit the nodes in the order: `A, B, D, E, C, F`

### Depth-First Implementation

To travel the nodes of a tree according to Depth-First behavior, we'll utilize a **stack.** Recall from earlier that a stack is LIFO (Last In, First Out). Our strategy is to use an array as a stack. We'll use `push` to add to the top of our stack and `pop` to remove the top. Below is a complete implementation of `depthFirst` . Try to interpret the code below and scroll further to see the annotated version:

````js
    function depthFirst(root) {
        let stack = [ root ];
        while (stack.length) {
            let node = stack.pop();
            console.log(node.val);
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
    }
```js
    function depthFirst(root) {
        // initialize the stack with the root node
        let stack = [ root ];

        // continue running the algorithm while there are still nodes on the stack
        while (stack.length) {

            // pop the top node from the stack
            let node = stack.pop();

            // we consider a node visited once we pop it,
            // so we should print the node's value now
            console.log(node.val);

            // add the node's left and right children, if they exist
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);

            // IMPORTANT: do not print out the children yet; they must wait their turn to be popped first
        }
    }

````

You should watch the video lecture that follows this reading for a visual on how a stack inherently gives us DF order. For now, a key idea to take away is that we only consider a node "visited" once we pop it. We do not consider a node "visited" when we push it.

Because a stack naturally leads to DF order on a tree, we can easily write a recursive version. Why is recursion relevant to DF? Recursion utilizies the call **stack**:

```js
function depthFirstRecur(root) {
    if (!root) return;
    console.log(root.val);
    depthFirstRecur(root.left);
    depthFirstRecur(root.right);
}
```

Does this code look familiar? It's identical to the `preOrderPrint` function we wrote previously. That's right, pre-order and depth-first are identical tree node orderings.

You should study both the iterative and recursive implementations as they will both prove valuable to solving problems.

## Breadth-First

This algorithm has nothing to do with bread. The word "breadth" is the same as "width". To help veribalize Breadth-First (BF) we'll need to understand the simple concept of tree **levels**. With the tree at the top of this reading in mind, we can say the following:

-   level 0 contains `A`
-   level 1 contains `B`, `C`
-   level 2 contains `D`, `E`, `F`

A Breadth-First traversal will visit all nodes across a level, before moving to the next level. This means we travel laterally as much as we can before going deeper into the tree.

Perform BF on our tree will hit the nodes in the order: `A, B, C, D, E, F`

### Breadth-First Implementation

While DF uses a stack, BF will use a **queue**. Recall that a queue is FIFO (First In, First Out). The code is very similar to our iterative DF, except we will use an array as a queue. `shift` will remove the front of the queue and `push` will add to the back of the queue. Interpret the implementation below and scroll further to the annotated version when you need more insight:

````js
    function breadthFirst(root) {
        let queue = [ root ];
        while (queue.length) {
            let node = queue.shift();

            console.log(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
```js
    function breadthFirst(root) {
        // initialize the queue with the root node
        let queue = [ root ];

        // continue running the algorithm while there are still nodes on the queue
        while (queue.length) {
            // remove the front node from the queue
            let node = queue.shift();

            // the node we just removed is now "visited", so print it
            console.log(node.val);

            // add the left and right children to the back of the queue, if they exist
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);

            // IMPORTANT: do not print out the children yet; they must wait their turn to exit the front of the queue first
        }
    }

````

We'll rarely run into a recursive BF implementation (probably never) because recursion uses an underlying call stack, but we really want the opposite of a stack (a queue).

---

# Graphs & Graph Traversal

---

## What is a Graph?

A **graph** is **any** collection of nodes and edges. In contrast to our previous trees, a graph is much more relaxed in it's structure. A graph may:

-   lack a root node
-   have cycles
-   have any number edges leaving a node

In this section, we will draw heavily from our tree algorithms. The adjustments we will make to those algorithms will be motivated by these core differences.

Below are a few examples of graphs that don't agree with our CompSci definition of a binary tree:

![graphs](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/graphs/images/graphs.png)

Here are some highlights:

-   `Graph 1` lacks a root. This means there is no single node that can access all other nodes in a path through edges. This is important because we previously referenced "entire" trees by referring to the ultimate root. We can no longer do that in a graph. If we provide just `T`, you can't access `U`. If we provide just `U`, you can't access `T`. If we provide just `V`, you can't access `T` or `U`.
-   `Graph 2` has a cycle. This means there is no longer a parent-child relationship. Choose any node in `Graph 2`, its grandchild will also be its parent. Wait - what? From now on we'll have to use less specific language such as "`X` is a neighbor of `Y`." Perhaps even more deadly, imagine we ran a "simple" Depth-First traversal on this graph. We could get trapped in an infinite loop if we are not careful.
-   `Graph 3` features nodes that have more than 2 edges. Anarchy!

## Graph Implementations

There are many ways to represent a graph programmatically. Let's take a moment to explore each and describe the tradeoffs we make when choosing among them. We will use `Graph 3` from above as our candidate. Bear in mind that our graph is directed. For example, this means that `C` can access `D` , but `D` cannot access `C` .

### GraphNode Class

This implementation is most similar to how we implemented binary trees. That is, we create a node class that maintains a value and an array of references to neighboring nodes. This easily solves the problem that a node can have any number of neighbors, no longer just a left and right.

```js
class GraphNode {
    constructor(val) {
        this.val = val;
        this.neighbors = [];
    }
}

let a = new GraphNode("a");
let b = new GraphNode("b");
let c = new GraphNode("c");
let d = new GraphNode("d");
let e = new GraphNode("e");
let f = new GraphNode("f");
a.neighbors = [b, c, e];
c.neighbors = [b, d];
e.neighbors = [a];
f.neighbors = [e];
```

This implementation is great because it feels familiar to how we implemented trees. However, this implementation is clunky in that we have no easy way to refer to the entire graph. How can we pass this graph to a function? Recall that there is no root to act as the definite starting point.

### Adjacency Matrix

This is the often the mathematician's preferred way of representing a graph. We use a 2D array to represent edges. We'll first map each node's value to an index. This means `A -> 0` , `B -> 1` , `C -> 2` , etc.. Below is the mapping for `Graph 3` :

![adj_matrix_graph](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/graphs/images/adj_matrix_graph.png)

From here, the row index will correspond to the source of an edge and the column index will correspond to its destination. A value of `true` will mean that there does exist an edge from source to destination.

    let matrix = [
    /*          A       B       C       D       E       F   */
    /*A*/    [true,  true,   true,   false,  true,   false],
    /*B*/    [false, true,   false,  false,  false,  false],
    /*C*/    [false, true,   true,   true,   false,  false],
    /*D*/    [false, false,  false,  true,   false,  false],
    /*E*/    [true,  false,  false,  false,  true,   false],
    /*F*/    [false, false,  false,  false,  true,   true]
    ];

A few things to note about using an adjacency matrix:

-   when the edges have direction, `matrix[i][j]` may not be the same as `matrix[j][i]`
-   it is common to say that a node is adjacent to itself, so `matrix[x][x] === true` for any `x`

An advantage of the matrix implementation is that it allows us to refer to the entire graph by simply referring to the 2D array. A huge disadvantage of using a matrix is the space required. To represent a graph of n nodes, we must allocate n2 space for the 2D array. This is even more upsetting when there are few edges in graph. We will have to use n2 space, even though the array would be sparse with only a few `true` elements.

### Adjacency List

An adjacency list seeks to solve the shortcomings of the matrix implementation. We use an object where keys represent the node labels. The values associated with the keys will be an array containing all adjacent nodes:

    let graph = {
        'a': ['b', 'c', 'e'],
        'b': [],
        'c': ['b', 'd'],
        'd': [],
        'e': ['a'],
        'f': ['e']
    };

An adjacency list is easy to implement and allows us to refer to the entire graph by simply referencing the object. The space required for an adjacency list is the number of edges in the graph. Since there will be at most n2 edges in a graph of n nodes, the adjacency list will use at most the same amount of space as the matrix. You'll find adjacency lists useful when attacking problems that are not explicitly about graphs. We'll elaborate more on this soon.

Let's explore our classic Depth-First, but for **graphs** this time! We'll be utilizing the `GraphNode` and `Adjacency List` implementations of the following graph:

![graph](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/graphs/images/graph.png)

Since we already discussed the differences between Depth-First and Breadth-First, we'll focus just on Depth-First here. We'll leave the Breadth-First exploration in the upcoming project.

### Graph Traversal w/ GraphNode

Let's begin by assuming we have our candidate graph implemented using our `GraphNode` class:

```js
class GraphNode {
    constructor(val) {
        this.val = val;
        this.neighbors = [];
    }
}

let a = new GraphNode("a");
let b = new GraphNode("b");
let c = new GraphNode("c");
let d = new GraphNode("d");
let e = new GraphNode("e");
let f = new GraphNode("f");
a.neighbors = [e, c, b];
c.neighbors = [b, d];
e.neighbors = [a];
f.neighbors = [e];
```

One thing we'll have to decide on is what node to begin our traversal. Depending on the structure of the graph, there may not be a suitable starting point. Remember that a graph may not have a "root". However in our candidate, `F` is like a root. It is the only valid choice because it is the only node that may access all other nodes through some path of edges. We admit, the choice of `F` is somewhat contrived and in a practical setting you may not have a nice starting point like this. We'll cover how to overcome this obstacle soon. For now we'll take `F` .

We want to build a recursive `depthFirstRecur` function that accepts a node and performs a Depth-First traversal through the graph. Let's begin with a baseline solution, although it is not yet complete to handle all graphs: // broken

```js
function depthFirstRecur(node) {
    console.log(node.val);

    node.neighbors.forEach((neighbor) => {
        depthFirstRecur(neighbor);
    });
}
```

````

    depthFirstRecur(f);

Can you see where this code goes wrong? It will get caught in an infinite cycle `f, e, a, e, a, e, a, e, ...` ! To fix this, simply store which nodes we have visited already. Whenever we hit a node that has previously been visited, then return early. We'll use JavaScript [Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) to store `visited` because they allow for constant time lookup.

    // using GraphNode representation
```js
    function depthFirstRecur(node, visited=new Set()) {
        // if this node has already been visited, then return early
        if (visited.has(node.val)) return;

        // otherwise it hasn't yet been visited,
        // so print it's val and mark it as visited.
        console.log(node.val);
        visited.add(node.val);

        // then explore each of its neighbors
        node.neighbors.forEach(neighbor => {
            depthFirstRecur(neighbor, visited);
        });
    }

````

    depthFirstRecur(f);

This code works well and will print the values in the order `f, e, a, c, b, d` . Note that this strategy only works if the values are guaranteed to be unique.

If you are averse to recursion (don't be), we can write an iterative version using the same principles:

```js
function depthFirstIter(node) {
    let visited = new Set();
    let stack = [node];

    while (stack.length) {
        let node = stack.pop();

        // if this node has already been visited, then skip this node
        if (visited.has(node.val)) continue;

        // otherwise it hasn't yet been visited,
        // so print it's val and mark it as visited.
        console.log(node.val);
        visited.add(node.val);

        // then add its neighbors to the stack to be explored
        stack.push(...node.neighbors);
    }
}
```

    depthFirstIter(f);

### Graph Traversal w/ Adjacency List

Let's now assume our candidate graph in the form of an Adjacency List:
```js
    let graph = {
        'a': ['b', 'c', 'e'],
        'b': [],
        'c': ['b', 'd'],
        'd': [],
        'e': ['a'],
        'f': ['e']
    };
```
Bear in mind that the nodes are just strings now, not `GraphNode` s. Other than that, the code shares many details from our previous implementations:

    // using Adjacency List representation

```js
function depthFirstRecur(node, graph, visited = new Set()) {
    if (visited.has(node)) return;

    console.log(node);
    visited.add(node);

    graph[node].forEach((neighbor) => {
        depthFirstRecur(neighbor, graph, visited);
    });
}
```

    depthFirstRecur('f', graph);

Cool! We print values in the order `f, e, a, b, c, d` . We'll leave the iterative version to you as an exercise for later.

Instead, let's draw our attention to a point from before: having to choose `f` as the starting point isn't dynamic enough to be impressive. Also, if we choose a poor initial node, some nodes may be unreachable. For example, choosing `a` as the starting point with a call to `depthFirstRecur('a', graph)` will only print `a, b, c, d, e` . We missed out on `f` . Bummer.

We can fix this. A big advantage of using an Adjacency List is that it contains the full graph! We can use a surrounding loop to allow our traversal to jump between disconnected regions of the graph. Refactoring our code:

````js
    function depthFirst(graph) {
        let visited = new Set();

        for (let node in graph) {
            _depthFirstRecur(node, graph, visited);
        }
    }
```js
    function _depthFirstRecur(node, graph, visited) {
        if (visited.has(node)) return;

        console.log(node);
        visited.add(node);

        graph[node].forEach(neighbor => {
            _depthFirstRecur(neighbor, graph, visited);
        });
    }

````

    depthFirst(graph);

Notice that our main function `depthFirst` is iterative and accepts the entire Adjacency List as an arg. Our helper `_depthFirstRecur` is recursive. `_depthFirstRecur` serves the same job as before, it will explore a full connected region in a graph. The main `depthFirst` method will allow us to "bridge" the gap between connection regions.

Still fuzzy? Imagine we had the following graph. Before you ask, these are not two separate graphs. This is a **single** graph that contains two connected components. Another term for a graph of this structure is a "Forest" because it contains multiple "Trees", ha:

![forest](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/graphs/images/forest.png)

It is easy to represent this graph using an Adjacency List. We can then pass the graph into our `depthFirst` from above:

    let graph = {
        'h': ['i', 'j'],
        'i': [],
        'j': ['k'],
        'k': [],
        'l': ['m'],
        'm': []
    }

```

    depthFirst(graph);
    // prints h, i, j, k, l, m

Here's the description for how `depthFirst` operates above. We enter `depthFirst` and the for loop begins on `h` . This means we enter our `_depthFirstRecur` , which will continue to explore the "local" region as far as possible. When this recursion ends, we would have explored the entire connected region of `h, i, j, k` (note that we add these nodes to visited as well). Our recursive call then returns to the main `depthFirst` function, where we continue the for loop. We iterate it until we hit an unvisited node ( `l` ) and then explore it's local region as far as possible using `_depthFirstRecur` , hitting the last node `m` .
```
