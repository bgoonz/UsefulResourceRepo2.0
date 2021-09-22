class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

    def add(self, value):
        self.next = Node(value)

    def find_middle(self):
        middle = self
        end = self

        while end != None:
            end = end.next
            if end:
                end = end.next
                middle = middle.next
<<<<<<< HEAD
        
        print(f"Middle Value: {middle.value}")

=======

        print(f"Middle Value: {middle.value}")


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
root = Node([1, 2, 4, 3, 23])
cur = root
cur.add({"name": "Tom"})
cur = cur.next
cur.add(9)
cur = cur.next
cur.add("bob")
cur = cur.next
cur.add(12)
cur = cur.next
cur.add("Bob")
cur = cur.next
cur.add(None)
cur = cur.next
cur.add(34)
cur = cur.next

root.find_middle()
<<<<<<< HEAD



=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
