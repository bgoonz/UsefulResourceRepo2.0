from doubly_linked_list import DoublyLinkedList

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Stack:
    def __init__(self):
        self.size = 0
        self.storage = DoublyLinkedList()

    # push
    def push(self, value):
        self.size += 1
        self.storage.add_to_head(value)

    # pop
    def pop(self):
        if self.size > 0:
            self.size -= 1
            return self.storage.remove_from_head()
        else:
            return None

    def len(self):
<<<<<<< HEAD
        return self.size
=======
        return self.size
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
