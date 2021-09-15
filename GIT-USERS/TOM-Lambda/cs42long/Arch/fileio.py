import sys

if len(sys.argv) != 2:
    print("Usage: python3 fileio.py <filename>")
    sys.exit(1)

try:
    with open(sys.argv[1]) as f:
        for line in f:
            print(int(line))

except FileNotFoundError:
    print("file not found")
<<<<<<< HEAD
    sys.exit(2)
=======
    sys.exit(2)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
