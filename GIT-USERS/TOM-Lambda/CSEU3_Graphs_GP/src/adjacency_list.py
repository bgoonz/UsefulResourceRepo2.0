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
<<<<<<< HEAD
        return self.vertices[vertex_id]
=======
        return self.vertices[vertex_id]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
