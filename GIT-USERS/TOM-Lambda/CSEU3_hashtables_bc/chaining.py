import random

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def longest_ll_chain(keys, buckets, loop=10, useSHA=False):
    # create a dictionary to hold the counts
    key_counts = {}

    # set all counts to zero
    for i in range(buckets):
        key_counts[i] = 0

    # generate some hashed keys and make some possible collisions
    for i in range(keys):
        random_key = str(random.random())
        hash_index = hash(random_key) % buckets
        key_counts[hash_index] += 1
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # set the largest chain to zero
    largest_n = 0

    # iterate over the keys
    for key in key_counts:
        # check if the chain is grater than the largest chain
        if key_counts[key] > largest_n:
            # then swap the chain numbers
            largest_n = key_counts[key]
<<<<<<< HEAD
    
    print(f"Longest LL Chain for {keys} keys in {buckets} buckets (Load Factor: {keys / buckets:.2f}: {largest_n}")
=======

    print(
        f"Longest LL Chain for {keys} keys in {buckets} buckets (Load Factor: {keys / buckets:.2f}: {largest_n}"
    )
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


# test code
longest_ll_chain(4, 16, 5)
longest_ll_chain(16, 16, 5)
longest_ll_chain(32, 16, 5)
longest_ll_chain(1024, 128, 5)
longest_ll_chain(700000, 1000000, 1)
