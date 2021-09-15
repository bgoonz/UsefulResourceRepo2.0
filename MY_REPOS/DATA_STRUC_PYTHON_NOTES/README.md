# Lambda CS Data Structures & Python

# [Website](https://ds-unit-5-lambda.netlify.app/)


## [![hackmd-github-sync-badge](https://hackmd.io/5DeYj2oXTvGJ1-Xvp1Jo2Q/badge)](https://hackmd.io/5DeYj2oXTvGJ1-Xvp1Jo2Q)


# [Resources](./ds-resources.md)

### [notion](https://golden-lobe-519.notion.site/PYTHON-cb857bd3fa4b4940928842a94dce856d)

### [codelab](https://colab.research.google.com/gist/bgoonz/e1455a967850983a3d603463885a8026/cs46-python-i.ipynb)

# A Quick Guide to Big-O Notation, Memoization, Tabulation, and Sorting Algorithms by Example

Curating Complexity: A Guide to Big-O Notation

---

### A Quick Guide to Big-O Notation, Memoization, Tabulation, and Sorting Algorithms by Example

<figure><img src="https://cdn-images-1.medium.com/max/800/0*yjlSk3T9c2_14in1.png" class="graf-image" /></figure>***Curating Complexity: A Guide to Big-O Notation***

<a href="https://replit.com/@bgoonz/Medium-article-comp-complex" class="markup--anchor markup--mixtapeEmbed-anchor" title="https://replit.com/@bgoonz/Medium-article-comp-complex"><strong>Medium-article-comp-complex</strong><br /> <em>A Node.js repl by bgoonz</em>replit.com</a><a href="https://replit.com/@bgoonz/Medium-article-comp-complex" class="js-mixtapeImage mixtapeImage u-ignoreBlock"></a>

- <span id="b70f">Why is looking at runtime not a reliable method of calculating time complexity?</span>
- <span id="2b21">Not all computers are made equal( some may be stronger and therefore boost our runtime speed )</span>
- <span id="1e1a">How many background processes ran concurrently with our program that was being tested?</span>
- <span id="1cad">We also need to ask if our code remains performant if we increase the size of the input.</span>
- <span id="3cb7">The real question we need to answering is: `How does our performance scale?`.</span>

### big ‘O’ notation

- <span id="9b21">Big O Notation is a tool for describing the efficiency of algorithms with respect to the size of the input arguments.</span>
- <span id="c0e6">Since we use mathematical functions in Big-O, there are a few big picture ideas that we’ll want to keep in mind:</span>
- <span id="2e86">The function should be defined by the size of the input.</span>
- <span id="07b0">`Smaller` Big O is better (lower time complexity)</span>
- <span id="f1b0">Big O is used to describe the worst case scenario.</span>
- <span id="e11f">Big O is simplified to show only its most dominant mathematical term.</span>

### Simplifying Math Terms

- <span id="64a4">We can use the following rules to simplify the our Big O functions:</span>
- <span id="a2c2">`Simplify Products` : If the function is a product of many terms, we drop the terms that don't depend on n.</span>
- <span id="b058">`Simplify Sums` : If the function is a sum of many terms, we drop the non-dominant terms.</span>
- <span id="eb32">`n` : size of the input</span>
- <span id="c042">`T(f)` : unsimplified math function</span>
- <span id="7b41">`O(f)` : simplified math function.</span>

`Putting it all together`

<figure><img src="https://cdn-images-1.medium.com/max/800/1*TT8uuv1x3nmGUw5rvtoZ8A.png" class="graf-image" /></figure>-   <span id="d18b">First we apply the product rule to drop all constants.</span>
-   <span id="4335">Then we apply the sum rule to select the single most dominant term.</span>

---

### Complexity Classes

Common Complexity Classes

#### There are 7 major classes in Time Complexity

<figure><img src="https://cdn-images-1.medium.com/max/800/1*6zKhmJoHkvDbrd8jfUDf3A.png" class="graf-image" /></figure>#### `O(1) Constant`

> **The algorithm takes roughly the same number of steps for any input size.**

#### `O(log(n)) Logarithmic`

> **In most cases our hidden base of Logarithmic time is 2, log complexity algorithm’s will typically display ‘halving’ the size of the input (like binary search!)**

#### `O(n) Linear`

> **Linear algorithm’s will access each item of the input “once”.**

### `O(nlog(n)) Log Linear Time`

> **Combination of linear and logarithmic behavior, we will see features from both classes.**

> Algorithm’s that are log-linear will use **both recursion AND iteration.**

### `O(nc) Polynomial`

> **C is a fixed constant.**

### `O(c^n) Exponential`

> **C is now the number of recursive calls made in each stack frame.**

> **Algorithm’s with exponential time are VERY SLOW.**

---

### Memoization

- <span id="b3b0">Memoization : a design pattern used to reduce the overall number of calculations that can occur in algorithms that use recursive strategies to solve.</span>
- <span id="2583">MZ stores the results of the sub-problems in some other data structure, so that we can avoid duplicate calculations and only ‘solve’ each problem once.</span>
- <span id="65c9">Two features that comprise memoization:</span>

1.  <span id="b2d2">FUNCTION MUST BE RECURSIVE.</span>
2.  <span id="91a3">Our additional Data Structure is usually an object (we refer to it as our memo… or sometimes cache!)</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/1*4U79jBMjU2wKE_tyYcD_3A.png" class="graf-image" /></figure><figure><img src="https://cdn-images-1.medium.com/max/800/1*Qh42KZgcCxmVt6WrTasCVw.png" class="graf-image" /></figure>### Memoizing Factorial

Our memo object is _mapping_ out our arguments of factorial to it’s return value.

- <span id="854a">Keep in mind we didn’t improve the speed of our algorithm.</span>

### Memoizing Fibonacci

<figure><img src="https://cdn-images-1.medium.com/max/800/0*2XaPj7UGKZYFjYhb" class="graf-image" /></figure>-   <span id="5be6">Our time complexity for Fibonacci goes from O(2^n) to O(n) after applying memoization.</span>

### The Memoization Formula

> _Rules:_

1.  <span id="b3f0">_Write the unoptimized brute force recursion (make sure it works);_</span>
2.  <span id="b36e">_Add memo object as an additional argument ._</span>
3.  <span id="f81f">_Add a base case condition that returns the stored value if the function’s argument is in the memo._</span>
4.  <span id="1b0f">_Before returning the result of the recursive case, store it in the memo as a value and make the function’s argument it’s key._</span>

#### Things to remember

1.  <span id="bc4a">_When solving DP problems with Memoization, it is helpful to draw out the visual tree first._</span>
2.  <span id="7bb1">_When you notice duplicate sub-tree’s that means we can memoize._</span>

---

### Tabulation

#### Tabulation Strategy

> Use When:

- <span id="f5b0">**The function is iterative and not recursive.**</span>
- <span id="015c">_The accompanying DS is usually an array._</span>

#### Steps for tabulation

- <span id="8918">_Create a table array based off the size of the input._</span>
- <span id="b4e7">_Initialize some values in the table to ‘answer’ the trivially small subproblem._</span>
- <span id="072e">_Iterate through the array and fill in the remaining entries._</span>
- <span id="192e">_Your final answer is usually the last entry in the table._</span>

---

### Memo and Tab Demo with Fibonacci

> _Normal Recursive Fibonacci_

    function fibonacci(n) {
      if (n <= 2) return 1;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }

> _Memoization Fibonacci 1_

> _Memoization Fibonacci 2_

> _Tabulated Fibonacci_

### Example of Linear Search

- <span id="84b2">_Worst Case Scenario: The term does not even exist in the array._</span>
- <span id="30dc">_Meaning: If it doesn’t exist then our for loop would run until the end therefore making our time complexity O(n)._</span>

---

### Sorting Algorithms

### Bubble Sort

`Time Complexity`: Quadratic O(n^2)

- <span id="ce1e">The inner for-loop contributes to O(n), however in a worst case scenario the while loop will need to run n times before bringing all n elements to their final resting spot.</span>

`Space Complexity`: O(1)

- <span id="664f">Bubble Sort will always use the same amount of memory regardless of n.</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/0*Ck9aeGY-d5tbz7dT" class="graf-image" /></figure>-   <span id="4115">The first major sorting algorithm one learns in introductory programming courses.</span>
-   <span id="ecd4">Gives an intro on how to convert unsorted data into sorted data.</span>

> It’s almost never used in production code because:

- <span id="3cb1">_It’s not efficient_</span>
- <span id="4eac">_It’s not commonly used_</span>
- <span id="d730">_There is stigma attached to it_</span>
- <span id="8da7">`Bubbling Up`_ : Term that infers that an item is in motion, moving in some direction, and has some final resting destination._</span>
- <span id="8447">_Bubble sort, sorts an array of integers by bubbling the largest integer to the top._</span>

<!-- -->

- <span id="dcd2">_Worst Case & Best Case are always the same because it makes nested loops._</span>
- <span id="9a6a">_Double for loops are polynomial time complexity or more specifically in this case Quadratic (Big O) of: O(n²)_</span>

### Selection Sort

`Time Complexity`: Quadratic O(n^2)

- <span id="646d">Our outer loop will contribute O(n) while the inner loop will contribute O(n / 2) on average. Because our loops are nested we will get O(n²);</span>

`Space Complexity`: O(1)

- <span id="45ae">Selection Sort will always use the same amount of memory regardless of n.</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/0*AByxtBjFrPVVYmyu" class="graf-image" /></figure>-   <span id="c618">Selection sort organizes the smallest elements to the start of the array.</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/0*GeYNxlRcbt2cf0rY" class="graf-image" /></figure>Summary of how Selection Sort should work:

1.  <span id="2277">_Set MIN to location 0_</span>
2.  <span id="c76c">_Search the minimum element in the list._</span>
3.  <span id="79d3">_Swap with value at location Min_</span>
4.  <span id="4ede">_Increment Min to point to next element._</span>
5.  <span id="a649">_Repeat until list is sorted._</span>

### Insertion Sort

`Time Complexity`: Quadratic O(n^2)

- <span id="95ea">Our outer loop will contribute O(n) while the inner loop will contribute O(n / 2) on average. Because our loops are nested we will get O(n²);</span>

`Space Complexity`: O(n)

- <span id="f6fa">Because we are creating a subArray for each element in the original input, our Space Comlexity becomes linear.</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/0*gbNU6wrszGPrfAZG" class="graf-image" /></figure>### Merge Sort

`Time Complexity`: Log Linear O(nlog(n))

- <span id="44b2">Since our array gets split in half every single time we contribute O(log(n)). The while loop contained in our helper merge function contributes O(n) therefore our time complexity is O(nlog(n)); `Space Complexity`: O(n)</span>
- <span id="9a83">We are linear O(n) time because we are creating subArrays.</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/0*GeU8YwwCoK8GiSTD" class="graf-image" /></figure><figure><img src="https://cdn-images-1.medium.com/max/800/0*IxqGb72XDVDeeiMl" class="graf-image" /></figure>### Example of Merge Sort

<figure><img src="https://cdn-images-1.medium.com/max/800/0*HMCR--9niDt5zY6M" class="graf-image" /></figure>-   <span id="48b4">**Merge sort is O(nlog(n)) time.**</span>
-   <span id="c598">*We need a function for merging and a function for sorting.*</span>

> Steps:

1.  <span id="213f">_If there is only one element in the list, it is already sorted; return the array._</span>
2.  <span id="6214">_Otherwise, divide the list recursively into two halves until it can no longer be divided._</span>
3.  <span id="3cc8">_Merge the smallest lists into new list in a sorted order._</span>

### Quick Sort

`Time Complexity`: Quadratic O(n^2)

- <span id="8e34">Even though the average time complexity O(nLog(n)), the worst case scenario is always quadratic.</span>

`Space Complexity`: O(n)

- <span id="626b">Our space complexity is linear O(n) because of the partition arrays we create.</span>
- <span id="7e3a">QS is another Divide and Conquer strategy.</span>
- <span id="233d">Some key ideas to keep in mind:</span>
- <span id="1173">It is easy to sort elements of an array relative to a particular target value.</span>
- <span id="8634">An array of 0 or 1 elements is already trivially sorted.</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/0*WLl_HpdBGXYx284T" class="graf-image" /></figure><figure><img src="https://cdn-images-1.medium.com/max/800/0*-LyHJXGPTYsWLDZf" class="graf-image" /></figure>### Binary Search

`Time Complexity`: Log Time O(log(n))

`Space Complexity`: O(1)

<figure><img src="https://cdn-images-1.medium.com/max/800/0*-naVYGTXzE2Yoali" class="graf-image" /></figure>*Recursive Solution*

> _Min Max Solution_

- <span id="6fb1">_Must be conducted on a sorted array._</span>
- <span id="383b">_Binary search is logarithmic time, not exponential b/c n is cut down by two, not growing._</span>
- <span id="c940">_Binary Search is part of Divide and Conquer._</span>

### Insertion Sort

- <span id="26b7">**Works by building a larger and larger sorted region at the left-most end of the array.**</span>

> Steps:

1.  <span id="8c1f">_If it is the first element, and it is already sorted; return 1._</span>
2.  <span id="1451">_Pick next element._</span>
3.  <span id="0f8b">_Compare with all elements in the sorted sub list_</span>
4.  <span id="4d78">_Shift all the elements in the sorted sub list that is greater than the value to be sorted._</span>
5.  <span id="9131">_Insert the value_</span>
6.  <span id="6c8a">_Repeat until list is sorted._</span>

### If you found this guide helpful feel free to checkout my GitHub/gists where I host similar content:

<a href="https://gist.github.com/bgoonz" class="markup--anchor markup--mixtapeEmbed-anchor" title="https://gist.github.com/bgoonz"><strong>bgoonz’s gists</strong><br /> <em>Instantly share code, notes, and snippets. Web Developer, Electrical Engineer JavaScript | CSS | Bootstrap | Python |…</em>gist.github.com</a><a href="https://gist.github.com/bgoonz" class="js-mixtapeImage mixtapeImage u-ignoreBlock"></a>

<a href="https://github.com/bgoonz" class="markup--anchor markup--mixtapeEmbed-anchor" title="https://github.com/bgoonz"><strong>bgoonz — Overview</strong><br /> <em>Web Developer, Electrical Engineer JavaScript | CSS | Bootstrap | Python | React | Node.js | Express | Sequelize…</em>github.com</a><a href="https://github.com/bgoonz" class="js-mixtapeImage mixtapeImage u-ignoreBlock"></a>

### Or Checkout my personal Resource Site:

<a href="https://bgoonz-blog.netlify.app/" class="markup--anchor markup--mixtapeEmbed-anchor" title="https://bgoonz-blog.netlify.app/"><strong>Web-Dev-Hub</strong><br /> <em>Memoization, Tabulation, and Sorting Algorithms by Example Why is looking at runtime not a reliable method of…</em>bgoonz-blog.netlify.app</a><a href="https://bgoonz-blog.netlify.app/" class="js-mixtapeImage mixtapeImage u-ignoreBlock"></a>

<figure><img src="https://cdn-images-1.medium.com/max/800/1*VCmj_H9AHs41oC9Yx1hZFQ.png" class="graf-image" /></figure>### Discover More:

<a href="https://bgoonz-blog.netlify.app/" class="markup--anchor markup--mixtapeEmbed-anchor" title="https://bgoonz-blog.netlify.app/"><strong>Web-Dev-Hub</strong><br /> <em>Memoization, Tabulation, and Sorting Algorithms by Example Why is looking at runtime not a reliable method of…</em>bgoonz-blog.netlify.app</a><a href="https://bgoonz-blog.netlify.app/" class="js-mixtapeImage mixtapeImage u-ignoreBlock"></a>

By <a href="https://medium.com/@bryanguner" class="p-author h-card">Bryan Guner</a> on [February 27, 2021](https://medium.com/p/803ff193c522).

<a href="https://medium.com/@bryanguner/a-quick-guide-to-big-o-notation-memoization-tabulation-and-sorting-algorithms-by-example-803ff193c522" class="p-canonical">Canonical link</a>

Exported from [Medium](https://medium.com) on July 29, 2021.

```
.
├── ./README.md
├── ./TREE.md
├── ./WEEKS
│   ├── ./WEEKS/wk17
│   │   ├── ./WEEKS/wk17/d1
│   │   │   ├── ./WEEKS/wk17/d1/CS46_Python_I.ipynb
│   │   │   ├── ./WEEKS/wk17/d1/challenges
│   │   │   │   └── ./WEEKS/wk17/d1/challenges/challenges.py
│   │   │   ├── ./WEEKS/wk17/d1/cs46_python_i.py
│   │   │   ├── ./WEEKS/wk17/d1/d1.html
│   │   │   └── ./WEEKS/wk17/d1/intro-2-py.md
│   │   ├── ./WEEKS/wk17/d2
│   │   ├── ./WEEKS/wk17/d3
│   │   ├── ./WEEKS/wk17/d4
│   │   └── ./WEEKS/wk17/d5
│   └── ./WEEKS/wk18
│       ├── ./WEEKS/wk18/d1
│       ├── ./WEEKS/wk18/d2
│       ├── ./WEEKS/wk18/d3
│       ├── ./WEEKS/wk18/d4
│       └── ./WEEKS/wk18/d5
├── ./container
│   ├── ./container/Algorithms-One
│   │   ├── ./container/Algorithms-One/README.md
│   │   ├── ./container/Algorithms-One/TSP
│   │   │   ├── ./container/Algorithms-One/TSP/TSP.js
│   │   │   ├── ./container/Algorithms-One/TSP/usa115475.tsp
│   │   │   └── ./container/Algorithms-One/TSP/usa115475_cities.txt
│   │   └── ./container/Algorithms-One/minilab
│   │       └── ./container/Algorithms-One/minilab/HeapsAlg.js
│   ├── ./container/Algorithms-Two_React-TSP
│   │   ├── ./container/Algorithms-Two_React-TSP/README.md
│   │   └── ./container/Algorithms-Two_React-TSP/react-starter
│   │       ├── ./container/Algorithms-Two_React-TSP/react-starter/package-lock.json
│   │       ├── ./container/Algorithms-Two_React-TSP/react-starter/package.json
│   │       ├── ./container/Algorithms-Two_React-TSP/react-starter/src
│   │       │   ├── ./container/Algorithms-Two_React-TSP/react-starter/src/components
│   │       │   │   └── ./container/Algorithms-Two_React-TSP/react-starter/src/components/App.js
│   │       │   ├── ./container/Algorithms-Two_React-TSP/react-starter/src/index.html
│   │       │   └── ./container/Algorithms-Two_React-TSP/react-starter/src/index.js
│   │       └── ./container/Algorithms-Two_React-TSP/react-starter/webpack.config.js
│   ├── ./container/CS-Wiki
│   │   ├── ./container/CS-Wiki/README.md
│   │   ├── ./container/CS-Wiki/vscdebugc
│   │   │   ├── ./container/CS-Wiki/vscdebugc/Makefile
│   │   │   ├── ./container/CS-Wiki/vscdebugc/README.md
│   │   │   └── ./container/CS-Wiki/vscdebugc/hello.c
│   │   └── ./container/CS-Wiki/wiki-images
│   │       ├── ./container/CS-Wiki/wiki-images/cypher-disbelief.jpg
│   │       ├── ./container/CS-Wiki/wiki-images/hackerrank_howto_thumb.png
│   │       └── ./container/CS-Wiki/wiki-images/repo-fork-sync.svg
│   ├── ./container/DijkstrasD3Demo
│   │   ├── ./container/DijkstrasD3Demo/README.md
│   │   ├── ./container/DijkstrasD3Demo/d3_demo.html
│   │   ├── ./container/DijkstrasD3Demo/d3_demo.js
│   │   ├── ./container/DijkstrasD3Demo/d3_demo_data.js
│   │   ├── ./container/DijkstrasD3Demo/d3_demo_files
│   │   │   └── ./container/DijkstrasD3Demo/d3_demo_files/d3.v3.min.js
│   │   └── ./container/DijkstrasD3Demo/examples
│   │       ├── ./container/DijkstrasD3Demo/examples/d3-quick-dirty
│   │       │   ├── ./container/DijkstrasD3Demo/examples/d3-quick-dirty/d3.v3.min.js
│   │       │   ├── ./container/DijkstrasD3Demo/examples/d3-quick-dirty/d3_demo.html
│   │       │   ├── ./container/DijkstrasD3Demo/examples/d3-quick-dirty/d3_demo.js
│   │       │   ├── ./container/DijkstrasD3Demo/examples/d3-quick-dirty/d3_demo_data.js
│   │       │   └── ./container/DijkstrasD3Demo/examples/d3-quick-dirty/dijkstra.js
│   │       ├── ./container/DijkstrasD3Demo/examples/dijkstra.js
│   │       ├── ./container/DijkstrasD3Demo/examples/graph.js
│   │       └── ./container/DijkstrasD3Demo/examples/solution
│   │           └── ./container/DijkstrasD3Demo/examples/solution/Dijkstra.js
│   ├── ./container/Multi-Level-Feedback-Queue
│   │   ├── ./container/Multi-Level-Feedback-Queue/README.md
│   │   ├── ./container/Multi-Level-Feedback-Queue/assets
│   │   │   └── ./container/Multi-Level-Feedback-Queue/assets/mlfq_diagram.png
│   │   ├── ./container/Multi-Level-Feedback-Queue/package-lock.json
│   │   ├── ./container/Multi-Level-Feedback-Queue/package.json
│   │   ├── ./container/Multi-Level-Feedback-Queue/src
│   │   │   ├── ./container/Multi-Level-Feedback-Queue/src/Process.js
│   │   │   ├── ./container/Multi-Level-Feedback-Queue/src/Queue.js
│   │   │   ├── ./container/Multi-Level-Feedback-Queue/src/Scheduler.js
│   │   │   ├── ./container/Multi-Level-Feedback-Queue/src/constants
│   │   │   │   └── ./container/Multi-Level-Feedback-Queue/src/constants/index.js
│   │   │   └── ./container/Multi-Level-Feedback-Queue/src/main.js
│   │   └── ./container/Multi-Level-Feedback-Queue/tests
│   │       ├── ./container/Multi-Level-Feedback-Queue/tests/Process.test.js
│   │       ├── ./container/Multi-Level-Feedback-Queue/tests/Queue.test.js
│   │       └── ./container/Multi-Level-Feedback-Queue/tests/Scheduler.test.js
│   ├── ./container/Operating-Systems-One
│   │   ├── ./container/Operating-Systems-One/C_programming_help.C
│   │   ├── ./container/Operating-Systems-One/README.md
│   │   ├── ./container/Operating-Systems-One/first_C_programming_assignment.C
│   │   └── ./container/Operating-Systems-One/objectives
│   │       ├── ./container/Operating-Systems-One/objectives/boot-process
│   │       │   └── ./container/Operating-Systems-One/objectives/boot-process/README.md
│   │       ├── ./container/Operating-Systems-One/objectives/kernel-proc
│   │       │   └── ./container/Operating-Systems-One/objectives/kernel-proc/README.md
│   │       ├── ./container/Operating-Systems-One/objectives/mm-drv-fs
│   │       │   └── ./container/Operating-Systems-One/objectives/mm-drv-fs/README.md
│   │       └── ./container/Operating-Systems-One/objectives/os-overview
│   │           └── ./container/Operating-Systems-One/objectives/os-overview/README.md
│   ├── ./container/Operating-Systems-Two
│   │   └── ./container/Operating-Systems-Two/README.md
│   ├── ./container/Python-OOP-Toy
│   │   ├── ./container/Python-OOP-Toy/Pipfile
│   │   ├── ./container/Python-OOP-Toy/Pipfile.lock
│   │   ├── ./container/Python-OOP-Toy/README.md
│   │   └── ./container/Python-OOP-Toy/src
│   │       ├── ./container/Python-OOP-Toy/src/ball.py
│   │       ├── ./container/Python-OOP-Toy/src/block.py
│   │       └── ./container/Python-OOP-Toy/src/draw.py
│   └── ./container/The-C-Programming-Language
│       ├── ./container/The-C-Programming-Language/README.md
│       ├── ./container/The-C-Programming-Language/lessons
│       │   ├── ./container/The-C-Programming-Language/lessons/c-build-process
│       │   │   └── ./container/The-C-Programming-Language/lessons/c-build-process/README.md
│       │   ├── ./container/The-C-Programming-Language/lessons/c-input-output
│       │   │   ├── ./container/The-C-Programming-Language/lessons/c-input-output/README.md
│       │   │   └── ./container/The-C-Programming-Language/lessons/c-input-output/countdown
│       │   │       └── ./container/The-C-Programming-Language/lessons/c-input-output/countdown/countdown.c
│       │   ├── ./container/The-C-Programming-Language/lessons/c-intro
│       │   │   ├── ./container/The-C-Programming-Language/lessons/c-intro/README.md
│       │   │   └── ./container/The-C-Programming-Language/lessons/c-intro/add
│       │   │       └── ./container/The-C-Programming-Language/lessons/c-intro/add/add.c
│       │   ├── ./container/The-C-Programming-Language/lessons/c-pointers
│       │   │   ├── ./container/The-C-Programming-Language/lessons/c-pointers/README.md
│       │   │   └── ./container/The-C-Programming-Language/lessons/c-pointers/add
│       │   │       └── ./container/The-C-Programming-Language/lessons/c-pointers/add/add.c
│       │   └── ./container/The-C-Programming-Language/lessons/learning-new-languages
│       │       ├── ./container/The-C-Programming-Language/lessons/learning-new-languages/README.md
│       │       └── ./container/The-C-Programming-Language/lessons/learning-new-languages/hello
│       │           └── ./container/The-C-Programming-Language/lessons/learning-new-languages/hello/hello.c
│       └── ./container/The-C-Programming-Language/src
│           ├── ./container/The-C-Programming-Language/src/hangman
│           │   ├── ./container/The-C-Programming-Language/src/hangman/README.md
│           │   └── ./container/The-C-Programming-Language/src/hangman/hangman.c
│           ├── ./container/The-C-Programming-Language/src/image-stamper
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/README.md
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/getopt_example.c
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/main_program.c
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/read_file.c
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/read_file.h
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/template1.c
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/template1.dat
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/template1.h
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/template10x10.dat
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/template5x5.dat
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/template5x5.h
│           │   ├── ./container/The-C-Programming-Language/src/image-stamper/template5x5.tmp
│           │   └── ./container/The-C-Programming-Language/src/image-stamper/template5x5.txt
│           ├── ./container/The-C-Programming-Language/src/intro-project
│           │   ├── ./container/The-C-Programming-Language/src/intro-project/README.md
│           │   ├── ./container/The-C-Programming-Language/src/intro-project/double_pointer_lesson.c
│           │   ├── ./container/The-C-Programming-Language/src/intro-project/esoterica.C
│           │   ├── ./container/The-C-Programming-Language/src/intro-project/micro.C
│           │   ├── ./container/The-C-Programming-Language/src/intro-project/myprintf.c
│           │   ├── ./container/The-C-Programming-Language/src/intro-project/pointer_lesson.c
│           │   ├── ./container/The-C-Programming-Language/src/intro-project/rap.C
│           │   ├── ./container/The-C-Programming-Language/src/intro-project/review.c
│           │   └── ./container/The-C-Programming-Language/src/intro-project/test.asm
│           └── ./container/The-C-Programming-Language/src/ppm
│               ├── ./container/The-C-Programming-Language/src/ppm/ppm.c
│               └── ./container/The-C-Programming-Language/src/ppm/vim.ppm
├── ./ds-resources.md
├── ./python-prac
│   ├── ./python-prac/DOCS
│   │   ├── ./python-prac/DOCS/_static
│   │   │   ├── ./python-prac/DOCS/_static/basic.css
│   │   │   ├── ./python-prac/DOCS/_static/classic.css
│   │   │   ├── ./python-prac/DOCS/_static/copybutton.js
│   │   │   ├── ./python-prac/DOCS/_static/default.css
│   │   │   ├── ./python-prac/DOCS/_static/doctools.js
│   │   │   ├── ./python-prac/DOCS/_static/documentation_options.js
│   │   │   ├── ./python-prac/DOCS/_static/file.png
│   │   │   ├── ./python-prac/DOCS/_static/index.html
│   │   │   ├── ./python-prac/DOCS/_static/index.md
│   │   │   ├── ./python-prac/DOCS/_static/jquery.js
│   │   │   ├── ./python-prac/DOCS/_static/language_data.js
│   │   │   ├── ./python-prac/DOCS/_static/py.png
│   │   │   ├── ./python-prac/DOCS/_static/pydoctheme.css
│   │   │   ├── ./python-prac/DOCS/_static/pygments.css
│   │   │   ├── ./python-prac/DOCS/_static/right.html
│   │   │   ├── ./python-prac/DOCS/_static/right.md
│   │   │   ├── ./python-prac/DOCS/_static/sidebar.js
│   │   │   ├── ./python-prac/DOCS/_static/switchers.js
│   │   │   └── ./python-prac/DOCS/_static/underscore.js
│   │   ├── ./python-prac/DOCS/index.html
│   │   ├── ./python-prac/DOCS/index.md
│   │   ├── ./python-prac/DOCS/right.html
│   │   ├── ./python-prac/DOCS/right.md
│   │   └── ./python-prac/DOCS/tutorial
│   │       ├── ./python-prac/DOCS/tutorial/appendix.html
│   │       ├── ./python-prac/DOCS/tutorial/appendix.md
│   │       ├── ./python-prac/DOCS/tutorial/appetite.html
│   │       ├── ./python-prac/DOCS/tutorial/appetite.md
│   │       ├── ./python-prac/DOCS/tutorial/classes.html
│   │       ├── ./python-prac/DOCS/tutorial/classes.md
│   │       ├── ./python-prac/DOCS/tutorial/controlflow.html
│   │       ├── ./python-prac/DOCS/tutorial/controlflow.md
│   │       ├── ./python-prac/DOCS/tutorial/datastructures.html
│   │       ├── ./python-prac/DOCS/tutorial/datastructures.md
│   │       ├── ./python-prac/DOCS/tutorial/directory.html
│   │       ├── ./python-prac/DOCS/tutorial/directory.md
│   │       ├── ./python-prac/DOCS/tutorial/errors.html
│   │       ├── ./python-prac/DOCS/tutorial/errors.md
│   │       ├── ./python-prac/DOCS/tutorial/floatingpoint.html
│   │       ├── ./python-prac/DOCS/tutorial/floatingpoint.md
│   │       ├── ./python-prac/DOCS/tutorial/index.html
│   │       ├── ./python-prac/DOCS/tutorial/index.md
│   │       ├── ./python-prac/DOCS/tutorial/inputoutput.html
│   │       ├── ./python-prac/DOCS/tutorial/inputoutput.md
│   │       ├── ./python-prac/DOCS/tutorial/interactive.html
│   │       ├── ./python-prac/DOCS/tutorial/interactive.md
│   │       ├── ./python-prac/DOCS/tutorial/interpreter.html
│   │       ├── ./python-prac/DOCS/tutorial/interpreter.md
│   │       ├── ./python-prac/DOCS/tutorial/introduction.html
│   │       ├── ./python-prac/DOCS/tutorial/introduction.md
│   │       ├── ./python-prac/DOCS/tutorial/left.html
│   │       ├── ./python-prac/DOCS/tutorial/left.md
│   │       ├── ./python-prac/DOCS/tutorial/modules.html
│   │       ├── ./python-prac/DOCS/tutorial/modules.md
│   │       ├── ./python-prac/DOCS/tutorial/right.html
│   │       ├── ./python-prac/DOCS/tutorial/right.md
│   │       ├── ./python-prac/DOCS/tutorial/stdlib.html
│   │       ├── ./python-prac/DOCS/tutorial/stdlib.md
│   │       ├── ./python-prac/DOCS/tutorial/stdlib2.html
│   │       ├── ./python-prac/DOCS/tutorial/stdlib2.md
│   │       ├── ./python-prac/DOCS/tutorial/venv.html
│   │       ├── ./python-prac/DOCS/tutorial/venv.md
│   │       ├── ./python-prac/DOCS/tutorial/whatnow.html
│   │       └── ./python-prac/DOCS/tutorial/whatnow.md
│   ├── ./python-prac/LICENSE
│   ├── ./python-prac/Overflow
│   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Angle.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Average.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Bank.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Calc.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/EmailsInPython.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Example.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Files.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Functions.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Indexing.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Info.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Keywords.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Latin.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Lcm.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Libs.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Loss.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Module.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Morgans_law.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Numbers.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/OnContacts.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Operations.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/OperationsMethods.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Percent.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/README.html
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/README.md
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/RandomWeb.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Reverse.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Score.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/String.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Tables.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/ThanMoreThan.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/Turtle.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/WellAlarm.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/_config.yml
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/README.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/README.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/README.html
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/README.md
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/count.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/enum.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/index.html
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/index.md
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/length.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/max.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/mean.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/median.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/min.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/mode.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/right.html
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/right.md
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/sort.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/sum.py
│   │   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/analysis/useful_function_mapping.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/index.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/index.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/README.html
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/README.md
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/binary_to_decimal_converter.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/collatz_sequence.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/compare_array_elements.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/factorial.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/index.html
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/index.md
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/right.html
│   │   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/numbers/right.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/right.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/right.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/searching
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/searching/binary_search.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/searching/index.html
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/searching/index.md
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/searching/right.html
│   │   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/searching/right.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting/README.html
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting/README.md
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting/bubble_sort.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting/index.html
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting/index.md
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting/insertion_sort.py
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting/right.html
│   │   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting/right.md
│   │   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/sorting/selection_sort.py
│   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string
│   │   │   │       ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/README.html
│   │   │   │       ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/README.md
│   │   │   │       ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/caesars_cipher_encryption.py
│   │   │   │       ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/index.html
│   │   │   │       ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/index.md
│   │   │   │       ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/is_palindrome.py
│   │   │   │       ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/is_palindrome_two_liner.py
│   │   │   │       ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/right.html
│   │   │   │       ├── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/right.md
│   │   │   │       └── ./python-prac/Overflow/Beginners-Python-Examples-master/algorithms/string/vowel_count.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/armstrong_number.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/cartesian_plane_quadrant.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/count_algorithm_execution_time.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/days_you_lived.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/deMorgans_law.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/decimal_to_binary_converter.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/decrypting_caesars_cipher.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/dictionary.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/difference_testing.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/discount.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/discountPercent.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/distance_on_number_line.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/figure_determiner.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/findLcm.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/find_cube_root.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/find_roots.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/find_square_root.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/find_square_root_of_imperfect_square.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/geometric_progression_builder.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/healthScore.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/hello_world.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/html_source.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/identity_matrix_recognizer.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/image_downloader.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/in_the_something.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/index.html
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/index.md
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/item_index.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/kay_sort.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/lessThanMoreThan.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/linear_search.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/listOperations.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/listOperationsMethods.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/listReverse.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/list_comprehensions.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/logarithm_integer.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/madLibs.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/magicball_8.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/Mean.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/README.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/README.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/aircraft_thrust.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/area_volume_calculator.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/arithmetic_progression_builder.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/calculator.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/eulers_python.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/geoMean.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/index.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/index.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/number_lesser_greater.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/math/right.html
│   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/math/right.md
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/mathoperators.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/max_by_alphabetical_order.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/max_int_in_list.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/min_by_alphabetical_order.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/min_int_in_list.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/mod_example.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/modified_selection_sort.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/morse_code_decoder.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/multiplicationTables.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/my_name.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/nearest_square_and_its_root.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/network
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/network/are_you_connected_to_world.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/network/index.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/network/index.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/network/right.html
│   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/network/right.md
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/newOnContacts.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/non_multiples.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/ordered_binary_search.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/otherAngle.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/password_creator.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/percentageCalc.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/percentage_increase_decrease.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/physics.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/pigLatin.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/piggyBank.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/ping_host.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/primeNumbers.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/profitLoss.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/pyKeywords.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/pythagoras.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/python_files_compiler.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/randomModule.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/readFiles.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/reverse_sort.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/right.html
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/right.md
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/rock,paper,scissor.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/selection_sort.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/sendingEmailsInPython.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/README.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/README.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/battleship.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/battleship_info.txt
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/dice_rolling_simulator.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/dice_rolling_simulator_info.txt
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/index.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/index.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/number_guessing_game.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/right.html
│   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/shell_games/right.md
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/ListExample.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/README.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/README.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/args_example.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/args_example_1.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/class_animal_attributes_examples.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/class_example_movies.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/class_movies.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/conditionals_examples.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/for_loop_mountain.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/index.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/index.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/personality_teller.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/right.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/right.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/unicode.py
│   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/simple_scripts/website_opener.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/sleepWellAlarm.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/sortString.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/sortingFunctions.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/squareTurtle.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/square_root_algorithm.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/squarecube.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/star_turtle.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/stringIndexing.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/stringOperations.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/stringReverse.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/sumAverage.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/sum_array.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/sum_of_arithmetic_sequence.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/swap_case.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/systemInfo.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/table_maker.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/take-a-break.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/testofdivisibility.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/time_conversion.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/tuplesExample.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/turtleRandomWeb.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/binary_to_decimal_conversion.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/bmi_body_mass_index_calculator.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/caesars_cipher_encryption.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/calculator.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/calendar.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/index.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/index.md
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/password_generator.py
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/right.html
│   │   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/right.md
│   │   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/useful_scripts/timer.py
│   │   │   ├── ./python-prac/Overflow/Beginners-Python-Examples-master/videodownloader.py
│   │   │   └── ./python-prac/Overflow/Beginners-Python-Examples-master/writingFiles.py
│   │   ├── ./python-prac/Overflow/_Algorithms
│   │   │   ├── ./python-prac/Overflow/_Algorithms/Check
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Check/check_anagrams.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Check/check_bipartite.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Check/check_pangram.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Check/index.html
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Check/index.md
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Check/merge_string_checker.py
│   │   │   │   └── ./python-prac/Overflow/_Algorithms/Check/prime_check.py
│   │   │   ├── ./python-prac/Overflow/_Algorithms/Search
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/add_and_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/add_search_word_data_structures_trie.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/bidirectional_breadth_first_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/boyer_moore_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/breadth_first_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/breadth_first_search_2.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/depth_first_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/depth_first_search_2.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/double_linear_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/double_linear_search_recursion.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/fibonacci_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/index.html
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/index.md
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/interpolation_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/jump_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/linear_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/maze_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/naive_string_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/optimal_binary_search_tree.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/ordered_binary_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/search_insert.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/search_range.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/search_rotate.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/search_scope.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/sentinel_linear_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/similarity_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/simple_binary_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Search/tabu_search.py
│   │   │   │   └── ./python-prac/Overflow/_Algorithms/Search/ternary_search.py
│   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/bitonic_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/bogo_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/bubble_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/bucket_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/cocktail_shaker_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/comb_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/counting_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/cycle_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/double_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/external_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/g_topological_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/gnome_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/heap_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/index.html
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/index.md
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/insertion_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/intro_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/is_sorted.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/iterative_merge_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/kay_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/merge_insertion_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/merge_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/merge_sorted_k_lists.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/modified_selection_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/natural_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/pancake_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/patience_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/pigeon_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/pigeonhole_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/pylama_isort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/quick_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/quick_sort_3_partition.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/radix_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/random_pivot_quick_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/recursive_bubble_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/recursive_insertion_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/recursive_quick_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/reverse_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/search_in_sorted_matrix.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/searching_in_sorted_matrix.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/selection_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/shell_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/sortString.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/sort_colors.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/sort_matrix_diagonally.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/sorting.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/sortingFunctions.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/stooge_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/strand_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/tim_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/top_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/topological_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/tree_sort.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/Sort/unknown_sort.py
│   │   │   │   └── ./python-prac/Overflow/_Algorithms/Sort/wiggle_sort.py
│   │   │   ├── ./python-prac/Overflow/_Algorithms/alphabeticalattributes.py
│   │   │   ├── ./python-prac/Overflow/_Algorithms/array
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/215_Kth_Largest_Element_in_an_Array.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/array_sum_combinations.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/compare_array_elements.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/continuous-subarray-sum.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/degree-of-an-array.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/dynamic_arrays.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/index.html
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/index.md
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/k-diff-pairs-in-an-array.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/largest_subarray_sum.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/longest_sub_array.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/max_product_subarray.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/max_sub_array.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/max_subarray.py
│   │   │   │   ├── ./python-prac/Overflow/_Algorithms/array/median_of_two_arrays.py
│   │   │   │   └── ./python-prac/Overflow/_Algorithms/array/sum_array.py
│   │   │   ├── ./python-prac/Overflow/_Algorithms/index.html
│   │   │   ├── ./python-prac/Overflow/_Algorithms/index.md
│   │   │   ├── ./python-prac/Overflow/_Algorithms/max_by_alphabetical_order.py
│   │   │   └── ./python-prac/Overflow/_Algorithms/min_by_alphabetical_order.py
│   │   ├── ./python-prac/Overflow/_Data-Structures
│   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/average-of-levels-in-binary-tree.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/basic_binary_tree.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/binary-tree-tilt.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/binary_search.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/binary_search_tree.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/binary_search_tree_recursive.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/binary_tree_mirror.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/binary_tree_paths.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/binary_tree_traversals.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/binary-tree/index.html
│   │   │   │   └── ./python-prac/Overflow/_Data-Structures/binary-tree/index.md
│   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/BSTIterator.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/array_to_bst.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/bst.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/bst_alternate_starter.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/bst_closest_value.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/convert-bst-to-greater-tree.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/count_binary_substring.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/index.html
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/index.md
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/is_bst.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/longest_palindromic_substring.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/minimum-absolute-difference-in-bst.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/bst/repeat_substring.py
│   │   │   │   └── ./python-prac/Overflow/_Data-Structures/bst/unique_bst.py
│   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/basic_graphs.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/check_bipartite_graph_bfs.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/check_bipartite_graph_dfs.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/check_digraph_strongly_connected.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/clone_graph.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/directed_and_undirected_(weighted)_graph.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/eulerian_path_and_circuit_for_undirected_graph.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/frequent_pattern_graph_miner.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/gale_shapley_bigraph.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/graph.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/graph_list.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/graph_matrix.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/graphs_floyd_warshall.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/index.html
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/index.md
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/graph/kth_lexicographic_permutation.py
│   │   │   │   └── ./python-prac/Overflow/_Data-Structures/graph/path_between_two_vertices_in_digraph.py
│   │   │   ├── ./python-prac/Overflow/_Data-Structures/index.html
│   │   │   ├── ./python-prac/Overflow/_Data-Structures/index.md
│   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue/circular_queue.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue/double_ended_queue.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue/index.html
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue/index.md
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue/linked_queue.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue/priority_queue.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue/priority_queue_using_list.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue/queue.py
│   │   │   │   ├── ./python-prac/Overflow/_Data-Structures/queue/queue_on_list.py
│   │   │   │   └── ./python-prac/Overflow/_Data-Structures/queue/reconstruct_queue.py
│   │   │   └── ./python-prac/Overflow/_Data-Structures/stack
│   │   │       ├── ./python-prac/Overflow/_Data-Structures/stack/dijkstras_two_stack_algorithm.py
│   │   │       ├── ./python-prac/Overflow/_Data-Structures/stack/index.html
│   │   │       ├── ./python-prac/Overflow/_Data-Structures/stack/index.md
│   │   │       ├── ./python-prac/Overflow/_Data-Structures/stack/linked_stack.py
│   │   │       ├── ./python-prac/Overflow/_Data-Structures/stack/ordered_stack.py
│   │   │       ├── ./python-prac/Overflow/_Data-Structures/stack/pydevd_stackless.py
│   │   │       ├── ./python-prac/Overflow/_Data-Structures/stack/queue_on_pseudo_stack.py
│   │   │       ├── ./python-prac/Overflow/_Data-Structures/stack/stack.py
│   │   │       └── ./python-prac/Overflow/_Data-Structures/stack/stack_using_dll.py
│   │   ├── ./python-prac/Overflow/_Learning
│   │   │   ├── ./python-prac/Overflow/_Learning/00thread_lecture.py
│   │   │   ├── ./python-prac/Overflow/_Learning/01-basics.py
│   │   │   ├── ./python-prac/Overflow/_Learning/01-lists-intro.py
│   │   │   ├── ./python-prac/Overflow/_Learning/01_deques_intro.py
│   │   │   ├── ./python-prac/Overflow/_Learning/01_intro_to_queues.py
│   │   │   ├── ./python-prac/Overflow/_Learning/01_lists_intro.py
│   │   │   ├── ./python-prac/Overflow/_Learning/01_stacks_intro.py
│   │   │   ├── ./python-prac/Overflow/_Learning/01_summation.py
│   │   │   ├── ./python-prac/Overflow/_Learning/01_thread_intro.py
│   │   │   ├── ./python-prac/Overflow/_Learning/01locks.py
│   │   │   ├── ./python-prac/Overflow/_Learning/02-arithmetic.py
│   │   │   ├── ./python-prac/Overflow/_Learning/02-lists-mutability-and-sorting.py
│   │   │   ├── ./python-prac/Overflow/_Learning/02_big_o.py
│   │   │   ├── ./python-prac/Overflow/_Learning/02_deque_implementation.py
│   │   │   ├── ./python-prac/Overflow/_Learning/02_queue_implementation.py
│   │   │   ├── ./python-prac/Overflow/_Learning/02_stacks_implementation.py
│   │   │   ├── ./python-prac/Overflow/_Learning/02_thread_with_sleep.py
│   │   │   ├── ./python-prac/Overflow/_Learning/02_unordered_lists.py
│   │   │   ├── ./python-prac/Overflow/_Learning/02deadlock.py
│   │   │   ├── ./python-prac/Overflow/_Learning/03-input-and-format.py
│   │   │   ├── ./python-prac/Overflow/_Learning/03-lists-math.py
│   │   │   ├── ./python-prac/Overflow/_Learning/03_anagram.py
│   │   │   ├── ./python-prac/Overflow/_Learning/03_balanced_parenthesis.py
│   │   │   ├── ./python-prac/Overflow/_Learning/03_daemon_threads.py
│   │   │   ├── ./python-prac/Overflow/_Learning/03_hot_potato.py
│   │   │   ├── ./python-prac/Overflow/_Learning/03_palindrome.py
│   │   │   ├── ./python-prac/Overflow/_Learning/04-ducktyping.py
│   │   │   ├── ./python-prac/Overflow/_Learning/04-tuples-intro.py
│   │   │   ├── ./python-prac/Overflow/_Learning/04_converting_bases.py
│   │   │   ├── ./python-prac/Overflow/_Learning/04_joining_daemon_threads.py
│   │   │   ├── ./python-prac/Overflow/_Learning/04_type_performance.py
│   │   │   ├── ./python-prac/Overflow/_Learning/04b-complex-try-blocks.py
│   │   │   ├── ./python-prac/Overflow/_Learning/05-string-arithmetic.py
│   │   │   ├── ./python-prac/Overflow/_Learning/05-tuples-single-item.py
│   │   │   ├── ./python-prac/Overflow/_Learning/05_importance_of_locks.py
│   │   │   ├── ./python-prac/Overflow/_Learning/05_prefix_postfix_infix.py
│   │   │   ├── ./python-prac/Overflow/_Learning/05b-extra-string-operations.py
│   │   │   ├── ./python-prac/Overflow/_Learning/06-assignment.py
│   │   │   ├── ./python-prac/Overflow/_Learning/06-ranges.py
│   │   │   ├── ./python-prac/Overflow/_Learning/06_creating_locks.py
│   │   │   ├── ./python-prac/Overflow/_Learning/07-dictionaries-intro.py
│   │   │   ├── ./python-prac/Overflow/_Learning/07-equality.py
│   │   │   ├── ./python-prac/Overflow/_Learning/07_deadlocks.py
│   │   │   ├── ./python-prac/Overflow/_Learning/07b-logical-operators.py
│   │   │   ├── ./python-prac/Overflow/_Learning/07c-while-loops.py
│   │   │   ├── ./python-prac/Overflow/_Learning/08-dictionaries-more-ways.py
│   │   │   ├── ./python-prac/Overflow/_Learning/08-identity.py
│   │   │   ├── ./python-prac/Overflow/_Learning/09-functions.py
│   │   │   ├── ./python-prac/Overflow/_Learning/09-sets-intro.py
│   │   │   ├── ./python-prac/Overflow/_Learning/0Intro2Python-all.py
│   │   │   ├── ./python-prac/Overflow/_Learning/10-functions-returning-functions.py
│   │   │   ├── ./python-prac/Overflow/_Learning/10-sets-usage.py
│   │   │   ├── ./python-prac/Overflow/_Learning/11-combining-structures.py
│   │   │   ├── ./python-prac/Overflow/_Learning/11b-stackqueue.py
│   │   │   ├── ./python-prac/Overflow/_Learning/12-built-ins-all-any.py
│   │   │   ├── ./python-prac/Overflow/_Learning/13-built-ins-filter-map-zip.py
│   │   │   ├── ./python-prac/Overflow/_Learning/14-built-ins-custom-sort.py
│   │   │   ├── ./python-prac/Overflow/_Learning/15a-input-validation1.py
│   │   │   ├── ./python-prac/Overflow/_Learning/15b-input-validation2.py
│   │   │   ├── ./python-prac/Overflow/_Learning/20-http-request.py
│   │   │   ├── ./python-prac/Overflow/_Learning/examples
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/FileRegexExample.py
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/ListExample.py
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/args_example.py
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/args_example_1.py
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/class_animal_attributes_examples.py
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/class_example_movies.py
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/conditionals_examples.py
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/index.html
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/index.md
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/mod_example.py
│   │   │   │   ├── ./python-prac/Overflow/_Learning/examples/python-example.py
│   │   │   │   └── ./python-prac/Overflow/_Learning/examples/tuplesExample.py
│   │   │   ├── ./python-prac/Overflow/_Learning/index.html
│   │   │   ├── ./python-prac/Overflow/_Learning/index.md
│   │   │   └── ./python-prac/Overflow/_Learning/problems
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/Module15ProblemToCodeSolutionReadTxtMessage.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/index.html
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/index.md
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_01_while_filter.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_01_while_loop.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_01_while_map.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_02_for_filter.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_02_for_loop.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_02_for_map.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_03_list_comprehension.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_03_my_comprehension.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_04_if_statement.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_04_if_statements.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_05_class.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_06_inheritance.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_07_dict.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_07_dictionary.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_08_built_in.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_08_builtins.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_09_get_set.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_09_getters_and_setters.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_10_func.py
│   │   │       ├── ./python-prac/Overflow/_Learning/problems/problem_10_functions.py
│   │   │       └── ./python-prac/Overflow/_Learning/problems/stock_span_problem.py
│   │   ├── ./python-prac/Overflow/coding-problems-master
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/container_with_most_water.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/count_triplets_with_sum_k.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_busiest_interval.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_el_smaller_left_bigger_right.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_el_where_k_greater_or_equal.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_element_range_sorted_array.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_first_missing_positive.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_missing_number_in_second_array.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_one_missing_number.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_peak_element.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_two_missing_numbers.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/find_unpaired.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/flatten_deep_list.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/index.html
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/index.md
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/jump_game.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/k_closest_points.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/kth_smallest.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/longest_increasing_subarray.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/majority_element.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/max_profit.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/merge_intervals.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/min_swaps.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/product_of_array_except_self.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/random_sample.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/reverse_array.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/reverse_ascending_sublists.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/rotate_array.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/search_rotated_sorted_array.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/secret_santa.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/shuffle_array.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/sort_rgb_array.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/subarray_with_sum_k.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Arrays/top_k_frequent_elements.py
│   │   │   │   └── ./python-prac/Overflow/coding-problems-master/Arrays/trapped_watter.py
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/climbing_staircase.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/coin_change.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/count_ip_addresses.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/create_palindrom.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/index.html
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/index.md
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/interleaving_strings.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/jump_game_2.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/longest_common_subsequence.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/longest_common_substring.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/longest_increasing_subsequence.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/max_profit_k_transactions.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/max_subarray_sum.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/min_cost_coloring.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/number_of_decodings.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/number_of_smses.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/ordered_digits.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/split_coins.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/sum_non-adjecent.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/transform_number_ascending_digits.py
│   │   │   │   └── ./python-prac/Overflow/coding-problems-master/Dynamic_Programming/word_break.py
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/anagram_indices.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/count_positives.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/find_duplicates.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/find_pairs_with_sum_k.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/group_anagrams.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/index.html
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/index.md
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/longest_consecutive_sequence.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/longest_substring_with_k_distinct_characters.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Hashing_DS/longest_substring_without_repeating_characters.py
│   │   │   │   └── ./python-prac/Overflow/coding-problems-master/Hashing_DS/perfect_rectangle.py
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/add_two_numbers.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/index.html
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/index.md
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/intersecting_ll.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/is_ascending_ll.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/ll_helpers.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/max_difference_subll.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/merge_k_sorted_ll.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/merge_sorted_ll.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/odd_even_ll.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/remove_duplicates_sorted_ll.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/remove_element_ll.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Linked_Lists/remove_nth_ll.py
│   │   │   │   └── ./python-prac/Overflow/coding-problems-master/Linked_Lists/reverse_ll.py
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/calculate_area_of_polygon.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/check_if_point_inside_polygon.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/check_if_two_rectangles_overlap.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/count_divisibles_in_range.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/estimate_pi.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/factorial_trailing_zeroes.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/index.html
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/index.md
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/odd_sum.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/prime_factors.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/smallest_multiple.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/sum_of_multiples.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Math/total_divisible_numbers.py
│   │   │   │   └── ./python-prac/Overflow/coding-problems-master/Math/unique_paths.py
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/basic_calculator.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/count_consecutive_sums.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/find_min_path.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/generate_parentheses.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/index.html
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/index.md
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/jumping_numbers.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/letter_combinations.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/nth_fibonacci_number.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/number_of_islands.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/palindrome_integer.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/permutations.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/postfix_evaluate.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/power.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/power_set.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/queens_problem.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/reverse_all_lists.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/reverse_integer.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/river_sizes.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/running_median.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/safe_squares_rooks.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/search_2d_matrix.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/set_matrix_zeroes.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/sliding_window_maximum.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Other/spiral_matrix.py
│   │   │   │   └── ./python-prac/Overflow/coding-problems-master/Other/valid_parentheses.py
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/README.html
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/README.md
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings/encoding_string.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings/index.html
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings/index.md
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings/longest_common_prefix.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings/longest_palindromic_substring.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings/reverse_string.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings/reverse_vowels.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings/reverse_words_in_sentence.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Strings/swap_first_and_last_word.py
│   │   │   │   └── ./python-prac/Overflow/coding-problems-master/Strings/zigzag_conversion.py
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/diameter_of_binary_tree.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/find_kth_smallest_node_bst.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/find_max_branch_sum.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/find_max_path_sum.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/find_second_largest_node.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/find_second_largest_node_bst.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/index.html
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/index.md
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/populating_next_pointers_tree.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/same_tree.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/tree_helpers.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/unival_trees.py
│   │   │   │   ├── ./python-prac/Overflow/coding-problems-master/Trees/valid_bst.py
│   │   │   │   └── ./python-prac/Overflow/coding-problems-master/Trees/zigzag_level_order_traversal.py
│   │   │   ├── ./python-prac/Overflow/coding-problems-master/index.html
│   │   │   └── ./python-prac/Overflow/coding-problems-master/index.md
│   │   ├── ./python-prac/Overflow/index.html
│   │   └── ./python-prac/Overflow/index.md
│   ├── ./python-prac/PYTHON_PRAC
│   ├── ./python-prac/README.html
│   ├── ./python-prac/README.md
│   ├── ./python-prac/Readings
│   │   ├── ./python-prac/Readings/(Tutorial)_Reading_and_Writing_Files_in_Python.html
│   │   ├── ./python-prac/Readings/(Tutorial)_Reading_and_Writing_Files_in_Python.md
│   │   ├── ./python-prac/Readings/10_External_Python_packages_you_are_going_to_love.html
│   │   ├── ./python-prac/Readings/10_External_Python_packages_you_are_going_to_love.md
│   │   ├── ./python-prac/Readings/30-python-snippets.html
│   │   ├── ./python-prac/Readings/30-python-snippets.md
│   │   ├── ./python-prac/Readings/A_quick_yet_complete_tour_of_lists_in_Python3_in_just_seven_minutes.html
│   │   ├── ./python-prac/Readings/A_quick_yet_complete_tour_of_lists_in_Python3_in_just_seven_minutes.md
│   │   ├── ./python-prac/Readings/An_A-Z_of_useful_Python_tricks.html
│   │   ├── ./python-prac/Readings/An_A-Z_of_useful_Python_tricks.md
│   │   ├── ./python-prac/Readings/Automate-Boring-Stuff-with-Python.html
│   │   ├── ./python-prac/Readings/Automate-Boring-Stuff-with-Python.md
│   │   ├── ./python-prac/Readings/Controlling_the_Web_with_Python.html
│   │   ├── ./python-prac/Readings/Controlling_the_Web_with_Python.md
│   │   ├── ./python-prac/Readings/How_to_build_a_URL_crawler_to_map_a_website_using_Python.html
│   │   ├── ./python-prac/Readings/How_to_build_a_URL_crawler_to_map_a_website_using_Python.md
│   │   ├── ./python-prac/Readings/The_Python_RegEx_Cheat_Sheet_for_Budding_Programmers.html
│   │   ├── ./python-prac/Readings/The_Python_RegEx_Cheat_Sheet_for_Budding_Programmers.md
│   │   ├── ./python-prac/Readings/beginners.pdf
│   │   ├── ./python-prac/Readings/importing-data-python.pdf
│   │   ├── ./python-prac/Readings/index.html
│   │   ├── ./python-prac/Readings/index.md
│   │   ├── ./python-prac/Readings/jupyter-notebook-cheat-sheet.pdf
│   │   ├── ./python-prac/Readings/numpy.pdf
│   │   ├── ./python-prac/Readings/python-basics.html
│   │   ├── ./python-prac/Readings/python-basics.md
│   │   ├── ./python-prac/Readings/right.html
│   │   └── ./python-prac/Readings/right.md
│   ├── ./python-prac/apple-touch-icon-114x114.png
│   ├── ./python-prac/apple-touch-icon-120x120.png
│   ├── ./python-prac/apple-touch-icon-144x144.png
│   ├── ./python-prac/apple-touch-icon-152x152.png
│   ├── ./python-prac/apple-touch-icon-180x180.png
│   ├── ./python-prac/apple-touch-icon-57x57.png
│   ├── ./python-prac/apple-touch-icon-72x72.png
│   ├── ./python-prac/apple-touch-icon-76x76.png
│   ├── ./python-prac/apple-touch-icon.png
│   ├── ./python-prac/backup.py
│   ├── ./python-prac/directory.html
│   ├── ./python-prac/directory.md
│   ├── ./python-prac/dirhtml.py
│   ├── ./python-prac/exploring-python
│   │   ├── ./python-prac/exploring-python/Numpy.ipynb
│   │   ├── ./python-prac/exploring-python/Numpy.pdf
│   │   ├── ./python-prac/exploring-python/basics.ipynb
│   │   ├── ./python-prac/exploring-python/index.html
│   │   ├── ./python-prac/exploring-python/index.md
│   │   ├── ./python-prac/exploring-python/part1.ipynb
│   │   ├── ./python-prac/exploring-python/part2.ipynb
│   │   ├── ./python-prac/exploring-python/part3.ipynb
│   │   ├── ./python-prac/exploring-python/part4.ipynb
│   │   ├── ./python-prac/exploring-python/part5.ipynb
│   │   ├── ./python-prac/exploring-python/right.html
│   │   ├── ./python-prac/exploring-python/right.md
│   │   ├── ./python-prac/exploring-python/working-w-jupyter-vscode.html
│   │   └── ./python-prac/exploring-python/working-w-jupyter-vscode.md
│   ├── ./python-prac/favicon.ico
│   ├── ./python-prac/iconifier-readme.txt
│   ├── ./python-prac/index.html
│   ├── ./python-prac/index.md
│   ├── ./python-prac/learn-python
│   │   ├── ./python-prac/learn-python/README.html
│   │   ├── ./python-prac/learn-python/README.md
│   │   ├── ./python-prac/learn-python/README.pt-BR.html
│   │   ├── ./python-prac/learn-python/README.pt-BR.md
│   │   ├── ./python-prac/learn-python/index.html
│   │   ├── ./python-prac/learn-python/index.md
│   │   ├── ./python-prac/learn-python/pylintrc
│   │   ├── ./python-prac/learn-python/requirements.txt
│   │   └── ./python-prac/learn-python/src
│   │       ├── ./python-prac/learn-python/src/additions
│   │       │   ├── ./python-prac/learn-python/src/additions/index.html
│   │       │   ├── ./python-prac/learn-python/src/additions/index.md
│   │       │   ├── ./python-prac/learn-python/src/additions/test_generators.py
│   │       │   └── ./python-prac/learn-python/src/additions/test_pass.py
│   │       ├── ./python-prac/learn-python/src/classes
│   │       │   ├── ./python-prac/learn-python/src/classes/index.html
│   │       │   ├── ./python-prac/learn-python/src/classes/index.md
│   │       │   ├── ./python-prac/learn-python/src/classes/test_class_and_instance_variables.py
│   │       │   ├── ./python-prac/learn-python/src/classes/test_class_definition.py
│   │       │   ├── ./python-prac/learn-python/src/classes/test_class_objects.py
│   │       │   ├── ./python-prac/learn-python/src/classes/test_inheritance.py
│   │       │   ├── ./python-prac/learn-python/src/classes/test_instance_objects.py
│   │       │   ├── ./python-prac/learn-python/src/classes/test_method_objects.py
│   │       │   └── ./python-prac/learn-python/src/classes/test_multiple_inheritance.py
│   │       ├── ./python-prac/learn-python/src/control_flow
│   │       │   ├── ./python-prac/learn-python/src/control_flow/index.html
│   │       │   ├── ./python-prac/learn-python/src/control_flow/index.md
│   │       │   ├── ./python-prac/learn-python/src/control_flow/test_break.py
│   │       │   ├── ./python-prac/learn-python/src/control_flow/test_continue.py
│   │       │   ├── ./python-prac/learn-python/src/control_flow/test_for.py
│   │       │   ├── ./python-prac/learn-python/src/control_flow/test_if.py
│   │       │   ├── ./python-prac/learn-python/src/control_flow/test_try.py
│   │       │   └── ./python-prac/learn-python/src/control_flow/test_while.py
│   │       ├── ./python-prac/learn-python/src/data_types
│   │       │   ├── ./python-prac/learn-python/src/data_types/index.html
│   │       │   ├── ./python-prac/learn-python/src/data_types/index.md
│   │       │   ├── ./python-prac/learn-python/src/data_types/test_dictionaries.py
│   │       │   ├── ./python-prac/learn-python/src/data_types/test_lists.py
│   │       │   ├── ./python-prac/learn-python/src/data_types/test_numbers.py
│   │       │   ├── ./python-prac/learn-python/src/data_types/test_sets.py
│   │       │   ├── ./python-prac/learn-python/src/data_types/test_strings.py
│   │       │   ├── ./python-prac/learn-python/src/data_types/test_tuples.py
│   │       │   └── ./python-prac/learn-python/src/data_types/test_type_casting.py
│   │       ├── ./python-prac/learn-python/src/exceptions
│   │       │   ├── ./python-prac/learn-python/src/exceptions/index.html
│   │       │   ├── ./python-prac/learn-python/src/exceptions/index.md
│   │       │   ├── ./python-prac/learn-python/src/exceptions/test_handle_exceptions.py
│   │       │   └── ./python-prac/learn-python/src/exceptions/test_raise_exceptions.py
│   │       ├── ./python-prac/learn-python/src/files
│   │       │   ├── ./python-prac/learn-python/src/files/binary_file
│   │       │   ├── ./python-prac/learn-python/src/files/index.html
│   │       │   ├── ./python-prac/learn-python/src/files/index.md
│   │       │   ├── ./python-prac/learn-python/src/files/multi_line_file.txt
│   │       │   ├── ./python-prac/learn-python/src/files/test_file_methods.py
│   │       │   └── ./python-prac/learn-python/src/files/test_file_reading.py
│   │       ├── ./python-prac/learn-python/src/functions
│   │       │   ├── ./python-prac/learn-python/src/functions/index.html
│   │       │   ├── ./python-prac/learn-python/src/functions/index.md
│   │       │   ├── ./python-prac/learn-python/src/functions/test_function_annotations.py
│   │       │   ├── ./python-prac/learn-python/src/functions/test_function_arbitrary_arguments.py
│   │       │   ├── ./python-prac/learn-python/src/functions/test_function_decorators.py
│   │       │   ├── ./python-prac/learn-python/src/functions/test_function_default_arguments.py
│   │       │   ├── ./python-prac/learn-python/src/functions/test_function_definition.py
│   │       │   ├── ./python-prac/learn-python/src/functions/test_function_documentation_string.py
│   │       │   ├── ./python-prac/learn-python/src/functions/test_function_keyword_arguments.py
│   │       │   ├── ./python-prac/learn-python/src/functions/test_function_scopes.py
│   │       │   ├── ./python-prac/learn-python/src/functions/test_function_unpacking_arguments.py
│   │       │   └── ./python-prac/learn-python/src/functions/test_lambda_expressions.py
│   │       ├── ./python-prac/learn-python/src/getting_started
│   │       │   ├── ./python-prac/learn-python/src/getting_started/index.html
│   │       │   ├── ./python-prac/learn-python/src/getting_started/index.md
│   │       │   ├── ./python-prac/learn-python/src/getting_started/python_syntax.html
│   │       │   ├── ./python-prac/learn-python/src/getting_started/python_syntax.md
│   │       │   ├── ./python-prac/learn-python/src/getting_started/test_variables.py
│   │       │   ├── ./python-prac/learn-python/src/getting_started/what_is_python.html
│   │       │   └── ./python-prac/learn-python/src/getting_started/what_is_python.md
│   │       ├── ./python-prac/learn-python/src/index.html
│   │       ├── ./python-prac/learn-python/src/index.md
│   │       └── ./python-prac/learn-python/src/modules
│   │           ├── ./python-prac/learn-python/src/modules/fibonacci_module.py
│   │           ├── ./python-prac/learn-python/src/modules/index.html
│   │           └── ./python-prac/learn-python/src/modules/index.md
│   ├── ./python-prac/learn-python3
│   │   ├── ./python-prac/learn-python3/advance
│   │   │   ├── ./python-prac/learn-python3/advance/do_generator.py
│   │   │   ├── ./python-prac/learn-python3/advance/do_iter.py
│   │   │   ├── ./python-prac/learn-python3/advance/do_listcompr.py
│   │   │   ├── ./python-prac/learn-python3/advance/do_slice.py
│   │   │   ├── ./python-prac/learn-python3/advance/do_yield.py
│   │   │   ├── ./python-prac/learn-python3/advance/index.html
│   │   │   ├── ./python-prac/learn-python3/advance/index.md
│   │   │   ├── ./python-prac/learn-python3/advance/right.html
│   │   │   └── ./python-prac/learn-python3/advance/right.md
│   │   ├── ./python-prac/learn-python3/async
│   │   │   ├── ./python-prac/learn-python3/async/aio_web.py
│   │   │   ├── ./python-prac/learn-python3/async/async_hello.py
│   │   │   ├── ./python-prac/learn-python3/async/async_hello2.py
│   │   │   ├── ./python-prac/learn-python3/async/async_wget.py
│   │   │   ├── ./python-prac/learn-python3/async/async_wget2.py
│   │   │   ├── ./python-prac/learn-python3/async/coroutine.py
│   │   │   ├── ./python-prac/learn-python3/async/index.html
│   │   │   ├── ./python-prac/learn-python3/async/index.md
│   │   │   ├── ./python-prac/learn-python3/async/right.html
│   │   │   └── ./python-prac/learn-python3/async/right.md
│   │   ├── ./python-prac/learn-python3/basic
│   │   │   ├── ./python-prac/learn-python3/basic/do_for.py
│   │   │   ├── ./python-prac/learn-python3/basic/do_if.py
│   │   │   ├── ./python-prac/learn-python3/basic/do_input.py
│   │   │   ├── ./python-prac/learn-python3/basic/do_print.py
│   │   │   ├── ./python-prac/learn-python3/basic/do_while.py
│   │   │   ├── ./python-prac/learn-python3/basic/hello.py
│   │   │   ├── ./python-prac/learn-python3/basic/index.html
│   │   │   ├── ./python-prac/learn-python3/basic/index.md
│   │   │   ├── ./python-prac/learn-python3/basic/right.html
│   │   │   ├── ./python-prac/learn-python3/basic/right.md
│   │   │   ├── ./python-prac/learn-python3/basic/the_dict.py
│   │   │   ├── ./python-prac/learn-python3/basic/the_list.py
│   │   │   ├── ./python-prac/learn-python3/basic/the_set.py
│   │   │   ├── ./python-prac/learn-python3/basic/the_string.py
│   │   │   └── ./python-prac/learn-python3/basic/the_tuple.py
│   │   ├── ./python-prac/learn-python3/commonlib
│   │   │   ├── ./python-prac/learn-python3/commonlib/check_bmp.py
│   │   │   ├── ./python-prac/learn-python3/commonlib/do_base64.py
│   │   │   ├── ./python-prac/learn-python3/commonlib/index.html
│   │   │   ├── ./python-prac/learn-python3/commonlib/index.md
│   │   │   ├── ./python-prac/learn-python3/commonlib/right.html
│   │   │   ├── ./python-prac/learn-python3/commonlib/right.md
│   │   │   ├── ./python-prac/learn-python3/commonlib/use_chainmap.py
│   │   │   ├── ./python-prac/learn-python3/commonlib/use_collections.py
│   │   │   ├── ./python-prac/learn-python3/commonlib/use_datetime.py
│   │   │   ├── ./python-prac/learn-python3/commonlib/use_hashlib.py
│   │   │   ├── ./python-prac/learn-python3/commonlib/use_htmlparser.py
│   │   │   ├── ./python-prac/learn-python3/commonlib/use_itertools.py
│   │   │   ├── ./python-prac/learn-python3/commonlib/use_sax.py
│   │   │   └── ./python-prac/learn-python3/commonlib/use_urllib.py
│   │   ├── ./python-prac/learn-python3/context
│   │   │   ├── ./python-prac/learn-python3/context/do_closing.py
│   │   │   ├── ./python-prac/learn-python3/context/do_suppress.py
│   │   │   ├── ./python-prac/learn-python3/context/do_with.py
│   │   │   ├── ./python-prac/learn-python3/context/index.html
│   │   │   ├── ./python-prac/learn-python3/context/index.md
│   │   │   ├── ./python-prac/learn-python3/context/right.html
│   │   │   └── ./python-prac/learn-python3/context/right.md
│   │   ├── ./python-prac/learn-python3/db
│   │   │   ├── ./python-prac/learn-python3/db/do_mysql.py
│   │   │   ├── ./python-prac/learn-python3/db/do_sqlalchemy.py
│   │   │   ├── ./python-prac/learn-python3/db/do_sqlite.py
│   │   │   ├── ./python-prac/learn-python3/db/index.html
│   │   │   ├── ./python-prac/learn-python3/db/index.md
│   │   │   ├── ./python-prac/learn-python3/db/right.html
│   │   │   └── ./python-prac/learn-python3/db/right.md
│   │   ├── ./python-prac/learn-python3/debug
│   │   │   ├── ./python-prac/learn-python3/debug/do_assert.py
│   │   │   ├── ./python-prac/learn-python3/debug/do_logging.py
│   │   │   ├── ./python-prac/learn-python3/debug/do_pdb.py
│   │   │   ├── ./python-prac/learn-python3/debug/do_try.py
│   │   │   ├── ./python-prac/learn-python3/debug/err.py
│   │   │   ├── ./python-prac/learn-python3/debug/err_logging.py
│   │   │   ├── ./python-prac/learn-python3/debug/err_raise.py
│   │   │   ├── ./python-prac/learn-python3/debug/err_reraise.py
│   │   │   ├── ./python-prac/learn-python3/debug/index.html
│   │   │   ├── ./python-prac/learn-python3/debug/index.md
│   │   │   ├── ./python-prac/learn-python3/debug/mydict.py
│   │   │   ├── ./python-prac/learn-python3/debug/mydict2.py
│   │   │   ├── ./python-prac/learn-python3/debug/mydict_test.py
│   │   │   ├── ./python-prac/learn-python3/debug/right.html
│   │   │   └── ./python-prac/learn-python3/debug/right.md
│   │   ├── ./python-prac/learn-python3/function
│   │   │   ├── ./python-prac/learn-python3/function/call_func.py
│   │   │   ├── ./python-prac/learn-python3/function/def_func.py
│   │   │   ├── ./python-prac/learn-python3/function/index.html
│   │   │   ├── ./python-prac/learn-python3/function/index.md
│   │   │   ├── ./python-prac/learn-python3/function/kw_args.py
│   │   │   ├── ./python-prac/learn-python3/function/recur.py
│   │   │   ├── ./python-prac/learn-python3/function/right.html
│   │   │   ├── ./python-prac/learn-python3/function/right.md
│   │   │   └── ./python-prac/learn-python3/function/var_args.py
│   │   ├── ./python-prac/learn-python3/functional
│   │   │   ├── ./python-prac/learn-python3/functional/decorator.py
│   │   │   ├── ./python-prac/learn-python3/functional/do_filter.py
│   │   │   ├── ./python-prac/learn-python3/functional/do_map.py
│   │   │   ├── ./python-prac/learn-python3/functional/do_partial.py
│   │   │   ├── ./python-prac/learn-python3/functional/do_reduce.py
│   │   │   ├── ./python-prac/learn-python3/functional/do_sorted.py
│   │   │   ├── ./python-prac/learn-python3/functional/index.html
│   │   │   ├── ./python-prac/learn-python3/functional/index.md
│   │   │   ├── ./python-prac/learn-python3/functional/prime_numbers.py
│   │   │   ├── ./python-prac/learn-python3/functional/return_func.py
│   │   │   ├── ./python-prac/learn-python3/functional/right.html
│   │   │   └── ./python-prac/learn-python3/functional/right.md
│   │   ├── ./python-prac/learn-python3/gui
│   │   │   ├── ./python-prac/learn-python3/gui/hello_gui.py
│   │   │   ├── ./python-prac/learn-python3/gui/index.html
│   │   │   ├── ./python-prac/learn-python3/gui/index.md
│   │   │   ├── ./python-prac/learn-python3/gui/right.html
│   │   │   ├── ./python-prac/learn-python3/gui/right.md
│   │   │   └── ./python-prac/learn-python3/gui/turtle
│   │   │       ├── ./python-prac/learn-python3/gui/turtle/index.html
│   │   │       ├── ./python-prac/learn-python3/gui/turtle/index.md
│   │   │       ├── ./python-prac/learn-python3/gui/turtle/rect.py
│   │   │       ├── ./python-prac/learn-python3/gui/turtle/right.html
│   │   │       ├── ./python-prac/learn-python3/gui/turtle/right.md
│   │   │       ├── ./python-prac/learn-python3/gui/turtle/stars.py
│   │   │       └── ./python-prac/learn-python3/gui/turtle/tree.py
│   │   ├── ./python-prac/learn-python3/index.html
│   │   ├── ./python-prac/learn-python3/index.md
│   │   ├── ./python-prac/learn-python3/io
│   │   │   ├── ./python-prac/learn-python3/io/do_bytesio.py
│   │   │   ├── ./python-prac/learn-python3/io/do_dir.py
│   │   │   ├── ./python-prac/learn-python3/io/do_stringio.py
│   │   │   ├── ./python-prac/learn-python3/io/index.html
│   │   │   ├── ./python-prac/learn-python3/io/index.md
│   │   │   ├── ./python-prac/learn-python3/io/right.html
│   │   │   ├── ./python-prac/learn-python3/io/right.md
│   │   │   ├── ./python-prac/learn-python3/io/use_json.py
│   │   │   ├── ./python-prac/learn-python3/io/use_pickle.py
│   │   │   └── ./python-prac/learn-python3/io/with_file.py
│   │   ├── ./python-prac/learn-python3/mail
│   │   │   ├── ./python-prac/learn-python3/mail/fetch_mail.py
│   │   │   ├── ./python-prac/learn-python3/mail/index.html
│   │   │   ├── ./python-prac/learn-python3/mail/index.md
│   │   │   ├── ./python-prac/learn-python3/mail/right.html
│   │   │   ├── ./python-prac/learn-python3/mail/right.md
│   │   │   └── ./python-prac/learn-python3/mail/send_mail.py
│   │   ├── ./python-prac/learn-python3/micropython
│   │   │   ├── ./python-prac/learn-python3/micropython/hellorobot
│   │   │   │   ├── ./python-prac/learn-python3/micropython/hellorobot/index.html
│   │   │   │   ├── ./python-prac/learn-python3/micropython/hellorobot/index.md
│   │   │   │   ├── ./python-prac/learn-python3/micropython/hellorobot/main.py
│   │   │   │   ├── ./python-prac/learn-python3/micropython/hellorobot/right.html
│   │   │   │   └── ./python-prac/learn-python3/micropython/hellorobot/right.md
│   │   │   ├── ./python-prac/learn-python3/micropython/index.html
│   │   │   ├── ./python-prac/learn-python3/micropython/index.md
│   │   │   ├── ./python-prac/learn-python3/micropython/rccar
│   │   │   │   ├── ./python-prac/learn-python3/micropython/rccar/devices.py
│   │   │   │   ├── ./python-prac/learn-python3/micropython/rccar/index.html
│   │   │   │   ├── ./python-prac/learn-python3/micropython/rccar/index.md
│   │   │   │   ├── ./python-prac/learn-python3/micropython/rccar/main.py
│   │   │   │   ├── ./python-prac/learn-python3/micropython/rccar/right.html
│   │   │   │   └── ./python-prac/learn-python3/micropython/rccar/right.md
│   │   │   ├── ./python-prac/learn-python3/micropython/right.html
│   │   │   ├── ./python-prac/learn-python3/micropython/right.md
│   │   │   ├── ./python-prac/learn-python3/micropython/smallcar
│   │   │   │   ├── ./python-prac/learn-python3/micropython/smallcar/index.html
│   │   │   │   ├── ./python-prac/learn-python3/micropython/smallcar/index.md
│   │   │   │   ├── ./python-prac/learn-python3/micropython/smallcar/main.py
│   │   │   │   ├── ./python-prac/learn-python3/micropython/smallcar/right.html
│   │   │   │   └── ./python-prac/learn-python3/micropython/smallcar/right.md
│   │   │   └── ./python-prac/learn-python3/micropython/tank
│   │   │       ├── ./python-prac/learn-python3/micropython/tank/cannon.wav
│   │   │       ├── ./python-prac/learn-python3/micropython/tank/devices.py
│   │   │       ├── ./python-prac/learn-python3/micropython/tank/index.html
│   │   │       ├── ./python-prac/learn-python3/micropython/tank/index.md
│   │   │       ├── ./python-prac/learn-python3/micropython/tank/joystick.py
│   │   │       ├── ./python-prac/learn-python3/micropython/tank/main.py
│   │   │       ├── ./python-prac/learn-python3/micropython/tank/right.html
│   │   │       └── ./python-prac/learn-python3/micropython/tank/right.md
│   │   ├── ./python-prac/learn-python3/module
│   │   │   ├── ./python-prac/learn-python3/module/hello.py
│   │   │   ├── ./python-prac/learn-python3/module/index.html
│   │   │   ├── ./python-prac/learn-python3/module/index.md
│   │   │   ├── ./python-prac/learn-python3/module/right.html
│   │   │   └── ./python-prac/learn-python3/module/right.md
│   │   ├── ./python-prac/learn-python3/multitask
│   │   │   ├── ./python-prac/learn-python3/multitask/do_folk.py
│   │   │   ├── ./python-prac/learn-python3/multitask/do_lock.py
│   │   │   ├── ./python-prac/learn-python3/multitask/do_queue.py
│   │   │   ├── ./python-prac/learn-python3/multitask/do_subprocess.py
│   │   │   ├── ./python-prac/learn-python3/multitask/index.html
│   │   │   ├── ./python-prac/learn-python3/multitask/index.md
│   │   │   ├── ./python-prac/learn-python3/multitask/multi_processing.py
│   │   │   ├── ./python-prac/learn-python3/multitask/multi_threading.py
│   │   │   ├── ./python-prac/learn-python3/multitask/pooled_processing.py
│   │   │   ├── ./python-prac/learn-python3/multitask/right.html
│   │   │   ├── ./python-prac/learn-python3/multitask/right.md
│   │   │   ├── ./python-prac/learn-python3/multitask/task_master.py
│   │   │   ├── ./python-prac/learn-python3/multitask/task_worker.py
│   │   │   └── ./python-prac/learn-python3/multitask/use_threadlocal.py
│   │   ├── ./python-prac/learn-python3/oop_advance
│   │   │   ├── ./python-prac/learn-python3/oop_advance/create_class_on_the_fly.py
│   │   │   ├── ./python-prac/learn-python3/oop_advance/index.html
│   │   │   ├── ./python-prac/learn-python3/oop_advance/index.md
│   │   │   ├── ./python-prac/learn-python3/oop_advance/orm.py
│   │   │   ├── ./python-prac/learn-python3/oop_advance/right.html
│   │   │   ├── ./python-prac/learn-python3/oop_advance/right.md
│   │   │   ├── ./python-prac/learn-python3/oop_advance/special_call.py
│   │   │   ├── ./python-prac/learn-python3/oop_advance/special_getattr.py
│   │   │   ├── ./python-prac/learn-python3/oop_advance/special_getitem.py
│   │   │   ├── ./python-prac/learn-python3/oop_advance/special_iter.py
│   │   │   ├── ./python-prac/learn-python3/oop_advance/special_str.py
│   │   │   ├── ./python-prac/learn-python3/oop_advance/use_enum.py
│   │   │   ├── ./python-prac/learn-python3/oop_advance/use_metaclass.py
│   │   │   ├── ./python-prac/learn-python3/oop_advance/use_property.py
│   │   │   └── ./python-prac/learn-python3/oop_advance/use_slots.py
│   │   ├── ./python-prac/learn-python3/oop_basic
│   │   │   ├── ./python-prac/learn-python3/oop_basic/animals.py
│   │   │   ├── ./python-prac/learn-python3/oop_basic/attrs.py
│   │   │   ├── ./python-prac/learn-python3/oop_basic/get_instance.py
│   │   │   ├── ./python-prac/learn-python3/oop_basic/get_type.py
│   │   │   ├── ./python-prac/learn-python3/oop_basic/index.html
│   │   │   ├── ./python-prac/learn-python3/oop_basic/index.md
│   │   │   ├── ./python-prac/learn-python3/oop_basic/protected_student.py
│   │   │   ├── ./python-prac/learn-python3/oop_basic/right.html
│   │   │   ├── ./python-prac/learn-python3/oop_basic/right.md
│   │   │   └── ./python-prac/learn-python3/oop_basic/student.py
│   │   ├── ./python-prac/learn-python3/regex
│   │   │   ├── ./python-prac/learn-python3/regex/index.html
│   │   │   ├── ./python-prac/learn-python3/regex/index.md
│   │   │   ├── ./python-prac/learn-python3/regex/regex.py
│   │   │   ├── ./python-prac/learn-python3/regex/right.html
│   │   │   └── ./python-prac/learn-python3/regex/right.md
│   │   ├── ./python-prac/learn-python3/right.html
│   │   ├── ./python-prac/learn-python3/right.md
│   │   ├── ./python-prac/learn-python3/socket
│   │   │   ├── ./python-prac/learn-python3/socket/do_tcp.py
│   │   │   ├── ./python-prac/learn-python3/socket/index.html
│   │   │   ├── ./python-prac/learn-python3/socket/index.md
│   │   │   ├── ./python-prac/learn-python3/socket/right.html
│   │   │   ├── ./python-prac/learn-python3/socket/right.md
│   │   │   ├── ./python-prac/learn-python3/socket/udp_client.py
│   │   │   └── ./python-prac/learn-python3/socket/udp_server.py
│   │   ├── ./python-prac/learn-python3/test
│   │   │   ├── ./python-prac/learn-python3/test/dict_doctest.py
│   │   │   ├── ./python-prac/learn-python3/test/dict_unittest.py
│   │   │   ├── ./python-prac/learn-python3/test/index.html
│   │   │   ├── ./python-prac/learn-python3/test/index.md
│   │   │   ├── ./python-prac/learn-python3/test/right.html
│   │   │   └── ./python-prac/learn-python3/test/right.md
│   │   └── ./python-prac/learn-python3/web
│   │       ├── ./python-prac/learn-python3/web/do_flask.py
│   │       ├── ./python-prac/learn-python3/web/do_wsgi.py
│   │       ├── ./python-prac/learn-python3/web/hello.py
│   │       ├── ./python-prac/learn-python3/web/index.html
│   │       ├── ./python-prac/learn-python3/web/index.md
│   │       ├── ./python-prac/learn-python3/web/mvc
│   │       │   ├── ./python-prac/learn-python3/web/mvc/app.py
│   │       │   ├── ./python-prac/learn-python3/web/mvc/index.html
│   │       │   ├── ./python-prac/learn-python3/web/mvc/index.md
│   │       │   ├── ./python-prac/learn-python3/web/mvc/right.html
│   │       │   ├── ./python-prac/learn-python3/web/mvc/right.md
│   │       │   └── ./python-prac/learn-python3/web/mvc/templates
│   │       │       ├── ./python-prac/learn-python3/web/mvc/templates/form.html
│   │       │       ├── ./python-prac/learn-python3/web/mvc/templates/form.md
│   │       │       ├── ./python-prac/learn-python3/web/mvc/templates/home.html
│   │       │       ├── ./python-prac/learn-python3/web/mvc/templates/home.md
│   │       │       ├── ./python-prac/learn-python3/web/mvc/templates/index.html
│   │       │       ├── ./python-prac/learn-python3/web/mvc/templates/index.md
│   │       │       ├── ./python-prac/learn-python3/web/mvc/templates/right.html
│   │       │       ├── ./python-prac/learn-python3/web/mvc/templates/right.md
│   │       │       ├── ./python-prac/learn-python3/web/mvc/templates/signin-ok.html
│   │       │       └── ./python-prac/learn-python3/web/mvc/templates/signin-ok.md
│   │       ├── ./python-prac/learn-python3/web/right.html
│   │       └── ./python-prac/learn-python3/web/right.md
│   ├── ./python-prac/leetcode
│   │   ├── ./python-prac/leetcode/Add_Binary.py
│   │   ├── ./python-prac/leetcode/Add_Strings.py
│   │   ├── ./python-prac/leetcode/Add_Two_LinkedList_without_reverse.py
│   │   ├── ./python-prac/leetcode/Add_Two_Linked_List_Reverse.py
│   │   ├── ./python-prac/leetcode/Backspace_String_compare.py
│   │   ├── ./python-prac/leetcode/Balanced_Binary_Tree.py
│   │   ├── ./python-prac/leetcode/Best_Time_to_Buy_and_Sell_Stock.py
│   │   ├── ./python-prac/leetcode/Binary_Search_Tree_Construction.py
│   │   ├── ./python-prac/leetcode/Binary_Tree_Inorder_Traversal.py
│   │   ├── ./python-prac/leetcode/Binary_Tree_Level_Order_Traversal.py
│   │   ├── ./python-prac/leetcode/Binary_Tree_Longest_Consecutive_Sequence.py
│   │   ├── ./python-prac/leetcode/Binary_tree Paths.py
│   │   ├── ./python-prac/leetcode/Bulls_and_Cows.py
│   │   ├── ./python-prac/leetcode/Check If a Number Is Majority Element in a Sorted Array.py
│   │   ├── ./python-prac/leetcode/Climbing_Stairs.py
│   │   ├── ./python-prac/leetcode/Clone_Binary_Tree.py
│   │   ├── ./python-prac/leetcode/Compare_strings_frequency.py
│   │   ├── ./python-prac/leetcode/Contains_Duplicate_II.py
│   │   ├── ./python-prac/leetcode/Convert_Sorted_Array_to_Binary_Search_Tree.py
│   │   ├── ./python-prac/leetcode/Convert_Sorted_List_to_Binary_Search_Tree.py
│   │   ├── ./python-prac/leetcode/Delete_Elements_LinkedList.py
│   │   ├── ./python-prac/leetcode/Delete_Node_Linked_List.py
│   │   ├── ./python-prac/leetcode/Design_Compressed_String_Iterator.py
│   │   ├── ./python-prac/leetcode/Design_Linked_List.py
│   │   ├── ./python-prac/leetcode/Design_Phone_Directory.py
│   │   ├── ./python-prac/leetcode/Determine_Cycle_LinkedList.py
│   │   ├── ./python-prac/leetcode/Display_Directory.py
│   │   ├── ./python-prac/leetcode/Excel_Sheet_Column_Number.py
│   │   ├── ./python-prac/leetcode/Excel_Sheet_Column_Title.py
│   │   ├── ./python-prac/leetcode/Fibonacci_Number.py
│   │   ├── ./python-prac/leetcode/Find_Difference_Two_String.py
│   │   ├── ./python-prac/leetcode/Find_Maximum_Time.py
│   │   ├── ./python-prac/leetcode/Find_the_nonduplicate_number.py
│   │   ├── ./python-prac/leetcode/First_Missing_Positive.py
│   │   ├── ./python-prac/leetcode/First_Unique_Character.py
│   │   ├── ./python-prac/leetcode/Flip_Game.py
│   │   ├── ./python-prac/leetcode/Fruit_Into_Basked.py
│   │   ├── ./python-prac/leetcode/Generate_Parenthesis.py
│   │   ├── ./python-prac/leetcode/Group_Anagrams.py
│   │   ├── ./python-prac/leetcode/Guess_Number_Higher_Lower.py
│   │   ├── ./python-prac/leetcode/Happy_Number.py
│   │   ├── ./python-prac/leetcode/Heaters.py
│   │   ├── ./python-prac/leetcode/House_Robber.py
│   │   ├── ./python-prac/leetcode/Inorder_Successor.py
│   │   ├── ./python-prac/leetcode/Insert_Sorted_Linked_List.py
│   │   ├── ./python-prac/leetcode/Intersection_of_Two_LinkedList.py
│   │   ├── ./python-prac/leetcode/Intersection_of_two_array.py
│   │   ├── ./python-prac/leetcode/Invert_Binary_Tree.py
│   │   ├── ./python-prac/leetcode/Is_Subsequence.py
│   │   ├── ./python-prac/leetcode/Island_Perimeter.py
│   │   ├── ./python-prac/leetcode/Isomorphic String.py
│   │   ├── ./python-prac/leetcode/K_closest_points_to_Origin.py
│   │   ├── ./python-prac/leetcode/Kth_Largest_Array_Quick_Select.py
│   │   ├── ./python-prac/leetcode/Largest_Number.py
│   │   ├── ./python-prac/leetcode/License_Key_Formatting.py
│   │   ├── ./python-prac/leetcode/Linked_List.py
│   │   ├── ./python-prac/leetcode/Log_Rate_Limiter.py
│   │   ├── ./python-prac/leetcode/Longest Common Prefix.py
│   │   ├── ./python-prac/leetcode/Longest_File_Path.py
│   │   ├── ./python-prac/leetcode/Longest_Palindrome.py
│   │   ├── ./python-prac/leetcode/Longest_Palindromic_Substring.py
│   │   ├── ./python-prac/leetcode/Longest_Sequence_With_Two_Unique_Number.py
│   │   ├── ./python-prac/leetcode/Longest_Substring_Without_repeating_Character.py
│   │   ├── ./python-prac/leetcode/Longest_Substring_with_At_Most_K_Distinct_Characters.py
│   │   ├── ./python-prac/leetcode/Longest_Substring_with_At_Most_Two_Distinct_Characters.py
│   │   ├── ./python-prac/leetcode/Lowest_Common_Ancestor_of_a_Binary_Search_Tree.py
│   │   ├── ./python-prac/leetcode/Majority_Element.py
│   │   ├── ./python-prac/leetcode/Maximize_Distance_to_Closest_Person.py
│   │   ├── ./python-prac/leetcode/Maximum_Depth_Binary_Tree_Iterative.py
│   │   ├── ./python-prac/leetcode/Maximum_Depth_of_Binary_Tree.py
│   │   ├── ./python-prac/leetcode/Maximum_Depth_of_N-ary_Tree.py
│   │   ├── ./python-prac/leetcode/Maximum_Level_Sum_of_a_Binary_Tree.py
│   │   ├── ./python-prac/leetcode/Maximum_Size_Subarray_Sum_Equals_k.py
│   │   ├── ./python-prac/leetcode/Maximum_Stack.py
│   │   ├── ./python-prac/leetcode/Maximum_SubArray.py
│   │   ├── ./python-prac/leetcode/Median_of_Two_Sorted_Array.py
│   │   ├── ./python-prac/leetcode/Meeting_Rooma_2.py
│   │   ├── ./python-prac/leetcode/Meeting_Rooms.py
│   │   ├── ./python-prac/leetcode/Merge_Intervals.py
│   │   ├── ./python-prac/leetcode/Merge_List_Of_Number_Into_Ranges.py
│   │   ├── ./python-prac/leetcode/Merge_Two_Linked_List.py
│   │   ├── ./python-prac/leetcode/Merge_k_Sorted_Lists.py
│   │   ├── ./python-prac/leetcode/Min_Stack.py
│   │   ├── ./python-prac/leetcode/Minimum_Days_To_Bloom.py
│   │   ├── ./python-prac/leetcode/Minimum_Domino_Rotations.py
│   │   ├── ./python-prac/leetcode/Minimum_Size_Subarray_Sum.py
│   │   ├── ./python-prac/leetcode/Missing_Number.py
│   │   ├── ./python-prac/leetcode/Most Common Word.py
│   │   ├── ./python-prac/leetcode/Most_Booked_Hotel_Room.py
│   │   ├── ./python-prac/leetcode/Move_Element_To_End.py
│   │   ├── ./python-prac/leetcode/Move_Zeros.py
│   │   ├── ./python-prac/leetcode/Moving_Average_from_data_Stream.py
│   │   ├── ./python-prac/leetcode/Number_of_Island.py
│   │   ├── ./python-prac/leetcode/Odd_Even_Linked_List.py
│   │   ├── ./python-prac/leetcode/Optimized_List_Sum.py
│   │   ├── ./python-prac/leetcode/Paint_Fence.py
│   │   ├── ./python-prac/leetcode/Palindrome.py
│   │   ├── ./python-prac/leetcode/Palindrome_Linked_List.py
│   │   ├── ./python-prac/leetcode/Palindrome_Permutation.py
│   │   ├── ./python-prac/leetcode/Peak_Index_in_a_Mountain_Array.py
│   │   ├── ./python-prac/leetcode/Product_Sum.py
│   │   ├── ./python-prac/leetcode/Push_Dominoes.py
│   │   ├── ./python-prac/leetcode/Queue_Reconstruction_by_Height.py
│   │   ├── ./python-prac/leetcode/Queue_Using_Stack.py
│   │   ├── ./python-prac/leetcode/Quick_Select.py
│   │   ├── ./python-prac/leetcode/README.html
│   │   ├── ./python-prac/leetcode/README.md
│   │   ├── ./python-prac/leetcode/Ransom Note.py
│   │   ├── ./python-prac/leetcode/Remove_Duplicates_Linked_List.py
│   │   ├── ./python-prac/leetcode/Remove_Duplicates_from_Sorted_List_II.py
│   │   ├── ./python-prac/leetcode/Remove_Zero_Sum_Consecutive_Nodes_from_Linked_List.py
│   │   ├── ./python-prac/leetcode/Repeated_String_Match.py
│   │   ├── ./python-prac/leetcode/Reverse String.py
│   │   ├── ./python-prac/leetcode/Reverse_Vowels_of_a_String.py
│   │   ├── ./python-prac/leetcode/Reverse_Words_String.py
│   │   ├── ./python-prac/leetcode/Roman_To_Int.py
│   │   ├── ./python-prac/leetcode/Rotate_Linked_List.py
│   │   ├── ./python-prac/leetcode/Same_Tree.py
│   │   ├── ./python-prac/leetcode/Sentence_Similarity.py
│   │   ├── ./python-prac/leetcode/Single_Number.py
│   │   ├── ./python-prac/leetcode/Single_Row_Keyboard.py
│   │   ├── ./python-prac/leetcode/Sliding_Window_maximum.py
│   │   ├── ./python-prac/leetcode/Sort_Three_Colors.py
│   │   ├── ./python-prac/leetcode/Sort_an_Array.py
│   │   ├── ./python-prac/leetcode/Squares_of_a_Sorted_Array.py
│   │   ├── ./python-prac/leetcode/String_Compression.py
│   │   ├── ./python-prac/leetcode/Strobogrammatic_Number.py
│   │   ├── ./python-prac/leetcode/Student_Attendance_Record_I.py
│   │   ├── ./python-prac/leetcode/Subarray_Sum_K.py
│   │   ├── ./python-prac/leetcode/Subtree_of_another_Tree.py
│   │   ├── ./python-prac/leetcode/Suffix_Trie_Construction.py
│   │   ├── ./python-prac/leetcode/Sum_of_left_leaves.py
│   │   ├── ./python-prac/leetcode/Sum_of_two_nums.py
│   │   ├── ./python-prac/leetcode/Symmetric_Tree.py
│   │   ├── ./python-prac/leetcode/Three_Sum.py
│   │   ├── ./python-prac/leetcode/Toeplitz_Matrix.py
│   │   ├── ./python-prac/leetcode/Top_K_Frequent_element.py
│   │   ├── ./python-prac/leetcode/Traversing2_parallel_trees.py
│   │   ├── ./python-prac/leetcode/Tree_Serialization_DeSerialization.py
│   │   ├── ./python-prac/leetcode/Two_Sum_II_Input_array_is_sorted.py
│   │   ├── ./python-prac/leetcode/Two_Sum_IV_Input_is_a_BST.py
│   │   ├── ./python-prac/leetcode/Unique_email_Addresses.py
│   │   ├── ./python-prac/leetcode/Unique_paths.py
│   │   ├── ./python-prac/leetcode/Valid_Anagram.py
│   │   ├── ./python-prac/leetcode/Valid_parentheses.py
│   │   ├── ./python-prac/leetcode/Validate Binary Search Tree.py
│   │   ├── ./python-prac/leetcode/Watering_Flowers_2.py
│   │   ├── ./python-prac/leetcode/index.html
│   │   ├── ./python-prac/leetcode/index.md
│   │   └── ./python-prac/leetcode/kth_largest_in_unsorted_array.py
│   ├── ./python-prac/left.html
│   ├── ./python-prac/left.md
│   ├── ./python-prac/left.md.html
│   ├── ./python-prac/left.md.md
│   ├── ./python-prac/makefile
│   ├── ./python-prac/mini-scripts
│   │   ├── ./python-prac/mini-scripts/Array_Methods_append().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_append()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_clear().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_copy().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_count().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_count()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_extend().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_extend()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_index().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_index()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_insert().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_pop().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_pop()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_remove().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_reverse().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_sort().txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_sort()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_sort()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_sort()_4.txt.py
│   │   ├── ./python-prac/mini-scripts/Array_Methods_sort()_5.txt.py
│   │   ├── ./python-prac/mini-scripts/List_Items_-_Data_Types__1.txt.py
│   │   ├── ./python-prac/mini-scripts/List_Items_-_Data_Types__2.txt.py
│   │   ├── ./python-prac/mini-scripts/List_Items_-_Data_Types__3.txt.py
│   │   ├── ./python-prac/mini-scripts/List_Items_-_Data_Types__4.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Access_Dictionary_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Access_Dictionary_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Access_List.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Access_Set_Items_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Access_Set_Items_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Add_Dictionary.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Add_Set.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Change_Dictionary.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Change_List_insert_items.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Copy.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_(actal_value).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_(backslash).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_(backspace).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_(carriage_return).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_(hex_value).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_(new_line).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_(single_quote).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_(tap).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_backpase.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_backslash.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_carriage_return.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_hex_value.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_new_line.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_octal_value.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_singlr_quote.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Escape_Characters_tab.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Format_-_Strings_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Format_-_Strings_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Format_-_Strings_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Global_Variables_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Global_Variables_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Loop_Dictionaries_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Loop_Dictionaries_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Loop_Dictionaries_items().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Loop_Dictionaries_keys().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Loop_Sets.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Modify_Strings_(lower_case).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Modify_Strings_(upper_case).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Output_Variables_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Output_Variables_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Output_Variables_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Remove_Dictionary_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Remove_Set_Items.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_Slicing_Strings.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Concatenation_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Concatenation_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_capitalize()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_capitalize()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_casefold().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_center()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_center()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_count()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_count()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_encode()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_encode()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_endswith().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_endswith()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_endswith()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_expandtabs().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_find().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_String_Methods_format().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_clear_Dictionary.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_clear_Set_Items.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_delete_Dictionary.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_delete_Set_Items.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_discard_Set_Items.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_list.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_pop_Dictionary.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_pop_Set_Items.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_-_popitem_Dictionary.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(%=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(&=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(+=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(-=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(I=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(backslash_=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(double_backslash_=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(double_multible_=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(greterthe_=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(leesthen_=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(multible_=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Assignment_Operators_(up_=).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Booleans_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Booleans_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Casting_(float).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Casting_(int).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Casting_(str).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Comparison_Operators_(equal).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Comparison_Operators_(greater_then_).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Comparison_Operators_(greaterthen_or_equal).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Comparison_Operators_(lessthen_).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Comparison_Operators_(lessthen_not_equal).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Comparison_Operators_(not_equal).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Conditions_and_If_statements.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(bool).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(bytearray).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(bytes).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(complex).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(dict).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(float).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(frozenset).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(int).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(list).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(memoryview).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(range).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(set).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(str).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_(tuple).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_bool.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_bytearry.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_bytes.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_complex.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_dict.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_float.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_frozenset.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_int.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_list.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_memoryview.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_range.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_set.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_str.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Data_Types_tuple.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Dates.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_AM.PM.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_A_%_character.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_IOS_weekday.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_IOS_year.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_day_number_of_year.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_day_of_month.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_hour.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_hour_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_loca_version_of_time.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_local_version_daye_and_time.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_microsecond.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_minute.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_month_as_a_number.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_month_name_full.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_month_name_short.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Datetime_second.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_File_Open.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_File_Open_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_File_Write_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_File_Write_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_For_Loops.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Indentation_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Indentation_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Lambda_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Lambda_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Lambda_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Lambda_4.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Lambda_5.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Lambda_6.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Lists_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Lists_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Logical_Operators_(and).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Logical_Operators_(not).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Logical_Operators_(or).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Membership_Operators_(in).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Membership_Operators_(not_in).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Numbers.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Numbers_(complex)_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Numbers_(complex)_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Numbers_(float)_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Numbers_(float)_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Numbers_(int).txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx__sub_()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_match_object_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_metacharacters__a_set_of_cgaracter_[].txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_metacharacters__end_with.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_metacharacters__exactly_the_specifies_number_of_occurrences.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_metacharacters__nay_character_..txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_metacharacters__one_or_more_coourrences.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_metacharacters__signal_a_special_sequence_back_slash.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_metacharacters__starts_with.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_metacharacters__zero_or_more_occurrences.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_metacharacters_either_or.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_mutch_object_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_mutch_object_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_mutch_object_4.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_search_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_search_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_sets_[+].txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_sets_[0-5]_[0-9].txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_sets_[0-9].txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_sets_[0123].txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_sets_[a-n].txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_sets_[a-z_A-Z].txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_sets_[arn].txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_sets_[up_arn].txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash_A.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash_D.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash_Z.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash___B.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash___S.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash____W.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash___d.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash__d.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash__w.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash_b.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_special_sequences_backslash_s.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_split_()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_split_()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_RegEx_sub_()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Scope_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Scope_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_Formatting_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_Formatting_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_Formatting_index_number_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_Formatting_index_number_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_Formatting_multiple_value.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_Formatting_named_indexes.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_expandtabs()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()__2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()__3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_binary_format.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_center_aligns.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_decimal_format.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_fix_point_number_format.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_fixt_poit_number_format_upper_case.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_hex_format_lower_case.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_hex_format_upper_case.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_left_aligns.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_octal_format.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_percentage_format.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_places_the_sign_to_the_left_most_position.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_right_aligns.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_scientific_format.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_scientific_format_E.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_scientific_format_F.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_use_a_comma.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_use_a_minus.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_use_a_plus.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_use_a_undercore.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_format()_use_aspece.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_join()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_join()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_ljust()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_ljust()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_lower()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_lstrip().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_lstrip()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_lstrip()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_maketrans()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_maketrans()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_maketrans()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_maketrans()_4.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_partition()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_partition()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_replace()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_replace()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_replace()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rfind()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rfind()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rfind()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rfind()_4.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rindex()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rindex()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rindex()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rindex()_4.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rjust()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rjust()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rpartition()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rpartition()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rsplit()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rsplit()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rstrip()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_rstrip()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_split()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_split()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_split()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_split()_4.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_splitlines()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_splitlines()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_startswith()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_startswith()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_strip()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_strip()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_swapcase().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_title()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_title()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_title()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_translate()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_translate()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_translate()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_translate()_4.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_translate()_5.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_upper().txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_zfill()__1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_String_zfill()__2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Strings.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Tuple_count()_Method.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Tuple_index()_Method.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Tuples_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Tuples_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_User_Input_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_User_Input_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Variables_-_Many_Values_to_Multiple_Variables.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Variables_One_Value_to_Multiple_Variables.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Variables_Unpack_a_Collection.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Variables_case-sensitive.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Variables_casting_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Variables_casting_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Variables_create_1.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Variables_create_2.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_Variables_single_or_double_quotes.txt.py
│   │   ├── ./python-prac/mini-scripts/Python_random_Numbers.txt.py
│   │   ├── ./python-prac/mini-scripts/README.md.py
│   │   ├── ./python-prac/mini-scripts/RegEx_Functions_findall_()_1.txt.py
│   │   ├── ./python-prac/mini-scripts/RegEx_Functions_findall_()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/index.html
│   │   ├── ./python-prac/mini-scripts/index.md
│   │   ├── ./python-prac/mini-scripts/pythi_The_pass_Statement.txt.py
│   │   ├── ./python-prac/mini-scripts/pytho_Parse_JSON_-_Convert_from_JSON_to_Python.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Binomial_Distribution.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Built-in_Math_Functions_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Built-in_Math_Functions_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Built-in_Math_Functions_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Built-in_Modules.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Calling_a_Function.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Case_Insensitive_Sort_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Case_Insensitive_Sort_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Change_Item_Value.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Change_Tuple_Values.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Change_a_Range_of_Item_Values_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Change_a_Range_of_Item_Values_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Change_a_Range_of_Item_Values_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Change_a_Range_of_Item_Values_4.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_Number_of_Dimensions.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_String.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_String_if_statement.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_if_Item_Exists.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_if_Key_Exists.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_if_NOT.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_if_NOT__if_statement.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_if_a_Function_is_a_ufunc_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_if_a_Function_is_a_ufunc_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Check_if_a_Function_is_a_ufunc_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Chi_Square_Distribution.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Clear_the_List.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Convert_from_Python_to_JSON_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Convert_from_Python_to_JSON_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Convert_from_Python_to_JSON_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Copy_a_Dictionary.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_Object.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_Tuple_With_One_Item.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_Your_Own_ufunc.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_a_Child_Class.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_a_Class.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_a_Module.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_a_NumPy_ndarray_Object_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_a_NumPy_ndarray_Object_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_a_Parent_Class.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Create_an_Iterator.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Creating_Date_Objects.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Creating_Filter_Directly_From_Array_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Creating_Filter_Directly_From_Array_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Creating_the_Filter_Array_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Creating_the_Filter_Array_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Cummulative_Product.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Cummulative_Sum.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Customize_Sort_Function.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Date_Output.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Finding_GCD_(Greatest_Common_Denominator).txt.py
│   │   ├── ./python-prac/mini-scripts/python_Finding_GCD_in_Arrays.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Finding_LCM_(Lowest_Common_Multiple).txt.py
│   │   ├── ./python-prac/mini-scripts/python_Finding_LCM_in_Arrays_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Finding_LCM_in_Arrays__2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Flattening_the_arrays.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Format_the_Result_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Format_the_Result_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Functions_can_Return_a_Boolean_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Functions_can_Return_a_Boolean_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Functions_can_Return_a_Boolean_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Generate_Random_Array_floats_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Generate_Random_Array_floats_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Generate_Random_Array_integate_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Generate_Random_Array_integate_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Generate_Random_Float.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Generate_Random_Number.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Generate_Random_Number_From_Array_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Generate_Random_Number_From_Array_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Generating_Permutation_of_Arrays.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Get_Items_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Get_Items_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Get_Keys_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Get_Keys_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Get_Values_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Get_Values_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Get_the_Length_of_a_Set.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Global_Keyword_1_(2).txt.py
│   │   ├── ./python-prac/mini-scripts/python_Global_Keyword_2_(2).txt.py
│   │   ├── ./python-prac/mini-scripts/python_Global_Scope_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Global_Scope_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Higher_Dimensional_Arrays.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Hyperbolic_Functions_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Hyperbolic_Functions_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Hyperbolic_Functions_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Hypotenues.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Import_From_Module_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Import_From_Module_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Import_NumPy_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Import_NumPy_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Insert_Items.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterating_Array_With_Different_Data_Types.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterating_Arrays.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterating_Arrays_2-D_array_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterating_Arrays_2-D_array_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterating_Arrays_3-D_array_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterating_Arrays_3-D_array_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterating_Arrays_Using_nditer().txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterating_With_Different_Step_Size.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterator_vs_Iterable_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Iterator_vs_Iterable_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Join_Two_Lists_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Join_Two_Lists_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Join_Two_Lists__extend().txt.py
│   │   ├── ./python-prac/mini-scripts/python_Join_Two_Sets_union().txt.py
│   │   ├── ./python-prac/mini-scripts/python_Join_Two_Tuples.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Joining_NumPy_Arrays_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Joining_NumPy_Arrays_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Keep_All,_But_NOT_the_Duplicates_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Keep_All,_But_NOT_the_Duplicates_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Keep_ONLY_the_Duplicates_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Keep_ONLY_the_Duplicates_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Keyword_Arguments.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Length_of_an_Array.txt.py
│   │   ├── ./python-prac/mini-scripts/python_List_Comprehension_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_List_Comprehension_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_List_Length.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Log_at_Any_Base.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Log_at_Base_10.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Log_at_Base_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Logistic_Distribution.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Loop_Through_a_List.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Loop_Through_the_Index_Numbers.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Looping_Array_Elements.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Looping_Through_a_String.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Looping_Through_an_Iterator_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Looping_Through_an_Iterator_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Looping_Using_List_Comprehension.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Many_Exceptions.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Many_Exceptions_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Many_Exceptions_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Many_Exceptions_else.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Math_Module_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Math_Module_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Math_Module_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Modify_Object_Properties.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Most_Values_are_True_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Multiline_Strings_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Multiline_Strings_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Multinomial_Distribution.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Multiply_Tuples.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Natural_Log,_or_Log_at_Base_e.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Negative_Indexing.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Negative_Indexing_(2).txt.py
│   │   ├── ./python-prac/mini-scripts/python_Nested_Dictionaries_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Nested_Dictionaries_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Nested_If.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Normal_(Gaussian)_Distribution_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Normal_(Gaussian)_Distribution_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_Copy.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_Copy_and_View.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_Slicing_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_Slicing_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_Slicing_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array__View.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_negative_Slicing.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_negative_Slicing_(STEP)_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_negative_Slicing_(STEP)_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_negative_Slicing_(STEP)_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_negative_Slicing_(STEP)_4.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Array_negative_Slicing_(STEP)_5.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Data_Types_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Data_Types_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Data_Types_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Data_Types_4.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Data_Types_5.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Data_Types_6.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Data_Types_7.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Differences.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Differences_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Filter_Array.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Products_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Products_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Sorting_Arrays_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Sorting_Arrays_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Sorting_Arrays_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Summations_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_NumPy_Summations_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Number_of_Arguments.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Object_Methods.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Order_the_Result.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Pareto_Distribution.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Passing_a_List_as_an_Argument.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Poisson_Distribution.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Product_Over_an_Axis.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Raise_an_exception_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Raise_an_exception_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Random_Data_Distribution_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Random_Data_Distribution_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Random_Permutations_shuffling_array.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Range_of_Indexes_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Range_of_Indexes_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Range_of_Indexes_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Range_of_Negative_Indexes.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Rayleigh_Distribution.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Re-naming_a_Module.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Read_Only_Parts_of_the_File.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Recursion.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Remove_Items.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Remove_Specified_Index_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Remove_Specified_Index_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Remove_Specified_Index_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Remove_Specified_Index_4.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Remove_Specified_Item.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Remove_Whitespace.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Removing_Array_Elements.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Removing_Array_Elements_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Replace_String.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Reshape_From_1-D_to_2-D.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Reshape_From_1-D_to_3-D.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Return_Values.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Returns_Copy_or_View.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Reverse_Order.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Rounding_Decimals__ceil.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Rounding_Decimals__fix.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Rounding_Decimals__floor.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Rounding_Decimals_rounding.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Rounding_Decimals_truncation_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Seaborn_plotting_a_displot.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Search_From_the_Right_Side.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Search_Sorted_array.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Searching_Arrays_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Searching_Arrays_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Searching_Arrays_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Searching_Arrays_multple_values.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Set_Items_-_Data_Types_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Set_Items_-_Data_Types_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Set_Items_-_Data_Types_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__bool.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__bytearray.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__bytes.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__complex.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__dict.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__float.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__frozenset.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__int.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__list.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__memoryview.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__range.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__set.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__str.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Setting_the_Specific_Data_Type__tuple.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Shape_of_an_Array_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Shape_of_an_Array_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Short_Hand_If.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Short_Hand_If_..._Else_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Short_Hand_If_..._Else_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Simple_Arithmetic_absolute_values.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Simple_Arithmetic_addition.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Simple_Arithmetic_division.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Simple_Arithmetic_multiplication.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Simple_Arithmetic_power.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Simple_Arithmetic_quotient_and_mod.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Simple_Arithmetic_remander.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Simple_Arithmetic_remander_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Simple_Arithmetic_subtraction.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Slice_From_the_Start.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Slice_To_the_End.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Some_Values_are_False_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Some_Values_are_False_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Sort_Descending_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Sort_Descending_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Sort_List_Alphanumerically_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Sort_List_Alphanumerically_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Sorting_a_2-D_Array.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Split_Into_Arrays.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Split_String.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Splitting_2-D_Arrays_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Splitting_2-D_Arrays_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Splitting_2-D_Arrays_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Splitting_2-D_Arrays_4.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Splitting_NumPy_Arrays_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Splitting_NumPy_Arrays_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Stacking_Along_Columns.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Stacking_Along_Height_(depth).txt.py
│   │   ├── ./python-prac/mini-scripts/python_Stacking_Along_Rows.txt.py
│   │   ├── ./python-prac/mini-scripts/python_StopIteration.txt.py
│   │   ├── ./python-prac/mini-scripts/python_String_Length.txt.py
│   │   ├── ./python-prac/mini-scripts/python_String_to_a_Variable.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Strings_are_Arrays.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Summation_Over_an_Axis.txt.py
│   │   ├── ./python-prac/mini-scripts/python_The_Syntax_condition_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_The_Syntax_condition_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_The_set()_Constructor.txt.py
│   │   ├── ./python-prac/mini-scripts/python_The_strftime()_Method.txt.py
│   │   ├── ./python-prac/mini-scripts/python_The_tuple()_Constructor.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Trigonometric_Functions_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Trigonometric_Functions_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Tuple_Items_-_Data_Types_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Tuple_Items_-_Data_Types_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Tuple_Items_-_Data_Types_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Tuple_Length.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Uniform_Distribution.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Unknown_Dimension.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Unpacking_a_Tuple_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Unpacking_a_Tuple_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Use_a_Module.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Use_the_super()_Function.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Using_Asterix_(multible)_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Using_Asterix_(multible)_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Using_a_While_Loop.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Using_a_While_Loop_(2).txt.py
│   │   ├── ./python-prac/mini-scripts/python_Using_the_dir()_Function.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Variables_in_Module_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Variables_in_Module_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_Zipf_Distribution.txt.py
│   │   ├── ./python-prac/mini-scripts/python_class_and_object_pass_Statement.txt.py
│   │   ├── ./python-prac/mini-scripts/python_create_a_set.txt.py
│   │   ├── ./python-prac/mini-scripts/python_for_Looping_Through_a_String.txt.py
│   │   ├── ./python-prac/mini-scripts/python_for_loop_Nested_Loops.txt.py
│   │   ├── ./python-prac/mini-scripts/python_for_loop__break_Statement.txt.py
│   │   ├── ./python-prac/mini-scripts/python_for_loop__break_Statement_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_for_loop_continue_Statement.txt.py
│   │   ├── ./python-prac/mini-scripts/python_for_loop_pass_Statement.txt.py
│   │   ├── ./python-prac/mini-scripts/python_for_loop_range()_Function_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_for_loop_range()_Function_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_for_loop_range()_Function_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_function_pass_Statement.txt.py
│   │   ├── ./python-prac/mini-scripts/python_global_Keyword_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_global_Keyword_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_hello_world.txt.py
│   │   ├── ./python-prac/mini-scripts/python_join_two_sets_update().txt.py
│   │   ├── ./python-prac/mini-scripts/python_method_find()_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_method_find()_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_method_find()_4.txt.py
│   │   ├── ./python-prac/mini-scripts/python_multe_line_comment.txt.py
│   │   ├── ./python-prac/mini-scripts/python_negative_indexing_Access_Array_Elements.txt.py
│   │   ├── ./python-prac/mini-scripts/python_numpy_Access_Array_Elements_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_numpy_Access_Array_Elements_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_numpy_Access_Array_Elements_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_numpy_Access_Array_Elements__2-D_array_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_numpy_Access_Array_Elements__2-D_array_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_numpy_Access_Array_Elements__3-D_array_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_numpy_ufuncs_Vectorization1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_numpy_ufuncs_Vectorization2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_or.txt.py
│   │   ├── ./python-prac/mini-scripts/python_seaborn_Plotting_a_Distplot_Without_the_Histogram.txt.py
│   │   ├── ./python-prac/mini-scripts/python_self_Parameter.txt.py
│   │   ├── ./python-prac/mini-scripts/python_set_Duplicates_Not_Allowed.txt.py
│   │   ├── ./python-prac/mini-scripts/python_single_line_comment_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_single_line_comment_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_the_syntax_expression_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_the_syntax_expression_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_the_syntax_expression_3.txt.py
│   │   ├── ./python-prac/mini-scripts/python_the_sysntax_iterable.txt.py
│   │   ├── ./python-prac/mini-scripts/python_the_sysntax_iterable_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_using_a_for_loop_1.txt.py
│   │   ├── ./python-prac/mini-scripts/python_using_a_for_loop_2.txt.py
│   │   ├── ./python-prac/mini-scripts/python_v.txt.py
│   │   ├── ./python-prac/mini-scripts/python_while_Loop.txt.py
│   │   ├── ./python-prac/mini-scripts/python_while_loop_break_Statement.txt.py
│   │   ├── ./python-prac/mini-scripts/python_while_loop_continue_Statement.txt.py
│   │   └── ./python-prac/mini-scripts/python_while_loop_else_Statement.txt.py
│   ├── ./python-prac/package-lock.json
│   ├── ./python-prac/package.json
│   ├── ./python-prac/prac-4-beginners
│   │   ├── ./python-prac/prac-4-beginners/code
│   │   │   ├── ./python-prac/prac-4-beginners/code/05-interactive-code
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/05-interactive-code/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/05-interactive-code/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/05-interactive-code/m-n-m
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/code/05-interactive-code/m-n-m/guessinggame.py
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/code/05-interactive-code/m-n-m/index.html
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/code/05-interactive-code/m-n-m/index.md
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/code/05-interactive-code/m-n-m/right.html
│   │   │   │   │   └── ./python-prac/prac-4-beginners/code/05-interactive-code/m-n-m/right.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/05-interactive-code/right.html
│   │   │   │   └── ./python-prac/prac-4-beginners/code/05-interactive-code/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/right.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/right.md
│   │   │   │   └── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/rocks-game
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/rocks-game/index.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/rocks-game/index.md
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/rocks-game/right.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/rocks-game/right.md
│   │   │   │       └── ./python-prac/prac-4-beginners/code/06-organizing-code-with-functions/rocks-game/rpsgame.py
│   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures/right.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures/right.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures/rocks-game
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures/rocks-game/index.html
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures/rocks-game/index.md
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures/rocks-game/right.html
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/code/07-data-structures/rocks-game/right.md
│   │   │   │   │   └── ./python-prac/prac-4-beginners/code/07-data-structures/rocks-game/rpsgame.py
│   │   │   │   └── ./python-prac/prac-4-beginners/code/07-data-structures/simple_dict
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/07-data-structures/simple_dict/index.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/07-data-structures/simple_dict/index.md
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/07-data-structures/simple_dict/playground.py
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/07-data-structures/simple_dict/right.html
│   │   │   │       └── ./python-prac/prac-4-beginners/code/07-data-structures/simple_dict/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/code/08-problem-solving
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/08-problem-solving/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/08-problem-solving/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/08-problem-solving/right.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/08-problem-solving/right.md
│   │   │   │   └── ./python-prac/prac-4-beginners/code/08-problem-solving/tictactoe
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/08-problem-solving/tictactoe/game.py
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/08-problem-solving/tictactoe/index.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/08-problem-solving/tictactoe/index.md
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/08-problem-solving/tictactoe/right.html
│   │   │   │       └── ./python-prac/prac-4-beginners/code/08-problem-solving/tictactoe/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/code/09-working-with-files
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/09-working-with-files/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/09-working-with-files/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/09-working-with-files/right.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/09-working-with-files/right.md
│   │   │   │   └── ./python-prac/prac-4-beginners/code/09-working-with-files/rocks-game
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/09-working-with-files/rocks-game/index.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/09-working-with-files/rocks-game/index.md
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/09-working-with-files/rocks-game/right.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/09-working-with-files/rocks-game/right.md
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/09-working-with-files/rocks-game/rolls.json
│   │   │   │       └── ./python-prac/prac-4-beginners/code/09-working-with-files/rocks-game/rpsgame.py
│   │   │   ├── ./python-prac/prac-4-beginners/code/10-external-libraries
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/10-external-libraries/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/10-external-libraries/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/10-external-libraries/right.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/10-external-libraries/right.md
│   │   │   │   └── ./python-prac/prac-4-beginners/code/10-external-libraries/rocks-game
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/10-external-libraries/rocks-game/index.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/10-external-libraries/rocks-game/index.md
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/10-external-libraries/rocks-game/requirements.txt
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/10-external-libraries/rocks-game/right.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/10-external-libraries/rocks-game/right.md
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/10-external-libraries/rocks-game/rolls.json
│   │   │   │       └── ./python-prac/prac-4-beginners/code/10-external-libraries/rocks-game/rpsgame.py
│   │   │   ├── ./python-prac/prac-4-beginners/code/11-error-handling
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/11-error-handling/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/11-error-handling/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/11-error-handling/right.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/code/11-error-handling/right.md
│   │   │   │   └── ./python-prac/prac-4-beginners/code/11-error-handling/rocks-game
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/11-error-handling/rocks-game/index.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/11-error-handling/rocks-game/index.md
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/11-error-handling/rocks-game/requirements.txt
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/11-error-handling/rocks-game/right.html
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/11-error-handling/rocks-game/right.md
│   │   │   │       ├── ./python-prac/prac-4-beginners/code/11-error-handling/rocks-game/rolls.json
│   │   │   │       └── ./python-prac/prac-4-beginners/code/11-error-handling/rocks-game/rpsgame.py
│   │   │   ├── ./python-prac/prac-4-beginners/code/index.html
│   │   │   ├── ./python-prac/prac-4-beginners/code/index.md
│   │   │   ├── ./python-prac/prac-4-beginners/code/right.html
│   │   │   └── ./python-prac/prac-4-beginners/code/right.md
│   │   ├── ./python-prac/prac-4-beginners/index.html
│   │   ├── ./python-prac/prac-4-beginners/index.md
│   │   ├── ./python-prac/prac-4-beginners/practices
│   │   │   ├── ./python-prac/prac-4-beginners/practices/ch04_first_lines
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch04_first_lines/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch04_first_lines/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch04_first_lines/readme.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch04_first_lines/readme.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch04_first_lines/right.html
│   │   │   │   └── ./python-prac/prac-4-beginners/practices/ch04_first_lines/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/ch05_interactive_code
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch05_interactive_code/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch05_interactive_code/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch05_interactive_code/readme.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch05_interactive_code/readme.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch05_interactive_code/right.html
│   │   │   │   └── ./python-prac/prac-4-beginners/practices/ch05_interactive_code/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/ch06-organizing-code-with-functions
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch06-organizing-code-with-functions/guessinggame.py
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch06-organizing-code-with-functions/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch06-organizing-code-with-functions/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch06-organizing-code-with-functions/readme.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch06-organizing-code-with-functions/readme.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch06-organizing-code-with-functions/right.html
│   │   │   │   └── ./python-prac/prac-4-beginners/practices/ch06-organizing-code-with-functions/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/ch07_data_structures
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch07_data_structures/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch07_data_structures/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch07_data_structures/readme.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch07_data_structures/readme.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch07_data_structures/right.html
│   │   │   │   └── ./python-prac/prac-4-beginners/practices/ch07_data_structures/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/readme.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/readme.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/readme_files
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/readme_files/Connect_4_Board_and_Box.jpg
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/readme_files/index.html
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/readme_files/index.md
│   │   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/readme_files/right.html
│   │   │   │   │   └── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/readme_files/right.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/right.html
│   │   │   │   └── ./python-prac/prac-4-beginners/practices/ch08_problem_solving/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/ch09_working_with_files
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch09_working_with_files/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch09_working_with_files/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch09_working_with_files/readme.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch09_working_with_files/readme.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch09_working_with_files/right.html
│   │   │   │   └── ./python-prac/prac-4-beginners/practices/ch09_working_with_files/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/ch10_external_libraries
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch10_external_libraries/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch10_external_libraries/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch10_external_libraries/readme.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch10_external_libraries/readme.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch10_external_libraries/right.html
│   │   │   │   └── ./python-prac/prac-4-beginners/practices/ch10_external_libraries/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/ch11-error-handling
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch11-error-handling/index.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch11-error-handling/index.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch11-error-handling/readme.html
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch11-error-handling/readme.md
│   │   │   │   ├── ./python-prac/prac-4-beginners/practices/ch11-error-handling/right.html
│   │   │   │   └── ./python-prac/prac-4-beginners/practices/ch11-error-handling/right.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/index.html
│   │   │   ├── ./python-prac/prac-4-beginners/practices/index.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/readme.html
│   │   │   ├── ./python-prac/prac-4-beginners/practices/readme.md
│   │   │   ├── ./python-prac/prac-4-beginners/practices/right.html
│   │   │   └── ./python-prac/prac-4-beginners/practices/right.md
│   │   ├── ./python-prac/prac-4-beginners/readme_resources
│   │   │   ├── ./python-prac/prac-4-beginners/readme_resources/absolute-beginners.jpg
│   │   │   ├── ./python-prac/prac-4-beginners/readme_resources/index.html
│   │   │   ├── ./python-prac/prac-4-beginners/readme_resources/index.md
│   │   │   ├── ./python-prac/prac-4-beginners/readme_resources/right.html
│   │   │   └── ./python-prac/prac-4-beginners/readme_resources/right.md
│   │   ├── ./python-prac/prac-4-beginners/right.html
│   │   ├── ./python-prac/prac-4-beginners/right.md
│   │   └── ./python-prac/prac-4-beginners/solutions
│   │       ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/index.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/index.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/right.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/right.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/step_1.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/step_1.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/step_2.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/step_2.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/step_3.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/step_3.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/step_4.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/step_4.md
│   │       │   └── ./python-prac/prac-4-beginners/solutions/ch-04-writing-your-first-lines-of-code/step_5.png
│   │       ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/hello_world.py
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/index.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/index.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/right.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/right.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/step_1.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/step_1.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/step_2_even_odd.py
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/step_3_even_odd_a_lot.py
│   │       │   └── ./python-prac/prac-4-beginners/solutions/ch-05-interactive-code/step_4.png
│   │       ├── ./python-prac/prac-4-beginners/solutions/ch-06-organizing-code-with-functions
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-06-organizing-code-with-functions/guessinggame.py
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-06-organizing-code-with-functions/index.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-06-organizing-code-with-functions/index.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-06-organizing-code-with-functions/right.html
│   │       │   └── ./python-prac/prac-4-beginners/solutions/ch-06-organizing-code-with-functions/right.md
│   │       ├── ./python-prac/prac-4-beginners/solutions/ch-07-data-structures
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-07-data-structures/dictionary_program.py
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-07-data-structures/index.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-07-data-structures/index.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-07-data-structures/right.html
│   │       │   └── ./python-prac/prac-4-beginners/solutions/ch-07-data-structures/right.md
│   │       ├── ./python-prac/prac-4-beginners/solutions/ch-08-problem-solving
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-08-problem-solving/connect4.py
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-08-problem-solving/index.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-08-problem-solving/index.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-08-problem-solving/readme.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-08-problem-solving/readme.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-08-problem-solving/right.html
│   │       │   └── ./python-prac/prac-4-beginners/solutions/ch-08-problem-solving/right.md
│   │       ├── ./python-prac/prac-4-beginners/solutions/ch-09-working-with-files
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-09-working-with-files/connect4_files.py
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-09-working-with-files/index.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-09-working-with-files/index.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-09-working-with-files/right.html
│   │       │   └── ./python-prac/prac-4-beginners/solutions/ch-09-working-with-files/right.md
│   │       ├── ./python-prac/prac-4-beginners/solutions/ch-10-external-libraries
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-10-external-libraries/connect4_color.py
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-10-external-libraries/index.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-10-external-libraries/index.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-10-external-libraries/requirements.txt
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-10-external-libraries/right.html
│   │       │   └── ./python-prac/prac-4-beginners/solutions/ch-10-external-libraries/right.md
│   │       ├── ./python-prac/prac-4-beginners/solutions/ch-11-error-handling
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-11-error-handling/index.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-11-error-handling/index.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-11-error-handling/readme.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-11-error-handling/readme.md
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-11-error-handling/right.html
│   │       │   ├── ./python-prac/prac-4-beginners/solutions/ch-11-error-handling/right.md
│   │       │   └── ./python-prac/prac-4-beginners/solutions/ch-11-error-handling/tictactoe_errors_handled.py
│   │       ├── ./python-prac/prac-4-beginners/solutions/index.html
│   │       ├── ./python-prac/prac-4-beginners/solutions/index.md
│   │       ├── ./python-prac/prac-4-beginners/solutions/readme.html
│   │       ├── ./python-prac/prac-4-beginners/solutions/readme.md
│   │       ├── ./python-prac/prac-4-beginners/solutions/right.html
│   │       └── ./python-prac/prac-4-beginners/solutions/right.md
│   ├── ./python-prac/projecteuler
│   │   ├── ./python-prac/projecteuler/__init__.py
│   │   ├── ./python-prac/projecteuler/digits.py
│   │   ├── ./python-prac/projecteuler/euler001_sum_multiples_3_or_5.py
│   │   ├── ./python-prac/projecteuler/euler002_even_fibs.py
│   │   ├── ./python-prac/projecteuler/euler003_largest_prime_factor.py
│   │   ├── ./python-prac/projecteuler/euler004_largest_palindrome_product.py
│   │   ├── ./python-prac/projecteuler/euler005_smallest_multiple.py
│   │   ├── ./python-prac/projecteuler/euler006_sum_square_difference.py
│   │   ├── ./python-prac/projecteuler/euler007_nth_prime.py
│   │   ├── ./python-prac/projecteuler/euler008_largest_product_in_a_series.py
│   │   ├── ./python-prac/projecteuler/euler009.py
│   │   ├── ./python-prac/projecteuler/euler010.py
│   │   ├── ./python-prac/projecteuler/euler011.py
│   │   ├── ./python-prac/projecteuler/euler012.py
│   │   ├── ./python-prac/projecteuler/euler013.py
│   │   ├── ./python-prac/projecteuler/euler014.py
│   │   ├── ./python-prac/projecteuler/euler015.py
│   │   ├── ./python-prac/projecteuler/euler016.py
│   │   ├── ./python-prac/projecteuler/euler017.py
│   │   ├── ./python-prac/projecteuler/euler018.py
│   │   ├── ./python-prac/projecteuler/euler019.py
│   │   ├── ./python-prac/projecteuler/euler020.py
│   │   ├── ./python-prac/projecteuler/euler021.py
│   │   ├── ./python-prac/projecteuler/euler022.py
│   │   ├── ./python-prac/projecteuler/euler023.py
│   │   ├── ./python-prac/projecteuler/euler024.py
│   │   ├── ./python-prac/projecteuler/euler025.py
│   │   ├── ./python-prac/projecteuler/euler026.py
│   │   ├── ./python-prac/projecteuler/euler027.py
│   │   ├── ./python-prac/projecteuler/euler028.py
│   │   ├── ./python-prac/projecteuler/euler029.py
│   │   ├── ./python-prac/projecteuler/euler030.py
│   │   ├── ./python-prac/projecteuler/euler031.py
│   │   ├── ./python-prac/projecteuler/euler032.py
│   │   ├── ./python-prac/projecteuler/euler033.py
│   │   ├── ./python-prac/projecteuler/euler034.py
│   │   ├── ./python-prac/projecteuler/euler035.py
│   │   ├── ./python-prac/projecteuler/euler036.py
│   │   ├── ./python-prac/projecteuler/euler037.py
│   │   ├── ./python-prac/projecteuler/euler038_pandigital_multiples.py
│   │   ├── ./python-prac/projecteuler/euler039_integer_right_triangles.py
│   │   ├── ./python-prac/projecteuler/euler040_champernowne_constant.py
│   │   ├── ./python-prac/projecteuler/euler041_pandigital_prime.py
│   │   ├── ./python-prac/projecteuler/euler042_coded_triangle_numbers.py
│   │   ├── ./python-prac/projecteuler/euler043_sub_string_divisibility.py
│   │   ├── ./python-prac/projecteuler/euler044_pentagon_numbers.py
│   │   ├── ./python-prac/projecteuler/euler045_triangular_pentagonal_and_exagonal.py
│   │   ├── ./python-prac/projecteuler/euler046_goldbachs_other_conjecture.py
│   │   ├── ./python-prac/projecteuler/euler047_distinct_primes_factors.py
│   │   ├── ./python-prac/projecteuler/euler048_self_powers.py
│   │   ├── ./python-prac/projecteuler/euler049_prime_permutations.py
│   │   ├── ./python-prac/projecteuler/euler050_consecutive_prime_sum.py
│   │   ├── ./python-prac/projecteuler/euler051_prime_digit_replacements.py
│   │   ├── ./python-prac/projecteuler/euler052_permuted_multiples.py
│   │   ├── ./python-prac/projecteuler/euler053_combinatoric_selections.py
│   │   ├── ./python-prac/projecteuler/euler054_poker_hands.py
│   │   ├── ./python-prac/projecteuler/euler055_lychrel_numbers.py
│   │   ├── ./python-prac/projecteuler/euler056.py
│   │   ├── ./python-prac/projecteuler/euler057.py
│   │   ├── ./python-prac/projecteuler/euler058.py
│   │   ├── ./python-prac/projecteuler/euler059.py
│   │   ├── ./python-prac/projecteuler/euler067.py
│   │   ├── ./python-prac/projecteuler/euler081.py
│   │   ├── ./python-prac/projecteuler/euler220.c
│   │   ├── ./python-prac/projecteuler/factorization.py
│   │   ├── ./python-prac/projecteuler/graphs.py
│   │   ├── ./python-prac/projecteuler/index.html
│   │   ├── ./python-prac/projecteuler/index.md
│   │   ├── ./python-prac/projecteuler/memoization.py
│   │   ├── ./python-prac/projecteuler/numberwords.py
│   │   ├── ./python-prac/projecteuler/palindromes.py
│   │   ├── ./python-prac/projecteuler/primality.py
│   │   ├── ./python-prac/projecteuler/right.html
│   │   ├── ./python-prac/projecteuler/right.md
│   │   ├── ./python-prac/projecteuler/series.py
│   │   ├── ./python-prac/projecteuler/spirals.py
│   │   └── ./python-prac/projecteuler/words.py
│   ├── ./python-prac/projects-DS
│   │   ├── ./python-prac/projects-DS/Data-Structures
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/Data_Structures_Questions.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/Data_Structures_Questions.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/FAQ.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/FAQ.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/README.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/README.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/avl_tree
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/avl_tree/avl_tree.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/avl_tree/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/avl_tree/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/avl_tree/right.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/avl_tree/right.md
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures/avl_tree/test_avl_tree.py
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/binary_search_tree
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/binary_search_tree/binary_search_tree.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/binary_search_tree/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/binary_search_tree/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/binary_search_tree/right.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/binary_search_tree/right.md
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures/binary_search_tree/test_binary_search_tree.py
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/doubly_linked_list
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/doubly_linked_list/doubly_linked_list.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/doubly_linked_list/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/doubly_linked_list/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/doubly_linked_list/right.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/doubly_linked_list/right.md
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures/doubly_linked_list/test_doubly_linked_list.py
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/heap
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/heap/generic_heap.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/heap/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/heap/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/heap/max_heap.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/heap/right.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/heap/right.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/heap/test_generic_heap.py
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures/heap/test_max_heap.py
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/index.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/index.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript/doubly-linked-list.js
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript/linked-list.js
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript/package-lock.json
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript/package.json
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript/queue.js
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript/right.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/javascript/right.md
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures/javascript/tests
│   │   │   │       ├── ./python-prac/projects-DS/Data-Structures/javascript/tests/doubly-linked-list.test.js
│   │   │   │       ├── ./python-prac/projects-DS/Data-Structures/javascript/tests/index.html
│   │   │   │       ├── ./python-prac/projects-DS/Data-Structures/javascript/tests/index.md
│   │   │   │       ├── ./python-prac/projects-DS/Data-Structures/javascript/tests/queue.test.js
│   │   │   │       ├── ./python-prac/projects-DS/Data-Structures/javascript/tests/right.html
│   │   │   │       └── ./python-prac/projects-DS/Data-Structures/javascript/tests/right.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/lru_cache
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/lru_cache/doubly_linked_list.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/lru_cache/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/lru_cache/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/lru_cache/lru_cache.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/lru_cache/right.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/lru_cache/right.md
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures/lru_cache/test_lru_cache.py
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/pseudocode.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/pseudocode.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/python
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/binary_search_tree
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/binary_search_tree/binary_search_tree.py
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/binary_search_tree/binary_search_tree_recursive.py
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/binary_search_tree/index.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/binary_search_tree/index.md
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/binary_search_tree/right.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/binary_search_tree/right.md
│   │   │   │   │   └── ./python-prac/projects-DS/Data-Structures/python/binary_search_tree/test_binary_search_tree.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/doubly_linked_list
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/doubly_linked_list/doubly_linked_list.py
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/doubly_linked_list/index.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/doubly_linked_list/index.md
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/doubly_linked_list/right.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/doubly_linked_list/right.md
│   │   │   │   │   └── ./python-prac/projects-DS/Data-Structures/python/doubly_linked_list/test_doubly_linked_list.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/heap
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/heap/heap.py
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/heap/heap_iterative.py
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/heap/index.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/heap/index.md
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/heap/right.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/heap/right.md
│   │   │   │   │   └── ./python-prac/projects-DS/Data-Structures/python/heap/test_heap.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/linked_list
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/linked_list/index.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/linked_list/index.md
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/linked_list/linked_list.py
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/linked_list/right.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/linked_list/right.md
│   │   │   │   │   └── ./python-prac/projects-DS/Data-Structures/python/linked_list/test_linked_list.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/queue
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/queue/index.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/queue/index.md
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/queue/queue.py
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/queue/right.html
│   │   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/queue/right.md
│   │   │   │   │   └── ./python-prac/projects-DS/Data-Structures/python/queue/test_queue.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/python/right.html
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures/python/right.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/queue
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/queue/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/queue/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/queue/queue.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/queue/right.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures/queue/right.md
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures/queue/test_queue.py
│   │   │   ├── ./python-prac/projects-DS/Data-Structures/right.html
│   │   │   └── ./python-prac/projects-DS/Data-Structures/right.md
│   │   ├── ./python-prac/projects-DS/Data-Structures-Notes
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/BST_and_Heaps
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/BST_and_Heaps/Binary_Trees.png
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/BST_and_Heaps/bst_heaps.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/BST_and_Heaps/bst_heaps.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/BST_and_Heaps/bst_heaps.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/BST_and_Heaps/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/BST_and_Heaps/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/BST_and_Heaps/right.html
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures-Notes/BST_and_Heaps/right.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Doubly_Linked_List
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Doubly_Linked_List/2_doubly_linked_list.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Doubly_Linked_List/2_doubly_linked_list.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Doubly_Linked_List/dll.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Doubly_Linked_List/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Doubly_Linked_List/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Doubly_Linked_List/right.html
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures-Notes/Doubly_Linked_List/right.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Interview_Problems
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Interview_Problems/Heaps_and_Interview.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Interview_Problems/Heaps_and_Interview.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Interview_Problems/Interview2.png
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Interview_Problems/day4.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Interview_Problems/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Interview_Problems/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Interview_Problems/right.html
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures-Notes/Interview_Problems/right.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Linked_Lists
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Linked_Lists/1_linked_lists.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Linked_Lists/1_linked_lists.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Linked_Lists/Array_LList.png
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Linked_Lists/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Linked_Lists/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Linked_Lists/linked_list.py
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/Linked_Lists/right.html
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures-Notes/Linked_Lists/right.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/README.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/README.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/index.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/index.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-Notes/right.html
│   │   │   └── ./python-prac/projects-DS/Data-Structures-Notes/right.md
│   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/README.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/README.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/big-o-notation.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/binary_search_tree.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/binary_tree.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/binary_tree_node.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/breadth-first-search.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/in-order.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/index.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/index.md
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/k-ary_tree.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/linked-list.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/post-order.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/pre-order.svg
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/right.html
│   │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/right.md
│   │   │   │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/assets/title.svg
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/index.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/index.md
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/package-lock.json
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/package.json
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/right.html
│   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/right.md
│   │   │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src
│   │   │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/index.html
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/index.md
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/right.html
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/right.md
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/index.html
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/index.md
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/knuth-morris-pratt
│   │   │       │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/knuth-morris-pratt/README.html
│   │   │       │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/knuth-morris-pratt/README.md
│   │   │       │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/knuth-morris-pratt/index.html
│   │   │       │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/knuth-morris-pratt/index.md
│   │   │       │   │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/knuth-morris-pratt/right.html
│   │   │       │   │   │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/knuth-morris-pratt/right.md
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/right.html
│   │   │       │   │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/strings/right.md
│   │   │       │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/README.html
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/README.md
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/breadth-first-search
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/breadth-first-search/README.html
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/breadth-first-search/README.md
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/breadth-first-search/index.html
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/breadth-first-search/index.md
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/breadth-first-search/right.html
│   │   │       │       │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/breadth-first-search/right.md
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/depth-first-search
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/depth-first-search/README.html
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/depth-first-search/README.md
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/depth-first-search/index.html
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/depth-first-search/index.md
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/depth-first-search/right.html
│   │   │       │       │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/depth-first-search/right.md
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/index.html
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/index.md
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/right.html
│   │   │       │       └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/algorithms/tree/right.md
│   │   │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/README.html
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/README.md
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/asymptotic-notation
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/asymptotic-notation/README.html
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/asymptotic-notation/README.md
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/asymptotic-notation/index.html
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/asymptotic-notation/index.md
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/asymptotic-notation/right.html
│   │   │       │   │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/asymptotic-notation/right.md
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/index.html
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/index.md
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/right.html
│   │   │       │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/analysis-of-algorithms/right.md
│   │   │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/graph
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/graph/Graph.js
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/graph/index.html
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/graph/index.md
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/graph/right.html
│   │   │       │   │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/graph/right.md
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/index.html
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/index.md
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/linked_lists
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/linked_lists/README.html
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/linked_lists/README.md
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/linked_lists/index.html
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/linked_lists/index.md
│   │   │       │   │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/linked_lists/right.html
│   │   │       │   │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/linked_lists/right.md
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/right.html
│   │   │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/right.md
│   │   │       │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/README.html
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/README.md
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-search-tree
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-search-tree/README.html
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-search-tree/README.md
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-search-tree/index.html
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-search-tree/index.md
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-search-tree/right.html
│   │   │       │       │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-search-tree/right.md
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-tree
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-tree/README.html
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-tree/README.md
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-tree/index.html
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-tree/index.md
│   │   │       │       │   ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-tree/right.html
│   │   │       │       │   └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/binary-tree/right.md
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/index.html
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/index.md
│   │   │       │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/right.html
│   │   │       │       └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/data-structures/tree/right.md
│   │   │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/index.html
│   │   │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/index.md
│   │   │       ├── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/right.html
│   │   │       └── ./python-prac/projects-DS/Data-Structures-and-Algorithms/src/right.md
│   │   ├── ./python-prac/projects-DS/data_struct_and_algo
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Anagram.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Count_the_characters_.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Counting_Valleys.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Distinct_Digit_Array.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Doubling_stack.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Find_the_Duplicate_Number.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Image.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Jumping_on_the_Clouds.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Kids_With_the_Greatest_Number_of_Candies.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Kth_smallest_element.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Move_all_negative_numbers.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/New_Year_Chaos.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Remove_Element.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Repeated_String.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Reverse_words_in_a_given_string.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Richest_Customer_Wealth.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Running_Sum_of_1d_Array.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/ShuffleSort.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Shuffle_the_Array.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Sort_an_array_of_0s,_1s_and_2s.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Strong_Password_Checker.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/TicTacToe.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Tower_of_hanoi.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/TripletSearch.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/Union_of_two_arrays.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/YT_DOWN.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/all_zeros.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/balance_parenthisis.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/binary_search.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/buble_sort.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/celeb.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/cyclic_rotation.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/dump.html
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/dump.md
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/duplicate_removal.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/exists_in.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/extract.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/fib_series.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/first_occurance.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/index.html
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/index.md
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/kth_largest.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/leet_1.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/linked_list.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/longest_sub.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/max_in_array.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/max_sum_on_rotation.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/n_rotations_index.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/pair_sum.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/phone_num.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/ploting.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/prime.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/recursion_fact.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/reverse_in_array.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/right.html
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/right.md
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/rotated_sorted_array.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/rotated_sorted_find.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/rotation_arr.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/sales_by_match.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/sample.txt
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/selection_sort.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/single_rotation.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/sort_0_1_2.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/sorted_array_rotation.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/sprial_rotation.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/stack_imply.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/stack_max_o(1).py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/substring_search.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/sun_finder.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/system_process_scanner.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/temp.html
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/temp.md
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/temp.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/trapping_water.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/traversals.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/tree_creation.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/wave.py
│   │   │   ├── ./python-prac/projects-DS/data_struct_and_algo/word_count.py
│   │   │   └── ./python-prac/projects-DS/data_struct_and_algo/xor.py
│   │   ├── ./python-prac/projects-DS/index.html
│   │   ├── ./python-prac/projects-DS/index.md
│   │   ├── ./python-prac/projects-DS/right.html
│   │   └── ./python-prac/projects-DS/right.md
│   ├── ./python-prac/python-mega-algo
│   │   ├── ./python-prac/python-mega-algo/README.html
│   │   ├── ./python-prac/python-mega-algo/README.md
│   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/bisection.py
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/gaussian_elimination.py
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/image_data
│   │   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/image_data/2D_problems.jpg
│   │   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/image_data/2D_problems_1.jpg
│   │   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/image_data/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/image_data/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/image_data/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/image_data/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/arithmetic_analysis/image_data/right.md
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/in_static_equilibrium.py
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/index.html
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/index.md
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/intersection.py
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/lu_decomposition.py
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/newton_forward_interpolation.py
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/newton_method.py
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/newton_raphson.py
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/right.html
│   │   │   ├── ./python-prac/python-mega-algo/arithmetic_analysis/right.md
│   │   │   └── ./python-prac/python-mega-algo/arithmetic_analysis/secant_method.py
│   │   ├── ./python-prac/python-mega-algo/backtracking
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/all_combinations.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/all_permutations.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/all_subsequences.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/coloring.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/hamiltonian_cycle.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/index.html
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/index.md
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/knight_tour.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/minimax.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/n_queens.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/n_queens_math.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/rat_in_maze.py
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/right.html
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/right.md
│   │   │   ├── ./python-prac/python-mega-algo/backtracking/sudoku.py
│   │   │   └── ./python-prac/python-mega-algo/backtracking/sum_of_subsets.py
│   │   ├── ./python-prac/python-mega-algo/bit_manipulation
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/README.html
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/README.md
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/binary_and_operator.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/binary_count_setbits.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/binary_count_trailing_zeros.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/binary_or_operator.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/binary_shifts.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/binary_twos_complement.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/binary_xor_operator.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/count_number_of_one_bits.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/index.html
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/index.md
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/reverse_bits.py
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/right.html
│   │   │   ├── ./python-prac/python-mega-algo/bit_manipulation/right.md
│   │   │   └── ./python-prac/python-mega-algo/bit_manipulation/single_bit_manipulation_operations.py
│   │   ├── ./python-prac/python-mega-algo/blockchain
│   │   │   ├── ./python-prac/python-mega-algo/blockchain/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/blockchain/chinese_remainder_theorem.py
│   │   │   ├── ./python-prac/python-mega-algo/blockchain/diophantine_equation.py
│   │   │   ├── ./python-prac/python-mega-algo/blockchain/index.html
│   │   │   ├── ./python-prac/python-mega-algo/blockchain/index.md
│   │   │   ├── ./python-prac/python-mega-algo/blockchain/modular_division.py
│   │   │   ├── ./python-prac/python-mega-algo/blockchain/right.html
│   │   │   └── ./python-prac/python-mega-algo/blockchain/right.md
│   │   ├── ./python-prac/python-mega-algo/boolean_algebra
│   │   │   ├── ./python-prac/python-mega-algo/boolean_algebra/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/boolean_algebra/index.html
│   │   │   ├── ./python-prac/python-mega-algo/boolean_algebra/index.md
│   │   │   ├── ./python-prac/python-mega-algo/boolean_algebra/quine_mc_cluskey.py
│   │   │   ├── ./python-prac/python-mega-algo/boolean_algebra/right.html
│   │   │   └── ./python-prac/python-mega-algo/boolean_algebra/right.md
│   │   ├── ./python-prac/python-mega-algo/cellular_automata
│   │   │   ├── ./python-prac/python-mega-algo/cellular_automata/README.html
│   │   │   ├── ./python-prac/python-mega-algo/cellular_automata/README.md
│   │   │   ├── ./python-prac/python-mega-algo/cellular_automata/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/cellular_automata/conways_game_of_life.py
│   │   │   ├── ./python-prac/python-mega-algo/cellular_automata/game_of_life.py
│   │   │   ├── ./python-prac/python-mega-algo/cellular_automata/index.html
│   │   │   ├── ./python-prac/python-mega-algo/cellular_automata/index.md
│   │   │   ├── ./python-prac/python-mega-algo/cellular_automata/one_dimensional.py
│   │   │   ├── ./python-prac/python-mega-algo/cellular_automata/right.html
│   │   │   └── ./python-prac/python-mega-algo/cellular_automata/right.md
│   │   ├── ./python-prac/python-mega-algo/ciphers
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/a1z26.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/affine_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/atbash.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/base16.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/base32.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/base64_encoding.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/base85.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/beaufort_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/brute_force_caesar_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/caesar_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/cryptomath_module.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/decrypt_caesar_with_chi_squared.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/deterministic_miller_rabin.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/diffie.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/diffie_hellman.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/elgamal_key_generator.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/enigma_machine2.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/hill_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/index.html
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/index.md
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/mixed_keyword_cypher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/mono_alphabetic_ciphers.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/morse_code_implementation.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/onepad_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/playfair_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/porta_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/prehistoric_men.txt
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/rabin_miller.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/rail_fence_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/right.html
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/right.md
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/rot13.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/rsa_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/rsa_factorization.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/rsa_key_generator.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/shuffled_shift_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/simple_keyword_cypher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/simple_substitution_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/trafid_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/transposition_cipher.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/transposition_cipher_encrypt_decrypt_file.py
│   │   │   ├── ./python-prac/python-mega-algo/ciphers/vigenere_cipher.py
│   │   │   └── ./python-prac/python-mega-algo/ciphers/xor_cipher.py
│   │   ├── ./python-prac/python-mega-algo/compression
│   │   │   ├── ./python-prac/python-mega-algo/compression/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/compression/burrows_wheeler.py
│   │   │   ├── ./python-prac/python-mega-algo/compression/huffman.py
│   │   │   ├── ./python-prac/python-mega-algo/compression/image_data
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/PSNR-example-base.png
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/PSNR-example-comp-10.jpg
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/compressed_image.png
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/example_image.jpg
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/example_wikipedia_image.jpg
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/original_image.png
│   │   │   │   ├── ./python-prac/python-mega-algo/compression/image_data/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/compression/image_data/right.md
│   │   │   ├── ./python-prac/python-mega-algo/compression/index.html
│   │   │   ├── ./python-prac/python-mega-algo/compression/index.md
│   │   │   ├── ./python-prac/python-mega-algo/compression/lempel_ziv.py
│   │   │   ├── ./python-prac/python-mega-algo/compression/lempel_ziv_decompress.py
│   │   │   ├── ./python-prac/python-mega-algo/compression/peak_signal_to_noise_ratio.py
│   │   │   ├── ./python-prac/python-mega-algo/compression/right.html
│   │   │   └── ./python-prac/python-mega-algo/compression/right.md
│   │   ├── ./python-prac/python-mega-algo/computer_vision
│   │   │   ├── ./python-prac/python-mega-algo/computer_vision/README.html
│   │   │   ├── ./python-prac/python-mega-algo/computer_vision/README.md
│   │   │   ├── ./python-prac/python-mega-algo/computer_vision/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/computer_vision/harriscorner.py
│   │   │   ├── ./python-prac/python-mega-algo/computer_vision/index.html
│   │   │   ├── ./python-prac/python-mega-algo/computer_vision/index.md
│   │   │   ├── ./python-prac/python-mega-algo/computer_vision/meanthreshold.py
│   │   │   ├── ./python-prac/python-mega-algo/computer_vision/right.html
│   │   │   └── ./python-prac/python-mega-algo/computer_vision/right.md
│   │   ├── ./python-prac/python-mega-algo/conversions
│   │   │   ├── ./python-prac/python-mega-algo/conversions/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/binary_to_decimal.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/binary_to_octal.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/decimal_to_any.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/decimal_to_binary.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/decimal_to_binary_recursion.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/decimal_to_hexadecimal.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/decimal_to_octal.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/hex_to_bin.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/hexadecimal_to_decimal.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/index.html
│   │   │   ├── ./python-prac/python-mega-algo/conversions/index.md
│   │   │   ├── ./python-prac/python-mega-algo/conversions/molecular_chemistry.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/octal_to_decimal.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/prefix_conversions.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/rgb_hsv_conversion.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/right.html
│   │   │   ├── ./python-prac/python-mega-algo/conversions/right.md
│   │   │   ├── ./python-prac/python-mega-algo/conversions/roman_numerals.py
│   │   │   ├── ./python-prac/python-mega-algo/conversions/temperature_conversions.py
│   │   │   └── ./python-prac/python-mega-algo/conversions/weight_conversion.py
│   │   ├── ./python-prac/python-mega-algo/data_structures
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/avl_tree.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/basic_binary_tree.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/binary_search_tree.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/binary_search_tree_recursive.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/binary_tree_mirror.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/binary_tree_traversals.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/fenwick_tree.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/lazy_segment_tree.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/lowest_common_ancestor.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/merge_two_binary_trees.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/non_recursive_segment_tree.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/number_of_possible_binary_trees.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/red_black_tree.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/segment_tree.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/binary_tree/segment_tree_other.py
│   │   │   │   └── ./python-prac/python-mega-algo/data_structures/binary_tree/treap.py
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/disjoint_set
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/disjoint_set/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/disjoint_set/alternate_disjoint_set.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/disjoint_set/disjoint_set.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/disjoint_set/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/disjoint_set/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/disjoint_set/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/data_structures/disjoint_set/right.md
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/double_hash.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/hash_table.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/hash_table_with_linked_list.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/number_theory
│   │   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/number_theory/__init__.py
│   │   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/number_theory/index.html
│   │   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/number_theory/index.md
│   │   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/number_theory/prime_numbers.py
│   │   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/number_theory/right.html
│   │   │   │   │   └── ./python-prac/python-mega-algo/data_structures/hashing/number_theory/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/quadratic_probing.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/hashing/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/data_structures/hashing/right.md
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/binomial_heap.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/heap.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/heap_generic.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/max_heap.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/min_heap.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/randomized_heap.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/heap/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/data_structures/heap/skew_heap.py
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/index.html
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/index.md
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/circular_linked_list.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/deque_doubly.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/doubly_linked_list.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/doubly_linked_list_two.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/from_sequence.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/has_loop.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/is_palindrome.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/merge_two_lists.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/middle_element_of_linked_list.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/print_reverse.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/singly_linked_list.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/linked_list/skip_list.py
│   │   │   │   └── ./python-prac/python-mega-algo/data_structures/linked_list/swap_nodes.py
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/circular_queue.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/double_ended_queue.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/linked_queue.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/priority_queue_using_list.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/queue_on_list.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/queue_on_pseudo_stack.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/queue/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/data_structures/queue/right.md
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/right.html
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/right.md
│   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/balanced_parentheses.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/dijkstras_two_stack_algorithm.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/evaluate_postfix_notations.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/infix_to_postfix_conversion.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/infix_to_prefix_conversion.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/linked_stack.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/next_greater_element.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/postfix_evaluation.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/prefix_evaluation.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/stack.py
│   │   │   │   ├── ./python-prac/python-mega-algo/data_structures/stacks/stack_using_dll.py
│   │   │   │   └── ./python-prac/python-mega-algo/data_structures/stacks/stock_span_problem.py
│   │   │   └── ./python-prac/python-mega-algo/data_structures/trie
│   │   │       ├── ./python-prac/python-mega-algo/data_structures/trie/__init__.py
│   │   │       ├── ./python-prac/python-mega-algo/data_structures/trie/index.html
│   │   │       ├── ./python-prac/python-mega-algo/data_structures/trie/index.md
│   │   │       ├── ./python-prac/python-mega-algo/data_structures/trie/right.html
│   │   │       ├── ./python-prac/python-mega-algo/data_structures/trie/right.md
│   │   │       └── ./python-prac/python-mega-algo/data_structures/trie/trie.py
│   │   ├── ./python-prac/python-mega-algo/digital_image_processing
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/change_brightness.py
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/change_contrast.py
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/convert_to_negative.py
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/dithering
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/dithering/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/dithering/burkes.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/dithering/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/dithering/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/dithering/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/dithering/right.md
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/edge_detection
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/edge_detection/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/edge_detection/canny.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/edge_detection/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/edge_detection/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/edge_detection/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/edge_detection/right.md
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters/bilateral_filter.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters/convolve.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters/gaussian_filter.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters/median_filter.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/filters/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/filters/sobel_filter.py
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/histogram_stretch.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/image_data
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/image_data/__init__.py
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/image_data/index.html
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/image_data/index.md
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/image_data/input.jpg
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/image_data/right.html
│   │   │   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/image_data/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/output_data
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/output_data/__init__.py
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/output_data/index.html
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/output_data/index.md
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/output_data/output.jpg
│   │   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/output_data/right.html
│   │   │   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/output_data/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/histogram_equalization/right.md
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/image_data
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/image_data/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/image_data/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/image_data/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/image_data/lena.jpg
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/image_data/lena_small.jpg
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/image_data/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/image_data/right.md
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/index.html
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/index.md
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/index_calculation.py
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/resize
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/resize/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/resize/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/resize/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/resize/resize.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/resize/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/resize/right.md
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/right.html
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/right.md
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/rotation
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/rotation/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/rotation/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/rotation/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/rotation/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/rotation/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/rotation/rotation.py
│   │   │   ├── ./python-prac/python-mega-algo/digital_image_processing/sepia.py
│   │   │   └── ./python-prac/python-mega-algo/digital_image_processing/test_digital_image_processing.py
│   │   ├── ./python-prac/python-mega-algo/divide_and_conquer
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/closest_pair_of_points.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/convex_hull.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/heaps_algorithm.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/heaps_algorithm_iterative.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/index.html
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/index.md
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/inversions.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/kth_order_statistic.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/max_difference_pair.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/max_subarray_sum.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/mergesort.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/peak.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/power.py
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/right.html
│   │   │   ├── ./python-prac/python-mega-algo/divide_and_conquer/right.md
│   │   │   └── ./python-prac/python-mega-algo/divide_and_conquer/strassen_matrix_multiplication.py
│   │   ├── ./python-prac/python-mega-algo/dynamic_programming
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/abbreviation.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/bitmask.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/climbing_stairs.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/edit_distance.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/factorial.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/fast_fibonacci.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/fibonacci.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/floyd_warshall.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/fractional_knapsack.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/fractional_knapsack_2.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/index.html
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/index.md
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/integer_partition.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/iterating_through_submasks.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/k_means_clustering_tensorflow.py_tf
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/knapsack.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/longest_common_subsequence.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/longest_increasing_subsequence.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/longest_increasing_subsequence_o(nlogn).py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/longest_sub_array.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/matrix_chain_order.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/max_non_adjacent_sum.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/max_sub_array.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/max_sum_contiguous_subsequence.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/minimum_coin_change.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/minimum_cost_path.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/minimum_partition.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/minimum_steps_to_one.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/optimal_binary_search_tree.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/right.html
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/right.md
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/rod_cutting.py
│   │   │   ├── ./python-prac/python-mega-algo/dynamic_programming/subset_generation.py
│   │   │   └── ./python-prac/python-mega-algo/dynamic_programming/sum_of_subset.py
│   │   ├── ./python-prac/python-mega-algo/electronics
│   │   │   ├── ./python-prac/python-mega-algo/electronics/electric_power.py
│   │   │   ├── ./python-prac/python-mega-algo/electronics/index.html
│   │   │   ├── ./python-prac/python-mega-algo/electronics/index.md
│   │   │   ├── ./python-prac/python-mega-algo/electronics/ohms_law.py
│   │   │   ├── ./python-prac/python-mega-algo/electronics/right.html
│   │   │   └── ./python-prac/python-mega-algo/electronics/right.md
│   │   ├── ./python-prac/python-mega-algo/file_transfer
│   │   │   ├── ./python-prac/python-mega-algo/file_transfer/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/file_transfer/index.html
│   │   │   ├── ./python-prac/python-mega-algo/file_transfer/index.md
│   │   │   ├── ./python-prac/python-mega-algo/file_transfer/mytext.txt
│   │   │   ├── ./python-prac/python-mega-algo/file_transfer/receive_file.py
│   │   │   ├── ./python-prac/python-mega-algo/file_transfer/right.html
│   │   │   ├── ./python-prac/python-mega-algo/file_transfer/right.md
│   │   │   ├── ./python-prac/python-mega-algo/file_transfer/send_file.py
│   │   │   └── ./python-prac/python-mega-algo/file_transfer/tests
│   │   │       ├── ./python-prac/python-mega-algo/file_transfer/tests/__init__.py
│   │   │       ├── ./python-prac/python-mega-algo/file_transfer/tests/index.html
│   │   │       ├── ./python-prac/python-mega-algo/file_transfer/tests/index.md
│   │   │       ├── ./python-prac/python-mega-algo/file_transfer/tests/right.html
│   │   │       ├── ./python-prac/python-mega-algo/file_transfer/tests/right.md
│   │   │       └── ./python-prac/python-mega-algo/file_transfer/tests/test_send_file.py
│   │   ├── ./python-prac/python-mega-algo/fractals
│   │   │   ├── ./python-prac/python-mega-algo/fractals/index.html
│   │   │   ├── ./python-prac/python-mega-algo/fractals/index.md
│   │   │   ├── ./python-prac/python-mega-algo/fractals/koch_snowflake.py
│   │   │   ├── ./python-prac/python-mega-algo/fractals/mandelbrot.py
│   │   │   ├── ./python-prac/python-mega-algo/fractals/right.html
│   │   │   ├── ./python-prac/python-mega-algo/fractals/right.md
│   │   │   └── ./python-prac/python-mega-algo/fractals/sierpinski_triangle.py
│   │   ├── ./python-prac/python-mega-algo/fuzzy_logic
│   │   │   ├── ./python-prac/python-mega-algo/fuzzy_logic/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/fuzzy_logic/fuzzy_operations.py
│   │   │   ├── ./python-prac/python-mega-algo/fuzzy_logic/index.html
│   │   │   ├── ./python-prac/python-mega-algo/fuzzy_logic/index.md
│   │   │   ├── ./python-prac/python-mega-algo/fuzzy_logic/right.html
│   │   │   └── ./python-prac/python-mega-algo/fuzzy_logic/right.md
│   │   ├── ./python-prac/python-mega-algo/genetic_algorithm
│   │   │   ├── ./python-prac/python-mega-algo/genetic_algorithm/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/genetic_algorithm/basic_string.py
│   │   │   ├── ./python-prac/python-mega-algo/genetic_algorithm/index.html
│   │   │   ├── ./python-prac/python-mega-algo/genetic_algorithm/index.md
│   │   │   ├── ./python-prac/python-mega-algo/genetic_algorithm/right.html
│   │   │   └── ./python-prac/python-mega-algo/genetic_algorithm/right.md
│   │   ├── ./python-prac/python-mega-algo/geodesy
│   │   │   ├── ./python-prac/python-mega-algo/geodesy/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/geodesy/haversine_distance.py
│   │   │   ├── ./python-prac/python-mega-algo/geodesy/index.html
│   │   │   ├── ./python-prac/python-mega-algo/geodesy/index.md
│   │   │   ├── ./python-prac/python-mega-algo/geodesy/lamberts_ellipsoidal_distance.py
│   │   │   ├── ./python-prac/python-mega-algo/geodesy/right.html
│   │   │   └── ./python-prac/python-mega-algo/geodesy/right.md
│   │   ├── ./python-prac/python-mega-algo/graphics
│   │   │   ├── ./python-prac/python-mega-algo/graphics/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/graphics/bezier_curve.py
│   │   │   ├── ./python-prac/python-mega-algo/graphics/index.html
│   │   │   ├── ./python-prac/python-mega-algo/graphics/index.md
│   │   │   ├── ./python-prac/python-mega-algo/graphics/right.html
│   │   │   ├── ./python-prac/python-mega-algo/graphics/right.md
│   │   │   └── ./python-prac/python-mega-algo/graphics/vector3_for_2d_rendering.py
│   │   ├── ./python-prac/python-mega-algo/graphs
│   │   │   ├── ./python-prac/python-mega-algo/graphs/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/a_star.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/articulation_points.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/basic_graphs.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/bellman_ford.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/bfs_shortest_path.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/bfs_zero_one_shortest_path.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/bidirectional_a_star.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/bidirectional_breadth_first_search.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/breadth_first_search.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/breadth_first_search_2.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/breadth_first_search_shortest_path.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/check_bipartite_graph_bfs.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/check_bipartite_graph_dfs.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/connected_components.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/depth_first_search.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/depth_first_search_2.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/dijkstra.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/dijkstra_2.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/dijkstra_algorithm.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/dinic.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/directed_and_undirected_(weighted)_graph.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/edmonds_karp_multiple_source_and_sink.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/eulerian_path_and_circuit_for_undirected_graph.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/even_tree.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/finding_bridges.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/frequent_pattern_graph_miner.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/g_topological_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/gale_shapley_bigraph.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/graph_list.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/graph_matrix.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/graphs_floyd_warshall.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/greedy_best_first.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/index.html
│   │   │   ├── ./python-prac/python-mega-algo/graphs/index.md
│   │   │   ├── ./python-prac/python-mega-algo/graphs/kahns_algorithm_long.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/kahns_algorithm_topo.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/karger.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/markov_chain.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/minimum_spanning_tree_boruvka.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/minimum_spanning_tree_kruskal.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/minimum_spanning_tree_kruskal2.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/minimum_spanning_tree_prims.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/minimum_spanning_tree_prims2.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/multi_heuristic_astar.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/page_rank.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/prim.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/right.html
│   │   │   ├── ./python-prac/python-mega-algo/graphs/right.md
│   │   │   ├── ./python-prac/python-mega-algo/graphs/scc_kosaraju.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/strongly_connected_components.py
│   │   │   ├── ./python-prac/python-mega-algo/graphs/tarjans_scc.py
│   │   │   └── ./python-prac/python-mega-algo/graphs/tests
│   │   │       ├── ./python-prac/python-mega-algo/graphs/tests/index.html
│   │   │       ├── ./python-prac/python-mega-algo/graphs/tests/index.md
│   │   │       ├── ./python-prac/python-mega-algo/graphs/tests/right.html
│   │   │       ├── ./python-prac/python-mega-algo/graphs/tests/right.md
│   │   │       ├── ./python-prac/python-mega-algo/graphs/tests/test_min_spanning_tree_kruskal.py
│   │   │       └── ./python-prac/python-mega-algo/graphs/tests/test_min_spanning_tree_prim.py
│   │   ├── ./python-prac/python-mega-algo/hashes
│   │   │   ├── ./python-prac/python-mega-algo/hashes/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/hashes/adler32.py
│   │   │   ├── ./python-prac/python-mega-algo/hashes/chaos_machine.py
│   │   │   ├── ./python-prac/python-mega-algo/hashes/djb2.py
│   │   │   ├── ./python-prac/python-mega-algo/hashes/enigma_machine.py
│   │   │   ├── ./python-prac/python-mega-algo/hashes/hamming_code.py
│   │   │   ├── ./python-prac/python-mega-algo/hashes/index.html
│   │   │   ├── ./python-prac/python-mega-algo/hashes/index.md
│   │   │   ├── ./python-prac/python-mega-algo/hashes/md5.py
│   │   │   ├── ./python-prac/python-mega-algo/hashes/right.html
│   │   │   ├── ./python-prac/python-mega-algo/hashes/right.md
│   │   │   ├── ./python-prac/python-mega-algo/hashes/sdbm.py
│   │   │   └── ./python-prac/python-mega-algo/hashes/sha1.py
│   │   ├── ./python-prac/python-mega-algo/index.html
│   │   ├── ./python-prac/python-mega-algo/index.md
│   │   ├── ./python-prac/python-mega-algo/knapsack
│   │   │   ├── ./python-prac/python-mega-algo/knapsack/README.html
│   │   │   ├── ./python-prac/python-mega-algo/knapsack/README.md
│   │   │   ├── ./python-prac/python-mega-algo/knapsack/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/knapsack/greedy_knapsack.py
│   │   │   ├── ./python-prac/python-mega-algo/knapsack/index.html
│   │   │   ├── ./python-prac/python-mega-algo/knapsack/index.md
│   │   │   ├── ./python-prac/python-mega-algo/knapsack/knapsack.py
│   │   │   ├── ./python-prac/python-mega-algo/knapsack/right.html
│   │   │   ├── ./python-prac/python-mega-algo/knapsack/right.md
│   │   │   └── ./python-prac/python-mega-algo/knapsack/tests
│   │   │       ├── ./python-prac/python-mega-algo/knapsack/tests/__init__.py
│   │   │       ├── ./python-prac/python-mega-algo/knapsack/tests/index.html
│   │   │       ├── ./python-prac/python-mega-algo/knapsack/tests/index.md
│   │   │       ├── ./python-prac/python-mega-algo/knapsack/tests/right.html
│   │   │       ├── ./python-prac/python-mega-algo/knapsack/tests/right.md
│   │   │       ├── ./python-prac/python-mega-algo/knapsack/tests/test_greedy_knapsack.py
│   │   │       └── ./python-prac/python-mega-algo/knapsack/tests/test_knapsack.py
│   │   ├── ./python-prac/python-mega-algo/linear_algebra
│   │   │   ├── ./python-prac/python-mega-algo/linear_algebra/README.html
│   │   │   ├── ./python-prac/python-mega-algo/linear_algebra/README.md
│   │   │   ├── ./python-prac/python-mega-algo/linear_algebra/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/linear_algebra/index.html
│   │   │   ├── ./python-prac/python-mega-algo/linear_algebra/index.md
│   │   │   ├── ./python-prac/python-mega-algo/linear_algebra/right.html
│   │   │   ├── ./python-prac/python-mega-algo/linear_algebra/right.md
│   │   │   └── ./python-prac/python-mega-algo/linear_algebra/src
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/__init__.py
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/conjugate_gradient.py
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/index.html
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/index.md
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/lib.py
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/polynom_for_points.py
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/power_iteration.py
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/rayleigh_quotient.py
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/right.html
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/right.md
│   │   │       ├── ./python-prac/python-mega-algo/linear_algebra/src/test_linear_algebra.py
│   │   │       └── ./python-prac/python-mega-algo/linear_algebra/src/transformations_2d.py
│   │   ├── ./python-prac/python-mega-algo/machine_learning
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/astar.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/data_transformations.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/decision_tree.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/forecasting
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/forecasting/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/forecasting/ex_data.csv
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/forecasting/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/forecasting/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/forecasting/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/forecasting/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/machine_learning/forecasting/run.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/gaussian_naive_bayes.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/gradient_boosting_regressor.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/gradient_descent.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/index.html
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/index.md
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/k_means_clust.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/k_nearest_neighbours.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/knn_sklearn.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/linear_discriminant_analysis.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/linear_regression.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/logistic_regression.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/lstm
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/lstm/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/lstm/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/lstm/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/lstm/lstm_prediction.py
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/lstm/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/machine_learning/lstm/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/machine_learning/lstm/sample_data.csv
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/multilayer_perceptron_classifier.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/polymonial_regression.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/random_forest_classifier.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/random_forest_regressor.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/right.html
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/right.md
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/scoring_functions.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/sequential_minimum_optimization.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/similarity_search.py
│   │   │   ├── ./python-prac/python-mega-algo/machine_learning/support_vector_machines.py
│   │   │   └── ./python-prac/python-mega-algo/machine_learning/word_frequency_functions.py
│   │   ├── ./python-prac/python-mega-algo/maths
│   │   │   ├── ./python-prac/python-mega-algo/maths/3n_plus_1.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/abs.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/abs_max.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/abs_min.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/add.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/aliquot_sum.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/allocation_number.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/area.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/area_under_curve.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/armstrong_numbers.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/average_mean.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/average_median.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/average_mode.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/bailey_borwein_plouffe.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/basic_maths.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/binary_exp_mod.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/binary_exponentiation.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/binary_exponentiation_2.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/binary_exponentiation_3.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/binomial_coefficient.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/binomial_distribution.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/bisection.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/ceil.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/chudnovsky_algorithm.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/collatz_sequence.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/combinations.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/decimal_isolate.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/entropy.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/euclidean_distance.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/euclidean_gcd.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/euler_method.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/eulers_totient.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/extended_euclidean_algorithm.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/factorial_iterative.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/factorial_python.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/factorial_recursive.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/factors.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/fermat_little_theorem.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/fibonacci.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/fibonacci_sequence_recursion.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/find_max.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/find_max_recursion.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/find_min.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/find_min_recursion.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/floor.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/gamma.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/gaussian.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/greatest_common_divisor.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/greedy_coin_change.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/hardy_ramanujanalgo.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/images
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/images/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/images/gaussian.png
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/images/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/images/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/images/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/maths/images/right.md
│   │   │   ├── ./python-prac/python-mega-algo/maths/index.html
│   │   │   ├── ./python-prac/python-mega-algo/maths/index.md
│   │   │   ├── ./python-prac/python-mega-algo/maths/integration_by_simpson_approx.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/is_square_free.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/jaccard_similarity.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/kadanes.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/karatsuba.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/krishnamurthy_number.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/kth_lexicographic_permutation.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/largest_of_very_large_numbers.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/largest_subarray_sum.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/least_common_multiple.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/line_length.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/lucas_lehmer_primality_test.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/lucas_series.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/matrix_exponentiation.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/max_sum_sliding_window.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/median_of_two_arrays.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/miller_rabin.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/mobius_function.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/modular_exponential.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/monte_carlo.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/monte_carlo_dice.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/newton_raphson.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/number_of_digits.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/numerical_integration.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/perfect_cube.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/perfect_number.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/perfect_square.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/pi_monte_carlo_estimation.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/polynomial_evaluation.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/power_using_recursion.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/prime_check.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/prime_factors.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/prime_numbers.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/prime_sieve_eratosthenes.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/primelib.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/pythagoras.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/qr_decomposition.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/quadratic_equations_complex_numbers.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/radians.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/radix2_fft.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/relu.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/right.html
│   │   │   ├── ./python-prac/python-mega-algo/maths/right.md
│   │   │   ├── ./python-prac/python-mega-algo/maths/runge_kutta.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/segmented_sieve.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/series
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/series/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/series/arithmetic_mean.py
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/series/geometric_mean.py
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/series/geometric_series.py
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/series/harmonic_series.py
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/series/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/series/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/series/p_series.py
│   │   │   │   ├── ./python-prac/python-mega-algo/maths/series/right.html
│   │   │   │   └── ./python-prac/python-mega-algo/maths/series/right.md
│   │   │   ├── ./python-prac/python-mega-algo/maths/sieve_of_eratosthenes.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/sigmoid.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/simpson_rule.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/softmax.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/square_root.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/sum_of_arithmetic_series.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/sum_of_digits.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/sum_of_geometric_progression.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/test_prime_check.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/trapezoidal_rule.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/triplet_sum.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/two_pointer.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/two_sum.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/ugly_numbers.py
│   │   │   ├── ./python-prac/python-mega-algo/maths/volume.py
│   │   │   └── ./python-prac/python-mega-algo/maths/zellers_congruence.py
│   │   ├── ./python-prac/python-mega-algo/matrix
│   │   │   ├── ./python-prac/python-mega-algo/matrix/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/matrix/count_islands_in_matrix.py
│   │   │   ├── ./python-prac/python-mega-algo/matrix/index.html
│   │   │   ├── ./python-prac/python-mega-algo/matrix/index.md
│   │   │   ├── ./python-prac/python-mega-algo/matrix/inverse_of_matrix.py
│   │   │   ├── ./python-prac/python-mega-algo/matrix/matrix_class.py
│   │   │   ├── ./python-prac/python-mega-algo/matrix/matrix_operation.py
│   │   │   ├── ./python-prac/python-mega-algo/matrix/nth_fibonacci_using_matrix_exponentiation.py
│   │   │   ├── ./python-prac/python-mega-algo/matrix/right.html
│   │   │   ├── ./python-prac/python-mega-algo/matrix/right.md
│   │   │   ├── ./python-prac/python-mega-algo/matrix/rotate_matrix.py
│   │   │   ├── ./python-prac/python-mega-algo/matrix/searching_in_sorted_matrix.py
│   │   │   ├── ./python-prac/python-mega-algo/matrix/sherman_morrison.py
│   │   │   ├── ./python-prac/python-mega-algo/matrix/spiral_print.py
│   │   │   └── ./python-prac/python-mega-algo/matrix/tests
│   │   │       ├── ./python-prac/python-mega-algo/matrix/tests/__init__.py
│   │   │       ├── ./python-prac/python-mega-algo/matrix/tests/index.html
│   │   │       ├── ./python-prac/python-mega-algo/matrix/tests/index.md
│   │   │       ├── ./python-prac/python-mega-algo/matrix/tests/pytest.ini
│   │   │       ├── ./python-prac/python-mega-algo/matrix/tests/right.html
│   │   │       ├── ./python-prac/python-mega-algo/matrix/tests/right.md
│   │   │       └── ./python-prac/python-mega-algo/matrix/tests/test_matrix_operation.py
│   │   ├── ./python-prac/python-mega-algo/mypy.ini
│   │   ├── ./python-prac/python-mega-algo/networking_flow
│   │   │   ├── ./python-prac/python-mega-algo/networking_flow/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/networking_flow/ford_fulkerson.py
│   │   │   ├── ./python-prac/python-mega-algo/networking_flow/index.html
│   │   │   ├── ./python-prac/python-mega-algo/networking_flow/index.md
│   │   │   ├── ./python-prac/python-mega-algo/networking_flow/minimum_cut.py
│   │   │   ├── ./python-prac/python-mega-algo/networking_flow/right.html
│   │   │   └── ./python-prac/python-mega-algo/networking_flow/right.md
│   │   ├── ./python-prac/python-mega-algo/neural_network
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/2_hidden_layers_neural_network.py
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/back_propagation_neural_network.py
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/convolution_neural_network.py
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/gan.py_tf
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/index.html
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/index.md
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/input_data.py_tf
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/perceptron.py
│   │   │   ├── ./python-prac/python-mega-algo/neural_network/right.html
│   │   │   └── ./python-prac/python-mega-algo/neural_network/right.md
│   │   ├── ./python-prac/python-mega-algo/other
│   │   │   ├── ./python-prac/python-mega-algo/other/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/other/activity_selection.py
│   │   │   ├── ./python-prac/python-mega-algo/other/davis–putnam–logemann–loveland.py
│   │   │   ├── ./python-prac/python-mega-algo/other/dijkstra_bankers_algorithm.py
│   │   │   ├── ./python-prac/python-mega-algo/other/doomsday.py
│   │   │   ├── ./python-prac/python-mega-algo/other/fischer_yates_shuffle.py
│   │   │   ├── ./python-prac/python-mega-algo/other/gauss_easter.py
│   │   │   ├── ./python-prac/python-mega-algo/other/graham_scan.py
│   │   │   ├── ./python-prac/python-mega-algo/other/greedy.py
│   │   │   ├── ./python-prac/python-mega-algo/other/index.html
│   │   │   ├── ./python-prac/python-mega-algo/other/index.md
│   │   │   ├── ./python-prac/python-mega-algo/other/least_recently_used.py
│   │   │   ├── ./python-prac/python-mega-algo/other/lfu_cache.py
│   │   │   ├── ./python-prac/python-mega-algo/other/linear_congruential_generator.py
│   │   │   ├── ./python-prac/python-mega-algo/other/lru_cache.py
│   │   │   ├── ./python-prac/python-mega-algo/other/magicdiamondpattern.py
│   │   │   ├── ./python-prac/python-mega-algo/other/nested_brackets.py
│   │   │   ├── ./python-prac/python-mega-algo/other/password_generator.py
│   │   │   ├── ./python-prac/python-mega-algo/other/right.html
│   │   │   ├── ./python-prac/python-mega-algo/other/right.md
│   │   │   ├── ./python-prac/python-mega-algo/other/scoring_algorithm.py
│   │   │   ├── ./python-prac/python-mega-algo/other/sdes.py
│   │   │   └── ./python-prac/python-mega-algo/other/tower_of_hanoi.py
│   │   ├── ./python-prac/python-mega-algo/physics
│   │   │   ├── ./python-prac/python-mega-algo/physics/index.html
│   │   │   ├── ./python-prac/python-mega-algo/physics/index.md
│   │   │   ├── ./python-prac/python-mega-algo/physics/n_body_simulation.py
│   │   │   ├── ./python-prac/python-mega-algo/physics/right.html
│   │   │   └── ./python-prac/python-mega-algo/physics/right.md
│   │   ├── ./python-prac/python-mega-algo/project_euler
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/README.html
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/README.md
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/index.html
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/index.md
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/sol2.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/sol3.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/sol4.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/sol5.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_001/sol6.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_001/sol7.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002/sol2.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002/sol3.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_002/sol4.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_002/sol5.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_003
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_003/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_003/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_003/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_003/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_003/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_003/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_003/sol2.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_003/sol3.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_004
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_004/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_004/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_004/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_004/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_004/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_004/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_004/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_005
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_005/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_005/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_005/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_005/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_005/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_005/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_005/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_006
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_006/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_006/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_006/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_006/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_006/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_006/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_006/sol2.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_006/sol3.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_006/sol4.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_007
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_007/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_007/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_007/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_007/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_007/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_007/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_007/sol2.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_007/sol3.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_008
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_008/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_008/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_008/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_008/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_008/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_008/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_008/sol2.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_008/sol3.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_009
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_009/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_009/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_009/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_009/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_009/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_009/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_009/sol2.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_009/sol3.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_010
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_010/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_010/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_010/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_010/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_010/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_010/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_010/sol2.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_010/sol3.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_011
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_011/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_011/grid.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_011/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_011/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_011/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_011/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_011/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_011/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_012
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_012/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_012/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_012/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_012/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_012/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_012/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_012/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_013
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_013/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_013/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_013/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_013/num.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_013/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_013/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_013/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_014
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_014/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_014/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_014/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_014/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_014/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_014/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_014/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_015
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_015/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_015/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_015/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_015/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_015/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_015/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_016
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_016/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_016/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_016/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_016/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_016/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_016/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_016/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_017
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_017/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_017/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_017/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_017/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_017/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_017/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_018
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_018/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_018/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_018/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_018/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_018/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_018/solution.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_018/triangle.txt
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_019
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_019/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_019/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_019/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_019/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_019/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_019/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_020
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_020/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_020/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_020/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_020/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_020/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_020/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_020/sol2.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_020/sol3.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_020/sol4.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_021
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_021/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_021/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_021/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_021/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_021/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_021/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_022
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_022/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_022/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_022/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_022/p022_names.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_022/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_022/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_022/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_022/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_023
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_023/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_023/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_023/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_023/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_023/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_023/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_024
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_024/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_024/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_024/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_024/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_024/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_024/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_025
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_025/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_025/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_025/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_025/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_025/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_025/sol1.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_025/sol2.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_025/sol3.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_026
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_026/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_026/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_026/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_026/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_026/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_026/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_027
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_027/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_027/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_027/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_027/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_027/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_027/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_028
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_028/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_028/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_028/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_028/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_028/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_028/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_029
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_029/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_029/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_029/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_029/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_029/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_029/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_030
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_030/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_030/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_030/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_030/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_030/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_030/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_031
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_031/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_031/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_031/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_031/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_031/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_031/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_031/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_032
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_032/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_032/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_032/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_032/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_032/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_032/sol32.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_033
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_033/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_033/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_033/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_033/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_033/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_033/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_034
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_034/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_034/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_034/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_034/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_034/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_034/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_035
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_035/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_035/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_035/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_035/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_035/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_035/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_036
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_036/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_036/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_036/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_036/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_036/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_036/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_037
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_037/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_037/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_037/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_037/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_037/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_037/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_038
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_038/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_038/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_038/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_038/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_038/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_038/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_039
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_039/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_039/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_039/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_039/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_039/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_039/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_040
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_040/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_040/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_040/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_040/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_040/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_040/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_041
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_041/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_041/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_041/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_041/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_041/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_041/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_042
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_042/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_042/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_042/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_042/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_042/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_042/solution42.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_042/words.txt
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_043
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_043/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_043/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_043/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_043/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_043/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_043/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_044
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_044/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_044/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_044/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_044/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_044/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_044/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_045
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_045/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_045/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_045/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_045/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_045/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_045/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_046
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_046/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_046/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_046/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_046/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_046/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_046/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_047
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_047/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_047/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_047/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_047/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_047/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_047/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_048
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_048/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_048/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_048/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_048/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_048/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_048/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_049
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_049/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_049/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_049/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_049/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_049/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_049/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_050
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_050/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_050/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_050/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_050/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_050/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_050/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_051
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_051/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_051/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_051/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_051/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_051/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_051/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_052
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_052/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_052/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_052/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_052/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_052/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_052/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_053
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_053/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_053/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_053/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_053/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_053/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_053/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_054
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_054/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_054/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_054/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_054/poker_hands.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_054/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_054/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_054/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_054/test_poker_hand.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_055
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_055/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_055/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_055/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_055/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_055/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_055/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_056
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_056/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_056/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_056/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_056/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_056/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_056/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_057
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_057/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_057/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_057/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_057/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_057/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_057/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_058
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_058/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_058/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_058/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_058/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_058/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_058/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_059
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_059/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_059/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_059/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_059/p059_cipher.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_059/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_059/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_059/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_059/test_cipher.txt
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_062
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_062/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_062/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_062/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_062/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_062/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_062/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_063
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_063/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_063/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_063/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_063/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_063/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_063/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_064
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_064/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_064/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_064/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_064/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_064/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_064/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_065
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_065/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_065/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_065/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_065/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_065/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_065/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_067
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_067/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_067/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_067/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_067/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_067/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_067/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_067/triangle.txt
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_069
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_069/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_069/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_069/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_069/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_069/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_069/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_070
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_070/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_070/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_070/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_070/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_070/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_070/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_071
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_071/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_071/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_071/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_071/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_071/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_071/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_072
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_072/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_072/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_072/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_072/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_072/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_072/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_072/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_074
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_074/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_074/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_074/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_074/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_074/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_074/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_074/sol2.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_075
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_075/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_075/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_075/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_075/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_075/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_075/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_076
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_076/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_076/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_076/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_076/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_076/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_076/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_077
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_077/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_077/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_077/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_077/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_077/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_077/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_080
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_080/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_080/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_080/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_080/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_080/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_080/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_081
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_081/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_081/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_081/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_081/matrix.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_081/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_081/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_081/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_085
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_085/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_085/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_085/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_085/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_085/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_085/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_086
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_086/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_086/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_086/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_086/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_086/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_086/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_087
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_087/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_087/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_087/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_087/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_087/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_087/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_089
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_089/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_089/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_089/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_089/numeralcleanup_test.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_089/p089_roman.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_089/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_089/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_089/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_091
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_091/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_091/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_091/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_091/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_091/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_091/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_097
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_097/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_097/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_097/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_097/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_097/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_097/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_099
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_099/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_099/base_exp.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_099/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_099/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_099/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_099/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_099/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_101
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_101/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_101/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_101/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_101/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_101/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_101/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_102
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_102/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_102/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_102/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_102/p102_triangles.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_102/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_102/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_102/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_102/test_triangles.txt
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_107
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_107/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_107/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_107/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_107/p107_network.txt
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_107/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_107/right.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_107/sol1.py
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_107/test_network.txt
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_109
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_109/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_109/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_109/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_109/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_109/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_109/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_112
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_112/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_112/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_112/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_112/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_112/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_112/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_113
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_113/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_113/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_113/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_113/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_113/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_113/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_119
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_119/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_119/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_119/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_119/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_119/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_119/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_120
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_120/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_120/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_120/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_120/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_120/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_120/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_121
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_121/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_121/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_121/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_121/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_121/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_121/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_123
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_123/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_123/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_123/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_123/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_123/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_123/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_125
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_125/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_125/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_125/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_125/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_125/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_125/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_129
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_129/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_129/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_129/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_129/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_129/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_129/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_135
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_135/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_135/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_135/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_135/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_135/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_135/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_173
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_173/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_173/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_173/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_173/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_173/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_173/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_174
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_174/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_174/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_174/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_174/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_174/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_174/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_180
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_180/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_180/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_180/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_180/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_180/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_180/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_188
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_188/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_188/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_188/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_188/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_188/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_188/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_191
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_191/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_191/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_191/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_191/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_191/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_191/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_203
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_203/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_203/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_203/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_203/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_203/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_203/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_206
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_206/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_206/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_206/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_206/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_206/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_206/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_207
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_207/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_207/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_207/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_207/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_207/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_207/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_234
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_234/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_234/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_234/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_234/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_234/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_234/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_301
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_301/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_301/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_301/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_301/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_301/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_301/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_551
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_551/__init__.py
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_551/index.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_551/index.md
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_551/right.html
│   │   │   │   ├── ./python-prac/python-mega-algo/project_euler/problem_551/right.md
│   │   │   │   └── ./python-prac/python-mega-algo/project_euler/problem_551/sol1.py
│   │   │   ├── ./python-prac/python-mega-algo/project_euler/right.html
│   │   │   └── ./python-prac/python-mega-algo/project_euler/right.md
│   │   ├── ./python-prac/python-mega-algo/pytest.ini
│   │   ├── ./python-prac/python-mega-algo/quantum
│   │   │   ├── ./python-prac/python-mega-algo/quantum/README.html
│   │   │   ├── ./python-prac/python-mega-algo/quantum/README.md
│   │   │   ├── ./python-prac/python-mega-algo/quantum/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/quantum/deutsch_jozsa.py
│   │   │   ├── ./python-prac/python-mega-algo/quantum/half_adder.py
│   │   │   ├── ./python-prac/python-mega-algo/quantum/index.html
│   │   │   ├── ./python-prac/python-mega-algo/quantum/index.md
│   │   │   ├── ./python-prac/python-mega-algo/quantum/not_gate.py
│   │   │   ├── ./python-prac/python-mega-algo/quantum/quantum_entanglement.py
│   │   │   ├── ./python-prac/python-mega-algo/quantum/right.html
│   │   │   ├── ./python-prac/python-mega-algo/quantum/right.md
│   │   │   ├── ./python-prac/python-mega-algo/quantum/ripple_adder_classic.py
│   │   │   └── ./python-prac/python-mega-algo/quantum/single_qubit_measure.py
│   │   ├── ./python-prac/python-mega-algo/requirements.txt
│   │   ├── ./python-prac/python-mega-algo/right.html
│   │   ├── ./python-prac/python-mega-algo/right.md
│   │   ├── ./python-prac/python-mega-algo/scheduling
│   │   │   ├── ./python-prac/python-mega-algo/scheduling/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/scheduling/first_come_first_served.py
│   │   │   ├── ./python-prac/python-mega-algo/scheduling/index.html
│   │   │   ├── ./python-prac/python-mega-algo/scheduling/index.md
│   │   │   ├── ./python-prac/python-mega-algo/scheduling/right.html
│   │   │   ├── ./python-prac/python-mega-algo/scheduling/right.md
│   │   │   ├── ./python-prac/python-mega-algo/scheduling/round_robin.py
│   │   │   └── ./python-prac/python-mega-algo/scheduling/shortest_job_first.py
│   │   ├── ./python-prac/python-mega-algo/scripts
│   │   │   ├── ./python-prac/python-mega-algo/scripts/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/scripts/build_directory_md.py
│   │   │   ├── ./python-prac/python-mega-algo/scripts/index.html
│   │   │   ├── ./python-prac/python-mega-algo/scripts/index.md
│   │   │   ├── ./python-prac/python-mega-algo/scripts/project_euler_answers.json
│   │   │   ├── ./python-prac/python-mega-algo/scripts/right.html
│   │   │   ├── ./python-prac/python-mega-algo/scripts/right.md
│   │   │   ├── ./python-prac/python-mega-algo/scripts/validate_filenames.py
│   │   │   └── ./python-prac/python-mega-algo/scripts/validate_solutions.py
│   │   ├── ./python-prac/python-mega-algo/searches
│   │   │   ├── ./python-prac/python-mega-algo/searches/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/binary_search.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/binary_tree_traversal.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/double_linear_search.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/double_linear_search_recursion.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/fibonacci_search.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/hill_climbing.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/index.html
│   │   │   ├── ./python-prac/python-mega-algo/searches/index.md
│   │   │   ├── ./python-prac/python-mega-algo/searches/interpolation_search.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/jump_search.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/linear_search.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/quick_select.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/right.html
│   │   │   ├── ./python-prac/python-mega-algo/searches/right.md
│   │   │   ├── ./python-prac/python-mega-algo/searches/sentinel_linear_search.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/simple_binary_search.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/simulated_annealing.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/tabu_search.py
│   │   │   ├── ./python-prac/python-mega-algo/searches/tabu_test_data.txt
│   │   │   └── ./python-prac/python-mega-algo/searches/ternary_search.py
│   │   ├── ./python-prac/python-mega-algo/sorts
│   │   │   ├── ./python-prac/python-mega-algo/sorts/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/bead_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/bitonic_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/bogo_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/bubble_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/bucket_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/cocktail_shaker_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/comb_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/counting_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/cycle_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/double_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/external_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/gnome_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/heap_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/index.html
│   │   │   ├── ./python-prac/python-mega-algo/sorts/index.md
│   │   │   ├── ./python-prac/python-mega-algo/sorts/insertion_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/intro_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/iterative_merge_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/merge_insertion_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/merge_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/msd_radix_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/natural_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/normal_distribution_quick_sort.html
│   │   │   ├── ./python-prac/python-mega-algo/sorts/normal_distribution_quick_sort.md
│   │   │   ├── ./python-prac/python-mega-algo/sorts/odd_even_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/odd_even_transposition_parallel.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/odd_even_transposition_single_threaded.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/pancake_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/patience_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/pigeon_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/pigeonhole_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/quick_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/quick_sort_3_partition.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/radix_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/random_normal_distribution_quicksort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/random_pivot_quick_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/recursive_bubble_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/recursive_insertion_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/recursive_mergesort_array.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/recursive_quick_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/right.html
│   │   │   ├── ./python-prac/python-mega-algo/sorts/right.md
│   │   │   ├── ./python-prac/python-mega-algo/sorts/selection_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/shell_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/slowsort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/stooge_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/strand_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/tim_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/topological_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/tree_sort.py
│   │   │   ├── ./python-prac/python-mega-algo/sorts/unknown_sort.py
│   │   │   └── ./python-prac/python-mega-algo/sorts/wiggle_sort.py
│   │   ├── ./python-prac/python-mega-algo/strings
│   │   │   ├── ./python-prac/python-mega-algo/strings/__init__.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/aho_corasick.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/anagrams.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/autocomplete_using_trie.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/boyer_moore_search.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/can_string_be_rearranged_as_palindrome.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/capitalize.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/check_anagrams.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/check_pangram.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/detecting_english_programmatically.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/dictionary.txt
│   │   │   ├── ./python-prac/python-mega-algo/strings/frequency_finder.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/index.html
│   │   │   ├── ./python-prac/python-mega-algo/strings/index.md
│   │   │   ├── ./python-prac/python-mega-algo/strings/is_palindrome.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/jaro_winkler.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/knuth_morris_pratt.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/levenshtein_distance.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/lower.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/manacher.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/min_cost_string_conversion.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/naive_string_search.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/palindrome.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/prefix_function.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/rabin_karp.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/remove_duplicate.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/reverse_letters.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/reverse_words.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/right.html
│   │   │   ├── ./python-prac/python-mega-algo/strings/right.md
│   │   │   ├── ./python-prac/python-mega-algo/strings/split.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/swap_case.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/upper.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/word_occurrence.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/word_patterns.py
│   │   │   ├── ./python-prac/python-mega-algo/strings/words.txt
│   │   │   └── ./python-prac/python-mega-algo/strings/z_function.py
│   │   └── ./python-prac/python-mega-algo/web_programming
│   │       ├── ./python-prac/python-mega-algo/web_programming/__init__.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/co2_emission.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/covid_stats_via_xpath.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/crawl_google_results.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/crawl_google_scholar_citation.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/currency_converter.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/current_stock_price.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/current_weather.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/daily_horoscope.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/emails_from_url.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/fetch_bbc_news.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/fetch_github_info.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/fetch_jobs.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/get_imdb_top_250_movies_csv.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/get_imdbtop.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/index.html
│   │       ├── ./python-prac/python-mega-algo/web_programming/index.md
│   │       ├── ./python-prac/python-mega-algo/web_programming/instagram_crawler.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/instagram_pic.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/instagram_video.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/recaptcha_verification.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/right.html
│   │       ├── ./python-prac/python-mega-algo/web_programming/right.md
│   │       ├── ./python-prac/python-mega-algo/web_programming/slack_message.py
│   │       ├── ./python-prac/python-mega-algo/web_programming/test_fetch_github_info.py
│   │       └── ./python-prac/python-mega-algo/web_programming/world_covid19_stats.py
│   ├── ./python-prac/python-scripts
│   │   ├── ./python-prac/python-scripts/TODO.html
│   │   ├── ./python-prac/python-scripts/TODO.md
│   │   ├── ./python-prac/python-scripts/index.html
│   │   ├── ./python-prac/python-scripts/index.md
│   │   ├── ./python-prac/python-scripts/readme.html
│   │   ├── ./python-prac/python-scripts/readme.md
│   │   ├── ./python-prac/python-scripts/requirements.txt
│   │   └── ./python-prac/python-scripts/scripts
│   │       ├── ./python-prac/python-scripts/scripts/01_remove_all_pyc.html
│   │       ├── ./python-prac/python-scripts/scripts/01_remove_all_pyc.md
│   │       ├── ./python-prac/python-scripts/scripts/02_find_all_links.py
│   │       ├── ./python-prac/python-scripts/scripts/03_simple_twitter_manager.py
│   │       ├── ./python-prac/python-scripts/scripts/04_rename_with_slice.py
│   │       ├── ./python-prac/python-scripts/scripts/05_load_json_without_dupes.py
│   │       ├── ./python-prac/python-scripts/scripts/06_execution_time.py
│   │       ├── ./python-prac/python-scripts/scripts/07_benchmark_permissions_loading_django.py
│   │       ├── ./python-prac/python-scripts/scripts/08_basic_email_web_crawler.py
│   │       ├── ./python-prac/python-scripts/scripts/09_basic_link_web_crawler.py
│   │       ├── ./python-prac/python-scripts/scripts/10_find_files_recursively.py
│   │       ├── ./python-prac/python-scripts/scripts/11_optimize_images_with_wand.py
│   │       ├── ./python-prac/python-scripts/scripts/12_csv_split.py
│   │       ├── ./python-prac/python-scripts/scripts/12_sample_csv.csv
│   │       ├── ./python-prac/python-scripts/scripts/13_random_name_generator.py
│   │       ├── ./python-prac/python-scripts/scripts/14_html_to_markdown.sh
│   │       ├── ./python-prac/python-scripts/scripts/15_check_my_environment.py
│   │       ├── ./python-prac/python-scripts/scripts/16_jinja_quick_load.py
│   │       ├── ./python-prac/python-scripts/scripts/17_rewrite_git_history.html
│   │       ├── ./python-prac/python-scripts/scripts/17_rewrite_git_history.md
│   │       ├── ./python-prac/python-scripts/scripts/18_zipper.py
│   │       ├── ./python-prac/python-scripts/scripts/19_tsv-to-csv.py
│   │       ├── ./python-prac/python-scripts/scripts/20_restore_file_from_git.py
│   │       ├── ./python-prac/python-scripts/scripts/21_twitter_bot.py
│   │       ├── ./python-prac/python-scripts/scripts/22_git_tag.py
│   │       ├── ./python-prac/python-scripts/scripts/23_flask_session_test.py
│   │       ├── ./python-prac/python-scripts/scripts/24_sql2csv.py
│   │       ├── ./python-prac/python-scripts/scripts/25_ip2geolocation.py
│   │       ├── ./python-prac/python-scripts/scripts/25_sample_csv.csv
│   │       ├── ./python-prac/python-scripts/scripts/26_stock_scraper.py
│   │       ├── ./python-prac/python-scripts/scripts/27_send_sms.py
│   │       ├── ./python-prac/python-scripts/scripts/28_income_tax_calculator.py
│   │       ├── ./python-prac/python-scripts/scripts/29_json_test.json
│   │       ├── ./python-prac/python-scripts/scripts/29_json_to_yaml.py
│   │       ├── ./python-prac/python-scripts/scripts/30_fullcontact.py
│   │       ├── ./python-prac/python-scripts/scripts/31_youtube_sentiment.py
│   │       ├── ./python-prac/python-scripts/scripts/32_stock_scraper.py
│   │       ├── ./python-prac/python-scripts/scripts/33_country_code.py
│   │       ├── ./python-prac/python-scripts/scripts/33_country_codes.json
│   │       ├── ./python-prac/python-scripts/scripts/33_sample_csv.csv
│   │       ├── ./python-prac/python-scripts/scripts/34_git_all_repos.py
│   │       ├── ./python-prac/python-scripts/scripts/data.csv
│   │       ├── ./python-prac/python-scripts/scripts/index.html
│   │       └── ./python-prac/python-scripts/scripts/index.md
│   ├── ./python-prac/renovate.json
│   ├── ./python-prac/right.html
│   ├── ./python-prac/right.md
│   ├── ./python-prac/right.md.html
│   ├── ./python-prac/right.md.md
│   └── ./python-prac/robots.txt
└── ./tools
    └── ./tools/tools
        ├── ./tools/tools/BUILD.bazel
        ├── ./tools/tools/CONTRIBUTING.md
        ├── ./tools/tools/FORMAT-GUIDE.md
        ├── ./tools/tools/LICENSE
        ├── ./tools/tools/README.md
        ├── ./tools/tools/WORKSPACE
        ├── ./tools/tools/claat
        │   ├── ./tools/tools/claat/Makefile
        │   ├── ./tools/tools/claat/README.md
        │   ├── ./tools/tools/claat/VERSION
        │   ├── ./tools/tools/claat/bin
        │   │   └── ./tools/tools/claat/bin/nb2cl
        │   ├── ./tools/tools/claat/cmd
        │   │   ├── ./tools/tools/claat/cmd/export.go
        │   │   ├── ./tools/tools/claat/cmd/export_test.go
        │   │   ├── ./tools/tools/claat/cmd/serve.go
        │   │   ├── ./tools/tools/claat/cmd/testdata
        │   │   │   ├── ./tools/tools/claat/cmd/testdata/fragments
        │   │   │   │   ├── ./tools/tools/claat/cmd/testdata/fragments/import-test-fragment1.md
        │   │   │   │   └── ./tools/tools/claat/cmd/testdata/fragments/import-test-fragment2.md
        │   │   │   ├── ./tools/tools/claat/cmd/testdata/import-test.md
        │   │   │   └── ./tools/tools/claat/cmd/testdata/simple-2-steps.md
        │   │   ├── ./tools/tools/claat/cmd/update.go
        │   │   └── ./tools/tools/claat/cmd/util.go
        │   ├── ./tools/tools/claat/fetch
        │   │   ├── ./tools/tools/claat/fetch/drive
        │   │   │   └── ./tools/tools/claat/fetch/drive/auth
        │   │   │       ├── ./tools/tools/claat/fetch/drive/auth/auth.go
        │   │   │       └── ./tools/tools/claat/fetch/drive/auth/auth_test.go
        │   │   ├── ./tools/tools/claat/fetch/fetch.go
        │   │   ├── ./tools/tools/claat/fetch/fetch_test.go
        │   │   └── ./tools/tools/claat/fetch/testdata
        │   │       └── ./tools/tools/claat/fetch/testdata/gdoc.html
        │   ├── ./tools/tools/claat/go.mod
        │   ├── ./tools/tools/claat/go.sum
        │   ├── ./tools/tools/claat/main.go
        │   ├── ./tools/tools/claat/nodes
        │   │   ├── ./tools/tools/claat/nodes/iframe.go
        │   │   ├── ./tools/tools/claat/nodes/iframe_test.go
        │   │   ├── ./tools/tools/claat/nodes/infobox.go
        │   │   ├── ./tools/tools/claat/nodes/infobox_test.go
        │   │   ├── ./tools/tools/claat/nodes/node.go
        │   │   ├── ./tools/tools/claat/nodes/survey.go
        │   │   ├── ./tools/tools/claat/nodes/survey_test.go
        │   │   ├── ./tools/tools/claat/nodes/youtube.go
        │   │   └── ./tools/tools/claat/nodes/youtube_test.go
        │   ├── ./tools/tools/claat/parser
        │   │   ├── ./tools/tools/claat/parser/gdoc
        │   │   │   ├── ./tools/tools/claat/parser/gdoc/css.go
        │   │   │   ├── ./tools/tools/claat/parser/gdoc/html.go
        │   │   │   ├── ./tools/tools/claat/parser/gdoc/parse.go
        │   │   │   └── ./tools/tools/claat/parser/gdoc/parse_test.go
        │   │   ├── ./tools/tools/claat/parser/md
        │   │   │   ├── ./tools/tools/claat/parser/md/README.md
        │   │   │   ├── ./tools/tools/claat/parser/md/html.go
        │   │   │   ├── ./tools/tools/claat/parser/md/html_test.go
        │   │   │   ├── ./tools/tools/claat/parser/md/parse.go
        │   │   │   └── ./tools/tools/claat/parser/md/parse_test.go
        │   │   ├── ./tools/tools/claat/parser/parse.go
        │   │   ├── ./tools/tools/claat/parser/trim.go
        │   │   └── ./tools/tools/claat/parser/trim_test.go
        │   ├── ./tools/tools/claat/render
        │   │   ├── ./tools/tools/claat/render/gen-tmpldata.go
        │   │   ├── ./tools/tools/claat/render/html.go
        │   │   ├── ./tools/tools/claat/render/html_test.go
        │   │   ├── ./tools/tools/claat/render/lite.go
        │   │   ├── ./tools/tools/claat/render/md.go
        │   │   ├── ./tools/tools/claat/render/template-devsite.html
        │   │   ├── ./tools/tools/claat/render/template-offline.html
        │   │   ├── ./tools/tools/claat/render/template.go
        │   │   ├── ./tools/tools/claat/render/template.html
        │   │   ├── ./tools/tools/claat/render/template.md
        │   │   ├── ./tools/tools/claat/render/template_test.go
        │   │   └── ./tools/tools/claat/render/tmpldata.go
        │   ├── ./tools/tools/claat/types
        │   │   ├── ./tools/tools/claat/types/meta.go
        │   │   └── ./tools/tools/claat/types/meta_test.go
        │   └── ./tools/tools/claat/util
        │       ├── ./tools/tools/claat/util/util.go
        │       └── ./tools/tools/claat/util/util_test.go
        ├── ./tools/tools/codelab-elements
        │   ├── ./tools/tools/codelab-elements/BUILD.bazel
        │   ├── ./tools/tools/codelab-elements/README.md
        │   ├── ./tools/tools/codelab-elements/demo
        │   │   ├── ./tools/tools/codelab-elements/demo/BUILD.bazel
        │   │   ├── ./tools/tools/codelab-elements/demo/codelab.html
        │   │   ├── ./tools/tools/codelab-elements/demo/embed.html
        │   │   ├── ./tools/tools/codelab-elements/demo/hello.html
        │   │   ├── ./tools/tools/codelab-elements/demo/hello.js
        │   │   ├── ./tools/tools/codelab-elements/demo/hello_test.js
        │   │   └── ./tools/tools/codelab-elements/demo/img
        │   │       ├── ./tools/tools/codelab-elements/demo/img/156b5e3cc8373d55.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/166c3b4982e4a0ad.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/1f454b6807700695.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/39b4e0371e9703e6.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/433870360ad308d4.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/7656372ff6c6a0f7.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/81347b12f83e4291.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/8a959b48e233bc93.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/9efdf0d1258b78e4.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/aa64e93e8151b642.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/ab9c361527825fac.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/b1728ef310c444f5.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/bf15c2f18d7f945c.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/cbfdd0302b611ab0.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/cf095c2153306fa7.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/daefd30e8a290df5.png
        │   │       ├── ./tools/tools/codelab-elements/demo/img/dc07bbc9fcfe7c5b.png
        │   │       └── ./tools/tools/codelab-elements/demo/img/ed4633f91ec1389f.png
        │   ├── ./tools/tools/codelab-elements/google-codelab
        │   │   ├── ./tools/tools/codelab-elements/google-codelab/BUILD.bazel
        │   │   ├── ./tools/tools/codelab-elements/google-codelab/_drawer.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab/_steps.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab/google_codelab.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab/google_codelab.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab/google_codelab.soy
        │   │   ├── ./tools/tools/codelab-elements/google-codelab/google_codelab_def.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab/img
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/25c5ac88e3641e75.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/350dceb89c6e3968.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/3f1ab21e1e5c772b.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/53b42d1efc0e0295.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/5c79e3f467c21ce6.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/7c7f4389428d02f9.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/9dec2e61f3d3b641.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/a21ac67adf427ddc.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/a322aaec88da31f0.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/afb844ab04c5e37a.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/b79cf053ec60b7a4.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/dd9ae517d0d8e68f.png
        │   │   │   ├── ./tools/tools/codelab-elements/google-codelab/img/f43aa9981defd294.png
        │   │   │   └── ./tools/tools/codelab-elements/google-codelab/img/fb8ec99e99f182ac.png
        │   │   ├── ./tools/tools/codelab-elements/google-codelab/index.html
        │   │   └── ./tools/tools/codelab-elements/google-codelab/index.scss
        │   ├── ./tools/tools/codelab-elements/google-codelab-about
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-about/BUILD.bazel
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-about/google_codelab_about.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-about/google_codelab_about.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-about/google_codelab_about.soy
        │   │   └── ./tools/tools/codelab-elements/google-codelab-about/google_codelab_about_def.js
        │   ├── ./tools/tools/codelab-elements/google-codelab-analytics
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-analytics/BUILD.bazel
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-analytics/google_codelab_analytics.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-analytics/google_codelab_analytics_def.js
        │   │   └── ./tools/tools/codelab-elements/google-codelab-analytics/google_codelab_analytics_test.js
        │   ├── ./tools/tools/codelab-elements/google-codelab-index
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-index/BUILD.bazel
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-index/_cards.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-index/_categories.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-index/google_codelab_index.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-index/google_codelab_index.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-index/google_codelab_index.soy
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-index/google_codelab_index_cards.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-index/google_codelab_index_cards_def.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-index/google_codelab_index_def.js
        │   │   └── ./tools/tools/codelab-elements/google-codelab-index/index.html
        │   ├── ./tools/tools/codelab-elements/google-codelab-step
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/BUILD.bazel
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/_syntax.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/google-codelab-step.html
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/google_codelab_step.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/google_codelab_step.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/google_codelab_step.soy
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/google_codelab_step_def.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/google_codelab_step_test.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/img-1.png
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/img-2.png
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/img-3.png
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/img-4.png
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/img-5.png
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/img-6.png
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-step/img-7.png
        │   │   └── ./tools/tools/codelab-elements/google-codelab-step/img-8.png
        │   ├── ./tools/tools/codelab-elements/google-codelab-survey
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-survey/BUILD.bazel
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-survey/google-codelab-survey.html
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-survey/google_codelab_survey.js
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-survey/google_codelab_survey.scss
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-survey/google_codelab_survey.soy
        │   │   ├── ./tools/tools/codelab-elements/google-codelab-survey/google_codelab_survey_def.js
        │   │   └── ./tools/tools/codelab-elements/google-codelab-survey/google_codelab_survey_test.js
        │   └── ./tools/tools/codelab-elements/tools
        │       ├── ./tools/tools/codelab-elements/tools/BUILD.bazel
        │       ├── ./tools/tools/codelab-elements/tools/bazel.rc
        │       ├── ./tools/tools/codelab-elements/tools/ci-continuous.sh
        │       ├── ./tools/tools/codelab-elements/tools/ci-presubmit.sh
        │       ├── ./tools/tools/codelab-elements/tools/defs.bzl
        │       ├── ./tools/tools/codelab-elements/tools/gen_test_html.template
        │       ├── ./tools/tools/codelab-elements/tools/server.go
        │       └── ./tools/tools/codelab-elements/tools/webtest.go
        ├── ./tools/tools/package-lock.json
        ├── ./tools/tools/package.json
        ├── ./tools/tools/sample
        │   ├── ./tools/tools/sample/codelab-4-codelab-markdown
        │   │   ├── ./tools/tools/sample/codelab-4-codelab-markdown/codelab.json
        │   │   ├── ./tools/tools/sample/codelab-4-codelab-markdown/img
        │   │   │   ├── ./tools/tools/sample/codelab-4-codelab-markdown/img/16f01f9c848ba9df.png
        │   │   │   ├── ./tools/tools/sample/codelab-4-codelab-markdown/img/3c1a18672fbd28c8.png
        │   │   │   ├── ./tools/tools/sample/codelab-4-codelab-markdown/img/e2500cc24e07c73f.png
        │   │   │   └── ./tools/tools/sample/codelab-4-codelab-markdown/img/f33a6d4f393e4380.png
        │   │   └── ./tools/tools/sample/codelab-4-codelab-markdown/index.html
        │   ├── ./tools/tools/sample/codelab.md
        │   └── ./tools/tools/sample/img
        │       └── ./tools/tools/sample/img/codelabexample.png
        ├── ./tools/tools/site
        │   ├── ./tools/tools/site/README.md
        │   ├── ./tools/tools/site/app
        │   │   ├── ./tools/tools/site/app/404.html
        │   │   ├── ./tools/tools/site/app/bower_components
        │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-box
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-box/README.md
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-box/app-box.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-box/demo
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-box/demo/document-scroll.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-box/demo/index.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/app-box/demo/scrolling-region.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer/README.md
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer/app-drawer.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer/demo
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer/demo/index.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer/demo/left-drawer.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-drawer/demo/right-drawer.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-drawer/test
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer/test/app-drawer.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/app-drawer/test/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout/README.md
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout/demo
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout/demo/index.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout/demo/simple-drawer.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout/demo/two-drawers.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout/test
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout/test/app-drawer-layout.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/app-drawer-layout/test/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-grid
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/README.md
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/app-grid-style.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/demo
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/demo/aspect-ratio.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/demo/distributed-responsive-grid.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/demo/flickr-grid-layout.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/demo/index.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/demo/md-grid-layout.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-grid/demo/simple-responsive-grid.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-grid/test
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/test/app-grid-1.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/test/app-grid-2.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/test/app-grid-3-distributed.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-grid/test/app-grid-3.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/app-grid/test/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/README.md
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/app-header.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/blend-background-1.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/blend-background-2.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/blend-background-3.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/contacts.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/custom-sticky-element-1.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/custom-sticky-element-2.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/give.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/index.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/music.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/no-effects.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-header/demo/notes.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-header/test
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-header/test/app-header.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/app-header/test/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header-layout
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/README.md
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/app-header-layout.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/demo
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/demo/footer.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/demo/index.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/demo/music.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/demo/scrolling-region.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/demo/simple.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/test
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/test/app-header-layout.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/app-header-layout/test/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-layout.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/README.md
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/effects
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/effects/blend-background.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/effects/fade-background.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/effects/material.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/effects/resize-title.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/effects/waterfall.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/app-scroll-effects-behavior.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/blend-background.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/fade-background.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/index.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/parallax-background.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/resize-snapped-title.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/resize-title.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/utils.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/waterfall.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/app-scroll-effects/test/x-container.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scrollpos-control
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scrollpos-control/README.md
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scrollpos-control/app-scrollpos-control.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-scrollpos-control/demo
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-scrollpos-control/demo/index.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-scrollpos-control/test
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-scrollpos-control/test/app-scrollpos-control.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/app-scrollpos-control/test/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-toolbar
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-toolbar/README.md
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-toolbar/app-toolbar.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/app-toolbar/demo
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-toolbar/demo/index.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/app-toolbar/test
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/app-toolbar/test/app-toolbar.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/app-toolbar/test/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/build.sh
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/docs.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/helpers
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/helpers/helpers.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/helpers/test
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/helpers/test/index.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/helpers/test/register-effect.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/helpers/test/scroll.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/patterns
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/patterns/expand-card
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/patterns/expand-card/index.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/patterns/transform-navigation
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/patterns/transform-navigation/index.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/patterns/transform-navigation/x-app.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/device-viewer
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/device-viewer/device-layout-viewer.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/device-viewer/device-view.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/site/device-viewer/index.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/cds2015.png
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/getting-started.png
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/io2016.png
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/landing-page.png
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/pesto.png
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/pica.png
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/polymer-summit.png
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/polymer.svg
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/publishing.png
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/app-layout/site/images/shrine.png
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/site/images/test-drive.png
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/site/resources.json
        │   │   │   │   └── ./tools/tools/site/app/bower_components/app-layout/templates
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/getting-started
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/getting-started/bower.json
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/getting-started/index.html
        │   │   │   │       │   └── ./tools/tools/site/app/bower_components/app-layout/templates/getting-started/x-app.html
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/landing-page
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/landing-page/bower.json
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/landing-page/index.html
        │   │   │   │       │   └── ./tools/tools/site/app/bower_components/app-layout/templates/landing-page/x-app.html
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/pesto
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/bower.json
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/data
        │   │   │   │       │   │   └── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/data/recipes.json
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/index.html
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/manifest.json
        │   │   │   │       │   └── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/src
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/src/app-icons.html
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/src/recipe-app.html
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/src/recipe-detail.html
        │   │   │   │       │       └── ./tools/tools/site/app/bower_components/app-layout/templates/pesto/src/recipe-list.html
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/publishing
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/bower.json
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/data
        │   │   │   │       │   │   └── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/data/articles.json
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/index.html
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/manifest.json
        │   │   │   │       │   └── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/src
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/src/app-icons.html
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/src/article-detail.html
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/src/article-headline.html
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/src/blog-app.html
        │   │   │   │       │       └── ./tools/tools/site/app/bower_components/app-layout/templates/publishing/src/two-columns-grid.html
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/bower.json
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/data
        │   │   │   │       │   │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/data/featured.json
        │   │   │   │       │   │   └── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/data/items.json
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/index.html
        │   │   │   │       │   ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/manifest.json
        │   │   │   │       │   └── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/src
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/src/shrine-app.html
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/src/shrine-detail.html
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/src/shrine-featured-item.html
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/src/shrine-item.html
        │   │   │   │       │       ├── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/src/shrine-list.html
        │   │   │   │       │       └── ./tools/tools/site/app/bower_components/app-layout/templates/shrine/src/shrine-simple-item.html
        │   │   │   │       └── ./tools/tools/site/app/bower_components/app-layout/templates/test-drive
        │   │   │   │           ├── ./tools/tools/site/app/bower_components/app-layout/templates/test-drive/bower.json
        │   │   │   │           ├── ./tools/tools/site/app/bower_components/app-layout/templates/test-drive/index.html
        │   │   │   │           └── ./tools/tools/site/app/bower_components/app-layout/templates/test-drive/test-app.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/font-roboto
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/font-roboto/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/font-roboto/bower.json
        │   │   │   │   └── ./tools/tools/site/app/bower_components/font-roboto/roboto.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/LICENSE
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/google-apis.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/google-client-loader.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/google-js-api.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/google-legacy-loader.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/google-maps-api.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/google-plusone-api.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/google-realtime-api.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-apis/google-youtube-api.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/google-apis/index.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/LICENSE
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/analytics-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/codelab-style.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/font-source-code-pro.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/google-codelab-elements.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/google-codelab-step.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/google-codelab-survey.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/google-codelab.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/google-sans.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/layout-style.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/shared-style.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-codelab-elements/step-style.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/google-codelab-elements/syntax-style.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/CHANGES.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/COPYING
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/Gruntfile.js
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/examples
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/google-prettify/examples/quine.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-Splus.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-aea.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-agc.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-apollo.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-basic.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-cbm.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-cl.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-clj.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-css.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-dart.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-el.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-erl.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-erlang.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-fs.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-go.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-hs.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-lasso.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-lassoscript.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-latex.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-lgt.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-lisp.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-ll.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-llvm.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-logtalk.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-ls.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-lsp.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-lua.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-matlab.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-ml.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-mumps.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-n.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-nemerle.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-pascal.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-proto.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-r.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-rd.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-rkt.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-rust.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-s.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-scala.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-scm.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-sql.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-ss.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-swift.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-tcl.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-tex.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-vb.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-vbs.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-vhd.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-vhdl.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-wiki.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-xq.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-xquery.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-yaml.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/lang-yml.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/prettify.css
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/prettify.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/loader/run_prettify.js
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/google-prettify/loader/skins
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/google-prettify/loader/skins/desert.css
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/google-prettify/loader/skins/doxy.css
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/google-prettify/loader/skins/sons-of-obsidian.css
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/google-prettify/loader/skins/sunburst.css
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/package.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-apollo.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-basic.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-clj.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-css.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-dart.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-erlang.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-ex.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-go.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-hs.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-lasso.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-lisp.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-llvm.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-logtalk.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-lua.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-matlab.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-ml.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-mumps.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-n.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-pascal.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-proto.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-r.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-rd.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-rust.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-scala.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-sql.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-swift.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-tcl.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-tex.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-vb.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-vhdl.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-wiki.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-xq.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/lang-yaml.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/prettify.css
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-prettify/src/prettify.js
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/google-prettify/src/run_prettify.js
        │   │   │   │   └── ./tools/tools/site/app/bower_components/google-prettify/styles
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/google-prettify/styles/demo.html
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/google-prettify/styles/desert.css
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/google-prettify/styles/doxy.css
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/google-prettify/styles/index.html
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/google-prettify/styles/sons-of-obsidian.css
        │   │   │   │       └── ./tools/tools/site/app/bower_components/google-prettify/styles/sunburst.css
        │   │   │   ├── ./tools/tools/site/app/bower_components/google-youtube
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-youtube/LICENSE
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-youtube/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-youtube/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/google-youtube/google-youtube.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/google-youtube/index.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-announcer
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-announcer/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-announcer/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-announcer/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-announcer/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-a11y-announcer/iron-a11y-announcer.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-keys-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-keys-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-keys-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-keys-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-a11y-keys-behavior/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-autogrow-textarea
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-autogrow-textarea/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-autogrow-textarea/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-autogrow-textarea/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-autogrow-textarea/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-autogrow-textarea/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-behaviors
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-behaviors/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-behaviors/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-behaviors/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-behaviors/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-behaviors/iron-button-state.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-behaviors/iron-control-state.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-checked-element-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-checked-element-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-checked-element-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-checked-element-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-checked-element-behavior/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-collapse
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-collapse/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-collapse/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-collapse/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-collapse/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-collapse/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-collapse/iron-collapse.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-dropdown
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-dropdown/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-dropdown/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-dropdown/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-dropdown/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-dropdown/iron-dropdown-scroll-manager.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-dropdown/iron-dropdown.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-fit-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-fit-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-fit-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-fit-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-fit-behavior/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-fit-behavior/iron-fit-behavior.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-flex-layout
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-flex-layout/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-flex-layout/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-flex-layout/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-flex-layout/classes
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-flex-layout/classes/iron-flex-layout.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-flex-layout/classes/iron-shadow-flex-layout.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-flex-layout/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-flex-layout/iron-flex-layout-classes.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-flex-layout/iron-flex-layout.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-form-element-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-form-element-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-form-element-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-form-element-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-form-element-behavior/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-form-element-behavior/iron-form-element-behavior.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icon
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icon/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icon/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icon/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icon/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icon/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-icon/iron-icon.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/av-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/communication-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/device-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/editor-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/hardware-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/image-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/iron-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/maps-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/notification-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-icons/places-icons.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-icons/social-icons.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-iconset-svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-iconset-svg/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-iconset-svg/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-iconset-svg/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-iconset-svg/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-iconset-svg/iron-iconset-svg.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-input
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-input/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-input/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-input/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-input/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-input/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-input/iron-input.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-jsonp-library
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-jsonp-library/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-jsonp-library/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-jsonp-library/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-jsonp-library/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-jsonp-library/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-jsonp-library/iron-jsonp-library.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-localstorage
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-localstorage/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-localstorage/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-localstorage/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-localstorage/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-localstorage/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-localstorage/iron-localstorage.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-media-query
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-media-query/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-media-query/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-media-query/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-media-query/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-media-query/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-media-query/iron-media-query.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-menu-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-menu-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-menu-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-menu-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-menu-behavior/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-menu-behavior/iron-menu-behavior.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-menu-behavior/iron-menubar-behavior.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-meta
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-meta/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-meta/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-meta/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-meta/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-meta/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-meta/iron-meta.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-overlay-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-overlay-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-overlay-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-overlay-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-overlay-behavior/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-overlay-behavior/iron-focusables-helper.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-overlay-behavior/iron-overlay-behavior.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-overlay-behavior/iron-overlay-manager.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-pages
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-pages/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-pages/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-pages/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-pages/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-pages/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-pages/iron-pages.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-resizable-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-resizable-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-resizable-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-resizable-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-resizable-behavior/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-resizable-behavior/iron-resizable-behavior.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-scroll-target-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-scroll-target-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-scroll-target-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-scroll-target-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-scroll-target-behavior/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-selector
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-selector/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-selector/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-selector/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-selector/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-selector/iron-multi-selectable.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-selector/iron-selectable.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-selector/iron-selection.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-selector/iron-selector.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/iron-validatable-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-validatable-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-validatable-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-validatable-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/iron-validatable-behavior/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/iron-validatable-behavior/iron-validatable-behavior.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/jszip
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/CHANGES.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/Gruntfile.js
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/LICENSE.markdown
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/README.markdown
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/_config.yml
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/component.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/dist
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/dist/jszip.js
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/jszip/dist/jszip.min.js
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/jszip/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/jszip/package.json
        │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/cascaded-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/fade-in-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/fade-out-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/hero-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/opaque-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/reverse-ripple-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/ripple-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/scale-down-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/scale-up-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/slide-down-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/slide-from-bottom-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/slide-from-left-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/slide-from-right-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/slide-from-top-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/slide-left-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/slide-right-animation.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/animations/slide-up-animation.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/neon-animation/animations/transform-animation.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/guides
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/neon-animation/guides/neon-animation.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/neon-animatable-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/neon-animatable.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/neon-animated-pages.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/neon-animation-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/neon-animation-runner-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/neon-animation.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/neon-animations.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/neon-shared-element-animatable-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/neon-animation/neon-shared-element-animation-behavior.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/neon-animation/web-animations.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-behaviors
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-behaviors/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-behaviors/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-behaviors/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-behaviors/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-behaviors/paper-button-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-behaviors/paper-checked-element-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-behaviors/paper-inky-focus-behavior.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-behaviors/paper-ripple-behavior.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-button
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-button/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-button/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-button/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-button/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-button/paper-button.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-dialog/paper-dialog.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog-behavior
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog-behavior/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog-behavior/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog-behavior/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog-behavior/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog-behavior/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog-behavior/paper-dialog-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dialog-behavior/paper-dialog-common.css
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-drawer-panel
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-drawer-panel/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-drawer-panel/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-drawer-panel/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-drawer-panel/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-drawer-panel/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-drawer-panel/paper-drawer-panel.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dropdown-menu
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dropdown-menu/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dropdown-menu/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dropdown-menu/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dropdown-menu/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dropdown-menu/paper-dropdown-menu-light.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-dropdown-menu/paper-dropdown-menu.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-fab
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-fab/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-fab/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-fab/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-fab/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-fab/paper-fab.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-header-panel
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-header-panel/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-header-panel/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-header-panel/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-header-panel/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-header-panel/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-header-panel/paper-header-panel.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-icon-button
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-icon-button/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-icon-button/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-icon-button/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-icon-button/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-icon-button/paper-icon-button-light.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-icon-button/paper-icon-button.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/all-imports.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/paper-input-addon-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/paper-input-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/paper-input-char-counter.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/paper-input-container.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/paper-input-error.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-input/paper-input.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-input/paper-textarea.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item/all-imports.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item/paper-icon-item.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item/paper-item-behavior.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item/paper-item-body.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-item/paper-item-shared-styles.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-item/paper-item.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-listbox
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-listbox/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-listbox/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-listbox/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-listbox/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-listbox/paper-listbox.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-material
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-material/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-material/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-material/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-material/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-material/paper-material-shared-styles.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-material/paper-material.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu/paper-menu-shared-styles.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu/paper-menu.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-menu/paper-submenu.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu-button
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu-button/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu-button/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu-button/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu-button/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu-button/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-menu-button/paper-menu-button-animations.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-menu-button/paper-menu-button.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-button
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-button/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-button/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-button/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-button/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-button/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-radio-button/paper-radio-button.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-group
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-group/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-group/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-group/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-group/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-radio-group/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-radio-group/paper-radio-group.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-ripple
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-ripple/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-ripple/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-ripple/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-ripple/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-ripple/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-ripple/paper-ripple.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-scroll-header-panel
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-scroll-header-panel/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-scroll-header-panel/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-scroll-header-panel/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-scroll-header-panel/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-scroll-header-panel/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-scroll-header-panel/paper-scroll-header-panel.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/classes
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/classes/global.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/classes/shadow-layout.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/classes/shadow.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-styles/classes/typography.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/color.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/default-theme.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/demo-pages.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/demo.css
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/paper-styles-classes.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/paper-styles.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-styles/shadow.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-styles/typography.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-tabs
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-tabs/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-tabs/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-tabs/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-tabs/hero.svg
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-tabs/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-tabs/paper-tab.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-tabs/paper-tabs-icons.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-tabs/paper-tabs.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/paper-toolbar
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-toolbar/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-toolbar/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-toolbar/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/paper-toolbar/index.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/paper-toolbar/paper-toolbar.html
        │   │   │   ├── ./tools/tools/site/app/bower_components/polymer
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/LICENSE.txt
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/package.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/polymer-elements.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/polymer-micro.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/polymer-mini.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/polymer-standard.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/polymer.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/annotations
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/annotations/annotations.html
        │   │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/src/lib/annotations/demo
        │   │   │   │   │   │   │       └── ./tools/tools/site/app/bower_components/polymer/src/lib/annotations/demo/app-chrome.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/array-splice.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/async.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/base.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/bind
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/bind/accessors.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/bind/demo
        │   │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/bind/demo/app-chrome.html
        │   │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/bind/demo/app.html
        │   │   │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/src/lib/bind/demo/src
        │   │   │   │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/lib/bind/demo/src/annotations-bind-demo.html
        │   │   │   │   │   │   │   │       └── ./tools/tools/site/app/bower_components/polymer/src/lib/bind/demo/src/bind-demo.html
        │   │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/src/lib/bind/effects.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/case-map.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/collection.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/css-parse.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/custom-style.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/debounce.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-api-classlist.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-api-distributed-nodes-observer.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-api-effective-nodes-observer.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-api-event.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-api-flush.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-api-shadow.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-api-shady.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-api.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-innerHTML.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-module.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/dom-tree-api.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental/focus.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental/gestures.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental/log.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental/observe-js-behavior.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental/observe-js-import.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental/patch-dom.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental/sinspect.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental/style-auditor.html
        │   │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/src/lib/experimental/style-protector.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/lang.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/polymer-bootstrap.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/render-status.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/resolve-url.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/settings.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/style-cache.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/style-defaults.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/style-extends.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/style-properties.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/style-transformer.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/style-util.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/template
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/template/array-selector.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/template/dom-bind.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/template/dom-if.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/template/dom-repeat.html
        │   │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/lib/template/dom-template.html
        │   │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/src/lib/template/templatizer.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/src/lib/unresolved.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/micro
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/micro/attributes.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/micro/behaviors.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/micro/constructor.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/micro/extends.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/micro/properties.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/src/micro/tag.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/mini
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/mini/debouncer.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/mini/ready.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/mini/shadow.html
        │   │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/mini/shady.html
        │   │   │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/src/mini/template.html
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/polymer/src/polymer-lib.html
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/src/standard
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/standard/annotations.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/standard/configure.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/standard/effectBuilder.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/standard/events.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/standard/gestures.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/standard/notify-path.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/standard/resolveUrl.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/standard/styling.html
        │   │   │   │   │       ├── ./tools/tools/site/app/bower_components/polymer/src/standard/utils.html
        │   │   │   │   │       └── ./tools/tools/site/app/bower_components/polymer/src/standard/x-styling.html
        │   │   │   │   └── ./tools/tools/site/app/bower_components/polymer/wct.conf.json
        │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/LICENSE.txt
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/Makefile
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/build
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/build/url-search-params.amd.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/build/url-search-params.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/build/url-search-params.max.amd.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/build/url-search-params.max.js
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/url-search-params-polyfill/build/url-search-params.node.js
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/index.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/package.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/src
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/src/upgrades.js
        │   │   │   │   │   ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/src/url-search-params.js
        │   │   │   │   │   └── ./tools/tools/site/app/bower_components/url-search-params-polyfill/src/utilities.js
        │   │   │   │   └── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/amd.after
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/amd.before
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/copyright
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/license.after
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/license.before
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/md.after
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/md.before
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/node.after
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/node.before
        │   │   │   │       ├── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/var.after
        │   │   │   │       └── ./tools/tools/site/app/bower_components/url-search-params-polyfill/template/var.before
        │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/CONTRIBUTING.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/COPYING
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/History.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/README.md
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/bower.json
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/web-animations-next-lite.min.js
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/web-animations-next-lite.min.js.map
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/web-animations-next.min.js
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/web-animations-next.min.js.map
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/web-animations.html
        │   │   │   │   ├── ./tools/tools/site/app/bower_components/web-animations-js/web-animations.min.js
        │   │   │   │   └── ./tools/tools/site/app/bower_components/web-animations-js/web-animations.min.js.map
        │   │   │   └── ./tools/tools/site/app/bower_components/webcomponentsjs
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/CustomElements.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/CustomElements.min.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/HTMLImports.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/HTMLImports.min.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/MutationObserver.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/MutationObserver.min.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/README.md
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/ShadowDOM.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/ShadowDOM.min.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/bower.json
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/package.json
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/webcomponents-lite.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/webcomponents-lite.min.js
        │   │   │       ├── ./tools/tools/site/app/bower_components/webcomponentsjs/webcomponents.js
        │   │   │       └── ./tools/tools/site/app/bower_components/webcomponentsjs/webcomponents.min.js
        │   │   ├── ./tools/tools/site/app/browserconfig.xml
        │   │   ├── ./tools/tools/site/app/elements
        │   │   │   ├── ./tools/tools/site/app/elements/body-bind.js
        │   │   │   ├── ./tools/tools/site/app/elements/card-sorter.html
        │   │   │   ├── ./tools/tools/site/app/elements/codelab-elements
        │   │   │   │   ├── ./tools/tools/site/app/elements/codelab-elements/codelab-elements.css
        │   │   │   │   ├── ./tools/tools/site/app/elements/codelab-elements/codelab-elements.js
        │   │   │   │   ├── ./tools/tools/site/app/elements/codelab-elements/codelab-index.css
        │   │   │   │   ├── ./tools/tools/site/app/elements/codelab-elements/codelab-index.js
        │   │   │   │   ├── ./tools/tools/site/app/elements/codelab-elements/custom-elements.min.js
        │   │   │   │   ├── ./tools/tools/site/app/elements/codelab-elements/native-shim.js
        │   │   │   │   └── ./tools/tools/site/app/elements/codelab-elements/prettify.js
        │   │   │   ├── ./tools/tools/site/app/elements/codelab.html
        │   │   │   └── ./tools/tools/site/app/elements/elements.html
        │   │   ├── ./tools/tools/site/app/favicon.ico
        │   │   ├── ./tools/tools/site/app/images
        │   │   │   ├── ./tools/tools/site/app/images/favicons
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/android-chrome-144x144.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/android-chrome-192x192.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/android-chrome-256x256.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/android-chrome-36x36.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/android-chrome-384x384.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/android-chrome-48x48.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/android-chrome-512x512.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/android-chrome-72x72.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/android-chrome-96x96.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/apple-touch-icon-precomposed.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/apple-touch-icon.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/favicon-16x16.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/favicon-194x194.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/favicon-32x32.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/mstile-144x144.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/mstile-150x150.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/mstile-310x150.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/mstile-310x310.png
        │   │   │   │   ├── ./tools/tools/site/app/images/favicons/mstile-70x70.png
        │   │   │   │   └── ./tools/tools/site/app/images/favicons/safari-pinned-tab.svg
        │   │   │   ├── ./tools/tools/site/app/images/googdev192.png
        │   │   │   ├── ./tools/tools/site/app/images/icons
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/android-auto.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/android-things.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/android.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/angular-js.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/ar-core.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/blockly.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/brillo.png
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cardboard.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cast.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/chrome.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-appengine.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-bigquery.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-build.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-compute-engine.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-datalab.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-iam.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-iot-core.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-key-management-service.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-machine-learning.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-monitoring.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-networking.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-platform.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-security-command-center.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud-sql.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/cloud.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/dart.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/design.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/firebase.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/flutter.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/golang.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-ads.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-analytics.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-assistant.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-docs.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-drive.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-g.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-maps.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-sheets.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-slides.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/google-wallet.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/gsuite.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/nest.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/openthread.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/polymer.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/slurm.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/tensorflow.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/unity.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/wear-os.svg
        │   │   │   │   ├── ./tools/tools/site/app/images/icons/weave.svg
        │   │   │   │   └── ./tools/tools/site/app/images/icons/web.svg
        │   │   │   ├── ./tools/tools/site/app/images/lockup_developers_color_color.svg
        │   │   │   ├── ./tools/tools/site/app/images/lockup_developers_light_color.svg
        │   │   │   ├── ./tools/tools/site/app/images/logo.png
        │   │   │   └── ./tools/tools/site/app/images/og-image.png
        │   │   ├── ./tools/tools/site/app/js
        │   │   │   ├── ./tools/tools/site/app/js/all_tests.html
        │   │   │   ├── ./tools/tools/site/app/js/all_tests.js
        │   │   │   ├── ./tools/tools/site/app/js/claat
        │   │   │   │   ├── ./tools/tools/site/app/js/claat/ui
        │   │   │   │   │   └── ./tools/tools/site/app/js/claat/ui/cards
        │   │   │   │   │       ├── ./tools/tools/site/app/js/claat/ui/cards/cardsorter.js
        │   │   │   │   │       ├── ./tools/tools/site/app/js/claat/ui/cards/cardsorter_export.js
        │   │   │   │   │       ├── ./tools/tools/site/app/js/claat/ui/cards/cardsorter_test.html
        │   │   │   │   │       └── ./tools/tools/site/app/js/claat/ui/cards/cardsorter_test.js
        │   │   │   │   └── ./tools/tools/site/app/js/claat/uri
        │   │   │   │       ├── ./tools/tools/site/app/js/claat/uri/params.js
        │   │   │   │       ├── ./tools/tools/site/app/js/claat/uri/params_test.html
        │   │   │   │       └── ./tools/tools/site/app/js/claat/uri/params_test.js
        │   │   │   └── ./tools/tools/site/app/js/deps.js
        │   │   ├── ./tools/tools/site/app/robots.txt
        │   │   ├── ./tools/tools/site/app/scripts
        │   │   │   ├── ./tools/tools/site/app/scripts/app.js
        │   │   │   └── ./tools/tools/site/app/scripts/mockcodelabs.json
        │   │   ├── ./tools/tools/site/app/site.webmanifest
        │   │   ├── ./tools/tools/site/app/styles
        │   │   │   ├── ./tools/tools/site/app/styles/_app.scss
        │   │   │   ├── ./tools/tools/site/app/styles/_categories.scss
        │   │   │   ├── ./tools/tools/site/app/styles/_codelab-card.scss
        │   │   │   ├── ./tools/tools/site/app/styles/_footer.scss
        │   │   │   ├── ./tools/tools/site/app/styles/_layout.scss
        │   │   │   ├── ./tools/tools/site/app/styles/_material.scss
        │   │   │   ├── ./tools/tools/site/app/styles/_toolbar.scss
        │   │   │   ├── ./tools/tools/site/app/styles/_typography.scss
        │   │   │   ├── ./tools/tools/site/app/styles/_variables.scss
        │   │   │   └── ./tools/tools/site/app/styles/main.scss
        │   │   └── ./tools/tools/site/app/views
        │   │       ├── ./tools/tools/site/app/views/default
        │   │       │   ├── ./tools/tools/site/app/views/default/index.html
        │   │       │   └── ./tools/tools/site/app/views/default/view.json
        │   │       └── ./tools/tools/site/app/views/vslive
        │   │           ├── ./tools/tools/site/app/views/vslive/view.json
        │   │           └── ./tools/tools/site/app/views/vslive/vslive-logo.jpg
        │   ├── ./tools/tools/site/gulpfile.js
        │   ├── ./tools/tools/site/package.json
        │   └── ./tools/tools/site/tasks
        │       └── ./tools/tools/site/tasks/helpers
        │           ├── ./tools/tools/site/tasks/helpers/claat.js
        │           ├── ./tools/tools/site/tasks/helpers/gcs.js
        │           └── ./tools/tools/site/tasks/helpers/opts.js
        └── ./tools/tools/third_party
            ├── ./tools/tools/third_party/BUILD.closure
            ├── ./tools/tools/third_party/BUILD.polyfill
            ├── ./tools/tools/third_party/BUILD.prettify
            └── ./tools/tools/third_party/tutorial.proto

584 directories, 5503 files
```
