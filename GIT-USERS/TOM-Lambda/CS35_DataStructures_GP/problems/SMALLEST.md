Find the Smallest Missing Element from a Sorted Array
Given a sorted array of distinct non-negative integers, find the smallest missing element in it.

Examples
Input: A = [0, 1, 2, 6, 9, 11, 15] Output: The smallest missing element is 3

Input: A = [1, 2, 3, 4, 6, 9, 11, 15] Output: The smallest missing element is 0

Input: A = [0, 1, 2, 3, 4, 5, 6] Output: The smallest missing element is 7

A = [0, 1, 2, 6, 9, 11, 15]

print(smallest_missing(A, 0, len(A) - 1)) # => 3