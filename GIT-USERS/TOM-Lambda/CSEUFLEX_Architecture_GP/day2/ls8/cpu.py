"""CPU functionality."""

# opcodes
HLT = 0b00000001
LDI = 0b10000010
PRN = 0b01000111


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

    def load(self):
        """Load a program into memory."""

        address = 0

        # For now, we've just hardcoded a program:

        program = [
            # From print8.ls8
<<<<<<< HEAD
            0b10000010, # LDI R0,8
            0b00000000,
            0b00001000,
            0b01000111, # PRN R0
            0b00000000,
            0b00000001, # HLT
=======
            0b10000010,  # LDI R0,8
            0b00000000,
            0b00001000,
            0b01000111,  # PRN R0
            0b00000000,
            0b00000001,  # HLT
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        ]

        for instruction in program:
            self.ram[address] = instruction
            address += 1

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
<<<<<<< HEAD
        instruction_length = 1 # (bitshifted instruction)
=======
        instruction_length = 1  # (bitshifted instruction)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        while not self.halted:
            ir = self.ram[self.pc]
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
                instruction_length = 3

            # PRN
            elif ir == PRN:
                print(self.reg[operand_a])
                instruction_length = 2
<<<<<<< HEAD
            
            self.pc += instruction_length



=======

            self.pc += instruction_length
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
