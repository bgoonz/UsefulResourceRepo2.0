#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write a function to calculate power of a number raised to other ( a^b ) using recursion.
"""


def power_of_number(num, power):
    if power == 1:
        return num
    else:
        return num * powerOfNumber(num, power - 1)


print(powerOfNumber(2, 3))
