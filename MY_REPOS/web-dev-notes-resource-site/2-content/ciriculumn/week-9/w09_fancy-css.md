# WEEK 9<br>*Fancy CSS* {ignore=true}
________________________________________________________________________________

<!-- code_chunk_output -->

[**CSS Fundamentals Learning Objectives**](#css-fundamentals-learning-objectives)
- [Maintainability: Linking to an External Stylesheet](#maintainability-linking-to-an-external-stylesheet)
  - [Link to a stylesheet in an HTML file](#link-to-a-stylesheet-in-an-html-file)
- [CSS Selectors](#css-selectors)
  - [CSS selectors](#css-selectors-1)
  - [Class selectors](#class-selectors)
  - [Compound class selectors](#compound-class-selectors)
  - [One rule, many selectors](#one-rule-many-selectors)
  - [Combinators](#combinators)
  - [Pseudo-classes](#pseudo-classes)
  - [Pseudo-selectors](#pseudo-selectors)
  - [Putting it together: CSS rules](#putting-it-together-css-rules)
  - [CSS Rule Specificity](#css-rule-specificity)
- [CSS: Type, Properties And Imports](#css-type-properties-and-imports)
  - [Typography](#typography)
  - [Font-family](#font-family)
  - [Font size](#font-size)
  - [Font style for italics](#font-style-for-italics)
  - [Font weight for bold](#font-weight-for-bold)
  - [Aligning your text](#aligning-your-text)
  - [Decorating your text](#decorating-your-text)
  - [Casing your text](#casing-your-text)
  - [Background images](#background-images)
- [CSS: Colors, Borders, and Shadows](#css-colors-borders-and-shadows)
  - [Colors](#colors)
  - [Applying colors](#applying-colors)
  - [Borders](#borders)
  - [Shadows](#shadows)
  - [Opacity](#opacity)
- [Project: Modernize Craigslist With CSS Attributes](#project-modernize-craigslist-with-css-attributes)

[**AJAX Learning Objectives**](#ajax-learning-objectives)
- [AJAX: Paving the Road to the Modern Web](#ajax-paving-the-road-to-the-modern-web)
  - [Classic Full Page Reloads](#classic-full-page-reloads)
  - [AJAX at a high level](#ajax-at-a-high-level)
  - [Asynchronous JavaScript and XML](#asynchronous-javascript-and-xml)
  - [Notes on AJAX](#notes-on-ajax)
- [AJAX Steps](#ajax-steps)
  - [Quick overview of the Fetch API](#quick-overview-of-the-fetch-api)
  - [AJAX broken down](#ajax-broken-down)
- [AJAX Project Preparation](#ajax-project-preparation)
- [Catstagram Project](#catstagram-project)
  
[**Media Query Learning Objectives**](#media-query-learning-objectives)
[**Layout Lesson Learning Objectives**](#layout-lesson-learning-objectives)
[**Flexible Box Layout Learning Objectives**](#flexible-box-layout-learning-objectives)
[**Grid Layout Lesson Learning Objectives**](#grid-layout-lesson-learning-objectives)
- [Layout: The Box Model](#layout-the-box-model)
  - [The Box Model](#the-box-model)
  - [Padding](#padding)
  - [Border](#border)
  - [Margin](#margin)
- [Layout: Positioning](#layout-positioning)
  - [Static positioning](#static-positioning)
  - [Relative positioning](#relative-positioning)
  - [Absolute positioning](#absolute-positioning)
  - [Fixed positioning](#fixed-positioning)
  - [Sticky positioning](#sticky-positioning)
- [Flexbox Layout](#flexbox-layout)
  - [Pre-flexbox float](#pre-flexbox-float)
  - [Using flexbox](#using-flexbox)
  - [Flexbox froggy](#flexbox-froggy)
- [CSS Grid](#css-grid)
  - [Bootstrap vs. CSS Grid](#bootstrap-vs-css-grid)
  - [Using CSS Grid](#using-css-grid)
- [Grid Container Styles](#grid-container-styles)
  - [Columns and Rows](#columns-and-rows)
  - [Repeating Columns and Rows](#repeating-columns-and-rows)
  - [Fractions](#fractions)
  - [Grid Template Areas](#grid-template-areas)
  - [Grid Gaps](#grid-gaps)
  - [Justify/Align Items](#justifyalign-items)
  - [Justify/Align Content](#justifyalign-content)
  - [Implicit Grids and Auto Rows/Columns/Flow](#implicit-grids-and-auto-rowscolumnsflow)
  - [Shorthand Container Properties](#shorthand-container-properties)
- [Grid Items Styles](#grid-items-styles)
  - [Spanning Columns/Rows](#spanning-columnsrows)
  - [Grid Areas](#grid-areas)
  - [Justify/Align Self](#justifyalign-self)
  - [Shorthand Item Properties](#shorthand-item-properties)
- [Practice: Flexible Box Games](#practice-flexible-box-games)
- [Practice: Grid Layout Game](#practice-grid-layout-game)
- [Project: Recreate A Trello Dashboard With Flexbox](#project-recreate-a-trello-dashboard-with-flexbox)
- [Project: Gridding Up A Page: Overview](#project-gridding-up-a-page-overview)
  - [Gridding Up A Page: Phase One](#gridding-up-a-page-phase-one)
  - [Gridding Up A Page: Phase Two](#gridding-up-a-page-phase-two)
  - [Gridding Up A Page: Phase Three](#gridding-up-a-page-phase-three)
  - [Gridding Up A Page: Phase Four](#gridding-up-a-page-phase-four)
  
[**Interactivity Learning Objectives**](#interactivity-learning-objectives)
[**CSS Maintainability Learning Objectives**](#css-maintainability-learning-objectives)
- [CSS Hover Effect And Handling Overflow](#css-hover-effect-and-handling-overflow)
  - [Adding a button effect on hover](#adding-a-button-effect-on-hover)
  - [A note about browser support](#a-note-about-browser-support)
  - [Content overflow](#content-overflow)
- [CSS Transitions](#css-transitions)
  - [Defining transitions](#defining-transitions)
  - [Examples](#examples)
  - [What can you affect with this?](#what-can-you-affect-with-this)
- [Maintainability: Using the BEM Guidelines for CSS](#maintainability-using-the-bem-guidelines-for-css)
  - [BEM Guidelines](#bem-guidelines)
  - [What is a Block?](#what-is-a-block)
  - [What is an Element?](#what-is-an-element)
  - [What is a Modifier?](#what-is-a-modifier)
  - [BEM Example](#bem-example)
- [Putting It Together](#putting-it-together)
- [Whack-A-Mole Project](#whack-a-mole-project)
- [Responsive Design Project - The App Academy Times](#responsive-design-project-the-app-academy-times)


<!-- /code_chunk_output -->

________________________________________________________________________________
# WEEK-09 DAY-2<br>*Basic CSS* {ignore=true}
________________________________________________________________________________
# CSS Fundamentals Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

At the end of the material, you should be able to

* Demonstrate how to import other CSS files into your CSS file
* Explain how CSS rules are applied based on their order and specificity
* Describe and apply element, id, and class selectors
* Write "combinators" to create compound selector statements to target specific
  elements
* Explain and apply pseudo selectors for specific elements in specific states
* Explain and apply the `::before` and `::after` pseudo elements
* Style content on an HTML page targeting
  * Type faces, sizes, styles, and weights
  * Text transformation and alignment
  * Colors expressed as names, hexadecimal RGB values, and decimal RGB values
  * Everything about borders
  * Shadows
  * Opacity (transparency)
  * Covering an element with a background image
* Explain the generic font names "serif", "sans-serif", and "monospace" and
  correctly identify examples of each
* Explain why using Web fonts helps with consistent experience across viewing
  devices
* Recall and explain the different absolute and relative length units in CSS
* Demonstrate how to link a stylesheet into an HTML page
* Be able to calculate the specificity of CSS rules and determine which rule
  override the properties of another
* Use the `content` CSS property to define the content of an element learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

At the end of the material, you should be able to

* Demonstrate how to import other CSS files into your CSS file
* Explain how CSS rules are applied based on their order and specificity
* Describe and apply element, id, and class selectors
* Write "combinators" to create compound selector statements to target specific
  elements
* Explain and apply pseudo selectors for specific elements in specific states
* Explain and apply the `::before` and `::after` pseudo elements
* Style content on an HTML page targeting
  * Type faces, sizes, styles, and weights
  * Text transformation and alignment
  * Colors expressed as names, hexadecimal RGB values, and decimal RGB values
  * Everything about borders
  * Shadows
  * Opacity (transparency)
  * Covering an element with a background image
* Explain the generic font names "serif", "sans-serif", and "monospace" and
  correctly identify examples of each
* Explain why using Web fonts helps with consistent experience across viewing
  devices
* Recall and explain the different absolute and relative length units in CSS
* Demonstrate how to link a stylesheet into an HTML page
* Be able to calculate the specificity of CSS rules and determine which rule
  override the properties of another
* Use the `content` CSS property to define the content of an element

________________________________________________________________________________
# Maintainability: Linking to an External Stylesheet

Linking to an external stylesheet in an HTML file is a basic task all developers
should be able to do. While we could write in-line styles directly in our HTML
file, the common practice is to keep CSS in an external stylesheet linked to in
an HTML file.

CSS files tend to be long, so it's easier to keep track of styles when they're
in an external stylesheet. You will most likely use multiple stylesheets in a
typical Web application: a global stylesheet, styles for different pages, and
styles for different components or features. It's best to keep these separated
from your HTML and link to them.

## Link to a stylesheet in an HTML file

Let's go over how to link to an external stylesheet.

We would start by creating a new HTML file called example.html and setting it up
with the appropriate tags:

```html
<!-- example.html -->
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
  </body>
</html>
```

Let's add this [link][1] tag to our HTML file in order to import a stylesheet.
This is the CDN link for **Normalize.css**, which is a common external
stylesheet that developers use to make elements render consistently across all
browsers. Our updated HTML file would look like the following:

```html
<!-- example.html -->
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
  </head>
  <body>
  </body>
</html>
```

Now, you can link to an external stylesheet, or even multiple _stylesheets_!
Whenever you want to add an external stylesheet, make sure to add it inside of
the `<head>` tags and use the [`<link>`][2] tag we used above. For example, now
that the styles have been normalized, you would normally want to add the styles
for your specific Web application. To do that, you'd just add another `link`
element with the "href" attribute set to the (normally relative) URL to your
site's stylesheet file.

```html
<!-- example.html -->
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
    <link rel="stylesheet" href="/styles/site.css">
  </head>
  <body>
  </body>
</html>
```

Go forth, and style to your heart’s content!

[1]: https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link

________________________________________________________________________________
# CSS Selectors

HTML without CSS is like TV without color, like a person wearing a potato sack,
or like a Craigslist ad in search of someone’s other half -- extremely sad! HTML
and CSS work closely together to create the magical interfaces a user sees on
the front end, and it’s important to understand how they are interrelated.

In this reading, we’ll go over how to use CSS classes and selectors to style
HTML elements. We will review how to target specific elements via their
attributes by using CSS attribute selectors. Adding CSS attributes to elements
is one of the building blocks of becoming a front-end engineer, so start getting
comfortable using them!

## CSS selectors

A [CSS selector][1] applies styles to a specific DOM element or elements. A
selector can be any of the following basic types:

- **Type selectors** -- matches elements by node name (e.g. `div`, `li`, `a`,
  `p`)
- **Class selectors** -- matches elements by class name (e.g.
  `<button class="active">`)
- **ID selectors** -- matches elements by ID name (e.g. `<div id="list-1">`)
- **Universal selectors** -- matches elements of any type (e.g. `*`)
- **[Attribute selectors][2]** -- matches elements based on the presence or
  value of a given attribute (e.g. `a[title]` matches all `a` elements with a
  `title` attribute)

The following CSS shows examples of each selector type:

```css
/* Type selector */
div {
  background-color: #000000;
}

/* Class selector */
.active {
  color: #ffffff;
}

/* ID selector */
#list-1 {
  border: 1px solid gray;
}

/* Universal selector */
* {
  padding: 10px;
}

/* Attribute selector */
a[title] {
  font-size: 2em;
}
```

See the MDN doc on [CSS Selectors][1] for more examples using different types of
selectors.

## Class selectors

You will probably be using class selectors the most often in your CSS, since
they will apply styles to every element that has a particular class name. Let’s
look at an example of using a class selector to style multiple elements.

We want to style all elements with the **class of "boxy"** to have:

- A `border-radius` of 4px
- A `box-shadow` with a y-offset of 2px
- A `blur` of 2px
- A black `background-color` that is 20% opaque

We could use the following CSS to achieve the above specs:

```css
/* Class selector = class name preceded by a period */
.boxy {
  border-radius: 4px;
  box-shadow: 0 2px gray; /* offset-x | offset-y | color */
  filter: blur(2px);
  background-color: #000000;
  opacity: 0.2; /* 100% = 1 */
}
```

## Compound class selectors

Quite often, you will have elements in your HTML that have more than one class
applied to them. Consider the following example that has three `div` elements
each with two classes.

```html
<div class="box yellow"></div>
<div class="box orange"></div>
<div class="circle orange"></div>
```

The following table shows you what would be selected given single class
selectors:

| Selector  | What gets selected           |
|-----------|------------------------------|
| `.box`    | The first two `div` elements |
| `.orange` | The last two `div` elements  |

Right now, there's no way to have selector that can select _just_ the second
`div` element because if you use `.box` or `.orange`, you always get others. To
solve this, you can specify a selector that is a combination of the two classes
like this.

| Selector         | What gets selected          |
|------------------|-----------------------------|
| `.box.yellow`    | The first `div` element     |
| `.box.orange`    | The middle `div` element    |
| `.circle.orange` | Only the last `div` element |

Notice that there is _no space_ between each of the `.class` portions of the
compound selectors. If you did put a space in there, then that's something
called a _descendant selector_ which you will learn about later in this article.


## One rule, many selectors

What if we wanted to italicize all H1 and H2 elements in the document? We can
conveniently apply the same styles to multiple elements by combining selectors,
separated by a comma. Here is how we would italicize all H1s and H2s:

```css
h1,
h2 {
  font-style: italic;
}
```

Now, what if we wanted to italicize only H1s with the ID "heading" and H2s with
the class name "subheading". We could combine tag selectors with ID or class
selectors by writing the tag name immediately followed by the ID or class
selector. Again, we can apply the same styles to multiple elements by comma
separating the selectors.

```css
h1#heading,
h2.subheading {
  font-style: italic;
}
```

## Combinators

Combinators are a type of CSS selector that _combine_ other selectors into more
complex or targeted selectors. There aren't that many, and they're very
powerful. Please note, though, that using a lot of them in your CSS can quickly
grow the complexity of your CSS such that it becomes incomprehensible and
unmaintainable. Please, use them with moderation.

### Descendant selectors

The descendant selector is represented by two selectors with just white space
in between them (syntax: A(spaces, tabs, line breaks)B). This will select any
element (B) that is a descendant of the first element (A).

Let’s look at an example. We want to style all ABBR elements contained in P
elements so that all the content of the ABBR is uppercase.

We can use the following CSS to achieve the above specs:

```css
p abbr {
  text-transform: uppercase;
}
```

What happens when this style is applied to the following example HTML?

```html
. . .
  <body>
    <p>
      <span>Acronyms:</span>
      <abbr title="HyperText Markup Language">html</abbr>
      <abbr title="Cascading Style Sheets">css</abbr>
    </p>
    <span>More Acronyms:
      <abbr title="National Aeronautics and Space Administration">nasa</abbr>
      <abbr title="Unidentified Flying Object">ufo</abbr>
    </span>
    <p>
      <span>Even More Acronyms:</span>
      <ul>
        <li><abbr title="Graphics Interchange Format">gif</li></abbr>
        <li><abbr title="Technology, Entertainment, Design">ted</li></abbr>
      </ul>
    </p>
  </body>
. . .
```

Given the HTML and CSS above, the uppercase style would be applied to the ABBR
elements containing "html", "css", "gif" and "ted" because they are all
descendants of a P element. The ABBR elements containing "nasa" and "ufo" are
not descendants of a P element and would remain lowercase.

Because the descendant selector just looks at white space between the
different selectors, the following two will work just as well in your browser.
However, _don't do this_! This is bad and unmaintainable code.

```css
/* UNMAINTAINABLE CODE. DO NOT DO THIS. EXAMPLE ONLY. */
p                            abbr {
  text-transform: uppercase;
}

/* UNMAINTAINABLE CODE. DO NOT DO THIS. EXAMPLE ONLY. */
p


             abbr {
  text-transform: uppercase;
}
```

### Direct child selector

The `>` selector selects nodes that are direct children of the first element
(syntax: A > B). It will match every element B that is immediately nested inside
an element A. This is different than the descendant selector because it selects
_only_ the **direct children** of an element.

Let’s look at an example. We want to style all **elements with the "is-active"
class that are direct children of elements with the "menu" class** to have a #FFE0B2 background color.

We can use the following CSS to achieve the above specs:

```css
.menu > .is-active {
  background-color: #ffe0b2;
}
```

What happens when this style is applied to the following example HTML?

```html
. . .
<body>
  <div class="menu">
    <div class="is-active">
      Belka
    </div>
    <div>
      <div class="is-active">
        Strelka
      </div>
    </div>
  </div>

  <div class="is-active">
    Laika
  </div>
</body>
. . .
```

Given the HTML and CSS above, the background color would be applied to just one
DIV -- the DIV containing "Belka" -- because it's the only DIV with the
"is-active" class that is a direct child of the DIV with the "menu" class.

### Adjacent sibling selectors

The `+` selector selects adjacent siblings (syntax: A + B). This means that the
second element (B) directly follows the first (A), and both share the same
parent.

Let’s look at an example. We want to style all **H2 elements immediately
preceded by H1 elements** to be italic. The style should be applied to H2s only
(not H1s). We can use the following CSS to achieve the above specs:

```css
h1 + h2 {
  font-style: italic;
}
```

If you had that in some CSS applied to the following HTML, the content of the
H2 tags tells you what would happen.

```html
<h1>Big header</h1>
<h2>This one is styled because it is directly adjacent to the H1</h2>
<h2>This one is NOT styled because there is no H1 right before it</h2>
```

## Pseudo-classes

A [pseudo-class][3] specifies a special state of the selected element(s) and
does not refer to any elements or attributes contained in the DOM (hence,
_pseudo_). A pseudo-class is formed by a selector followed by a colon followed
by the pseudo-class name (syntax: A:B).

Let’s look at an example. We want to style all **anchor tags only when the mouse
is over the content of the anchor tag** to have:

- The font Roboto Condensed
- The text color #4FC3F7
- No underline
- A 2px bottom border (without changing layout) with the color #4FC3F7

We can use the following CSS to achieve the above specs:

```css
a:hover {
  font-family: "Roboto Condensed", sans-serif;
  color: #4fc3f7;
  text-decoration: none;
  border-bottom: 2px solid #4fc3f7;
}
```

Hovering over an element is a _state_ related to a user action and not to
anything in the DOM. In the above CSS, we used the `:hover` pseudo-class
selector to apply styles to `<a>` elements only when a user hovers over them.

Check out the MDN doc on [Pseudo-classes][3] for a full list of pseudo-classes
we can use with CSS selectors. Quite often, you will use the following
pseudo-classes in real-world CSS.

* `active`: applies to elements like buttons when activated by a person, like
   when they "push down" on the button
* `checked`: applies to radio inputs, checkbox inputs, and options in drop
   downs when the user has toggled it into an "on" state
* `disabled`: applies to any disabled element, like a disabled button or input
* `first-child`: applies to the first element among a group of sibling elements
* `focus`: applies to elements that have the current focus, like inputs and
   buttons
* `hover`: applies to elements that currently have the pointing device (cursor)
   directly over it (it is problematic on touchscreens because it may never
   match the element because there is no persistent pointing device)
* `invalid`: applies to any form element in an invalid state due to client-side
   form validation
* `last-child`: applies to the last element among a group of sibling elements
* `not(selector)`: represents elements that do not match the provided selector
* `required`: applies to form elements that are required
* `valid`: applies to any form element in a valid state
* `visited`: applies to anchor tags of which the user has already been to the
   URL that the `href` points to

## Pseudo-selectors

Like pseudo-classes, pseudo-selectors select pseudo elements in the DOM. That's
kind of weird, pseudo elements. The two that you will use most often are the
`::after` and the `::before` pseudo-selectors. Both of them _create_ a
pseudo-element as a child of the element to which the property applies. The
`::after` variation creates the child as the _last_ child of the selected
element. The `::before` variation creates the child as the _first_ child of the
selected element. You can do neat things with that. For example, if you wanted
to put happy faces at the beginning of all paragraphs. Then, you could do
something like this

```html
<style>
  p::before {
    background-color: lightblue;
    border-right: 4px solid violet;
    content: ':-) ';
    margin-right: 4px;
    padding-left: 4px;
  }
</style>
<p>This is the first paragraph</p>
<p>This is the second paragraph</p>
<p>This is the third paragraph</p>
```

and get something [like this]! The browser inserts that text and styles it at
the beginning of each paragraph as the first child of the `p` element!

## Putting it together: CSS rules

A **CSS rule** is the collection of single or compound selectors, a curly brace,
zero or more properties and their settings, and a closed curly brace. You've
been seeing them throughout this course and in this reading. Now you finally
have a name for them, _CSS rules_.

```css
/* A CSS Rule that removes padding and margin from the document  */
/*---------------------------------------------------------------*/
/* The selectors are "html" and "body".                          */
/* The properties are "padding" and "margin", each with value 0. */
html, body {
  padding: 0;
  margin: 0;
}
```

## CSS Rule Specificity

It's quite possible that you will have an element in your HTML that are affected
by more than one rule. For example, say you had the following HTML.

```html
<style>
  .box { width: 50px; height: 50px; border: 1px solid black; }
  .orange { background-color: orange; }
  .yellow { background-color: yellow; border: 1px solid purple; }
</style>
<div class="box yellow"></div>
<div class="box orange"></div>
```

The element `.box.orange` has the following styles:

* a height of 50 pixels set by the `.box` class
* a width of 50 pixels set by the `.box` class
* a background color of orange set by the `.orange` class
* a solid black border one pixel in width set by the `.box` class

Whenever two rules apply, the browser will just combine all of the different
properties and apply them all to the targeted element. This is the _cascade_ in
"Cascading Style Sheets". That can lead to problems.

The element `.box.yellow` has the following styles:

* a height of 50 pixels set by the `.box` class
* a width of 50 pixels set by the `.box` class
* a background color of yellow set by the `.yellow` class

However, both rules specify a border. Which value does the `.box.yellow` element
get? This is where the rules of specificity come into play. By the end of this
section, you will know the answer.

### The four number calculation

The four numbers that the specificity calculation are, in _increasing_ order of
importance

* the number of tag selectors in the selector
* the number of class, pseudo-element, and attribute selectors in the selector
* the number of id selectors in the selector
* is this an inline style

Hopefully, you don't put inline styles in your HTML. So, you can ignore that
last one and focus on the first three.

The algorithm to determine the most specific rule goes like this. When comparing
two selectors

1. If one has a greater number of ids, then it wins. If there is a winner,
    STOP.
2. They must have the same number of ids, so the one with the greater number
    of classes, pseudo-classes, and attributes wins. If there is a winner,
    STOP.
3. They must have the same number of ids and the same number of classes, too.
    The rule with the greatest number of tags wins. If there is a winner, STOP.
4. They have the same number of ids, classes, and tags. The rule that the
    browser _read last_ wins.

Here is a variety of CSS selectors and their three-number scores. Assume that
this is the order in which the browser read them from various CSS files.

| Selector                 | # of ids | # of classes/attributes | # of tags |
|--------------------------|:--------:|:-----------------------:|:---------:|
| `.header`                |    0     |            1            |     0     |
| `.nav .current`          |    0     |            2            |     0     |
| `#main-header`           |    1     |            0            |     0     |
| `#main-header.large.on`  |    1     |            2            |     0     |
| `div.header`             |    0     |            1            |     1     |
| `div#main-header.header` |    1     |            1            |     1     |
| `div`                    |    0     |            0            |     1     |
| `ul > li`                |    0     |            0            |     2     |
| `ul li a.current`        |    0     |            1            |     3     |
| `ul li`                  |    0     |            0            |     2     |
| `ul.nav li a.current`    |    0     |            2            |     3     |
| `ul.nav li a`            |    0     |            1            |     3     |

From that table, here are some comparisons to see which would win.

| Selector 1              | Score | Winner | Score | Selector 2               |
|-------------------------|:-----:|:------:|:-----:|--------------------------|
| `.nav .current`         | 0-2-0 | &lt;-  | 0-0-1 | `div`                    |
| `.header`               | 0-1-0 | -&gt;  | 0-1-1 | `div.header`             |
| `ul > li`               | 0-0-2 | -&gt;  | 0-0-2 | `ul li` (last read)      |
| `#main-header.large.on` | 1-2-0 | &lt;-  | 1-1-1 | `div#main-header.header` |

### Back to the example

Here's that original code.

```html
<style>
  .box { width: 50px; height: 50px; border: 1px solid black; }
  .orange { background-color: orange; }
  .yellow { background-color: yellow; border: 1px solid purple; }
</style>
<div class="box yellow"></div>
<div class="box orange"></div>
```

The `.box` rule has a score of 0-1-0. the `.yellow` rule has a score of 0-1-0,
as well. That means last rule wins, so the element `.box.yellow` will have a
solid _purple_ border one pixel in width.

## What you learned:

* The different types of CSS selectors
* Examples of using class and attribute selectors, and others
* How to select elements via their relationship by using combinators
* How to apply styles based on an element’s state with pseudo-classes
* How to create and select pseudo-elements using `::before` and `::after`
* How to calculate the specificity of CSS rules to determine how they apply
* The definition of a "CSS rule"

[1]: https://developer.mozilla.org/en-US/docs/Glossary/CSS_Selector
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
[like this]: https://codepen.io/aa-academics/pen/dyoqKyY?editors=1100

________________________________________________________________________________
# CSS: Type, Properties And Imports

There are a lot of different properties of HTML elements that you can set with
Cascading Style Sheets (CSS). This article introduces you to the common
properties used to style text and elements on a page. Further lessons will show
you more properties to do even more fancy things.

There is technically a difference between the term "typeface" and "font". You
may have never even heard the word "typeface" before. The difference between
"typeface" and "font" really only interests those people that design type faces
and those people that really like to correct other people about arcane and silly
things. This course will treat the terms interchangeably.

![type blocks](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/properties-type-blocks.jpg)

All of this terminology goes back to the days of the printing press, when they
used printing presses with "type blocks", wood or lead blocks that had the
reversed image of a letter on it. They'd roll ink onto the raised letters and,
then, press them against paper to get the words on the page. This is why it's
called a "printing press", of course!

## Typography

The World Wide Web is primarily a text-based medium. It is important, then, that
you can use the CSS properties that relate to the text that you see on the
screen. When the browser draws the text on the screen for you to read, it uses a
combination of properties to determine how to render that text. That combination
is literally "the font" that will be used for showing you the text.

In this section, you will learn about the following properties that control how
fonts are selected to use so that text gets rendered to the screen.

* `font-family`
* `font-size`
* `font-style`
* `font-weight`

You'll also learn about a couple of properties that affect how the text is drawn
to the screen.

* `text-align`
* `text-decoration`
* `text-transform`

You will also get introduced to the `@import` statement because that's how you
can include other CSS files. It's particularly important because Google offers
a free service that allows you to select different fonts to include in your
Web page to add some _zing!_ to it.

## Font-family

By default, your browser is going to choose a standard (and probably ugly) font
family for your Web page.

When you use the `font-family` property, you are instructing the browser to use
a specific family of type. For example, you may put something like this into
your CSS for your Web page.

```css
font-family: 'Times New Roman';
```

That means that you would like the browser to use the family of fonts named
_Times New Roman_ as part of figuring out what that should mean. The browser
will then supply defaults for the other aspects of the font (size, weight, etc.)
and show the text affected by the rule.

```css
font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
```

That means that it should apply the font named "Helvetica Neue". If that doesn't
exist on the system (because it's not macOS or doesn't have an Adobe product on
it), then try to use "Helvetica". Most Windows computers have "Helvetica". Now,
if the computer doesn't have "Helvetica Neue" nor does it have "Helvetica", then
it should fall back to the default system "sans-serif" font. "What's that," you
ask....

Besides named fonts like "Times New Roman", "Comic Sans", and "Helvetica", the
most recent CSS specification defines eight generic names that you can use that
will rely on each browser and the OS that it's running on. Here is a table that
contains each of those eight names and the example rendering in Chrome on macOS
for that generic name. (You'll note that the "emoji", "math", and "fangsong"
generic names don't do anything.)

![example generic names](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/properties-generic-font-names.png)

A _serif font_ is a font that has [serifs], those little widenings at the ends
of letters.

A _sans-serif font_ is a font that doesn't have serifs. In Latin _sans_ means
without. The original typesetters in Western Europe who invented this lingo were
all learned in Latin, the smarty-pants language of the day.

A _monospace_ font is one where every letter and symbol has the same width.
These are often called "typewriter fonts", too.

The _cursive_ and _fanatasy_ fonts are novelty fonts that don't get a lot of use
due to the widely different looks between browsers and OSes. Speaking of OSes...

### Fonts across the Internet

It's really important for you to know this following nugget: _not all computers
have the same fonts on them_. That means, if you want to use some fancy font
that you have installed on your computer that other people don't have, then the
folks that don't have that font will see the default _serif_ font instead. This
was especially prevalent a long time ago when Windows and Mac OS had very
different installed fonts. It was nearly impossible to make text look consistent
across browsing experiences. In 1998, the CSS Working Group introduced a new
feature of CSS, the `@font-face` directive that would allow a browser to import
fonts from files hosted on the Internet. But, it wasn't until 2008 that Apple
Safari and Mozilla Firefox actually implemented the feature. All of sudden, Web
designers were free to include stylized fonts on their Web pages that _everyone_
could properly see!

In most cases, you won't use `@font-face` yourself. Instead, you'll use one of
the font-hosting services on the Internet or use the ones that your company has
purchased. That's right, purchased! Many fonts are commercial which means you
buy them for specific types of uses, be it for Web or print, commercial or
personal. But, many people use Google Fonts which are free to use. However,
Google tracks the use of each font across the Internet by putting cookies on
people's devices. If you are privacy-oriented, you will _not_ want to subject
your Web application users to that invasion.

But, let's say you don't care! Let's say you want a fancy hand-written looking
font for your Web page. If you go to [Google Fonts] and search for "liu jian mao
cao". When you click on the search result, you will be taken to its page.

![Google Fonts](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/properties-using-google-font.png)

When you click the "+ Select this style" link, it will show you a review panel.
You can click on the "Embed" header and, then, the "@import" link. That's the
information that you want so you can add it to your Web page. At the top of
your CSS file, you need to put the `@import` line from the example.

```css
@import url('https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&display=swap');
```

Now you can use it to change the font family for any element on your page by
following the second part of the embedding instructions. Here's an example of
some text that has the ".liu-jian-mao-cao" class applied to its surrounding
element and the CSS property/value to set it to the font.

```css
.liu-jian-mao-cao {
  font-family: 'Liu Jian Mao Cao', cursive;
}
```

![example imported font](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/properties-custom-font-name.png)

## Font size

Now that you can change the family of the font, the next important aspect to
control is the size of the text begin rendered. You do this with the `font-size`
property in CSS. That's the easy part. The hard part is the _unit of
measurement_ you use with the size. CSS has two kinds of units: absolute and
relative.

In either case, the syntax for using these measurements is `(number)(unit of
measure)`. That means if you wanted something to be one centimeter in your Web
page, you would choose what property you want it to apply to and use the value
"1cm". If you want to set the size of your font to one centimeter, you would use
the property value combination like this:

```css
font-size: 1cm;
```

**Please note** that there is _no space_ between the value (1) and the unit of
measure (cm). Putting a space between the value and the unit of measure will
_cause the property to not get applied_! This is a source of many Web
developers' mistakes. Take care when you type your CSS.

### Absolute units

The absolute units are measured in pixels or inches or centimeters, the latter
two making _no sense_ on a Galaxy Note smartphone. You will see two absolute
units most of the time in CSS out in production, one being far more popular than
the other.

| Unit | Name   | Equivalent to           |
|------|--------|-------------------------|
| pt   | Points | 1pt = 1/72nd of an inch |
| px   | Pixels | 1px = 1/96th of an inch |

Back in the 1990s and early 2000s, the "pt" unit was still used quite a bit. By
the mid-2000s, it had fallen out of favor. Most of the time, you will likely
only see "px" which makes sense because pixels are how the dimensions of your
screen that you're looking at are measured.

### Relative units

You will also see only two relative units most of the time in CSS out in
production.

| Unit | Relative to                             |
|------|-----------------------------------------|
| em   | The font size of the containing element |
| rem  | The font size of the root element       |

#### An example of em

Say you had the following HTML.

```html
<style>
  html {
    font-size: 8px;
  }
  div {
    font-size: 1.5em;
  }
</style>
<div id="outer">
  This is some div text
  <div id="nested">
    This is some nested div text
    <div id="doubly-nested">
      This is doubly nested text
    </div>
  </div>
</div>
```

When that renders, the browser gets to the first `div` (that is, `#outer`) and
says to itself, "Hey! This needs to be `1.5em`, that is, 1.5 times the size of
the font that it would normally be. The browser checks and notices that it would
normally be "8px" tall (as specified by the CSS rule for the `html` element).
Therefore, it calculates that the text for that needs to be `1.5 * 8px = 12px`.
The text "This is some div text" gets drawn at 12 pixels tall.

Then, it gets to `#nested` which is a `div`. The browser says, "Hey! this needs
to be `1.5em`, that is, 1.5 times the size of the font that it would normally
be." Right now, the browser is drawing its text at `12px` from the previous
calculation (it's still in `#outer`), so it calculates a new font size of `1.5 *
12px = 18px`. The text "This is some nested div text" gets drawn 18 pixels tall.

Finally, it gets to the inner-most `div`, `#doubly-nested`. It does the same
calculation as before, multiplying 1.5 by the size that it's currently drawing
text. That's 18 pixels, right now. Thus, the text "This is doubly nested text"
gets drawn at `1.5 * 18px = 27px` tall.

![Example of em sizing](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/properties-em-font-size.png)

#### An example of rem

Say you had the same HTML with one vital difference: the `1.5em` from the
previous example is changed to `1.5rem`.

```html
<style>
  html {
    font-size: 8px;
  }
  div {
    /* Here's the change */
    font-size: 1.5rem;
  }
</style>
<div id="outer">
  This is some div text
  <div id="nested">
    This is some nested div text
    <div id="doubly-nested">
      This is doubly nested text
    </div>
  </div>
</div>
```

Now, every time the browser gets to a `div`, it asks itself, "What is 1.5 times
the root element's font size?" That answer is the same, every time, because the
root element's font size doesn't change. It's just `8px` set right there in the
`html` rule. So, it doesn't matter that the `div` elements are nested; all of
the text just gets drawn at `1.5 * 8px = 12px`.

![Example of rem sizing](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/properties-rem-font-size.png)

## Font style for italics

The `font-style` property is the setting that you'll use if you want to have
some of your text in italics. You will see in a lot of HTML that developers will
use the outdated `i` element or the `em` element, which is meant for _emphasis_.
That matters to screen readers. Here's an example of how to use `font-style`.

```html
<style>.book-title { font-style: italic; }</style>
<p>
  There is a funny movie named <span class="book-title">Frequently Asked
  Questions About Time Travel</span> with some good laughs in it.
</p>
```

## Font weight for bold

The `font-weight` property is the setting that you'll use if you want to have
some of your text in bold. You will see in a lot of HTML that developers will
use the outdated `b` element or the `strong` element, which is meant for
**strong text**, another type of emphasis that matters to screen readers.

You can use keyword values for `font-weight`: `normal` and `bold`.

You can use relative values for `font-weight`: `lighter` and `bolder`.

You can use even hundred numeric values from 100 - 900. The value of 400 is
equivalent to `normal` and the value of 700 is equivalent to `bold`.

Here's an example of how to use `font-weight`.

```html
<style>
  .bold { font-weight: bold; }
  .also-bold { font-weight: 700; }
</style>
<p class="bold">This looks bold.</p>
<p class="also-bold">This looks bold.</p>
```

## Aligning your text

There are four ways that you can align your text in an element. If you've ever
used a word processor like [LibreOffice Writer] or Google Docs, then you
probably have used the "left", "center", and "right" alignments available to you
in those programs. You just set them on the element that you want to affect the
layout of the text.

In the following table, all of the `th` and `td` elements have `text-align:
center` set on them.

![example generic names](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/properties-generic-font-names.png)

There's one more, "justify", that makes the words align to the left and right
like you see in some books by adjusting the spaces between the words. The
inconsistent spacing between words created by justified text can be problematic
for people with cognitive concerns such as Dyslexia. The Web Content
Accessibility Guidelines expressly forbid this setting.

## Decorating your text

With the `text-decoration` property, you can put lines above, through, and under
text. The lines can be solid, dashed, or wavy! By default, links on a Web page
have an underline. That underline comes from this property.

```css
/* Default browser setting */
a {
  text-decoration: underline currentcolor;
}
```

Now that you know about it, you could change it, if you want. Read the short
[reference for `text-decoration`] on MDN.

## Casing your text

Sometimes you want some text to be all upper case, lower case, or title case
(that is, with all words capitalized). You can use `text-transform` to do this.

```html
<style>
  .loud { text-transform: uppercase; }
  .soft { text-transform: lowercase; }
  .title { text-transform: capitalize; }
</style>
<p class="loud">THE WIND blows across the sea.</p>
<p class="soft">THE WIND blows across the sea.</p>
<p class="title">THE WIND blows across the sea.</p>
```

![text transform](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/properties-text-transform.png)

You can see that the "uppercase" setting forces all text to be capital letters,
the "lowercase" setting forces all text to be lowercase letters, and the
"capitalize" setting forces the first letter of every word to be capitalized but
leaves the rest alone.

## Background images

One of the fanciest things you can do is set the background image for an
element. The reason that you'd do this rather than including an `img` element in
your page is that you can "clip" the image however you want.

To specify a background image for an element, you set the `background-image`
property to a URL using the CSS `url()` function.

Then, to set the size of the background image so that it "best" covers the
element, you set the `background-size` property to "cover". To put that
together, if you want to see the App Academy logo on a page in a 100 pixel by
100 pixel `div` with an id of "aa-logo", then you would write the following CSS
to do that.

```css
#aa-logo {
  background-color: white;
  background-image: url(https://appacademy.github.io/styleguide/assets/logo/logo-emblem-black-1000.png);
  background-size: cover;
  height: 100px;
  width: 100px;
}
```

Here's the [Background Image of an Element] CodePen for you to play around with
that shows the above CSS. Try changing the width and height of the `#aa-logo` to
see how the "cover" setting behaves with the square App Academy Logo image.

## What you've learned

These are the fundamentals of making readable Web pages! Wow, that's some great
information. With all of that, you can now speak and act confidently about type
faces, sizes, styles, and weights. You know some of the generic names that
browsers support for font families. You can also adjust the alignment of the
text on your Web pages, as well as affect that its capitalization through
transformation. You also learned about how to use Web fonts through the use of
the `@import` statement from a hosting facility like Google Fonts. Finally, you
learned about four kinds of measures for fonts in this: "pt", "px", "em", and
"rem".


[Google Fonts]: https://fonts.google.com
[LibreOffice Writer]: https://www.libreoffice.org/discover/writer/
[serifs]: https://en.wikipedia.org/wiki/Serif
[Background Image of an Element]: https://codepen.io/aa-academics/pen/rNVZJeb?editors=1100
[reference for `text-decoration`]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration

________________________________________________________________________________
# CSS: Colors, Borders, and Shadows

A Web page that just has black text on a white background is pretty boring. It
makes sense that some of the earliest features that allowed you to customize
the style of a Web page had to do with colors. Once those were firmly in place,
borders, shadows, and transparency came along pretty quickly. In this article,
you'll learn about how to affect these.

## Colors

In CSS you can specify colors in more than one way. This section shows you how
to do the three most popular ways: by their name, by their hexadecimal RGB
value, and by their decimal RGB value.

### Specifying by name

The least powerful way is to specify a specific [name of a color]. That link
takes you to a table that shows you the colors and the breakdown of each into
the values that you can use with the other ways to specify colors. Here's an
image that shows them all to you, too.

![list of X11 colors](https://upload.wikimedia.org/wikipedia/commons/2/2b/SVG_Recognized_color_keyword_names.svg)

### Specifying by RGB

In color theory, there is the idea of a color wheel. The colors red, green, and
blue comprise three pigments from which other colors can be made by mixing
together different values of red, green, and blue. In the following color wheel,
you can see that using red, blue, and green as the primary colors, then magenta,
yellow, and cyan are the secondary colors, and rose, violet, azure, spring
green, chartreuse green, and orange are tertiary colors.

![RGB color wheel](https://upload.wikimedia.org/wikipedia/commons/a/ab/RBG_color_wheel.svg)

The way that we specify the levels of each of those three colors, red, blue, and
green, are by using the values between 0 and 255 where 0 means _none_ and 255
means _as much as possible_. The following table shows some values for common
colors using the mixture of the three colors. Each column has the decimal value
and its two-digit hexadecimal representation.

| Red value  | Green value | Blue value | Result      |
|------------|-------------|------------|-------------|
| 255   (FF) | 0     (00)  | 0     (00) | Red         |
| 0     (00) | 255   (FF)  | 0     (00) | Green       |
| 0     (00) | 0     (00)  | 255   (FF) | Blue        |
| 255   (FF) | 0     (00)  | 255   (FF) | Magenta     |
| 0     (00) | 255   (FF)  | 255   (FF) | Yellow      |
| 0     (00) | 0     (00)  | 0     (00) | Black       |
| 255   (FF) | 255   (FF)  | 255   (FF) | White       |
| 190   (BE) | 190   (BE)  | 190   (BE) | Gray        |
| 148   (94) | 0     (00)  | 211   (D3) | Dark Violet |

To use these numbers in CSS, you can use these decimal variations with the
`rgb()` function. Or, you can convert them all to hexadecimals, concatenate them
together, and use that. For historical reasons, that is the most popular way,
even though it seems silly.

To specify the color dark violet, you could supply the three decimal color
values like this `rgb(148, 0, 211)` or the concatenated, two-digit hexadecimal
numbers like this, preceded by a hash symbol like this `#9400D3`.

### The alpha channel

You can change the transparency of a color by specifying its _alpha channel_
value. Presently, you can only do this with the `rgba()` function which is just
like the `rgb()` function, but takes a fourth parameter, the alpha channel
value. That value is between 0.0 and 1.0, inclusive. If you specify 0.0, that is
a totally transparent color. If you specify 1.0, that is a totally solid color.
If you specify 0.5, that is a half-transparent color.

## Applying colors

The first two ways that you can apply colors are to _text_ and to the
_background_ of elements. The associated CSS properties for each of those are in
the following table.

| To affect the...               | use the property... |
|--------------------------------|---------------------|
| color of text                  | `color`             |
| background color of an element | `background-color`  |

I know. Why isn't it named "text-color"? «shrug» It sure would be more
consistent. But, that's what is there.

So, to make unreadable text, you might use

```css
/* Try to decode the colors from */
/* the color table above         */
body {
  background-color: rgb(255, 0, 0);
  color: #00FFFF;
}
```

especially if you were a purveyor of substandard hamburgers.

![McDonald's Web 1990s Web site](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/properties-colors-mcdonalds.jpg)

## Borders

To specify a border for an element, you use the `border` property and three
values separated by spaces:

1. The width of the border line (using length units of measurement like `px`)
2. The style of the line, being one of:
   * solid - used almost all of the time
   * dotted - used some times
   * dashed - infrequently used
   * double - infrequently used
   * groove - infrequently used
   * ridge - infrequently used
   * inset - infrequently used
   * outset - infrequently used
3. The color of the border using one of the methods previously discussed

So, to specify a border around an HTML element that is 4px thick, solid, and
green, you would write

```css
.highlighted {
  border: 4px solid green;
}

/* or */
.highlighted {
  border: 4px solid rgb(0, 255, 0);
}

/* or */
.highlighted {
  border: 4px solid #00FF00;
}
```

You also target specific borders of an element by appending a dash and the
location of the border: top, right, bottom, or left. For example, a common way
to make text look underlined is to use

```css
.underlined {
  border-bottom: 1px solid black;
}
```

## Shadows

There are two kinds of shadows in CSS, _box shadows_ and _text shadows_. The
box shadows apply to HTML elements. Text shadows apply to text.

To specify box shadows, you use the `box-shadow` property and specify one of the
following:

* The word "none" if you want no shadow
* Two lengths and a color
* Three lengths and a color
* Four lengths and a color

The first two lengths are the horizontal and vertical offsets of the shadow.

The third length, if provided, is the blur radius of the shadow. The bigger this
number, the bigger the blur, so the bigger the shadow.

The fourth length, if provided, is the spread radius. Positive values make the
shadow expand. Negative values make it shrink.

The color is usually some transparent value of black, like `rgba(0, 0, 0, 0.4)`.

Open up this CodePen that shows you an interactive example of [different
applications of the box-shadow property]. You can play around with the values to
see how they affect the different shadows.

Text shadows work similarly, but the format is more lenient. You can specify the
text shadow using:

* A color, the horizontal offset, and the vertical offset
* A color, the horizontal offset, the vertical offset, and the blur radius
* The horizontal offset, the vertical offset, and a color
* The horizontal offset, the vertical offset, the blur radius, and a color

That applies shadows to text.

## Opacity

You saw that you can affect the transparency of a color by using its alpha
channel. You can do the same thing with entire elements, causing them to be
see-through using the `opacity` property. Just like the alpha channel, it takes
a value from 0.0 to 1.0, inclusive, with 0.0 totally transparent and 1.0 being
completely opaque (solid).

Open up this CodePen that shows you [different applications of the opacity
property]. You can play around with the different values of the `opacity`
property to see how it affects the element.

## What you've learned

In this article you learned all about colors, opacity, borders, and shadows.
You should now be able to style content on an HTML page using colors as names,
hexadecimal RGB values, decimal RGB values, and decimal RGB values with an
alpha channel. You can use those colors, then, to customize borders and shadows.
Finally, you learned how to affect the entire transparency of an element using
its `opacity` property.

[name of a color]: https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart
[different applications of the box-shadow property]: https://codepen.io/aa-academics/pen/GRJXjdZ?editors=0100
[different applications of the opacity property]: https://codepen.io/aa-academics/pen/zYGJKMe?editors=0100

________________________________________________________________________________
# Project: Modernize Craigslist With CSS Attributes

Craigslist is a notoriously under-designed and also very successful website. Its
table-like design, gray panels, and royal blue hyperlinks hearken back to the
early days of the Internet. It might be a blast from the past, but with a few
simple style tweaks we can bring Craigslist into the modern world.

In this project, you will use CSS attributes to update the styles on an example
Craigslist homepage. Use what you’ve learned about HTML attributes and CSS
selectors to apply styles to various DOM elements.

**Note:** In some of the instructions, you will be given the name of a CSS
property that you are to use. You can use the [MDN CSS Reference] to help you
figure out how to use those properties. Once a property has been introduced to
you, following instructions that use it will not refer to the property, again.

To start, clone the repository at
https://github.com/appacademy-starters/css-modernize-craigslist-starter.

## Project overview

The objective of this project is to re-skin the Craigslist homepage to use a
more modern design aesthetic. Visit [craigslist.org][1] to see the most current
version of the site. The following two screenshots show Craigslist’s current
homepage and an updated homepage, respectively.

**Current Craigslist homepage:**

![Craigslist screen shot](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/craigslist-homepage-example.png)

**A more modern Craigslist homepage:**

![Updated Craigslist page](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/craigslist-homepage-updated.png)

We have set up a project folder called _**attributes-project**_ for you to use.
The _**attributes-project.html**_ file contains all the HTML for the example
Craigslist homepage. Write all of your CSS for the page in
_**attributes-project.css**_, which is linked in the HTML file.

## Phase 1: Add initial page styles

Your Craigslist page should be bare-bones HTML at this point. Add the following
initial styles to the page in your _**attributes-project.css**_ file to make it
look better:

Use the **universal selector** to make all elements:

- Use the font "Helvetica Neue", "Helvetica", sans-serif
- Have a background color of Whitesmoke (#F5F5F5)
- Have a text color of Charcoal Gray (#464646)

Use **tag selectors** to:

- Remove the underline text decoration on all anchor tags by using the
  `text-decoration` property
- Give all UL elements 0 padding using the `padding` property

Use a **child combinator selector** to:

- Remove the bullet points on all LI elements that are direct children of UL
  elements using the `list-style` property

## Phase 2: Style hovered-on and visited links

Use **pseudo-classes** on all A links and SPANs that are direct children of A
links to:

- Style links that are hovered on and visited to have the Craigslist purple
  color #800080
- Style links that are hovered on to have a font weight of bold

## Phase 3: Style the main page sections

There are three main sections in the body of the page, represented by the HTML
elements with these IDs: "leftbar", "center" and "rightbar". Style their
container, represented by the element with the class name of "page-container",
as well as the three main sections, according to the specs below.

Use a **class selector** to select the element with the class "page-container"
and:

- Give the container a maximum width of 1200 pixels using the `max-width` property

Use **ID selectors** to style the elements with the IDs "leftbar", "center", and
"rightbar" so that:

- They are all floated left using the `float` property
- They all have top/bottom padding of zero and left/right padding of 30 pixels
  using the `padding` property
- They all have a box sizing of _border box_ using the `box-sizing` property

Use a **tag selector** on the FOOTER element to:

- Make the footer clear the float in both directions using the `clear` property

Use **ID selectors** to select the elements with the IDs "leftbar" and
"rightbar" and:

- Give them a width of 25%

Use an **ID selector** to select the element with the ID "center" and:

- Give it a width of 50%
- Give it a solid one pixel border in the color #464646
- Give it a border radius of ten pixels using the `border-radius` property

Use a **child combinator selector** to style all DIVs that are direct children
of the element with the "center" ID:

- Float them to the left
- Give each of them a width of 33%

Use a **descendant combinator selector** to style the H2 that is a descendant of
the element with the "topban" ID:

- Align the text of the H2 to the center

## Phase 4: Style the footer list

Use a **tag+class selector** to style the UL element with the class name
"clfooter" and:

- Align the text of the UL to the center
- Give it a top border only that is one pixel solid gray
- Give it top/bottom padding of ten pixels and left/right padding of zero pixels

Use a **child combinator selector** to style all LI elements that are direct
children of the UL with the class name "clfooter" and:

- Display all LIs as inline elements using the `display` property
- Give all LIs in the `ul.clfooter` 5px padding on the right side

## Phase 5: Add pseudo-elements

The Craigslist logo is a purple peace sign, which also happens to be a common
emoji these days. What else screams 2010s and beyond better than emojis? So,
let’s add some to the Craigslist homepage!

**Peace Symbol Emoji:**

![Peace emoji](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/attributes/assets/peace-symbol-emoji.png)

Create **pseudo-elements** to add the purple peace sign emoji before every H4
element with the class name "ban" using the `::before` [pseudo-element][2].

**Hint**: While pseudo-classes let you style elements based on their state,
[pseudo-elements][2] let you style specific parts of the selected element. The
[::before][3] pseudo-element will create a pseudo-element that is the first
child of the selected element. This pseudo-element will not introduce a new
element into the DOM (hence, pseudo).

**macOS Pro-Tip**: You can use `Control+Command+Spacebar` on a Mac to pull up
the emoji keyboard. Search for the purple peace sign emoji.

## Bonus: style the calendar

Right now, the calendar is looking a little peaked.

* Use the `border-collapse` property to introduce the border back in. Set the
  border on each TD to be a solid 1px with color #333.
* Change all the colors of the text of the links to green.
* Make all of the link texts bold.
* Center-align the content of all the TDs in the calendar.
* Change the color of the text of the days in the calendar that are not links to
  a half-transparent black.
* Use the `cursor` property to indicate that a day without a link is not
  clickable. You'll have to analyze the HTML to figure out how to do that. You
  cannot use CSS selectors to select an element and, then, apply a style to a
  parent element. So, you'll need to figure out a way to select those table data
  elements.
* Highlight the day indicated as "today" (look at the HTML) by setting its
  background color to dark violet and its text color to white.
* When the pointer (cursor) is over one of the table data cells that contains
  the numbers, have the table cell's background color turn lavender.

## Bonus: use more pseudo-classes

In this project, you used pseudo-classes to style elements based on their hover
and visited states. Can you use more pseudo-classes? Use **three more
pseudo-classes** to style elements on the page.

Check out the MDN doc on [pseudo-classes][4] for a full list. Some good ones to
use: `:focus`, `:first-child`, `:last-child`, `:nth-child`

## When you're done

Call in an instructor to have them look at it. Well done!

[1]: https://craigslist.org/
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/::before
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
[5]:
  https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
[MDN CSS Reference]: https://developer.mozilla.org/en-US/docs/Web/CSS

________________________________________________________________________________
# WEEK-09 DAY-3<br>*AJAX* {ignore=true}
________________________________________________________________________________
# AJAX Learning Objectives

**The objective of this lesson** is for you to know how AJAX works. This lesson
is relevant because AJAX is a foundational component of how modern web
applications work.

When you are done, you should be able to do the following.

* Explain what an AJAX request is
* Identifying the advantages of using an AJAX request.
* Identify what the acronym AJAX means and how it relates to modern Web
  programming
* Describe the different steps in an AJAX request/response cycle
* Fully use the `fetch` API to make dynamic Web pages without refreshing the
  page lesson
is relevant because AJAX is a foundational component of how modern web
applications work.

When you are done, you should be able to do the following.

* Explain what an AJAX request is
* Identifying the advantages of using an AJAX request.
* Identify what the acronym AJAX means and how it relates to modern Web
  programming
* Describe the different steps in an AJAX request/response cycle
* Fully use the `fetch` API to make dynamic Web pages without refreshing the
  page

________________________________________________________________________________
# AJAX: Paving the Road to the Modern Web

In this lesson, you'll learn about AJAX (Asynchronous JavaScript and XML), which
is a set of technologies that allow for efficient client (web browser) and
server interaction. You'll first learn about the pre-AJAX approach that required
full page reloads whenever the client and server interacted. Then, you'll get an
overview of how AJAX works to make the client-server interaction much more
efficient.

## Classic Full Page Reloads

In the early days of the Web, most websites were fairly simple. When you land on
a website, the web browser would make requests to a server, and the server would
send back an entire HTML page for the browser to load:

![intro](https://assets.aaonline.io/Module-Web/ajax/pre-ajax.svg)

This made sense for simple features. For example, let's say you were on a
website like Goodreads and wanted to create a new book:

![Goodreads New Book Form](https://assets.aaonline.io/Module-Web/ajax/book-form.png)

Once you submit this form, the server will add a new record to the database, and
then redirect you to the page for that newly-created book:

![New Book Show Page](https://assets.aaonline.io/Module-Web/ajax/book-show.png)

When you arrive on that page, you get an entirely new HTML page from the server,
and your browser loads it up.

Back in the early days of the Web, this kind of flow sufficed. However, as
websites progressively got more interactive, this approach became inefficient
and insufficient. For example, let's imagine that you're on that book's show
page above, and all you wanted to do was hit the `Want to Read` button. Using
the old approach, here's what would happen:

1. You submit a request to the server to mark that specific book as "Want
   To Read".
2. The server would make the necessary changes to the database.
3. The server prepares the entire HTML page for this book, except this time it
   would render 'Want To Read' under the book image in that HTML document so
   that the user can see the updated status of the book.
4. Finally, your browser would load up the entire newly-received HTML document
   just to show the change in status:

![Book with 'Want To Read' Status](https://assets.aaonline.io/Module-Web/ajax/book-updated.png)

## AJAX at a high level

You'll get a more in-depth explanation of how AJAX works in the next reading,
but at a high level, AJAX is a group of different technologies that work
together to allow a website to communicate with a server in the background
without requiring the website to reload in order to display new changes.

Specifically, the key difference with AJAX is that when a change happens, the
server is no longer responsible for updating the HTML and then sending the
entire HTML document back. Instead, the server would send back data about the
change, either in an XML or JSON format, and the website could then process that
data and update the DOM accordingly.

## Asynchronous JavaScript and XML

Let's use our Goodreads "Want to Read" example to break down the AJAX acronym.

### Asynchronous

Using AJAX, when the user hits the "Want to Read" button, the updates would now
happen asynchronously. In other words, the browser would interact with the
server in the background without blocking any other events from happening on the
web page.

### JavaScript

JavaScript is the engine behind AJAX. When the user hits the "Want to Read"
button, JavaScript is used to make the request to the server. When the data
comes back from the server, JavaScript can also then be used to make the
necessary updates to the DOM. In the next reading, we'll go more in-depth into
the specifics of how JavaScript is used.

### XML

The XML portion of this acronym is outdated. In the early days of AJAX, after
successfully updating the book's status to "Want To Read", the server would send
back data in XML format, like so:

```xml

  <?xml version="1.0" encoding="UTF-8"?>
  <book>
    <id>29633913</id>
    <status>Want To Read</status>
  </book>

```

Nowadays, XML has been largely replaced by JSON, and in this course, you will
almost always be dealing with a JSON response from a server that might look like
this:

```json
{
  "book": {
    "id": 29633913,
    "status": "Want to Read"
  }
}
```

## Notes on AJAX

As you can see, using AJAX requires a bit more complexity than the old
client-server approach. The payoff is an improved user experience: updating just
part of the page is almost always quicker than reloading the entire page.

Additionally, AJAX allows you to keep the user in their current context. For
example, the user doesn't lose their current position on the page since there's
no longer a full page reload.

Over time, JavaScript libraries have emerged that made using AJAX easier (i.e.
jQuery, client side templating libraries, etc.) Eventually, AJAX led to the
development of Single Page Applications, websites that have one and only one
HTML page. You'll learn much more about Single Page Applications once you get to
the React portion of this curriculum!

## What you've learned

So far, you've mainly looked at AJAX from a high level, but at this point, you
should have a clear understanding of:

- what AJAX is and the advantages of using AJAX
- what each letter of AJAX stands for and why

In the next lesson, we'll do a deeper dive into each step of AJAX.

________________________________________________________________________________
# AJAX Steps

In the previous reading, you learned about what the purpose behind AJAX and what
AJAX meant.

In this reading, you'll walk through the specific steps of AJAX using the
example from the previous reading.

Specifically, we'll walk through each step of the Goodreads example using this
diagram:

![ajax steps](https://assets.aaonline.io/Module-Web/ajax/ajax.svg)

## Quick overview of the Fetch API

As you go through the AJAX example, you'll use an API that you've used in the
past: the Fetch API.

At a high level, Fetch is used to make HTTP requests. It uses Promises to handle
the asynchronous nature of HTTP requests and responses.

To learn more about Fetch, let's walk through a series of examples using
`https://jservice.xyz/`, which is a publicly available API that allows users to
create, update, or delete Jeopardy-related resources (ie. games, categories, or
clues).

Since the Fetch API is provided by almost all major browsers, feel free to open
up a console in Chrome or Firefox and follow along.

### GET request

Let's start with a GET request. As a refresher, GET requests are used to
retrieve information from the server. Here's what a GET request might look like
using the Fetch API:

```js
fetch("https://jservice.xyz/api/games")
  .then(function(res) {
    console.log("response: ", res);
    return res.json();
  })
  .then(function(data) {
    console.log("data:", data);
  });
```

In the code example above, the following happens:

1. `fetch`'s first argument is the URL that you want to make a request to. The
   second argument is an optional `options` object that is not necessary for
   now, but will be used in a later example.
2. Invoking `fetch` returns a Promise that resolves with a [Fetch Response
   object]. This Response object represents the entire HTTP response, and it
   holds crucial information like `status` and `url`.
3. In the first callback, the body of the response is a [ReadableStream]. We
   won't get into the details of data streams here, but for now just know that
   the `.json()` method takes that stream and, according to the MDN docs on the
   [.json()] method, _"It returns a promise that resolves with the result of
   parsing the body text as JSON."_ The `.json()` method is the equivalent of
   using `JSON.parse()` except that it works on a [ReadableStream] instead of
   just a string.
4. In the second callback, you can now access the data found in the body of the
   response. In this case, a GET request to `https://jservice.xyz/api/games`
   returns a list of Jeopardy games stored in an object that looks like this:

    ```javascript
    {
      games: [
        {
          id: 1,
          episodeId: 4596,
          aired: "2004-09-06",
          canon: true
        },
        // More games here
      ]
    }
    ```

### POST request

Next, let's walk through a POST request. As a reminder, POST requests are used
to create data on the server.

```js
fetch("https://jservice.xyz/api/categories", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "ACTORS & THEIR FILMS"
  })
})
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data);
  });
```

If you're following along, you probably just got an error response here with a
message notifying you that the `category already exists`. Go ahead and update
that `title` to be something different until you are able to create a unique
category.

Now that it's a POST request, a second `options` argument is passed in to
configure this HTTP request. In this example, you specify the request as a POST
request, notify the server that you will be sending data in a JSON format, and
then also pass along the data in the body.

When the POST request succeeds, the server responds with data about your newly
created category.

### Error handling

At this point, something might seem a little off to you. Specifically, in the
previous example, the server responded with an error, yet the Promise resolved
instead of being rejected.

Since the example did not have a `catch` block to handle errors, you may have
expected some sort of `Uncaught (in promise)` error.

It turns out that the Fetch API will not reject on HTTP error status codes
(between 400 and 600). It only rejects on errors like network failures. Try
turning off your WiFi and then executing that code snippet if you want to
confirm this.

Instead, Fetch requires you to check the `ok` key inside of the Response object,
and if that key is set to `false`, then you can then properly handle the error.
The `ok` property is set to `true` if the `status` code is in the 200s range.

```js
fetch("https://jservice.xyz/api/categories", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "ACTORS & THEIR FILMS"
  })
})
  .then(function(res) {
    console.log(res);
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });
```

Now, if the server responds with an error, the code throws an error that will be
handled by the `catch` block. This `catch` block will also handle any errors
that result from network failures.

## AJAX broken down

Now that you've gone over how the Fetch API works, let's begin walking through
the AJAX example!

Recall that in the previous example, all you wanted to do was allow the user to
click the "Want To Read" button without requiring an entire page reload. Before
AJAX, this was not possible because when the user clicked the "Want To Read"
button, an HTTP request would be sent to the server to mark that book as "Want
To Read", and then the server would send back an entire HTML document (with the
book marked as "Want To Read") for the browser to load up.

Now, however, we can allow for that HTTP request to happen asynchronously and
then update the DOM when the server returns a response about whether or not that
HTTP request was successful.

Let's go step by step into how this works!

### Event listener and Fetch

The "Want to Read" button has a `click` event handler. This handler would then
interact with a browser API for making asynchronous call to the server.

The code for this might look like:

```html
<button class="want-to-read">Want to Read</button>

<script>
  document.querySelector(".want-to-read").addEventListener("click", function() {
    fetch(`https://api.goodreads.com/books/${BOOK_ID}/update-status`, {
      method: "PATCH", // PATCH since we'll just be modifying the book's status
      body: JSON.stringify({
        status: "Want to Read"
      })
    });
    // HANDLING THE SERVER RESPONSE WILL GO HERE AND WILL BE COVERED
    // IN A LATER STEP.
  });
</script>
```

In the diagram, this is the step where the user interface makes a "javascript
call" to the "AJAX engine":

![ajax-js-call](https://assets.aaonline.io/Module-Web/ajax/ajax-js-call.png)

To be clear, there is no actual formal "AJAX engine" that lives in the browser.
Rather, in this example, the "AJAX engine" is really just the JavaScript code
(ie. the click event handler, invocations of the Fetch API, and any sort of DOM
manipulation).

### PATCH request is made to web server

During this step, the PATCH request is made asynchronously to the server:

![ajax-patch-request](https://assets.aaonline.io/Module-Web/ajax/ajax-patch-request.png)

At this step, the JavaScript code (in this case the `click` event handler) calls
the Fetch API and delegates all of the logic of making the PATCH request to the
Fetch API. Meanwhile, the rest of the JavaScript can continue working without
being blocked. For example, if there was another click handler for another
element on the page, it **does not** have to wait for this "Want To Read" status
update PATCH request to be finished.

If you need a refresher on how JavaScript works asynchronously, please refer
back to the previous lesson on asynchronous JavaScript from earlier in the
course.

The PATCH request is then made to the server, and the server updates the status
of that specific book.

### Server sends back a response

Once the server is done updating the status of the book, it sends a response
back to the client:

![ajax-server-response](https://assets.aaonline.io/Module-Web/ajax/ajax-server-response.png)

As the previous reading mentioned, when AJAX was first introduced, the data was
often sent back in the XML format (hence the XML in ajaX). Nowadays, JSON is the
most common format for server responses due to its smaller payload size,
readability, and ease in interacting with JavaScript.

Here's an example of what that JSON response might look like:

```json
{
  "book": {
    "id": 29633913,
    "status": "Want to Read"
  }
}
```

### Fetch API receives the response and resolves the promise

Once the response is received, your JavaScript code can properly handle the
response:

```html
<button class="want-to-read">Want to Read</button>

<script>
  document.querySelector(".want-to-read").addEventListener("click", function() {
    fetch(`https://api.goodreads.com/books/${BOOK_ID}/update-status`, {
      method: "PATCH", // using PATCH since we'll just be modifying the book's status
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "Want to Read"
      })
    })
      .then(function(res) {
        if (!res.ok) {
          throw Error(res.statusText); // handle any potential server errors
        }
        return res.json(); // extract JSON from the response
      })
      .then(function(data) {
        // handle the response data here
      })
      .catch(function(error) {
        // handle errors here
      });
  });
</script>
```

### Response is handled and DOM is updated

You're now in the last step of the AJAX flow:

![ajax-dom-update](https://assets.aaonline.io/Module-Web/ajax/ajax-dom-update.png)

In this step, you can update the DOM based on the data that was returned:

```html
<button class="want-to-read">Want to Read</button>

<script>
  document.querySelector(".want-to-read").addEventListener("click", function() {
    fetch(`https://api.goodreads.com/books/${BOOK_ID}/update-status`, {
      method: "PATCH", // using PATCH since we'll just be modifying the book's status
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "Want to Read"
      })
    })
      .then(function(res) {
        if (!res.ok) {
          throw Error(res.statusText); // handle any potential server errors
        }
        return res.json(); // extract JSON from the response
      })
      .then(function(data) {
        document.querySelector(".want-to-read").innerHTML = "✓ Want To Read";
      })
      .catch(function(error) {
        const errorMessage = document.createElement("p");
        errorMessage.appendChild(
          document.createTextNode("Something went wrong. Please try again!")
        );

        // This example appends an error message to the body for simplicity's sake.
        // Please do not copy this kind of DOM manipulation in your own projects:
        document.querySelector("body").appendChild(errorMessage);
      });
  });
</script>
```

In the example above, since there was a successful response from the server,
then the button is updated to include a check mark to show that the book has
been successfully marked as "Want To Read".

Recall from the section on the Fetch API that even if the server responds with
an error, the response is still resolved. Because of that, it's important to
check whether or not the response was successful in the response's `ok` and/or
`status` code and then handle errors accordingly.

In the `catch` block, we ensure that if an error were to have happened, then the
website would show an error message to the user.

## What you've learned

You've now learned each step of a typical AJAX flow. As a recap, it usually
starts with an event on the client side that triggers an HTTP request to the
server. In this case, we used the Fetch API to asynchronously interact with the
server. When the server sent its response, the Fetch API resolved the promise,
and the DOM was then updated to reflect the updated data.

More importantly, using AJAX, the web page can be updated without requiring a
full page reload.

Now that you've learned about each step of AJAX, it's time to try it out
yourself!

[fetch response object]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[ReadableStream]: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
[.json()]: https://developer.mozilla.org/en-US/docs/Web/API/Body/json

________________________________________________________________________________
# AJAX Project Preparation

Now that you've learned the fundamentals of AJAX, it's time to put that
knowledge into practice by building out a project that uses AJAX.

Since AJAX is comprised of multiple technologies, you'll work with multiple
components across the frontend and backend of a web application in this AJAX
project. Specifically, in this project, you'll work with:

- an Express server
- an HTML document
- JavaScript event handling
- Fetch API

This reading will go over how ths project will work, and then also give a high
level over view of the Express framework.

## Overview

At a high level, here's the flow of how your project will work:

1. The user navigates to your web application's root URL. At this point, the
   browser makes a request to the Express server, and the server responds with
   the HTML document for the web application.
2. Then, when different events happen on the DOM, various JavaScript event
   handlers (that you will implement) will trigger requests to the server using
   the Fetch API.
3. The Express server processes those requests and responds with JSON data.
4. The response data is handled and used to manipulate the DOM.

### Project organization

Your project will be organized like this:

```plaintext
AJAX project
│   index.js
|   package.json
└───public
│   │   events.js
│   │   index.html
│   │   index.css
```

The `index.js` file holds the Express server. You'll learn more about the
Express server in the next section.

The `public` directory holds all of the static assets that the Express will
serve up to the client, including the `index.html` , the `index.css` that styles
the `index.html`, and the `events.js` that loads up all of the event listeners
that listen to events being performed on the various elements in the
`index.html` document.

Next, let's go over how the Express server works!

## Express

Express is a Node.js framework for building web applications.

Let's go over some of the core parts of an Express web server by breaking down
the following example:

```js
const express = require("express");
const faker = require("faker");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/names", (req, res) => {
  const randomName = faker.name.findName();
  res.json({ name: randomName });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

In the first line of the example, we require the `express` dependency so that we
can then start an Express server.

### Middleware

This particular Express server uses two middleware: `bodyParser` and `static`.
You'll learn much more about Express and its middleware in a later lesson, but
for now, all you need to know is that middleware sit between the client and the
server and can process and/or transform the HTTP requests or responses that pass
between them.

`app.use(bodyParser.json())` sets up the `bodyParser` middleware to process data
in HTTP requests into a JSON object that can then be used in the routes.

`app.use(express.static('public'))` sets up the `static` middleware. In this
example, this allows the Express server to serve any static assets that are
located in the `public` directory. Some examples of static assets include
images, html documents, or CSS files.

`app.use(morgan('dev'))` sets up the `morgan` middleware. This will show the
method and the url for any request made to the server in the server terminal.

### Routes

This example Express server has two routes: `/` and `/names`. In setting up those
routes, you have to specify the HTTP verb that the client should use in order to
hit those routes.

In this case a GET request to `/` would invoke the callback function with
`res.sendFile(path.join(__dirname + "/public/index.html"));` in it.

When the user lands on the root path of the website, the client is served with
that `index.html` document.

A GET request to `/names` would invoke the callback function that generates a
random name using the `faker` library and then sends back a JSON response with
that newly generated name.

### Launching the server

In the code example above Express starts listening for network requests on port 3000.

To launch the server, you can run `node [NAME_OF_EXPRESS_SERVER_FILE]`. Let's
assume that the code example above lives in an `index.js` file located a the
root of the directory. To launch the server, you would run `node index.js`.

## What you've learned

In this reading, you got a preview and brief breakdown of the project that
you'll be building. You also got a high level overview of the Express framework.

It's okay if you don't feel like you fully understand everything about Express
yet. You'll be learning much more about Express in the following weeks. For now,
make sure you understand the key points of Express outlined in this reading so
that you're able to confidently interact with the Express server while making
AJAX requests in your project.

________________________________________________________________________________
# Catstagram Project

Today you'll be building a project called Catstagram! Here are the features of
Catstagram:

- It shows a random kitten picture from the `https://thecatapi.com/` API.
- Users can vote on the picture.
- Users can comment on the picture.
- Users can delete comments.
- Users can request a new random kitten image to be shown.

You can download the starter project from
https://github.com/appacademy-starters/ajax-project-starter.

The most important feature of Catstagram is that all of the other features
listed above can be performed without requiring a page reload. For example, when
a new comment is created, the comment smoothly gets added to the page without
requiring the website to reload.

In building Catstagram, you will master the fundamentals of AJAX. Specifically,
you will implement multiple AJAX cycles in this project, and you will become
familiar with the nuances of each step.

To start, download the skeleton zip. The skeleton contains an Express server, an
`index.html` page, and an `event.js` JavaScript file. If you need a refresher on
how these different components work together, please review the previous
reading.

Take some time to browse through each file. Start with the `public/index.html`
file and note how the document is structured. Then, review the
`public/index.css` file to see how it's currently styling the HTML page.

You'll be primarily working in the `public/events.js` file today, and at the
current moment, it's blank. In this file, you'll be setting up event listeners
and implementing AJAX requests using the Fetch API.

Finally, check out the `index.js` file. It might seem like there's a lot going
on in this file, but the only piece that you have to edit in this file today is
the `ERROR_RATE`. Otherwise, your primary interaction with this file will
involve looking at the endpoints that you should be making requests to and
seeing how the server handles each client request.

When you're ready, launch the server by running `npm start`, and then go to your
browser and navigate to `localhost:3000`.

## API Endpoints

Here are the API endpoints on the server that you will be using. You should still
read the `index.js` file for how the API endpoints are being created by the server.

**GET /kitten/image**

Fetches an image from an external API, `https://thecatapi.com/`, that returns
information on a random cat image url.

```json
{
  "score": 0,
  "comments": [],
  "src": string (image url)
}
```

If it doesn't succeed, it returns an error message.

```json
{
  "message": string
}
```

**PATCH /kitten/upvote**

Increments the score of the current kitten by 1 and returns the current score.

```json
{
  "score": number
}
```

**PATCH /kitten/downvote**

Decrements the score of the current kitten by 1 and returns the current score.

```json
{
  "score": number
}
```

**POST /kitten/comments**

Creates a new comment for the current kitten. To create a comment, the server expects the request body to look like the JSON below.

```json
{ 
  "comment": string
}
```
    
After sending a request to the server, the API endpoint returns all the comments of the kitten in the order that they were created. The JSON format below is the way the API endpoint returns information.

```json
{
  "comments": [ string ]
}
```

## Phase 1: Load the initial cat image

Let's start with the `index.html` in the `public` directory. Right now this
`html` document is being served by the Express server when the user navigates to
`localhost:3000` and lands on the root route ('/').

`index.html` has an `<img>` element, but the element has an empty `src`
attribute. In this first phase, set up an event listener that waits for the DOM
content to be loaded. When the DOM content is loaded, the client should make a
GET request, using the Fetch API, to the `/kitten/image` route.

When that route is hit, the server makes a request to The Cat API for
a random kitten image. Once that kitten image is returned, it sends data about
the kitten image back to the client.

When the server responds, update the DOM so that it's showing the kitten
picture.

## Phase 2: Implement `New Pic` button

Now that your website loads a kitten picture initially, we want to implement a
feature where the user can request a new kitten picture.

At the moment, the user could simply refresh the website to do that, but let's
instead use AJAX to give the user a smooth experience that does not require a
full page reload.

To do this, in `public/events.js`, add another event listener that now listens
for when anyone clicks the "New Pic" button. When that button is clicked, it
should ask the server for another kitten image and then display that image.

Once you've finished that, go ahead and let the user know when the client is
waiting for the response from the server. We can do this by displaying the text
"Loading..." in the div with the class of "loader" any time we fire off an HTTP
request to the server and then clear that "Loading..." text once the response
arrives.

## Phase 3: Error Handling

Various issues can arise in the HTTP request/response cycle. As developers, it's
your responsibility to handle errors that might come back from the server.

For example, if your server's request for a new image from the The Cat API
failed, then your app should notify your users of the issue.

Let's simulate errors by adjusting the `ERROR_RATE` variable in `index.js`. As
the comment above the `ERROR_RATE` variable in `index.js` file mentions,
`ERROR_RATE` represents the probability that an error will be thrown. So, if
the `ERROR_RATE` is updated to 100 percent, then the `generateRandomError`
function will throw an error every single time it's invoked. If the rate is at
0, then an error will never be thrown.

Go ahead and bump the rate up to 100 as you're implementing error handling. For
now, if the server responds with an error, go ahead and just `alert` the user
with a "Something went wrong! Please try again!" message.

## Phase 4: Voting

Next, let's add the ability to upvote and downvote the kitten picture. As you're
implementing this feature, pay close attention to the HTTP method used to make
this request.

Although the `upvote` and `downvote` endpoints don't have the
`generateRandomError()` function inside, it's still possible for errors to
occur, so be sure to implement error handling here as well.

One more thing, take this time to refactor and DRY up any code that might have
gotten too repetitive. Be sure to continue refactoring throughout whenever
there's an opportunity to make your code more concise and readable.

## Phase 5: Create Comment

To allow users to create comments, set up an event listener for the comment
form's `submit` event.

Check out the [FormData] interface for more info on how to extract the
data from the form.

By default, when a `submit` event happens on a form, an HTTP request is
automatically made based on the form's `action` and `method` attributes. During
this default HTTP request, the page reloads. Because you'll be using AJAX
instead to make an HTTP request without reloading the page, go ahead and call
[event.preventDefault()] on the `submit` event handler's callback function.

If you are struggling with making this HTTP request, be sure to go back to
the previous reading and review the section where it made a similar type of HTTP
request.

When this feature is properly implemented, any time the user submits a comment,
the newly created comment should be appended below all the existing comments.

## Phase 6: Improve error handling

Let's improve our error handling to not use the `alert` function. Instead, let's
display the specific error message that our server is responding with.

If we look at `index.js`, `generateRandomError` will randomly throw one of the
following the following three error messages:

- "No cat for you!"
- "Sad day. No kitten here."
- "Please try again!"

It would be ideal if the user can see the specific error message that's coming
from the server.

Please display the specific error message in the div with the class of "error".
Feel free to adjust the `ERROR_RATE` again in order to make it easier to
implement this feature.

## Recap

At this point, you should have the following features implemented:

- An image should load from the server when a user arrives on Catstagram.
- If users want to fetch a new kitten image, then clicking the 'New Pic' button
  should load up a new image. (Also, when the image is being loaded, the text
  'Loading...' should show up in the `.loader` div. Once the image is done
  loading, that `Loading...` text should disappear.)
- If the server responds with an error, the user should see that specific error
  message in the `.error` div.
- The user can upvote and downvote the kitten image.
- The user can create a comment. When a comment is created, it gets appended
  below all the other existing comments.

Great job on implementing all the core features of Catstagram! Before moving on
to the bonus section, review your `events.js` file one more time to see if
there's any other refactoring you can do to clean up your code.

## Bonus: Delete Comments

Nice work getting to the bonus feature! For the bonus, implement a feature that
would allow users to delete existing comments.

To implement this, you will have to refactor your comment creation feature to
now include a `Delete` button next to the comment.

Then, each button will require event handling so that whenever it is clicked, it
makes a request to the `delete` `/kitten/comments/:id` endpoint.

To properly implement this, you should try to use Event Delegation so that you
don't have to set up an individual click handler on each `Delete` button. If you
need a refresher on Event Delegation, please go back to the Event Delegation
content from earlier in the course. Alternatively, you could also review
JavaScript.Info's [lesson on Event Delegation].

[formdata]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[lesson on event delegation]: https://javascript.info/event-delegation
[event.preventDefault()]: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

________________________________________________________________________________
# WEEK-09 DAY-4<br>*All The Layouts* {ignore=true}
________________________________________________________________________________
# Media Query Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Identify the different types of media that a media query can target
2. Explain how the media features (and prefixed subfeatures) of "aspect ratio",
   "height", "orientation", and "width" are applied
3. Use media queries to change the styles of content in an HTML page to achieve
   a desired effectctives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Identify the different types of media that a media query can target
2. Explain how the media features (and prefixed subfeatures) of "aspect ratio",
   "height", "orientation", and "width" are applied
3. Use media queries to change the styles of content in an HTML page to achieve
   a desired effect

________________________________________________________________________________
# Layout Lesson Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Describe how:
   * padding and margins work in the box model
   * the browser positions a fixed positioned element
   * the browser positions a relatively positioned element
   * the browser positions absolutely positioned elements with and without a
     relatively positioned parent element
   * the browser positions a static positioned element
2. Identify elements rendered with specific padding and margin settings
3. Apply padding and margins to HTML elements to achieve a desired layout
4. Apply positioning settings to elements (fixed, relative, and absolute) to
   HTML elements to achieve a desired layout
5. Identify which HTML elements have a default "inline" display value
6. Identify which HTML elements have a default "block" display value
7. Describe and use z-index positioning of elements

*Note:* You will learn about _sticky_ positioning. Because it's not supported on
old but still used browsers, you will not be assessed on it. However, feel free
to learn about it and use it in your code unless otherwise specifically
instructed to do otherwise.arning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Describe how:
   * padding and margins work in the box model
   * the browser positions a fixed positioned element
   * the browser positions a relatively positioned element
   * the browser positions absolutely positioned elements with and without a
     relatively positioned parent element
   * the browser positions a static positioned element
2. Identify elements rendered with specific padding and margin settings
3. Apply padding and margins to HTML elements to achieve a desired layout
4. Apply positioning settings to elements (fixed, relative, and absolute) to
   HTML elements to achieve a desired layout
5. Identify which HTML elements have a default "inline" display value
6. Identify which HTML elements have a default "block" display value
7. Describe and use z-index positioning of elements

*Note:* You will learn about _sticky_ positioning. Because it's not supported on
old but still used browsers, you will not be assessed on it. However, feel free
to learn about it and use it in your code unless otherwise specifically
instructed to do otherwise.

________________________________________________________________________________
# Flexible Box Layout Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Explain how flexible box layout lays out elements
2. Use the `flex` property to specify grow, shrink, and basis values.
3. Use the `flex-direction` property to direct the layout of the content
4. Use the `flex-wrap` property to affect the wrap of content layout within an
   element using flexible box layout
5. Use `align-self`, `justify-content`, and `align-items` to change the way that
   children elements are laid out in a flexible box layout
6. Use the `order` property to change the order in which elements will appear
   in a flexible box layoutnal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Explain how flexible box layout lays out elements
2. Use the `flex` property to specify grow, shrink, and basis values.
3. Use the `flex-direction` property to direct the layout of the content
4. Use the `flex-wrap` property to affect the wrap of content layout within an
   element using flexible box layout
5. Use `align-self`, `justify-content`, and `align-items` to change the way that
   children elements are laid out in a flexible box layout
6. Use the `order` property to change the order in which elements will appear
   in a flexible box layout

________________________________________________________________________________
# Grid Layout Lesson Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Explain how grid layout lays out elements
2. Use the `grid-template-columns`, `grid-template-rows`, and `grid-template`
   properties to specify the layout of the grid using relative and absolute
   measures
3. Use `grid-template-areas` to label areas of a grid and `grid-area` to assign
   an element to the area
4. Use `grid-column-gap`, `grid-row-gap`, and `grid-gap` to set the "gutter"
   areas between elements in a grid layout
5. Use `grid-column-start`/`grid-column-end` and `grid-row-start`/`grid-row-end`
   to create spans across multiple columns and rows with positive integers,
   negative integers, and in conjunction with the "span" operator
6. Explain and use the shorthand versions of `grid-column` and `grid-row` to
   define how an element will span a grid layout
7. Use the `order` property to change the default order in which items are laid
   out
8. Explain and use the "fr" unit of measure
9. Use `justify-items`, `align-items`, `justify-content` and `align-content` to
   layout items in each grid areaal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

1. Explain how grid layout lays out elements
2. Use the `grid-template-columns`, `grid-template-rows`, and `grid-template`
   properties to specify the layout of the grid using relative and absolute
   measures
3. Use `grid-template-areas` to label areas of a grid and `grid-area` to assign
   an element to the area
4. Use `grid-column-gap`, `grid-row-gap`, and `grid-gap` to set the "gutter"
   areas between elements in a grid layout
5. Use `grid-column-start`/`grid-column-end` and `grid-row-start`/`grid-row-end`
   to create spans across multiple columns and rows with positive integers,
   negative integers, and in conjunction with the "span" operator
6. Explain and use the shorthand versions of `grid-column` and `grid-row` to
   define how an element will span a grid layout
7. Use the `order` property to change the default order in which items are laid
   out
8. Explain and use the "fr" unit of measure
9. Use `justify-items`, `align-items`, `justify-content` and `align-content` to
   layout items in each grid area

________________________________________________________________________________
# Layout: The Box Model

Understanding how to utilize margin, border, and padding around page elements
is an essential part of designing/developing for the Web.

In this reading, we’ll go over "The Box Model" and how to use the CSS
properties `margin`, `border` and `padding` on elements to create/enhance the
page layout.

## The Box Model

The CSS Box Model is a concept that basically boils down to every DOM element
has a box around it. The diagram below shows The Box Model with content in the
innermost layer, padding wrapped around it, a border wrapped around the padding,
and margin as the outermost layer.

![Box model](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/the-box-model.svg)

You can think of each box as a gift wrapped inside a few different layers.
Consider receiving a shiny new computer as a gift. Inside the box is the actual
computer (the _content_), which is wrapped in protective foam (the _padding_).
Outside of the foam is the cardboard box (the _border_), and outside of the box
is a fancy wrapping paper with glittery gold pineapples on it (the _margin_) cuz
_festive_!

We can change the size of the content with the CSS `width` and `height`
properties. We can add or remove padding with the `padding` property, set the
border with the `border` property, and add or remove the margin with the
`margin` property.

### Default box settings

According to [MDN][1], we know certain things about each box based on whether
the boxed element is displayed as a block or inline.

With elements (boxes) that have a `display` value of "block", either because it
is the default value for that kind of element (i.e., `div` elements, headers,
and `p` elements) or it is specifically overridden in the CSS, the browser
follows these rules to layout the element:

* The box fills available container space, and in most cases it fills up 100%
of the available space, becoming as wide as its container.
* Each new box appears on a new line/row.
* The CSS properties `width` and `height` are respected.
* The `padding`, `margin` and `border` of the box will push other elements
farther away from the box.

With elements (boxes) that have a `display` value of "inline", either because it
is the default value for that kind of element (i.e., `span`, `a`, and `img`
elements) or it is specifically overridden in the CSS, the browser follows these
rules to layout the element:

* Each box appears next to each other in a single line until it fills up the
available space.
* The CSS properties `width` and `height` don’t apply.
* The `padding`, `margin` and `border` of a box are applied, but they don’t
push other inline boxes away from the box.

The knowledge of which elements are inline and which are block, by default, is
important knowledge as you craft appealing and maintainable Web pages. As such,
you should refer to [MDN's list of inline elements][5] and [MDN's list of block
elements][6] to know which does what.

### Standard Box Model vs. border-box

In the standard Box Model, the `width` and `height` of an element set with CSS
refers to the width and height of the box’s _content_. Any `padding`,
`border` and `margin` added to the element will get added to the total size of
actual box. If `padding`, `border` or `margin` are removed from a box, the box
size decreases, but the `width` and `height` of the content stays the same.

```css
.box {
  border:  10px solid black; /* Applies to all four sides. */
  height:  100px; /* Content's height */
  margin:  50px;  /* Applies to all four sides. */
  padding: 25px;  /* Applies to all four sides. */
  width:   250px; /* Content's width */
}
```

![Standard content box layout](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/standard-box.svg)

This way of calculating width and height bothered many programmers. They wanted
to set the width and height of an element to _include_ the padding and border
because that just makes more sense than the other way. In CSS version 3, the
`box-sizing` property was added to the CSS specification which allows you to set
it to the values "content-box" (which is how it is by default) or "border-box",
which does what most Web developers want. Setting the `box-sizing` property to
`border-box` includes the width of the left border, right border, left padding,
and right padding in the overall `width`, and the top border, bottom border, top
padding, and bottom padding in the overall calculation of the `height`.

```css
.box {
  border:  10px solid black; /* Applies to all four sides. */
  box-sizing: border-box;
  height:  100px; /* Sum of content + top/bottom padding + top/bottom border */
  margin:  50px;  /* Applies to all four sides. */
  padding: 25px;  /* Applies to all four sides. */
  width:   250px; /* Sum of content + left/right padding + left/right border */
}
```

![Border box layout](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/border-box.svg)

### Inline + block = inline-block

For a long time, you had to choose between "inline" and "block" layout. What you
couldn't do was get block elements to be next to each other horizontally like
this.

![Statically positioned](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/static-pink-box.png)

Instead, you had to hack around it using the `float` property and hope that it
worked properly.

When the CSS version 2 came out, it introduced a new display property value of
"inline-block". This combined the best of both the "inline" and "block"
settings:

* Elements would still get laid out left to right
* The layout would take into account their specified width and height properties

With "inline-block", you could finally get what looked like columns without
having to resort to the `float` hack.

## Padding

[Padding][2] is a CSS property that applies padding on every side of a box.
This property is a shorthand for `padding-top`, `padding-right`,
`padding-bottom`, and `padding-left` (in clockwise order).

Padding values can be a length (i.e. px, em, rem) or a percentage (%). Here are
some examples:

```css
.box-1 {
  /* One value applies to all four sides. */
  padding: 3em;
}

.box-2 {
  /* Two values: top & bottom | left & right */
  padding: 20% 5%;
}

.box-3 {
  /* Three values: top | left & right | bottom. */
  padding: 15px 10px 20px;
}

.box-4 {
  /* Four values:  top | right | bottom | left*/
  padding: 0 10px 2em 1em;
}

.box-5 {
  /* Global values */
  padding: inherit;  /* OR initial OR unset */
}
```

As previously stated, `padding` is a shorthand value. Thus, the definition above
for the "box-4" class could be declared like this, too.

```css
.box-4 {
  padding-top: 0;
  padding-right: 10px;
  padding-bottom: 2em;
  padding-left: 1em;
}
```

The `initial` or default padding values of most elements are 0.

An element can `inherit` padding from its container, or you can use `unset`
to clear the previously set padding.

Padding is wrapped around content and closely tied to it. If you set an
element’s `background-color` or `background-image` in CSS, that color or image
will be applied to the area that includes both content and padding.

To illustrate the last point, compare an element without padding to one with
padding. This CSS below will result in the following image:

``` css
.box-parent {
  background-color: #000000;  /* Black */
  width: 300px;
  height: 300px;
}

.box-child {
  background-color: #ffff00;  /* Yellow */
  width: 100px;
  height: 280px;
}
```

![Elements without padding](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/element-no-padding.png)

The above image shows a parent element with a height of `300px` and a child
element with a height of `280px`. Because the yellow child element is shorter
and narrower than the parent element, you can see the black background of the
parent element to the right and beneath the yellow of the child element. But,
what would happen if you added `10px` of padding around the yellow element?

``` css
.box-parent {
  background-color: #000000;  /* Black */
  width: 300px;
  height: 300px;
}

.box-child {
  background-color: #ffff00;  /* Yellow */
  width: 100px;
  height: 280px;
  padding: 10px; /* Applies to all four sides. */
}
```

![Child element with padding](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/element-with-padding.png)

The yellow child element now has `10px` of padding all the way around it,
resulting in a larger yellow rectangle, increasing in an element that has a
calculated height of `280px + 10px + 10px = 300px`. Because background colors
are applied to the content _and_ the padding, the rectangle now fills 300px of
the vertical space covering the entire parent element's height.

## Border

[Border][3] is a shorthand CSS property that sets an element's border on all
sides. It sets the values of `border-width`, `border-style`, and `border-color`
(in that order).

Here is an example of setting an element’s `border` in CSS:

```css
.box {
  border: 3px solid #000000;
  /* border-width | border-style | border-color */
}
```

The above shorthand is equivalent to the following:

```css
.box {
  border-width: 3px;
  border-style: solid;
  border-color: #000000;
}
```

As part of the Box Model, the 3px `border-width` above gets factored into the
total box size, along with the content, padding and margin. The default
`border-width` is `medium`. The default `border-style` is `none`. The default
`border-color` is the `currentcolor` which will take the value of the color of
the current text, if that color has been explicitly set. Which, is weird. You
probably don't ever want to use that.

### Properties within the shorthand

You can break down each of the three border properties above into further
sub-properties:

* `border-width`:
  * `border-top-width`
  * `border-right-width`
  * `border-bottom-width`
  * `border-left-width`

* `border-style`:
  * `border-top-style`
  * `border-right-style`
  * `border-bottom-style`
  * `border-left-style`

* `border-color`:
  * `border-top-color`
  * `border-right-color`
  * `border-bottom-color`
  * `border-left-color`

Check the MDN document on the [border][3] property for more information about
its properties.

## Margin

[Margin][4] is a shorthand CSS property that sets the margins on every side of
an element. It encompasses `margin-top`, `margin-right`, `margin-bottom`, and
`margin-left`.

Like padding, margin values can be a length (i.e. px, em, rem) or a percentage
(%). It can also take a value of `auto`, which we’ll explain below. Here are
some examples:

```css
.box-1 {
  /* One value applies to all four sides. */
  margin: 10%;
}

.box-2 {
  /* Two values: top & bottom | left & right */
  margin: 0 2em;
}

.box-3 {
  /* Three values: top | left & right | bottom. */
  margin: 30px 0 15px;
}

.box-4 {
  /* Four values:  top | right | bottom | left*/
  margin: 10% 20px 10px 5%;
}

.box-5 {
  /* Global values */
  margin: inherit;  /* OR initial OR unset */
```

### Centering an element with margin

In addition to the margin values above, we can also use a margin value of
`auto`. With the `auto` value, the browser sets the margin for an element. We
can apply this property to horizontally center an element inside its parent
container. The following example CSS will result in a yellow element
horizontally centered inside its container:

``` css
.box-parent {
  background-color: #000000;  /* Black */
  width: 300px;
  height: 300px;
}

.box-child {
  background-color: #ffff00;  /* Yellow */
  width: 100px;
  height: 280px;
  padding: 10px;
  margin: 0 auto;  /* Centers element horizontally. */
}
```

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/element-margin-auto.png)

Prior to flexbox and its container property `justify-content`, using `margin: 0
auto` to center elements inside a container was standard practice, and it’s
still used for centering elements on browsers that do not support flexbox (like
older versions of IE).

## What you learned:

* The Box Model and parts of a standard box
* What `box-sizing: border-box` does
* The `padding` property and its sub-properties
* The `border` property and its sub-properties
* The `margin` property and its sub-properties
* Centering elements using the margin value `auto`

[1]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/padding
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/border
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/margin
[5]: https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements#Elements
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements#Elements

________________________________________________________________________________
# Layout: Positioning

The CSS property `position` allows us to set the position of elements on a page
and is an integral part of creating a Web page layout.

In this reading, we’ll review the different types of CSS positions we can apply
to elements and how they affect the layout of the page. If you _stick_ with it,
when you’re finished you should be _relatively_ well-versed in CSS positioning
properties and _absolutely_ able to create professional page layouts!

Positioning elements allows us to manipulate where those elements appear on the
page. Some position properties go with _the page flow_, while a couple of
properties cause an element to be _removed from the flow_. The flow of a page
refers to the relationship of block and inline elements before positioning or
other layout changes occur. (_See the MDN doc on [Flow Layout][1] for more
info._)

The [position][2] property accepts any of the following five values:

- Static
- Relative
- Absolute
- Fixed
- Sticky

All properties except for `static` are used in conjunction with the properties
`top`, `right`, `bottom` and `left` to ultimately determine an element’s
position on the page. The `top`, `right`, `left` and `bottom` properties are all
optional, except in the case of a sticky element, which requires at least one of
the four properties to be set.

For the rest of this article, the examples use the following HTML and base CSS.

```html
<div class="container">
  <div class="element" id="yellow-box">1</div>
  <div class="element" id="pink-box">2</div>
  <div class="element" id="blue-box">3</div>
</div>
```

```css
.container {
  background-color: #2b2d2f;
}

.element {
  box-sizing: border-box;
  display: inline-block;
  width: 100px;
  height: 280px;
  font-size: 36px;
}

#yellow-box {
  background-color: #ffff00;
}

#pink-box {
  background-color: #ff69b4;
}

#blue-box {
  background-color: #00eeee;
}
```

That HTML and CSS results in this layout.

![Statically positioned](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/static-pink-box.png)

Open up the [Positioning Elements] CodePen to follow along with the changes in
this article (as well as letting you experiment!).

## Static positioning

Static is the default position value of page elements. A `static` element is not
considered to be _positioned_ on the page, since it will appear normally
according to the page flow. The properties `top`, `right`, `bottom`, `left` and
`z-index` do not affect static elements.

You probably won’t use this value much, unless you are overriding other values
with it, but this is how to set an element to be static.

**CSS:**

```css
#pink-box {
  background-color: #ff69b4;
  position: static;
}
```

Because you're just explicitly setting the value to the value that it already is
by default, nothing changes in the way the browser draws it.

![Statically positioned](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/static-pink-box.png)

## Relative positioning

A relatively positioned element remains in its original position in the page
flow (like a static element) and can be offset from that position using the
`top`, `right`, `bottom` and `left` properties. The element is positioned
_relative to its initial place in the page flow_. Relative positioning creates a
[stacking context][3] -- overlapping elements whose order can be set by the
`z-index` property. (See the MDN doc on [z-index][4] for an example.)

The `top`, `right`, `bottom`, and `left` properties take a length which, as you
likely recall, is a value and a unit of measurement (or percentage).

```css
#pink-box {
  background-color: #ff69b4;
  bottom: 0;
  left: -20px;
  position: relative;
  right: 0;
  top: 0;
}
```

![Relatively positioned pink box](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/relative-pink-box.png)


## Absolute positioning

An absolutely positioned element is removed from the page flow, and other
elements around it act like it’s not there. The element is positioned in
relation to its closest _positioned_ ancestor, or, if one cannot be found,
to the `<html>` document. It can be offset from that position using the `top`,
`right`, `bottom` and `left` properties. Absolute positioning creates a
[stacking context][3] -- overlapping elements whose order can be set by the
`z-index` property. (See the MDN doc on [z-index][4] for an example.)

### Example of an absolutely positioned element

In the following CSS, you will note that the container element has a position
set to "relative". This is so the browser will calculate the position of any
absolutely positioned children from its top-left corner.

```css
.container {
  background-color: #2B2D2F;
  position: relative;
}

#pink-box {
  position: absolute;
  top: 60px;
}
```

![Absolutely positioned pink box](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/absolute-pink-box.png)

Things to note about how the pink box was positioned and laid out.

* The pink box is positioned absolutely, meaning that it was removed from the
  flow of the document. The image above shows us that the blue box has filled in
  the place of pink box because the browser does not consider the pink box to be
  in the normal left-to-right layout of the content.
* The pink box is stacked on top of the static blue box (static because that is
  the default `position` value). When the browser removed the pink box from the
  flow, it put it in its own virtual layer _above_ the statically positioned
  elements.
* Again, it's important to note that the container element has its `position`
  set to "relative". This is so the browser will position the pink box relative
  to its parent.

It's important to do that relative thing if you want the absolute positioning of
the element to be calculated from the top-left corner of the closest positioned
ancestor element, in this case, the container element.

### Example of two absolutely positioned elements

What happens if you chose to absolutely position the pink box _and_ the blue
box? What do you think will happen? Try it out in the CodePen.

```css
.container {
  background-color: #2B2D2F;
  position: relative;
}

#pink-box {
  position: absolute;
  top: 60px;
}

#blue-box {
  position: absolute;
}
```

![Two absolutely positioned elements](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/absolute-blue-box.png)

In this case, both of the pink and blue boxes were taken out of the normal flow.
The pink box shows up where it did before. But, now, because the blue box is
_layered_, it shows up **on top of** the pink box. This is how you can make
interesting and neat UIs that have elements on top of one another.

### Example of an absolutely positioned element using bottom instead of top

Here is an example where you can see how it changes when you don't have a
positioned ancestor element. The CSS sets the pink box's `bottom` value to 60
pixels, rather than the `top`. This pushes the element 60 pixels _up_ from the
bottom of the parent element's bottom.

```css
.container {
  background-color: #2b2d2f;
  position: relative;
}

#pink-box {
  background-color: #ff69b4;
  bottom: 60px;
  position: absolute;
}
```

![Relative parent and absolute child shifted up](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/relative-parent-absolute-child.png)

You can see that the browser has shifted the pink box up, so much so, that you
can't see the number "2" anymore.

If you had not relative positioned the container element, the browser would try
to find the bottom of its nearest positioned ancestor. Since none occurs, the
browser assumes you meant that it should be 60 pixels from the _bottom of the
document_!

```css
.container {
  background-color: #2b2d2f;
}

#pink-box {
  background-color: #ff69b4;
  bottom: 60px;
  position: absolute;
}
```

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/static-parent-absolute-child.png)

## Fixed positioning

A fixed element is removed from the page flow, like an absolutely positioned
element. However, unlike an absolutely positioned element, a fixed element’s
position is relative to the `<html>` document itself and not to an ancestor
element. It is positioned using the `top`, `right`, `bottom` and `left`
properties. Fixed positioning creates a [stacking context][3] -- overlapping
elements whose order can be set by the `z-index` property. (See the MDN doc on
[z-index][4] for an example.)

A fixed element will remain in the same spot on the page, regardless of the
size of the window or whether a user scrolls.

```css
#pink-box {
  background-color: #ff69b4;
  left: 300px;
  position: fixed;
  top: 15%;
}
```

Here it is without any scrolling.

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/fixed-element.png)

Here it is with some scrolling.

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/fixed-element-scroll.png)

Fixed positioning can be useful for things like nav bars, buttons, links,
videos, etc. that we want to keep visible as the user scrolls. Ensure that
elements positioned with an absolute or fixed value do not obscure other content
when the page is zoomed to increase text size.

## Sticky positioning

A sticky element remains in its original position in the page flow, and it is
positioned relative to its closest block-level ancestor and any _scrolling_
ancestors (created when `overflow` is `hidden`, `scroll`, `auto`, or `overlay`).
It behaves like a relatively positioned element until the point at which you
would normally scroll past it in the viewport. At that scrolling point, the
element "sticks" to the page wherever it has been positioned by the `top`,
`left`, `bottom` and `right` properties. Sticky positioning creates a [stacking
context][3] -- overlapping elements whose order can be set by the `z-index`
property. (See the MDN doc on [z-index][4] for an example.)

You must set at least one threshold value using `top`, `right`, `bottom` or
`left` in order for sticky positioning to work. A sticky element will start off
as _relatively_ positioned until you scroll past its original position -- at
which point it will be _fixed_ to the position you specified.

```css
#pink-box {
  background-color: #FF69B4;
  position: sticky;
  top: 60px;
}
```

Here is what it looks like without any scrolling.

![Sticky without scrolling](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/sticky-element.png)

Once you scroll, the element will stick in place when it gets where it should
not scroll past.

![Sticky with scrolling](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/sticky-element-scroll.png)

A good use case for sticky positioning is for headers in scrollable lists.
Here's and example of headers in a list having sticky positioning. They act
relative until they get to the top of the scrollable area. At that point, they
become fixed until the bottom of their parent element pushes them off of the
screen as the parent element scrolls off of the screen.

![sticky section headers](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/css-layout-sticky-positioning.gif)

_**Note:** Like fixed positioning, sticky positioning can be useful for things
like nav bars, buttons, links, videos, etc. that we want to keep visible as the
user scrolls. One use-case would be keeping a section or menu heading at the top
of the page until the user scrolls past that section into a new one. Again, use
with caution, and always keep accessibility in mind._

## What we learned:

- The types of element positions
- Static position definition and application
- Relative position definition and application
- Absolute position definition and application
- Fixed position definition and application
- Sticky position definition and application

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/position
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
[Positioning Elements]: https://codepen.io/aa-academics/pen/dyogoWM?editors=1100

________________________________________________________________________________
# Flexbox Layout

Flexbox is a CSS module that provides a convenient way for us to display items
inside a _flexible_ container so that the layout is responsive.

With flexbox, a container’s width and height automatically adjust to fit the
viewport, and the sizing, alignment, and spacing of the items inside the
container are optimized for the available space.

## Pre-flexbox float

Back in ye olden pre-flexbox days, developers used a few different CSS
techniques to display/position elements in a container, the most common of
which is [float][1].

Born from the print layout notion of text wrapping around images, the float
property has been widely used to create Web page layouts. The basic idea behind
floated elements is that, like images in a print layout, they are considered
part of the _flow_ of the page. Other elements, like text that wraps, will
_reflow_ around the floated elements.

A tricky and inconvenient issue related to float is the necessity of
_clearing_ the float. This is what happens when floated elements have not been
cleared:

![Float not cleared](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/float-not-cleared.png)

Because other non-floated elements take up the available space around a floated
element, we need to `clear` the float by setting up an empty DIV (i.e. block
element) after it, or by setting up a `.clearfix:after` pseudo selector in CSS.
(Read more about this in this CSS-Tricks doc about [float][1]).

![Float cleared](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/float-cleared.png)

By resizing elements in the container, or parent element, and redistributing
space evenly around elements, flexbox takes care of such issues for us.

## Using flexbox

With flexbox, a container element is automatically resized to fit the viewport
size without needing to use breakpoints. Elements within the container are
resized and distributed to best fill the available space. See the image
below for an example of how elements in a container would be laid out using
flexbox:

![Flexbox](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/flexbox-elements.png)

The [flexbox layout][2] consists of CSS styles applied to:

* A parent element (i.e. _**flex container**_)
* Its children (i.e. _**flex items**_)

### Flex container styles

To set a parent element to be a flex container, we simply need to apply
`display: flex` to a CSS class selector, like so:

```css
.container {
  display: flex;  /* OR inline-flex */
}
```

By default, flex items will try to fit onto one line. To get elements within
the container to wrap to a new line, we need to add the `flex-wrap` property to
the container:

```css
.container {
  display: flex;
  flex-wrap: wrap;  /* OR nowrap OR wrap-reverse. */
}
```

![Wrapped flex items](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/flex-wrap.png)

We can also set the direction of the main axis using `flex-direction`. This
allows us to create either _rows_ or _columns_ of elements:

```css
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;  /* OR row-reverse OR column OR column-reverse */
}
```

![Flex direction](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/flex-direction.png)

We can combine both `flex-direction` and `flex-wrap` with a single property
called `flex-flow`:

```css
.container {
  display: flex;
  flex-flow: row wrap;  /* Use the flex-direction first, followed by the flex-wrap. */
}
```

Additional properties we can set on the flexbox container include:

* `justify-content` -- Defines the alignment of flex items along the main axis
  and distributes extra container space around/between items.
* `align-items` -- Like justify-content for the cross axis (e.g. items aligned
on the Y axis, instead of the X axis).
* `align-content` -- Redistributes extra space on the cross axis.

### Flex items styles

We are not required to put styles on the flex items, but we may choose to do so
for additional customization.

By default, flex items appear in the order they are added to the DOM (i.e. the
order they are listed in an HTML file). However, we can use the `order`
property to change their order in the flex container.

```css
.item-1 {
  order: 1;  /* Must be an integer. Default is 0. */
}
.item-2 {
  order: 2;  /* Must be an integer. Default is 0. */
}
.item-3 {
  order: 3;  /* Must be an integer. Default is 0. */
}
```

Additional properties we can set on flex items include:

* `flex-grow` -- Dictates amount of available space inside the flex container
the item should take up. Must be an integer. Default is 0.
* `flex-shrink` -- Defines the ability for a flex item to shrink if necessary.
Must be an integer. Default is 1.
* `flex-basis` -- The default size of an element before the remaining space is
distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword (e.g. auto,
content).
* `flex` -- Shorthand for `flex-grow`, `flex-shrink` and `flex-basis`. Default
is 0 1 auto.
* `align-self` -- Overrides default alignment set by the `align-items` property
on the container.

Check out the CSS-Tricks article [A Complete Guide to Flexbox][2] for more
information about setting properties on the flex container and flex items.

## Flexbox froggy

Play a fun interactive game to learn flexbox! Visit [flexboxfroggy.com][3] and
learn how to use flexbox while moving some cute croakers around.

### What we learned:

* Review of using float for page layouts
* Flexbox background and concepts
* Styles for the flex container and flex items
* Flexbox froggy game is a fun way to learn flexbox!

[1]: https://css-tricks.com/all-about-floats/
[2]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[3]: https://flexboxfroggy.com/

________________________________________________________________________________
# CSS Grid

[CSS Grid][1] is a two-dimensional layout system that lets us create a grid with
columns and rows purely using vanilla CSS.

Unlike flexbox, which is one-dimensional and meant for individual container
elements, a grid layout gives us the ability to control and customize an entire
page layout.

Here is a diagram depicting a grid layout:

<img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/grid-layout.svg"/>

## Bootstrap vs. CSS Grid

Prior to CSS Grid, developers used various tools to achieve a grid layout, the
earliest of these being the HTML `<table>`. We then progressed into using CSS
libraries for a responsive grid layout, the most ubiquitous being
[Bootstrap][2], a front-end library with pre-built grid classes and also jQuery
plugins.

While many developers and dev shops still use Bootstrap for convenience, it
does come with some caveats: A Bootstrap grid is 12 columns, and this cannot be
changed. Bootstrap automatically adds padding around columns (known as "gutters"
) that you may or may not want to override. There are a number of HTML classes
to use for the container, row, and columns at responsive breakpoints -- meaning
more stuff to add to your HTML file. That said, Bootstrap is a common
out-of-the-box solution that’s worth knowing about.

In comparison, [CSS Grid][1] provides greater flexibility and control over the
grid layout. You can add as many columns and rows as you want. There are no
HTML classes to use, only CSS properties. You can customize anything in the
grid you want -- including the sizes of rows and columns, the alignment of grid
items, the position of grid items, the gutters/spacing, etc. You can also make
grid items easily span multiple rows and/or columns. No external libraries are
required, meaning no code bloat. CSS Grid is pretty powerful! That said, there
is a learning curve, and not all [browsers support][3] CSS Grid (especially
newer features).

## Using CSS Grid

CSS Grid can be used to create an entire page layout or for a specific
container element. Just like with flexbox, a grid layout consists of CSS styles
applied to:

* A grid container (parent element)
* Grid items (children elements)

In the next two readings, we'll go over all of the styles related to the
grid container and the grid items -- there's a lot of them! If you learn better
by doing than reading, you might want to check out the game below to start
learning CSS grid. You can always come back to these readings afterwards.

## What we learned:

* Comparison of flexbox and grid layout
* Comparison of CSS libraries like Bootstrap vs. CSS Grid

[1]: https://css-tricks.com/snippets/css/complete-guide-grid/
[2]: https://getbootstrap.com/
[3]: https://caniuse.com/#search=css%20grid

________________________________________________________________________________
# Grid Container Styles

A grid layout consists of CSS styles applied to:

* A grid container (parent element)
* Grid items (children elements)

In this reading, we're covering all the styles related to the grid container.
To set a parent element to be a grid container, we simply need to apply
`display: grid` to a CSS class selector, like so:

```css
.grid-container {
  display: grid;  /* OR inline-grid */
}
```

## Columns and Rows

We can set the number of columns and rows in a grid, as well as their track
sizes, by using the `grid-template-rows` and `grid-template-columns` properties.

```css
.grid-container {
  grid-template-columns: <track-size> ... | <line-name> <track-size> ...;
  grid-template-rows: <track-size> ... | <line-name> <track-size> ...;
}
```

The `<track-size>` refers to the size of either the rows or columns. It can be
pixels, a percentage, a fraction of space left (using `fr`), or set to `auto`
(which expands or shrinks depending on the items within it).

Grid lines mark the start/end of rows and columns. You can call a `<line-name>`
anything you choose (and also give a line multiple names), or you can leave it
blank, which defaults to positive or negative numbers.

Here’s an example 5x4 grid with unnamed/default grid lines. Each space between
the sizes in `grid-template-columns` and `grid-template-rows` represents a line
number (1, 2, 3, 4, etc.):

```css
.grid-container {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px;
  grid-template-rows: 25% 25% 25% auto;
}
```

<img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/5x4-grid-num-lines.svg"/>

Here’s an example 5x4 grid with named grid lines:

```css
.grid-container {
  grid-template-columns: [start] 100px [line2] 100px [line3] 100px [line4] 100px [line5] 100px [end];
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end row3-start] 25% [row3-end row4-start] auto [rows-end];
}
```

<img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/5x4-grid-named-lines.svg"/>

## Repeating Columns and Rows

You can easily repeat columns and rows of the same size. Let’s refactor our
first example above using `repeat()`:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 100px [col-start]);
  grid-template-rows: repeat(4, 25% [row-start]);
}
```

Just like in the first example, the grid will be five columns of 100px each.
We’ve named each grid line separating the columns `col-start`. The grid will
also have four columns of 25% each, and the grid lines separating rows are
named `row-start`.

## Fractions

We’ve used percentages, pixels and `auto` for the track size so far, but we
could also use fractions. The `fr` unit specifies the fraction of available
space to be filled up by a row or column. The following two examples are
equivalent, and each example will create a grid with four rows that each take
up one-quarter of the available space.

```css
.grid-container {
  display: grid;
  grid-template-rows: repeat(1fr 1fr 1fr 1fr);
}
```

```css
.grid-container {
  display: grid;
  grid-template-rows: repeat(25% 25% 25% 25%);
}
```

If we wanted to, we could create any combination of percentages, pixels or
fractions, like the following:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12% 200px auto 400px);
  grid-template-rows: repeat(50px 2fr 2fr 1fr);
}
```

The `fr` units are flexibly calculated after all other exact measurements (like
percentages or pixels). Again, `auto` will expand or shrink based on what’s
contained within that column or row.

## Grid Template Areas

CSS Grid gives us a handy way to map out and visualize areas of the grid
layout. We can combine the grid container property `grid-template-areas` with
the grid items property `grid-areas` to define areas of a template and how much
space they should take. Let’s look at an example:

```css
.item-1 {
  grid-area: header;
}
.item-2 {
  grid-area: main;
}
.item-3 {
  grid-area: sidebar;
}
.item-4 {
  grid-area: footer;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header"
    "main . sidebar"
    "footer footer footer";
}
```

<img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/grid-template-areas.svg"/>

In this example, we’ve created a 3x3 grid. The `header` area takes up the
entire first row / all three columns across. In the second row, the first
column is filled by `main` area, the second column is blank (represented by a
period), and the third column is filled by the `sidebar` area. We used the `fr`
unit for the columns, so they should flexibly fill the available space, and the
rows will `auto` resize to fit their items.

## Grid Gaps

Grid gaps refer to the spaces between rows or between columns. They are
basically "gutters". These properties allow us to set the spacing between rows
or columns:

* `grid-column-gap` - accepts a size value
* `grid-row-gap` - accepts a size value

```css
.grid-container {
  ...
  grid-column-gap: 20px;
  grid-row-gap: 30px;
}
```

<img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/grid-gaps.svg"/>

We could also use the shorthand property `grid-gap` to include both
`grid-column-gap` and `grid-row-gap`. The first value is the `grid-row-gap` and
the second value is the `grid-column-gap`.

```css
.grid-container {
  ...
  grid-gap: 30px 20px;
  /* <grid-row-gap> | <grid-column-gap>. */
}
```

## Justify/Align Items

We can position items inside their respective rows or columns. These container
properties can be used to set the alignment of all items within a grid
container:

* `justify-items` - aligns items on the row (horizontally)
    - start - aligns items with the start line of their cell (left side)
    - end - aligns items with the end line of their cell (right side)
    - center - aligns items in the center of their cell (center)
    - stretch - fills the whole width of the cell (the default value)

* `align-items` - aligns items on the column (vertically)
    - start - aligns items with the start line of their cell (top of cell)
    - end - aligns items with the end line of their cell (bottom of cell)
    - center - aligns items in the center of their cell (center)
    - stretch - fills the whole height of the cell (the default value)

```css
.grid-container {
  justify-items: stretch;  /* OR start | end | center */
  align-items: stretch;  /* OR start | end | center */
}
```

## Justify/Align Content

In some instances, like when grid items are sized with non-flexible units like
pixels, your grid might be smaller than its container and there is extra space.
In that case, you might want to set the position of the grid inside its
container.

<img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/grid-justify-content.svg"/>

These container properties can be used to set the alignment of the
entire grid inside its container:

* `justify-content` - aligns items on the row (horizontally)
    - start - aligns the grid with the start of the grid container (left side)
    - end - aligns the grid with the end of the grid container (right side)
    - center - aligns the grid in the center of the grid container (center)
    - stretch - resizes the grid items so that the grid fills the **full width**
of the grid container
    - space-around - equal spaces between grid items, with half-sized spaces at
the start / end
    - space-between - equal spaces between grid items, with no space at the
      start / end
    - space-evenly - equal spaces between grid items, including at the start / end

* `align-content` - aligns items on the column (vertically)
    - start - aligns the grid with the start of the grid container (top of
container)
    - end - aligns the grid with the end of the grid container (bottom of container)
    - center - aligns the grid in the center of the grid container (center)
    - stretch - resizes the grid items so that the grid fills the **full
      height** of the grid container
    - space-around - equal spaces between grid items, with half-sized spaces at
the start / end
    - space-between - equal spaces between grid items, with no space at the
      start / end
    - space-evenly - equal spaces between grid items, including at the start / end

```css
.grid-container {
  justify-content: stretch;  
    /* start | end | center | space-around | space-between | space-evenly */
  align-content: stretch;  
    /* start | end | center | space-around | space-between | space-evenly */
}
```

## Implicit Grids and Auto Rows/Columns/Flow

Up until now, we have set properties for an _**explicit grid**_. Using the
properties `grid-template-rows`, `grid-template-columns` and/or
`grid-template-areas`, we have _explicity_ set the number of rows and columns
in the grid.

However, sometimes an _**implicit grid**_ gets created. This happens when there
are more grid items than cells in the grid, or when a grid item is placed
outside of the explicit grid (we’ll talk more about placing grid items in the
next section). The grid container automatically adds new lines to the grid,
creating implicit grid tracks. The explicit grid plus these implicit grid
tracks create an implicit grid.  

(_See this CSS-Tricks doc on [The Difference Between Explicit and Implicit
Grids][1] for more info._)

We can specify the size of any auto-generated grid tracks (i.e. implicit grid
tracks) using these properties:

* `grid-auto-columns` - accepts a track-size value (a length, % or `fr`)
* `grid-auto-rows` - accepts a track-size value (a length, % or `fr`)

You might want to set the auto-generated tracks the be the same size as your
explicit rows and columns. For example, if you had a grid with columns that are
100px and rows that are 50px, then you will most likely want to use those
values for the auto-generated tracks.

```css
.grid-container {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 50px 50px 50px;
  grid-auto-columns: 100px;
  grid-auto-rows: 50px;
}
```

Any grid items that aren’t explicitly placed on the grid are automatically
placed, or _re-flowed_. We can set the flow of grid items on implicit grid
tracks by using:

* `grid-auto-flow` - accepts any of the following placement values
    - row - fills in each row in order, adding new rows as necessary (the
      default value)
    - column - fills in each column in order, adding new columns as necessary
    - dense - fills in spaces earlier in the grid if smaller items come up later
(beware: might make grid items appear out of order)

## Shorthand Container Properties

We can combine grid container properties by using shorthand properties. However,
you may want to familiarize yourself with the properties we discussed above
before using these.

* `grid-template` - shorthand property for `grid-template-rows`,
`grid-template-columns` and `grid-template-areas`
* `grid-gap` - shorthand property for `grid-column-gap` and `grid-row-gap`
* `place-items` - shorthand property for `justify-items` and `align-items`
* `place-content` - shorthand property for `justify-content` and `align-content`
* `grid` - shorthand property for `grid-template`, `grid-auto-columns`,
`grid-auto-rows` and `grid-auto-flow` (you can create the entire grid with this
one property)

_Check out the MDN doc on [CSS Grid Layout][2] for a full list of grid container
properties, their definitions and examples._

## What we learned:

* Setting up a basic grid with columns and rows
* Easily repeating columns and rows
* Using the `fr` unit for fractions
* Setting up a whole grid with `grid-template-areas` and `grid-area`
* Creating grid gaps between columns and rows
* Setting the alignment of an item in its cell
* Setting the alignment of a grid inside its container
* What happens when an implicit grid is created
* Shorthand properties that combine container properties

[1]: https://css-tricks.com/difference-explicit-implicit-grids/
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
________________________________________________________________________________
# Grid Items Styles

A grid layout consists of CSS styles applied to:

* A grid container (parent element)
* Grid items (children elements)

In the last reading, we covered all the styles related to the grid container.
In this reading, we're covering all the styles related to the grid items.

## Spanning Columns/Rows

We can set a grid item to take up a specified number of columns and/or rows
with the following properties:

* `grid-column-start` - the column where the item starts
* `grid-column-end` - the column where the item ends
* `grid-row-start` - the row where the item starts
* `grid-row-end` - the row where the item ends

These four properties can take any of the following values:

* `<line>` - the number or the name of a grid line
* `span <number>` - the item will span the provided number of grid tracks
* `span <name>` - the item will span and stop at the given line name
* `auto` - indicates auto-placement, an automatic span, or a default span of one

Example CSS using a mix of acceptable values:

```css
.item-1 {
  grid-row-start: row2-start;  /* Item starts at row line named "row2-start" */
  grid-row-end: 5;  /* Item ends at row line 5 */
  grid-column-start: 1;  /* Item starts at column line 1 */
  grid-column-end: three;  /* Item ends at column line named "three" */
}

.item-2 {
  grid-row-start: 1;  /* Item starts at row line 1 */
  grid-row-end: span 2;  /* Item spans two rows and ends at row line 3 */
  grid-column-start: 3;  /* Item starts at column line 3 */
  grid-column-end: span col5-start;  /* Item spans and ends at line named "col5-start" */
}
```

<img src="grid-item-span.svg"/>

## Grid Areas

We can use the grid item property `grid-area` in conjunction with the grid
container property `grid-template-item` to define sections of the layout. Here
is the same example from earlier:

```css
.item-1 {
  grid-area: header;
}
.item-2 {
  grid-area: main;
}
.item-3 {
  grid-area: sidebar;
}
.item-4 {
  grid-area: footer;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header"
    "main . sidebar"
    "footer footer footer";
}
```

In the above example, we gave the `grid-area` property name values: header,
main, sidebar, and footer. We could also use this property as a shorthand for
`grid-row-start` + `grid-column-start` + `grid-row-end` + `grid-column-end`.

```css
.item {
  grid-area: row1-start / col4-start / 5 / 3;
  /* Starts at line named "row1-start" / Starts at line named "col4-start" / Ends at row line 5 / Ends at column line 3 */
}
```

## Justify/Align Self

We can use the grid container properties `justify-items` and `align-items` to
align all grid items at once, but we might want to change the alignment of the
single grid item. In that case, we could use these properties on the item:

* `justify-self`- aligns self on the row (horizontally)
    - `start` - aligns items with the start line of their cell (left side)
    - `end` - aligns items with the end line of their cell (right side)
    - `center` - aligns items in the center of their cell (center)
    - `stretch` - fills the whole width of the cell (the default value)

* `align-self` - aligns self on the column (vertically)
    - `start` - aligns items with the start line of their cell (top of cell)
    - `end` - aligns items with the end line of their cell (bottom of cell)
    - `center` - aligns items in the center of their cell (center)
    - `stretch` - fills the whole height of the cell (the default value)

```css
.item-3 {
  align-self: stretch; /* OR start | end | center */
}
```

## Shorthand Item Properties

We can combine grid item properties by using shorthand properties. However, you
may want to familiarize yourself with the properties we discussed above before
using these.

* `grid-column` - shorthand property for `grid-column-start` + `grid-column-end`
* `grid-row` - shorthand property for `grid-row-start` + `grid-row-end`
* `place-self` -  shorthand property for `justify-self` + `align-self`

_Check out the MDN doc on [CSS Grid Layout][1] for a full list of grid items
properties, their definitions and examples._

## What we learned:

* Spanning grid columns and rows with a grid item
* Using grid line numbers or names vs. using `span`
* Using the item property `grid-area` with the container property
  `grid-template-areas`
* Aligning a single grid item in its cell
* Shorthand properties that combine grid item properties

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout

________________________________________________________________________________
# Practice: Flexible Box Games

Your project, here, is to complete both Flexbox Froggy and Flexbox Defense to
learn the aspects of flexible box layout.

If you have, in the past, done these already, please do them, again. They're
good practice.

* [Flexbox Froggy](https://flexboxfroggy.com/) - complete all 24 levels!
* [Flexbox Defense](http://www.flexboxdefense.com/) - finish all 12 waves!

________________________________________________________________________________
# Practice: Grid Layout Game

Your project, here, is to complete the CSS Grid Garden.

If you have, in the past, done this already, please do it, again. It's probably
been a while and is good practice.

[CSS Grid Garden](http://cssgridgarden.com/) - finish all 28 levels!

________________________________________________________________________________
# Project: Recreate A Trello Dashboard With Flexbox

Flexbox makes designing and coding responsive websites a breeze. In the reading,
we went over how to use [flexbox][1] properties on parent and children elements.
Now that you’re a pro at using flexbox, go on and _flex_ your CSS skills!
(Please pardon the pun).

In this project, you’ll use flexbox to recreate the Trello dashboard so that
it’s responsive to different screen sizes. Please clone the repository from
https://github.com/appacademy-starters/css-flexbox-trello.

## Project overview

[Trello][2] is a Web application that many professionals use to manage projects.
In this project, you will use flexbox to recreate the Trello dashboard page
depicted in the following screenshots.

Screenshot of page in large screen (desktop) format:

![Trello on a wide screen](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/trello-large-screen.png)

Screenshot of page in medium screen (desktop/tablet) format:

![Trello on a medium screen](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/trello-medium-screen.png)

Screenshot of page in small screen (mobile) format:

![Trello on a small screen](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/trello-small-screen.png)

All of the elements needed for the page are contained in the
`flexbox-project.html` file. In addition to linking to `flexbox-project.css`,
where you’ll add your styles, the page also includes a CDN link to Font Awesome,
a font that contains nice icons you can use for the header. To use an icon from
Font Awesome, you just need to include an `i` element with the classes
"fa«indicator»" and "fa-«icon name»". For example, to include the solid "home"
icon which looks like a house, you would add this HTML to your source code.

```html
<i class="fas fa-home"></i>
```

The "fas" means "Font Awesome Solid!" So easy! Here's a link to the [Font
Awesome free icon search page] so you can have it open if you want to include
more icons.

## Phase 1: Use flexbox to create the header nav bar

Use flexbox to recreate the blue header nav bar at the top of the page.
Try to replicate the header so it's as close to what's on the site/screenshots
as possible. We have included icons, which are similar to the original icons,
for you to use in your project folder.

![Trello header nav bar](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/trello-header-navbar.png)

Start off by setting the page-wide style on the `body` element. Set the
following properties for it.

| Property    | Value                                                                                     |
|-------------|-------------------------------------------------------------------------------------------|
| Font family | `'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif` |
| Font size   | 14 pixels                                                                                 |
| Margin is   | 0 pixels                                                                                  |

Style the `.header-nav__container` with the following properties. The third
entry in the table, "Line height", use MDN to figure out what that CSS property
is for that setting.

| Property         | Value     |
|------------------|-----------|
| Background color | #026AA7   |
| Font size        | 16 pixels |
| Line height      | 20 pixels |
| Padding          | 4 pixels  |
| Text color       | white     |


Now, you'll need to use `display: flex` on the `header-nav__container` to put
the three sections in the right place. You want all three elements to span the
same widths in the nav bar.

Then, in the left `.header-nav__group`, use flexbox to layout each
`.header-nav__link`. You'll want to manipulate the margin and padding to get the
different elements spaced apart from one another.

In the middle `.header-nav__group`, center the Trello logo.

In the right `.header-nav__group`, have the buttons align right with the same
spacing between them as you set between the elements in the first
`.header-nav__group`. The alert button should have a background color of
"#CF513D".


Once you have that, add a media query "breakpoint" to hide the search input
field and the "Boards" text on screens with widths less than or equal to 730
pixels.

```css
@media screen and (max-width: 730px) {
  /* Hide the header search input field. */
  /* Hide the "Boards" text, but leave the boards icon. */
}
```

## Phase 2: Use flexbox to layout the "My Team" section

Use flexbox to recreate the "My Team" section under the header nav bar.

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/trello-my-team.png)

Set the following properties to the indicated values for `.team__container`:

| Property         | Value     |
|------------------|-----------|
| Background color | #f4f5f7   |
| Padding          | 32 pixels |

Set the following properties to the indicated values for `.team__info`:

| Property       | Value      |
|----------------|------------|
| Flex direction | column     |
| Margin         | 0 auto     |
| Max width      | 650 pixels |
| Text alignment | center     |

Set the following properties to the indicated values for H1 elements that are a
direct child of `.team__info`:

| Property    | Value     |
|-------------|-----------|
| Margin      | 0 0 12px  |
| Font size   | 24 pixels |
| Font weight | 600       |
| Line height | 28 pixels |

Set the following properties to the indicated values for A elements that are
descendants of `.team__info`:

| Property    | Value                  |
|-------------|------------------------|
| Text color  | #172b4d                |
| Line height | 20 pixels              |
| Font weight | The normal font weight |

## Phase 3: Use flexbox to create the tabbed nav bar

Use flexbox to recreate the tabbed nav bar above the boards, which contains
four links -- Boards, Members, Settings, Business Class.

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/trello-tabbed-navbar.png)


Set the following properties to the indicated values for
`.tabbed-nav__container`:

| Property         | Value   |
|------------------|---------|
| Background color | #f4f5f7 |

Set the following properties to the indicated values for `.tabbed-nav__group`:

| Property        | Value             |
|-----------------|-------------------|
| Bottom border   | 1px solid #dfe1e6 |
| Display         | flex              |
| Justify content | center            |

Set the following properties to the indicated values for `.tabbed-nav__link`:

| Property         | Value             |
|------------------|-------------------|
| Background color | white             |
| Border           | 1px solid #dfe1e6 |
| Border bottom    | 0                 |
| Border radius    | 2 pixels          |
| Font weight      | Bold weight       |
| Line height      | 20 pixels         |
| Padding          | 10 pixels         |
| Margin           | 0 5px             |
| Text color       | #172b4d           |

Add a media query that applies to screens with widths _greater than_ 500 pixels.
Use flexbox to handle the layout of the children of `.tabbed-nav__group`. Make
sure they're aligned and centered.

Now, for the screens _less than or equal to_ 500 pixels wide, add a media query
that applies to that subfeature. In that media query, set the `display` of the
`.tabbed-nav__group` and any `.tabbed-nav__link` to "block". This will make the
tabs look stacked on small screens rather than horizontal on screens wider than
500 pixels.

## Phase 4: Use flexbox to create the boards

For the boards, there is a collection of ten images in the **board-backgrounds**
directory of the project. You can set the background image of each element
individually since each has a unique class on it. It will look something similar
to the following, though the images will differ.

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/flexbox/assets/trello-boards.png)

Set the following properties to the indicated values for the
`.boards__container`:

| Property      | Value       |
|---------------|-------------|
| Margin        | 0 auto      |
| Padding       | 32 pixels   |
| Maximum width | 1400 pixels |

The `.boards__container` should use flexbox, so set the `display` appropriately.
It should also have a horizontal flex direction and have wrapping enabled.

Set the following properties to the indicated values for the `.boards__sidebar`:

| Property         | Value            |
|------------------|------------------|
| Background color | #6C547B          |
| Border radius    | 3 pixels         |
| Margin           | 0 32px 32px 0    |
| Padding          | 0 20px 32px 20px |
| Maximum height   | 130 pixels       |
| Maximum width    | 180 pixels       |
| Width            | 20%              |

The `.boards__sidebar`, as a child in a flexbox layout, should indicate that it
should not grow or shrink. It should have a basis of 220 pixels.

The `.title` and `a` elements that are descendants of `.boards__sidebar-content`
should have white text color.

The `.description` elements that are descendants of  `.boards__sidebar-content`
should have light blue text color. (There is a named color for light blue.)

The `.boards__group` should also be a flexbox container that allows its child
elements to wrap. It should have a width of 80%.

Set the following properties to the indicated values for the `.boards__board`:

| Property         | Value      |
|------------------|------------|
| Background color | black      |
| Border radius    | 3 pixels   |
| Box sizing       | border box |
| Font weight      | bold font  |
| Height           | 100 pixels |
| Margin           | 0 8px 16px |
| Maximum width    | 250 pixels |
| Padding          | 4px 8px    |
| Position         | relative   |
| Text color       | white      |
| Width            | 25%        |

The `.boards__board` should also be a flexbox container with vertical layout. It
should justify its content to distribute leftover space between the children.


For medium- and large-sized screens, you want the `.boards__board` elements to
layout out with many of them in a row. Create a media query breakpoint for
screen sizes with widths greater than 750 pixels and less than or equal to 1280
pixels. For that break point, give each `.boards__board` a width of 33%.

For small-sized screens, you want the `.boards__board` elements to stack on top
of each other. To do that, create a media query breakpoint for screens less than
or equal to 750 pixels in width. For that break point, set the width of the
`.boards__board` elements to 100% and unset the maximum width setting.

[1]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[2]: https://trello.com
[3]: https://css-tricks.com/almanac/properties/o/opacity/
[4]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
[Font Awesome free icon search page]: https://fontawesome.com/icons?d=gallery&m=free

________________________________________________________________________________
# Project: Gridding Up A Page: Overview

CSS Grid is a powerful tool that gives us a lot of control over the layout of a
Web page. With the Grid, we no longer have to import external CSS libraries or
frameworks for layout. We can set up and fully customize a grid layout with
vanilla CSS.

There’s no better way to practice page layout than by going back to where it all
began -- the newspaper! Printed papers have been painstakingly laid out with
considerations of both limited space and limited attention spans. Some of these
layout and design principles have persisted from print to the Web -- for
examples, the term "above-the-fold" (above the literal page fold in print, and
the visible part of the screen before scrolling down online) and the concept of
CSS floats from text-wrapped images.

In this project, you’ll use CSS Grid to re-create THE LAYOUT ONLY of the columns
and rows of the overall structure, and then the layout inside each of the
sections of the layout. We’ve chosen to emulate the layout of the _The New York
Times_ for this project because the homepage is a complex series of rows and
columns, and it’s a prime use-case for a grid layout.

The project is broken up into three phases.

* In Phase 1, you'll create the main grid with 10 key sections of the page.
* In Phase 2, you'll use flexbox inside Section 1.
* In Phase 3, you'll create nested grids in Section 2 and Section 3.
* In Phase 4, you'll create the grids in the remainder of the Sections.

Clone the starter project found at
https://github.com/appacademy-starters/css-grid-nytimes. Inside that project,
you will find the following files.

* **grid-project.html** which contains the HTML that you will style using Grid
  layout
* **grid-project.css** which contains some basic CSS for the page and in which
  you will write your CSS
* **nyt-logo.svg** which contains the New York Times' logo.

Refer to your reading and resources like ["CSS Grid Layout"][1] (MDN Docs) or [
"A Complete Guide to Grid"][2] (CSS-Tricks) for guidance on setting up the grid
for your project.

When you are done, you will have a Web page similar to what you see in this
rather large screenshot.

![Full screenshot of solution](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/nyt-home-solution-screenshot.png)

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[2]: https://css-tricks.com/snippets/css/complete-guide-grid/

________________________________________________________________________________
# Gridding Up A Page: Phase One

Based on the large screenshot from before, you will need to set up a grid with
10 sections, i.e. "areas", which you’ll can refer to these labels in order of
appearance.

* **header** (Section 1)
* **main** (Section 2)
* **sidebar** (Section 3)
* **other-news** (Section 4)
* **smarter-living** (Section 5)
* **features** (Section 6)
* **discovery** (Section 7)
* **most-popular** (Section 8)
* **news** (Section 9)
* **footer** (Section 10)

The grid that you want to set up will have this layout

![Grid layout mockup](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/grid-project-mockup.svg)

Recall that you can set up grid areas by using the `grid-template-areas` and
`grid-area` properties. Now that we've set up the grid areas, let's add
`grid-template-areas` to the `grid__container` class.

```css
/* Main Grid Styles */

.grid__container {
  display: grid;
  grid-template-columns: /* Make the first column 2x wide as the second. */ ;
  grid-template-rows: auto;
  grid-template-areas:
    /* Fill in the appropriate grid areas here. */ ;
}

.grid__section {
  border: 1px solid #333333;
}

.grid__section-1 {
  grid-area: /* Fill this in. */ ;
}

.grid__section-2 {
  grid-area: /* Fill this in. */ ;
}

.grid__section-3 {
  grid-area: /* Fill this in. */ ;
}

.grid__section-4 {
  grid-area: /* Fill this in. */ ;
}

.grid__section-5 {
  grid-area: /* Fill this in. */ ;
}

.grid__section-6 {
  grid-area: /* Fill this in. */ ;
}

.grid__section-7 {
  grid-area: /* Fill this in. */ ;
}

.grid__section-8 {
  grid-area: /* Fill this in. */ ;
}

.grid__section-9 {
  grid-area: /* Fill this in. */ ;
}

.grid__section-10 {
  grid-area: /* Fill this in. */ ;
}
```

________________________________________________________________________________
# Gridding Up A Page: Phase Two

Did you know that you can combine CSS Grid with flexbox? Take a look at the
`header` (Section 1) in the grid. The items in that section appear as a row,
making it a good candidate for a one-dimensional flexbox container. We recommend
right-clicking the following image and viewing it in a new tab to take a closer
look.

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/nyt-home-1.png)

In your HTML file, you can find an element with the class name
`flex-container-1` in the `grid__section-1` DIV, as well as five children
`flex-items`.

```html
<div class="grid grid__container">
  <div class="grid__section grid__section-1 flex-container-1">
    <div class="flex__item flex__item-1">Flex 1</div>
    <div class="flex__item flex__item-2">Flex 2</div>
    <div class="flex__item flex__item-3">Flex 3</div>
    <div class="flex__item flex__item-4">Flex 4</div>
    <div class="flex__item flex__item-5">Flex 5</div>
  </div>
  ...
</div>
```

In your CSS file, style the div with the class `flex-container-1` so that it’s
an actual flex container and give it a height of `85px`. Style each `flex__item`
so that they appear inline. You want all five `flex__item` elements to fit into
a single row. To do that, you can use the `flex-grow` setting to set the
relative sizes so that they do that. The first three flex items,
`.flex__item-1`, `.flex__item-2`, and `.flex__item-3`, should be twice as
wide as the last two flex items, `.flex__item-4` and `.flex__item-5`.

```css
.flex-container-1 {
  display: /* Fill this in. */ ;
  height: 85px;
}

.flex__item {
  display: /* Fill this in. */ ;
  height: inherit;
}

.flex__item-1,
.flex__item-2,
.flex__item-3 {
  flex-grow: /* Fill this in to be twice as wide as the others */;
}

.flex__item-4,
.flex__item-5 {
  flex-grow: /* Fill this in to be half as wide as the others */;
}
```

________________________________________________________________________________
# Gridding Up A Page: Phase Three

Just like we can nest flexbox containers, we can also nest grid containers. Any
grid item can itself become a grid container with `display: grid`. You're going
to use this fact to layout the **main** and the **sidebar** areas of the HTML.

## Section 2

Make the **main** area (Section 2) of the grid a grid container. Make each one of
the nine items in the **main** area its own grid area.

We've added nine items in the `grid__section-2` DIV in your HTML file:

```html
<div class="grid grid__container">
  ...
  <div class="grid__section grid__section-2">
    <div class="grid__item grid__item-2-1">G2-1</div>
    <div class="grid__item grid__item-2-2">G2-2</div>
    <div class="grid__item grid__item-2-3">G2-3</div>
    <div class="grid__item grid__item-2-4">G2-4</div>
    <div class="grid__item grid__item-2-5">G2-5</div>
    <div class="grid__item grid__item-2-6">G2-6</div>
    <div class="grid__item grid__item-2-7">G2-7</div>
    <div class="grid__item grid__item-2-8">G2-8</div>
    <div class="grid__item grid__item-2-9">G2-9</div>
  </div>
  ...
</div>
```

You're going to make them look like this.

![Section 2 Full](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/grid-project-section-2-full-layout.png)

Set up the grid areas in your CSS file using the following naming convention.
Make sure to set up all nine of them.

```css
.grid__item-2-1 {
  grid-area: g2-1;
}

.grid__item-2-2 {
  grid-area: g2-2;
}

.grid__item-2-3 {
  grid-area: g2-3;
}

/* Set up the rest of the nine grid items. */
```

Set up your grid container for `grid__section-2` with _**five columns and seven
rows**_. This might be a good place to play with fractions by using the `fr`
unit.

Each grid item takes up a full row with a couple of exceptions: `grid__item-2`
shares a row with `grid__item-3`, and `grid__item-7` shares a row with
`grid__item-8`.

Create five columns of equal width. Set up `grid__item-2` and `grid__item-8` to
take up 2 / 5 of their row, and set up `grid__item-3` and `grid__item-7` to take
up the remaining 3 / 5 of the row.

```css
.grid__section-2 {
  display:  /* Fill this in. */ ;
  grid-template-columns: /* Make five columns of equal widths. */ ;
  grid-template-rows: /* Fill this in. */ ;
  grid-template-areas:
   /* Fill in the appropriate grid areas here. */ ;
}
```

There should be seven rows in your new grid. You may want to add background
colors to these so they are easier to see on the page.

Add heights to the grid items so that they approximate the heights on the NYT
homepage seen in the screenshots. Use these heights:

| Element           | Height     |
|-------------------|------------|
| `.grid__item-2-1` | 480 pixels |
| `.grid__item-2-2` | 200 pixels |
| `.grid__item-2-3` | 200 pixels |
| `.grid__item-2-4` | 150 pixels |
| `.grid__item-2-5` | 350 pixels |
| `.grid__item-2-6` | 480 pixels |
| `.grid__item-2-7` | 200 pixels |
| `.grid__item-2-8` | 200 pixels |
| `.grid__item-2-9` | 200 pixels |

At this point, add some border lines to help you see where the grid items start
and end.

```css
.flex__item,
.grid__item {
  border: 1px solid #333333;
}
```

## Section 3

Now, it's time to handle the **sidebar**. There are also seven items in the
`grid__section-3` DIV in your HTML file:

```html
<div class="grid__section grid__section-3">
  <div class="grid__item grid__item-3-1">G3-1</div>
  <div class="grid__item grid__item-3-2">G3-2</div>
  <div class="grid__item grid__item-3-3">G3-3</div>
  <div class="grid__item grid__item-3-4">G3-4</div>
  <div class="grid__item grid__item-3-5">G3-5</div>
  <div class="grid__item grid__item-3-6">G3-6</div>
  <div class="grid__item grid__item-3-7">G3-7</div>
</div>
```

You're going to make them look like this.

![Section 3 Layout](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/grid-project-section-3-full-layout.png)

Repeat the same process used above for `grid__section-2` to create another grid
inside `grid__section-3`. In the following grid, create two columns of equal
width. `.grid__item-3-3` will share a row with `.grid__item-3-4` and have equal
heights, while the other five grid items will take up one row each.

```css
/* Grid Section 3 Styles */

.grid__item-3-1 {
  grid-area: g3-1;
}

.grid__item-3-2 {
  grid-area: g3-2;
}

.grid__item-3-3 {
  grid-area: g3-3;
}

/* Set up the rest of the seven grid items. */

.grid__section-3 {
  display:  /* Fill this in. */ ;
  grid-template-columns: /* Make two columns of equal widths. */ ;
  grid-template-rows: /* Fill this in. */ ;
  grid-template-areas:
   /* Fill in the appropriate grid areas here. */ ;
}
```

Add heights to the grid items so that they approximate the heights on the NYT
homepage seen in the screenshots. Use these heights:

| Element           | Height     |
|-------------------|------------|
| `.grid__item-3-1` | 200 pixels |
| `.grid__item-3-2` | 290 pixels |
| `.grid__item-3-3` | 760 pixels |
| `.grid__item-3-4` | 760 pixels |
| `.grid__item-3-5` | 330 pixels |
| `.grid__item-3-6` | 240 pixels |
| `.grid__item-3-7` | 240 pixels |

________________________________________________________________________________
# Gridding Up A Page: Phase Four

Use your knowledge of both flexbox and CSS Grid, you can finish the layout for
all 10 areas of the main grid. Each section below contains the specifications
for you to finish it. You should be pretty familiar with the content of the
HTML file, now. For each of the sections below, you will be dealing with the
CSS class `.grid__section-«number»` where «number» is 4, 5, 6, etc.

## For Section 4 ("Other News")

- Set this section's height to 590px.
- Create a grid with 5 columns of equal width and 6 rows of equal width.
- Place the 9 grid items in the correct locations (see screenshot below).

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/nyt-home-3.png)

## For Section 5 ("Smarter Living")

- Set this section's height to 273px.
- Create a flex container that contains a row of items.
- Set the 5 items to be equal width so that they appear on the row, according to
  the screenshot (see screenshot below).

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/nyt-home-3.png)

## For Section 6 ("Features")

- Set this section's height to 712px.
- Create a grid with 6 columns of equal width and 2 rows of equal width.
- Place the 5 grid items in the correct locations (see screenshot below).

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/nyt-home-4.png)

## For Section 7 ("Discovery")

- Set this section's height to 400px.
- Create a grid with 7 columns of equal width and 2 rows of equal width.
- Place the 4 grid items in the correct locations (see screenshot below).

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/nyt-home-5.png)

## For Section 8 ("Most Popular")

- Set this section's height to 360px.
- Create a grid with 5 columns of equal width and 3 rows of equal width.
- Place the 6 grid items in the correct locations (see screenshot below).

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/nyt-home-5.png)

## For Section 9 ("News")

- Create a flex container that contains rows of items and allows items that
  don't fit to wrap to a new row.
- Set each one of the 17 items to have a height of 360px and width of 20%.
- The items in this section should flexibly fill their container, like in the
  screenshot below.

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/nyt-home-6.png)

## For Section 10 ("Footer")

- Set this section's height to 404px.
- Create a grid with 6 columns. The first 5 columns should be equal width, and
  the last column should be 213px wide. The grid should also be 3 rows of equal
  width.
- Place the 7 grid items in the correct locations (see screenshot below).

![](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/grid/assets/nyt-home-7.png)


## What you've done

You have just had a lot of practice figuring out how to make the Flexible Box
Model and Grid Layouts work. That is really a credit to you. Here's a link to
the solution file, if you want to take a look at it.

________________________________________________________________________________
# WEEK-09 DAY-5<br>*Interactivity, Maintainability &amp; AA Times* {ignore=true}
________________________________________________________________________________
# Interactivity Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

* Use the "hover" pseudo-class to be able to make changes to elements when the
  device pointer is over an element
* Describe and use the `transition` property show animated changes due to class
  and pseudo-class CSS rule application
* Describe and use the `overflow`, `overflow-x`, and `overflow-y` properties to
  effect clipping and scrolling on elementsjectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

* Use the "hover" pseudo-class to be able to make changes to elements when the
  device pointer is over an element
* Describe and use the `transition` property show animated changes due to class
  and pseudo-class CSS rule application
* Describe and use the `overflow`, `overflow-x`, and `overflow-y` properties to
  effect clipping and scrolling on elements

________________________________________________________________________________
# CSS Maintainability Learning Objectives

Below is a complete list of the terminal learning objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

When you are done with this, you will be able to

1. Describe what Block means in BEM
2. Describe what Element means in BEM.
3. Describe what Modifier means in BEM.
4. Identify CSS class names that follow the BEM principle.ing objectives for this lesson.
When you complete this lesson, you should be able to perform each of the
following objectives. These objectives capture how you may be evaluated on the
assessment for this lesson.

When you are done with this, you will be able to

1. Describe what Block means in BEM
2. Describe what Element means in BEM.
3. Describe what Modifier means in BEM.
4. Identify CSS class names that follow the BEM principle.

________________________________________________________________________________
# CSS Hover Effect And Handling Overflow

Styling is a fun part of the Web development process! We can do all sorts of
neat things with CSS to delight the user and also create a professional-looking
app. Beyond color and font styles, we could also add effects to elements that
signal page activity/interactivity to the user or make certain elements stand
out.

Since buttons are typically calls to action on a page, they are often styled to
grab the user’s attention and invite a click. In this reading, we’ll review how
to add a simple button effect on hover, but this can apply to _any_ element.

## Adding a button effect on hover

Before we can add styles, we need a button. So let’s set one up in an HTML file.
We’ll also need to link to a CSS file that we’ll call `button-styles.css`.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="button-styles.css" />
  </head>
  <body>
    <button class="btn btn--active">Hover on me!</button>
  </body>
</html>
```

Now we can style our button using a simple property called **[transform][1]**
with a **translateY** value:

```css
.btn {
  background-color: #00bfff;
  color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
}
.btn--active:hover {
  cursor: pointer;
  transform: translateY(-0.25rem); /* Moves our button up/down on the Y axis */
}
```

Adding `:hover` to the `.btn--active` class allowed us to create a hover effect.
Using `translateY()` moved the button up/down along the Y axis (vertically).
When a user hovers over the button it should move up, and when the user mouses
off the button it should move back down.

Check out this [CSS-Tricks doc on transform][1] to see other transformations we
could do on elements, as well as a list of browsers that support 2D and 3D
transforms.

## A note about browser support

If you open up your HTML file in a browser, right-click on the button and
inspect it, you should see a bunch of `button` styles from _user agent
stylesheet_. These are the default styles your browser has added to the `button`
element.

<img src="https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/browser-default-styles.png" width="50%">

If you don’t want any of these default styles on the button, you’ll have to
write override styles. Check this CSS-Tricks article ["Overriding Default Button
Styles"][2] for more information about default button styles across different
browsers.

It’s also a good idea to use a CSS library like [Normalize.css][3] to make sure
that element styles are rendered consistently across browsers. Once you’re done
styling an element or a page, open it up in different browsers and test for
expected behavior.

## Content overflow

What happens when you size an element to a width and height that can't hold all
of the content? By default, the browser will just show it all to you and, maybe,
mess up the way the page renders. To fix that, you can use the `overflow`
family of properties to specify how you want it to work.

There are four settings that the `overflow` family of properties can take.

| Setting | What it means                                                                               |
|---------|---------------------------------------------------------------------------------------------|
| visible | This is the default. It just lets you see everything, perhaps ruining the look of the page. |
| hidden  | This _clips_ the content. Anything beyond the boundary of the element is not visible.       |
| scroll  | _Always_ show a scroll bar, even if the content doesn't need one.                           |
| auto    | Only show a scroll bar if the content does overflow the available space.                    |

There are three members of the `overflow` family.

* `overflow-x`: Only apply the setting in a horizontal direction.
* `overflow-y`: Only apply the setting in a vertical direction.
* `overflow`:  Apply the setting to both the horizontal and vertical directions.

Check out [Examples of CSS Overflow] on CodePen to see those values in action.

## What we learned:

- How to create a hover effect
- How to use the transform property on elements
- Browser default styles and overriding them
- How the `overflow` family of properties handles overflow of text in an element

[1]: https://css-tricks.com/almanac/properties/t/transform/
[2]: https://css-tricks.com/overriding-default-button-styles/
[3]: https://necolas.github.io/normalize.css/
[Examples of CSS Overflow]: https://codepen.io/aa-academics/pen/jOPeNmp?editors=1100

________________________________________________________________________________
# CSS Transitions

CSS transitions provide a way to control animation speed when changing CSS
properties. Instead of having property changes take effect immediately, you can
cause the changes in a property to take place over a period of time. For
example, if you change the color of an element from white to black, usually the
change is instantaneous. With CSS transitions enabled, changes occur at time
intervals that follow an acceleration curve, all of which can be customized.

Animations that involve transitioning between two states are often called
implicit transitions as the states in between the start and final states are
implicitly defined by the browser.

CSS transitions let you decide which properties to animate (by listing them
explicitly), when the animation will start (by setting a delay), how long the
transition will last (by setting a duration), and how the transition will run
(by defining a timing function, e.g. linearly or quick at the beginning, slow at
the end).

## Defining transitions

CSS Transitions are controlled using the shorthand transition property. This is
the best way to configure transitions, as it makes it easier to avoid out of
sync parameters, which can be very frustrating to have to spend lots of time
debugging in CSS.

You can control the individual components of the transition with the following
sub-properties:

| Sub-property        | Definition                                                                                                                                                                                                                                   |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transition-property | Specifies the name or names of the CSS properties to which transitions should be applied. Only properties listed here are animated during transitions; changes to all other properties occur instantaneously as usual.                       |
| transition-duration | Specifies the duration over which transitions should occur. You can specify a single duration that applies to all properties during the transition, or multiple values to allow each property to transition over a different period of time. |
| transition-delay    | Defines how long to wait between the time a property is changed and the transition actually begins.                                                                                                                                          |

## Examples

This example performs a four-second font size transition with a two-second delay
between the time the user mouses over the element and the beginning of the
animation effect:

```css
#delay {
  font-size: 14px;
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
}

#delay:hover {
  font-size: 36px;
}
```

When the mouse hovers over it, after a delay of two seconds, a four-second
transition begins which changes the font size of the text from its normal size
to 36px.

![Simple transition example](https://assets.aaonline.io/Module-Solo-Prep-Work/assets/example-css-transition-simple.gif)

In the following, any element with the "box" class will have combined transitions
for: width, height, background-color, transform.

```css
.box {
    border-style: solid;
    border-width: 1px;
    display: block;
    width: 100px;
    height: 100px;
    background-color: #0000FF;
    transition: width 2s, height 2s, background-color 2s, transform 2s;
}

.box:hover {
    background-color: #FFCCCC;
    width: 200px;
    height: 200px;
    transform: rotate(180deg);
}
```

When the mouse hovers over a box, it spins due to the rotate transform. Its
width and height change. Its background color changes.

![Multiple transition example](https://assets.aaonline.io/Module-Solo-Prep-Work/assets/example-css-transition-multiple.gif)

You can interact with the hover effects controlled via CSS for both of these
demos by hovering over the text and boxes in the [Transition Examples CodePen].

[Transition Examples CodePen]: https://codepen.io/aa-academics/pen/jOPvzxb?editors=1100

## What can you affect with this?

You can't apply transitions to every CSS property there is. Here is the [list
of animatable CSS properties]. If it's not in that list, then you can't animate
it.

Glaringly absent from that list are any CSS properties that allow you to
position elements on a Web page, properties like `left` or `bottom`. The work
around is to animate the _margin_ of the element.

[list of animatable CSS properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties

________________________________________________________________________________
# Maintainability: Using the BEM Guidelines for CSS

Ah, CSS: where your code gets a style upgrade. As a developer, you can do a lot
with CSS to dress up your code, from using colors and background images to doing
fancy animations. It can be fun to play with CSS, using different tricks to get
your website content to stand out. However, there’s one aspect of CSS that is a
pain point for developers: naming conventions.

Bad, or loose, CSS naming conventions are rampant in the codebases of many
software development shops. Without guidelines to follow, engineers create their
own, often conflicting, naming standards. One engineer might use `sword-case`
for her CSS classes, while another might use `snake_case`. Another person on the
same team might, for inexplicable reasons, decide to use `camelCase`. The
mismatched standards make for code that isn’t easy to read and can lead to
confusion, errors, and extra time spent debugging or hunting for the correct
classes. In other words, complete anarchy!

## BEM Guidelines

To solve the problem of loose standards, reputable developers have created
guidelines by which all developers can abide. One of the most popular sets of
CSS conventions is [BEM][1], or the **"Block, Element, Modifier"** methodology.

## What is a Block?

According to [BEM][2], _a **Block** represents "a standalone entity that is
meaningful on its own."_

Rules for Blocks:

- Blocks can be nested and interact with each other, but they are semantically
  equal.
- Holistic entities without DOM representation (such as controllers or models)
  can be blocks.
- Block names may consist of Latin letters, digits, and dashes.
- Any DOM node can be a block if it accepts a class name.

Example Block:

**HTML**

```html
<div class=""block""></div>
```

**CSS**

```css
.block {
  color: red;
}
```

## What is an Element?

According to [BEM](http://getbem.com/naming/), _an **Element** represents "part
of a block and has **no** standalone meaning."_

Rules for Elements:

- Any element is semantically tied to its block.
- Element names may consist of Latin letters, digits, dashes and underscores.
- The CSS class is formed by using first the block name, plus two underscores,
  plus the element name: `.block__elem`
- Any DOM node within a block can be an element. Within a given block, all
  elements are semantically equal.
- In CSS, there should be no dependency on other blocks/elements on a page (i.e.
  the Element class should be used independently).

Example Element:

**HTML**

```html
<div class=""block"">
  <span class="block__elem"></span>
</div>
```

**Good CSS**

```css
.block__elem {
  color: red;
}
```

**Bad CSS (i.e. extraneous use of .block class and div element selector)**

```css
.block .block__elem {
  color: red;
}
div.block__elem {
  color: red;
}
```

## What is a Modifier?

According to [BEM][1], _a **Modifier** represents "a flag on blocks or elements.
Use them to change appearance, behavior or state."_

Rules for Modifiers:

- Modifier is an extra class name which you add to a block/element DOM
  node.(Examples: .button--_active_, .button\__text--\_red_)
- Add modifier classes only to blocks/elements they modify, and keep the
  original class (e.g. keep the class _.button_ and add _.button-active_).
- Modifier names may consist of Latin letters, digits, dashes and underscores.
- The CSS class is formed as block’s or element’s name plus two dashes:
  `.block--mod` OR `.block__elem--mod` AND `.block--color-red`. (_Spaces in
  complicated modifiers are replaced by dash._)

Example Modifier:

**Good HTML (i.e. keep original block class)**

```html
<div class="nav nav--dark">...</div>
<div class="nav__list-container nav__list-container--shadow">...</div>
```

**Bad HTML (i.e. remove original block class)**

```html
<div class="nav--dark">...</div>
```

**CSS**

```css
/* Use modifier class name as selector. */
.nav--dark {
}

/* Alter elements based on a block-level modifier. */
.nav--dark .nav__list-container {
}

/* Element modifier: */
.nav__list-container--shadow {
}
```

## BEM Example

Here is an example use case for BEM, straight from the [BEM guidelines][1]:

Suppose you have block `form` with modifiers `theme-xmas` and `simple` and with
elements `input` and `submit`, and element `submit` has its own modifier
`disabled` for not submitting the form while it is not filled:

**HTML**

```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input class="form__submit form__submit--disabled" type="submit" />
</form>
```

**CSS**

```css
/* block selector */
.form {
}

/* block modifier selector */
.form--theme-xmas {
}

/* block modifier selector */
.form--simple {
}

/* element selector */
.form__input {
}

/* element selector */
.form__submit {
}

/* element modifier selector */
.form__submit--disabled {
}
```

## What we learned:

- Developers use CSS guidelines, like BEM, to make their classes and styles more
  consistent.
- BEM stands for "Block, Element, Modifier".
- The definition of a Block and examples.
- The definition of an Element and examples.
- The definition of a Modifier and examples.

[1]: http://getbem.com/
[2]: http://getbem.com/naming/

________________________________________________________________________________
# Putting It Together

Tomorrow, you're going to put together what you've been studying in a less
structured way, where you will be called upon to apply your knowledge in total.
You're not going to learn anything new except, perhaps, some best practices and
pro-tips. Instead, you'll be _synthesizing_ what you've learned up to this
point. Review your work. Do your flash cards. Get some rest. Tomorrow, you have
to get with the cogitation.

________________________________________________________________________________
# Whack-A-Mole

This project ties together the CSS stuff that you've learned, so far this week:
positioning, hover effects, transitions, and overflow. When you're done, you
should have a nice Whack-a-Mole game that you can play and share with your
friends!

![Mole game screenshot]

## Getting started

To get started with this project, clone the starter repository from
https://github.com/appacademy-starters/responsive-design-whack-a-mole.

That starter repository contains the following files:

* **mole-head.png** which contains the image of the mole's head.
* **mole-hill.png** which contains the image of the dirt pile.
* **mole.css** which is the file in which you will write your CSS.
* **mole.html** which is the file in which you will write your HTML.
* **mole.js** which is the file in which you will write your JavaScript.

## Making a mountain out of a mole hill

That's not true. There are no mountains in this game.

The first challenge is to get the layout of an individual mole and its hill
correctly. You can see from the screenshot above that the dirt pile seems to be
_in front of_ the mole image. That means that there needs to be some kind of
_layering_ that needs to occur.

You may remember from the positioning reading, that when you absolutely position
an element, it removes it from the normal flow and puts it in a stack above the
other elements. Here is the screen shot that you previously saw where the pink
and blue boxes are absolutely positioned, taken out of the normal layout flow,
and stacked on top of one another.

![Absolutely positioned pink and blue boxes]

That's what you'd like to do with the mole head and the dirt pile. Here's an
orthogonal view of how the layers would look if you could look at the screen
from the side with the sizes of each of the elements shown.

![Mole head and hill layers]

Similarly to what you experienced in the positioning of the blue and pink boxes,
you want to create some kind of HTML element that contains the head and hill.
The parent element needs to have relative positioning. The elements that have
the head and hill need to be absolutely positioned.

Open up **mole.html** in VS Code. In the body, add a `div` element. Inside the
`div` element, create two image elements, one that uses **mole-head.png** as its
source and the other that uses **mole-hill.png** as its source. The image that
needs to be "on top" has to be the second one, so order matters here: first the
head image, then the hill image. (In case you forgot how to create an image
element, here's the [img documentation].)

Open up the **mole.html** file in your browser. If you did things right, your
page should look like this, right now. Just two images hanging out next to each
other.

![Mole images unstyled]

Now, it's time to get them properly "layered". After that, you will get them
positioned correctly so everything's properly lined up. To do this, you need
some CSS classes.

Following good maintainability standards, you need to come up with a name for
this Block that you're creating. It is meant to represent a whackable game
space. It contains a mole head and a dirt pile. The mole head and the dirt pile
have no standalone meaning, they exist inside this game space for a reason. If
they were outside the game space, then there existence would have another
meaning altogether. That means the mole head and dirt pile are Elements of the
Block. So, using BEM, you could create the following class names to represent
these HTML elements.

| Class name                             | BEM type | Reason for existing                                                   |
|----------------------------------------|----------|-----------------------------------------------------------------------|
| wgs (short for "whackable game space") | Block    | Used to encapsulate all of the things that are needed to whack a mole |
| wgs__mole-head                         | Element  | Used to target the mole head                                          |
| wgs__dirt-pile                         | Element  | Used to target the dirt pile                                          |

Using those (or whatever you dreamed up), add those classes to the appropriate
targets, the `div` and the two `img` elements.

Open up the **mole.css** file. Create three CSS rules, one for each of the
classes that you added to the elements. (Remember that a CSS rule is the
selector , the curly braces, and the properties to set.) Add "height",
"position", and "width" properties to each of the three rules setting them to
the indicated values in that layer diagram from above.

If you got that set up, it should look like this, now.

![Mole images layered]

That's great! There's some real layering going on, here! Now you need to do
some positioning. The following diagram shows you how things should be moved
around to fit properly into the space.

![Mole image dimensions]

It's important to note that when you move absolutely-positioned elements
horizontally within their parent elements, you don't have to specify _both_ the
right and left unless you want to do some weird stretching. The same goes for
vertically. You don't have to specify _both_ the top and the bottom. For the
dirt pile, for example, you can specify `bottom: 0;` which means you want the
image zero pixels away from the bottom _or_ you can specify `top: 262px;`
because you want the top to be 262 pixels from the top of the `wgs` div. Either
works. Once you have the top, left, bottom, _OR_ right values set for the mole
head and the dirt pile, you should end up with it looking like the image above.

![Mole images positioned]

If for some reason your images don't align like that with the numbers provided,
try adjusting the value that you used for the mole head to make it look correct
in your browser.

## Hiding the mole

Now that you have the mole aligned properly, you need to get it so the mole can
go down into its hole to hide from your whacker. In the **mole.html**, copy and
paste the `div` and its images so you have two moles and dirt piles on your Web
page. Because those `div` elements are "block" elements by default, they end up
on top of each other. Just to make it easier _for now_, set the `display`
property of the Block CSS class to "inline-block";

![Game spaces inline block]

You are going to make it so the mole head of the right image is hidden. You want
to hide it by moving it down so that it is visually vertically beneath the pile
of dirt. That is a perfect example of a BEM Modifier. Recall that a Modifier is
used to _change appearance, behavior, or state_. In this case, it changes the
state of the mole head by moving it "down into the ground".

You will want to animate this, eventually, so you can't just set the `top`
property, if you recall. The `top` and other placement specifiers cannot be
animated using CSS. Instead, you'll want to use the `margin-top` property to
"move" the image down by increasing the margin above the element.

Create a new CSS class named `wgs__mole-head--hidden` which indicates that this
is the "hidden state" Modifier for the "mole-head" Element of the "wgs" Block.
Add that class to the second mole head in your HTML. Then, create a CSS rule for
that CSS class. You want to move the top of the mole head all the way to the
bottom of the `div`, visually beneath the dirt pile. To do that, set the
`margin-top` property of the rule for `wgs__mole-head--hidden` to the height of
the Block. Once you do that and refresh your HTML page in the browser, it should
look like this.

![Unclipped mole head]

That looks good. It's now beneath the pile of dirt. But, because the overflow of
HTML elements is visible by default, you need to clip that overflow so that you
will _only_ see the content when its inside the rectangle described by the `div`
and not outside of it. This is where the `overflow` property comes into play.
Add the `overflow` property to your Block CSS class and hide the overflow
content. Once you do that, it should now look like this.

![Clipped mole head]

The mole head is still there. It's just that you've hidden anything outside of
the boundaries of the Block element. Because of that, it is now hidden.

## Animating the disappearing mole head

Now that you have that set up, it's time to add some animation to get that mole
head out of the way with some panache. All you have to do is set the
`transition` property of the Element CSS class for the mole head. Set it to
"margin-top" and give it a transition duration of 0.25 seconds. If you refresh
your screen, nothing will have seemed to change. That's because transitions only
affect when CSS property values _change_.

In previous examples, the values of CSS properties changed because you hovered
over an element or something cool like that. Changes to CSS property values can
also be triggered when JavaScript adds or removes a CSS class from an element.
That's what you'll do to see if everything is working.

To test it, remove the Modifier CSS class from the mole head image in the HTML.
Refresh the browser and make sure you can see both of the mole heads, now. Then
add the following JavaScript block to the **mole.js** file. If you used
different CSS class names in your code, adjust the code below to target the CSS
class names that you used.

```js
window.addEventListener('DOMContentLoaded', () => {

  setInterval(() => {
    const moleHeads = document.querySelectorAll('.wgs__mole-head');
    for (let moleHead of moleHeads) {
      moleHead.classList.toggle('wgs__mole-head--hidden');
    }
  }, 1000);

});
```

If everything worked correctly, you should now see this!

![Moles popping up and down]

When you get tired of looking at that, delete the JavaScript and continue.

## Making the playing field

The original screen shot had eight mole heads in two rows of four. Two rows.
Four columns. That sounds like a job for a specific kind of layout.

The playing field is another Block. Go ahead and put a `div` element _around_
the two `div` elements that you already have. Add a Block CSS class name to that
outer `div` element. (For the sake of this article, the BEM class used for it
will be "pf", short for "playing field".) Then, copy and paste six more of the
`wgs` Blocks in that outer `div`. When you refresh the page, you should now see
eight mole heads and dirt piles. You may have to scroll around to see them
because those images are kind of large.

You can fix that by going into your **mole.css** file and dividing all of the
widths, heights, lefts, bottoms, tops, rights, and margin tops by 2. For
example, the `width` property of the `wgs__dirt-pile` is set to 640 pixels. Just
divide that value by two (640 / 2 = 320), and set the `width` to that value. If
you have an odd number, when you divide it by two, just round it either way and
use that. When you refresh the screen, all of the visuals should just be half as big.

![Eight moles not in a grid]

Even though on your screen it may look like they're in two rows of four columns
each they're not. If you adjust the size of the window, the images will reflow
and end up in different places. Now, use CSS Grid Layout to make it so the eight
game spaces are appropriately laid out.

Set the `display` property of that outer `div` element's Block CSS Class to
"grid". (In this article, the name of that class is `pf`, short for "playing
field".) Because you're not doing any tricky spans in this layout, just define
the Grid Layout to have two rows and four columns.

![Eight moles in a grid]

**Note**: If you're working on a smaller screen and can't see all of the moles,
then cheat a little bit and add this to your CSS file. It'll zoom out the page
and make the moles smaller for you.

```css
/* Only add this if you have a hard time seeing
   all of the moles or you just want to try it
   out. */
body {
  zoom: 0.75;
}
```

## The game

Now that everything seems to be properly positioned and have the ability to
animate, it's time to get the game a working.

## Step 1: all moles are hidden at first

Go through the HTML and add to the mole head `img` elements the Modifier CSS
class that you created earlier.

![Empty playing field]

## Step 2: popping up moles

In the **mole.js** file, create a function named `popUpRandomMole`. It should

* select all of the mole head elements on the page (there should be eight) by
  maybe using `document.querySelectorAll()` or
  `document.getElementsByClassName()` (those return lists of elements)
* calculate a random number between zero and seven, inclusive
* use that random number as the index of the list that you got for the mole head
  elements
* remove the `--hidden` Modifier CSS class from the mole head element
* set a timeout for one second to call another function named `hideMole` with
  the mole head element that you already selected

Now, create a function named `hideMole` that takes one parameter. It should

* add the `--hidden` Modifier CSS class from the element passed in as an
  argument
* set a timeout for one second to call `popUpRandomMole`

Finally, add an event listener for the "DOMContentLoaded" event. In the event
handler, set a timeout zero seconds to call `popUpRandomMole`

Assuming you got that coded correctly, here's what you should now see.

![Moles randomly popping up]:

## Step 3: whack the mole

In the event handler that you have for the "DOMContentLoaded" event, select all
of the mole head elements on the page. For each one, add an event listener for
the "click" event. In that event handler, have it add back the `--hidden`
Modifier CSS class to the event object's target.

In `popUpRandomMole`, change the timeout value to call `hideMole` from one
second to three seconds. this should give you some time to actually "whack" a
mole.

When you refresh the page, the moles should wait around for three seconds before
automatically hiding. You should also be able to click a mole to make it hide
immediately.

## Step 4: marking a mole whacked

CSS classes aren't just for styling. They can also add meaning to an element
that you can then use later in your program. That's what you'll do in this
section.

In the click event handler that you have where you whack a mole, add _another_
class to the event's target. This is another Modifier CSS class to indicate the
state of the mole head as "whacked". Earlier, you created a Modifier class to
indicate that the mole head is hidden. In this article, it is named,
`wgs__mole-head--hidden`. A class to mean "whacked" could then be
`wgs__mole-head--whacked`. If you use that name, great! If you come up with your
own Modifier name, that's great, too! Either way, that's the name of the class
that you want to add to the event target in the "click" event handler.

Now that the whacked moles are marked, the `popUpRandomMole` function should
choose only moles that are _not_ marked with that `--whacked` Modifier class.
You may recall from your readings that there is a `not()` pseudo-selector
available to you. You want `popUpRandomMole` to select elements _with_
`wgs__mole-head` and _without_ `wgs__mole-head--whacked`. That's a compound
selector that looks like this.

```css
.wgs__mole-head:not(.wgs__mole-head--whacked)
```

Change out the simple selector in `popUpRandomMole` with that one.

Because that selector could now return anywhere between zero and eight mole
heads, you have to change the way that you generate your random number that
you'll use for your index. Instead of it being between zero and seven, you need
it to be between zero and the number of unwhacked moles returned in the list
returned by that selector. Once you update that, refresh your page. Whacked
moles stay whacked!

## Winning the game

If you play this, now, you will find that after you whack all eight moles, you
may get a JavaScript error. That's likely because the selector in
`popUpRandomMole` is returning an empty list because all of the moles are
whacked. Put a test after your code selects that list. If the list length is
zero, you won! Have it indicate that in some way and just exit the function.

## Bonus: fast and furious

Instead of "winning" the game by whacking all of the moles, make it score based.

Have the game only popup moles 30 times. You should keep track of the total
number of whacks from the player and display it as the score. With each
successful whack, make the amount of time the mole stays popped up shorter. Have
the moles stop popping up after 30 moles are shown and indicate that the game is
now over. (To do this, you'll have to stop marking the moles as whacked or
change the selector back to selecting all moles.)

Show a countdown of how many moles are left in the game. Show the player's
score. Style it so it doesn't look bad with your CSS super powers.

Align the game spaces in the grid so that they're centered within their own
column.

Here's an example of what that would look like.

![Final game movie]


[Mole game screenshot]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/whack-a-mole-2.png
[Mole head and hill]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-hill-top-down.png
[Mole head and hill layers]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-hill-layers.png
[Absolutely positioned pink and blue boxes]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/absolute-blue-box.png
[img documentation]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img
[Mole images unstyled]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-images-unstyled.png
[Mole images layered]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-images-layered.png
[Mole image dimensions]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-hill-top-down.png
[Mole images positioned]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-images-positioned.png
[Game spaces inline block]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/games-spaces-inline-block.png
[Unclipped mole head]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-head-beneath-dirt-pile-unclipped.png
[Clipped mole head]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-head-beneath-dirt-pile-clipped.png
[Moles popping up and down]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/moles-popping-up-and-down.gif
[Eight moles not in a grid]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-playing-field-of-eight.png
[Eight moles in a grid]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-playing-field-in-grid.png
[Empty playing field]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-game-1.png
[Moles randomly popping up]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/moles-randomly-popping-up.gif
[Final game movie]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/moles-bonus-final.gif

________________________________________________________________________________
# Responsive Design Project - The App Academy Times

It's now time to put the responsive design content that you've learned, this
week, together with event handling and selection that you have previously
learned, to make a compelling and pleasing Web page! You're going to get to
build this from the ground up with the same type of input that you'd get in a
real job. On each step, talk with your pair, decide now you want to attack the
problem, and get coding!

When working as a full-stack developer, you'll often collaborate with a
designer. Most likely they will provide you with a sequence of screenshots and
specifications for you to convert into neat, maintainable HTML and CSS.

![aa-times-large][aa-times-large]

They will often provide you screenshots of what the website will look like at
specific sizes as well. For example below is what the website should look like
at 1020px:

![aa-times-medium][aa-times-medium]

Here is a screenshot of an even narrower version of the site for windows less
than 1020px wide:

![aa-times-small][aa-times-small]

This project is similar to that experience, in that you will receive
requirements for each section of the page. Then, it's up to you and your pair to
write the HTML, CSS, and smattering of JavaScript to make it do what you need it
to do. Each step of the way will give you the requirements for the section that
you'll work on. There will also be guidance and suggestions for you so that you
can get some hints, if you need.

Though this is a big project, you'll do it step-by-step. As a developer, that's
what you do: take big projects and break them down into smaller pieces that you
can accomplish piece-by-piece. There will be a lot of advice given during this
project so you can get a feel for how to go about doing each of the steps.

## AN IMPORTANT NOTE

This project is not about reproducing the mockups with each pixel perfectly
matching the screenshots. It should be _in the spirit_ of the specifications.
So, don't stress out if it doesn't exactly match what you see. A little
variation is ok.

## The starter project

Download the starter project from the repository on GitHub at
https://github.com/appacademy-starters/responsive-design-aa-times. The files
that you download look like this. Each directory and file that contains content
is noted in the following tree.

```plaintext
index.html
/images - Contains the images for the project
/scripts
  └── home-page.js - Event handling for the page
/specifications
  └── /text - Contains the text for the Web page
  └── /screenshots - Contains what each step looks like
/stylesheets
  └── global.css - Adds global styles
  └── home-page.css - Layout for the "home page"
  └── main-styles.css - Puts together all the styles
  └── reset.css - Utility to "fix" browsers
  └── components - Separate files for each component
      ├── gear-dropdown.css
      ├── interest-links.css
      ├── main-content.css
      ├── main-nav.css
      ├── masthead.css
      ├── search-modal.css
      ├── sections-nav.css
      └── sections-sidebar.css
```

## The code files

The following sections explain in more detail the purpose of each file.

### The index.html file

This is where you will put the HTML that will define the content and structure
of the Web page. Right now, it's empty. In the first step, you'll start adding
to it.

### The home-page.js file

This file will contain the home-page specific event handling that will drive
some of the interactivity of the Web page. Right now, it's empty. You'll start
adding to it in step 4.

### The home-page.css file

This file will contain the overall structure of the "home page" of the Web site
that you're building, here. Right now, it's empty. In the first step, you'll
use Emmet to add standard HTML 5 structure to this file. Then, you'll add the
most common top-level structural elements, too: `header`, `main`, and `footer`.


### The main-styles.css file

You shouldn't have to make changes to this file.

Inside **main-styles.css**, there are a series of `@import` statements that load
the various CSS files in the project. You do this so that you don't have to go
searching through a file that has thousands of lines of CSS in it. This way,
when you work on a section of content on your team, each person can work in
their own file, if need be, without causing a huge mess.

```css
@import url("reset.css");
@import url("global.css");
@import url("home-page.css");

@import url("components/gear_dropdown.css");
@import url("components/main_content.css");
@import url("components/main_nav.css");
@import url("components/masthead.css");
@import url("components/search_modal.css");
@import url("components/sections_nav.css");
@import url("components/sections_sidebar.css");
@import url("components/interest_links.css");
```

The order of the first three imports is _very_ important. Those affect styles
for the entire Web page and work in conjunction with one another, layering
changes so you can have the correct basic palette with which to work.

You should be able to list the imports from the components subdirectory in any
order that you like. The CSS rules in those files should contain BEM-compliant
CSS class names. Because they use BEM, you won't have to worry about CSS class
names clashing with one another. This is one of the main reasons Web developers
use BEM.

Just as a reminder, BEM is Block, Element, Modifier. Don't forget the double
underscores and dashes when naming your classes.

### The reset.css file

Quite often, you will want to use what's known as a "reset" file to remove all
of the quirky, inconsistent default styles that browsers add to Web pages. If
you performed a search for "CSS reset files", you will find many articles and
versions of them. This project already includes one for you.

Whenever you choose to use a CSS reset file, it is _vitally_ important that you
include it as the first one of your `@import` statements. If you don't do that,
then all of the hard work that you put into making things look better can get
erased by the reset file if it comes after yours in the order of imports.
Remember that CSS specificity will always choose the last rule read for rules
that have the same specificity. So, it's important to have it first so that
_your_ CSS comes after.

## The specifications directory

The **specifications** directory contains files similar to what you would get
from a Web designer. Those files are organized into two subdirectories for you.

The **screenshots** subdirectory contains the screenshots of the entire project
that you saw at the beginning of this page. It also contains the screenshots
that you will use in each of the steps of this project so that you can have
them locally.

The **text** subdirectory contains all of the text that you see on the Web page.
This way, you can just copy and paste it into the HTML as you develop the page.

Also in the **text** directory is a Markdown file named **styles.md**. This file
contains a list of the colors, external resources, font families, global styles,
and measurements that you will use during this project.

**An important note**: You may want to keep your DevTools open and the _Disable
Cache_ checkbox **checked**. This will guarantee that changes to your CSS files
are loaded by the browser every time you refresh it. You can open your Chrome
DevTools on Windows by pressing F12 or Control+Shift+I. You can open Chrome
DevTools on macOS by pressing Command+Option+I. Then, go to the Network pane and
make sure the "Disable cache" checkbox is checked. **Keep your DevTools open!**

![disable cache]

Good luck! It's time to go to step 1!

[aa-times-small]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/1000px-mobile-aa-times.png
[aa-times-medium]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/1020px-aa-times.png
[aa-times-large]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/1230px-full-aa-times.png
[disable cache]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/devtools-enable-cache.png

________________________________________________________________________________
# The Masthead

![masthead][masthead]

In this first step, you will start with the HTML to create the masthead that you
see in the screenshot above. This screenshot is available for you to open and
refer to in **specifications/screenshots/masthead.png**. You may want to open it
and keep it around to refer to while you're working.

## Strategy: creating Web pages from mockups

In general, creating actual HTML from some image, mockup, or sketch, consists of
breaking the content into the rectangles that bound each visible section. Then,
you figure out how you can achieve that layout based on the technology available
to you and what you know.

Because HTML is a top-to-bottom kind of display, normally, it is nice to look
and see if you can spot different rows. Then, once you have the rows figured
out, you split them into columns to determine how to layout the elements. If
they form a nice grid (or grid-ish), then you should use the CSS Grid layout. If
they don't, then you should use block elements that contain sub-sections that
use the CSS Grid layout or the Flexible Box Model (flexbox).

Take a look at the masthead above to see if you can see rows of content. It
seems that there are three or four rows. When in doubt, start with the fewest
number of rows and, if that doesn't work, add more.

![masthead with rows]

Now, looking at each of the columns, it may or may not appear that the columns
are the same. If you can find common places to draw vertical lines across
all rows, then you're in luck and can use CSS Grid Layout which is, usually, the
easiest of the layouts to use.

![masthead with rows and columns]

As you get more and more experience with this type of visual decomposition, this
type of analysis will become second-nature to you. When you're starting out,
though, it really can help to have real-life print-outs of these mockups so that
you can draw the rows and columns as you see fit

To get started making those rows, it's time to open the **index.html** and start
filling it in.

## Pro-tip: using Emmet

Open **index.html** in Visual Studio Code. It's a nice empty file just waiting
for you to put code in it. Visual Studio Code comes with a nice code completion
feature named _Emmet_ that has good built-in templates. Try typing just "html"
in that file (without the quotation marks). You should see a drop down that
suggests different types of completion.

![emmet html5 completion]

Either click the one that reads "html:5" with your mouse, or select "html:5"
from the dropdown using your arrow keys, and press Return (or Enter, whatever
is on your computer). When you do that, it inserts the following code into
your text editor for you!

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

Please change the title of the document to "App Academy Times". Now, you're
ready to figure out that structure.

In the head, link in the **main-styles.css** file. Don't forget to set the "rel"
attribute to "stylesheet", otherwise the browser won't treat the CSS as CSS.
If you don't get the value for the "href" property correct, it won't correctly
load the style sheet and your styles won't show up. Take a moment to make sure
it's loading properly. In your DevTools (they should be open), make sure you
still have the Network tab chosen. Refresh your page. If you see a 200 next to
the entry, then it's loading just fine! Great job!

If you see that you are getting a 404 for **main-styles.css** in the list of
files loaded, then you should know what that means: Not Found. The value for the
"href" property needs to be _relative_ to the current page.

Most Web pages have a page header section, a main section, and a footer section.
It doesn't hurt to always put those in there so that you can structure your
documents so that everyone knows that's what's there. Luckily, HTML gives you
those three tags to use: `header`, `main`, and `footer`. Go ahead and put those
in the body of your document as _siblings_ to one another.

```html
<header></header>
<main></main>
<footer></footer>
```

While an HTML document should ever have one and only one `main` element, the
`header` and `footer` elements can appear elsewhere in the document, usually in
`section` tags where sections have some kind of header or footer. But, when the
`header` and `footer` are direct children of the `body` tag, that implies that
they are the `header` and `footer` for the entire document.

In the **global.css** file, set the maximum width for the `header`, `footer`,
and `main` elements to be 1400 pixels per the measurement in the **styles.md**
file. Also, set `margin` to "auto" so that they center within the body. Finally,
set some horizontal padding of 40px on the left and right.

The `body` element should use "arial, helvetica, sans-serif" as its font family
with a line height of "1em". You can set that latter property using the
`line-height` property. Put those settings in the **global.css** file, too.

## Three rows, three columns, one masthead

The masthead is in the header of the document. That means that structure that
you'll put into place will go in the `header` element. There are nine regions.
Content is in the four corners and the two lower center regions. A nice way to
approach this is to start with the structure that puts things in their right
places. After you get those in place, you can start filling it in with the
correct words and images.

First, structure. In the `header` element, create a `div` element with the BEM
class "masthead." Then, create six child `div` elements inside `.masthead`.
These six elements will contain the content of each of the six regions that have
content. Put some unique text in each of them to figure out which of the blocks
they are with respect to the content you see in the screenshot. Perhaps you
could have something like this:

```html
<div class="masthead">
  <div>menu and search</div>
  <div>action buttons</div>
  <div>little technologies</div>
  <div>date</div>
  <div>logo</div>
  <div>today's paper</div>
</div>
```

If you open your **index.html** in your browser, you should just see six lines
of very plain text.

> Pro tip: When trying to get a layout to look correct when you don't have
> any content to show, you can use a tool like the Chrome extension [pesticide]
> to show you the borders of your elements without interfering with your
> actual layout.

Now, open the **masthead.css** file. In there, create a CSS rule for the
elements with the "masthead" class that sets its display to use CSS grid layout
and declares a grid with three equally-sized columns. Refresh your page. The
six lines of text should now layout as two rows of three equally-sized columns.

If you forgot how to do this, you can use fr(actional units) from the CSS Grid
Layout standard.

![six regions in two rows]

(Ignore any difference in font families at this stage.)

It's now time to get them into three rows and in the correct positions.

Add BEM classes to each of the six child `div` elements of `.masthead`. Each of
these is an Element of the "masthead" Block, so name them accordingly with
double underscores between the Block and Element names. For example, the
solution uses the following class names for the six regions. However, you should
feel empowered to name them to whatever makes sense to you and your pair!

* masthead__menu-and-search
* masthead__actions
* masthead__technologies
* masthead__date
* masthead__logo
* masthead__paper

Once you have those properly labeled, go back to the **masthead.css** file.
Create CSS rules for the six new classes. In each of them, put the correct
`grid-column-start` and `grid-row-start` properties to position them correctly
across the grid.

![six regions in three rows]

Don't forget we are trying to end up with this layout:

![masthead with rows and columns]

Note that these instructions did not tell you to define in the CSS how many rows
are in the grid of the masthead. That's because the CSS Grid Layout will add
rows automatically for you.

With this, you have the masthead layout correct. Now, it's just time to put some
content in there and style it accordingly.

## The menu and search icons

These two icons are from the Font Awesome library. To include that, you need to
add another `link` to the `head` element that will import the Font Awesome
stylesheet. The URL to use is in the **specifications/text/styles.md** file.

It's generally good practice to place the `link` elements that load third-party
resources _before_ the `link` elements that load your own stylesheets. This
prevents some other style from inadvertently overriding yours.

Once you have that linked in there, replace the words "menu and search" of the
div that appears in the upper-left corner with the following HTML.

```html
<div>
  <i class="fa fa-bars"></i>
</div>
<div>
  <i class="fa fa-search"></i>
</div>
```

That will get rid of the words and show the icons.

To style those icons, Font Awesome recommends that you wrap them in your
elements and, then, apply styles to those elements that you wrap them in. That's
why those `div` elements are there. Both of these elements are going to be
clickable icons in your masthead. Because of that, you should come up with a new
CSS class following BEM rules for masthead button icons. Add that class to both
of the `div` elements surrounding the icons. Here are the specifications for
masthead button icons. If you forgot about how to set padding (because there's
at least four ways to do it), here's the [link to padding] on MDN.

| Property                   | Value                                                 |
|----------------------------|-------------------------------------------------------|
| Font size                  | 11 pixels                                             |
| Horizontal padding         | 9 pixels left and right                               |
| Vertical padding           | 7 pixels top and bottom                               |
| **Hover** background color | lightest gray (refer to **styles.md** for this value) |

Once you set those for the new CSS class, your icons should look fancy.

Make sure you note that our background color should only appear when
you hover over the icons.

What you need to do is layout the `div` elements in a row. You can do that by setting
their `display` property to "inline-block" or by setting the parent `div`
element's `display` property to "flex". The solution uses the "flexbox" version.
Since we want the buttons to align in the middle of this div you might consider
using `align-items` to center them vertically if you are using "flexbox".

Finally, add 20 pixels of padding to the left of the `div` element that contains
the icons.

![masthead menu and search icons]

If you're having a hard time with some of that, here's the HTML from the
solution:

```html
<div class="masthead">
  <div class="masthead__menu-and-search">
    <div class="masthead__icon-button">
      <i class="fa fa-bars"></i>
    </div>
    <div class="masthead__icon-button">
      <i class="fa fa-search"></i>
    </div>
  </div>
  <div class="masthead__actions">action buttons</div>
  <div class="masthead__technologies">little technologies</div>
  <div class="masthead__date">date</div>
  <div class="masthead__logo">logo</div>
  <div class="masthead__paper">today's paper</div>
</div>
```

If you're still having a hard time, here's the CSS from the solution for this
stage:

```css
.masthead {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.masthead__actions {
  grid-column-start: 3;
}

.masthead__date {
  grid-row-start: 3;
}

.masthead__icon-button {
  font-size: 11px;
  padding: 7px 9px;
}

.masthead__icon-button:hover {
  background-color: #f7f7f5;
}

.masthead__logo {
  grid-column-start: 2;
  grid-row-start: 3;
}

.masthead__menu-and-search {
  display: flex;
  padding-left: 20px;
}

.masthead__paper {
  grid-column-start: 3;
  grid-row-start: 3;
}

.masthead__technologies {
  grid-column-start: 2;
  grid-row-start: 2;
}
```

## The action buttons (upper right corner)

All buttons on this Web page have a common style. The specification for them is
in the **style.md** file. Create a rule for the `button` selector in the
**global.css** file and make it match the specifications in **style.md**.

The content for the upper right corner is three elements:

* a button with the text "Subscribe Now"
* a button with the text "Log In"
* a masthead icon button with the Font Awesome icon `<i class="fas fa-cog"></i>` (Remember to use the same markup you used for the other icons on the left side of the masthead)

Once you add that, you should be able to refresh the page and see the three
elements!

Use flexbox to get those three elements into a row and aligned right. Remember
that when you "justify content" in a flexbox container, you don't use directions
like "left" and "right"; instead, you use "flex-start" and "flex-end". Also
these icons should be vertically centered too, so you should use the same
`align-items` as you did on the other masthead icons.

![masthead action buttons]

## Fix the height of the first row

When compared to the specification, there is missing padding above and below
the buttons we just added. Setting the height of either `div` element that
contains the buttons should change the height of the entire row. You could also
add padding to one or both of the `div` elements. Because they are part of a grid,
setting the height of one affects the other. Try out different amounts until it
looks right to you and matches the specification.

## The little technology text

In the `div` that's in the center of the grid, put another `div` element that
contains four `span` elements containing the text "CSS", "HTML", "JavaScript",
and "Python." Add some BEM classes to these new elements so that you can make
the text transform to upper case, have a font size of 10 pixels, and have a text
color of dark gray (refer to **styles.md** for the actual hexadecimal value).
Put some margin between the `span` elements to space out the words nicely. Make
sure it's all centered.

You'll come back later to add the fancy little border over the top of the words.

The solution has this code for the HTML in the "little technologies" block:

```html
<div class="masthead__technologies">
  <div class="masthead__technology-list">
    <span class="masthead__technology">CSS</span>
    <span class="masthead__technology">HTML</span>
    <span class="masthead__technology">JavaScript</span>
    <span class="masthead__technology">Python</span>
  </div>
</div>
```

and this CSS for those BEM classes:

```css
.masthead__technologies {
  grid-column-start: 2;
  grid-row-start: 2;
  text-align: center;
}

.masthead__technology {
  margin: 0 4px;
}

.masthead__technology-list {
  color: #6f6f6f;
  font-size: 10px;
  text-transform: uppercase;
}
```

## The last row

Put the logo in the middle of the bottom row with an `img` element. The image is
in the **images/** directory. Use flexbox or `text-align` to center it in the middle.

In the bottom-left corner, put the date in there. You can get the text from the
**specifications/text/01_masthead.txt** file. Or, you can just type it in there.

In the bottom-right corner, put the content `<i class="far fa-newspaper"></i>
Today's Paper`.

The text in the two bottom corners should be 11 pixels high.

The CSS Grid Layout has vertically stretched the `div` elements in the bottom
row. For the two in the bottom corners, set the `display` property to "flex."
Then, use `align-items` to get them to the bottom of the element using the
"flex-end" setting. For the `div` that contains the text "Today's Paper", have
it justify its content to "flex-end." That should do that part.

Finally, it seems that the third row needs some more height to push it away from
the little technology words. Add some padding to the top of the `div` element
that contains the logo.

![masthead nearly finished]

Here's just the CSS from the solution for the elements across the bottom row:

```css
.masthead__date {
  align-items: flex-end;
  display: flex;
  font-size: 11px;
  grid-row-start: 3;
}

.masthead__logo {
  grid-column-start: 2;
  grid-row-start: 3;
  padding-top: 20px;
  text-align: center;
}

.masthead__paper {
  align-items: flex-end;
  display: flex;
  font-size: 11px;
  justify-content: flex-end;
  grid-column-start: 3;
  grid-row-start: 3;
}
```

## The cute little borders

For the three elements that run across the bottom of the grid, add a 1 pixel
border on the bottom of those elements with the light gray color (refer to
**style.md** for the actual hexadecimal value). This step reveals that there
needs to be some padding between the text in the bottom corners and the line. It
also shows that there needs to be a little more padding between the logo and the
line. Add that padding to the correct `div` elements that fill those regions.
The solution applies 11 pixels of padding to the bottom of the `div` elements
along the bottom row.

For those same elements, apply a border to the top of those elements with the
same size, color, and style.

![masthead borders nearly done]

Here's the CSS from the solution for them with the borders, too:

```css
.masthead__date {
  align-items: flex-end;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  display: flex;
  font-size: 11px;
  grid-row-start: 3;
  padding-bottom: 11px;
}

.masthead__logo {
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  grid-column-start: 2;
  grid-row-start: 3;
  padding-bottom: 11px;
  padding-top: 20px;
  text-align: center;
}

.masthead__paper {
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  align-items: flex-end;
  display: flex;
  font-size: 11px;
  justify-content: flex-end;
  grid-column-start: 3;
  grid-row-start: 3;
  padding-bottom: 11px;
}
```

To the `div` element that contains the four technology words, apply a border
to the top, left, and right of it with the same style that you added in the
previous two steps. Right now, that `div` spans the entire width of its parent
element. On the parent element, apply a flexbox layout and justify the content
to the center.

![masthead border riser nearly done]

This is _so_ very close! In case you don't have that, here's the CSS for it:

```css
.masthead__technologies {
  display: flex;
  grid-column-start: 2;
  grid-row-start: 2;
  justify-content: center;
  text-align: center;
}

.masthead__technology {
  margin: 0 4px;
}

.masthead__technology-list {
  border-left: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  color: #6f6f6f;
  font-size: 10px;
  text-transform: uppercase;
}
```

All you have to do is nudge that `div` down by one pixel. You can do that with
relative positioning! (You'll also need to set the background color to white so
that it correctly covers the border line beneath it.) And, that's it! Masthead
complete!

![masthead complete]

Now, it's on to the next step!

Below is the solution's HTML and CSS at this stage. Mind you, this is not the
_only_ way to do it. It is just _one way_ to do it. Your BEM naming, structure,
and styles may differ from this. That's great!

One thing to note, though, is the neatness an maintainability of the HTML and CSS.
The HTML is indented consistently. Spacing is applied consistently. The code is
fairly terse.

```html
<div class="masthead">
  <div class="masthead__menu-and-search">
    <div class="masthead__icon-button">
      <i class="fa fa-bars"></i>
    </div>
    <div class="masthead__icon-button">
      <i class="fa fa-search"></i>
    </div>
  </div>
  <div class="masthead__actions">
    <button>Subscribe Now</button>
    <button>Log In</button>
    <div class="masthead__icon-button">
      <i class="fas fa-cog"></i>
    </div>
  </div>
  <div class="masthead__technologies">
    <div class="masthead__technology-list">
      <span class="masthead__technology">CSS</span>
      <span class="masthead__technology">HTML</span>
      <span class="masthead__technology">JavaScript</span>
      <span class="masthead__technology">Python</span>
    </div>
  </div>
  <div class="masthead__date">
    Tuesday, October 31, 2019
  </div>
  <div class="masthead__logo">
    <img src="./images/AA_Times_Logo.png">
  </div>
  <div class="masthead__paper">
    <i class="far fa-newspaper"></i> Today's Paper
  </div>
</div>
```

Here, you see the CSS. Note how it is consistently indented and aligned. Note
that the properties in each of the rules are in alphabetical order. These little
things make huge differences later for maintainability. Try to be neat with your
programming.

```css
.masthead {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.masthead__actions {
  display: flex;
  grid-column-start: 3;
  height: 50px;
  align-items: center;
  justify-content: flex-end;
}

.masthead__date {
  align-items: flex-end;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  display: flex;
  font-size: 11px;
  grid-row-start: 3;
  padding-bottom: 11px;
}

.masthead__icon-button {
  font-size: 11px;
  padding: 7px 9px;
}

.masthead__icon-button:hover {
  background-color: #f7f7f5;
}

.masthead__logo {
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  grid-column-start: 2;
  grid-row-start: 3;
  padding-bottom: 11px;
  padding-top: 20px;
  text-align: center;
}

.masthead__menu-and-search {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.masthead__paper {
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  align-items: flex-end;
  display: flex;
  font-size: 11px;
  justify-content: flex-end;
  grid-column-start: 3;
  grid-row-start: 3;
  padding-bottom: 11px;
}

.masthead__technologies {
  display: flex;
  grid-column-start: 2;
  grid-row-start: 2;
  justify-content: center;
  text-align: center;
}

.masthead__technology {
  margin: 0 4px;
}

.masthead__technology-list {
  background-color: white;
  border-left: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  color: #6f6f6f;
  font-size: 10px;
  position: relative;
  text-transform: uppercase;
  top: 1px;
}
```

[masthead]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead.png
[masthead with rows]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead-marked-with-rows.png
[masthead with rows and columns]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead-marked-with-rows-and-columns.png
[emmet html5 completion]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/visual-studio-code-emmet-html5.png
[six regions in two rows]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/six-regions-in-two-rows.png
[six regions in three rows]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/six-regions-in-three-rows.png
[masthead menu and search icons]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead-menu-and-search-icons.png
[masthead action buttons]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead-action-buttons.png
[masthead nearly finished]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead-nearly-finished.png
[masthead borders nearly done]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead-borders-nearly-done.png
[masthead border riser nearly done]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead-border-riser-almost-done.png
[masthead complete]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead-complete.png
[pesticide]: https://chrome.google.com/webstore/detail/pesticide-for-chrome/bblbgcheenepgnnajgfpiicnbbdmmooh
[link to padding]: https://developer.mozilla.org/en-US/docs/Web/CSS/padding

________________________________________________________________________________
# The Main Navigation

![masthead-with-sections]

This is just a series of words centered and spaced beneath the masthead that you
just created. This should, hopefully, be something that you can conquer without
too much trouble.

## Some tips from industry

It has become fairly prevalent in the Web-programming world to use `ul` elements
when creating navigation. Say that your Web site has four main navigation links,
"Products", "Services", "About", "Contact Us". Then, you will likely see
something similar to this in the HTML for those links with some CSS to style
it appropriately.

```html
<nav class="main">
  <ul>
    <li><a href="/products">Products</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact Us</a></li>
  </ul>
</nav>
```

Your CSS reset already helps out a lot if you choose to mimic that structure. It
has removed the "bullet points" from `ul` elements. It has removed margin and
padding from the `ul` elements, too. The one thing it does not do is change the
way it gets laid out which, by default, is like a list! It'll look like a list!

```
Products
Services
About
Contact Us
```

What Web programmers will do is add a class to the `ul` element and the `li`
elements. Then, they'll use flexbox (or something) to change the way the `ul`
lays out its contents, in a row rather than in a column.

Since you're using BEM, you'll want to BEM up those `ul`, `li`, and possibly
`a` elements so that you can correctly apply styles to them.

You're encouraged to try to mimic this HTML and CSS so that you can follow best
practices.

## More tips

Here are some tips about how to do it.

* Put all of your styles in the **main-nav.css** file inside
  **stylesheets/components**
* The text for the navigation items is 12 pixels tall
* The text for all of these links is in **02_sections_nav.txt** inside the
  **specifications/text** directory

Whenever you apply a style, make sure you use the BEM naming convention.

![main-nav]

[masthead-with-sections]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/masthead-with-sections.png
[main-nav]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/main-nav.png

________________________________________________________________________________
# Interest Links

![interests bar]

This poses an interesting problem, these so-called "interest links". At first
glance, you may see only five columns:

* Dog Programmers
* Cats and Coding
* Plugging stuff in
* Some stock quotes?
* The weather

However, once you start applying the rules of rows and columns, you can go beyond
just five columns. You can see that there are nine columns: image, text, image,
text, image, text, text, image, text!

![interests bar marked up]

So, that's nine columns and one row. This is a candidate for either flexbox or
CSS Grid Layout. When it comes down to it, CSS Grid Layout has a nicer syntax
for declaring column widths. They appear to have the following relative sizes:
1, 2, 1, 2, 1, 2, 2, 1, 0.75. You can use those to define the column widths of
your grid. Or, if you don't like that weird 0.75 hanging out there, change it to
a 1. If you think it looks better, go with your gut!

Now, look deeper into each of the sections. You can see that there is a lot of
similarity between position, layout, and style of the images and words.

![interests bar subclasses shown]

With it highlighted like this, you can see that all of the images essentially
share the same size and position. You can see all of the headlines and teasers
have the same styling and layout. You can see that the fake stock prices all
have similar layouts. You can define a BEM class like
`interests-bar__story-title` and apply it to "Dog Programmers", "Cats and
Coding", and "Plugging stuff in" because they're _all_ title Elements in the
interests bar Block.

Taking all of that analysis, here is the layout without any of the content. The
same colors mean the same BEM class.

![interests bar layout]

The following table lists the BEM class names found in the solution for each of
the colors found in the layout above:

| Color  | BEM name                                                                  |
|--------|---------------------------------------------------------------------------|
| Orange | `interests-bar__image`                                                    |
| Blue   | `interests-bar__headline`                                                 |
| Green  | `interests-bar__story`                                                    |
| Brown  | `interests-bar__stock-price` (which contains both the name and the price) |
| Pink   | n/a (this `span` needs no special treatment)                              |
| Violet | `interests-bar__price`                                                    |
| Yellow | `interests-bar__big-text`                                                 |

Then, the styles for the specific presentation are put in rules that target
those selectors.

Don't forget to put your styles in **interest-links.css**.

![interests bar done]

[interests bar]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/interests-bar.png
[interests bar marked up]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/interests-bar-marked-up.png
[interests bar subclasses shown]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/interests-bar-subclasses-shown.png
[interests bar layout]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/interest-bar-layout.svg
[interests bar done]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/interests-bar-done.png

________________________________________________________________________________
# Preferences drop down

![gear-drop-gif]

In this portion of the exercise, you are provided the HTML and CSS. The
challenge is for you to put this into your existing HTML and use JavaScript to
show and hide it.

When someone clicks the gear icon, it will show the menu. When the preferences
drop down is shown, any click will dismiss it. Create a file in the **scripts/**
directory. Use a `script` element to include that file. This may be the first
time you've written a `script` element in HTML. If you don't remember what it
looks like, go back and look at your previous projects.

After you've included the script file in your HTML file, test out whether it is
being loaded into your browser. Type a simple `console.log("hello")` and open up
your DevTools console to view your log. If your script file has loaded
correctly, you should see "hello" in your DevTools console.

You may also need to remember how to stop event bubbling/propagation, too,
depending on how you code it. This was back in the DOM days, so if you don't
remember, here [the link to the event methods] on MDN.

To make sure your script is loading, you can check the Network tab in your
DevTools (still open?) to make sure that you're getting a 200 and not an error
code.

You can also test it out by writing a `console.log('did this load?');` in the
file. Then, you can look at the output in the Console tab in the DevTools to see
if "did this load?" shows up. If it did, great! Otherwise, here's the [link to
the script tag] from MDN.

This is the HTML for the menu.

```html
<div class="pref pref--hidden">
  <div class="pref__section">
    <div class="pref__section-header">Edition</div>
    <ul>
      <li class="pref__section-link"><a href="#">CSS</a></li>
      <li class="pref__section-link"><a href="#">HTML</a></li>
      <li class="pref__section-link"><a href="#">JavaScript</a></li>
      <li class="pref__section-link"><a href="#">Python</a></li>
    </ul>
  </div>
  <div class="pref__section">
    <div class="pref__section-header">Help</div>
    <ul>
      <li class="pref__section-link"><a href="#">FAQ</a></li>
      <li class="pref__section-link"><a href="#">Contact Us</a></li>
    </ul>
  </div>
</div>
```

The CSS has the preference pane already absolutely positioned. Figure out what
you need to do to make it show up next to cog and if you need to do any
positioning of the ancestors of where you placed the HTML.

```css
/* gear-dropdown.css */
.pref {
  background-color: white;
  border: 1px solid #efefef;
  border-radius: 2px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  font-size: 12px;
  padding: 0.5em;
  position: absolute;
  right: 40px;
  top: 3.5em;
  width: 200px;
}

.pref--hidden {
  display: none;
}

.pref__section {
  border-top: 1px solid #dedede;
}

.pref__section:first-child {
  border-top: none;
}

.pref__section-header {
  font-weight: bold;
  margin: 10px;
  text-transform: uppercase;
}

.pref__section-link {
  margin: .5em;
  padding: .5em;
  text-transform: uppercase;
}

.pref__section-link:hover {
  background-color: #dedede;
}
```

When you get this to work, make sure that it works on different window sizes.
Sometimes, when developers create absolutely positioned elements, the way they
do that prevents it from working on a window size that they didn't try. So,
make it narrower. Make it larger. Make sure that the dropdown shows up when it
should.

[gear-drop-gif]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/gear-drop.gif
[link-to-the-script-tag]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#Examples
[the link to the event methods]: https://developer.mozilla.org/en-US/docs/Web/API/Event#Methods

________________________________________________________________________________
# The Search Modal

![search-bar-gif]

This is similar to what you did with the preference pane dropdown. However, you
don't have to do any unusual positioning of these elements.

* When a user clicks the magnifying glass, it toggles the visibility state of
  the search box and button. One click, visible. Two clicks, invisible. Three
  clicks, visible. Four clicks, invisible. And, so on.
* The `input` is of `type` "search" and has a `placeholder` of "Search"
  (`<input type="search" placeholder="Search">`).
* The button is just a normal button.

The **reset.css** style sheet removed all of the styling from the input box.
You won't see it when you put it on the HTML page. Because of that, you have to
style it yourself. In this exercise, that is to add a one pixel border to the
input with a border radius of two pixels.

Remember to put your CSS in the appropriate component stylesheet file.

[search-bar-gif]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/search.gif

________________________________________________________________________________
# Main Content

![main-content-with-opinions]

You've finally made it to the main content! No more messing around in the
`header` element. In this step, you will put your HTML into the `main` element!

Laying out the main content is an exercise in grids, which you have practiced a
couple of times. This just has more variety of content than you've seen before.
Don't worry. It's just the same but with more words.

Here's one way that you could decide to partition the page into its separate
sections:

![marked-up-screen-shot]

Put your CSS rules into **main-content.css**.

To add _back_ the bullet points to a `ul` element like you see in the first
article, use the CSS property `list-type` with the value "disc".

In the real world, when you want to embed a video, usually your video hosting
provider gives you a code snippet for how to embed videos in your page. App
Academy uses Vimeo as its hosting services. You can use the following code to
embed the video into your page:

```html
<iframe src="https://player.vimeo.com/video/380193367" width="480"
  height="280" frameborder="0" allow="autoplay; fullscreen"
  allowfullscreen></iframe>
```

Each of these _things_ is supposedly a news article. HTML has an `article`
element that you can use, here, instead of using `div` elements like you've done
up until now. This makes your HTML _more_ correct. For example, the content in
the lower left corner could have HTML markup like this:

```html
<article class="article">
  <header class="article__header">
    <h1 class="article__title">Where are they now?</h1>
    <h2 class="article__byline">
      By <span class="article__author">App Academy Alumni</span>
    </h2>
  </header>
  <p>
    First hand stories from App Academy graduates about transitioning to
    engineering positions at top tech companies in San Francisco.
  </p>
</article>
```

[main-content-with-opinions]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/main-content-and-opinions.png
[marked-up-screen-shot]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/marked-up-screen-shot.png

________________________________________________________________________________
# Main Page Media Queries

You have made it so that the Web site will render well on large screens. Now
it's time to make it responsive to different device widths.

## Medium screens

When the Web page is less than 1200, you need to hide the secondary column of
news stories and make the primary column fit the width of the page. Add that
media query into **main-content.html**

![aa-times-medium]


## Small screens

When the page is less than 1000 pixels wide, remove the interests bar.

![aa-times-small]

## And that's it!

![final product]

Unless....


[aa-times-small]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/1000px-mobile-aa-times.png
[aa-times-medium]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/1020px-aa-times.png

[final product]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/final-product.png

________________________________________________________________________________
# Bonus: Slide-In Sidebar

![slide-in-gif]

The bonus, here, is to add a slide-in sidebar. This is a two step procedure.
First, get the element to "slide in" when someone clicks the menu button. That's
not an easy thing to do. It should stay over on the left side of the screen even
during screen resizes.

Here's some starter HTML to get the ball rolling. See if you can make it appear
and be styled when someone clicks on the menu icon.

```html
<nav class="sidebar">
  <ul class="sidebar__list">
    <li>World</li>
    <li>
      San Francisco
      <ul class="sidebar__submenu">
        <li>Students</li>
        <li>Teaching Assistants</li>
        <li>Instructors</li>
        <li>Career Advisors</li>
        <li>Cats</li>
      </ul>
    </li>
    <li>New York</li>
  </ul>
</nav>
```

When you have that done, do the hover. First, see if you can just get a submenu
to show-up on a hover. Then, try to style the fancy triangle thing. That's a CSS
trick known as the CSS Arrow. You can make an arrow with a single `div`.

The idea is a box with zero width and height. The actual width and height of the
arrow is determined by the width of the border. In an up arrow, for example, the
bottom border is colored while the left and right are transparent, which forms
the arrow.

```css
.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  border-bottom: 5px solid black;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;

  border-top: 20px solid #f00;
}

.arrow-right {
  width: 0;
  height: 0;
  border-top: 60px solid transparent;
  border-bottom: 60px solid transparent;

  border-left: 60px solid green;
}

.arrow-left {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;

  border-right:10px solid blue;
}
```

Check out this CodePen for [CSS Arrows] to play around with how they work.

[slide-in-gif]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/aa-times/assets/sidebar.gif
[CSS Arrows]: https://codepen.io/aa-academics/pen/NWqOVpa?editors=1100
