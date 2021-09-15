# Earliest Ancestor

This is a take-home coding challenge from a top tech company. The spec is providied verbatim.


## Problem

Suppose we have some input data describing a graph of relationships between parents and children over multiple generations. The data is formatted as a list of (parent, child) pairs, where each individual is assigned a unique integer identifier.

For example, in this diagram and the sample input, 3 is a child of 1 and 2, and 5 is a child of 4:

```
 10
 /
1   2   4  11
 \ /   / \ /
  3   5   8
   \ / \   \
    6   7   9
```

Write a function that, given the dataset and the ID of an individual in the dataset, returns their earliest known ancestor – the one at the farthest distance from the input individual. If there is more than one ancestor tied for "earliest", return the one with the lowest numeric ID. If the input individual has no parents, the function should return -1.

```
Example input
  6

  1 3
  2 3
  3 6
  5 6
  5 7
  4 5
  4 8
  8 9
  11 8
  10 1
Example output
  10
```

Clarifications:
* The input will not be empty.
* There are no cycles in the input.
* There are no "repeated" ancestors – if two individuals are connected, it is by exactly one path.
* IDs will always be positive integers.
* A parent may have any number of children.

## Solution
*The solution video is here* 

<a href="http://www.youtube.com/watch?feature=player_embedded&v=IXjmnAFb1cA
" target="_blank"><img src="http://img.youtube.com/vi/IXjmnAFb1cA/0.jpg" 
alt="Earliest Ancestor Solution Video" width="240" height="180" border="10" /></a>

### Remember to follow the steps to turn the problem in to a graph problem and then plan it out. once you have formulated the plan you can follow it out like this for instance.

*First we write a Queue class*

```python
class Queue:
    def __init__(self):
        self.storage = []

    def enqueue(self, value):
        self.storage.append(value)

    def dequeue(self):
        if self.size() > 0:
            return self.storage.pop(0)
        else:
            return None

    def size(self):
        return len(self.storage)
```

*Next we can write a simple Graph class*

```python
class Graph:
    """ 
        Represent a graph as a dictionary of verts 
        mapping labels to edges 
    
    """
    def __init__(self):
        self.vertices = {}
    
    def add_vertex(self, vertex_id):
        if vertex_id not in self.vertices:
            self.vertices[vertex_id] = set()
    
    def add_edge(self, v1, v2):
        if v1 in self.vertices and v2 in self.vertices:
            self.vertices[v1].add(v2)
        else:
            raise KeyError("That vertex does not exist!")
```

*Once we have our help structures we can do the main bulk of the work in the earliest_ancestor function. You can decompose the find neighbors if you like. In this implementation i hard coded the functionality in to the main body of the function*

```python
def earliest_ancestor(ancestors, starting_node):
    # 1. Build the graph
    # instantiate a new graph object
    graph = Graph()
    # loop over all pairs in ancestors
    for pair in ancestors:
        # add pair[0] and pair[1] to the graph
        graph.add_vertex(pair[0])
        graph.add_vertex(pair[1])
        # build the edges in reverse
        graph.add_edge(pair[1], pair[0])
    # Do a BFS (with paths)
    # create a queue
    q = Queue()
    # enqueue starting node inside a list
    q.enqueue([starting_node])
    # set a max path length to 1
    max_path_length = 1
    # set initial earlyest ancestor
    earliest_ancestor = -1
    # while queue has contents
    while q.size() > 0:
        # dequeue the path
        path = q.dequeue()
        # get the last vert
        vert = path[-1]
        # if path is longer or equal and the value is smaller, or if the path is longer
        if (len(path) >= max_path_length and vert < earliest_ancestor) or (len(path) > max_path_length):
            # set the earliest ancestor to the vert
            earliest_ancestor = vert
            # set the max path length to the len of the path
            max_path_length = len(path)
        # loop over each neighbor in the graphs vertices at index of vert
        for neighbor in graph.vertices[vert]:
            # make a copy of the path
            path_copy = list(path)
            # append neighbor to the coppied path
            path_copy.append(neighbor)
            # then enqueue the copied path
            q.enqueue(path_copy)
    # return earliest ancestor
    return earliest_ancestor
```

*The full code is all in the [ans.py](./ans.py) file and the tests are in the [test_ans.py](./test_ans.py) file*
