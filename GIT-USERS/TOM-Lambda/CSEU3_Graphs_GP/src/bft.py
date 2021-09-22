from util import Stack, Queue
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# lets code a bft
"""
    Remember to follow our problem solving framework
    - Understand the problem
    - Plan a solution
    - Implement the solution
"""

# code up a Graph class implementing with an adjacency list

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Graph:
    """ Represent a Graph as dictionary of vertices map the labels to edges."""

    # constructor
    def __init__(self):
<<<<<<< HEAD
        self.vertices = {} # adjacency list (dictionary)
=======
        self.vertices = {}  # adjacency list (dictionary)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # self.vertices = [[],[],[]] # adjacency matrix (2d list or array)

    # add vertex
    def add_vertex(self, vertex_id):
        self.vertices[vertex_id] = set()

    # add edges
    def add_edge(self, v1, v2):
        # check that v1 and v2 exist in the vertices dictionary
        if v1 in self.vertices and v2 in self.vertices:
            # add v2 to the vertices at v1
            self.vertices[v1].add(v2)
            # # add v1 to the vertices at v2 bidirectional or undirected
            # self.vertices[v2].add(v1)
        # otherwise
        else:
            # raise and exception and give an error
            raise IndexError("That vertex does not exist")

    # get neighbors
    def get_neighbors(self, vertex_id):
        return self.vertices[vertex_id]

    # BFT
    def bft(self, starting_vertex_id):
        # create empty queue enqueue the starting vertex id
        q = Queue()
        q.enqueue(starting_vertex_id)
        # create a set to store our visited vertices
        visited = set()

        # while queue is not empty (len greater than 0)
        while q.size() > 0:
            # dequeue the first vertex
            v = q.dequeue()
            # if that vertex has not been visited
            if v not in visited:
                # mark as visited and print for debugging
                visited.add(v)
<<<<<<< HEAD
                print(v) # for debugging
                # iterate over the child vertices of the current vertex
                for next_vertex in self.vertices[v]:
                    # enqueue the next vertex
                    q.enqueue(next_vertex)
=======
                print(v)  # for debugging
                # iterate over the child vertices of the current vertex
                for next_vertex in self.vertices[v]:
                    # enqueue the next vertex
                    q.enqueue(next_vertex)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
