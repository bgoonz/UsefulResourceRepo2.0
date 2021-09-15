import sys
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
sys.setrecursionlimit(1000)
n = 40

# use space in a linear format
# while n != 0: # O(n)
#     print(n)
#     n -= 1

# def rec_while(n): # O(n)
#     # base case
#     if n == 0:
#         return
#     # logic that we want to do
#     print(n)
#     rec_while(n - 1)

# rec_while(n)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def fib(n):
    if n < 2:
        return 1
    return fib(n - 1) + fib(n - 2)

<<<<<<< HEAD
print(fib(n))
=======

print(fib(n))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
