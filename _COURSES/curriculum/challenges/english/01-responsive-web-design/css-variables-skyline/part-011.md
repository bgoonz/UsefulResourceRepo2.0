---
id: 5d822fd413a79914d39e98d3
title: Part 11
challengeType: 0
dashedName: part-11
---

# --description--

Nest four `div` elements in the `bb1` container. Give them the classes `bb1a`, `bb1b`, `bb1c`, and `bb1d` in that order. This building will have four sections.

# --hints--

test-text

```js
const bb1 = $(".bb1")[0];
assert(
  bb1.contains($("div.bb1a")[0]) &&
    bb1.contains($("div.bb1b")[0]) &&
    bb1.contains($("div.bb1c")[0]) &&
    bb1.contains($("div.bb1d")[0])
);
```

# --seed--

## --seed-contents--

```html
<!DOCTYPE html>
<html>
  <head>
    <title>freeCodeCamp Skyline Project</title>
    <style>
      * {
        border: 1px solid black;
        box-sizing: border-box;
      }

      body {
        height: 100vh;
        margin: 0;
        overflow: hidden;
      }

      .background-buildings {
        width: 100%;
        height: 100%;
      }

      .bb1 {
        width: 10%;
        height: 70%;
      }
    </style>
  </head>

  <body>
    <div class="background-buildings">
      <div class="bb1"></div>
    </div>
  </body>
</html>
```

# --solutions--

```html
<!DOCTYPE html>
<html>
  <head>
    <title>freeCodeCamp Skyline Project</title>
    <style>
      * {
        border: 1px solid black;
        box-sizing: border-box;
      }

      body {
        height: 100vh;
        margin: 0;
        overflow: hidden;
      }

      .background-buildings {
        width: 100%;
        height: 100%;
      }

      .bb1 {
        width: 10%;
        height: 70%;
      }
    </style>
  </head>

  <body>
    <div class="background-buildings">
      <div class="bb1">
        <div class="bb1a"></div>
        <div class="bb1b"></div>
        <div class="bb1c"></div>
        <div class="bb1d"></div>
      </div>
    </div>
  </body>
</html>
```
