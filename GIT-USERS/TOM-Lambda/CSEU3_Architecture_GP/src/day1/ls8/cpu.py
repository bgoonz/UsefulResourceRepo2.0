"""CPU functionality."""

import sys

# opcodes
HLT = 0b00000001
PRN = 0b01000111
LDI = 0b10000010
ADD = 0b10100000
MUL = 0b10100010

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class CPU:
    """Main CPU class."""

    def __init__(self):
        """Construct a new CPU."""
        self.ram = [0] * 256
        self.reg = [0] * 8
        self.pc = 0
        self.halted = False

    def load(self, filename):
        """Load a program into memory."""
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
                    self.ram_write(val, address)

                    address += 1

        except FileNotFoundError:
            print(f"{sys.argv[0]}: {filename} not found")
            sys.exit(2)

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def alu(self, op, reg_a, reg_b):
        """ALU operations."""

        if op == "ADD":
            self.reg[reg_a] += self.reg[reg_b]
<<<<<<< HEAD
        #elif op == "SUB": etc
=======
        # elif op == "SUB": etc
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        elif op == "MUL":
            self.reg[reg_a] *= self.reg[reg_b]
        else:
            raise Exception("Unsupported ALU operation")

    def trace(self):
        """
        Handy function to print out the CPU state. You might want to call this
        from run() if you need help debugging.
        """

<<<<<<< HEAD
        print(f"TRACE: %02X | %02X %02X %02X |" % (
            self.pc,
            #self.fl,
            #self.ie,
            self.ram_read(self.pc),
            self.ram_read(self.pc + 1),
            self.ram_read(self.pc + 2)
        ), end='')

        for i in range(8):
            print(" %02X" % self.reg[i], end='')

        print()
    
=======
        print(
            f"TRACE: %02X | %02X %02X %02X |"
            % (
                self.pc,
                # self.fl,
                # self.ie,
                self.ram_read(self.pc),
                self.ram_read(self.pc + 1),
                self.ram_read(self.pc + 2),
            ),
            end="",
        )

        for i in range(8):
            print(" %02X" % self.reg[i], end="")

        print()

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def ram_read(self, mar):
        return self.ram[mar]

    def ram_write(self, mdr, mar):
        self.ram[mar] = mdr

    def run(self):
        """Run the CPU."""
        inc_size = 0
        while not self.halted:
            cmd = self.ram_read(self.pc)
            operand_a = self.ram_read(self.pc + 1)
            operand_b = self.ram_read(self.pc + 2)

            if cmd == HLT:
                self.halted = True
                sys.exit(-1)
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            elif cmd == PRN:
                reg_index = operand_a
                num = self.reg[reg_index]
                print(num)
                inc_size = 2

            elif cmd == LDI:
                # do ldi
                self.reg[operand_a] = operand_b
                inc_size = 3

            elif cmd == ADD:
                self.alu("ADD", operand_a, operand_b)
                inc_size = 3

            elif cmd == MUL:
                self.alu("MUL", operand_a, operand_b)
                inc_size = 3
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            self.pc += inc_size
