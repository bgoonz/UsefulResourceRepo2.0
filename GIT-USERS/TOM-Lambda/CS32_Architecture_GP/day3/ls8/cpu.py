"""CPU functionality."""

# opcodes
HLT = 0b00000001
LDI = 0b10000010
PRN = 0b01000111
MUL = 0b10100010


<<<<<<< HEAD

import sys

=======
import sys


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class CPU:
    """Main CPU class."""

    def __init__(self):
        """Construct a new CPU."""
        self.reg = [0] * 8
        self.ram = [0] * 256
        self.pc = 0
        self.halted = False

    def ram_write(self, mdr, mar):
        self.ram[mar] = mdr
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def ram_read(self, mar):
        return self.ram[mar]

    def load(self, filename):
        """Load a program into memory."""

        # For now, we've just hardcoded a program:
        try:
            address = 0

            with open(filename) as f:
                for line in f:
                    # split before comment
<<<<<<< HEAD
                    comment_split = line.split('#')
=======
                    comment_split = line.split("#")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

                    # convert to a number splitting and stripping
                    num = comment_split[0].strip()

<<<<<<< HEAD
                    if num == '':
                        continue  # ignore blank lines
                    
                    val = int(num, 2)
                    
=======
                    if num == "":
                        continue  # ignore blank lines

                    val = int(num, 2)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                    # store val in memory at the given address
                    self.ram[address] = val

                    address += 1

        except FileNotFoundError:
            print(f"{sys.argv[0]}: {filename} not found!")
            sys.exit(2)

        # program = [
        #     # From print8.ls8
        #     0b10000010, # LDI R0,8
        #     0b00000000,
        #     0b00001000,
        #     0b01000111, # PRN R0
        #     0b00000000,
        #     0b00000001, # HLT
        # ]

        # for instruction in program:
        #     self.ram[address] = instruction
        #     address += 1

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def alu(self, op, reg_a, reg_b):
        """ALU operations."""

        if op == "ADD":
            self.reg[reg_a] += self.reg[reg_b]

        elif op == "SUB":
            self.reg[reg_a] -= self.reg[reg_b]

        elif op == "MUL":
            self.reg[reg_a] *= self.reg[reg_b]

        elif op == "DIV":
            self.reg[reg_a] //= self.reg[reg_b]

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
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        print()

    def run(self):
        """Run the CPU."""
        while not self.halted:
            ir = self.ram[self.pc]
<<<<<<< HEAD
            instruction_length = ((ir >> 6) & 0b11) + 1 # (bitshifted instruction)
=======
            instruction_length = ((ir >> 6) & 0b11) + 1  # (bitshifted instruction)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            operand_a = self.ram_read(self.pc + 1)
            operand_b = self.ram_read(self.pc + 2)
            # set the instruction length here (extract)

            # halt
            if ir == HLT:
                self.halted = True
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # LDI
            elif ir == LDI:
                self.reg[operand_a] = operand_b

            # PRN
            elif ir == PRN:
                print(self.reg[operand_a])

            elif ir == MUL:
                self.alu("MUL", operand_a, operand_b)
<<<<<<< HEAD
            
            self.pc += instruction_length

=======

            self.pc += instruction_length
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
