from day4 import Player, Room, Item

running = True
player = Player()

<<<<<<< HEAD
def move(player, direction):
    player.move(direction)

=======

def move(player, direction):
    player.move(direction)


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# REPL === Parser
while running:
    cmd = input(">>> ")
    # split the cmd in to commands

    # if commands length is 1
    if cmd in ["n", "s", "e", "w"]:
        move(player, cmd)

    # if commands length is 2
    # get, drop
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
