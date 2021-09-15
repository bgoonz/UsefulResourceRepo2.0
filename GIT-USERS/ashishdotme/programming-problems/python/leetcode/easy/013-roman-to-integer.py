#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Given a roman numeral, convert it to an integer.
Input is guaranteed to be within the range from 1 to 3999.
"""

# Time:  O(n​2)
# Space: O(1)


class Solution(object):
    def romanToInt(self, roman):
        """
        :param s: String
        :return: integer
        """
        numerals = {"M": 1000, "D": 500, "C": 100, "L": 50, "X": 10, "V": 5, "I": 1}
        pre = roman[0]
        result = 0
        for num in roman:
            if numerals[num] <= numerals[pre]:
                result += numerals[num]
            else:
                print("large")
                result += numerals[num] - 2 * numerals[pre]
            pre = num
        return result


t = Solution()
print(t.romanToInt("XII"))
