"""
A queue is a data structure whose primary purpose is to store and
return elements in First In First Out order. 
1. Implement the Queue class using an array as the underlying storage structure.
   Make sure the Queue tests pass.
2. Re-implement the Queue class, this time using the linked list implementation
   as the underlying storage structure.
   Make sure the Queue tests pass.
3. What is the difference between using an array vs. a linked list when 
   implementing a Queue?
   
Stretch: What if you could only use instances of your Stack class to implement the Queue?
         What would that look like? How many Stacks would you need? Try it!
"""
# class Queue:
#     def __init__(self):
#         self.size = 0
#         self.storage = []
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#     def __len__(self):
#         return self.size
#         # other option return len(self.storage)

#     def enqueue(self, value):
#         self.storage.append(value)
#             self.size += 1


#     def dequeue(self):
#         if self.size == 0:
#             return None
#         self.size -= 1
#         return self.storage.pop(0)

from singly_linked_list import LinkedList

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Stack:
    def __init__(self):
        self.size = 0
        self.storage = LinkedList()
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def __len__(self):
        return self.size
        # other option return len(self.storage)

    def enqueue(self, value):
        self.storage.add_to_tail(value)
        self.size += 1

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def dequeue(self):
        if self.size == 0:
            return None
        self.size -= 1
<<<<<<< HEAD
        return self.storage.remove_tail()
=======
        return self.storage.remove_tail()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
