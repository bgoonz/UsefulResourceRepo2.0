#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Given a 32-bit signed integer, reverse digits of an integer.
"""

# Time:  O(n​2)
# Space: O(1)


def reverse(x):
    """
	:type x: int
	:rtype: int
	"""
    m = -1 if x < 0 else 1
    x = x * m
    reverse = 0
    while x > 0:
        single = int(x % 10)
        reverse = reverse * 10 + single
        x = x // 10  # For integer division we use //
    if reverse > 0x7FFFFFFF:
        return 0
    return reverse * m


print(reverse(-123))
