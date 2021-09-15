# Regex: Everything You Need To Know - CodePicky

> Regex is a must-know feature in any programming language. It's very powerful when searching through very large pieces of text.

Regex or Regexp, short for regular expressions, is a special string used to define search patterns, typically used on larger texts.

If you’re aware of wildcards, you can think of this as being a similar thing, but a lot more powerful. For example, with wildcards, you’d use **\*.log** to match all the file names that end in the **log** extension.

The main idea for regex is to define patterns more easily, without repeating ourselves over and over again. They come in useful when we’re searching or scraping big chunks of data. On the Web, they’re used a lot to define HTML patterns, to collect data from HTML pages.

One example would be, if you want to get the title of any URL, you’d request it, get its HTML source code, then get everything in between `<title>` and `</title>`.

The rule for that in regex is:

`<title>(.*)</title>`

You’re going to learn what all of that means later, but the short description is that it collects everything in between those two HTML tags, and remembers its value to be used or stored in a variable.

As a general rule, a regex pattern is created to search another piece of text, so every example going on will have a source text attached to it.

Regex patterns are usually delimited by the forward slash (`/`) symbol, simply because they allow special flags that need to be placed outside those delimiters because they need to be somehow distinguished from the text the patterns is actually representing.

For example, if I wanted to use the flag `i` and wanted to also search for the letter `i` in the regex, I need to specify it as such:

`/iii/i`

The singular `i` at the end of that regex means “insensitive” and it refers to the case of the text matching the pattern. The `iii` is the actual pattern searched in the text, and because we use the “case insensitive” flag, it’s going to match all variations of triple `i`‘s: `iii`, `iiI`, `iII` , `III`, `IiI`, `Iii`, and so on.

Note
----

I know that everything that follows is overwhelming, but if you spend the necessary time looking at the examples and trying to understand them, it will all start to make sense. This takes practice, so go ahead and open regex101.com in a new tab and get ready to copy & paste all the examples from here.

Keep that site handy while developing regex patterns, because it’s going to come in very handy. Especially since it’s describing every single component of a regex pattern right there on the right-hand side.

Regex Identifiers
-----------------

Identifiers are the main component in a regex pattern. They specify the type of text that we’re looking for.

### Literal Identifiers

Alpha-numeric characters have the same signification as they do in the English language.

Given this sample text: `Alice asked Bob a question.`

To search for `Alice` in that text, we’d simply use:

`/Alice/`

That’s not going to match anything else other than `Alice`.

### Special Characters

To be able to actually create a pattern, we often use special characters which have more power than matching `Alice` with `Alice`.

Most of the special characters will not work alone and will result in error.

#### The caret (`^`)

This specific symbol has two meanings. In short, when added as the first character in a regex pattern, it means “**the beginning** of the searched string”, however, if it’s used between square brackets, it means “**everything but**“. Both of these are explained later because they need more context.

Given the string: `Alice asked Bob a question.`

`/^Alice/` will match the string because it starts with Alice, but:

`/^Bob/` will not match because it’s a different position than zero in the given string.

On the other hand, using the same given string:

`/[^a-z]/i` will match the first space in the string, because `[a-z]` means all letters from a to z, the `i` flag at the end makes `a-z` match `A-Z` too, and the `^` inside square brackets changes the meaning to “everything but letters from a-z”.

#### **The dollar sign (`$`)**

This means “**the end** of the searched string”.

Give: `Alice and Bob`

`/Alice$/` does not match anything because the string doesn’t end in `Alice`.

But `/Bob$/` matches because the string does end in `Bob`.

#### The period or dot (`.`)

This matches every single character in the searched string, except for a new line. It is one of the most commonly used special characters in regex, because of its specific ability to match (almost) anything.

`/./` in `Alice` will match the first letter, `A`.

You can make it match the new line as well, if you pass in the specific flag. That flag is `s` or `g`, depending of the regex flavour that your programming language uses.

You would use it as such: `/./s` or `/./g`

#### The vertical bar or pipe (`|`)

This means “**or**” and it’s used only in combination with other identifiers.

Given: `Alice is the only one in the sentence.`

`/Alice|Bob/` will match and return `Alice`, because `Alice` exists in the sentence and `Bob` does not.

In a scenario where both are present, it will only match the first one.

Given: `Bob is before Alice in this sentence.`

`/Alice|Bob/` will match `Bob`, because it shows up first in the sentence.

#### The asterisk or star (`*`)

This is a repetition symbol, stating that the instruction to the left of it might exist 0 or multiple times.

It’s often used in combination with the dot symbol to mean “there might be something here, but I don’t know how long or short or if at all.”

In our first example, where we wanted to get the title of web page, we used as example:

`<title>(.*)</title>`

Which matches anything in between the title attributes. Don’t worry about the parentheses, they’ll be explained later.

#### The plus (`+`)

This is basically the same as the star symbol, with the only difference that it expects the instruction it represents to repeat one or more times, instead of zero or more times.

`/abc+/` will match `abc`, `abcc`, but it will not match `ab`.

#### The question mark (`?`)

This symbol means “**optional**” or “the pattern to my left might or might not exists”.

`/colou?r/` would match both `color` and `colour` in a given string because `?` makes `u` optional.

It also has another meaning. If placed before another set of instructions, it will make it less “greedy”.

Given: `I have an apple & an orange.`

`/I have an.* [a-z]/` might look like it’s going to match `I have an a` but, in fact, it will match `I have an apple & an o` because `.*` means “anything that repeats 0 or more times” and the pattern stops in a letter from a to z, but by default, it will stop in the last letter, not the first.

However, adding `?` after `.*` will specify that it shouldn’t stop in the last occurrence of the rest of the pattern, but the first.

`/I have an.*? [a-z]/` will now match `I have an a`.

#### The parentheses (`(` and `)`)

They’re used in combination to signify a “group.”

To select that part of the regex separately from the given string.

`/<title>(.*)</title>/` will match `<title>Learn Regex with CodePicky</title>`, but it will also return `Learn Regex with CodePicky` separately.

This is useful when you’re interested only in parts of the matching string, but the pattern needed to be bigger to match the relevant stuff.

#### The square brackets (`[` and `]`)

They create a group of possible character matchings. If you want to match the letter a or the letter b, you type `[ab]` or `[ba]`.

They’re very powerful as you’ll see later.

#### The curly braces (`{` and `}`)

They are similar to the dot and plus symbols, in that they specify how many times an instruction repeats itself.

`/a{1,3}/` means that `a` might repeat 1 to 3 times, this matches `a`, `aa` and `aaa`.

`/a{1,}/` means that a repeats one or more times. It is equivalent to `+`

`/a{0,}/` means that a repeats zero or more times. It is equivalent to `*`

#### **The backslash (`\`****)**

This is used when you actually want to match the special symbol in a text. Think of the backslash as the ability to **cancel out another special character’s ability**.

`/a+/` will match `a`, `aa`, `aaa`… and so on.

But if you use the backslash before the `+`:

`/a\+/` it will only match `a+`

### Non-Printable Identifiers

#### Predefined

`\t` = a tab (0x09)

`\r` = a carriage return (0x0D)

`\n` = a carriage return (0x0A)

`\a` = a bell (0x07)

`\e` = an escape (0x1B)

`\f` = a form feed (0x0C)

A short reminder here that Windows terminates lines with `\r\n`, whereas Linux and Unix use `\n`.

#### Encoded

If your flavor of regex supports unicode, you can use `\uFFFF` or `\xFFFF` to match the ASCII representation of U+FFFF.

Character Classes
-----------------

Also called character sets, these are groups of characters from wich only one is matched in the given string.

`/gr[ae]y/` where `[ae]` is the character set, will match both `grey` and `gray`.

`/[0\\]x[a-fA-F0-9]{2}/` will match any HEX encoded char if it starts with `0x` or `\x`.

### Negated Classes

The same classes, if we add `^` at the beginning, will express the opposite.

`/[^a-z]/` will match any character that is not a letter from a to z.

### Special Symbols Inside Classes

The special characters inside character do not have special effects.

`/[.]/` will only match `.`

`/[+]/` will match only `+`

…and so on.

Because `-` acts as an interval middle-man, if you want to look for a hyphen inside your class, you need to add it either at the very beginning, or at the very end:

`/[a-z-]/` and `/[-a-z]/` will match a letter from a to z or a hyphen.

### Repeated and Optional Classes

You can combine `?`, `*`, `+` and `{X,Y}` to classes to make them repeat or optional.

`/[a-z]+/` will match anything made out of letters from a to z.

### Shorthands for Character Classes

There are a few pre-defined shorthands for commonly-used classes.

`/\d/` is an alias of `/[0-9]/` and it matches a digit.

`/\w/` is an alias of `/[a-zA-Z0-9_]/` and it matches a “word character”.

`/\s/` is an alias of `/[ \t\r\n\f]/` and it matches any type of space, including new lines.

#### Negated shorthands

We also have available their counterparts that select the opposite characters as do the ones above.

`/\D/` is the same thing as `/[^\d]/` and it matches anything but a digit character.

`/\W/` is the same thing as `/[^\w]/` and it matches anything but a word character.

`/\S/` is the same thing as `/[^\s]/` and it matches anything but a space character.

Because, if you remember, the `^` means “anything but”.

### Word Boundary

This is an anchor, just like `^` and `$`.

Anchors don’t represent characters themselves, they only specify a higher level of detail for the pattern.

This is useful when you want to select something that might be preceded or followed by any other word.

For example, if you wanted to remove the word pie from the following sentence:

`Take this sharpie and draw a pie chart.`

You’d be tempted to replace `/pie/` with something else, but there is a problem with that approach, because the word sharpie also contains “pie” and it would match that pattern too, hence you’d end up with a very surprinsing result.

To fix it, you can use the word boundary anchor, `\b` as such:

`` `/` ``**\\b**`pie/`

As you can see, we added the `\b` where we know that the pattern might be interfering with something else, but in most cases, we’d actually use it in both the front and the back, just to be sure we’re not missing anything.

`` `/` ``**\\b**`` `pie` ``**\\b**`/` matches `pie`, when it’s surrounded by anything in the `\W` class, but it will not match `` `shar` ``**pie** or **pie**`ce`.

Grouping and Capturing
----------------------

We’ve talked breafly already about this, but these are another two commonly used components in regex, so we’re going to focus on them a little more.

### Grouping

Grouping is used for two reasons.

#### 1\. To be able to specify the group as optional

If you’re grouping something, you can use the `?` symbol to mark it as optional.

Given the word: Banana

`/Ban(ana)?/` matches both `Ban` and `Banana`.

#### 2\. To capture the selection

A group automatically becomes a different result in the final outcome of the matching function.

For example, in PHP:

`preg_match('/Super(man)/', 'Superman is not human.', $result);`

Would result in:

$result = \[‘Super’, ‘man’\]

The first value in the array is always the entire matched string, then the grouped elements in the order they appear in the regex pattern.

Changing that to:

`preg_match('/Super(m)(a)(n)/', 'Superman is not human.', $result);`

Would yield:

`$result = ['Super', 'm', 'a', 'n']`

### Non-Capturing Groups

If you don’t want your group to be added to the final result, you can use the `?:` operator to ignore that group from the outcome.

`` `preg_match('/Super(` ``**?:**`man)/', 'Superman is not human.', $result);`

Yields:

`$result = ['Super']`

### Backreferences

You can reference a group in the same regex pattern by using its index number and the backslash, like so: `\1`.

For example, if you wanted to select the contents of multiple possible HTML tags, you could use:

`/<(title|header|body)>(.*?)<\/\1>/`

That will match anything between `<title>` and `</title>`, `<header>` and `</header>` or `<body>` and `</body>`.

Note that we’re also using backspace for the forward slash `/` inside the closing HTML tag, because otherwise that would be treated as the regex delimitator and would result in an error, because there is some other stuff after it that get treated as flags.

#### Negative backreferences

You can also use negative values to match backreferences.

`` `/(a)(b)(c)` ``**\\k<-3>**`/` matches `abca`.

Lookarounds
-----------

These types of components are called assertions and, just like the word boundary, or the end and start of a match, they don’t consume characters in the given string.

They’re used to check if something exists or not before or after a pattern.

### Negative Lookahead `(?!)`

Checks to see if something **is not** present **after** the pattern.

`/Dec(?!ember)/` matches `Dec` only when it’s not followed by `ember`.

### Positive Lookahead `(?=)`

Checks to see if something **is** present **after** the pattern.

`/Dec(?=ember)/` matches `Dec` only when is followed by `ember`. Just to be clear, this still returns the matched string `Dec`, even when `ember` is after it, because the positive lookahead assertion is simply just that, an assertion, it’s not going to return it in the final outcome.

### Negative Lookbehind `(?<!)`

Checks to see if something **is not** present **before** the pattern.

`/(?<!Solar )System/` matches `System` only when it’s not preceded by “Solar “.

### Positive Lookbehind `(?<=)`

Checks to see if something **is** present **before** the pattern.

`/(?<=Solar )System/` matches `System` only when is preceded by “Solar “, and returns `System` as the outcome, because the positive lookbehind, just like the other three types of lookarounds, is only an assertion.

Conditionals
------------

Yes, regex supports if-then-else instructions.

We can use them with groups. That is to say, if a group is matched, then we should check of A, otherwise, we should check for B.

`/((a)|b)b(?(2)c|d)/` matches `abc` and `bbd`, because `(...|b)` is the first group and `(a)` is the second.

Questions
---------

If you have any question, please submit it through the comments section.


[Source](https://www.codepicky.com/regex/)