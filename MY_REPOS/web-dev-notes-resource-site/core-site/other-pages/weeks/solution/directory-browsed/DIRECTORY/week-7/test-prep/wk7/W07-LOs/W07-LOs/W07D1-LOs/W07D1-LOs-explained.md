# GitHub (W7D1) - Learning Objectives

## GitHub

1. You will be able to participate in the social aspects of GitHub by starring repositories, following other developers, and reviewing your followers

    - Doing these basic activities shows that you are not only an active programmer, but active in the overall community, which is a positive attribute during the job search.

2. You will be able to use Markdown to write code snippets in your README files
    - [Here] is a great cheatsheet for markdown syntax.

3. You will craft your GitHub profile and contribute throughout the course by keeping your "gardens green"
    - Make commits to your projects throughout the day.
    - Push your projects up to your own repository at the end of the day.

4. You will be able to identify the basics of a good Wiki entries for proposals and minimum viable products
    - Design documents give a roadmap for how you envision the project developing.
    - They serve as a planning tool as well as a resource during development.
    - Minimum Viable Products (MVPs) indicate the features that need to be implemented in order to have a completed application. They also indicate your stepping stones for completing the project.

5. You will be able to identify the basics of a good project README that includes technologies at the top, images, descriptions and code snippets
    - Displaying all of these within your README gives someone a preview of the project.
    - It highlights what it looks like, describes its main features, and discusses at a high-level how it was implemented.

## Binary Search

```diff
+ The main take away from the binary search project should be understanding the idea that there are multiple ways to do a problem. Don't worry if the solutions were not obvious. The goal of the project was to show you how algorithms can be improved to be more efficient and optimized.
```

1. Explain the complexity of and write a function that performs a binary search on a sorted array of numbers.

    - Implement recursive binary search that returns true/false if the target number is present

      - Code:

        ```javascript
        // Returns simply true/false for presence
        function binarySearchRecursive(array, target) {
            // Our base case
            // If our array is empty, we do not have the target
            if (array.length === 0) {
              return false;
            }

            // Get a reference to the middle index, ie what we want to check
            let midIdx = Math.floor(array.length / 2);

            // If our target is smaller than the middle element, repeat this process with
            // the left half of our array.
            // We get a subarray that represents our left half by slicing up to but not
            // including our midIdx.
            if (target < array[midIdx]) {
              let leftHalf = array.slice(0, midIdx);
              return binarySearch(leftHalf, target);
              // If our target is larger than the middle element, repeat this process with
              // the right half of our array.
              // We get a subarray that represents our right half by slicing from the
              // midIdx + 1 all the way to the end of our array (no second argument needed).
            } else if (target > array[midIdx]) {
              let rightHalf = array.slice(midIdx + 1);
              return binarySearch(rightHalf, target);
              // If neither of these occurred, we found our element and return true.
            } else {
              return true;
            }
          }
          ```

    - Implement iterative binary search that returns true/false if the target number is present

      - Code:

        ```javascript
        // Returns simply true/false for presence
        function binarySearchIterative(array, target) {
          // Get a reference to our lower and upper bounds that we would like to search
          // within our array. At the start, this is the entire array, so the indices are
          // 0 and our length - 1.
          let lowerIdx = 0;
          let upperIdx = array.length - 1;
          // We also create a midIdx variable because we will reassign it at each iteration
          let midIdx;

          // While our lowerIdx <= upperIdx, we still have elements that we haven't ruled
          // out as being our target, so we want our iteration to continue.
          while (lowerIdx <= upperIdx) {
            // Get a reference to the middle element within our current bounds.
            // We are using Math.floor in order to get an integer/valid index.
            // (If we used ceiling, we would have to do some subtraction in order to get
            // our first element. For example, [14] has a length 1, so
            // Math.ceil((0 + 1)/2)) = 1, which is outside our bounds.
            midIdx = Math.floor((lowerIdx + upperIdx) / 2);
            // If our target is larger than our current middle element, our lower bound
            // needs to be moved up past our midIdx so that we look at the right half.
            if (array[midIdx] < target) {
              lowerIdx = midIdx + 1;
              // If our target is smaller than our current middle element, our upper bound
              // needs to be moved down past our midIdx so that we look at the left half.
            } else if (array[midIdx] > target) {
              upperIdx = midIdx - 1;
              // Otherwise, we have found our target at the midIdx and can return true.
            } else {
              return true;
            }
          }

          // If we made it outside of our loop without returning, our target is not in
          // the array, so we can return false.
          return false;
        }
        ```

    - Implement iterative binary search that returns  the index or -1 if not found

      - Code:

        ```javascript
        // Returns the index or -1 if not found
        function binarySearchIndexIterative(array) {
          // The implementation of this function is exactly the same as returning a boolean
          // Instead of returning true/false, we return the midIdx.
          // because we are never making subarrays; we are only dealing with the indices
          // as they relate to the original array.
          let lowerIdx = 0;
          let upperIdx = array.length - 1;
          let midIdx;

          while (lowerIdx <= upperIdx) {
            midIdx = Math.floor((lowerIdx + upperIdx) / 2);
            if (array[midIdx] < target) {
              lowerIdx = midIdx + 1;
            } else if (array[midIdx] > target) {
              upperIdx = midIdx - 1;
            } else {
              return midIdx;
            }
          }

          return -1;
        }
        ```

[Here]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet