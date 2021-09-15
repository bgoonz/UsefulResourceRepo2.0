# Earliest Ancestor

{% file src="../../../.gitbook/assets/ancestor.cpython-38 \(1\).pyc" %}



## Earliest Ancestor

This is a take-home coding challenge from a top tech company. The spec is provided verbatim.

### Problem

Suppose we have some input data describing a graph of relationships between parents and children over multiple generations. The data is formatted as a list of \(parent, child\) pairs, where each individual is assigned a unique integer identifier.

For example, in this diagram and the sample input, 3 is a child of 1 and 2, and 5 is a child of 4:

```text
 10
 /
1   2   4  11
 \ /   / \ /
  3   5   8
   \ / \   \
    6   7   9
```

Write a function that, given the dataset and the ID of an individual in the dataset, returns their earliest known ancestor – the one at the farthest distance from the input individual. If there is more than one ancestor tied for "earliest", return the one with the lowest numeric ID. If the input individual has no parents, the function should return -1.

```text
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

{% tabs %}
{% tab title="Ancestor.py" %}
```python
class Queue:
    def __init__(self):
        self.queue = []

    def enqueue(self, value):
        self.queue.append(value)

    def dequeue(self):
        if self.size() > 0:
            return self.queue.pop(0)
        else:
            return None

    def size(self):
        return len(self.queue)


class Graph:
    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex_id):
        if vertex_id not in self.vertices:
            self.vertices[vertex_id] = set()

    def add_edges(self, v1, v2):
        if v1 in self.vertices and v2 in self.vertices:
            self.vertices[v1].add(v2)
        else:
            raise IndexError("That vertex does not exist")


def earliest_ancestor(ancestors, starting_node):
    # build the graph
    graph = Graph()

    for pair in ancestors:
        graph.add_vertex(pair[0])
        graph.add_vertex(pair[1])

        # build edges in reverse
        graph.add_edges(pair[1], pair[0])

    q = Queue()
    q.enqueue([starting_node])

    # keep track of longest path
    max_path_length = 1
    earliest_anc = -1

    while q.size() > 0:
        path = q.dequeue()
        v = path[-1]

        if (
            len(path) >= max_path_length
            and v < earliest_anc
            or len(path) > max_path_length
        ):
            earliest_anc = v
            max_path_length = len(path)

        for neighbor in graph.vertices[v]:
            path_copy = list(path)
            path_copy.append(neighbor)
            q.enqueue(path_copy)

    return earliest_anc

```
{% endtab %}

{% tab title="Specs.py" %}
import unittest from ancestor import earliest\_ancestor

class Test\(unittest.TestCase\): """ 10 / 1 2 4 11  / /  / 3 5 8  /   6 7 9 """

```python
def test_earliest_ancestor(self):
    test_ancestors = [
        (1, 3),
        (2, 3),
        (3, 6),
        (5, 6),
        (5, 7),
        (4, 5),
        (4, 8),
        (8, 9),
        (11, 8),
        (10, 1),
    ]
    self.assertEqual(earliest_ancestor(test_ancestors, 1), 10)
    self.assertEqual(earliest_ancestor(test_ancestors, 2), -1)
    self.assertEqual(earliest_ancestor(test_ancestors, 3), 10)
    self.assertEqual(earliest_ancestor(test_ancestors, 4), -1)
    self.assertEqual(earliest_ancestor(test_ancestors, 5), 4)
    self.assertEqual(earliest_ancestor(test_ancestors, 6), 10)
    self.assertEqual(earliest_ancestor(test_ancestors, 7), 4)
    self.assertEqual(earliest_ancestor(test_ancestors, 8), 4)
    self.assertEqual(earliest_ancestor(test_ancestors, 9), 4)
    self.assertEqual(earliest_ancestor(test_ancestors, 10), -1)
    self.assertEqual(earliest_ancestor(test_ancestors, 11), -1)
```

if **name** == "**main**": unittest.main\(\)
{% endtab %}
{% endtabs %}

