#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write the below function recursively

# prod(L): number -> number
# prod(L) is the product of numbers in list L
# should return 1 if list is empty
def prod(L):
  product, i = 1,0
  while i < len(L):
    product = product * L[i]
    i = i + 1
  return product
"""


def product_list(numbers):
    if numbers == []:
        return 1
    elif len(numbers) == 1:
        return numbers[0]
    else:
        return numbers[0] * product_list(numbers[1:])


print(product_list([3, 2, 2]))
