"""CPU functionality."""

import sys
from datetime import datetime
import keyboard


<<<<<<< HEAD

LDI = 0b10000010
LD   = 0b10000011
PRN = 0b01000111
PRA  = 0b01001000
HLT = 0b00000001
POP  = 0b01000110
PUSH = 0b01000101
ADD  = 0b10100000
SUB  = 0b10100001
=======
LDI = 0b10000010
LD = 0b10000011
PRN = 0b01000111
PRA = 0b01001000
HLT = 0b00000001
POP = 0b01000110
PUSH = 0b01000101
ADD = 0b10100000
SUB = 0b10100001
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
CALL = 0b01010000
RET = 0b00010001
ADDI = 0b10101111

<<<<<<< HEAD
MUL  = 0b10100010
DIV  = 0b10100011
=======
MUL = 0b10100010
DIV = 0b10100011
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
MOD = 0b10100100
INC = 0b01100101
DEC = 0b01100110
AND = 0b10101000
NOT = 0b01101001
OR = 0b10101010
XOR = 0b10101011
SHL = 0b10101100
SHR = 0b10101101
CMP = 0b10100111

<<<<<<< HEAD
ST   = 0b10000100
IRET = 0b00010011

JEQ  = 0b01010101
JLE  = 0b01011001
JLT  = 0b01011000
JMP  = 0b01010100
JGT  = 0b01010111
JGE  = 0b01011010
JNE  = 0b01010110
=======
ST = 0b10000100
IRET = 0b00010011

JEQ = 0b01010101
JLE = 0b01011001
JLT = 0b01011000
JMP = 0b01010100
JGT = 0b01010111
JGE = 0b01011010
JNE = 0b01010110
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea


# Reserved general-purpose register numbers:

IM = 5
IS = 6
SP = 7

# CMP flags:

FL_LT = 0b100
FL_GT = 0b010
FL_EQ = 0b001

# IS flags

<<<<<<< HEAD
IS_TIMER    = 0b00000001
IS_KEYBOARD = 0b00000010

=======
IS_TIMER = 0b00000001
IS_KEYBOARD = 0b00000010


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class CPU:
    """Main CPU class."""

    def __init__(self):
        """Construct a new CPU."""
        self.pc = 0
        self.fl = 0b00000000
        self.ie = 1

        self.reg = [0] * 8
        self.ram = [0] * 256
<<<<<<< HEAD
        self.reg[7] = 0xf4
=======
        self.reg[7] = 0xF4
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        self.last_timer_tick = None
        self.sets_pc = False
        self.running = False
<<<<<<< HEAD
    
=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # Helper Methods
    def ram_read(self, mar):
        return self.ram[mar]

    def ram_write(self, mar, mdr):
        self.ram[mar] = mdr

    def push_val(self, val):
        self.reg[SP] -= 1
        self.ram_write(self.reg[7], val)
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def pop_val(self):
        val = self.ram[self.reg[7]]
        self.reg[SP] += 1

        return val
<<<<<<< HEAD
    
    # keyboard 

=======

    # keyboard
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    def load(self, filename):
        """Load a program into memory."""

        address = 0
        with open(filename) as fp:
            for line in fp:

                # split the line on the hash sign
                comment_split = line.split("#")

                # strip the whitespace on element zero (the instruction)
                num = comment_split[0].strip()

<<<<<<< HEAD
                if num == '':  # ignore blanks
=======
                if num == "":  # ignore blanks
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                    continue

                # turn the number string in to an integer
                val = int(num, 2)
                # print(val)

                self.ram_write(address, val)
                address += 1

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def alu(self, op, reg_a, reg_b):
        """ALU operations."""

        if op == "ADD":
            self.reg[reg_a] += self.reg[reg_b]
        elif op == "ADDI":
            self.reg[reg_a] += reg_b
        elif op == "SUB":
            self.reg[reg_a] -= self.reg[reg_b]
        elif op == "MUL":
            self.reg[reg_a] *= self.reg[reg_b]
        elif op == "DIV":
            self.reg[reg_a] /= self.reg[reg_b]
        elif op == "MOD":
            self.reg[reg_a] %= self.reg[reg_b]
        elif op == "INC":
            self.reg[reg_a] += 1
        elif op == "DEC":
            self.reg[reg_a] -= 1
        elif op == "AND":
<<<<<<< HEAD
            self.reg[reg_a]  &= self.reg[reg_b]
=======
            self.reg[reg_a] &= self.reg[reg_b]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        elif op == "NOT":
            self.reg[reg_a] != self.reg[reg_a]
        elif op == "OR":
            self.reg[reg_a] |= self.reg[reg_b]
        elif op == "XOR":
            self.reg[reg_a] ^= self.reg[reg_b]
        elif op == "SHL":
            self.reg[reg_a] <<= self.reg[reg_b]
        elif op == "SHR":
            self.reg[reg_a] >>= self.reg[reg_b]
        elif op == "CMP":
            self.fl &= 0x11111000  # clear all CMP flags
            if self.reg[reg_a] < self.reg[reg_b]:
                self.fl |= FL_LT
            elif self.reg[reg_a] > self.reg[reg_b]:
                self.fl |= FL_GT
            else:
                self.fl |= FL_EQ

<<<<<<< HEAD
            
=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        else:
            raise Exception("Unsupported ALU operation")

    def check_for_timer_int(self):
        """Check the time to see if a timer interrupt should fire."""
        if self.last_timer_tick == None:
            self.last_timer_tick = datetime.now()

        now = datetime.now()

        diff = now - self.last_timer_tick

        if diff.seconds >= 1:  # OK, fire!
            self.last_timer_tick = now
            self.reg[IS] |= IS_TIMER

    def check_for_keyboard_int(self):
        if keyboard.is_pressed("a"):
            self.reg[IS] |= IS_KEYBOARD
<<<<<<< HEAD
            self.ram[0xf4] = 'a'


=======
            self.ram[0xF4] = "a"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    def handle_ints(self):
        if not self.ie:  # see if interrupts enabled
            return

        # Mask out interrupts
        masked_ints = self.reg[IM] & self.reg[IS]

        for i in range(8):
            # See if the interrupt triggered
            if masked_ints & (1 << i):
<<<<<<< HEAD
                self.ie = 0   # disable interrupts
=======
                self.ie = 0  # disable interrupts
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                self.reg[IS] &= ~(1 << i)  # clear bit for this interrupt

                # Save all the work on the stack
                self.push_val(self.pc)
                self.push_val(self.fl)
                for r in range(7):
                    self.push_val(self.reg[r])

                # Look up the address vector and jump to it
<<<<<<< HEAD
                self.pc = self.ram_read(0xf8 + i)

                break # no more processing
=======
                self.pc = self.ram_read(0xF8 + i)

                break  # no more processing
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

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
        # running loop
        self.running = True

        while self.running:

            # interrupts
            self.check_for_timer_int()
            self.check_for_keyboard_int()

            self.handle_ints()

            # fetch
            ir = self.ram[self.pc]
            opa = self.ram[self.pc + 1]
            opb = self.ram[self.pc + 2]
            self.sets_pc = ((ir >> 4) & 0b1) == 1

            # decode instruction size
            opcode_size = (ir >> 6) + 1

<<<<<<< HEAD
            
=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # decode
            if ir == HLT:
                # execute
                self.running = False
                sys.exit(0)
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # decode
            elif ir == LDI:
                # execute
                # get the reg index.
                reg_index = opa
                # get the num.
                num = opb
                # put the number in the registers list at the index of reg_index
                self.reg[reg_index] = num

            # elif ir == PUSH:
            #     # print("PUSH")

            #     # Decrement the Stack Pointer
            #     self.reg[SP] -= 1

            #     # Copy the value at the given register to the address in memory pointed to by the Stack Pointer.
            #     self.ram[self.reg[SP]] = self.reg[opa]

            elif ir == ADD:
                self.alu("ADD", opa, opb)

            elif ir == ADDI:
                self.alu("ADDI", opa, opb)

            elif ir == SUB:
                self.alu("SUB", opa, opb)

            elif ir == MUL:
                self.alu("MUL", opa, opb)

            elif ir == DIV:
                self.alu("DIV", opa, opb)

            elif ir == AND:
                self.alu("AND", opa, opb)

            elif ir == OR:
                self.alu("OR", opa, opb)

            elif ir == XOR:
                self.alu("XOR", opa, opb)

            elif ir == NOT:
                self.alu("NOT", opa, opb)

            elif ir == DEC:
                self.alu("DEC", opa, opb)
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            elif ir == INC:
                self.alu("INC", opa, opb)

            elif ir == SHL:
                self.alu("SHL", opa, opb)

            elif ir == SHR:
                self.alu("SHR", opa, opb)
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            elif ir == CMP:
                self.alu("CMP", opa, opb)

            elif ir == JMP:
                self.pc = self.reg[opa]

            elif ir == JEQ:
                if self.fl & FL_EQ:
                    self.pc = self.reg[opa]
                else:
                    self.sets_pc = False

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            elif ir == JNE:
                if not self.fl & FL_EQ:
                    self.pc = self.reg[opa]
                else:
                    self.sets_pc = False

            elif ir == JLT:
                if not self.fl & FL_LT:
                    self.pc = self.reg[opa]
                else:
                    self.sets_pc = False

            elif ir == JLE:
                if self.fl & FL_LT or self.fl & FL_EQ:
                    self.pc = self.reg[opa]
                else:
                    self.sets_pc = False

            elif ir == JGT:
                if not self.fl & FL_GT:
                    self.pc = self.reg[opa]
                else:
                    self.sets_pc = False

            elif ir == JGE:
                if self.fl & FL_GT or self.fl & FL_EQ:
                    self.pc = self.reg[opa]
                else:
                    self.sets_pc = False

            elif ir == PUSH:
                self.push_val(self.reg[opa])

            elif ir == POP:
                self.reg[opa] = self.pop_val()

            elif ir == CALL:
                self.push_val(self.pc + 2)
                self.pc = self.reg[opa]

            elif ir == RET:
                self.pc = self.pop_val()

            elif ir == ST:
                self.ram_write(self.reg[opb], self.reg[opa])

            elif ir == LD:
                self.reg[opa] = self.ram_read(self.reg[opb])

            elif ir == IRET:
                # return state from stack
                for i in range(6, -1, -1):
                    self.reg[i] = self.pop_val()
<<<<<<< HEAD
                
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                self.lf = self.pop_val()
                self.pc = self.pop_val()

                # enable interrupts
                self.ie = 1

<<<<<<< HEAD
                

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # decode
            elif ir == PRN:
                # execute
                # get reg index.
                reg_index = opa
                print(self.reg[reg_index])

            elif ir == PRA:
<<<<<<< HEAD
                print(chr(self.reg[opa]), end='')
           
=======
                print(chr(self.reg[opa]), end="")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

            # decode
            else:
                print(f"Unknown instruction {ir}")
                sys.exit(1)

            if not self.sets_pc:
                self.pc += opcode_size
            else:
                pass

<<<<<<< HEAD
if __name__ == "__main__":
    
=======

if __name__ == "__main__":

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    """Main."""

    import sys

    cpu = CPU()

    cpu.load()
<<<<<<< HEAD
    cpu.run()
=======
    cpu.run()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
