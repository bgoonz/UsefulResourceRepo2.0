# Factorial https://www.mathsisfun.com/numbers/factorial.html

# hacky way. try not to do this
import sys
<<<<<<< HEAD
sys.setrecursionlimit(5001) # its over 5000!!!!
import time

def rec_factorial(n): # O(n)
=======

sys.setrecursionlimit(5001)  # its over 5000!!!!
import time


def rec_factorial(n):  # O(n)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # base case
    if n <= 1:
        return 1
    else:
        # return n * call function of n - 1
<<<<<<< HEAD
        return n * rec_factorial(n - 1) # O(n)
=======
        return n * rec_factorial(n - 1)  # O(n)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

def iter_factorial(n):
    # challenge
    pass


# Tests
print("Recursive")
<<<<<<< HEAD
print(rec_factorial(4))# => 24
print(rec_factorial(7))# => 5040
print(rec_factorial(1))# => 1
print(rec_factorial(2010))

print("Iterative")
print(iter_factorial(4)) # => 24
print(iter_factorial(7)) # => 5040
print(iter_factorial(1)) # => 1
=======
print(rec_factorial(4))  # => 24
print(rec_factorial(7))  # => 5040
print(rec_factorial(1))  # => 1
print(rec_factorial(2010))

print("Iterative")
print(iter_factorial(4))  # => 24
print(iter_factorial(7))  # => 5040
print(iter_factorial(1))  # => 1
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
