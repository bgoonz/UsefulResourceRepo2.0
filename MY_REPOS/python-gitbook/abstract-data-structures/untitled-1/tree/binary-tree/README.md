# Binary Tree

{% tabs %}
{% tab title="Basic B-Tree.py" %}
```python
from __future__ import annotations


class Node:
    """
    A Node has data variable and pointers to Nodes to its left and right.
    """

    def __init__(self, data: int) -> None:
        self.data = data
        self.left: Node | None = None
        self.right: Node | None = None


def display(tree: Node | None) -> None:  # In Order traversal of the tree
    """
    >>> root = Node(1)
    >>> root.left = Node(0)
    >>> root.right = Node(2)
    >>> display(root)
    0
    1
    2
    >>> display(root.right)
    2
    """
    if tree:
        display(tree.left)
        print(tree.data)
        display(tree.right)


def depth_of_tree(tree: Node | None) -> int:
    """
    Recursive function that returns the depth of a binary tree.
    >>> root = Node(0)
    >>> depth_of_tree(root)
    1
    >>> root.left = Node(0)
    >>> depth_of_tree(root)
    2
    >>> root.right = Node(0)
    >>> depth_of_tree(root)
    2
    >>> root.left.right = Node(0)
    >>> depth_of_tree(root)
    3
    >>> depth_of_tree(root.left)
    2
    """
    return 1 + max(depth_of_tree(tree.left), depth_of_tree(tree.right)) if tree else 0


def is_full_binary_tree(tree: Node) -> bool:
    """
    Returns True if this is a full binary tree
    >>> root = Node(0)
    >>> is_full_binary_tree(root)
    True
    >>> root.left = Node(0)
    >>> is_full_binary_tree(root)
    False
    >>> root.right = Node(0)
    >>> is_full_binary_tree(root)
    True
    >>> root.left.left = Node(0)
    >>> is_full_binary_tree(root)
    False
    >>> root.right.right = Node(0)
    >>> is_full_binary_tree(root)
    False
    """
    if not tree:
        return True
    if tree.left and tree.right:
        return is_full_binary_tree(tree.left) and is_full_binary_tree(tree.right)
    else:
        return not tree.left and not tree.right


def main() -> None:  # Main function for testing.
    tree = Node(1)
    tree.left = Node(2)
    tree.right = Node(3)
    tree.left.left = Node(4)
    tree.left.right = Node(5)
    tree.left.right.left = Node(6)
    tree.right.left = Node(7)
    tree.right.left.left = Node(8)
    tree.right.left.left.right = Node(9)

    print(is_full_binary_tree(tree))
    print(depth_of_tree(tree))
    print("Tree is: ")
    display(tree)


if __name__ == "__main__":
    main()
```
{% endtab %}

{% tab title="B-Tree-Traversal.py" %}
```python
# https://en.wikipedia.org/wiki/Tree_traversal
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class Node:
    data: int
    left: Node | None = None
    right: Node | None = None


def make_tree() -> Node:
    return Node(1, Node(2, Node(4), Node(5)), Node(3))


def preorder(root: Node):
    """
    Pre-order traversal visits root node, left subtree, right subtree.
    >>> preorder(make_tree())
    [1, 2, 4, 5, 3]
    """
    return [root.data] + preorder(root.left) + preorder(root.right) if root else []


def postorder(root: Node):
    """
    Post-order traversal visits left subtree, right subtree, root node.
    >>> postorder(make_tree())
    [4, 5, 2, 3, 1]
    """
    return postorder(root.left) + postorder(root.right) + [root.data] if root else []


def inorder(root: Node):
    """
    In-order traversal visits left subtree, root node, right subtree.
    >>> inorder(make_tree())
    [4, 2, 5, 1, 3]
    """
    return inorder(root.left) + [root.data] + inorder(root.right) if root else []


def height(root: Node):
    """
    Recursive function for calculating the height of the binary tree.
    >>> height(None)
    0
    >>> height(make_tree())
    3
    """
    return (max(height(root.left), height(root.right)) + 1) if root else 0


def level_order_1(root: Node):
    """
    Print whole binary tree in Level Order Traverse.
    Level Order traverse: Visit nodes of the tree level-by-level.
    """
    if not root:
        return
    temp = root
    que = [temp]
    while len(que) > 0:
        print(que[0].data, end=" ")
        temp = que.pop(0)
        if temp.left:
            que.append(temp.left)
        if temp.right:
            que.append(temp.right)
    return que


def level_order_2(root: Node, level: int):
    """
    Level-wise traversal: Print all nodes present at the given level of the binary tree
    """
    if not root:
        return root
    if level == 1:
        print(root.data, end=" ")
    elif level > 1:
        level_order_2(root.left, level - 1)
        level_order_2(root.right, level - 1)


def print_left_to_right(root: Node, level: int):
    """
    Print elements on particular level from left to right direction of the binary tree.
    """
    if not root:
        return
    if level == 1:
        print(root.data, end=" ")
    elif level > 1:
        print_left_to_right(root.left, level - 1)
        print_left_to_right(root.right, level - 1)


def print_right_to_left(root: Node, level: int):
    """
    Print elements on particular level from right to left direction of the binary tree.
    """
    if not root:
        return
    if level == 1:
        print(root.data, end=" ")
    elif level > 1:
        print_right_to_left(root.right, level - 1)
        print_right_to_left(root.left, level - 1)


def zigzag(root: Node):
    """
    ZigZag traverse: Print node left to right and right to left, alternatively.
    """
    flag = 0
    height_tree = height(root)
    for h in range(1, height_tree + 1):
        if flag == 0:
            print_left_to_right(root, h)
            flag = 1
        else:
            print_right_to_left(root, h)
            flag = 0


def main():  # Main function for testing.
    """
    Create binary tree.
    """
    root = make_tree()
    """
    All Traversals of the binary are as follows:
    """
    print(f"  In-order Traversal is {inorder(root)}")
    print(f" Pre-order Traversal is {preorder(root)}")
    print(f"Post-order Traversal is {postorder(root)}")
    print(f"Height of Tree is {height(root)}")
    print("Complete Level Order Traversal is : ")
    level_order_1(root)
    print("\nLevel-wise order Traversal is : ")
    for h in range(1, height(root) + 1):
        level_order_2(root, h)
    print("\nZigZag order Traversal is : ")
    zigzag(root)
    print()


if __name__ == "__main__":
    import doctest

    doctest.testmod()
    main()
```
{% endtab %}

{% tab title="BST.py" %}
```python
"""
A binary search Tree
"""


class Node:
    def __init__(self, value, parent):
        self.value = value
        self.parent = parent  # Added in order to delete a node easier
        self.left = None
        self.right = None

    def __repr__(self):
        from pprint import pformat

        if self.left is None and self.right is None:
            return str(self.value)
        return pformat({"%s" % (self.value): (self.left, self.right)}, indent=1)


class BinarySearchTree:
    def __init__(self, root=None):
        self.root = root

    def __str__(self):
        """
        Return a string of all the Nodes using in order traversal
        """
        return str(self.root)

    def __reassign_nodes(self, node, new_children):
        if new_children is not None:  # reset its kids
            new_children.parent = node.parent
        if node.parent is not None:  # reset its parent
            if self.is_right(node):  # If it is the right children
                node.parent.right = new_children
            else:
                node.parent.left = new_children
        else:
            self.root = new_children

    def is_right(self, node):
        return node == node.parent.right

    def empty(self):
        return self.root is None

    def __insert(self, value):
        """
        Insert a new node in Binary Search Tree with value label
        """
        new_node = Node(value, None)  # create a new Node
        if self.empty():  # if Tree is empty
            self.root = new_node  # set its root
        else:  # Tree is not empty
            parent_node = self.root  # from root
            while True:  # While we don't get to a leaf
                if value < parent_node.value:  # We go left
                    if parent_node.left is None:
                        parent_node.left = new_node  # We insert the new node in a leaf
                        break
                    else:
                        parent_node = parent_node.left
                else:
                    if parent_node.right is None:
                        parent_node.right = new_node
                        break
                    else:
                        parent_node = parent_node.right
            new_node.parent = parent_node

    def insert(self, *values):
        for value in values:
            self.__insert(value)
        return self

    def search(self, value):
        if self.empty():
            raise IndexError("Warning: Tree is empty! please use another.")
        else:
            node = self.root
            # use lazy evaluation here to avoid NoneType Attribute error
            while node is not None and node.value is not value:
                node = node.left if value < node.value else node.right
            return node

    def get_max(self, node=None):
        """
        We go deep on the right branch
        """
        if node is None:
            node = self.root
        if not self.empty():
            while node.right is not None:
                node = node.right
        return node

    def get_min(self, node=None):
        """
        We go deep on the left branch
        """
        if node is None:
            node = self.root
        if not self.empty():
            node = self.root
            while node.left is not None:
                node = node.left
        return node

    def remove(self, value):
        node = self.search(value)  # Look for the node with that label
        if node is not None:
            if node.left is None and node.right is None:  # If it has no children
                self.__reassign_nodes(node, None)
            elif node.left is None:  # Has only right children
                self.__reassign_nodes(node, node.right)
            elif node.right is None:  # Has only left children
                self.__reassign_nodes(node, node.left)
            else:
                tmp_node = self.get_max(
                    node.left
                )  # Gets the max value of the left branch
                self.remove(tmp_node.value)
                node.value = (
                    tmp_node.value
                )  # Assigns the value to the node to delete and keep tree structure

    def preorder_traverse(self, node):
        if node is not None:
            yield node  # Preorder Traversal
            yield from self.preorder_traverse(node.left)
            yield from self.preorder_traverse(node.right)

    def traversal_tree(self, traversal_function=None):
        """
        This function traversal the tree.
        You can pass a function to traversal the tree as needed by client code
        """
        if traversal_function is None:
            return self.preorder_traverse(self.root)
        else:
            return traversal_function(self.root)

    def inorder(self, arr: list, node: Node):
        """Perform an inorder traversal and append values of the nodes to
        a list named arr"""
        if node:
            self.inorder(arr, node.left)
            arr.append(node.value)
            self.inorder(arr, node.right)

    def find_kth_smallest(self, k: int, node: Node) -> int:
        """Return the kth smallest element in a binary search tree"""
        arr = []
        self.inorder(arr, node)  # append all values to list using inorder traversal
        return arr[k - 1]


def postorder(curr_node):
    """
    postOrder (left, right, self)
    """
    node_list = list()
    if curr_node is not None:
        node_list = postorder(curr_node.left) + postorder(curr_node.right) + [curr_node]
    return node_list


def binary_search_tree():
    r"""
    Example
                  8
                 / \
                3   10
               / \    \
              1   6    14
                 / \   /
                4   7 13
    >>> t = BinarySearchTree().insert(8, 3, 6, 1, 10, 14, 13, 4, 7)
    >>> print(" ".join(repr(i.value) for i in t.traversal_tree()))
    8 3 1 6 4 7 10 14 13
    >>> print(" ".join(repr(i.value) for i in t.traversal_tree(postorder)))
    1 4 7 6 3 13 14 10 8
    >>> BinarySearchTree().search(6)
    Traceback (most recent call last):
    ...
    IndexError: Warning: Tree is empty! please use another.
    """
    testlist = (8, 3, 6, 1, 10, 14, 13, 4, 7)
    t = BinarySearchTree()
    for i in testlist:
        t.insert(i)

    # Prints all the elements of the list in order traversal
    print(t)

    if t.search(6) is not None:
        print("The value 6 exists")
    else:
        print("The value 6 doesn't exist")

    if t.search(-1) is not None:
        print("The value -1 exists")
    else:
        print("The value -1 doesn't exist")

    if not t.empty():
        print("Max Value: ", t.get_max().value)
        print("Min Value: ", t.get_min().value)

    for i in testlist:
        t.remove(i)
        print(t)


if __name__ == "__main__":
    import doctest

    doctest.testmod()
    # binary_search_tree()
```
{% endtab %}

{% tab title="BST-recursive.py" %}
```python
"""
This is a python3 implementation of binary search tree using recursion
To run tests:
python -m unittest binary_search_tree_recursive.py
To run an example:
python binary_search_tree_recursive.py
"""
from __future__ import annotations

import unittest
from typing import Iterator


class Node:
    def __init__(self, label: int, parent: Node | None) -> None:
        self.label = label
        self.parent = parent
        self.left: Node | None = None
        self.right: Node | None = None


class BinarySearchTree:
    def __init__(self) -> None:
        self.root: Node | None = None

    def empty(self) -> None:
        """
        Empties the tree
        >>> t = BinarySearchTree()
        >>> assert t.root is None
        >>> t.put(8)
        >>> assert t.root is not None
        """
        self.root = None

    def is_empty(self) -> bool:
        """
        Checks if the tree is empty
        >>> t = BinarySearchTree()
        >>> t.is_empty()
        True
        >>> t.put(8)
        >>> t.is_empty()
        False
        """
        return self.root is None

    def put(self, label: int) -> None:
        """
        Put a new node in the tree
        >>> t = BinarySearchTree()
        >>> t.put(8)
        >>> assert t.root.parent is None
        >>> assert t.root.label == 8
        >>> t.put(10)
        >>> assert t.root.right.parent == t.root
        >>> assert t.root.right.label == 10
        >>> t.put(3)
        >>> assert t.root.left.parent == t.root
        >>> assert t.root.left.label == 3
        """
        self.root = self._put(self.root, label)

    def _put(self, node: Node | None, label: int, parent: Node | None = None) -> Node:
        if node is None:
            node = Node(label, parent)
        else:
            if label < node.label:
                node.left = self._put(node.left, label, node)
            elif label > node.label:
                node.right = self._put(node.right, label, node)
            else:
                raise Exception(f"Node with label {label} already exists")

        return node

    def search(self, label: int) -> Node:
        """
        Searches a node in the tree
        >>> t = BinarySearchTree()
        >>> t.put(8)
        >>> t.put(10)
        >>> node = t.search(8)
        >>> assert node.label == 8
        >>> node = t.search(3)
        Traceback (most recent call last):
            ...
        Exception: Node with label 3 does not exist
        """
        return self._search(self.root, label)

    def _search(self, node: Node | None, label: int) -> Node:
        if node is None:
            raise Exception(f"Node with label {label} does not exist")
        else:
            if label < node.label:
                node = self._search(node.left, label)
            elif label > node.label:
                node = self._search(node.right, label)

        return node

    def remove(self, label: int) -> None:
        """
        Removes a node in the tree
        >>> t = BinarySearchTree()
        >>> t.put(8)
        >>> t.put(10)
        >>> t.remove(8)
        >>> assert t.root.label == 10
        >>> t.remove(3)
        Traceback (most recent call last):
            ...
        Exception: Node with label 3 does not exist
        """
        node = self.search(label)
        if node.right and node.left:
            lowest_node = self._get_lowest_node(node.right)
            lowest_node.left = node.left
            lowest_node.right = node.right
            node.left.parent = lowest_node
            if node.right:
                node.right.parent = lowest_node
            self._reassign_nodes(node, lowest_node)
        elif not node.right and node.left:
            self._reassign_nodes(node, node.left)
        elif node.right and not node.left:
            self._reassign_nodes(node, node.right)
        else:
            self._reassign_nodes(node, None)

    def _reassign_nodes(self, node: Node, new_children: Node | None) -> None:
        if new_children:
            new_children.parent = node.parent

        if node.parent:
            if node.parent.right == node:
                node.parent.right = new_children
            else:
                node.parent.left = new_children
        else:
            self.root = new_children

    def _get_lowest_node(self, node: Node) -> Node:
        if node.left:
            lowest_node = self._get_lowest_node(node.left)
        else:
            lowest_node = node
            self._reassign_nodes(node, node.right)

        return lowest_node

    def exists(self, label: int) -> bool:
        """
        Checks if a node exists in the tree
        >>> t = BinarySearchTree()
        >>> t.put(8)
        >>> t.put(10)
        >>> t.exists(8)
        True
        >>> t.exists(3)
        False
        """
        try:
            self.search(label)
            return True
        except Exception:
            return False

    def get_max_label(self) -> int:
        """
        Gets the max label inserted in the tree
        >>> t = BinarySearchTree()
        >>> t.get_max_label()
        Traceback (most recent call last):
            ...
        Exception: Binary search tree is empty
        >>> t.put(8)
        >>> t.put(10)
        >>> t.get_max_label()
        10
        """
        if self.root is None:
            raise Exception("Binary search tree is empty")

        node = self.root
        while node.right is not None:
            node = node.right

        return node.label

    def get_min_label(self) -> int:
        """
        Gets the min label inserted in the tree
        >>> t = BinarySearchTree()
        >>> t.get_min_label()
        Traceback (most recent call last):
            ...
        Exception: Binary search tree is empty
        >>> t.put(8)
        >>> t.put(10)
        >>> t.get_min_label()
        8
        """
        if self.root is None:
            raise Exception("Binary search tree is empty")

        node = self.root
        while node.left is not None:
            node = node.left

        return node.label

    def inorder_traversal(self) -> Iterator[Node]:
        """
        Return the inorder traversal of the tree
        >>> t = BinarySearchTree()
        >>> [i.label for i in t.inorder_traversal()]
        []
        >>> t.put(8)
        >>> t.put(10)
        >>> t.put(9)
        >>> [i.label for i in t.inorder_traversal()]
        [8, 9, 10]
        """
        return self._inorder_traversal(self.root)

    def _inorder_traversal(self, node: Node | None) -> Iterator[Node]:
        if node is not None:
            yield from self._inorder_traversal(node.left)
            yield node
            yield from self._inorder_traversal(node.right)

    def preorder_traversal(self) -> Iterator[Node]:
        """
        Return the preorder traversal of the tree
        >>> t = BinarySearchTree()
        >>> [i.label for i in t.preorder_traversal()]
        []
        >>> t.put(8)
        >>> t.put(10)
        >>> t.put(9)
        >>> [i.label for i in t.preorder_traversal()]
        [8, 10, 9]
        """
        return self._preorder_traversal(self.root)

    def _preorder_traversal(self, node: Node | None) -> Iterator[Node]:
        if node is not None:
            yield node
            yield from self._preorder_traversal(node.left)
            yield from self._preorder_traversal(node.right)


class BinarySearchTreeTest(unittest.TestCase):
    @staticmethod
    def _get_binary_search_tree() -> BinarySearchTree:
        r"""
              8
             / \
            3   10
           / \    \
          1   6    14
             / \   /
            4   7 13
             \
              5
        """
        t = BinarySearchTree()
        t.put(8)
        t.put(3)
        t.put(6)
        t.put(1)
        t.put(10)
        t.put(14)
        t.put(13)
        t.put(4)
        t.put(7)
        t.put(5)

        return t

    def test_put(self) -> None:
        t = BinarySearchTree()
        assert t.is_empty()

        t.put(8)
        r"""
              8
        """
        assert t.root is not None
        assert t.root.parent is None
        assert t.root.label == 8

        t.put(10)
        r"""
              8
               \
                10
        """
        assert t.root.right is not None
        assert t.root.right.parent == t.root
        assert t.root.right.label == 10

        t.put(3)
        r"""
              8
             / \
            3   10
        """
        assert t.root.left is not None
        assert t.root.left.parent == t.root
        assert t.root.left.label == 3

        t.put(6)
        r"""
              8
             / \
            3   10
             \
              6
        """
        assert t.root.left.right is not None
        assert t.root.left.right.parent == t.root.left
        assert t.root.left.right.label == 6

        t.put(1)
        r"""
              8
             / \
            3   10
           / \
          1   6
        """
        assert t.root.left.left is not None
        assert t.root.left.left.parent == t.root.left
        assert t.root.left.left.label == 1

        with self.assertRaises(Exception):
            t.put(1)

    def test_search(self) -> None:
        t = self._get_binary_search_tree()

        node = t.search(6)
        assert node.label == 6

        node = t.search(13)
        assert node.label == 13

        with self.assertRaises(Exception):
            t.search(2)

    def test_remove(self) -> None:
        t = self._get_binary_search_tree()

        t.remove(13)
        r"""
              8
             / \
            3   10
           / \    \
          1   6    14
             / \
            4   7
             \
              5
        """
        assert t.root is not None
        assert t.root.right is not None
        assert t.root.right.right is not None
        assert t.root.right.right.right is None
        assert t.root.right.right.left is None

        t.remove(7)
        r"""
              8
             / \
            3   10
           / \    \
          1   6    14
             /
            4
             \
              5
        """
        assert t.root.left is not None
        assert t.root.left.right is not None
        assert t.root.left.right.left is not None
        assert t.root.left.right.right is None
        assert t.root.left.right.left.label == 4

        t.remove(6)
        r"""
              8
             / \
            3   10
           / \    \
          1   4    14
               \
                5
        """
        assert t.root.left.left is not None
        assert t.root.left.right.right is not None
        assert t.root.left.left.label == 1
        assert t.root.left.right.label == 4
        assert t.root.left.right.right.label == 5
        assert t.root.left.right.left is None
        assert t.root.left.left.parent == t.root.left
        assert t.root.left.right.parent == t.root.left

        t.remove(3)
        r"""
              8
             / \
            4   10
           / \    \
          1   5    14
        """
        assert t.root is not None
        assert t.root.left.label == 4
        assert t.root.left.right.label == 5
        assert t.root.left.left.label == 1
        assert t.root.left.parent == t.root
        assert t.root.left.left.parent == t.root.left
        assert t.root.left.right.parent == t.root.left

        t.remove(4)
        r"""
              8
             / \
            5   10
           /      \
          1        14
        """
        assert t.root.left is not None
        assert t.root.left.left is not None
        assert t.root.left.label == 5
        assert t.root.left.right is None
        assert t.root.left.left.label == 1
        assert t.root.left.parent == t.root
        assert t.root.left.left.parent == t.root.left

    def test_remove_2(self) -> None:
        t = self._get_binary_search_tree()

        t.remove(3)
        r"""
              8
             / \
            4   10
           / \    \
          1   6    14
             / \   /
            5   7 13
        """
        assert t.root is not None
        assert t.root.left is not None
        assert t.root.left.left is not None
        assert t.root.left.right is not None
        assert t.root.left.right.left is not None
        assert t.root.left.right.right is not None
        assert t.root.left.label == 4
        assert t.root.left.right.label == 6
        assert t.root.left.left.label == 1
        assert t.root.left.right.right.label == 7
        assert t.root.left.right.left.label == 5
        assert t.root.left.parent == t.root
        assert t.root.left.right.parent == t.root.left
        assert t.root.left.left.parent == t.root.left
        assert t.root.left.right.left.parent == t.root.left.right

    def test_empty(self) -> None:
        t = self._get_binary_search_tree()
        t.empty()
        assert t.root is None

    def test_is_empty(self) -> None:
        t = self._get_binary_search_tree()
        assert not t.is_empty()

        t.empty()
        assert t.is_empty()

    def test_exists(self) -> None:
        t = self._get_binary_search_tree()

        assert t.exists(6)
        assert not t.exists(-1)

    def test_get_max_label(self) -> None:
        t = self._get_binary_search_tree()

        assert t.get_max_label() == 14

        t.empty()
        with self.assertRaises(Exception):
            t.get_max_label()

    def test_get_min_label(self) -> None:
        t = self._get_binary_search_tree()

        assert t.get_min_label() == 1

        t.empty()
        with self.assertRaises(Exception):
            t.get_min_label()

    def test_inorder_traversal(self) -> None:
        t = self._get_binary_search_tree()

        inorder_traversal_nodes = [i.label for i in t.inorder_traversal()]
        assert inorder_traversal_nodes == [1, 3, 4, 5, 6, 7, 8, 10, 13, 14]

    def test_preorder_traversal(self) -> None:
        t = self._get_binary_search_tree()

        preorder_traversal_nodes = [i.label for i in t.preorder_traversal()]
        assert preorder_traversal_nodes == [8, 3, 1, 6, 4, 5, 7, 10, 14, 13]


def binary_search_tree_example() -> None:
    r"""
    Example
                  8
                 / \
                3   10
               / \    \
              1   6    14
                 / \   /
                4   7 13
                \
                5
    Example After Deletion
                  4
                 / \
                1   7
                     \
                      5
    """

    t = BinarySearchTree()
    t.put(8)
    t.put(3)
    t.put(6)
    t.put(1)
    t.put(10)
    t.put(14)
    t.put(13)
    t.put(4)
    t.put(7)
    t.put(5)

    print(
        """
            8
           / \\
          3   10
         / \\    \\
        1   6    14
           / \\   /
          4   7 13
           \\
            5
        """
    )

    print("Label 6 exists:", t.exists(6))
    print("Label 13 exists:", t.exists(13))
    print("Label -1 exists:", t.exists(-1))
    print("Label 12 exists:", t.exists(12))

    # Prints all the elements of the list in inorder traversal
    inorder_traversal_nodes = [i.label for i in t.inorder_traversal()]
    print("Inorder traversal:", inorder_traversal_nodes)

    # Prints all the elements of the list in preorder traversal
    preorder_traversal_nodes = [i.label for i in t.preorder_traversal()]
    print("Preorder traversal:", preorder_traversal_nodes)

    print("Max. label:", t.get_max_label())
    print("Min. label:", t.get_min_label())

    # Delete elements
    print("\nDeleting elements 13, 10, 8, 3, 6, 14")
    print(
        """
          4
         / \\
        1   7
             \\
              5
        """
    )
    t.remove(13)
    t.remove(10)
    t.remove(8)
    t.remove(3)
    t.remove(6)
    t.remove(14)

    # Prints all the elements of the list in inorder traversal after delete
    inorder_traversal_nodes = [i.label for i in t.inorder_traversal()]
    print("Inorder traversal after delete:", inorder_traversal_nodes)

    # Prints all the elements of the list in preorder traversal after delete
    preorder_traversal_nodes = [i.label for i in t.preorder_traversal()]
    print("Preorder traversal after delete:", preorder_traversal_nodes)

    print("Max. label:", t.get_max_label())
    print("Min. label:", t.get_min_label())


if __name__ == "__main__":
    binary_search_tree_example()
```
{% endtab %}
{% endtabs %}

### Binary Trees

1. Explain and implement a Binary Tree.

* A tree is a collection of nodes and edges between them.
* It cannot have any cycles, which are edges that form a loop between nodes.
* We also only consider rooted trees in computer science, which is a tree that has one root node that is able to access all other nodes.
* For a tree to be a binary tree, each node can have a maximum of two children.
* It's important to be able to identify and explain tree terminology as well. If given a tree, be able to point out each component.

  * root: The single node of a tree that can access every other node through edges.
  * parent node: A node that is connected to lower nodes in the tree. If a tree only has one node, it is not a parent node because there are no children.
  * child node: A node that is connected to a higher node in the tree. Every node except for the root is a child node of some parent.
  * sibling nodes: Nodes that have the same parent.
  * leaf node: A node that has no children \(at the ends of the branches of the tree\)
  * internal node: A non-leaf node \(aka a parent\)
  * path: A series of nodes that can be traveled through edges.
  * subtree: A smaller portion of the original tree. Any node that is not the root node is itself the root of a subtree.
  * Know the basics of each term
    * A non-empty tree has to have a root.
    * A tree doesn't have any parent nodes if there are no children.
    * What's the min/max number of parent and leaf nodes for a tree with 5 nodes?
      * Two extreme implementations: [![min-max-nodes-ll.png](https://github.com/bgoonz/DS-AND-ALGO-Notes-P2/raw/master/notes/D1/lo-s/W08D1and2/min-max-nodes-ll.png)](https://github.com/bgoonz/DS-AND-ALGO-Notes-P2/blob/master/notes/D1/lo-s/W08D1and2/min-max-nodes-ll.png)
      * Implementing in a chain results in max number of parents and min number of leaves: 4 parents, 1 leaf [![min-max-nodes-balanced.png](https://github.com/bgoonz/DS-AND-ALGO-Notes-P2/raw/master/notes/D1/lo-s/W08D1and2/min-max-nodes-balanced.png)](https://github.com/bgoonz/DS-AND-ALGO-Notes-P2/blob/master/notes/D1/lo-s/W08D1and2/min-max-nodes-balanced.png)
      * Implementing as a balanced tree results in min number of parents and max number of leaves: 2 parents, 3 leaves
  * All that we need in order to implement a binary tree is a TreeNode class that can store a value and references to a left and right child. We can create a tree by assigning the left and right properties to point to other TreeNode instances:



```python
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
```

1. Identify the three types of tree traversals: pre-order, in-order, and post-order.

* Pre-order: Values are accessed as soon as the node is reached.
* In-order: Values are accessed after we have fully explored the left but before we explore the right branch.
* Post-order: Values are accessed after all of our children have been accessed.
* \*Breadth First: The previous three are types of Depth First Traversals. Breadth first accesses values of nodes by level, left to right, top to bottom.
* Given a tree, be able to determine the order of each traversal type: [![Number tree](https://github.com/bgoonz/DS-AND-ALGO-Notes-P2/raw/master/notes/D1/lo-s/W08D1and2/number-tree.png)](https://github.com/bgoonz/DS-AND-ALGO-Notes-P2/blob/master/notes/D1/lo-s/W08D1and2/number-tree.png)
  * Breadth First: 20, 9, 24, 7, 11, 23, 27, 3, 10, 17, 36, 30
  * Pre-order: 20, 9, 7, 3, 11, 10, 17, 24, 23, 27, 36, 30
  * In-order: 3, 7, 9, 10, 11, 17, 20, 23, 24, 27, 30, 36
  * Post-order: 3, 7, 10, 17, 11, 9, 23, 30, 36, 27, 24, 20

1. Explain and implement a Binary Search Tree.

* A binary search tree is a binary tree with the added stipulation that all values to the left of a node are less than its value and all values to the right are greater than its value.
* Example of a BST with an insert method. You won't be asked to implement a removal:





```python
class BST {
  constructor() {
      this.root = null;
  }

  insert(val, currentNode=this.root) {
    if(!this.root) {
      this.root = new TreeNode(val);
      return;
    }

    if (val < currentNode.val) {
      if (!currentNode.left) {
        currentNode.left = new TreeNode(val);
      } else {
        this.insert(val, currentNode.left);
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = new TreeNode(val);
      } else {
        this.insert(val, currentNode.right);
      }
    }
  }
}

```

```python
# Implement a Binary Search Tree (BST) that can insert values and check if
# values are present

class Node(object):
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST(object):
    def __init__(self, root):
        self.root = Node(root)

    def insert(self, new_val):
        if(self.root.left==None):
            if(self.root.value>new_val):
                self.root.left = Node(new_val)
        elif(self.root.right==None):
            if(self.root.value<new_val):
                self.root.right = Node(new_val)
        else:
            current = self.root
            while(current.left!=None or current.right!=None):
                if(current.value>new_val):
                    current = current.left
                else:
                    current = current.right

            if(current.left==None):
                current.left = Node(new_val)
            else:
                current.right = Node(new_val)

    def search(self, find_val):
        if(self.root.left==None and self.root.right==None and self.root.value!=find_val):
            return False
        else:
            current = self.root
            val_possible = True
            while(val_possible):
                if(current.value==find_val):
                        return True
                if(current.value<find_val):
                    current = current.right
                else:
                    current = current.left
                if(current==None):
                    return False
                if(current.value<find_val and (current.right==None or current.right>find_val)):
                    return False
                if(current.value>find_val and (current.left==None or current.left<find_val)):
                    return False

# Set up tree
tree = BST(4)

# Insert elements
tree.insert(2)
tree.insert(1)
tree.insert(3)
tree.insert(5)

# Check search
# Should be True
print tree.search(4)
# Should be False
print tree.search(6)

```

```python
class Solution(object):
    def topKFrequent(self, nums, k):
        number_frequency = {}
        frequency_list = {}
        for i in nums:
            if i not in number_frequency:
                number_frequency[i] = 1
            else:
                number_frequency[i] += 1
        for key, value in number_frequency.items():
            if value not in frequency_list:
                frequency_list[value] = [key]
            else:
                frequency_list[value].append(key)
        result = []
        for i in range(len(nums), 0, -1):
            if i in frequency_list:
                result.extend(frequency_list[i])
            if len(result) >= k:
                break
        return result


ob1 = Solution()
print(ob1.topKFrequent([1, 1, 1, 1, 2, 2, 3, 3, 3], 2))




```

## Balanced Binary Tree

## Balanced Binary Tree

Given a binary tree class that looks like this:

```javascript
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}
```

write a function that checks to see if a given binary tree is perfectly balanced, meaning all leaf nodes are located at the same depth. Your function should return `true` if the tree is perfectly balanced and `false` otherwise.

Analyze the time and space complexity of your function.



JS Solution:

```javascript
/* 
  A recursive solution
  How would you solve this iteratively?
 */
const checkBalanced = (rootNode) => {
  // An empty tree is balanced by default
  if (!rootNode) return true;
  // recursive helper function to check the min depth of the tree
  const minDepth = (node) => {
    if (!node) return 0;
    return 1 + Math.min(minDepth(node.left), minDepth(node.right));
  };
  // recursive helper function to check the max depth of the tree
  const maxDepth = (node) => {
    if (!node) return 0;
    return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
  };

  return maxDepth(rootNode) - minDepth(rootNode) === 0;
};

/* Some console.log tests */
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}

const root = new BinaryTreeNode(5);
console.log(checkBalanced(root)); // should print true

root.insertLeft(10);
console.log(checkBalanced(root)); // should print false

root.insertRight(11);
console.log(checkBalanced(root)); // should print true;

```



```javascript
#  A recursive solution
#  How would you solve this iteratively?


def checkBalanced(rootNode):
    # An empty tree is balanced by default
    if rootNode == None:
        return True

    # recursive helper function to check the min depth of the tree
    def minDepth(node):
        if node == None:
            return 0
        return 1 + min(minDepth(node.left), minDepth(node.right))

    # recursive helper function to check the max depth of the tree
    def maxDepth(node):
        if node == None:
            return 0
        return 1 + max(maxDepth(node.left), maxDepth(node.right))

    return maxDepth(rootNode) - minDepth(rootNode) == 0


# Some console.log tests
class BinaryTreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insertLeft(self, value):
        self.left = BinaryTreeNode(value)
        return self.left

    def insertRight(self, value):
        self.right = BinaryTreeNode(value)
        return self.right


root = BinaryTreeNode(5)
print(checkBalanced(root))  # should print True

root.insertLeft(10)
print(checkBalanced(root))  # should print False

root.insertRight(11)
print(checkBalanced(root))  # should print True

```

## Binary Search Tree from Sorted Array

Given an array that is sorted in ascending order containing unique integer elements, write a function that receives the sorted array as input and creates a valid binary search tree with minimal height.

For example, given an array `[1, 2, 3, 4, 5, 6, 7]`, your function should return a binary search tree with the form

```text
                          4
                        /   \
                      2       6
                     / \     / \
                    1   3   5   7
```

Note that when we say "binary search tree" in this case, we're just talking about a tree that exhibits the expected _form_ of a binary search tree. The tree in this case won't have an `insert` method that does the work of receiving a value and then inserting it in a valid spot in the binary search tree. Your function should place the values in valid spots that adhere to the rules of binary search trees, while also seeking to minimize the overall height of the tree.

Here's a `BinaryTreeNode` class that you can use to construct a binary search tree:

```python
class BinaryTreeNode:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None
```

Analyze the time and space complexity of your solution.





## Create a Minimal Height BST from Sorted Array

### Understanding the Problem

This problem asks us to create a valid binary search tree from a sorted array of integers. More specifically, the resulting binary search tree needs to be of _minimal height_. Our function should return the root node of the created binary search tree.

From the given example where the input is `[1, 2, 3, 4, 5, 6, 7]`, the expected answer is a binary search tree of height 3. This is the minimal height that can be achieved for an array of 7 seven elements. Try as we might, there's no way to construct a binary search tree containing all of these elements that has a shorter height.

### Coming Up with a First Pass

A straightforward way to do this would be to take the first element of our array, call that the root, and then iterate through the rest of our array, adding those elements as nodes in the binary search tree. In pseudocode, that might look something like this:

```text
def create_min_height_bst(sorted_arr):
  root = BinaryTreeNode(sorted_arr[0])

  for elem in sorted_arr:
    root.insert(elem)

  return root
  
```

```javascript
function createMinHeightBST(sortedArray) {
  const left = 0;
  const right = sortedArray.length - 1;

  return recHelper(sortedArray, left, right);
}

function recHelper(sortedArray, left, right) {
  if (left > right) {
    return null;
  }

  const midpoint = math.floor(right - left) / 2 + left;
  const root = new BinaryTreeNode(sortedArray[midpoint]);

  root.left = recHelper(sortedArray, left, midpoint - 1);
  root.right = recHelper(sortedArray, midpoint + 1, right);

  return root;
}

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function isBST(root, minBound, maxBound) {
  if (root === null) {
    return true;
  }

  if (root.value < minBound || root.value > maxBound) {
    return false;
  }

  const left = isBST(root.left, minBound, root.value - 1);
  const right = isBST(root.right, root.value + 1, maxBound);

  return left && right;
}

function findBSTMaxHeight(node) {
  if (node === null) {
    return 0;
  }

  return (
    1 + Math.max(findBSTMaxHeight(node.left), findBSTMaxHeight(node.right))
  );
}

function isBSTMinHeight(root, N) {
  const height = findBSTMaxHeight(root);
  const shouldEqual = Math.floor(Math.log2(N)) + 1;

  return height === shouldEqual;
}

function countBSTNodes(root, count) {
  if (root === null) {
    return count;
  }

  countBSTNodes(root.left, count);
  count++;
  countBSTNodes(root.right, count);
}

// Some tests
let sortedArray = [1, 2, 3, 4, 5, 6, 7];
let bst = createMinHeightBST(sortedArray);

console.log(isBST(bst, -Infinity, Infinity));
console.log(isBSTMinHeight(bst, sortedArray.length));

sortedArray = [4, 10, 11, 18, 42, 43, 47, 49, 55, 67, 79, 89, 90, 95, 98, 100];
bst = createMinHeightBST(sortedArray);

console.log(isBST(bst, -Infinity, Infinity));
console.log(isBSTMinHeight(bst, sortedArray.length));

```

```python
import math


def create_min_height_bst(sorted_array):
    left = 0
    right = len(sorted_array) - 1

    return rec_helper(sorted_array, left, right)


def rec_helper(sorted_array, left, right):
    if left > right:
        return None

    midpoint = ((right - left) // 2) + left
    root = BinaryTreeNode(sorted_array[midpoint])

    root.left = rec_helper(sorted_array, left, midpoint - 1)
    root.right = rec_helper(sorted_array, midpoint + 1, right)

    return root


class BinaryTreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


# Helper function to validate that the created tree is a valid BST
def is_BST(root, min_bound, max_bound):
    if root is None:
        return True

    if root.value < min_bound or root.value > max_bound:
        return False

    left = is_BST(root.left, min_bound, root.value - 1)
    right = is_BST(root.right, root.value + 1, max_bound)

    return left and right


# Helper function to check the max height of a BST
def find_bst_max_height(node):
    if node is None:
        return 0

    return 1 + max(find_bst_max_height(node.left), find_bst_max_height(node.right))


# Helper function to validate that the given BST exhibits the min height
def is_bst_min_height(root, N):
    bst_max_height = find_bst_max_height(root)
    should_equal = math.floor(math.log2(N)) + 1

    return bst_max_height == should_equal


# Helper function to count the number of nodes for a given BST
def count_bst_nodes(root, count):
    if root is None:
        return count

    count_bst_nodes(root.left, count)
    count += 1
    count_bst_nodes(root.right, count)


# Some tests
sorted_array = [1, 2, 3, 4, 5, 6, 7]
bst = create_min_height_bst(sorted_array)

print(is_BST(bst, float("-inf"), float("inf")))  # should print true
print(is_bst_min_height(bst, len(sorted_array)))  # should print true

sorted_array = [4, 10, 11, 18, 42, 43, 47, 49, 55, 67, 79, 89, 90, 95, 98, 100]
bst = create_min_height_bst(sorted_array)

print(is_BST(bst, float("-inf"), float("inf")))  # should print true
print(is_bst_min_height(bst, len(sorted_array)))  # should print true

```

## Another BST Implementation:

```python
class BinarySearchTree:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None

  def insert(self, value):
    pass

  def contains(self, target):
    pass

  def get_max(self):
    pass

  def for_each(self, cb):
    pass

```

```python
import unittest
import random
from binary_search_tree import BinarySearchTree

class BinarySearchTreeTests(unittest.TestCase):
  def setUp(self):
    self.bst = BinarySearchTree(5)

  def test_insert(self):
    self.bst.insert(2)
    self.bst.insert(3)
    self.bst.insert(7)
    self.bst.insert(6)
    self.assertEqual(self.bst.left.right.value, 3)
    self.assertEqual(self.bst.right.left.value, 6)

  def test_contains(self):
    self.bst.insert(2)
    self.bst.insert(3)
    self.bst.insert(7)
    self.assertTrue(self.bst.contains(7))
    self.assertFalse(self.bst.contains(8))

  def test_get_max(self):
    self.assertEqual(self.bst.get_max(), 5)
    self.bst.insert(30)
    self.assertEqual(self.bst.get_max(), 30)
    self.bst.insert(300)
    self.bst.insert(3)
    self.assertEqual(self.bst.get_max(), 300)

  def test_for_each(self):
    arr = []
    cb = lambda x: arr.append(x)

    v1 = random.randint(1, 101)
    v2 = random.randint(1, 101)
    v3 = random.randint(1, 101)
    v4 = random.randint(1, 101)
    v5 = random.randint(1, 101)

    self.bst.insert(v1)
    self.bst.insert(v2)
    self.bst.insert(v3)
    self.bst.insert(v4)
    self.bst.insert(v5)

    self.bst.for_each(cb)

    self.assertTrue(5 in arr)
    self.assertTrue(v1 in arr)
    self.assertTrue(v2 in arr)
    self.assertTrue(v3 in arr)
    self.assertTrue(v4 in arr)
    self.assertTrue(v5 in arr)


if __name__ == '__main__':
  unittest.main()

```

