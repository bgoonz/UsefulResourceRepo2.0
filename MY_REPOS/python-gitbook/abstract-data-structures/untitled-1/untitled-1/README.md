# Graphs

Projects:

{% file src="../../../.gitbook/assets/projects.zip" %}

{% tabs %}
{% tab title="Adjacency List" %}
```python
from queue import Queue
from stack import Stack
# lets do a graph adjacency list
class Graph:
    """Represent a graph as a dictionary of vertices mapping labels to edges."""
    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex_id):
        self.vertices[vertex_id] = set()

    def add_edge(self, v1, v2):
        if v1 in self.vertices and v2 in self.vertices:
            self.vertices[v1].add(v2)
        else:
            raise IndexError("Vertex Does not exist!")

    def get_neighbors(self, vertex_id):
        return self.vertices[vertex_id]

    def bft(self, starting_vertex_id):
        # create an empty queue and enqueue a starting vertex
        q = Queue()
        q.enqueue(starting_vertex_id)

        # create a set to store the visited vertices
        visited = set()

        # while the queue is not empty
        while q.size > 0:
            # dequeue the first vertex
            v = q.dequeue()

            # if vertex has not been visited
            if v not in visited:
                # mark the vertex as visited
                visited.add(v)
                # print it for debug
                print(v)

                # add all of it's neighbors to the back of the queue
                for next_vertex in self.get_neighbors(v):
                    q.enqueue(next_vertex)

    def dft(self, starting_vertex_id):
        # create an empty stack and push a starting vertex
        s = Stack()
        s.push(starting_vertex_id)

        # create a set to store the visited vertices
        visited = set()

        # while the stack is not empty
        while s.size > 0:
            # pop the first vertex
            v = s.pop()

            # if vertex has not been visited
            if v not in visited:
                # mark the vertex as visited
                visited.add(v)
                # print it for debug
                print(v)

                # add all of it's neighbors to the top of the stack
                for next_vertex in self.get_neighbors(v):
                    s.push(next_vertex)
    

    def dft_recursive(self, starting_vertex, visited=None):
            """
            Print each vertex in depth-first order
            beginning from starting_vertex.
            This should be done using recursion.
            """
            if visited is None:
                visited = set()
            visited.add(starting_vertex)
            print(starting_vertex)

            for v in self.get_neighbors(starting_vertex):
                if v not in visited:
                    self.dft_recursive(v, visited)

    def bfs(self, starting_vertex_id, target_vertex_id):
        # create an empty queue and enqueue PATH To the Starting Vertex ID
        q = Queue()
        q.enqueue([starting_vertex_id])
        # create a set to store visited vertices
        visited = set()

        # while the queue is not empty
        while q.size() > 0:
            # dequeue the first PATH
            path = q.dequeue()
            # grab the last vertex from the Path
            v = path[-1]

            # check if the vertex has not been visited
            if v not in visited:
                # is this vertex the target?
                if v == target_vertex_id:
                    # return the path
                    return path
                # mark it as visited
                visited.add(v)

                # then add A Path to its neighbors to the back of the queue
                for next_v in self.get_neighbors(v):
                    # make a copy of the path
                    path_copy = list(path)
                    # append the neighbor to the back of the path
                    path_copy.append(next_v)
                    # enqueue out new path
                    q.enqueue(path_copy)


        # return none
        return None

    def dfs(self, starting_vertex_id, target_vertex_id):
        # create an empty stack and push PATH To the Starting Vertex ID
        s = Stack()
        s.push([starting_vertex_id])
        # create a set to store visited vertices
        visited = set()

        # while the stack is not empty
        while s.size() > 0:
            # pop the first PATH
            path = s.pop()
            # grab the last vertex from the Path
            v = path[-1]

            # check if the vertex has not been visited
            if v not in visited:
                # is this vertex the target?
                if v == target_vertex_id:
                    # return the path
                    return path
                # mark it as visited
                visited.add(v)

                # then add A Path to its neighbors to the back of the queue
                for next_v in self.get_neighbors(v):
                    # make a copy of the path
                    path_copy = list(path)
                    # append the neighbor to the back of the path
                    path_copy.append(next_v)
                    # push out new path
                    s.push(path_copy)


        # return none
        return None


    

# if __name__ == '__main__':
#     graph = Graph()  # Instantiate your graph
#     # https://github.com/LambdaSchool/Graphs/blob/master/objectives/breadth-first-search/img/bfs-visit-order.png
#     graph.add_vertex(1)
#     graph.add_vertex(2)
#     graph.add_vertex(3)
#     graph.add_vertex(4)
#     graph.add_vertex(5)
#     graph.add_vertex(6)
#     graph.add_vertex(7)
#     graph.add_edge(5, 3)
#     graph.add_edge(6, 3)
#     graph.add_edge(7, 1)
#     graph.add_edge(4, 7)
#     graph.add_edge(1, 2)
#     graph.add_edge(7, 6)
#     graph.add_edge(2, 4)
#     graph.add_edge(3, 5)
#     graph.add_edge(2, 3)
#     graph.add_edge(4, 6)

#     '''
#     Should print:
#         {1: {2}, 2: {3, 4}, 3: {5}, 4: {6, 7}, 5: {3}, 6: {3}, 7: {1, 6}}
#     '''
#     print(graph.vertices)

#     '''
#     Valid BFT paths:
#         1, 2, 3, 4, 5, 6, 7
#         1, 2, 3, 4, 5, 7, 6
#         1, 2, 3, 4, 6, 7, 5
#         1, 2, 3, 4, 6, 5, 7
#         1, 2, 3, 4, 7, 6, 5
#         1, 2, 3, 4, 7, 5, 6
#         1, 2, 4, 3, 5, 6, 7
#         1, 2, 4, 3, 5, 7, 6
#         1, 2, 4, 3, 6, 7, 5
#         1, 2, 4, 3, 6, 5, 7
#         1, 2, 4, 3, 7, 6, 5
#         1, 2, 4, 3, 7, 5, 6
#     '''
#     graph.bft(1)

#     '''
#     Valid DFT paths:
#         1, 2, 3, 5, 4, 6, 7
#         1, 2, 3, 5, 4, 7, 6
#         1, 2, 4, 7, 6, 3, 5
#         1, 2, 4, 6, 3, 5, 7
#     '''
#     graph.dft(1)
#     graph.dft_recursive(1)

#     '''
#     Valid BFS path:
#         [1, 2, 4, 6]
#     '''
#     print(graph.bfs(1, 6))

#     '''
#     Valid DFS paths:
#         [1, 2, 4, 6]
#         [1, 2, 4, 7, 6]
#     '''
#     print(graph.dfs(1, 6))
#     print(graph.dfs_recursive(1, 6))
```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

## Graph

* Given a list of sorted words from an alien dictionary, find the order of the alphabet.
  * Alien Dictionary Topological Sort question.
* Find if a given string matches any path in a labeled graph. A path may contain cycles.
* Given a bipartite graph, separate the vertices into two sets.
* You are a thief trying to sneak across a rectangular 100 x 100m field. There are alarms placed on the fields and they each have a circular sensing radius which will trigger if anyone steps into it. Each alarm has its own radius. Determine if you can get from one end of the field to the other end.
* Given a graph and two nodes, determine if there exists a path between them.
* Determine if a cycle exists in the graph.

{% tabs %}
{% tab title="Directed Graph:" %}


## Directed Graph:

```python
class Node(object):
    def __init__(self, value):
        self.value = value
        self.edges = []

class Edge(object):
    def __init__(self, value, node_from, node_to):
        self.value = value
        self.node_from = node_from
        self.node_to = node_to

class Graph(object):
    def __init__(self, nodes=[], edges=[]):
        self.nodes = nodes
        self.edges = edges

    def insert_node(self, new_node_val):
        new_node = Node(new_node_val)
        self.nodes.append(new_node)

    def insert_edge(self, new_edge_val, node_from_val, node_to_val):
        from_found = None
        to_found = None
        for node in self.nodes:
            if node_from_val == node.value:
                from_found = node
            if node_to_val == node.value:
                to_found = node
        if from_found == None:
            from_found = Node(node_from_val)
            self.nodes.append(from_found)
        if to_found == None:
            to_found = Node(node_to_val)
            self.nodes.append(to_found)
        new_edge = Edge(new_edge_val, from_found, to_found)
        from_found.edges.append(new_edge)
        to_found.edges.append(new_edge)
        self.edges.append(new_edge)

    def get_edge_list(self):
        """Don't return a list of edge objects!
        Return a list of triples that looks like this:
        (Edge Value, From Node Value, To Node Value)"""
        edge_list = []
        for item in self.nodes:
            for each_edge in item.edges:
                edge_tuple = (each_edge.value, each_edge.node_from.value, each_edge.node_to.value)
                if edge_tuple not in edge_list:
                    edge_list.append(edge_tuple)
        return edge_list

    def get_adjacency_list(self):
        """Don't return any Node or Edge objects!
        You'll return a list of lists.
        The indices of the outer list represent
        "from" nodes.
        Each section in the list will store a list
        of tuples that looks like this:
        (To Node, Edge Value)"""
        adjacency_list = []
        edge_list = self.get_edge_list()
        max_node_val = 0
        for tuple in edge_list:
            if(max_node_val<tuple[1]):
                max_node_val = tuple[1]
            if(max_node_val<tuple[2]):
                max_node_val = tuple[2]

        for i in range(max_node_val+1):
            node_list = []
            for item in edge_list:
                if(i==item[1]):
                    new_tuple = (item[2], item[0])
                    node_list.append(new_tuple)
            if(node_list!=[]):
                adjacency_list.append(node_list)
            else:
                adjacency_list.append(None)

        return adjacency_list

    def get_adjacency_matrix(self):
        """Return a matrix, or 2D list.
        Row numbers represent from nodes,
        column numbers represent to nodes.
        Store the edge values in each spot,
        and a 0 if no edge exists."""
        adjacency_matrix = []
        adjacency_list = self.get_adjacency_list()
        max_node_val = len(adjacency_list)

        for item in adjacency_list:
            node_list = [0]*(max_node_val)
            if(item!=None):
                for tuple in item:
                    node_list[tuple[0]]=tuple[1]
            adjacency_matrix.append(node_list)
        return adjacency_matrix

graph = Graph()
graph.insert_edge(100, 1, 2)
graph.insert_edge(101, 1, 3)
graph.insert_edge(102, 1, 4)
graph.insert_edge(103, 3, 4)
# Should be [(100, 1, 2), (101, 1, 3), (102, 1, 4), (103, 3, 4)]
print(graph.get_edge_list())
# Should be [None, [(2, 100), (3, 101), (4, 102)], None, [(4, 103)], None]
print(graph.get_adjacency_list())
# Should be [[0, 0, 0, 0, 0], [0, 0, 100, 101, 102], [0, 0, 0, 0, 0], [0, 0, 0, 0, 103], [0, 0, 0, 0, 0]]
print(graph.get_adjacency_matrix())
```
{% endtab %}

{% tab title="Graph Traversal" %}
```python
class Node(object):
    def __init__(self, value):
        self.value = value
        self.edges = []
        self.visited = False

class Edge(object):
    def __init__(self, value, node_from, node_to):
        self.value = value
        self.node_from = node_from
        self.node_to = node_to

# You only need to change code with docs strings that have TODO.
# Specifically: Graph.dfs_helper and Graph.bfs
# New methods have been added to associate node numbers with names
# Specifically: Graph.set_node_names
# and the methods ending in "_names" which will print names instead
# of node numbers

class Graph(object):
    def __init__(self, nodes=None, edges=None):
        self.nodes = nodes or []
        self.edges = edges or []
        self.node_names = []
        self._node_map = {}

    def set_node_names(self, names):
        """The Nth name in names should correspond to node number N.
        Node numbers are 0 based (starting at 0).
        """
        self.node_names = list(names)

    def insert_node(self, new_node_val):
        "Insert a new node with value new_node_val"
        new_node = Node(new_node_val)
        self.nodes.append(new_node)
        self._node_map[new_node_val] = new_node
        return new_node

    def insert_edge(self, new_edge_val, node_from_val, node_to_val):
        "Insert a new edge, creating new nodes if necessary"
        nodes = {node_from_val: None, node_to_val: None}
        for node in self.nodes:
            if node.value in nodes:
                nodes[node.value] = node
                if all(nodes.values()):
                    break
        for node_val in nodes:
            nodes[node_val] = nodes[node_val] or self.insert_node(node_val)
        node_from = nodes[node_from_val]
        node_to = nodes[node_to_val]
        new_edge = Edge(new_edge_val, node_from, node_to)
        node_from.edges.append(new_edge)
        node_to.edges.append(new_edge)
        self.edges.append(new_edge)

    def get_edge_list(self):
        """Return a list of triples that looks like this:
        (Edge Value, From Node, To Node)"""
        return [(e.value, e.node_from.value, e.node_to.value)
                for e in self.edges]

    def get_edge_list_names(self):
        """Return a list of triples that looks like this:
        (Edge Value, From Node Name, To Node Name)"""
        return [(edge.value,
                 self.node_names[edge.node_from.value],
                 self.node_names[edge.node_to.value])
                for edge in self.edges]

    def get_adjacency_list(self):
        """Return a list of lists.
        The indecies of the outer list represent "from" nodes.
        Each section in the list will store a list
        of tuples that looks like this:
        (To Node, Edge Value)"""
        max_index = self.find_max_index()
        adjacency_list = [[] for _ in range(max_index)]
        for edg in self.edges:
            from_value, to_value = edg.node_from.value, edg.node_to.value
            adjacency_list[from_value].append((to_value, edg.value))
        return [a or None for a in adjacency_list] # replace []'s with None

    def get_adjacency_list_names(self):
        """Each section in the list will store a list
        of tuples that looks like this:
        (To Node Name, Edge Value).
        Node names should come from the names set
        with set_node_names."""
        adjacency_list = self.get_adjacency_list()
        def convert_to_names(pair, graph=self):
            node_number, value = pair
            return (graph.node_names[node_number], value)
        def map_conversion(adjacency_list_for_node):
            if adjacency_list_for_node is None:
                return None
            return map(convert_to_names, adjacency_list_for_node)
        return [map_conversion(adjacency_list_for_node)
                for adjacency_list_for_node in adjacency_list]

    def get_adjacency_matrix(self):
        """Return a matrix, or 2D list.
        Row numbers represent from nodes,
        column numbers represent to nodes.
        Store the edge values in each spot,
        and a 0 if no edge exists."""
        max_index = self.find_max_index()
        adjacency_matrix = [[0] * (max_index) for _ in range(max_index)]
        for edg in self.edges:
            from_index, to_index = edg.node_from.value, edg.node_to.value
            adjacency_matrix[from_index][to_index] = edg.value
        return adjacency_matrix

    def find_max_index(self):
        """Return the highest found node number
        Or the length of the node names if set with set_node_names()."""
        if len(self.node_names) > 0:
            return len(self.node_names)
        max_index = -1
        if len(self.nodes):
            for node in self.nodes:
                if node.value > max_index:
                    max_index = node.value
        return max_index

    def find_node(self, node_number):
        "Return the node with value node_number or None"
        return self._node_map.get(node_number)

    def _clear_visited(self):
        for node in self.nodes:
            node.visited = False

    def dfs_helper(self, start_node):
        """TODO: Write the helper function for a recursive implementation
        of Depth First Search iterating through a node's edges. The
        output should be a list of numbers corresponding to the
        values of the traversed nodes.
        ARGUMENTS: start_node is the starting Node
        MODIFIES: the value of the visited property of nodes in self.nodes
        RETURN: a list of the traversed node values (integers).
        """
        ret_list = [start_node.value]
        # Your code here
        start_node.visited = True
        next_edges = start_node.edges
        next_vals = []
        for this_edge in next_edges:
            #iterates through edges to find the first edge that has places not 'visited'
            if(this_edge.node_to.visited==False):
                # adds all places not visited along this edge to the list of nodes
                # to be returned, using recursion
                next_vals.extend(self.dfs_helper(this_edge.node_to))

        if(next_vals!=[]):
            ret_list.extend(next_vals)
        return ret_list

    def dfs(self, start_node_num):
        """Outputs a list of numbers corresponding to the traversed nodes
        in a Depth First Search.
        ARGUMENTS: start_node_num is the starting node number (integer)
        MODIFIES: the value of the visited property of nodes in self.nodes
        RETURN: a list of the node values (integers)."""
        self._clear_visited()
        start_node = self.find_node(start_node_num)
        return self.dfs_helper(start_node)

    def dfs_names(self, start_node_num):
        """Return the results of dfs with numbers converted to names."""
        return [self.node_names[num] for num in self.dfs(start_node_num)]

    def bfs(self, start_node_num):
        """TODO: Create an iterative implementation of Breadth First Search
        iterating through a node's edges. The output should be a list of
        numbers corresponding to the traversed nodes.
        ARGUMENTS: start_node_num is the node number (integer)
        MODIFIES: the value of the visited property of nodes in self.nodes
        RETURN: a list of the node values (integers)."""
        node = self.find_node(start_node_num)
        self._clear_visited()
        ret_list = [node.value]
        # Your code here
        node.visited = True
        total_edges = node.edges
        node_queue = [node]

        while(node_queue!=[]):
            this_node = node_queue[0]
            node_queue = node_queue[1:]
            node_edges = this_node.edges
            for each_edge in node_edges:
                if(each_edge.node_to.visited==False):
                    node_queue.append(each_edge.node_to)
                    each_edge.node_to.visited = True
                    ret_list.append(each_edge.node_to.value)

        return ret_list

    def bfs_names(self, start_node_num):
        """Return the results of bfs with numbers converted to names."""
        return [self.node_names[num] for num in self.bfs(start_node_num)]

graph = Graph()

# You do not need to change anything below this line.
# You only need to implement Graph.dfs_helper and Graph.bfs

graph.set_node_names(('Mountain View',   # 0
                      'San Francisco',   # 1
                      'London',          # 2
                      'Shanghai',        # 3
                      'Berlin',          # 4
                      'Sao Paolo',       # 5
                      'Bangalore'))      # 6

graph.insert_edge(51, 0, 1)     # MV <-> SF
graph.insert_edge(51, 1, 0)     # SF <-> MV
graph.insert_edge(9950, 0, 3)   # MV <-> Shanghai
graph.insert_edge(9950, 3, 0)   # Shanghai <-> MV
graph.insert_edge(10375, 0, 5)  # MV <-> Sao Paolo
graph.insert_edge(10375, 5, 0)  # Sao Paolo <-> MV
graph.insert_edge(9900, 1, 3)   # SF <-> Shanghai
graph.insert_edge(9900, 3, 1)   # Shanghai <-> SF
graph.insert_edge(9130, 1, 4)   # SF <-> Berlin
graph.insert_edge(9130, 4, 1)   # Berlin <-> SF
graph.insert_edge(9217, 2, 3)   # London <-> Shanghai
graph.insert_edge(9217, 3, 2)   # Shanghai <-> London
graph.insert_edge(932, 2, 4)    # London <-> Berlin
graph.insert_edge(932, 4, 2)    # Berlin <-> London
graph.insert_edge(9471, 2, 5)   # London <-> Sao Paolo
graph.insert_edge(9471, 5, 2)   # Sao Paolo <-> London
# (6) 'Bangalore' is intentionally disconnected (no edges)
# for this problem and should produce None in the
# Adjacency List, etc.

import pprint
pp = pprint.PrettyPrinter(indent=2)

print("Edge List")
pp.pprint(graph.get_edge_list_names())

print("\nAdjacency List")
pp.pprint(graph.get_adjacency_list_names())

print("\nAdjacency Matrix")
pp.pprint(graph.get_adjacency_matrix())

print("\nDepth First Search")
pp.pprint(graph.dfs_names(2))

# Should print:
# Depth First Search
# ['London', 'Shanghai', 'Mountain View', 'San Francisco', 'Berlin', 'Sao Paolo']

print("\nBreadth First Search")
pp.pprint(graph.bfs_names(2))
# test error reporting
# pp.pprint(['Sao Paolo', 'Mountain View', 'San Francisco', 'London', 'Shanghai', 'Berlin'])

# Should print:
# Breadth First Search
# ['London', 'Shanghai', 'Berlin', 'Sao Paolo', 'Mountain View', 'San Francisco']

```
{% endtab %}

{% tab title="Javascript" %}
{% embed url="https://gist.github.com/bgoonz/5f6cfb85d684629aa2e0d5eea35edacb" %}

### JS ADVANCED:

{% embed url="https://gist.github.com/bgoonz/bd665286cdc5c0b8f74f8129a1b74d16" %}
{% endtab %}
{% endtabs %}







## Intro to Graphs

![Directed Graph ](../../../.gitbook/assets/image%20%2816%29.png)

### Objectives

* Learn what graphs are
* Learn the components of graphs
* Learn what graphs are useful for

### What Are Graphs?

Graphs are collections of related data. They're like trees, except connections can be made from any node to any other node, even forming loops.

The nodes in a graph are called _vertexes_ \(or _vertices_ or _verts_\), and the connections between the verts are called _edges_.

And edge denotes a relationship or linkage between the two verts.

### What can they represent?

Graphs can represent any kind of multiway relational data.

This could be a collection of cities and linking roads.

It could be a collection of computers on a network.

It could be a population of people who know each other and [Kevin Bacon](https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon).

It could represent trade relationships between nations.

And so on.

![](../../../.gitbook/assets/image%20%2819%29.png)

### Definitions

#### Directed/Undirected Graphs

If the edges are "one way" \(have an arrow\), the graph is said to be a _directed graph_. If there are no arrows, the edges are bidirectional and the graph is an _undirected_ graph.

![](../../../.gitbook/assets/image%20%2817%29.png)

This is an **undirected graph** which could represent a social network like Facebook. Alice is friends with Bob, Carol and Dave, Bob is friends with Alice and Dave, Carol is only friend with Alice, and Dave is friends with only Alice and Bob. In this example, the nodes represent people and the edges represent friendship.

![Directed Graph](img/social_graph_directed.jpg)

This is an **directed graph** which could represent a social network like Twitter or Instagram. Since Twitter/Instagram follows are one-way as opposed to always-mutual Facebook friendships, they are represented with arrows. In the above directed graph, Alice and Bob follow each other, Dave follows Alice and Bob, and Carol only follows Alice.

#### Cyclic/Acyclic Graphs

If a cycle can be formed \(e.g. you can follow the edges and arrive again at an already-visited vert\), the graph is _cyclic_. Otherwise it is _acyclic_.

#### Weighted Graphs

Graphs with values \(_weights_\) associated with the edges are called _weighted graphs_.

The meaning of the weight is dependent on the type of graph. A graph of road network segments might have weight represent the length of the road. The higher the total weight of a route on the graph, the longer the trip is. The weights can be used to help decide if a particular route should be chosen over another.

![](../../../.gitbook/assets/image%20%2814%29.png)

Weights can be further modified. For example, if one were building a bicycle map, roads with bad car traffic or very steep uphills could be given unnaturally large weights so a routing algorithm would be unlikely to take them. \(This is how Google Maps avoids freeways when you ask it for walking directions.\)

#### Directed Acyclic Graphs \(DAGs\)

A _directed acyclic graph_ \(_DAG_\) has a number of applications. From [Wikipedia](https://en.wikipedia.org/wiki/Directed_acyclic_graph):

> DAGs can model many different kinds of information. A spreadsheet can be modeled as a DAG, with a vertex for each cell and an edge whenever the formula in one cell uses the value from another; a topological ordering of this DAG can be used to update all cell values when the spreadsheet is changed. Similarly, topological orderings of DAGs can be used to order the compilation operations in a makefile. The program evaluation and review technique uses DAGs to model the milestones and activities of large human projects, and schedule these projects to use as little total time as possible. Combinational logic blocks in electronic circuit design, and the operations in dataflow programming languages, involve acyclic networks of processing elements. DAGs can also represent collections of events and their influence on each other, either in a probabilistic structure such as a Bayesian network or as a record of historical data such as family trees or the version histories of distributed revision control systems. DAGs can also be used as a compact representation of sequence data, such as the directed acyclic word graph representation of a collection of strings, or the binary decision diagram representation of sequences of binary choices.

It's notable that git uses a DAG to represent commits. A commit can have a child commit, or more than one child commit \(in the case of a branch\). A child could come from one parent commit, or from two \(in the case of a merge\). But there's no way to go back and form a repeating loop in the git commit hierarchy.



{% page-ref page="../array/" %}

{% page-ref page="../tree/binary-search-tree/" %}

{% page-ref page="../untitled-4/" %}

{% page-ref page="../array/extra-array.md" %}

{% page-ref page="../stack/" %}

{% page-ref page="../tree/binary-tree/" %}

{% page-ref page="../untitled-6/" %}

{% page-ref page="../untitled-5/" %}

{% page-ref page="../untitled-2/" %}

{% page-ref page="../untitled-3/" %}

{% page-ref page="../queue/queue-sandbox.md" %}

{% page-ref page="../untitled-5/" %}

{% page-ref page="../untitled-4/double-linked-list.md" %}

{% page-ref page="./" %}

{% page-ref page="../untitled/" %}

{% page-ref page="../heap/" %}



