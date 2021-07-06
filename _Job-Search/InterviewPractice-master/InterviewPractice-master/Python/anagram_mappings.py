"""
    For example, given

    A = [12, 28, 46, 32, 50]
    B = [50, 12, 32, 46, 28]
    We should return
    [1, 4, 3, 2, 0]
    as P[0] = 1 because the 0th element of A appears at B[1], and P[1] = 4 
    because the 1st element of A appears at B[4], and so on.
"""

def anagramMappings(A, B):
        """
        :type A: List[int]
        :type B: List[int]
        :rtype: List[int]
        """

        results = []
        mapping = {}
        
        for indexB, valueB in enumerate(B):
            mapping[valueB] = indexB

        for indexA in A:
            results.append(mapping[indexA])

        print(results)

def main():
    A = [40, 40]
    B = [40, 40]

    anagramMappings(A, B)

main()


        