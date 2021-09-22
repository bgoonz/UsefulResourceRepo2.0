"""
Write a function that takes a 2D binary array and returns the number of 1 islands. 
An island consists of 1s that are connected to the north, south, east or west. 
For example:

each 1 island == Node / Vertex
each direction of N, S, E, W == Edge / Connection
"""
<<<<<<< HEAD
islands = [[0, 1, 0, 1, 0],
           [1, 1, 0, 1, 1],
           [0, 0, 1, 0, 0],
           [1, 0, 1, 0, 0],
           [1, 1, 0, 0, 0]]


class Stack():
    def __init__(self):
        self.storage = []
    
    def push(self, value):
        self.storage.append(value)
    
=======
islands = [
    [0, 1, 0, 1, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
]


class Stack:
    def __init__(self):
        self.storage = []

    def push(self, value):
        self.storage.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def pop(self):
        return self.storage.pop()

    def size(self):
        return len(self.storage)

<<<<<<< HEAD
class Queue():
    def __init__(self):
        self.storage = []
    
    def enqueue(self, value):
        self.storage.append(value)
    
=======

class Queue:
    def __init__(self):
        self.storage = []

    def enqueue(self, value):
        self.storage.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def dequeue(self):
        return self.storage.pop(0)

    def size(self):
        return len(self.storage)


# helper functions

<<<<<<< HEAD
def  get_neighbors(row, col, islands):
=======

def get_neighbors(row, col, islands):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # create an empty neighbors list
    neighbors = []
    # check north.
    if row > 0 and islands[row - 1][col] == 1:
        neighbors.append((row - 1, col))
    # check south.
    if row < len(islands) - 1 and islands[row + 1][col] == 1:
        neighbors.append((row + 1, col))
    # check east.
    if col < len(islands[0]) - 1 and islands[row][col + 1] == 1:
        neighbors.append((row, col + 1))
    # check west.
    if col > 0 and islands[row][col - 1] == 1:
        neighbors.append((row, col - 1))

    # return the neighbors to the caller
    return neighbors

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def dft(row, col, islands, visited):
    # create a intermediate data structure
    s = Stack()

    # put the starting node on to our intermediate data structure.
<<<<<<< HEAD
    s.push( (row, col) )
=======
    s.push((row, col))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # while our intermediate data structure is not empty
    while s.size() > 0:
        # get the node from our intermediate data structure.
        v = s.pop()
        # extract the row and col from our node.
        row = v[0]
        col = v[1]

        # if our node is not in visited...
        if not visited[row][col]:
            # mark it as visited.
            visited[row][col] = True

            # add each of the nodes neighbors to our intermediate data structure
            for neighbor in get_neighbors(row, col, islands):
                s.push(neighbor)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # return visited to the caller
    return visited


def bft(row, col, islands, visited):
    # create a intermediate data structure
    q = Queue()

    # put the starting node on to our intermediate data structure.
<<<<<<< HEAD
    q.enqueue( (row, col) )
=======
    q.enqueue((row, col))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # while our intermediate data structure is not empty
    while q.size() > 0:
        # get the node from our intermediate data structure.
        v = q.dequeue()
        # extract the row and col from our node.
        row = v[0]
        col = v[1]

        # if our node is not in visited...
        if not visited[row][col]:
            # mark it as visited.
            visited[row][col] = True

            # add each of the nodes neighbors to our intermediate data structure
            for neighbor in get_neighbors(row, col, islands):
                q.enqueue(neighbor)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # return visited to the caller
    return visited


<<<<<<< HEAD


=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def island_counter(islands):
    # some visited list / dict / matrix.
    visited = []
    # create our visited graph.
    for i in range(len(islands)):
        visited.append([False] * len(islands[0]))

    # set a counter to zero
    counter = 0
    # traverse the islands
    for col in range(len(islands[0])):
        for row in range(len(islands)):
            # if we have not visited this island yet
            if not visited[row][col]:
                # if it is a 1 (when we hit an actual island)
                if islands[row][col] == 1:
                    # do a traversal and mark each of its neighbors as visited
                    # visited = dft(row, col, islands, visited)
                    visited = bft(row, col, islands, visited)
                    # increment a counter
                    counter += 1
                # otherwise just mark the element as visited
                else:
                    visited[row][col] = True
<<<<<<< HEAD
    
    # return the counter to the caller
    return counter

print(island_counter(islands)) # returns 4

islands = [[1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
           [0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
           [0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
           [0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
           [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
           [0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
           [0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
           [1, 0, 1, 1, 0, 0, 0, 1, 1, 0],
           [0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
           [0, 0, 1, 1, 0, 1, 0, 0, 1, 0]]

=======

    # return the counter to the caller
    return counter


print(island_counter(islands))  # returns 4

islands = [
    [1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
    [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0, 1, 0],
]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


print(island_counter(islands))  # 13
