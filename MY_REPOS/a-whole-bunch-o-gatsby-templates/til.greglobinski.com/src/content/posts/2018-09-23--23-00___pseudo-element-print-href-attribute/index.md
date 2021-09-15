---
title: Use a pseudo-element to print out a link's href attribute
categories:
  - code
tags:
  - CSS
---

Inline hyperlinks are integral elements of texts published on web pages.

Unfortunately, when a web page is printed the hyperlinks disappear. Their graphic representation could still be recognizable, but the functionality disappear.

But we can save at least some of the functionality.

```css
@media print {
  a::after {
    content: ' [' attr(href) ']';
  }
}
```

It's an example of use of the technique I described [yesterday](/dynamic-pseudo-element-content/)
