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
=======
class Graph:
    """Represent a graph as a dictionary of vertices mapping labels to edges."""

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex_id):
        """
        Add a vertex to the graph.
        """
        self.vertices[vertex_id] = set()

    def add_edge(self, v1, v2):
        """
        Add a directed edge to the graph.
        """
        if v1 in self.vertices and v2 in self.vertices:
            self.vertices[v1].add(v2)
        else:
            raise IndexError("That vertex does not exist!")

    def get_neighbors(self, vertex_id):
        """
        Get all neighbors (edges) of a vertex.
        """
        return self.vertices[vertex_id]

    def bft(self, starting_vertex_id):
        """
        Print each vertex in breadth-first order
        beginning from starting_vertex.
        """
        q = Queue()
        q.enqueue(starting_vertex_id)
        visited = set()
        while q.size() > 0:
            v = q.dequeue()
            if v not in visited:
                print(v)
                visited.add(v)
                for next_vert in self.get_neighbors(v):
                    q.enqueue(next_vert)

    def dft(self, starting_vertex_id):
        """
        Print each vertex in depth-first order
        beginning from starting_vertex.
        """
        stack = Stack()
        stack.push(starting_vertex_id)
        visited = set()
        while stack.size() > 0:
            v = stack.pop()
            if v not in visited:
                print(v)
                visited.add(v)
                for next_vert in self.get_neighbors(v):
                    stack.push(next_vert)

    def dft_recursive(self, start_vert, visited=None):
        """
        Print each vertex in depth-first order
        beginning from starting_vertex.
        This should be done using recursion.
        """
        if visited is None:
            visited = set()
        visited.add(start_vert)
        print(start_vert)
        for child_vert in self.vertices[start_vert]:
            if child_vert not in visited:
                self.dft_recursive(child_vert, visited)

    def bfs(self, starting_vertex_id, target_value):
        """
        Return a list containing the shortest path from
        starting_vertex to destination_vertex in
        breath-first order.
        """
        q = Queue()
        q.enqueue([starting_vertex_id])
        visited = set()
        while q.size() > 0:
            path = q.dequeue()
            v = path[-1]
            if v not in visited:
                if v == target_value:
                    return path
                visited.add(v)
                for next_vert in self.get_neighbors(v):
                    new_path = list(path)
                    new_path.append(next_vert)
                    q.enqueue(new_path)
        return None

    def dfs(self, starting_vertex_id, target_value):
        """
        Return a list containing a path from
        starting_vertex to destination_vertex in
        depth-first order.
        """
        s = Stack()
        s.push([starting_vertex_id])
        visited = set()
        while s.size() > 0:
            path = s.pop()
            v = path[-1]
            if v not in visited:
                if v == target_value:
                    return path
                visited.add(v)
                for next_vert in self.get_neighbors(v):
                    new_path = list(path)
                    new_path.append(next_vert)
                    s.push(new_path)
        return None

    def dfs_recursive(self, start_vert, target_value, visited=None, path=None):
        """
        Return a list containing a path from
        starting_vertex to destination_vertex in
        depth-first order.
        This should be done using recursion.
        """
        if visited is None:
            visited = set()
        if path is None:
            path = []
        visited.add(start_vert)
        path = path + [start_vert]
        if start_vert == target_value:
            return path
        for child_vert in self.get_neighbors(start_vert):
            if child_vert not in visited:
                new_path = self.dfs_recursive(child_vert, target_value, visited, path)
                if new_path:
                    return new_path
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
    Valid DFT paths:
        1, 2, 3, 5, 4, 6, 7
        1, 2, 3, 5, 4, 7, 6
        1, 2, 4, 7, 6, 3, 5
        1, 2, 4, 6, 3, 5, 7
<<<<<<< HEAD
    '''
    graph.dft(1)
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
    print(graph.dfs_recursive(1, 6))
=======
    """
    graph.dft(1)
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
    print(graph.dfs_recursive(1, 6))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
