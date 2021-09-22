# O(c) / o(1)
def constant_algo(items):
<<<<<<< HEAD
    result = items[0] * items[0] # O(1)
    print (result) # O(1)
=======
    result = items[0] * items[0]  # O(1)
    print(result)  # O(1)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # O(2)
    # O(1)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
constant_algo([4, 5, 6, 8])

# O(n)
def linear_algo(items):
    for item in items:
        print(item)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
linear_algo([4, 5, 6, 8])

# What is the big O of this ??
# O(n) --> linear
def linear_algo_2(items):
    for item in items:
        print(item)
    for item in items:
        print(item)


linear_algo_2([4, 5, 6, 8])


# O(n^2)
def quadratic_algo(items):
    for item in items:
        for item2 in items:
<<<<<<< HEAD
            print(item, ' ' ,item2)
=======
            print(item, " ", item2)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

quadratic_algo([4, 5, 6, 8])

# chalenge. What is the complexity of this algorithm?

<<<<<<< HEAD
def complex_algo(items):

    for _ in range(5):
        print ("Python is awesome")
=======

def complex_algo(items):

    for _ in range(5):
        print("Python is awesome")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    for item in items:
        print(item)

    for item in items:
        print(item)

    print("Big O")
    print("Big O")
    print("Big O")

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
complex_algo([4, 5, 6, 8])

# itterative solution
def fact(n):
    product = 1
<<<<<<< HEAD
    for i in range(n): # O(n)
        product = product * (i + 1)
    return product

=======
    for i in range(n):  # O(n)
        product = product * (i + 1)
    return product


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# recursive solution
def fact_r(n):
    if n == 0:
        return 1
<<<<<<< HEAD
    return n * fact_r(n - 1) # o(n)

=======
    return n * fact_r(n - 1)  # o(n)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
