"""
    Given an array of integers, return indices of the two numbers such that they add up to a specific target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.
    EX: 
        Given nums = [2, 7, 11, 15], target = 9,

        Because nums[0] + nums[1] = 2 + 7 = 9,
        return [0, 1].
"""

class Solution:
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        
        for x,y in enumerate(nums):
            if target - y in nums and nums.index(target-y) != x:
                return [x, nums.index(target-y)]
        return 0
            
            

            
nums = [3, 2, 4]
target = 6

solution = Solution()
print(solution.twoSum(nums, target))