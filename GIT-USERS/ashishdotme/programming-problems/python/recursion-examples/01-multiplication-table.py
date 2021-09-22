#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Print multiplication table of 15 using recursion.
"""

def multiply(num, i):
    print num * i
    i += 1
    if i <= 10:
        multiply(num, i)

multiply(15, 1)
