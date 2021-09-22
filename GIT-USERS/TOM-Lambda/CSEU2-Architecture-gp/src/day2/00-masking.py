# lets talk about bitshifting

a = 8
b = 2

print(a << b)
print(a * (2 ** b))


#       AABCDDDD

LDI = 0b10000010

LDI                      1
2 <--- operand_1         1
10 <--- operand_2        1
3
cpu.pc += 3
OPERANDS = LDI >> 6
INCREMENT_PC = OPERANDS + 1

cpu.pc += INCREMENT_PC


# ls8

IR = 0b1000010

add_to_pc = (IR >> 6) + 1

if IR == LDI:
    # do the operation
elif IR  == ADD:
    # do the add stuff

cpu.pc += add_to_pc



