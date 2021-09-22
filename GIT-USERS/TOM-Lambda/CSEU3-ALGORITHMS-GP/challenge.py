<<<<<<< HEAD

# Challenge What is the runtime complexity of this function

=======
# Challenge What is the runtime complexity of this function


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def power_r(a, b):
    # Error checking
    # try to cast our exponent to an int
    try:
        _ = int(b)
    # exception on fail with error message
    except ValueError:
        print("Exponent (b) must be and integer")
        # and return
        return

    # base case
    # anything raised to the power of 0 will be one
    if b == 0:
        return 1
    # positive case if b is greater than zero
<<<<<<< HEAD
    elif b > 0:   
=======
    elif b > 0:
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # Recursive case
        # Call the function on b - 1
        return a * power_r(a, b - 1)
    # Recursive negative exponent
    else:
        # return 1 divided by a multiplied by the function with -b - 1
        return 1 / (a * power_r(a, -b - 1))
        # or return 1 divided by function with -b
<<<<<<< HEAD
        # return 1 / power_r(a, -b)
=======
        # return 1 / power_r(a, -b)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
