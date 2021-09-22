
## Table of Contents


###### The None value

###### Boolean values

###### Truthiness

###### Number values

###### Integer

###### Float

###### Type casting

###### Arithmetic Operators

###### String values

###### Length

###### Indexing

###### String Functions

###### index

###### count

###### Concatenation

###### Formatting

###### Useful string methods

###### Variables

###### Duck typing

###### Assignment

###### Comparison operators

###### Assignment operators

###### Flow-control statements: if, while, for

```
if-elif-else
for
```
###### while , break and continue

###### Functions

###### Lambdas

###### Errors


###### Functions

###### variable length positional arguments

###### variable length keyword arguments

###### Lists

###### Dictionaries

###### Sets

###### Tuples

###### Ranges

###### Built-in functions: filter, map, sorted, enumerate, zip, len, max, min, sum, any, all, dir

###### filter

###### map

###### sorted

###### enumerate

###### zip

###### len

###### max

###### min

###### sum

###### any

###### all

###### dir

###### Importing packages and modules


###### Classes, methods, and properties

###### JavaScript to Python Classes cheat table

###### List comprehensions


## The None value

###### This is the same as null in javaScript. It represents the lack of existence

###### of a value. You must type it None with a capital letter.

###### Functions that do not return an explicit value, return None by default.

```
def print_hello (name):
"""
This is a function which prints hello to a user, but does not
return anything.
"""
print(f"Hello, {name}")
```
```
value = print_hello('Bob') # value will be `None`
```
## Boolean values

###### These work the same as in JavaScript, but you must capitalize True and False.

```
a = True
b = False
```
```
c = true # This will try to use a variable named `true`!
d = false # This will try to use a variable named `false`!
```

###### The logical operators in Python read like English

###### Javascript Python

###### && and

###### || or

###### ! not

```
# Logical AND
print(True and True) # => True
print(True and False) # => False
print(False and False) # => False
```
```
# Logical OR
print(True or True) # => True
print(True or False) # => True
print(False or False) # => False
```
```
# Logical NOT
print( not True) # => False
print( not False and True) # => True
print( not True or False) # => False
```
#### Truthiness

###### Everything is True unless it's one of these:

```
None
False
''
[]
()
set()
range(0)
```
### Number values

#### Integer

```
print( 3 ) # => 3
print(int( 19 )) # => 19
print(int()) # => 0
```
#### Float

```
print(2.24) # => 2.
print(2.) # => 2.
print(float()) # => 0.
print(27e-5) # => 0.
```
#### Type casting

###### You can convert (cast) numbers in python from one number type to another number

###### type.

```
# Integer to Float
print( 17 ) # => 17
print(float( 17 )) # => 17.
```
```
# Float to integer
print(17.0) # => 17.
print(int(17.0)) # => 17
```
```
# Float and integer to string
print(str(17.0) + ' and ' + str( 17 )) # => 17.0 and 17
```
###### Python does not automatically convert types like JavaScript does.

###### So this is an error

```
print(17.0 + ' and ' + 17 )
# TypeError: unsupported operand type(s) for +: 'float' and 'str'
```
#### Arithmetic Operators

###### Operator JavaScript Python

###### addition + +

###### subtraction - -

###### multiplication * *

###### division / /

###### modulo % %

###### exponent Math.pow() **

###### integer division //


###### There is no ++ or -- in Python.

### String values

###### You can use both ' and " for strings and escaping works the same as it does

###### in JavaScript

```
# Escaping single quote
'Jodi asked, "What\'s up, Sam?"'
```
###### Triple quotes ''' can be used for multiline strings.

```
print('''My instructions are very long so to make them
more readable in the code I am putting them on
more than one line. I can even include "quotes"
of any kind because they won't get confused with
the end of the string!''')
```
###### Both ''' and """ work for these, but convention is to reserve """ for

###### multiline comments and function docstrings.

```
def print_hello (name):
"""
This is a docstring that explains what the function does
It can be multiple lines, handy!
You can use any combination of ' and " in these because
python is looking for the ending triple " characters
to determine the end.
"""
print(f"Hello, {name}")
```
#### Length

```
print(len("Spaghetti")) # => 9
```
#### Indexing

```
# Normal indexing
print("Spaghetti"[ 0 ]) # => S
print("Spaghetti"[ 4 ]) # => h
```
```
# You can use negative indexes to start at the end.
print("Spaghetti"[-1]) # => i
print("Spaghetti"[-4]) # => e
```
```
# return a series of characters
print("Spaghetti"[ 1 : 4 ]) # => pag
print("Spaghetti"[ 4 :-1]) # => hett
print("Spaghetti"[ 4 : 4 ]) # => (empty string)
print("Spaghetti"[: 4 ]) # => Spag
print("Spaghetti"[:-1]) # => Spaghett
print("Spaghetti"[ 1 :]) # => paghetti
print("Spaghetti"[-4:]) # => etti
```
```
# indexing past the beginning or end gives an error
print("Spaghetti"[ 15 ]) # => IndexError: string index out of range
print("Spaghetti"[-15]) # => IndexError: string index out of range
```
```
# but ranges past the beginning or end do not.
print("Spaghetti"[: 15 ]) # => Spaghetti
print("Spaghetti"[ 15 :]) # => (empty string)
print("Spaghetti"[-15:]) # => Spaghetti
print("Spaghetti"[:-15]) # => (empty string)
print("Spaghetti"[ 15 : 20 ]) # => (empty string)
```
#### String Functions

###### index

###### Similar to JavaScript's indexOf function

```
print("Spaghetti".index("h")) # => 4
print("Spaghetti".index("t")) # => 6
```
###### count

###### counts how many times a substring appears in a string

```
print("Spaghetti".count("h")) # => 1
print("Spaghetti".count("t")) # => 2
print("Spaghetti".count("s")) # => 0
print('''We choose to go to the moon in this decade and do the other things,
not because they are easy, but because they are hard, because that goal will
serve to organize and measure the best of our energies and skills, because that
challenge is one that we are willing to accept, one we are unwilling to
postpone, and one which we intend to win, and the others, too.
'''.count('the ')) # => 4
```
#### Concatenation

###### You can use the + operator just like in JavaScript

```
print("gold" + "fish") # => goldfish
```

###### You can use the * operator to repeat a string a given number of times

```
print("s"* 5 ) # => sssss
```
#### Formatting

```
first_name = "Billy"
last_name = "Bob"
# Using the format function
print('Your name is {0} {1}'.format(first_name, last_name)) # => Your name is Billy Bob
# Using the `f` format flag on the string
print(f'Your name is {first_name} {last_name}') # => Your name is Billy Bob
```
#### Useful string methods

###### Value Method Result

```
s = "Hello" s.upper() "HELLO"
```
```
s = "Hello" s.lower() "hello"
```
```
s = "Hello" s.islower() False
```
```
s = "hello" s.islower() True
```
```
s = "Hello" s.isupper() False
```
```
s = "HELLO" s.isupper() True
```
```
s = "Hello" s.startswith("He") True
```
```
s = "Hello" s.endswith("lo") True
```
```
s = "Hello World" s.split() ["Hello", "World"]
```
```
s = "i-am-a-dog" s.split("-") ["i", "am", "a", "dog"]
```
###### Method Purpose

###### isalpha() returns True if the string consists only of letters and is not blank.

###### isalnum() returns True if the string consists only of letters and numbers and is not blank.

###### isdecimal() returns True if the string consists only of numeric characters and is not blank.

###### isspace() returns True if the string consists only of spaces, tabs, and newlines and is not blank.

###### istitle() returns True if the string consists only of words that begin with an uppercase letter followed by only lowercase letters.

### Variables

#### Duck typing

###### If it looks like a duck and quacks like a duck, then it must be a duck.

#### Assignment

###### Just like JavaScript, but there are no special keywords. Scope is block scoped, much like let in JavaScript. You can also reassign variables

###### just like let.

```
a = 7
b = 'Marbles'
print(a) # => 7
print(b) # => Marbles
```
```
# You can do assignment chaining
count = max = min = 0
print(count) # => 0
print(max) # => 0
print(min) # => 0
```
### Comparison operators

###### Python uses these same equality operators as JavaScript.

###### > (greater than)

###### < (less than)

###### >= (greater than or equal to)

###### <= (less than or equal to)

###### == (equal to)

###### != (not equal to)

###### Precendence in Python:

###### Negative signs ( not ) are applied first (part of each number)

###### Multiplication and division ( and ) happen next

###### Addition and subtraction ( or ) are the last step

###### Be careful using not along with ==


```
print( not a == b) # => True
# This breaks
print(a == not b) # Syntax Error
# This fixes it
print (a == ( not b)) # => False
```
###### Python does short-circuit evaluation

###### Expression Right side evaluated?

###### True and ... Yes

###### False and ... No

###### True or ... No

###### False or ... Yes

### Assignment operators

###### = is the normal assignment operator.

###### Python includes these assignment operators as well

```
+=
-=
*=
/=
%=
**=
//=
```
### Flow-control statements: if, while, for

##### if-elif-else

```
if name == 'Monica':
print('Hi, Monica.')
elif age < 12 :
print('You are not Monica, kiddo.')
else :
print('You are neither Monica nor a little kid.')
```
##### for

```
# Looping over a string
for c in "abcdefg":
print(c)
```
```
# Looping over a range
print('My name is')
for i in range( 5 ):
print('Carlita Cinco (' + str(i) + ')')
```
```
# Looping over a list
lst = [ 0 , 1 , 2 , 3 ]
for i in lst:
print(i)
```
```
# Looping over a dictionary
spam = {'color': 'red', 'age': 42 }
for v in spam.values():
print(v)
```
```
# Loop over a list of tuples and
# Destructuring to values
# Assuming spam.items returns a list of tuples
# Each containing two values (k, v)
for k, v in spam.items():
print('Key: ' + k + ' Value: ' + str(v))
```
#### while , break and continue

###### while loop as long as the condition is True.

###### break allows you to break out of the loop.

###### continue skips this iteration of the loop and goes to the next iteration.

```
spam = 0
while True:
print('Hello, world.')
spam = spam + 1
if spam < 5 :
continue
break
```
### Functions

###### You use the def keyword to define a function in Python.

```
# Basic function with no arguments and no return value
def printCopyright ():
print("Copyright 2020. Me, myself and I. All rights reserved.")
```
```
# Function with positional parameters and a return value
```

```
def average (num1, num2):
return (num1/num2)
```
```
# Calling it with positional arguments
print(average( 6 , 2 )) # => 3.
```
```
# Calling it with keyword arguments
# (note that order doesn't matter)
print(average(num2= 2 , num1= 6 ));
```
```
# Default parameters
# Here the string "Hello" is the default for `saying`
def greeting (name, saying="Hello"):
print(saying, name)
```
```
greeting("Monica") # => Hello Monica
```
```
greeting("Monica", saying="Hi") # => Hi Monica
```
```
# A common 'gotcha' is using an mutable object for a default parameter.
# Python doesn't do what you expect. All invocations of the function
# reference the same mutable object
```
```
# Everytime we call this we use the exact same `itemList` list
def appendItem (itemName, itemList = []):
itemList.append(itemName)
return itemList
print(appendItem('notebook')) # => ['notebook']
print(appendItem('pencil')) # => ['notebook', 'pencil']
print(appendItem('eraser')) # => ['notebook', 'pencil', 'eraser']
```
#### Lambdas

###### In python we have anonymous functions called lambdas, but they are only

###### a single python statement.

```
toUpper = lambda s: s.upper()
```
```
toUpper('hello') # => HELLO
```
###### is the same as this in JavaScript

```
const toUpper = s => s.toUpperCase();
toUpper('hello'); // # => HELLO
```
#### Errors

###### Unlike JavaScript, if you pass the wrong number of arguments to a function

###### it will throw an error.

```
average( 1 )
# => TypeError: average() missing 1 required positional argument: 'num2'
```
```
average( 1 , 2 , 3 )
# => TypeError: average() takes 2 positional arguments but 3 were given
```
## Python Learning Objectives (Day 2)

### Functions

###### * - Get the rest of the position arguments as a tuple

###### ** - Get the rest of the keyword arguments as a dictionary

#### variable length positional arguments

```
def add (a, b, *args):
# args is a tuple of the rest of the arguments
total = a + b;
for n in args:
total += n
return total
```
```
# args is None
add( 1 , 2 ) # Returns 3
```
```
# args is (4, 5)
add( 2 , 3 , 4 , 5 ) # Returns 14
```
#### variable length keyword arguments

```
def print_names_and_countries (greeting, **kwargs):
# kwargs is a dictionary of the rest of the keyword arguments
for k, v in kwargs.items():
print(greeting, k, "from", v)
```
```
# kwargs would be:
# {
# 'Monica': 'Sweden',
# 'Charles'='British Virgin Islands',
# 'Carlo':'Portugal
# }
print_names_and_countries("Hi",
Monica="Sweden",
Charles="British Virgin Islands",
Carlo="Portugal")
# Prints
# Hi Monica from Sweden
# Hi Charles from British Virgin Islands
# Hi Carlo from Portugal
```

###### You can combine all of these together

```
def example2 (arg_1, arg_2, *args, kw_1="shark", kw_2="blowfish", **kwargs):
pass
```
### Lists

###### Lists are mutable arrays.

```
# Can be made with square brackets
empty_list = []
departments = ['HR','Development','Sales','Finance','IT','Customer Support']
```
```
# list built-in function makes a list too
specials = list()
```
```
# You can use `in` to test if something is in the list
print( 1 in [ 1 , 2 , 3 ]) #> True
print( 4 in [ 1 , 2 , 3 ]) #> False
```
### Dictionaries

###### Dictionaries are similar to JavaScript POJOs or Map. They have key value pairs.

```
# With curlies
a = {'one': 1 , 'two': 2 , 'three': 3 }
# With the dict built-in function
b = dict(one= 1 , two= 2 , three= 3 )
```
```
# You can use the `in` operator with dictionaries too
print( 1 in { 1 : "one", 2 : "two"}) #> True
print("1" in { 1 : "one", 2 : "two"}) #> False
print( 4 in { 1 : "one", 2 : "two"}) #> False
```
### Sets

###### Just like JavaScript's Set , it is an unordered collection of distinct objects.

```
# Using curlies (dont' confuse this with dictionaries)
school_bag = {'book','paper','pencil','pencil','book','book','book','eraser'}
```
```
# Using the set() built in
school_bag = set('book','paper','pencil','pencil','book','book','book','eraser')
```
```
# You can use the `in` operator with sets
print( 1 in { 1 , 1 , 2 , 3 }) #> True
print( 4 in { 1 , 1 , 2 , 3 }) #> False
```
### Tuples

###### Tuples are immutable lists of items.

```
# With parenthesis
time_blocks = ('AM','PM')
```
```
# Without parenthesis
colors = 'red','blue','green'
numbers = 1 , 2 , 3
```
```
# with the tuple buit-in function which can also be used to
# convert things to tuples
tuple('abc') # returns ('a', 'b', 'c')
tuple([ 1 , 2 , 3 ]) # returns (1, 2, 3)
```
```
# you can use the `in` operator with tuples
print( 1 in ( 1 , 2 , 3 )) #> True
print( 4 in ( 1 , 2 , 3 )) #> False
```
### Ranges

###### A range is simply a list of numbers in order which can't be changed

###### (immutable). Ranges are often used with for loops.

###### A range is declared using one to three parameters

###### start - optional (  0  if not supplied) - first number in the sequence

###### stop - required - next number past the last number in the sequence

###### step - optional (  1  if not supplied) - the difference between each number in

###### the sequence

###### For example

```
range( 5 ) # [0, 1, 2, 3, 4]
range( 1 , 5 ) # [1, 2, 3, 4]
range( 0 , 25 , 5 ) # [0, 5, 10, 15, 20]
range( 0 ) # [ ]
```
### Built-in functions: filter, map, sorted, enumerate, zip, len, max, min, sum, any, all, dir

#### filter


```
def isOdd (num):
return num % 2
filtered = filter(isOdd, [ 1 , 2 , 3 , 4 ])
# It returns a filter iterable object
# but we can cast it to a list
print(list(filtered)) # => [1, 3]
```
#### map

```
def toUpper (str):
return str.upper()
```
```
upperCased = map(toUpper, ['a','b','c'])
```
```
print(list(upperCased)) # => ['A','B','C']
```
#### sorted

```
sortedItems = sorted(['Banana', 'orange', 'apple'])
print(list(sortedItems)) # => ['Banana', 'apple', 'orange']
```
```
# Notice Banana is first because uppercase letters come first
```
```
# Using a key function to control the sorting and make it sort
# so the case doesn't matter
sortedItems = sorted(['Banana', 'orange', 'apple'], key=str.lower)
print(list(sortedItems)) # => ['apple', 'Banana', 'orange']
```
```
# Reversing the sort
sortedItems = sorted(['Banana', 'orange', 'apple'], key=str.lower, reverse=True)
print(list(sortedItems)) # => ['orange', 'Banana', 'apple']
```
#### enumerate

```
quarters = ['First', 'Second', 'Third', 'Fourth']
print(enumerate(quarters))
print(enumerate(quarters, start= 1 ))
```
```
( 0 , 'First'), ( 1 , 'Second'), ( 2 , 'Third'), ( 3 , 'Fourth')
( 1 , 'First'), ( 2 , 'Second'), ( 3 , 'Third'), ( 4 , 'Fourth')
```
#### zip

```
keys = ("Name", "Email")
values = ("Bob", "Bob@bob.com")
```
```
zipped = zip(keys, values)
```
```
print(list(zipped))
# => [('Name', 'Bob'), ('Email', 'Bob@bob.com')]
```
```
# You can zip more than two
x_coords = [ 0 , 1 , 2 , 3 , 4 ]
y_coords = [ 2 , 3 , 5 , 3 , 5 ]
z_coords = [ 3 , 5 , 2 , 1 , 4 ]
```
```
coords = zip(x_coords, y_coords, z_coords)
```
```
print(list(coords))
# => [(0, 2, 3), (1, 3, 5), (2, 5, 2), (3, 3, 1), (4, 5, 4)]
```
#### len

```
len([ 1 , 2 , 3 ]) # => 3
len(( 1 , 2 , 3 )) # => 3
len({
'Name': 'Bob',
'Email': 'bob@bob.com'
}) # => 2
```
###### Can also work on any object which contains a __len__ method.

#### max

```
max( 1 , 4 , 6 , 2 ) # => 6
max([ 1 , 4 , 6 , 2 ]) # => 6
```
#### min

```
min( 1 , 4 , 6 , 2 ) # => 1
min([ 1 , 4 , 6 , 2 ]) # => 1
```
#### sum

```
sum([ 1 , 2 , 3 ]) # => 6
```
#### any


```
any([True, False, False]) # => True
any([False, False, False]) # => False
```
#### all

```
any([True, False, False]) # => False
any([True, True, True]) # => False
```
#### dir

###### Returns all the attributes of an object including it's methods and dunder methods

```
user = {
'Name': 'Bob',
'Email': 'bob@bob.com'
}
```
```
dir(user)
```
```
# => ['__class__', '__contains__', '__delattr__', '__delitem__', '__dir__',
# '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__',
# '__getitem__', '__gt__', '__hash__', '__init__', '__init_subclass__',
# '__iter__', '__le__', '__len__', '__lt__', '__ne__', '__new__',
# '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__setattr__',
# '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'clear', 'copy',
# 'fromkeys', 'get', 'items', 'keys', 'pop', 'popitem', 'setdefault',
# 'update', 'values']
```
### Importing packages and modules

###### Module - Python code in a file or directory

###### Package - A module which is a directory containing a __init__.py file.

###### submodule - A module which is contained within a package

###### name - an exported function, class or variable in a module

###### Unlike JavaScript, modules export ALL names contained within them without any

###### special export keywords

###### Assuming we have the following package with four submodules

```
math
| __init.py
| addition.py
| subtraction.py
| multiplication.py
| division.py
```
###### if we peek into the addition.py file we see there's an add function

```
# addition.py
# We can import `add` from other places because it's a `name` and is
# AUTOMATICALLY exported
def add (num1, num2):
return num1 + num
```
###### Our __init__.py has the following lines:

```
# This imports the `add` function
# and now it's also re-exported in here as well!
from .addition import add
# These import and re-export the rest of the functions from the sub modules
from .subtraction import subtract
from .division import divide
from .multiplication import multiply
```
###### Remember any names that exist within a module are automatically exported.

###### Notice the. syntax because this package can import it's own submodules.

###### So if we have a script.py , and we want to import the add function, we could do it lots of different ways

```
# This will load and execute the `math/__init__.py` file
# and give us an object with the exported names in `math/__init.py__`
import math
```
```
print(math.add( 1 , 2 )) # => 3
```
```
# This imports JUST the add from `math/__init__.py`
from math import add
```
```
print(add( 1 , 2 )) # => 3
```
```
# This skips importing from `math/__init__.py` (although it still runs)
# and imports directly from the addition.py file
from math.addition import add
```
```
print(add( 1 , 2 )) # => 3
```

```
# this imports all the functions individually from `math/__init.py`
from math import add, subtract, multiply, divide
```
```
print(add( 1 , 2 )) # => 3
print(subtract( 2 , 1 )) # => 1
```
```
# This imports `add` and renames it to `addSomeNumbers`
from math import add as addSomeNumbers
```
```
print(addSomeNumbers( 1 , 2 )) # => 3
```
## Python Learning Objectives (Day 3)

### Classes, methods, and properties

```
class AngryBird :
# Slots optimize property access and memory usage
# and prevent you from arbitrarily assigning new properties to the instance
__slots__ = ['_x', '_y']
```
```
# constructor
def __init__ (self, x= 0 , y= 0 ):
# Doc string
"""
Construct a new AngryBird by setting its position to (0, 0).
"""
## Instance variables
self._x = x
self._y = y
```
```
# Instance method
def move_up_by (self, delta):
self._y += delta
```
```
# Getter
@property
def x (self):
return self._x
```
```
# Setter
@x.setter
def x (self, value):
if value < 0 :
value = 0
self._x = value
```
```
@property
def y (self):
return self._y
```
```
@y.setter
def y (self, new_y):
self._y = new_y
```
```
# Dunder Repr... called by `print`
def __repr__ (self):
return f"<AngryBird ({self._x}, {self._y})>"
```
#### JavaScript to Python Classes cheat table

###### Javascript Python

###### Constructor constructor() def __init__(self):

###### Super Constructor super() super().__init__()

###### Instance properties this.property self.property

###### Calling Instance Methods this.method() self.method()

###### Defining Instance Methods method(arg1, arg2) {} def method(self, arg1, arg2):

###### Getter get someProperty() {} @property

###### Setter set someProperty() {} @someProperty.setter

### List comprehensions

###### List comprehensions are a way to transform a list from one format to another.

###### They are a Pythonic alternative to using map or filter.

###### Syntax of a list comprehension:

newList = [value loop condition]

###### Using a for loop

```
squares = []
for i in range( 10 ):
squares.append(i** 2 )
```
```
print(squares)
# Prints [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```
###### You can change it to a list comprehension


```
# value = i ** 2
# loop = for i in range(10)
squares = [i** 2 for i in range( 10 )]
```
```
print(list(squares))
# Prints [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```
###### They can be used with a condition to do what filter does

```
sentence = 'the rocket came back from mars'
vowels = [character for character in sentence if character in 'aeiou']
```
```
print(vowels)
# Prints ['e', 'o', 'e', 'a', 'e', 'a', 'o', 'a']
```
###### You can also use them on dictionaries. We can use the items() method

###### for the dictionary to loop through it getting the keys and values out at once.

```
person = {
'name': 'Corina',
'age': 32 ,
'height': 1.
}
```
```
# This loops through and capitalizes the first letter of all the keys
newPerson = { key.title(): value for key, value in person.items() }
# Prints {'Name': 'Corina', 'Age': 32, 'Height': 1.4}
```





---
---

# Part 2:


## Table of Contents

##### Python Unit Testing Objectives

##### Use the built-in unittest package to write unit tests

##### Install and use the pytest package to write unit tests

##### Python Environment Management Objectives

##### Describe pip

##### Describe virtualenv

##### Demonstrate how to use pipenv to initialize a project and install dependencies

##### Demonstrate how to run a Python program using pipenv using its shell

##### Demonstrate how to run a Python program using pipenv using the run command

##### Describe how modules and packages are found and loaded from import statements

##### First some definitions:

##### Python Path

##### Exporting

##### The Rules

##### Using the import statement

##### Using the python command line interpreter

##### Documentation on import

##### Describe the purpose of and when init .py runs

##### Describe the purpose of and when main .py runs

##### Flask Objectives

##### Setup a new Flask project

##### Run a simple Flask web application on your computer

##### Utilize basic configuration on a Flask project

##### Create a static route in Flask

##### Create a parameterized route in Flask

##### Use decorators run code before and after requests

##### Identify the "static" route

##### Use WTForms to define and render forms in Flask

##### Use WTForms to validate data in a POST with the built-in validators

##### CSRF

##### Use the following basic field types in WTForms

##### Create a Flask Blueprint

##### Register the Flask Blueprint with the Flask application

##### Use the Flask Blueprint to make routes

##### Configure and use sessions in Flask

##### Use a Jinja template as return for a Flask route with render_template

##### Add variables to a Jinja template with {{ }}

##### Use include to share template content in Jinja

##### Psycopg Objectives

##### Connect to a PostgreSQL RDBMS using Psycopg

##### Open a "cursor" to perform data operations

##### Use the with keyword to clean up connections and database cursors

##### Use results performed from executing a SELECT statement on existing database entities

##### Use parameterized SQL statements to insert, select, update, and delete data

##### Specify what type Psycopg will convert the following PostgreSQL types into:

##### SQLAlchemy Objectives

##### Describe how to create an "engine" that you will use to connect to a PostgreSQL database instance

##### Describe how the with engine.connect() as connection: block establishes and cleans up a connection to the database

##### Describe how to create a database session from an engine

##### Create a mapping for SQLAlchemy to use to tie together a class and a table in the database

##### Mappings

##### Mappings with plain SQLAlchemy

##### Mappings with Flask-SQLAlchemy

##### Relationships

##### One-to-Many

##### Many-to-Many

##### On backpopulates

##### Add data to the database, both single entities as well as related data

##### Using session with Flask-SQLAlchemy

##### Update data in the database

##### Delete data from the database (including cascades!)

##### Know how to use and specify the "delete-orphan" cascading strategy

##### Describe the purpose of a Query object

##### Use a Session object to query the database using a model

##### With plain SQLAlchemy

##### With Flask SQLAlchemy

##### How to order your results

##### Use the filter method to find just what you want

##### Use instance methods on the Query object to return a list or single item

##### Use the count method to ... count

##### Query objects with criteria on dependant objects

##### Lazily load objects

##### Eagerly load objects

##### Install the Flask-SQLAlchemy extension to use with Flask

##### Configure SQLAlchemy using Flask-SQLAlchemy

##### Use the convenience functions and objects Flask-SQLAlchemy provides you to use in your code

##### Alembic Learning Objectives

##### Install Alembic into your project

##### Configure Alembic to talk to your database and not have silly migration names

##### Add environment variable to env.py

##### Making better migration file names

##### Control Alembic's ability to migrate your database

##### Generating a migration (revision)

##### Running a migration (upgrading to a revision)

##### Rolling back a migration (downgrading to a revision)

##### Rolling back all migrations (downgrading to base)

##### Viewing your migration history (revision history)


##### Reason about the way Alembic orders your migrations; and,

##### Handle branching and merging concerns

##### Configuring a Flask application to use Alembic;

##### Run commands to manage your database through the flask command; and,

##### Instead of alembic init...

##### Check the help for the rest of the commands, which are the same as Alembic

##### Autogenerate migrations from your models!

##### Instead of alembic migrate...

## Python Unit Testing Objectives

### Use the built-in unittest package to write unit tests

##### unittest

##### Built in to python

##### Requires that you build a class that inherits from unittest.TestCase

##### test functions must start with test_

##### Has a collection of assertion functions

### Install and use the pytest package to write unit tests

##### pytest

##### Has better output than unittest

##### Just requires a test file full of test methods

##### Can also run unittest based tests

##### Uses python built in assert keyword

## Python Environment Management Objectives

##### pyenv

##### Installs versions of python inside your home directory in a .pyenv folder

##### Allows you to easily switch between python versions with the pyenv global

##### command.

##### Closest Node.JS equivalennt would be nvm

### Describe pip

##### pip

##### Installs Python packages into python's library path folders.

##### Can use a requirements.txt file to install a set of packages.

##### Can be used standalone but we used it mostly by levaraging pipenv which uses

##### it under the hood

##### Closest Node.JS equivalent would be npm install -g

### Describe virtualenv

##### virtualenv

##### Creates a virtual installation of python. Uses symbolic links and adjustments

##### to certain environment variables to isolate python packages from one project

##### to another.

##### Can be used standalone but we used it mostly by leveraging pipenv which uses

##### it under the hood

##### No Node.JS equivalent

### Demonstrate how to use pipenv to initialize a project and install dependencies

##### pipenv

##### Combines pip and virtualenv into one command.

##### Creates a virtual environment using virtualenv

##### Uses pip internally to install packages listed in a Pipfile.

##### Locks packages to specific versions with a Pipfile.lock.

##### Uses an environment variable named PIPENV_VENV_IN_PROJECT. When set to  1 

##### it causes pipenv to create the virtualenv inside your project directory in

##### a folder named .venv instead of in your home directory

##### Will read a .env file and populate the environment variables inside the

```
virtualenv
```
##### Can generate a requirements.txt file for use with regular pip

##### Closest Node.JS equivalent would be npm

### Demonstrate how to run a Python program using pipenv using its shell

```
pipenv shell
```
##### This will start a new shell inside the virtual environment.

##### Then you can run python programs and they will run with the right set of packages and environment variables

```
python someprogram.py
```
##### When you are finished running commands in the virtual environment don't forget

##### to exit the shell by issuing the exit command, or using Control-D.

### Demonstrate how to run a Python program using pipenv using the run command

##### If you just need to run a single command inside the virtual environment

##### you can use the pipenv run command.


```
pipenv run python someprogram.py
```
### Describe how modules and packages are found and loaded from import statements

#### First some definitions:

##### Module : a single .py file or a directory with a __init__.py file can be

##### considered a module

##### Package : a collection of modules and submodules in a directory

##### Submodule : a python module inside a sub directory of a module

#### Python Path

##### The Python Path is a list of directories python looks for modules in.

##### When you import a module, python searches these directories for a file module or directory module (with a init .py file in it) that matches the name you are

##### trying to import.

##### You can inspect the python path from python by printing sys.path

##### You can add directories to the python path by setting the PYTHON_PATH

##### environment variable.

##### Luckily we have tools like virtualenv and pipenv which means we do not have

##### to worry as much about setting the Python path manually.

#### Exporting

##### Inside a python script, any variables, functions or classes are automatically

##### exported and can be imported by name.

##### If you want to control which things get exported from a python module you can

##### set the variable __all__ equal to a list of strings representing the things

##### to export.

#### The Rules

##### Using the import statement

##### When you import a .py file as a module, it searches sys.path for a file with

##### that name and runs that file.

##### When you import a directory as a module, it also searches sys.path for a

##### directory with that name and runs the __init__.py contained in that directory.

##### Using the python command line interpreter

##### When you run a .py file it runs that file

##### When you run a directory it runs __main__.py

##### When you run a directory with the -m option, it searches sys.path for the module and runs both the __init__.py and the __main__.py

##### Most of the time we'll use __init__.py not __main__.py when we build our own

##### modules.

##### Documentation on import

##### Import System

##### Import Statement

### Describe the purpose of and when init.py runs

##### When you run a directory with the -m option, or when you import a directory,

##### the __init__.py file executes. The purpose of __init__.py to be able to

##### build python packages and subdivide the packages into multiple sub-modules.

### Describe the purpose of and when main.py runs

##### When you run a directory as a regular python program (not with -m ) the

##### __main__.py file is executed. The purpose of __main__.py is to allow us

##### to execute a directory as if it was a python program.

## Flask Objectives

### Setup a new Flask project

##### Flask is a python based web application server. It is a backend framework

##### similar to Express.js

##### First, you should install Flask into a virtual environment

```
pipenv install flask
```
##### Create a python script to start your application. This might be app.py or

##### another script which imports an app/__init.py module.

##### This is the bare minimum needed to make Flask application:


```
from flask import Flask
app = Flask(__name__)
```
##### Flask requires that you set an environment variable called FLASK_APP before

##### it will run. It needs to be set to the name of your flask application script

##### or module. You could put this into a .env file and let pipenv load it

##### or use the python-dotenv module to load a .flaskenv file.

##### Often you might use the .flaskenv file to load environment variables like

##### FLASK_APP and checking it into source control, and reserve the .env file for

##### secret information like passwords or database configurations.

### Run a simple Flask web application on your computer

##### Once you have your application setup, you can just run it with flask.

```
pipenv run flask run
```
### Utilize basic configuration on a Flask project

##### You can use the app.config dictionary to hold Flask configuration values.

##### An even better way to setup your flask app is to create a python module with a

##### configuration class in it. This class just needs properties for each

##### configuration variable. Then you can import the class, and use the from_object()

##### method to load it into the app's config dictionary.

```
# config.py
```
```
class Config :
SOME_CONFIG_VARIABLE = 'Some value'
```
```
# app.py
# Import the config class
from config import Config
```
```
app = Flask(__name__)
```
```
# Load the config into Flask.
app.config.from_object(Config)
```
##### You can access any config variables in your flask app by just referencing

##### them on the app.config dictionary.

```
app.config['SOME_CONFIG_VARIABLE']
```
### Create a static route in Flask

##### A static route is one that just routes to a path without any parameters.

```
# Examples
@app.route('/')
def index ():
"""Put code here to execute when `/` is visited"""
pass
```
```
@app.route('/somepath')
def some_path ():
"""Put code here to execute when `/somepath` is visited"""
pass
```
### Create a parameterized route in Flask

##### A parameterized route uses <> characters to declare that part of a path

##### should be a parameter.

```
# the <id> parameter will be captured and passed into the function as the first
# argument
@app.route('/item/<id>')
def item (id):
return f'<h1>Item {id}</h1>'
```
```
# You can also specify the type of the parameter by prepending it with the type
# and a colon
@app.route('/item/<int:id>')
def item (id):
return f'<h1>Item {id}</h1>'
```
### Use decorators run code before and after requests

##### The @app.before_request and @app.after_request happen before and after

##### every request to the server. Use them to do any initialization or cleanup

##### you need to happen on each request

```
@app.before_request
def before_request_function ():
```

```
print("before_request is running")
```
```
@app.after_request
def after_request_function (response):
print("after_request is running")
return response
```
##### @app.before_first_request only happens once before the very first request

##### to the server

```
@app.before_first_request
def before_first_function ():
print("before_first_request happens once")
```
### Identify the "static" route

##### Don't confuse this with declaring a static route above. This is a special

##### built in route you don't have to define at all.

##### If you create a folder called static then any requests to /static on your

##### server will cause flask to serve up the files contained in this folder.

```
http://localhost: 5000 /static/styles/main.css
```
###### .

```
├── Pipfile
├── Pipfile.lock
├── app <- directory where Flask is created
│ ├── __init__.py <- file in which Flask is created
│ ├── routes.py
│ ├── static <- static files served from here
│ │ └── styles
│ │ └── main.css
│ └── templates
│ └── main.html
└── app_loader.py
```
### Use WTForms to define and render forms in Flask

##### WTForms is a python package that allows you to easily generate forms and form

##### fields. Flask-WTF is a companion python package that allows you to parse

##### POST data from a form and render the form fields.

##### You define your form as a class that inherits from the FlaskForm base class.

```
from flask_wtf import FlaskForm
```
```
class SampleForm (FlaskForm):
```
##### Then inside the class use WTForm fields on properties of the class.

```
class SampleForm (FlaskForm):
name = StringField('Name')
```
##### In your route, you can instantiate an instance of your form and then pass

##### it to a view to be rendered.

```
from app.sample_form import SampleForm
```
```
# Create an instance of our form
form = SampleForm()
```
```
# And pass it to the view template
return render_template('form.html', form=form)
```
##### Inside the view template, you can access the fields from the form to

##### output HTML for the form and it's fields.

```
<form action="" method="post" novalidate>
{{ form.csrf_token }}
<p>
{{ form.name.label }}
{{ form.name(size=32) }}
</p>
<p>{{ form.submit() }}</p>
</form>
```
##### The calls inside of the {{ }} will output HTML.

##### Because of some special python magic (the call and str methods on

##### FlaskForm), you can just use the properties without calling them, or call them with extra parameters, and both will work!

##### Passing extra keyword parameters to the field instances will add HTML attributes

##### for those parameters. However, because class is a reserved word in Python,

##### you will have to use class_ when you want to add a CSS class.

```
form.name(size= 32 , class_='name')
```

### Use WTForms to validate data in a POST with the built-in validators

##### To validate a form with Flask-WTF you can call the validate_on_submit method

##### on your form instance. This must be done inside of a route that handles POST

##### requests.

```
@app.route('/submit', methods=['POST'])
def handle_form_submit ():
if form.validate_on_submit():
# Do something with the form data.
# and return something
return
# You can put code here to handle what happens when
# the form fails validation, like redirecting or rendering
# the form again.
return
```
##### It should be noted that validate_on_submit automatically reads the incoming

##### parameters from the request object in Flask, so there's no reason to import it

##### or use it manually.

#### CSRF

##### To protect against Cross-Site Request Forgery attacks, Flask-Wtf automatically

##### generates and checks CSRF tokens. However we must add one of these two fields

##### in our form in order to print out the CSRF token.

```
# This one prints out ALL the hidden fields including the CSRF that are
# defined on the form class
{{ form.hidden_tag() }
```
##### or

```
# While this one only prints out the CSRF token hidden field
{{ form.csrf_token() }}
```
### Use the following basic field types in WTForms

##### You use these by creating a class property on your class which inherits from

##### FlaskForm

```
class MyForm (FlaskForm):
field1 = StringField()
```
##### BooleanField

##### DateField

##### DateTimeField

##### DecimalField

##### FileField

##### MultipleFileField

##### FloatField

##### IntegerField

##### PasswordField

##### RadioField

##### SelectField

##### SelectMultipleField

##### SubmitField

##### StringField

##### TextAreaField

##### Check the documentation on the specific parameters you must pass each type of

##### field.

##### WTForms Field Documentation

### Create a Flask Blueprint

##### A Flask Blueprint is a way to modularize our routes.

##### In a new module, import Blueprint and create one like this:

```
# admin.py
from flask import Blueprint
```
```
admin_bp = Blueprint('admin', __name__, url_prefix='/admin')
```
### Register the Flask Blueprint with the Flask application

##### Then import it into your main Flask app file

##### and register it so Flask knows about the routes contained within.

```
from admin import admin_bp
```
```
app = Flask()
```
```
app.register_blueprint(admin_bp)
```

### Use the Flask Blueprint to make routes

##### Inside the blueprint you can add routes, like you normally would, just you use

##### the blueprint instance instead of using app

```
@admin_bp.route('/', methods=('GET', 'POST'))
def admin_index ():
return
```
### Configure and use sessions in Flask

##### You must set a SECRET_KEY property in your flask config for sessions to work.

##### You can import session from flask.

```
from flask import Flask, session
```
##### Then simply use session to store things you want to be available later

```
# To set something in the session
session['key'] = value
# To get something from the session
session.get('key')
# to remove something from the session
session.pop('key')
```
### Use a Jinja template as return for a Flask route with render_template

##### Use the render_template method to render the template into a string,

##### and then return it from your route. You can give it the HTML file and keyword

##### arguments that will be accessible as variables inside the template.

```
@app.route('/')
def index ():
return render_template('index.html', sitename='My Sample')
```
### Add variables to a Jinja template with {{ }}

##### Then inside our HTML we can access the key

```
<title>{{ sitename }}</title>
```
##### Check the Jinja2 docs for all the things you can do in Jinja2 templates.

### Use include to share template content in Jinja

##### Just use the include directive to include another html inside a jinja template.

```
{% include 'file.html' %}
```
## Psycopg Objectives

### Connect to a PostgreSQL RDBMS using Psycopg

```
import psycopg
```
```
CONNECTION_PARAMETERS = {
'dbname': 'psycopg_test_db',
'user': 'psycopg_test_user',
'password': 'password',
}
```
```
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
print(conn.get_dsn_parameters())
```
### Open a "cursor" to perform data operations

### Use the with keyword to clean up connections and database cursors

```
import psycopg
```
```
CONNECTION_PARAMETERS = {
'dbname': 'psycopg_test_db',
'user': 'psycopg_test_user',
'password': 'password',
}
```
```
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
print(conn.get_dsn_parameters())
```
### Use results performed from executing a SELECT statement on existing database entities


```
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
with conn.cursor() as curs:
curs.execute('SELECT manu_year, make, model FROM cars;')
cars = curs.fetchall()
for car in cars:
print(car) # (1993, 'Mazda', 'Rx7')
```
### Use parameterized SQL statements to insert, select, update, and delete data

```
def print_all_cars ():
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
with conn.cursor() as curs:
curs.execute('SELECT manu_year, make, model, owner_id FROM cars;')
cars = curs.fetchall()
for car in cars:
print(car)
```
```
print_all_cars()
# Output:
# (1993, 'Mazda', 'Rx7', 1)
# ...additional cars
```
### Specify what type Psycopg will convert the following PostgreSQL types into:

##### PostgreSQL Python

##### NULL None

##### bool bool

##### double float

##### integer long

##### varchar str

##### text unicode

##### date date

## SQLAlchemy Objectives

### Describe how to create an "engine" that you will use to connect to a PostgreSQL database instance

##### Note: When using Flask-SQLAlchemy you don't have to do this

```
from sqlalchemy import create_engine
```
```
engine = create_engine("postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test")
```
### Describe how the with engine.connect() as connection: block establishes and cleans up a connection to the database

##### Note: When using Flask-SQLAlchemy you don't have to do this

```
from sqlalchemy import create_engine
```
```
db_url = "postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test"
engine = create_engine(db_url)
```
```
with engine.connect() as connection:
result = connection.execute("""
SELECT o.first_name, o.last_name, p.name
FROM owners o
JOIN ponies p ON (o.id = p.owner_id)
""")
for row in result:
print(row["first_name"], row["last_name"], "owns", row["name"])
```
```
engine.dispose()
```
### Describe how to create a database session from an engine

##### Note: When using Flask-SQLAlchemy you don't have to do this

```
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
```
```
db_url = "postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test"
engine = create_engine(db_url)
```
```
SessionFactory = sessionmaker(bind=engine)
```
```
session = SessionFactory()
```
```
# Do stuff with the session
```
```
engine.dispose()
```
### Create a mapping for SQLAlchemy to use to tie together a class and a table in the database

#### Mappings

##### Mappings with plain SQLAlchemy


##### With just SQLAlchemy we inherit from Base and we have to import all the

##### schema objects and types manually.

```
# ponies.py
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String
```
```
Base = declarative_base()
```
```
class Pony (Base):
__tablename__ = 'ponies'
```
```
id = Column(Integer, primary_key=True)
name = Column(String( 255 ))
birth_year = Column(Integer)
breed = Column(String( 255 ))
owner_id = Column(Integer, ForeignKey("owners.id"))
```
##### Mappings with Flask-SQLAlchemy

##### When using Flask-SQLAlchemy we inherit from db.Model instead of Base

##### and we can use all the schema objects and types because Flask-SQLAlchemy

##### attaches them to the db instance. So we just prefix them with db.

```
# owner.py
```
```
from .models import db
```
```
class Pony (db.Model):
__tablename__ = 'ponies'
```
```
id = db.Column(db.Integer, primary_key=True)
name = db.Column(db.String( 255 ))
birth_year = db.Column(db.Integer)
breed = db.Column(db.String( 255 ))
owner_id = db.Column(db.Integer, db.ForeignKey("owners.id"))
```
#### Relationships

##### One-to-Many

##### Just create the proper foreign key columns on the models, and then

##### define the relationships. (Remember Flask-SQLAlchemy will need to preface most of these objects with db. )

##### Remember the rule of thumb. The "Many" always has the foreign key on it.

```
# The one
class Owner (db.Model):
__tablename__ = "owners"
```
```
id = db.Column(db.Integer, primary_key=True)
first_name = db.Column(db.String( 255 ))
last_name = db.Column(db.String( 255 ))
email = db.Column(db.String( 255 ))
```
```
# ponies belong to an owner
ponies = db.relationship("Pony", back_populates="owner")
```
```
# The Many
class Pony (db.Model):
__tablename__ = "ponies"
```
```
id = db.Column(db.Integer, primary_key=True)
name = db.Column(db.String( 255 ))
birth_year = db.Column(Integer)
breed = db.Column(db.String( 255 ))
# The pony contains an owner_id foreign key
owner_id = db.Column(db.Integer, db.ForeignKey("owners.id"))
```
```
# An owner has many ponies
owner = db.relationship("Owner", back_populates="ponies")
```
##### Many-to-Many

##### Remember that a Many-to-Many relationship is really two One-to-Many relationships

##### with a join table in the middle.

##### You must create a Table() object and not a model for your join table.

```
# We define the foreign keys on our join table, which joins the Ponies
# to thier Handlers.
pony_handlers = db.Table(
"pony_handlers",
db.Column("pony_id", db.ForeignKey("ponies.id"), primary_key=True),
db.Column("handler_id", db.ForeignKey("handlers.id"), primary_key=True)
```
##### Then setup the relationships on each Model making sure to define a "secondary"

##### keyword argument is set to the table we just made.

```
# Inside the Pony class...
handlers = db.relationship("Handler",
secondary=pony_handlers,
back_populates="ponies")
```
```
# Inside the Handler class...
ponies = db.relationship("Pony",
secondary=pony_handlers,
back_populates="handlers")
```
#### On backpopulates


##### If you leave out the backpopulates parameter, then when you create an object and add related data, the opposite relationship won't be populated. For instance assume

##### we have an Owner instance and we add a Pony instance to it.

```
owner.ponies.append(pony)
```
##### If we do not have backpopulates set to the owner propery of the Pony

##### class, then if you try to look at the owner of the pony like this:

```
print(pony.owner) # Returns None
```
##### Then it will still be None. If you set backpopulates to the owner, then this

##### will get populates and stay in sync.

##### IMPORTANT : backpopulates just controls what happens with the objects BEFORE

##### we commit them to the database.

##### It's always a good idea to setup your backpopulates properly so you aren't

##### surprised.

### Add data to the database, both single entities as well as related data

```
you = Owner(first_name="your first name",
last_name="your last name",
email="your email")
```
```
your_pony = Pony(name="your pony's name",
birth_year= 2020 ,
breed="whatever you want",
owner=you)
```
```
# Note, id will be None until we commit
print(you.id) # > None
print(your_pony.id) # > None
```
```
session.add(you) # Connects you and your_pony objects
session.commit() # Saves data to the database
```
```
# After commiting the ids exist
print(you.id) # > 4 (or whatever the new id is)
print(your_pony.id) # > 4 (or whatever the new id is)
```
#### Using session with Flask-SQLAlchemy

##### We use this exactly the same as above but we get the session from the db instance.

```
db.session.add(you) # Connects you and your_pony objects
db.session.commit() # Saves data to the database
```
##### IMPORTANT don't confuse this session with the Flask session. This is a

##### database session while flask session is the browser session.

### Update data in the database

```
print(your_pony.birth_year) # > 2020
```
```
# Updating is just like setting a property
your_pony.birth_year = 2019
```
```
# The pony instance updates immediately
print(your_pony.birth_year) # > 2019
```
```
# but the database doesn't update until we commit!
session.commit()
```
```
print(your_pony.birth_year) # > 2019
```
### Delete data from the database (including cascades!)

### Know how to use and specify the "delete-orphan" cascading strategy

```
# Just passing the owner instance to delete, deletes it, but....
db.session.delete(you)
# It doesn't actually change the database until you commit!
db.session.commit()
```
```
class Owner (db.Model):
__tablename__ = 'owners'
```
```
id = db.Column(db.Integer, primary_key=True)
first_name = db.Column(db.String( 255 ))
last_name = db.Column(db.String( 255 ))
email = db.Column(db.String( 255 ))
```
```
# This is a relationship between Ponies and Owner.
# We have set it to cascase and delete orphans so
# when we delete an owner all the ponies related to
# that owner will be deleted
ponies = db.relationship("Pony",
back_populates="owner",
cascade="all, delete-orphan")
```
### Describe the purpose of a Query object


##### When you use SQLAlchemy's querying API, you're not actually immediately executing SQL against the database. Instead, all of the specifications that you add to the query are saved up into a single

##### object that you then use to have SQL executed against the database. This allows you to make decisions at runtime about how you want to apply filters to the query. This will become clearer as you

##### read about how to query and apply filters in the following sections. The important thing to note is that a Query object will not actually do anything with the database unless you explicitly tell it to do

##### something.

### Use a Session object to query the database using a model

#### With plain SQLAlchemy

```
pony_query = session.query(Pony)
print(pony_query)
```
```
pony_id_4_query = session.query(Pony).get( 4 )
```
#### With Flask SQLAlchemy

##### Flask SQLAlchemy attaches the session.query to the Model directly.

##### So you can re-write any call to session.query as <Model>.query.

```
# This plain SQLAlchemy query:
pony = session.query(Pony).get( 4 );
```
```
# Can be re-written as:
pony = Pony.query.get( 4 )
```
### How to order your results

```
owner_query = Owner.query(Owner.first_name, Owner.last_name)
.order_by(Owner.last_name)
print(owner_query)
```
### Use the filter method to find just what you want

```
pony_query = Pony.query.filter(Pony.name.like("%u%"))
```
```
pony_query = Pony.query
.filter(Pony.name.ilike("%u%"))
.filter(Pony.birth_year < 2015 )
```
### Use instance methods on the Query object to return a list or single item

##### all - returns a list

##### first - returns a single object

##### one - returns a single object or raises an exception

##### one_or_none - returns a single object or None

```
ponies = Pony.query.all()
for pony in ponies:
print(pony.name)
```
### Use the count method to ... count

```
pony_query = Pony.query
print(pony_query.count())
```
### Query objects with criteria on dependant objects

```
hirzai_owners = Owner.query \
.join(Pony) \
.filter(Pony.breed == "Hirzai")
```
```
for owner in hirzai_owners:
print(owner.first_name, owner.last_name)
```
### Lazily load objects

```
for owner in Owner.query:
print(owner.first_name, owner.last_name)
for pony in owner.ponies:
print(pony.name)
```
### Eagerly load objects

```
owners_and_ponies = Owner.query.options(joinedload(Owner.ponies))
```
```
for owner in owners_and_ponies:
print(owner.first_name, owner.last_name)
for pony in owner.ponies:
print(pony.name)
```

### Install the Flask-SQLAlchemy extension to use with Flask

```
pipenv install Flask psycopg2-binary \
SQLAlchemy Flask-SQLAlchemy
```
### Configure SQLAlchemy using Flask-SQLAlchemy

##### Create a SQLALCHEMYDATABASE_URI property in your Flask app config

##### Then you can pass your app to SQLAlchemy for super simple apps

```
from config import Config
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
```
```
app = Flask(__name__)
app.config.from_object(Config)
# We are creating the DB in app.py after creating the app.
# So we can just pass our app to SQLAlchemy
db = SQLAlchemy(app)
```
##### However, if you've defined your db object BEFORE your app is created in another module, you must use the init_app method on db to configure Flask-SQLAlchemy

```
# models.py
from flask_sqlalchemy import SQLAlchemy
```
```
# notice we create the db instance without passing it app
db = SQLAlchemy()
```
```
# app.py
from flask import Flask
from .config import Configuration
# The act of importing this creates the db instance
from .models import db
```
```
# We create our app here
app = Flask(__name__)
app.config.from_object(Configuration)
# We use init_app and pass it the app
db.init_app(app)
```
### Use the convenience functions and objects Flask-SQLAlchemy provides you to use in your code

##### Flask-SQLAlchemy adds the query object to every instance of a Model.

```
Pony.query.get( 4 )
```
##### It has some Flask specific things such as get_or_404 , which just throws a

##### 404 error if there's no Pony coming back from the database. There is also a similar first_or_404 method.

```
Pony.query.get_or_404( 4 )
```
##### Flask-SQLAlchemy also adds the session object to the db instance.

```
db.session.add(owner)
db.session.commit()
```
## Alembic Learning Objectives

### Install Alembic into your project

```
pipenv install alembic
pipenv run alembic init <directory-name>
```
### Configure Alembic to talk to your database and not have silly migration names

#### Add environment variable to env.py

##### Import the os module

```
import os
```
##### before run_migrations_offline add this line

```
config.set_main_option("sqlalchemy.url", os.environ.get("DATABASE_URL"))
```
#### Making better migration file names

##### You can set this in alembic.ini so your migration files will have dates in the names.


```
file_template = %% (year) d %% (month) .2d %% (day) .2d_ %% (hour) .2d %% (minute) .2d %% (second) .2d_ %% (slug) s
```
### Control Alembic's ability to migrate your database

#### Generating a migration (revision)

```
pipenv run alembic revision -m "create the owners table"
```
#### Running a migration (upgrading to a revision)

```
pipenv run alembic upgrade head
```
#### Rolling back a migration (downgrading to a revision)

```
pipenv run alembic downgrade <revision hash>
```
#### Rolling back all migrations (downgrading to base)

```
pipenv run alembic downgrade base
```
#### Viewing your migration history (revision history)

```
pipenv run alembic history
```
### Reason about the way Alembic orders your migrations; and,

##### Alembic treats migrations like a linked list. It does not use the dates in the

##### filenames to decide which migrations to run and which order they get run.

##### Instead each revision has a revision hash, and each revision has a 'down_revision'

##### property that points at the previous revision. (except for the first revision which of course will have it's down_revision set to None)

```
revision = 'ddbf30c38165'
down_revision = 'e363377eb6d7'
```
### Handle branching and merging concerns

##### If two teammates both commit new revisions, then you will end up with a conflict

##### in the down_revisions. Your revision linked list might look like this:

```
-- ae1027a6acf (Team A's most recent)
/
< -- 1975ea83b712 <--
\
-- 27c6a30d7c24 (Team B's most recent)
```
##### and you'll get an error like this:

```
FAILED: Multiple head revisions are present for given argument 'head';
please specify a specific target revision, '<branchname>@head' to
narrow to a specific head, or 'heads' for all heads
```
##### you can solve this with a merge specifying the two revisions

```
pipenv run alembic merge -m "merge contracts and devices" ae1027 27c6a
```
### Configuring a Flask application to use Alembic;

```
pipenv install alembic Flask-Migrate
```
```
# app/__init__.py
from app.models import db
from flask import Flask
from config import Config
# We have to import flask_migrate
from flask_migrate import Migrate
import os
```
```
app = Flask(__name__)
# Load our config, make sure you set DATABASE_URL as flask migrate
# uses it as well
app.config.from_object(Config)
db.init_app(app)
# And we have to do this to configure Flask Migrate. It needs to know about
# both our app and our db object
Migrate(app, db)
```
### Run commands to manage your database through the flask command; and,


##### When we use Flask-Migrate we run the commands through the flask command.

#### Instead of alembic init...

```
pipenv run flask db init
```
#### Check the help for the rest of the commands, which are the same as Alembic

```
pipenv run flask db --help
```
```
Usage: flask db [OPTIONS] COMMAND [ARGS]...
```
```
Perform database migrations.
```
```
Options:
--help Show this message and exit.
```
```
Commands:
branches Show current branch points
current Display the current revision for each database.
downgrade Revert to a previous version
edit Edit a revision file
heads Show current available heads in the script directory
history List changeset scripts in chronological order.
init Creates a new migration repository.
merge Merge two revisions together, creating a new revision file
migrate Autogenerate a new revision file (Alias for 'revision...
revision Create a new revision file.
show Show the revision denoted by the given symbol.
stamp 'stamp' the revision table with the given revision; don't run...
upgrade Upgrade to a later version
```
### Autogenerate migrations from your models!

#### Instead of alembic migrate...

```
pipenv run flask db migrate -m "create owners table"
```
##### flask db migrate does magic now, it reads your models and tries to

##### autogenerate the migration files based on the model.

##### IMPORTANT always check the autogenerated migration though, as there's only

##### so much flask migrate can do and it might not get everything perfectly correct, but it is a time saver!


