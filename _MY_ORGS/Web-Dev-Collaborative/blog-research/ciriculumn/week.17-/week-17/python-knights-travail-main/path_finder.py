from tree import Node

finder = KnighPathFinder((0,0))

finder.find_path((2, 1))
finder.find_path((3, 3))

class KnighPathFinder:
    def __init__(self, start_position):
        self._root = Node(start_position)
        self._considered_positions = set(start_position)

    def get_valid_moves(self, pos):
        possible_moves_example = list(
            (1, 2),
            (2, 1),
            (-1, 2),
            (-2, 1),
            (2, -1),
            (-1, -2),
            (-2, -1),
            (1, -2)
        )



        moves = list ()
        current_x, current_y = pos
        for x_move, y_move in possible_moves:
            new_set_x, new_set_y = (current_x + x_move, current_y + y_move)
            if new_set_x in range(0, 9) and new_set_y in range(0,9):# keep from going off the board, cannot exceed 8 (everything will be b/w 0 & 8)
            new_pos = new_set_x, new_set_y
            moves.append(new_pos)
        return moves

    def new_move_positions(self, pos=(x, y))
