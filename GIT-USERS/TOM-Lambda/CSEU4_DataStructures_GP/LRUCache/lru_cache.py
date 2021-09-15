from doubly_linked_list import DoublyLinkedList
<<<<<<< HEAD
=======


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class LRUCache:
    """
    Our LRUCache class keeps track of the max number of nodes it
    can hold, the current number of nodes it is holding, a doubly-
    linked list that holds the key-value entries in the correct
    order, as well as a storage dict that provides fast access
    to every node stored in the cache.
    """
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def __init__(self, limit=10):
        self.limit = limit
        self.size = 0
        self.order = DoublyLinkedList()
        self.storage = dict()

    """
    Retrieves the value associated with the given key. Also
    needs to move the key-value pair to the end of the order
    such that the pair is considered most-recently used.
    Returns the value associated with the key or None if the
    key-value pair doesn't exist in the cache.
    """
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def get(self, key):
        # if the key exists in the storage
        if key in self.storage:
            # extrapolate the node from the storage at the key of key
<<<<<<< HEAD
            node = self.storage[key] # extrapolate the tuple / pair from the sturage
=======
            node = self.storage[key]  # extrapolate the tuple / pair from the sturage
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # move the node to the end of the order list
            self.order.move_to_end(node)
            # return the value from the node
            return node.value[1]
        # otherwise
        else:
            # return None
            return None

    """
    Adds the given key-value pair to the cache. The newly-
    added pair should be considered the most-recently used
    entry in the cache. If the cache is already at max capacity
    before this entry is added, then the oldest entry in the
    cache needs to be removed to make room. Additionally, in the
    case that the key already exists in the cache, we simply
    want to overwrite the old value associated with the key with
    the newly-specified value.
    """
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def set(self, key, value):
        # if the key exists in the storage
        # if the key exists in the storage
        if key in self.storage:
            # extrapolate the node from the storage at the index of key
            node = self.storage[key]
            # set the nodes value to the (key, value) pair
<<<<<<< HEAD
            node.value = (key, value) # node = ("bob", val) <= ("bob", 45)
=======
            node.value = (key, value)  # node = ("bob", val) <= ("bob", 45)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # move the node to the end of the order list
            self.order.move_to_end(node)
            # just return from the method
            return
        # if the size is equal to the limit
        if self.size == self.limit:
            # delete the storage entry at the key from the order lists head
            # head = self.order.head
            # val = head.value
            # k = val[0]
            del self.storage[self.order.head.value[0]]
            # remove the head of the order
            self.order.remove_from_head()
            # decrement the size
            self.size -= 1
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # add the (key, value) pair to the tail of the order
        self.order.add_to_tail((key, value))
        # set the storage at the key to the order tail
        self.storage[key] = self.order.tail
        # increment the size
<<<<<<< HEAD
        self.size += 1
=======
        self.size += 1
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
