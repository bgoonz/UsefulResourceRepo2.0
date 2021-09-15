
# Variable Conventions
​
---
​
- Variables do not need to be initialized. e.g!(let, const, var) just a name and an assignment
- Variables are always block scoped
- Variables should be snake_case (think of python as a snake lol)
- CAPITAL_SNAKE_CASE usually refers to constants
- UpperCamelCase usually refers to a class
- \_\_double_underscore\_\_ is used with variables that should be private or left alone (dunder)
​
---
​
# Data Types
​
---
​
- **Boolean**: True or False; Written with uppercase first letter
- **Integer**: Whole Numbers
- **Float**: Any number with a decimal. Division always returns a float;
- **String**: A sequence of unicode characters; "I am a string!"
- **List**: An ordered sequence of values [1,2,3], ["a","b","c"]
- **Dictionary**: A collection of key value pairs {"first_name": "William", "last_name": "Vincent"}
- **Tuples**: An ordered and immutable collection of objects (1,2,3,4,5)
- **None**: Like null in other languages. Written with an uppercase first letter.
​
Python is dynamically typed. Meaning that variables can be reassigned to a different type
​
---
​
# Strings
​
---
​
**Interpolated or f-string:**
​
```py
x = 8
formatted = f"Your number is equal to {x}"
print(formatted)
​
```
​
Python can use negative indexing:
​
- name = "Bill"
- name[0] == name[-4]
- name[3] == name[-1]
​
---
​
# Type Conversion
​
---
​
- **To Int**:
  - decimal = 12.43563456
  - integer = int(decimal)
  - integer == 12
- **To String**:
  - list = [1,2,3]
  - to_string = str(list)
  - to_string == "[1,2,3]"
- **To Float**:
  - integer = 12
  - to_float = float(integer)
  - float == 12.0
​
---
​
# Boolean and Conditional Logic
​
---
​
```py
​
if name == "William":
    print("The name is William")
elif name == "Vincent":
    print("The name is Vincent")
else:
    print("I don't know the name")
​
```
​
- **":"** represents an indented block below, allowing python to understand the end of the condition and the beginning of the response.
- **Falsey Values**: empty objects, empty strings, None, 0
- **Comparison Operators**: ==, !=, >, >=, <, <=
- **Logical Operators**: and, or, not
​
---
​
# Loops
​
---
​
- **Iterable Objects**:
  - String: " "
  - List: [a, b]
  - Dictionary: {key: value}
  - Tuples: (a,b,c)
  - Range: range(min, max). Inclusive start and end.
​
### For Loops
​
```py
for temp_variable in name_of_iterable_object:
    do a thing
​
```
​
### While Loops
​
```py
​
while conditional:
    do a thing
​
```
