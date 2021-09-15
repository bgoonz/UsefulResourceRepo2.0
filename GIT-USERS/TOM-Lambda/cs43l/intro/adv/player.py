class Player:
    def __init__(self, name, starting_room):
        self.name = name
        self.current_room = starting_room

    def move(self, dir):
        # check if the player can move in the dir? <===
            # if they can. get the players current room <===
            # and set the players current room. to the current rooms dir_to