PC = 0
SP = 5

operation_size = 2


memory_stack = [0] * 10
register = [0] * 10

register[7] = 5

reg1 = 12
reg2 = 23
reg3 = 0
reg7 = 5
SP = 7
# PUSH, 2
<<<<<<< HEAD
register[SP] -= 1 # step 1
=======
register[SP] -= 1  # step 1
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
memory_stack[register[SP]] = register[2]  # step 2

# POP, 3
register[3] = memory_stack[register[SP]]  # step 1
<<<<<<< HEAD
register[SP] += 1 # Step 2
=======
register[SP] += 1  # Step 2
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


PC += operation_size
