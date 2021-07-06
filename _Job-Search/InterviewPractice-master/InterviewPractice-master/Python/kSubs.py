def kSub(k, nums):

    counter = 0
    n = len(nums)
    i = 0
    j = 0

    while i < n:
        sum = 0
        while j < n:
            sum = sum + nums[i]
            if (sum % k == 0):
                counter += 1

            j += 1

        i += 1

    return counter


def main():


    kSub()