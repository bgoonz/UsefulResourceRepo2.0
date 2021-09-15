# App Academy Open

> Learn to code online with access to App Academy’s entire full-stack course for free

*   Catalog
*   Full Stack Online
*   Data Structures And Algorithms
*   Tabulation Notes

Tabulation
----------

Now that we are familiar with Memoization, let's explore another Dynamic Programming strategy: Tabulation. In case you forgot, Memoization and Tabulation are two distinct Dynamic Programming strategies. That being said, our goal for Tabulation is still to solve large problems efficiently by breaking them down into many subproblems. There are two main features that comprise the Tabulation strategy:

*   the function is iterative and _not_ recursive
*   the additional data structure used is typically an array (we refer to this as the table!)

Many problems that can be solved with Memoization can also be solved with Tabulation, so let's begin by attacking a familar problem with a fresh set of eyes. Don't worry, we'll also work on some brand new problems in the upcoming project.

### Tabulating Fib

Tabulation is all about creating a table (array) and filling it out with elements. In general, we will complete the table by filling entries from left to right. This means that the first entry of our table (first element of the array) will correspond to the smallest subproblem. Naturally, the final entry of our table (last element of the array) will correspond to the largest problem, which is also our final answer.

Let's tabulate `fib`. As always, we want `fib(n)` to return the n-th number of the Fibonacci sequence:

    // fib(0);      // => 0
    // fib(1);      // => 1
    // fib(2);      // => 1
    // fib(6);      // => 8
    // fib(7);      // => 13

Let's jump straight into the code:

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
    
    console.log(tabulatedFib(7));      // => 13

Visually, we initialized the table with the following structure:

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `table[i]` | `0` | `1` |  |  |  |  |  |  |

After our loop finishes, the final table will be:

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `table[i]` | `0` | `1` | `1` | `2` | `3` | `5` | `8` | `13` |

Similar to our previous `memo`, by the time our function completes, our `table` will contain our final solution as well as all subsolutions calculated along the way.

#### Complexity Analysis

The analysis of our `tabulatedFib` is very straightforward, since the code is iterative. The dominant operation in the function is the loop used to fill out the entire table. The length of the table is roughly `n` elements long, so our algorithm will have an _O(n)_ runtime. The space taken by our algorithm is also _O(n)_ due to the size of the table. Overall, we should be satisfied with the effiency of our algorithm.

### Aside: Refactoring for O(1) Space

You may notice that we can cut down on the space used by our function. At any point of our loop we really only need the previous two subproblems, so there is little utility to storing the full array. This refactor is easy to do by using two variables:

    function fib(n) {
        if (n === 0) return 0;
        if (n === 1) return 1;
    
        let secondLast = 0
        let last = 1;
    
        for (let i = 2; i <= n; i++) {
            let temp = last;
            last = last + secondLast;
            secondLast = temp;
        }
    
        return last;
    }

Bam! We now have O(n) runtime and O(1) space. This is the most optimal algorithm for calculating `fib`. Note that this strategy is not quite Tabulation, since there is no table array being used. However, this still falls under the overarching category of Dynamic Programming since we saved previous subproblem results in order to calculate the final answer. There's no fancy name for this strategy; it's just amazing.

### The Tabulation Formula

Here are our general guidelines for implementing a Tabulation strategy. Bear in mind that Dynamic Programming (whether it be by Tabulation or Memoization) is only applicable to problems that can be divided into many subproblems of similar structure. This is just a _general_ recipe so adjust for taste depending on your problem:

1.  Create the table array based off of the size of the input
    *   this isn't always straightforward if you have multiple args
2.  Initialize some values in the table that "answer" the trivially small subproblem
    *   usually this means initializing the first entry of the table
3.  Iterate through the array and fill in remaining entries
    *   calculating the next entry should require using other entries of the table
4.  Your final answer is the last entry in the table (usually)

Did you find this lesson helpful?


[Source](https://open.appacademy.io/learn/full-stack-online/data-structures-and-algorithms/tabulation-notes)