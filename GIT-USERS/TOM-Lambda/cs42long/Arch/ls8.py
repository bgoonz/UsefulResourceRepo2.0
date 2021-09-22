"""Main."""

import sys
from cpu import CPU

if len(sys.argv) != 2:
    print(f"usage: {sys.argv[0]} filename")
    sys.exit(1)

cpu = CPU()

cpu.load(sys.argv[1])
<<<<<<< HEAD
cpu.run()
=======
cpu.run()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
