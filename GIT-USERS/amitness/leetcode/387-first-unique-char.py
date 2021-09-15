# https://leetcode.com/problems/first-unique-character-in-a-string


def firstUniqChar(s):
    """
    :type s: str
    :rtype: int
    """
    h = {}
    for i, c in enumerate(s):
        if c in h:
            h[c] = -1
        else:
            h[c] = i

    for c in s:
        if h[c] != -1:
            return h[c]
    return -1
