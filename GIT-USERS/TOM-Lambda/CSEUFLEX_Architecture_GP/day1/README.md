# Computer Architecture Overview

## Early Computing

### DEVICES

*ABACUS*

[Wiki Link](https://en.wikipedia.org/wiki/Abacus)

One of the early computing devices was the ABACUS. This was a device for calculation used in many places including early China.



*ENIAC*

[Wiki Link](https://en.wikipedia.org/wiki/ENIAC)

Lets fast forward circa 1946 when the ENIAC was completed. This was a general purpose computing device. it was programmed using plug boards and switches. It has operational speed of about 5000 operations per second. The i/O (Input and Output) was using Cards, Lights, Switches amd Plugs. and it took up around 1000 square feet of space.

*EDSAC*

[Wiki Link](https://en.wikipedia.org/wiki/EDSAC)

The EDSAC further made a leap in technology in 1949 via the usage of vacuum tubes to store state to move a little further from the notion of a mechanical computing device.

*UNIVAC*

[Wiki Link](https://en.wikipedia.org/wiki/UNIVAC)

The next stage in the evolution of computing devices was noted as the UNIVAC this was in 1951. The operational speed was far slower than the ENIAC but it gave us the notion of stored memory on magnetic media. It ran at 1905~ instructions per second but had I/O of a megnetic tape and a printer
It had a memory size of 1000 12 digit words in delay lines the memory was a delay memory to store the 1k words. It is noted as the first practical stored computer. It utilized serial vacuum tubes, delay lines and magnetic tape. it also took up 943 cubic feet and cost about $750000 or more

## Architecture Progression

- [Vacuum Tubes 1940 ~ 1950](https://en.wikipedia.org/wiki/Vacuum_tube_computer)
- [Transistors 1950 ~ 1964](https://en.wikipedia.org/wiki/Transistor)
- [Integrated Circuits 1964 ~ 1971](https://en.wikipedia.org/wiki/Integrated_circuit)
- [Microprocessor Chips 1971 ~ Present Day](https://en.wikipedia.org/wiki/Microprocessor)

## Current CPU Architecture

- CPU
    - Central Manipulation and Control
- Main Memory
    - Storage of instructions and data currently executing programs
- Input Output Subsystem
    - Controllers to communicate with *external* devices
        - Secondary Memory
        - Display Devices
        - Networks

[*Von Neumann Architecture*](https://www.computerscience.gcse.guru/theory/von-neumann-architecture)

### Basic CPU Overview

*CPU*
- Instruction Unit
- Integer Unit
- Floating Point Unit
- Instruction Cache
- Data Cache
- Bus Interface

The `Bus Interface` Connects to the `System Bus` which consists of a `Data Bus` and a `Control Bus`

The `System Bus` connects the `CPU` to the `Main Memory` and the `I/O Sub System`


# Numbering Systems

## Decimal

- Digits 0 ~ 9 (10 Digits)

HUNDREDS | TENS | UNITS
 0          0       1
 0          1       0

## HEX (Hexadecimal)

- Digits 0 ~ F (16 Digits)

                0
                1
                2
                3
                ~
                A
                B 
                C 
                D 
                E 
                F
          1     0 
          1     1
          1     F
          2     1

## Binary

- Digits 0 ~ 1 (2 Digits)

                0
                1
            1   0
            1   1
        1   0   0
        1   0   1            



# Base conversion review

```
base 10 (decimal)

+-----1000's place
|+----100's place
||+---10's place
|||+--1's place
||||
abcd

1234

1 * 1000 => 1000
2 * 100 =>   200
3 * 10 =>     30
4 * 1 =>       4



base 2 (binary)

+-----8's place (0b1000's place)
|+----4's place (0b100's place)
||+---2's place (0b10's place)
|||+--1's place (0b1's place)
||||
abcd
1010

1 * 8 => 8
0 * 4 => 0
1 * 2 => 2
0 * 1 => 0

1010 binary === 10 decimal


bin to dec...

lets do more conversions...

1110 (binary)
+---------128's place (0b10000000's place)
|+--------64's place (0b1000000's place)
||+-------32's place (0b100000's place)
|||+------16's place (0b10000's place)
||||+-----8's place (0b1000's place)
|||||+----4's place (0b100's place)
||||||+---2's place (0b10's place)
|||||||+--1's place (0b1's place)
||||||||
abcdefgh
00001110

8 + 4 + 2 => 14

1110 bin === 14 dec


```