#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write a recursive function to compute the sum of numbers from 1 to n.
"""


def sum_numbers(num):
    if num == 1:
        return 1
    else:
        return num + sum_numbers(num - 1)


print(sum_numbers(5))
