"""
Given a value (a) and an exponent (b), compute the value of a^b

1. Understand
- What types of inputs can we expect?
    - Valid
        - Integer
    - Invalid
        - Decimal
        - String
        - Char

2. Plan
- Iterative or recursive approach?
    - First pass
        - Iterative
    - Second Pass
        - Recursive
        - Third Pass
        - Forth Pass?
"""

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def power(a, b):
    # store a result
    result = 1

    # iterate while exponent (b) is greater than 0
    while b > 0:
        # multiply the result by the value (a)
        result *= a
        # decrement the exponent (b)
        b -= 1
<<<<<<< HEAD
    
    # return the result to the caller
    return result

print(power(4, 2)) # => 16
=======

    # return the result to the caller
    return result


print(power(4, 2))  # => 16
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
        # return 1 / power_r(a, -b)

<<<<<<< HEAD
print(power_r(4, 2)) # => 16
print(power_r(8, -1)) # => 0.125
print(power_r(2, "supercalafragialisticexpialodocious")) # => Exponent (b) must be and integer
=======

print(power_r(4, 2))  # => 16
print(power_r(8, -1))  # => 0.125
print(
    power_r(2, "supercalafragialisticexpialodocious")
)  # => Exponent (b) must be and integer
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
