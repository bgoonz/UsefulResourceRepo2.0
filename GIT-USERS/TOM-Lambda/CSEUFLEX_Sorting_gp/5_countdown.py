"""
One of the most straightforward problems we can solve recursively is to print every number from n down to zero in succession.
We can do that simply by writing a function that prints n, then calls itself for n-1:
"""
# import sys

# sys.setrecursionlimit(100000000)
def countdown(n):  # label
<<<<<<< HEAD
    if n == 0: # condition
        return
    print(n) # body
    countdown(n - 1)  # decrement

=======
    if n == 0:  # condition
        return
    print(n)  # body
    countdown(n - 1)  # decrement


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# n = 10
# def countdown_i(n):
#     while (n > 0): # condition and label
#         print(n) # body
#         n -= 1 # decrement


countdown(1000000)


<<<<<<< HEAD


















=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# # Base case (note, the base case is not always first)
# def countdown(n):
#     if n == 0:
#         return
#     print(n)
#     countdown(n-1)


<<<<<<< HEAD






=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# """
# Let's explore what happens when we call our recursive function more than once:
# """


# def countdown(n):
#     # Base case (note, the base case is not always first)
#     if n == 0:
#         return
#     print(n)
#     countdown(n-1)
#     countdown(n-1)


<<<<<<< HEAD
   
# countdown(100)
=======
# countdown(100)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
