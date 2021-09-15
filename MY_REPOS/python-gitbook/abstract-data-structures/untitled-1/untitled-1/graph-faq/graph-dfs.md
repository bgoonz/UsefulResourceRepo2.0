# Graph DFS



## Depth First Search \(DFS\)

### Objective

* Learn about one of the more famous graph algorithms
* Learn uses of DFS

### Overview

When searching a graph, one of the approaches is called _depth first search_. This "dives" "down" the graph as far as it can before needing to backtrack and explore another branch.

The algorithm never attempts to explore a vert that it either has explored or is exploring.

For example, when starting from the upper left, the numbers on this graph show a vertex visitation order in a DFS:

![](../../../../.gitbook/assets/image%20%2812%29.png)

The bold lines show with edges were followed. \(The thin edges were not followed since their destination nodes had already been visited.\)

\(Of course, the exact order will vary depending on which branches get taken first and which vertex is the starting vertex.\)

### Applications of DFS

* Finding [Minimum Spanning Trees](https://en.wikipedia.org/wiki/Minimum_spanning_tree) of weighted graphs
* Path finding
* Detecting cycles in graphs
* [Topological sorting](https://en.wikipedia.org/wiki/Topological_sorting), useful for scheduling sequences of dependent jobs
* Solving and generating mazes

### Coloring Vertexes

As the graph is explored, it's useful to color verts as you arrive at them and as you leave them behind as "already searched".

Commonly, unvisited verts are white, verts whose neighbors are being explored are gray, and verts with no unexplored neighbors are black.

### Recursion

Since we want to pursue leads in the graph as far as we can, and then "back up" to an earlier branch point to explore that way, recursion is a good approach to help "remember" where we left off.

Looking at it with pseudocode to make the recursion more apparent:

```text
explore(graph) {
    visit(this_vert);
    explore(remaining_graph);
}
```

### Pseudocode for DFS

```text
DFS(graph):
    for v of graph.verts:
        v.color = white
        v.parent = null

    for v of graph.verts:
        if v.color == white:
            DFS_visit(v)

DFS_visit(v):
    v.color = gray

    for neighbor of v.adjacent_nodes:
        if neighbor.color == white:
            neighbor.parent = v
            DFS_visit(neighbor)

    v.color = black
```

## Implementation:

```python
class Node(object):

    def __init__(self, name):
        self.name = name
        self.adjacencyList = []
        self.visited = False
        self.predecessor = None


class DepthFirstSearch(object):  # BFS -> queue + layer by layer algorithm   DFS -> stack + goes
    # as deep as possible into the tree !!!

    def dfs(self, node):

        node.visited = True
        print("%s " % node.name)

        for n in node.adjacencyList:
            if not n.visited:
                self.dfs(n)


node1 = Node("A")
node2 = Node("B")
node3 = Node("C")
node4 = Node("D")
node5 = Node("E")

node1.adjacencyList.append(node2)
node1.adjacencyList.append(node3)
node2.adjacencyList.append(node4)
node4.adjacencyList.append(node5)

dfs = DepthFirstSearch()
dfs.dfs(node1)

```

![](../../../../.gitbook/assets/image%20%284%29.png)



```python
def graph_dfs(matrix):
    rows, cols = len(matrix), len(matrix[0])
    visited = set()
    directions = ((0, 1), (0, -1), (1, 0), (-1, 0))
    def dfs(i, j):
        if (i, j) in visited:
            return
        visited.add((i, j))
        # Traverse neighbors.
        for direction in directions:
            next_i, next_j = i + direction[0], j + direction[1]
            if 0 <= next_i < rows and 0 <= next_j < cols: # Check boundary.
                # Add any other checking here ^
                dfs(next_i, next_j)

    for i in range(rows):
        for j in range(cols):
            dfs(i, j)

graph_dfs([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
])

```

