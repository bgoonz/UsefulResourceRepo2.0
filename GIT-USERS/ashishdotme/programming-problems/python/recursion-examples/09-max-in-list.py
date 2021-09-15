#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write a recursive function to compute the maximum element in a list. 
Its only parameter should be the list. e.g maxElement(L)
"""


def max_from_list(numbers):
    if len(numbers) == 1:
        return numbers[0]
    else:
        max = max_from_list(numbers[1:])
        if numbers[0] > max:
            return numbers[0]
        else:
            return max


print(max_from_list([2, 3, 14, 2, 1, 3]))
