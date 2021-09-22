import time
import hashlib
import bcrypt

n = 1000000
key = b"STR"

# hash
print("Hash")
start = time.time()
for i in range(n):
    hash(key)
end = time.time()
<<<<<<< HEAD
print(end - start,"Seconds")
=======
print(end - start, "Seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# hashlib
print("Hash Lib SHA256")
start = time.time()
for i in range(n):
    hashlib.sha256(key)
end = time.time()
<<<<<<< HEAD
print(end - start,"Seconds")
=======
print(end - start, "Seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


# TODO: implement djb2

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def djb2(key):
    # start from an arbitrary large prime such as (5381)
    # set the ahs value to 5381
    hash_value = 5381
    # iterate over each char in the key
    for char in key:
<<<<<<< HEAD
        # set the hash value to the bit shift left by 5 of the hash value and sum of the hash value  then add the value for the char 
        hash_value = ((hash_value << 5) + hash_value) + char
    # return the hash value
    return hash_value



=======
        # set the hash value to the bit shift left by 5 of the hash value and sum of the hash value  then add the value for the char
        hash_value = ((hash_value << 5) + hash_value) + char
    # return the hash value
    return hash_value
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
