#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Write a function to find the longest common prefix string amongst an array of strings.
"""

# Time:  O(n * k), k is the length of the common prefix
# Space: O(1)


class Solution(object):
    def longestCommonPrefix(self, arr):
        """
	  :type strs: List[str]
	  :rtype: str
		"""
        if not arr:
            return ""
        minstr = min(arr, key=len)
        for i in range(len(minstr)):
            for j in range(len(arr)):
                if minstr[i] != arr[j][i]:
                    return minstr[:i]
        return minstr


if __name__ == "__main__":
    print(Solution().longestCommonPrefix(["heallo", "heaven", "heavy", "heavenest"]))
