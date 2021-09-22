# Runtime of a iterative function
<<<<<<< HEAD
def some_func(n): # O(n)
    if n == 1:
        return
    i = 0
    while i <= n: # O(n) * O(1) + 1 (O(1) * O(n)) => O(n) + 1 => O(n)
=======
def some_func(n):  # O(n)
    if n == 1:
        return
    i = 0
    while i <= n:  # O(n) * O(1) + 1 (O(1) * O(n)) => O(n) + 1 => O(n)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # O(1)
        for _ in range(n):
            print("*")
            break
        i += 1
<<<<<<< HEAD
    
some_func(10) # => O(n) output n + 1 asterisk
=======


some_func(10)  # => O(n) output n + 1 asterisk
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
