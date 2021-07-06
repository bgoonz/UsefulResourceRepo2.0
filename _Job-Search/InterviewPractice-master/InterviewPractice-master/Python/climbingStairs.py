"""
    You are climbing a stair case. It takes n steps to reach to the top.

    Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
"""

def climbStairs(n):
    """
    :type n: int
    :rtype: int
    """

    if n == 1:
        return 1

    x = 1
    y = 2

    for i in range(2, n):
        temp = y
        y = x+y
        x = temp
    return y

def main():
    n = int(input("Enter a name: "))
    print(climbStairs(n))

if __name__ == '__main__':
    main()