"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Given an array of integers, return indices of the two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
"""

# Time:  O(n​2)
# Space: O(1)


def twoSumFirst(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    for num in nums:
        another = target - num
        if another in nums:
            return [nums.index(num), nums.index(another)]
    return "Not found"


# Time:  O(n)
# Space: O(n)


def twoSumSecond(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    numbers = {}
    for i, num in enumerate(nums):
        if target - num in numbers:
            return [numbers[target - num], i]
        numbers[num] = i

    return "Not found"


print(twoSumSecond([2, 11, 7, 15], 9))
