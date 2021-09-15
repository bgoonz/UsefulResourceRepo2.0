# Bitwise Operations and File IO

#### AND, OR, XOR

truth table:

 A | B | A AND B
:-:|:-:|:------:
 0 | 0 |    0
 0 | 1 |    0
 1 | 0 |    0
 1 | 1 |    1


how boolean AND works.

examples, doing each bit pair at a time in isolation:

```
  01011010
& 10101111
----------
  00001010
```

some more examples with OR.

Show the Python operators:

Operation | Bitwise Operator | Boolean Operator
:--------:|:----------------:|:---------------:
   OR     |        `|`      |      `||` or
   AND    |        `&`       |       `&&` and
   XOR    |        `^`       |       none
   NOT    |        `~`       |       `!` not

 A | B | A OR B
:-:|:-:|:-----:
 0 | 0 |   0
 0 | 1 |   1
 1 | 0 |   1
 1 | 1 |   1

Exclusive-OR means that one or the other must be true, but not both.

 A | B | A XOR B
:-:|:-:|:------:
 0 | 0 |    0
 0 | 1 |    1
 1 | 0 |    1
 1 | 1 |    0

 A | NOT A
:-:|:----:
 0 |  1
 1 |  0

## Shifting
a = 8
b = 2

a >> b == a // (2 ** b)
8 >> 2
8 // 4

1000 >> 2 == 0010 == 2
1000 -> 0100 -> 0010

1110 >> 1 == 0111
1101
1011
0111

0111 << 1
1011
1101
1110

000001010110101010101011 >> 2

only have 4 bits to work in
1111 >> 400 == 0000 = 0

1111 1111 >> 2
0011 1111 11


00110001010101010 >> 5 == 00000001100010101


a << b == a * (2 ** b)

00110001010101010 << 5 == 11000101010101000000

0011 1111 << 2 == 1111 1100
0000 0000 0000 0000 0000 0000 0011 1100 === integer (32bit) (4byte)
  
  0000 0000
  1111 1111
+ 0000 0001

## Masking
  13 + 32 + 64
  0110 1101 == A
& 1111 0000 == B
-----------
  0110 0000 == C
  32 + 64

  0000 0110
  4 + 8

D = C >> 4

  0000 0110
      Z B D P H T G Y
flags 0 0 0 0 0 0 0 0  == 5

   10100000 >> 5
&  00100000 
-----------
   00100000 >> 5
   00000001 Dave = 1
   00000101 DAVE = 5












0110 0000 << 4 == 0000 0110