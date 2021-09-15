Google and Airbnb have two of the most popular style guides out there. I’d definitely recommend you check out both of them if you spend much time writing JS.

The following are thirteen of what I think are the most interesting and relevant rules from Google’s JS Style Guide.

They deal with everything from hotly contested issues (tabs versus spaces, and the controversial issue of how semicolons should be used), to a few more obscure specifications which surprised me. They will definitely change the way I write my JS going forward.

For each rule, I’ll give a summary of the specification, followed by a supporting quote from the style guide that describes the rule in detail. Where applicable, I’ll also provide an example of the style in practice, and contrast it with code that does not follow the rule.

Use spaces, not tabs
Aside from the line terminator sequence, the ASCII horizontal space character (0x20) is the only whitespace character that appears anywhere in a source file. This implies that… Tab characters are not used for indentation.
The guide later specifies you should use two spaces (not four) for indentation.

// badfunction foo() {∙∙∙∙let name;}// badfunction bar() {∙let name;}// goodfunction baz() {∙∙let name;}
Semicolons ARE required
Every statement must be terminated with a semicolon. Relying on automatic semicolon insertion is forbidden.
Although I can’t imagine why anyone is opposed to this idea, the consistent use of semicolons in JS is becoming the new ‘spaces versus tabs’ debate. Google’s coming out firmly here in the defence of the semicolon.

// badlet luke = {}let leia = {}[luke, leia].forEach(jedi => jedi.father = 'vader')
// goodlet luke = {};let leia = {};[luke, leia].forEach((jedi) => {  jedi.father = 'vader';});
Don’t use ES6 modules (yet)
Do not use ES6 modules yet (i.e. the export and import keywords), as their semantics are not yet finalized. Note that this policy will be revisited once the semantics are fully-standard.
// Don't do this kind of thing yet:
//------ lib.js ------export function square(x) {    return x * x;}export function diag(x, y) {    return sqrt(square(x) + square(y));}//------ main.js ------import { square, diag } from 'lib';
Horizontal alignment is discouraged (but not forbidden)
This practice is permitted, but it is generally discouraged by Google Style. It is not even required to maintain horizontal alignment in places where it was already used.
Horizontal alignment is the practice of adding a variable number of additional spaces in your code, to make certain tokens appear directly below certain other tokens on previous lines.

// bad{  tiny:   42,    longer: 435, };
// good{  tiny: 42,   longer: 435,};
Don’t use var anymore
Declare all local variables with either const or let. Use const by default, unless a variable needs to be reassigned. The var keyword must not be used.
I still see people using var in code samples on StackOverflow and elsewhere. I can’t tell if there are people out there who will make a case for it, or if it’s just a case of old habits dying hard.

// badvar example = 42;
// goodlet example = 42;
Arrow functions are preferred
Arrow functions provide a concise syntax and fix a number of difficulties with this. Prefer arrow functions over the function keyword, particularly for nested functions
I’ll be honest, I just thought that arrow functions were great because they were more concise and nicer to look at. Turns out they also serve a pretty important purpose.

// bad[1, 2, 3].map(function (x) {  const y = x + 1;  return x * y;});// good[1, 2, 3].map((x) => {  const y = x + 1;  return x * y;});
Use template strings instead of concatenation
Use template strings (delimited with `) over complex string concatenation, particularly if multiple string literals are involved. Template strings may span multiple lines.
// badfunction sayHi(name) {  return 'How are you, ' + name + '?';}// badfunction sayHi(name) {  return ['How are you, ', name, '?'].join();}// badfunction sayHi(name) {  return `How are you, ${ name }?`;}// goodfunction sayHi(name) {  return `How are you, ${name}?`;}
Don’t use line continuations for long strings
Do not use line continuations (that is, ending a line inside a string literal with a backslash) in either ordinary or template string literals. Even though ES5 allows this, it can lead to tricky errors if any trailing whitespace comes after the slash, and is less obvious to readers.
Interestingly enough, this is a rule that Google and Airbnb disagree on (here’s Airbnb’s spec).

While Google recommends concatenating longer strings (as shown below) Airbnb’s style guide recommends essentially doing nothing, and allowing long strings to go on as long as they need to.

// bad (sorry, this doesn't show up well on mobile)const longString = 'This is a very long string that \    far exceeds the 80 column limit. It unfortunately \    contains long stretches of spaces due to how the \    continued lines are indented.';
// goodconst longString = 'This is a very long string that ' +     'far exceeds the 80 column limit. It does not contain ' +     'long stretches of spaces since the concatenated ' +    'strings are cleaner.';
“for… of” is the preferred type of ‘for loop’
With ES6, the language now has three different kinds of for loops. All may be used, though for-of loops should be preferred when possible.
This is a strange one if you ask me, but I thought I’d include it because it is pretty interesting that Google declares a preferred type of for loop.

I was always under the impression that for... in loops were better for objects, while for... of were better suited to arrays. A ‘right tool for the right job’ type situation.

While Google’s specification here doesn’t necessarily contradict that idea, it is still interesting to know they have a preference for this loop in particular.

Don’t use eval()
Do not use eval or the Function(...string) constructor (except for code loaders). These features are potentially dangerous and simply do not work in CSP environments.
The MDN page for eval() even has a section called “Don’t use eval!”

// badlet obj = { a: 20, b: 30 };let propName = getPropName();  // returns "a" or "b"eval( 'var result = obj.' + propName );
// goodlet obj = { a: 20, b: 30 };let propName = getPropName();  // returns "a" or "b"let result = obj[ propName ];  //  obj[ "a" ] is the same as obj.a
Constants should be named in ALL_UPPERCASE separated by underscores
Constant names use CONSTANT_CASE: all uppercase letters, with words separated by underscores.
If you’re absolutely sure that a variable shouldn’t change, you can indicate this by capitalizing the name of the constant. This makes the constant’s immutability obvious as it gets used throughout your code.

A notable exception to this rule is if the constant is function-scoped. In this case it should be written in camelCase.

// badconst number = 5;
// goodconst NUMBER = 5;
One variable per declaration
Every local variable declaration declares only one variable: declarations such as let a = 1, b = 2; are not used.
// badlet a = 1, b = 2, c = 3;
// goodlet a = 1;let b = 2;let c = 3;
Use single quotes, not double quotes
Ordinary string literals are delimited with single quotes ('), rather than double quotes (").
Tip: if a string contains a single quote character, consider using a template string to avoid having to escape the quote.
// badlet directive = "No identification of self or mission."
// badlet saying = 'Say it ain\u0027t so.';
// goodlet directive = 'No identification of self or mission.';
// goodlet saying = `Say it ain't so`;