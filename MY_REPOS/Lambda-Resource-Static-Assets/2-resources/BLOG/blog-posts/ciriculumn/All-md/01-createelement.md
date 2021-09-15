# From JavaScript To DOM
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Using React](#using-react)
- [Creating elements](#creating-elements)
- [Converting to virtual DOM](#converting-to-virtual-dom)
- [Updates](#updates)
- [What you've learned](#what-youve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

The path from JavaScript to actual DOM elements appearing in your HTML document
is not complex thanks to React. However, it is worth reviewing so that there is
no mystery about it.

In this article, you will review how to use `React.createElement` to get what
you want into React's virtual DOM so that React will convert into real DOM.
There are three steps:

* Invoking `createElement` to build the "element tree"
* Invoking `render` to let React build its virtual DOM
* "Waiting" for React to convert its virtual DOM into real DOM

This article's goal is for React to create the following HTML in the DOM.

```html
<ul>
  <li class="selected">
    <a href="/pets">Pets</a>
  </li>
  <li>
    <a href="/owners">Owners</a>
  </li>
</ul>
```

## Using React

There is one method to consider when building interfaces using low-level React.
From the [documentation], the `React.createElement` function has the following
form:

```js
React.createElement(
  type,
  [props],
  [...children]
)
```

The arguments for it are

* **type**: the type of element to create, either a string for an HTML element,
  or a reference to a function or class that is a React component
* **props**: an object that contains data to render the element, either data to
  dynamically show or attributes to put on the element in the HTML
* **children**: the children of the element, as many as you want

## Creating elements

For each tag that you want to create with React, you will make a call to
`React.createElement`. In the HTML above, there are five tags to create:

* One `ul` element
* Two `li` elements
* Two `a` elements

Three of those tags have attributes that you want to have appear in the DOM:

* One `li` element has a "class" attribute (which you _must_ translate to
  "className" when using in React)
* Both `a` elements have "href" attributes

Finally, there is a parent-child relationship between the elements.

* The `ul` element is the parent of both `li` elements
* Both `li` elements have a single `a` element child
* Both `a` elements have "child" text content

To summarize, here are the elements and how you would translate them to their
respective arguments for `React.createElement`.

| HTML snippet                    | type   | props                       | children                                                    |
|---------------------------------|--------|-----------------------------|-------------------------------------------------------------|
| `<ul>...</ul>`                  | `'ul'` | `null`                      | Two calls to `React.createElement`, one for each `li` child |
| `<li class="selected">...</li>` | `'li'` | `{ className: 'selected' }` | One call to `React.createElement` for the `a` child         |
| `<li>...</li>`                  | `'li'` | `null`                      | One call to `React.createElement` for the `a` child         |
| `<a href="/pets">Pets</a>`      | `'a'`  | `{ href: '/pets' }`         | The string `'Pets'`                                         |
| `<a href="/owners">Owners</a>`  | `'a'`  | `{ href: '/owners' }`       | The string `'Owners'`                                       |

To create this tree of elements, you will use nested calls to
`React.createElement`. The standard formatting for this is for elements to have
children, put each argument on its own line, and for elements that have no
children or just text content, put all arguments on a single line.

Since the `ul` has children, it will have its arguments on separate lines.
Referring to the table above gives you:

```js
React.createElement(
  'ul',
  null,
  // First li child,
  // Second li child,
);
```

The first `li` element has a child. Its call to `React.createElement` will have
its arguments each go on their own separate lines:

```js
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    // a child
  ),
  // Second li child,
);
```

The anchor element for "Pets" has only one text child. Its call to
`React.createElement` will have its arguments on one line:

```js
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  // Second li child,
);
```

The second `li` element has a child. Its call to `React.createElement` will have
its arguments each go on their own separate lines:

```js
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    // a child
  ),
);
```

The other anchor element, the one for "Owners" has only one text child. Its call
to `React.createElement` will have its arguments on one line:

```js
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    React.createElement('a', { href: '/owners'}, 'Owners'),
  ),
);
```

That's how you translate what you want from simple HTML into well-formatted
calls to `React.createElement`. That will build the "element tree" for React to
use.

## Converting to virtual DOM

To tell React to start the conversion process, you have to use the
`React.render` method which takes a value returned from `React.createElement`
and a DOM node in the actual document where React will insert the result of the
conversion into real DOM.

If you wanted to insert what was created in the last section into the `main`
tag, the most forward way of doing that is like this.

```js
// Put the element tree in a variable
const navList = React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    React.createElement('a', { href: '/owners'}, 'Owners'),
  ),
);

// Get a DOM node for React to render to
const mainElement = document.querySelector('main');

// Give React the element tree and the target
ReactDOM.render(navList, mainElement);
```

At this point, you have given the element tree that you want created to React.
It will then take that and construct its virtual DOM from it.

![Convert element tree to virtual DOM]

Now that it has built it's own model of the virtual DOM using the elements that
you created, it can now take that and turn that into real DOM.

![Convert virtual DOM to real DOM]

It takes that real DOM and inserts it as the content of the target that you gave
it which, in this case, is the `main` element in the body of the document.

## Updates

When you call `React.render` again for the same component and target, React
takes the existing virtual DOM it knows about last time it rendered the element
tree, compares it to whatever new thing you want to render, and determines which
(if any) of the living DOM needs to change.

For example, let's say you constructed the same element tree but left off the
"selected" class for the first list element. Then, when you rendered it, again,
by calling `React.render`, React would compare the new element tree with the old
element tree, figure out that one class was missing on that one `li` element,
and remove that and only that from the real DOM.

![Virtual DOM diff]

## What you've learned

In this article, you learned

* To convert desired HTML into properly-formatted nested calls of
  `React.createElement`
* How React takes your element tree and builds its virtual DOM from the elements
  that you created
* How React takes that virtual DOM and inserts it into the living HTML document
* How React will compare an old virtual DOM tree with a new virtual DOM tree,
  figure out what changed, and then change that and only that in the real DOM


[documentation]: https://reactjs.org/docs/react-api.html#createelement
[Convert element tree to virtual DOM]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-example-conversion-virtual-dom.svg
[Convert virtual DOM to real DOM]: images/react-example-conversion-real-dom.svg
[Virtual DOM diff]: images/react-example-virtual-dom-diff.svgimages/react-example-virtual-dom-diff.svg orderedList=false} -->
