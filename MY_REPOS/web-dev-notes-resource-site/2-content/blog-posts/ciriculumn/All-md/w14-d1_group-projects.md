# WEEK-14 DAY-1<br>*Group Projects* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->
________________________________________________________________________________
________________________________________________________________________________
# React

You've been using what we call _vanilla JavaScript_ (often referred to as
_Vanilla.js_) to build your front-end applications. And, you may have noticed that
it's _hard_. Creating strings to put new DOM into the page _should_ be easier.

In this article, you will find out more about React and why you should consider
using it as a way to build separate front-end apps.

## A front-end timeline

Lots of JavaScript/CSS libraries and frameworks have been invented to ease the
pain of front-end development. Here's an abbreviated list of some of the more
noteworthy ones in chronological order. Please click on each of the links and
just quickly browse each of these libraries' Web sites to get a feel for the
functionality each provides you.

* [script.aculo.us]: (2005) This is one of the first libraries that started
  easing this by adding special effects and dynamic content for client-side
  development.
* [dojo]: (2005) This toolkit added a log of non-visual and visual components
  that allowed developers to rapidly develop AJAX-enabled applications.
* [YUI]: (2006) A full framework that provided dynamic loading of scripts,
  events, visual components, data binding, and a philosophy on how to build
  client-side applications.
* [Knockout]: (2010) This is a standalone JavaScript implementation of the
  [Model-View-ViewModel] pattern used to build very fast dynamic components for
  client-side applications. It is the progenitor of many other libraries,
  include React.
* [AngularJS]: (2011) This framework from Google built on the success of Knockout
  and introduced a full set of utilities and philosophies to build modular
  client-side applications. (The current version has been branded [Angular].) In
  the rewrite of Angular to make the idea of a component a first-order concept,
  many developers left and joined the React community.
* [Elm]: (2012) This is an entirely new _language_ used to build front-end
  applications. You write your front-end application in Elm. Then, you "compile"
  it. The Elm "compiler" translates all of the source code written in Elm to
  highly-tuned JavaScript so that it runs really fast in your Web browser. It
  claims that by using Elm that your front-end code will have "no runtime
  exceptions" which is a bold (and mostly true) claim.

## React (2013)

In an effort to make its own Web front-end more maintainable, Facebook decided
to build its own JavaScript-based library to create fast and functional
front-end Web applications. Thus, React was born.

React manages the **creation and updating of DOM nodes in your Web page**. It
does not do AJAX. It does not do services. It does not do local storage. It does
not provide a pretty CSS framework for you. It just dynamically renders stuff
into the DOM

Because of Facebook's immense popularity as a developer-centric organization,
React was quickly adopted across the software-development industry, eclipsing
the use of all other front-end libraries and frameworks for many years. React is
still considered the _standard_ front-end library to use to build modern Web
applications.

React is _unopinionated_ about many aspects of front-end development. It doesn't
care how you make AJAX calls. It doesn't really care about how your page is laid
out. It has a few simple rules that you must follow, and _It Just Works_. You'll
learn about those in the next article, _React Concepts and Features_.

Working with plain old React became a real chore for anything non-trivial, so
they invented a new language to help write React applications. That language is
called JSX, or JavaScript eXtension. It looks like a mixture of JavaScript and
HTML (technically, XML).

Instead of writing Vanilla.js like this to create some DOM elements based on
some data that comes back from an API call. Don't worry about understanding what
you see. You will get the opportunity to learn more about all of this in later
articles, lectures, and projects.

```js
fetch('https://example.com/api/people')
  .then(response => response.json())
  .then(people => {
    const html = '<ul>';
    for (let person of people) {
      html += `<li>${person.lastName}, ${person.firstName}</li>`;
    }
    html += '</ul>';
    document.querySelector('#people-list').innerHTML = html;
  });
```

You would write something like this using JSX.

```jsx
function PeopleList(props) {
  return (
    <ul>
      {props.people.map(person => (
        <li>{person.lastName}, {person.firstName}</li>
      ))}
    </ul>
  );
}

const peopleListElement = document.querySelector('#people-list');
fetch('https://example.com/api/people')
  .then(response => response.json())
  .then(people => {
    const props = { people };
    ReactDOM.render(<PeopleList props={props}/>, peopleListElement);
  });
```

In this "simple" example, you may think, "Well, that's like twice the code! Why
would I do that?" Great question! When you start building _lots of components_,
lots of different pieces of visual widgets to put together to manage a complex
graphical human interface, it becomes really nice to put each of those functions
(or classes) into their own files and _organize_ the code so you know where
everything is.

## Using tools with React

Oh, and the tools! Because software developers constantly look for ways to make
things easier, the tools that have grown up around React are amazing. You'll
install React DevTools, a new tab in the Developer Tools that lets you see how
React actually works in the browser, much like the _Elements_ tab does for just
HTML elements.

![React DevTools]

There is `create-react-app`, an extensible command-line tool that
helps you generate standard React applications. We'll show you how to use it
with custom templates, too, to help remove some of the over-engineered stuff
that comes with the standard template.

Because browsers only understand JavaScript and not JSX, there is an extra
"build step" involved with creating React-based front-end applications. There
are a variety of tools that software developers use to make this happen. The
most popular, right now, is to use a tool called [Webpack]. Later this week,
you'll get into some of the details about how that works.

![Webpack.js]

A really popular feature of modern React development is the concept of _hot
module replacement_ (HMR). When you make changes to your source code, right now,
you must refresh your browser to see the changes. HMR sense what has changed and
send the change to the browser without you having to refresh it. The changes are
delivered in _real-time_, updating the UI for you as you make changes to the
source code. It is almost magic what happens.

After using React on their own massively complex Web interface, React developers
decided they did need to have an opinion about how to architect the state of
their application, that is, how to allow discretely different parts of their Web
page to consume and modify data received from back-end APIs. This introduced the
_Flux architecture_ which you will learn about next week.

![Flux]

## Choosing React

Because of the tools, because of the popularity, because (seemingly) _everyone_
knows React, choosing React to power your front-end is an easy choice. Hundreds
of thousands of other software developes know and love React. Tens of thousands
of companies use React on their Web sites and to power their Web applications.
App Academy's own learning platform that you're reading this on uses React as
the way to render content.

There are other viable modern alternatives to React. However, they are almost
all heavily influenced by React's design and implementation. Learning them is
like learning React and different parts of its vibrant ecosystem. React has
really become the stick by which all other front-end libraries are measured. And
will likely continue to hold that position for the near future.

## What you've just seen

In this article, you've discovered that React is one of many front-end libraries
that you can use to build dynamic data-driven front-end JavaScript-based modern
Web applications. You've seen that React has its own language, JSX, to easily
write React applications. In addition to an easy-to-use language to write in,
the React team and community have created a bunch of tools and utilities for you
to use and add to your React application; these will help you inspect and debug
your application as you build it. React is a _safe_ choice because you learn
about it here and in hundreds of other places.
________________________________________________________________________________
# React Concepts And Features

In this article, you will gain insight into why you may want to use React for
the front-end portion of your application, the part that runs in the browser,
as opposed to using plain-old vanilla JavaScript, that is, just the JavaScript
found in the browser.

## Modularity

Unlike the mess of code that you can create with event listeners and template
strings in your JavaScript code to manipulate the DOM by adding, updating, and
removing elements from it, React provides modularity from the ground up. If you
see modularity, understanding where code is that's running, then React is for
you.

## Easy to start

You don't need any special tools to use basic React. You can just import some
files and get to work using the `createElement` method that React provides to
define reusable "components" for what appears in the browser. They can be as
simple as a really cool button, or as complex as Facebook's Web UI.

For more complex applications, there are may tools available to you to get a
fully-functioning React application running from a single command on the
command line, tools such as _Create React App_. This handy tools will create a
full React application with live reload, testing, and support for things like
advanced CSS manipulation.

## Declarative programming

In the same way that you use HTML to _declare_ what the user interface should
look like, React provides the same mechanism in its element-based programming
API, either through the `createElement` method or the higher-level language
known as JSX.

## Reusability

React encourages you to think in terms of reusability as you construct the user
interface from elements and components that you create. It works best when you
think of the page as pieces of UI working in harmony with one another. When you
make a list or a button or a product card, you can then reuse those components
to show different data that your UI demands to show.

## One-flow of data

React applications are built as a combination of parent and child components. As
the names suggest, each child component has a parent and a parent component will
have one or more child components. Components receive data via an argument
traditionally named `props`. Parent components can decide the data that its
children should show by passing only a subset of what it has to its children.
Data is never passed up from the child to the parent. Because you always know
which way data flows, you can more easily debug your application to determine
where the data display or event handling code is.

## The "virtual DOM"

You may have come to the conclusion that writing things like

```js
el.innerHTML = `
  <table>
    <tbody>` +
      arr.map(item => `<tr><td>${item.name}</td></tr>`)
    + `</tbody>
  </table>
`;
```

is hard to debug, maintain, and use in the long run.  React solves this problem
by providing a virtual DOM (in memory) that acts as an agent between the
developer and the real DOM. The virtual DOM is a lot more user-friendly for
developers.

## Speed

Due to the use of a virtual DOM, React handles changes to a Web page more
intelligently than just string manipulation. It is constantly monitors the
virtual DOM for changes. It very efficiently reconciles changes in the virtual
DOM with what it has already produced in the real DOM. This is what
makes React one of the speediest front-end libraries available.

## What you learned

You'll learn more about these in the upcoming videos and over the next couple
of days. Happy Reacting!

You found out that React has a variety of good points that encourage you to
choose it as the means to build your front-end:

* React encourages modular development
* React is easy to use, easy to start with, and has some great tools
* React follows the declarative programming style
* React encourages reusability in your code
* React has one way that data flows, which makes it much easier to reason about
  the code
* React uses a "virtual DOM" to make changes to the real DOM very fast and
  efficient

________________________________________________________________________________
# Intro to ES6 Modules

Now, you will learn more about ES6 module syntax and how it is used to export
and import items between different files. You'll compare the differences between
managing exports with ES6 module syntax vs CommonJS module syntax. At the end of
this article, you will understand how to manage your exports and imports with
ES6's:

* `export default` statement to export one item per file
* `export` keyword to export multiple items per file
* `import ... from` statement to import items from one file to another
* `export default` statement to export an unnamed item and rename the item in an
  import statement
* `as` keyword (in an `import ... from` statement) to _alias_ and _namespace_
  all of a file's exported items

## Exporting one item per file

You cannot export multiple items per file by using an `export default` statement
with ES6 module syntax. For instance, the example below will only export the
`Wallet` class from the file.

**ES6 modules**

```js
export default class Wallet {
  // ...
}

// sayHello will not be exported
function sayHello() {
  console.log('Hello!');
}
```

The `export default` statement is equivalent to using `module.exports` to
directly export **one** item from a file using (instead of an object).

**CommonJS modules**

```js
class Wallet {
  // ...
}

// sayHello will not be exported
function sayHello() {
  console.log('Hello!');
}

module.exports = Wallet;
```

## Exporting multiple items per file

You can export multiple items per file by using the `export` keyword
(**without** the `default` keyword) with ES6 module syntax. Using ES6's export,
you have two options for exporting items. You can export each item as you define
it. With ES6 modules, the preferred method to export multiple functions or
classes from a single file is to export each function or class as it's defined.

**ES6 modules (parts of an export)**

```js
export class Wallet {
  // ...
}

export function sayHello() {
  console.log('Hello!');
}

export const sayHi = () => {
  console.log('Hi!');
};
```

Alternatively, you can refer to each item by name and export them all within an
object. This is the unpreferred method to export multiple functions or classes.

**ES6 modules (export object)**

```js
class Wallet {
  // ...
}

function sayHello() {
  console.log('Hello!');
}

const sayHi = () => {
  console.log('Hi!');
};

export {
  Wallet,
  sayHello,
  sayHi,
};
```

Using ES6's `export` keyword is similar to how you can export classes and
functions as individual parts of an export or an export object with CommonJS
module syntax. Unlike with ES6 modules, the preferred method to export multiple
items from a single file with CommonJS modules is to export an object with
`module.exports`.

**CommonJS modules (export object)**

```js
class Wallet {
  // ...
}

function sayHello() {
  console.log('Hello!');
}

const sayHi = () => {
  console.log('Hi!');
};

module.exports = {
  Wallet,
  sayHello,
  sayHi,
};
```

## Importing with ES6 vs CommonJS

| ES6 modules                          | CommonJS modules                          |
|--------------------------------------|-------------------------------------------|
| `import { Wallet } from './wallet';` | `const { Wallet } = require('./wallet');` |
| `import * as fs from 'fs';`          | `const fs = require('fs');`               |

Although calls to the `require` method can be anywhere in a JavaScript file
using CommonJS modules, this is not the case for ES6 modules. For ES6 modules,
the `import` statements must always be at the top of the file because imports
have to occur before the rest of the file's code runs.

**CommonJS modules**

```js
let { Wallet } = require('./wallet');

const wallet = new Wallet();

let fs = require('fs');
```

**ES6 modules**

```js
import { Wallet } from './wallet';
import * as fs from 'fs';

const wallet = new Wallet();
```

## Unnamed default imports

You can give unnamed items that are exported with `export default` any name you
want when importing them. For example, imagine if you `export default` a
`Wallet` class from a file name `wallet.js`. When you import the `Wallet` class
into `newFile.js`, you can rename the `Wallet` class because of how you used
`export default` to export the class from the `wallet.js` file.

**wallet.js**

```js
export default class Wallet {
  // ...
}
```

**newFile.js**

```js
import Money from 'wallet.js';

const wallet = new Money();
```

However, if you used the `export` instead of `export default`, you are using a
named export. With named exports, the import names have to exactly match.

**wallet.js**

```js
export class Wallet {
  // ...
}
```

**newFile.js**

```js
import { Wallet } from 'wallet.js';

const wallet = new Wallet();
```

## Aliasing imports

You can use an asterisk (`*`) to [import an entire module's contents]. Note that
you must alias your imported object using the `as` keyword to be able to refer
to it later. Aliasing can be used to namespace all the exported functions,
constants, etc. from a file to wrap them into a single, easily referenced
object.

**greetings.js**

```js
export function sayHello() {
  console.log('Hello!');
}

export const sayHi = () => {
  console.log('Hi!');
};
```

**newFile.js**

```js
import * as Greetings from 'greetings.js';

Greetings.sayHello(); // Hello!
Greetings.sayHi();    // Hi!
```

You can also use aliasing to rename identically named functions or items from
different files. For example, take the two `Wallet` classes below. Both classes
are named `Wallet`, but they come from different files. The `Wallet` from the
`wallet1` file is aliased as `W1` while the `Wallet` from the `wallet2` file is
aliased as `W2` to differentiate between the two `Wallet` classes.

```js
import { Wallet as W1 } from './wallet1';
import { Wallet as W2 } from './wallet2';

const w1 = new W1();
const w2 = new W2();
```

## Browser support for ES6 Modules

ES6 modules can only be used when a file is specified as a `module`. You can use
an HTTP server to serve an HTML file with a `<script>` tag of `type="module"`.
By running a local web server, you gain browser support for ES6 module syntax by
using a `<script>` tag in an HTML file to specify a JavaScript file as an ES6
module (not just a normal JavaScript file). Note the `<script>` tag of
`type="module"` below:

```html
<script type="module" src="./wallet.js"></script>
```

### Mini-project

Follow the guidelines below to use an HTTP server and import JavaScript files
with ES6 module syntax:

1. Create a folder with an `index.html` file. Fill in the file with the contents
   below. Note the use of the `type="module"` attribute in the `<script>` tag.
   You must include the `.js` file extension in the name of the module
   (`./program.js`). The browser needs to know the entire name of the JavaScript
   file it will be loading from a server.
    ```html
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Browser</title>
    </head>
    <body>
      <button id="button">Start Game</button>
      <div id="message"></div>
      <script type="module" src="./program.js"></script>
    </body>
    </html>
    ```
2. Create a `game.js` file with the contents below:
    ```js
    export class Game {
      constructor() {
        this.gameStartMessage = "Hello! Do you want to play a game?";
      }

      start() {
        document
          .getElementById('button')
          .addEventListener('click', () => {
            const messageContainer = document.getElementById('message');
            messageContainer.innerText = this.gameStartMessage;
        });
      }
    }
    ```
3. Create a `program.js` file with the contents below:
    ```js
    import { Game } from './game.js';

    window.addEventListener('DOMContentLoaded', () => {
      const game = new Game();
      game.start();
    });
    ```
4. Make sure you are in the directory of your HTML and JavaScript files set up
   an HTTP server with `python3 -m http.server` to serve the `index.html` file
   to the browser.
5. When the browser reads the `index.html` file, it will read the `<script>` tag
   and know that the JavaScript file is using ES6 module syntax
   (`type="module"`) to load the `program.js` file.
6. The browser will start reading the `program.js` file from top to bottom,
   reading the `import { Game } from './game.js';` statement first. Note that
   the `.js` file extension must be present for the browser to know the entire
   name of the JavaScript file to load from the server.
7. The browser will then load the `game.js` file and all the code in the loaded
   JavaScript files will run!

## What you've learned

In this reading, you learned about managing exports and imports with ES6 modules
and how using ES6 modules compares to using CommonJS modules. You learned that:

* ES6 has `import` and `export` keywords (instead of `require` and
  `module.exports`)
* ES6 `import` statements are always at the top of the file
* The `export` keyword to exports multiple items from a file while the `export
  default` phrase exports **one** item from a file
* You can rename an item that is exported with `export default`
* The `as` keyword can be used to alias an imported item
* The `*` character can be used to [import an entire module's contents] with a
  namespace (`import * as Namespace from 'fileName.js';`)
* ES6 modules can only be used when a file is explicitly specified as a
  `module`, either through an HTML file with a `<script>` tag of `type="module"`
  or a `package.json` file with a `"type": "module"` field

[import an entire module's contents]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Import_an_entire_modules_contents

________________________________________________________________________________
# Show And Tell

It's time to show off all of the hard work that you've done! Great job! You
worked as a team, pushed hard through the project, coordinated, collaborated,
communicated.

You are a real software development team!

Each presentation should last around 15 minutes. Some things that you may want
to highlight:

* The way that you integrated front- and back-ends
* Anything that you added that went beyond the bound of what you learned in
  class and how that went
* Reflect on the goods and bads of the experience _as a team_, talk about what
  you would do differently if you could start over with all the knowledge you
  have, right now
