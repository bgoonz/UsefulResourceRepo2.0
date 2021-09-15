import textwrap
from room import Room
from player import Player
from items import Treasure, LightSource

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
chamber! The only exit is to the south."""),
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
chamber! The only exit is to the south.""",
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

room['outside'].is_light = True
room['foyer'].is_light = True
=======
room["outside"].n_to = room["foyer"]
room["foyer"].s_to = room["outside"]
room["foyer"].n_to = room["overlook"]
room["foyer"].e_to = room["narrow"]
room["overlook"].s_to = room["foyer"]
room["narrow"].w_to = room["foyer"]
room["narrow"].n_to = room["treasure"]
room["treasure"].s_to = room["narrow"]

room["outside"].is_light = True
room["foyer"].is_light = True
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# Add some items

t = Treasure("coins", "Shiny coins", 100)
<<<<<<< HEAD
room['overlook'].contents.append(t)

t = Treasure("silver", "Tarnished silver", 200)
room['treasure'].contents.append(t)

l = LightSource("lamp", "Brass lamp")
room['foyer'].contents.append(l)
=======
room["overlook"].contents.append(t)

t = Treasure("silver", "Tarnished silver", 200)
room["treasure"].contents.append(t)

l = LightSource("lamp", "Brass lamp")
room["foyer"].contents.append(l)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

def tryDirection(d, curRoom):
    """
    Try to move a direction, or print an error if the player can't go that way.
    Returns the room the player has moved to (or the same room if the player
    didn't move).
    """
<<<<<<< HEAD
    attrib = d + '_to'
=======
    attrib = d + "_to"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # See if the room has the destination attribute
    if hasattr(curRoom, attrib):
        # If so, return its value (the next room)
        return getattr(curRoom, attrib)

    # Otherwise print an error and stay in the same room
    print("You can't go that way")

    return curRoom

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def find_item(name, curRoom):
    """
    Search the current room to see if we can locate the treasure in question.
    """
    for i in curRoom.contents:
        if i.name == name:
            return i

    return None

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#
# Main
#

# Make a new player object that is currently in the 'outside' room.

<<<<<<< HEAD
player = Player(room['outside'])
=======
player = Player(room["outside"])
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

done = False

while not done:
    # Make a list of all the items the player has (or are in the room) that are
    # light sources:
<<<<<<< HEAD
    light_sources = [item for item in player.contents + player.curRoom.contents
                     if isinstance(item, LightSource) and item.lightsource]
=======
    light_sources = [
        item
        for item in player.contents + player.curRoom.contents
        if isinstance(item, LightSource) and item.lightsource
    ]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    is_light = player.curRoom.is_light or len(light_sources) > 0

    if is_light:
        # Print the room name
        print("\n{}\n".format(player.curRoom.name))

        # Print the room description
        for line in textwrap.wrap(player.curRoom.description):
            print(line)

        # Print any items found in the room
        if len(player.curRoom.contents) > 0:
            print("\nYou also see:\n")
            for i in player.curRoom.contents:
                print("     " + str(i))
    else:
        print("\nIt's pitch dark!\n")

    # User prompt
    s = input("\nCommand> ").strip().lower().split()

    if len(s) > 2 or len(s) < 1:
        print("I don't understand that.")
        continue

    # Intransitive verbs
    if len(s) == 1:
        if s[0] == "quit" or s[0] == "q":
            done = True
        elif s[0] == "inventory" or s[0] == "i":
            if len(player.contents) == 0:
                print("You're not carrying anything.")
            else:
                print("You are carrying:\n")
                for i in player.contents:
                    print(f"    {i}")

        elif s[0] == "score":
            print(f"Your score is currently {player.score}.")

        elif s[0] in ["n", "s", "w", "e"]:
            player.curRoom = tryDirection(s[0], player.curRoom)
        else:
<<<<<<< HEAD
            print("Unknown command {}".format(' '.join(s)))
    
    # Transitive verbs
    elif len(s) == 2:
        if s[0] == 'get' or s[0] == 'take':
=======
            print("Unknown command {}".format(" ".join(s)))

    # Transitive verbs
    elif len(s) == 2:
        if s[0] == "get" or s[0] == "take":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            if is_light:
                item = find_item(s[1], player.curRoom)
                if item == None:
                    print("I don't see that here.")
                else:
                    # Notify the item that it's about to be taken
                    item.on_take(player)

                    # Move from room to player
                    player.curRoom.contents.remove(item)
                    player.contents.append(item)
                    print(f"{item}: taken.")
            else:
                print("Good luck finding that in the dark.")

<<<<<<< HEAD
        elif s[0] == 'drop':
=======
        elif s[0] == "drop":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            item = find_item(s[1], player)
            if item == None:
                print("You're not carrying that.")
            else:
                # Move from player to room
                player.contents.remove(item)
                player.curRoom.contents.append(item)
                print(f"{item}: dropped.")
        else:
<<<<<<< HEAD
            print("Unknown command {}".format(' '.join(s)))
=======
            print("Unknown command {}".format(" ".join(s)))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
