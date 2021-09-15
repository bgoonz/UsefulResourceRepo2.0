---
title: Pointer Media Query to identify touch devices
categories:
  - code
tags:
  - CSS
---

I've been using the [hover CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover) for some time already to test whether the user's primary input mechanism can hover over elements.

```css
@media (hover: hover) {
  a:hover {
    background: yellow;
  }
}
```

Sometimes, I've been using it to apply not only `hover` styles, I've been using it to identify touch devices.

But there is another feature for that.

The [pointer CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) checks what kind of pointing device the user has, if any.

```css
@media (pointer: fine) {
  /* an accurate pointing device (e.g a mouse) */
}

@media (pointer: coarse) {
  /* a pointing device of limited accuracy. (e.g. a finger)*/
}
```
