# lets build up our simulator some more
# now we will add the concept of registers
# lets add some subroutines up in here

import sys

HALT = 1
PRINT_TOM = 2
PRINT_NUM = 3
SAVE = 4
PRINT_REG = 5
ADD = 6
PUSH = 7
POP = 8
CALL = 9
RET = 10

## branch table
# bt = {
#     HALT: op_halt,
#     PRINT_TOM: op_print_tom,
#     PRINT_NUM: op_print_num,
#     SAVE: op_save,
#     PRINT_REG: op_print_reg,
#     ADD: op_add,
#     PUSH: op_push,
#     POP: op_pop,
#     CALL: op_call,
#     RET: op_ret
# }


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

op_pc = False
# REPL (FETCH, DECODE, EXECUTE)

while running:
    # FETCH
    command = memory[pc]

    # DECODE
    if command == PRINT_TOM:
        # EXECUTE
        instruction_size = 1
        print("Tom")
        op_pc = False
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
        op_pc = False
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
        op_pc = False
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
        op_pc = False

    # DECODE
    elif command == PRINT_REG:
        # EXECUTE
        instruction_size = 2
        reg = memory[pc + 1]
        print(register[reg])
        op_pc = False
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

        index = register[SP]
        memory[index] = val
        op_pc = False

    # DECODE
    elif command == POP:
        # EXECUTE
        # SETUP
        instruction_size = 2
        reg = memory[pc + 1]
        index = register[SP]
        val = memory[index]

        # POP
        register[reg] = val
        register[SP] += 1
        op_pc = False

    # DECODE
    elif command == CALL:
        # EXECUTE
        # SETUP
        instruction_size = 2
        reg = memory[pc + 1]

        # CALL
<<<<<<< HEAD
        register[SP] -= 1 # Decrement Stack Pointer
        memory[register[SP]] = pc + 2 # Push PC + 2 on to the stack
=======
        register[SP] -= 1  # Decrement Stack Pointer
        memory[register[SP]] = pc + 2  # Push PC + 2 on to the stack
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        # set pc to subroutine
        pc = register[reg]
        op_pc = True

    # DECODE
    elif command == RET:
        pc = memory[register[SP]]
        register[SP] += 1
        op_pc = True

<<<<<<< HEAD

        
        




=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # DECODE (ERROR)
    else:
        # EXECUTE
        print(f"Unknown Instruction {command}")
        sys.exit(1)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    if not op_pc:
        pc += instruction_size

# while running:
#     ir = memory[pc]

#     if ir in bt:
#         bt[ir]()
#     else:
#         raise Exception(f"Invalid instruction {hex(ir)} at address {hex(pc)}")

# def op_halt():
#     print("Halted!")
#     sys.exit(-1)

# def op_print_tom():
#     print("tom")
#     pc += 1

# def op_print_num():
#     print("PRINT_NUM")
#     pc +=2

# def op_save():
#     print("SAVE")
#     pc += 2

# def op_print_reg():
#     print("PRINT_REG")
#     pc += 2

# def op_add():
#     print("ADD")
#     pc += 3

# def op_push():
#     print("PUSH")
#     pc += 2

# def op_pop():
#     print("POP")
#     pc += 2

# def op_call():
#     print("CALL")
#     pc += 3

# def op_ret():
#     print("RET")
#     pc -= 3
