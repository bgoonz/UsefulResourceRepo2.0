<<<<<<< HEAD
it = [2,3,5,6,7]
# O(1)

def constant_time(items):
    result = items[0] * items[4] #O(1)
    print(result) # O(1)
    # O(4) Constant time operation O(1)

=======
it = [2, 3, 5, 6, 7]
# O(1)


def constant_time(items):
    result = items[0] * items[4]  # O(1)
    print(result)  # O(1)
    # O(4) Constant time operation O(1)


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
constant_time(it)

# O(n)

<<<<<<< HEAD
def linear_time(items):
    for item in items: # O(n) * O(1)
        print(item) # O(1)
    for item in items: # O(n) * O(1)
        print(item) # O(1)
=======

def linear_time(items):
    for item in items:  # O(n) * O(1)
        print(item)  # O(1)
    for item in items:  # O(n) * O(1)
        print(item)  # O(1)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

linear_time(it)

# O(n^2)
def quadratic_time(items):
<<<<<<< HEAD
    for item in items: # O(n) * O(n) = O(n^2)
        for item2 in items: # O(n) * O(1)
            print(item, ' ', item2) # O(1)

# chalenge. What is the complexity of this algorithm? = O(n)

def complex_algo(items):

    for _ in range(5):
        print ("Python is awesome")
=======
    for item in items:  # O(n) * O(n) = O(n^2)
        for item2 in items:  # O(n) * O(1)
            print(item, " ", item2)  # O(1)


# chalenge. What is the complexity of this algorithm? = O(n)


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
# factorial
# O(n)
def fact(n):
<<<<<<< HEAD
    product = 1 # O(1)
    # loop over a range 
    for i in range(n): # O(n) * O(1)
        # multiply the range by the product and assign the result to the product
        product = product * (i + 1) # O(1)
    # return the product
    return product # O(1)
=======
    product = 1  # O(1)
    # loop over a range
    for i in range(n):  # O(n) * O(1)
        # multiply the range by the product and assign the result to the product
        product = product * (i + 1)  # O(1)
    # return the product
    return product  # O(1)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# O(n)
def fact_r(n):
    # base case
<<<<<<< HEAD
    if n == 0: # O(1)
        return 1 # O(1)
    # recursive call
    return n * fact_r(n - 1) # O(n)
=======
    if n == 0:  # O(1)
        return 1  # O(1)
    # recursive call
    return n * fact_r(n - 1)  # O(n)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

def times_table(n):
    table = []

    for i in range(n):
        row = []

        for j in range(n):
            row.append(j * i)
<<<<<<< HEAD
    
        table.append(row)

    return table

        
=======

        table.append(row)

    return table
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
