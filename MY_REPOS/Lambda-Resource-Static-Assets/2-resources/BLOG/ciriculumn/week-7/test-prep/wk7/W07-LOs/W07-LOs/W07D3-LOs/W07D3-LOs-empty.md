# Big-O, Memoization, and Tabulation (W7D3) - Learning Objectives

## Big-O

1. Order the common complexity classes according to their growth rate

    -
    -
    -
    -
    -
    -
    -

2. Identify the complexity classes of common sort methods

    | Sort Name | Time Complexity    | Space Complexity  |
    |:--------- |:------------------ |:----------------- |
    | bubble    | O(__)              | O(_)              |
    | selection | O(__)              | O(_)              |
    | insertion | O(__)              | O(_)              |
    | merge     | O(__)              | O(_)              |
    | quick     | O(__)              | O(_)              |

3. Identify complexity classes of code

    - Important takeaway here is being able to connect code patterns with
    complexities

    ```javascript
    // O(_) ?
    function example1(n) {
      for (let i = 1; i <= 20; i++) {
        console.log(i);
      }
    }

    // O(_) ?
    function example2(n) {
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
          console.log(`${i}, ${j}`);
        }
      }
    }

    // O(_) ?
    function example3(n) {
      console.log(n);
      if (n === 1) return;
      example3(n - 1);
      example3(n - 1);
    }
    ```

## Memoization and Tabulation

1. Apply memoization to recursive problems to make them less than polynomial time.

    ```javascript
    function fib(n) {
      if (n === 1 || n === 2) return 1;
      return fib(n - 1) + fib(n - 2);
    }

    function fibMemo() {}
    ```

2. Apply tabulation to iterative problems to make them less than polynomial time.

    ```javascript
    function fib(n) {
      if (n === 1 || n === 2) return 1;
      return fib(n - 1) + fib(n - 2);
    }

    function fibTab() {}
    ```
