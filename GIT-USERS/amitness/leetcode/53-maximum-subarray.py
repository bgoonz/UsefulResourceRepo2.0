# https://leetcode.com/problems/maximum-subarray/description/


def maxSubArray(self, nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    maxv = curr = nums[0]
    for n in nums[1:]:
        curr = max(n, curr + n)
        maxv = max(maxv, curr)
    return maxv
