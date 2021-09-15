# Built-in Types



## Built-in Types

The following sections describe the standard types that are built into the interpreter.

The principal built-in types are numerics, sequences, mappings, classes, instances and exceptions.

Some collection classes are mutable. The methods that add, subtract, or rearrange their members in place, and don’t return a specific item, never return the collection instance itself but `None`.

Some operations are supported by several object types; in particular, practically all objects can be compared for equality, tested for truth value, and converted to a string \(with the [`repr()`](https://docs.python.org/3/library/functions.html#repr) function or the slightly different [`str()`](https://docs.python.org/3/library/stdtypes.html#str) function\). The latter function is implicitly used when an object is written by the [`print()`](https://docs.python.org/3/library/functions.html#print) function.

### Truth Value Testing

Any object can be tested for truth value, for use in an [`if`](https://docs.python.org/3/reference/compound_stmts.html#if) or [`while`](https://docs.python.org/3/reference/compound_stmts.html#while) condition or as operand of the Boolean operations below.

By default, an object is considered true unless its class defines either a [`__bool__()`](https://docs.python.org/3/reference/datamodel.html#object.__bool__) method that returns `False` or a [`__len__()`](https://docs.python.org/3/reference/datamodel.html#object.__len__) method that returns zero, when called with the object. [1](https://docs.python.org/3/library/stdtypes.html#id12) Here are most of the built-in objects considered false:

>

* constants defined to be false: `None` and `False`.
* zero of any numeric type: `0`, `0.0`, `0j`, `Decimal(0)`, `Fraction(0, 1)`
* empty sequences and collections: `''`, `()`, `[]`, `{}`, `set()`, `range(0)`

Operations and built-in functions that have a Boolean result always return `0` or `False` for false and `1` or `True` for true, unless otherwise stated. \(Important exception: the Boolean operations `or` and `and` always return one of their operands.\)

### Boolean Operations — `and`, `or`, `not`

These are the Boolean operations, ordered by ascending priority:

| Operation | Result | Notes |
| :--- | :--- | :--- |
| `x or y` | if _x_ is false, then _y_, else _x_ | \(1\) |
| `x and y` | if _x_ is false, then _x_, else _y_ | \(2\) |
| `not x` | if _x_ is false, then `True`, else `False` | \(3\) |

Notes:

1. This is a short-circuit operator, so it only evaluates the second argument if the first one is false.
2. This is a short-circuit operator, so it only evaluates the second argument if the first one is true.
3. `not` has a lower priority than non-Boolean operators, so `not a == b` is interpreted as `not (a == b)`, and `a == not b` is a syntax error.

### Comparisons

There are eight comparison operations in Python. They all have the same priority \(which is higher than that of the Boolean operations\). Comparisons can be chained arbitrarily; for example, `x < y <= z` is equivalent to `x < y and y <= z`, except that _y_ is evaluated only once \(but in both cases _z_ is not evaluated at all when `x < y` is found to be false\).

This table summarizes the comparison operations:

| Operation | Meaning |
| :--- | :--- |
| `<` | strictly less than |
| `<=` | less than or equal |
| `>` | strictly greater than |
| `>=` | greater than or equal |
| `==` | equal |
| `!=` | not equal |
| `is` | object identity |
| `is not` | negated object identity |

Objects of different types, except different numeric types, never compare equal. The `==` operator is always defined but for some object types \(for example, class objects\) is equivalent to [`is`](https://docs.python.org/3/reference/expressions.html#is). The `<`, `<=`, `>` and `>=` operators are only defined where they make sense; for example, they raise a [`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError) exception when one of the arguments is a complex number.

Non-identical instances of a class normally compare as non-equal unless the class defines the [`__eq__()`](https://docs.python.org/3/reference/datamodel.html#object.__eq__) method.

Instances of a class cannot be ordered with respect to other instances of the same class, or other types of object, unless the class defines enough of the methods [`__lt__()`](https://docs.python.org/3/reference/datamodel.html#object.__lt__), [`__le__()`](https://docs.python.org/3/reference/datamodel.html#object.__le__), [`__gt__()`](https://docs.python.org/3/reference/datamodel.html#object.__gt__), and [`__ge__()`](https://docs.python.org/3/reference/datamodel.html#object.__ge__) \(in general, [`__lt__()`](https://docs.python.org/3/reference/datamodel.html#object.__lt__) and [`__eq__()`](https://docs.python.org/3/reference/datamodel.html#object.__eq__) are sufficient, if you want the conventional meanings of the comparison operators\).

The behavior of the [`is`](https://docs.python.org/3/reference/expressions.html#is) and [`is not`](https://docs.python.org/3/reference/expressions.html#is-not) operators cannot be customized; also they can be applied to any two objects and never raise an exception.

Two more operations with the same syntactic priority, [`in`](https://docs.python.org/3/reference/expressions.html#in) and [`not in`](https://docs.python.org/3/reference/expressions.html#not-in), are supported by types that are [iterable](https://docs.python.org/3/glossary.html#term-iterable) or implement the [`__contains__()`](https://docs.python.org/3/reference/datamodel.html#object.__contains__) method.

### Numeric Types — [`int`](https://docs.python.org/3/library/functions.html#int), [`float`](https://docs.python.org/3/library/functions.html#float), [`complex`](https://docs.python.org/3/library/functions.html#complex)

There are three distinct numeric types: _integers_, _floating point numbers_, and _complex numbers_. In addition, Booleans are a subtype of integers. Integers have unlimited precision. Floating point numbers are usually implemented using `double` in C; information about the precision and internal representation of floating point numbers for the machine on which your program is running is available in [`sys.float_info`](https://docs.python.org/3/library/sys.html#sys.float_info). Complex numbers have a real and imaginary part, which are each a floating point number. To extract these parts from a complex number _z_, use `z.real` and `z.imag`. \(The standard library includes the additional numeric types [`fractions.Fraction`](https://docs.python.org/3/library/fractions.html#fractions.Fraction), for rationals, and [`decimal.Decimal`](https://docs.python.org/3/library/decimal.html#decimal.Decimal), for floating-point numbers with user-definable precision.\)

Numbers are created by numeric literals or as the result of built-in functions and operators. Unadorned integer literals \(including hex, octal and binary numbers\) yield integers. Numeric literals containing a decimal point or an exponent sign yield floating point numbers. Appending `'j'` or `'J'` to a numeric literal yields an imaginary number \(a complex number with a zero real part\) which you can add to an integer or float to get a complex number with real and imaginary parts.

Python fully supports mixed arithmetic: when a binary arithmetic operator has operands of different numeric types, the operand with the “narrower” type is widened to that of the other, where integer is narrower than floating point, which is narrower than complex. A comparison between numbers of different types behaves as though the exact values of those numbers were being compared. [2](https://docs.python.org/3/library/stdtypes.html#id13)

The constructors [`int()`](https://docs.python.org/3/library/functions.html#int), [`float()`](https://docs.python.org/3/library/functions.html#float), and [`complex()`](https://docs.python.org/3/library/functions.html#complex) can be used to produce numbers of a specific type.

All numeric types \(except complex\) support the following operations \(for priorities of the operations, see [Operator precedence](https://docs.python.org/3/reference/expressions.html#operator-summary)\):

| Operation | Result | Notes | Full documentation |
| :--- | :--- | :--- | :--- |
| `x + y` | sum of _x_ and _y_ |  |  |
| `x - y` | difference of _x_ and _y_ |  |  |
| `x * y` | product of _x_ and _y_ |  |  |
| `x / y` | quotient of _x_ and _y_ |  |  |
| `x // y` | floored quotient of _x_ and _y_ | \(1\) |  |
| `x % y` | remainder of `x / y` | \(2\) |  |
| `-x` | _x_ negated |  |  |
| `+x` | _x_ unchanged |  |  |
| `abs(x)` | absolute value or magnitude of _x_ |  | [`abs()`](https://docs.python.org/3/library/functions.html#abs) |
| `int(x)` | _x_ converted to integer | \(3\)\(6\) | [`int()`](https://docs.python.org/3/library/functions.html#int) |
| `float(x)` | _x_ converted to floating point | \(4\)\(6\) | [`float()`](https://docs.python.org/3/library/functions.html#float) |
| `complex(re, im)` | a complex number with real part _re_, imaginary part _im_. _im_ defaults to zero. | \(6\) | [`complex()`](https://docs.python.org/3/library/functions.html#complex) |
| `c.conjugate()` | conjugate of the complex number _c_ |  |  |
| `divmod(x, y)` | the pair `(x // y, x % y)` | \(2\) | [`divmod()`](https://docs.python.org/3/library/functions.html#divmod) |
| `pow(x, y)` | _x_ to the power _y_ | \(5\) | [`pow()`](https://docs.python.org/3/library/functions.html#pow) |
| `x ** y` | _x_ to the power _y_ | \(5\) |  |

Notes:

1. Also referred to as integer division. The resultant value is a whole integer, though the result’s type is not necessarily int. The result is always rounded towards minus infinity: `1//2` is `0`, `(-1)//2` is `-1`, `1//(-2)` is `-1`, and `(-1)//(-2)` is `0`.
2. Not for complex numbers. Instead convert to floats using [`abs()`](https://docs.python.org/3/library/functions.html#abs) if appropriate.
3. Conversion from floating point to integer may round or truncate as in C; see functions [`math.floor()`](https://docs.python.org/3/library/math.html#math.floor) and [`math.ceil()`](https://docs.python.org/3/library/math.html#math.ceil) for well-defined conversions.
4. float also accepts the strings “nan” and “inf” with an optional prefix “+” or “-” for Not a Number \(NaN\) and positive or negative infinity.
5. Python defines `pow(0, 0)` and `0 ** 0` to be `1`, as is common for programming languages.
6. The numeric literals accepted include the digits `0` to `9` or any Unicode equivalent \(code points with the `Nd` property\).

   See [https://www.unicode.org/Public/13.0.0/ucd/extracted/DerivedNumericType.txt](https://www.unicode.org/Public/13.0.0/ucd/extracted/DerivedNumericType.txt) for a complete list of code points with the `Nd` property.

All [`numbers.Real`](https://docs.python.org/3/library/numbers.html#numbers.Real) types \([`int`](https://docs.python.org/3/library/functions.html#int) and [`float`](https://docs.python.org/3/library/functions.html#float)\) also include the following operations:

| Operation | Result |
| :--- | :--- |
| [`math.trunc(x)`](https://docs.python.org/3/library/math.html#math.trunc) | _x_ truncated to [`Integral`](https://docs.python.org/3/library/numbers.html#numbers.Integral) |
| [`round(x[, n])`](https://docs.python.org/3/library/functions.html#round) | _x_ rounded to _n_ digits, rounding half to even. If _n_ is omitted, it defaults to 0. |
| [`math.floor(x)`](https://docs.python.org/3/library/math.html#math.floor) | the greatest [`Integral`](https://docs.python.org/3/library/numbers.html#numbers.Integral) &lt;= _x_ |
| [`math.ceil(x)`](https://docs.python.org/3/library/math.html#math.ceil) | the least [`Integral`](https://docs.python.org/3/library/numbers.html#numbers.Integral) &gt;= _x_ |

For additional numeric operations see the [`math`](https://docs.python.org/3/library/math.html#module-math) and [`cmath`](https://docs.python.org/3/library/cmath.html#module-cmath) modules.

#### Bitwise Operations on Integer Types

Bitwise operations only make sense for integers. The result of bitwise operations is calculated as though carried out in two’s complement with an infinite number of sign bits.

The priorities of the binary bitwise operations are all lower than the numeric operations and higher than the comparisons; the unary operation `~` has the same priority as the other unary numeric operations \(`+` and `-`\).

This table lists the bitwise operations sorted in ascending priority:

| Operation | Result | Notes |
| :--- | :--- | :--- |
| `x | y` | bitwise _or_ of _x_ and _y_ | \(4\) |
| `x ^ y` | bitwise _exclusive or_ of _x_ and _y_ | \(4\) |
| `x & y` | bitwise _and_ of _x_ and _y_ | \(4\) |
| `x << n` | _x_ shifted left by _n_ bits | \(1\)\(2\) |
| `x >> n` | _x_ shifted right by _n_ bits | \(1\)\(3\) |
| `~x` | the bits of _x_ inverted |  |

Notes:

1. Negative shift counts are illegal and cause a [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) to be raised.
2. A left shift by _n_ bits is equivalent to multiplication by `pow(2, n)`.
3. A right shift by _n_ bits is equivalent to floor division by `pow(2, n)`.
4. Performing these calculations with at least one extra sign extension bit in a finite two’s complement representation \(a working bit-width of `1 + max(x.bit_length(), y.bit_length())` or more\) is sufficient to get the same result as if there were an infinite number of sign bits.

#### Additional Methods on Integer Types

The int type implements the [`numbers.Integral`](https://docs.python.org/3/library/numbers.html#numbers.Integral) [abstract base class](https://docs.python.org/3/glossary.html#term-abstract-base-class). In addition, it provides a few more methods:`int.bit_length`\(\)

Return the number of bits necessary to represent an integer in binary, excluding the sign and leading zeros:&gt;&gt;&gt;

```text
>>> n = -37
>>> bin(n)
'-0b100101'
>>> n.bit_length()
6
```

More precisely, if `x` is nonzero, then `x.bit_length()` is the unique positive integer `k` such that `2**(k-1) <= abs(x) < 2**k`. Equivalently, when `abs(x)` is small enough to have a correctly rounded logarithm, then `k = 1 + int(log(abs(x), 2))`. If `x` is zero, then `x.bit_length()` returns `0`.

Equivalent to:

```text
def bit_length(self):
    s = bin(self)       # binary representation:  bin(-37) --> '-0b100101'
    s = s.lstrip('-0b') # remove leading zeros and minus sign
    return len(s)       # len('100101') --> 6
```

New in version 3.1.`int.to_bytes`\(_length_, _byteorder_, _\*_, _signed=False_\)

Return an array of bytes representing an integer.&gt;&gt;&gt;

```text
>>> (1024).to_bytes(2, byteorder='big')
b'\x04\x00'
>>> (1024).to_bytes(10, byteorder='big')
b'\x00\x00\x00\x00\x00\x00\x00\x00\x04\x00'
>>> (-1024).to_bytes(10, byteorder='big', signed=True)
b'\xff\xff\xff\xff\xff\xff\xff\xff\xfc\x00'
>>> x = 1000
>>> x.to_bytes((x.bit_length() + 7) // 8, byteorder='little')
b'\xe8\x03'
```

The integer is represented using _length_ bytes. An [`OverflowError`](https://docs.python.org/3/library/exceptions.html#OverflowError) is raised if the integer is not representable with the given number of bytes.

The _byteorder_ argument determines the byte order used to represent the integer. If _byteorder_ is `"big"`, the most significant byte is at the beginning of the byte array. If _byteorder_ is `"little"`, the most significant byte is at the end of the byte array. To request the native byte order of the host system, use [`sys.byteorder`](https://docs.python.org/3/library/sys.html#sys.byteorder) as the byte order value.

The _signed_ argument determines whether two’s complement is used to represent the integer. If _signed_ is `False` and a negative integer is given, an [`OverflowError`](https://docs.python.org/3/library/exceptions.html#OverflowError) is raised. The default value for _signed_ is `False`.

New in version 3.2._classmethod_ `int.from_bytes`\(_bytes_, _byteorder_, _\*_, _signed=False_\)

Return the integer represented by the given array of bytes.&gt;&gt;&gt;

```text
>>> int.from_bytes(b'\x00\x10', byteorder='big')
16
>>> int.from_bytes(b'\x00\x10', byteorder='little')
4096
>>> int.from_bytes(b'\xfc\x00', byteorder='big', signed=True)
-1024
>>> int.from_bytes(b'\xfc\x00', byteorder='big', signed=False)
64512
>>> int.from_bytes([255, 0, 0], byteorder='big')
16711680
```

The argument _bytes_ must either be a [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object) or an iterable producing bytes.

The _byteorder_ argument determines the byte order used to represent the integer. If _byteorder_ is `"big"`, the most significant byte is at the beginning of the byte array. If _byteorder_ is `"little"`, the most significant byte is at the end of the byte array. To request the native byte order of the host system, use [`sys.byteorder`](https://docs.python.org/3/library/sys.html#sys.byteorder) as the byte order value.

The _signed_ argument indicates whether two’s complement is used to represent the integer.

New in version 3.2.`int.as_integer_ratio`\(\)

Return a pair of integers whose ratio is exactly equal to the original integer and with a positive denominator. The integer ratio of integers \(whole numbers\) is always the integer as the numerator and `1` as the denominator.

New in version 3.8.

#### Additional Methods on Float

The float type implements the [`numbers.Real`](https://docs.python.org/3/library/numbers.html#numbers.Real) [abstract base class](https://docs.python.org/3/glossary.html#term-abstract-base-class). float also has the following additional methods.`float.as_integer_ratio`\(\)

Return a pair of integers whose ratio is exactly equal to the original float and with a positive denominator. Raises [`OverflowError`](https://docs.python.org/3/library/exceptions.html#OverflowError) on infinities and a [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) on NaNs.`float.is_integer`\(\)

Return `True` if the float instance is finite with integral value, and `False` otherwise:&gt;&gt;&gt;

```text
>>> (-2.0).is_integer()
True
>>> (3.2).is_integer()
False
```

Two methods support conversion to and from hexadecimal strings. Since Python’s floats are stored internally as binary numbers, converting a float to or from a _decimal_ string usually involves a small rounding error. In contrast, hexadecimal strings allow exact representation and specification of floating-point numbers. This can be useful when debugging, and in numerical work.`float.hex`\(\)

Return a representation of a floating-point number as a hexadecimal string. For finite floating-point numbers, this representation will always include a leading `0x` and a trailing `p` and exponent._classmethod_ `float.fromhex`\(_s_\)

Class method to return the float represented by a hexadecimal string _s_. The string _s_ may have leading and trailing whitespace.

Note that [`float.hex()`](https://docs.python.org/3/library/stdtypes.html#float.hex) is an instance method, while [`float.fromhex()`](https://docs.python.org/3/library/stdtypes.html#float.fromhex) is a class method.

A hexadecimal string takes the form:

```text
[sign] ['0x'] integer ['.' fraction] ['p' exponent]
```

where the optional `sign` may by either `+` or `-`, `integer` and `fraction` are strings of hexadecimal digits, and `exponent` is a decimal integer with an optional leading sign. Case is not significant, and there must be at least one hexadecimal digit in either the integer or the fraction. This syntax is similar to the syntax specified in section 6.4.4.2 of the C99 standard, and also to the syntax used in Java 1.5 onwards. In particular, the output of [`float.hex()`](https://docs.python.org/3/library/stdtypes.html#float.hex) is usable as a hexadecimal floating-point literal in C or Java code, and hexadecimal strings produced by C’s `%a` format character or Java’s `Double.toHexString` are accepted by [`float.fromhex()`](https://docs.python.org/3/library/stdtypes.html#float.fromhex).

Note that the exponent is written in decimal rather than hexadecimal, and that it gives the power of 2 by which to multiply the coefficient. For example, the hexadecimal string `0x3.a7p10` represents the floating-point number `(3 + 10./16 + 7./16**2) * 2.0**10`, or `3740.0`:&gt;&gt;&gt;

```text
>>> float.fromhex('0x3.a7p10')
3740.0
```

Applying the reverse conversion to `3740.0` gives a different hexadecimal string representing the same number:&gt;&gt;&gt;

```text
>>> float.hex(3740.0)
'0x1.d380000000000p+11'
```

#### Hashing of numeric types

For numbers `x` and `y`, possibly of different types, it’s a requirement that `hash(x) == hash(y)` whenever `x == y` \(see the [`__hash__()`](https://docs.python.org/3/reference/datamodel.html#object.__hash__) method documentation for more details\). For ease of implementation and efficiency across a variety of numeric types \(including [`int`](https://docs.python.org/3/library/functions.html#int), [`float`](https://docs.python.org/3/library/functions.html#float), [`decimal.Decimal`](https://docs.python.org/3/library/decimal.html#decimal.Decimal) and [`fractions.Fraction`](https://docs.python.org/3/library/fractions.html#fractions.Fraction)\) Python’s hash for numeric types is based on a single mathematical function that’s defined for any rational number, and hence applies to all instances of [`int`](https://docs.python.org/3/library/functions.html#int) and [`fractions.Fraction`](https://docs.python.org/3/library/fractions.html#fractions.Fraction), and all finite instances of [`float`](https://docs.python.org/3/library/functions.html#float) and [`decimal.Decimal`](https://docs.python.org/3/library/decimal.html#decimal.Decimal). Essentially, this function is given by reduction modulo `P` for a fixed prime `P`. The value of `P` is made available to Python as the `modulus` attribute of [`sys.hash_info`](https://docs.python.org/3/library/sys.html#sys.hash_info).

**CPython implementation detail:** Currently, the prime used is `P = 2**31 - 1` on machines with 32-bit C longs and `P = 2**61 - 1` on machines with 64-bit C longs.

Here are the rules in detail:

* If `x = m / n` is a nonnegative rational number and `n` is not divisible by `P`, define `hash(x)` as `m * invmod(n, P) % P`, where `invmod(n, P)` gives the inverse of `n` modulo `P`.
* If `x = m / n` is a nonnegative rational number and `n` is divisible by `P` \(but `m` is not\) then `n` has no inverse modulo `P` and the rule above doesn’t apply; in this case define `hash(x)` to be the constant value `sys.hash_info.inf`.
* If `x = m / n` is a negative rational number define `hash(x)` as `-hash(-x)`. If the resulting hash is `-1`, replace it with `-2`.
* The particular values `sys.hash_info.inf`, `-sys.hash_info.inf` and `sys.hash_info.nan` are used as hash values for positive infinity, negative infinity, or nans \(respectively\). \(All hashable nans have the same hash value.\)
* For a [`complex`](https://docs.python.org/3/library/functions.html#complex) number `z`, the hash values of the real and imaginary parts are combined by computing `hash(z.real) + sys.hash_info.imag * hash(z.imag)`, reduced modulo `2**sys.hash_info.width` so that it lies in `range(-2**(sys.hash_info.width - 1), 2**(sys.hash_info.width - 1))`. Again, if the result is `-1`, it’s replaced with `-2`.

To clarify the above rules, here’s some example Python code, equivalent to the built-in hash, for computing the hash of a rational number, [`float`](https://docs.python.org/3/library/functions.html#float), or [`complex`](https://docs.python.org/3/library/functions.html#complex):

```text
import sys, math

def hash_fraction(m, n):
    """Compute the hash of a rational number m / n.

    Assumes m and n are integers, with n positive.
    Equivalent to hash(fractions.Fraction(m, n)).

    """
    P = sys.hash_info.modulus
    # Remove common factors of P.  (Unnecessary if m and n already coprime.)
    while m % P == n % P == 0:
        m, n = m // P, n // P

    if n % P == 0:
        hash_value = sys.hash_info.inf
    else:
        # Fermat's Little Theorem: pow(n, P-1, P) is 1, so
        # pow(n, P-2, P) gives the inverse of n modulo P.
        hash_value = (abs(m) % P) * pow(n, P - 2, P) % P
    if m < 0:
        hash_value = -hash_value
    if hash_value == -1:
        hash_value = -2
    return hash_value

def hash_float(x):
    """Compute the hash of a float x."""

    if math.isnan(x):
        return sys.hash_info.nan
    elif math.isinf(x):
        return sys.hash_info.inf if x > 0 else -sys.hash_info.inf
    else:
        return hash_fraction(*x.as_integer_ratio())

def hash_complex(z):
    """Compute the hash of a complex number z."""

    hash_value = hash_float(z.real) + sys.hash_info.imag * hash_float(z.imag)
    # do a signed reduction modulo 2**sys.hash_info.width
    M = 2**(sys.hash_info.width - 1)
    hash_value = (hash_value & (M - 1)) - (hash_value & M)
    if hash_value == -1:
        hash_value = -2
    return hash_value
```

### Iterator Types

Python supports a concept of iteration over containers. This is implemented using two distinct methods; these are used to allow user-defined classes to support iteration. Sequences, described below in more detail, always support the iteration methods.

One method needs to be defined for container objects to provide iteration support:`container.__iter__`\(\)

Return an iterator object. The object is required to support the iterator protocol described below. If a container supports different types of iteration, additional methods can be provided to specifically request iterators for those iteration types. \(An example of an object supporting multiple forms of iteration would be a tree structure which supports both breadth-first and depth-first traversal.\) This method corresponds to the [`tp_iter`](https://docs.python.org/3/c-api/typeobj.html#c.PyTypeObject.tp_iter) slot of the type structure for Python objects in the Python/C API.

The iterator objects themselves are required to support the following two methods, which together form the _iterator protocol_:`iterator.__iter__`\(\)

Return the iterator object itself. This is required to allow both containers and iterators to be used with the [`for`](https://docs.python.org/3/reference/compound_stmts.html#for) and [`in`](https://docs.python.org/3/reference/expressions.html#in) statements. This method corresponds to the [`tp_iter`](https://docs.python.org/3/c-api/typeobj.html#c.PyTypeObject.tp_iter) slot of the type structure for Python objects in the Python/C API.`iterator.__next__`\(\)

Return the next item from the container. If there are no further items, raise the [`StopIteration`](https://docs.python.org/3/library/exceptions.html#StopIteration) exception. This method corresponds to the [`tp_iternext`](https://docs.python.org/3/c-api/typeobj.html#c.PyTypeObject.tp_iternext) slot of the type structure for Python objects in the Python/C API.

Python defines several iterator objects to support iteration over general and specific sequence types, dictionaries, and other more specialized forms. The specific types are not important beyond their implementation of the iterator protocol.

Once an iterator’s [`__next__()`](https://docs.python.org/3/library/stdtypes.html#iterator.__next__) method raises [`StopIteration`](https://docs.python.org/3/library/exceptions.html#StopIteration), it must continue to do so on subsequent calls. Implementations that do not obey this property are deemed broken.

#### Generator Types

Python’s [generator](https://docs.python.org/3/glossary.html#term-generator)s provide a convenient way to implement the iterator protocol. If a container object’s [`__iter__()`](https://docs.python.org/3/reference/datamodel.html#object.__iter__) method is implemented as a generator, it will automatically return an iterator object \(technically, a generator object\) supplying the [`__iter__()`](https://docs.python.org/3/reference/datamodel.html#object.__iter__) and [`__next__()`](https://docs.python.org/3/reference/expressions.html#generator.__next__) methods. More information about generators can be found in [the documentation for the yield expression](https://docs.python.org/3/reference/expressions.html#yieldexpr).

### Sequence Types — [`list`](https://docs.python.org/3/library/stdtypes.html#list), [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple), [`range`](https://docs.python.org/3/library/stdtypes.html#range)

There are three basic sequence types: lists, tuples, and range objects. Additional sequence types tailored for processing of [binary data](https://docs.python.org/3/library/stdtypes.html#binaryseq) and [text strings](https://docs.python.org/3/library/stdtypes.html#textseq) are described in dedicated sections.

#### Common Sequence Operations

The operations in the following table are supported by most sequence types, both mutable and immutable. The [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence) ABC is provided to make it easier to correctly implement these operations on custom sequence types.

This table lists the sequence operations sorted in ascending priority. In the table, _s_ and _t_ are sequences of the same type, _n_, _i_, _j_ and _k_ are integers and _x_ is an arbitrary object that meets any type and value restrictions imposed by _s_.

The `in` and `not in` operations have the same priorities as the comparison operations. The `+` \(concatenation\) and `*` \(repetition\) operations have the same priority as the corresponding numeric operations. [3](https://docs.python.org/3/library/stdtypes.html#id14)

| Operation | Result | Notes |
| :--- | :--- | :--- |
| `x in s` | `True` if an item of _s_ is equal to _x_, else `False` | \(1\) |
| `x not in s` | `False` if an item of _s_ is equal to _x_, else `True` | \(1\) |
| `s + t` | the concatenation of _s_ and _t_ | \(6\)\(7\) |
| `s * n` or `n * s` | equivalent to adding _s_ to itself _n_ times | \(2\)\(7\) |
| `s[i]` | _i_th item of _s_, origin 0 | \(3\) |
| `s[i:j]` | slice of _s_ from _i_ to _j_ | \(3\)\(4\) |
| `s[i:j:k]` | slice of _s_ from _i_ to _j_ with step _k_ | \(3\)\(5\) |
| `len(s)` | length of _s_ |  |
| `min(s)` | smallest item of _s_ |  |
| `max(s)` | largest item of _s_ |  |
| `s.index(x[, i[, j]])` | index of the first occurrence of _x_ in _s_ \(at or after index _i_ and before index _j_\) | \(8\) |
| `s.count(x)` | total number of occurrences of _x_ in _s_ |  |

Sequences of the same type also support comparisons. In particular, tuples and lists are compared lexicographically by comparing corresponding elements. This means that to compare equal, every element must compare equal and the two sequences must be of the same type and have the same length. \(For full details see [Comparisons](https://docs.python.org/3/reference/expressions.html#comparisons) in the language reference.\)

Notes:

1. While the `in` and `not in` operations are used only for simple containment testing in the general case, some specialised sequences \(such as [`str`](https://docs.python.org/3/library/stdtypes.html#str), [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) and [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray)\) also use them for subsequence testing:&gt;&gt;&gt;

   ```text
   >>> "gg" in "eggs"
   True
   ```

2. Values of _n_ less than `0` are treated as `0` \(which yields an empty sequence of the same type as _s_\). Note that items in the sequence _s_ are not copied; they are referenced multiple times. This often haunts new Python programmers; consider:&gt;&gt;&gt;

   ```text
   >>> lists = [[]] * 3
   >>> lists
   [[], [], []]
   >>> lists[0].append(3)
   >>> lists
   [[3], [3], [3]]
   ```

   What has happened is that `[[]]` is a one-element list containing an empty list, so all three elements of `[[]] * 3` are references to this single empty list. Modifying any of the elements of `lists` modifies this single list. You can create a list of different lists this way:&gt;&gt;&gt;

   ```text
   >>> lists = [[] for i in range(3)]
   >>> lists[0].append(3)
   >>> lists[1].append(5)
   >>> lists[2].append(7)
   >>> lists
   [[3], [5], [7]]
   ```

   Further explanation is available in the FAQ entry [How do I create a multidimensional list?](https://docs.python.org/3/faq/programming.html#faq-multidimensional-list).

3. If _i_ or _j_ is negative, the index is relative to the end of sequence _s_: `len(s) + i` or `len(s) + j` is substituted. But note that `-0` is still `0`.
4. The slice of _s_ from _i_ to _j_ is defined as the sequence of items with index _k_ such that `i <= k < j`. If _i_ or _j_ is greater than `len(s)`, use `len(s)`. If _i_ is omitted or `None`, use `0`. If _j_ is omitted or `None`, use `len(s)`. If _i_ is greater than or equal to _j_, the slice is empty.
5. The slice of _s_ from _i_ to _j_ with step _k_ is defined as the sequence of items with index `x = i + n*k` such that `0 <= n < (j-i)/k`. In other words, the indices are `i`, `i+k`, `i+2*k`, `i+3*k` and so on, stopping when _j_ is reached \(but never including _j_\). When _k_ is positive, _i_ and _j_ are reduced to `len(s)` if they are greater. When _k_ is negative, _i_ and _j_ are reduced to `len(s) - 1` if they are greater. If _i_ or _j_ are omitted or `None`, they become “end” values \(which end depends on the sign of _k_\). Note, _k_ cannot be zero. If _k_ is `None`, it is treated like `1`.
6. Concatenating immutable sequences always results in a new object. This means that building up a sequence by repeated concatenation will have a quadratic runtime cost in the total sequence length. To get a linear runtime cost, you must switch to one of the alternatives below:
   * if concatenating [`str`](https://docs.python.org/3/library/stdtypes.html#str) objects, you can build a list and use [`str.join()`](https://docs.python.org/3/library/stdtypes.html#str.join) at the end or else write to an [`io.StringIO`](https://docs.python.org/3/library/io.html#io.StringIO) instance and retrieve its value when complete
   * if concatenating [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) objects, you can similarly use [`bytes.join()`](https://docs.python.org/3/library/stdtypes.html#bytes.join) or [`io.BytesIO`](https://docs.python.org/3/library/io.html#io.BytesIO), or you can do in-place concatenation with a [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray) object. [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray) objects are mutable and have an efficient overallocation mechanism
   * if concatenating [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple) objects, extend a [`list`](https://docs.python.org/3/library/stdtypes.html#list) instead
   * for other types, investigate the relevant class documentation
7. Some sequence types \(such as [`range`](https://docs.python.org/3/library/stdtypes.html#range)\) only support item sequences that follow specific patterns, and hence don’t support sequence concatenation or repetition.
8. `index` raises [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) when _x_ is not found in _s_. Not all implementations support passing the additional arguments _i_ and _j_. These arguments allow efficient searching of subsections of the sequence. Passing the extra arguments is roughly equivalent to using `s[i:j].index(x)`, only without copying any data and with the returned index being relative to the start of the sequence rather than the start of the slice.

#### Immutable Sequence Types

The only operation that immutable sequence types generally implement that is not also implemented by mutable sequence types is support for the [`hash()`](https://docs.python.org/3/library/functions.html#hash) built-in.

This support allows immutable sequences, such as [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple) instances, to be used as [`dict`](https://docs.python.org/3/library/stdtypes.html#dict) keys and stored in [`set`](https://docs.python.org/3/library/stdtypes.html#set) and [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset) instances.

Attempting to hash an immutable sequence that contains unhashable values will result in [`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError).

#### Mutable Sequence Types

The operations in the following table are defined on mutable sequence types. The [`collections.abc.MutableSequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.MutableSequence) ABC is provided to make it easier to correctly implement these operations on custom sequence types.

In the table _s_ is an instance of a mutable sequence type, _t_ is any iterable object and _x_ is an arbitrary object that meets any type and value restrictions imposed by _s_ \(for example, [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray) only accepts integers that meet the value restriction `0 <= x <= 255`\).

| Operation | Result | Notes |
| :--- | :--- | :--- |
| `s[i] = x` | item _i_ of _s_ is replaced by _x_ |  |
| `s[i:j] = t` | slice of _s_ from _i_ to _j_ is replaced by the contents of the iterable _t_ |  |
| `del s[i:j]` | same as `s[i:j] = []` |  |
| `s[i:j:k] = t` | the elements of `s[i:j:k]` are replaced by those of _t_ | \(1\) |
| `del s[i:j:k]` | removes the elements of `s[i:j:k]` from the list |  |
| `s.append(x)` | appends _x_ to the end of the sequence \(same as `s[len(s):len(s)] = [x]`\) |  |
| `s.clear()` | removes all items from _s_ \(same as `del s[:]`\) | \(5\) |
| `s.copy()` | creates a shallow copy of _s_ \(same as `s[:]`\) | \(5\) |
| `s.extend(t)` or `s += t` | extends _s_ with the contents of _t_ \(for the most part the same as `s[len(s):len(s)] = t`\) |  |
| `s *= n` | updates _s_ with its contents repeated _n_ times | \(6\) |
| `s.insert(i, x)` | inserts _x_ into _s_ at the index given by _i_ \(same as `s[i:i] = [x]`\) |  |
| `s.pop()` or `s.pop(i)` | retrieves the item at _i_ and also removes it from _s_ | \(2\) |
| `s.remove(x)` | remove the first item from _s_ where `s[i]` is equal to _x_ | \(3\) |
| `s.reverse()` | reverses the items of _s_ in place | \(4\) |

Notes:

1. _t_ must have the same length as the slice it is replacing.
2. The optional argument _i_ defaults to `-1`, so that by default the last item is removed and returned.
3. `remove()` raises [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) when _x_ is not found in _s_.
4. The `reverse()` method modifies the sequence in place for economy of space when reversing a large sequence. To remind users that it operates by side effect, it does not return the reversed sequence.
5. `clear()` and `copy()` are included for consistency with the interfaces of mutable containers that don’t support slicing operations \(such as [`dict`](https://docs.python.org/3/library/stdtypes.html#dict) and [`set`](https://docs.python.org/3/library/stdtypes.html#set)\). `copy()` is not part of the [`collections.abc.MutableSequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.MutableSequence) ABC, but most concrete mutable sequence classes provide it.

   New in version 3.3: `clear()` and `copy()` methods.

6. The value _n_ is an integer, or an object implementing [`__index__()`](https://docs.python.org/3/reference/datamodel.html#object.__index__). Zero and negative values of _n_ clear the sequence. Items in the sequence are not copied; they are referenced multiple times, as explained for `s * n` under [Common Sequence Operations](https://docs.python.org/3/library/stdtypes.html#typesseq-common).

#### Lists

Lists are mutable sequences, typically used to store collections of homogeneous items \(where the precise degree of similarity will vary by application\)._class_ `list`\(\[_iterable_\]\)

Lists may be constructed in several ways:

* Using a pair of square brackets to denote the empty list: `[]`
* Using square brackets, separating items with commas: `[a]`, `[a, b, c]`
* Using a list comprehension: `[x for x in iterable]`
* Using the type constructor: `list()` or `list(iterable)`

The constructor builds a list whose items are the same and in the same order as _iterable_’s items. _iterable_ may be either a sequence, a container that supports iteration, or an iterator object. If _iterable_ is already a list, a copy is made and returned, similar to `iterable[:]`. For example, `list('abc')` returns `['a', 'b', 'c']` and `list( (1, 2, 3) )` returns `[1, 2, 3]`. If no argument is given, the constructor creates a new empty list, `[]`.

Many other operations also produce lists, including the [`sorted()`](https://docs.python.org/3/library/functions.html#sorted) built-in.

Lists implement all of the [common](https://docs.python.org/3/library/stdtypes.html#typesseq-common) and [mutable](https://docs.python.org/3/library/stdtypes.html#typesseq-mutable) sequence operations. Lists also provide the following additional method:`sort`\(_\*_, _key=None_, _reverse=False_\)

This method sorts the list in place, using only `<` comparisons between items. Exceptions are not suppressed - if any comparison operations fail, the entire sort operation will fail \(and the list will likely be left in a partially modified state\).

[`sort()`](https://docs.python.org/3/library/stdtypes.html#list.sort) accepts two arguments that can only be passed by keyword \([keyword-only arguments](https://docs.python.org/3/glossary.html#keyword-only-parameter)\):

_key_ specifies a function of one argument that is used to extract a comparison key from each list element \(for example, `key=str.lower`\). The key corresponding to each item in the list is calculated once and then used for the entire sorting process. The default value of `None` means that list items are sorted directly without calculating a separate key value.

The [`functools.cmp_to_key()`](https://docs.python.org/3/library/functools.html#functools.cmp_to_key) utility is available to convert a 2.x style _cmp_ function to a _key_ function.

_reverse_ is a boolean value. If set to `True`, then the list elements are sorted as if each comparison were reversed.

This method modifies the sequence in place for economy of space when sorting a large sequence. To remind users that it operates by side effect, it does not return the sorted sequence \(use [`sorted()`](https://docs.python.org/3/library/functions.html#sorted) to explicitly request a new sorted list instance\).

The [`sort()`](https://docs.python.org/3/library/stdtypes.html#list.sort) method is guaranteed to be stable. A sort is stable if it guarantees not to change the relative order of elements that compare equal — this is helpful for sorting in multiple passes \(for example, sort by department, then by salary grade\).

For sorting examples and a brief sorting tutorial, see [Sorting HOW TO](https://docs.python.org/3/howto/sorting.html#sortinghowto).

**CPython implementation detail:** While a list is being sorted, the effect of attempting to mutate, or even inspect, the list is undefined. The C implementation of Python makes the list appear empty for the duration, and raises [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) if it can detect that the list has been mutated during a sort.

#### Tuples

Tuples are immutable sequences, typically used to store collections of heterogeneous data \(such as the 2-tuples produced by the [`enumerate()`](https://docs.python.org/3/library/functions.html#enumerate) built-in\). Tuples are also used for cases where an immutable sequence of homogeneous data is needed \(such as allowing storage in a [`set`](https://docs.python.org/3/library/stdtypes.html#set) or [`dict`](https://docs.python.org/3/library/stdtypes.html#dict) instance\)._class_ `tuple`\(\[_iterable_\]\)

Tuples may be constructed in a number of ways:

* Using a pair of parentheses to denote the empty tuple: `()`
* Using a trailing comma for a singleton tuple: `a,` or `(a,)`
* Separating items with commas: `a, b, c` or `(a, b, c)`
* Using the [`tuple()`](https://docs.python.org/3/library/stdtypes.html#tuple) built-in: `tuple()` or `tuple(iterable)`

The constructor builds a tuple whose items are the same and in the same order as _iterable_’s items. _iterable_ may be either a sequence, a container that supports iteration, or an iterator object. If _iterable_ is already a tuple, it is returned unchanged. For example, `tuple('abc')` returns `('a', 'b', 'c')` and `tuple( [1, 2, 3] )` returns `(1, 2, 3)`. If no argument is given, the constructor creates a new empty tuple, `()`.

Note that it is actually the comma which makes a tuple, not the parentheses. The parentheses are optional, except in the empty tuple case, or when they are needed to avoid syntactic ambiguity. For example, `f(a, b, c)` is a function call with three arguments, while `f((a, b, c))` is a function call with a 3-tuple as the sole argument.

Tuples implement all of the [common](https://docs.python.org/3/library/stdtypes.html#typesseq-common) sequence operations.

For heterogeneous collections of data where access by name is clearer than access by index, [`collections.namedtuple()`](https://docs.python.org/3/library/collections.html#collections.namedtuple) may be a more appropriate choice than a simple tuple object.

#### Ranges

The [`range`](https://docs.python.org/3/library/stdtypes.html#range) type represents an immutable sequence of numbers and is commonly used for looping a specific number of times in [`for`](https://docs.python.org/3/reference/compound_stmts.html#for) loops._class_ `range`\(_stop_\)_class_ `range`\(_start_, _stop_\[, _step_\]\)

The arguments to the range constructor must be integers \(either built-in [`int`](https://docs.python.org/3/library/functions.html#int) or any object that implements the `__index__` special method\). If the _step_ argument is omitted, it defaults to `1`. If the _start_ argument is omitted, it defaults to `0`. If _step_ is zero, [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) is raised.

For a positive _step_, the contents of a range `r` are determined by the formula `r[i] = start + step*i` where `i >= 0` and `r[i] < stop`.

For a negative _step_, the contents of the range are still determined by the formula `r[i] = start + step*i`, but the constraints are `i >= 0` and `r[i] > stop`.

A range object will be empty if `r[0]` does not meet the value constraint. Ranges do support negative indices, but these are interpreted as indexing from the end of the sequence determined by the positive indices.

Ranges containing absolute values larger than [`sys.maxsize`](https://docs.python.org/3/library/sys.html#sys.maxsize) are permitted but some features \(such as [`len()`](https://docs.python.org/3/library/functions.html#len)\) may raise [`OverflowError`](https://docs.python.org/3/library/exceptions.html#OverflowError).

Range examples:&gt;&gt;&gt;

```text
>>> list(range(10))
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> list(range(1, 11))
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
>>> list(range(0, 30, 5))
[0, 5, 10, 15, 20, 25]
>>> list(range(0, 10, 3))
[0, 3, 6, 9]
>>> list(range(0, -10, -1))
[0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
>>> list(range(0))
[]
>>> list(range(1, 0))
[]
```

Ranges implement all of the [common](https://docs.python.org/3/library/stdtypes.html#typesseq-common) sequence operations except concatenation and repetition \(due to the fact that range objects can only represent sequences that follow a strict pattern and repetition and concatenation will usually violate that pattern\).`start`

The value of the _start_ parameter \(or `0` if the parameter was not supplied\)`stop`

The value of the _stop_ parameter`step`

The value of the _step_ parameter \(or `1` if the parameter was not supplied\)

The advantage of the [`range`](https://docs.python.org/3/library/stdtypes.html#range) type over a regular [`list`](https://docs.python.org/3/library/stdtypes.html#list) or [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple) is that a [`range`](https://docs.python.org/3/library/stdtypes.html#range) object will always take the same \(small\) amount of memory, no matter the size of the range it represents \(as it only stores the `start`, `stop` and `step` values, calculating individual items and subranges as needed\).

Range objects implement the [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence) ABC, and provide features such as containment tests, element index lookup, slicing and support for negative indices \(see [Sequence Types — list, tuple, range](https://docs.python.org/3/library/stdtypes.html#typesseq)\):&gt;&gt;&gt;

```text
>>> r = range(0, 20, 2)
>>> r
range(0, 20, 2)
>>> 11 in r
False
>>> 10 in r
True
>>> r.index(10)
5
>>> r[5]
10
>>> r[:5]
range(0, 10, 2)
>>> r[-1]
18
```

Testing range objects for equality with `==` and `!=` compares them as sequences. That is, two range objects are considered equal if they represent the same sequence of values. \(Note that two range objects that compare equal might have different [`start`](https://docs.python.org/3/library/stdtypes.html#range.start), [`stop`](https://docs.python.org/3/library/stdtypes.html#range.stop) and [`step`](https://docs.python.org/3/library/stdtypes.html#range.step) attributes, for example `range(0) == range(2, 1, 3)` or `range(0, 3, 2) == range(0, 4, 2)`.\)

Changed in version 3.2: Implement the Sequence ABC. Support slicing and negative indices. Test [`int`](https://docs.python.org/3/library/functions.html#int) objects for membership in constant time instead of iterating through all items.

Changed in version 3.3: Define ‘==’ and ‘!=’ to compare range objects based on the sequence of values they define \(instead of comparing based on object identity\).

New in version 3.3: The [`start`](https://docs.python.org/3/library/stdtypes.html#range.start), [`stop`](https://docs.python.org/3/library/stdtypes.html#range.stop) and [`step`](https://docs.python.org/3/library/stdtypes.html#range.step) attributes.

See also

* The [linspace recipe](http://code.activestate.com/recipes/579000/) shows how to implement a lazy version of range suitable for floating point applications.

### Text Sequence Type — [`str`](https://docs.python.org/3/library/stdtypes.html#str)

Textual data in Python is handled with [`str`](https://docs.python.org/3/library/stdtypes.html#str) objects, or _strings_. Strings are immutable [sequences](https://docs.python.org/3/library/stdtypes.html#typesseq) of Unicode code points. String literals are written in a variety of ways:

* Single quotes: `'allows embedded "double" quotes'`
* Double quotes: `"allows embedded 'single' quotes"`.
* Triple quoted: `'''Three single quotes'''`, `"""Three double quotes"""`

Triple quoted strings may span multiple lines - all associated whitespace will be included in the string literal.

String literals that are part of a single expression and have only whitespace between them will be implicitly converted to a single string literal. That is, `("spam " "eggs") == "spam eggs"`.

See [String and Bytes literals](https://docs.python.org/3/reference/lexical_analysis.html#strings) for more about the various forms of string literal, including supported escape sequences, and the `r` \(“raw”\) prefix that disables most escape sequence processing.

Strings may also be created from other objects using the [`str`](https://docs.python.org/3/library/stdtypes.html#str) constructor.

Since there is no separate “character” type, indexing a string produces strings of length 1. That is, for a non-empty string _s_, `s[0] == s[0:1]`.

There is also no mutable string type, but [`str.join()`](https://docs.python.org/3/library/stdtypes.html#str.join) or [`io.StringIO`](https://docs.python.org/3/library/io.html#io.StringIO) can be used to efficiently construct strings from multiple fragments.

Changed in version 3.3: For backwards compatibility with the Python 2 series, the `u` prefix is once again permitted on string literals. It has no effect on the meaning of string literals and cannot be combined with the `r` prefix._class_ `str`\(_object=''_\)_class_ `str`\(_object=b''_, _encoding='utf-8'_, _errors='strict'_\)

Return a [string](https://docs.python.org/3/library/stdtypes.html#textseq) version of _object_. If _object_ is not provided, returns the empty string. Otherwise, the behavior of `str()` depends on whether _encoding_ or _errors_ is given, as follows.

If neither _encoding_ nor _errors_ is given, `str(object)` returns [`object.__str__()`](https://docs.python.org/3/reference/datamodel.html#object.__str__), which is the “informal” or nicely printable string representation of _object_. For string objects, this is the string itself. If _object_ does not have a [`__str__()`](https://docs.python.org/3/reference/datamodel.html#object.__str__) method, then [`str()`](https://docs.python.org/3/library/stdtypes.html#str) falls back to returning [`repr(object)`](https://docs.python.org/3/library/functions.html#repr).

If at least one of _encoding_ or _errors_ is given, _object_ should be a [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object) \(e.g. [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) or [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray)\). In this case, if _object_ is a [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) \(or [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray)\) object, then `str(bytes, encoding, errors)` is equivalent to [`bytes.decode(encoding, errors)`](https://docs.python.org/3/library/stdtypes.html#bytes.decode). Otherwise, the bytes object underlying the buffer object is obtained before calling [`bytes.decode()`](https://docs.python.org/3/library/stdtypes.html#bytes.decode). See [Binary Sequence Types — bytes, bytearray, memoryview](https://docs.python.org/3/library/stdtypes.html#binaryseq) and [Buffer Protocol](https://docs.python.org/3/c-api/buffer.html#bufferobjects) for information on buffer objects.

Passing a [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) object to [`str()`](https://docs.python.org/3/library/stdtypes.html#str) without the _encoding_ or _errors_ arguments falls under the first case of returning the informal string representation \(see also the [`-b`](https://docs.python.org/3/using/cmdline.html#cmdoption-b) command-line option to Python\). For example:&gt;&gt;&gt;

```text
>>> str(b'Zoot!')
"b'Zoot!'"
```

For more information on the `str` class and its methods, see [Text Sequence Type — str](https://docs.python.org/3/library/stdtypes.html#textseq) and the [String Methods](https://docs.python.org/3/library/stdtypes.html#string-methods) section below. To output formatted strings, see the [Formatted string literals](https://docs.python.org/3/reference/lexical_analysis.html#f-strings) and [Format String Syntax](https://docs.python.org/3/library/string.html#formatstrings) sections. In addition, see the [Text Processing Services](https://docs.python.org/3/library/text.html#stringservices) section.

#### String Methods

Strings implement all of the [common](https://docs.python.org/3/library/stdtypes.html#typesseq-common) sequence operations, along with the additional methods described below.

Strings also support two styles of string formatting, one providing a large degree of flexibility and customization \(see [`str.format()`](https://docs.python.org/3/library/stdtypes.html#str.format), [Format String Syntax](https://docs.python.org/3/library/string.html#formatstrings) and [Custom String Formatting](https://docs.python.org/3/library/string.html#string-formatting)\) and the other based on C `printf` style formatting that handles a narrower range of types and is slightly harder to use correctly, but is often faster for the cases it can handle \([printf-style String Formatting](https://docs.python.org/3/library/stdtypes.html#old-string-formatting)\).

The [Text Processing Services](https://docs.python.org/3/library/text.html#textservices) section of the standard library covers a number of other modules that provide various text related utilities \(including regular expression support in the [`re`](https://docs.python.org/3/library/re.html#module-re) module\).`str.capitalize`\(\)

Return a copy of the string with its first character capitalized and the rest lowercased.

Changed in version 3.8: The first character is now put into titlecase rather than uppercase. This means that characters like digraphs will only have their first letter capitalized, instead of the full character.`str.casefold`\(\)

Return a casefolded copy of the string. Casefolded strings may be used for caseless matching.

Casefolding is similar to lowercasing but more aggressive because it is intended to remove all case distinctions in a string. For example, the German lowercase letter `'ß'` is equivalent to `"ss"`. Since it is already lowercase, [`lower()`](https://docs.python.org/3/library/stdtypes.html#str.lower) would do nothing to `'ß'`; [`casefold()`](https://docs.python.org/3/library/stdtypes.html#str.casefold) converts it to `"ss"`.

The casefolding algorithm is described in section 3.13 of the Unicode Standard.

New in version 3.3.`str.center`\(_width_\[, _fillchar_\]\)

Return centered in a string of length _width_. Padding is done using the specified _fillchar_ \(default is an ASCII space\). The original string is returned if _width_ is less than or equal to `len(s)`.`str.count`\(_sub_\[, _start_\[, _end_\]\]\)

Return the number of non-overlapping occurrences of substring _sub_ in the range \[_start_, _end_\]. Optional arguments _start_ and _end_ are interpreted as in slice notation.`str.encode`\(_encoding="utf-8"_, _errors="strict"_\)

Return an encoded version of the string as a bytes object. Default encoding is `'utf-8'`. _errors_ may be given to set a different error handling scheme. The default for _errors_ is `'strict'`, meaning that encoding errors raise a [`UnicodeError`](https://docs.python.org/3/library/exceptions.html#UnicodeError). Other possible values are `'ignore'`, `'replace'`, `'xmlcharrefreplace'`, `'backslashreplace'` and any other name registered via [`codecs.register_error()`](https://docs.python.org/3/library/codecs.html#codecs.register_error), see section [Error Handlers](https://docs.python.org/3/library/codecs.html#error-handlers). For a list of possible encodings, see section [Standard Encodings](https://docs.python.org/3/library/codecs.html#standard-encodings).

By default, the _errors_ argument is not checked for best performances, but only used at the first encoding error. Enable the [Python Development Mode](https://docs.python.org/3/library/devmode.html#devmode), or use a debug build to check _errors_.

Changed in version 3.1: Support for keyword arguments added.

Changed in version 3.9: The _errors_ is now checked in development mode and in debug mode.`str.endswith`\(_suffix_\[, _start_\[, _end_\]\]\)

Return `True` if the string ends with the specified _suffix_, otherwise return `False`. _suffix_ can also be a tuple of suffixes to look for. With optional _start_, test beginning at that position. With optional _end_, stop comparing at that position.`str.expandtabs`\(_tabsize=8_\)

Return a copy of the string where all tab characters are replaced by one or more spaces, depending on the current column and the given tab size. Tab positions occur every _tabsize_ characters \(default is 8, giving tab positions at columns 0, 8, 16 and so on\). To expand the string, the current column is set to zero and the string is examined character by character. If the character is a tab \(`\t`\), one or more space characters are inserted in the result until the current column is equal to the next tab position. \(The tab character itself is not copied.\) If the character is a newline \(`\n`\) or return \(`\r`\), it is copied and the current column is reset to zero. Any other character is copied unchanged and the current column is incremented by one regardless of how the character is represented when printed.&gt;&gt;&gt;

```text
>>> '01\t012\t0123\t01234'.expandtabs()
'01      012     0123    01234'
>>> '01\t012\t0123\t01234'.expandtabs(4)
'01  012 0123    01234'
```

`str.find`\(_sub_\[, _start_\[, _end_\]\]\)

Return the lowest index in the string where substring _sub_ is found within the slice `s[start:end]`. Optional arguments _start_ and _end_ are interpreted as in slice notation. Return `-1` if _sub_ is not found.

Note 

The [`find()`](https://docs.python.org/3/library/stdtypes.html#str.find) method should be used only if you need to know the position of _sub_. To check if _sub_ is a substring or not, use the [`in`](https://docs.python.org/3/reference/expressions.html#in) operator:&gt;&gt;&gt;

```text
>>> 'Py' in 'Python'
True
```

`str.format`\(_\*args_, _\*\*kwargs_\)

Perform a string formatting operation. The string on which this method is called can contain literal text or replacement fields delimited by braces `{}`. Each replacement field contains either the numeric index of a positional argument, or the name of a keyword argument. Returns a copy of the string where each replacement field is replaced with the string value of the corresponding argument.&gt;&gt;&gt;

```text
>>> "The sum of 1 + 2 is {0}".format(1+2)
'The sum of 1 + 2 is 3'
```

See [Format String Syntax](https://docs.python.org/3/library/string.html#formatstrings) for a description of the various formatting options that can be specified in format strings.

Note 

When formatting a number \([`int`](https://docs.python.org/3/library/functions.html#int), [`float`](https://docs.python.org/3/library/functions.html#float), [`complex`](https://docs.python.org/3/library/functions.html#complex), [`decimal.Decimal`](https://docs.python.org/3/library/decimal.html#decimal.Decimal) and subclasses\) with the `n` type \(ex: `'{:n}'.format(1234)`\), the function temporarily sets the `LC_CTYPE` locale to the `LC_NUMERIC` locale to decode `decimal_point` and `thousands_sep` fields of `localeconv()` if they are non-ASCII or longer than 1 byte, and the `LC_NUMERIC` locale is different than the `LC_CTYPE` locale. This temporary change affects other threads.

Changed in version 3.7: When formatting a number with the `n` type, the function sets temporarily the `LC_CTYPE` locale to the `LC_NUMERIC` locale in some cases.`str.format_map`\(_mapping_\)

Similar to `str.format(**mapping)`, except that `mapping` is used directly and not copied to a [`dict`](https://docs.python.org/3/library/stdtypes.html#dict). This is useful if for example `mapping` is a dict subclass:&gt;&gt;&gt;

```text
>>> class Default(dict):
...     def __missing__(self, key):
...         return key
...
>>> '{name} was born in {country}'.format_map(Default(name='Guido'))
'Guido was born in country'
```

New in version 3.2.`str.index`\(_sub_\[, _start_\[, _end_\]\]\)

Like [`find()`](https://docs.python.org/3/library/stdtypes.html#str.find), but raise [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) when the substring is not found.`str.isalnum`\(\)

Return `True` if all characters in the string are alphanumeric and there is at least one character, `False` otherwise. A character `c` is alphanumeric if one of the following returns `True`: `c.isalpha()`, `c.isdecimal()`, `c.isdigit()`, or `c.isnumeric()`.`str.isalpha`\(\)

Return `True` if all characters in the string are alphabetic and there is at least one character, `False` otherwise. Alphabetic characters are those characters defined in the Unicode character database as “Letter”, i.e., those with general category property being one of “Lm”, “Lt”, “Lu”, “Ll”, or “Lo”. Note that this is different from the “Alphabetic” property defined in the Unicode Standard.`str.isascii`\(\)

Return `True` if the string is empty or all characters in the string are ASCII, `False` otherwise. ASCII characters have code points in the range U+0000-U+007F.

New in version 3.7.`str.isdecimal`\(\)

Return `True` if all characters in the string are decimal characters and there is at least one character, `False` otherwise. Decimal characters are those that can be used to form numbers in base 10, e.g. U+0660, ARABIC-INDIC DIGIT ZERO. Formally a decimal character is a character in the Unicode General Category “Nd”.`str.isdigit`\(\)

Return `True` if all characters in the string are digits and there is at least one character, `False` otherwise. Digits include decimal characters and digits that need special handling, such as the compatibility superscript digits. This covers digits which cannot be used to form numbers in base 10, like the Kharosthi numbers. Formally, a digit is a character that has the property value Numeric\_Type=Digit or Numeric\_Type=Decimal.`str.isidentifier`\(\)

Return `True` if the string is a valid identifier according to the language definition, section [Identifiers and keywords](https://docs.python.org/3/reference/lexical_analysis.html#identifiers).

Call [`keyword.iskeyword()`](https://docs.python.org/3/library/keyword.html#keyword.iskeyword) to test whether string `s` is a reserved identifier, such as [`def`](https://docs.python.org/3/reference/compound_stmts.html#def) and [`class`](https://docs.python.org/3/reference/compound_stmts.html#class).

Example:&gt;&gt;&gt;

```text
>>> from keyword import iskeyword

>>> 'hello'.isidentifier(), iskeyword('hello')
True, False
>>> 'def'.isidentifier(), iskeyword('def')
True, True
```

`str.islower`\(\)

Return `True` if all cased characters [4](https://docs.python.org/3/library/stdtypes.html#id15) in the string are lowercase and there is at least one cased character, `False` otherwise.`str.isnumeric`\(\)

Return `True` if all characters in the string are numeric characters, and there is at least one character, `False` otherwise. Numeric characters include digit characters, and all characters that have the Unicode numeric value property, e.g. U+2155, VULGAR FRACTION ONE FIFTH. Formally, numeric characters are those with the property value Numeric\_Type=Digit, Numeric\_Type=Decimal or Numeric\_Type=Numeric.`str.isprintable`\(\)

Return `True` if all characters in the string are printable or the string is empty, `False` otherwise. Nonprintable characters are those characters defined in the Unicode character database as “Other” or “Separator”, excepting the ASCII space \(0x20\) which is considered printable. \(Note that printable characters in this context are those which should not be escaped when [`repr()`](https://docs.python.org/3/library/functions.html#repr) is invoked on a string. It has no bearing on the handling of strings written to [`sys.stdout`](https://docs.python.org/3/library/sys.html#sys.stdout) or [`sys.stderr`](https://docs.python.org/3/library/sys.html#sys.stderr).\)`str.isspace`\(\)

Return `True` if there are only whitespace characters in the string and there is at least one character, `False` otherwise.

A character is _whitespace_ if in the Unicode character database \(see [`unicodedata`](https://docs.python.org/3/library/unicodedata.html#module-unicodedata)\), either its general category is `Zs` \(“Separator, space”\), or its bidirectional class is one of `WS`, `B`, or `S`.`str.istitle`\(\)

Return `True` if the string is a titlecased string and there is at least one character, for example uppercase characters may only follow uncased characters and lowercase characters only cased ones. Return `False` otherwise.`str.isupper`\(\)

Return `True` if all cased characters [4](https://docs.python.org/3/library/stdtypes.html#id15) in the string are uppercase and there is at least one cased character, `False` otherwise.&gt;&gt;&gt;

```text
>>> 'BANANA'.isupper()
True
>>> 'banana'.isupper()
False
>>> 'baNana'.isupper()
False
>>> ' '.isupper()
False
```

`str.join`\(_iterable_\)

Return a string which is the concatenation of the strings in _iterable_. A [`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError) will be raised if there are any non-string values in _iterable_, including [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) objects. The separator between elements is the string providing this method.`str.ljust`\(_width_\[, _fillchar_\]\)

Return the string left justified in a string of length _width_. Padding is done using the specified _fillchar_ \(default is an ASCII space\). The original string is returned if _width_ is less than or equal to `len(s)`.`str.lower`\(\)

Return a copy of the string with all the cased characters [4](https://docs.python.org/3/library/stdtypes.html#id15) converted to lowercase.

The lowercasing algorithm used is described in section 3.13 of the Unicode Standard.`str.lstrip`\(\[_chars_\]\)

Return a copy of the string with leading characters removed. The _chars_ argument is a string specifying the set of characters to be removed. If omitted or `None`, the _chars_ argument defaults to removing whitespace. The _chars_ argument is not a prefix; rather, all combinations of its values are stripped:&gt;&gt;&gt;

```text
>>> '   spacious   '.lstrip()
'spacious   '
>>> 'www.example.com'.lstrip('cmowz.')
'example.com'
```

See [`str.removeprefix()`](https://docs.python.org/3/library/stdtypes.html#str.removeprefix) for a method that will remove a single prefix string rather than all of a set of characters. For example:&gt;&gt;&gt;

```text
>>> 'Arthur: three!'.lstrip('Arthur: ')
'ee!'
>>> 'Arthur: three!'.removeprefix('Arthur: ')
'three!'
```

_static_ `str.maketrans`\(_x_\[, _y_\[, _z_\]\]\)

This static method returns a translation table usable for [`str.translate()`](https://docs.python.org/3/library/stdtypes.html#str.translate).

If there is only one argument, it must be a dictionary mapping Unicode ordinals \(integers\) or characters \(strings of length 1\) to Unicode ordinals, strings \(of arbitrary lengths\) or `None`. Character keys will then be converted to ordinals.

If there are two arguments, they must be strings of equal length, and in the resulting dictionary, each character in x will be mapped to the character at the same position in y. If there is a third argument, it must be a string, whose characters will be mapped to `None` in the result.`str.partition`\(_sep_\)

Split the string at the first occurrence of _sep_, and return a 3-tuple containing the part before the separator, the separator itself, and the part after the separator. If the separator is not found, return a 3-tuple containing the string itself, followed by two empty strings.`str.removeprefix`\(_prefix_, _/_\)

If the string starts with the _prefix_ string, return `string[len(prefix):]`. Otherwise, return a copy of the original string:&gt;&gt;&gt;

```text
>>> 'TestHook'.removeprefix('Test')
'Hook'
>>> 'BaseTestCase'.removeprefix('Test')
'BaseTestCase'
```

New in version 3.9.`str.removesuffix`\(_suffix_, _/_\)

If the string ends with the _suffix_ string and that _suffix_ is not empty, return `string[:-len(suffix)]`. Otherwise, return a copy of the original string:&gt;&gt;&gt;

```text
>>> 'MiscTests'.removesuffix('Tests')
'Misc'
>>> 'TmpDirMixin'.removesuffix('Tests')
'TmpDirMixin'
```

New in version 3.9.`str.replace`\(_old_, _new_\[, _count_\]\)

Return a copy of the string with all occurrences of substring _old_ replaced by _new_. If the optional argument _count_ is given, only the first _count_ occurrences are replaced.`str.rfind`\(_sub_\[, _start_\[, _end_\]\]\)

Return the highest index in the string where substring _sub_ is found, such that _sub_ is contained within `s[start:end]`. Optional arguments _start_ and _end_ are interpreted as in slice notation. Return `-1` on failure.`str.rindex`\(_sub_\[, _start_\[, _end_\]\]\)

Like [`rfind()`](https://docs.python.org/3/library/stdtypes.html#str.rfind) but raises [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) when the substring _sub_ is not found.`str.rjust`\(_width_\[, _fillchar_\]\)

Return the string right justified in a string of length _width_. Padding is done using the specified _fillchar_ \(default is an ASCII space\). The original string is returned if _width_ is less than or equal to `len(s)`.`str.rpartition`\(_sep_\)

Split the string at the last occurrence of _sep_, and return a 3-tuple containing the part before the separator, the separator itself, and the part after the separator. If the separator is not found, return a 3-tuple containing two empty strings, followed by the string itself.`str.rsplit`\(_sep=None_, _maxsplit=-1_\)

Return a list of the words in the string, using _sep_ as the delimiter string. If _maxsplit_ is given, at most _maxsplit_ splits are done, the _rightmost_ ones. If _sep_ is not specified or `None`, any whitespace string is a separator. Except for splitting from the right, [`rsplit()`](https://docs.python.org/3/library/stdtypes.html#str.rsplit) behaves like [`split()`](https://docs.python.org/3/library/stdtypes.html#str.split) which is described in detail below.`str.rstrip`\(\[_chars_\]\)

Return a copy of the string with trailing characters removed. The _chars_ argument is a string specifying the set of characters to be removed. If omitted or `None`, the _chars_ argument defaults to removing whitespace. The _chars_ argument is not a suffix; rather, all combinations of its values are stripped:&gt;&gt;&gt;

```text
>>> '   spacious   '.rstrip()
'   spacious'
>>> 'mississippi'.rstrip('ipz')
'mississ'
```

See [`str.removesuffix()`](https://docs.python.org/3/library/stdtypes.html#str.removesuffix) for a method that will remove a single suffix string rather than all of a set of characters. For example:&gt;&gt;&gt;

```text
>>> 'Monty Python'.rstrip(' Python')
'M'
>>> 'Monty Python'.removesuffix(' Python')
'Monty'
```

`str.split`\(_sep=None_, _maxsplit=-1_\)

Return a list of the words in the string, using _sep_ as the delimiter string. If _maxsplit_ is given, at most _maxsplit_ splits are done \(thus, the list will have at most `maxsplit+1` elements\). If _maxsplit_ is not specified or `-1`, then there is no limit on the number of splits \(all possible splits are made\).

If _sep_ is given, consecutive delimiters are not grouped together and are deemed to delimit empty strings \(for example, `'1,,2'.split(',')` returns `['1', '', '2']`\). The _sep_ argument may consist of multiple characters \(for example, `'1<>2<>3'.split('<>')` returns `['1', '2', '3']`\). Splitting an empty string with a specified separator returns `['']`.

For example:&gt;&gt;&gt;

```text
>>> '1,2,3'.split(',')
['1', '2', '3']
>>> '1,2,3'.split(',', maxsplit=1)
['1', '2,3']
>>> '1,2,,3,'.split(',')
['1', '2', '', '3', '']
```

If _sep_ is not specified or is `None`, a different splitting algorithm is applied: runs of consecutive whitespace are regarded as a single separator, and the result will contain no empty strings at the start or end if the string has leading or trailing whitespace. Consequently, splitting an empty string or a string consisting of just whitespace with a `None` separator returns `[]`.

For example:&gt;&gt;&gt;

```text
>>> '1 2 3'.split()
['1', '2', '3']
>>> '1 2 3'.split(maxsplit=1)
['1', '2 3']
>>> '   1   2   3   '.split()
['1', '2', '3']
```

`str.splitlines`\(\[_keepends_\]\)

Return a list of the lines in the string, breaking at line boundaries. Line breaks are not included in the resulting list unless _keepends_ is given and true.

This method splits on the following line boundaries. In particular, the boundaries are a superset of [universal newlines](https://docs.python.org/3/glossary.html#term-universal-newlines).

| Representation | Description |
| :--- | :--- |
| `\n` | Line Feed |
| `\r` | Carriage Return |
| `\r\n` | Carriage Return + Line Feed |
| `\v` or `\x0b` | Line Tabulation |
| `\f` or `\x0c` | Form Feed |
| `\x1c` | File Separator |
| `\x1d` | Group Separator |
| `\x1e` | Record Separator |
| `\x85` | Next Line \(C1 Control Code\) |
| `\u2028` | Line Separator |
| `\u2029` | Paragraph Separator |

Changed in version 3.2: `\v` and `\f` added to list of line boundaries.

For example:&gt;&gt;&gt;

```text
>>> 'ab c\n\nde fg\rkl\r\n'.splitlines()
['ab c', '', 'de fg', 'kl']
>>> 'ab c\n\nde fg\rkl\r\n'.splitlines(keepends=True)
['ab c\n', '\n', 'de fg\r', 'kl\r\n']
```

Unlike [`split()`](https://docs.python.org/3/library/stdtypes.html#str.split) when a delimiter string _sep_ is given, this method returns an empty list for the empty string, and a terminal line break does not result in an extra line:&gt;&gt;&gt;

```text
>>> "".splitlines()
[]
>>> "One line\n".splitlines()
['One line']
```

For comparison, `split('\n')` gives:&gt;&gt;&gt;

```text
>>> ''.split('\n')
['']
>>> 'Two lines\n'.split('\n')
['Two lines', '']
```

`str.startswith`\(_prefix_\[, _start_\[, _end_\]\]\)

Return `True` if string starts with the _prefix_, otherwise return `False`. _prefix_ can also be a tuple of prefixes to look for. With optional _start_, test string beginning at that position. With optional _end_, stop comparing string at that position.`str.strip`\(\[_chars_\]\)

Return a copy of the string with the leading and trailing characters removed. The _chars_ argument is a string specifying the set of characters to be removed. If omitted or `None`, the _chars_ argument defaults to removing whitespace. The _chars_ argument is not a prefix or suffix; rather, all combinations of its values are stripped:&gt;&gt;&gt;

```text
>>> '   spacious   '.strip()
'spacious'
>>> 'www.example.com'.strip('cmowz.')
'example'
```

The outermost leading and trailing _chars_ argument values are stripped from the string. Characters are removed from the leading end until reaching a string character that is not contained in the set of characters in _chars_. A similar action takes place on the trailing end. For example:&gt;&gt;&gt;

```text
>>> comment_string = '#....... Section 3.2.1 Issue #32 .......'
>>> comment_string.strip('.#! ')
'Section 3.2.1 Issue #32'
```

`str.swapcase`\(\)

Return a copy of the string with uppercase characters converted to lowercase and vice versa. Note that it is not necessarily true that `s.swapcase().swapcase() == s`.`str.title`\(\)

Return a titlecased version of the string where words start with an uppercase character and the remaining characters are lowercase.

For example:&gt;&gt;&gt;

```text
>>> 'Hello world'.title()
'Hello World'
```

The algorithm uses a simple language-independent definition of a word as groups of consecutive letters. The definition works in many contexts but it means that apostrophes in contractions and possessives form word boundaries, which may not be the desired result:&gt;&gt;&gt;

```text
>>> "they're bill's friends from the UK".title()
"They'Re Bill'S Friends From The Uk"
```

A workaround for apostrophes can be constructed using regular expressions:&gt;&gt;&gt;

```text
>>> import re
>>> def titlecase(s):
...     return re.sub(r"[A-Za-z]+('[A-Za-z]+)?",
...                   lambda mo: mo.group(0).capitalize(),
...                   s)
...
>>> titlecase("they're bill's friends.")
"They're Bill's Friends."
```

`str.translate`\(_table_\)

Return a copy of the string in which each character has been mapped through the given translation table. The table must be an object that implements indexing via [`__getitem__()`](https://docs.python.org/3/reference/datamodel.html#object.__getitem__), typically a [mapping](https://docs.python.org/3/glossary.html#term-mapping) or [sequence](https://docs.python.org/3/glossary.html#term-sequence). When indexed by a Unicode ordinal \(an integer\), the table object can do any of the following: return a Unicode ordinal or a string, to map the character to one or more other characters; return `None`, to delete the character from the return string; or raise a [`LookupError`](https://docs.python.org/3/library/exceptions.html#LookupError) exception, to map the character to itself.

You can use [`str.maketrans()`](https://docs.python.org/3/library/stdtypes.html#str.maketrans) to create a translation map from character-to-character mappings in different formats.

See also the [`codecs`](https://docs.python.org/3/library/codecs.html#module-codecs) module for a more flexible approach to custom character mappings.`str.upper`\(\)

Return a copy of the string with all the cased characters [4](https://docs.python.org/3/library/stdtypes.html#id15) converted to uppercase. Note that `s.upper().isupper()` might be `False` if `s` contains uncased characters or if the Unicode category of the resulting character\(s\) is not “Lu” \(Letter, uppercase\), but e.g. “Lt” \(Letter, titlecase\).

The uppercasing algorithm used is described in section 3.13 of the Unicode Standard.`str.zfill`\(_width_\)

Return a copy of the string left filled with ASCII `'0'` digits to make a string of length _width_. A leading sign prefix \(`'+'`/`'-'`\) is handled by inserting the padding _after_ the sign character rather than before. The original string is returned if _width_ is less than or equal to `len(s)`.

For example:&gt;&gt;&gt;

```text
>>> "42".zfill(5)
'00042'
>>> "-42".zfill(5)
'-0042'
```

#### `printf`-style String Formatting

Note 

The formatting operations described here exhibit a variety of quirks that lead to a number of common errors \(such as failing to display tuples and dictionaries correctly\). Using the newer [formatted string literals](https://docs.python.org/3/reference/lexical_analysis.html#f-strings), the [`str.format()`](https://docs.python.org/3/library/stdtypes.html#str.format) interface, or [template strings](https://docs.python.org/3/library/string.html#template-strings) may help avoid these errors. Each of these alternatives provides their own trade-offs and benefits of simplicity, flexibility, and/or extensibility.

String objects have one unique built-in operation: the `%` operator \(modulo\). This is also known as the string _formatting_ or _interpolation_ operator. Given `format % values` \(where _format_ is a string\), `%` conversion specifications in _format_ are replaced with zero or more elements of _values_. The effect is similar to using the `sprintf()` in the C language.

If _format_ requires a single argument, _values_ may be a single non-tuple object. [5](https://docs.python.org/3/library/stdtypes.html#id16) Otherwise, _values_ must be a tuple with exactly the number of items specified by the format string, or a single mapping object \(for example, a dictionary\).

A conversion specifier contains two or more characters and has the following components, which must occur in this order:

1. The `'%'` character, which marks the start of the specifier.
2. Mapping key \(optional\), consisting of a parenthesised sequence of characters \(for example, `(somename)`\).
3. Conversion flags \(optional\), which affect the result of some conversion types.
4. Minimum field width \(optional\). If specified as an `'*'` \(asterisk\), the actual width is read from the next element of the tuple in _values_, and the object to convert comes after the minimum field width and optional precision.
5. Precision \(optional\), given as a `'.'` \(dot\) followed by the precision. If specified as `'*'` \(an asterisk\), the actual precision is read from the next element of the tuple in _values_, and the value to convert comes after the precision.
6. Length modifier \(optional\).
7. Conversion type.

When the right argument is a dictionary \(or other mapping type\), then the formats in the string _must_ include a parenthesised mapping key into that dictionary inserted immediately after the `'%'` character. The mapping key selects the value to be formatted from the mapping. For example:&gt;&gt;&gt;

```text
>>> print('%(language)s has %(number)03d quote types.' %
...       {'language': "Python", "number": 2})
Python has 002 quote types.
```

In this case no `*` specifiers may occur in a format \(since they require a sequential parameter list\).

The conversion flag characters are:

| Flag | Meaning |
| :--- | :--- |
| `'#'` | The value conversion will use the “alternate form” \(where defined below\). |
| `'0'` | The conversion will be zero padded for numeric values. |
| `'-'` | The converted value is left adjusted \(overrides the `'0'` conversion if both are given\). |
| `' '` | \(a space\) A blank should be left before a positive number \(or empty string\) produced by a signed conversion. |
| `'+'` | A sign character \(`'+'` or `'-'`\) will precede the conversion \(overrides a “space” flag\). |

A length modifier \(`h`, `l`, or `L`\) may be present, but is ignored as it is not necessary for Python – so e.g. `%ld` is identical to `%d`.

The conversion types are:

| Conversion | Meaning | Notes |
| :--- | :--- | :--- |
| `'d'` | Signed integer decimal. |  |
| `'i'` | Signed integer decimal. |  |
| `'o'` | Signed octal value. | \(1\) |
| `'u'` | Obsolete type – it is identical to `'d'`. | \(6\) |
| `'x'` | Signed hexadecimal \(lowercase\). | \(2\) |
| `'X'` | Signed hexadecimal \(uppercase\). | \(2\) |
| `'e'` | Floating point exponential format \(lowercase\). | \(3\) |
| `'E'` | Floating point exponential format \(uppercase\). | \(3\) |
| `'f'` | Floating point decimal format. | \(3\) |
| `'F'` | Floating point decimal format. | \(3\) |
| `'g'` | Floating point format. Uses lowercase exponential format if exponent is less than -4 or not less than precision, decimal format otherwise. | \(4\) |
| `'G'` | Floating point format. Uses uppercase exponential format if exponent is less than -4 or not less than precision, decimal format otherwise. | \(4\) |
| `'c'` | Single character \(accepts integer or single character string\). |  |
| `'r'` | String \(converts any Python object using [`repr()`](https://docs.python.org/3/library/functions.html#repr)\). | \(5\) |
| `'s'` | String \(converts any Python object using [`str()`](https://docs.python.org/3/library/stdtypes.html#str)\). | \(5\) |
| `'a'` | String \(converts any Python object using [`ascii()`](https://docs.python.org/3/library/functions.html#ascii)\). | \(5\) |
| `'%'` | No argument is converted, results in a `'%'` character in the result. |  |

Notes:

1. The alternate form causes a leading octal specifier \(`'0o'`\) to be inserted before the first digit.
2. The alternate form causes a leading `'0x'` or `'0X'` \(depending on whether the `'x'` or `'X'` format was used\) to be inserted before the first digit.
3. The alternate form causes the result to always contain a decimal point, even if no digits follow it.

   The precision determines the number of digits after the decimal point and defaults to 6.

4. The alternate form causes the result to always contain a decimal point, and trailing zeroes are not removed as they would otherwise be.

   The precision determines the number of significant digits before and after the decimal point and defaults to 6.

5. If precision is `N`, the output is truncated to `N` characters.
6. See [**PEP 237**](https://www.python.org/dev/peps/pep-0237).

Since Python strings have an explicit length, `%s` conversions do not assume that `'\0'` is the end of the string.

Changed in version 3.1: `%f` conversions for numbers whose absolute value is over 1e50 are no longer replaced by `%g` conversions.

### Binary Sequence Types — [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes), [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray), [`memoryview`](https://docs.python.org/3/library/stdtypes.html#memoryview)

The core built-in types for manipulating binary data are [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) and [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray). They are supported by [`memoryview`](https://docs.python.org/3/library/stdtypes.html#memoryview) which uses the [buffer protocol](https://docs.python.org/3/c-api/buffer.html#bufferobjects) to access the memory of other binary objects without needing to make a copy.

The [`array`](https://docs.python.org/3/library/array.html#module-array) module supports efficient storage of basic data types like 32-bit integers and IEEE754 double-precision floating values.

#### Bytes Objects

Bytes objects are immutable sequences of single bytes. Since many major binary protocols are based on the ASCII text encoding, bytes objects offer several methods that are only valid when working with ASCII compatible data and are closely related to string objects in a variety of other ways._class_ `bytes`\(\[_source_\[, _encoding_\[, _errors_\]\]\]\)

Firstly, the syntax for bytes literals is largely the same as that for string literals, except that a `b` prefix is added:

* Single quotes: `b'still allows embedded "double" quotes'`
* Double quotes: `b"still allows embedded 'single' quotes"`.
* Triple quoted: `b'''3 single quotes'''`, `b"""3 double quotes"""`

Only ASCII characters are permitted in bytes literals \(regardless of the declared source code encoding\). Any binary values over 127 must be entered into bytes literals using the appropriate escape sequence.

As with string literals, bytes literals may also use a `r` prefix to disable processing of escape sequences. See [String and Bytes literals](https://docs.python.org/3/reference/lexical_analysis.html#strings) for more about the various forms of bytes literal, including supported escape sequences.

While bytes literals and representations are based on ASCII text, bytes objects actually behave like immutable sequences of integers, with each value in the sequence restricted such that `0 <= x < 256` \(attempts to violate this restriction will trigger [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError)\). This is done deliberately to emphasise that while many binary formats include ASCII based elements and can be usefully manipulated with some text-oriented algorithms, this is not generally the case for arbitrary binary data \(blindly applying text processing algorithms to binary data formats that are not ASCII compatible will usually lead to data corruption\).

In addition to the literal forms, bytes objects can be created in a number of other ways:

* A zero-filled bytes object of a specified length: `bytes(10)`
* From an iterable of integers: `bytes(range(20))`
* Copying existing binary data via the buffer protocol: `bytes(obj)`

Also see the [bytes](https://docs.python.org/3/library/functions.html#func-bytes) built-in.

Since 2 hexadecimal digits correspond precisely to a single byte, hexadecimal numbers are a commonly used format for describing binary data. Accordingly, the bytes type has an additional class method to read data in that format:_classmethod_ `fromhex`\(_string_\)

This [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) class method returns a bytes object, decoding the given string object. The string must contain two hexadecimal digits per byte, with ASCII whitespace being ignored.&gt;&gt;&gt;

```text
>>> bytes.fromhex('2Ef0 F1f2  ')
b'.\xf0\xf1\xf2'
```

Changed in version 3.7: [`bytes.fromhex()`](https://docs.python.org/3/library/stdtypes.html#bytes.fromhex) now skips all ASCII whitespace in the string, not just spaces.

A reverse conversion function exists to transform a bytes object into its hexadecimal representation.`hex`\(\[_sep_\[, _bytes\_per\_sep_\]\]\)

Return a string object containing two hexadecimal digits for each byte in the instance.&gt;&gt;&gt;

```text
>>> b'\xf0\xf1\xf2'.hex()
'f0f1f2'
```

If you want to make the hex string easier to read, you can specify a single character separator _sep_ parameter to include in the output. By default between each byte. A second optional _bytes\_per\_sep_ parameter controls the spacing. Positive values calculate the separator position from the right, negative values from the left.&gt;&gt;&gt;

```text
>>> value = b'\xf0\xf1\xf2'
>>> value.hex('-')
'f0-f1-f2'
>>> value.hex('_', 2)
'f0_f1f2'
>>> b'UUDDLRLRAB'.hex(' ', -4)
'55554444 4c524c52 4142'
```

New in version 3.5.

Changed in version 3.8: [`bytes.hex()`](https://docs.python.org/3/library/stdtypes.html#bytes.hex) now supports optional _sep_ and _bytes\_per\_sep_ parameters to insert separators between bytes in the hex output.

Since bytes objects are sequences of integers \(akin to a tuple\), for a bytes object _b_, `b[0]` will be an integer, while `b[0:1]` will be a bytes object of length 1. \(This contrasts with text strings, where both indexing and slicing will produce a string of length 1\)

The representation of bytes objects uses the literal format \(`b'...'`\) since it is often more useful than e.g. `bytes([46, 46, 46])`. You can always convert a bytes object into a list of integers using `list(b)`.

Note 

For Python 2.x users: In the Python 2.x series, a variety of implicit conversions between 8-bit strings \(the closest thing 2.x offers to a built-in binary data type\) and Unicode strings were permitted. This was a backwards compatibility workaround to account for the fact that Python originally only supported 8-bit text, and Unicode text was a later addition. In Python 3.x, those implicit conversions are gone - conversions between 8-bit binary data and Unicode text must be explicit, and bytes and string objects will always compare unequal.

#### Bytearray Objects

[`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray) objects are a mutable counterpart to [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) objects._class_ `bytearray`\(\[_source_\[, _encoding_\[, _errors_\]\]\]\)

There is no dedicated literal syntax for bytearray objects, instead they are always created by calling the constructor:

* Creating an empty instance: `bytearray()`
* Creating a zero-filled instance with a given length: `bytearray(10)`
* From an iterable of integers: `bytearray(range(20))`
* Copying existing binary data via the buffer protocol: `bytearray(b'Hi!')`

As bytearray objects are mutable, they support the [mutable](https://docs.python.org/3/library/stdtypes.html#typesseq-mutable) sequence operations in addition to the common bytes and bytearray operations described in [Bytes and Bytearray Operations](https://docs.python.org/3/library/stdtypes.html#bytes-methods).

Also see the [bytearray](https://docs.python.org/3/library/functions.html#func-bytearray) built-in.

Since 2 hexadecimal digits correspond precisely to a single byte, hexadecimal numbers are a commonly used format for describing binary data. Accordingly, the bytearray type has an additional class method to read data in that format:_classmethod_ `fromhex`\(_string_\)

This [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray) class method returns bytearray object, decoding the given string object. The string must contain two hexadecimal digits per byte, with ASCII whitespace being ignored.&gt;&gt;&gt;

```text
>>> bytearray.fromhex('2Ef0 F1f2  ')
bytearray(b'.\xf0\xf1\xf2')
```

Changed in version 3.7: [`bytearray.fromhex()`](https://docs.python.org/3/library/stdtypes.html#bytearray.fromhex) now skips all ASCII whitespace in the string, not just spaces.

A reverse conversion function exists to transform a bytearray object into its hexadecimal representation.`hex`\(\[_sep_\[, _bytes\_per\_sep_\]\]\)

Return a string object containing two hexadecimal digits for each byte in the instance.&gt;&gt;&gt;

```text
>>> bytearray(b'\xf0\xf1\xf2').hex()
'f0f1f2'
```

New in version 3.5.

Changed in version 3.8: Similar to [`bytes.hex()`](https://docs.python.org/3/library/stdtypes.html#bytes.hex), [`bytearray.hex()`](https://docs.python.org/3/library/stdtypes.html#bytearray.hex) now supports optional _sep_ and _bytes\_per\_sep_ parameters to insert separators between bytes in the hex output.

Since bytearray objects are sequences of integers \(akin to a list\), for a bytearray object _b_, `b[0]` will be an integer, while `b[0:1]` will be a bytearray object of length 1. \(This contrasts with text strings, where both indexing and slicing will produce a string of length 1\)

The representation of bytearray objects uses the bytes literal format \(`bytearray(b'...')`\) since it is often more useful than e.g. `bytearray([46, 46, 46])`. You can always convert a bytearray object into a list of integers using `list(b)`.

#### Bytes and Bytearray Operations

Both bytes and bytearray objects support the [common](https://docs.python.org/3/library/stdtypes.html#typesseq-common) sequence operations. They interoperate not just with operands of the same type, but with any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object). Due to this flexibility, they can be freely mixed in operations without causing errors. However, the return type of the result may depend on the order of operands.

Note 

The methods on bytes and bytearray objects don’t accept strings as their arguments, just as the methods on strings don’t accept bytes as their arguments. For example, you have to write:

```text
a = "abc"
b = a.replace("a", "f")
```

and:

```text
a = b"abc"
b = a.replace(b"a", b"f")
```

Some bytes and bytearray operations assume the use of ASCII compatible binary formats, and hence should be avoided when working with arbitrary binary data. These restrictions are covered below.

Note 

Using these ASCII based operations to manipulate binary data that is not stored in an ASCII based format may lead to data corruption.

The following methods on bytes and bytearray objects can be used with arbitrary binary data.`bytes.count`\(_sub_\[, _start_\[, _end_\]\]\)`bytearray.count`\(_sub_\[, _start_\[, _end_\]\]\)

Return the number of non-overlapping occurrences of subsequence _sub_ in the range \[_start_, _end_\]. Optional arguments _start_ and _end_ are interpreted as in slice notation.

The subsequence to search for may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object) or an integer in the range 0 to 255.

Changed in version 3.3: Also accept an integer in the range 0 to 255 as the subsequence.`bytes.removeprefix`\(_prefix_, _/_\)`bytearray.removeprefix`\(_prefix_, _/_\)

If the binary data starts with the _prefix_ string, return `bytes[len(prefix):]`. Otherwise, return a copy of the original binary data:&gt;&gt;&gt;

```text
>>> b'TestHook'.removeprefix(b'Test')
b'Hook'
>>> b'BaseTestCase'.removeprefix(b'Test')
b'BaseTestCase'
```

The _prefix_ may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object).

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.

New in version 3.9.`bytes.removesuffix`\(_suffix_, _/_\)`bytearray.removesuffix`\(_suffix_, _/_\)

If the binary data ends with the _suffix_ string and that _suffix_ is not empty, return `bytes[:-len(suffix)]`. Otherwise, return a copy of the original binary data:&gt;&gt;&gt;

```text
>>> b'MiscTests'.removesuffix(b'Tests')
b'Misc'
>>> b'TmpDirMixin'.removesuffix(b'Tests')
b'TmpDirMixin'
```

The _suffix_ may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object).

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.

New in version 3.9.`bytes.decode`\(_encoding="utf-8"_, _errors="strict"_\)`bytearray.decode`\(_encoding="utf-8"_, _errors="strict"_\)

Return a string decoded from the given bytes. Default encoding is `'utf-8'`. _errors_ may be given to set a different error handling scheme. The default for _errors_ is `'strict'`, meaning that encoding errors raise a [`UnicodeError`](https://docs.python.org/3/library/exceptions.html#UnicodeError). Other possible values are `'ignore'`, `'replace'` and any other name registered via [`codecs.register_error()`](https://docs.python.org/3/library/codecs.html#codecs.register_error), see section [Error Handlers](https://docs.python.org/3/library/codecs.html#error-handlers). For a list of possible encodings, see section [Standard Encodings](https://docs.python.org/3/library/codecs.html#standard-encodings).

By default, the _errors_ argument is not checked for best performances, but only used at the first decoding error. Enable the [Python Development Mode](https://docs.python.org/3/library/devmode.html#devmode), or use a debug build to check _errors_.

Note 

Passing the _encoding_ argument to [`str`](https://docs.python.org/3/library/stdtypes.html#str) allows decoding any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object) directly, without needing to make a temporary bytes or bytearray object.

Changed in version 3.1: Added support for keyword arguments.

Changed in version 3.9: The _errors_ is now checked in development mode and in debug mode.`bytes.endswith`\(_suffix_\[, _start_\[, _end_\]\]\)`bytearray.endswith`\(_suffix_\[, _start_\[, _end_\]\]\)

Return `True` if the binary data ends with the specified _suffix_, otherwise return `False`. _suffix_ can also be a tuple of suffixes to look for. With optional _start_, test beginning at that position. With optional _end_, stop comparing at that position.

The suffix\(es\) to search for may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object).`bytes.find`\(_sub_\[, _start_\[, _end_\]\]\)`bytearray.find`\(_sub_\[, _start_\[, _end_\]\]\)

Return the lowest index in the data where the subsequence _sub_ is found, such that _sub_ is contained in the slice `s[start:end]`. Optional arguments _start_ and _end_ are interpreted as in slice notation. Return `-1` if _sub_ is not found.

The subsequence to search for may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object) or an integer in the range 0 to 255.

Note 

The [`find()`](https://docs.python.org/3/library/stdtypes.html#bytes.find) method should be used only if you need to know the position of _sub_. To check if _sub_ is a substring or not, use the [`in`](https://docs.python.org/3/reference/expressions.html#in) operator:&gt;&gt;&gt;

```text
>>> b'Py' in b'Python'
True
```

Changed in version 3.3: Also accept an integer in the range 0 to 255 as the subsequence.`bytes.index`\(_sub_\[, _start_\[, _end_\]\]\)`bytearray.index`\(_sub_\[, _start_\[, _end_\]\]\)

Like [`find()`](https://docs.python.org/3/library/stdtypes.html#bytes.find), but raise [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) when the subsequence is not found.

The subsequence to search for may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object) or an integer in the range 0 to 255.

Changed in version 3.3: Also accept an integer in the range 0 to 255 as the subsequence.`bytes.join`\(_iterable_\)`bytearray.join`\(_iterable_\)

Return a bytes or bytearray object which is the concatenation of the binary data sequences in _iterable_. A [`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError) will be raised if there are any values in _iterable_ that are not [bytes-like objects](https://docs.python.org/3/glossary.html#term-bytes-like-object), including [`str`](https://docs.python.org/3/library/stdtypes.html#str) objects. The separator between elements is the contents of the bytes or bytearray object providing this method._static_ `bytes.maketrans`\(_from_, _to_\)_static_ `bytearray.maketrans`\(_from_, _to_\)

This static method returns a translation table usable for [`bytes.translate()`](https://docs.python.org/3/library/stdtypes.html#bytes.translate) that will map each character in _from_ into the character at the same position in _to_; _from_ and _to_ must both be [bytes-like objects](https://docs.python.org/3/glossary.html#term-bytes-like-object) and have the same length.

New in version 3.1.`bytes.partition`\(_sep_\)`bytearray.partition`\(_sep_\)

Split the sequence at the first occurrence of _sep_, and return a 3-tuple containing the part before the separator, the separator itself or its bytearray copy, and the part after the separator. If the separator is not found, return a 3-tuple containing a copy of the original sequence, followed by two empty bytes or bytearray objects.

The separator to search for may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object).`bytes.replace`\(_old_, _new_\[, _count_\]\)`bytearray.replace`\(_old_, _new_\[, _count_\]\)

Return a copy of the sequence with all occurrences of subsequence _old_ replaced by _new_. If the optional argument _count_ is given, only the first _count_ occurrences are replaced.

The subsequence to search for and its replacement may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object).

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.rfind`\(_sub_\[, _start_\[, _end_\]\]\)`bytearray.rfind`\(_sub_\[, _start_\[, _end_\]\]\)

Return the highest index in the sequence where the subsequence _sub_ is found, such that _sub_ is contained within `s[start:end]`. Optional arguments _start_ and _end_ are interpreted as in slice notation. Return `-1` on failure.

The subsequence to search for may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object) or an integer in the range 0 to 255.

Changed in version 3.3: Also accept an integer in the range 0 to 255 as the subsequence.`bytes.rindex`\(_sub_\[, _start_\[, _end_\]\]\)`bytearray.rindex`\(_sub_\[, _start_\[, _end_\]\]\)

Like [`rfind()`](https://docs.python.org/3/library/stdtypes.html#bytes.rfind) but raises [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) when the subsequence _sub_ is not found.

The subsequence to search for may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object) or an integer in the range 0 to 255.

Changed in version 3.3: Also accept an integer in the range 0 to 255 as the subsequence.`bytes.rpartition`\(_sep_\)`bytearray.rpartition`\(_sep_\)

Split the sequence at the last occurrence of _sep_, and return a 3-tuple containing the part before the separator, the separator itself or its bytearray copy, and the part after the separator. If the separator is not found, return a 3-tuple containing two empty bytes or bytearray objects, followed by a copy of the original sequence.

The separator to search for may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object).`bytes.startswith`\(_prefix_\[, _start_\[, _end_\]\]\)`bytearray.startswith`\(_prefix_\[, _start_\[, _end_\]\]\)

Return `True` if the binary data starts with the specified _prefix_, otherwise return `False`. _prefix_ can also be a tuple of prefixes to look for. With optional _start_, test beginning at that position. With optional _end_, stop comparing at that position.

The prefix\(es\) to search for may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object).`bytes.translate`\(_table_, _/_, _delete=b''_\)`bytearray.translate`\(_table_, _/_, _delete=b''_\)

Return a copy of the bytes or bytearray object where all bytes occurring in the optional argument _delete_ are removed, and the remaining bytes have been mapped through the given translation table, which must be a bytes object of length 256.

You can use the [`bytes.maketrans()`](https://docs.python.org/3/library/stdtypes.html#bytes.maketrans) method to create a translation table.

Set the _table_ argument to `None` for translations that only delete characters:&gt;&gt;&gt;

```text
>>> b'read this short text'.translate(None, b'aeiou')
b'rd ths shrt txt'
```

Changed in version 3.6: _delete_ is now supported as a keyword argument.

The following methods on bytes and bytearray objects have default behaviours that assume the use of ASCII compatible binary formats, but can still be used with arbitrary binary data by passing appropriate arguments. Note that all of the bytearray methods in this section do _not_ operate in place, and instead produce new objects.`bytes.center`\(_width_\[, _fillbyte_\]\)`bytearray.center`\(_width_\[, _fillbyte_\]\)

Return a copy of the object centered in a sequence of length _width_. Padding is done using the specified _fillbyte_ \(default is an ASCII space\). For [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) objects, the original sequence is returned if _width_ is less than or equal to `len(s)`.

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.ljust`\(_width_\[, _fillbyte_\]\)`bytearray.ljust`\(_width_\[, _fillbyte_\]\)

Return a copy of the object left justified in a sequence of length _width_. Padding is done using the specified _fillbyte_ \(default is an ASCII space\). For [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) objects, the original sequence is returned if _width_ is less than or equal to `len(s)`.

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.lstrip`\(\[_chars_\]\)`bytearray.lstrip`\(\[_chars_\]\)

Return a copy of the sequence with specified leading bytes removed. The _chars_ argument is a binary sequence specifying the set of byte values to be removed - the name refers to the fact this method is usually used with ASCII characters. If omitted or `None`, the _chars_ argument defaults to removing ASCII whitespace. The _chars_ argument is not a prefix; rather, all combinations of its values are stripped:&gt;&gt;&gt;

```text
>>> b'   spacious   '.lstrip()
b'spacious   '
>>> b'www.example.com'.lstrip(b'cmowz.')
b'example.com'
```

The binary sequence of byte values to remove may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object). See [`removeprefix()`](https://docs.python.org/3/library/stdtypes.html#bytes.removeprefix) for a method that will remove a single prefix string rather than all of a set of characters. For example:&gt;&gt;&gt;

```text
>>> b'Arthur: three!'.lstrip(b'Arthur: ')
b'ee!'
>>> b'Arthur: three!'.removeprefix(b'Arthur: ')
b'three!'
```

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.rjust`\(_width_\[, _fillbyte_\]\)`bytearray.rjust`\(_width_\[, _fillbyte_\]\)

Return a copy of the object right justified in a sequence of length _width_. Padding is done using the specified _fillbyte_ \(default is an ASCII space\). For [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) objects, the original sequence is returned if _width_ is less than or equal to `len(s)`.

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.rsplit`\(_sep=None_, _maxsplit=-1_\)`bytearray.rsplit`\(_sep=None_, _maxsplit=-1_\)

Split the binary sequence into subsequences of the same type, using _sep_ as the delimiter string. If _maxsplit_ is given, at most _maxsplit_ splits are done, the _rightmost_ ones. If _sep_ is not specified or `None`, any subsequence consisting solely of ASCII whitespace is a separator. Except for splitting from the right, [`rsplit()`](https://docs.python.org/3/library/stdtypes.html#bytearray.rsplit) behaves like [`split()`](https://docs.python.org/3/library/stdtypes.html#bytearray.split) which is described in detail below.`bytes.rstrip`\(\[_chars_\]\)`bytearray.rstrip`\(\[_chars_\]\)

Return a copy of the sequence with specified trailing bytes removed. The _chars_ argument is a binary sequence specifying the set of byte values to be removed - the name refers to the fact this method is usually used with ASCII characters. If omitted or `None`, the _chars_ argument defaults to removing ASCII whitespace. The _chars_ argument is not a suffix; rather, all combinations of its values are stripped:&gt;&gt;&gt;

```text
>>> b'   spacious   '.rstrip()
b'   spacious'
>>> b'mississippi'.rstrip(b'ipz')
b'mississ'
```

The binary sequence of byte values to remove may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object). See [`removesuffix()`](https://docs.python.org/3/library/stdtypes.html#bytes.removesuffix) for a method that will remove a single suffix string rather than all of a set of characters. For example:&gt;&gt;&gt;

```text
>>> b'Monty Python'.rstrip(b' Python')
b'M'
>>> b'Monty Python'.removesuffix(b' Python')
b'Monty'
```

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.split`\(_sep=None_, _maxsplit=-1_\)`bytearray.split`\(_sep=None_, _maxsplit=-1_\)

Split the binary sequence into subsequences of the same type, using _sep_ as the delimiter string. If _maxsplit_ is given and non-negative, at most _maxsplit_ splits are done \(thus, the list will have at most `maxsplit+1` elements\). If _maxsplit_ is not specified or is `-1`, then there is no limit on the number of splits \(all possible splits are made\).

If _sep_ is given, consecutive delimiters are not grouped together and are deemed to delimit empty subsequences \(for example, `b'1,,2'.split(b',')` returns `[b'1', b'', b'2']`\). The _sep_ argument may consist of a multibyte sequence \(for example, `b'1<>2<>3'.split(b'<>')` returns `[b'1', b'2', b'3']`\). Splitting an empty sequence with a specified separator returns `[b'']` or `[bytearray(b'')]` depending on the type of object being split. The _sep_ argument may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object).

For example:&gt;&gt;&gt;

```text
>>> b'1,2,3'.split(b',')
[b'1', b'2', b'3']
>>> b'1,2,3'.split(b',', maxsplit=1)
[b'1', b'2,3']
>>> b'1,2,,3,'.split(b',')
[b'1', b'2', b'', b'3', b'']
```

If _sep_ is not specified or is `None`, a different splitting algorithm is applied: runs of consecutive ASCII whitespace are regarded as a single separator, and the result will contain no empty strings at the start or end if the sequence has leading or trailing whitespace. Consequently, splitting an empty sequence or a sequence consisting solely of ASCII whitespace without a specified separator returns `[]`.

For example:&gt;&gt;&gt;

```text
>>> b'1 2 3'.split()
[b'1', b'2', b'3']
>>> b'1 2 3'.split(maxsplit=1)
[b'1', b'2 3']
>>> b'   1   2   3   '.split()
[b'1', b'2', b'3']
```

`bytes.strip`\(\[_chars_\]\)`bytearray.strip`\(\[_chars_\]\)

Return a copy of the sequence with specified leading and trailing bytes removed. The _chars_ argument is a binary sequence specifying the set of byte values to be removed - the name refers to the fact this method is usually used with ASCII characters. If omitted or `None`, the _chars_ argument defaults to removing ASCII whitespace. The _chars_ argument is not a prefix or suffix; rather, all combinations of its values are stripped:&gt;&gt;&gt;

```text
>>> b'   spacious   '.strip()
b'spacious'
>>> b'www.example.com'.strip(b'cmowz.')
b'example'
```

The binary sequence of byte values to remove may be any [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object).

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.

The following methods on bytes and bytearray objects assume the use of ASCII compatible binary formats and should not be applied to arbitrary binary data. Note that all of the bytearray methods in this section do _not_ operate in place, and instead produce new objects.`bytes.capitalize`\(\)`bytearray.capitalize`\(\)

Return a copy of the sequence with each byte interpreted as an ASCII character, and the first byte capitalized and the rest lowercased. Non-ASCII byte values are passed through unchanged.

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.expandtabs`\(_tabsize=8_\)`bytearray.expandtabs`\(_tabsize=8_\)

Return a copy of the sequence where all ASCII tab characters are replaced by one or more ASCII spaces, depending on the current column and the given tab size. Tab positions occur every _tabsize_ bytes \(default is 8, giving tab positions at columns 0, 8, 16 and so on\). To expand the sequence, the current column is set to zero and the sequence is examined byte by byte. If the byte is an ASCII tab character \(`b'\t'`\), one or more space characters are inserted in the result until the current column is equal to the next tab position. \(The tab character itself is not copied.\) If the current byte is an ASCII newline \(`b'\n'`\) or carriage return \(`b'\r'`\), it is copied and the current column is reset to zero. Any other byte value is copied unchanged and the current column is incremented by one regardless of how the byte value is represented when printed:&gt;&gt;&gt;

```text
>>> b'01\t012\t0123\t01234'.expandtabs()
b'01      012     0123    01234'
>>> b'01\t012\t0123\t01234'.expandtabs(4)
b'01  012 0123    01234'
```

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.isalnum`\(\)`bytearray.isalnum`\(\)

Return `True` if all bytes in the sequence are alphabetical ASCII characters or ASCII decimal digits and the sequence is not empty, `False` otherwise. Alphabetic ASCII characters are those byte values in the sequence `b'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'`. ASCII decimal digits are those byte values in the sequence `b'0123456789'`.

For example:&gt;&gt;&gt;

```text
>>> b'ABCabc1'.isalnum()
True
>>> b'ABC abc1'.isalnum()
False
```

`bytes.isalpha`\(\)`bytearray.isalpha`\(\)

Return `True` if all bytes in the sequence are alphabetic ASCII characters and the sequence is not empty, `False` otherwise. Alphabetic ASCII characters are those byte values in the sequence `b'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'`.

For example:&gt;&gt;&gt;

```text
>>> b'ABCabc'.isalpha()
True
>>> b'ABCabc1'.isalpha()
False
```

`bytes.isascii`\(\)`bytearray.isascii`\(\)

Return `True` if the sequence is empty or all bytes in the sequence are ASCII, `False` otherwise. ASCII bytes are in the range 0-0x7F.

New in version 3.7.`bytes.isdigit`\(\)`bytearray.isdigit`\(\)

Return `True` if all bytes in the sequence are ASCII decimal digits and the sequence is not empty, `False` otherwise. ASCII decimal digits are those byte values in the sequence `b'0123456789'`.

For example:&gt;&gt;&gt;

```text
>>> b'1234'.isdigit()
True
>>> b'1.23'.isdigit()
False
```

`bytes.islower`\(\)`bytearray.islower`\(\)

Return `True` if there is at least one lowercase ASCII character in the sequence and no uppercase ASCII characters, `False` otherwise.

For example:&gt;&gt;&gt;

```text
>>> b'hello world'.islower()
True
>>> b'Hello world'.islower()
False
```

Lowercase ASCII characters are those byte values in the sequence `b'abcdefghijklmnopqrstuvwxyz'`. Uppercase ASCII characters are those byte values in the sequence `b'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`.`bytes.isspace`\(\)`bytearray.isspace`\(\)

Return `True` if all bytes in the sequence are ASCII whitespace and the sequence is not empty, `False` otherwise. ASCII whitespace characters are those byte values in the sequence `b' \t\n\r\x0b\f'` \(space, tab, newline, carriage return, vertical tab, form feed\).`bytes.istitle`\(\)`bytearray.istitle`\(\)

Return `True` if the sequence is ASCII titlecase and the sequence is not empty, `False` otherwise. See [`bytes.title()`](https://docs.python.org/3/library/stdtypes.html#bytes.title) for more details on the definition of “titlecase”.

For example:&gt;&gt;&gt;

```text
>>> b'Hello World'.istitle()
True
>>> b'Hello world'.istitle()
False
```

`bytes.isupper`\(\)`bytearray.isupper`\(\)

Return `True` if there is at least one uppercase alphabetic ASCII character in the sequence and no lowercase ASCII characters, `False` otherwise.

For example:&gt;&gt;&gt;

```text
>>> b'HELLO WORLD'.isupper()
True
>>> b'Hello world'.isupper()
False
```

Lowercase ASCII characters are those byte values in the sequence `b'abcdefghijklmnopqrstuvwxyz'`. Uppercase ASCII characters are those byte values in the sequence `b'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`.`bytes.lower`\(\)`bytearray.lower`\(\)

Return a copy of the sequence with all the uppercase ASCII characters converted to their corresponding lowercase counterpart.

For example:&gt;&gt;&gt;

```text
>>> b'Hello World'.lower()
b'hello world'
```

Lowercase ASCII characters are those byte values in the sequence `b'abcdefghijklmnopqrstuvwxyz'`. Uppercase ASCII characters are those byte values in the sequence `b'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`.

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.splitlines`\(_keepends=False_\)`bytearray.splitlines`\(_keepends=False_\)

Return a list of the lines in the binary sequence, breaking at ASCII line boundaries. This method uses the [universal newlines](https://docs.python.org/3/glossary.html#term-universal-newlines) approach to splitting lines. Line breaks are not included in the resulting list unless _keepends_ is given and true.

For example:&gt;&gt;&gt;

```text
>>> b'ab c\n\nde fg\rkl\r\n'.splitlines()
[b'ab c', b'', b'de fg', b'kl']
>>> b'ab c\n\nde fg\rkl\r\n'.splitlines(keepends=True)
[b'ab c\n', b'\n', b'de fg\r', b'kl\r\n']
```

Unlike [`split()`](https://docs.python.org/3/library/stdtypes.html#bytes.split) when a delimiter string _sep_ is given, this method returns an empty list for the empty string, and a terminal line break does not result in an extra line:&gt;&gt;&gt;

```text
>>> b"".split(b'\n'), b"Two lines\n".split(b'\n')
([b''], [b'Two lines', b''])
>>> b"".splitlines(), b"One line\n".splitlines()
([], [b'One line'])
```

`bytes.swapcase`\(\)`bytearray.swapcase`\(\)

Return a copy of the sequence with all the lowercase ASCII characters converted to their corresponding uppercase counterpart and vice-versa.

For example:&gt;&gt;&gt;

```text
>>> b'Hello World'.swapcase()
b'hELLO wORLD'
```

Lowercase ASCII characters are those byte values in the sequence `b'abcdefghijklmnopqrstuvwxyz'`. Uppercase ASCII characters are those byte values in the sequence `b'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`.

Unlike [`str.swapcase()`](https://docs.python.org/3/library/stdtypes.html#str.swapcase), it is always the case that `bin.swapcase().swapcase() == bin` for the binary versions. Case conversions are symmetrical in ASCII, even though that is not generally true for arbitrary Unicode code points.

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.title`\(\)`bytearray.title`\(\)

Return a titlecased version of the binary sequence where words start with an uppercase ASCII character and the remaining characters are lowercase. Uncased byte values are left unmodified.

For example:&gt;&gt;&gt;

```text
>>> b'Hello world'.title()
b'Hello World'
```

Lowercase ASCII characters are those byte values in the sequence `b'abcdefghijklmnopqrstuvwxyz'`. Uppercase ASCII characters are those byte values in the sequence `b'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`. All other byte values are uncased.

The algorithm uses a simple language-independent definition of a word as groups of consecutive letters. The definition works in many contexts but it means that apostrophes in contractions and possessives form word boundaries, which may not be the desired result:&gt;&gt;&gt;

```text
>>> b"they're bill's friends from the UK".title()
b"They'Re Bill'S Friends From The Uk"
```

A workaround for apostrophes can be constructed using regular expressions:&gt;&gt;&gt;

```text
>>> import re
>>> def titlecase(s):
...     return re.sub(rb"[A-Za-z]+('[A-Za-z]+)?",
...                   lambda mo: mo.group(0)[0:1].upper() +
...                              mo.group(0)[1:].lower(),
...                   s)
...
>>> titlecase(b"they're bill's friends.")
b"They're Bill's Friends."
```

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.upper`\(\)`bytearray.upper`\(\)

Return a copy of the sequence with all the lowercase ASCII characters converted to their corresponding uppercase counterpart.

For example:&gt;&gt;&gt;

```text
>>> b'Hello World'.upper()
b'HELLO WORLD'
```

Lowercase ASCII characters are those byte values in the sequence `b'abcdefghijklmnopqrstuvwxyz'`. Uppercase ASCII characters are those byte values in the sequence `b'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`.

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.`bytes.zfill`\(_width_\)`bytearray.zfill`\(_width_\)

Return a copy of the sequence left filled with ASCII `b'0'` digits to make a sequence of length _width_. A leading sign prefix \(`b'+'`/ `b'-'`\) is handled by inserting the padding _after_ the sign character rather than before. For [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) objects, the original sequence is returned if _width_ is less than or equal to `len(seq)`.

For example:&gt;&gt;&gt;

```text
>>> b"42".zfill(5)
b'00042'
>>> b"-42".zfill(5)
b'-0042'
```

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.

#### `printf`-style Bytes Formatting

Note 

The formatting operations described here exhibit a variety of quirks that lead to a number of common errors \(such as failing to display tuples and dictionaries correctly\). If the value being printed may be a tuple or dictionary, wrap it in a tuple.

Bytes objects \(`bytes`/`bytearray`\) have one unique built-in operation: the `%` operator \(modulo\). This is also known as the bytes _formatting_ or _interpolation_ operator. Given `format % values` \(where _format_ is a bytes object\), `%` conversion specifications in _format_ are replaced with zero or more elements of _values_. The effect is similar to using the `sprintf()` in the C language.

If _format_ requires a single argument, _values_ may be a single non-tuple object. [5](https://docs.python.org/3/library/stdtypes.html#id16) Otherwise, _values_ must be a tuple with exactly the number of items specified by the format bytes object, or a single mapping object \(for example, a dictionary\).

A conversion specifier contains two or more characters and has the following components, which must occur in this order:

1. The `'%'` character, which marks the start of the specifier.
2. Mapping key \(optional\), consisting of a parenthesised sequence of characters \(for example, `(somename)`\).
3. Conversion flags \(optional\), which affect the result of some conversion types.
4. Minimum field width \(optional\). If specified as an `'*'` \(asterisk\), the actual width is read from the next element of the tuple in _values_, and the object to convert comes after the minimum field width and optional precision.
5. Precision \(optional\), given as a `'.'` \(dot\) followed by the precision. If specified as `'*'` \(an asterisk\), the actual precision is read from the next element of the tuple in _values_, and the value to convert comes after the precision.
6. Length modifier \(optional\).
7. Conversion type.

When the right argument is a dictionary \(or other mapping type\), then the formats in the bytes object _must_ include a parenthesised mapping key into that dictionary inserted immediately after the `'%'` character. The mapping key selects the value to be formatted from the mapping. For example:&gt;&gt;&gt;

```text
>>> print(b'%(language)s has %(number)03d quote types.' %
...       {b'language': b"Python", b"number": 2})
b'Python has 002 quote types.'
```

In this case no `*` specifiers may occur in a format \(since they require a sequential parameter list\).

The conversion flag characters are:

| Flag | Meaning |
| :--- | :--- |
| `'#'` | The value conversion will use the “alternate form” \(where defined below\). |
| `'0'` | The conversion will be zero padded for numeric values. |
| `'-'` | The converted value is left adjusted \(overrides the `'0'` conversion if both are given\). |
| `' '` | \(a space\) A blank should be left before a positive number \(or empty string\) produced by a signed conversion. |
| `'+'` | A sign character \(`'+'` or `'-'`\) will precede the conversion \(overrides a “space” flag\). |

A length modifier \(`h`, `l`, or `L`\) may be present, but is ignored as it is not necessary for Python – so e.g. `%ld` is identical to `%d`.

The conversion types are:

| Conversion | Meaning | Notes |
| :--- | :--- | :--- |
| `'d'` | Signed integer decimal. |  |
| `'i'` | Signed integer decimal. |  |
| `'o'` | Signed octal value. | \(1\) |
| `'u'` | Obsolete type – it is identical to `'d'`. | \(8\) |
| `'x'` | Signed hexadecimal \(lowercase\). | \(2\) |
| `'X'` | Signed hexadecimal \(uppercase\). | \(2\) |
| `'e'` | Floating point exponential format \(lowercase\). | \(3\) |
| `'E'` | Floating point exponential format \(uppercase\). | \(3\) |
| `'f'` | Floating point decimal format. | \(3\) |
| `'F'` | Floating point decimal format. | \(3\) |
| `'g'` | Floating point format. Uses lowercase exponential format if exponent is less than -4 or not less than precision, decimal format otherwise. | \(4\) |
| `'G'` | Floating point format. Uses uppercase exponential format if exponent is less than -4 or not less than precision, decimal format otherwise. | \(4\) |
| `'c'` | Single byte \(accepts integer or single byte objects\). |  |
| `'b'` | Bytes \(any object that follows the [buffer protocol](https://docs.python.org/3/c-api/buffer.html#bufferobjects) or has [`__bytes__()`](https://docs.python.org/3/reference/datamodel.html#object.__bytes__)\). | \(5\) |
| `'s'` | `'s'` is an alias for `'b'` and should only be used for Python2/3 code bases. | \(6\) |
| `'a'` | Bytes \(converts any Python object using `repr(obj).encode('ascii','backslashreplace)`\). | \(5\) |
| `'r'` | `'r'` is an alias for `'a'` and should only be used for Python2/3 code bases. | \(7\) |
| `'%'` | No argument is converted, results in a `'%'` character in the result. |  |

Notes:

1. The alternate form causes a leading octal specifier \(`'0o'`\) to be inserted before the first digit.
2. The alternate form causes a leading `'0x'` or `'0X'` \(depending on whether the `'x'` or `'X'` format was used\) to be inserted before the first digit.
3. The alternate form causes the result to always contain a decimal point, even if no digits follow it.

   The precision determines the number of digits after the decimal point and defaults to 6.

4. The alternate form causes the result to always contain a decimal point, and trailing zeroes are not removed as they would otherwise be.

   The precision determines the number of significant digits before and after the decimal point and defaults to 6.

5. If precision is `N`, the output is truncated to `N` characters.
6. `b'%s'` is deprecated, but will not be removed during the 3.x series.
7. `b'%r'` is deprecated, but will not be removed during the 3.x series.
8. See [**PEP 237**](https://www.python.org/dev/peps/pep-0237).

Note 

The bytearray version of this method does _not_ operate in place - it always produces a new object, even if no changes were made.

See also 

[**PEP 461**](https://www.python.org/dev/peps/pep-0461) - Adding % formatting to bytes and bytearray

New in version 3.5.

#### Memory Views

[`memoryview`](https://docs.python.org/3/library/stdtypes.html#memoryview) objects allow Python code to access the internal data of an object that supports the [buffer protocol](https://docs.python.org/3/c-api/buffer.html#bufferobjects) without copying._class_ `memoryview`\(_object_\)

Create a [`memoryview`](https://docs.python.org/3/library/stdtypes.html#memoryview) that references _object_. _object_ must support the buffer protocol. Built-in objects that support the buffer protocol include [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) and [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray).

A [`memoryview`](https://docs.python.org/3/library/stdtypes.html#memoryview) has the notion of an _element_, which is the atomic memory unit handled by the originating _object_. For many simple types such as [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) and [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray), an element is a single byte, but other types such as [`array.array`](https://docs.python.org/3/library/array.html#array.array) may have bigger elements.

`len(view)` is equal to the length of [`tolist`](https://docs.python.org/3/library/stdtypes.html#memoryview.tolist). If `view.ndim = 0`, the length is 1. If `view.ndim = 1`, the length is equal to the number of elements in the view. For higher dimensions, the length is equal to the length of the nested list representation of the view. The [`itemsize`](https://docs.python.org/3/library/stdtypes.html#memoryview.itemsize) attribute will give you the number of bytes in a single element.

A [`memoryview`](https://docs.python.org/3/library/stdtypes.html#memoryview) supports slicing and indexing to expose its data. One-dimensional slicing will result in a subview:&gt;&gt;&gt;

```text
>>> v = memoryview(b'abcefg')
>>> v[1]
98
>>> v[-1]
103
>>> v[1:4]
<memory at 0x7f3ddc9f4350>
>>> bytes(v[1:4])
b'bce'
```

If [`format`](https://docs.python.org/3/library/stdtypes.html#memoryview.format) is one of the native format specifiers from the [`struct`](https://docs.python.org/3/library/struct.html#module-struct) module, indexing with an integer or a tuple of integers is also supported and returns a single _element_ with the correct type. One-dimensional memoryviews can be indexed with an integer or a one-integer tuple. Multi-dimensional memoryviews can be indexed with tuples of exactly _ndim_ integers where _ndim_ is the number of dimensions. Zero-dimensional memoryviews can be indexed with the empty tuple.

Here is an example with a non-byte format:&gt;&gt;&gt;

```text
>>> import array
>>> a = array.array('l', [-11111111, 22222222, -33333333, 44444444])
>>> m = memoryview(a)
>>> m[0]
-11111111
>>> m[-1]
44444444
>>> m[::2].tolist()
[-11111111, -33333333]
```

If the underlying object is writable, the memoryview supports one-dimensional slice assignment. Resizing is not allowed:&gt;&gt;&gt;

```text
>>> data = bytearray(b'abcefg')
>>> v = memoryview(data)
>>> v.readonly
False
>>> v[0] = ord(b'z')
>>> data
bytearray(b'zbcefg')
>>> v[1:4] = b'123'
>>> data
bytearray(b'z123fg')
>>> v[2:3] = b'spam'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: memoryview assignment: lvalue and rvalue have different structures
>>> v[2:6] = b'spam'
>>> data
bytearray(b'z1spam')
```

One-dimensional memoryviews of hashable \(read-only\) types with formats ‘B’, ‘b’ or ‘c’ are also hashable. The hash is defined as `hash(m) == hash(m.tobytes())`:&gt;&gt;&gt;

```text
>>> v = memoryview(b'abcefg')
>>> hash(v) == hash(b'abcefg')
True
>>> hash(v[2:4]) == hash(b'ce')
True
>>> hash(v[::-2]) == hash(b'abcefg'[::-2])
True
```

Changed in version 3.3: One-dimensional memoryviews can now be sliced. One-dimensional memoryviews with formats ‘B’, ‘b’ or ‘c’ are now hashable.

Changed in version 3.4: memoryview is now registered automatically with [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence)

Changed in version 3.5: memoryviews can now be indexed with tuple of integers.

[`memoryview`](https://docs.python.org/3/library/stdtypes.html#memoryview) has several methods:`__eq__`\(_exporter_\)

A memoryview and a [**PEP 3118**](https://www.python.org/dev/peps/pep-3118) exporter are equal if their shapes are equivalent and if all corresponding values are equal when the operands’ respective format codes are interpreted using [`struct`](https://docs.python.org/3/library/struct.html#module-struct) syntax.

For the subset of [`struct`](https://docs.python.org/3/library/struct.html#module-struct) format strings currently supported by [`tolist()`](https://docs.python.org/3/library/stdtypes.html#memoryview.tolist), `v` and `w` are equal if `v.tolist() == w.tolist()`:&gt;&gt;&gt;

```text
>>> import array
>>> a = array.array('I', [1, 2, 3, 4, 5])
>>> b = array.array('d', [1.0, 2.0, 3.0, 4.0, 5.0])
>>> c = array.array('b', [5, 3, 1])
>>> x = memoryview(a)
>>> y = memoryview(b)
>>> x == a == y == b
True
>>> x.tolist() == a.tolist() == y.tolist() == b.tolist()
True
>>> z = y[::-2]
>>> z == c
True
>>> z.tolist() == c.tolist()
True
```

If either format string is not supported by the [`struct`](https://docs.python.org/3/library/struct.html#module-struct) module, then the objects will always compare as unequal \(even if the format strings and buffer contents are identical\):&gt;&gt;&gt;

```text
>>> from ctypes import BigEndianStructure, c_long
>>> class BEPoint(BigEndianStructure):
...     _fields_ = [("x", c_long), ("y", c_long)]
...
>>> point = BEPoint(100, 200)
>>> a = memoryview(point)
>>> b = memoryview(point)
>>> a == point
False
>>> a == b
False
```

Note that, as with floating point numbers, `v is w` does _not_ imply `v == w` for memoryview objects.

Changed in version 3.3: Previous versions compared the raw memory disregarding the item format and the logical array structure.`tobytes`\(_order=None_\)

Return the data in the buffer as a bytestring. This is equivalent to calling the [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes) constructor on the memoryview.&gt;&gt;&gt;

```text
>>> m = memoryview(b"abc")
>>> m.tobytes()
b'abc'
>>> bytes(m)
b'abc'
```

For non-contiguous arrays the result is equal to the flattened list representation with all elements converted to bytes. [`tobytes()`](https://docs.python.org/3/library/stdtypes.html#memoryview.tobytes) supports all format strings, including those that are not in [`struct`](https://docs.python.org/3/library/struct.html#module-struct) module syntax.

New in version 3.8: _order_ can be {‘C’, ‘F’, ‘A’}. When _order_ is ‘C’ or ‘F’, the data of the original array is converted to C or Fortran order. For contiguous views, ‘A’ returns an exact copy of the physical memory. In particular, in-memory Fortran order is preserved. For non-contiguous views, the data is converted to C first. _order=None_ is the same as _order=’C’_.`hex`\(\[_sep_\[, _bytes\_per\_sep_\]\]\)

Return a string object containing two hexadecimal digits for each byte in the buffer.&gt;&gt;&gt;

```text
>>> m = memoryview(b"abc")
>>> m.hex()
'616263'
```

New in version 3.5.

Changed in version 3.8: Similar to [`bytes.hex()`](https://docs.python.org/3/library/stdtypes.html#bytes.hex), [`memoryview.hex()`](https://docs.python.org/3/library/stdtypes.html#memoryview.hex) now supports optional _sep_ and _bytes\_per\_sep_ parameters to insert separators between bytes in the hex output.`tolist`\(\)

Return the data in the buffer as a list of elements.&gt;&gt;&gt;

```text
>>> memoryview(b'abc').tolist()
[97, 98, 99]
>>> import array
>>> a = array.array('d', [1.1, 2.2, 3.3])
>>> m = memoryview(a)
>>> m.tolist()
[1.1, 2.2, 3.3]
```

Changed in version 3.3: [`tolist()`](https://docs.python.org/3/library/stdtypes.html#memoryview.tolist) now supports all single character native formats in [`struct`](https://docs.python.org/3/library/struct.html#module-struct) module syntax as well as multi-dimensional representations.`toreadonly`\(\)

Return a readonly version of the memoryview object. The original memoryview object is unchanged.&gt;&gt;&gt;

```text
>>> m = memoryview(bytearray(b'abc'))
>>> mm = m.toreadonly()
>>> mm.tolist()
[89, 98, 99]
>>> mm[0] = 42
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: cannot modify read-only memory
>>> m[0] = 43
>>> mm.tolist()
[43, 98, 99]
```

New in version 3.8.`release`\(\)

Release the underlying buffer exposed by the memoryview object. Many objects take special actions when a view is held on them \(for example, a [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray) would temporarily forbid resizing\); therefore, calling release\(\) is handy to remove these restrictions \(and free any dangling resources\) as soon as possible.

After this method has been called, any further operation on the view raises a [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) \(except [`release()`](https://docs.python.org/3/library/stdtypes.html#memoryview.release) itself which can be called multiple times\):&gt;&gt;&gt;

```text
>>> m = memoryview(b'abc')
>>> m.release()
>>> m[0]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: operation forbidden on released memoryview object
```

The context management protocol can be used for a similar effect, using the `with` statement:&gt;&gt;&gt;

```text
>>> with memoryview(b'abc') as m:
...     m[0]
...
97
>>> m[0]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: operation forbidden on released memoryview object
```

New in version 3.2.`cast`\(_format_\[, _shape_\]\)

Cast a memoryview to a new format or shape. _shape_ defaults to `[byte_length//new_itemsize]`, which means that the result view will be one-dimensional. The return value is a new memoryview, but the buffer itself is not copied. Supported casts are 1D -&gt; C-[contiguous](https://docs.python.org/3/glossary.html#term-contiguous) and C-contiguous -&gt; 1D.

The destination format is restricted to a single element native format in [`struct`](https://docs.python.org/3/library/struct.html#module-struct) syntax. One of the formats must be a byte format \(‘B’, ‘b’ or ‘c’\). The byte length of the result must be the same as the original length.

Cast 1D/long to 1D/unsigned bytes:&gt;&gt;&gt;

```text
>>> import array
>>> a = array.array('l', [1,2,3])
>>> x = memoryview(a)
>>> x.format
'l'
>>> x.itemsize
8
>>> len(x)
3
>>> x.nbytes
24
>>> y = x.cast('B')
>>> y.format
'B'
>>> y.itemsize
1
>>> len(y)
24
>>> y.nbytes
24
```

Cast 1D/unsigned bytes to 1D/char:&gt;&gt;&gt;

```text
>>> b = bytearray(b'zyz')
>>> x = memoryview(b)
>>> x[0] = b'a'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: memoryview: invalid value for format "B"
>>> y = x.cast('c')
>>> y[0] = b'a'
>>> b
bytearray(b'ayz')
```

Cast 1D/bytes to 3D/ints to 1D/signed char:&gt;&gt;&gt;

```text
>>> import struct
>>> buf = struct.pack("i"*12, *list(range(12)))
>>> x = memoryview(buf)
>>> y = x.cast('i', shape=[2,2,3])
>>> y.tolist()
[[[0, 1, 2], [3, 4, 5]], [[6, 7, 8], [9, 10, 11]]]
>>> y.format
'i'
>>> y.itemsize
4
>>> len(y)
2
>>> y.nbytes
48
>>> z = y.cast('b')
>>> z.format
'b'
>>> z.itemsize
1
>>> len(z)
48
>>> z.nbytes
48
```

Cast 1D/unsigned long to 2D/unsigned long:&gt;&gt;&gt;

```text
>>> buf = struct.pack("L"*6, *list(range(6)))
>>> x = memoryview(buf)
>>> y = x.cast('L', shape=[2,3])
>>> len(y)
2
>>> y.nbytes
48
>>> y.tolist()
[[0, 1, 2], [3, 4, 5]]
```

New in version 3.3.

Changed in version 3.5: The source format is no longer restricted when casting to a byte view.

There are also several readonly attributes available:`obj`

The underlying object of the memoryview:&gt;&gt;&gt;

```text
>>> b  = bytearray(b'xyz')
>>> m = memoryview(b)
>>> m.obj is b
True
```

New in version 3.3.`nbytes`

`nbytes == product(shape) * itemsize == len(m.tobytes())`. This is the amount of space in bytes that the array would use in a contiguous representation. It is not necessarily equal to `len(m)`:&gt;&gt;&gt;

```text
>>> import array
>>> a = array.array('i', [1,2,3,4,5])
>>> m = memoryview(a)
>>> len(m)
5
>>> m.nbytes
20
>>> y = m[::2]
>>> len(y)
3
>>> y.nbytes
12
>>> len(y.tobytes())
12
```

Multi-dimensional arrays:&gt;&gt;&gt;

```text
>>> import struct
>>> buf = struct.pack("d"*12, *[1.5*x for x in range(12)])
>>> x = memoryview(buf)
>>> y = x.cast('d', shape=[3,4])
>>> y.tolist()
[[0.0, 1.5, 3.0, 4.5], [6.0, 7.5, 9.0, 10.5], [12.0, 13.5, 15.0, 16.5]]
>>> len(y)
3
>>> y.nbytes
96
```

New in version 3.3.`readonly`

A bool indicating whether the memory is read only.`format`

A string containing the format \(in [`struct`](https://docs.python.org/3/library/struct.html#module-struct) module style\) for each element in the view. A memoryview can be created from exporters with arbitrary format strings, but some methods \(e.g. [`tolist()`](https://docs.python.org/3/library/stdtypes.html#memoryview.tolist)\) are restricted to native single element formats.

Changed in version 3.3: format `'B'` is now handled according to the struct module syntax. This means that `memoryview(b'abc')[0] == b'abc'[0] == 97`.`itemsize`

The size in bytes of each element of the memoryview:&gt;&gt;&gt;

```text
>>> import array, struct
>>> m = memoryview(array.array('H', [32000, 32001, 32002]))
>>> m.itemsize
2
>>> m[0]
32000
>>> struct.calcsize('H') == m.itemsize
True
```

`ndim`

An integer indicating how many dimensions of a multi-dimensional array the memory represents.`shape`

A tuple of integers the length of [`ndim`](https://docs.python.org/3/library/stdtypes.html#memoryview.ndim) giving the shape of the memory as an N-dimensional array.

Changed in version 3.3: An empty tuple instead of `None` when ndim = 0.`strides`

A tuple of integers the length of [`ndim`](https://docs.python.org/3/library/stdtypes.html#memoryview.ndim) giving the size in bytes to access each element for each dimension of the array.

Changed in version 3.3: An empty tuple instead of `None` when ndim = 0.`suboffsets`

Used internally for PIL-style arrays. The value is informational only.`c_contiguous`

A bool indicating whether the memory is C-[contiguous](https://docs.python.org/3/glossary.html#term-contiguous).

New in version 3.3.`f_contiguous`

A bool indicating whether the memory is Fortran [contiguous](https://docs.python.org/3/glossary.html#term-contiguous).

New in version 3.3.`contiguous`

A bool indicating whether the memory is [contiguous](https://docs.python.org/3/glossary.html#term-contiguous).

New in version 3.3.

### Set Types — [`set`](https://docs.python.org/3/library/stdtypes.html#set), [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset)

A _set_ object is an unordered collection of distinct [hashable](https://docs.python.org/3/glossary.html#term-hashable) objects. Common uses include membership testing, removing duplicates from a sequence, and computing mathematical operations such as intersection, union, difference, and symmetric difference. \(For other containers see the built-in [`dict`](https://docs.python.org/3/library/stdtypes.html#dict), [`list`](https://docs.python.org/3/library/stdtypes.html#list), and [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple) classes, and the [`collections`](https://docs.python.org/3/library/collections.html#module-collections) module.\)

Like other collections, sets support `x in set`, `len(set)`, and `for x in set`. Being an unordered collection, sets do not record element position or order of insertion. Accordingly, sets do not support indexing, slicing, or other sequence-like behavior.

There are currently two built-in set types, [`set`](https://docs.python.org/3/library/stdtypes.html#set) and [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset). The [`set`](https://docs.python.org/3/library/stdtypes.html#set) type is mutable — the contents can be changed using methods like `add()` and `remove()`. Since it is mutable, it has no hash value and cannot be used as either a dictionary key or as an element of another set. The [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset) type is immutable and [hashable](https://docs.python.org/3/glossary.html#term-hashable) — its contents cannot be altered after it is created; it can therefore be used as a dictionary key or as an element of another set.

Non-empty sets \(not frozensets\) can be created by placing a comma-separated list of elements within braces, for example: `{'jack', 'sjoerd'}`, in addition to the [`set`](https://docs.python.org/3/library/stdtypes.html#set) constructor.

The constructors for both classes work the same:_class_ `set`\(\[_iterable_\]\)_class_ `frozenset`\(\[_iterable_\]\)

Return a new set or frozenset object whose elements are taken from _iterable_. The elements of a set must be [hashable](https://docs.python.org/3/glossary.html#term-hashable). To represent sets of sets, the inner sets must be [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset) objects. If _iterable_ is not specified, a new empty set is returned.

Sets can be created by several means:

* Use a comma-separated list of elements within braces: `{'jack', 'sjoerd'}`
* Use a set comprehension: `{c for c in 'abracadabra' if c not in 'abc'}`
* Use the type constructor: `set()`, `set('foobar')`, `set(['a', 'b', 'foo'])`

Instances of [`set`](https://docs.python.org/3/library/stdtypes.html#set) and [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset) provide the following operations:`len(s)`

Return the number of elements in set _s_ \(cardinality of _s_\).`x in s`

Test _x_ for membership in _s_.`x not in s`

Test _x_ for non-membership in _s_.`isdisjoint`\(_other_\)

Return `True` if the set has no elements in common with _other_. Sets are disjoint if and only if their intersection is the empty set.`issubset`\(_other_\)`set <= other`

Test whether every element in the set is in _other_.`set < other`

Test whether the set is a proper subset of _other_, that is, `set <= other and set != other`.`issuperset`\(_other_\)`set >= other`

Test whether every element in _other_ is in the set.`set > other`

Test whether the set is a proper superset of _other_, that is, `set >= other and set != other`.`union`\(_\*others_\)`set | other | ...`

Return a new set with elements from the set and all others.`intersection`\(_\*others_\)`set & other & ...`

Return a new set with elements common to the set and all others.`difference`\(_\*others_\)`set - other - ...`

Return a new set with elements in the set that are not in the others.`symmetric_difference`\(_other_\)`set ^ other`

Return a new set with elements in either the set or _other_ but not both.`copy`\(\)

Return a shallow copy of the set.

Note, the non-operator versions of [`union()`](https://docs.python.org/3/library/stdtypes.html#frozenset.union), [`intersection()`](https://docs.python.org/3/library/stdtypes.html#frozenset.intersection), [`difference()`](https://docs.python.org/3/library/stdtypes.html#frozenset.difference), and [`symmetric_difference()`](https://docs.python.org/3/library/stdtypes.html#frozenset.symmetric_difference), [`issubset()`](https://docs.python.org/3/library/stdtypes.html#frozenset.issubset), and [`issuperset()`](https://docs.python.org/3/library/stdtypes.html#frozenset.issuperset) methods will accept any iterable as an argument. In contrast, their operator based counterparts require their arguments to be sets. This precludes error-prone constructions like `set('abc') & 'cbs'` in favor of the more readable `set('abc').intersection('cbs')`.

Both [`set`](https://docs.python.org/3/library/stdtypes.html#set) and [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset) support set to set comparisons. Two sets are equal if and only if every element of each set is contained in the other \(each is a subset of the other\). A set is less than another set if and only if the first set is a proper subset of the second set \(is a subset, but is not equal\). A set is greater than another set if and only if the first set is a proper superset of the second set \(is a superset, but is not equal\).

Instances of [`set`](https://docs.python.org/3/library/stdtypes.html#set) are compared to instances of [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset) based on their members. For example, `set('abc') == frozenset('abc')` returns `True` and so does `set('abc') in set([frozenset('abc')])`.

The subset and equality comparisons do not generalize to a total ordering function. For example, any two nonempty disjoint sets are not equal and are not subsets of each other, so _all_ of the following return `False`: `a<b`, `a==b`, or `a>b`.

Since sets only define partial ordering \(subset relationships\), the output of the [`list.sort()`](https://docs.python.org/3/library/stdtypes.html#list.sort) method is undefined for lists of sets.

Set elements, like dictionary keys, must be [hashable](https://docs.python.org/3/glossary.html#term-hashable).

Binary operations that mix [`set`](https://docs.python.org/3/library/stdtypes.html#set) instances with [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset) return the type of the first operand. For example: `frozenset('ab') | set('bc')` returns an instance of [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset).

The following table lists operations available for [`set`](https://docs.python.org/3/library/stdtypes.html#set) that do not apply to immutable instances of [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset):`update`\(_\*others_\)`set |= other | ...`

Update the set, adding elements from all others.`intersection_update`\(_\*others_\)`set &= other & ...`

Update the set, keeping only elements found in it and all others.`difference_update`\(_\*others_\)`set -= other | ...`

Update the set, removing elements found in others.`symmetric_difference_update`\(_other_\)`set ^= other`

Update the set, keeping only elements found in either set, but not in both.`add`\(_elem_\)

Add element _elem_ to the set.`remove`\(_elem_\)

Remove element _elem_ from the set. Raises [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) if _elem_ is not contained in the set.`discard`\(_elem_\)

Remove element _elem_ from the set if it is present.`pop`\(\)

Remove and return an arbitrary element from the set. Raises [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) if the set is empty.`clear`\(\)

Remove all elements from the set.

Note, the non-operator versions of the [`update()`](https://docs.python.org/3/library/stdtypes.html#frozenset.update), [`intersection_update()`](https://docs.python.org/3/library/stdtypes.html#frozenset.intersection_update), [`difference_update()`](https://docs.python.org/3/library/stdtypes.html#frozenset.difference_update), and [`symmetric_difference_update()`](https://docs.python.org/3/library/stdtypes.html#frozenset.symmetric_difference_update) methods will accept any iterable as an argument.

Note, the _elem_ argument to the [`__contains__()`](https://docs.python.org/3/reference/datamodel.html#object.__contains__), [`remove()`](https://docs.python.org/3/library/stdtypes.html#frozenset.remove), and [`discard()`](https://docs.python.org/3/library/stdtypes.html#frozenset.discard) methods may be a set. To support searching for an equivalent frozenset, a temporary one is created from _elem_.

### Mapping Types — [`dict`](https://docs.python.org/3/library/stdtypes.html#dict)

A [mapping](https://docs.python.org/3/glossary.html#term-mapping) object maps [hashable](https://docs.python.org/3/glossary.html#term-hashable) values to arbitrary objects. Mappings are mutable objects. There is currently only one standard mapping type, the _dictionary_. \(For other containers see the built-in [`list`](https://docs.python.org/3/library/stdtypes.html#list), [`set`](https://docs.python.org/3/library/stdtypes.html#set), and [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple) classes, and the [`collections`](https://docs.python.org/3/library/collections.html#module-collections) module.\)

A dictionary’s keys are _almost_ arbitrary values. Values that are not [hashable](https://docs.python.org/3/glossary.html#term-hashable), that is, values containing lists, dictionaries or other mutable types \(that are compared by value rather than by object identity\) may not be used as keys. Numeric types used for keys obey the normal rules for numeric comparison: if two numbers compare equal \(such as `1` and `1.0`\) then they can be used interchangeably to index the same dictionary entry. \(Note however, that since computers store floating-point numbers as approximations it is usually unwise to use them as dictionary keys.\)

Dictionaries can be created by placing a comma-separated list of `key: value` pairs within braces, for example: `{'jack': 4098, 'sjoerd': 4127}` or `{4098: 'jack', 4127: 'sjoerd'}`, or by the [`dict`](https://docs.python.org/3/library/stdtypes.html#dict) constructor._class_ `dict`\(_\*\*kwarg_\)_class_ `dict`\(_mapping_, _\*\*kwarg_\)_class_ `dict`\(_iterable_, _\*\*kwarg_\)

Return a new dictionary initialized from an optional positional argument and a possibly empty set of keyword arguments.

Dictionaries can be created by several means:

* Use a comma-separated list of `key: value` pairs within braces: `{'jack': 4098, 'sjoerd': 4127}` or `{4098: 'jack', 4127: 'sjoerd'}`
* Use a dict comprehension: `{}`, `{x: x ** 2 for x in range(10)}`
* Use the type constructor: `dict()`, `dict([('foo', 100), ('bar', 200)])`, `dict(foo=100, bar=200)`

If no positional argument is given, an empty dictionary is created. If a positional argument is given and it is a mapping object, a dictionary is created with the same key-value pairs as the mapping object. Otherwise, the positional argument must be an [iterable](https://docs.python.org/3/glossary.html#term-iterable) object. Each item in the iterable must itself be an iterable with exactly two objects. The first object of each item becomes a key in the new dictionary, and the second object the corresponding value. If a key occurs more than once, the last value for that key becomes the corresponding value in the new dictionary.

If keyword arguments are given, the keyword arguments and their values are added to the dictionary created from the positional argument. If a key being added is already present, the value from the keyword argument replaces the value from the positional argument.

To illustrate, the following examples all return a dictionary equal to `{"one": 1, "two": 2, "three": 3}`:&gt;&gt;&gt;

```text
>>> a = dict(one=1, two=2, three=3)
>>> b = {'one': 1, 'two': 2, 'three': 3}
>>> c = dict(zip(['one', 'two', 'three'], [1, 2, 3]))
>>> d = dict([('two', 2), ('one', 1), ('three', 3)])
>>> e = dict({'three': 3, 'one': 1, 'two': 2})
>>> f = dict({'one': 1, 'three': 3}, two=2)
>>> a == b == c == d == e == f
True
```

Providing keyword arguments as in the first example only works for keys that are valid Python identifiers. Otherwise, any valid keys can be used.

These are the operations that dictionaries support \(and therefore, custom mapping types should support too\):`list(d)`

Return a list of all the keys used in the dictionary _d_.`len(d)`

Return the number of items in the dictionary _d_.`d[key]`

Return the item of _d_ with key _key_. Raises a [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) if _key_ is not in the map.

If a subclass of dict defines a method [`__missing__()`](https://docs.python.org/3/reference/datamodel.html#object.__missing__) and _key_ is not present, the `d[key]` operation calls that method with the key _key_ as argument. The `d[key]` operation then returns or raises whatever is returned or raised by the `__missing__(key)` call. No other operations or methods invoke [`__missing__()`](https://docs.python.org/3/reference/datamodel.html#object.__missing__). If [`__missing__()`](https://docs.python.org/3/reference/datamodel.html#object.__missing__) is not defined, [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) is raised. [`__missing__()`](https://docs.python.org/3/reference/datamodel.html#object.__missing__) must be a method; it cannot be an instance variable:&gt;&gt;&gt;

```text
>>> class Counter(dict):
...     def __missing__(self, key):
...         return 0
>>> c = Counter()
>>> c['red']
0
>>> c['red'] += 1
>>> c['red']
1
```

The example above shows part of the implementation of [`collections.Counter`](https://docs.python.org/3/library/collections.html#collections.Counter). A different `__missing__` method is used by [`collections.defaultdict`](https://docs.python.org/3/library/collections.html#collections.defaultdict).`d[key] = value`

Set `d[key]` to _value_.`del d[key]`

Remove `d[key]` from _d_. Raises a [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) if _key_ is not in the map.`key in d`

Return `True` if _d_ has a key _key_, else `False`.`key not in d`

Equivalent to `not key in d`.`iter(d)`

Return an iterator over the keys of the dictionary. This is a shortcut for `iter(d.keys())`.`clear`\(\)

Remove all items from the dictionary.`copy`\(\)

Return a shallow copy of the dictionary._classmethod_ `fromkeys`\(_iterable_\[, _value_\]\)

Create a new dictionary with keys from _iterable_ and values set to _value_.

[`fromkeys()`](https://docs.python.org/3/library/stdtypes.html#dict.fromkeys) is a class method that returns a new dictionary. _value_ defaults to `None`. All of the values refer to just a single instance, so it generally doesn’t make sense for _value_ to be a mutable object such as an empty list. To get distinct values, use a [dict comprehension](https://docs.python.org/3/reference/expressions.html#dict) instead.`get`\(_key_\[, _default_\]\)

Return the value for _key_ if _key_ is in the dictionary, else _default_. If _default_ is not given, it defaults to `None`, so that this method never raises a [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError).`items`\(\)

Return a new view of the dictionary’s items \(`(key, value)` pairs\). See the [documentation of view objects](https://docs.python.org/3/library/stdtypes.html#dict-views).`keys`\(\)

Return a new view of the dictionary’s keys. See the [documentation of view objects](https://docs.python.org/3/library/stdtypes.html#dict-views).`pop`\(_key_\[, _default_\]\)

If _key_ is in the dictionary, remove it and return its value, else return _default_. If _default_ is not given and _key_ is not in the dictionary, a [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) is raised.`popitem`\(\)

Remove and return a `(key, value)` pair from the dictionary. Pairs are returned in LIFO order.

[`popitem()`](https://docs.python.org/3/library/stdtypes.html#dict.popitem) is useful to destructively iterate over a dictionary, as often used in set algorithms. If the dictionary is empty, calling [`popitem()`](https://docs.python.org/3/library/stdtypes.html#dict.popitem) raises a [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError).

Changed in version 3.7: LIFO order is now guaranteed. In prior versions, [`popitem()`](https://docs.python.org/3/library/stdtypes.html#dict.popitem) would return an arbitrary key/value pair.`reversed(d)`

Return a reverse iterator over the keys of the dictionary. This is a shortcut for `reversed(d.keys())`.

New in version 3.8.`setdefault`\(_key_\[, _default_\]\)

If _key_ is in the dictionary, return its value. If not, insert _key_ with a value of _default_ and return _default_. _default_ defaults to `None`.`update`\(\[_other_\]\)

Update the dictionary with the key/value pairs from _other_, overwriting existing keys. Return `None`.

[`update()`](https://docs.python.org/3/library/stdtypes.html#dict.update) accepts either another dictionary object or an iterable of key/value pairs \(as tuples or other iterables of length two\). If keyword arguments are specified, the dictionary is then updated with those key/value pairs: `d.update(red=1, blue=2)`.`values`\(\)

Return a new view of the dictionary’s values. See the [documentation of view objects](https://docs.python.org/3/library/stdtypes.html#dict-views).

An equality comparison between one `dict.values()` view and another will always return `False`. This also applies when comparing `dict.values()` to itself:&gt;&gt;&gt;

```text
>>> d = {'a': 1}
>>> d.values() == d.values()
False
```

`d | other`

Create a new dictionary with the merged keys and values of _d_ and _other_, which must both be dictionaries. The values of _other_ take priority when _d_ and _other_ share keys.

New in version 3.9.`d |= other`

Update the dictionary _d_ with keys and values from _other_, which may be either a [mapping](https://docs.python.org/3/glossary.html#term-mapping) or an [iterable](https://docs.python.org/3/glossary.html#term-iterable) of key/value pairs. The values of _other_ take priority when _d_ and _other_ share keys.

New in version 3.9.

Dictionaries compare equal if and only if they have the same `(key, value)` pairs \(regardless of ordering\). Order comparisons \(‘&lt;’, ‘&lt;=’, ‘&gt;=’, ‘&gt;’\) raise [`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError).

Dictionaries preserve insertion order. Note that updating a key does not affect the order. Keys added after deletion are inserted at the end.&gt;&gt;&gt;

```text
>>> d = {"one": 1, "two": 2, "three": 3, "four": 4}
>>> d
{'one': 1, 'two': 2, 'three': 3, 'four': 4}
>>> list(d)
['one', 'two', 'three', 'four']
>>> list(d.values())
[1, 2, 3, 4]
>>> d["one"] = 42
>>> d
{'one': 42, 'two': 2, 'three': 3, 'four': 4}
>>> del d["two"]
>>> d["two"] = None
>>> d
{'one': 42, 'three': 3, 'four': 4, 'two': None}
```

Changed in version 3.7: Dictionary order is guaranteed to be insertion order. This behavior was an implementation detail of CPython from 3.6.

Dictionaries and dictionary views are reversible.&gt;&gt;&gt;

```text
>>> d = {"one": 1, "two": 2, "three": 3, "four": 4}
>>> d
{'one': 1, 'two': 2, 'three': 3, 'four': 4}
>>> list(reversed(d))
['four', 'three', 'two', 'one']
>>> list(reversed(d.values()))
[4, 3, 2, 1]
>>> list(reversed(d.items()))
[('four', 4), ('three', 3), ('two', 2), ('one', 1)]
```

Changed in version 3.8: Dictionaries are now reversible.

See also 

[`types.MappingProxyType`](https://docs.python.org/3/library/types.html#types.MappingProxyType) can be used to create a read-only view of a [`dict`](https://docs.python.org/3/library/stdtypes.html#dict).

#### Dictionary view objects

The objects returned by [`dict.keys()`](https://docs.python.org/3/library/stdtypes.html#dict.keys), [`dict.values()`](https://docs.python.org/3/library/stdtypes.html#dict.values) and [`dict.items()`](https://docs.python.org/3/library/stdtypes.html#dict.items) are _view objects_. They provide a dynamic view on the dictionary’s entries, which means that when the dictionary changes, the view reflects these changes.

Dictionary views can be iterated over to yield their respective data, and support membership tests:`len(dictview)`

Return the number of entries in the dictionary.`iter(dictview)`

Return an iterator over the keys, values or items \(represented as tuples of `(key, value)`\) in the dictionary.

Keys and values are iterated over in insertion order. This allows the creation of `(value, key)` pairs using [`zip()`](https://docs.python.org/3/library/functions.html#zip): `pairs = zip(d.values(), d.keys())`. Another way to create the same list is `pairs = [(v, k) for (k, v) in d.items()]`.

Iterating views while adding or deleting entries in the dictionary may raise a [`RuntimeError`](https://docs.python.org/3/library/exceptions.html#RuntimeError) or fail to iterate over all entries.

Changed in version 3.7: Dictionary order is guaranteed to be insertion order.`x in dictview`

Return `True` if _x_ is in the underlying dictionary’s keys, values or items \(in the latter case, _x_ should be a `(key, value)` tuple\).`reversed(dictview)`

Return a reverse iterator over the keys, values or items of the dictionary. The view will be iterated in reverse order of the insertion.

Changed in version 3.8: Dictionary views are now reversible.

Keys views are set-like since their entries are unique and hashable. If all values are hashable, so that `(key, value)` pairs are unique and hashable, then the items view is also set-like. \(Values views are not treated as set-like since the entries are generally not unique.\) For set-like views, all of the operations defined for the abstract base class [`collections.abc.Set`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Set) are available \(for example, `==`, `<`, or `^`\).

An example of dictionary view usage:&gt;&gt;&gt;

```text
>>> dishes = {'eggs': 2, 'sausage': 1, 'bacon': 1, 'spam': 500}
>>> keys = dishes.keys()
>>> values = dishes.values()

>>> # iteration
>>> n = 0
>>> for val in values:
...     n += val
>>> print(n)
504

>>> # keys and values are iterated over in the same order (insertion order)
>>> list(keys)
['eggs', 'sausage', 'bacon', 'spam']
>>> list(values)
[2, 1, 1, 500]

>>> # view objects are dynamic and reflect dict changes
>>> del dishes['eggs']
>>> del dishes['sausage']
>>> list(keys)
['bacon', 'spam']

>>> # set operations
>>> keys & {'eggs', 'bacon', 'salad'}
{'bacon'}
>>> keys ^ {'sausage', 'juice'}
{'juice', 'sausage', 'bacon', 'spam'}
```

### Context Manager Types

Python’s [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement supports the concept of a runtime context defined by a context manager. This is implemented using a pair of methods that allow user-defined classes to define a runtime context that is entered before the statement body is executed and exited when the statement ends:`contextmanager.__enter__`\(\)

Enter the runtime context and return either this object or another object related to the runtime context. The value returned by this method is bound to the identifier in the `as` clause of [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statements using this context manager.

An example of a context manager that returns itself is a [file object](https://docs.python.org/3/glossary.html#term-file-object). File objects return themselves from \_\_enter\_\_\(\) to allow [`open()`](https://docs.python.org/3/library/functions.html#open) to be used as the context expression in a [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement.

An example of a context manager that returns a related object is the one returned by [`decimal.localcontext()`](https://docs.python.org/3/library/decimal.html#decimal.localcontext). These managers set the active decimal context to a copy of the original decimal context and then return the copy. This allows changes to be made to the current decimal context in the body of the [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement without affecting code outside the `with` statement.`contextmanager.__exit__`\(_exc\_type_, _exc\_val_, _exc\_tb_\)

Exit the runtime context and return a Boolean flag indicating if any exception that occurred should be suppressed. If an exception occurred while executing the body of the [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement, the arguments contain the exception type, value and traceback information. Otherwise, all three arguments are `None`.

Returning a true value from this method will cause the [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement to suppress the exception and continue execution with the statement immediately following the `with` statement. Otherwise the exception continues propagating after this method has finished executing. Exceptions that occur during execution of this method will replace any exception that occurred in the body of the `with` statement.

The exception passed in should never be reraised explicitly - instead, this method should return a false value to indicate that the method completed successfully and does not want to suppress the raised exception. This allows context management code to easily detect whether or not an [`__exit__()`](https://docs.python.org/3/library/stdtypes.html#contextmanager.__exit__) method has actually failed.

Python defines several context managers to support easy thread synchronisation, prompt closure of files or other objects, and simpler manipulation of the active decimal arithmetic context. The specific types are not treated specially beyond their implementation of the context management protocol. See the [`contextlib`](https://docs.python.org/3/library/contextlib.html#module-contextlib) module for some examples.

Python’s [generator](https://docs.python.org/3/glossary.html#term-generator)s and the [`contextlib.contextmanager`](https://docs.python.org/3/library/contextlib.html#contextlib.contextmanager) decorator provide a convenient way to implement these protocols. If a generator function is decorated with the [`contextlib.contextmanager`](https://docs.python.org/3/library/contextlib.html#contextlib.contextmanager) decorator, it will return a context manager implementing the necessary [`__enter__()`](https://docs.python.org/3/reference/datamodel.html#object.__enter__) and [`__exit__()`](https://docs.python.org/3/reference/datamodel.html#object.__exit__) methods, rather than the iterator produced by an undecorated generator function.

Note that there is no specific slot for any of these methods in the type structure for Python objects in the Python/C API. Extension types wanting to define these methods must provide them as a normal Python accessible method. Compared to the overhead of setting up the runtime context, the overhead of a single class dictionary lookup is negligible.

### Generic Alias Type

`GenericAlias` objects are created by subscripting a class \(usually a container\), such as `list[int]`. They are intended primarily for [type annotations](https://docs.python.org/3/glossary.html#term-annotation).

Usually, the [subscription](https://docs.python.org/3/reference/expressions.html#subscriptions) of container objects calls the method [`__getitem__()`](https://docs.python.org/3/reference/datamodel.html#object.__getitem__) of the object. However, the subscription of some containers’ classes may call the classmethod [`__class_getitem__()`](https://docs.python.org/3/reference/datamodel.html#object.__class_getitem__) of the class instead. The classmethod [`__class_getitem__()`](https://docs.python.org/3/reference/datamodel.html#object.__class_getitem__) should return a `GenericAlias` object.

Note 

If the [`__getitem__()`](https://docs.python.org/3/reference/datamodel.html#object.__getitem__) of the class’ metaclass is present, it will take precedence over the [`__class_getitem__()`](https://docs.python.org/3/reference/datamodel.html#object.__class_getitem__) defined in the class \(see [**PEP 560**](https://www.python.org/dev/peps/pep-0560) for more details\).

The `GenericAlias` object acts as a proxy for [generic types](https://docs.python.org/3/glossary.html#term-generic-type), implementing _parameterized generics_ - a specific instance of a generic which provides the types for container elements.

The user-exposed type for the `GenericAlias` object can be accessed from [`types.GenericAlias`](https://docs.python.org/3/library/types.html#types.GenericAlias) and used for [`isinstance()`](https://docs.python.org/3/library/functions.html#isinstance) checks. It can also be used to create `GenericAlias` objects directly.`T[X, Y, ...]`

Creates a `GenericAlias` representing a type `T` containing elements of types _X_, _Y_, and more depending on the `T` used. For example, a function expecting a [`list`](https://docs.python.org/3/library/stdtypes.html#list) containing [`float`](https://docs.python.org/3/library/functions.html#float) elements:

```text
def average(values: list[float]) -> float:
    return sum(values) / len(values)
```

Another example for [mapping](https://docs.python.org/3/glossary.html#term-mapping) objects, using a [`dict`](https://docs.python.org/3/library/stdtypes.html#dict), which is a generic type expecting two type parameters representing the key type and the value type. In this example, the function expects a `dict` with keys of type [`str`](https://docs.python.org/3/library/stdtypes.html#str) and values of type [`int`](https://docs.python.org/3/library/functions.html#int):

```text
def send_post_request(url: str, body: dict[str, int]) -> None:
    ...
```

The builtin functions [`isinstance()`](https://docs.python.org/3/library/functions.html#isinstance) and [`issubclass()`](https://docs.python.org/3/library/functions.html#issubclass) do not accept `GenericAlias` types for their second argument:&gt;&gt;&gt;

```text
>>> isinstance([1, 2], list[str])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: isinstance() argument 2 cannot be a parameterized generic
```

The Python runtime does not enforce [type annotations](https://docs.python.org/3/glossary.html#term-annotation). This extends to generic types and their type parameters. When creating an object from a `GenericAlias`, container elements are not checked against their type. For example, the following code is discouraged, but will run without errors:&gt;&gt;&gt;

```text
>>> t = list[str]
>>> t([1, 2, 3])
[1, 2, 3]
```

Furthermore, parameterized generics erase type parameters during object creation:&gt;&gt;&gt;

```text
>>> t = list[str]
>>> type(t)
<class 'types.GenericAlias'>

>>> l = t()
>>> type(l)
<class 'list'>
```

Calling [`repr()`](https://docs.python.org/3/library/functions.html#repr) or [`str()`](https://docs.python.org/3/library/stdtypes.html#str) on a generic shows the parameterized type:&gt;&gt;&gt;

```text
>>> repr(list[int])
'list[int]'

>>> str(list[int])
'list[int]'
```

The [`__getitem__()`](https://docs.python.org/3/reference/datamodel.html#object.__getitem__) method of generics will raise an exception to disallow mistakes like `dict[str][str]`:&gt;&gt;&gt;

```text
>>> dict[str][str]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: There are no type variables left in dict[str]
```

However, such expressions are valid when [type variables](https://docs.python.org/3/library/typing.html#generics) are used. The index must have as many elements as there are type variable items in the `GenericAlias` object’s [`__args__`](https://docs.python.org/3/library/stdtypes.html#genericalias.__args__).&gt;&gt;&gt;

```text
>>> from typing import TypeVar
>>> Y = TypeVar('Y')
>>> dict[str, Y][int]
dict[str, int]
```

#### Standard Generic Collections

These standard library collections support parameterized generics.

* [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple)
* [`list`](https://docs.python.org/3/library/stdtypes.html#list)
* [`dict`](https://docs.python.org/3/library/stdtypes.html#dict)
* [`set`](https://docs.python.org/3/library/stdtypes.html#set)
* [`frozenset`](https://docs.python.org/3/library/stdtypes.html#frozenset)
* [`type`](https://docs.python.org/3/library/functions.html#type)
* [`collections.deque`](https://docs.python.org/3/library/collections.html#collections.deque)
* [`collections.defaultdict`](https://docs.python.org/3/library/collections.html#collections.defaultdict)
* [`collections.OrderedDict`](https://docs.python.org/3/library/collections.html#collections.OrderedDict)
* [`collections.Counter`](https://docs.python.org/3/library/collections.html#collections.Counter)
* [`collections.ChainMap`](https://docs.python.org/3/library/collections.html#collections.ChainMap)
* [`collections.abc.Awaitable`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable)
* [`collections.abc.Coroutine`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Coroutine)
* [`collections.abc.AsyncIterable`](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterable)
* [`collections.abc.AsyncIterator`](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator)
* [`collections.abc.AsyncGenerator`](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncGenerator)
* [`collections.abc.Iterable`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Iterable)
* [`collections.abc.Iterator`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Iterator)
* [`collections.abc.Generator`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Generator)
* [`collections.abc.Reversible`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Reversible)
* [`collections.abc.Container`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Container)
* [`collections.abc.Collection`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Collection)
* [`collections.abc.Callable`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable)
* [`collections.abc.Set`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Set)
* [`collections.abc.MutableSet`](https://docs.python.org/3/library/collections.abc.html#collections.abc.MutableSet)
* [`collections.abc.Mapping`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping)
* [`collections.abc.MutableMapping`](https://docs.python.org/3/library/collections.abc.html#collections.abc.MutableMapping)
* [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence)
* [`collections.abc.MutableSequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.MutableSequence)
* [`collections.abc.ByteString`](https://docs.python.org/3/library/collections.abc.html#collections.abc.ByteString)
* [`collections.abc.MappingView`](https://docs.python.org/3/library/collections.abc.html#collections.abc.MappingView)
* [`collections.abc.KeysView`](https://docs.python.org/3/library/collections.abc.html#collections.abc.KeysView)
* [`collections.abc.ItemsView`](https://docs.python.org/3/library/collections.abc.html#collections.abc.ItemsView)
* [`collections.abc.ValuesView`](https://docs.python.org/3/library/collections.abc.html#collections.abc.ValuesView)
* [`contextlib.AbstractContextManager`](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractContextManager)
* [`contextlib.AbstractAsyncContextManager`](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager)
* [re.Pattern](https://docs.python.org/3/library/re.html#re-objects)
* [re.Match](https://docs.python.org/3/library/re.html#match-objects)

#### Special Attributes of Generic Alias

All parameterized generics implement special read-only attributes.`genericalias.__origin__`

This attribute points at the non-parameterized generic class:&gt;&gt;&gt;

```text
>>> list[int].__origin__
<class 'list'>
```

`genericalias.__args__`

This attribute is a [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple) \(possibly of length 1\) of generic types passed to the original [`__class_getitem__()`](https://docs.python.org/3/reference/datamodel.html#object.__class_getitem__) of the generic container:&gt;&gt;&gt;

```text
>>> dict[str, list[int]].__args__
(<class 'str'>, list[int])
```

`genericalias.__parameters__`

This attribute is a lazily computed tuple \(possibly empty\) of unique type variables found in `__args__`:&gt;&gt;&gt;

```text
>>> from typing import TypeVar

>>> T = TypeVar('T')
>>> list[T].__parameters__
(~T,)
```

See also

* [**PEP 585**](https://www.python.org/dev/peps/pep-0585) – “Type Hinting Generics In Standard Collections”
* [`__class_getitem__()`](https://docs.python.org/3/reference/datamodel.html#object.__class_getitem__) – Used to implement parameterized generics.
* [Generics](https://docs.python.org/3/library/typing.html#generics) – Generics in the [`typing`](https://docs.python.org/3/library/typing.html#module-typing) module.

New in version 3.9.

### Other Built-in Types

The interpreter supports several other kinds of objects. Most of these support only one or two operations.

#### Modules

The only special operation on a module is attribute access: `m.name`, where _m_ is a module and _name_ accesses a name defined in _m_’s symbol table. Module attributes can be assigned to. \(Note that the [`import`](https://docs.python.org/3/reference/simple_stmts.html#import) statement is not, strictly speaking, an operation on a module object; `import foo` does not require a module object named _foo_ to exist, rather it requires an \(external\) _definition_ for a module named _foo_ somewhere.\)

A special attribute of every module is [`__dict__`](https://docs.python.org/3/library/stdtypes.html#object.__dict__). This is the dictionary containing the module’s symbol table. Modifying this dictionary will actually change the module’s symbol table, but direct assignment to the [`__dict__`](https://docs.python.org/3/library/stdtypes.html#object.__dict__) attribute is not possible \(you can write `m.__dict__['a'] = 1`, which defines `m.a` to be `1`, but you can’t write `m.__dict__ = {}`\). Modifying [`__dict__`](https://docs.python.org/3/library/stdtypes.html#object.__dict__) directly is not recommended.

Modules built into the interpreter are written like this: `<module 'sys' (built-in)>`. If loaded from a file, they are written as `<module 'os' from '/usr/local/lib/pythonX.Y/os.pyc'>`.

#### Classes and Class Instances

See [Objects, values and types](https://docs.python.org/3/reference/datamodel.html#objects) and [Class definitions](https://docs.python.org/3/reference/compound_stmts.html#class) for these.

#### Functions

Function objects are created by function definitions. The only operation on a function object is to call it: `func(argument-list)`.

There are really two flavors of function objects: built-in functions and user-defined functions. Both support the same operation \(to call the function\), but the implementation is different, hence the different object types.

See [Function definitions](https://docs.python.org/3/reference/compound_stmts.html#function) for more information.

#### Methods

Methods are functions that are called using the attribute notation. There are two flavors: built-in methods \(such as `append()` on lists\) and class instance methods. Built-in methods are described with the types that support them.

If you access a method \(a function defined in a class namespace\) through an instance, you get a special object: a _bound method_ \(also called _instance method_\) object. When called, it will add the `self` argument to the argument list. Bound methods have two special read-only attributes: `m.__self__` is the object on which the method operates, and `m.__func__` is the function implementing the method. Calling `m(arg-1, arg-2, ..., arg-n)` is completely equivalent to calling `m.__func__(m.__self__, arg-1, arg-2, ..., arg-n)`.

Like function objects, bound method objects support getting arbitrary attributes. However, since method attributes are actually stored on the underlying function object \(`meth.__func__`\), setting method attributes on bound methods is disallowed. Attempting to set an attribute on a method results in an [`AttributeError`](https://docs.python.org/3/library/exceptions.html#AttributeError) being raised. In order to set a method attribute, you need to explicitly set it on the underlying function object:&gt;&gt;&gt;

```text
>>> class C:
...     def method(self):
...         pass
...
>>> c = C()
>>> c.method.whoami = 'my name is method'  # can't set on the method
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'method' object has no attribute 'whoami'
>>> c.method.__func__.whoami = 'my name is method'
>>> c.method.whoami
'my name is method'
```

See [The standard type hierarchy](https://docs.python.org/3/reference/datamodel.html#types) for more information.

#### Code Objects

Code objects are used by the implementation to represent “pseudo-compiled” executable Python code such as a function body. They differ from function objects because they don’t contain a reference to their global execution environment. Code objects are returned by the built-in [`compile()`](https://docs.python.org/3/library/functions.html#compile) function and can be extracted from function objects through their `__code__` attribute. See also the [`code`](https://docs.python.org/3/library/code.html#module-code) module.

Accessing `__code__` raises an [auditing event](https://docs.python.org/3/library/sys.html#auditing) `object.__getattr__` with arguments `obj` and `"__code__"`.

A code object can be executed or evaluated by passing it \(instead of a source string\) to the [`exec()`](https://docs.python.org/3/library/functions.html#exec) or [`eval()`](https://docs.python.org/3/library/functions.html#eval) built-in functions.

See [The standard type hierarchy](https://docs.python.org/3/reference/datamodel.html#types) for more information.

#### Type Objects

Type objects represent the various object types. An object’s type is accessed by the built-in function [`type()`](https://docs.python.org/3/library/functions.html#type). There are no special operations on types. The standard module [`types`](https://docs.python.org/3/library/types.html#module-types) defines names for all standard built-in types.

Types are written like this: `<class 'int'>`.

#### The Null Object

This object is returned by functions that don’t explicitly return a value. It supports no special operations. There is exactly one null object, named `None` \(a built-in name\). `type(None)()` produces the same singleton.

It is written as `None`.

#### The Ellipsis Object

This object is commonly used by slicing \(see [Slicings](https://docs.python.org/3/reference/expressions.html#slicings)\). It supports no special operations. There is exactly one ellipsis object, named [`Ellipsis`](https://docs.python.org/3/library/constants.html#Ellipsis) \(a built-in name\). `type(Ellipsis)()` produces the [`Ellipsis`](https://docs.python.org/3/library/constants.html#Ellipsis) singleton.

It is written as `Ellipsis` or `...`.

#### The NotImplemented Object

This object is returned from comparisons and binary operations when they are asked to operate on types they don’t support. See [Comparisons](https://docs.python.org/3/reference/expressions.html#comparisons) for more information. There is exactly one `NotImplemented` object. `type(NotImplemented)()` produces the singleton instance.

It is written as `NotImplemented`.

#### Boolean Values

Boolean values are the two constant objects `False` and `True`. They are used to represent truth values \(although other values can also be considered false or true\). In numeric contexts \(for example when used as the argument to an arithmetic operator\), they behave like the integers 0 and 1, respectively. The built-in function [`bool()`](https://docs.python.org/3/library/functions.html#bool) can be used to convert any value to a Boolean, if the value can be interpreted as a truth value \(see section [Truth Value Testing](https://docs.python.org/3/library/stdtypes.html#truth) above\).

They are written as `False` and `True`, respectively.

#### Internal Objects

See [The standard type hierarchy](https://docs.python.org/3/reference/datamodel.html#types) for this information. It describes stack frame objects, traceback objects, and slice objects.

### Special Attributes

The implementation adds a few special read-only attributes to several object types, where they are relevant. Some of these are not reported by the [`dir()`](https://docs.python.org/3/library/functions.html#dir) built-in function.`object.__dict__`

A dictionary or other mapping object used to store an object’s \(writable\) attributes.`instance.__class__`

The class to which a class instance belongs.`class.__bases__`

The tuple of base classes of a class object.`definition.__name__`

The name of the class, function, method, descriptor, or generator instance.`definition.__qualname__`

The [qualified name](https://docs.python.org/3/glossary.html#term-qualified-name) of the class, function, method, descriptor, or generator instance.

New in version 3.3.`class.__mro__`

This attribute is a tuple of classes that are considered when looking for base classes during method resolution.`class.mro`\(\)

This method can be overridden by a metaclass to customize the method resolution order for its instances. It is called at class instantiation, and its result is stored in [`__mro__`](https://docs.python.org/3/library/stdtypes.html#class.__mro__).`class.__subclasses__`\(\)

Each class keeps a list of weak references to its immediate subclasses. This method returns a list of all those references still alive. The list is in definition order. Example:&gt;&gt;&gt;

```text
>>> int.__subclasses__()
[<class 'bool'>]
```

