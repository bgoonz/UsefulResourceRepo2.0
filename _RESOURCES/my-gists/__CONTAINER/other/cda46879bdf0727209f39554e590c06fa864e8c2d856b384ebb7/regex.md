## What is a Regular Expression?

A regular expression is a sequence of characters that forms a search pattern.
The search pattern can be used for text search and text replace operations.

When you search for data in a text, you can use this search pattern to describe what you are searching for.
A regular expression can be a single character, or a more complicated pattern.
Regular expressions can be used to perform all types of text search and text replace operations.

## String Modifiers
In JavaScript, regular expressions are often used with the two string methods: search() and replace().

The search() method uses an expression to search for a match, and returns the position of the match.
```sh
var dev = "Come check us out at devleague!!";
var x = dev.search(/devleague/i);
// x = 22
```

The replace() method will also accept a string as search argument
```sh
var dev = "Visit Manoa!";
var x = str.replace(/manoa/i, "Devleague");
// x = "Visit Devleague"
```



## Regex Modifiers
Modifiers can be used to perform case-insensitive for more global searches

```sh
var devleague = /devleague/i;   // Perform case insensitive matching (will find all matches 'devleague' regaurdless of case)
var devleague = /devleague/g;   // Perform a global match (will find all matches rather than stopping after the first match)
var devleague = /devleague/m;   // Perform multiline matching
```


## Regex Patterns
Brackets are used to find a range of characters

```sh
[dev]     //Find any of the characters between the brackets
[0-9]     //Find any of the digits between the brackets
(x|y)     //Find any of the alternatives separated with |
```

Metacharacters are characters with a special meaning (refer to resources below)

```sh
\d      //Find a digit
\s      //Find a whitespace character
\b      //Find a match at the beginning or at the end of a word
```

Quantifiers define quantities

```sh
n+      //Matches any string that contains at least one n
n*      //Matches any string that contains zero or more occurrences of n
n?      //Matches any string that contains zero or one occurrences of n
```

As a small example, if I wanted to look for all the text inside of the `<h1>` tags in this html page...
```sh
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Hey There~!!</title>
  </head>
  <body>
    <header>
      <span><h1>Hey There!!</h1></span>
    <header>
    <section>
      <div>
        <ul>
          <li>
            <h1>Hola</h1>
          </li>
          <li>
            <h1>Hello!!</h1>
          </li>
          <li>
            <h1>Kon ichiwa</h1>
          </li>
          <li>
            <h1>Ni hao</h1>
          </li>
        </ul
      </div>
    </section
  </body>
</html>
```
my regex pattern would be 
`(<[a-zA-Z0-9]+>)(.*)(</[a-zA-Z0-9]+>)`.

The outside parentheses matching all letters a-z with capitalization and numbers 0-9, with `html` syntax. And the inside parentheses will match all characters inside of those matching tags.


## Using the test() method

test() searches a string for a pattern, and returns true or false, depending on the result.

```sh
var devleague = /dev/i;
devleague.test("Devleague is the bee's knees!!")      //Returns true because "dev" is included in the string and is case-insensitive.
```

## Using the exec() method

exec() searches a string for a specified pattern, and returns the found text. If no match is found, it returns null.

```sh
/dev/.exec("I learned a lot at devleague this summer!");      //Returns 'dev' because it is included in the string. 
```

#### Regex Resources
  - http://regexr.com/
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  - https://regex101.com/
  - https://www.debuggex.com/


