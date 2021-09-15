# JavaScript eXtension
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [How to use JSX](#how-to-use-jsx)
- [JSX Syntax](#jsx-syntax)
  - [HTML-like tags, but...](#html-like-tags-but)
  - [Properties and data](#properties-and-data)
  - [Comments](#comments)
  - [Property names](#property-names)
- [The JSX semicolon gotcha](#the-jsx-semicolon-gotcha)
- [What you've learned](#what-youve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

Using `React.createElement` is a bore and a chore when creating React-powered
applications. The developers that used React, both inside and outside of
Facebook, wanted an easier way to interact with the React API and hide all of
the minutiae that comes with using `React.createElement`. They invented a new
language that sits on top of JavaScript called _JavaScript eXtension_, or JSX.

In this article, you will learn

* How to use JSX in your application
* The syntax of JSX, and
* How JSX transforms into `React.createElement` calls

## How to use JSX

Because browsers don't understand JSX, you have to use some tools to translate
JSX into just plain old JavaScript. The main tool that you will use in almost
every case is one called [Babel]. It is a tool that can convert versions of
modern JavaScript into old version of JavaScript. It can convert _future_
features of JavaScript into modern JavaScript. It can convert JSX into modern
(or old) JavaScript.

However, using Babel by itself is like building a house with just a hammer. It'd
be nice to have fancier tools to help you build that house. That's where tools
like [Create React App] come into play. **Create React App** uses Babel
underneath and, then, adds a whole lot more. You'll see more of **Create React
App* as you progress through the course.

## JSX Syntax

Here's a function-based component using `React.createElement` that has an `h1`
element with the content "Hello!", a placeholder image, and a link to
some search engine passed in through props.

```js
const ExampleComponent = props => React.createElement(
  React.Fragment,
  null,
  React.createElement('h1', null, 'Hello!'),
  React.createElement('img', { src: 'images/150' }),
  React.createElement('a', { href: props.searchUrl }, props.searchText),
);
```

You've likely seen that before. JSX allows you to get rid of all of the calls
to `React.createElement` and replace them with almost HTML-looking tags. Here's
what the above content looks like in JSX.

```jsx
const ExampleComponent = props =>
  <React.Fragment>
    <h1>Hello!</h1>
    <img src="images/150" />
    <a href={props.searchUrl}>{props.searchText}</a>
  </React.Fragment>
;
```

You can see Babel in action converting that JSX code above. Here's a [link to
Babel] already configured for you. Copy and paste that code above to see it
transform back into `React.createElement` invocations.

### HTML-like tags, but...

The `React.Fragment` element _contains_ the `h1`, `img`, and `a`, just like it
does in the `React.createElement` version, except instead of using a method call
to do it, it uses more familiar HTML-like tags. There's one super big difference
between the HTML that you know and what JSX expects. Can you see it?

Look at the end of the `img` tag. See that "/" before the closing angle bracket?
You _must_ include that if the tag that you're using doesn't have a close tag.
If you want to use those HTML element in your JSX, then you have to put the
slash. The following table shows some common tags that you'd use and their
JSX equivalent.

| HTML self-closing tag | JSX equivalent |
|-----------------------|----------------|
| `<br>`                | `<br />`       |
| `<hr>`                | `<hr />`       |
| `<img>`               | `<img />`      |
| `<input>`             | `<input />`    |
| `<link>`              | `<link />`     |

### Properties and data

When you use the low-level `React.createElement` function call, you pass the
properties in as an object as the second argument. In JSX, you pass in
properties as if they were attributes on the tag.

When you want to use a static value, just use a string literal like this.

```jsx
<img src="https://via.placeholder.com/150" />
```

becomes

```js
React.createElement(
  'img',
  { src: "https://via.placeholder.com/150" }
)
```

And, when you want to pass in some data rather than a sting literal like above,
you use curly braces to turn

```jsx
<a href={props.searchUrl}>{props.searchText}</a>
```

into

```js
React.createElement(
  'a',
  { href: props.searchUrl },
  props.searchText
)
```

The stuff inside the curly braces is just a JavaScript expression, so you could
do something like this, if you wanted, to make the search text uppercase:

```jsx
<a href={props.searchUrl}>
  {props.searchText.toUpperCase()}
</a>
```

### Comments

To use comments in JSX, you use curly braces (because that means its just a
normal JavaScript expression) and block-level JavaScript comments.

```jsx
<div>
  <h2>This is JSX</h2>
  {/* This is a comment in JSX */}
</div>
```

### Property names

Please read [DOM Elements] in the React documentation to understand how property
names work, as well as the special property names that React supports. You can
be assessed on the following special attributes:

* `checked`
* `className`
* `dangerouslySetInnerHTML`
* `htmlFor`
* `onChange`
* `style`
* `value`

Also, you can be assessed on knowing that React uses camel-case for its
attribute names so attributes like `maxlength` in HTML are `maxLength` in React.

## The JSX semicolon gotcha

You will also see code like this in other React projects, as well as in code
generated by tools. It is a function-based component that uses the `function`
keyword rather than an arrow function. Note the `return` statement.

```jsx
function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <div>Welcome to JSX.</div>
    </div>
  );
}
```

You'll see that the JSX block is wrapped in parentheses. This is due to the way
that JavaScript handles something called ["automatic semicolon insertion"].
Here's a simple example. What do you think the function returns? (Yes, this _is_
a "trick question".)

```js
function sum(i, j) {
  return
    i + j;
}
```

If the answer isn't obvious, start Node on the command line, type it in exactly
the way it is there, and try calling it with `sum(1, 2)`.

You may be surprised to see that it returns `undefined`. Here's why: when
JavaScript reads your source code, it tries to be "helpful". When it reads the
lines of your code, it asks, is each line a "complete" line? Is it and the
following lines valid JavaScript expressions? If the answer is "yes", then it
will add a semicolon at the end of the line _for you_. When it reads the above
"sum" function, the JavaScript runner "thinks" to itself:

* Ok, I have two lines:
  * `return`
  * `i + j;`
* Are each of those valid JavaScript expressions? Yes!
* Now, I will put semicolons at the end of the lines that don't have any
  * `return;`
  * `i + j;`

Now, your function, in the eyes of JavaScript, looks like this.

```js
function sum(i, j) {
  return; // <- There's a new semicolon!
    i + j;
}
```

That function never gets to `i + j` because it always returns "no value" on the
first line. Yikes!

To get around that, you can add parentheses to tell JavaScript that "more is
coming".

```js
function sum(i, j) {
  return (
    i + j
  );
}
```

Now, when JavaScript reads the line `return (`, it "thinks" to itself, "Well,
that's not a complete expression. There must be more coming. I will _not_ put
a semicolon there."

The same is true for functions containing JSX. The above code

```jsx
function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <div>Welcome to JSX.</div>
    </div>
  );
}
```

is equivalent to

```js
function App() {
  return (
    React.createElement(
      'div',
      null,
      React.createElement('h1', null, 'Hello!'),
      React.createElement('div', null, 'Welcome to JSX.'),
    )
  );
}
```

Without the parentheses starting right after the `return` keyword and ending
after the outer call of `React.createElement`, JavaScript would just stick a
semicolon after the `return` keyword and all of the fancy React stuff would get
ignored.

The message is clear: if you use the `return` keyword in a function to "return
some JSX", then make sure you wrap the JSX in parentheses.

## What you've learned

That's really all there is to JSX. You combine your knowledge of HTML and your
knowledge of `React.createElement` to allow the Babel tool to turn your code
into plain old JavaScript for you. Specifically, you have seen the following
conversions:

| Conversion type | JSX                    | JavaScript                                       |
|-----------------|------------------------|--------------------------------------------------|
| tags            | `<h1></h1>`            | `React.createElement('h1', null)`                |
| attributes      | `<img src="images/foo.png"/>` | `React.createElement('img', { src: "foo.png" })` |
| variables       | `<h1>{message}</h1>`   | `React.createElement('h1', null, message)`       |

You've also read about the special property names that React supports.

Finally, you learned about the frustrating side effect of "automatic semicolon
insertion" and, if you do use the `return` keyword in your functions, that you
should wrap the JSX in parentheses to prevent JavaScript from _not_ returning
your code.

[Babel]: https://babeljs.io/
[Create React App]: https://github.com/facebook/create-react-app
[link to Babel]: https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3
[DOM Elements]: https://reactjs.org/docs/dom-elements.html
["automatic semicolon insertion"]: https://www.ecma-international.org/ecma-262/#sec-rules-of-automatic-semicolon-insertion
