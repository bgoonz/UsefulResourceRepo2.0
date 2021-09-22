#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""


class Node(object):

    def __init__(self, data):
        self.data = data
        self.leftChild = None
        self.rightChild = None

class BinarySearchTree(object):

    def __init__(self, data=None):
        self.root = None

    def insert(self, data):
        if not self.root:
            self.root = Node(data)
        else:
            self.insertNode(data, self.root)

    def insertNode(self, data, node):
        if data < node.data:
            if node.leftChild:
                self.insertNode(data, node.leftChild)
            else:
                node.leftChild = Node(data)
        else:
            if node.rightChild:
                self.insertNode(data, node.rightChild)
            else:
                node.rightChild = Node(data)

    def getMin(self):
        if self.root:
            return self.getMinValue(self.root)

    def getMinValue(self, node):
        if node.leftChild:
            return self.getMinValue(node.leftChild)

        return node.data

    def getMax(self):
        if self.root:
            return self.getMaxValue(self.root)

    def getMaxValue(self, node):
        if node.rightChild:
            return self.getMaxValue(node.rightChild)

        return node.data

    def traverseInorder(self):
        if self.root:
            self.inorder(self.root)
    
    def inorder(self, node):
        if node.leftChild:
            self.inorder(node.leftChild)

        print node.data

        if node.rightChild:
            self.inorder(node.rightChild)
    
    def traversePreorder(self):
        if self.root:
            self.preorder(self.root)
    
    def preorder(self, node):
        
        print node.data

        if node.leftChild:
            self.preorder(node.leftChild)

        if node.rightChild:
            self.preorder(node.rightChild)
    
    def traversePostorder(self):
        if self.root:
            self.postorder(self.root)
    
    def postorder(self, node):
        
        if node.leftChild:
            self.postorder(node.leftChild)

        if node.rightChild:
            self.postorder(node.rightChild)

        print node.data
    



if __name__ == "__main__":
    bst = BinarySearchTree()
    bst.insert(3)
    bst.insert(1)
    bst.insert(2)
    bst.insert(0)
    bst.insert(4)  
    bst.insert(5)   
    bst.insert(6)
    print("Lowest value in the binary search tree ->")
    print(bst.getMin())
    print("Largest value in the binary search tree ->")
    print(bst.getMax())
    print("Traversing In Order")
    bst.traverseInorder()
    print("Traversing Pre Order")
    bst.traversePreorder()
    print("Traversing Post Order")
    bst.traversePostorder()