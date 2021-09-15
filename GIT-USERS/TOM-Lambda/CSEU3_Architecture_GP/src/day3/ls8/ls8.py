#!/usr/bin/env python3

"""Main."""

import sys
from cpu import *

if len(sys.argv) != 2:
    print("usage: simple.py filename", file=sys.stderr)
    sys.exit(1)


cpu = CPU()

cpu.load(sys.argv[1])
<<<<<<< HEAD
cpu.run()
=======
cpu.run()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
