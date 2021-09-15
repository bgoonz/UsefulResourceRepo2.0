import time
from singly_linked_list import LinkedList

"""
Benchmark removing from the front of a list versus
removing from the front of a linked list
"""
<<<<<<< HEAD
if __name__ == '__main__':
  n = 100000

  l = [i for i in range(0, n)]
  ll = LinkedList()

  for i in range(0, n):
    ll.add_to_tail(i)
  
  start_time = time.time()
  for i in range(0, n):
    ll.remove_head()
  end_time = time.time()
  print(f'linked list remove from head runtime: {end_time - start_time} seconds')

  start_time = time.time()
  for i in range(0, n):
    l.pop(0)
  end_time = time.time()
  print(f'list pop from front runtime: {end_time - start_time} seconds') 
=======
if __name__ == "__main__":
    n = 100000

    l = [i for i in range(0, n)]
    ll = LinkedList()

    for i in range(0, n):
        ll.add_to_tail(i)

    start_time = time.time()
    for i in range(0, n):
        ll.remove_head()
    end_time = time.time()
    print(f"linked list remove from head runtime: {end_time - start_time} seconds")

    start_time = time.time()
    for i in range(0, n):
        l.pop(0)
    end_time = time.time()
    print(f"list pop from front runtime: {end_time - start_time} seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
