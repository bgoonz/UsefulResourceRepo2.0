# Graph Traversal
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Graph Traversal w/ GraphNode](#graph-traversal-w-graphnode)
- [Graph Traversal w/ Adjacency List](#graph-traversal-w-adjacency-list)

<!-- /code_chunk_output -->
________________________________________________________________________________

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
