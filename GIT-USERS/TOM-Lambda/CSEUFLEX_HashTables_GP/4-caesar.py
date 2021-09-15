# lets write up a transposition table to encode and decode ROT 13 (Caesar's Cipher)
<<<<<<< HEAD
# This is a varient of ROT-13 but the same idea applies 
# it uses a hash table to store the encode table

encode_table = {
    'A': 'H',
    'B': 'Z',
    'C': 'Y',
    'D': 'W',
    'E': 'O',
    'F': 'R',
    'G': 'J',
    'H': 'D',
    'I': 'P',
    'J': 'T',
    'K': 'I',
    'L': 'G',
    'M': 'L',
    'N': 'C',
    'O': 'E',
    'P': 'X',
    'Q': 'K',
    'R': 'U',
    'S': 'N',
    'T': 'F',
    'U': 'A',
    'V': 'M',
    'W': 'B',
    'X': 'Q',
    'Y': 'V',
    'Z': 'S',
    'a': 'h',
    'b': 'z',
    'c': 'y',
    'd': 'w',
    'e': 'o',
    'f': 'r',
    'g': 'j',
    'h': 'd',
    'i': 'p',
    'j': 't',
    'k': 'i',
    'l': 'g',
    'm': 'l',
    'n': 'c',
    'o': 'e',
    'p': 'x',
    'q': 'k',
    'r': 'u',
    's': 'n',
    't': 'f',
    'u': 'a',
    'v': 'm',
    'w': 'b',
    'x': 'q',
    'y': 'v',
    'z': 's',
    ' ': ' '
=======
# This is a varient of ROT-13 but the same idea applies
# it uses a hash table to store the encode table

encode_table = {
    "A": "H",
    "B": "Z",
    "C": "Y",
    "D": "W",
    "E": "O",
    "F": "R",
    "G": "J",
    "H": "D",
    "I": "P",
    "J": "T",
    "K": "I",
    "L": "G",
    "M": "L",
    "N": "C",
    "O": "E",
    "P": "X",
    "Q": "K",
    "R": "U",
    "S": "N",
    "T": "F",
    "U": "A",
    "V": "M",
    "W": "B",
    "X": "Q",
    "Y": "V",
    "Z": "S",
    "a": "h",
    "b": "z",
    "c": "y",
    "d": "w",
    "e": "o",
    "f": "r",
    "g": "j",
    "h": "d",
    "i": "p",
    "j": "t",
    "k": "i",
    "l": "g",
    "m": "l",
    "n": "c",
    "o": "e",
    "p": "x",
    "q": "k",
    "r": "u",
    "s": "n",
    "t": "f",
    "u": "a",
    "v": "m",
    "w": "b",
    "x": "q",
    "y": "v",
    "z": "s",
    " ": " ",
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
}

# now lets plan what we need next

decode_table = {}

# iterate over the encode table reversing the key and value
for k, v in encode_table.items():
    decode_table[v] = k

# O(1) + O(m)

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def encode(s):
    ret_val = ""

    for c in s:
        # if c.isspace():
<<<<<<< HEAD
        #     continue  
        # c = c.upper()
        ret_val += encode_table[c]
    
    return ret_val

=======
        #     continue
        # c = c.upper()
        ret_val += encode_table[c]

    return ret_val


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def decode(s):
    ret_val = ""

    for c in s:
        ret_val += decode_table[c]
<<<<<<< HEAD
    
    return ret_val

=======

    return ret_val


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# DOGGEBEUGW
# HELLOWORLD

# Tests
if __name__ == "__main__":
    plaintext = "This is a better charset for the cipher"

    ciphertext = encode(plaintext)

    print(f"Ciphertext: {ciphertext}")

    plaintext2 = decode(ciphertext)

<<<<<<< HEAD
    print(f"Plaintext:  {plaintext2}")
=======
    print(f"Plaintext:  {plaintext2}")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
