<<<<<<< HEAD

"""Each ListNode holds a reference to its previous node
as well as its next node in the List."""
=======
"""Each ListNode holds a reference to its previous node
as well as its next node in the List."""


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class ListNode:
    def __init__(self, value, prev=None, next=None):
        self.value = value
        self.prev = prev
        self.next = next

    """Wrap the given value in a ListNode and insert it
    after this node. Note that this node could already
    have a next node it is point to."""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def insert_after(self, value):
        current_next = self.next
        self.next = ListNode(value, self, current_next)
        if current_next:
            current_next.prev = self.next

    """Wrap the given value in a ListNode and insert it
    before this node. Note that this node could already
    have a previous node it is point to."""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def insert_before(self, value):
        current_prev = self.prev
        self.prev = ListNode(value, current_prev, self)
        if current_prev:
            current_prev.next = self.prev

    """Rearranges this ListNode's previous and next pointers
    accordingly, effectively deleting this ListNode."""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def delete(self):
        if self.prev:
            self.prev.next = self.next
        if self.next:
            self.next.prev = self.prev


"""Our doubly-linked list class. It holds references to
the list's head and tail nodes."""
<<<<<<< HEAD
=======


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class DoublyLinkedList:
    def __init__(self, node=None):
        self.head = node
        self.tail = node
        self.length = 1 if node is not None else 0

    def __len__(self):
        return self.length
<<<<<<< HEAD
        
    """Wraps the given value in a ListNode and inserts it 
    as the new head of the list. Don't forget to handle 
    the old head node's previous pointer accordingly."""
=======

    """Wraps the given value in a ListNode and inserts it 
    as the new head of the list. Don't forget to handle 
    the old head node's previous pointer accordingly."""

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def add_to_head(self, value):
        new_node = ListNode(value, None, None)
        self.length += 1

        if not self.head and not self.tail:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node

    """Removes the List's current head node, making the
    current head's next node the new head of the List.
    Returns the value of the removed Node."""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def remove_from_head(self):
        value = self.head.value
        self.delete(self.head)
        return value

    """Wraps the given value in a ListNode and inserts it 
    as the new tail of the list. Don't forget to handle 
    the old tail node's next pointer accordingly."""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def add_to_tail(self, value):
        new_node = ListNode(value, None, None)
        self.length += 1

        if not self.tail and not self.head:
            self.tail = new_node
            self.head = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node

    """Removes the List's current tail node, making the 
    current tail's previous node the new tail of the List.
    Returns the value of the removed Node."""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def remove_from_tail(self):
        value = self.tail.value
        self.delete(self.tail)
        return value

    """Removes the input node from its current spot in the 
    List and inserts it as the new head node of the List."""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def move_to_front(self, node):
        if node is self.head:
            return

        value = node.value

        if node is self.tail:
            self.remove_from_tail()
        else:
            node.delete()
            self.length -= 1
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        self.add_to_head(value)

    """Removes the input node from its current spot in the 
    List and inserts it as the new tail node of the List."""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def move_to_end(self, node):
        if node is self.tail:
            return

        value = node.value

        if node is self.head:
            self.remove_from_head()
            self.add_to_tail(value)
        else:
            node.delete()
            self.length -= 1
            self.add_to_tail(value)

    """Removes a node from the list and handles cases where
    the node was the head or the tail"""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def delete(self, node):
        if not self.head and not self.tail:
            return

        self.length -= 1

        if self.head == self.tail:
            self.head = None
            self.tail = None
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        elif self.head == node:
            self.head = node.next
            node.delete()

        elif self.tail == node:
            self.tail = node.prev
            node.delete()
<<<<<<< HEAD
        
        else:
            node.delete()

        
    """Returns the highest value currently in the list"""
=======

        else:
            node.delete()

    """Returns the highest value currently in the list"""

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def get_max(self):
        if not self.head:
            return None
        max_val = self.head.value
        current_node = self.head
        while current_node:
            if current_node.value > max_val:
                max_val = current_node.value

            # increment
            current_node = current_node.next
<<<<<<< HEAD
        
        return max_val
=======

        return max_val
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
