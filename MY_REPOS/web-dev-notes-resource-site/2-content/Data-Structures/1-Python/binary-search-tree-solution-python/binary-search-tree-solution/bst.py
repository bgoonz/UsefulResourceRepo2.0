class BinarySearchTree:
    def __init__(self, value):
        self._root = None
        self._value = value
        self._left = None
        self._right = None

    def insert_value(self, value, current_node=False):
        if current_node is False:
            if self._root is None:
                self._root = BinarySearchTree(value)
                return self._root._value
            current_node = self._root

        if value < current_node._value:
            if current_node._left is None:
                current_node._left = BinarySearchTree(value)
            else:
                self.insert_value(value, current_node._left)
        else:
            if current_node._right is None:
                current_node._right = BinarySearchTree(value)
            else:
                self.insert_value(value, current_node._right)

    def search_iteratively(self, value):
        current_node = self._root
        while current_node is not None:
            if value < current_node._value:
                current_node = current_node._left
            elif value > current_node._value:
                current_node = current_node._right
            else:
                return True
        return False

    def search_recursively(self, value, current_node=False):
        if current_node is False:
            current_node = self._root

        if current_node is None:
            return False

        if value < current_node._value:
            return self.search_recursively(value, current_node._left)
        elif value > current_node._value:
            return self.search_recursively(value, current_node._right)
        else:
            return True


tree = BinarySearchTree(3)
print(tree._root)  # None

# 1. Test node value insertion
tree.insert_value(10)
tree.insert_value(5)
tree.insert_value(16)
tree.insert_value(1)
tree.insert_value(7)
tree.insert_value(16)
print(tree._root._value)  # 10
print(tree._root._left._value)  # 5
print(tree._root._right._value)  # 16
print(tree._root._left._left._value)  # 1
print(tree._root._left._right._value)  # 7
print(tree._root._right._right._value)  # 16

# 2. Test iterative search
empty_tree = BinarySearchTree(2)
print(empty_tree.search_iteratively(10))  # False
print(tree.search_iteratively(10))  # True
print(tree.search_iteratively(7))  # True
print(tree.search_iteratively(-1))  # False

# 3. Test recursive search
print(empty_tree.search_recursively(10))  # False
print(tree.search_recursively(10))  # True
print(tree.search_recursively(7))  # True
print(tree.search_recursively(-1))  # False
