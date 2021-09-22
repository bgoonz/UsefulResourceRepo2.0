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
PUSH = 7
POP = 8


<<<<<<< HEAD

# lets make a model of memory to hold our program
memory = [0] * 256

register = [0] * 8 # self.reg[poodle]

# TODO: Stack Pointer (R7) as per specs
# index of the registers list 
SP = 7
# to use to store where the top of the stack is
register[SP] = 244 # F4

=======
# lets make a model of memory to hold our program
memory = [0] * 256

register = [0] * 8  # self.reg[poodle]

# TODO: Stack Pointer (R7) as per specs
# index of the registers list
SP = 7
# to use to store where the top of the stack is
register[SP] = 244  # F4
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


# lets load a program in to memory
def load_memory(filename):
    try:
        addr = 0
        with open(filename) as f:
            for line in f:
                # split the comment out
<<<<<<< HEAD
                comment_split = line.split('#')

                num = comment_split[0].strip()

                if num == '':
=======
                comment_split = line.split("#")

                num = comment_split[0].strip()

                if num == "":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
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

    #  push
    elif command == PUSH:
        # setup
        index_of_the_register = memory[pc + 1]
        val = register[index_of_the_register]

        # do the push
        register[SP] -= 1
        memory[register[SP]] = val

        op_size = 2

<<<<<<< HEAD

    #  pop
    elif command == POP:
        # setup
        index_of_the_register = memory[pc + 1] # the register => 3
        val = memory[register[SP]] # memory[F3] => 89 => val = 89

        # do the pop
        register[index_of_the_register] = val # register[3] = 89
=======
    #  pop
    elif command == POP:
        # setup
        index_of_the_register = memory[pc + 1]  # the register => 3
        val = memory[register[SP]]  # memory[F3] => 89 => val = 89

        # do the pop
        register[index_of_the_register] = val  # register[3] = 89
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        register[SP] += 1

        op_size = 2

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
