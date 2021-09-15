# Python Decorators Video Code

## Intro to Python Decorators

- Functions that take in a function as an argument (callback)
- Functions that wrap an inner function (closure)
- Dynamically modify behavior
- Extend wrapped function's behavior without direct modification





```py

@property
def name(self):
  return self._name

```

## Python Decorator Notation 1

**with syntactic sugar**
```python
def my_decorator(function_to_decorate):
  def my_wrapper_function():
    print("Hi, I'm a wrapper!")
    return function_to_decorate()
  return my_wrapper_function

@my_decorator
def my_function_to_decorate():
  print("I'm a function to decorate!")


my_function_to_decorate()
```

**without syntactic sugar**
```python
def my_decorator(function_to_decorate):
  def my_wrapper_function():
    print("Hi, I'm a wrapper!")
    return function_to_decorate()
  return my_wrapper_function

def my_function_to_decorate():
  print("I'm a function to decorate!")

my_function_to_decorate = my_decorator(my_function_to_decorate)
```

## Python Decorator Notation 2

**with syntactic sugar**
```python
@my_decorator
def my_function_to_decorate():
  print("I'm a function to decorate!")
```

**without syntactic sugar**
```python
def my_function_to_decorate():
  print("I'm a function to decorate!")

my_function_to_decorate = my_decorator(my_function_to_decorate)
```

## Callback To Decorate / Decorator Function

```python
def exponent_function_decorator(exponent_function_to_wrap):
  def wrapper_function(base_number, exponent):
    return base_number ** exponent_function_to_wrap(exponent)
  return wrapper_function

def exponent_function(exponent):
  return int(exponent)

print(exponent_function(2.234234))      # 2
print(exponent_function)                # <function exponent_function at 0x________>

exponent_function = exponent_function_decorator(exponent_function)
print(exponent_function(2.234234))      # Error
print(exponent_function(4, 2.234234))   # 4 ** 2 = 16
print(exponent_function)                # <function exponent_function_decorator.<locals>.wrapper_function at 0x________>
print(exponent_function.__closure__[0].cell_contents) # <function exponent_function at 0x________>
```

## Syntactic Sugar

```python
@exponent_function_decorator
def exponent_function(exponent):
  return int(exponent)

print(exponent_function(4, 2.234234))                   # 16
```

## Args / Kwargs

```python
def exponent_function_decorator(exponent_function_to_wrap):
  def wrapper_function(*args, **kwargs):
    print(args)
    print(kwargs)
    # return base_number ** exponent_function_to_wrap(exponent)
  return wrapper_function

@exponent_function_decorator
def exponent_function(exponent):
  return int(exponent)

print(exponent_function(4, 2.234234))  # (4, 2.234234)
```

## Args

```python
def exponent_function_decorator(exponent_function_to_wrap):
  def wrapper_function(*args, **kwargs):
    print(args)
    print(kwargs)
    base, exponent = args
    return exponent_function_to_wrap(base, int(exponent))
  return wrapper_function

# @exponent_function_decorator
# def exponent_function(exponent):
#   return int(exponent)

# print(exponent_function(4, 2.234234))

@exponent_function_decorator
def exponent_function(base, exponent):
  return base ** exponent

# print(exponent_function(4, 2.234234))

# @exponent_function_decorator
# def convert_to_int(exponent):
#   return int(exponent)

# exponent_function = exponent_function_decorator(convert_to_int)

print(exponent_function(4, 2.234234))
```

## Kwargs

```python
def exponent_function_decorator(exponent_function_to_wrap):
  def wrapper_function(*args, **kwargs):
    print(args)
    print(kwargs)
    return kwargs['base_number'] ** exponent_function_to_wrap(kwargs['exponent'])
  return wrapper_function

@exponent_function_decorator
def exponent_function(exponent):
  return int(exponent)

print(exponent_function(base_number=4, exponent=2.234234))
```