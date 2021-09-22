from day4 import Player, Room, Item

running = True

foyer = Room("Foyer", "It is a large foyer with exit to the south")
courtyard = Room("Courtyard", "The courtyard is broken but hs exit to the house north")


player = Player(foyer)

# REPL === Parser

while running:
    cmd = input(">>> ")
    # split the cmd in to commands
<<<<<<< HEAD
    commands = [1] # split the cmd up here?
=======
    commands = [1]  # split the cmd up here?
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # if commands length is 1
    if len(commands) == 1:
        if cmd in ["n", "s", "e", "w"]:
            player.move(cmd)
        elif cmd == "q":
            running = False
        else:
            print("i do not get it?!?!?!")
    # if commands length is 2
    elif len(commands) == 2:
        pass
        # get

<<<<<<< HEAD
        # drop
=======
        # drop
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
