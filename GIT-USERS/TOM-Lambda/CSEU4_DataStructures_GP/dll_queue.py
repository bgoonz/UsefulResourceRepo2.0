from doubly_linked_list import DoublyLinkedList


class Queue:
    def __init__(self):
        # counter to keep track of the number of elements in our queue
        self.size = 0
        # we'll use our LinkedList implementation to build the queue
        self.storage = DoublyLinkedList()

    def enqueue(self, item):
        # add the item to the linked list
        self.storage.add_to_tail(item)
        # increment our size counter
        self.size += 1

    def dequeue(self):
        # decrement our size counter
        if self.size > 0:
            self.size -= 1
            # remove the head of the linked list and return it
            return self.storage.remove_from_head()
        else:
            return None

    def len(self):
<<<<<<< HEAD
        return self.size
=======
        return self.size
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
