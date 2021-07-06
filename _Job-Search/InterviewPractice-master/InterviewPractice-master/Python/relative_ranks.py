def findRelativeRanks(nums):
    """
    :type nums: List[int]
    :rtype: List[str]
    """

    numssort = nums[:]
    numssort.sort()
    numssort = numssort[::-1]

    results = []

    for i in nums:

        j = numssort.index(i) + 1

        if j == 1:
            results.append("Gold Medal")
        elif j == 2:
            results.append("Silver Medal")
        elif j == 3:
            results.append("Bronze Medal")
        else:
            results.append(str(j))

    return results

def main():
    nums = [5, 4, 3, 2, 1]

    print(findRelativeRanks(nums))

main()
