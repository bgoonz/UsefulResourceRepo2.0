# Let's build a data driven machine!
import sys
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# opcodes
PRINT_TOM = 1
HALT = 2
PRINT_NUM = 3
PRINT_REG = 4
SAVE = 5
LDI = 0b10000010
PRN = 0b01000111

ADD = 6
# memory
memory = [
    PRINT_TOM,
    PRINT_TOM,
    PRINT_NUM,
    90,
    LDI,
    127,
    2,
    PRINT_REG,
    2,
    LDI,
    10,
    3,
    ADD,
    2,
    3,
    PRINT_REG,
    2,
<<<<<<< HEAD
    HALT
=======
    HALT,
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
]

# registers

register = [0] * 8  # r0 - r7
# mem = [0] * 256 => self.ram = [0] * 256
# self.pc = 0
# self.reg = [0] * 8

# program counter
pc = 0
# running?
running = True

# REPL
# FETCH, DECODE, EXECUTE
inc_size = 1
while running:
    # FETCH
    cmd = memory[pc]

<<<<<<< HEAD
    #DECODE
=======
    # DECODE
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    if cmd == PRINT_TOM:
        # EXECUTE
        print("Tom")
        inc_size = 1

    elif cmd == HALT:
        # EXECUTE
        running = False

    elif cmd == PRINT_NUM:
        # EXECUTE
        num = memory[pc + 1]
        print(num)
        inc_size = 2

    elif cmd == PRINT_REG:
        # EXECUTE
        reg_index = memory[pc + 1]
        print(register[reg_index])
        inc_size = 2

    elif cmd == LDI:
        # EXECUTE
        num = memory[pc + 1]
        reg_index = memory[pc + 2]
        register[reg_index] = num
        inc_size = 3

    elif cmd == ADD:
        # EXECUTE
        reg_a = memory[pc + 1]
        reg_b = memory[pc + 2]
        register[reg_a] += register[reg_b]
        inc_size = 3

    else:
        # EXECUTE
        print("Unknown Instruction!")
        sys.exit(1)
<<<<<<< HEAD
    
    
    pc += inc_size
=======

    pc += inc_size
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
