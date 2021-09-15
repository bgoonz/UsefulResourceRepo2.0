# operational codes
PRINT_TOM = 1
HALT = 2
PRINT_NUM = 3
SAVE = 4
PRINT_REG = 5
ADD = 6

# memory
memory = [
    PRINT_TOM,
    SAVE,
    23,
    2,
    SAVE,
    10,
    3,
<<<<<<< HEAD
    ADD, # R2 += R3
=======
    ADD,  # R2 += R3
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    2,
    3,
    PRINT_TOM,
    PRINT_REG,
    2,
    PRINT_TOM,
<<<<<<< HEAD
    HALT
=======
    HALT,
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
]


# some registers
pc = 0
<<<<<<< HEAD
registers = [0] * 8 # r0 - r7
=======
registers = [0] * 8  # r0 - r7
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
running = True
# a REPL
op_size = 1
while running:
    # fetch
    command = memory[pc]

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # decode
    if command == PRINT_TOM:
        # execute
        print("Tom")
        op_size = 1
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # decode
    elif command == SAVE:
        # execute
        num = memory[pc + 1]
<<<<<<< HEAD
        reg_index =  memory[pc + 2]
=======
        reg_index = memory[pc + 2]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        registers[reg_index] = num

        op_size = 3

    # decode
    elif command == ADD:
        # execute
        reg_index_a = memory[pc + 1]
<<<<<<< HEAD
        reg_index_b =  memory[pc + 2]
=======
        reg_index_b = memory[pc + 2]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        registers[reg_index_a] += registers[reg_index_b]

        op_size = 3
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # decode
    elif command == PRINT_NUM:
        # execute
        num = memory[pc + 1]
        print(num)
        op_size = 2

    # decode
    elif command == PRINT_REG:
        # execute
        reg_index = memory[pc + 1]
        print(registers[reg_index])
        op_size = 2
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # decode
    elif command == HALT:
        # execute
        running = False
        op_size = 1
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    else:
        print(f"invalid instruction [{memory[pc]}]")
        running = False
        op_size = 1

    pc += op_size

# Fetch -> docde -> execute
