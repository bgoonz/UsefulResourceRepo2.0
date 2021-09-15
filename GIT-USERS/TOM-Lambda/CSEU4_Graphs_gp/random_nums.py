import random
<<<<<<< HEAD
=======


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def random_counts(n):
    """
    Generates n random numbers between 1-10 and counts how many of each there are.
    """
<<<<<<< HEAD
    counts = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0}
    nums = [random.randint(1,10) for i in range(1,n)]
=======
    counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}
    nums = [random.randint(1, 10) for i in range(1, n)]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    for i in nums:
        counts[i] += 1
    return counts

<<<<<<< HEAD
print(random_counts(40))
=======

print(random_counts(40))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
