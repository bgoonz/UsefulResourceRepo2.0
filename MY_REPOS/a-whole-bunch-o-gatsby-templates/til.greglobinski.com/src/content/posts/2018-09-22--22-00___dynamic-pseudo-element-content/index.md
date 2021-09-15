---
title: Dynamically set the content of CSS pseudo-elements
categories:
  - code
  - UI
tags:
  - CSS
---

In most cases I use CSS pseudo-elements to tweek look of UI elements. So I use empty string as a value of the `content` property. Like in the code below.

```css
.myDiv::after {
  content: '';
  /* ... */
}
```

I have not been aware that we can set the value of a pseudo-element's `content` based of it's parent element's attribute.

```html
<div class="myDiv" data-year-attr="2018" >

<style>
  .myDiv::after {
    content: attr(data-year-attr);
    /* ... */
  }
</style>
```

We can even concatenate the dynamic values with the statics ones.

```css
.myDiv::after {
  content: 'Happy New Year ' attr(data-year-attr) '!';
  /* ... */
}
```

Nice. :smile:
