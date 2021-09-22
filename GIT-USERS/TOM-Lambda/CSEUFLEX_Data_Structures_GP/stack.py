"""
A stack is a data structure whose primary purpose is to store and
return elements in Last In First Out order. 
1. Implement the Stack class using an array as the underlying storage structure.
   Make sure the Stack tests pass.
2. Re-implement the Stack class, this time using the linked list implementation
   as the underlying storage structure.
   Make sure the Stack tests pass.
3. What is the difference between using an array vs. a linked list when 
   implementing a Stack?
"""

# class Stack:
#     def __init__(self):
#         self.size = 0
#         self.storage = []

#     def __len__(self):
#         return self.size

#     def push(self, value):
#         self.size += 1
#         self.storage.append(value)

#     def pop(self):
#         if self.size == 0:
#             return None
#         self.size -= 1
#         return self.storage.pop()

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

    def push(self, value):
        self.storage.add_to_tail(value)
        self.size += 1

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def pop(self):
        if self.size == 0:
            return None
        self.size -= 1
<<<<<<< HEAD
        return self.storage.remove_tail()
=======
        return self.storage.remove_tail()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
