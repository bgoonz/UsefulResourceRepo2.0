import time
import hashlib
import bcrypt
import math


n = 1000000
key = b"STR"

print(f"Hashing {n}x")

start_time = time.time()
for i in range(n):
    hash(key)
end_time = time.time()
<<<<<<< HEAD
print (f"  Python hash runtime: {end_time - start_time} seconds")
=======
print(f"  Python hash runtime: {end_time - start_time} seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


start_time = time.time()
for i in range(n):
    hashlib.sha256(key)
end_time = time.time()
<<<<<<< HEAD
print (f"  SHA256 hash runtime: {end_time - start_time} seconds")


n=10
=======
print(f"  SHA256 hash runtime: {end_time - start_time} seconds")


n = 10
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
print(f"\nHashing {n}x")
salt = bcrypt.gensalt()
start_time = time.time()
for i in range(n):
<<<<<<< HEAD
    bcrypt.hashpw(b"KEY",salt)
end_time = time.time()
print (f"  bcrypt hash runtime: {end_time - start_time} seconds")
=======
    bcrypt.hashpw(b"KEY", salt)
end_time = time.time()
print(f"  bcrypt hash runtime: {end_time - start_time} seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
