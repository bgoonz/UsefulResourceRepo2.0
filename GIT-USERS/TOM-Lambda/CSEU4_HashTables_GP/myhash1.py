<<<<<<< HEAD
hash_table = [None] * 8   # 8 slots, all initiailized to None
=======
hash_table = [None] * 8  # 8 slots, all initiailized to None

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

def my_hash(s):
    sb = s.encode()  # Get the UTF-8 bytes for the string

    sum = 0

    for b in sb:
        sum += b
<<<<<<< HEAD
        sum &= 0xffffffff  # clamp to 32 bits

    return sum

=======
        sum &= 0xFFFFFFFF  # clamp to 32 bits

    return sum


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# hash the index
def hash_index(key):
    h = my_hash(key)
    return h % len(hash_table)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# put
def put(key, val):
    i = hash_index(key)
    if hash_table[i] != None:
        print(f"Collision! Overwriting {repr(hash_table[i])}")
    hash_table[i] = val

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# get
def get(key):
    i = hash_index(key)
    return hash_table[i]

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# delete
def delete(key):
    i = hash_index(key)
    hash_table[i] = None


if __name__ == "__main__":

    put("Hello", "Hello Value")
    put("World", "World Value")
<<<<<<< HEAD
    put("foo", "foo value")   # "foo" hashes to same index as "Hello"
                            # AKA "foo collides with Hello"
=======
    put("foo", "foo value")  # "foo" hashes to same index as "Hello"
    # AKA "foo collides with Hello"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    print(hash_table)

    v = get("Hello")
<<<<<<< HEAD
    print(v) # "Hello Value"
=======
    print(v)  # "Hello Value"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # Get "Frogs" from the table
    # Doesn't exist!
    v = get("Frogs")
    print(v)  # "None"
