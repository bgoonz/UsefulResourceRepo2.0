"""
Simple graph implementation
"""

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
    def size(self):
        return len(self.queue)

class Stack():
    def __init__(self):
        self.stack = []
    def push(self, value):
        self.stack.append(value)
=======

    def size(self):
        return len(self.queue)


class Stack:
    def __init__(self):
        self.stack = []

    def push(self, value):
        self.stack.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def pop(self):
        if self.size() > 0:
            return self.stack.pop()
        else:
            return None
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def size(self):
        return len(self.stack)


<<<<<<< HEAD


class Graph:
    """Represent a graph as a dictionary of vertices mapping labels to edges."""
    
    def __init__(self):
        self.vertices = {}
    
    def add_vertex(self, vertex_id):
        self.vertices[vertex_id] = set()
    
=======
class Graph:
    """Represent a graph as a dictionary of vertices mapping labels to edges."""

    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex_id):
        self.vertices[vertex_id] = set()

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def add_edge(self, v1, v2):
        if v1 in self.vertices and v2 in self.vertices:
            self.vertices[v1].add(v2)
            self.vertices[v2].add(v1)
        else:
            raise IndexError("That vertex does not exist!")
<<<<<<< HEAD
    
   
=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # BFT
    def bft(self, starting_vertex_id):
        # create an empty queue and enqueue the starting vertex ID
        q = Queue()
        q.enqueue(starting_vertex_id)
        # create a set to store the visited vertices
        visited = set()
        # while the queue is not empty
        while q.size() > 0:
            # Dequeue the first vertex
            v = q.dequeue()
            # if that vertex has not been visited
            if v not in visited:
                # mark it as visited (printing for a representation)
                print(v)
                visited.add(v)
                # then add all of it's neighbors to the back of the queue
                for next_vertex in self.vertices[v]:
                    q.enqueue(next_vertex)

    # DFT
    def dft(self, starting_vertex_id):
        # create an empty stack and push the starting vertex ID
        s = Stack()
        s.push(starting_vertex_id)
        # create a set to store the visited vertices
        visited = set()
        # while the stack is not empty
        while s.size() > 0:
            # pop the first vertex
            v = s.pop()
            # if that vertex has not been visited
            if v not in visited:
                # mark it as visited (printing for a representation)
                print(v)
                visited.add(v)
                # then add all of it's neighbors to the top of the stack
                for next_vertex in self.vertices[v]:
                    s.push(next_vertex)

    def dft_recursive(self, start_vert, visited=None):
        # if the visited structure is set to None
        if visited is None:
            # create a new set for visited
            visited = set()
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # add a starting vertex to the visited set
        visited.add(start_vert)
        # print the start vertex
        print(start_vert)
        # loop over every child vertex in vertices set at the start vertex
        for child_vert in self.vertices[start_vert]:
            # if child vertex is not in visited
            if child_vert not in visited:
                # do a recursive call to dft_recursive
                # using the child vertex and the current visited set as arguments
                self.dft_recursive(child_vert, visited)

    def dfs(self, start_vert, target_value, visited=None):
        # if visited is None
        if visited is None:
            # create a new set of visited
            visited = set()
        # add start vert to visited
        visited.add(start_vert)
        # if the start vert is equal to the target value
        if start_vert == target_value:
            # return True
            return True
        # loop over every child vertex in vertices set at the start vertex
        for child_vert in self.vertices[start_vert]:
            # if child vert is not in visited
            if child_vert not in visited:
                # if the recursive call to dfs
                if self.dfs(child_vert, target_value, visited):
                    # return True
                    return True
        # Return False
        return False

    def bfs(self, starting_vertex_id, target_value):
        # create a queue to hold the vertex ids
        q = Queue()
        # enqueue the start vertex id
        q.enqueue(starting_vertex_id)
        # create an empty visited set
        visited = set()
        # while the queue is not empty
        while q.size() > 0:
            # set vert to the dequeued element
            vert = q.dequeue()
            # if the vert is not in visited
            if vert not in visited:
                # if vert is target value
                if vert == target_value:
                    # return True
                    return True
                # add the vert to visited set
                visited.add(vert)
                # loop over next vert in the vertices at the index of vert
                for next_vert in self.vertices[vert]:
                    # enqueue the next vert
                    q.enqueue(next_vert)
        # return False
        return False

    def bfs_path(self, starting_vertex_id, target_value):
        # create a queue
        q = Queue()
        # enqueue a list holding the starting vertex id
        q.enqueue([starting_vertex_id])
        # created an empty visited set
        visited = set()
        # while the queue is not empty
        while q.size() > 0:
            # dequeue to the path
            path = q.dequeue()
            # set a vert to the last item in the path
            vert = path[-1]
            # if vert is not in visited
            if vert not in visited:
                # if vert is equal to target value
                if vert == target_value:
                    # return path
                    return path
                # add vert to visited set
                visited.add(vert)
                # loop over next vert in vertices at the index of vert
                for next_vert in self.vertices[vert]:
                    # set a new path equal to a new list of the path (copy)
                    new_path = list(path)
                    # append next vert to new path
                    new_path.append(next_vert)
                    # enqueue the new path
                    q.enqueue(new_path)
        # return None
        return None

    def dfs_path(self, starting_vertex_id, target_value):
        # create a stack
        s = Stack()
        # push a list holding the starting vertex id
        s.push([starting_vertex_id])
        # created an empty visited set
        visited = set()
        # while the queue is not empty
        while s.size() > 0:
            # pop to the path
            path = s.pop()
            # set a vert to the last item in the path
            vert = path[-1]
            # if vert is not in visited
            if vert not in visited:
                # if vert is equal to target value
                if vert == target_value:
                    # return path
                    return path
                # add vert to visited set
                visited.add(vert)
                # loop over next vert in vertices at the index of vert
                for next_vert in self.vertices[vert]:
                    # set a new path equal to a new list of the path (copy)
                    new_path = list(path)
                    # append next vert to new path
                    new_path.append(next_vert)
                    # push the new path
                    s.push(new_path)
        # return None
        return None

<<<<<<< HEAD
if __name__ == '__main__':
=======

if __name__ == "__main__":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    graph = Graph()  # Instantiate your graph
    # https://github.com/LambdaSchool/Graphs/blob/master/objectives/breadth-first-search/img/bfs-visit-order.png
    graph.add_vertex(1)
    graph.add_vertex(2)
    graph.add_vertex(3)
    graph.add_vertex(4)
    graph.add_vertex(5)
    graph.add_vertex(6)
    graph.add_vertex(7)
    graph.add_edge(5, 3)
    graph.add_edge(6, 3)
    graph.add_edge(7, 1)
    graph.add_edge(4, 7)
    graph.add_edge(1, 2)
    graph.add_edge(7, 6)
    graph.add_edge(2, 4)
    graph.add_edge(3, 5)
    graph.add_edge(2, 3)
    graph.add_edge(4, 6)

<<<<<<< HEAD
    '''
    Should print:
        {1: {2}, 2: {3, 4}, 3: {5}, 4: {6, 7}, 5: {3}, 6: {3}, 7: {1, 6}}
    '''
    print(graph.vertices)

    '''
=======
    """
    Should print:
        {1: {2}, 2: {3, 4}, 3: {5}, 4: {6, 7}, 5: {3}, 6: {3}, 7: {1, 6}}
    """
    print(graph.vertices)

    """
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    Valid DFT paths:
        1, 2, 3, 5, 4, 6, 7
        1, 2, 3, 5, 4, 7, 6
        1, 2, 4, 7, 6, 3, 5
        1, 2, 4, 6, 3, 5, 7
<<<<<<< HEAD
    '''
    graph.dft(1)

    '''
=======
    """
    graph.dft(1)

    """
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    Valid BFT paths:
        1, 2, 3, 4, 5, 6, 7
        1, 2, 3, 4, 5, 7, 6
        1, 2, 3, 4, 6, 7, 5
        1, 2, 3, 4, 6, 5, 7
        1, 2, 3, 4, 7, 6, 5
        1, 2, 3, 4, 7, 5, 6
        1, 2, 4, 3, 5, 6, 7
        1, 2, 4, 3, 5, 7, 6
        1, 2, 4, 3, 6, 7, 5
        1, 2, 4, 3, 6, 5, 7
        1, 2, 4, 3, 7, 6, 5
        1, 2, 4, 3, 7, 5, 6
<<<<<<< HEAD
    '''
    graph.bft(1)

    '''
=======
    """
    graph.bft(1)

    """
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    Valid DFT recursive paths:
        1, 2, 3, 5, 4, 6, 7
        1, 2, 3, 5, 4, 7, 6
        1, 2, 4, 7, 6, 3, 5
        1, 2, 4, 6, 3, 5, 7
<<<<<<< HEAD
    '''
    graph.dft_recursive(1)

    '''
    Valid BFS path:
        [1, 2, 4, 6]
    '''
    print(graph.bfs(1, 6))

    '''
    Valid DFS paths:
        [1, 2, 4, 6]
        [1, 2, 4, 7, 6]
    '''
    print(graph.dfs(1, 6))
=======
    """
    graph.dft_recursive(1)

    """
    Valid BFS path:
        [1, 2, 4, 6]
    """
    print(graph.bfs(1, 6))

    """
    Valid DFS paths:
        [1, 2, 4, 6]
        [1, 2, 4, 7, 6]
    """
    print(graph.dfs(1, 6))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
