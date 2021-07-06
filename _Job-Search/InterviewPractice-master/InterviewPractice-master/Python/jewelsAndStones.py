"""
    You're given strings J representing the types of stones that are jewels, and S representing the stones you have.
    Each character in S is a type of stone you have.  You want to know how many of the stones you have are also jewels.
"""

def numJewelsInStones(J, S):
    """
    :type J: str
    :type S: str
    :rtype: int
    """

    stones = []
    jewels = []
    count = 0

    for i in J:
        jewels.append(i)

    for j in S:
        stones.append(j)

    for x in jewels:
        for y in stones:
            if x == y:
                count += 1

    return count

def main():
    J = "aA"
    S = "aAAbbbb"
    numJewelsInStones(J, S)

main()