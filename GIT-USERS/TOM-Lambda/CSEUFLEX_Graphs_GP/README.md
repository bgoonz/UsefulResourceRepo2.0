# Graphs

## *Day 1*

## 1. What is a graph and how is it represented?

- What is a Graph?

- Terminology
    - Directed Vs Undirected
        - Directed (Twitter follow) : Undirected (bi-directional) (Facebook)
        - Undirected Edge is the same as a bi directional edge 
    
    - Cyclic Vs Acyclic
        - cyclic follows a cycle within a graph
        - acyclic does not follow a cycle (to the origin point)
    - Dense Vs Sparse
    - Weighted Vs Unweighted

- Adjacency Lists & Adjacency Matrices

## Lets code an Adjacency List

```python
class Graph:
    """Represent a graph as a dictionary of vertices mapping labels to edges."""
    def __init__(self):
        pass

    def add_vertex(self, vertex_id):
        pass

    def add_edge(self, v1, v2):
        pass

    def get_neighbors(self, vertex_id):
        pass
```




## 2. Breadth First & Depth first Traversal
These traversals use the BFS and DFS algorithm respectively

- *BFT* Looks at nodes `1` away then nodes `2` away then nodes `n` away such that `n` is the next level of children, grand-children etc
- *DFT* looks at a `neighbor`, then the `neighbor's neighbor`, then the `neighbor's neighbor's neighbor` etc


## Lets take a quick break
After the break we can look at the concept of this traversal and run through the traversing process

### 3. Partial Traversal example

```
q = []
visited = {}
```

Enqueue first vertex:

```
q = [1]
visited = {}
```

Dequeue first vertex:

```
q = []
visited = {}

1
```

Check if it's been visited (no):

```
q = []
visited = {}

1
```

Mark it as visited and enqueue its neighbors:

```
q = [2]
visited = {1}
```

Repeat until queue is empty:

```
q = [2]
visited = {1}
```

deque item, and repeat process:

```
q = []
visited = {1, 2, 3, 4, 5, 6, 7}

```

## Lets do some pseudo-code:

```python
def bft(self, starting_vertex_id):
    pass
```

## Lets code up that BFT

```python
def bft(self, starting_vertex_id):
    pass
```
## Lets take a small break
After this break we will look at how we can convert the bft to dft and talk about the difference between bft and bfs

## 4. What can we do with this to make a dft (Think about the Data Structure used)?

```python
def dft(self, starting_vertex_id):
    pass
```


```
s = []
visited = {}
```

push first vertex:

```
s = [1]
visited = {}
```

pop first vertex:

```
s = []
visited = {}

1
```

Check if it's been visited (no):

```
s = []
visited = {}

1
```

Mark it as visited and push its neighbors:

```
s = [2]
visited = {1}
```

Repeat until stack is empty:

```
s = [2]
visited = {1}
```

pop item, and repeat process:

```
s = []
visited = {1, 2, 4, 7, 6, 3, 5}


```

## Lets talk about the bfs using a path

```python
def bfs(self, starting_vertex_id, target_vertex_id):
    # create an empty queue and enqueue the path to the starting vertex id
    # create a set to store visited vertices
    # while queueu not empty
        # dequeue the first path
        # grab the last vertex from the path
        # if vertex is not in visited
            # check if it is the target
                # return the path to the target
            # mark it visited
            # add path to naighbours to back of queue
                # copy the path
                # append the neighbor to the back of it
    # return none
    pass
```

## bfs partial search


```
q = []
visited = {}
```

Enqueue path to the first vertex:

```
q = [[1]]
visited = {}
```

Dequeue first path :

```
q = []
visited = {}

[1]
```

Check if it's been visited (no):

```
q = []
visited = {1}

[1, 2]
```

Mark it as visited and enqueue its neighbors:

```
q = [[1, 2]]
visited = {1}
```

Repeat until queue is empty:

```
q = [[1, 2, 3, 5], [1, 2, 4, 6], [1, 2, 4, 7]]
visited = {1, 2, 3, 4}

[1, 2, 4]
4
=> [1, 2, 4]
```

deque item, and repeat process:

```
q = []
visited = {1, 2, 3, 4, 5, 6, 7}

```
## Today's Project
let's take a look at the project repo!
