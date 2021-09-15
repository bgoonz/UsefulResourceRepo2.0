class Player:
    def __init__(self, starting_room):
        self.current_room = starting_room
<<<<<<< HEAD
    def travel(self, direction, show_rooms = False):
        next_room = self.current_room.get_room_in_direction(direction)
        if next_room is not None:
            self.current_room = next_room
            if (show_rooms):
=======

    def travel(self, direction, show_rooms=False):
        next_room = self.current_room.get_room_in_direction(direction)
        if next_room is not None:
            self.current_room = next_room
            if show_rooms:
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                next_room.print_room_description(self)
        else:
            print("You cannot move in that direction.")
