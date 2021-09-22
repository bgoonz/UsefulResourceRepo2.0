# SAVE 2 R0
x = 2

# SAVE 4 R1
y = 4

# CALL 11
# PRINT_REG R0


# halt
<<<<<<< HEAD
def add(a, b): # ADD 0, 1
    # ADD R0 R1
    return a + b # RET
=======
def add(a, b):  # ADD 0, 1
    # ADD R0 R1
    return a + b  # RET


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# CALL reg
# store our variables on the stack
r0 = add(x, y)
# RET
# store our variables in registers R0 R1

# return value can be stored in a register R0

print(r0)
"""
SAVE
2
0
SAVE
4
1
SAVE
14
3
CALL <- pc == 9 => set pc to 14
3
PRINT_REG <-- pc
0
HALT
ADD 
0
1
RET <-- pc = 11


EAX <= return values are stored here , EBX, ECX
STACK
-----

<<<<<<< HEAD
"""
=======
"""
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
