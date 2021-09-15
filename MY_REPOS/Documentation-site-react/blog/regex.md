---
slug: Data structures
title: Data Structures
author: Bryan Guner
author_title: Web Developer
author_url: https://github.com/bgoonz
author_image_url: https://avatars.githubusercontent.com/u/66654881?s=460&u=4614c45125eb6ab7e4b04468cb9cdf5c998c879d&v=4
tags: [Data Structures, Algorithms]
---
Regular Expressions {#regular-expressions .mume-header}
-------------------

-   Regular expressions are patterns used to match character
    combinations in strings.

Regular Expression

Description

\*

zero or more repitions

+

one or more repitions

?

once or none (optional)

start of input

\$

end of input

.

any character

\\

escapes a special character

[abc]

any of these characters

[a-z]

range of characters

[\^abc]

not those characters

\\s

whitespace

\\d

one digit (0 - 9)

\\w

any alphanumeric character

\\S

not whitespace

\\D

not digit

\\W

any non-alphanumeric character

{n}

n repetitions

{n }

n or more repitions

{x, y}

x - y repitions

##### Using Regular expressions in Javascript {#using-regular-expressions-in-javascript .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
const re = /EX$/
const str = "We're learning REGEX"

const li = [ 1, 2, di ];
const re = /regex/i;

console.log(re.test(`learning about regex`));
console.log(re.test(`LEARNING ABOUT REGEX`));

let count = 0;

const newStr = str.replace(/e/ig, match => {
      count += 1
      return count;
    });
    console.log(newStr);
const di = { name: `Mimi`, age: 2 };
const str = `My name is %name% and I am %age% years old`;
const str2 = `My name is ${name} and I am ${age} years old`;
const re = /%\w+%/g

const replaced = str.replace(re, match => {
  // match = %name%
  const key = match.replace(/%/g, ``);
  // key = name
  return di[key];
});
console.log(replaced);
```

##### You construct a regular expression in one of two ways: {#you-construct-a-regular-expression-in-one-of-two-ways .mume-header}

-   Using a regular expression literal, which consists of a pattern
    enclosed between slashes, as follows:

``` {.language-javascript data-role="codeBlock" data-info="js"}
let re = /ab+c/;
```

Regular expression literals provide compilation of the regular
expression when the script is loaded. If the regular expression remains
constant, using this can improve performance.

-   Or calling the constructor function of the RegExp object, as
    follows:

``` {.language-javascript data-role="codeBlock" data-info="js"}
let re = new RegExp('ab+c');
```

#### Escaping {#escaping .mume-header}

-   If you need to use any of the special characters literally (actually
    searching for a "\*", for instance), you must escape it by putting a
    backslash in front of it.

-   [Regular Expressions](#regular-expressions)\
     - [Using Regular expressions in
    Javascript](#using-regular-expressions-in-javascript)\
     - [You construct a regular expression in one of two
    ways:](#you-construct-a-regular-expression-in-one-of-two-ways)
    -   [Escaping](#escaping)

≡
