"""

Remember these steps to solve almost any graphs problem:
- Translate the problem into terminology you've learned this week
- Build your graph
- Traverse your graph

ISLANDS MATRIX CHALLENGE!
--------------------------

Write a function that takes a 2D binary array and returns the number of 1 islands. An island consists of 1s that are connected to the north, south, east or west. For example:

islands = [[0, 1, 0, 1, 0],
           [1, 1, 0, 1, 1],
           [0, 0, 1, 0, 0],
           [1, 0, 1, 0, 0],
           [1, 1, 0, 0, 0]]

island_counter(islands) # returns 4

remember to talk through a possible approach to the problem with your group

traversal (define a function) => dft(row, col, matrix, visited) => returns visited
get neighbors (define function) => get_nieghbors(col, row, matrix) => check north south east and west for connections / x, y / col / row

each island is a vertex
each connection of north, south, east or west (edge)


"""

<<<<<<< HEAD
class Stack():
    def __init__(self):
        self.stack = []
    def push(self, value):
        self.stack.append(value)
=======

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
    def size(self):
        return len(self.stack)

=======

    def size(self):
        return len(self.stack)


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def dft(row, col, matrix, visited):
    # make a stack
    s = Stack()
    # push starting vertex
    s.push((row, col))

    while s.size() > 0:
        # pop first vertex
        v = s.pop()
        row = v[0]
        col = v[1]
        # if not visited
        if not visited[row][col]:
            # mark it as visited
            visited[row][col] = True
            # push each (1) neighbor on to the top of the stack
            for neighbor in get_neighbors(row, col, matrix):
                s.push(neighbor)
    # return visited
    return visited

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def get_neighbors(col, row, graph_matrix):
    neighbors = []
    # check north
    if row > 0 and graph_matrix[row - 1][col] == 1:
        neighbors.append((row - 1, col))
    # check south
    if row < len(graph_matrix) - 1 and graph_matrix[row + 1][col] == 1:
        neighbors.append((row + 1, col))
    # check east
    if col < len(graph_matrix[0]) - 1 and graph_matrix[row][col + 1] == 1:
        neighbors.append((row, col + 1))
    # check west
    if col > 0 and graph_matrix[row][col - 1] == 1:
        neighbors.append((row, col - 1))
    # return neighbors
    return neighbors

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def island_counter(matrix):
    # create visited matrix of the same dimensions as the given matrix
    visited = []
    # creat a counter variable
    island_count = 0
    # fill out visited with False
    for _ in range(len(matrix)):
        visited.append([False] * len(matrix[0]))
    # walk through each cell in the matrix
    for col in range(len(matrix[0])):
        for row in range(len(matrix)):
            # if it has not been visited...
            if not visited[row][col]:
                # keep doing and when we reach a 1...
                if matrix[row][col] == 1:
                    # do a DFT and mark each as visited
                    visited = dft(row, col, matrix, visited)
                    # then increment counter by 1
                    island_count += 1
                else:
                    visited[row][col] = True
    return island_count

<<<<<<< HEAD
if __name__ == "__main__":
    islands = [[0, 1, 0, 1, 0],
           [1, 1, 0, 1, 1],
           [0, 0, 1, 0, 0],
           [1, 0, 1, 0, 0],
           [1, 1, 0, 0, 0]]

    print(island_counter(islands))  # 4

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

    print(island_counter(islands))  # 13
=======

if __name__ == "__main__":
    islands = [
        [0, 1, 0, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 1, 0, 0, 0],
    ]

    print(island_counter(islands))  # 4

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

    print(island_counter(islands))  # 13
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
