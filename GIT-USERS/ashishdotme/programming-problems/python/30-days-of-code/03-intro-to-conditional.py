#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Given an integer, , perform the following conditional actions:
1. If  is odd, print Weird
2. If  is even and in the inclusive range of to, print Not Weird
3. If  is even and in the inlusive range of to, print Weird
4. If  is even and greater than, print Not Weird
Complete the stub code provided in your editor to print whether or not  is weird.
"""

N = int(input().strip())
if N % 2 != 0 or N > 5 and N <= 20:
    print("Weird")
else:
    print("Not Weird")
