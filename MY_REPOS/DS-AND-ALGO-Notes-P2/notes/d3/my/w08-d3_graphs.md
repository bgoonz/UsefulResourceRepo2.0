# WEEK-08 DAY-3<br>*Graphs* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->

<!-- code_chunk_output -->

- [Graphs and Heaps](#graphs-and-heaps)
- [Graphs](#graphs)
  - [What is a Graph?](#what-is-a-graph)
  - [Graph Implementations](#graph-implementations)
- [Graph Traversal](#graph-traversal)
- [Graph Project](#graph-project)
  - [Instructions](#instructions)
  - [Friends of](#friends-of)

<!-- /code_chunk_output -->
________________________________________________________________________________
________________________________________________________________________________
# Graphs and Heaps

**The objective of this lesson** is for you to become comfortable with
implementing common data structures. This is important because questions about
data structures are incredibly likely to be interview questions for software
engineers from junior to senior levels. Moreover, understanding how different
data structures work will influence the libraries and frameworks that you choose
when writing software.

When you are done, you will be able to:

1. Explain and implement a Heap.
2. Explain and implement a Graph.table with
implementing common data structures. This is important because questions about
data structures are incredibly likely to be interview questions for software
engineers from junior to senior levels. Moreover, understanding how different
data structures work will influence the libraries and frameworks that you choose
when writing software.

When you are done, you will be able to:

1. Explain and implement a Heap.
2. Explain and implement a Graph.

________________________________________________________________________________
# Graphs

It's time to generalize our knowledge! We've explored binary trees and the
fundamental algorithms that accompany them. Naturally, we implemented these
algorithms assuming the constraints of a binary tree. To review, these
assumptions include the lack of cycles, a maximum of two children, and a single
root node. However, what if we take away these constraints? How can we modify the
algorithms to operate on general graphs?

## What is a Graph?

A **graph** is **any** collection of nodes and edges. In contrast to our
previous trees, a graph is much more relaxed in it's structure. A graph may:

+ lack a root node
+ have cycles
+ have any number edges leaving a node

In this section, we will draw heavily from our tree algorithms. The adjustments
we will make to those algorithms will be motivated by these core differences.

Below are a few examples of graphs that don't agree with our CompSci definition
of a binary tree:

![graphs](images/graphs.png)

Here are some highlights:

+ `Graph 1` lacks a root. This means there is no single node that can access all
  other nodes in a path through edges. This is important because we previously
  referenced "entire" trees by referring to the ultimate root. We can no longer
  do that in a graph. If we provide just `T`, you can't access `U`. If we
  provide just `U`, you can't access `T`. If we provide just `V`, you can't
  access `T` or `U`.
+ `Graph 2` has a cycle. This means there is no longer a parent-child
  relationship. Choose any node in `Graph 2`, its grandchild will also be its
  parent. Wait - what? From now on we'll have to use less specific language such
  as "`X` is a neighbor of `Y`."  Perhaps even more deadly, imagine we ran a
  "simple" Depth-First traversal on this graph. We could get trapped in an
  infinite loop if we are not careful.
+ `Graph 3` features nodes that have more than 2 edges. Anarchy!

## Graph Implementations

There are many ways to represent a graph programmatically. Let's take a moment
to explore each and describe the tradeoffs we make when choosing among them. We
will use `Graph 3` from above as our candidate. Bear in mind that our graph is
directed. For example, this means that `C` can access `D`, but `D` cannot access
`C`.

### GraphNode Class

This implementation is most similar to how we implemented binary trees. That is,
we create a node class that maintains a value and an array of references to
neighboring nodes. This easily solves the problem that a node can have any
number of neighbors, no longer just a left and right.

```javascript
class GraphNode {
    constructor(val) {
        this.val = val;
        this.neighbors = [];
    }
}

let a = new GraphNode('a');
let b = new GraphNode('b');
let c = new GraphNode('c');
let d = new GraphNode('d');
let e = new GraphNode('e');
let f = new GraphNode('f');
a.neighbors = [b, c, e];
c.neighbors = [b, d];
e.neighbors = [a];
f.neighbors = [e];
```

This implementation is great because it feels familiar to how we implemented
trees. However, this implementation is clunky in that we have no easy way to
refer to the entire graph. How can we pass this graph to a function? Recall that
there is no root to act as the definite starting point.

### Adjacency Matrix

This is the often the mathematician's preferred way of representing a graph. We
use a 2D array to represent edges. We'll first map each node's value to an
index. This means `A -> 0`, `B -> 1`, `C -> 2`, etc.. Below is the mapping for
`Graph 3`:

![adj_matrix_graph](images/adj_matrix_graph.png)

From here, the row index will correspond to the source of an edge and the column
index will correspond to its destination. A value of `true` will mean that there
does exist an edge from source to destination.

```javascript
let matrix = [
/*          A       B       C       D       E       F   */
/*A*/    [true,  true,   true,   false,  true,   false],
/*B*/    [false, true,   false,  false,  false,  false],
/*C*/    [false, true,   true,   true,   false,  false],
/*D*/    [false, false,  false,  true,   false,  false],
/*E*/    [true,  false,  false,  false,  true,   false],
/*F*/    [false, false,  false,  false,  true,   true]
];
```

A few things to note about using an adjacency matrix:

+ when the edges have direction, `matrix[i][j]` may not be the same as
  `matrix[j][i]`
+ it is common to say that a node is adjacent to itself, so `matrix[x][x] ===
  true` for any `x`

An advantage of the matrix implementation is that it allows us to refer to the
entire graph by simply referring to the 2D array. A huge disadvantage of using a
matrix is the space required. To represent a graph of n nodes, we must allocate
n<sup>2</sup> space for the 2D array. This is even more upsetting when there are
few edges in graph. We will have to use n<sup>2</sup> space, even though the
array would be sparse with only a few `true` elements.

### Adjacency List

An adjacency list seeks to solve the shortcomings of the matrix implementation.
We use an object where keys represent the node labels. The values associated
with the keys will be an array containing all adjacent nodes:

```javascript
let graph = {
    'a': ['b', 'c', 'e'],
    'b': [],
    'c': ['b', 'd'],
    'd': [],
    'e': ['a'],
    'f': ['e']
};
```

An adjacency list is easy to implement and allows us to refer to the entire
graph by simply referencing the object. The space required for an adjacency list
is the number of edges in the graph. Since there will be at most n<sup>2</sup>
edges in a graph of n nodes, the adjacency list will use at most the same amount
of space as the matrix. You'll find adjacency lists useful when attacking
problems that are not explicitly about graphs. We'll elaborate more on this
soon.

________________________________________________________________________________
# Graph Traversal

Let's explore our classic Depth-First, but for **graphs** this time! We'll be
utilizing the `GraphNode` and `Adjacency List` implementations of the following
graph:

![graph](images/graph.png)

Since we already discussed the differences between Depth-First and
Breadth-First, we'll focus just on Depth-First here. We'll leave the
Breadth-First exploration in the upcoming project.

### Graph Traversal w/ GraphNode

Let's begin by assuming we have our candidate graph implemented using our
`GraphNode` class:

```javascript
class GraphNode {
    constructor(val) {
        this.val = val;
        this.neighbors = [];
    }
}

let a = new GraphNode('a');
let b = new GraphNode('b');
let c = new GraphNode('c');
let d = new GraphNode('d');
let e = new GraphNode('e');
let f = new GraphNode('f');
a.neighbors = [e, c, b];
c.neighbors = [b, d];
e.neighbors = [a];
f.neighbors = [e];
```

One thing we'll have to decide on is what node to begin our traversal. Depending
on the structure of the graph, there may not be a suitable starting point.
Remember that a graph may not have a "root". However in our candidate, `F` is
like a root. It is the only valid choice because it is the only node that may
access all other nodes through some path of edges. We admit, the choice of `F`
is somewhat contrived and in a practical setting you may not have a nice
starting point like this. We'll cover how to overcome this obstacle soon. For
now we'll take `F`.

We want to build a recursive `depthFirstRecur` function that accepts a node and
performs a Depth-First traversal through the graph. Let's begin with a baseline
solution, although it is not yet complete to handle all graphs:

```javascript
// broken
function depthFirstRecur(node) {
    console.log(node.val);

    node.neighbors.forEach(neighbor => {
        depthFirstRecur(neighbor);
    });
}

depthFirstRecur(f);
```

Can you see where this code goes wrong? It will get caught in an infinite cycle
`f, e, a, e, a, e, a, e, ...` ! To fix this, simply store which nodes we have
visited already. Whenever we hit a node that has previously been visited, then
return early. We'll use JavaScript
[Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
to store `visited` because they allow for constant time lookup.

```javascript
// using GraphNode representation

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

depthFirstRecur(f);
```

This code works well and will print the values in the order `f, e, a, c, b, d`.
Note that this strategy only works if the values are guaranteed to be unique.

If you are averse to recursion (don't be), we can write an iterative version
using the same principles:

```javascript
function depthFirstIter(node) {
    let visited = new Set();
    let stack = [ node ];

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

depthFirstIter(f);
```

### Graph Traversal w/ Adjacency List

Let's now assume our candidate graph in the form of an Adjacency List:

```javascript
let graph = {
    'a': ['b', 'c', 'e'],
    'b': [],
    'c': ['b', 'd'],
    'd': [],
    'e': ['a'],
    'f': ['e']
};
```

Bear in mind that the nodes are just strings now, not `GraphNode`s. Other than
that, the code shares many details from our previous implementations:

```javascript
// using Adjacency List representation

function depthFirstRecur(node, graph, visited=new Set()) {
    if (visited.has(node)) return;

    console.log(node);
    visited.add(node);

    graph[node].forEach(neighbor => {
        depthFirstRecur(neighbor, graph, visited);
    });
}

depthFirstRecur('f', graph);
```

Cool! We print values in the order `f, e, a, b, c, d`. We'll leave the iterative
version to you as an exercise for later.

Instead, let's draw our attention to a point from before: having to choose `f`
as the starting point isn't dynamic enough to be impressive. Also, if we choose
a poor initial node, some nodes may be unreachable. For example, choosing `a` as
the starting point with a call to `depthFirstRecur('a', graph)` will only print
`a, b, c, d, e`. We missed out on `f`. Bummer.

We can fix this. A big advantage of using an Adjacency List is that it contains
the full graph! We can use a surrounding loop to allow our traversal to jump
between disconnected regions of the graph. Refactoring our code:

```javascript
function depthFirst(graph) {
    let visited = new Set();

    for (let node in graph) {
        _depthFirstRecur(node, graph, visited);
    }
}

function _depthFirstRecur(node, graph, visited) {
    if (visited.has(node)) return;

    console.log(node);
    visited.add(node);

    graph[node].forEach(neighbor => {
        _depthFirstRecur(neighbor, graph, visited);
    });
}

depthFirst(graph);
```

Notice that our main function `depthFirst` is iterative and accepts the entire
Adjacency List as an Argo. Our helper `_depthFirstRecur` is recursive.
`_depthFirstRecur` serves the same job as before, it will explore a full
connected region in a graph. The main `depthFirst` method will allow us to
"bridge" the gap between connection regions.

Still fuzzy? Imagine we had the following graph. Before you ask, these are not
two separate graphs. This is a **single** graph that contains two connected
components. Another term for a graph of this structure is a "Forest" because it
contains multiple "Trees", ha:

![forest](images/forest.png)

It is easy to represent this graph using an Adjacency List. We can then pass the
graph into our `depthFirst` from above:

```javascript
let graph = {
    'h': ['i', 'j'],
    'i': [],
    'j': ['k'],
    'k': [],
    'l': ['m'],
    'm': []
}

depthFirst(graph);
// prints h, i, j, k, l, m
```

Here's the description for how `depthFirst` operates above. We enter
`depthFirst` and the for loop begins on `h`. This means we enter our
`_depthFirstRecur`, which will continue to explore the "local" region as far as
possible. When this recursion ends, we would have explored the entire connected
region of `h, i, j, k` (note that we add these nodes to visited as well). Our
recursive call then returns to the main `depthFirst` function, where we continue
the for loop. We iterate it until we hit an unvisited node (`l`) and then
explore it's local region as far as possible using `_depthFirstRecur`, hitting
the last node `m`.

________________________________________________________________________________
# Graph Project

This project contains a skeleton for you to implement some graph functionality.
This is a test-driven project. Run the tests and read the top-most error. If
it's not clear what is failing, open the **test/test.js** file to figure out
what the test is expecting. Make the top-most test pass.

Keep making the top-most test pass until all tests pass.

After the instructions, there is an in-depth explanation of the "friends of"
problem.

## Instructions

* Clone the project from
  https://github.com/appacademy-starters/data-structures-graph-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `test/test.js`. Your job is to write code in
  * **lib/breadth_first_search.js** to implement the `breadthFirstSearch`
    function for graphs
  * **lib/max_value.js** to implement the `maxValue` function for graphs
  * **lib/num_regions.js** to implement the `numRegions` function for graphs
  * **lib/friends-of.js** to implement `friendsOf` and `friendsOfRecursion` to
    find connected nodes in a graph less than or equal to a specified distance
    away from the start node (please see the explanation after these
    instructions)
  * **lib/leet_code_207.js** to implement the `canFinish` function located
    at https://leetcode.com/problems/course-schedule/


## Friends of

The set of tests in **test/friends-of-spec.js** asks you to write a function
named `friendsOf` that finds the total set of friends a specified distance away
from a person. It will take as parameters

1. The adjacency list (which will always be an object with keys that always have
   arrays as values)
2. The name of the person whose friends you need to return
3. The distance away from the person that you'll use to collect the friends
   (this value will always be greater than or equal to 1)

The following table interprets the distance parameter:

| Distance | Meaning                                                                      |
|:--------:|------------------------------------------------------------------------------|
|    1     | Immediate friends                                                            |
|    2     | Immediate friends and friends of friends                                     |
|    3     | Immediate friends, friends of friends, and the friends of friends of friends |
|    n     | All the people accessible _n_ steps away from the indicated person           |

For example, say you had the following dependency graph.

```js
const graph = {
  'carrie':  ['humza', 'jun'],
  'farrah':  ['humza'],
  'humza':   ['carrie', 'farrah', 'jun', 'silla'],
  'jun':     ['carrie', 'silla'],
  'ophelia': ['travis'],
  'silla':   ['humza', 'yervand'],
  'travis':  ['ophelia'],
  'yervand': ['silla'],
};
```

Then, the following table shows the expected results for the person **jun** at
different distances.

| Distance | List of people returned by `friendsOf` |
|:--------:|----------------------------------------|
|    1     | carrie and silla                       |
|    2     | carrie, silla, humza, yervand          |
|    3     | carrie, silla, humza, yervand, farrah  |
|    4     | carrie, silla, humza, yervand, farrah  |

At distance 1, your traversal algorithm will find the friends of **jun**, carrie
and silla and return them.

At distance 2, your traversal algorithm will find carrie and silla, then find
their friends, humza and jun for carrie, and humza and yervand for silla. But,
jun is the person that you started with, so you don't include them in the return
value. Humza is both carrie's _and_ silla's friend, but you only include that
name once.

At a distance 3, you find carrie and silla, then humza and yervand. Then,
looking at humza's friends, you see that humza knows carrie, farrah, hun, and
silla. Only farrah is new, so that name will end up in the return value. When
your traversal looks at yervand, it sees that silla is that person's friend, but
is not a new value and does not end up getting added again to the return value.

At a distance four, you find carrie and silla, then humza and yervand, then
farrah. From there, you look at farrah's friends which is just humza. You
already have that name, so it doesn't get duplicated in the return value.

All distances 3 and greater will return the same list because you've exhausted
all of the distinct names of people. You've captured the entire circle of
friends.

The order in which you return the names is not important.

The tests also define edge cases that you also have to handle that are not in
this explanation.
