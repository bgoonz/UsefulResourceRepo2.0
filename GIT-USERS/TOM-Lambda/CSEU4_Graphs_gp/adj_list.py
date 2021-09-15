from queue import Queue
from stack import Stack
<<<<<<< HEAD
# lets do a graph adjacency list
class Graph:
    """Represent a graph as a dictionary of vertices mapping labels to edges."""
=======

# lets do a graph adjacency list
class Graph:
    """Represent a graph as a dictionary of vertices mapping labels to edges."""

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex_id):
        self.vertices[vertex_id] = set()

    def add_edge(self, v1, v2):
        if v1 in self.vertices and v2 in self.vertices:
            self.vertices[v1].add(v2)
        else:
            raise IndexError("Vertex does not exist!")

    def get_neighbors(self, vertex_id):
        return self.vertices[vertex_id]

    def bft(self, starting_vertex_id):
        # create empty queue and enqueue starting vertex id
        q = Queue()
        q.enqueue(starting_vertex_id)
        # create a set to store visited vertices
        visited = set()
        # while the queue is not empty
        while q.size() > 0:
            # dequeue the first vertex
            v = q.dequeue()
            # if that vertex has not been visited
            if v not in visited:
                # mark it as visited
                # print it to show the visited
                print(v)
                visited.add(v)
                # add all of it's neighbors to the back of the queue
                for next_vertex in self.get_neighbors(v):
                    q.enqueue(next_vertex)

    def dft(self, starting_vertex_id):
        # create empty stack and push starting vertex id
        s = Stack()
        s.push(starting_vertex_id)
        # create a set to store visited vertices
        visited = set()
        # while the stack is not empty
        while s.size() > 0:
            # pop the first vertex
            v = s.pop()
            # if that vertex has not been visited
            if v not in visited:
                # mark it as visited
                # print it to show the visited
                print(v)
                visited.add(v)
                # add all of it's neighbors to the stack
                for next_vertex in self.get_neighbors(v):
                    s.push(next_vertex)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def bfs(self, starting_vertex_id, target_vertex_id):
        # create an empty queue and enqueue the path to the starting vertex id
        q = Queue()
        q.enqueue([starting_vertex_id])
        # create a set to store visited vertices
        visited = set()
        # while queue not empty
        while q.size() > 0:
            # dequeue the first path
            path = q.dequeue()
            # grab the last vertex from the path
            v = path[-1]
            # if vertex is not in visited
            if v not in visited:
                # check if it is the target
                if v == target_vertex_id:
                    # return the path to the target
                    return path
                # mark it visited
                visited.add(v)
                # add `PATH TO` neighbours to back of queue
                for next_vertex in self.get_neighbors(v):
                    # copy the path
                    new_path = list(path)
                    # append the neighbor to the back of it
                    new_path.append(next_vertex)
                    q.enqueue(new_path)
        # return none
        return None

    def dfs(self, starting_vertex_id, target_vertex_id):
        # create an empty stack and push the path to the starting vertex id
        s = Stack()
        s.push([starting_vertex_id])
        # create a set to store visited vertices
        visited = set()
        # while queue not empty
        while s.size() > 0:
            # pop the first path
            path = s.pop()
            # grab the last vertex from the path
            v = path[-1]
            # if vertex is not in visited
            if v not in visited:
                # check if it is the target
                if v == target_vertex_id:
                    # return the path to the target
                    return path
                # mark it visited
                visited.add(v)
                # add `PATH TO` neighbours to back of queue
                for next_vertex in self.get_neighbors(v):
                    # copy the path
                    new_path = list(path)
                    # append the neighbor to the back of it
                    new_path.append(next_vertex)
                    s.push(new_path)
        # return none
<<<<<<< HEAD
        return None
=======
        return None
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
