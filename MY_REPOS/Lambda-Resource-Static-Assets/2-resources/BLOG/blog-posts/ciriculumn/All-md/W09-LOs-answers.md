# CSS and AJAX (Week 9) - Learning Objectives



## Basic CSS (W09D1) - Learning Objectives

### Basic CSS
1. How to import other CSS files into your CSS file
   ``` javascript
      @import url('')
      @import 'relative path file'
   ```
2. Explain how CSS rules are applied based on their order and specificity

They are executed by most specific and the last one executed in line-order

3. Describe and apply element, id, and class selectors

```css
  body {
    global
  }

  #id{

  }

  .class{

  }

  a{
    element
  }

  *{
    wildcard
  }


```

4. Write "combinators" to create compound selector statements to target specific elements
5. Explain and apply pseudo selectors for specific elements in specific states (i.e. :hover)
6. Explain and apply the `::before` and `::after` pseudo elements, & Use the content CSS property to define the content of an element
7. Style content on an HTML page targeting:
  - Type faces, sizes, styles, and weights
  - Text transformation and alignment
  - Colors expresssed as names, hexadecimal RGB values, and decimal RGB values
  - Everything about borders
  - Shadows
  - Opacity (transparency)
  - Covering an element with a background image
8. Explain the generic font names "serif", "sans-serif", and "monospace" and correctly identify examples of each
9. Explain why using Web fonts helps with consistent experience across viewing devices:
10. Explain absolute and relative length units in CSS
11. Demonstrate how to link a stylesheet into an HTML page
12. Be able to calculate the specificity of CSS rules and determine which rule override the properties of another
13. Use the `content` CSS property to define the content of an element


## AJAX (Asynchronous JavaScript and XML) (W09D2) - Learning Objectives

### AJAX
1. Explain what an AJAX request is
2. Identifying the advantages of using an AJAX request.
3. Identify what the acronym AJAX means and how it relates to modern Web programming
4. Describe the different steps in an AJAX request/response cycle
5. Fully use the fetch API to make dynamic Web pages without refreshing the page


## Media Queries, Positioning, and Layouts (W09D3) - Learning Objectives

### Media Queries
1. Identify the different types of media that a media query can target
2. Explain how the media features (and prefixed subfeatures) of "aspect ratio", "height", "orientation", and "width" are applied
3. Use media queries to change the styles of content in an HTML page to achieve a desired effect

### Layout and the Box Model
1. Describe how:
- padding and margins work in the box model
- the browser positions a fixed positioned element
- the browser positions a relatively positioned element
- the browser positions absolutely positioned elements with and without a relatively positioned parent element
- the browser positions a static positioned element
2. Identify elements rendered with specific padding and margin settings
3. Apply padding and margins to HTML elements to achieve a desired layout
4. Apply positioning settings to HTML elements (fixed, relative, and absolute) to achieve a desired layout. (Sticky positioning is not supported on some older but still used browsers, so it will not be assessed, but can useful.)
5. Identify which HTML elements have a default "inline" display value
6. Identify which HTML elements have a default "block" display value
7. Describe and use z-index positioning of elements

### Flexible Box Layout
1. Explain how flexible box layout lays out elements
2. Use the `flex` property to specify grow, shrink, and basis values.
3. Use the `flex-direction` property to direct the layout of the content
4. Use the `flex-wrap` property to affect the wrap of content layout within an element using flexible box layout
5. Use `align-self`, `justify-content`, and `align-items` to change the way that children elements are laid out in a flexible box layout
6. Use the `order` property to change the order in which elements will appear in a flexible box layout

### Grid Layout
1. Explain how grid layout lays out elements
2. Use the `grid-template-columns`, `grid-template-rows`, and `grid-template` properties to specify the layout of the grid using relative and absolute measures
3. Use `grid-template-areas` to label areas of a grid and `grid-area` to assign an element to the area
4. Use `column-gap`, `row-gap`, and `gap` (previously `grid-column-gap`, `grid-row-gap`, and `grid-gap`) to set the "gutter" areas between elements in a grid layout
5. Use `grid-column-start`/`grid-column-end` and `grid-row-start`/`grid-row-end` to create spans across multiple columns and rows with positive integers, negative integers, and in conjunction with the "span" operator
6. Explain and use the shorthand versions of `grid-column` and `grid-row` to define how an element will span a grid layout
7. Use the `order` property to change the default order in which items are laid out
8. Explain and use the "fr" unit of measure
9. Use `justify-items`, `align-items`, `justify-content` and `align-content` to layout items in each grid area


## Interactivity and BEM (W09D4) - Learning Objectives

### Interactivity
1. Use the "hover" pseudo-class to be able to make changes to elements when the device pointer is over an element
2. Describe and use the `transition` property to show animated changes due to class and pseudo-class CSS rule application
3. Describe and use the `overflow`, `overflow-x`, and `overflow-y` properties to effect clipping and scrolling on elements

### Block, Element, Modifier (BEM)
1. Describe what Block means in BEM.
2. Describe what Element means in BEM.
3. Describe what Modifier means in BEM.
4. Identify CSS class names that follow the BEM principle.
