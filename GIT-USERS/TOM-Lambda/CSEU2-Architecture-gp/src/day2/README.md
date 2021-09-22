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
   OR     |        `\|`      |      `\|\|`
   AND    |        `&`       |       `&&`
   XOR    |        `^`       |       none
   NOT    |        `~`       |       `!`

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
1000 >> 2 == 0010 == 2
1110 >> 1 == 0111

1111 >> 400 == 0000 = 0

00110001010101010 >> 5 == 00000001100010101


a << b == a * (2 ** b)

00110001010101010 << 5 == 11000101010101000000

0011 1111 << 2 == 1111 1100
0000 0000 0000 0000 0000 0000 0011 1100

## Masking

  0110 1101 == A
& 1111 0000 == B
-----------
  0110 0000 == C

D = C >> 4








0110 0000 << 4 == 0000 0110




