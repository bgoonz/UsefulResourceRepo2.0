import sys
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# lets build up our simulator some more
# now we will add the concept of registers
# and an add opcode, using external files for program code

# let's make a simple data driven machine!!!
HALT = 1
PRINT_TOM = 2
PRINT_NUM = 3
SAVE = 4
PRINT_REG = 5
ADD = 6
MUL = 7
SUB = 8
DIV = 9
IDIV = 10


# lets make a model of memory to hold our program
memory = [0] * 128

register = [0] * 8

# lets load a program in to memory
def load_memory(filename):
    try:
        address = 0

        with open(filename) as f:
            for line in f:
                # split before comment
<<<<<<< HEAD
                comment_split = line.split('#')
=======
                comment_split = line.split("#")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

                # convert to a number splitting and stripping
                num = comment_split[0].strip()

<<<<<<< HEAD
                if num == '':
                    continue  # ignore blank lines
                
                val = int(num, 2)
                
=======
                if num == "":
                    continue  # ignore blank lines

                val = int(num, 2)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                # store val in memory at the given address
                memory[address] = val

                address += 1

    except FileNotFoundError:
        print(f"{sys.argv[0]}: {filename} not found!")
        sys.exit(2)


# think about keeping track where we are currently in mem to fetch the next instruction
pc = 0
# are we actually running
running = True
op_size = 0

# Main entrypoint

# grab any args
if len(sys.argv) != 2:
    print("usage: simple1.py <filename>")
    sys.exit(1)


# load the memory
load_memory(sys.argv[1])
# REPL
# lets make a running loop...
while running:
    # extract a command maybe?
    # FETCH
    command = memory[pc]

    # lets check what command has been fetched
    # DECODE
    if command == HALT:
        # EXECUTE
        running = False
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    elif command == PRINT_TOM:
        # EXECUTE
        print("Tom")
        op_size = 1

    elif command == PRINT_NUM:
        num = memory[pc + 1]
        print(num)
        op_size = 2

    elif command == SAVE:
        num = memory[pc + 1]
        reg = memory[pc + 2]
        register[reg] = num
        op_size = 3

    elif command == PRINT_REG:
        reg = memory[pc + 1]
        print(register[reg])
        op_size = 2

    # handle ADD opcode
    elif command == ADD:
        reg_a = memory[pc + 1]
        reg_b = memory[pc + 2]
        register[reg_a] += register[reg_b]
        op_size = 3

    # handle SUB opcode
    elif command == SUB:
        reg_a = memory[pc + 1]
        reg_b = memory[pc + 2]
        register[reg_a] -= register[reg_b]
        op_size = 3

    # handle MUL opcode
    elif command == MUL:
        reg_a = memory[pc + 1]
        reg_b = memory[pc + 2]
        register[reg_a] *= register[reg_b]
        op_size = 3

    # handle DIV opcode
    elif command == DIV:
        reg_a = memory[pc + 1]
        reg_b = memory[pc + 2]
        register[reg_a] /= register[reg_b]
        op_size = 3
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # handle IDIV opcode
    elif command == IDIV:
        reg_a = memory[pc + 1]
        reg_b = memory[pc + 2]
        register[reg_a] //= register[reg_b]
        op_size = 3

<<<<<<< HEAD
    
=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    else:
        print(f"Invalid Instruction: {command}")
        running = False

    # how will we move forward in memory to grab the next command?
<<<<<<< HEAD
    pc += op_size
=======
    pc += op_size
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
