# lets build up our simulator some more
# now we will add the concept of registers

import sys

HALT = 1
PRINT_TOM = 2
PRINT_NUM = 3
SAVE = 4
PRINT_REG = 5
ADD = 6
PUSH = 7
POP = 8


<<<<<<< HEAD


=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# flags

# program counter
pc = 0

# memory
<<<<<<< HEAD
memory = [0] * 128 # 128 bytes of RAM

# registers
register = [0] * 8 # list of 8 registers
SP = 7 # Stack pointer R7
=======
memory = [0] * 128  # 128 bytes of RAM

# registers
register = [0] * 8  # list of 8 registers
SP = 7  # Stack pointer R7
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# state (running)
running = True

# Helper Functions

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def load_memory(filename):
    try:
        address = 0
        with open(filename) as f:
            for line in f:
                # deal with comments
                # split before and after any comment symbol '#'
                comment_split = line.split("#")

                # convert the pre-comment portion (to the left) from binary to a value
                # extract the first part of the split to a number variable
                # and trim whitespace
                num = comment_split[0].strip()

                # ignore blank lines / comment only lines
                if len(num) == 0:
                    continue

                # set the number to an integer of base 2
                value = int(num, 2)
                # print the value in binary and in decimal
                # uncomment for debugging: print(f"{value:08b}: {value:d}")
<<<<<<< HEAD
                
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                # add the value in to the memory at the index of address
                memory[address] = value

                # increment the address
                address += 1

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    except FileNotFoundError:
        print(f"{sys.argv[0]}: {sys.argv[1]} not found")
        sys.exit(2)


<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# Main entry

if len(sys.argv) != 2:
    print("usage: simple04.py filename")
    sys.exit(1)

load_memory(sys.argv[1])

# REPL (FETCH, DECODE, EXECUTE)

while running:
    # FETCH
    command = memory[pc]

    # DECODE
    if command == PRINT_TOM:
        # EXECUTE
        instruction_size = 1
        print("Tom")
<<<<<<< HEAD
 
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # DECODE
    elif command == HALT:
        # EXECUTE
        instruction_size = 1
        running = False

    # DECODE
    elif command == PRINT_NUM:
        # EXECUTE
        instruction_size = 2
        num = memory[pc + 1]
        print(num)
<<<<<<< HEAD
  
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # DECODE
    elif command == SAVE:
        # EXECUTE
        instruction_size = 3
        num = memory[pc + 1]
        reg = memory[pc + 2]
        register[reg] = num
<<<<<<< HEAD
  
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # DECODE
    elif command == ADD:
        # EXECUTE
        instruction_size = 3
        reg_a = memory[pc + 1]
        reg_b = memory[pc + 2]
        register[reg_a] += register[reg_b]

    # DECODE
    elif command == PRINT_REG:
        # EXECUTE
        instruction_size = 2
        reg = memory[pc + 1]
        print(register[reg])
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # DECODE
    elif command == PUSH:
        # EXECUTE
        # SETUP
        instruction_size = 2
        reg = memory[pc + 1]
        val = register[reg]

        # PUSH
        register[SP] -= 1
        memory[register[SP]] = val

    # DECODE
    elif command == POP:
        # EXECUTE
        # SETUP
        instruction_size = 2
        reg = memory[pc + 1]
        val = memory[register[SP]]

        # POP
        register[reg] = val
        register[SP] += 1

<<<<<<< HEAD



=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # DECODE (ERROR)
    else:
        # EXECUTE
        print(f"Unknown Instruction {command}")
        sys.exit(1)

    pc += instruction_size
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
