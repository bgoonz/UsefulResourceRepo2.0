# class Something:
#     def __init__(self):
#         pass

# c = Something()

# print(c)

# print(128 / 4)
# r= 255 g = 255 b = 255

<<<<<<< HEAD
class CPU:
    def __init__(self):
        self.registers = [0] * 8 # the actual registers inside the cpu
        self.registers[7] = 0xf4
=======

class CPU:
    def __init__(self):
        self.registers = [0] * 8  # the actual registers inside the cpu
        self.registers[7] = 0xF4
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        self.ram = [0] * 256
        self.pc = 0
        self.fl = 0

    def run(self):
        self.running = True
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # fetch decode execute cycle
        while running:
            # fetch an instruction
            ir = self.ram[pc]
            opa = ram[pc + 1]
            opb = ram[pc + 2]

            # decode
            if instruction == PRINT_BOB:
                # excute
                print("Bob")
                self.pc += 1

            elif instruction == PRINT_NUM:
                # excute
                num = ram[pc + 1]
                print(num)
                pc += 2
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            elif instruction == LOAD_REG:
                reg_index = ram[pc + 1]
                num = ram[pc + 2]
                registers[reg_index] = num
                pc += 3

            elif instruction == PRINT_REG:
                reg_index = ram[pc + 1]
                num = registers[reg_index]
                print(num)
                pc += 2

            elif instruction == ADD:
                rega_index = ram[pc + 1]
                regb_index = ram[pc + 2]
                registers[rega_index] += registers[regb_index]
                pc += 3

<<<<<<< HEAD


=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            elif instruction == HALT:
                # execute
                running = False
                sys.exit(0)
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            else:
                print("Invalid Instruction")
                sys.exit(1)
