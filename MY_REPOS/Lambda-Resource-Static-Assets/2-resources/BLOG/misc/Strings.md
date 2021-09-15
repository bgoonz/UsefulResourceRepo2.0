# **Javascript Strings**
## **Introduction**

**String Methods**
* **charAt** : retrieves character at indicated index
  > str.charAt(index)
* **charCodeAt** and **fromCharCode**: Refs unicode numbers
  > str.charCodeAt(number) & str.fromCharCode(number)
* **toUpperCase** and **toLowerCase**
  > str.toUpperCase() & str.toLowerCase()
* **split**: splits a string into an array
  > str.split(what to split on)
* **replace**: replaces selected element
  > string.replace(element to replace, new element)
* **substring**: takes portion of a string
  > string.substr(starting index, ending index)
* **find Index** : retrieves index of referenced character
  > string.indexOf(character to reference)

**Random Notes**
* Strings in Javascript are immutable.
---
## **Regular Expressions**
Regex are patterns you define that are then searched for in a string.

**Examples**
```
var pattern = /(a|b|c)/gi
```
* looking for an either an a, b, or c.
* **g** : tells regex to search globally.
* **i** : tells regex the search is case-insensitive.

```
var str = "An Apply was eaten";
str.replace(/a/gi, "4");
```
* globally looking for all instances of "a" and replacing them with "4".

```
var str = "My phone number is 551-555-5555"
str.replace(/[0-9]/gi, "x");
```
* globally, and case-insensitively looking for all numbers in a range denoted by [0-9] and replacing them with "x"
```
var str = "Hey 4get these words 3_please";
var wor = str.match(/\\b[a-z]+/gi);
```
* **b** represents a word boundary.
* global, case-insensitively searching for words that start with a letter.
```
var str = "ABxxAxxB"
var pos = str.search(/A..B/gi);
```
* finds a position in the string where the character A is exactly 2 spaces away from B.
---
