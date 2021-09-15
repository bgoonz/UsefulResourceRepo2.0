<<<<<<< HEAD
# Write a function that takes a 2D binary array and returns the number of 1 islands. 
# An island consists of 1s that are connected to the north, south, east or west. 
# For example:

def get_neighbors(row, col, graph_matrix):
    neighbors = []
    # Check north
    if row > 0 and graph_matrix[row-1][col] == 1:
        neighbors.append((row-1, col))
    # Check south
    if row < len(graph_matrix) - 1 and graph_matrix[row+1][col] == 1:
        neighbors.append((row+1, col))
    # Check east
    if col < len(graph_matrix[0]) - 1 and graph_matrix[row][col+1] == 1:
        neighbors.append((row, col+1))
    # Check west
    if col > 0 and graph_matrix[row][col-1] == 1:
        neighbors.append((row, col-1))
    # Return all directions that contain a 1
    return neighbors

class Stack:
    def __init__(self):
        self.storage = []
    
    def push(self, value):
        self.storage.append(value)
    
=======
# Write a function that takes a 2D binary array and returns the number of 1 islands.
# An island consists of 1s that are connected to the north, south, east or west.
# For example:


def get_neighbors(row, col, graph_matrix):
    neighbors = []
    # Check north
    if row > 0 and graph_matrix[row - 1][col] == 1:
        neighbors.append((row - 1, col))
    # Check south
    if row < len(graph_matrix) - 1 and graph_matrix[row + 1][col] == 1:
        neighbors.append((row + 1, col))
    # Check east
    if col < len(graph_matrix[0]) - 1 and graph_matrix[row][col + 1] == 1:
        neighbors.append((row, col + 1))
    # Check west
    if col > 0 and graph_matrix[row][col - 1] == 1:
        neighbors.append((row, col - 1))
    # Return all directions that contain a 1
    return neighbors


class Stack:
    def __init__(self):
        self.storage = []

    def push(self, value):
        self.storage.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def pop(self):
        if self.size() > 0:
            return self.storage.pop()
        else:
            return None
<<<<<<< HEAD
    
    def size(self):
        return len(self.storage)
    
=======

    def size(self):
        return len(self.storage)


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def dft(row, col, islands, visited):
    s = Stack()

    s.push((row, col))

    while s.size() > 0:
        row, col = s.pop()
        # node = s.pop()
        # row = node[0]
        # col = node[1]
        if not visited[row][col]:
            visited[row][col] = True

            for neighbor in get_neighbors(row, col, islands):
                s.push(neighbor)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    return visited


def island_counter(islands):
    counter = 0
    visited = []
    for i in range(len(islands)):
        visited.append([False] * len(islands[0]))
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    for col in range(len(islands[0])):
        for row in range(len(islands)):
            if not visited[row][col]:
                if islands[row][col] == 1:
                    visited = dft(row, col, islands, visited)
                    counter += 1
                else:
                    visited[row][col] = True
<<<<<<< HEAD
    
    return counter



islands = [[0, 1, 0, 1, 0],
           [1, 1, 0, 1, 1],
           [0, 0, 1, 0, 0],
           [1, 0, 1, 0, 0],
           [1, 1, 0, 0, 0]]

print(island_counter(islands)) # returns 4
=======

    return counter


islands = [
    [0, 1, 0, 1, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
]

print(island_counter(islands))  # returns 4
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# islands = [[1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
#            [0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
#            [0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
#            [0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
#            [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
#            [0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
#            [0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
#            [1, 0, 1, 1, 0, 0, 0, 1, 1, 0],
#            [0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
#            [0, 0, 1, 1, 0, 1, 0, 0, 1, 0]]

# print(island_counter(islands))  # 13

# islands = [[1, 0, 0, 1, 1, 0, 1, 1, 0, 1]] # 4

# print(island_counter(islands))
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
