# App Academy Open

> Learn to code online with access to App Academy’s entire full-stack course for free

*   Catalog
*   Full Stack Online
*   Data Structures And Algorithms
*   Memoization Notes

Dynamic Programming
-------------------

**Dynamic Programming** is a design pattern used to solve a large problem by dividing it into smaller subproblems that are more manageable. Dynamic Programming will solve the subproblems efficiently, meaning that we avoid duplicate calculations and only "solve" each subproblem once by storing subsolutions in some additional data structure. We cannot always apply Dynamic Programming to a problem. Problems that can be solved with Dynamic Programming must have a sense of repetitive subproblems that overlap.

Here's an example of a problem that has such a structure:

    // Using pennies, nickels, dimes, and quarters, 
    // what is the smallest combination of coins that 
    // total 27 cents?

We'll explore this exact problem in depth later on. For now, here is some food for thought. Along the way to calculating the smallest coin combination of 27 cents, we should also calculate the smallest coin combination of say, 25 cents as a component of that problem. This is the essence of an overlapping subproblem structure.

There are two strategies we can use to implement Dynamic Programming: _Memoization_ and _Tabulation_. Let's explore Memoization first!

### Memoization

Let's first implement Dynamic Programming through _memoization_. In particular, we'll apply the memoization technique to recursive code. The underlying idea of memoization is this: every time we call a function with a particular argument, we expect to get the same result every time. Memoization allows us to store the result of a function in an object so it can be recalled later on. There are two features that comprise Memoization:

*   the function is recursive
*   the additional data structure used is typically an object (we refer to this as the memo!)

### Memoizing Factorial (kind of)

Let's begin by memoizing our previous `factorial` recursive function. As it is, our `factorial` is pretty fast with a `O(n)` runtime. This is because we simply subtract `1` from `n` for every recursive call until `n` reaches `0`. This is feasibly the fastest we could ever do, but we'll memoize it nonetheless to explore the mechanics of memoization:

    function factorial(n) {
        if (n === 1) return 1;
        return n * factorial(n - 1);
    }
    
    factorial(6);       // => 720, requires 6 calls
    factorial(6);       // => 720, requires 6 calls
    factorial(5);       // => 120, requires 5 calls
    factorial(7);       // => 5040, requires 7 calls

From our plain `factorial` above, it is clear that every time we call `factorial(6)` we should get the same result of `720` each time. The code is somewhat inefficient because we must go down the full recursive stack for each top level call to `factorial(6)`. It would be great if we could store the result of `factorial(6)` the first time we calculate it, then on subsequent calls to `factorial(6)` we simply fetch the stored result in constant time. We can accomplish exactly this by memoizing with an object! We'll refactor the code later, but for now:

    let memo = {}
    
    function factorial(n) {
        // if we have calculated factorial(n) previously, fetch the stored result in memo
        if (n in memo) return memo[n];
        if (n === 1) return 1;
    
        // otherwise, we have not calculated factorial(n) previously, so calculate it now,
        // but store the result in case we need it again in the future
        memo[n] = n * factorial(n - 1);
        return memo[n]
    }
    
    factorial(6);       // => 720, requires 6 calls
    factorial(6);       // => 720, requires 1 call
    factorial(5);       // => 120, requires 1 call
    factorial(7);       // => 5040, requires 2 calls
    
    memo;   // => { '2': 2, '3': 6, '4': 24, '5': 120, '6': 720, '7': 5040 }

The `memo` object above will map an argument of `factorial` to it's return value. That is, the keys will be arguments and their values will be the corresponding results returned. By using the memo, we are able to avoid duplicate recursive calls! Here's some food for thought: By the time our first call to `factorial(6)` returns, we will not have just the arg `6` stored in the memo. Rather, we will have _all_ args 2 to 6 stored in the memo.

Hopefully you sense the efficiency we can get by memoizing our functions, but maybe you are not convinced by the last example for two reasons:

*   We didn't improve the speed of the algorithm by an order of Big-O (it is still O(n)).
*   The code uses some global variable, so it's kind of ugly.

Both of those points are true, so let's take a look at a more advanced but also practical example that benefits from memoization.

### Memoizing Fib (actually)

Let's begin with our previous `fib` implementation that calculates the n-th number in the fibonacci sequence:

    function fib(n) {
        if (n === 1 || n === 2) return 1;
        return fib(n - 1) + fib(n - 2);
    }
    
    fib(6);     // => 8

Before we optimize this, let's ask what complexity class it falls into in the first place. Hmm, the time complexity of this function is not super intuitive to describe because the code branches twice recursively. Fret not! You'll find it useful to visualize a _tree_ when reasoning about the time complexity for recursive functions. Every node of the tree represents a call of the recursion:

![fib_tree](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/memoization/images/fib_tree.png)

In general, the height of this tree will be `n`. We derive this by following the path going straight down the left side of the tree. We can also see that each internal node leads to two more nodes. Overall, this means our tree will have roughly 2n nodes which is the same as saying our `fib` function has an exponential time complexity of 2n. That is very slow! See for yourself, try running `fib(50)` - you'll be waiting for quite a while (it took 3 minutes on our machine).

Okay. So our `fib` is slow, but is there anyway to speed it up? Take a look at the tree above. Can you find any repetitive regions of the tree? We'll highlight a few:

![fib_tree_duplicates](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/memoization/images/fib_tree_duplicates.png)

As the `n` grows bigger, the number of duplicate subtrees grows exponentially. Luckily we can fix this using memoization. We'll use a similar object strategy as before, but we'll indulge in some JavaScript default arguments to clean things up:

    function fastFib(n, memo = {}) {
        if (n in memo) return memo[n];
        if (n === 1 || n === 2) return 1;
    
        memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
        return memo[n];
    }
    
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

We _highly_ recommend you watch the lecture video that accompanies this reading. There are few common mistakes we illustrate that you won't want to miss!

Did you find this lesson helpful?


[Source](https://open.appacademy.io/learn/full-stack-online/data-structures-and-algorithms/memoization-notes)