---
id: position
title: position
---

CSS treats each HTML element as its own box, which is usually referred to as the CSS Box Model. Block-level items automatically start on a new line like headings while inline items sit within surrounding content. We can use the position property to override the layout of elements.

## Position

### Relative

When the position of an element is set to relative, it allows you to specify how css should move
the element relative to its current position in the normal flow of page using top, bottom, left,
right.

### Absolute

Absolute removes the element from the normal flow of the document, so surrounding items ignore it.
It locks the element in place relative to its parent container.

### Fixed

Fixed is type of absolute positioning that locks the element relative to the browser window. The
difference between fixed and absolute positions is that an element with a fixed position won't move
when the user scrolls.

## Float

Float property removes the element from normal flow of a document and push it to either left or right
