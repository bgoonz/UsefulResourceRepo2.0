---
title: A CSS @keyframes list without initial values is valid
categories:
  - code
  - animation
  - UI
tags:
  - CSS
---

Till now when I defined a `@keyframes` list for CSS animation I always defined the **starting** and **ending** steps even if they only repeat the initial values of the animated element.

Like in the code below. The steps `0%` and `100%` do not change the initial value of the `.box`'s initial `width` value.

```css
@keyframes pulse {
  0% {
    width: 100px;
  }

  50% {
    width: 200px;
  }

  100% {
    width: 100px;
  }
}

.box {
  background: black;
  height: 100px;
  width: 100px;
  animation: 3s pulse infinite;
}
```

It's not necessary.

> If a keyframe rule doesn't specify the start or end states of the animation (that is, 0%/from and 100%/to, browsers will use the element's existing styles for the start/end states. This can be used to animate an element from its initial state and back. [[MDN]](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)

So, the code below is valid.

```css
@keyframes pulse {
  50% {
    width: 200px;
  }
}

.box {
  background: black;
  height: 100px;
  width: 100px;
  animation: 3s pulse infinite;
}
```

But it's so much shorter. :+1:
