from doubly_linked_list import DoublyLinkedList

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Queue:
    def __init__(self):
        self.size = 0
        self.storage = DoublyLinkedList()

    # enqueue
    def enqueue(self, value):
        self.size += 1
        self.storage.add_to_head(value)

    # dequeue
    def dequeue(self):
        if self.size > 0:
            self.size -= 1
            return self.storage.remove_from_tail()
        else:
            return None

    def len(self):
<<<<<<< HEAD
        return self.size
=======
        return self.size
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
