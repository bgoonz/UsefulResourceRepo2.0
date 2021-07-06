def remove_instance(nums, val):
    """
    Given an array nums, and a value val, returns the new length of the array with the value removed
    i.e. the number of items in nums with val
    Input: nums=[5, 2, 2, 5, 3]  and   val = 5
    Output: 3
    """
    try:
        #check for cases of an empty array
        if len(nums) == 0:
            return 0
        else:
            count=0
            for i in nums:
                if i != val:
                    count +=1
            return count
    except:
        return 0