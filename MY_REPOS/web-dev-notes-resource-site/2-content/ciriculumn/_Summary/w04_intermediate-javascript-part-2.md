# WEEK 4<br>*Intermediate JavaScript (Part 2)* {ignore=true}
________________________________________________________________________________

<!-- code_chunk_output -->

[**Browser Basics Learning Objectives**](#browser-basics-learning-objectives)
- [Browsers: They’re The BOM Dot Com!](#browsers-theyre-the-bom-dot-com)
  - [The DOM vs. the BOM](#the-dom-vs-the-bom)
  - [The browser diagram](#the-browser-diagram)
- [The Request-Response Cycle](#the-request-response-cycle)
  - [The request-response cycle diagram](#the-request-response-cycle-diagram)
  - [The browser’s role in the request-response cycle](#the-browsers-role-in-the-request-response-cycle)
- [Running Scripts In The Browser](#running-scripts-in-the-browser)
  - [Using the Window API](#using-the-window-api)
  - [Context, scope, and anonymous functions](#context-scope-and-anonymous-functions)
  - [Running a script on DOMContentLoaded](#running-a-script-on-domcontentloaded)
  - [Running a script on page load](#running-a-script-on-page-load)
  - [Ways to prevent a script from running until page loads](#ways-to-prevent-a-script-from-running-until-page-loads)
- [Project: Fresh Cookies In The Window: Come And Get ‘Em!](#project-fresh-cookies-in-the-window-come-and-get-em)
  - [Introduction](#introduction)
  - [Project overview](#project-overview)
  - [Phase 1: Using a local Node/Express server (_Whoa!_)](#phase-1-using-a-local-nodeexpress-server-_whoa_)
  - [Phase 2: Add a script on DOM/page load (_Practice makes perfect._)](#phase-2-add-a-script-on-dompage-load-_practice-makes-perfect_)
  - [Phase 3: Set a cookie in the window (_Freshly baked!_)](#phase-3-set-a-cookie-in-the-window-_freshly-baked_)
  - [Phase 4: No such thing as just one more cookie](#phase-4-no-such-thing-as-just-one-more-cookie)
  - [Phase 5: Gimme all the cookies](#phase-5-gimme-all-the-cookies)
  - [Phase 6: Removing a cookie](#phase-6-removing-a-cookie)
  - [Bonuses: More fun with cookies!](#bonuses-more-fun-with-cookies)
  - [Bonus A: Open a new window and resize it based on cookie value (_Smells great!_)](#bonus-a-open-a-new-window-and-resize-it-based-on-cookie-value-_smells-great_)

[**Element Selection Learning Objectives**](#element-selection-learning-objectives)
- [Hello, World DOMination: Element Selection And Placement](#hello-world-domination-element-selection-and-placement)
  - [What is the DOM?](#what-is-the-dom)
  - [Referencing the DOM](#referencing-the-dom)
  - [Creating New DOM Elements](#creating-new-dom-elements)
- [Hello, World DOMination: Inserting Elements in JS File and Script Block](#hello-world-domination-inserting-elements-in-js-file-and-script-block)
  - [Referencing a JS File vs. Using a Script Block](#referencing-a-js-file-vs-using-a-script-block)
- [Hello, World DOMination: Adding a CSS Class After DOM Load Event](#hello-world-domination-adding-a-css-class-after-dom-load-event)
- [Brush Up On Your HTML](#brush-up-on-your-html)
- [Hello, World DOMination: Console.log, Element.innerHTML, and the Date Object](#hello-world-domination-consolelog-elementinnerhtml-and-the-date-object)
  - [Console Logging Element Values](#console-logging-element-values)
  - [Using Element.innerHTML](#using-elementinnerhtml)
  - [Inserting a Date Object into the DOM](#inserting-a-date-object-into-the-dom)
- [DOM Project: Create a profile page with Javascript](#dom-project-create-a-profile-page-with-javascript)
  - [Introduction](#introduction-1)
  - [Project Overview](#project-overview-1)
  - [Phase 1: Setting up your HTML and Javascript files](#phase-1-setting-up-your-html-and-javascript-files)
  - [Phase 2: Populating your profile](#phase-2-populating-your-profile)
  - [Phase 3: Adding CSS classes and styles](#phase-3-adding-css-classes-and-styles)
  - [Phase 4: Adding a clock with the Date object](#phase-4-adding-a-clock-with-the-date-object)
  - [Bonus: You’re so extra!](#bonus-youre-so-extra)

[**Event Handling Learning Objectives**](#event-handling-learning-objectives)
- [Event Handling: Common Page Events](#event-handling-common-page-events)
  - [Handling a button click event](#handling-a-button-click-event)
  - [Handling a checkbox check event](#handling-a-checkbox-check-event)
  - [Handling a user input value](#handling-a-user-input-value)
- [Event Handling: Input Focus and Blur](#event-handling-input-focus-and-blur)
  - [Listening for focus and blur events](#listening-for-focus-and-blur-events)
- [Event Handling: Form Validation](#event-handling-form-validation)
  - [Validate passwords before submitting a form](#validate-passwords-before-submitting-a-form)
- [Event Handling: HTML Drag-And-Drop API](#event-handling-html-drag-and-drop-api)
  - [Basic drag-and-drop functions](#basic-drag-and-drop-functions)
  - [The example](#the-example)
  - [The first step of drag and drop](#the-first-step-of-drag-and-drop)
- [Event Handling: Click Events With Event.target](#event-handling-click-events-with-eventtarget)
  - [Use event.target to console.log the ID of a clicked div](#use-eventtarget-to-consolelog-the-id-of-a-clicked-div)
- [Event Handling: The Bubbling Principle](#event-handling-the-bubbling-principle)
  - [What is the bubbling principle?](#what-is-the-bubbling-principle)
  - [An event bubbling example](#an-event-bubbling-example)
  - [Stopping event bubbling with stopPropagation()](#stopping-event-bubbling-with-stoppropagation)
  - [Event delegation](#event-delegation)
- [Project: Event Handling With Mr. Spud Face](#project-event-handling-with-mr-spud-face)
  - [Project overview](#project-overview-2)
  - [Phase 1: Create a spud driver’s license](#phase-1-create-a-spud-drivers-license)
  - [Phase 2: Add focus and blur events to form inputs](#phase-2-add-focus-and-blur-events-to-form-inputs)
  - [Phase 3: Check that license numbers match](#phase-3-check-that-license-numbers-match)
  - [Phase 4: Update submit button click count](#phase-4-update-submit-button-click-count)
  - [Bonus: Mr. Spud Face Drag-and-Drop Game](#bonus-mr-spud-face-drag-and-drop-game)

[**JSON Learning Objectives**](#json-learning-objectives)
[**Storage Learning Objectives**](#storage-learning-objectives)
- [Cookies and Web Storage](#cookies-and-web-storage)
  - [Cookies](#cookies)
  - [Web Storage API](#web-storage-api)
- [Jason? No, JSON!](#jason-no-json)
  - [JSON is a format!](#json-is-a-format)
  - [Why all the confusion?](#why-all-the-confusion)
  - ["Remind me about JavaScript literals..."](#remind-me-about-javascript-literals)
  - [Boolean, numeric, and null values](#boolean-numeric-and-null-values)
  - [String literals in JSON](#string-literals-in-json)
  - [Array values](#array-values)
  - [Object values](#object-values)
  - [Some terminology](#some-terminology)
  - [Using the built-in JSON object](#using-the-built-in-json-object)
  - [You will almost never write raw JSON](#you-will-almost-never-write-raw-json)
  - [Brain teaser](#brain-teaser)
- [Using Web Storage To Store Data In The Browser](#using-web-storage-to-store-data-in-the-browser)
  - [Storing data in local storage](#storing-data-in-local-storage)
  - [Reading data in local storage](#reading-data-in-local-storage)
  - [JSON and local storage](#json-and-local-storage)
- [Project: Shop Local Storage!](#project-shop-local-storage)
  - [Project overview](#project-overview-3)
  - [Phase 1: Write a function to store an item in the cart](#phase-1-write-a-function-to-store-an-item-in-the-cart)
  - [Phase 2: Write a function to display the cart items](#phase-2-write-a-function-to-display-the-cart-items)
  - [Phase 3: Write a function to remove items from the cart](#phase-3-write-a-function-to-remove-items-from-the-cart)
  - [Check that your shopping cart functions correctly](#check-that-your-shopping-cart-functions-correctly)
  - [Bonus A: Update cart item quantities and reset values](#bonus-a-update-cart-item-quantities-and-reset-values)
  - [Bonus B: Calculate the item totals](#bonus-b-calculate-the-item-totals)

<!-- /code_chunk_output -->

________________________________________________________________________________
# WEEK-04 DAY-1<br>*Browser Basics* {ignore=true}
________________________________________________________________________________
# Browser Basics Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Explain the difference between the BOM (browser object model) and the
   DOM(document object model).
2. Given a diagram of all the different parts of the Browser identify each part.
   Use the Window API to change the innerHeight of a user's window.
3. Identify the context of an anonymous functions running in the Browser (the
   window).
4. Given a JS file and an HTML file, use a script tag to import the JS file and
   execute the code therein when all the elements on the page load (using
   `DOMContentLoaded`)
5. Given a JS file and an HTML file, use a script tag to import the JS file and
   execute the code therein when the page loads
6. Identify three ways to prevent JS code from executing until an entire HTML
   page is loaded
7. Label a diagram on the Request/Response cycle.
8. Explain the Browser's main role in the request/response cycle. (1.Parsing
   HTML,CSS, JS 2. Rendering that information to the user by constructing a DOM
   tree and rendering it)
9. Given several detractors - identify which real-world situations could be
   implemented with the Web Storage API (shopping cart, forms saving inputs
   etc.)
10. Given a website to visit that depends on cookies (like Amazon), students
    should be able to go to that site add something to their cart and then
    delete that cookie using the Chrome Developer tools in order to empty their
    cart.minal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Explain the difference between the BOM (browser object model) and the
   DOM(document object model).
2. Given a diagram of all the different parts of the Browser identify each part.
   Use the Window API to change the innerHeight of a user's window.
3. Identify the context of an anonymous functions running in the Browser (the
   window).
4. Given a JS file and an HTML file, use a script tag to import the JS file and
   execute the code therein when all the elements on the page load (using
   `DOMContentLoaded`)
5. Given a JS file and an HTML file, use a script tag to import the JS file and
   execute the code therein when the page loads
6. Identify three ways to prevent JS code from executing until an entire HTML
   page is loaded
7. Label a diagram on the Request/Response cycle.
8. Explain the Browser's main role in the request/response cycle. (1.Parsing
   HTML,CSS, JS 2. Rendering that information to the user by constructing a DOM
   tree and rendering it)
9. Given several detractors - identify which real-world situations could be
   implemented with the Web Storage API (shopping cart, forms saving inputs
   etc.)
10. Given a website to visit that depends on cookies (like Amazon), students
    should be able to go to that site add something to their cart and then
    delete that cookie using the Chrome Developer tools in order to empty their
    cart.

________________________________________________________________________________
# Browsers: They’re The BOM Dot Com!

If the Internet exists, but there’s no way to browse it, does it even really
exist? Unless you’ve been living under a rock for the past couple decades, you
should know what a browser is, and you probably use it multiple times a day.
Browsers are something most people take for granted, but behind the scenes is a
complex structure working to display information to users who browse the Web.

Web developers rely on browsers constantly. They can be your best friend or your
worst enemy. (_Yes, we’re looking at you, IE!_) Spending some time learning
about browsers will help you get a higher-level understanding of how the Web
operates, how to debug, and how to write code that works across browsers. In
this reading, we’ll learn about the BOM (Browser Object Model), how it’s
structured, and how it differs from the DOM (Document Object Model).

## The DOM vs. the BOM

By now, you’ve learned about the **DOM, or Document Object Model**, and that it
contains a collection of nodes (HTML elements), that can be accessed and
manipulated. In essence, the `document` object is a Web page, and the DOM
represents the object hierarchy of that document.

How do we access a document on the Web? Through a browser, of course! If we took
a bird’s-eye view of the browser, we would see that the document object is part
of a [hierarchy of browser objects][1]. This hierarchy is known as the **BOM, or
Browser Object Model**.

The chief browser object is the `window` object, which contains properties and
methods we can use to access different objects within the window. These include:

- `window.navigator`
  - Returns a reference to the navigator object.
- `window.screen`
  - Returns a reference to the screen object associated with the window.
- `window.history`
  - Returns a reference to the history object.
- `window.location`
  - Gets/sets the location, or current URL, of the window object.
- `window.document`, which can be shortened to just `document`
  - Returns a reference to the document that the window contains.

Note how we can shorten `window.document` to `document.` For example, the
`document` in `document.getElementById(‘id’)` actually refers to
`window.document`. All of the methods above can be shortened in the same way.

## The browser diagram

We started in the DOM, and we stepped outside it into the BOM. Now, let’s take
an even higher view of the browser itself. Take a look at this diagram depicting
a high-level structure of the browser, from [html5rocks.com][2]:

<p>
  <img src="images/browser.png" style="width: 100%; height: auto;">
</p>

- **User interface**: This is the browser interface that users interact with,
  including the address bar, back and forward buttons, bookmarks menu, etc. It
  includes everything except for the requested page content.
- **Browser engine**: Manages the interactions between the UI and the rendering
  engine.
- **Rendering engine**: Displays, or renders, the requested page content. If the
  requested content is HTML, it will parse HTML and CSS and render the parsed
  content.
- **Networking**: Handles network calls, such as HTTP requests.
- **Javascript interpreter**: Parses and executes JavaScript code.
- **UI backend**: Used for drawing basic widgets like combo boxes and windows;
  uses operating system user interface methods.
- **Data storage**: The persistence of data stored in the browser, such as
  cookies.

## What we learned:

- Review of the DOM, or Document Object Model
- How the BOM differs from the DOM
- The window object and related methods

[1]: http://itwebtutorials.mga.edu/js/chp1/browser-object-model.aspx
[2]: https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/

________________________________________________________________________________
# The Request-Response Cycle

Browsing the Web might seem like magic, but it’s really just a series of
**requests** and **responses**. When we search for information or navigate to a
Web page, we are requesting something, and we expect to get a response back.

We can think about the request-response cycle as the communication pattern
between a client, or browser, and a server. Whenever we type a URL into the
address bar of a browser, we are making a _request_ to a server for information
back. The most common of these is an `http request`.

## The request-response cycle diagram

Let’s take a look at this diagram of the request-response cycle from
[O’Reily][1]:

<p>
  <img src="images/request-response-cycle.png" style="width: 100%; height: auto;">
</p>

On the left is the **client** side, or the browser. On the right is the
**server** side, with a database where data is stored. The internet, in the
middle, is a series of these client requests and server responses. We'll be
going into more depth with servers soon, but for right now we are focusing on
the client side.

## The browser’s role in the request-response cycle

As depicted in the diagram, the browser plays a key role in the request-response
cycle. Besides letting the user make the request to the server, the browser
also:

1. Parses HTML, CSS, and JS
2. Renders that information to the user by constructing and rendering a DOM tree

When we make a successful request to the server, we are able to view a Web page
with content and functionality. Unsuccessful requests prevent the page from
loading and displaying information. You've probably seen a 404 page before!

Understanding the request-response cycle is fundamental to developing for the
Web. If a server is down, or something is wrong with the request, you’ll most
likely see an error on the client side. Learning how to debug these errors and
set up error handling is a common task for Web developers.

You can go to the **Network tab** of your browser’s **Developer Tools** to view
these requests and responses. Open a new tab, open up the Developer Tools in
your browser, and then navigate to `google.com`. Watch the request go through in
your Network tab!

## What we learned:

- Reviewed diagram of request-response cycle
- The client side vs. the server side
- The role of the browser
- Where to view Network requests in the browser

[1]: https://www.oreilly.com/library/view/using-google-app/9780596802462/

________________________________________________________________________________
# Running Scripts In The Browser

Timing is everything, in life as well as in code that runs in a browser.
Executing a script at the right time is an important part of developing
front-end code. A script that runs too early or too late can cause bugs and
dramatically affect user experience. After reading this section, you should be
able to utilize the proper methods for ensuring your scripts run at the right
time.

In previous sections, we reviewed how the DOM and BOM works and used event
listeners to trigger script execution. In this lesson, we’ll dig deeper into the
`window` object and learn multiple ways to ensure a script runs after the
necessary objects are loaded.

## Using the Window API

The `window` object, the core of the Browser Object Model (BOM), has a number of
properties and methods that we can use to reference the window object. Refer to
the MDN documentation on the [Window API][1] for a detailed list of methods and
properties. We'll explore some of these methods now to give you a better grasp
on what the `window` object can do for you.

Let’s use a Window API method called `resizeTo()` to change the width and height
of a user's window in a script.

```js
// windowTest.js

// Open a new window
newWindow = window.open("", "", "width=100, height=100");

// Resize the new window
newWindow.resizeTo(500, 500);
```

You can execute the code above in your web browser in Google Chrome by right
clicking the page, selecting inspect, and selecting the console tab. Paste the
code above into the console. When you do this, make sure you are not in
full-screen mode for Chrome, otherwise you won't be able to resize the new
window!

_Note: You must open a new window using `window.open` before it can be resized.
This method won’t work in an already open window or in a new tab._

Check out the documentation on [Window.resizeTo()][2] and [Window.resizeBy()][3]
for more information.

Go to [wikipedia][wikipedia] and try setting the window scroll position by
pasting `window.scroll(0,300)` in the developer console (right click, inspect,
console like usual). Play around with different scroll values. Pretty neat, huh?

## Context, scope, and anonymous functions

Two important terms to understand when you’re developing in Javascript are
**context** and **scope**. Ryan Morr has a great write-up about the differences
between the two here: ["Understanding Scope and Context in Javascript"][4].

The important things to note about **context** are:

1. Every function has a context (as well as a scope).
2. Context refers to the object that _owns_ the function (i.e. the value of
   _this_ inside a given function).
3. Context is most often determined by how a function is invoked.

Take, for example, the following code:

```js
const foo = {
  bar: function() {
    return this;
  }
};
console.log(foo.bar() === foo);
// returns true
```

The anonymous function above is a method of the `foo` object, which means that
`this` returns the object itself — the context, in this case.

What about functions that are unbound to an object, or not scoped inside of
another function? Try running this anonymous function, and see what happens.

```js
(function() {
  console.log(this);
})();
```

When you open your console in the browser and run this code, you should see the
`window` object printed. When a function is called in the global scope, `this`
defaults to the global context, or in the case of running code in the browser,
the `window` object.

Refer to ["Understanding Scope and Context in Javascript"][4] for more about the
scope chain, closures, and using `.call()` and `.apply()` on functions.

## Running a script on DOMContentLoaded

Now you will learn how to run a script on `DOMContentLoaded`, when the
document has been loaded without waiting for stylesheets, images and subframes
to load.

Let’s practice. Set up an HTML file, import an external JS file,
and run a script on `DOMContentLoaded`.

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript" src="dom-ready-script.js"></script>
  </head>
  <body></body>
  <html></html>
</html>
```

**JS**

```js
window.addEventListener("DOMContentLoaded", event => {
  console.log("This script loaded when the DOM was ready.");
});
```

## Running a script on page load

`DOMContentLoaded` ensures that a script will run when the document has been
loaded without waiting for stylesheets, images and subframes to load. However,
if we wanted to wait for **everything** in the document to load before running
the script, we could instead use the `window` object method `window.onload`.

Let’s practice it here. Set up an HTML file, import an external JS file, and run
a script on `window.onload`.

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript" src="window-load-script.js"></script>
  </head>
  <body></body>
  <html></html>
</html>
```

**JS**

```js
window.onload = () => {
  console.log(
    "This script loaded when all the resources and the DOM were ready."
  );
};
```

## Ways to prevent a script from running until page loads

There are actually multiple ways to prevent a script from running until the page
has loaded. We’ll review three of them here:

1. Use the `DOMContentLoaded` event in an external JS file
2. Put a script tag importing your external code at the bottom of your HTML file
3. Add an attribute to the script tag, like `async` or `defer`

We’ve reviewed the first method above. Let’s now review numbers **2** and **3**.
If you want to make sure that all your HTML has loaded before a script runs, an
easy option is to include your script immediately after the HTML you need. This
works because HTML builds the DOM tree in the order of how your HTML file is
structured. Whatever is on top will be loaded first, such as script tags in the
`<head>`. It makes sense, then, to keep your script at the bottom of your HTML,
right before the closing `</body>` tag, like below.

```html
<html>
  <head></head>
  <body>
    …
    <script src="script.js"></script>
  </body>
</html>
```

If you want to include your script in the `<head>` tags, rather than the
`<body>` tags, there is another option: We could use the `async` or `defer`
methods in our `<script>` tag. [Flavio Copes has a great write-up][5] on using
`async` or `defer` with graphics showing exactly when the browser parses HTML,
fetches the script, and executes the script.

With `async`, a script is fetched asynchronously. After the script is fetched,
HTML parsing is paused to execute the script, and then it’s resumed. With
`defer`, a script is fetched asynchronously and is executed only after HTML
parsing is finished.

You can use the `async` and `defer` methods independently or simultaneously.
Newer browsers recognize `async`, while older ones recognize `defer`. If you use
`async defer` simultaneously, `async` takes precedence, while older browsers
that don’t recognize it will default to `defer`. Check `caniuse.com` to see
which browsers are compatible with [async][6] and [defer][7].

```js
  <script async src="scriptA.js"></script>

  <script defer src="scriptB.js"></script>

  <script async defer src="scriptC.js"></script>
```

## What we learned:

- How to use Window API methods
- The context and scope of a function
- Review of `DOMContentLoaded` and `window.onload`
- How to prevent a script from running until a page loads

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Window
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Window/resizeTo
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Window/resizeby
[4]: http://ryanmorr.com/understanding-scope-and-context-in-javascript/
[5]: https://flaviocopes.com/javascript-async-defer/
[6]: https://caniuse.com/#search=async%20attribute%20for%20external%20scripts
[7]: https://caniuse.com/#search=defer%20attribute%20for%20external%20scripts
[wikipedia]: https://en.wikipedia.org/

________________________________________________________________________________
# Project: Fresh Cookies In The Window: Come And Get ‘Em!

Now that you know all about the browser, the BOM, and the window, let’s get
cooking! In this project, you will:

- Set up a server and run files locally
- Practice running a script when the page has loaded
- Set, Get, and Delete cookies using JavaScript
- Open and resize a window using JavaScript

## Introduction

Picture yourself baking some fresh cookies (chocolate chip? snickerdoodle?
peanut butter?) on a crisp autumn day.

The timer’s gone off, and as you take the piping hot tray out of the oven, you
salivate in anticipation of a tasty treat. But, the cookies are way too hot and
need to cool down. You crack open the nearest window just enough, and set the
tray down next to it, letting a cool breeze waft over the cookies. You’re
looking forward to the first bite!

Let the imagery above be your inspiration while completing this coding project.
We can think of the browser’s `window` object as a physical window, and browser
cookies as actual doughy desserts, if for no other reason that it’s a fun
mnemonic device.

## Project overview

Let’s practice running a script when the page has loaded. We’ll also manipulate
the `window` object by changing its height. Finally, we’ll bake some byte-sized
cookies and set them in the window.

## Phase 1: Using a local Node/Express server (_Whoa!_)

Express is a Node framework that you'll be using to set up a local server on
your machine. This will come in handy when we’re practicing how to set a cookie.

We've set up an Express app for you to use. Open the `cookies-project` folder
inside of this Module. Then go through the following:

1. Make sure Node is installed on your machine.
2. Run `npm install`.
3. Run `npm start`, you should see "Example app listening on port 3000!" in your
   terminal.
4. Open up `localhost:3000` in your browser and make sure you see 'Cookies!!!'

_You'll be using the **public/index.html** file to write your HTML and
**public/js/cookies.js** file to write your JavaScript._

## Phase 2: Add a script on DOM/page load (_Practice makes perfect._)

Inside of your `cookies.js` file:

- Practice running your script after the page has loaded. You can use
  `DOMContentLoaded` or `window.onload`. If you’re linking to an external JS
  file, practice using the `async` or `defer` methods.

## Phase 3: Set a cookie in the window (_Freshly baked!_)

Inside of your `cookies.js` file, practice setting a cookie. Here are a couple
of examples:

- `document.cookie = "monster_name=cookie";`
- `document.cookie = "favorite_cookie=snickerdoodle";`

Now looking at your Developer Tools, did the cookies you set appear in the
correct place? Try defining one more cookie in your `cookies.js` and refresh
your page. Do you see it in the Developer Tools? Now delete your most recent
cookie and refresh your page. If you delete a cookie, what happens in the
browser tab when you refresh?

Let's show our new cookies to our user! Try using the
[`window.alert()`][window-alert] method to let our user know the information of
all the cookies stored in the browser.

[window-alert]: https://developer.mozilla.org/en-US/docs/Web/API/Window/alert

## Phase 4: No such thing as just one more cookie

Setting cookies one at a time by hand is probably getting old by now. Let's
write a new function called `setCookie(name, value)`. The `setCookie` function
will accept two arguments, a name and a value, and will create a new cookie
using those arguments.

Nice! Try testing out your new function by creating a few cookies. Now that we
have a way to set cookies it'd sure be nice to have a way to return all the
cookies. So... let's hop to it!

## Phase 5: Gimme all the cookies

Write a function named `getCookies()` that will return an array of the key value
pairs of each set cookie. This is easy to do when you remember that
`document.cookie` returns a string!

Look below for an example of how `getCookies` is used:

```js
setCookie("dog", "Fido");
setCookie("cat", "Jet");

console.log(getCookies()); // prints ["dog=Fido", "cat=Jet"]
```

Let's take this one step further - what if we wanted to get the value for one
particular cookie?

Write a new function `getCookieValue(name)` that intakes that name of a cookie
as an argument. If the given cookie name exists `getCookieValue` will return the
value of that cookie. If a cookie with the given name doesn't exist the
`getCookieValue` function should return `null`.

Here is an example of `getCookieValue` in action:

```js
setCookie("cat", "Jet");

console.log(getCookies()); // prints ["cat=Jet"]
console.log(getCookieValue("cat")); // "Jet"
console.log(getCookieValue("rabbit")); // null
```

## Phase 6: Removing a cookie

Now that we have a couple of functions in place to set and get cookies lets
write a function called `deleteCookie(name)`. The `deleteCookie` function will
accept the name of a cookie to be deleted and will delete that cookie, if it
exists. If `deleteCookie` is given the name of a cookie that doesn't exist it
should print a message to the user saying the cookie wasn't found.

Here is an example of `deleteCookie` in action:

```js
setCookie("cat", "Jet");
setCookie("dog", "Fido");

console.log(getCookies()); // prints ["cat=Jet", "dog=Fido"]
deleteCookie("cat");
console.log(getCookies()); // prints ["dog=Fido"]
deleteCookie("rabbit"); // prints "cookie not found!"
```

We now have set up some nice utility function to get, set, and delete cookies!
Pretty yummy if you ask me! 🍪

## Bonuses: More fun with cookies!

Check out the MDN documentation on [Document.cookie][3] to help you complete the
tasks below.

## Bonus A: Open a new window and resize it based on cookie value (_Smells great!_)

Let's trying doing something fun will all our new cookie functions. Let's write
some code to do the following:

1. generate a random number
2. store that number in a cookie
3. open a new window and set the new window's height and width to the cookie
   value we stored in step 2.

- _Hint: Recall that we can use [Math.random()][1] to generate a random number._
- _Hint: Use `window.open()` AND `window.resizeTo()` OR `window.resizeBy()`_

When you run the script, you should see a new window open with the width and
height set to the value that was stored in the cookie. Baked and cooled!

### Bonus B: Create new cookies at the click of a button

Are you a master baker? Create the necessary html elements and JavaScript so
that a user can input a cookie name and value and click a button to create a
cookie with the name and value they specified.

The sequence of events will be:

1. A user inputs the name and value they want for their cookie
2. The user clicks the button to create their new cookie
3. The new cookie is created
4. To ensure the best user experience, empty the two inputs for the cookie name
   and value (so a user can easily create another cookie)
5. Log all the cookies to the console so the user can see their new cookie!

Congratulations! Hang up your your apron for now knowing you are a cookie
master.

[1]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

________________________________________________________________________________
# WEEK-04 DAY-2<br>*Element Selection* {ignore=true}
________________________________________________________________________________
# Element Selection Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given HTML that includes `<div id="catch-me-if-you-can">HI!</div>`, write a
   JavaScript statement that stores a reference to the HTMLDivElement with the
   id "catch-me-if-you-can" in a variable named "divOfInterest".
2. Given HTML that includes seven SPAN elements each with the class "cloudy",
   write a JavaScript statement that stores a reference to a NodeList filled
   with references to the seven HTMLSpanElements in a variable named
   "cloudySpans".
3. Given an HTML file with HTML, HEAD, TITLE, and BODY elements, create and
   reference a JS file that in which the JavaScript will create and attach to
   the BODY element an H1 element with the id "sleeping-giant" with the content
   "Jell-O, Burled!".
4. Given an HTML file with HTML, HEAD, TITLE, SCRIPT, and BODY elements with the
   SCRIPT's SRC attribute referencing an empty JS file, write a script in the JS
   file to create a DIV element with the id "lickable-frog" and add it as the
   last child to the BODY element.
5. Given an HTML file with HTML, HEAD, TITLE, SCRIPT, and BODY elements with no
   SRC attribute on the SCRIPT element, write a script in the SCRIPT block to
   create a UL element with no id, create an LI element with the id
   "dreamy-eyes", add the LI as a child to the UL element, and add the UL
   element as the first child of the BODY element.
6. Write JavaScript to add the CSS class "i-got-loaded" to the BODY element when
   the window fires the DOMContentLoaded event.
7. Given an HTML file with a UL element with the id "your-best-friend" that has
   six non-empty LIs as its children, write JavaScript to write the content of
   each LI to the console.
8. Given an HTML file with a UL element with the id "your-worst-enemy" that has
   no children, write JavaScript to construct a string that contains six LI tags
   each containing a random number and set the inner HTML property of
   ul#your-worst-enemy to that string.
9. Write JavaScript to update the title of the document to the current time at a
   reasonable interval such that it looks like a real clock.terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given HTML that includes `<div id="catch-me-if-you-can">HI!</div>`, write a
   JavaScript statement that stores a reference to the HTMLDivElement with the
   id "catch-me-if-you-can" in a variable named "divOfInterest".
2. Given HTML that includes seven SPAN elements each with the class "cloudy",
   write a JavaScript statement that stores a reference to a NodeList filled
   with references to the seven HTMLSpanElements in a variable named
   "cloudySpans".
3. Given an HTML file with HTML, HEAD, TITLE, and BODY elements, create and
   reference a JS file that in which the JavaScript will create and attach to
   the BODY element an H1 element with the id "sleeping-giant" with the content
   "Jell-O, Burled!".
4. Given an HTML file with HTML, HEAD, TITLE, SCRIPT, and BODY elements with the
   SCRIPT's SRC attribute referencing an empty JS file, write a script in the JS
   file to create a DIV element with the id "lickable-frog" and add it as the
   last child to the BODY element.
5. Given an HTML file with HTML, HEAD, TITLE, SCRIPT, and BODY elements with no
   SRC attribute on the SCRIPT element, write a script in the SCRIPT block to
   create a UL element with no id, create an LI element with the id
   "dreamy-eyes", add the LI as a child to the UL element, and add the UL
   element as the first child of the BODY element.
6. Write JavaScript to add the CSS class "i-got-loaded" to the BODY element when
   the window fires the DOMContentLoaded event.
7. Given an HTML file with a UL element with the id "your-best-friend" that has
   six non-empty LIs as its children, write JavaScript to write the content of
   each LI to the console.
8. Given an HTML file with a UL element with the id "your-worst-enemy" that has
   no children, write JavaScript to construct a string that contains six LI tags
   each containing a random number and set the inner HTML property of
   ul#your-worst-enemy to that string.
9. Write JavaScript to update the title of the document to the current time at a
   reasonable interval such that it looks like a real clock.

________________________________________________________________________________
# Hello, World DOMination: Element Selection And Placement

The objective of this lesson is to familiarize yourself with the usage and inner
workings of the DOM API. When you finish this lesson, you should be able to:

- Reference and manipulate the DOM via Javascript
- Update and create new DOM elements via Javascript
- Change CSS based on a DOM event
- Familiarize yourself with the console

## What is the DOM?

The
[Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction),
or DOM, is an object-oriented representation of an HTML document or Web page,
meaning that the document is represented as objects, or nodes. It allows
developers to access the document via a programming language, like Javascript.

The DOM is typically depicted as a tree with a specific hierarchy. (See the
image below.) Higher branches represent parent nodes, while lower branches
represent child nodes, or children. More on that later.

<p>
  <img src="images/DOM_tree.png" style="max-width: 50%; height: auto;">
</p>

## Referencing the DOM

The DOM API is one of the most powerful tools frontend developers have at their
disposal. Learning how to reference, create, and update DOM elements is an
integral part of working with Javascript. We'll start this lesson by learning
how to reference a DOM element in Javascript.

Let’s assume we have an HTML file that includes the following `div`:

**HTML**

```html
<div id=""catch-me-if-you-can"">HI!</div>
```

Because we've added the element to our HTML file, that element is available in
the DOM for us to reference and manipulate. Using JavaScript, we can reference
this element by scanning the document and finding the element by its id with the
method document.getElementById(). We then assign the reference to a variable.

**Javascript**

```js
const divOfInterest = document.getElementById("catch-me-if-you-can")
```

Now let’s say that our HTML file contains seven `span` elements that share a
class name of `cloudy`, like below:

**HTML**

```html
<span class=""cloudy""></span>
<span class=""cloudy""></span>
<span class=""cloudy""></span>
<span class=""cloudy""></span>
<span class=""cloudy""></span>
<span class=""cloudy""></span>
<span class=""cloudy""></span>
```

In Javascript, we can reference all seven of these elements and store them in a
single variable.

**Javascript**

```js
const cloudySpans = document.querySelectorAll("span.cloudy");
```

While `getElementById` allows us to reference a single element,
`querySelectorAll` references all elements with the class name "cloudy" as a
static `NodeList` (_static_ meaning that any changes in the DOM do not affect
the content of the collection). Note that a NodeList is different from an array,
but it is possible to iterate over a NodeList as with an array using
[forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).
Refer to the MDN doc on
[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) for more
information.

Using `forEach()` on a NodeList:

**Javascript**

```js
const cloudySpans = document.querySelectorAll("span.cloudy");

cloudySpans.forEach(span => {
  console.log("Cloudy!");
});
```

## Creating New DOM Elements

Now that we know how to reference DOM elements, let's try creating new elements.
First we'll set up a basic HTML file with the appropriate structure and include
a reference to a Javascript file that exists in the same directory in the
`head`.

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <script type="text/javascript" src="example.js"></script>
  </head>
  <body></body>
</html>
```

In our example.js file, we'll write a function to create a new `h1` element,
assign it an id, give it content, and attach it to the body of our HTML
document.

**Javascript**

```js
const addElement = () => {
  // create a new div element
  const newElement = document.createElement("h1");

  // set the h1's id
  newElement.setAttribute("id", "sleeping-giant");

  // and give it some content
  const newContent = document.createTextNode("Jell-O, Burled!");

  // add the text node to the newly created div
  newElement.appendChild(newContent);

  // add the newly created element and its content into the DOM
  document.body.appendChild(newElement);
};
// run script when page is loaded
window.onload = addElement;
```

If we open up our HTML file in a browser, we should now see the words
`Jell-O Burled!` on our page. If we use the browser tools to inspect the page
(right-click on the page and select "inspect", or hotkeys fn + f12), we notice
the new `h1` with the id we gave it.

________________________________________________________________________________
# Hello, World DOMination: Inserting Elements in JS File and Script Block

Let's practice adding new elements to our page. We'll create a second element, a
`div` with an id of `lickable-frog`, and append it to the `body` like we did the
first time. Update the Javascript function to append a second element to the
page.

**Javascript**

```js
const addElements = () => {
  // create a new div element
  const newElement = document.createElement("h1");

  // set the h1's id
  newElement.setAttribute("id", "sleeping-giant");

  // and give it some content
  const newContent = document.createTextNode("Jell-O, Burled!");

  // add the text node to the newly created div
  newElement.appendChild(newContent);

  // add the newly created element and its content into the DOM
  document.body.appendChild(newElement);

  // append a second element to the DOM after the first one
  const lastElement = document.createElement("div");
  lastElement.setAttribute("id", "lickable-frog");
  document.body.appendChild(lastElement);
};
// run script when page is loaded
window.onload = addElements;
```

Notice that our function is now called `addElements`, plural, because we're
appending two elements to the `body`. Save your Javascript file and refresh the
HTML file in the browser. When you inspect the page, you should now see two
elements in the `body`, the `h1` and the `div` we added via Javascript.

## Referencing a JS File vs. Using a Script Block

In our test example above, we referenced an external JS file, which contained
our function to add new elements to the DOM. Typically, we would keep Javascript
in a separate file, but we could also write a script block directly in our HTML
file. Let's try it. First, we'll delete the script source so that we have an
empty script block.

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript">
      //Javascript goes here!
    </script>
  </head>
  <body></body>
</html>
```

Inside of our script block, we'll:

- create a `ul` element with no id
- create an `li` element with the id `dreamy-eyes`
- add the `li` as a child to the `ul` element
- add the `ul` element as the first child of the `body` element.

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Cool Website</title>
    <script type="text/javascript">
      const addListElement = () => {
        const listElement = document.createElement("ul");
        const listItem = document.createElement("li");
        listItem.setAttribute("id", "dreamy-eyes");
        listElement.appendChild(listItem);
        document.body.prepend(listElement);
      };
      window.onload = addListElement;
    </script>
  </head>
  <body></body>
</html>
```

Refresh the HTML in your browser, inspect the page, and notice the `ul` and `li`
elements that were created in the script block.

________________________________________________________________________________
# Hello, World DOMination: Adding a CSS Class After DOM Load Event

In our previous JS examples, we used `window.onload` to run a function after the
window has loaded the page, which ensures that all of the objects are in the
DOM, including images, scripts, links, and subframes. However, we don't need to
wait for stylesheets, images, and subframes to finish loading before our
JavaScript runs because JS isn't dependent on them. And, some images may be so
large that waiting on them to load before the JS runs would make the user
experience feel slow and clunky. There is a better method to use in this case:
`DOMContentLoaded`.

According to
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event),
"the DOMContentLoaded event fires when the initial HTML document has been
completely loaded and parsed, without waiting for stylesheets, images, and
subframes to finish loading."

We'll use DOMContentLoaded to add CSS classes to page elements immediately after
they are loaded. Let's add the CSS class "i-got-loaded" to the `body` element
when the window fires the DOMContentLoaded event. We can do this in the script
block or in an external JS file, as we did in the examples above.

**Javascript**

```js
window.addEventListener("DOMContentLoaded", event => {
  document.body.className = "i-got-loaded";
});
```

After adding the Javascript above, refresh the HTML in your browser, inspect the
page, and notice that the `body` element now has a class of "i-got-loaded".

________________________________________________________________________________
# Brush Up On Your HTML

You'll be using a lot of HTML in the following days (weeks, months, years), so
might as well get a leg up by reacquainting yourself with HTML.

The definitive resource on the Internet for HTML, CSS, and JavaScript is the
Mozilla Developer Network. Go there and work through, at a minimum, the
following sections:

* The following sections in [Introduction to HTML]
  * [Getting started with HTML]
  * [What's in the head? Metadata in HTML]
  * [HTML text fundamentals]
  * [Creating hyperlinks]
* The following section in [Multimedia and embedding]
  * [Images in HTML]
* The following section in [HTML forms]
  * [Your first HTML form]
  * [How to structure an HTML form]
  * [The native form widgets]
  * [Client-side form validation]
  * [Styling HTML forms]

[Introduction to HTML]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
[Getting started with HTML]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started
[What's in the head? Metadata in HTML]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
[HTML text fundamentals]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals
[Creating hyperlinks]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks
[Multimedia and embedding]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding
[Images in HTML]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML
[HTML forms]: https://developer.mozilla.org/en-US/docs/Learn/Forms
[Your first HTML form]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form
[How to structure an HTML form]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/How_to_structure_an_HTML_form
[The native form widgets]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/The_native_form_widgets
[Client-side form validation]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
[Styling HTML forms]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms

________________________________________________________________________________
# Hello, World DOMination: Console.log, Element.innerHTML, and the Date Object

In this section, we'll learn about how to use `console.log` to print element
values. We'll also use `Element.innerHTML` to fill in the HTML of a DOM element.
Finally, we'll learn about the Javascript Date object and how to use it to
construct a clock that keeps the current time.

## Console Logging Element Values

Along with the other developer tools, the console is a valuable tool Javascript
developers use to debug and check that scripts are running correctly. In this
exercise, we'll practice logging to the console.

Create an HTML file that contains the following:

**HTML**

```html
<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <ul id="your-best-friend">
      <li>Has your back</li>
      <li>Gives you support</li>
      <li>Actively listens to you</li>
      <li>Lends a helping hand</li>
      <li>Cheers you up when you're down</li>
      <li>Celebrates important moments with you</li>
    </ul>
  </body>
</html>
```

In the above code, we see an id with which we can reference the `ul` element.
Recall that we previously used `document.querySelectorAll()` to store multiple
elements with the same class name in a single variable, as a NodeList. However,
in the above example, we see only one id for the parent element. We can
reference the parent element via its id to get access to the content of its
children.

**Javascript**

```js
window.addEventListener("DOMContentLoaded", event => {
  const parent = document.getElementById("your-best-friend");
  const childNodes = parent.childNodes;
  for (let value of childNodes.values()) {
    console.log(value);
  }
});
```

In your browser, use the developer tools to open the console and see that the
values of each `li` have been printed out.

## Using Element.innerHTML

Thus far, we have referenced DOM elements via their id or class name and
appended new elements to existing DOM elements. Additionally, we can use the
inner HTML property to get or set the HTML or XML markup contained within an
element.

In an HTML file, create a `ul` element with the id "your-worst-enemy" that has
no children. We'll add some JavaScript to construct a string that contains six
`li` tags each containing a random number and set the inner HTML property of
`ul#your-worst-enemy` to that string.

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript" src="example.js"></script>
  </head>
  <body>
    <ul id="your-worst-enemy"></ul>
  </body>
</html>
```

**Javascript**

```js
// generate a random number for each list item
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

// listen for DOM ready event
window.addEventListener("DOMContentLoaded", event => {
  // push 6 LI elements into an array and join
  const liArr = [];
  for (let i = 0; i < 6; i++) {
    liArr.push("<li>" + getRandomInt(10) + "</li>");
  }
  const liString = liArr.join(" ");

  // insert string into the DOM using innerHTML
  const listElement = document.getElementById("your-worst-enemy");
  listElement.innerHTML = liString;
});
```

Save your changes, and refresh your browser page. You should see six new list
items on the page, each containing a random number.

## Inserting a Date Object into the DOM

We've learned a lot about accessing and manipulating the DOM! Let's use what
we've learned so far to add extra functionality involving the Javascript Date
object.

Our objective is to update the title of the document to the current time at a
reasonable interval such that it looks like a real clock.

We know we'll be starting with an HTML document that contains an empty title
element. We've learned a couple of different ways to fill the content of an
element so far. We could create a new element and append it to the title
element, or we could use `innerHTML` to set the HTML of the title element. Since
we don't need to create a new element nor do we care whether it appears last, we
can use the latter method.

Let's give our title an id for easy reference.

**HTML**

```html
<title id="title"></title>
```

In our Javascript file, we'll use the Date constructor to instantiate a new
[Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

```js
const date = new Date();
```

**Javascript**

```js
window.addEventListener("DOMContentLoaded", event => {
  const title = document.getElementById("title");
  const time = () => {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    title.innerHTML = hours + ":" + minutes + ":" + seconds;
  };
  setInterval(time, 1000);
});
```

Save your changes and refresh your browser. Observe the clock we inserted
dynamically keeping the current time in your document title!

## What We Learned:

- What the DOM is and how we can access it
- How to access DOM elements using `document.getElementById()` and
  `document.querySelectorAll()`
- How to create new elements with `document.createElement()` and
  `document.createTextNode`, and append them to existing DOM elements with
  `Element.appendChild()`
- The difference between `window.onload` and `DOMContentLoaded`
- How to access children nodes with `NodeList.childNodes`
- Updating DOM elements with `Element.innerHTML`
- The Javascript Date object

________________________________________________________________________________
# DOM Project: Create a profile page with Javascript

Now that you’ve learned about the DOM and how to access and manipulate it, put
skills to use by building your own basic profile page! In this project, you
will:

- Create an HTML file and link to a Javascript file
- Use Javascript to create and update page elements
- Add CSS classes with Javascript
- Create a clock using the Date object

## Introduction

The best way to learn is to create something that is meaningful or relevant to
you, so why not start by making a page all about yourself?

In this project, you’ll create a simple profile page that displays details about
you, such as who you are, what you like to do, and where you are located.

Put as many or as few details as you like. Don’t worry, the government already
knows where you live. It’s your page, so feel free to give it your own flair!

## Project Overview

You’ve learned about the DOM, and now it’s time to put that knowledge into
practice.

In this project, you’ll create a simple profile page and fill it with details
about yourself.

You could hard-code your content into your HTML file, but where’s the fun in
that? We’ll practice using Javascript to access DOM elements and insert content
into your page dynamically.

We’ll also go over how to add CSS class attributes to elements dynamically, so
you can add a bit of styling to your profile.

## Phase 1: Setting up your HTML and Javascript files

Create an HTML file in a new project folder called `myProfile.html`. Set up your
html file with a `head` and `body` section. Other than the appropriate HTML
tags, leave the file empty of content, ids and classes.

In your HTML file, add a link to an external Javascript file in your project
directory called `myProfile.js`. Test that your Javascript file is linked
correctly by printing something you can read in the browser console. Example:

```js
console.log("This is my profile page!")
```

## Phase 2: Populating your profile

Again, don’t hard-code any content in your HTML file. Instead, construct the
page content using your Javascript file.

First, you should make sure all the DOM objects you need are loaded before you
add new things to the page. Add a `DOMContentLoaded` event listener in your
Javascript file.

```js
window.addEventListener("DOMContentLoaded", event => {
  // Your Javascript goes here
});
```

### Phase 2A: Creating and appending new elements

It’s time to add some content to your profile page! Insert your name as an `h1`
into the page using Javascript, and give it an `id`. _Hint: You may want to use
the following:_

- `document.createElement()`
- `Element.setAttribute()`
- `document.createTextNode()`
- `Node.appendChild()`

After you’ve inserted the `h1`, open your HTML page in your browser and make
sure the `h1` with your name appears on the page.

You’ve added your name to the page, but it still looks sparse. Fill out your
page with some details about yourself by creating and appending new elements.
Use what you’ve learned about manipulating the DOM to add to your Javascript
file.

- Create a new unordered list element.
- Append at least **four list items** of details about yourself to your list.
- Append your list to the body of your page.

Below is an example list item:

```js
const listItem1 = document.createElement("li");
const listItem1Content = document.createTextNode(
  "I like to drink iced lattes."
);
listItem1.appendChild(listItem1Content);
// Append listItem1 to your unordered list here
```

### Phase 2B: Refactoring to make it programmatic

The code we wrote above works, but it is lengthy and leads to needless
repetition. Imagine we want to display 20 hobbies. Following the pattern above
means we would have to create an element, create a text node, and append a child
node to the details list 20 times for each hobby. That’s 80 extra lines of code!

Let's approach this differently and make the work easier for ourselves. Can we
refactor it to make inserting the `li` elements more programmatic and easily
repeatable? Yes, we can! First, let’s create the `ul` and append it to the body
of our page, as we did in the last section.

```js
// Create the element with document.createElement()
// Set the attribute with Element.setAttribute()
// Append the element to the page with Node.appendChild()
```

Now, let’s add the list items. We can shorten the code up by creating an array
that stores all of the list items as string values, join all the string values
into a single string, and insert that string into the DOM.

```js
const detailsArr = [
  "<li>I like to drink iced lattes.</li>",
  "<li>I have two cats and eight kittens.</li>",
  "<li>My favorite place to get lunch is Chipotle.</li>",
  "<li>On the weekends, I play flag football.</li>"
];
const liString = detailsArr.join(" ");
const listElement = document.getElementById("details");
listElement.innerHTML = liString;
```

Notice that we used `innerHTML` here rather than `appendChild`. If we tried to
insert the string using `appendChild`, what would happen? Why? Refer to the MDN
documentation on
[Element.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
and
[Node.appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
for the answers.

You’ve cut down on the lines of code as well as made your code more readable!
You can easily add new list items inside your array and they’ll be automatically
added to your `ul` element. Now that you’ve refactored your code, can you add
new sections to your page?

## Phase 3: Adding CSS classes and styles

You’ve added the details, but now they need some pizazz! Let’s add some CSS
classes to your elements that you can use to style the page. In your Javascript,
add a class named `my-details` to the unordered list you added in the last
section. You can use `Element.setAttribute` to set the class name to your `ul`.
Here’s an example:

```js
const myDetails = document.createElement("ul");
myDetails.setAttribute("class", "my-details");
```

Now that you know how to set an element’s class name, practice setting
attributes by adding class names to the other elements you created.

- Add a class name of `name` to the `h1` containing your name.
- Add a class name of `detail` to each `li` element you created inside your
  list.
- Use `document.querySelectorAll` to access each `li`.
- Use `forEach()` to iterate over the `li` list and add a class using
  `Element.className`.

Create a CSS file and remember to link to it in your HTML file. In your CSS
file, add some styles using the classes we added to the `ul` and the `li`
elements: `details` and `detail`. Update your CSS to:

- Change the color of your `h1`
- Add a border around your `ul`
- Add padding to your list items

```css
h1.my-name {
  color: green;
  padding: 40px 20px;
}

ul.my-details {
  border: 1px solid gray;
  padding: 40px;
}

li.detail {
  list-style-type: square;
  padding: 10px;
}
```

Feel free to add more CSS styles beyond the ones above to your page to
personalize it!

## Phase 4: Adding a clock with the Date object

By now, you should know how to add new elements to your page programmatically.
Let’s kick it up a notch by adding a clock that keeps the current time onto your
profile page.

Objectives:

- Create a new element and add it to the body of your page
- Use the Javascript Date object to get the current time
- Insert the current time into a DOM element

You just created a live clock, and it’s _time_ for congratulations! (Har har.)
Can you go the extra mile? Figure out how to insert your clock into a new list
item under your personal details that says "I live in City, State, and it’s
currently `[CLOCK]` here.

## Bonus: You’re so extra!

Congratulations! You’ve created a basic profile page by manipulating the DOM and
inserting elements dynamically with Javascript. But, why be _basic_ when you can
be a little _extra_? Make your profile extra shiny by adding more to your page.

### Bonus A: Add more sections to your page

Using Javascript, create new elements and:

- Insert an image into your profile under your name. _Hint:_ You could insert a
  new `img`, or you could add a `div` and set the background image using a CSS
  class.
- Insert more sections to your profile. Examples: "Likes" list and "Dislikes"
  list, "Favorite Restaurants", "My Activities", etc.

### Bonus B: Use other Element methods

Check the MDN documentation for more
[Element methods](https://developer.mozilla.org/en-US/docs/Web/API/Element) you
can use to manipulate the DOM. Try doing the following:

- Use `.outerHTML` to replace an element.
- Use the `classList` API to add/remove classes.
- Try using : `Element.closest`, `getElementsByClassName`,
  `getElementsByTagName` to select elements on your page.

### Bonus C: Fire JS on different DOM events

You have used `DOMContentLoaded` to run Javascript on a DOM event. It is one of
many different DOM events that developers can use to trigger functionality.

Check out MDN`’s
[Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
documentation to see how many different DOM events there are. Trying using a few
of them in your code. Some relevant methods to use would be under:

- Keyboard events
- Mouse events
- DOM mutation events

### Bonus D: Make a countdown clock

Instead of keeping the current time on your profile page, make a countdown clock
to your birthday.

Refer to the MDN documentation on the
[Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
for help with this task. Review how to calculate the elapsed time between two
dates.

________________________________________________________________________________
# WEEK-04 DAY-3<br>*Event Handling* {ignore=true}
________________________________________________________________________________
# Event Handling Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given an HTML page that includes `<button id="increment-count">I have been
   clicked <span id="clicked-count">0</span> times</button>`, write JavaScript
   that increases the value of the content of span#clicked-count by 1 every time
   `button#increment-count` is clicked.
2. Given an HTML page that includes
   `<input type="checkbox" id="on-off"><div id="now-you-see-me">Now you see
   me</div>`, write JavaScript that sets the display of div#now-you-see-me to
   "none" when input#on-off is checked and to "block" when input#on-off is not
   checked.
3. Given an HTML file that includes
   `<input id="stopper" type="text" placeholder="Quick! Type STOP">`, write
   JavaScript that will change the background color of the page to cyan five
   seconds after a page loads unless the field input#stopper contains only the
   text "STOP".
4. Given an HTML page with that includes `<input type="text" id="fancypants">`,
   write JavaScript that changes the background color of the textbox to #E8F5E9
   when the caret is in the textbox and turns it back to its normal color when
   focus is elsewhere.
5. Given an HTML page that includes a form with two password fields, write
   JavaScript that subscribes to the forms submission event and cancels it if
   the values in the two password fields differ.
6. Given an HTML page that includes a div styled as a square with a red
   background, write JavaScript that allows a user to drag the square around the
   screen.
7. Given an HTML page that has 300 DIVs, create one click event subscription
   that will print the id of the element clicked on to the console.
8. Identify the definition of the bubbling principle.minal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Given an HTML page that includes `<button id="increment-count">I have been
   clicked <span id="clicked-count">0</span> times</button>`, write JavaScript
   that increases the value of the content of span#clicked-count by 1 every time
   `button#increment-count` is clicked.
2. Given an HTML page that includes
   `<input type="checkbox" id="on-off"><div id="now-you-see-me">Now you see
   me</div>`, write JavaScript that sets the display of div#now-you-see-me to
   "none" when input#on-off is checked and to "block" when input#on-off is not
   checked.
3. Given an HTML file that includes
   `<input id="stopper" type="text" placeholder="Quick! Type STOP">`, write
   JavaScript that will change the background color of the page to cyan five
   seconds after a page loads unless the field input#stopper contains only the
   text "STOP".
4. Given an HTML page with that includes `<input type="text" id="fancypants">`,
   write JavaScript that changes the background color of the textbox to #E8F5E9
   when the caret is in the textbox and turns it back to its normal color when
   focus is elsewhere.
5. Given an HTML page that includes a form with two password fields, write
   JavaScript that subscribes to the forms submission event and cancels it if
   the values in the two password fields differ.
6. Given an HTML page that includes a div styled as a square with a red
   background, write JavaScript that allows a user to drag the square around the
   screen.
7. Given an HTML page that has 300 DIVs, create one click event subscription
   that will print the id of the element clicked on to the console.
8. Identify the definition of the bubbling principle.

________________________________________________________________________________
# Event Handling: Common Page Events

Event handling is the core of front-end development. When a user interacts with
HTML elements on a website, those interactions are known as _**events**_.
Developers use Javascript to respond to those events. In this reading, we’ll go
over three common events and do exercises to add functionality based on those
events:

- A button click
- A checkbox being checked
- A user typing a value into an input

## Handling a button click event

Let’s start with a common event that occurs on many websites: a button click.
Usually some functionality occurs when a button is clicked -- such as displaying
new page elements, changing current elements, or submitting a form.

We’ll go through how to set up a [click event][1] listener and update the click
count after each click. Let’s say we have a button element in an HTML file, like
below:

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="script.js">
  </head>
  <body>
    <button id="increment-count">I have been clicked <span id="clicked-count">0</span> times</button>
  </body>
</html>
```

We’ll write Javascript to increase the value of the content of
`span#clicked-count` by one each time `button#increment-count` is clicked.
Remember to use the `DOMContentLoaded` event listener in an external script to
ensure the button has loaded on the page before the script runs.

**Javascript**

If you open up the HTML file in a browser, you should see the button. If you
click the button rapidly and repeatedly, the value of `span#clicked-count`
should increment by one after each click.

```js
// script.js

window.addEventListener("DOMContentLoaded", event => {
  const button = document.getElementById("increment-count");
  const count = document.getElementById("clicked-count");
  let clicks = 0;
  button.addEventListener("click", event => {
    clicks += 1;
    count.innerHTML = clicks;
  });
});
```

### Using addEventListener() vs. onclick

Adding an event listener to the button element, as we did above, is the
preferred method of handling events in scripts. However, there is another method
we could use here: [GlobalEventHandlers.onclick][3]. Check out
[codingrepo.com][4] for a breakdown of the differences between using
`addEventListener()` and `onclick`. One distinction is that `onclick` overrides
existing event listeners, while `addEventListener()` does not, making it easy to
add new event listeners.

The syntax for `onclick` is: `target.onclick = functionRef;` If we wanted to
rewrite the button click event example using `onclick`, we would use the
following:

```js
let clicks = 0;
button.onclick = event => {
  clicks += 1;
  count.innerHTML = clicks;
};
```

We’ll stick to using `addEventListener()` in our code, but it’s important for
front-end developers to understand the differences between the methods above and
use cases for each one.

## Handling a checkbox check event

Another common event that occurs on many websites is when a user checks a
checkbox. Checkboxes are typically recorded values that get submitted when a
user submits a form, but checking the box sometimes also triggers another
function.

Let’s practice displaying an element when the box is checked and hiding it when
the box is unchecked. We’ll pretend we’re on a pizza delivery website, and we’re
filling out a form for pizza toppings. There is a checkbox on the page for extra
cheese, and when a user checks that box we want to show a `div` with pricing
info. Let’s set up our HTML file with a `checkbox` and `div` to show/hide, as
well as a link to our Javascript file:

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="script.js">
  </head>
  <body>
    <h1>Pizza Toppings</h1>
    <input type="checkbox" id="on-off">
    <label for="on-off">Extra Cheese</label>
    <div id="now-you-see-me" style="display:none">Add $1.00</div>
  </body>
</html>
```

Note that we’ve added `style="display:none"` to the `div` so that, when the page
first loads and the box is unchecked, the `div` won’t show.

In our `script.js` file, we’ll set up an event listener for `DOMContentLoaded`
again to make sure the `checkbox` and `div` have loaded. Then, we’ll write
Javascript to show `div#now-you-see-me` when the box is checked and hide it when
the box is unchecked.

**Javascript**

```js
// script.js

window.addEventListener("DOMContentLoaded", event => {
  // store the elements we need in variables
  const checkbox = document.getElementById("on-off");
  const divShowHide = document.getElementById("now-you-see-me");
  // add an event listener for the checkbox click
  checkbox.addEventListener("click", event => {
    // use the 'checked' attribute of checkbox inputs
    // returns true if checked, false if unchecked
    if (checkbox.checked) {
      // if the box is checked, show the div
      divShowHide.style.display = "block";
      // else hide the div
    } else {
      divShowHide.style.display = "none";
    }
  });
});
```

Open up the HTML document in a browser and make sure that you see the `checkbox`
when the page first loads and not the `div`. The `div` should show when you
check the box, and appear hidden when you uncheck the box.

The code above works. However, what would happen if we had a whole page of
checkboxes with extra options inside each one that would show or hide based on
whether the boxes are checked? We would have to call
`Element.style.display = "block"` and `Element.style.display = "none"` on each
associated `div`.

Instead, we could add a `show` or `hide` class to the `div` based on the
checkbox and keep our `display:block` and `display:none` in CSS. That way, we
could reuse the classes on different elements, as well as see class names change
in the HTML. Here’s how the code we wrote above would look if we used CSS
classes:

**Javascript**

```js
// script.js
// we need to wait for the stylesheet to load
window.onload = () => {
  // store the elements we need in variables
  const checkbox = document.getElementById("on-off");
  const divShowHide = document.getElementById("now-you-see-me");
  // add an event listener for the checkbox click
  checkbox.addEventListener("click", event => {
    // use the 'checked' attribute of checkbox inputs
    // returns true if checked, false if unchecked
    if (checkbox.checked) {
      // if the box is checked, show the div
      divShowHide.classList.remove("hide");
      divShowHide.classList.add("show");
      // else hide the div
    } else {
      divShowHide.classList.remove("show");
      divShowHide.classList.add("hide");
    }
  });
};
```

**CSS**

```css
.show {
  display: block;
}
.hide {
  display: none;
}
```

**HTML (Remove the style attribute, and add the "hide" class)**

```html
<div id="now-you-see-me" class="hide">Add $1.00</div>
```

## Handling a user input value

You’ve learned a lot about event handling so far! Let’s do one more exercise to
practice event handling using an input. In this exercise, we’ll write JavaScript
that will change the background color of the page to cyan five seconds after a
page loads unless the field `input#stopper` contains only the text "STOP".

Let’s set up an HTML file with the input and a placeholder directing the user to
type "STOP": **HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="script.js">
  </head>
  <body>
    <input id="stopper" type="text" placeholder="Quick! Type STOP">
  </body>
</html>
```

Now let’s set up our Javascript:

**Javascript**

```js
// script.js
// run when the DOM is ready
window.addEventListener("DOMContentLoaded", event => {
  const stopCyanMadness = () => {
    // get the value of the input field
    const inputValue = document.getElementById("stopper").value;
    // if value is anything other than 'STOP', change background color
    if (inputValue !== "STOP") {
      document.body.style.backgroundColor = "cyan";
    }
  };
  setTimeout(stopCyanMadness, 5000);
});
```

The code at the bottom of our function might look familiar. We used
`setInterval` along with the Javascript Date object when we set up our current
time clock. In this case we're using `setTimeout`, which runs `stopCyanMadness`
after 5000 milliseconds, or 5 seconds after the page loads.

## What we learned:

- How to add an event listener on a button click
- How to add an event listener to a checkbox
- Styling elements with Javascript vs. with CSS classes
- How to check the value of an input

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
[2]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
[3]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
[4]: https://www.simonewebdesign.it/onclick-vs-addeventlistener/

________________________________________________________________________________
# Event Handling: Input Focus and Blur

Form inputs are one of the most common HTML elements users interact with on a
website. By now, you should be familiar with how to listen for a _click event_
and run a script. In this reading, we’ll learn about a couple of other events on
an input field and how to use them:

- Element: focus event
- Element: blur event

## Listening for focus and blur events

According to MDN, the [focus event][1] fires when an element, such as an input
field, receives focus (i.e. when a user has clicked on that element).

The opposite of the focus event is the [blur event][2]. The blur event fires when
an element has lost focus (i.e. when the user clicks out of that element).

Let’s see these two events in action. We’ll set up an HTML page that includes
`<input type="text" id="fancypants">`. Then, we’ll write JavaScript that changes
the background color of the `fancypants` textbox to `#E8F5E9` when the focus is
on the textbox and turns it back to its normal color when focus is elsewhere.

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="script.js">
  </head>
  <body>
   <input type="text" id="fancypants">
  </body>
</html>
```

**Javascript**

```js
// script.js

window.addEventListener("DOMContentLoaded", event => {
  const input = document.getElementById("fancypants");

  input.addEventListener("focus", event => {
    event.target.style.backgroundColor = "#E8F5E9";
  });
  input.addEventListener("blur", event => {
    event.target.style.backgroundColor = "initial";
  });
});
```

In the code above, we changed the background color of the input on `focus` and
changed it back to its initial value on `blur`. This small bit of functionality
signals to users that they’ve clicked on or off of an input field, which is
especially helpful and more user-friendly when there is a long form on the page.
Now you can use `focus` and `blur` on your form inputs!

## What we learned:

- How to listen for the focus event on inputs
- How to listen for the blur event on inputs

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event

________________________________________________________________________________
# Event Handling: Form Validation

Everyone has submitted a form at some point. Form submissions are another common
action users take on a website. We’ve all seen what happens if we put in values
that aren’t accepted on a form -- frustrating errors! Those errors prompt the
user to input accepted form values before submission and are the first check to
ensure valid data gets stored in the database.

Learning how to implement front-end validation before a user submits a form is
an important skill for developers. In this reading, we’ll learn how to check
whether two password values on a form are equal and prevent the user from
submitting the form if they’re not.

## Validate passwords before submitting a form

In order to validate passwords, we need a form with two password fields: a
password field and a confirmation field. We’ll also include two other fields
that are common on a signup page: a name field and an email field. See the
example below:

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="script.js">
  </head>
  <body>
    <form class="form form--signup" id="signup-form">
      <input class="form__field" id="name" type="text" placeholder="Name" style="display:block">
      <input class="form__field" id="email" type="text" placeholder="Email" style="display:block">
      <input class="form__field" id="password" type="text" placeholder="Password" style="display:block">
      <input class="form__field" id="confirm-password" type="text" placeholder="Password" style="display:block">
      <button class="form__submit" id="submit" type="submit">Submit</button>
    </form>
  </body>
</html>
```

Now, we’ll set up our `script.js` file with code that will:

- Listen for a form submission event
- Get the values of the two password fields and check for a match
- Alert the user if there’s not a match, or submit the form

**Javascript**

```js
// script.js
window.addEventListener("DOMContentLoaded", event => {
  // get the form element
  const form = document.getElementById("signup-form");

  const checkPasswordMatch = event => {
    // get the values of the pw field and pw confirm field
    const passwordValue = document.getElementById("password").value;
    const passwordConfirmValue = document.getElementById("confirm-password")
      .value;
    // if the values are not equal, alert the user
    // otherwise, submit the form
    if (passwordValue !== passwordConfirmValue) {
      // prevent the default submission behavior
      event.preventDefault();
      alert("Passwords must match!");
    } else {
      alert("The form was submitted!");
    }
  };
  // listen for submit event and run password check
  form.addEventListener("submit", checkPasswordMatch);
});
```

In the code above, we prevented the form submission if the passwords don’t match
using [Event.preventDefault()][1]. This method stops the default action of an
event if the event is not explicitly handled. We then alerted the user that the
form submission was prevented.

## What we learned:

- Front-end form validation prevents invalid data from being recorded in the
  database.
- We use `Event.preventDefault()` to stop form submission.
- Users are typically notified when default behavior is prevented.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

________________________________________________________________________________
# Event Handling: HTML Drag-And-Drop API

Dragging and dropping a page element is a fun and convenient way for users to
interact with a Web page! HTML drag-and-drop interfaces are most commonly used
for dragging files, such as PDFs or images, onto a page in a specified area
known as a _drop zone_.

While less typical than button clicks and form submission events, HTML
drag-and-drop is relevant to event handling because it uses the [DOM event
model][1] and [drag events][2] inherited from [mouse events][3].

This reading will go over how to use the [HTML Drag and Drop API][4] to create
"draggable" page elements and allow users to drop them into a drop zone.

## Basic drag-and-drop functions

Let’s go over how to set up basic drag-and-drop functionality, according to the
[MDN documentation][4]. You'll need to mark an element as "draggable". Then, to
do something with that dragging, you need

- A _dragstart_ handler -- occurs when the user clicks the mouse and starts
  dragging
- A _drop_ handler -- occurs when the user releases the mouse click and "drops"
  the element

You will also see how to use the `dragenter` and `dragleave` events to do some
nice interactions.

## The example

Here's an HTML document that you can copy and paste into a text editor if you
want to follow along.

```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Red Square is a Drag</title>
  <style>
    #red-square {
      background-color: red;
      box-sizing: border-box;
      height: 100px;
      width: 100px;
    }
  </style>
</head>
<body>
  <div id="red-square"></div>
</body>
</html>
```

You don't need to know what `box-sizing` does. That'll be covered in future
lessons. It's in this example to make sure the box looks ok when it's dragged.

## The first step of drag and drop

The first step to making an element draggable is to add that attribute to the
element itself. Change the red square `div` to have the `draggable` attribute
with a value of "true".

```html
  <div id="red-square" draggable="true"></div>
```

Now, if you refresh your page, you can start dragging the red square. When you
release it, it will "snap" back to it's original position.

![draggable red square](images/drag-red-square-1.gif)

### Handling the start of a drag

Now that the element is draggable, you need some JavaScript to handle the event
of when someone starts dragging an element. This is there so that your code
knows what's being dragged! Otherwise, how will it know what to do when the
dragging ends?

The following code creates a handler for the `dragstart` event. Then, it
subscribes to the red square's `dragstart` event with that event handler. The
event handler, in this case, will add a class to the red square to make it show
that it's being dragged. Then, it adds the value of the `id` of the element to
the "data transfer" object. The "data transfer" object holds all of the
information that will be needed when the dragging operation ends.

The `classList` object for the HTML element is just a way to add and remove
CSS classes to and from a DOM object. You're not going to be tested over that
bit of information for some weeks, so don't worry about remembering it. Just
understand that using the `add` method on it _adds_ the CSS class to the HTML
element.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Red Square is a Drag</title>
  <script type="text/javascript">
    const handleDragStart = e => {
      e.target.classList.add('is-being-dragged');
      e.dataTransfer.setData('text/plain', e.target.id);
      e.dataTransfer.dropEffect = 'move';
    }
    window.addEventListener('DOMContentLoaded', () => {
      document
        .getElementById('red-square')
        .addEventListener('dragstart', handleDragStart);
    });
  </script>
  <style>
    #red-square {
      background-color: red;
      box-sizing: border-box;
      height: 100px;
      width: 100px;
    }

    .is-being-dragged {
      opacity: 0.5;
      border: 2px dashed white;
    }
  </style>
</head>
<body>
  <div id="red-square"></div>
</body>
</html>
```

If you update your version of the code, you can now see that the square's border
gets all dashy when you drag it!

![draggable red square with dashed border](images/drag-red-square-2.gif)

### The drop zone is all clear!

A drop zone is just another HTML element. Put another `div` in your HTML and
give it an id of `drop-zone`. It could, conceivably, look like this.

```html
<body>
  <div id="red-square"></div>
  <div id="drop-zone">drop zone</div>
</body>
```

To make it visible, add some CSS. Note that most of that in there is to make it
look pretty. You should understand the simple things like "background-color" and
"color" and "font-size", "height" and "width". You won't yet be tested on any of
those other properties. But, feel free to play around with them!

```html
<style>
  #drop-zone {
    align-items: center;
    border: 1px solid #DDD;
    color: #CCC;
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2em;
    font-weight: bold;
    height: 200px;
    justify-content: center;
    position: absolute;
    right: 0;
    width: 200px;
  }

  #red-square {
    background-color: red;
    box-sizing: border-box;
    height: 100px;
    width: 100px;
  }

  .is-being-dragged {
    opacity: 0.5;
    border: 2px dashed white;
  }
</style>
```

![draggable red square with dashed border and drop zone](images/drag-red-square-3.1.png)

### Handle when the red square gets enters the drop zone (and leaves)

This is another couple of JavaScript event handlers, but this time, it will
handle the `dragenter` and `dragleave` events on the drop zone element. You can
replace the `<script>` tag in your HTML with this version, here, to handle those
events. Note that the `handleDragEnter` event handler merely adds a CSS class to
the drop zone. The `handleDragLeave` removes the CSS class. Then, in the
`DOMContentLoaded` event handler, the last three lines gets a reference to the
drop zone element and attaches the event handlers to it.

```html
<script type="text/javascript">
  const handleDragStart = e => {
    e.target.classList.add('is-being-dragged');
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = e => {
    e.target.classList.add('is-active-drop-zone');
  };

  const handleDragLeave = e => {
    e.target.classList.remove('is-active-drop-zone');
  };

  window.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById('red-square')
      .addEventListener('dragstart', handleDragStart);

    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
  });
</script>
```

The CSS to make the item change looks like this. Just add the class to the
`<style>` tag in the HTML.

```css
.is-active-drop-zone {
  background-color: blue;
}
```

Just look at that drop zone turn blue with glee!

![draggable red square with dashed border and active drop zone](images/drag-red-square-4.gif)

### Do something with a "drop"!

Finally, the `drop` event of the drop target handles what happens when you let
go of the draggable element over the drop zone. However, there's one small
problem. From the MDN documentation on [Drag Operations]:

> If the mouse is released over an element that is a valid drop target, that is,
> one that cancelled the last `dragenter` or `dragover` event, then the drop
> will be successful, and a drop event will fire at the target. Otherwise, the
> drag operation is cancelled, and no drop event is fired.

For this to work properly, you will _also_ have to subscribe to the `drop` event
for the drop zone. Then, in both the handlers for the `drop` and `dragenter`
events, you'll need to cancel the event. Recall that in the last article you
learned about the `preventDefault()` method on the event object. That's what you
need to call in both the `drop` and `dragenter` event handlers to make the
`drop` event fire.

That's a lot of words! Here is the final HTML for this little dragging example.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Red Square is a Drag</title>
  <script type="text/javascript">
    const handleDragStart = e => {
      e.target.classList.add('is-being-dragged');
      e.dataTransfer.setData('text/plain', e.target.id);
      e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnter = e => {
      // Needed so that the "drop" event will fire.
      e.preventDefault();
      e.target.classList.add('is-active-drop-zone');
    };

    const handleDragLeave = e => {
      e.target.classList.remove('is-active-drop-zone');
    };

    const handleDragOver = e => {
      // Needed so that the "drop" event will fire.
      e.preventDefault();
    };

    const handleDrop = e => {
      const id = e.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(id);
      draggedElement.draggable = false;
      e.target.appendChild(draggedElement);
    };

    window.addEventListener('DOMContentLoaded', () => {
      document
        .getElementById('red-square')
        .addEventListener('dragstart', handleDragStart);

      const dropZone = document.getElementById('drop-zone');
      dropZone.addEventListener('drop', handleDrop);
      dropZone.addEventListener('dragenter', handleDragEnter);
      dropZone.addEventListener('dragleave', handleDragLeave);
      dropZone.addEventListener('dragover', handleDragOver);
    });
  </script>
  <style>
    #drop-zone {
      align-items: center;
      border: 1px solid #DDD;
      color: #CCC;
      display: flex;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 2em;
      font-weight: bold;
      height: 200px;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 100px;
      width: 200px;
    }

    #red-square {
      background-color: red;
      box-sizing: border-box;
      height: 100px;
      width: 100px;
    }

    .is-being-dragged {
      opacity: 0.5;
      border: 8px dashed white;
    }

    .is-active-drop-zone {
      background-color: blue;
      color:
    }
  </style>
  </style>
</head>
<body>
  <div id="red-square" draggable="true"></div>
  <div id="drop-zone">drop zone</div>
</body>
</html>
```

![droppable red square with dashed border and active drop zone](images/drag-red-square-5.gif)


## What you learned:

There is *a lot* going on, here. Here's a quick review of what you should get
from this article.

* HTML has a Drag and Drop API that you can use to do dragging and dropping in
  an application.
* To make it so that a person can drag an HTML element around, you add the
  `draggable="true"` attribute/value pair to the element (or elements) that you
  want to drag.
* You can subscribe to one event on the thing you want to drag, the `dragstart`
  event. That event will allow you to customize the element and save data to the
  `dataTransfer` object.
* You can subscribe to four events for the "drop zone" element(s): `dragenter`,
  `dragover`, and `dragleave`. If you want the `drop` event to work, you _must_
  subscribe to both `dragenter` and `dragover` and cancel the event using the
  `preventDefault()` method of the event.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[2]: https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
[3]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
[4]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event
[Drag Operations]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drop

________________________________________________________________________________
# Event Handling: Click Events With Event.target

Imagine a user is viewing a Web page showing 300 different products. The user
carefully studies the page, makes a selection, and clicks on one of the 300
products. Could we find out through code which element was clicked on? Yes!

Previously we learned how to handle a click event using an element’s ID.
However, what if we don’t know the ID of the clicked element before it’s
clicked? There is a simple property we can use to discover on which element the
click event occurred: `event.target`.

According to the MDN doc on [event.target][1], "the `target` property of the
`Event` interface is a reference to the object that dispatched the event. It is
different from [event.currentTarget][2] when the event handler is called during
the bubbling or capturing phase of the event." Essentially:

- `event.target` refers to the element on which the event occurred (e.g. a
  clicked element).
- `event.currentTarget` refers to the element to which the event handler has
  been attached, which could be the parent element of the `event.target`
  element. (_Note: We’ll talk about this in more detail in the reading on The
  Bubbling Principle._)

It is common practice for developers to use `event.target` to reference the
element on which the event occurs in an event handling function. Let’s practice
using this handy property to get the ID of a clicked element.

## Use event.target to console.log the ID of a clicked div

Let’s say we had an HTML page with 10 `divs`, each with a unique ID, like below.
We want to click on any one of these divs and print the clicked div’s ID to the
console.

**HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="example.css" />
    <script type="text/javascript" src="example.js"></script>
  </head>
  <body>
    <div id="div-1" class="box">1</div>
    <div id="div-2" class="box">2</div>
    <div id="div-3" class="box">3</div>
    <div id="div-4" class="box">4</div>
    <div id="div-5" class="box">5</div>
    <div id="div-6" class="box">6</div>
    <div id="div-7" class="box">7</div>
    <div id="div-8" class="box">8</div>
    <div id="div-9" class="box">9</div>
    <div id="div-10" class="box">10</div>
  </body>
</html>
```

In our linked **example.css** file, we’ll add style to the `.box` class to make
our `divs` easier to click on:

**CSS**

```css
.box {
  border: 2px solid gray;
  height: 50px;
  width: 50px;
  margin: 5px;
}
```

Now, we’ll write Javascript to print the clicked div’s ID to the console. Again,
we want to wait for the necessary DOM elements to load before running our script
using `DOMContentLoaded`. Then, we’ll listen for a click event and `console.log`
the clicked element’s ID.

**Javascript**

```js
// example.js

// Wait for the DOM to load
window.addEventListener("DOMContentLoaded", event => {
  // Add a click event listener on the document’s body
  document.body.addEventListener("click", event => {
    // console.log the event target’s ID
    console.log(event.target.id);
  });
});
```

If you open up your HTML in a browser, you should see the 10 `divs`. Click on
any one of them. Open up the browser console by right-clicking, selecting
_Inspect_, and opening the _Console_ tab. The ID of the div you clicked should
be printed to the console. Click on the other divs randomly, and make sure their
IDs print to the console as well.

## What we learned:

- The definition of `event.target`
- How `event.target` differs from `event.currentTarget`
- How to console.log the ID of a clicked element using `event.target`

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Event/target
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget

________________________________________________________________________________
# Event Handling: The Bubbling Principle

Bubbles are little pockets of air that make for an amusing time in the bath.
Sometimes, though, bubbles can be annoying -- like when they suddenly pop, or
when there are too many and they’re overflowing! We can think about Javascript
events and their handlers as bubbles that rise up through the murky waters of
the DOM until they reach the surface, or the top-level DOM element.

It’s important for developers to understand The Bubbling Principle and use it to
properly handle events and/or to stop events from bubbling up to outer elements
and causing unintended effects.

## What is the bubbling principle?

According to [this handy bubbling explainer][1] on Javascript.info, The Bubbling
Principle means that _when an event happens on an element, it first runs the
handlers on it, then on its parent, then all the way up on other ancestors._
Consider the following example HTML.

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript">
      window.addEventListener("DOMContentLoaded", event => {
        document.body.addEventListener("click", event => {
          console.log(event.target.id);
        });
      });
    </script>
  </head>
  <body>
    <div onclick="console.log('The onclick handler!')">
      <p id="paragraph">
        If you click on this P, the onclick event for the DIV actually runs.
      </p>
    </div>
  </body>
</html>
```

In the `<script>`, you can see the event listener for `DOMContentLoaded`, and
inside it, another listener for a `click` event on the `<body>` element of the
document accessed through the special property `document.body`. (You could also
use `document.querySelector('body')`, too.) By now, we should be used to
listening for click events in our scripts. However, there's another way to run a
function on a `click` event as an attribute of the `div` in the body of the
HTML, a way that **you should never ever ever use in real production code**!

Check out that `onclick` attribute with some JavaScript code to print out a
message about the so-called onclick handler. For almost ever event type like
`click` or `change` or `keypress`, you can put an attribute by prefixing the
event name with the word "on". However, **you should never ever ever use that in
real production code**!

Save the above HTML in a file, and run that file in a browser. Open up the
browser console (_right-click -> Inspect -> Console_), click on the `<p>`
element, and observe what happens. The message "The onclick handler" should
appear, then you should see the id `paragraph` printed to the console.

What happened here? The `console.log` shows that an event happened on the `<p>`
(i.e. the `event.target`), and yet the `onclick` handler on the `<div>` also
fired -- meaning that the click event on the `<p>` bubbled up to the `<div>` and
fired its `onclick` event!

Once again, here's the deal:

> Don't ever use the `on`-event-name attribute version of an event handler.
> Instead, always use the `addEventListener` method of the DOM object that you
> get from something like `document.getElementById` or `document.querySelector`.

## An event bubbling example

To visualize event bubbling, it might be helpful to watch this short and fun
YouTube video on _bubbles inside bubbles inside bubbles_.

[Bubble Inside a Bubble Video][3]

We can think of events that happen on nested DOM elements as these nested
bubbles. An event that happens on the innermost element bubbles up to its parent
element, and that parent’s parent element, and so on up the chain. Let’s look at
another example that demonstrates bubbling.

**HTML**

```html
<!DOCTYPE html>
<html>
  <body>
    <main>
      <div>
        <p>This is a paragraph in a div in a main in a body in an html</p>
      </div>
    </main>

    <script>
      function handler(e) {
        console.log(e.currentTarget.tagName);
      }
      document.querySelector('main').addEventListener('click', handler);
      document.querySelector('div').addEventListener('click', handler);
      document.querySelector('p').addEventListener('click', handler);
    </script>
  </body>
</html>
```

If you save this HTML file, open it in a browser, and click on the `<p>`, three
different messages should appear in the console: first "P", second "DIV", and
third "MAIN". The click event bubbled upwards from the `<p>` element to the
`<div>` and finally to the `<main>`.

We could think of this succession of events as bubbles popping. The innermost
bubble (the `<p>` element) _popped_ (i.e. displayed an alert), which caused its
parent’s bubble to pop, which caused its parent’s bubble to pop. Since there
aren’t any `onclick` handlers above the `<main>` nothing else happens on the
page, but the bubbles would travel all the way up the DOM until they reached the
top (`<html>`) looking for event handlers to run.

## Stopping event bubbling with stopPropagation()

As stated in the introduction, event bubbling can cause annoying side effects.
This MDN doc on [Event bubbling and capture][4] explains what would happen if a
user clicked on a `<video>` element that has a parent `<div>` with a show/hide
toggle effect. On a click, the video would disappear along with its parent div!

How can you stop this unintended behavior from occurring? The answer is with the
[event.stopPropagation()][5] method which stops the bubbling from continuing up
the parent chain. Here’s what it would look like on the `<video>` element:

**Javascript**

```js
document
  .querySelector('video')
  .addEventListener('click', event => {
    event.stopPropagation();
    video.play();
  });
```

## Event delegation

While event bubbling can sometimes be annoying, it can also be helpful. The
bubbling effect allows us to make use of **event delegation**, which means
that we can delegate events to a single element/handler -- a parent element that
will handle all events on its children elements.

Say you had an unordered list (`<ul>`) element filled with several list item
(`<li>`) elements, and you want to listen for click events on each list item.
Instead of attaching a click event listener on each and every list item, you
could conveniently attach it to the parent unordered list, like so:

**HTML**

```html
<ul id="my-list">
  <li>This is list item 1.</li>
  <li>This is list item 2.</li>
  <li>This is list item 3.</li>
  <li>This is list item 4.</li>
  <li>This is list item 5.</li>
</ul>
<script>
  document
    .getElementById('my-list')
    .addEventListener('click', e => {
       // will print out "This is list item X"
       // depending on which list item is clicked
      console.log(e.target.innerHTML);

      // always prints "my-list"
      console.log(e.currentTarget.id);
    });
</script>
```

This example is a lot like the first example you saw with the `<p>` inside of a
`<div>`, where the click on the `<p>` bubbled up to the `<div>`. In the above
example, a click on any `<li>` will bubble up to its parent, the `<ul>`.

When clicked on, a single `<li>` element becomes the [event.target][7] -- the
object that dispatched the event. The `<ul>` element is the
[event.currentTarget][8] -- the element to which the event handler has been
attached.

Now that you know how to handle events responsibly, go frolic in the bubbles!

## What we learned:

- The definition of The Bubbling Principle
- Examples of event bubbling
- How to stop events from bubbling
- How to use bubbling for event delegation

[1]: https://javascript.info/bubbling-and-capturing
[2]: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
[3]: https://www.youtube.com/watch?v=OntX1115Tw4
[4]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Event/target
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget

________________________________________________________________________________
# Project: Event Handling With Mr. Spud Face

Mr. Spud Face is a charming potato with an inexplicably handsome face. He has
recently moved to your state and needs to get an updated driver’s license with
his current information, so that he can do nifty things like drive to the
grocery store, vote, and take his spud spouse on special dates.  

Use Javascript to create a driver’s license for Mr. Spud Face. If you want to
go the extra mile, create a Mr. Spud Face drag-and-drop game as a bonus.

Now that you know how to handle page events with Javascript, put that knowledge
into use on this project!

In this project, you will:

- Write Javascript to handle common form events
- Handle input, checkbox, and button click events
- Grab form values and update elements with those values
- Utilize bubbling and event delegation
- Use the HTML Drag-and-Drop API (if you dare!)

## Project overview

Use what you’ve learned about event handling to complete this project.
Demonstrate that you can use event listeners on page elements and event
handlers.  

**We have set up a project folder for you to use inside this folder called
`spud-face-project.zip`** with an HTML file, CSS file, and Javascript file. Use
this folder to complete your project.

In phases 1-4, you will write Javascript to grab the driver’s license form
values and update Mr. Spud Face’s license, as well as handle other form events
on inputs and button clicks. To get a good understanding of the HTML
Drag-and-Drop API, complete the bonus section by making a drag-and-drop spud
game.

## Phase 1: Create a spud driver’s license

In your `spud-face-project` folder, open up your `spud-face.html` file. Open it
up in a browser to see what the page looks like.

We’ve filled it with elements, chief of which are a `<form>` element and a
`<div>` depicting a driver’s license. Use the form to build out the driver’s
license information.

### Phase 1A: Get form values and display on driver’s license

The form values on the left should update the driver’s license information on
the right. Set up event listeners on the form whenever the user inputs a value
into a form input. Get the value of that form input and update the
corresponding information on the driver’s license. You might want to use the
following:

- [document.getElementById()][1]
- [eventTarget.addEventListener()][2]
- [HTMLElement: input event][3]
- [checkbox.checked attribute][4]

### Phase 1B: Refactor to use event delegation and event.target

In phase 1A, you might have set up event listeners on each form input. While
that does work, it would be ideal to make use of [event delegation][5] and
attach a single listener to our form.

1. Set up a single event listener on the form to listen for an input change.
2. Write some logic, in the form of an `if` statement or `switch` case
statement, to update the `innerHTML` of the driver’s license elements that
correspond with `event.target`.
3. You may want to use `event.target.id` and `event.target.value`.
4. Make sure your script runs after the DOM has loaded.

## Phase 2: Add focus and blur events to form inputs

Jazz up your form inputs by adding a quick color change on `focus`, and
removing it on `blur`. Give active inputs a background color of `lightgreen`
and no background color (initial state) when inactive. Use the following to do
so:

- `Element: focus event`
- `Element: blur event`

## Phase 3: Check that license numbers match

Check that the numbers entered by the user on the license number fields match.
In your HTML file, these are represented by the inputs with the IDs of
`input-license-num` and `input-license-num-confirm`.

If the numbers don’t match, then change the background color of both inputs to
be `lightcoral`.

Again, you’ll use `event.target.value` here. You might want to use
`setTimeout()` to give the user some time to fill out the form.

## Phase 4: Update submit button click count

Since this isn’t a real form that actually submits the driver’s license info
anywhere, you won’t need to make a server or API request. Instead, write a
function to increment the click count every time the submit button is clicked.

Listen for a `click` event on the button. Then, update the click count inside
of the button.

## Bonus: Mr. Spud Face Drag-and-Drop Game

Use the [HTML Drag-and-Drop API][6] to create a Mr. Spud Face drag-and-drop
game inside of your `spud-face.html` file.

Add the images inside of the project’s `images` folder to your HTML file, and
write Javascript that will let the user drag the spud body parts and drop them
onto the spud body. Set up handlers for these drag events:

- `dragStart`
- `drag` or `dragOver`
- `dragEnd` or `drop`

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
[2]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
[3]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
[4]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#checked
[5]: https://javascript.info/event-delegation
[6]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

________________________________________________________________________________
# WEEK-04 DAY-4<br>*JSON and Storage* {ignore=true}
________________________________________________________________________________
# JSON Learning Objectives

**The objective of this lesson** is to familiarize you with the JSON format and
how to serialize to and deserialize from that format.

**The learning objectives** for this lesson are that you can:

1. Identify and generate valid JSON-formatted strings
2. Use `JSON.parse` to deserialize JSON-formatted strings
3. Use `JSON.stringify` to serialize JavaScript objects
4. Correctly identify the definition of "deserialize"
5. Correctly identify the definition of "serialize"

**This lesson is relevant** because JSON is the _lingua franca_ of data
interchange.ou with the JSON format and
how to serialize to and deserialize from that format.

**The learning objectives** for this lesson are that you can:

1. Identify and generate valid JSON-formatted strings
2. Use `JSON.parse` to deserialize JSON-formatted strings
3. Use `JSON.stringify` to serialize JavaScript objects
4. Correctly identify the definition of "deserialize"
5. Correctly identify the definition of "serialize"

**This lesson is relevant** because JSON is the _lingua franca_ of data
interchange.

________________________________________________________________________________
# Storage Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Write JavaScript to store the value "I <3 falafel" with the key "eatz" in the
   browser's local storage.
2. Write JavaScript to read the value stored in local storage for the key
   "paper-trail".earning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Write JavaScript to store the value "I <3 falafel" with the key "eatz" in the
   browser's local storage.
2. Write JavaScript to read the value stored in local storage for the key
   "paper-trail".

________________________________________________________________________________
# Cookies and Web Storage

As we’ve learned in previous sections, most data on the Web is stored in a
database on a server, and we use the browser to retrieve this data. However,
sometimes data is stored locally for the purposes of persisting throughout an
entire session or until a specified expiration date.

In this reading, we’ll go over using **cookies** to store data versus using the
**Web Storage API** and the use cases for each storage method.

## Cookies

Cookies have been around forever, and they are still a widely used method to
store information about a site’s users.

**What is a cookie?**

A cookie is a small file stored on a user’s computer that holds a bite-sized
amount of data, under 4KB. Cookies are included with HTTP requests. The server
sends the data to a browser, where it's typically stored and then sent back to
the server on the next request.

**What are cookies used for?**

Cookies are used to store stateful information about a user, such as their
personal information, their browser habits or history, or form input information
they have filled out. A common use case for cookies is storing a _session
cookie_ on user login/validation. Session cookies are lost once the browser
window is closed. To make sure the cookie persists beyond the end of the
session, you could set up a _persistent cookie_ with a specified expiration
date. A use case for a persistent cookie is an e-commerce website that tracks a
user’s browsing or buying habits.

**How to create a cookie in Javascript:**

As we've previously covered, the `document` interface represents the web page
loaded in a user's browser. Since cookies are stored on a user's browser, it
makes sense that the `document` object also allows us to get/set cookies on a
user's browser:

```js
const firstCookie = "favoriteCat=million";
document.cookie = firstCookie;
const secondCookie = "favoriteDog=bambi";
document.cookie = secondCookie;
document.cookie; // Returns "favoriteCat=million; favoriteDog=bambi"
```

Using the following syntax will create a new cookie:

```js
document.cookie = aNewCookieHere;
```

If you want to set a second cookie, you would assign a new key value pair using
the same syntax a second time. Make sure to set the cookie to a string formatted
like a key-value pair:

```js
const firstCookie = "favoriteCat=million";
document.cookie = firstCookie;
document.cookie; // Returns "favoriteCat=million"
```

Formatting your string like we do in the `firstCookie` variable above sets the
cookie `value` with a defined key, known as the cookie's `name`, instead of an
empty `name`. Refer to the MDN docs on [Document.cookie][1] for more examples.

You can view all the cookies a website is storing about you by using the
Developer Tools. On **Google Chrome**, see the **Application tab**, and on
**Firefox**, see the **Storage tab**.

**Deleting a cookie:**

We can delete our own cookies using JavaScript by setting a cookie's expiration
date to a date in the past, causing them to expire:

```js
const firstCookie = "favoriteCat=million";
document.cookie = firstCookie;
document.cookie; // Returns "favoriteCat=million"

// specify the cookies "name" (the key) with an "=" and set the  expiration
// date to the past
document.cookie = "favoriteCat=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
document.cookie; // ""
```

We can also delete cookies using the Developer Tools!

Navigate to a website, such as Amazon, and add an item to your cart. Open up the
Developer Tools in your browser and delete all the cookies. In Chrome, you can
delete cookies by highlighting a cookie and clicking the delete button. In
Firefox, you can right-click and delete a cookie. If you’ve deleted all the
cookies in your Amazon cart, and you refresh the page, you should notice your
cart is now empty.

## Web Storage API

Cookies used to be the only way to store data in the browser, but with HTML5
developers gained access to the [Web Storage API][2], which includes
**localStorage** and **Session Storage**. Here are the differences between the
two, according to MDN:

`sessionStorage`:

- Stores data only for a _session_, or until the browser window or tab is closed
- Never transfers data to the server
- Has a storage limit of 5MB (much larger than a cookie)

The following [example from MDN][3] shows how we can use sessionStorage to
autosave the contents of a text field and restore the contents of that text
field if the browser is accidentally refreshed.

```js
// Get the text field that we're going to track
let field = document.getElementById("field");

// See if we have an autosave value
// (this will only happen if the page is accidentally refreshed)
if (sessionStorage.getItem("autosave")) {
  // Restore the contents of the text field
  field.value = sessionStorage.getItem("autosave");
}

// Listen for changes in the text field
field.addEventListener("change", function () {
  // And save the results into the session storage object
  sessionStorage.setItem("autosave", field.value);
});
```

`localStorage`:

- Stores data with no expiration date and is deleted when clearing the browser
  cache
- Has the maximum storage limit in the browser (much larger than a cookie)

Like with `sessionStorage`, we can use the `getItem()` and `setItem()` methods
to retrieve and set `localStorage` data. The following [example from MDN][4]
will:

- Check whether `localStorage` contains a data item called `bgcolor` using
  `getItem()`.
- If `localStorage` contains `bgcolor`, run a function called `setStyles()` that
  grabs the data items using `Storage.getItem()` and use those values to update
  page styles.
- If it doesn't, run a function called `populateStorage()`, which uses
  `Storage.setItem()` to set the item values, then run `setStyles()`.

```js
if (!localStorage.getItem("bgcolor")) {
  populateStorage();
}
setStyles();

const populateStorage = () => {
  localStorage.setItem("bgcolor", document.getElementById("bgcolor").value);
  localStorage.setItem("font", document.getElementById("font").value);
  localStorage.setItem("image", document.getElementById("image").value);
};

const setStyles = () => {
  var currentColor = localStorage.getItem("bgcolor");
  var currentFont = localStorage.getItem("font");
  var currentImage = localStorage.getItem("image");

  document.getElementById("bgcolor").value = currentColor;
  document.getElementById("font").value = currentFont;
  document.getElementById("image").value = currentImage;

  htmlElem.style.backgroundColor = "#" + currentColor;
  pElem.style.fontFamily = currentFont;
  imgElem.setAttribute("src", currentImage);
};
```

**When would we use the Web Storage API?**

Since web storage can store more data than cookies, it’s ideal for storing
multiple key-value pairs. Like with cookies, this data can be saved only as a
string. With localStorage, the data is stored locally on a user’s machine,
meaning that it can only be accessed client-side. This differs from cookies
which can be read both server-side and client-side.

There are a few common use cases for Web storage. One is storing information
about a shopping cart and the products in a user’s cart. Another is saving input
data on forms. You could also use Web storage to store information about the
user, such as their preferences or their buying habits. While we would normally
use a cookie to store a user’s ID or a session ID after login, we could use
localStorage to store extra information about the user.

You can view what’s in local or session storage by using the Developer Tools. On
**Google Chrome**, see the **Application tab**, and on **Firefox**, see the
**Storage tab**.

## What we learned:

- What cookies are and when to use them
- Differences between cookies and localStorage
- Use cases for cookies and localStorage

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Storage

________________________________________________________________________________
# Jason? No, JSON!

[Jason] is an ancient Greek mythological hero who went traipsing about the known
world looking for "the golden fleece".

[JSON] is an open-standard file format that "uses human-readable text to
transmit objects consisting of key-values pairs and array data types."

We're going to ignore [Jason] and focus solely on [JSON] for this reading so
that you can, by the end of it, know what [JSON] is and how to work with it.

## JSON is a format!

This is the most important thing that you can get when reading this article. In
the same way that HTML is a format for hypertext documents, or DOCX is a format
for Microsoft Word documents, JSON is just a format for data. It's just text. It
doesn't "run" like JavaScript does. It is just text that contains data that both
machines and humans can understand. If you ever hear someone say "a JSON
object", then you can rest assured that phrase doesn't make any sense
whatsoever.

JSON is just a string. It's just text.

That's so important, here it is, again, but in a fancy quote box.

> JSON is just a string. It's just text.

## Why all the confusion?

The problem is, JSON _looks_ a lot like JavaScript syntax. Heck, it's even named
**JavaScript Object Notation**. That's likely because the guy who invented it,
[Douglas Crockford], is an avid JavaScripter. He's the author of [JavaScript:
The Good Parts] and was the lead JavaScript Architect at Yahoo! back when Yahoo!
was a real company.

At that time, like in the late 1990s and early 2000s, there were a whole bunch
of competing formats for how computers would send data between one another. The
big contender at the time is a format called XML, or the _eXtensible Markup
Language_. It looks a lot like HTML, but has far stricter rules than HTML.
Douglas didn't like XML because it took a lot of bytes to send the data (and
this was a pre-broadband/pre-3G world). Worse, XML is not a friendly format to
read if you're human. So, he set out to come up with a new format based on the
way JavaScript literals work.

## "Remind me about JavaScript literals..."

Just to refresh your memory, a _literal_ in JavaScript is a _value that you
literally just type in_. If you type `7` into a JavaScript file, when it runs,
the JavaScript interpreter will see that character `7` and say to itself, "Hey
self, the programmer literally typed the number seven so that must mean they
want the value 7."

Here's a table of some literals that you may type into a program.

| What you want to type                      | The JavaScript literal              |
|--------------------------------------------|-------------------------------------|
| The value that means "true"                | `true`                              |
| The number of rows in this table           | `6`                                 |
| A bad approximation of π                   | `3.14`                              |
| An array that contains some US state names | `["Ohio", "Iowa"]`                  |
| An object that represents Roberta          | `{ person: true, name: "Roberta" }` |

Back to Douglas Crockford, inventor of [JSON]. Douglas thought to himself, _why
can't I create a format that has that simplicity so that I can write programs
that can send data to each other in that format?_ Turns out, he could, and he
did.

## Boolean, numeric, and null values

The following table shows you what the a JavaScript literal is in the JSON
format. Notice that _everything_ in the JSON column is actually a string!

| JavaScript literal value | JSON representation in a string |
|--------------------------|---------------------------------|
| `true`                   | `"true"`                        |
| `false`                  | `"false"`                       |
| `12.34`                  | `"12.34"`                       |
| `null`                   | `"null"`                        |

## String literals in JSON

Say you have the following string in JavaScript.

```js
'this is "text"'
```

When that gets converted into the JSON format, you will see this:

```json
"this is \"text\""
```

First, it's important to notice one thing: JSON always uses double quotes for
strings. Yep, that's worth repeating.

> JSON always uses double-quotes to mark strings.

Notice also that the quotation marks (") are "escaped". When you write a string
surrounded by quotation-marks like "escaped", everything's fine. But, what
happens when your string needs to include a quotation mark?

```js
// This is a bad string with quotes in it
"Bob said, "Well, this is interesting.""
```

Whatever computer is looking at that string gets really confused because once it
reads that first quotation mark it's looking for another quotation mark to show
where the string ends. For computers, the above code looks like this to them.

```js
"Bob said, "                // That's a good string
Well, this is interesting   // What is THIS JUNK????
""                          // That's a good string
```

You need a way to indicate that the quotation marks around the phrase that Bob
says should belong _in_ the string, not as a way to show where the string starts
or stops. The way that language designers originally addressed this was by
saying

> If your quotation mark delimited string has a quotation mark in it, put a
> backslash before the interior quotation mark.

Following that rule, you would correctly write the previous string like this.

```js
"Bob said, \"Well, this is interesting.\""
```

Check out all of the so-called [JavaScript string escape sequences] over on
MDN.

What happens if you had text that spanned more than one line? JSON only allows
strings to be on one line, just like old JavaScript did. Let's say you just
wrote an American sentence that you want to submit to a contest.

```
She woke him up with
her Ramones ringtone "I Want
to be Sedated"
```
(from American Sentences by Paul E. Nelson)

If you want to format that in a string in JSON format, you have to escape the
quotation marks _and_ the new lines! The above would look like this:

```
She woke him up with\nher Ramones ringtone \"I Want\nto be Sedated\"
```

The new lines are replaced with "\n".

## Array values

The way that JSON represents an array value is using the same literal notation
as JavaScript, namely, the square brackets `[]`. With that in mind, can you answer the
following question before continuing?

_What is the JSON representation of an array containing the numbers one, two,
and three?_

Well, in JavaScript, you would type `[1, 2, 3]`.

If you were going to type the corresponding JSON-formatted string that contains
the representation of the same array, you would type `"[1, 2, 3]"`. Yep, pretty
much the same!

## Object values

Earlier, you saw that example of an object that represents Roberta as

```js
{ person: true, name: "Roberta" }
```

The main difference between objects in JavaScript and JSON is that the keys in
JSON _must_ be surrounded in quotation marks. That means the above, in a JSON
formatted string, would be:

```js
"{ \"person\": true, \"name\": \"Roberta\" }"
```

## Some terminology

When you have some data and you want to turn it into a string (or some other
kind of value like "binary") so your program can send it to another computer,
that is the process of **serialization**.

When you take some text (or something another computer has sent to your program)
and turn it into data, that is the process of **deserialization**.

## Using the built-in JSON object

In modern JavaScript interpreters, there is a `JSON` object that has two methods
on it that allows you to convert JSON-formatted strings into JavaScript objects
and JavaScript object into JSON-formatted strings. They are:

* `JSON.stringify(value)` will turn the value passed into it into a string.
* `JSON.parse(str)` will turn a JSON-formatted string into a JavaScript object.

So, it shouldn't come as much of a surprise how the following works.

```js
const array = [1, 'hello, "world"', 3.14, { id: 17 }];
console.log(JSON.stringify(array));
// prints [1, "hello, \"world\"", 3.14, {"id":17}]
```

It shouldn't surprise you that it works in the opposite direction, too.

```js
const str = '[1,"hello, \\"world\\"",3.14,{"id":17}]';
console.log(JSON.parse(str));
// prints an array with the following entries:
//   0: 1
//   1: "hello, \"world\""
//   2: 3.14
//   3: { id: 17 }
```

You may ask yourself, "What's up with that double backslash thing going on in
the JSON representation?". It has to do with that escaping thing. When
JavaScript reads the string the first time to turn it into a `String` object in
memory, it will escape the backslashes. Then, when `JSON.parse` reads it, it
will still need backslashes in the string. This is all really confusing, escaped
strings and double backslashes. There's an easy solution for that.

## You will almost never write raw JSON

Yep. But, you do need to be able to recognize it and read it. What you'll likely
end up doing in your coding is creating values and using `JSON.stringify` to
create JSON-formatted strings that represent those values. Or, you'll end up
calling a data service which will return JSON-formatted content to your code
which you will then use `JSON.parse` on to convert the string into a JavaScript
object.

## Brain teaser

Now that you know JSON is a format for data and is just text, what will the
following print?

```js
const a = [1, 2, 3, 4, 5];
console.log(a[0]);

const s = JSON.stringify(a);
console.log(s[0]);

const v = JSON.parse(s);
console.log(v[0]);
```

## What you just learned

With some more practiced, of course, you will be able to do all of these really
well. However, right now, you should be able to

1. Identify and generate valid JSON-formatted strings
2. Use `JSON.parse` to deserialize JSON-formatted strings
3. Use `JSON.stringify` to serialize JavaScript objects
4. Correctly identify the definition of "deserialize"
5. Correctly identify the definition of "serialize"

[Jason]: https://en.wikipedia.org/wiki/Jason
[JSON]: https://en.wikipedia.org/wiki/JSON
[Douglas Crockford]: https://www.crockford.com/add.html
[JavaScript: The Good Parts]: https://isbndb.com/book/9780596517748
[JavaScript string escape sequences]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Escape_notation

________________________________________________________________________________
# Using Web Storage To Store Data In The Browser

Like cookies, the [Web Storage API][1] allows browsers to store data in the
form of key-value pairs. Web Storage has a much larger storage limit than
cookies, making it a useful place to store data on the client side.

In the cookies reading, we reviewed the two main mechanisms of Web Storage:
`sessionStorage` and `localStorage`. While `sessionStorage` persists for the
duration of the session and ends when a user closes the browser, `localStorage`
persists past the current session and has no expiration date.

One typical use case for local storage is caching data fetched from
a server on the client side. Instead of making multiple network requests to the
server to retrieve data, which takes time and might slow page load, we can
fetch the data once and store that data in local storage. Then, our website
could read the persisting data stored in localStorage, meaning our website
wouldn't have to depend on our server's response - even if the user closes their
browser!

In this reading, we’ll go over how to store and read a key-value pair in local
storage.

## Storing data in local storage

Web Storage exists in the window as an object, and we can access it by using
[Window.localStorage][2]. As we previously reviewed, with window properties we
can omit the _"window"_ part and simply use the property name, `localStorage`.

We can set a key-value pair in local storage with a single line of code. Here
are a few examples:

```js
localStorage.setItem('eatz', 'I <3 falafel');
localStorage.setItem('coffee', 'black');
localStorage.setItem('doughnuts', '["glazed", "chocolate", "blueberry",
"cream-filled"]');
```

The code above calls the `setItem()` method on the Storage object and sets a
key-value pair. Examples: `eatz` (key) and `I <3 falafel` (value), `coffee`
(key) and `black` (value), and `doughnut` (key) and `["glazed", "chocolate",
"blueberry", "cream-filled"]` (value). Both the key and the value must be
strings.

## Reading data in local storage

If we wanted to retrieve a key-value pair from local storage, we
could use `getItem()` with a key to find the corresponding value. See the
example below:

```js
localStorage.setItem('eatz', 'I <3 falafel');
localStorage.setItem('coffee', 'black');
localStorage.setItem('doughnuts', '["glazed", "chocolate", "blueberry",
"cream-filled"]');

const eatz = localStorage.getItem('eatz');
const coffee = localStorage.getItem('coffee');
const doughnuts = localStorage.getItem('doughnuts');

console.log(eatz); // 'I <3 falafel'
console.log(coffee); // 'black'
console.log(doughnuts); // '["glazed", "chocolate", "blueberry", "cream-filled"]'
```

The above code reads the item with a key of `eatz`, the item with a key of
`doughnut`, and the item with a key of `coffee`. We stored these in variables
for handy use in any function we write.

Check the MDN docs on [localStorage][2] for other methods on the Storage
object to remove and clear all key-value pairs.

## JSON and local storage

When we store and read data in local storage, we're actually storing [JSON][3]
objects. JSON is text format that is independent from JavaScript but
also resembles JavaScript object literal syntax. It's important to note that
JSON exists as a _string_.

Websites commonly get JSON back from a server request in the form of a
text file with a `.json` extension and a MIME type of `application/json`. We can
use JavaScript to parse a JSON response in order to work with it as a regular
JavaScript object.

Let's look at the `doughnuts` example from above:

```js
localStorage.setItem('doughnuts', '["glazed", "chocolate", "blueberry",
"cream-filled"]');
const doughnuts = localStorage.getItem('doughnuts');
console.log(doughnuts + " is a " + typeof doughnuts);
// prints '["glazed", "chocolate", "blueberry", "cream-filled"] is a string'
```

If we ran the code above in the browser console, we'd see that `doughnuts` is a
string value because it's a JSON value. However, we want to be able to store
`doughnuts` as an _array_, in order to iterate through it or map it or any
other nifty things we can do to arrays.

We can construct a JavaScript value or object from JSON by parsing it:

```js
const doughnuts = JSON.parse(localStorage.getItem('doughnuts'));
```

We used [JSON.parse()][4] to parse the string into JavaScript. If we printed
the parsed value of `doughnuts` to the console, we'd see it's a
plain ol' JavaScript array!

See the MDN doc on [Working with JSON][5] for more detail about using
JSON and JavaScript.

## What you learned:

* Why we use local storage
* How to store data in local storage
* How to read data in local storage
* How storage objects are JSON that we need to parse

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[3]: https://json.org/
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[5]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

________________________________________________________________________________
# Project: Shop Local Storage!

Learning how to set up an online shop is useful for everyone from large
e-commerce companies to an indie small business owner with a hobby website.
Shopping carts are an integral part of any online store. In this project you
will set one up with JavaScript -- and then, sell, baby, sell!

As we previously reviewed, `localStorage` is an ideal place to store data in
the browser without affecting the server-side database. One use-case for
`localStorage` is saving a user’s shopping cart so it persists from page to
page. Now that you know how to set and get items in `localStorage`, put that
knowledge to use in this project.

In this project, you will practice:

* Setting up a quick shopping cart
* Storing items in `localStorage`
* Reading items in `localStorage`
* Removing an item from `localStorage`

## Project overview

We’ve set up a project folder called **local-storage-project.zip**. Use these files to complete the project.

We have filled out the HTML file with a few elements and the CSS with some
basic styles to represent a page where users can add items to a shopping cart.
Open **storage-project.html** in a browser to see what this page looks like.

In Phases 1-3, you will write JavaScript functions to let the user do the
following:

* Add an item to the shopping cart (_i.e. store the item in `localStorage`_)
* Display the items in the shopping cart (_i.e. read the item in
`localStorage`_)
* Remove an item from the shopping cart (_i.e. remove the item from
`localStorage`_)

## Phase 1: Write a function to store an item in the cart

Our HTML file contains a simple form with a couple of inputs and a submit
button, as well as an area to display cart items.

In a code editor, open the **storage-project.js** file, where you’ll write all
of your JavaScript. You should see an event listener for `DOMContentLoaded`
because, again, it’s a good idea to wrap functions that manipulate the DOM in
this listener (or else, have a bad time with async issues!).

The first order of business is to write a function that stores the form values
in `localStorage` whenever the user clicks the `add-to-cart` button. This
function should:

* Listen for a click event
* Grab the form values
* Store the item in `localStorage`

_Hint: Recall that we use [Storage.setItem()][1] to set a key-value pair in
`localStorage`._

## Phase 2: Write a function to display the cart items

The second order of business is to write a function to display the items that
have been saved in `localStorage` to the Shopping Cart part of the page. In
your HTML file, this is represented by the `div` with an ID of `shopping-cart`.
This function should:

* Retrieve the item(s) stored in `localStorage`
* Insert the items into the DOM in the `shopping-cart` DIV
* Display both the item’s name and its quantity

_Hint: You might want to use a loop!_

_Hint: Recall that we use [Storage.getItem(key)][2] to get a value via its
key._

_Hint: We can also use [Storage.key(index)][3] to get a key name via its
index._

## Phase 3: Write a function to remove items from the cart

The last thing we need to have a fully functional cart is for the user to be
able to remove items from the cart. Write a function that lets the user remove
items from their cart. In order to do this, you might want to add to or amend
the function you wrote in Phase 2.

Insert **Remove** buttons next to each cart item you inserted on the page. Then,
write a function that does the following:

* Listen for a click event on the "Remove" buttons
* Remove the corresponding item from `localStorage`
* Remove the item from the `shopping-cart` DIV

_Hint: We can use [Storage.removeItem()][4] to remove an item from
`localStorage`._

_Hint: We can use [document.querySelectorAll()][5] to get a Node List of the
buttons. Then, loop through the list._

_Hint: Recall what you know about [event.target][6] and [Element.parentNode][7].
It would be helpful to store the item’s key in an ID attribute on the Remove
button or the button’s containing DIV, so that you know which corresponding
key-value pair to remove from `localStorage`._

_Hint: We can use [location.reload][8] to refresh the page when an item is
removed. If everything is working correctly, the other cart items should still
display after a page refresh._

## Check that your shopping cart functions correctly

After you’ve written your JS, test that the page functions as it should. A user
should be able to add an item with a given quantity to the cart. You should be
able to see this item in `localStorage` in your browser’s Developer Tools, and
it should show up in the Shopping Cart section of the page.

When a user removes an item by clicking the "Remove" button, that item should
be removed from `localStorage` as well as the page.

When you refresh the page, or close and reopen the browser, the cart items that
have not been removed should still appear on the page.

## Bonus A: Update cart item quantities and reset values

Instead of displaying text values of the item quantities (e.g. "1", "5", "12")
on the page, replace those with an [HTML5 number spinner][9]. What’s that, you
ask? It’s really just a fancy way to say an input field that lets you increment
and decrement a number value. We’ve actually already used one on the page.
Check the input for `quantity` for an example.

When a user increments or decrements the input value of an item’s quantity, get
the input value and use it to update the corresponding key-value pair in
`localStorage`.

## Bonus B: Calculate the item totals

Currently, if a user adds an item to the cart, let’s say **Apples: 1**, and
then adds that same item to the cart again with a different value, let’s say
**Apples: 3**, the value in `localStorage` gets overwritten with the new value
-- **Apples: 3**.

Write a function to calculate the total quantity added to the cart, instead of
rewriting the value. Using the above example, the actual total would be
**Apples: 4**. After calculating the total quantity of an item, update the
corresponding key-value pair in `localStorage` with the total.

When you’ve finished all of the above, congratulate yourself for all the hard
work. You made a shopping cart!

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Event/target
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
[9]: https://www.html5tutorial.info/html5-number.php
