# # lets talk about bitshifting
# # Example of shifting LDI right by 6 bits:
# #
# # 10000010
# # 01000001
# # 00100000
# # 00010000
# # 00001000
# # 00000100
# # 00000010

# #  00000010
# #
# # The result is 0b10 or 2, the number of operands for LDI.
# """
# AABCDDDD
# 10000010 => 130
# 11000000 &
# ----------
# 10000000 = > 128

# 10000000 >> 6

# 00000010 => 2 => number of operands

# inc_pc? = 1 + number of operands


# """
# 128 + 2 = 130
# LDI = 0b10000010
# ADD = 0b00000000
# # 000000AA
# operand_size = LDI >> 6
# operand_size == 0b00000010 # => 2
# add_to_pc = operand_size + 1

# # FETCH
# ir = 0b10000010

# # DECODE
# instruction_length = (ir >> 6) + 1

# if IR == LDI:
#     # do the ldi thing
#     add_to_pc = 3
#     pass
# elif IR == ADD:
#     # do the add thing
#     pass

<<<<<<< HEAD
# cpu.pc += add_to_pc
=======
# cpu.pc += add_to_pc
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
