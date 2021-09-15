# https://leetcode.com/problems/reverse-integer


def reverse(x):
    """
    :type x: int
    :rtype: int
    """
    sum = 0
    negative = False
    if x < 0:
        x = -x
        negative = True
    while x:
        sum = sum * 10 + x % 10
        x /= 10
    if sum > ((1 << 31) - 1):
        return 0
    return -sum if negative else sum
