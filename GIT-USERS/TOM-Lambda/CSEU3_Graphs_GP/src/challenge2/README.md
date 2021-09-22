# Island Counter (Connected Components)

Write a function that takes a 2D binary array and returns the number of 1 islands. An island consists of 1s that are connected to the north, south, east or west. For example:

islands = [[0, 1, 0, 1, 0],
           [1, 1, 0, 1, 1],
           [0, 0, 1, 0, 0],
           [1, 0, 1, 0, 0],
           [1, 1, 0, 0, 0]]

island_counter(islands) # returns 4

each (1 island component) == vertex
each island is a set of connected components
connections between components are the edges (north, south, east, west)

### Plan (pseudocode)
```python

class Stack():
    pass

def island_counter(matrix):
    # create a visited matrix
    # walk through each cell in the matrix
        # if it has not been visited...
            # when i reach a 1...
                # do a dft and mark each as visited
                # then increment a counter


def dft(row, col, matrix, visited):
    '''
    This will mark each connected component as visited
    Return visited matrix
    '''
    # Create an empty stack

    # push the starting vertex on to the stack eg (row, col)

    # while stack is not empty
        # pop the first vertex from the top of the stack

        # if it has not been visited
            # mark it as visited

            # then push each '1' neighbor on to the top of the stack
            # maybe break down or decompose in to a get neighbors function
    
    # return visited
    pass

# HINT to do a 2d list you can just write it like this books[row][col] col = east and west, row = north and south
def get_neighbors(row, col, graph_matrix):
    # create a neighbors list

    # check north

    # check south

    # check east

    # check west

    # return the neighbors


# tests

islands = [[0, 1, 0, 1, 0],
           [1, 1, 0, 1, 1],
           [0, 0, 1, 0, 0],
           [1, 0, 1, 0, 0],
           [1, 1, 0, 0, 0]]

island_counter(islands)  # 4

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

island_counter(islands)  # 13
```