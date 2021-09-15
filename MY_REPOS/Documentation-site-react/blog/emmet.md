---
slug: Data structures
title: Data Structures
author: Bryan Guner
author_title: Web Developer
author_url: https://github.com/bgoonz
author_image_url: https://avatars.githubusercontent.com/u/66654881?s=460&u=4614c45125eb6ab7e4b04468cb9cdf5c998c879d&v=4
tags: [Data Structures, Algorithms]
---

EMMET {#emmet .mume-header}
=====

*The essential toolkit for web-developers*

Introduction {#introduction .mume-header}
------------

Emmet is a productivity toolkit for web developers that uses expressions
to generate HTML snippets.

Installation {#installation .mume-header}
------------

Normally, installation for Emmet should be a straight-forward process
from the package-manager, as most of the modern text editors support
Emmet. If you have difficulty setting up emmet with your editor and wish
to check Emmet is supported by your favourite editor or not, you can
check it from here. [Emmet Installation
instructions](https://?emmet.io/download/)

Usage {#usage .mume-header}
-----

You can use Emmet in two ways:

-   Tab Expand Way: Type your emmet code and press
    `Tab`{.language-javascript} key
-   Interactive Method: Press `alt + ctrl + Enter`{.language-javascript}
    and start typing your expressions. This should automatically
    generate HTML snippets on the fly.

**This cheatsheet will assume that you press `Tab`{.language-javascript}
after each expressions.**

HTML {#html .mume-header}
----

### Generating HTML 5 DOCTYPE {#generating-html-5-doctype .mume-header}

`html:5`{.language-javascript}\
 Will generate

``` {.language-html data-role="codeBlock" data-info="HTML"}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

### Child items {#child-items .mume-header}

Child items are created using `>`{.language-javascript}

`ul>li>p`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="html"}
<ul>
  <li>
    <p></p>
  </li>
</ul>
```

### Sibling Items {#sibling-items .mume-header}

Sibling items are created using `+`{.language-javascript}

`html>head+body`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="html"}
<html>
<head></head>
<body>

</body>
</html>
```

### Multiplication {#multiplication .mume-header}

Items can be multiplied by `*`{.language-javascript}

`ul>li*5`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="html"}
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

### Grouping {#grouping .mume-header}

Items can be grouped together using `()`{.language-javascript}

`table>(tr>th*5)+tr>t*5`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="html"}
<table>
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
  </tr>
  <tr>
    <t></t>
    <t></t>
    <t></t>
    <t></t>
    <t></t>
  </tr>
</table>
```

### Class and ID {#class-and-id .mume-header}

Class and Id in Emmet can be done using `.`{.language-javascript} and
`#`{.language-javascript}

`div.heading`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="html"}
<div class="heading"></div>
```

`div#heading`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="html"}
<div id="heading"></div>
```

ID and Class can also be combined together

`div#heading.center`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="html"}
<div id="heading" class="center"></div>
```

### Adding Content inside tags {#adding-content-inside-tags .mume-header}

Contents inside tags can be added using `{}`{.language-javascript}

`h1{Emmet is awesome}+h2{Every front end developers should use this}+p{This is paragraph}*2`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="HTML"}
<h1>Emmet is awesome</h1>
<h2>Every front end developers should use this</h2>
<p>This is paragraph</p>
<p>This is paragraph</p>
```

### Attributes inside HTML tags {#attributes-inside-html-tags .mume-header}

Attributes can be added using `[]`{.language-javascript}

`a[href=https://?google.com data-toggle=something target=_blank]`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="HTML"}
<a href="https://?google.com" data-toggle="something" target="_blank"></a>
```

### Numbering {#numbering .mume-header}

Numbering can be done using `$`{.language-javascript}\
 You can use this inside tag or contents.

`h${This is so awesome $}*6`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="HTML"}
<h1>This is so awesome 1</h1>
<h2>This is so awesome 2</h2>
<h3>This is so awesome 3</h3>
<h4>This is so awesome 4</h4>
<h5>This is so awesome 5</h5>
<h6>This is so awesome 6</h6>
```

Use `@-`{.language-javascript} to reverse the Numbering

`img[src=image$$@-.jpg]*5`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="HTML"}
<img src="image05.jpg" alt="">
<img src="image04.jpg" alt="">
<img src="image03.jpg" alt="">
<img src="image02.jpg" alt="">
<img src="image01.jpg" alt="">
```

To start the numbering from specific number, use this way

`img[src=emmet$@100.jpg]*5`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="HTML"}
<img src="emmet100.jpg" alt="">
<img src="emmet101.jpg" alt="">
<img src="emmet102.jpg" alt="">
<img src="emmet103.jpg" alt="">
<img src="emmet104.jpg" alt="">
```

Tips {#tips .mume-header}
----

-   Use `:`{.language-javascript} to expand known abbreviations

`input:date`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="HTML"}
<input type="date" name="" id="">
```

`form:post`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="HTML"}
<form action="" method="post"></form>
```

`link:css`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="html"}
<link rel="stylesheet" href="style.css">
```

-   Building Navbar

`.navbar>ul>li*3>a[href=#]{Item $@-}`{.language-javascript}

``` {.language-html data-role="codeBlock" data-info="HTML"}
<div class="navbar">
  <ul>
    <li><a href="#">Item 3</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 1</a></li>
  </ul>
</div>
```

CSS {#css .mume-header}
---

Emmet works surprisingly well with css as well.

-   `f:l`{.language-javascript}

``` {.language-css data-role="codeBlock" data-info="css"}
float: left;
```

You can also use any options n/r/l

-   `pos:a­`{.language-javascript}

``` {.language-css data-role="codeBlock" data-info="css"}
position: absolute;
```

Also use any options, pos:a/r/f

-   `d:n/b­/f/­i/ib`{.language-javascript}

`d:ib`{.language-javascript}

``` {.language-css data-role="codeBlock" data-info="css"}
display: inline-block;
```

-   You can use `m`{.language-javascript} for margin and
    `p`{.language-javascript} for padding followed by direction

`mr`{.language-javascript} -\> `margin-right`{.language-javascript}

`pr`{.language-javascript} -\> `padding-right`{.language-javascript}

-   `@f`{.language-javascript} will result in

``` {.language-css data-role="codeBlock" data-info="css"}
@font-face {
  font-family:;
  src:url();
}
```

You can also use these shorthands

  Shorthand   Description
  ----------- -------------
  z           z-index
  w           width
  h           height
  fz          font-size
  ff          font-family
  fw          font-weight
  @lh         line-height
  maw         max-width
  mah         max-height
  miw         min-width
  mih         min-width
  !           !important
  @f          font-face
  @op         opacity
  @lh         line-height
  @op         opacity

-   [EMMET](#emmet)
    -   [Introduction](#introduction)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [HTML](#html)
        -   [Generating HTML 5 DOCTYPE](#generating-html-5-doctype)
        -   [Child items](#child-items)
        -   [Sibling Items](#sibling-items)
        -   [Multiplication](#multiplication)
        -   [Grouping](#grouping)
        -   [Class and ID](#class-and-id)
        -   [Adding Content inside tags](#adding-content-inside-tags)
        -   [Attributes inside HTML tags](#attributes-inside-html-tags)
        -   [Numbering](#numbering)
    -   [Tips](#tips)
    -   [CSS](#css)

≡
