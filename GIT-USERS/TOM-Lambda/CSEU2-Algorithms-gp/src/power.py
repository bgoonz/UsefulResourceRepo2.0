# given a value a and exponent b, compute the value of a^b

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def rec_pow(a, b):
    # anything raised to the power of 0 is 1
    if b <= 0:
        return 1
    else:
        # call a multiplied by rec_pow on a and b - 1
        return a * rec_pow(a, b - 1)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
print(rec_pow(2, 8))

# negative exponents

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def n_rec_pow(a, b):
    # anything raised to the power of 0 is 1
    if b == 0:
        return 1
    # positive exponent
    elif b > 0:
        # call a multiplied by rec_pow on a and b - 1
        return a * n_rec_pow(a, b - 1)
    else:
<<<<<<< HEAD
    # negative exponent
=======
        # negative exponent
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # 1 divided by a multiplied by n_rec_pow of a and -b - 1
        return 1 / (a * n_rec_pow(a, -b - 1))
        # 1 divided by n_rec_pow of a and -b


print(n_rec_pow(120, -20))

# error handleing

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def e_rec_pow(a, b):
    # Error checking
    try:
        # try to take value and convert to int
        _ = int(b)
    # otherwise throw and error and catch the exception
    except ValueError:
        print("Exponent (b) must be an integer")
        return
    # anything raised to the power of 0 is 1
    if b <= 0:
        return 1
    else:
        # call a multiplied by rec_pow on a and b - 1
        return a * e_rec_pow(a, b - 1)

<<<<<<< HEAD
print(e_rec_pow(2, "bob"))
=======

print(e_rec_pow(2, "bob"))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
