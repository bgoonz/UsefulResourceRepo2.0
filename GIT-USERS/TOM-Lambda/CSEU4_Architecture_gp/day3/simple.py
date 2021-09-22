import sys
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
PUSH = 7
POP = 8

PRINT_TOM
PRINT_NUM 1243


# lets make a model of memory to hold our program
memory = [0] * 256

register = [0] * 8

# TODO: Stack Pointer (R7) as per specs
SP = 7 # index of the registers list 
# to use to store where the top of the stack is
register[SP] = 0xf4



# lets load a program in to memory
def load_memory(filename):
    try:
        addr = 0
        with open(filename) as f:
            for line in f:
                # split the comment out
                comment_split = line.split('#')

                num = comment_split[0].strip()

                if num == '':
                    continue

                i_num = int(num, 2)

                memory[addr] = i_num

                addr += 1
    except FileNotFoundError:
        print("file not found!!!")
        sys.exit(2)


# think about keeping track where we are currently in mem to fetch the next instruction
pc = 0
# are we actually running
running = True
op_size = 0

# Main entrypoint

# grab any args
if len(sys.argv) != 2:
    print("usage: 02-fileio.2.py <filename>")
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

    # push
    elif command == PUSH:
        # setup
        reg = memory[pc + 1]
        val = register[reg]

        # push
        register[SP] -= 1
        memory[register[SP]] = val

        op_size = 2

    # pop
    elif command == POP:
        # setup
        reg = memory[pc + 1]
        val = memory[register[SP]]

        # pop
        register[reg] = val
        register[SP] += 1

        op_size = 2

    
    else:
        print(f"Invalid Instruction: {command}")
        running = False

    # how will we move forward in memory to grab the next command?
    pc += op_size

