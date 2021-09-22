import sys
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
HALT = 1
PRINT_BOB = 2
PRINT_NUM = 3
STORE = 4
PRINT_REG = 5
PUSH = 6
POP = 7
LDI = 0b10000010
HLT = 0b00000001


def alu(op, opa, opb):
    if op == "ADD":
        reg[opa] += reg[opb]

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
ram = [0] * 256

sp = 7

reg = [0] * 8
<<<<<<< HEAD
reg[sp] = 0xf4
=======
reg[sp] = 0xF4
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# our program
ram[0] = PRINT_BOB
ram[1] = PRINT_BOB
ram[2] = PRINT_NUM
ram[3] = 34
ram[4] = STORE
ram[5] = 0
ram[6] = 120
ram[7] = PRINT_REG
ram[8] = 0
ram[9] = PUSH
ram[10] = 0
ram[11] = STORE
ram[12] = 0
ram[13] = 12
ram[14] = PRINT_REG
ram[15] = 0
ram[16] = POP
ram[17] = 0
ram[18] = PRINT_REG
ram[19] = 0
ram[20] = HALT

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def load(filename):
    with open(filename) as filedata:
        addr = 0
        for line in filedata:
<<<<<<< HEAD
            
            data = line.split('#')[0].strip()
=======

            data = line.split("#")[0].strip()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            if data == "":
                continue

            num = int(data)
            ram[addr] = num
            # self.ram_write(addr, num)
            addr += 1
<<<<<<< HEAD
        
# if len(sys.argv) != 2:
#     print(f"Usage: simple.py <filename>")
#     sys.exit(1)
    
=======


# if len(sys.argv) != 2:
#     print(f"Usage: simple.py <filename>")
#     sys.exit(1)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# load(sys.argv[1])

pc = 0

running = True

while running:
    inst = ram[pc]

    if inst == HALT:
        print("Halting CPU")
        running = False
    elif inst == PRINT_BOB:
        print("BOB")
        pc += 1
    elif inst == PRINT_NUM:
        print(ram[pc + 1])
        pc += 2
    elif inst == STORE:
        reg_index = ram[pc + 1]
        data = ram[pc + 2]
        reg[reg_index] = data
        pc += 3
    elif inst == PRINT_REG:
        reg_index = ram[pc + 1]
        print(reg[reg_index])
        pc += 2
    elif inst == PUSH:
        # dec the SP
        reg[sp] -= 1
        # grab the index to the reg
        reg_index = ram[pc + 1]

<<<<<<< HEAD
        #get the value from the reg
=======
        # get the value from the reg
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        value = reg[reg_index]
        ram[reg[sp]] = value
        pc += 2

    elif inst == POP:
        # grab the index to the reg
        reg_index = ram[pc + 1]
        # get the value from the top of the stack
        value = ram[reg[sp]]
        # inc my stack pointer
        reg[sp] += 1
        reg[reg_index] = value

        pc += 2
<<<<<<< HEAD


=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
