# let's make a simple data driven machine!!!
HALT = 1
PRINT_BOB = 2
PRINT_NUM = 3
SAVE = 4
PRINT_REG = 5

# think of some operations that we might want to perform such as print something, load  or store something etc
# maybe some way to stop execution and some arithmetic operations

# lets make a model of memory to hold our program

<<<<<<< HEAD
memory = [
    SAVE,
    65,
    2,
    PRINT_REG,
    2,
    HALT,
    PRINT_BOB
]
=======
memory = [SAVE, 65, 2, PRINT_REG, 2, HALT, PRINT_BOB]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

register = [0] * 8

# think about keeping track where we are currently in mem to fetch the next instruction
pc = 0
# are we actually running
running = True
inc_size = 0
# lets make a running loop...
while running:
    # extract a command maybe?
    # FETCH
    cmd = memory[pc]

    # lets check what command has been fetched
    # DECODE
    if cmd == HALT:
        # EXECUTE
        running = False
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    elif cmd == PRINT_BOB:
        # EXECUTE
        print("Bob")
        inc_size = 1

    elif cmd == PRINT_NUM:
        num = memory[pc + 1]
        print(num)
        inc_size = 2

    elif cmd == SAVE:
        num = memory[pc + 1]
        reg = memory[pc + 2]
        register[reg] = num
        inc_size = 3

    elif cmd == PRINT_REG:
        reg = memory[pc + 1]
        print(register[reg])
        inc_size = 2

<<<<<<< HEAD
    
=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    else:
        print("Invalid Instruction")
        running = False

    # how will we move forward in memory to grab the next command?
<<<<<<< HEAD
    pc += inc_size
=======
    pc += inc_size
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
