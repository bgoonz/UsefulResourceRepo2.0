from doubly_linked_list import DoublyLinkedList

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Stack:
    def __init__(self):
        self.size = 0
        self.storage = DoublyLinkedList()

    def push(self, value):
        self.storage.add_to_head(value)

    def pop(self):
        if self.len() > 0:
            return self.storage.remove_from_head()
        else:
            return None

    def len(self):
        return len(self.storage)
