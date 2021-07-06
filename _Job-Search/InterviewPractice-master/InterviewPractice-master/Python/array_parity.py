"""
Given an array A of non-negative integers, return an array consisting of all the even elements of A, followed by all the odd elements of A.
You may return any answer array that satisfies this condition.

Input: [3,1,2,4]
Output: [2,4,3,1]

(order doesn't matter)
"""

def sortArrayByParity(A):
        """
        :type A: List[int]
        :rtype: List[int]
        """

        odd = []
        even = []

        for value in A:
            if value % 2 == 0:
                even.append(value)
            else:
                odd.append(value)

        return even + odd

def main():
    A = [3,1,2,4]
    sortArrayByParity(A)

main()