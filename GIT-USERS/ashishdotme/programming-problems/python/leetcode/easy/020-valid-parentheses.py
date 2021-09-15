#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.
"""

# Time:  O(n * k), k is the length of the common prefix
# Space: O(1)


class Solution(object):
    def isValid(self, s):
        """
	  :type s: str
    :rtype: bool
		"""
        if not s:
            return False
        stack = []
        dict = {"]": "[", "}": "{", ")": "("}
        for char in s:
            if char in dict.values():
                stack.append(char)
            elif char in dict.keys():
                if stack == [] or stack.pop() != dict[char]:
                    return False
            else:
                return False
        return stack == []


if __name__ == "__main__":
    print(Solution().isValid("()[]{}"))
