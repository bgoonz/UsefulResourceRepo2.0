# A Crash Course in Binary and Hexadecimal Notation
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Binary](#binary)
  - [Bases](#bases)
  - [Base 2](#base-2)
- [Bits and Bytes](#bits-and-bytes)
- [Another useful base](#another-useful-base)
  - [The `0x` Notation](#the-0x-notation)
- [In JavaScript](#in-javascript)

<!-- /code_chunk_output -->
________________________________________________________________________________

As we study networking we are going to be investigating a very low level of
computing compared to the JavaScript programming we've been doing so far.  We
are moving closer to hardware, and so we will be exposed to some new numbers,
formatted as binary or hexadecimal.

## Binary

At the lowest level, a computer just speaks two values, `1` and `0`.  These are
usually represented by two different voltages inside an integrated circuit known
as a CPU (Central Processing Unit).  Everything that you do on a computer,
writing and running your JavaScript code, watching videos online, chatting or
posting on social media, or playing a video game, are at a fundamental level
just 1's and 0's being processed by an integrated circuit.

So, what is binary? To understand this, we need to talk about bases.

### Bases

What's a base?  It turns out there's not just one number system.  The number
system human beings have used for thousands of years is **base 10**.  This means
we count using the Arabic digits 0 through 9.  The reason we use base 10? It
should be pretty obvious. The majority of human beings have ten fingers.  So
naturally we invented a counting system that used 10 digits.  If we ever meet
aliens from another planet that only have say, six digits, they might indeed use
**base 6**.

As it turns out, the base that computers speak is **base 2**. This derives
directly from the fact that transistors (which is what all integrated circuits
are made of) have two voltage states.  You can use **base 2** to perform
mathematical calculations and because of this all computing at a fundamental
level is base 2.

### Base 2

So what does base 2 look like? Well if base 10 contains the digits 0 through 9,
then base 2 contains the digits 0 through 1.

If you remember from your early math education, decimal (another word for base
10) numbers can be divided into *places*.

For example, given the number 42, the number breaks down into the following
*places*.

| Place     | 1000 | 100 | 10 | 1 |
|:----------|-----:|----:|---:|--:|
| __Digit__ |    0 |   0 |  4 | 2 |

```
(4 * 10) + (2 * 1) = 42
```

For binary, we instead have the following places, and the number 42 breaks down
this way:

| __Place__ | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:----------|----:|---:|---:|---:|--:|--:|--:|--:|
| __Digit__ |   0 |  0 |  1 |  0 | 1 | 0 | 1 | 0 |

```
(128 * 0) + (64 * 0) + (32 * 1) + (16 * 0) + (8 * 1) + (4 * 0) + (2 * 1) = 42
```

Or since we can simplify the zeros to 0 and the ones to 1, we can calculate this
much more simply by just adding up the places that contain a 1.

```
32 + 8 + 2 = 42
```

This is a good shorthand way of calculating a binary number in your head as long
as you memorize the bases.

## Bits and Bytes

So inside computers we often call a single digit a **bit**. A bit can be either
**on** (1) or **off** (0).

A sequence of 8 bits is known as a **byte**.

So our 42 example is a single byte since it contained 8 bits:

`00101010`

There are also some multiples of bytes computer science borrowed from the metric
system, although with confusing results since the metric system is Base 10,
while computing is Base 2.

| Unit      | Value                  |
|-----------|------------------------|
| Kilobyte  | 1000 bytes             |
| Megabyte  | 1000<sup>2</sup> bytes |
| Gigabyte  | 1000<sup>3</sup> bytes |
| Terabyte  | 1000<sup>4</sup> bytes |
| Petabyte  | 1000<sup>5</sup> bytes |
| Exabyte   | 1000<sup>6</sup> bytes |
| Zettabyte | 1000<sup>7</sup> bytes |
| Yottabyte | 1000<sup>8</sup> bytes |

This system worked fine until computer storage got very large.  Manufacturers of
hard drives would use Base 10, while Operating Systems would often use Base 2.
The discrepancy between something like the gigabyte in base 2 vs base 10 was
very large. 

>1 Gigabyte in base 10 = 1,000,000,000 bytes 1 Gigabyte in base 2 =
>1,073,741,824 bytes

That's 73.7 Megabytes of difference! With a Terabyte it got even worse.

>1 Terabyte in base 10 = 1,000,000,000,000 bytes 1 Terabyte in base 2 =
>1,099,511,627,776 bytes

For a whopping 99.5 Gigabytes of difference.

Something had to be done.  So now we have two different sets of terminology one
for Base 10 and one for Base 2.

| Base 10   | Abbr | Value                  | Base 2   | Abbr | Value                  |
|-----------|------|------------------------|----------|------|------------------------|
| Kilobyte  | kB   | 1000 bytes             | Kibibyte | KiB  | 1024 bytes             |
| Megabyte  | MB   | 1000<sup>2</sup> bytes | Mebibyte | MiB  | 1024<sup>2</sup> bytes |
| Gigabyte  | GB   | 1000<sup>3</sup> bytes | Gibibyte | GiB  | 1024<sup>3</sup> bytes |
| Terabyte  | TB   | 1000<sup>4</sup> bytes | Tebibyte | TiB  | 1024<sup>4</sup> bytes |
| Petabyte  | PB   | 1000<sup>5</sup> bytes | Pibibyte | PiB  | 1024<sup>5</sup> bytes |
| Exabyte   | EB   | 1000<sup>6</sup> bytes | Exbibyte | EiB  | 1024<sup>6</sup> bytes |
| Zettabyte | ZB   | 1000<sup>7</sup> bytes | Zebibyte | ZiB  | 1024<sup>7</sup> bytes |
| Yottabyte | YB   | 1000<sup>8</sup> bytes | Yobibyte | YiB  | 1024<sup>8</sup> bytes |

Still to this day, you will hear people refer to the base 2 versions as Kilobyte
or Megabyte.  Often it's hard to determine what unit is being used when
manufacturers advertise the size of hard drives or memory. Worse, Operating
Systems often display inconsistent numbers throughout their many displays of how
big disks or files are.

## Another useful base

Another useful base in computing is **Base 16** also known as *hexadecimal*.

Why is this useful? This is use because hexadecimal can provide a shorter, more
human-readable version of binary.

So if base 10 goes from the digits 0 through 9, what are we going to do? There
aren't 16 digits...

The letters A through F are here to rescue us from this. The available digits
for hexadecimal are *0 through F*, where `A` is `10` decimal and `F` is `15`
decimal.

```
hexadecimal: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  A,  B,  C,  D,  E,  F
decimal:     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
```

It's hard to think of letters as being numbers, but in hexadecimal it's
perfectly normal.

So how does this help us write binary numbers in a shorter form? It's because
there are 8 bits in a byte, which means one byte can be expressed as *two*
hexadecimal digits.

Let's look at the *places* for hexadecimal for the decimal number 42. There's a
sixteenth's place and a one's place in this example.

| __Place__ | 16 | 1 |
|:----------|---:|--:|
| __Digit__ |  2 | A |

This might seem confusing at first but just like our other base examples, this
is:

```
(16 * 2) + (A * 1)
```

However, since `A` is really `10` in decimal this resolves to this in decimal.

```
(16 * 2) + (10 * 1) = 42
```

Using this you can see that the maximum value for a two digit hexadecimal number
is `FF`, which is `255` in decimal and `11111111` in binary.

This happens to be the maximum value of one byte.

```
FF = 255 = 11111111 = 1 byte
```

So instead of typing out an entire string of 1s and 0s we can write bytes as a
sequence of 2 digit hexadecimal numbers. We usually separate these numbers by
spaces or some other delimiter to make it clear they are a sequence of numbers:

For instance this sequence of numbers in decimal:

```
4 8 15 16 23 42
```

is the following in binary:

```
00000100 00001000 00001111 00010000 00010111 00101010
```

But in Hexadecimal it's only this:

```
04 08 0F 10 17 2A
```

I hope you can see that this is a really compact and convenient way to represent
binary numbers. The numbers are always the same length, which is good for data
storage, and they can be easily translated back to binary. It might also help
rescue you from [Mars].

### The `0x` Notation

Sometimes you will see hexadecimal numbers represented by prepending a `0x` to
the front of them.  So our 42 would be expressed like this:

```
0x2A
```

## In JavaScript

In JavaScript, we can use `toString` on `Number` objects to convert different
bases to decimal. We can supply a base as an argument to `toString`.

```javascript
Number(42).toString(16) // 2a
Number(42).toString(2) // 101010
```

We can also use our old friend `parseInt` with an optional second argument to
convert a binary or hexadecimal string to a decimal number.

```javascript
parseInt('101010', 2) // 42
parseInt('2A', 16) // 42
```

# In conclusion

Binary and hexadecimal are often used in computing because computers are
fundamentally base 2. As you move closer to the hardware, you encounter these
more and more often.  In networking, you will see them used for IP Addresses and
MAC Addresses.  We'll learn more about that when we look next at how IP
Networking works in the next section.

[Mars]:https://www.businessinsider.com/the-martian-hexidecimal-language-2015-9
