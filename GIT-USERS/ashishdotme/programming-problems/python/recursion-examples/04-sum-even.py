#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write the below function recursively

# sum_even(n): number -> number
# sum_even(n) is the sum of even numbers from 0 to N.
def sum_even(n):
 total = 0
 for i in range(2, n+1,2):
   total = total + i
 return total
"""


def sum_even(num):
    if num < 0:
        return 0
    elif num % 2 != 0:
        return sum_even(num - 1)
    else:
        return num + sum_even(num - 2)


print(sum_even(5))
