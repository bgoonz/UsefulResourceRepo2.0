"""
Binary search trees are a data structure that enforce an ordering over 
the data they store. That ordering in turn makes it a lot more efficient 
at searching for a particular piece of data in the tree. 
This part of the project comprises two days:
1. Implement the methods `insert`, `contains`, `get_max`, and `for_each`
   on the BSTNode class.
2. Implement the `in_order_print`, `bft_print`, and `dft_print` methods
   on the BSTNode class.
"""
<<<<<<< HEAD
=======


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    # Insert the given value into the tree
    def insert(self, value):
        # insert
        # left case
        # check if our value is less than root value
        if value < self.value:
            # move to the left and check if it is None
<<<<<<< HEAD
            if not self.left:    
                # insert node here set the self.left to the new node
                self.left = BSTNode(value)  
=======
            if not self.left:
                # insert node here set the self.left to the new node
                self.left = BSTNode(value)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # otherwise
            else:
                # do an insert on the root's left node recursive call to the left node using self.left
                self.left.insert(value)
<<<<<<< HEAD
                
        # right case
        # otherwise
        else:
        
=======

        # right case
        # otherwise
        else:

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # move to the right and check if it is None
            if not self.right:
                # insert node here set the self.right to the new node
                self.right = BSTNode(value)
<<<<<<< HEAD
                
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # otherwise
            else:
                # do an insert on the root's right node recursive call to insert using self.right
                self.right.insert(value)

    # Return True if the tree contains the value
    # False if it does not
    def contains(self, target):
        # contains
        # check the value root node (self.value) against the target
        # if the root node value and target are the same
        if self.value == target:
            # return True
            return True
<<<<<<< HEAD
            
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # left case
        # check if our target is less than the root val (self.value)
        if target < self.value:
            # check if there is no child to the left (self.left) is None
            if not self.left:
                # return False
                return False
<<<<<<< HEAD
                
            # otherwise
            else:
                # call contains on the left child (self.left)
                return self.left.contains(target)       
        
=======

            # otherwise
            else:
                # call contains on the left child (self.left)
                return self.left.contains(target)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # right case
        # otherwise
        else:
            # check if there is no child to the right (self.right) is None
            if not self.right:
                # return False
<<<<<<< HEAD
                return False         
            # otherwise
            else:
                # call contains on the right child (self.right)        
                return self.right.contains(target)


=======
                return False
            # otherwise
            else:
                # call contains on the right child (self.right)
                return self.right.contains(target)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # Return the maximum value found in the tree
    def get_max(self):
        # base case
        # if tree is empty return None
        if not self:
            return None

        # iterative approach
<<<<<<< HEAD
        #while there is a right clild
=======
        # while there is a right clild
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        while self.right:
            # move to the child
            self = self.right
        # once there is no right child return self.value
        return self.value

    # Return the minimum value found in the tree
    def get_min(self):
        # base case
        # if tree is empty return None
        if not self:
            return None

        # iterative approach
<<<<<<< HEAD
        #while there is a left clild
=======
        # while there is a left clild
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        while self.left:
            # move to the child
            self = self.left
        # once there is no left child return self.value
        return self.value

    # Call the function `fn` on the value of each node
    def for_each(self, fn):
        # call the fn using self.value
        fn(self.value)

        # if left exists
        if self.left:
            # call foreach on left child
            self.left.for_each(fn)

        # if right exists
        if self.right:
            # call foreach on the right child
            self.right.for_each(fn)

    # Part 2 -----------------------

    # Print all the values in order from low to high
    # Hint:  Use a recursive, depth first traversal
    def in_order_print(self, node):
        # base case
        # if our node does not exist
<<<<<<< HEAD
            # return None

        # left case
        # if left exists
            # call in order print on self.left
=======
        # return None

        # left case
        # if left exists
        # call in order print on self.left
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        # print the node value

        # right case
        # if right exists
<<<<<<< HEAD
            # call in order print on self.right
=======
        # call in order print on self.right
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    # Print the value of every node, starting with the given node,
    # in an iterative breadth first traversal
    def bft_print(self, node):
        # instantiate a queue

        # enqueue our starting node (self)

        # while the queue has data
<<<<<<< HEAD
            # dequeue the current node
            # print the nodes value
            # check if a left child exists
                # enqueue left child
            # check if right child exists
                # equeue right child
=======
        # dequeue the current node
        # print the nodes value
        # check if a left child exists
        # enqueue left child
        # check if right child exists
        # equeue right child
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    # Print the value of every node, starting with the given node,
    # in an iterative depth first traversal
    def dft_print(self, node):
        # instantiate a stack

        # push our starting node (self)

        # while the stack has data
<<<<<<< HEAD
            # pop the current node
            # print the nodes value
            # check if a left child exists
                # push left child
            # check if right child exists
                # push right child
=======
        # pop the current node
        # print the nodes value
        # check if a left child exists
        # push left child
        # check if right child exists
        # push right child
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    # Stretch Goals -------------------------
    # Note: Research may be required

    # Print Pre-order recursive DFT
    def pre_order_dft(self, node):
        # base case
        # if our node does not exist
<<<<<<< HEAD
            # return None

        # print the node value
        
        # left case
        # if left exists
            # call in order print on self.left


        # right case
        # if right exists
            # call in order print on self.right
=======
        # return None

        # print the node value

        # left case
        # if left exists
        # call in order print on self.left

        # right case
        # if right exists
        # call in order print on self.right
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        pass

    # Print Post-order recursive DFT
    def post_order_dft(self, node):
<<<<<<< HEAD
        pass
=======
        pass
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
