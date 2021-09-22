#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write a recursive function to compute the minium element in a list. 
Its only parameter should be the list. e.g minElement(L)
"""


def min_from_list(numbers):
    if len(numbers) == 1:
        return numbers[0]
    else:
        min = min_from_list(numbers[1:])
        if numbers[0] < min:
            return numbers[0]
        else:
            return min


print(min_from_list([5, 4, 3, 2, 1, 8]))
