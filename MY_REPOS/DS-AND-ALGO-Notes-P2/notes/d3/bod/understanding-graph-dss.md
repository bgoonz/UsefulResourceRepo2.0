# Data Structures 101: introducing graphs in JavaScript

> With the graph data structure, we structure a program's data using nodes and edges. Today, we'll discuss the theory and applications of graphs in JavaScript.

  

#### addEdge (source, destination)

Source and destination are already stored as index of our array. This function inserts a destination vertex into the adjacency linked list of the source vertex using the following line of code:

    this.list[source].insertAtHead(destination)

We implementing a directed graph, so `addEdge(0, 1)` does not equal `addEdge(1, 0)`.

  

#### printGraph()

This function uses a nested loop to iterate through the adjacency list. Each linked list is being traversed.

> **What about an undirected graph?**
> 
> So far, we have covered the implementation of a directed graph.
> 
> For an undirected graph, we we create an edge from the source to the destination and from the destination to the source. This makes it a bidirectional edge.

  

### Graph traversal algorithms

As we have previously mentioned, when we move through a graph, we are **traversing** the data. This refers to the process of visiting the vertices of a graph. Traversal processes are classified by the order that the vertices are visited. This is similar to [tree traversal](https://www.educative.io/blog/data-structures-trees-java#intro). Let’s get into the basic logic behind graph traversal and see how we can use [algorithms](https://www.educative.io/blog/data-structures-algorithms) to do it.

> _When traversing graphs, we use the concept of **levels**. Take a vertex as your starting point; this is the lowest level. The next level is all the adjacent vertices. A level higher would be the vertices adjacent to these nodes._

The two basic techniques for graph traversal are:

*   **Breadth-First Search (BFS):** The BFS algorithm grows breadth-wise. All the nodes at a certain level are traversed before moving on to the next level. This level-wise expansion ensures that for any starting vertex, you can reach all others one level at a time.
    
*   **Depth-First Search (DFS):** This algorithm is the opposite of BFS; it grows depth-wise. Starting from any node, we move to an adjacent node until we reach the farthest level. Then we move back to the starting point and pick another adjacent node. Once again, we probe to the farthest level and move back. This process continues until all nodes are visited.


[Source](https://www.educative.io/blog/data-structures-101-graphs-javascript)