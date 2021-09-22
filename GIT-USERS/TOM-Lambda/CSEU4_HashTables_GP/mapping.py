<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def my_hash(s):
    # turn the string in to some numbers
    nums = s.encode()
    sum = 0

    for b in nums:
        sum += b

    return sum

<<<<<<< HEAD
hash_table = [None] * 8 # lets start with size 8 as our clamping size
=======

hash_table = [None] * 8  # lets start with size 8 as our clamping size
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# take the hash and turn it in to an index clamped to the size of a list

h = my_hash("Hello")
i = h % len(hash_table)
hash_table[i] = "Some hello value"

h = my_hash("World")
i = h % len(hash_table)
hash_table[i] = "Some World value"

h = my_hash("World")
i = h % len(hash_table)
hash_table[i] = "Some other World value"

# # get value from the hash table at the key
# # O(1)
# h = my_hash("World")
# i = h % len(hash_table)
# v = hash_table[i]
# print(v)

# # get value from the hash table at the key
# # O(1)
# h = my_hash("Frogs")
# print(h)
# i = h % len(hash_table)
# v = hash_table[i]
# print(v)


# delete
h = my_hash("Hello")
i = h % len(hash_table)
hash_table[i] = None

# get value from the hash table at the key
# O(1)
h = my_hash("Hello")
i = h % len(hash_table)
v = hash_table[i]
print(v)
<<<<<<< HEAD
# print(hash_table)
=======
# print(hash_table)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
