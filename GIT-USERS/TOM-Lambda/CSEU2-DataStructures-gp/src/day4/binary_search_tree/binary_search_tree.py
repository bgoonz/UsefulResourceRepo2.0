import sys
from dll_queue import Queue
from dll_stack import Stack


class BinarySearchTree:
    def __init__(self, value):
        # set the value at the current node
        self.value = value
        # add ref to left child node
        self.left = None
        # add ref to the right child node
        self.right = None

    # Insert the given value into the tree
    def insert(self, value):
        # LEFT CASE
        # check if the new nodes value is less than our current ones value
        if value < self.value:
<<<<<<< HEAD
            # if the is no left child, 
=======
            # if the is no left child,
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            if not self.left:
                # place a new node here
                self.left = BinarySearchTree(value)
            # otherwise
            else:
                # repeat process for left
                self.left.insert(value)
        # RIGHT CASE
        # check if the new nodes value is greater than or equal to the current parent value
        elif value >= self.value:
<<<<<<< HEAD
            # if there is no right child here, 
=======
            # if there is no right child here,
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            if not self.right:
                # place a new one
                self.right = BinarySearchTree(value)
            # otherwise
            else:
                # repeat process right
                self.right.insert(value)

    # Return True if the tree contains the value
    # False if it does not
    def contains(self, target):
        # BASE CASE
        # if the value of the current node matches the target, we have found a match
        if self.value == target:
            return True
        # LEFT CASE
        # if there is a left child, do a recursive call to contains on left
        if target < self.value:
            if not self.left:
                return False
            else:
                return self.left.contains(target)
        # RIGHT CASE
        # if there is a right child, do a recursive call to contains on right
        if target >= self.value:
            if not self.right:
                return False
            else:
                return self.right.contains(target)

    # Return the maximum value found in the tree
    def get_max(self):
<<<<<<< HEAD
        # BASE CASE 
=======
        # BASE CASE
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # if empty tree
        if not self:
            # return none
            return None
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # RECURSIVE
        # # if the the is no right value
        # if not self.right:
        #     # return the root value
        #     return self.value
        # # return the get max of the the right node
        # return self.right.get_max()

        # ITTERATIVE
        # set a max value variable to keep track of max value
        max_value = self.value
        # get a ref to current node
        current_node = self
        # check if we are at a valid tree node
        while current_node:
            # if our current value is greater than the max value
            if current_node.value > max_value:
                # update the max value
                max_value = current_node.value
            # move on to the next right node in the tree
            # setting the current node to the current nodes right
            current_node = current_node.right
        # return our max value
        return max_value

    # Call the function `cb` on the value of each node
    # You may use a recursive or iterative approach
    def for_each(self, cb):
        # base case
        if self.value:
            cb(self.value)
        # left case
        if self.left:
            self.left.for_each(cb)
        # right case
        if self.right:
            self.right.for_each(cb)

    def itter_df_for_each(self, cb):
        # create a new stack to hold our traversal data
        stack = []
        # pushing the root node on to the stack
        stack.append(self)
        # while there are still nodes on the stack
        while len(stack):
            # pop the current node off the stack
            current_node = stack.pop()
            # if currnt node has a right child
            if current_node.right:
                # push the current nodes right node on to the stack
                stack.append(current_node.right)
            # if the current node has a left child
            if current_node.left:
                # push the current nodes left node on to the stack
                stack.append(current_node.left)
            # call the callback on the current nodes value
            cb(current_node.value)

    def itter_bf_for_each(self, cb):
        # create a new queue to hold our traversal data
        q = []
        # enqueue the root node on to the queue
        q.append(self)
        # while there are still nodes on the queue
        while len(q):
            # dequeue the current node off the queue
            current_node = q.pop(0)
            # if currnt node has a right child
            if current_node.right:
                # push the current nodes right node on to the stack
                q.append(current_node.right)
            # if the current node has a left child
            if current_node.left:
                # push the current nodes left node on to the stack
                q.append(current_node.left)
            # call the callback on the current nodes value
            cb(current_node.value)

    # DAY 2 Project -----------------------

    # Print all the values in order from low to high
    # Hint:  Use a recursive, depth first traversal
    def in_order_print(self, node):
        pass

    # Print the value of every node, starting with the given node,
    # in an iterative breadth first traversal
    def bft_print(self, node):
        # use a queue data structure
        q = Queue()
        # enqueue the starting node on to the queue
        # loop while the queue has data
<<<<<<< HEAD
            # dequeue the current it em off the queue
            # print the current value
            # if the current node has a left child
                # enqueue the left child on to the queue
            # if the current node has a right child
                # enqueue right child on to the queue          
=======
        # dequeue the current it em off the queue
        # print the current value
        # if the current node has a left child
        # enqueue the left child on to the queue
        # if the current node has a right child
        # enqueue right child on to the queue
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    # Print the value of every node, starting with the given node,
    # in an iterative depth first traversal
    def dft_print(self, node):
        # use a stack data structure
        s = Stack()
        # push the starting node on to the stack
        # loop while the stack has data
<<<<<<< HEAD
            # pop the current it em off the stack
            # print the current value
            # if the current node has a left child
                # push the left child on to the stack
            # if the current node has a right child
                # push right child on to the stack          
=======
        # pop the current it em off the stack
        # print the current value
        # if the current node has a left child
        # push the left child on to the stack
        # if the current node has a right child
        # push right child on to the stack
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    # STRETCH Goals -------------------------
    # Note: Research may be required

    # Print In-order recursive DFT (can be used to copy a tree)
    def pre_order_dft(self, node):
        pass

    # Print Post-order recursive DFT (can be used to delete a tree)
    def post_order_dft(self, node):
        pass
