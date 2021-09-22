from time import time
from singly_linked_list import LinkedList

n = 10000

l = [i for i in range(0, n)]
ll = LinkedList()

for i in range(0, n):
    ll.add_to_tail(i)


start = time()
for i in range(0, n):
    ll.remove_head()
end = time()

<<<<<<< HEAD
print(f'Linked List remove from head runtime: {end - start} seconds')
=======
print(f"Linked List remove from head runtime: {end - start} seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

start = time()
for i in range(0, n):
    l.pop(0)
end = time()

<<<<<<< HEAD
print(f'List pop from front runtime: {end - start} seconds')
=======
print(f"List pop from front runtime: {end - start} seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
