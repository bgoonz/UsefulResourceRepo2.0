I discovered CSS about a decade ago while trying to modify the look of a blog I had created. Pretty soon, I was able to code [cool things](https://codepen.io/thebabydino/details/GRgYQge) with more mathematical and, therefore, easier-to-understand features like transforms. However, other areas of CSS, such as layout, have remained a constant source of pain.

This post is about a problem I encountered about a decade ago and, until recently, did not know how to solve in a smart way. Specifically, it’s about how I found a solution to a long-running problem using a modern CSS grid technique that, in the process, gave me even cooler results than I originally imagined.

Note that this is not a tutorial on how to best use CSS grid, but more of a walk through my own learning process.

### The problem

One of the first things I used to dump on that blog were random photos from the city, so I had this idea about having a grid of thumbnails with a fixed size. For a nicer look, I wanted this grid to be middle-aligned with respect to the paragraphs above and below it, but, at the same time, I wanted the thumbnails on the last row to be left-aligned with respect to the grid. Meanwhile, the width of the post (and the width of the grid within it) would depend on the viewport.

The HTML looks something like this:

    <section class='post__content'>
      <p></p>
      <div class='grid--thumbs'>
        <a href='full-size-image.jpg'>
          <img src='thumb-image.jpg' alt='image description'/>
        </a>

      </div>
      <p></p>
    </section>

It may seem simple, but it turned out to be one of the most difficult CSS problems I’ve ever encountered.

### Less than ideal solutions

These are things I have tried or seen suggested over the years, but that never really got me anywhere.

#### Floating impossibility

Floats turned out to be a dead end because I couldn’t figure out how to make the grid be middle aligned this way.

    .grid--thumbs { overflow: hidden; }

    .grid--thumbs a { float: left; }

The demo below shows the float attempt. Resize the embed to see how they behave at different viewport widths.

#### `inline-block` madness

At first, this seemed like a better idea:

    .grid--thumbs { text-align: center }

    .grid--thumbs a { display: inline-block }

Except it turned out it wasn’t:

The last row isn’t left aligned in this case.

At a certain point, thanks to an accidental CSS auto-complete on CodePen, I found out about a property called `[text-align-last](https://css-tricks.com/almanac/properties/t/text-align-last/)`, which determines how the last line of a block is aligned.

Unfortunately, setting `text-align-last: left` on the grid wasn’t the solution I was looking for either:

At this point, I actually considered dropping the idea of a middle aligned grid. Could a combo of `text-align: justified` and `text-align-last: left` on the grid produce a better result?

Well, turns out it doesn’t. That is, unless there’s only a thumbnail on the last row and the gaps between the columns aren’t too big. Resize the embed below to see what I mean.

This is pretty much where I was at two years ago, after nine years of trying and failing to come up with a solution to this problem.

#### Messy flexbox hacks

A flexbox solution that seemed like it would work at first was to add an `::after` pseudo-element on the grid and set `flex: 1` on both the thumbnails and this pseudo-element:

    .grid--thumbs {
      display: flex;
      flex-wrap: wrap;

      a, &::after { flex: 1; }

      img { margin: auto; }

      &:after { content: 'AFTER'; }
    }

The demo below shows how this method works. I’ve given the thumbnails and the `::after` pseudo-element purple outlines to make it easier to see what is going on.

This is not quite what I wanted because the grid of thumbnails is not middle-aligned. Thats said, it doesn’t look too bad… as long as the last row has exactly one item less image than the others. As soon as that changes, however, the layout breaks if it’s missing more items or none.

![Screenshot collage. Shows how the layout breaks when the last row is not missing exactly one item to be full.](https://i2.wp.com/css-tricks.com/wp-content/uploads/2020/05/screen_flex_after_issue.png?ssl=1)

Why the `::after` hack is not reliable.

That was one hacky idea. Another is not to use a pseudo-element, but add as many empty divs after the thumbnails as there are columns that we’re expecting to have.

The expected number of columns is something we should be able to approximate since the size of the thumbnails is fixed and we probably want to set a maximum width for the post since text that stretches across the width of a full screen can visually exhausting for eyes to read. Dividing the maximum width by the fixed thumbnail width should give us the maximum number of columns in this case.

The first empty elements will take up the full width of the row that’s not completely filled with thumbnails, while the rest will spill into other rows. But since their `height` is zero, it won’t matter visually.

This kind of does the trick but, again, it’s hacky and still doesn’t produce the exact result I want since it sometimes ends up with big and kind of ugly-looking gaps between the columns.

#### A grid solution?

The grid layout has always sounded like the answer, given its name. The problem was that all examples I had seen by then were using a predefined number of columns and that doesn’t work for this particular pattern where the number of columns is determined by the viewport width.

Last year, while coding a collection of one element, pure CSS background patterns, I had the idea of generating a bunch of media queries that would modify a CSS variable, `--n`, corresponding to the number of columns used to set `grid-template-columns`.

    $w: 13em;
    $h: 19em;
    $f: $h/$w;
    $n: 7;
    $g: 1em;

    --h: #{$f*$w};
    display: grid;
    grid-template-columns: repeat(var(--n, #{$n}), var(--w, #{$w}));
    grid-gap: $g;
    place-content: center;

    @for $i from 1 to $n {
      @media (max-width: ($n - $i + 1)*$w + ($n - $i + 2)*$g) {
        --n: #{$n - $i}
      }
    }

I was actually super proud of this idea at the time, even though I cringe looking back on it now. One media query for every number of columns possible is not exactly ideal, not to mention it doesn’t work so well when the grid width doesn’t equal the viewport width, but is still somewhat flexible and also depends on the width of its siblings.

### A magic solution

I finally came across a better solution while working with CSS grid and failing to understand why the `repeat()` function wasn’t working in a particular situation. It was so frustrating and prompted me to go to MDN, where I happened to notice the `[auto-fit](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)` keyword and, while I didn’t understand the explanation, I had a hunch that it could help with _this_ other problem, so I dropped everything else I was doing and gave it a try.

Here’s what I got:

    .grid--thumbs {
      display: grid;
      justify-content: center;
      grid-gap: .25em;
      grid-template-columns: repeat(auto-fit, 8em);
    }

I also discovered the [`minmax()`](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax) function, which can be used in place of fixed sizes on grid items. I still haven’t been able to understand exactly how `minmax()` works — and the more I play with it, the less I understand it — but what it looks like it does in this situation is create the grid then stretch its columns equally until they fill all of the available space:

    grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));

Another cool thing we can do here is prevent the image from overflowing when it’s wider than the grid element. We can do this by replacing the minimum `8em` with `min(8em, 100%)` That essentially ensures that images will never exceed 100%, but never below 8em. Thanks to Chris for this suggestion!

Note that the [`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/min) function doesn’t work in pre-Chromium Edge!

Keep in mind that this only produces a nice result if all of the images have the same aspect ratio — like the square images I’ve used here. For my blog, this was not an issue since all photos were taken with my Sony Ericsson W800i phone, and they all had the same aspect ratio. But if we were to drop images with different aspect ratios, the grid wouldn’t look as good anymore:

We can, of course, set the image `height` to a fixed value, but that distorts the images… unless we set [`object-fit`](https://css-tricks.com/on-object-fit-and-object-position/) to `cover`, which solves our problem!

Another idea would be to turn the first thumbnail into a sort of banner that spans all grid columns. The one problem is that we don’t know the number of columns because that depends on the viewport. But, there _is_ a solution — we can set `grid-column-end` to `-1`!

    .grid--thumbs {


      a:first-child {
        grid-column: 1/ -1;

        img { height: 13em }
      }
    }

The first image gets a bigger `height` than all the others.

Of course, if we wanted the image to span all columns except the last, one we’d set it to `-2` and so on… negative column indices are a thing!

`auto-fill` is another grid property keyword I noticed on MDN. The explanations for both are long walls of text without visuals, so I didn’t find them particularly useful. Even worse, replacing `auto-fit` with `auto-fill` in any of the grid demos above produces absolutely no difference. How they really work and how they differ still remains a mystery, even after checking out [articles](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/#article-header-id-0) or toying with [examples](https://gridbyexample.com/examples/example37/).

However, trying out different things and seeing what happens in various scenarios at one point led me to the conclusion that, if we’re using a `minmax()` column width and not a fixed one (like `8em`), then it’s probably better to use `auto-fill` instead of `auto-fit` because, the result looks better if we happen to only have a few images, as illustrated by the interactive demo below:

I think what I personally like best is the initial idea of a thumbnail grid that’s middle-aligned and has a mostly fixed column width (but still uses `min(100%, 15em)` instead of just `15em` though). At the end of the day, it’s a matter of personal preference and what can be seen in the demo below just happens to look better to me:

I’m using `auto-fit` in this demo because it produces the same result as `auto-fill` and is one character shorter. However, what I didn’t understand when making this is that both keywords produce the same result because there are more items in the gallery than we need to fill a row.

But once that changes, `auto-fit` and `auto-fill` produce different results, as illustrated below. You can change the `justify-content` value and the number of items placed on the grid:

I’m not really sure which is the better choice. I guess this also depends on personal preference. Coupled with `justify-content: center`, `auto-fill` seems to be the more logical option, but, at the same time, `auto-fit` produces a better-looking result.
