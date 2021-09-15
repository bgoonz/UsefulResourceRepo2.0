#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Determine whether an integer is a palindrome. Do this without extra space.
"""

# Time:  O(n​2)
# Space: O(1)


class Solution(object):
    def isPalindrome(self, number):
        """
		:type x: int
		:rtype: bool
		"""
        if number > 0x7FFFFFFF or number < 0:
            return False
        number_str = str(number)
        number_len = len(number_str)
        if number_len == 1:
            return True
        last = -1
        for num in range(0, number_len // 2):
            if number_str[num] != number_str[last]:
                return False
            last -= 1
        return True


t = Solution()
print(t.isPalindrome(1234321))
