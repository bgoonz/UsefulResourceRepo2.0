"""
Naive Recursive Fibonacci

Key Points
    * You're probably going to get tired of seeing Fibonacci.  It's like fizzbuzz; you're expected to know it by heart
    * It's also useful; you can solve many combination/permutation problems with similar code
    * This is an example of a naive approach - solving the problem with the first thing that comes to mind that's simple, or even child-like


the Fibonacci sequence is well known and shows up regularly in nature, math, and fiction.

It's calculated simply by starting with 0 and 1, then adding the last two numbers together to get the next one:

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

If we dig in a little deeper, we can see how recursion might be an excellent way to solve this.  What's the 10th Fibonacci number?

It's the 9th Fibonacci number plus the 8th.

What's the 9th?  Well, it's the 8th plus the 7th, and so on.

Eventually, we arrive at the 0th and 1st numbers, which are defined as 0 and 1.  Because this is the smallest version of the problem, 
with an arbitrary or defined answer, this is the base case.

We can use this understanding to plan our approach via pseudocode:
"""
#  0  1   2  3  4  5  6
# [0, 1], 1, 2, 3, 5, 8
# f(n) = (f(n - 1) + f(n - 2))


# print the nth fib number
# def recursive_fib(n):
#     # base case
#     # if n is 0
#     # return 0
#     # if n is 1
#     # return 1

#     # if we're not on the base case
#     # return recursion of n-1 + n-2

"""
From here, we can code that solution.  
We'll break out the recursive calls and save them into variables so we can more easily follow the call stack in the debugger.
"""

# # print the nth fib number
def recursive_fib(n):
    # base case
    # test for negatives (TODO)
    # if n is 0
    if n == 0:
        return 0
    # return 0
    # if n is 1
    if n == 1:
        return 1
    # return 1

    # if we're not on the base case
    # return recursion of n-1 + n-2
<<<<<<< HEAD
    n_minus_1 = recursive_fib(n-1)
    n_minus_2 = recursive_fib(n-2)
    return n_minus_1 + n_minus_2


print(recursive_fib(38)) # => 8
=======
    n_minus_1 = recursive_fib(n - 1)
    n_minus_2 = recursive_fib(n - 2)
    return n_minus_1 + n_minus_2


print(recursive_fib(38))  # => 8
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

<<<<<<< HEAD
fib[9]
=======
fib[9]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
