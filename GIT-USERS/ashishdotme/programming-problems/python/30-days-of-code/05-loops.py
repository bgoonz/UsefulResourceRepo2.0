#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Given an integer, print its first  multiples. Each multiple  (where ) should be 
printed on a new line in the form: n x i = result.
"""

n = int(input().strip())
for i in range(1, 11):
    print("{0} x {1} = {2}".format(n, i, i * n))
