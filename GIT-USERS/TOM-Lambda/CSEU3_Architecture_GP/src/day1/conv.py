# In general, the `.format` method is considered more modern than the printf `%`
# operator.

# num = 123

# # Printing a value as decimal

# print(num)                     # 123
# print("%d" % num)              # 123
# print("{:d}".format(num))      # 123

# # Printing a value as hex

# print(hex(num))                # 0x7b
# print("%x" % num)              # 7b
# print("%X" % num)              # 7B
# print("%04X" % num)            # 007B
# print(f"{num:x}")      # 7b
# print(f"{num:X}")      # 7B
# print(f"{num:04x}")    # 007b

# # Printing a value as binary

# print("{num:b}".format(num))      # 1111011, format method

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

string1 = "10101010"

# [1, 0, 1, 0, 1, 0, 1, 0]
# [0, 1, 0, 1, 0, 1, 0, 1]

# digit_list[i] == 0
# + 0 * 1
# 0
# + 1 * 2
# 2
# 128 + 32 + 8 + 2


def to_decimal(num_string, base):
    # convert the string to a list
    digit_list = list(num_string)
    # reverse the list of digits
    digit_list.reverse()

    # set a starting value at zero
    value = 0

    # loop over the list...
    for i in range(len(digit_list)):
        # print the conversion for debug
        print(f"+({int(digit_list[i])} * {base ** i})")
        # increment value by (digit at index) * (base ^ index)
        value += int(digit_list[i]) * (base ** i)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # return value
    return value


<<<<<<< HEAD
print(to_decimal(string1, 2))
=======
print(to_decimal(string1, 2))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
