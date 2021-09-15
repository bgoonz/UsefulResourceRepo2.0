import sys
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# lets build up our simulator some more
# now we will add the concept of registers
# and an add opcode

# let's make a simple data driven machine!!!
HALT = 1
PRINT_TOM = 2
PRINT_NUM = 3
SAVE = 4
PRINT_REG = 5
ADD = 6
PUSH = 7
POP = 8
PRINT_DAVE = 90
<<<<<<< HEAD
CALL = 9 # New for day 4
RET = 10 # New for day 4
=======
CALL = 9  # New for day 4
RET = 10  # New for day 4
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# class OpCode:
#     def __init__(self, code, size, op1=None, op2=None):
#         self.code
#         self.size
#         self.op1
#         self.op2
# think of some operations that we might want to perform such as print something, load  or store something etc
# maybe some way to stop execution and some arithmetic operations

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_halt(op1, op2):
    print("Halted!")
    sys.exit(-1)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_print_tom(op1, op2):
    print("tom")
    return 1

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_print_dave(op1, op2):
    print("dave")
    return 1

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_print_num(op1, op2):
    print("PRINT_NUM")
    return 2

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_save(op1, op2):
    print("SAVE")
    return 3

<<<<<<< HEAD
def op_print_reg(op1,op2):
    print("PRINT_REG")
    return 2

=======

def op_print_reg(op1, op2):
    print("PRINT_REG")
    return 2


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_add(op1, op2):
    print("ADD")
    return 3

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_push(op1, op2):
    print("PUSH")
    return 2

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_pop(op1, op2):
    print("POP")
    return 2

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_call(op1, op2):
    print("CALL")
    return 3

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def op_ret(op1, op2):
    print("RET")
    return 3

<<<<<<< HEAD
# TODO: demo the idea of a branch table 
=======

# TODO: demo the idea of a branch table
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
## branch table
bt = {
    HALT: op_halt,
    PRINT_TOM: op_print_tom,
    PRINT_DAVE: op_print_dave,
    PRINT_NUM: op_print_num,
    SAVE: op_save,
    PRINT_REG: op_print_reg,
    ADD: op_add,
    PUSH: op_push,
    POP: op_pop,
    CALL: op_call,
<<<<<<< HEAD
    RET: op_ret
=======
    RET: op_ret,
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
}

# lets load a program in to memory
def load_memory(filename):
    try:
        address = 0
        with open(filename) as f:
            for line in f:
                # split line before and after comment symbol
                comment_split = line.split("#")

                # extract our number
<<<<<<< HEAD
                num = comment_split[0].strip() # trim whitespace

                if num == '':
                    continue # ignore blank lines
=======
                num = comment_split[0].strip()  # trim whitespace

                if num == "":
                    continue  # ignore blank lines
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

                # convert our binary string to a number
                val = int(num, 2)

                # store val at address in memory
                memory[address] = val

                address += 1

    except FileNotFoundError:
        print(f"{sys.argv[0]}: {filename} not found")
        sys.exit(2)


# lets make a model of memory to hold our program
memory = [0] * 128

register = [0] * 8

sp = 7

# think about keeping track where we are currently in mem to fetch the next instruction
pc = 0
# are we actually running
running = True
inc_size = 0
# TODO op_pc boolean to use for pc condition (add to each instruction case)
op_pc = False

# Main entrypoint
if len(sys.argv) != 2:
    print("usage: simple.py filename", file=sys.stderr)
    sys.exit(1)

load_memory(sys.argv[1])
# REPL

# # # lets make a running loop...
# while running:
#     # extract a command maybe?
#     # FETCH
#     cmd = memory[pc]

#     # lets check what command has been fetched
#     # DECODE
#     if cmd == HALT:
#         # EXECUTE
#         running = False
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#     elif cmd == PRINT_TOM:
#         # EXECUTE
#         print("Tom")
#         inc_size = 1
#         op_pc = False

#     elif cmd == PRINT_NUM:
#         num = memory[pc + 1]
#         print(num)
#         inc_size = 2
#         op_pc = False

#     elif cmd == SAVE:
#         num = memory[pc + 1]
#         reg = memory[pc + 2]
#         register[reg] = num
#         inc_size = 3
#         op_pc = False

#     elif cmd == PRINT_REG:
#         reg = memory[pc + 1]
#         print(register[reg])
#         inc_size = 2
#         op_pc = False

#     elif cmd == ADD:
#         reg_a = memory[pc + 1]
#         reg_b = memory[pc + 2]
#         register[reg_a] += register[reg_b]
#         inc_size = 3
#         op_pc = False

#     elif cmd == PUSH:
#         # setup
#         reg = memory[pc + 1]
#         val = register[reg]

#         #PUSH
#         register[sp] -= 1
#         memory[register[sp]] = val
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#         inc_size = 2
#         op_pc = False

#     elif cmd == POP:
#         # setup
#         reg = memory[pc + 1]
#         val = memory[register[sp]]

#         # pop
#         register[reg] = val
#         register[sp] += 1

#         inc_size = 2
#         op_pc = False
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
#     elif cmd == CALL:
#         # setup
#         reg = memory[pc + 1]

#         # CALL
#         register[sp] -= 1 # decrement sp
#         memory[register[sp]] = pc + 2 # push pc + 2 on to the stack

#         # set pc to subroutine
#         pc = register[reg]
#         op_pc = True

#     elif cmd == RET:
#         pc = memory[register[sp]]
#         register[sp] += 1
#         op_pc = True

#     else:
#         print(f"Invalid Instruction: {cmd}")
#         running = False

#     # how will we move forward in memory to grab the next command?
#     # condition for the opcode that interacts directly with the pc
#     if not op_pc:
#         pc += inc_size


# TODO: demo for Branch Table

while running:
    ir = memory[pc]
    op1 = memory[pc + 1]
    op2 = memory[pc + 2]

    if ir in bt:
        pc += bt[ir](op1, op2)
    else:
        raise Exception(f"Invalid instruction {hex(ir)} at address {hex(pc)}")
