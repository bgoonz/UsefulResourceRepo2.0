# https://leetcode.com/problems/power-of-three


def isPowerOfThree(n):
    """
    :type n: int
    :rtype: bool
    """
    if n < 1:
        return False
    while n % 3 == 0:
        n /= 3
    return n == 1
