class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

    def add(self, value):
        self.next = Node(value)

    def reverse(self):
        cur = self
        new = cur.next
<<<<<<< HEAD
        cur.next = None # new tail?
=======
        cur.next = None  # new tail?
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        while new is not None:
            prev = cur
            cur = new
            new = cur.next
            cur.next = prev
<<<<<<< HEAD
        
        return cur

=======

        return cur


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
root = Node(3)
cur = root
cur.add(4)
cur = cur.next
cur.add(5)
cur = cur.next
cur.add(6)
cur = cur.next

cur = root
while cur:
    print(cur.value)
    cur = cur.next
    print("-----")
cur = root.reverse()
while cur:
    print(cur.value)
<<<<<<< HEAD
    cur = cur.next
=======
    cur = cur.next
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
