---
description: Introduction to Python
---

# Intro 2 Python

![](../.gitbook/assets/image%20%2815%29.png)

![](../.gitbook/assets/image%20%2818%29.png)

## Intro 2 Python

In the following examples, input and output are distinguished by the presence or absence of prompts \([&gt;&gt;&gt;](https://docs.python.org/3.9/glossary.html#term-0) and […](https://docs.python.org/3.9/glossary.html#term-1)\): to repeat the example, you must type everything after the prompt, when the prompt appears; lines that do not begin with a prompt are output from the interpreter. Note that a secondary prompt on a line by itself in an example means you must type a blank line; this is used to end a multi-line command.

Many of the examples in this manual, even those entered at the interactive prompt, include comments. Comments in Python start with the hash character, `#`, and extend to the end of the physical line. A comment may appear at the start of a line or following whitespace or code, but not within a string literal. A hash character within a string literal is just a hash character. Since comments are to clarify code and are not interpreted by Python, they may be omitted when typing in examples.

Some examples:

```python
# this is the first comment
spam = 1  # and this is the second comment
          # ... and now a third!
text = "# This is not a comment because it's inside quotes."
```

#### 3.1. Using Python as a Calculator

Let’s try some simple Python commands. Start the interpreter and wait for the primary prompt, `>>>`. \(It shouldn’t take long.\)

**3.1.1. Numbers**

The interpreter acts as a simple calculator: you can type an expression at it and it will write the value. Expression syntax is straightforward: the operators `+`, `-`, `*` and `/` work just like in most other languages \(for example, Pascal or C\); parentheses \(`()`\) can be used for grouping. For example:&gt;&gt;&gt;

```python
>>> 2 + 2
4
>>> 50 - 5*6
20
>>> (50 - 5*6) / 4
5.0
>>> 8 / 5  # division always returns a floating point number
1.6
```

The integer numbers \(e.g. `2`, `4`, `20`\) have type [`int`](https://docs.python.org/3.9/library/functions.html#int), the ones with a fractional part \(e.g. `5.0`, `1.6`\) have type [`float`](https://docs.python.org/3.9/library/functions.html#float). We will see more about numeric types later in the tutorial.

Division \(`/`\) always returns a float. To do [floor division](https://docs.python.org/3.9/glossary.html#term-floor-division) and get an integer result \(discarding any fractional result\) you can use the `//` operator; to calculate the remainder you can use `%`:&gt;&gt;&gt;

```python
>>> 17 / 3  # classic division returns a float
5.666666666666667
>>>
>>> 17 // 3  # floor division discards the fractional part
5
>>> 17 % 3  # the % operator returns the remainder of the division
2
>>> 5 * 3 + 2  # floored quotient * divisor + remainder
17
```

With Python, it is possible to use the `**` operator to calculate powers [1](https://docs.python.org/3.9/tutorial/introduction.html#id3):&gt;&gt;&gt;

```python
>>> 5 ** 2  # 5 squared
25
>>> 2 ** 7  # 2 to the power of 7
128
```

The equal sign \(`=`\) is used to assign a value to a variable. Afterwards, no result is displayed before the next interactive prompt:&gt;&gt;&gt;

```python
>>> width = 20
>>> height = 5 * 9
>>> width * height
900
```

If a variable is not “defined” \(assigned a value\), trying to use it will give you an error:&gt;&gt;&gt;

```python
>>> n  # try to access an undefined variable
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'n' is not defined
```

There is full support for floating point; operators with mixed type operands convert the integer operand to floating point:&gt;&gt;&gt;

```python
>>> 4 * 3.75 - 1
14.0
```

In interactive mode, the last printed expression is assigned to the variable `_`. This means that when you are using Python as a desk calculator, it is somewhat easier to continue calculations, for example:&gt;&gt;&gt;

```python
>>> tax = 12.5 / 100
>>> price = 100.50
>>> price * tax
12.5625
>>> price + _
113.0625
>>> round(_, 2)
113.06
```

This variable should be treated as read-only by the user. Don’t explicitly assign a value to it — you would create an independent local variable with the same name masking the built-in variable with its magic behavior.

In addition to [`int`](https://docs.python.org/3.9/library/functions.html#int) and [`float`](https://docs.python.org/3.9/library/functions.html#float), Python supports other types of numbers, such as [`Decimal`](https://docs.python.org/3.9/library/decimal.html#decimal.Decimal) and [`Fraction`](https://docs.python.org/3.9/library/fractions.html#fractions.Fraction). Python also has built-in support for [complex numbers](https://docs.python.org/3.9/library/stdtypes.html#typesnumeric), and uses the `j` or `J` suffix to indicate the imaginary part \(e.g. `3+5j`\).

**3.1.2. Strings**

Besides numbers, Python can also manipulate strings, which can be expressed in several ways. They can be enclosed in single quotes \(`'...'`\) or double quotes \(`"..."`\) with the same result [2](https://docs.python.org/3.9/tutorial/introduction.html#id4). `\` can be used to escape quotes:&gt;&gt;&gt;

```python
>>> 'spam eggs'  # single quotes
'spam eggs'
>>> 'doesn\'t'  # use \' to escape the single quote...
"doesn't"
>>> "doesn't"  # ...or use double quotes instead
"doesn't"
>>> '"Yes," they said.'
'"Yes," they said.'
>>> "\"Yes,\" they said."
'"Yes," they said.'
>>> '"Isn\'t," they said.'
'"Isn\'t," they said.'
```

In the interactive interpreter, the output string is enclosed in quotes and special characters are escaped with backslashes. While this might sometimes look different from the input \(the enclosing quotes could change\), the two strings are equivalent. The string is enclosed in double quotes if the string contains a single quote and no double quotes, otherwise it is enclosed in single quotes. The [`print()`](https://docs.python.org/3.9/library/functions.html#print) function produces a more readable output, by omitting the enclosing quotes and by printing escaped and special characters:&gt;&gt;&gt;

```python
>>> '"Isn\'t," they said.'
'"Isn\'t," they said.'
>>> print('"Isn\'t," they said.')
"Isn't," they said.
>>> s = 'First line.\nSecond line.'  # \n means newline
>>> s  # without print(), \n is included in the output
'First line.\nSecond line.'
>>> print(s)  # with print(), \n produces a new line
First line.
Second line.
```

If you don’t want characters prefaced by `\` to be interpreted as special characters, you can use _raw strings_ by adding an `r` before the first quote:&gt;&gt;&gt;

```python
>>> print('C:\some\name')  # here \n means newline!
C:\some
ame
>>> print(r'C:\some\name')  # note the r before the quote
C:\some\name
```

String literals can span multiple lines. One way is using triple-quotes: `"""..."""` or `'''...'''`. End of lines are automatically included in the string, but it’s possible to prevent this by adding a `\` at the end of the line. The following example:

```python
print("""\
Usage: thingy [OPTIONS]
     -h                        Display this usage message
     -H hostname               Hostname to connect to
""")
```

produces the following output \(note that the initial newline is not included\):

```python
Usage: thingy [OPTIONS]
     -h                        Display this usage message
     -H hostname               Hostname to connect to
```

Strings can be concatenated \(glued together\) with the `+` operator, and repeated with `*`:&gt;&gt;&gt;

```python
>>> # 3 times 'un', followed by 'ium'
>>> 3 * 'un' + 'ium'
'unununium'
```

Two or more _string literals_ \(i.e. the ones enclosed between quotes\) next to each other are automatically concatenated.&gt;&gt;&gt;

```python
>>> 'Py' 'thon'
'Python'
```

This feature is particularly useful when you want to break long strings:&gt;&gt;&gt;

```python
>>> text = ('Put several strings within parentheses '
...         'to have them joined together.')
>>> text
'Put several strings within parentheses to have them joined together.'
```

This only works with two literals though, not with variables or expressions:&gt;&gt;&gt;

```python
>>> prefix = 'Py'
>>> prefix 'thon'  # can't concatenate a variable and a string literal
  File "<stdin>", line 1
    prefix 'thon'
                ^
SyntaxError: invalid syntax
>>> ('un' * 3) 'ium'
  File "<stdin>", line 1
    ('un' * 3) 'ium'
                   ^
SyntaxError: invalid syntax
```

If you want to concatenate variables or a variable and a literal, use `+`:&gt;&gt;&gt;

```python
>>> prefix + 'thon'
'Python'
```

Strings can be _indexed_ \(subscripted\), with the first character having index 0. There is no separate character type; a character is simply a string of size one:&gt;&gt;&gt;

```python
>>> word = 'Python'
>>> word[0]  # character in position 0
'P'
>>> word[5]  # character in position 5
'n'
```

Indices may also be negative numbers, to start counting from the right:&gt;&gt;&gt;

```python
>>> word[-1]  # last character
'n'
>>> word[-2]  # second-last character
'o'
>>> word[-6]
'P'
```

Note that since -0 is the same as 0, negative indices start from -1.

In addition to indexing, _slicing_ is also supported. While indexing is used to obtain individual characters, _slicing_ allows you to obtain substring:&gt;&gt;&gt;

```python
>>> word[0:2]  # characters from position 0 (included) to 2 (excluded)
'Py'
>>> word[2:5]  # characters from position 2 (included) to 5 (excluded)
'tho'
```

Slice indices have useful defaults; an omitted first index defaults to zero, an omitted second index defaults to the size of the string being sliced.&gt;&gt;&gt;

```python
>>> word[:2]   # character from the beginning to position 2 (excluded)
'Py'
>>> word[4:]   # characters from position 4 (included) to the end
'on'
>>> word[-2:]  # characters from the second-last (included) to the end
'on'
```

Note how the start is always included, and the end always excluded. This makes sure that `s[:i] + s[i:]` is always equal to `s`:&gt;&gt;&gt;

```python
>>> word[:2] + word[2:]
'Python'
>>> word[:4] + word[4:]
'Python'
```

One way to remember how slices work is to think of the indices as pointing _between_ characters, with the left edge of the first character numbered 0. Then the right edge of the last character of a string of _n_ characters has index _n_, for example:

```python
 +---+---+---+---+---+---+
 | P | y | t | h | o | n |
 +---+---+---+---+---+---+
 0   1   2   3   4   5   6
-6  -5  -4  -3  -2  -1
```

The first row of numbers gives the position of the indices 0…6 in the string; the second row gives the corresponding negative indices. The slice from _i_ to _j_ consists of all characters between the edges labeled _i_ and _j_, respectively.

For non-negative indices, the length of a slice is the difference of the indices, if both are within bounds. For example, the length of `word[1:3]` is 2.

Attempting to use an index that is too large will result in an error:&gt;&gt;&gt;

```python
>>> word[42]  # the word only has 6 characters
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: string index out of range
```

However, out of range slice indexes are handled gracefully when used for slicing:&gt;&gt;&gt;

```python
>>> word[4:42]
'on'
>>> word[42:]
''
```

Python strings cannot be changed — they are [immutable](https://docs.python.org/3.9/glossary.html#term-immutable). Therefore, assigning to an indexed position in the string results in an error:&gt;&gt;&gt;

```python
>>> word[0] = 'J'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'str' object does not support item assignment
>>> word[2:] = 'py'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'str' object does not support item assignment
```

If you need a different string, you should create a new one:&gt;&gt;&gt;

```python
>>> 'J' + word[1:]
'Jython'
>>> word[:2] + 'py'
'Pypy'
```

The built-in function [`len()`](https://docs.python.org/3.9/library/functions.html#len) returns the length of a string:&gt;&gt;&gt;

```python
>>> s = 'supercalifragilisticexpialidocious'
>>> len(s)
34
```

See also[Text Sequence Type — str](https://docs.python.org/3.9/library/stdtypes.html#textseq)

Strings are examples of _sequence types_, and support the common operations supported by such types.[String Methods](https://docs.python.org/3.9/library/stdtypes.html#string-methods)

Strings support a large number of methods for basic transformations and searching.[Formatted string literals](https://docs.python.org/3.9/reference/lexical_analysis.html#f-strings)

String literals that have embedded expressions.[Format String Syntax](https://docs.python.org/3.9/library/string.html#formatstrings)

Information about string formatting with [`str.format()`](https://docs.python.org/3.9/library/stdtypes.html#str.format).[printf-style String Formatting](https://docs.python.org/3.9/library/stdtypes.html#old-string-formatting)

The old formatting operations invoked when strings are the left operand of the `%` operator are described in more detail here.

**3.1.3. Lists**

Python knows a number of _compound_ data types, used to group together other values. The most versatile is the _list_, which can be written as a list of comma-separated values \(items\) between square brackets. Lists might contain items of different types, but usually the items all have the same type.&gt;&gt;&gt;

```python
>>> squares = [1, 4, 9, 16, 25]
>>> squares
[1, 4, 9, 16, 25]
```

Like strings \(and all other built-in [sequence](https://docs.python.org/3.9/glossary.html#term-sequence) types\), lists can be indexed and sliced:&gt;&gt;&gt;

```python
>>> squares[0]  # indexing returns the item
1
>>> squares[-1]
25
>>> squares[-3:]  # slicing returns a new list
[9, 16, 25]
```

All slice operations return a new list containing the requested elements. This means that the following slice returns a [shallow copy](https://docs.python.org/3.9/library/copy.html#shallow-vs-deep-copy) of the list:&gt;&gt;&gt;

```python
>>> squares[:]
[1, 4, 9, 16, 25]
```

Lists also support operations like concatenation:&gt;&gt;&gt;

```python
>>> squares + [36, 49, 64, 81, 100]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

Unlike strings, which are [immutable](https://docs.python.org/3.9/glossary.html#term-immutable), lists are a [mutable](https://docs.python.org/3.9/glossary.html#term-mutable) type, i.e. it is possible to change their content:&gt;&gt;&gt;

```python
>>> cubes = [1, 8, 27, 65, 125]  # something's wrong here
>>> 4 ** 3  # the cube of 4 is 64, not 65!
64
>>> cubes[3] = 64  # replace the wrong value
>>> cubes
[1, 8, 27, 64, 125]
```

You can also add new items at the end of the list, by using the `append()` _method_ \(we will see more about methods later\):&gt;&gt;&gt;

```python
>>> cubes.append(216)  # add the cube of 6
>>> cubes.append(7 ** 3)  # and the cube of 7
>>> cubes
[1, 8, 27, 64, 125, 216, 343]
```

Assignment to slices is also possible, and this can even change the size of the list or clear it entirely:&gt;&gt;&gt;

```python
>>> letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
>>> letters
['a', 'b', 'c', 'd', 'e', 'f', 'g']
>>> # replace some values
>>> letters[2:5] = ['C', 'D', 'E']
>>> letters
['a', 'b', 'C', 'D', 'E', 'f', 'g']
>>> # now remove them
>>> letters[2:5] = []
>>> letters
['a', 'b', 'f', 'g']
>>> # clear the list by replacing all the elements with an empty list
>>> letters[:] = []
>>> letters
[]
```

The built-in function [`len()`](https://docs.python.org/3.9/library/functions.html#len) also applies to lists:&gt;&gt;&gt;

```python
>>> letters = ['a', 'b', 'c', 'd']
>>> len(letters)
4
```

It is possible to nest lists \(create lists containing other lists\), for example:&gt;&gt;&gt;

```python
>>> a = ['a', 'b', 'c']
>>> n = [1, 2, 3]
>>> x = [a, n]
>>> x
[['a', 'b', 'c'], [1, 2, 3]]
>>> x[0]
['a', 'b', 'c']
>>> x[0][1]
'b'
```

#### 3.2. First Steps Towards Programming

Of course, we can use Python for more complicated tasks than adding two and two together. For instance, we can write an initial sub-sequence of the [Fibonacci series](https://en.wikipedia.org/wiki/Fibonacci_number) as follows:&gt;&gt;&gt;

```python
>>> # Fibonacci series:
... # the sum of two elements defines the next
... a, b = 0, 1
>>> while a < 10:
...     print(a)
...     a, b = b, a+b
...
0
1
1
2
3
5
8
```

This example introduces several new features.

* The first line contains a _multiple assignment_: the variables `a` and `b` simultaneously get the new values 0 and 1. On the last line this is used again, demonstrating that the expressions on the right-hand side are all evaluated first before any of the assignments take place. The right-hand side expressions are evaluated from the left to the right.
* The [`while`](https://docs.python.org/3.9/reference/compound_stmts.html#while) loop executes as long as the condition \(here: `a < 10`\) remains true. In Python, like in C, any non-zero integer value is true; zero is false. The condition may also be a string or list value, in fact any sequence; anything with a non-zero length is true, empty sequences are false. The test used in the example is a simple comparison. The standard comparison operators are written the same as in C: `<` \(less than\), `>` \(greater than\), `==` \(equal to\), `<=` \(less than or equal to\), `>=` \(greater than or equal to\) and `!=` \(not equal to\).
* The _body_ of the loop is _indented_: indentation is Python’s way of grouping statements. At the interactive prompt, you have to type a tab or space\(s\) for each indented line. In practice you will prepare more complicated input for Python with a text editor; all decent text editors have an auto-indent facility. When a compound statement is entered interactively, it must be followed by a blank line to indicate completion \(since the parser cannot guess when you have typed the last line\). Note that each line within a basic block must be indented by the same amount.
* The [`print()`](https://docs.python.org/3.9/library/functions.html#print) function writes the value of the argument\(s\) it is given. It differs from just writing the expression you want to write \(as we did earlier in the calculator examples\) in the way it handles multiple arguments, floating point quantities, and strings. Strings are printed without quotes, and a space is inserted between items, so you can format things nicely, like this:&gt;&gt;&gt;

  ```python
  >>> i = 256*256
  >>> print('The value of i is', i)
  The value of i is 65536
  ```

  The keyword argument _end_ can be used to avoid the newline after the output, or end the output with a different string:&gt;&gt;&gt;

  ```python
  >>> a, b = 0, 1
  >>> while a < 1000:
  ...     print(a, end=',')
  ...     a, b = b, a+b
  ...
  0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,
  ```

### Control Flow

Besides the [`while`](https://docs.python.org/3.9/reference/compound_stmts.html#while) statement just introduced, Python uses the usual flow control statements known from other languages, with some twists.

#### 4.1. `if` Statements

Perhaps the most well-known statement type is the [`if`](https://docs.python.org/3.9/reference/compound_stmts.html#if) statement. For example:&gt;&gt;&gt;

```python
>>> x = int(input("Please enter an integer: "))
Please enter an integer: 42
>>> if x < 0:
...     x = 0
...     print('Negative changed to zero')
... elif x == 0:
...     print('Zero')
... elif x == 1:
...     print('Single')
... else:
...     print('More')
...
More
```

There can be zero or more [`elif`](https://docs.python.org/3.9/reference/compound_stmts.html#elif) parts, and the [`else`](https://docs.python.org/3.9/reference/compound_stmts.html#else) part is optional. The keyword ‘`elif`’ is short for ‘else if’, and is useful to avoid excessive indentation. An `if` … `elif` … `elif` … sequence is a substitute for the `switch` or `case` statements found in other languages.

#### 4.2. `for` Statements

The [`for`](https://docs.python.org/3.9/reference/compound_stmts.html#for) statement in Python differs a bit from what you may be used to in C or Pascal. Rather than always iterating over an arithmetic progression of numbers \(like in Pascal\), or giving the user the ability to define both the iteration step and halting condition \(as C\), Python’s `for` statement iterates over the items of any sequence \(a list or a string\), in the order that they appear in the sequence. For example \(no pun intended\):&gt;&gt;&gt;

```python
>>> # Measure some strings:
... words = ['cat', 'window', 'defenestrate']
>>> for w in words:
...     print(w, len(w))
...
cat 3
window 6
defenestrate 12
```

Code that modifies a collection while iterating over that same collection can be tricky to get right. Instead, it is usually more straight-forward to loop over a copy of the collection or to create a new collection:

```python
# Strategy:  Iterate over a copy
for user, status in users.copy().items():
    if status == 'inactive':
        del users[user]

# Strategy:  Create a new collection
active_users = {}
for user, status in users.items():
    if status == 'active':
        active_users[user] = status
```

#### 4.3. The [`range()`](https://docs.python.org/3.9/library/stdtypes.html#range) Function

If you do need to iterate over a sequence of numbers, the built-in function [`range()`](https://docs.python.org/3.9/library/stdtypes.html#range) comes in handy. It generates arithmetic progressions:&gt;&gt;&gt;

```python
>>> for i in range(5):
...     print(i)
...
0
1
2
3
4
```

The given end point is never part of the generated sequence; `range(10)` generates 10 values, the legal indices for items of a sequence of length 10. It is possible to let the range start at another number, or to specify a different increment \(even negative; sometimes this is called the ‘step’\):&gt;&gt;&gt;

```python
>>> list(range(5, 10))
[5, 6, 7, 8, 9]

>>> list(range(0, 10, 3))
[0, 3, 6, 9]

>>> list(range(-10, -100, -30))
[-10, -40, -70]
```

To iterate over the indices of a sequence, you can combine [`range()`](https://docs.python.org/3.9/library/stdtypes.html#range) and [`len()`](https://docs.python.org/3.9/library/functions.html#len) as follows:&gt;&gt;&gt;

```python
>>> a = ['Mary', 'had', 'a', 'little', 'lamb']
>>> for i in range(len(a)):
...     print(i, a[i])
...
0 Mary
1 had
2 a
3 little
4 lamb
```

In most such cases, however, it is convenient to use the [`enumerate()`](https://docs.python.org/3.9/library/functions.html#enumerate) function, see [Looping Techniques](https://docs.python.org/3.9/tutorial/datastructures.html#tut-loopidioms).

A strange thing happens if you just print a range:&gt;&gt;&gt;

```python
>>> range(10)
range(0, 10)
```

In many ways the object returned by [`range()`](https://docs.python.org/3.9/library/stdtypes.html#range) behaves as if it is a list, but in fact it isn’t. It is an object which returns the successive items of the desired sequence when you iterate over it, but it doesn’t really make the list, thus saving space.

We say such an object is [iterable](https://docs.python.org/3.9/glossary.html#term-iterable), that is, suitable as a target for functions and constructs that expect something from which they can obtain successive items until the supply is exhausted. We have seen that the [`for`](https://docs.python.org/3.9/reference/compound_stmts.html#for) statement is such a construct, while an example of a function that takes an iterable is [`sum()`](https://docs.python.org/3.9/library/functions.html#sum):&gt;&gt;&gt;

```python
>>> sum(range(4))  # 0 + 1 + 2 + 3
6
```

Later we will see more functions that return iterables and take iterables as arguments. In chapter [Data Structures](https://docs.python.org/3.9/tutorial/datastructures.html#tut-structures), we will discuss in more detail about [`list()`](https://docs.python.org/3.9/library/stdtypes.html#list).

#### 4.4. `break` and `continue` Statements, and `else` Clauses on Loops

The [`break`](https://docs.python.org/3.9/reference/simple_stmts.html#break) statement, like in C, breaks out of the innermost enclosing [`for`](https://docs.python.org/3.9/reference/compound_stmts.html#for) or [`while`](https://docs.python.org/3.9/reference/compound_stmts.html#while) loop.

Loop statements may have an `else` clause; it is executed when the loop terminates through exhaustion of the iterable \(with [`for`](https://docs.python.org/3.9/reference/compound_stmts.html#for)\) or when the condition becomes false \(with [`while`](https://docs.python.org/3.9/reference/compound_stmts.html#while)\), but not when the loop is terminated by a [`break`](https://docs.python.org/3.9/reference/simple_stmts.html#break) statement. This is exemplified by the following loop, which searches for prime numbers:&gt;&gt;&gt;

```python
>>> for n in range(2, 10):
...     for x in range(2, n):
...         if n % x == 0:
...             print(n, 'equals', x, '*', n//x)
...             break
...     else:
...         # loop fell through without finding a factor
...         print(n, 'is a prime number')
...
2 is a prime number
3 is a prime number
4 equals 2 * 2
5 is a prime number
6 equals 2 * 3
7 is a prime number
8 equals 2 * 4
9 equals 3 * 3
```

\(Yes, this is the correct code. Look closely: the `else` clause belongs to the [`for`](https://docs.python.org/3.9/reference/compound_stmts.html#for) loop, **not** the [`if`](https://docs.python.org/3.9/reference/compound_stmts.html#if) statement.\)

When used with a loop, the `else` clause has more in common with the `else` clause of a [`try`](https://docs.python.org/3.9/reference/compound_stmts.html#try) statement than it does with that of [`if`](https://docs.python.org/3.9/reference/compound_stmts.html#if) statements: a [`try`](https://docs.python.org/3.9/reference/compound_stmts.html#try) statement’s `else` clause runs when no exception occurs, and a loop’s `else` clause runs when no `break` occurs. For more on the `try` statement and exceptions, see [Handling Exceptions](https://docs.python.org/3.9/tutorial/errors.html#tut-handling).

The [`continue`](https://docs.python.org/3.9/reference/simple_stmts.html#continue) statement, also borrowed from C, continues with the next iteration of the loop:&gt;&gt;&gt;

```python
>>> for num in range(2, 10):
...     if num % 2 == 0:
...         print("Found an even number", num)
...         continue
...     print("Found an odd number", num)
...
Found an even number 2
Found an odd number 3
Found an even number 4
Found an odd number 5
Found an even number 6
Found an odd number 7
Found an even number 8
Found an odd number 9
```

#### 4.5. `pass` Statements

The [`pass`](https://docs.python.org/3.9/reference/simple_stmts.html#pass) statement does nothing. It can be used when a statement is required syntactically but the program requires no action. For example:&gt;&gt;&gt;

```python
>>> while True:
...     pass  # Busy-wait for keyboard interrupt (Ctrl+C)
...
```

This is commonly used for creating minimal classes:&gt;&gt;&gt;

```python
>>> class MyEmptyClass:
...     pass
...
```

Another place [`pass`](https://docs.python.org/3.9/reference/simple_stmts.html#pass) can be used is as a place-holder for a function or conditional body when you are working on new code, allowing you to keep thinking at a more abstract level. The `pass` is silently ignored:&gt;&gt;&gt;

```python
>>> def initlog(*args):
...     pass   # Remember to implement this!
...
```

#### 4.6. Defining Functions

We can create a function that writes the Fibonacci series to an arbitrary boundary:&gt;&gt;&gt;

```python
>>> def fib(n):    # write Fibonacci series up to n
...     """Print a Fibonacci series up to n."""
...     a, b = 0, 1
...     while a < n:
...         print(a, end=' ')
...         a, b = b, a+b
...     print()
...
>>> # Now call the function we just defined:
... fib(2000)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597
```

The keyword [`def`](https://docs.python.org/3.9/reference/compound_stmts.html#def) introduces a function _definition_. It must be followed by the function name and the parenthesized list of formal parameters. The statements that form the body of the function start at the next line, and must be indented.

The first statement of the function body can optionally be a string literal; this string literal is the function’s documentation string, or _docstring_. \(More about docstrings can be found in the section [Documentation Strings](https://docs.python.org/3.9/tutorial/controlflow.html#tut-docstrings).\) There are tools which use docstrings to automatically produce online or printed documentation, or to let the user interactively browse through code; it’s good practice to include docstrings in code that you write, so make a habit of it.

The _execution_ of a function introduces a new symbol table used for the local variables of the function. More precisely, all variable assignments in a function store the value in the local symbol table; whereas variable references first look in the local symbol table, then in the local symbol tables of enclosing functions, then in the global symbol table, and finally in the table of built-in names. Thus, global variables and variables of enclosing functions cannot be directly assigned a value within a function \(unless, for global variables, named in a [`global`](https://docs.python.org/3.9/reference/simple_stmts.html#global) statement, or, for variables of enclosing functions, named in a [`nonlocal`](https://docs.python.org/3.9/reference/simple_stmts.html#nonlocal) statement\), although they may be referenced.

The actual parameters \(arguments\) to a function call are introduced in the local symbol table of the called function when it is called; thus, arguments are passed using _call by value_ \(where the _value_ is always an object _reference_, not the value of the object\). [1](https://docs.python.org/3.9/tutorial/controlflow.html#id2) When a function calls another function, or calls itself recursively, a new local symbol table is created for that call.

A function definition associates the function name with the function object in the current symbol table. The interpreter recognizes the object pointed to by that name as a user-defined function. Other names can also point to that same function object and can also be used to access the function:&gt;&gt;&gt;

```python
>>> fib
<function fib at 10042ed0>
>>> f = fib
>>> f(100)
0 1 1 2 3 5 8 13 21 34 55 89
```

Coming from other languages, you might object that `fib` is not a function but a procedure since it doesn’t return a value. In fact, even functions without a [`return`](https://docs.python.org/3.9/reference/simple_stmts.html#return) statement do return a value, albeit a rather boring one. This value is called `None` \(it’s a built-in name\). Writing the value `None` is normally suppressed by the interpreter if it would be the only value written. You can see it if you really want to using [`print()`](https://docs.python.org/3.9/library/functions.html#print):&gt;&gt;&gt;

```python
>>> fib(0)
>>> print(fib(0))
None
```

It is simple to write a function that returns a list of the numbers of the Fibonacci series, instead of printing it:&gt;&gt;&gt;

```python
>>> def fib2(n):  # return Fibonacci series up to n
...     """Return a list containing the Fibonacci series up to n."""
...     result = []
...     a, b = 0, 1
...     while a < n:
...         result.append(a)    # see below
...         a, b = b, a+b
...     return result
...
>>> f100 = fib2(100)    # call it
>>> f100                # write the result
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
```

This example, as usual, demonstrates some new Python features:

* The [`return`](https://docs.python.org/3.9/reference/simple_stmts.html#return) statement returns with a value from a function. `return` without an expression argument returns `None`. Falling off the end of a function also returns `None`.
* The statement `result.append(a)` calls a _method_ of the list object `result`. A method is a function that ‘belongs’ to an object and is named `obj.methodname`, where `obj` is some object \(this may be an expression\), and `methodname` is the name of a method that is defined by the object’s type. Different types define different methods. Methods of different types may have the same name without causing ambiguity. \(It is possible to define your own object types and methods, using _classes_, see [Classes](https://docs.python.org/3.9/tutorial/classes.html#tut-classes)\) The method `append()` shown in the example is defined for list objects; it adds a new element at the end of the list. In this example it is equivalent to `result = result + [a]`, but more efficient.

#### 4.7. More on Defining Functions

It is also possible to define functions with a variable number of arguments. There are three forms, which can be combined.

**4.7.1. Default Argument Values**

The most useful form is to specify a default value for one or more arguments. This creates a function that can be called with fewer arguments than it is defined to allow. For example:

```python
def ask_ok(prompt, retries=4, reminder='Please try again!'):
    while True:
        ok = input(prompt)
        if ok in ('y', 'ye', 'yes'):
            return True
        if ok in ('n', 'no', 'nop', 'nope'):
            return False
        retries = retries - 1
        if retries < 0:
            raise ValueError('invalid user response')
        print(reminder)
```

This function can be called in several ways:

* giving only the mandatory argument: `ask_ok('Do you really want to quit?')`
* giving one of the optional arguments: `ask_ok('OK to overwrite the file?', 2)`
* or even giving all arguments: `ask_ok('OK to overwrite the file?', 2, 'Come on, only yes or no!')`

This example also introduces the [`in`](https://docs.python.org/3.9/reference/expressions.html#in) keyword. This tests whether or not a sequence contains a certain value.

The default values are evaluated at the point of function definition in the _defining_ scope, so that

```python
i = 5

def f(arg=i):
    print(arg)

i = 6
f()
```

will print `5`.

**Important warning:** The default value is evaluated only once. This makes a difference when the default is a mutable object such as a list, dictionary, or instances of most classes. For example, the following function accumulates the arguments passed to it on subsequent calls:

```python
def f(a, L=[]):
    L.append(a)
    return L

print(f(1))
print(f(2))
print(f(3))
```

This will print

```python
[1]
[1, 2]
[1, 2, 3]
```

If you don’t want the default to be shared between subsequent calls, you can write the function like this instead:

```python
def f(a, L=None):
    if L is None:
        L = []
    L.append(a)
    return L
```

**4.7.2. Keyword Arguments**

Functions can also be called using [keyword arguments](https://docs.python.org/3.9/glossary.html#term-keyword-argument) of the form `kwarg=value`. For instance, the following function:

```python
def parrot(voltage, state='a stiff', action='voom', type='Norwegian Blue'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.")
    print("-- Lovely plumage, the", type)
    print("-- It's", state, "!")
```

accepts one required argument \(`voltage`\) and three optional arguments \(`state`, `action`, and `type`\). This function can be called in any of the following ways:

```python
parrot(1000)                                          # 1 positional argument
parrot(voltage=1000)                                  # 1 keyword argument
parrot(voltage=1000000, action='VOOOOOM')             # 2 keyword arguments
parrot(action='VOOOOOM', voltage=1000000)             # 2 keyword arguments
parrot('a million', 'bereft of life', 'jump')         # 3 positional arguments
parrot('a thousand', state='pushing up the daisies')  # 1 positional, 1 keyword
```

but all the following calls would be invalid:

```python
parrot()                     # required argument missing
parrot(voltage=5.0, 'dead')  # non-keyword argument after a keyword argument
parrot(110, voltage=220)     # duplicate value for the same argument
parrot(actor='John Cleese')  # unknown keyword argument
```

In a function call, keyword arguments must follow positional arguments. All the keyword arguments passed must match one of the arguments accepted by the function \(e.g. `actor` is not a valid argument for the `parrot` function\), and their order is not important. This also includes non-optional arguments \(e.g. `parrot(voltage=1000)` is valid too\). No argument may receive a value more than once. Here’s an example that fails due to this restriction:&gt;&gt;&gt;

```python
>>> def function(a):
...     pass
...
>>> function(0, a=0)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: function() got multiple values for argument 'a'
```

When a final formal parameter of the form `**name` is present, it receives a dictionary \(see [Mapping Types — dict](https://docs.python.org/3.9/library/stdtypes.html#typesmapping)\) containing all keyword arguments except for those corresponding to a formal parameter. This may be combined with a formal parameter of the form `*name` \(described in the next subsection\) which receives a [tuple](https://docs.python.org/3.9/tutorial/datastructures.html#tut-tuples) containing the positional arguments beyond the formal parameter list. \(`*name` must occur before `**name`.\) For example, if we define a function like this:

```python
def cheeseshop(kind, *arguments, **keywords):
    print("-- Do you have any", kind, "?")
    print("-- I'm sorry, we're all out of", kind)
    for arg in arguments:
        print(arg)
    print("-" * 40)
    for kw in keywords:
        print(kw, ":", keywords[kw])
```

It could be called like this:

```python
cheeseshop("Limburger", "It's very runny, sir.",
           "It's really very, VERY runny, sir.",
           shopkeeper="Michael Palin",
           client="John Cleese",
           sketch="Cheese Shop Sketch")
```

and of course it would print:

```python
-- Do you have any Limburger ?
-- I'm sorry, we're all out of Limburger
It's very runny, sir.
It's really very, VERY runny, sir.
----------------------------------------
shopkeeper : Michael Palin
client : John Cleese
sketch : Cheese Shop Sketch
```

Note that the order in which the keyword arguments are printed is guaranteed to match the order in which they were provided in the function call.

**4.7.3. Special parameters**

By default, arguments may be passed to a Python function either by position or explicitly by keyword. For readability and performance, it makes sense to restrict the way arguments can be passed so that a developer need only look at the function definition to determine if items are passed by position, by position or keyword, or by keyword.

A function definition may look like:

```python
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
      -----------    ----------     ----------
        |             |                  |
        |        Positional or keyword   |
        |                                - Keyword only
         -- Positional only
```

where `/` and `*` are optional. If used, these symbols indicate the kind of parameter by how the arguments may be passed to the function: positional-only, positional-or-keyword, and keyword-only. Keyword parameters are also referred to as named parameters.

**4.7.3.1. Positional-or-Keyword Arguments**

If `/` and `*` are not present in the function definition, arguments may be passed to a function by position or by keyword.

**4.7.3.2. Positional-Only Parameters**

Looking at this in a bit more detail, it is possible to mark certain parameters as _positional-only_. If _positional-only_, the parameters’ order matters, and the parameters cannot be passed by keyword. Positional-only parameters are placed before a `/` \(forward-slash\). The `/` is used to logically separate the positional-only parameters from the rest of the parameters. If there is no `/` in the function definition, there are no positional-only parameters.

Parameters following the `/` may be _positional-or-keyword_ or _keyword-only_.

**4.7.3.3. Keyword-Only Arguments**

To mark parameters as _keyword-only_, indicating the parameters must be passed by keyword argument, place an `*` in the arguments list just before the first _keyword-only_ parameter.

**4.7.3.4. Function Examples**

Consider the following example function definitions paying close attention to the markers `/` and `*`:&gt;&gt;&gt;

```python
>>> def standard_arg(arg):
...     print(arg)
...
>>> def pos_only_arg(arg, /):
...     print(arg)
...
>>> def kwd_only_arg(*, arg):
...     print(arg)
...
>>> def combined_example(pos_only, /, standard, *, kwd_only):
...     print(pos_only, standard, kwd_only)
```

The first function definition, `standard_arg`, the most familiar form, places no restrictions on the calling convention and arguments may be passed by position or keyword:&gt;&gt;&gt;

```python
>>> standard_arg(2)
2

>>> standard_arg(arg=2)
2
```

The second function `pos_only_arg` is restricted to only use positional parameters as there is a `/` in the function definition:&gt;&gt;&gt;

```python
>>> pos_only_arg(1)
1

>>> pos_only_arg(arg=1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: pos_only_arg() got some positional-only arguments passed as keyword arguments: 'arg'
```

The third function `kwd_only_args` only allows keyword arguments as indicated by a `*` in the function definition:&gt;&gt;&gt;

```python
>>> kwd_only_arg(3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: kwd_only_arg() takes 0 positional arguments but 1 was given

>>> kwd_only_arg(arg=3)
3
```

And the last uses all three calling conventions in the same function definition:&gt;&gt;&gt;

```python
>>> combined_example(1, 2, 3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: combined_example() takes 2 positional arguments but 3 were given

>>> combined_example(1, 2, kwd_only=3)
1 2 3

>>> combined_example(1, standard=2, kwd_only=3)
1 2 3

>>> combined_example(pos_only=1, standard=2, kwd_only=3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: combined_example() got some positional-only arguments passed as keyword arguments: 'pos_only'
```

Finally, consider this function definition which has a potential collision between the positional argument `name` and `**kwds` which has `name` as a key:

```python
def foo(name, **kwds):
    return 'name' in kwds
```

There is no possible call that will make it return `True` as the keyword `'name'` will always bind to the first parameter. For example:&gt;&gt;&gt;

```python
>>> foo(1, **{'name': 2})
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: foo() got multiple values for argument 'name'
>>>
```

But using `/` \(positional only arguments\), it is possible since it allows `name` as a positional argument and `'name'` as a key in the keyword arguments:

```python
def foo(name, /, **kwds):
    return 'name' in kwds
>>> foo(1, **{'name': 2})
True
```

In other words, the names of positional-only parameters can be used in `**kwds` without ambiguity.

**4.7.3.5. Recap**

The use case will determine which parameters to use in the function definition:

```python
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
```

As guidance:

* Use positional-only if you want the name of the parameters to not be available to the user. This is useful when parameter names have no real meaning, if you want to enforce the order of the arguments when the function is called or if you need to take some positional parameters and arbitrary keywords.
* Use keyword-only when names have meaning and the function definition is more understandable by being explicit with names or you want to prevent users relying on the position of the argument being passed.
* For an API, use positional-only to prevent breaking API changes if the parameter’s name is modified in the future.

**4.7.4. Arbitrary Argument Lists**

Finally, the least frequently used option is to specify that a function can be called with an arbitrary number of arguments. These arguments will be wrapped up in a tuple \(see [Tuples and Sequences](https://docs.python.org/3.9/tutorial/datastructures.html#tut-tuples)\). Before the variable number of arguments, zero or more normal arguments may occur.

```python
def write_multiple_items(file, separator, *args):
    file.write(separator.join(args))
```

Normally, these `variadic` arguments will be last in the list of formal parameters, because they scoop up all remaining input arguments that are passed to the function. Any formal parameters which occur after the `*args` parameter are ‘keyword-only’ arguments, meaning that they can only be used as keywords rather than positional arguments.&gt;&gt;&gt;

```python
>>> def concat(*args, sep="/"):
...     return sep.join(args)
...
>>> concat("earth", "mars", "venus")
'earth/mars/venus'
>>> concat("earth", "mars", "venus", sep=".")
'earth.mars.venus'
```

**4.7.5. Unpacking Argument Lists**

The reverse situation occurs when the arguments are already in a list or tuple but need to be unpacked for a function call requiring separate positional arguments. For instance, the built-in [`range()`](https://docs.python.org/3.9/library/stdtypes.html#range) function expects separate _start_ and _stop_ arguments. If they are not available separately, write the function call with the `*`-operator to unpack the arguments out of a list or tuple:&gt;&gt;&gt;

```python
>>> list(range(3, 6))            # normal call with separate arguments
[3, 4, 5]
>>> args = [3, 6]
>>> list(range(*args))            # call with arguments unpacked from a list
[3, 4, 5]
```

In the same fashion, dictionaries can deliver keyword arguments with the `**`-operator:&gt;&gt;&gt;

```python
>>> def parrot(voltage, state='a stiff', action='voom'):
...     print("-- This parrot wouldn't", action, end=' ')
...     print("if you put", voltage, "volts through it.", end=' ')
...     print("E's", state, "!")
...
>>> d = {"voltage": "four million", "state": "bleedin' demised", "action": "VOOM"}
>>> parrot(**d)
-- This parrot wouldn't VOOM if you put four million volts through it. E's bleedin' demised !
```

**4.7.6. Lambda Expressions**

Small anonymous functions can be created with the [`lambda`](https://docs.python.org/3.9/reference/expressions.html#lambda) keyword. This function returns the sum of its two arguments: `lambda a, b: a+b`. Lambda functions can be used wherever function objects are required. They are syntactically restricted to a single expression. Semantically, they are just syntactic sugar for a normal function definition. Like nested function definitions, lambda functions can reference variables from the containing scope:&gt;&gt;&gt;

```python
>>> def make_incrementor(n):
...     return lambda x: x + n
...
>>> f = make_incrementor(42)
>>> f(0)
42
>>> f(1)
43
```

The above example uses a lambda expression to return a function. Another use is to pass a small function as an argument:&gt;&gt;&gt;

```python
>>> pairs = [(1, 'one'), (2, 'two'), (3, 'three'), (4, 'four')]
>>> pairs.sort(key=lambda pair: pair[1])
>>> pairs
[(4, 'four'), (1, 'one'), (3, 'three'), (2, 'two')]
```

**4.7.7. Documentation Strings**

Here are some conventions about the content and formatting of documentation strings.

The first line should always be a short, concise summary of the object’s purpose. For brevity, it should not explicitly state the object’s name or type, since these are available by other means \(except if the name happens to be a verb describing a function’s operation\). This line should begin with a capital letter and end with a period.

If there are more lines in the documentation string, the second line should be blank, visually separating the summary from the rest of the description. The following lines should be one or more paragraphs describing the object’s calling conventions, its side effects, etc.

The Python parser does not strip indentation from multi-line string literals in Python, so tools that process documentation have to strip indentation if desired. This is done using the following convention. The first non-blank line _after_ the first line of the string determines the amount of indentation for the entire documentation string. \(We can’t use the first line since it is generally adjacent to the string’s opening quotes so its indentation is not apparent in the string literal.\) Whitespace “equivalent” to this indentation is then stripped from the start of all lines of the string. Lines that are indented less should not occur, but if they occur all their leading whitespace should be stripped. Equivalence of whitespace should be tested after expansion of tabs \(to 8 spaces, normally\).

Here is an example of a multi-line docstring:&gt;&gt;&gt;

```python
>>> def my_function():
...     """Do nothing, but document it.
...
...     No, really, it doesn't do anything.
...     """
...     pass
...
>>> print(my_function.__doc__)
Do nothing, but document it.

    No, really, it doesn't do anything.
```

**4.7.8. Function Annotations**

[Function annotations](https://docs.python.org/3.9/reference/compound_stmts.html#function) are completely optional metadata information about the types used by user-defined functions \(see [**PEP 3107**](https://www.python.org/dev/peps/pep-3107) and [**PEP 484**](https://www.python.org/dev/peps/pep-0484) for more information\).

[Annotations](https://docs.python.org/3.9/glossary.html#term-function-annotation) are stored in the `__annotations__` attribute of the function as a dictionary and have no effect on any other part of the function. Parameter annotations are defined by a colon after the parameter name, followed by an expression evaluating to the value of the annotation. Return annotations are defined by a literal `->`, followed by an expression, between the parameter list and the colon denoting the end of the [`def`](https://docs.python.org/3.9/reference/compound_stmts.html#def) statement. The following example has a required argument, an optional argument, and the return value annotated:&gt;&gt;&gt;

```python
>>> def f(ham: str, eggs: str = 'eggs') -> str:
...     print("Annotations:", f.__annotations__)
...     print("Arguments:", ham, eggs)
...     return ham + ' and ' + eggs
...
>>> f('spam')
Annotations: {'ham': <class 'str'>, 'return': <class 'str'>, 'eggs': <class 'str'>}
Arguments: spam eggs
'spam and eggs'
```

### Data Structures

This chapter describes some things you’ve learned about already in more detail, and adds some new things as well.

#### 5.1. More on Lists

The list data type has some more methods. Here are all of the methods of list objects:`list.append`\(_x_\)

Add an item to the end of the list. Equivalent to `a[len(a):] = [x]`.`list.extend`\(_iterable_\)

Extend the list by appending all the items from the iterable. Equivalent to `a[len(a):] = iterable`.`list.insert`\(_i_, _x_\)

Insert an item at a given position. The first argument is the index of the element before which to insert, so `a.insert(0, x)` inserts at the front of the list, and `a.insert(len(a), x)` is equivalent to `a.append(x)`.`list.remove`\(_x_\)

Remove the first item from the list whose value is equal to _x_. It raises a [`ValueError`](https://docs.python.org/3.9/library/exceptions.html#ValueError) if there is no such item.`list.pop`\(\[_i_\]\)

Remove the item at the given position in the list, and return it. If no index is specified, `a.pop()` removes and returns the last item in the list. \(The square brackets around the _i_ in the method signature denote that the parameter is optional, not that you should type square brackets at that position. You will see this notation frequently in the Python Library Reference.\)`list.clear`\(\)

Remove all items from the list. Equivalent to `del a[:]`.`list.index`\(_x_\[, _start_\[, _end_\]\]\)

Return zero-based index in the list of the first item whose value is equal to _x_. Raises a [`ValueError`](https://docs.python.org/3.9/library/exceptions.html#ValueError) if there is no such item.

The optional arguments _start_ and _end_ are interpreted as in the slice notation and are used to limit the search to a particular subsequence of the list. The returned index is computed relative to the beginning of the full sequence rather than the _start_ argument.`list.count`\(_x_\)

Return the number of times _x_ appears in the list.`list.sort`\(_\*_, _key=None_, _reverse=False_\)

Sort the items of the list in place \(the arguments can be used for sort customization, see [`sorted()`](https://docs.python.org/3.9/library/functions.html#sorted) for their explanation\).`list.reverse`\(\)

Reverse the elements of the list in place.`list.copy`\(\)

Return a shallow copy of the list. Equivalent to `a[:]`.

An example that uses most of the list methods:&gt;&gt;&gt;

```python
>>> fruits = ['orange', 'apple', 'pear', 'banana', 'kiwi', 'apple', 'banana']
>>> fruits.count('apple')
2
>>> fruits.count('tangerine')
0
>>> fruits.index('banana')
3
>>> fruits.index('banana', 4)  # Find next banana starting a position 4
6
>>> fruits.reverse()
>>> fruits
['banana', 'apple', 'kiwi', 'banana', 'pear', 'apple', 'orange']
>>> fruits.append('grape')
>>> fruits
['banana', 'apple', 'kiwi', 'banana', 'pear', 'apple', 'orange', 'grape']
>>> fruits.sort()
>>> fruits
['apple', 'apple', 'banana', 'banana', 'grape', 'kiwi', 'orange', 'pear']
>>> fruits.pop()
'pear'
```

You might have noticed that methods like `insert`, `remove` or `sort` that only modify the list have no return value printed – they return the default `None`. [1](https://docs.python.org/3.9/tutorial/datastructures.html#id2) This is a design principle for all mutable data structures in Python.

Another thing you might notice is that not all data can be sorted or compared. For instance, `[None, 'hello', 10]` doesn’t sort because integers can’t be compared to strings and _None_ can’t be compared to other types. Also, there are some types that don’t have a defined ordering relation. For example, `3+4j < 5+7j` isn’t a valid comparison.

**5.1.1. Using Lists as Stacks**

The list methods make it very easy to use a list as a stack, where the last element added is the first element retrieved \(“last-in, first-out”\). To add an item to the top of the stack, use `append()`. To retrieve an item from the top of the stack, use `pop()` without an explicit index. For example:&gt;&gt;&gt;

```python
>>> stack = [3, 4, 5]
>>> stack.append(6)
>>> stack.append(7)
>>> stack
[3, 4, 5, 6, 7]
>>> stack.pop()
7
>>> stack
[3, 4, 5, 6]
>>> stack.pop()
6
>>> stack.pop()
5
>>> stack
[3, 4]
```

**5.1.2. Using Lists as Queues**

It is also possible to use a list as a queue, where the first element added is the first element retrieved \(“first-in, first-out”\); however, lists are not efficient for this purpose. While appends and pops from the end of list are fast, doing inserts or pops from the beginning of a list is slow \(because all of the other elements have to be shifted by one\).

To implement a queue, use [`collections.deque`](https://docs.python.org/3.9/library/collections.html#collections.deque) which was designed to have fast appends and pops from both ends. For example:&gt;&gt;&gt;

```python
>>> from collections import deque
>>> queue = deque(["Eric", "John", "Michael"])
>>> queue.append("Terry")           # Terry arrives
>>> queue.append("Graham")          # Graham arrives
>>> queue.popleft()                 # The first to arrive now leaves
'Eric'
>>> queue.popleft()                 # The second to arrive now leaves
'John'
>>> queue                           # Remaining queue in order of arrival
deque(['Michael', 'Terry', 'Graham'])
```

**5.1.3. List Comprehensions**

List comprehensions provide a concise way to create lists. Common applications are to make new lists where each element is the result of some operations applied to each member of another sequence or iterable, or to create a subsequence of those elements that satisfy a certain condition.

For example, assume we want to create a list of squares, like:&gt;&gt;&gt;

```python
>>> squares = []
>>> for x in range(10):
...     squares.append(x**2)
...
>>> squares
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Note that this creates \(or overwrites\) a variable named `x` that still exists after the loop completes. We can calculate the list of squares without any side effects using:

```python
squares = list(map(lambda x: x**2, range(10)))
```

or, equivalently:

```python
squares = [x**2 for x in range(10)]
```

which is more concise and readable.

A list comprehension consists of brackets containing an expression followed by a `for` clause, then zero or more `for` or `if` clauses. The result will be a new list resulting from evaluating the expression in the context of the `for` and `if` clauses which follow it. For example, this listcomp combines the elements of two lists if they are not equal:&gt;&gt;&gt;

```python
>>> [(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

and it’s equivalent to:&gt;&gt;&gt;

```python
>>> combs = []
>>> for x in [1,2,3]:
...     for y in [3,1,4]:
...         if x != y:
...             combs.append((x, y))
...
>>> combs
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

Note how the order of the [`for`](https://docs.python.org/3.9/reference/compound_stmts.html#for) and [`if`](https://docs.python.org/3.9/reference/compound_stmts.html#if) statements is the same in both these snippets.

If the expression is a tuple \(e.g. the `(x, y)` in the previous example\), it must be parenthesized.&gt;&gt;&gt;

```python
>>> vec = [-4, -2, 0, 2, 4]
>>> # create a new list with the values doubled
>>> [x*2 for x in vec]
[-8, -4, 0, 4, 8]
>>> # filter the list to exclude negative numbers
>>> [x for x in vec if x >= 0]
[0, 2, 4]
>>> # apply a function to all the elements
>>> [abs(x) for x in vec]
[4, 2, 0, 2, 4]
>>> # call a method on each element
>>> freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']
>>> [weapon.strip() for weapon in freshfruit]
['banana', 'loganberry', 'passion fruit']
>>> # create a list of 2-tuples like (number, square)
>>> [(x, x**2) for x in range(6)]
[(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]
>>> # the tuple must be parenthesized, otherwise an error is raised
>>> [x, x**2 for x in range(6)]
  File "<stdin>", line 1, in <module>
    [x, x**2 for x in range(6)]
               ^
SyntaxError: invalid syntax
>>> # flatten a list using a listcomp with two 'for'
>>> vec = [[1,2,3], [4,5,6], [7,8,9]]
>>> [num for elem in vec for num in elem]
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

List comprehensions can contain complex expressions and nested functions:&gt;&gt;&gt;

```python
>>> from math import pi
>>> [str(round(pi, i)) for i in range(1, 6)]
['3.1', '3.14', '3.142', '3.1416', '3.14159']
```

**5.1.4. Nested List Comprehensions**

The initial expression in a list comprehension can be any arbitrary expression, including another list comprehension.

Consider the following example of a 3x4 matrix implemented as a list of 3 lists of length 4:&gt;&gt;&gt;

```python
>>> matrix = [
...     [1, 2, 3, 4],
...     [5, 6, 7, 8],
...     [9, 10, 11, 12],
... ]
```

The following list comprehension will transpose rows and columns:&gt;&gt;&gt;

```python
>>> [[row[i] for row in matrix] for i in range(4)]
[[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

As we saw in the previous section, the nested listcomp is evaluated in the context of the [`for`](https://docs.python.org/3.9/reference/compound_stmts.html#for) that follows it, so this example is equivalent to:&gt;&gt;&gt;

```python
>>> transposed = []
>>> for i in range(4):
...     transposed.append([row[i] for row in matrix])
...
>>> transposed
[[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

which, in turn, is the same as:&gt;&gt;&gt;

```python
>>> transposed = []
>>> for i in range(4):
...     # the following 3 lines implement the nested listcomp
...     transposed_row = []
...     for row in matrix:
...         transposed_row.append(row[i])
...     transposed.append(transposed_row)
...
>>> transposed
[[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

In the real world, you should prefer built-in functions to complex flow statements. The [`zip()`](https://docs.python.org/3.9/library/functions.html#zip) function would do a great job for this use case:&gt;&gt;&gt;

```python
>>> list(zip(*matrix))
[(1, 5, 9), (2, 6, 10), (3, 7, 11), (4, 8, 12)]
```

See [Unpacking Argument Lists](https://docs.python.org/3.9/tutorial/controlflow.html#tut-unpacking-arguments) for details on the asterisk in this line.

#### 5.2. The `del` statement

There is a way to remove an item from a list given its index instead of its value: the [`del`](https://docs.python.org/3.9/reference/simple_stmts.html#del) statement. This differs from the `pop()` method which returns a value. The `del` statement can also be used to remove slices from a list or clear the entire list \(which we did earlier by assignment of an empty list to the slice\). For example:&gt;&gt;&gt;

```python
>>> a = [-1, 1, 66.25, 333, 333, 1234.5]
>>> del a[0]
>>> a
[1, 66.25, 333, 333, 1234.5]
>>> del a[2:4]
>>> a
[1, 66.25, 1234.5]
>>> del a[:]
>>> a
[]
```

[`del`](https://docs.python.org/3.9/reference/simple_stmts.html#del) can also be used to delete entire variables:&gt;&gt;&gt;

```python
>>> del a
```

Referencing the name `a` hereafter is an error \(at least until another value is assigned to it\). We’ll find other uses for [`del`](https://docs.python.org/3.9/reference/simple_stmts.html#del) later.

#### 5.3. Tuples and Sequences

We saw that lists and strings have many common properties, such as indexing and slicing operations. They are two examples of _sequence_ data types \(see [Sequence Types — list, tuple, range](https://docs.python.org/3.9/library/stdtypes.html#typesseq)\). Since Python is an evolving language, other sequence data types may be added. There is also another standard sequence data type: the _tuple_.

A tuple consists of a number of values separated by commas, for instance:&gt;&gt;&gt;

```python
>>> t = 12345, 54321, 'hello!'
>>> t[0]
12345
>>> t
(12345, 54321, 'hello!')
>>> # Tuples may be nested:
... u = t, (1, 2, 3, 4, 5)
>>> u
((12345, 54321, 'hello!'), (1, 2, 3, 4, 5))
>>> # Tuples are immutable:
... t[0] = 88888
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>> # but they can contain mutable objects:
... v = ([1, 2, 3], [3, 2, 1])
>>> v
([1, 2, 3], [3, 2, 1])
```

As you see, on output tuples are always enclosed in parentheses, so that nested tuples are interpreted correctly; they may be input with or without surrounding parentheses, although often parentheses are necessary anyway \(if the tuple is part of a larger expression\). It is not possible to assign to the individual items of a tuple, however it is possible to create tuples which contain mutable objects, such as lists.

Though tuples may seem similar to lists, they are often used in different situations and for different purposes. Tuples are [immutable](https://docs.python.org/3.9/glossary.html#term-immutable), and usually contain a heterogeneous sequence of elements that are accessed via unpacking \(see later in this section\) or indexing \(or even by attribute in the case of [`namedtuples`](https://docs.python.org/3.9/library/collections.html#collections.namedtuple)\). Lists are [mutable](https://docs.python.org/3.9/glossary.html#term-mutable), and their elements are usually homogeneous and are accessed by iterating over the list.

A special problem is the construction of tuples containing 0 or 1 items: the syntax has some extra quirks to accommodate these. Empty tuples are constructed by an empty pair of parentheses; a tuple with one item is constructed by following a value with a comma \(it is not sufficient to enclose a single value in parentheses\). Ugly, but effective. For example:&gt;&gt;&gt;

```python
>>> empty = ()
>>> singleton = 'hello',    # <-- note trailing comma
>>> len(empty)
0
>>> len(singleton)
1
>>> singleton
('hello',)
```

The statement `t = 12345, 54321, 'hello!'` is an example of _tuple packing_: the values `12345`, `54321` and `'hello!'` are packed together in a tuple. The reverse operation is also possible:&gt;&gt;&gt;

```python
>>> x, y, z = t
```

This is called, appropriately enough, _sequence unpacking_ and works for any sequence on the right-hand side. Sequence unpacking requires that there are as many variables on the left side of the equals sign as there are elements in the sequence. Note that multiple assignment is really just a combination of tuple packing and sequence unpacking.

#### 5.4. Sets

Python also includes a data type for _sets_. A set is an unordered collection with no duplicate elements. Basic uses include membership testing and eliminating duplicate entries. Set objects also support mathematical operations like union, intersection, difference, and symmetric difference.

Curly braces or the [`set()`](https://docs.python.org/3.9/library/stdtypes.html#set) function can be used to create sets. Note: to create an empty set you have to use `set()`, not `{}`; the latter creates an empty dictionary, a data structure that we discuss in the next section.

Here is a brief demonstration:&gt;&gt;&gt;

```python
>>> basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
>>> print(basket)                      # show that duplicates have been removed
{'orange', 'banana', 'pear', 'apple'}
>>> 'orange' in basket                 # fast membership testing
True
>>> 'crabgrass' in basket
False

>>> # Demonstrate set operations on unique letters from two words
...
>>> a = set('abracadabra')
>>> b = set('alacazam')
>>> a                                  # unique letters in a
{'a', 'r', 'b', 'c', 'd'}
>>> a - b                              # letters in a but not in b
{'r', 'd', 'b'}
>>> a | b                              # letters in a or b or both
{'a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'}
>>> a & b                              # letters in both a and b
{'a', 'c'}
>>> a ^ b                              # letters in a or b but not both
{'r', 'd', 'b', 'm', 'z', 'l'}
```

Similarly to [list comprehensions](https://docs.python.org/3.9/tutorial/datastructures.html#tut-listcomps), set comprehensions are also supported:&gt;&gt;&gt;

```python
>>> a = {x for x in 'abracadabra' if x not in 'abc'}
>>> a
{'r', 'd'}
```

#### 5.5. Dictionaries

Another useful data type built into Python is the _dictionary_ \(see [Mapping Types — dict](https://docs.python.org/3.9/library/stdtypes.html#typesmapping)\). Dictionaries are sometimes found in other languages as “associative memories” or “associative arrays”. Unlike sequences, which are indexed by a range of numbers, dictionaries are indexed by _keys_, which can be any immutable type; strings and numbers can always be keys. Tuples can be used as keys if they contain only strings, numbers, or tuples; if a tuple contains any mutable object either directly or indirectly, it cannot be used as a key. You can’t use lists as keys, since lists can be modified in place using index assignments, slice assignments, or methods like `append()` and `extend()`.

It is best to think of a dictionary as a set of _key: value_ pairs, with the requirement that the keys are unique \(within one dictionary\). A pair of braces creates an empty dictionary: `{}`. Placing a comma-separated list of key:value pairs within the braces adds initial key:value pairs to the dictionary; this is also the way dictionaries are written on output.

The main operations on a dictionary are storing a value with some key and extracting the value given the key. It is also possible to delete a key:value pair with `del`. If you store using a key that is already in use, the old value associated with that key is forgotten. It is an error to extract a value using a non-existent key.

Performing `list(d)` on a dictionary returns a list of all the keys used in the dictionary, in insertion order \(if you want it sorted, just use `sorted(d)` instead\). To check whether a single key is in the dictionary, use the [`in`](https://docs.python.org/3.9/reference/expressions.html#in) keyword.

Here is a small example using a dictionary:&gt;&gt;&gt;

```python
>>> tel = {'jack': 4098, 'sape': 4139}
>>> tel['guido'] = 4127
>>> tel
{'jack': 4098, 'sape': 4139, 'guido': 4127}
>>> tel['jack']
4098
>>> del tel['sape']
>>> tel['irv'] = 4127
>>> tel
{'jack': 4098, 'guido': 4127, 'irv': 4127}
>>> list(tel)
['jack', 'guido', 'irv']
>>> sorted(tel)
['guido', 'irv', 'jack']
>>> 'guido' in tel
True
>>> 'jack' not in tel
False
```

The [`dict()`](https://docs.python.org/3.9/library/stdtypes.html#dict) constructor builds dictionaries directly from sequences of key-value pairs:&gt;&gt;&gt;

```python
>>> dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
{'sape': 4139, 'guido': 4127, 'jack': 4098}
```

In addition, dict comprehensions can be used to create dictionaries from arbitrary key and value expressions:&gt;&gt;&gt;

```python
>>> {x: x**2 for x in (2, 4, 6)}
{2: 4, 4: 16, 6: 36}
```

When the keys are simple strings, it is sometimes easier to specify pairs using keyword arguments:&gt;&gt;&gt;

```python
>>> dict(sape=4139, guido=4127, jack=4098)
{'sape': 4139, 'guido': 4127, 'jack': 4098}
```

#### 5.6. Looping Techniques

When looping through dictionaries, the key and corresponding value can be retrieved at the same time using the `items()` method.&gt;&gt;&gt;

```python
>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> for k, v in knights.items():
...     print(k, v)
...
gallahad the pure
robin the brave
```

When looping through a sequence, the position index and corresponding value can be retrieved at the same time using the [`enumerate()`](https://docs.python.org/3.9/library/functions.html#enumerate) function.&gt;&gt;&gt;

```python
>>> for i, v in enumerate(['tic', 'tac', 'toe']):
...     print(i, v)
...
0 tic
1 tac
2 toe
```

To loop over two or more sequences at the same time, the entries can be paired with the [`zip()`](https://docs.python.org/3.9/library/functions.html#zip) function.&gt;&gt;&gt;

```python
>>> questions = ['name', 'quest', 'favorite color']
>>> answers = ['lancelot', 'the holy grail', 'blue']
>>> for q, a in zip(questions, answers):
...     print('What is your {0}?  It is {1}.'.format(q, a))
...
What is your name?  It is lancelot.
What is your quest?  It is the holy grail.
What is your favorite color?  It is blue.
```

To loop over a sequence in reverse, first specify the sequence in a forward direction and then call the [`reversed()`](https://docs.python.org/3.9/library/functions.html#reversed) function.&gt;&gt;&gt;

```python
>>> for i in reversed(range(1, 10, 2)):
...     print(i)
...
9
7
5
3
1
```

To loop over a sequence in sorted order, use the [`sorted()`](https://docs.python.org/3.9/library/functions.html#sorted) function which returns a new sorted list while leaving the source unaltered.&gt;&gt;&gt;

```python
>>> basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
>>> for i in sorted(basket):
...     print(i)
...
apple
apple
banana
orange
orange
pear
```

Using [`set()`](https://docs.python.org/3.9/library/stdtypes.html#set) on a sequence eliminates duplicate elements. The use of [`sorted()`](https://docs.python.org/3.9/library/functions.html#sorted) in combination with [`set()`](https://docs.python.org/3.9/library/stdtypes.html#set) over a sequence is an idiomatic way to loop over unique elements of the sequence in sorted order.&gt;&gt;&gt;

```python
>>> basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
>>> for f in sorted(set(basket)):
...     print(f)
...
apple
banana
orange
pear
```

It is sometimes tempting to change a list while you are looping over it; however, it is often simpler and safer to create a new list instead.&gt;&gt;&gt;

```python
>>> import math
>>> raw_data = [56.2, float('NaN'), 51.7, 55.3, 52.5, float('NaN'), 47.8]
>>> filtered_data = []
>>> for value in raw_data:
...     if not math.isnan(value):
...         filtered_data.append(value)
...
>>> filtered_data
[56.2, 51.7, 55.3, 52.5, 47.8]
```

#### 5.7. More on Conditions

The conditions used in `while` and `if` statements can contain any operators, not just comparisons.

The comparison operators `in` and `not in` check whether a value occurs \(does not occur\) in a sequence. The operators `is` and `is not` compare whether two objects are really the same object. All comparison operators have the same priority, which is lower than that of all numerical operators.

Comparisons can be chained. For example, `a < b == c` tests whether `a` is less than `b` and moreover `b` equals `c`.

Comparisons may be combined using the Boolean operators `and` and `or`, and the outcome of a comparison \(or of any other Boolean expression\) may be negated with `not`. These have lower priorities than comparison operators; between them, `not` has the highest priority and `or` the lowest, so that `A and not B or C` is equivalent to `(A and (not B)) or C`. As always, parentheses can be used to express the desired composition.

The Boolean operators `and` and `or` are so-called _short-circuit_ operators: their arguments are evaluated from left to right, and evaluation stops as soon as the outcome is determined. For example, if `A` and `C` are true but `B` is false, `A and B and C` does not evaluate the expression `C`. When used as a general value and not as a Boolean, the return value of a short-circuit operator is the last evaluated argument.

It is possible to assign the result of a comparison or other Boolean expression to a variable. For example,&gt;&gt;&gt;

```python
>>> string1, string2, string3 = '', 'Trondheim', 'Hammer Dance'
>>> non_null = string1 or string2 or string3
>>> non_null
'Trondheim'
```

Note that in Python, unlike C, assignment inside expressions must be done explicitly with the [walrus operator](https://docs.python.org/3.9/faq/design.html#why-can-t-i-use-an-assignment-in-an-expression) `:=`. This avoids a common class of problems encountered in C programs: typing `=` in an expression when `==` was intended.

#### 5.8. Comparing Sequences and Other Types

Sequence objects typically may be compared to other objects with the same sequence type. The comparison uses _lexicographical_ ordering: first the first two items are compared, and if they differ this determines the outcome of the comparison; if they are equal, the next two items are compared, and so on, until either sequence is exhausted. If two items to be compared are themselves sequences of the same type, the lexicographical comparison is carried out recursively. If all items of two sequences compare equal, the sequences are considered equal. If one sequence is an initial sub-sequence of the other, the shorter sequence is the smaller \(lesser\) one. Lexicographical ordering for strings uses the Unicode code point number to order individual characters. Some examples of comparisons between sequences of the same type:

```python
(1, 2, 3)              < (1, 2, 4)
[1, 2, 3]              < [1, 2, 4]
'ABC' < 'C' < 'Pascal' < 'Python'
(1, 2, 3, 4)           < (1, 2, 4)
(1, 2)                 < (1, 2, -1)
(1, 2, 3)             == (1.0, 2.0, 3.0)
(1, 2, ('aa', 'ab'))   < (1, 2, ('abc', 'a'), 4)
```

Note that comparing objects of different types with `<` or `>` is legal provided that the objects have appropriate comparison methods. For example, mixed numeric types are compared according to their numeric value, so 0 equals 0.0, etc. Otherwise, rather than providing an arbitrary ordering, the interpreter will raise a [`TypeError`](https://docs.python.org/3.9/library/exceptions.html#TypeError) exception.

### Modules

If you quit from the Python interpreter and enter it again, the definitions you have made \(functions and variables\) are lost. Therefore, if you want to write a somewhat longer program, you are better off using a text editor to prepare the input for the interpreter and running it with that file as input instead. This is known as creating a _script_. As your program gets longer, you may want to split it into several files for easier maintenance. You may also want to use a handy function that you’ve written in several programs without copying its definition into each program.

To support this, Python has a way to put definitions in a file and use them in a script or in an interactive instance of the interpreter. Such a file is called a _module_; definitions from a module can be _imported_ into other modules or into the _main_ module \(the collection of variables that you have access to in a script executed at the top level and in calculator mode\).

A module is a file containing Python definitions and statements. The file name is the module name with the suffix `.py` appended. Within a module, the module’s name \(as a string\) is available as the value of the global variable `__name__`. For instance, use your favorite text editor to create a file called `fibo.py` in the current directory with the following contents:

```python
# Fibonacci numbers module

def fib(n):    # write Fibonacci series up to n
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

def fib2(n):   # return Fibonacci series up to n
    result = []
    a, b = 0, 1
    while a < n:
        result.append(a)
        a, b = b, a+b
    return result
```

Now enter the Python interpreter and import this module with the following command:&gt;&gt;&gt;

```python
>>> import fibo
```

This does not enter the names of the functions defined in `fibo` directly in the current symbol table; it only enters the module name `fibo` there. Using the module name you can access the functions:&gt;&gt;&gt;

```python
>>> fibo.fib(1000)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
>>> fibo.fib2(100)
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
>>> fibo.__name__
'fibo'
```

If you intend to use a function often you can assign it to a local name:&gt;&gt;&gt;

```python
>>> fib = fibo.fib
>>> fib(500)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

#### 6.1. More on Modules

A module can contain executable statements as well as function definitions. These statements are intended to initialize the module. They are executed only the _first_ time the module name is encountered in an import statement. [1](https://docs.python.org/3.9/tutorial/modules.html#id2) \(They are also run if the file is executed as a script.\)

Each module has its own private symbol table, which is used as the global symbol table by all functions defined in the module. Thus, the author of a module can use global variables in the module without worrying about accidental clashes with a user’s global variables. On the other hand, if you know what you are doing you can touch a module’s global variables with the same notation used to refer to its functions, `modname.itemname`.

Modules can import other modules. It is customary but not required to place all [`import`](https://docs.python.org/3.9/reference/simple_stmts.html#import) statements at the beginning of a module \(or script, for that matter\). The imported module names are placed in the importing module’s global symbol table.

There is a variant of the [`import`](https://docs.python.org/3.9/reference/simple_stmts.html#import) statement that imports names from a module directly into the importing module’s symbol table. For example:&gt;&gt;&gt;

```python
>>> from fibo import fib, fib2
>>> fib(500)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

This does not introduce the module name from which the imports are taken in the local symbol table \(so in the example, `fibo` is not defined\).

There is even a variant to import all names that a module defines:&gt;&gt;&gt;

```python
>>> from fibo import *
>>> fib(500)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

This imports all names except those beginning with an underscore \(`_`\). In most cases Python programmers do not use this facility since it introduces an unknown set of names into the interpreter, possibly hiding some things you have already defined.

Note that in general the practice of importing `*` from a module or package is frowned upon, since it often causes poorly readable code. However, it is okay to use it to save typing in interactive sessions.

If the module name is followed by `as`, then the name following `as` is bound directly to the imported module.&gt;&gt;&gt;

```python
>>> import fibo as fib
>>> fib.fib(500)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

This is effectively importing the module in the same way that `import fibo` will do, with the only difference of it being available as `fib`.

It can also be used when utilising [`from`](https://docs.python.org/3.9/reference/simple_stmts.html#from) with similar effects:&gt;&gt;&gt;

```python
>>> from fibo import fib as fibonacci
>>> fibonacci(500)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

Note

For efficiency reasons, each module is only imported once per interpreter session. Therefore, if you change your modules, you must restart the interpreter – or, if it’s just one module you want to test interactively, use [`importlib.reload()`](https://docs.python.org/3.9/library/importlib.html#importlib.reload), e.g. `import importlib; importlib.reload(modulename)`.

**6.1.1. Executing modules as scripts**

When you run a Python module with

```python
python fibo.py <arguments>
```

the code in the module will be executed, just as if you imported it, but with the `__name__` set to `"__main__"`. That means that by adding this code at the end of your module:

```python
if __name__ == "__main__":
    import sys
    fib(int(sys.argv[1]))
```

you can make the file usable as a script as well as an importable module, because the code that parses the command line only runs if the module is executed as the “main” file:

```python
$ python fibo.py 50
0 1 1 2 3 5 8 13 21 34
```

If the module is imported, the code is not run:&gt;&gt;&gt;

```python
>>> import fibo
>>>
```

This is often used either to provide a convenient user interface to a module, or for testing purposes \(running the module as a script executes a test suite\).

**6.1.2. The Module Search Path**

When a module named `spam` is imported, the interpreter first searches for a built-in module with that name. If not found, it then searches for a file named `spam.py` in a list of directories given by the variable [`sys.path`](https://docs.python.org/3.9/library/sys.html#sys.path). [`sys.path`](https://docs.python.org/3.9/library/sys.html#sys.path) is initialized from these locations:

* The directory containing the input script \(or the current directory when no file is specified\).
* [`PYTHONPATH`](https://docs.python.org/3.9/using/cmdline.html#envvar-PYTHONPATH) \(a list of directory names, with the same syntax as the shell variable `PATH`\).
* The installation-dependent default.

Note

On file systems which support symlinks, the directory containing the input script is calculated after the symlink is followed. In other words the directory containing the symlink is **not** added to the module search path.

After initialization, Python programs can modify [`sys.path`](https://docs.python.org/3.9/library/sys.html#sys.path). The directory containing the script being run is placed at the beginning of the search path, ahead of the standard library path. This means that scripts in that directory will be loaded instead of modules of the same name in the library directory. This is an error unless the replacement is intended. See section [Standard Modules](https://docs.python.org/3.9/tutorial/modules.html#tut-standardmodules) for more information.

**6.1.3. “Compiled” Python files**

To speed up loading modules, Python caches the compiled version of each module in the `__pycache__` directory under the name `module.`_`version`_`.pyc`, where the version encodes the format of the compiled file; it generally contains the Python version number. For example, in CPython release 3.3 the compiled version of spam.py would be cached as `__pycache__/spam.cpython-33.pyc`. This naming convention allows compiled modules from different releases and different versions of Python to coexist.

Python checks the modification date of the source against the compiled version to see if it’s out of date and needs to be recompiled. This is a completely automatic process. Also, the compiled modules are platform-independent, so the same library can be shared among systems with different architectures.

Python does not check the cache in two circumstances. First, it always recompiles and does not store the result for the module that’s loaded directly from the command line. Second, it does not check the cache if there is no source module. To support a non-source \(compiled only\) distribution, the compiled module must be in the source directory, and there must not be a source module.

Some tips for experts:

* You can use the [`-O`](https://docs.python.org/3.9/using/cmdline.html#cmdoption-o) or [`-OO`](https://docs.python.org/3.9/using/cmdline.html#cmdoption-oo) switches on the Python command to reduce the size of a compiled module. The `-O` switch removes assert statements, the `-OO` switch removes both assert statements and \_\_doc\_\_ strings. Since some programs may rely on having these available, you should only use this option if you know what you’re doing. “Optimized” modules have an `opt-` tag and are usually smaller. Future releases may change the effects of optimization.
* A program doesn’t run any faster when it is read from a `.pyc` file than when it is read from a `.py` file; the only thing that’s faster about `.pyc` files is the speed with which they are loaded.
* The module [`compileall`](https://docs.python.org/3.9/library/compileall.html#module-compileall) can create .pyc files for all modules in a directory.
* There is more detail on this process, including a flow chart of the decisions, in [**PEP 3147**](https://www.python.org/dev/peps/pep-3147).

#### 6.2. Standard Modules

Python comes with a library of standard modules, described in a separate document, the Python Library Reference \(“Library Reference” hereafter\). Some modules are built into the interpreter; these provide access to operations that are not part of the core of the language but are nevertheless built in, either for efficiency or to provide access to operating system primitives such as system calls. The set of such modules is a configuration option which also depends on the underlying platform. For example, the [`winreg`](https://docs.python.org/3.9/library/winreg.html#module-winreg) module is only provided on Windows systems. One particular module deserves some attention: [`sys`](https://docs.python.org/3.9/library/sys.html#module-sys), which is built into every Python interpreter. The variables `sys.ps1` and `sys.ps2` define the strings used as primary and secondary prompts:&gt;&gt;&gt;

```python
>>> import sys
>>> sys.ps1
'>>> '
>>> sys.ps2
'... '
>>> sys.ps1 = 'C> '
C> print('Yuck!')
Yuck!
C>
```

These two variables are only defined if the interpreter is in interactive mode.

The variable `sys.path` is a list of strings that determines the interpreter’s search path for modules. It is initialized to a default path taken from the environment variable [`PYTHONPATH`](https://docs.python.org/3.9/using/cmdline.html#envvar-PYTHONPATH), or from a built-in default if [`PYTHONPATH`](https://docs.python.org/3.9/using/cmdline.html#envvar-PYTHONPATH) is not set. You can modify it using standard list operations:&gt;&gt;&gt;

```python
>>> import sys
>>> sys.path.append('/ufs/guido/lib/python')
```

#### 6.3. The [`dir()`](https://docs.python.org/3.9/library/functions.html#dir) Function

The built-in function [`dir()`](https://docs.python.org/3.9/library/functions.html#dir) is used to find out which names a module defines. It returns a sorted list of strings:&gt;&gt;&gt;

```python
>>> import fibo, sys
>>> dir(fibo)
['__name__', 'fib', 'fib2']
>>> dir(sys)  
['__breakpointhook__', '__displayhook__', '__doc__', '__excepthook__',
 '__interactivehook__', '__loader__', '__name__', '__package__', '__spec__',
 '__stderr__', '__stdin__', '__stdout__', '__unraisablehook__',
 '_clear_type_cache', '_current_frames', '_debugmallocstats', '_framework',
 '_getframe', '_git', '_home', '_xoptions', 'abiflags', 'addaudithook',
 'api_version', 'argv', 'audit', 'base_exec_prefix', 'base_prefix',
 'breakpointhook', 'builtin_module_names', 'byteorder', 'call_tracing',
 'callstats', 'copyright', 'displayhook', 'dont_write_bytecode', 'exc_info',
 'excepthook', 'exec_prefix', 'executable', 'exit', 'flags', 'float_info',
 'float_repr_style', 'get_asyncgen_hooks', 'get_coroutine_origin_tracking_depth',
 'getallocatedblocks', 'getdefaultencoding', 'getdlopenflags',
 'getfilesystemencodeerrors', 'getfilesystemencoding', 'getprofile',
 'getrecursionlimit', 'getrefcount', 'getsizeof', 'getswitchinterval',
 'gettrace', 'hash_info', 'hexversion', 'implementation', 'int_info',
 'intern', 'is_finalizing', 'last_traceback', 'last_type', 'last_value',
 'maxsize', 'maxunicode', 'meta_path', 'modules', 'path', 'path_hooks',
 'path_importer_cache', 'platform', 'prefix', 'ps1', 'ps2', 'pycache_prefix',
 'set_asyncgen_hooks', 'set_coroutine_origin_tracking_depth', 'setdlopenflags',
 'setprofile', 'setrecursionlimit', 'setswitchinterval', 'settrace', 'stderr',
 'stdin', 'stdout', 'thread_info', 'unraisablehook', 'version', 'version_info',
 'warnoptions']
```

Without arguments, [`dir()`](https://docs.python.org/3.9/library/functions.html#dir) lists the names you have defined currently:&gt;&gt;&gt;

```python
>>> a = [1, 2, 3, 4, 5]
>>> import fibo
>>> fib = fibo.fib
>>> dir()
['__builtins__', '__name__', 'a', 'fib', 'fibo', 'sys']
```

Note that it lists all types of names: variables, modules, functions, etc.

[`dir()`](https://docs.python.org/3.9/library/functions.html#dir) does not list the names of built-in functions and variables. If you want a list of those, they are defined in the standard module [`builtins`](https://docs.python.org/3.9/library/builtins.html#module-builtins):&gt;&gt;&gt;

```python
>>> import builtins
>>> dir(builtins)  
['ArithmeticError', 'AssertionError', 'AttributeError', 'BaseException',
 'BlockingIOError', 'BrokenPipeError', 'BufferError', 'BytesWarning',
 'ChildProcessError', 'ConnectionAbortedError', 'ConnectionError',
 'ConnectionRefusedError', 'ConnectionResetError', 'DeprecationWarning',
 'EOFError', 'Ellipsis', 'EnvironmentError', 'Exception', 'False',
 'FileExistsError', 'FileNotFoundError', 'FloatingPointError',
 'FutureWarning', 'GeneratorExit', 'IOError', 'ImportError',
 'ImportWarning', 'IndentationError', 'IndexError', 'InterruptedError',
 'IsADirectoryError', 'KeyError', 'KeyboardInterrupt', 'LookupError',
 'MemoryError', 'NameError', 'None', 'NotADirectoryError', 'NotImplemented',
 'NotImplementedError', 'OSError', 'OverflowError',
 'PendingDeprecationWarning', 'PermissionError', 'ProcessLookupError',
 'ReferenceError', 'ResourceWarning', 'RuntimeError', 'RuntimeWarning',
 'StopIteration', 'SyntaxError', 'SyntaxWarning', 'SystemError',
 'SystemExit', 'TabError', 'TimeoutError', 'True', 'TypeError',
 'UnboundLocalError', 'UnicodeDecodeError', 'UnicodeEncodeError',
 'UnicodeError', 'UnicodeTranslateError', 'UnicodeWarning', 'UserWarning',
 'ValueError', 'Warning', 'ZeroDivisionError', '_', '__build_class__',
 '__debug__', '__doc__', '__import__', '__name__', '__package__', 'abs',
 'all', 'any', 'ascii', 'bin', 'bool', 'bytearray', 'bytes', 'callable',
 'chr', 'classmethod', 'compile', 'complex', 'copyright', 'credits',
 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec', 'exit',
 'filter', 'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr',
 'hash', 'help', 'hex', 'id', 'input', 'int', 'isinstance', 'issubclass',
 'iter', 'len', 'license', 'list', 'locals', 'map', 'max', 'memoryview',
 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property',
 'quit', 'range', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice',
 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars',
 'zip']
```

#### 6.4. Packages

Packages are a way of structuring Python’s module namespace by using “dotted module names”. For example, the module name `A.B` designates a submodule named `B` in a package named `A`. Just like the use of modules saves the authors of different modules from having to worry about each other’s global variable names, the use of dotted module names saves the authors of multi-module packages like NumPy or Pillow from having to worry about each other’s module names.

Suppose you want to design a collection of modules \(a “package”\) for the uniform handling of sound files and sound data. There are many different sound file formats \(usually recognized by their extension, for example: `.wav`, `.aiff`, `.au`\), so you may need to create and maintain a growing collection of modules for the conversion between the various file formats. There are also many different operations you might want to perform on sound data \(such as mixing, adding echo, applying an equalizer function, creating an artificial stereo effect\), so in addition you will be writing a never-ending stream of modules to perform these operations. Here’s a possible structure for your package \(expressed in terms of a hierarchical filesystem\):

```python
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

When importing the package, Python searches through the directories on `sys.path` looking for the package subdirectory.

The `__init__.py` files are required to make Python treat directories containing the file as packages. This prevents directories with a common name, such as `string`, unintentionally hiding valid modules that occur later on the module search path. In the simplest case, `__init__.py` can just be an empty file, but it can also execute initialization code for the package or set the `__all__` variable, described later.

Users of the package can import individual modules from the package, for example:

```python
import sound.effects.echo
```

This loads the submodule `sound.effects.echo`. It must be referenced with its full name.

```python
sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)
```

An alternative way of importing the submodule is:

```python
from sound.effects import echo
```

This also loads the submodule `echo`, and makes it available without its package prefix, so it can be used as follows:

```python
echo.echofilter(input, output, delay=0.7, atten=4)
```

Yet another variation is to import the desired function or variable directly:

```python
from sound.effects.echo import echofilter
```

Again, this loads the submodule `echo`, but this makes its function `echofilter()` directly available:

```python
echofilter(input, output, delay=0.7, atten=4)
```

Note that when using `from package import item`, the item can be either a submodule \(or subpackage\) of the package, or some other name defined in the package, like a function, class or variable. The `import` statement first tests whether the item is defined in the package; if not, it assumes it is a module and attempts to load it. If it fails to find it, an [`ImportError`](https://docs.python.org/3.9/library/exceptions.html#ImportError) exception is raised.

Contrarily, when using syntax like `import item.subitem.subsubitem`, each item except for the last must be a package; the last item can be a module or a package but can’t be a class or function or variable defined in the previous item.

**6.4.1. Importing \* From a Package**

Now what happens when the user writes `from sound.effects import *`? Ideally, one would hope that this somehow goes out to the filesystem, finds which submodules are present in the package, and imports them all. This could take a long time and importing sub-modules might have unwanted side-effects that should only happen when the sub-module is explicitly imported.

The only solution is for the package author to provide an explicit index of the package. The [`import`](https://docs.python.org/3.9/reference/simple_stmts.html#import) statement uses the following convention: if a package’s `__init__.py` code defines a list named `__all__`, it is taken to be the list of module names that should be imported when `from package import *` is encountered. It is up to the package author to keep this list up-to-date when a new version of the package is released. Package authors may also decide not to support it, if they don’t see a use for importing \* from their package. For example, the file `sound/effects/__init__.py` could contain the following code:

```python
__all__ = ["echo", "surround", "reverse"]
```

This would mean that `from sound.effects import *` would import the three named submodules of the `sound` package.

If `__all__` is not defined, the statement `from sound.effects import *` does _not_ import all submodules from the package `sound.effects` into the current namespace; it only ensures that the package `sound.effects` has been imported \(possibly running any initialization code in `__init__.py`\) and then imports whatever names are defined in the package. This includes any names defined \(and submodules explicitly loaded\) by `__init__.py`. It also includes any submodules of the package that were explicitly loaded by previous [`import`](https://docs.python.org/3.9/reference/simple_stmts.html#import) statements. Consider this code:

```python
import sound.effects.echo
import sound.effects.surround
from sound.effects import *
```

In this example, the `echo` and `surround` modules are imported in the current namespace because they are defined in the `sound.effects` package when the `from...import` statement is executed. \(This also works when `__all__` is defined.\)

Although certain modules are designed to export only names that follow certain patterns when you use `import *`, it is still considered bad practice in production code.

Remember, there is nothing wrong with using `from package import specific_submodule`! In fact, this is the recommended notation unless the importing module needs to use submodules with the same name from different packages.

**6.4.2. Intra-package References**

When packages are structured into subpackages \(as with the `sound` package in the example\), you can use absolute imports to refer to submodules of siblings packages. For example, if the module `sound.filters.vocoder` needs to use the `echo` module in the `sound.effects` package, it can use `from sound.effects import echo`.

You can also write relative imports, with the `from module import name` form of import statement. These imports use leading dots to indicate the current and parent packages involved in the relative import. From the `surround` module for example, you might use:

```python
from . import echo
from .. import formats
from ..filters import equalizer
```

Note that relative imports are based on the name of the current module. Since the name of the main module is always `"__main__"`, modules intended for use as the main module of a Python application must always use absolute imports.

**6.4.3. Packages in Multiple Directories**

Packages support one more special attribute, [`__path__`](https://docs.python.org/3.9/reference/import.html#__path__). This is initialized to be a list containing the name of the directory holding the package’s `__init__.py` before the code in that file is executed. This variable can be modified; doing so affects future searches for modules and subpackages contained in the package.

While this feature is not often needed, it can be used to extend the set of modules found in a package.

