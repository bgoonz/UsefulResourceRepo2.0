#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""


class Node(object):
    def __init__(self, value=None):
        self.value = value
        self.next = None


class Queue(object):
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def enqueue(self, value):
        new_node = Node(value)
        if self.is_empty():
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1

    def dequeue(self):
        if self.is_empty():
            return "No item found"
        else:
            self.head = self.head.next
            self.size -= 1

    def is_empty(self):
        if self.head:
            return False
        else:
            return True

    def display(self):
        if self.is_empty():
            return "No item found"
        else:
            queue_list = []
            current = self.head
            while current:
                queue_list.append(current.value)
                current = current.next
            print(queue_list)


if __name__ == "__main__":
    queue_demo = Queue()
    print("Adding element in queue")
    queue_demo.enqueue(3)
    queue_demo.enqueue(33)
    queue_demo.enqueue(23)
    queue_demo.enqueue(7)
    print("Print the queue")
    queue_demo.display()
    print("Removing element from the queue")
    queue_demo.dequeue()
    print("Print the queue")
    queue_demo.display()
