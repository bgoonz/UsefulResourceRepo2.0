class LinkedListNode:
    def __init__(self, value):
        self.value = value
        self.next = None

    def add_node(self, value):
        # set current as a ref to self
        current = self
        # thile there is still more nodes
        while current.next is not None:
            # traverse to the next node
            current = current.next
        # create a new node and set the ref from current.next to the new node
        current.next = LinkedListNode(value)

    def insert_node(self, value, target):
        # create a new node with the value provided
        new_node = LinkedListNode(value)
        # set a ref to the current node
        current = self
        # while the current nodes value is not the target
        while current.value != target:
            # traverse to the next node
            current = current.next
        # set the new nodes next pointer to point toward the current nodes next pointer
        new_node.next = current.next
        # set the current nodes next to point to the new node
        current.next = new_node


def print_ll(linked_list_node):
    current = linked_list_node
    while current is not None:
        print(current.value)
        current = current.next


def add_to_ll_storage(linked_list_node):
    current = linked_list_node
    while current is not None:
        ll_storage.append(current)
        current = current.next


ll_storage = []
L1 = LinkedListNode(34)
L1.next = LinkedListNode(45)
L1.next.next = LinkedListNode(90)
L1.add_node(12)
print_ll(L1)
L1.add_node(24)
print("--------------------------------------------\n")
print_ll(L1)
print("--------------------------------------------\n")
L1.add_node(102)
print_ll(L1)
L1.insert_node(123, 90)
print("--------------------------------------------\n")
print_ll(L1)
L1.insert_node(678, 34)
print("--------------------------------------------\n")
print_ll(L1)
L1.insert_node(999, 102)
print("--------------------------------------------\n")
print_ll(L1)
