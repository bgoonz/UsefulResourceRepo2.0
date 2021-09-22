# https://leetcode.com/problems/two-sum/description/


class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        h = {}
        for i, elem in enumerate(nums):
            if (target - elem) in h:
                return [h[target - elem], i]
            h[elem] = i
