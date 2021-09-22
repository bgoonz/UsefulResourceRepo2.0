# https://leetcode.com/problems/power-of-two/description/


def isPowerOfTwo(self, n):
    return bool(n) and not (n & n - 1)
