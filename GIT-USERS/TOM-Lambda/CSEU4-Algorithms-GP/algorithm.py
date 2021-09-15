# add 1
"""
1. Take input from caller (num): an integer
- if the input can not be cast to int then throw an exception and gracefully exit function
2. set output to (num plus 1)
3. return output to caller
"""

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def add_one(num):
    try:
        output = int(num) + 1
        return output
    except:
        # print("Value Error input int")
        return f"ERROR: {num} is not an integer: Please input an integer"

<<<<<<< HEAD
# test
print(add_one(4)) # => 5
print(add_one(15)) # => 16
print(add_one(40)) # => 41
name = add_one("65") # => 65 + 1
print(name) # => 66
=======

# test
print(add_one(4))  # => 5
print(add_one(15))  # => 16
print(add_one(40))  # => 41
name = add_one("65")  # => 65 + 1
print(name)  # => 66
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
