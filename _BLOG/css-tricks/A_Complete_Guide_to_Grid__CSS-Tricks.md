#### Get the poster!

Reference this guide a lot? Pin a copy up on the office wall.

[![](https://i2.wp.com/css-tricks.com/wp-content/uploads/2020/06/43150-3-1.jpg?resize=1024%2C1024&ssl=1)](https://css-tricks.com/product/css-grid-poster/)

---

### Introduction

CSS Grid Layout (aka “Grid”), is a two-dimensional grid-based layout system that aims to do nothing less than completely change the way we design grid-based user interfaces. CSS has always been used to lay out our web pages, but it’s never done a very good job of it. First, we used tables, then floats, positioning and inline-block, but all of these methods were essentially hacks and left out a lot of important functionality (vertical centering, for instance). Flexbox helped out, but it’s intended for simpler one-dimensional layouts, not complex two-dimensional ones (Flexbox and Grid actually work very well together). Grid is the very first CSS module created specifically to solve the layout problems we’ve all been hacking our way around for as long as we’ve been making websites.

There are two primary things that inspired me to create this guide. The first is Rachel Andrew’s awesome book, [_Get Ready for CSS Grid Layout_.](https://abookapart.com/products/get-ready-for-css-grid-layout) It’s a thorough, clear introduction to Grid and is the basis of this entire article. I _highly_ encourage you to buy it and read it. My other big inspiration is Chris Coyier’s [“A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)” which has been my go-to resource for everything flexbox. It’s helped a ton of people, evident by the fact that it’s the top result when you Google “flexbox.” You’ll notice many similarities between his post and mine, because why not steal from the best?

My intention with this guide is to present the Grid concepts as they exist in the very latest version of the specification. So I won’t be covering the out of date Internet Explorer syntax, and I’ll do my best to update this guide regularly as the spec matures.

### Basics and browser support

As of March 2017, most browsers shipped native, unprefixed support for CSS Grid: Chrome (including on Android), Firefox, Safari (including on iOS), and Opera. Internet Explorer 10 and 11 on the other hand support it, but it’s an old implementation with an outdated syntax. The time to build with grid is now!

To get started you have to define a container element as a grid with `[display: grid](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-display)`, set the column and row sizes with `[grid-template-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)` and `[grid-template-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)`, and then place its child elements into the grid with `[grid-column](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row)` and `[grid-row](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row)`. Similarly to flexbox, the source order of the grid items doesn’t matter. Your CSS can place them in any order, which makes it super easy to rearrange your grid with media queries. Imagine defining the layout of your entire page, and then completely rearranging it to accommodate a different screen width all with only a couple lines of CSS. Grid is one of the most powerful CSS modules ever introduced.

#### Desktop

Chrome

Firefox

IE

Edge

Safari

57

52

11\*

16

10.1

#### Mobile / Tablet

Android Chrome

Android Firefox

Android

iOS Safari

91

89

91

10.3

### Important terminology

Before diving into the concepts of Grid it’s important to understand the terminology. Since the terms involved here are all kinda conceptually similar, it’s easy to confuse them with one another if you don’t first memorize their meanings defined by the Grid specification. But don’t worry, there aren’t many of them.

#### Grid Container

The element on which `display: grid` is applied. It’s the direct parent of all the grid items. In this example `container` is the grid container.

    <div class="container">
      <div class="item item-1"> </div>
      <div class="item item-2"> </div>
      <div class="item item-3"> </div>
    </div>

#### Grid Line

The dividing lines that make up the structure of the grid. They can be either vertical (“column grid lines”) or horizontal (“row grid lines”) and reside on either side of a row or column. Here the yellow line is an example of a column grid line.

![](https://css-tricks.com/wp-content/uploads/2018/11/terms-grid-line.svg)

#### Grid Track

The space between two adjacent grid lines. You can think of them like the columns or rows of the grid. Here’s the grid track between the second and third row grid lines.

![](https://css-tricks.com/wp-content/uploads/2018/11/terms-grid-track.svg)

#### Grid Area

The total space surrounded by four grid lines. A grid area may be composed of any number of grid cells. Here’s the grid area between row grid lines 1 and 3, and column grid lines 1 and 3.

![](https://css-tricks.com/wp-content/uploads/2018/11/terms-grid-area.svg)

#### Grid Item

The children (i.e. *direct* descendants) of the grid container. Here the `item` elements are grid items, but `sub-item` isn’t.

    <div class="container">
      <div class="item"> </div>
      <div class="item">
        <p class="sub-item"> </p>
      </div>
      <div class="item"> </div>
    </div>

#### Grid Cell

The space between two adjacent row and two adjacent column grid lines. It’s a single “unit” of the grid. Here’s the grid cell between row grid lines 1 and 2, and column grid lines 2 and 3.

![](https://css-tricks.com/wp-content/uploads/2018/11/terms-grid-cell.svg)

### Grid properties

Table of contents

#### Properties for the Parent

(Grid Container)

#### display

Defines the element as a grid container and establishes a new grid formatting context for its contents.

Values:

- **`grid`** – generates a block-level grid
- **`inline-grid`** – generates an inline-level grid

<!-- -->

    .container {
      display: grid | inline-grid;
    }

Note: The ability to pass grid parameters down through nested elements (aka subgrids) has been moved to [level 2 of the CSS Grid specification.](https://www.w3.org/TR/css-grid-2/#subgrids) Here’s [a quick explanation](https://css-tricks.com/grid-level-2-and-subgrid/).

##### grid-template-columns

grid-template-rows

Defines the columns and rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line.

Values:

- **`<track-size>`** – can be a length, a percentage, or a fraction of the free space in the grid (using the `[fr](https://css-tricks.com/snippets/css/complete-guide-grid/#fr-unit)` unit)
- **`<line-name>`** – an arbitrary name of your choosing

<!-- -->

    .container {
      grid-template-columns:  ... |   ...;
      grid-template-rows:  ... |   ...;
    }

Examples:

When you leave an empty space between the track values, the grid lines are automatically assigned positive and negative numbers:

    .container {
      grid-template-columns: 40px 50px auto 50px 40px;
      grid-template-rows: 25% 100px auto;
    }

![](https://css-tricks.com/wp-content/uploads/2018/11/template-columns-rows-01.svg)

But you can choose to explicitly name the lines. Note the bracket syntax for the line names:

    .container {
      grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
      grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
    }

![Grid with user named lines](https://css-tricks.com/wp-content/uploads/2018/11/template-column-rows-02.svg)

Note that a line can have more than one name. For example, here the second line will have two names: row1-end and row2-start:

    .container {
      grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
    }

If your definition contains repeating parts, you can use the `repeat()` notation to streamline things:

    .container {
      grid-template-columns: repeat(3, 20px [col-start]);
    }

Which is equivalent to this:

    .container {
      grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start];
    }

If multiple lines share the same name, they can be referenced by their line name and count.

    .item {
      grid-column-start: col-start 2;
    }

The `fr` unit allows you to set the size of a track as a fraction of the free space of the grid container. For example, this will set each item to one third the width of the grid container:

    .container {
      grid-template-columns: 1fr 1fr 1fr;
    }

The free space is calculated _after_ any non-flexible items. In this example the total amount of free space available to the `fr` units doesn’t include the 50px:

    .container {
      grid-template-columns: 1fr 50px 1fr 1fr;
    }

##### grid-template-areas

Defines a grid template by referencing the names of the grid areas which are specified with the `[grid-area](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-area)` property. Repeating the name of a grid area causes the content to span those cells. A period signifies an empty cell. The syntax itself provides a visualization of the structure of the grid.

Values:

- **`<grid-area-name>`** – the name of a grid area specified with [`grid-area`](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-area)
- **`.`** – a period signifies an empty grid cell
- **`none`** – no grid areas are defined

<!-- -->

    .container {
      grid-template-areas:
        " | . | none | ..."
        "...";
    }

Example:

    .item-a {
      grid-area: header;
    }
    .item-b {
      grid-area: main;
    }
    .item-c {
      grid-area: sidebar;
    }
    .item-d {
      grid-area: footer;
    }

    .container {
      display: grid;
      grid-template-columns: 50px 50px 50px 50px;
      grid-template-rows: auto;
      grid-template-areas:
        "header header header header"
        "main main . sidebar"
        "footer footer footer footer";
    }

That’ll create a grid that’s four columns wide by three rows tall. The entire top row will be composed of the **header** area. The middle row will be composed of two **main** areas, one empty cell, and one **sidebar** area. The last row is all **footer**.

![Example of grid-template-areas](https://css-tricks.com/wp-content/uploads/2018/11/dddgrid-template-areas.svg)

Each row in your declaration needs to have the same number of cells.

You can use any number of adjacent periods to declare a single empty cell. As long as the periods have no spaces between them they represent a single cell.

Notice that you’re not naming lines with this syntax, just areas. When you use this syntax the lines on either end of the areas are actually getting named automatically. If the name of your grid area is **_foo_**, the name of the area’s starting row line and starting column line will be **_foo_-start**, and the name of its last row line and last column line will be **_foo_-end**. This means that some lines might have multiple names, such as the far left line in the above example, which will have three names: header-start, main-start, and footer-start.

##### grid-template

A shorthand for setting `[grid-template-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)`, `[grid-template-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)`, and `[grid-template-areas](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-areas)` in a single declaration.

Values:

- **`none`** – sets all three properties to their initial values
- **`<grid-template-rows>` / `<grid-template-columns`&gt;** – sets `[grid-template-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)` and `[grid-template-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)` to the specified values, respectively, and sets `[grid-template-areas](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-areas)` to `none`

<!-- -->

    .container {
      grid-template: none | <grid-template-rows> / <grid-template-columns>;
    }

It also accepts a more complex but quite handy syntax for specifying all three. Here’s an example:

    .container {
      grid-template:
        [row1-start] "header header header" 25px [row1-end]
        [row2-start] "footer footer footer" 25px [row2-end]
        / auto 50px auto;
    }

That’s equivalent to this:

    .container {
      grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
      grid-template-columns: auto 50px auto;
      grid-template-areas:
        "header header header"
        "footer footer footer";
    }

Since `grid-template` doesn’t reset the _implicit_ grid properties (`[grid-auto-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-columns-rows)`, `[grid-auto-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-columns-rows)`, and `[grid-auto-flow](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-flow)`), which is probably what you want to do in most cases, it’s recommended to use the `[grid](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid)` property instead of `grid-template`.

##### column-gap

row-gap  
grid-column-gap  
grid-row-gap

Specifies the size of the grid lines. You can think of it like setting the width of the gutters between the columns/rows.

Values:

- **`<line-size>`** – a length value

<!-- -->

    .container {

      column-gap: <line-size>;
      row-gap: <line-size>;


      grid-column-gap: <line-size>;
      grid-row-gap: <line-size>;
    }

Example:

    .container {
      grid-template-columns: 100px 50px 100px;
      grid-template-rows: 80px auto 80px;
      column-gap: 10px;
      row-gap: 15px;
    }

![Example of grid-column-gap and grid-row-gap](https://css-tricks.com/wp-content/uploads/2018/11/dddgrid-gap.svg)

The gutters are only created _between_ the columns/rows, not on the outer edges.

Note: The `grid-` prefix will be removed and `grid-column-gap` and `grid-row-gap` renamed to `column-gap` and `row-gap`. The unprefixed properties are already supported in Chrome 68+, Safari 11.2 Release 50+ and Opera 54+.

##### gap

grid-gap

A shorthand for `[row-gap](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-gap)` and `[column-gap](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-gap)`

Values:

- **`<grid-row-gap>` `<grid-column-gap>`** – length values

<!-- -->

    .container {

      gap: <grid-row-gap> <grid-column-gap>;


      grid-gap: <grid-row-gap> <grid-column-gap>;
    }

Example:

    .container {
      grid-template-columns: 100px 50px 100px;
      grid-template-rows: 80px auto 80px;
      gap: 15px 10px;
    }

If no `[row-gap](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-gap)` is specified, it’s set to the same value as `[column-gap](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-gap)`

**Note**: The `grid-` prefix is deprecated (but who knows, may never actually be removed from browsers). Essentially `grid-gap` renamed to `gap`. The unprefixed property is already supported in Chrome 68+, Safari 11.2 Release 50+, and Opera 54+.

##### justify-items

Aligns grid items along the _inline (row)_ axis (as opposed to `[align-items](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-align-items)` which aligns along the _block (column)_ axis). This value applies to all grid items inside the container.

Values:

- **`start`** – aligns items to be flush with the start edge of their cell
- **`end`** – aligns items to be flush with the end edge of their cell
- **`center`** – aligns items in the center of their cell
- **`stretch`** – fills the whole width of the cell (this is the default)

<!-- -->

    .container {
      justify-items: start | end | center | stretch;
    }

Examples:

    .container {
      justify-items: start;
    }

![Example of justify-items set to start](https://css-tricks.com/wp-content/uploads/2018/11/justify-items-start.svg)

    .container {
      justify-items: end;
    }

![Example of justify-items set to end](https://css-tricks.com/wp-content/uploads/2018/11/justify-items-end.svg)

    .container {
      justify-items: center;
    }

![Example of justify-items set to center](https://css-tricks.com/wp-content/uploads/2018/11/justify-items-center.svg)

    .container {
      justify-items: stretch;
    }

![Example of justify-items set to stretch](https://css-tricks.com/wp-content/uploads/2018/11/justify-items-stretch.svg)

This behavior can also be set on individual grid items via the `[justify-self](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-justify-self)` property.

##### align-items

Aligns grid items along the _block (column)_ axis (as opposed to `[justify-items](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-justify-items)` which aligns along the _inline (row)_ axis). This value applies to all grid items inside the container.

Values:

- **`start`** – aligns items to be flush with the start edge of their cell
- **`end`** – aligns items to be flush with the end edge of their cell
- **`center`** – aligns items in the center of their cell
- **`stretch`** – fills the whole height of the cell (this is the default)

<!-- -->

    .container {
      align-items: start | end | center | stretch;
    }

Examples:

    .container {
      align-items: start;
    }

![Example of align-items set to start](https://css-tricks.com/wp-content/uploads/2018/11/align-items-start.svg)

    .container {
      align-items: end;
    }

![Example of align-items set to end](https://css-tricks.com/wp-content/uploads/2018/11/align-items-end.svg)

    .container {
      align-items: center;
    }

![Example of align-items set to center](https://css-tricks.com/wp-content/uploads/2018/11/align-items-center.svg)

    .container {
      align-items: stretch;
    }

![Example of align-items set to stretch](https://css-tricks.com/wp-content/uploads/2018/11/align-items-stretch.svg)

This behavior can also be set on individual grid items via the `[align-self](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-align-self)` property.

##### place-items

`place-items` sets both the `align-items` and `justify-items` properties in a single declaration.

Values:

- **`<align-items>` / `<justify-items>`** – The first value sets `align-items`, the second value `justify-items`. If the second value is omitted, the first value is assigned to both properties.

All major browsers except Edge support the `place-items` shorthand property.

For more details, see [`align-items`](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-align-items) and [`justify-items`](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-justify-items).

##### place-content

`place-content` sets both the `align-content` and `justify-content` properties in a single declaration.

Values:

- **`<align-content>` / `<justify-content>`** – The first value sets `align-content`, the second value `justify-content`. If the second value is omitted, the first value is assigned to both properties.

All major browsers except Edge support the `place-content` shorthand property.

For more details, see [`align-content`](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-align-content) and [`justify-content`](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-justify-content).

##### grid-auto-columns

grid-auto-rows

Specifies the size of any auto-generated grid tracks (aka _implicit grid tracks_). Implicit tracks get created when there are more grid items than cells in the grid or when a grid item is placed outside of the explicit grid. (see [The Difference Between Explicit and Implicit Grids](https://css-tricks.com/difference-explicit-implicit-grids/))

Values:

- **`<track-size>`** – can be a length, a percentage, or a fraction of the free space in the grid (using the `[fr](https://css-tricks.com/snippets/css/complete-guide-grid/#fr-unit)` unit)

<!-- -->

    .container {
      grid-auto-columns: <track-size> ...;
      grid-auto-rows: <track-size> ...;
    }

To illustrate how implicit grid tracks get created, think about this:

    .container {
      grid-template-columns: 60px 60px;
      grid-template-rows: 90px 90px;
    }

![Example of 2x2 grid](https://css-tricks.com/wp-content/uploads/2018/11/grid-auto-columns-rows-01.svg)

This creates a 2 x 2 grid.

But now imagine you use `[grid-column](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row)` and `[grid-row](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row)` to position your grid items like this:

    .item-a {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
    .item-b {
      grid-column: 5 / 6;
      grid-row: 2 / 3;
    }

![Example of implicit tracks](https://css-tricks.com/wp-content/uploads/2018/11/grid-auto-columns-rows-02.svg)

We told .item-b to start on column line 5 and end at column line 6, _but we never defined a column line 5 or 6_. Because we referenced lines that don’t exist, implicit tracks with widths of 0 are created to fill in the gaps. We can use `[grid-auto-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-columns-rows)` and `[grid-auto-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-columns-rows)` to specify the widths of these implicit tracks:

    .container {
      grid-auto-columns: 60px;
    }

![grid-auto-columns-rows](https://css-tricks.com/wp-content/uploads/2018/11/grid-auto-columns-rows-03.svg)

##### grid-auto-flow

If you have grid items that you don’t explicitly place on the grid, the _auto-placement algorithm_ kicks in to automatically place the items. This property controls how the auto-placement algorithm works.

Values:

- **`row`** – tells the auto-placement algorithm to fill in each row in turn, adding new rows as necessary (default)
- **`column`** – tells the auto-placement algorithm to fill in each column in turn, adding new columns as necessary
- **`dense`** – tells the auto-placement algorithm to attempt to fill in holes earlier in the grid if smaller items come up later

<!-- -->

    .container {
      grid-auto-flow: row | column | row dense | column dense;
    }

Note that **dense** only changes the visual order of your items and might cause them to appear out of order, which is bad for accessibility.

Examples:

Consider this HTML:

    <section class="container">
      <div class="item-a">item-a</div>
      <div class="item-b">item-b</div>
      <div class="item-c">item-c</div>
      <div class="item-d">item-d</div>
      <div class="item-e">item-e</div>
    </section>

You define a grid with five columns and two rows, and set `grid-auto-flow` to `row` (which is also the default):

    .container {
      display: grid;
      grid-template-columns: 60px 60px 60px 60px 60px;
      grid-template-rows: 30px 30px;
      grid-auto-flow: row;
    }

When placing the items on the grid, you only specify spots for two of them:

    .item-a {
      grid-column: 1;
      grid-row: 1 / 3;
    }
    .item-e {
      grid-column: 5;
      grid-row: 1 / 3;
    }

Because we set `grid-auto-flow` to `row`, our grid will look like this. Notice how the three items we didn’t place (**item-b**, **item-c** and **item-d**) flow across the available rows:

![Example of grid-auto-flow set to row](https://css-tricks.com/wp-content/uploads/2018/11/grid-auto-flow-01.svg)

If we instead set `grid-auto-flow` to `column`, **item-b**, **item-c** and **item-d** flow down the columns:

    .container {
      display: grid;
      grid-template-columns: 60px 60px 60px 60px 60px;
      grid-template-rows: 30px 30px;
      grid-auto-flow: column;
    }

![Example of grid-auto-flow set to column](https://css-tricks.com/wp-content/uploads/2018/11/grid-auto-flow-02.svg)

##### grid

A shorthand for setting all of the following properties in a single declaration: `[grid-template-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)`, `[grid-template-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)`, `[grid-template-areas](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-areas)`, `[grid-auto-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-columns-rows)`, `[grid-auto-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-columns-rows)`, and `[grid-auto-flow](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-flow)` (Note: You can only specify the explicit or the implicit grid properties in a single grid declaration).

Values:

- **`none`** – sets all sub-properties to their initial values.
- **`<grid-template>`** – works the same as the `[grid-template](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template)` shorthand.
- **`<grid-template-rows> / [ auto-flow && dense? ] <grid-auto-columns>?`** – sets `[grid-template-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)` to the specified value. If the `auto-flow` keyword is to the right of the slash, it sets `[grid-auto-flow](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-flow)` to `column`. If the `dense` keyword is specified additionally, the auto-placement algorithm uses a “dense” packing algorithm. If `[grid-auto-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-columns-rows)` is omitted, it is set to `auto`.
- **`[ auto-flow && dense? ] <grid-auto-rows>? / <grid-template-columns>`** – sets `[grid-template-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)` to the specified value. If the `auto-flow` keyword is to the left of the slash, it sets `[grid-auto-flow](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-flow)` to `row`. If the `dense` keyword is specified additionally, the auto-placement algorithm uses a “dense” packing algorithm. If `[grid-auto-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-auto-columns-rows)` is omitted, it is set to `auto`.

Examples:

The following two code blocks are equivalent:

    .container {
      grid: 100px 300px / 3fr 1fr;
    }

    .container {
      grid-template-rows: 100px 300px;
      grid-template-columns: 3fr 1fr;
    }

The following two code blocks are equivalent:

    .container {
      grid: auto-flow / 200px 1fr;
    }

    .container {
      grid-auto-flow: row;
      grid-template-columns: 200px 1fr;
    }

The following two code blocks are equivalent:

    .container {
      grid: auto-flow dense 100px / 1fr 2fr;
    }

    .container {
      grid-auto-flow: row dense;
      grid-auto-rows: 100px;
      grid-template-columns: 1fr 2fr;
    }

And the following two code blocks are equivalent:

    .container {
      grid: 100px 300px / auto-flow 200px;
    }

    .container {
      grid-template-rows: 100px 300px;
      grid-auto-flow: column;
      grid-auto-columns: 200px;
    }

It also accepts a more complex but quite handy syntax for setting everything at once. You specify `[grid-template-areas](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-areas)`, `[grid-template-rows](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)` and `[grid-template-columns](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-columns-rows)`, and all the other sub-properties are set to their initial values. What you’re doing is specifying the line names and track sizes inline with their respective grid areas. This is easiest to describe with an example:

    .container {
      grid: [row1-start] "header header header" 1fr [row1-end]
            [row2-start] "footer footer footer" 25px [row2-end]
            / auto 50px auto;
    }

That’s equivalent to this:

    .container {
      grid-template-areas:
        "header header header"
        "footer footer footer";
      grid-template-rows: [row1-start] 1fr [row1-end row2-start] 25px [row2-end];
      grid-template-columns: auto 50px auto;
    }

#### Properties for the Children

(Grid Items)

**Note:**  
`float`, `display: inline-block`, `display: table-cell`, `vertical-align` and `column-*` properties have no effect on a grid item.

##### grid-column-start

grid-column-end  
grid-row-start  
grid-row-end

Determines a grid item’s location within the grid by referring to specific grid lines. `grid-column-start`/`grid-row-start` is the line where the item begins, and `grid-column-end`/`grid-row-end` is the line where the item ends.

Values:

- **`<line>`** – can be a number to refer to a numbered grid line, or a name to refer to a named grid line
- `**span <number>** - the item will span across the provided number of grid tracks`
- `**span <name>**` – the item will span across until it hits the next line with the provided name
- **`auto`** – indicates auto-placement, an automatic span, or a default span of one

<!-- -->

    .item {
      grid-column-start: <number> | <name> | span <number> | span <name> | auto;
      grid-column-end: <number> | <name> | span <number> | span <name> | auto;
      grid-row-start: <number> | <name> | span <number> | span <name> | auto;
      grid-row-end: <number> | <name> | span <number> | span <name> | auto;
    }

Examples:

    .item-a {
      grid-column-start: 2;
      grid-column-end: five;
      grid-row-start: row1-start;
      grid-row-end: 3;
    }

![Example of grid-row/column-start/end](https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row-start-end-01.svg)

    .item-b {
      grid-column-start: 1;
      grid-column-end: span col4-start;
      grid-row-start: 2;
      grid-row-end: span 2;
    }

![Example of grid-row/column-start/end](https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row-start-end-02.svg)

If no `grid-column-end`/`grid-row-end` is declared, the item will span 1 track by default.

Items can overlap each other. You can use `z-index` to control their stacking order.

##### grid-column

grid-row

Shorthand for `[grid-column-start](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)` + `[grid-column-end](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)`, and `[grid-row-start](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)` + `[grid-row-end](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)`, respectively.

Values:

- **`<start-line>` / `<end-line>`** – each one accepts all the same values as the longhand version, including span

<!-- -->

    .item {
      grid-column: <start-line> / <end-line> | <start-line> / span <value>;
      grid-row: <start-line> / <end-line> | <start-line> / span <value>;
    }

Example:

    .item-c {
      grid-column: 3 / span 2;
      grid-row: third-line / 4;
    }

![Example of grid-column/grid-row](https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row.svg)

If no end line value is declared, the item will span 1 track by default.

##### grid-area

Gives an item a name so that it can be referenced by a template created with the `[grid-template-areas](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-areas)` property. Alternatively, this property can be used as an even shorter shorthand for `[grid-row-start](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)` + `[grid-column-start](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)` + `[grid-row-end](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)` + `[grid-column-end](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)`.

Values:

- **`<name>`** – a name of your choosing
- **`<row-start>` / `<column-start>` / `<row-end>` / `<column-end>`** – can be numbers or named lines

<!-- -->

    .item {
      grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
    }

Examples:

As a way to assign a name to the item:

    .item-d {
      grid-area: header;
    }

As the short-shorthand for `[grid-row-start](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)` + `[grid-column-start](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)` + `[grid-row-end](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)` + `[grid-column-end](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-column-row-start-end)`:

    .item-d {
      grid-area: 1 / col4-start / last-line / 6;
    }

![Example of grid-area](https://css-tricks.com/wp-content/uploads/2018/11/grid-area.svg)

##### justify-self

Aligns a grid item inside a cell along the _inline (row)_ axis (as opposed to `[align-self](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-align-self)` which aligns along the _block (column)_ axis). This value applies to a grid item inside a single cell.

Values:

- **`start`** – aligns the grid item to be flush with the start edge of the cell
- **`end`** – aligns the grid item to be flush with the end edge of the cell
- **`center`** – aligns the grid item in the center of the cell
- **`stretch`** – fills the whole width of the cell (this is the default)

<!-- -->

    .item {
      justify-self: start | end | center | stretch;
    }

Examples:

    .item-a {
      justify-self: start;
    }

![Example of justify-self set to start](https://css-tricks.com/wp-content/uploads/2018/11/justify-self-start.svg)

    .item-a {
      justify-self: end;
    }

![alt="Example](https://css-tricks.com/wp-content/uploads/2018/11/justify-self-end.svg)

    .item-a {
      justify-self: center;
    }

![Example of justify-self set to center](https://css-tricks.com/wp-content/uploads/2018/11/justify-self-center.svg)

    .item-a {
      justify-self: stretch;
    }

![Example of justify-self set to stretch](https://css-tricks.com/wp-content/uploads/2018/11/justify-self-stretch.svg)

To set alignment for _all_ the items in a grid, this behavior can also be set on the grid container via the `[justify-items](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-justify-items)` property.

##### align-self

Aligns a grid item inside a cell along the _block (column)_ axis (as opposed to `[justify-self](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-justify-self)` which aligns along the _inline (row)_ axis). This value applies to the content inside a single grid item.

Values:

- **`start`** – aligns the grid item to be flush with the start edge of the cell
- **`end`** – aligns the grid item to be flush with the end edge of the cell
- **`center`** – aligns the grid item in the center of the cell
- **`stretch`** – fills the whole height of the cell (this is the default)

<!-- -->

    .item {
      align-self: start | end | center | stretch;
    }

Examples:

    .item-a {
      align-self: start;
    }

![Example of align-self set to start](https://css-tricks.com/wp-content/uploads/2018/11/align-self-start.svg)

    .item-a {
      align-self: end;
    }

![Example of align-self set to end](https://css-tricks.com/wp-content/uploads/2018/11/align-self-end.svg)

    .item-a {
      align-self: center;
    }

![Example of align-self set to center](https://css-tricks.com/wp-content/uploads/2018/11/align-self-center.svg)

    .item-a {
      align-self: stretch;
    }

![Example of align-self set to stretch](https://css-tricks.com/wp-content/uploads/2018/11/align-self-stretch.svg)

To align _all_ the items in a grid, this behavior can also be set on the grid container via the `[align-items](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-align-items)` property.

##### place-self

`place-self` sets both the `align-self` and `justify-self` properties in a single declaration.

Values:

- **`auto`** – The “default” alignment for the layout mode.
- **`<align-self>` / `<justify-self>`** – The first value sets `align-self`, the second value `justify-self`. If the second value is omitted, the first value is assigned to both properties.

Examples:

    .item-a {
      place-self: center;
    }

![place self set to center](https://css-tricks.com/wp-content/uploads/2018/11/place-self-center.svg)

    .item-a {
      place-self: center stretch;
    }

![place set set to center stretch](https://css-tricks.com/wp-content/uploads/2018/11/place-self-center-stretch.svg)

All major browsers except Edge support the `place-self` shorthand property.

### Special functions and keywords

- When sizing rows and columns, you can use all the [lengths](https://css-tricks.com/the-lengths-of-css/) you are used to, like `px`, rem, %, etc, but you also have keywords like `min-content`, `max-content`, `auto`, and perhaps the most useful, fractional units. `grid-template-columns: 200px 1fr 2fr min-content;`
- You also have access to a function which can help set boundaries for otherwise flexible units. For example to set a column to be 1fr, but shrink no further than 200px: `grid-template-columns: 1fr minmax(200px, 1fr);`
- There is `repeat()` function, which saves some typing, like making 10 columns: `grid-template-columns: repeat(10, 1fr);`
- Combining all of these things can be extremely powerful, like `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));` See the demo at the top of the page about “The Most Powerful Lines in Grid”.

### Fluid columns snippet

Fluid width columns that break into more or less columns as space is available, with no media queries!

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));


      grid-gap: 1rem;


    }

### Animation

According to the CSS Grid Layout Module Level 1 specification, there are 5 animatable grid properties:

- `grid-gap`, `grid-row-gap`, `grid-column-gap` as length, percentage, or calc.
- `grid-template-columns`, `grid-template-rows` as a simple list of length, percentage, or calc, provided the only differences are the values of the length, percentage, or calc components in the list.

As of this writing, only the animation of `(grid-)gap`, `(grid-)row-gap`, `(grid-)column-gap` is implemented in any of the tested browsers.

Browser

`(grid-)gap`, `(grid-)row-gap`, `(grid-)column-gap`

`grid-template-columns`

`grid-template-rows`

Firefox

supported ✅ 53+

supported ✅ 66+

supported ✅ 66+

Safari 12.0

not supported ❌

not supported ❌

not supported ❌

Chrome

supported ✅ 66+

not supported ❌

not supported ❌

Chrome for Android 66+, Opera Mini 33+

supported ✅

not supported ❌

not supported ❌

Edge

supported ✅ 16+

not supported ❌

not supported ❌
