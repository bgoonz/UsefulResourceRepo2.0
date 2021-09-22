from player import Player
from room import Room
from world import World
from queue import Queue
from ast import literal_eval
import random

# map_file = "maps/test_line.txt"
# map_file = "maps/test_cross.txt"
# map_file = "maps/test_loop.txt"
# map_file = "maps/test_loop_fork.txt"
map_file = "maps/main_maze.txt"

# traversal with path
def backtrack_to_unexplored_room(player, moves_queue):
    # get back to the old room with unexplored exits
    # create a queue
    q = Queue()
    # create a visited set
    visited = set()
    # enqueue the current room path
    q.enqueue([player.current_room.id])
<<<<<<< HEAD
    #while the queue is not empty
=======
    # while the queue is not empty
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    while q.size() > 0:
        # dequeue the current path
        path = q.dequeue()
        # get the last room in the path
        last_room = path[-1]
<<<<<<< HEAD
        #if the last room has not been visited
=======
        # if the last room has not been visited
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        if last_room not in visited:
            # add the last room to visited set
            visited.add(last_room)
            # for each of the exits in the room
            for exit in graph[last_room]:
                # if the last room exit is a "?"
                if graph[last_room][exit] == "?":
                    # return the path
                    return path
                # otherwise
                else:
                    # duplicate the path
                    path_copy = list(path)
                    # append the last room exit to the duplicated path
                    path_copy.append(graph[last_room][exit])
                    # enqueue the duplicated path
                    q.enqueue(path_copy)
<<<<<<< HEAD
    
    # if nothing was in the path then return an empty list
    return []

=======

    # if nothing was in the path then return an empty list
    return []


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def enqueue_moves(player, moves_queue):
    # add all the moves to the moves queue
    # set up some current rooms exits
    current_room_exits = graph[player.current_room.id]
    # create a list of unexplored exits
    unexplored_exits = []

    # for each direction in the current rooms exits
    for direction in current_room_exits:
        # check if the data at the current rooms exit is a "?"
        if current_room_exits[direction] == "?":
            # if so append the direction to unexplored exits
            unexplored_exits.append(direction)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # if the unexplored exits are empty
    if len(unexplored_exits) == 0:
        # create a path to enexplored by backtracking
        path_to_unexplored_room = backtrack_to_unexplored_room(player, moves_queue)
        # room on path will be current room id
        room_on_path = player.current_room.id

        # for each next room in the path to the unexplored room
        for next_room in path_to_unexplored_room:
            # for each direction in the room on path (exits)
            for direction in graph[room_on_path]:
                # check if we have found a room to traverse (next room)
                if graph[room_on_path][direction] == next_room:
                    # if so enqueue the direction to the moves queue
                    moves_queue.enqueue(direction)

                    # increment the room on path to the next room
                    room_on_path = next_room
                    # and break out of the loop
                    break
    # otherwise
    else:
        # enqueue the unexplored exits with random sample to the moves queue to move in a random direction
<<<<<<< HEAD
        moves_queue.enqueue(unexplored_exits[random.randint(0, len(unexplored_exits) - 1)])  

world = World()
# Loads the map into a dictionary
room_graph=literal_eval(open(map_file, "r").read())
=======
        moves_queue.enqueue(
            unexplored_exits[random.randint(0, len(unexplored_exits) - 1)]
        )


world = World()
# Loads the map into a dictionary
room_graph = literal_eval(open(map_file, "r").read())
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
world.load_graph(room_graph)
player = Player(world.starting_room)
inverse_directions = {"n": "s", "s": "n", "e": "w", "w": "e"}

graph = {}

new_room = {}

for direction in player.current_room.get_exits():
    new_room[direction] = "?"
graph[world.starting_room.id] = new_room

moves_queue = Queue()

total_moves = []

# build the graph
enqueue_moves(player, moves_queue)

# traverse the graph
# while there are still moves on the queue
while moves_queue.size() > 0:
    # set a start room to the current room id of the player
    start_room = player.current_room.id

    # dequeue the next move from the moves queue
    next_move = moves_queue.dequeue()

    # move the player on the next move
    player.travel(next_move)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # add the next move to the total moves
    total_moves.append(next_move)

    # after the move set the end room to the players current room id
    end_room = player.current_room.id

    # update graph to hold the move data (this is an edge)
    graph[start_room][next_move] = end_room

    # check if the end room is in the graph
    if end_room not in graph:
        # add an empty dictionary to the graph at the end room
        graph[end_room] = {}
        # add "?" to the exits of the end room in the graph
        for exit in player.current_room.get_exits():
            graph[end_room][exit] = "?"
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # set up the inverse directions for the end room exits (this is an other edge)
    graph[end_room][inverse_directions[next_move]] = start_room

    # once we empty the moves_queue we can enqueue the moves again
    if moves_queue.size() == 0:
        enqueue_moves(player, moves_queue)

print(graph)
print(total_moves)
<<<<<<< HEAD
print(len(total_moves))
=======
print(len(total_moves))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
