# Walk-Through: Creating Elements In React
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Getting started](#getting-started)
- [Test that things are working](#test-that-things-are-working)
- [Walking through the code](#walking-through-the-code)
  - [Those wacky import statements](#those-wacky-import-statements)
  - [The odd-looking function](#the-odd-looking-function)
  - [Putting it in the page](#putting-it-in-the-page)

<!-- /code_chunk_output -->
________________________________________________________________________________

To start your React journey, you will build your foundational knowledge by
starting out with the basic `React.createElement` and `ReactDOM.render`. One of
the compelling features of this type of solution is that you do not need _any_
extra tools to get your app running in the browser. In the next walk-through,
you will have to _install_ a ton of packages just to get React to properly work.
This project will walk you through how to use a pure JavaScript version of
React. Everything will work right out of the box.

## Getting started

Install the [React DevTools for Google Chrome].

![React DevTools for Google Chrome screenshot]

Create a new directory to contain this new project. In that directory, create
two files: an **index.html** file and an **app.js** file. In the **index.html**
file, create a standard HTML 5 document. In the HTML `body` (in this order),
create a `main` element and a `script` element for your **app.js** file with
`type="module"` so you can use ES6 modules.

Serve your files with a local Python server by running the `python3 -m
http.server` command in your terminal. Make sure you are running the command
from within your project directory. You should be able to open
http://localhost:8000 to see the page, empty as it is.

## Test that things are working

Get ready! You're going to do the first React thing! You're going to create a
React element that will display "Hello, programmers!". You will then have React
render it to the DOM.

Copy and paste the following JavaScript code into your **app.js**, refresh your
page, look at the code to get a feel for what it does, try to come up with
explanations on your own, and then continue reading.

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers',
);

const target = document.querySelector('main');
const app = React.createElement(HelloWorld, null);
ReactDOM.render(app, target);
```

**Note**: You may want to turn on "Disable cache" on the _Network_ tab of your
DevTools and keep the DevTools open while you're doing this to make sure you
always have the newest version of the files.

You should now have _Components_ and _Profiler_ tabs in your DevTools. If you
click on the `HelloWorld` component in the _Components_ tab, you can see that it
has no _props_. You'll learn much more about props later. For now, just remember
that the React DevTools extension is a helpful tool for you to view information
about your components and their props.

## Walking through the code

Even though there are only five statements in that code block, a lot is going
on. This section carefully walks through each of the statements to help you get
a deeper understanding.

### Those wacky import statements

Consider those `import` statements. These differ in two ways from what you've
seen with ES modules to date.

1. They come from another website altogether. When you use `import` to bring in
   modules from another domain, that request is governed by CORS; that means the
   other server _must_ have CORS configured to let you import their code.
   Luckily, unpkg.com configures CORS to allow any authority to import their
   script files.
2. They don't seem to import anything. There is no `import { React } from`
   there. It's just `import 'url'`. This is called a _side effect_ import and is
   generally frowned upon in modern Web development. But, React does not package
   their code in ES6 format. What those `import` statements do is _add variables
   in the global scope_. The two variables they add are `React` from the first
   import, and `ReactDOM` from the second import. Those global variables can
   then be used by your code, which happens with `React.createElement` and
   `ReactDOM.render`.

If you were going to move these into production, you would change the URLs that
you import from

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';
```

to

```js
import 'https://unpkg.com/react@16/umd/react.production.min.js';
import 'https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js';
```

Those files contain the minified "production" version of the code, which is just
a smaller version of the "development" versions. If you open up the links to the
[react.development.js] and [react-production.min.js] files in your browser,
you'll see JavaScript in both files. Notice how the non-minified version
([react.development.js]) includes plain JavaScript you're used to seeing. The
minified version simply compresses that JavaScript.

### The odd-looking function

Turn your attention to this statement.

```js
const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);
```

The statement declares the `HelloWorld` variable and stores a function in it.
This is the way that components look in React. It is a function-based component
because it's a function. It returns the value returned from
`React.createElement`. If that syntax is weird, it is functionally the same as
this code.

```js
const HelloWorld = () => {
  return React.createElement('h1', null, 'Hello, programmers!');
}
```

Because there are a lot of die-hard functional programmers (as opposed to
object-oriented programmers) that like that kind of syntax (arrow functions
without curly braces that span multiple lines), you will see it in a lot of
places while learning React.

The arguments passed to `React.createElement` are:

1. What to create in the DOM.
  * If it is a string, it needs to be all lowercase and the name of the HTML
    element to create. This example passes in `'h1'` as the tag to create in the
    DOM.
  * Otherwise, it should be the variable that holds another component. You can
    see it being used that way in the later code.
2. Any properties/attributes to put on the generated element. This example
   passes in `null` because there are no attributes needed. You will see some,
   soon.
3. The child content of the element. The third (and fourth and fifth and...)
   arguments contains what React should put as the children of the content of
   the element. In this case, the content is `'Hello, programmers!'`.

**Important**: Every time this walk-through asks you to create a function-based
component, this is what it will mostly look like. It will look like this _or_ it
will look like this and have a single parameter named `props` like this.

```js
// Without the need for data
const HelloWorldNoData = () => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);

// With the need for data has the
// props parameter.
const HelloWorldWithData = props => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);
```

### Putting it in the page

The last three statements in the code block are these.

```js
const target = document.querySelector('main');
const app = React.createElement(HelloWorld, null);
ReactDOM.render(app, target);
```

The first line is something you should be really familiar with. You are
selecting the `<main>` element and referencing it as `target`.

The second line is using `React.createElement` to create an element from the
`HelloWorld` function-based component discussed in the last section. It has
`null` properties.

The third line _renders_ the component into the actual Web page, the component
specified by the first argument, which is the one created from the `HelloWorld`
component. Remember that you can open your DevTools, find the _Components_ tab,
and click it to see the React DevTools show you the "HelloWorld" component
rendered by React.

![Hello programmers with dev tools]

Before moving on, add some more to that, so you get a feel for how it works.
Replace the content of your **app.js** with this stuff. The comments to the
right of each line shows what React will do with the stuff only after you call
`ReactDOM.render` with it.

> **Note:** since you have not included a CSS file to style `#nav-links` and
> `.is-selected` in your project, the `id` and `className` aren't actually being
> used for any styling purpose. The code below includes an `id` and `className`
> to shows an example of setting `id` and `className` with `React.createElement`
> and how it translates to HTML.

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const Links = () => React.createElement(
  'ul',                                  // <ul
  { id: 'nav-links' },                   //  id="nav-links">
  React.createElement(
    'li',                                // <li
    { className: 'is-selected' },        //  class="is-selected">
    React.createElement(
      'a',                               // <a
      { href: 'https://appacademy.io' }, //  href="...">
      'App Academy'                      //    App Academy
    ),                                   // </a>
  ),                                     // </li>
  React.createElement(
    'li',                                // <li>
    null,
    React.createElement(
      'a',                               // <a
      { href: 'https://aaonline.io' },   //  href="...">
      'a/A Open',                        //  a/A Open
    ),                                   // </a>
  ),                                     // </li>
);                                       // </ul>

const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers',
);

// Creates the HelloWorld first and, then, creates
// the Links
const AllTogether = () => React.createElement(
  'div',
  null,
  React.createElement(HelloWorld, null),
  React.createElement(Links, null),
);

const target = document.querySelector('main');
const app = React.createElement(AllTogether, null);
ReactDOM.render(app, target);
```

Look at what gets produced in the _Elements_ tab of your DevTools. Look at what
gets produced in the _Components_ tab of your DevTools for all three of your
components. Play around with it: change tags, replace some of those `null`
second arguments with objects to see what gets presented. Give it a whirl. From
this point on, you'll be working with JavaScript code known as **JSX** in your
React projects. JSX is just syntactic sugar that translates to creating React
element objects. Although you won't be creating full-scale projects with
`React.createElement`, it's important to remember that React is actually using
`React.createElement` under the hood.

[React DevTools for Google Chrome]:
  https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[Hello programmers with dev tools]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-hello-programmers-create-element-with-react-tools.png
[React DevTools for Google Chrome screenshot]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-devtools.png
[react.development.js]:
  https://unpkg.com/react@16/umd/react.development.js
[react-production.min.js]:
  https://unpkg.com/react@16/umd/react.production.min.js
