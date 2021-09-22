def hammingWeight(n):
    """
    :type n: int
    :rtype: int
    """
    return bin(n).count("1")
