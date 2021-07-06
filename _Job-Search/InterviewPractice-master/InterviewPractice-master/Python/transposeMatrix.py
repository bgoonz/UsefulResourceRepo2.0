"""
    Given a matrix A, return the transpose of A.

    The transpose of a matrix is the matrix flipped over it's main diagonal,
    switching the row and column indices of the matrix.

    Input:
    1,2,3
    4,5,6
    7,8,9

    Output:
    1,4,7
    2,5,8
    3,6,9
"""

def transpose(A):
    """
    :type A: List[List[int]]
    :rtype: List[List[int]]
    """

    r =len(A)
    c = len(A[0])

    result = [[0] * r for i in range(c)]

    for i in range(r):
        for j in range(c):
            result[j][i] = A[i][j]

    return result

def main():
    A = [[1,2,3],[4,5,6],[7,8,9]]
    B = [[1,2,3],[4,5,6]]
    print(transpose(A))

main()