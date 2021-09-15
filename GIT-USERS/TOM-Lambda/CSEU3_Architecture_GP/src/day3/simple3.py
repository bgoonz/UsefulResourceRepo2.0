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

# think of some operations that we might want to perform such as print something, load  or store something etc
# maybe some way to stop execution and some arithmetic operations

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
# TODO: refactor to load in memory from file eg `memory = [0] * 128`
memory = [0] * 128

register = [0] * 8

# TODO: Stack Pointer (R7) as per specs
sp = 7


# think about keeping track where we are currently in mem to fetch the next instruction
pc = 0
# are we actually running
running = True
inc_size = 0

# Main entrypoint
if len(sys.argv) != 2:
    print("usage: simple.py filename", file=sys.stderr)
    sys.exit(1)

load_memory(sys.argv[1])
# REPL

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
    elif cmd == PRINT_TOM:
        # EXECUTE
        print("Tom")
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

    # handle ADD opcode
    elif cmd == ADD:
        reg_a = memory[pc + 1]
        reg_b = memory[pc + 2]
        register[reg_a] += register[reg_b]
        inc_size = 3

    # TODO: Handle PUSH
    elif cmd == PUSH:
        # setup
        reg = memory[pc + 1]
        val = register[reg]

<<<<<<< HEAD
        #PUSH
        register[sp] -= 1
        memory[register[sp]] = val
        
=======
        # PUSH
        register[sp] -= 1
        memory[register[sp]] = val

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        inc_size = 2

    # TODO: Handle POP
    elif cmd == POP:
        # setup
        reg = memory[pc + 1]
        val = memory[register[sp]]

        # pop
        register[reg] = val
        register[sp] += 1

        inc_size = 2
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    else:
        print(f"Invalid Instruction: {cmd}")
        running = False

    # how will we move forward in memory to grab the next command?
<<<<<<< HEAD
    pc += inc_size
=======
    pc += inc_size
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
