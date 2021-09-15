# lets make a simple hash function that takes in an abitary string and output the bytes of that string


# first lets see what output we get when iterating over the string

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def my_hash(s):
    for c in s:
        print(c)

<<<<<<< HEAD
# so how can we turn each char in to a number?
# let's make a plan and explore this

=======

# so how can we turn each char in to a number?
# let's make a plan and explore this


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def my_hash2(s):
    nums = s.encode()
    for b in nums:
        print(b)


# now one ster further lets thing of a deterministic way to make a number to represent the entire string

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def my_hash3(s):
    nums = s.encode()
    sum = 0

    for b in nums:
        sum += b
<<<<<<< HEAD
        sum &= 0xffffffff # clamp to 32 bits
=======
        sum &= 0xFFFFFFFF  # clamp to 32 bits
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    return sum


# my_hash("Hello")
# my_hash2("Hello")
<<<<<<< HEAD
# print(my_hash2("Hello")) 
print(my_hash3("Hello")) # 500
print(my_hash3("Hello")) # 500
print(my_hash3("Hello")) # 500
print(my_hash3("World")) # 520
print(my_hash3("World")) # 520
print(my_hash3("World")) # 520
=======
# print(my_hash2("Hello"))
print(my_hash3("Hello"))  # 500
print(my_hash3("Hello"))  # 500
print(my_hash3("Hello"))  # 500
print(my_hash3("World"))  # 520
print(my_hash3("World"))  # 520
print(my_hash3("World"))  # 520
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
