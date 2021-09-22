from room import Room
from player import Player


# Declare all the rooms

room = {
<<<<<<< HEAD
    'outside':  Room("Outside Cave Entrance",
                     "North of you, the cave mount beckons"),

    'foyer':    Room("Foyer", """Dim light filters in from the south. Dusty
passages run north and east."""),

    'overlook': Room("Grand Overlook", """A steep cliff appears before you, falling
into the darkness. Ahead to the north, a light flickers in
the distance, but there is no way across the chasm."""),

    'narrow':   Room("Narrow Passage", """The narrow passage bends here from west
to north. The smell of gold permeates the air."""),

    'treasure': Room("Treasure Chamber", """You've found the long-lost treasure
chamber! Sadly, it has already been completely emptied by
earlier adventurers. The only exit is to the south."""),
=======
    "outside": Room("Outside Cave Entrance", "North of you, the cave mount beckons"),
    "foyer": Room(
        "Foyer",
        """Dim light filters in from the south. Dusty
passages run north and east.""",
    ),
    "overlook": Room(
        "Grand Overlook",
        """A steep cliff appears before you, falling
into the darkness. Ahead to the north, a light flickers in
the distance, but there is no way across the chasm.""",
    ),
    "narrow": Room(
        "Narrow Passage",
        """The narrow passage bends here from west
to north. The smell of gold permeates the air.""",
    ),
    "treasure": Room(
        "Treasure Chamber",
        """You've found the long-lost treasure
chamber! Sadly, it has already been completely emptied by
earlier adventurers. The only exit is to the south.""",
    ),
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
}


# Link rooms together

<<<<<<< HEAD
room['outside'].n_to = room['foyer']
room['foyer'].s_to = room['outside']
room['foyer'].n_to = room['overlook']
room['foyer'].e_to = room['narrow']
room['overlook'].s_to = room['foyer']
room['narrow'].w_to = room['foyer']
room['narrow'].n_to = room['treasure']
room['treasure'].s_to = room['narrow']
=======
room["outside"].n_to = room["foyer"]
room["foyer"].s_to = room["outside"]
room["foyer"].n_to = room["overlook"]
room["foyer"].e_to = room["narrow"]
room["overlook"].s_to = room["foyer"]
room["narrow"].w_to = room["foyer"]
room["narrow"].n_to = room["treasure"]
room["treasure"].s_to = room["narrow"]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


# # helper functions
# def try_a_direction(player, dir):
#     attribute = dir + '_to'

#     if hasattr(player.current_room, attribute):
#         return getattr(player.current_room, attribute)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#     print("you may not go in that direction!\n")

#     return player.current_room


<<<<<<< HEAD

        



#
# Main
#
directions = ["n", 's', 'e', 'w']
# Make a new player object that is currently in the 'outside' room.
player = Player("Dave", room['outside'])
=======
#
# Main
#
directions = ["n", "s", "e", "w"]
# Make a new player object that is currently in the 'outside' room.
player = Player("Dave", room["outside"])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# Write a loop that:
#
# * Prints the current room name
# * Prints the current description (the textwrap module might be useful here).
# * Waits for user input and decides what to do.
#
# If the user enters a cardinal direction, attempt to move to the room there.
# Print an error message if the movement isn't allowed.
#
# If the user enters "q", quit the game.
playing = True
while playing:

    # print surroundings
    print(f"Location: {player.current_room.name}")
    print(f"{player.current_room.description}\n")

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # prompt for commands
    command = input("\nCommand>").strip().lower()

    # single verb commands
    if command in directions:
        # player.current_room = try_a_direction(player, command)
        player.move(command)
    elif command == "q":
        print("Thank you for playing my adventure!")
        playing = False
    else:
        print("Unknown Command!")
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
