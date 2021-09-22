# 01  hash table collisions
# How many before collision
import random

<<<<<<< HEAD
def how_many_before_collision(buckets, loops=1):
    '''
=======

def how_many_before_collision(buckets, loops=1):
    """
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    Roll random hash indexes into `buckets` and print
    how many rolls before a hash collision.

    Run `loops` number of times.
<<<<<<< HEAD
    '''
=======
    """
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # loop over loops range
    for _ in range(loops):
        # track the tries count
        tries = 0
        # get a set of tried data
        tried = set()
        # loop until break
        while True:
            # generate a random key
            random_key = str(random.random())
            # set the hashed index
            hash_index = hash(random_key) % buckets
            # check if hashed index is not in the tried set
            if hash_index not in tried:
                # add the hashed index to the tried set
                tried.add(hash_index)
                # and increment tries count
                tries += 1
            # otherwise
            else:
                # break out of the loop
                break
        # output data
<<<<<<< HEAD
        print(f"{buckets} buckets, {tries} hashes before collision. ({tries / buckets * 100:.1f}%)")
=======
        print(
            f"{buckets} buckets, {tries} hashes before collision. ({tries / buckets * 100:.1f}%)"
        )

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# Test Code
how_many_before_collision(32, 10)
how_many_before_collision(1024, 10)
how_many_before_collision(2048, 10)
<<<<<<< HEAD
how_many_before_collision(4096, 10)
=======
how_many_before_collision(4096, 10)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
