# Graphs Explained



Graphs are complex, non-linear data structures that are characterized by a group of vertices, connected by edges. For more information on the _different types of data structures in Python_, check out the following articles:

* [Introduction to Data Structures](https://www.section.io/data-structures-python-part-1/)
* [List](https://www.section.io/list-data-structure-python/)
* [Stack](https://www.section.io/stack-data-structure-python/)
* [Queue](https://www.section.io/queue-data-structure-python/)
* [Linked Lists](https://www.section.io/linked-list-data-structure-python/)
* [Binary Trees](https://www.section.io/binary-tree-data-structure-python/)
* [Heaps](https://www.section.io/heap-data-structure-python/)

#### Table of Contents <a id="table-of-contents"></a>

* [Graphs: Introduction](https://www.section.io/engineering-education/graph-data-structure-python/#graphs:-introduction)
* [Applications of Graphs](https://www.section.io/engineering-education/graph-data-structure-python/#applications-of-graphs)
* [Types of Graphs](https://www.section.io/engineering-education/graph-data-structure-python/#types-of-graphs)
* [Representing Graphs](https://www.section.io/engineering-education/graph-data-structure-python/#representing-graphs)
* [Conclusion](https://www.section.io/engineering-education/graph-data-structure-python/#conclusion)
* [Further Reading](https://www.section.io/engineering-education/graph-data-structure-python/#further-reading)

#### Graphs: Introduction <a id="graphs-introduction"></a>

Graphs are non-linear data structures made up of two major components:

* **Vertices** – Vertices are entities in a graph. Every vertex has a value associated with it. For example, if we represent a list of cities using a graph, the vertices would represent the cities.
* **Edges** – Edges represent the relationship between the vertices in the graph. Edges may or may not have a value associated with them. For example, if we represent a list of cities using a graph, the edges would represent the path between the cities.

![Graph Diagram](https://www.section.io/engineering-education/graph-data-structure-python/graph.png)

_Figure:_ [_Graph_](https://www.andrew.cmu.edu/course/15-121/lectures/Trees/trees.html)

#### Applications of Graphs <a id="applications-of-graphs"></a>

Graphs are used everywhere, from schooling to business. Especially in the fields of computer science, physics, and chemistry.

A few other applications of graphs are:

* To visualize organized data.
* Directed Graphs are used in Google’s [Page Ranking Algorithm](https://en.wikipedia.org/wiki/PageRank).
* Social Networks use graphs to represent different users as vertices and edges to represent the connections between them.
* In a mapping application, graphs are used to represent places and the path \(distance\) between them.

#### Types of Graphs <a id="types-of-graphs"></a>

There are many types of graphs, based on weights, direction, interconnectivity, and special properties. Let’s look at the most common types of graphs.

* [Graphs Based on Direction](https://www.section.io/engineering-education/graph-data-structure-python/#based-on-direction)
* [Graphs Based on Weights](https://www.section.io/engineering-education/graph-data-structure-python/#based-on-weights)
* [Special Graphs](https://www.section.io/engineering-education/graph-data-structure-python/#special-graphs)

**Based on Direction**

**Undirected Graphs**

In an undirected graph, the edges have no path or direction. If there is a path from vertex X to vertex Y, then there is a path from vertex Y to vertex X. Edge \(X, Y\) represents the edge connecting vertex X to vertex Y.

That is, `edge (X, Y) == edge (Y, X)`.

![Undirected Graph](https://www.section.io/engineering-education/graph-data-structure-python/undirected-graph.png)

_Figure:_ [_Undirected Graph_](https://pediaa.com/what-is-the-difference-between-directed-and-undirected-graph/)

**Directed Graphs**

In a directed graph or digraph, the edges have an orientation. If there is a path from vertex X to vertex Y, then there isn’t necessarily a path from vertex Y to vertex X.

That is, `edge (X, Y) != edge (Y, X)`.

![Directed Graphs](https://www.section.io/engineering-education/graph-data-structure-python/directed-graph.png)

_Figure:_ [_Directed Graph_](https://pediaa.com/what-is-the-difference-between-directed-and-undirected-graph/)

**Based on Weights**

**Weighted Graphs**

A weighted graph has a value associated with every edge. The value may represent quantities like cost, distance, time, etc., depending on the graph. An edge of a weighted graph is represented as, `(u, v, w)`.

* `u` -&gt; Source vertex
* `v` -&gt; Destination vertex
* `w` -&gt; Weight associated to go from u to v.

These weighted graphs are extensively used in modelling Computer Networks. For a career as a Networking Engineer, the knowledge of weighted graphs are a must.

![Weighted Graphs](https://www.section.io/engineering-education/graph-data-structure-python/weighted-graph.png)

_Figure:_ [_Weighted Graph_](https://www.clipartmax.com/middle/m2i8Z5i8G6b1b1b1_directed-weighted-ex1-directed-weighted-graph/)

**Unweighted Graphs**

An unweighted graph does not have a value associated with every edge. An edge of an unweighted graph is represented as, `(u, v)`.

* `u` -&gt; Source vertex
* `v` -&gt; Destination vertex

Relationships in query languages like GraphQL can be represented by using Unweighted Graphs.

![Unweighted Graphs](https://www.section.io/engineering-education/graph-data-structure-python/unweighted-graph.png)

_Figure:_ [_Unweighted Graph_](https://www.researchgate.net/figure/Unweighted-Undirected-Graph_fig3_327864836)

**Special Graphs**

**Trees**

An undirected graph with zero cycles is called a tree. A cycle in a graph is a sequence with the first and last vertices in the repeating sequence.

It has X vertices and X-1 edges.

![Tree - Graphs](https://www.section.io/engineering-education/graph-data-structure-python/tree-graph.png)

_Figure:_ [_Tree_](https://en.wikipedia.org/wiki/Tree_%28graph_theory%29)

**Rooted Tree**

A rooted tree is a tree that has a designated root node. If edges point away from the root, it is called an **arborescence/out-tree**. If edges point towards the root, it is called an **anti-arborescence/in-tree**.

![Rooted Tree](https://www.section.io/engineering-education/graph-data-structure-python/rooted-trees.png)

_Figure:_ [_Rooted Tree_](https://www.youtube.com/watch?v=09_LlHjoEiY&t=213s)

**Directed Acyclic Graphs**

Directed Acyclic Graphs or DAGs are graphs with no directed cycles. They represent structures with dependencies. It’s also important to note that: All [arborescences](https://en.wikipedia.org/wiki/Arborescence_%28graph_theory%29) are DAGs, but not all DAGs are arborescences.

Directed Acyclic Graphs are used by compilers to represent expressions and relationships in a program.

![Directed Acyclic Graph](https://www.section.io/engineering-education/graph-data-structure-python/dag.png)

_Figure:_ [_Directed Acyclic Graph_](https://en.wikipedia.org/wiki/Directed_acyclic_graph)

**Complete Graphs**

Complete graphs have a unique edge between every pair of vertices. A complete graph `n` vertices have `(n*(n-1)) / 2` edges and are represented by Kn.

Fully connected networks in a Computer Network uses a complete graph in its representation.

![Complete Graph](https://www.section.io/engineering-education/graph-data-structure-python/complete-graph.png)

_Figure:_ [_Complete Graph_](https://www.geeksforgeeks.org/mathematics-graph-theory-basics/)

#### Representing Graphs <a id="representing-graphs"></a>

There are multiple ways of using data structures to represent a graph. The three most common ways are:

* [Adjacency Matrix](https://www.section.io/engineering-education/graph-data-structure-python/#adjacency-matrix)
* [Adjacency List](https://www.section.io/engineering-education/graph-data-structure-python/#adjacency-list)
* [Edge List](https://www.section.io/engineering-education/graph-data-structure-python/#edge-list)

**Adjacency Matrix**

An Adjacency Matrix is a very simple way to represent a graph. In a weighted graph, the element `A[i][j]` represents the cost of moving from vertex `i` to vertex `j`.

In an unweighted graph, the element `A[i][j]` represents a Boolean value that determines if a path exists from vertex `i` to vertex `j`. If `A[i][j] == 0`, then no path from vertex `i` to vertex `j` exists. If `A[i][j] == 1`, there is a path from vertex `i` to vertex `j`.

For example, a snake and ladder game can be represented by using an adjacency matrix. This enables us to use various algorithms to find the shortest path to finish the game. Similarly, many shortest path algorithms use an adjacency matrix.

**Example:**

```text
graph = [[0, 1, 2],
         [2, 0, 5],
         [4, 5, 0]]
```

The adjacency matrix above represents a graph that has 3 vertices. The cost of moving from vertex 0 to vertex 1 is 1, the cost of moving from vertex 0 to vertex 2 is 2, and so on. Usually, the cost of travelling from a vertex to itself is zero.

**Advantages and Disadvantages of Adjacency Matrix**

| Advantages | Disadvantages |
| :--- | :--- |
| Space-efficient for dense graph representation. | Space Complexity of this Data Structure - O\(V^2\). |
| The time complexity of getting an edge weight is O\(1\). | Iterating through the edges takes O\(V^2\) time. |
| Simplest Graph Representation. |  |

**Adjacency List**

An adjacency list represents a graph as a list that has vertex-edge mappings. Example, A → \[\(B, 4\), \(C, 1\)\] represents an adjacency list where the vertex A is connected to B \(weight 4\) and C \(weight 1\). This works really well for sparse graphs.

**Advantages and Disadvantages of Adjacency List**

| Advantages | Disadvantages |
| :--- | :--- |
| Space-efficient for sparse graphs. | Less space efficient for dense graphs. |
| Iterating over the edges is efficient. | Edge weight lookup is O\(E\). \(worse case\) |
|  | Slightly more complex to represent. |

**Edge List**

An edge list represents the graph as an unstructured list of edges.

**Example:**

```text
graph = [(C, A, 4), (A, C, 1), (B, C, 6),
         (A, B, 4), (C, B, 1), (C, D, 2)]
```

They are not widely used because this representation lacks structure.

**Advantages and Disadvantages of Edge List**

| Advantages | Disadvantages |
| :--- | :--- |
| Space-efficient for sparse graphs. | Less space efficient for dense graphs. |
| Iterating over the edges is efficient. | Edge weight lookup is O\(E\). \(worse case\) |
| Extremely simple representation. | This representation lacks structure. |

#### Conclusion <a id="conclusion"></a>

In this article, we learned about the various types of graphs, their representations, and their applications.

To summarize,

**Types of Graphs**

* Based on Direction
  * Undirected Graph
  * Directed Graph
* Based on Weights
  * Weighted Graph
  * Unweighted Graph
* Special Graphs
  * Tree
  * Rooted Tree
  * Directed Acyclic Graph
  * Complete Graph

**Graph Representation**

* Adjacency Matrix
  * Used for dense graphs
* Adjacency List
  * Used for sparse graphs
* Edge List
  * Used for simple representation

#### Further Reading <a id="further-reading"></a>

To learn more about graphs, check out the following pages:

* Practice Graphs – [LeetCode](https://leetcode.com/tag/graph/)
* Graph Theory [Notes](https://www.cpp.edu/~ftang/courses/CS241/notes/graph.htm)
* Graph Representation – [HackerEarth](https://www.hackerearth.com/practice/algorithms/graphs/graph-representation/tutorial/)

