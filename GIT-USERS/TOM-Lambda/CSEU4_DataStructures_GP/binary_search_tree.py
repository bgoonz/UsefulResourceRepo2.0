from dll_queue import Queue
from dll_stack import Stack

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class BinarySearchTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    # Insert the given value into the tree
    def insert(self, value):
        # check if new nodes value is less than our current nodes value
        if value < self.value:
            # if there is no left child already here
            if not self.left:
                # place a new bst with the value passed in to the left
                self.left = BinarySearchTree(value)
            # otherwise
            else:
                # repeat the process recursively on the left
                self.left.insert(value)

        # check if new nodes value is greater than or equal to our current nodes value
        if value >= self.value:
            # if there is no right child already here
            if not self.right:
                # place a new bst with the value passed in to the right
                self.right = BinarySearchTree(value)
            # otherwise
            else:
                # repeat the process recursively on the right
                self.right.insert(value)

    # Return True if the tree contains the value
    # False if it does not
    def contains(self, target):
        # base case. if value matches current target
        if self.value == target:
            # return True
            return True

<<<<<<< HEAD
        # if target less than value 
        if target < self.value:
            # check left child recursively      
=======
        # if target less than value
        if target < self.value:
            # check left child recursively
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # if no left child
            if not self.left:
                # return false
                return False
            # otherwise
            else:
                # call contains on the left
                return self.left.contains(target)
        # otherwise
        else:
            # check right child recursively
            # if no right child
            if not self.right:
                # return false
                return False
            # otherwise
            else:
                # call contains on the right
                return self.right.contains(target)

    # Return the maximum value found in the tree
    def get_max(self):
        # if tree empty return false
        if not self:
            return None
<<<<<<< HEAD
        
        # Rodrigos iterative approach
        # while self.right:
        #     self = self.right
        
=======

        # Rodrigos iterative approach
        # while self.right:
        #     self = self.right

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # return self.value

        # recursive approach
        # if there is no right child
        if not self.right:
            # return the value
            return self.value
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # recursive case
        # call get max on the right child
        return self.right.get_max()

        # TODO: iterative approach
        # # init a max val variable
        # max_val = self.value
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # # take ref to current node
        # current = self

        # # while current node exists
        # while current:
        #     # check if current val is greather than max val
        #     if current.value > max_val:
        #         # set max val to current val
        #         max_val = current.value
<<<<<<< HEAD
            
        #     # move to the next right node
        #     current = current.right
            
=======

        #     # move to the next right node
        #     current = current.right
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        # # return max val
        # return max_val

<<<<<<< HEAD


=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # Call the function `cb` on the value of each node
    # You may use a recursive or iterative approach
    def for_each(self, cb):
        # do the call back using self.value as the parameter
        cb(self.value)

        # if left exists
        if self.left:
            # call foreach on left
            self.left.for_each(cb)

        # if right exists
        if self.right:
            # call foreach on right
            self.right.for_each(cb)

    # DAY 2 Project -----------------------

    # Print all the values in order from low to high
    # Hint:  Use a recursive, depth first traversal
    def in_order_print(self, node):
        # if our node does not exist
<<<<<<< HEAD
            # just return
        
        # left case
        # call in order print on left node
        
        # now print the nodes value
        
=======
        # just return

        # left case
        # call in order print on left node

        # now print the nodes value

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # right case
        # call in order print on the right node
        pass

    # Print the value of every node, starting with the given node,
    # in an iterative breadth first traversal
    def bft_print(self, node):
        # instantiate a queue

        # enqueue the starting node

        # while the queue contains data
<<<<<<< HEAD
            # dequeue current node
            # print the current value
            # check if left child exists
                # enqueue left child
            # check if a right child exists
                # enqueue right child
=======
        # dequeue current node
        # print the current value
        # check if left child exists
        # enqueue left child
        # check if a right child exists
        # enqueue right child
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    # Print the value of every node, starting with the given node,
    # in an iterative depth first traversal
    def dft_print(self, node):
        # instantiate a stack

        # push the starting node

        # while the stack contains data
<<<<<<< HEAD
            # pop current node
            # print the current value
            # check if left child exists
                # push left child
            # check if a right child exists
                # push right child
=======
        # pop current node
        # print the current value
        # check if left child exists
        # push left child
        # check if a right child exists
        # push right child
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    # STRETCH Goals -------------------------
    # Note: Research may be required

    # Print Pre-order recursive DFT
    def pre_order_dft(self, node):
        pass

    # Print Post-order recursive DFT
    def post_order_dft(self, node):
<<<<<<< HEAD
        pass
=======
        pass
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
