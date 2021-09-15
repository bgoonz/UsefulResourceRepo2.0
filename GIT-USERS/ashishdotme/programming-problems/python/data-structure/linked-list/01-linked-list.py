#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""


class Node(object):
    """Implementaton of Node """

    def __init__(self, data=None, next_node=None):
        self.data = data
        self.next_node = next_node

    def get_data(self):
        """Return value of the node"""
        return self.data

    def get_next(self):
        """Get link of next node in the list"""
        return self.next_node

    def set_next(self, new_next):
        """Set next node"""
        self.next_node = new_next


class LinkedList(object):
    """Implementaton of Linked List """

    def __init__(self, head=None):
        self.head = head

    def insert(self, data):
        """Insert into the linked list"""
        new_node = Node(data)
        new_node.next_node = self.head
        self.head = new_node

    def size(self):
        """Get the size of linked list"""
        count = 0
        current = self.head
        while current:
            count = count + 1
            current = current.get_next()
        print(count)

    def search(self, data):
        """Search the linked list."""
        current = self.head
        found = False
        count = 0
        while current and found is False:
            if current.get_data() == data:
                found = True
            else:
                current = current.get_next()
            count += 1
        if current is None:
            raise ValueError("Data is not in the list")
        print(str(count) + "th position")

    def display(self):
        """Print the linked list"""
        full_list = []
        current = self.head
        while current:
            full_list.append(str(current.get_data()))
            current = current.get_next()
        print("->").join(full_list)

    def delete(self, data):
        """Delete the item from linked list"""
        current = self.head
        prev = None
        while current:
            if current.get_data() == data:
                if current == self.head:
                    self.head = current.get_next()
                else:
                    prev.set_next(current.get_next())
                return "Deleted"
            prev = current
            current = current.get_next()
        return "Not found"


if __name__ == "__main__":
    ll = LinkedList()
    print("Insert to the linked list")
    ll.insert(2)
    ll.display()
    print("Insert to the linked list")
    ll.insert(52)
    ll.display()
    print("Insert to the linked list")
    ll.insert(12)
    ll.display()
    print("Insert to the linked list")
    ll.insert(18)
    ll.display()
    print("Size of the linked list")
    ll.size()
    print("Search the linked list")
    ll.search(2)
    print("Delete from the linked list")
    ll.delete(52)
    ll.display()
