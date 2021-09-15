# Regular Expressions In JavaScript

Basic:

---

### Regular Expressions In JavaScript

Basic:

### Anchors

###

- <span id="d05b">^ Start of string or line</span>
- <span id="6038">\\A Start of string</span>
- <span id="40e6">$ End of string or line</span>
- <span id="9df2">\\Z End of string</span>
- <span id="53e9">\\b Word boundary</span>
- <span id="fd36">\\B Not word boundary</span>
- <span id="c78b">\\&lt; Start of word</span>
- <span id="6a1d">\\&gt; End of word</span>

### Character Classes

###

- <span id="2d83">\\c Control character</span>
- <span id="4651">\\s Whitespace \[ \\t\\r\\n\\v\\f\]</span>
- <span id="0193">\\S Not Whitespace \[^ \\t\\r\\n\\v\\f\]</span>
- <span id="00a1">\\d Digit \[0–9\]</span>
- <span id="edf5">\\D Not digit \[⁰-9\]</span>
- <span id="281f">\\w Word \[A-Za-z0–9\_\]</span>
- <span id="0b49">\\W Not Word \[^A-Za-z0–9\_\]</span>
- <span id="b984">\\x Hexadecimal digit \[A-Fa-f0–9\]</span>
- <span id="3b87">\\O Octal Digit \[0–7\]</span>

### POSIX Classes

###

- <span id="7d87">\[:upper:\] Uppercase letters \[A-Z\]</span>
- <span id="2c6c">\[:lower:\] Lowercase letters \[a-z\]</span>
- <span id="c701">\[:alpha:\] All letters \[A-Za-z\]</span>
- <span id="9fb1">\[:alnum:\] Digits and letters \[A-Za-z0–9\]</span>
- <span id="0691">\[:digit:\] Digits \[0–9\]</span>
- <span id="55bb">\[:xdigit:\] Hexadecimal digits \[0–9a-f\]</span>
- <span id="f40f">\[:punct:\] Punctuation</span>
- <span id="717c">\[:blank:\] Space and tab \[ \\t\]</span>
- <span id="f601">\[:space:\] Blank characters \[ \\t\\r\\n\\v\\f\]</span>
- <span id="3202">\[:cntrl:\] Control characters \[\\x00-\\x1F\\x7F\]</span>
- <span id="407a">\[:graph:\] Printed characters \[\\x21-\\x7E\]</span>
- <span id="b567">\[:print:\] Printed characters and spaces \[\\x20-\\x7E\]</span>
- <span id="09eb">\[:word:\] Digits, letters and underscore \[A-Za-z0–9\_\]</span>

### Pattern Modifiers

###

- <span id="e660">//g Global Match (all occurrences)</span>
- <span id="eb90">//i Case-insensitive</span>
- <span id="7c32">//m Multiple line</span>
- <span id="ad4e">//s Treat string as single line</span>
- <span id="1e02">//x Allow comments and whitespace</span>
- <span id="89e9">//e Evaluate replacement</span>
- <span id="6931">//U Ungreedy pattern</span>

### Escape Sequences

###

- <span id="7005">\\ Escape following character</span>
- <span id="d4be">\\Q Begin literal sequence</span>
- <span id="a990">\\E End literal sequence</span>

### Quantifiers

###

- <span id="8f1d">\* 0 or more</span>
- <span id="f977">+ 1 or more</span>
- <span id="11b3">? 0 or 1 (optional)</span>
- <span id="f72b">{3} Exactly 3</span>
- <span id="680b">{3,} 3 or more</span>
- <span id="0ebe">{2,5} 2, 3, 4 or 5</span>

### Groups and Ranges

###

- <span id="38f6">. Any character except newline (\\n)</span>
- <span id="662b">(a|b) a or b</span>
- <span id="2884">(…) Group</span>
- <span id="d4df">(?:…) Passive (non-capturing) group</span>
- <span id="0100">\[abc\] Single character (a or b or c)</span>
- <span id="ab55">\[^abc\] Single character (not a or b or c)</span>
- <span id="e77c">\[a-q\] Single character range (a or b … or q)</span>
- <span id="23aa">\[A-Z\] Single character range (A or B … or Z)</span>
- <span id="a250">\[0–9\] Single digit from 0 to 9</span>

### Assertions

- <span id="a14a">?= Lookahead assertion</span>
- <span id="003e">?! Negative lookahead</span>
- <span id="21b4">?&lt;= Lookbehind assertion</span>
- <span id="ce65">?!= / ?&lt;! Negative lookbehind</span>
- <span id="cad3">?&gt; Once-only Subexpression</span>
- <span id="db25">?() Condition \[if then\]</span>
- <span id="f677">?()| Condition \[if then else\]</span>
- <span id="f37c">?\# Comment</span>

### <a href="https://5500-maroon-cicada-j63zxbst.ws-us11.gitpod.io/_WJVincent/Notes-Wiki/regex-cheatsheet.html#Special%20Characters" class="markup--anchor markup--h3-anchor">Special Characters</a>

- <span id="ca81">\\n New line</span>
- <span id="6ca1">\\r Carriage return</span>
- <span id="40cf">\\t Tab</span>
- <span id="816c">\\v Vertical tab</span>
- <span id="37e8">\\f Form feed</span>
- <span id="584e">\\ooo Octal character ooo</span>
- <span id="73a1">\\xhh Hex character hh</span>

### String Replacement

- <span id="97cc">$n n-th non-passive group</span>
- <span id="b1ec">\\(2 “xyz” in /^(abc(xyz))\\)/</span>
- <span id="5cfe">\\(1 “xyz” in /^(?:abc)(xyz)\\)/</span>
- <span id="c851">$\` Before matched string</span>
- <span id="a73d">$’ After matched string</span>
- <span id="b11b">$+ Last matched string</span>
- <span id="fb7a">$& Entire matched string</span>

[View original.](https://medium.com/p/6be305fbe20b)

Exported from [Medium](https://medium.com) on July 13, 2021.
