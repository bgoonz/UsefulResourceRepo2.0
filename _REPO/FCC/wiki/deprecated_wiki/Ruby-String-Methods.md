# Ruby String Methods

Ruby has many built in methods to work with strings. Strings in Ruby by default are mutable and can be changed in place or a new string can be returned from a method.

## Length:

- The `.length` property returns the number of characters in a string including white-space.

```ruby
"Hello".length
# returns: 5
```

```ruby
"Hello World!".length
# returns: 12
```

## Count:

- The `.count` method counts how many times a specific character(s) is found in a string.
- This method is case-sensitive.

```ruby
"HELLO".count('L')  
# returns: 2
```

```ruby
"HELLO WORLD!".count('LO')  
# returns: 1
```

## Insert:

- The `.insert` method inserts a string into another string before a given index.

```ruby
"Hello".insert(3, "hi5")
# returns:
Helhi5lo
# "hi5" is inserted into the string right before the second 'l' which is at index 3
```

## Upcase:

- The `.upcase` method transforms all letters in a string to uppercase.

```ruby
"Hello".upcase
# returns:
HELLO
```

## Downcase:

- The `.downcase` method transforms all letters in a string to lowercase.

```ruby
"Hello".downcase
# returns:
hello
```

## Capitilize:

- The `.capitalize` method make the first letter in a string uppercase and the rest of the string lowercase.

```ruby
"HELLO".capitalize
# returns:
Hello
```

```ruby
"HELLO, HOW ARE YOU?".capitalize
# returns:
Hello, how are you?
```

_Note that the first letter is only capitilized if it is at the beginning of the string._

```ruby
"-HELLO".capitalize
"1HELLO".capitalize
# returns:
-hello
1hello
```

## Reverse:

- The `.reverse` method reverses the order of the characters in a string.

```ruby
"Hello World!".reverse
# returns:
"!dlroW olleH"
```

## Split:

- The `.split` takes a strings and _splits_ it into an array, then returns the array.
- The default method splits the string based on whitespace, unless a different separator is provided (see second example).

```ruby
"Hello, how are you?".split
# returns:
["Hello,", "how", "are", "you?"]
```

```ruby
"H-e-l-l-o".split('-')
# returns:
["H", "e", "l", "l", "o"]
```

## Chop:

- The `.chop` method removes the last character of the string.
- A new string is returned, unless you use the `.chop!` method which mutates the original string.

```ruby
"Name".chop
# returns:
Nam
```

```ruby
name = "Batman"
name.chop
name == "Batma" # returns false
```

```ruby
name = "Batman"
name.chop!
name == "Batma" # returns true
```

## Strip:

- The `.strip` method removes the leading and trailing whitespace on strings, including tabs, newlines, and carriage returns (`\t`, `\n`, `\r`).

```ruby
"  Hello  ".strip
# returns:
Hello
```

## Chomp:

- The `.chomp` method removes the last character in a string, only if it???s a carriage return or newline (`\r`, `\n`).
- This method is commonly used with the `gets` command to remove returns from user input.

```ruby
"hello\r".chomp
# returns:
hello
```
```ruby
"hello\t".chomp
# returns:
hello\t #because tabs and other whitespace remain intact when using `chomp`
```

## To Integer:

- The `.to_i` method converts a string to an integer.

```ruby
"15".to_i
# returns:
15 #integer
```

| Previous | Home |
| :---         |     :---:      |
| [Ruby String Operators](Ruby-Strings-Operators)   | [Table of Contents](Ruby-Strings)     |
