<<<<<<< HEAD
class Queue():
    def __init__(self):
        self.queue = []
    def enqueue(self, value):
        self.queue.append(value)
=======
class Queue:
    def __init__(self):
        self.queue = []

    def enqueue(self, value):
        self.queue.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def dequeue(self):
        if self.size() > 0:
            return self.queue.pop(0)
        else:
            return None
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def size(self):
        return len(self.queue)


class Graph:
    """Represent a graph as a dictionary of vertices mapping labels to edges."""
<<<<<<< HEAD
    def __init__(self):
        self.vertices = {}
    def add_vertex(self, vertex_id):
        if vertex_id not in self.vertices:
            self.vertices[vertex_id] = set()
=======

    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex_id):
        if vertex_id not in self.vertices:
            self.vertices[vertex_id] = set()

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def add_edge(self, v1, v2):
        if v1 in self.vertices and v2 in self.vertices:
            self.vertices[v1].add(v2)
        else:
            raise IndexError("That vertex does not exist!")


def earliest_ancestor(ancestors, starting_node):
    # Build the graph
    graph = Graph()
    for pair in ancestors:
        graph.add_vertex(pair[0])
        graph.add_vertex(pair[1])
        graph.add_edge(pair[1], pair[0])

    # Do a BFS storing the path
    q = Queue()
    q.enqueue([starting_node])
    max_path_length = 1
    earliest_ancestor = -1
    while q.size() > 0:
        path = q.dequeue()
        v = path[-1]
<<<<<<< HEAD
        if (len(path) >= max_path_length and v < earliest_ancestor) or (len(path) > max_path_length):
=======
        if (len(path) >= max_path_length and v < earliest_ancestor) or (
            len(path) > max_path_length
        ):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            earliest_ancestor = v
            max_path_length = len(path)
            for neighbor in graph.vertices[v]:
                path_copy = list(path)
                path_copy.append(neighbor)
                q.enqueue(path_copy)

    return earliest_ancestor
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
