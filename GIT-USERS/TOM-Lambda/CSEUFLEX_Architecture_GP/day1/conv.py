# In general, the `.format` method is considered more modern than the printf `%`
# operator.

# num = 123

# # Printing a value as decimal

# print(num)                     # 123
# print("%d" % num)              # 123
# print("{:d}".format(num))      # 123
# print(f"{num:d}")              # 123

# # Printing a value as hex

# print(hex(num))                # 0x7b
# print("%x" % num)              # 7b
# print("%X" % num)              # 7B
# print("%04X" % num)            # 007B
# print(f"{num:x}")      # 7b
# print(f"{num:X}")      # 7B
# print(f"{num:04x}")    # 007b

# # Printing a value as binary

# print("{:b}".format(num))      # 1111011, format method

"""
take input as a string
1111011
take input string 
7b

turn in to a list
[1, 1, 1, 1, 0, 1, 1]
[7, b]

reverse the list
[1, 1, 0, 1, 1, 1, 1]
[b, 7]

multiply each element by its power of 2 respectively
1 * 1
1 * 2
0 * 4
1 * 8
1 * 16
1 * 32
1 * 64

b * 1 => 11
7 * 16 => 112

# taken the numbers and addedthem together
1 + 2 + 0 + 8 + 16 + 32 + 64
3 + 8 + 16 + 32 + 64
11 + 16 + 32 + 64
27 + 32 + 64
59 + 64

11 + 112


# returning a result in decimal
123

123

"""

# # Converting a decimal number in a string to a value

# s = "1234"; # 1234 is 0x4d2
# x = int(s); # Convert base-10 string to value

# # Printing a value as decimal and hex

# print(num)                     # 1234
# print(f"{num:x}")      # 4d2

# # Converting a binary number in a string to a value

# s = "100101"   # 0b100101 is 37 is 0x25
# x = int(s, 2)  # Convert base-2 string to value

# # Printing a value as decimal and hex

# print(num)                     # 37
# print(f"{num:x}")      # 25


# Conversion Python code:

# string1 = "10101010"

# 1 * 128
# 0 * 64
# 1 * 32
# 0 * 16
# 1 * 8
# 0 * 4
# 1 * 2
# 0 * 1

# reverse_string1 = "01010101"


# loop from 0 -> size of list - 1

# index = 0 -> 7
# base = 2
# index ** base
# 0 ** 2 => 1
# 1 ** 2 => 2
# 2 ** 2 => 4
# 3 ** 2 => 8
# 4 ** 2 => 16
# 5 ** 2 => 32
# 6 ** 2 => 64
# 7 ** 2 => 128
# multiplyer = 1 -> 128
# 0 * multiplyer
# 0 * 1 = 0
# 1 * 2 = 2
# 0 * 4 = 0
# 1 * 8 = 8
# 0 * 16 = 0
# 1 * 32 = 32
# 0 * 64 = 0
# 1 * 128 = 128

# value = 0
# value += 0
# value += 2
# value += 0
# value += 8
# value += 0
# value += 32
# value += 0
# value += 128

# ret value => 170

# [1, 0, 1, 0, 1, 0, 1, 0]
# [0, 1, 0, 1, 0, 1, 0, 1]

# digit_list[i] == 0
# + 0 * 1
# 0
# + 1 * 2
# 2
# 128 + 32 + 8 + 2

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def to_decimal(num_string, base):
    # set a starting value
    value = 0
    # convert string in to a list
    digit_string = list(num_string)

    # reverse the list
    digit_string.reverse()

    # iterate over the list
    for i in range(len(digit_string)):
<<<<<<< HEAD
        multiplyer = (base ** i)
=======
        multiplyer = base ** i
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        current_value_at_index = int(digit_string[i], base)

        value += current_value_at_index * multiplyer

    return value

<<<<<<< HEAD
print(to_decimal("7b", 16))  # => 123
print(to_decimal("010111010110101", 2))  # => 123

=======

print(to_decimal("7b", 16))  # => 123
print(to_decimal("010111010110101", 2))  # => 123
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
