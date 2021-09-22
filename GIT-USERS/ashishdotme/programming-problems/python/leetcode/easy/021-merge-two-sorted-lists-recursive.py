#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Merge two sorted linked lists and return it as a new list.
The new list should be made by splicing together the nodes of the first two lists.
"""

# Time:  O(n)
# Space: O(1)


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

    def __repr__(self):
        if self:
            return "{} -> {}".format(self.val, self.next)


class Solution(object):
    def mergeTwoLists(self, l1, l2):
        """
		:type s: str
		:rtype: bool
		"""
        if l1 is None:
            return l2
        if l2 is None:
            return l1
        if l1.val < l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        else:
            l2.next = self.mergeTwoLists(l1, l2.next)
            return l2


if __name__ == "__main__":
    l1 = ListNode(2)
    l1.next = ListNode(3)
    l1.next.next = ListNode(4)
    l1.next.next.next = ListNode(6)
    l2 = ListNode(1)
    l2.next = ListNode(5)
    l2.next.next = ListNode(12)
    l2.next.next.next = ListNode(14)
    print(Solution().mergeTwoLists(l1, l2))
