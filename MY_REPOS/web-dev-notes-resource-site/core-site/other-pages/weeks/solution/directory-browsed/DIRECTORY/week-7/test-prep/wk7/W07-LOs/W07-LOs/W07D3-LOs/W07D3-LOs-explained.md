# Big-O, Memoization, and Tabulation (W7D3) - Learning Objectives

## Big-O

1. Order the common complexity classes according to their growth rate

    - The following are in order from smallest growth (most efficient) to largest:
      - constant O(1)
      - logarithmic O(log n)
      - linear O(n)
      - loglinear, linearithmic, quasilinear O(n log n)
      - polynomial O(n^c) -> O(n^2), O(n^3)
      - exponential O(c^n) -> O(2^n), O(3^n)
      - factorial O(n!)

2. Identify the complexity classes of common sort methods

| Sort Name | Time Complexity    | Space Complexity  |
|:--------- |:------------------ |:----------------- |
| bubble    | O(n^2)             | O(1)              |
| selection | O(n^2)             | O(1)              |
| insertion | O(n^2)             | O(1)              |
| merge     | O(n log n)         | O(n)              |
| quick     | O(n log n)/O(n^2)  | O(n)/O(log n)    |

- **quick sort's complexities are a little more complicated**
  - We are generally only concerned with the worst-scenario when we talk Big-O.
  - With quick sort, the worst case is exceedingly rare (only occurs when our pivot for each round happens to be the next element, resulting in us having to choose n pivot points)
  - Because it is so rare that this occurs, most people will use consider quick sort to be closer to O(n log n) time complexity.
  - We also have two space complexities listed. The version that we used in class creates a new array, resulting in O(n) space. With some tweaking, we can sort in place, modifying the original array and cutting our space complexity to O(log n), which is just a result of the stack frames that we have to create. It's good to know this method exists, but you will not need to create or identify this version.

3. Identify complexity classes of code

- Important takeaway here is being able to connect code patterns with time complexities

  - Doing an exact number of calculations (independent of input) -> constant O(1) time

    ```javascript
    function constant_1(n) {
      return n * 2 + 1;
    }
    ```

    - Looping an exact number of times (independent of input) -> constant O(1) time

    ```javascript
    function constant_2(n) {
      for (let i = 1; i <= 20; i++) {
        console.log(i);
      }
    }
    ```

    - Recursive calls that divide the input -> logarithmic O(log n) time

    ```javascript
    function logarithmic(n) {
      console.log(n);
      if (n <= 1) return;
      logarithmic(n / 2);
    }
    ```

    - Loops that depend on the size of the input -> linear O(n) time

    ```javascript
    function linear_1(n) {
      for (let i = 1; i <= n; i++) {
        console.log(i);
      }
    }
    ```

    - Recursive calls that depend on the size of the input (decrementing instead of dividing) -> linear O(n) time

    ```javascript
    function linear_2(n) {
      console.log(n);
      if (n === 1) return;
      linear_2(n - 1);
    }
    ```

    - Looping through input on each stack frame, while recursively dividing our data (commonly seen in sorts like merge and quick sort) -> loglinear O(n log n) time

    ```javascript
    function loglinear(n) {
      if (n <= 1) return;
      for (let i = 1; i <= n; i++) { // n calculations in each stack frame
        console.log(n);
      }
      loglinear(n / 2); // log n number of stack frames
      loglinear(n / 2);
    }
    ```

    - Nesting loops that depend on the size of the input -> polynomial O(n^c) time

    ```javascript
    // O(n^2)
    function quadratic(n) {
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
          console.log(`${i}, ${j}`);
        }
      }
    }

    // O(n^3)
    function cubic(n) {
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
          for (let k = 1; k <= n; k++) {
            console.log(`${i}, ${j}, ${k}`);
          }
        }
      }
    }
    ```

    - Branching out on each recursive call, with the number of calls dependent on the size of the input -> exponential O(c^n) time

    ```javascript
    // O(2^n)
    function exponential_2n(n) {
      console.log(n);
      if (n === 1) return;
      exponential_2n(n - 1);
      exponential_2n(n - 1);
    }

    // O(3^n)
    function exponential_3n(n) {
      console.log(n);
      if (n === 1) return;
      exponential_3n(n - 1);
      exponential_3n(n - 1);
      exponential_3n(n - 1);
    }
    ```

    - When both the number of recursive calls and the number of branches made in the calls are dependent on the size of the input -> factorial O(n!) time

    ```javascript
    function factorial(n) {
      console.log(n);
      if (n === 1) return;
      for (let i = 1; i <= n; i++) { // Here we're making n branches on this frame
        factorial(n - 1); // Since we are decrementing, we're making n stack frames
      }
    }
    ```

### Memoization and Tabulation

1. Apply memoization to recursive problems to make them less than polynomial time.

    - Main steps for memoizing a problem:
      1. Write out the brute force recursion
      2. Add the memo object as an additional argument
        - Keys on this object represent input, values are the corresponding output
      3. Add a base condition that returns the stored value if the argument is already in the memo
      4. Before returning a calculation, store the result in the memo for future use

    - Example of a standard and memoized fibonacci:

    ```javascript
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

2. Apply tabulation to iterative problems to make them less than polynomial time.

    - Main considerations for using tabulation:
      - Figure out how big is your table
        - Typically going to be base on input size (number in fibonacci, length of string in wordBreak)
      - What does my table represent?
        - You are generally building up your answer.
        - In fibonacci, we used the table to store the fib number at the corresponding index.
        - In stepper, we stored the boolean of whether it was possible to get to that location.
      - What initial values do I need to seed?
        - Consider what your end result should be (boolean, number, etc.).
        - Your seed data is generally going to be the immediate answer that we know from our base condition.
        - In fibonacci, we knew the first two numbers of the series.
        - In stepper, we knew that it was possible to get to our starting location, so we seeded it as true, defaulting the rest to false so that we could later change its value if we could make that step.
      - How do I iterate and fill out my table?
        - We typically need to iterate over or up to our input in some way in order to update and build up our table until we get our final result.
        - In fibonacci, we iterated up to our input number in order to calculate the fib number at each step.
        - In stepper, we iterated over each possible stepping location. If we could have made it to that point from our previous steps (ie that index was true in our table), we continued updating our table by marking the possible landing spots as true.
    - Example of a tabulated fibonacci:

      ```javascript
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
