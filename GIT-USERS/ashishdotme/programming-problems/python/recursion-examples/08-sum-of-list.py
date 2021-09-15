#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write a recursive function that computes and returns the sum of all elements in a list where the list
Its size are given as parameters e.g def elementSum(L,n) where n == len(L)
"""


def sum_list(num, length):
    if length == 1:
        return num[0]
    else:
        return num[0] + sum_list(num[1:], length - 1)


print(sum_list([5, 5, 5, 5, 6], 5))
