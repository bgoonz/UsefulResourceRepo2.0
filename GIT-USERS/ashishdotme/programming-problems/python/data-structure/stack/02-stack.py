#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""


class Node(object):
    """Implementaton of Node """

    def __init__(self, value):
        self.value = value
        self.next_node = None


class Stack(object):
    """Implementaton of the stack """

    def __init__(self, value=None):
        self.top = value
        self.size = 0

    def push(self, value):
        """Add element to the top of the stack"""
        new_node = Node(value)
        if self.top:
            new_node.next_node = self.top
        self.top = new_node
        self.size += 1

    def pop(self):
        """Remove the last element added to the stack"""
        if self.top is None:
            return None
        current_value = self.top.value
        self.top = self.top.next_node
        self.size -= 1
        print(current_value)

    def display(self, mark="----"):
        """Print the contents of the stack."""
        current = self.top
        while current:
            print current.value, "\n" + mark
            current = current.next_node


if __name__ == '__main__':
    stack_demo = Stack()
    stack_demo.push(3)
    stack_demo.push(8)
    stack_demo.push(2)
    print("Printing the stack")
    stack_demo.display()
    print("Poping item from the stack")
    stack_demo.pop()
    print("Printing the stack")
    stack_demo.display()
