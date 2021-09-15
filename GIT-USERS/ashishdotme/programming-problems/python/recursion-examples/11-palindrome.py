#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
A palindrome is a word, phrase, number, or other sequence of symbols or elements, whose meaning may be interpreted the same way in either forward or reverse direction.
Write a recursive function that determines whether a string is a palindrome. Your function should receive the string as its only parameter
"""


def is_palindrome(str):
    if len(str) == 1:
        return str
    else:
        print(str[1:-1])
        print(str[0])
        print(str[-1])
        return is_palindrome(str[1:])


print(is_palindrome("Ashish"))
