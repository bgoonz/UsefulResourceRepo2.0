#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write the below function recursively

# sum_odd(n): number -> number
# sum_odd(n) is the sum of odd numbers from 1 to N
def sum_odd(n):
 total = 1
 for i in range(1,n+1,2):
   total = total + i
 return total
"""


def sum_odd(num):
    if num < 0:
        return 0
    elif num % 2 == 0:
        return sum_odd(num - 1)
    else:
        return num + sum_odd(num - 2)


print(sum_odd(5))
