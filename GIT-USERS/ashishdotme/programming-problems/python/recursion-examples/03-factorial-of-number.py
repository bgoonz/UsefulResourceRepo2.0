#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write a function to calculate factorial of a number using recursion.
"""


def factorial_of_number(num):
    if num == 1:
        return 1
    else:
        return num * factorialOfNumber(num - 1)


print(factorialOfNumber(5))
