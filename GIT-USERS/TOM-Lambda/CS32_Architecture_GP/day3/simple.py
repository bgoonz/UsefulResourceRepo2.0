# Let's build a data driven machine!
import sys
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# What do we need to have our machine working?
"""
- Some sort of memory
- Some way of stopping operation
- Some way of keeping the CPU running
- Some sort of storage for local variables seperate from main RAM (memory) eg; Registers
- Some sort of operations that can be performed such as (printing something, saving data to a variable[register] )
- Some FETCH, DECODE, EXECUTE CYCLE

"""

# Operations that we can perform
HALT = 1
PRINT_VLAD = 2
PRINT_NUM = 3
SAVE = 4
PRINT_REG = 5
ADD = 6
# TODO: PUSH and POP
PUSH = 7
POP = 8
SUB = 23
LDI = 0b10000010
PRN = 0b01000111

# some sort of memory (lets refactor this to load in opcodes from a file)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def load_memory(filename):
    # TODO do some logic here
    try:
        address = 0
        with open(filename) as f:
            for line in f:
                comment_split = line.split("#")
                n = comment_split[0].strip()

<<<<<<< HEAD
                if n == '':
=======
                if n == "":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                    continue

                val = int(n, 2)
                # store val in memory
                memory[address] = val

                address += 1

                # print(f"{x:08b}: {x:d}")

    except FileNotFoundError:
        print(f"{sys.argv[0]}: {filename} not found")
        sys.exit(2)


memory = [0] * 256


# keep track of running?
running = True

# some sort of counter
pc = 0
# Some local var holders [registers]
registers = [0] * 10

# TODO: Stack Pointer (R7) as per specs
<<<<<<< HEAD
# index of the registers list 
=======
# index of the registers list
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# SP
SP = 7

# to use to store where the top of the stack is
# 0xF4 (244)
registers[SP] = 244

# size of opcode
op_size = 1

# grab any args
if len(sys.argv) != 2:
    print("usage: simple.py filename")
    sys.exit(1)
# load opcodes in to memory
load_memory(sys.argv[1])


# REPL to run once per cycle of CPU
# inside this we will have our FETCH, DECODE, EXECUTE CYCLE
while running:
    # FETCH
    cmd = memory[pc]

    # DECODE
    if cmd == PRINT_VLAD:
        # EXECUTE
        print("Vlad")
        op_size = 1
    elif cmd == HALT:
        running = False
    elif cmd == PRINT_NUM:
        num = memory[pc + 1]
        print(num)
        op_size = 2
    elif cmd == PRINT_REG:
        index_of_reg = memory[pc + 1]
        num_at_reg = registers[index_of_reg]
        print(num_at_reg)
        op_size = 2
    elif cmd == SAVE:
<<<<<<< HEAD
        num_to_save = memory[pc + 1] # 300
=======
        num_to_save = memory[pc + 1]  # 300
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        reg_index = memory[pc + 2]

        registers[reg_index] = num_to_save

        op_size = 3
    elif cmd == ADD:
        reg_index_a = memory[pc + 1]
        reg_index_b = memory[pc + 2]
        registers[reg_index_a] += registers[reg_index_b]

        op_size = 3

    elif cmd == SUB:
        reg_index_a = memory[pc + 1]
        reg_index_b = memory[pc + 2]
        registers[reg_index_a] -= registers[reg_index_b]

        op_size = 3
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # PUSH
    elif cmd == PUSH:
        # setup
        reg_index = memory[pc + 1]
        val = registers[reg_index]

        # decrememt Stack Pointer
        registers[SP] -= 1

        # insert val on to the stack
        memory[registers[SP]] = val

        op_size = 2

    # TODO: POP
    elif cmd == POP:
        # setup
        reg_index = memory[pc + 1]
        val = memory[registers[SP]]

        # take value from stack and put it in reg
        registers[reg_index] = val

        # increment Stack Pointer
        registers[SP] += 1

        op_size = 2

    else:
        print(f"Invalid Instruction: {cmd}")
        running = False

<<<<<<< HEAD

    pc += op_size
=======
    pc += op_size
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
