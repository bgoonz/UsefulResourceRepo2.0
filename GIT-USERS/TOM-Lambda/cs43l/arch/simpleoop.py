HALT = 1
PRINT_BOB = 2
PRINT_NUM = 3
STORE = 4
PRINT_REG = 5
ADD = 6
SUB = 7
LDI = 0b10000010
HLT = 0b00000001

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Simple:
    def __init__(self):

        # TODO: Refactor to OOP
        self.ram = [0] * 256
        self.reg = [0] * 8
        self.pc = 0
        self.running = True

    def alu(self, op, opa, opb):
        if op == "ADD":
            self.reg[opa] += self.reg[opb]
        elif op == "SUB":
            self.reg[opa] -= self.reg[opb]

    def ram_read(self, mar):
        return self.ram[mar]
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def ram_write(self, mar, mdr):
        self.ram[mar] = mdr

    def load(self):
        # TODO: Unhardcode the program
        # our program
        self.ram_write(0, PRINT_BOB)
        self.ram_write(1, PRINT_BOB)
        self.ram_write(2, PRINT_NUM)
        self.ram_write(3, 34)
        self.ram_write(4, STORE)
        self.ram_write(5, 0)
        self.ram_write(6, 120)
        self.ram_write(7, PRINT_REG)
        self.ram_write(8, 0)
        self.ram_write(9, HALT)

    def run(self):

        while self.running:
            inst = self.ram_read(self.pc)
            oper_a = self.ram_read(self.pc + 1)
            oper_b = self.ram_read(self.pc + 2)
            if inst == HALT:
                print("Halting CPU")
                self.running = False
            elif inst == PRINT_BOB:
                print("BOB")
                self.pc += 1
            elif inst == PRINT_NUM:
                print(self.ram_read(oper_a))
                self.pc += 2
            elif inst == STORE:
                reg_index = self.ram_read(oper_a)
                data = self.ram_read(oper_b)
                self.reg[reg_index] = data
                self.pc += 3
            elif inst == PRINT_REG:
                reg_index = self.ram_read(oper_a)
                print(self.reg[reg_index])
                self.pc += 2
            elif inst == ADD:
                self.alu("ADD", oper_a, oper_b)
            elif inst == SUB:
                self.alu("SUB", oper_a, oper_b)


if __name__ == "__main__":
    machine = Simple()
    machine.load()
    machine.run()
