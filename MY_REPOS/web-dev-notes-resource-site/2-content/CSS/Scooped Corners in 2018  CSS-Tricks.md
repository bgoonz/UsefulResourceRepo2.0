# Scooped Corners in 2018 | CSS-Tricks

> When I saw Chris' article on notched boxes, I remembered that I got a challenge a while ago to CSS a design like it, but with rounded, scooped corners instead. So, let's see how we can do it that way instead and expand it to multiple corners while being mindful of browser support.

When I saw Chris’ article on [notched boxes](https://css-tricks.com/notched-boxes/), I remembered that I got a challenge a while ago to CSS a design like the one below in a cross-browser manner:

![The design shows a header box and a 2x2 grid of boxes below, all middle aligned horizontally. There's a line extending from the bottom middle of the header, going in between the two boxes on the row right underneath the header and then growing into a circle whose central point is at equal distance from all four boxes on the 2x2 grid. To accommodate for this pretty big circle, all these boxes have a scooped corner (that's the bottom right corner for the top left box, the bottom left corner for the top right box, the top right corner for the bottom left box and the top left corner for the bottom right box).](https://i1.wp.com/css-tricks.com/wp-content/uploads/2018/03/design.png?ssl=1)

What the challenge looked like.

It looks pretty similar to the concept of notched boxes, except the corners are now scooped and we only have to worry about one corner per box. So let’s see how we can do it, how we can expand the technique to multiple corners, what issues we run into and how we can get around them with or without making browser support compromises.

### The initial idea: `box-shadow`!

We start with a box element:

    <div class='box'></div>

We can give this some dimensions or let its dimensions be decided by the content—it doesn’t really matter. For simplicity, we’re just setting a `max-width` and a `min-height` on it. We’re also giving it an `outline` so we can see its boundaries.

    .box {
      outline: solid 2px;
      max-width: 15em;
      min-height: 10em;
    }

Next, we absolutely position a square `::before` pseudo-element whose edge length is equal to the diameter (or twice the radius `$r`) of the scoop in the corner. We also give this pseudo-element a reddish `box-shadow` and a dummy `background` (that we’ll remove later) just so that we can see it better:

    $r: 2em;
    
    .box {
      position: relative;
      
      
      &:before {
        position: absolute;
        padding: $r;
        box-shadow: 0 0 7px #b53;
        background: #95a;
        content: ''
      }
    }

And this is what we have so far:

Well, it doesn’t look too exciting… yet! So let’s move on and make this square a disc by setting `border-radius: 50%` on it and give it a negative `margin` equal to its radius `$r`, so that its central point coincides with the `(0,0)` point (top left corner) of its parent box. We also set `overflow: hidden` on the parent box, so that whatever of this pseudo-element is outside the `.box` gets cut out.

    $r: 2em;
    
    .box {
      overflow: hidden;
      
      
      &:before {
        
        margin: -$r;
        border-radius: 50%
      }
    }

Now we’re starting to see the shape we’ve been aiming for:

But it’s still not quite what we want. In order to get there, we use the fourth length value for the `box-shadow` property: the **spread radius**. If you need a refresher on how `box-shadow` works with these four values, you can check out the interactive demo below:

You may have already guessed what we do next. We remove the dummy `background`, we zero the first three `box-shadow` values (the x and y offsets and the blur radius) and use a pretty big number for the last one (the spread radius):

    box-shadow: 0 0 0 300px;

The interactive demo below shows how increasing the spread radius makes it cover up more and more of its parent `.box`:

So, the trick here is having _a spread radius sufficiently large so that it covers the rest of the parent element_. The cool thing about this is that we can make the `box-shadow` semi-transparent or have rounded corners on the parent `.box`:

    .box {
      
      border-radius: 1em;
      
      &:before {
        
        box-shadow: 0 0 0 300px rgba(#95a, .75);
      }
    }

Of course, just like Chris pointed out in the article on notched boxes, we can make the scoop radius a CSS variable and then easily modify that from the JavaScript. Then everything updates nicely, even with text content in our box:

    :root { --r: 50px } 
    
    .box {
      
      padding: var(--r);
    
      &:before {
        
        margin: calc(-1*var(--r));
        padding: inherit;
    }

Note that when we also have text content, we need to set a negative `z-index` on the `::before` pseudo-element and explicitly position it in the corner as we now also have a `padding` on the `.box` to compensate for the scoop.

    .box {
      
    
      &:before {
        
        z-index: -1;
        top: 0;
        left: 0
    }

### Applying this technique

Now, let’s move further and see how we can apply this concept in order to reproduce the design I showed at the beginning. In this particular case, the central points of the pseudo-element discs don’t coincide with box corners, but are outside, in the middle of the space in between boxes.

The structure used is pretty straightforward, just a `<header>` element followed by four `<article>` elements I’ve generated in a Pug loop:

    while n--
      article
        h3 #{data[n].name}
        section
          p #{data[n].quote}
          a(href='#') go

We use a wrapping flexbox layout on the `<body>` with the `<header>` really wide and with one or two `<article>` elements on each row, depending on how wide the viewport is.

![Screenshot of the design implementation in landscape vs. portrait mode. In landscape mode, we have the 4 article boxes arranged as a 2x2 grid. In portrait mode, they're on a 1x4 grid (aka all on a column).](https://i2.wp.com/css-tricks.com/wp-content/uploads/2018/03/design_landscape_vs_portrait.png?ssl=1)

Landscape (left) vs. portrait (right) mode.

If we have a single `<article>` on each row, we don’t have scooped corners, so their radius is `0px`. Otherwise, we give this radius `--r` a non-zero value.

    $min-w: 15rem; 
    $m: 1rem; 
    
    html { --r: 0px; }
    
    article {
      margin: $m;
      min-width: $min-w;
      width: 21em;
    }
    
    @media (min-width: 2*($min-w + 2*$m) ) {
      html { --r: 4rem; }
      
      article { width: 40%; }
    }

Let’s now consider just the situation when we have two `<article>` elements per row (and of course a scooped corner for each because that’s what’s of interest to us).

In the case of the first one, we start with the leftmost limit of the disc along the right edge of its parent. That’s `left: 100%` so far. To move the x coordinate of the disc’s central point on the right edge of its parent, we subtract the disc’s radius, which brings us to `left: calc(100% - var(--r))`. But we don’t want it on the right edge, we want it offset to the right by the `<article>` margin `$m`, which brings us to the final value:

    left: calc(100% - var(--r) + #{$m});

Along the y axis, we start with the topmost limit of the disc along the bottom edge of its parent—that’s `top: 100%`. To put the disc’s central point on the bottom edge of the parent box, we move it up by one radius, which gives us `top: calc(100% - var(--r))`. Finally, we want this central point to be `$m` below the parent’s bottom edge, which gives us the final vertical offset of:

    top: calc(100% - var(--r) + #{$m});

For the second `<article>` (second on the same row), we have the same value in the case of the vertical offset.

Horizontally however, we start with the disc’s left limit being along its parent’s left edge—that’s `left: 0%`. To put the disc’s central point on its parent’s left edge, we move it left by a radius `--r`, thus getting `left: calc(0% - var(--r))`. However, the final position is `$m` to the left of the parent’s left edge:

    left: calc(0% - var(--r) - #{$m});

For the third `<article>` (first on the last row), we have the same value for the offset along the x axis as in the case of the first one.

Vertically, we start with the disc’s top limit along the top edge of its parent—that’s `top: 0%`. To put the disc’s central point on the parent’s top edge, we move it up by a radius `--r`, thus getting `top: calc(0% - var(--r))`. But we want to have it `$m` above the parent’s top edge, so the final top offset is:

    top: calc(0% - var(--r) - #{$m});

For the final one (second on the last row), we have the same horizontal offset as in the case of the one above it and the same vertical offset as for the one to its left on the same row.

So, our offsets can be written:

    article:nth-of-type(1) { 
     left: calc(100% - var(--r) + #{$m});
     top:  calc(100% - var(--r) + #{$m});
    }
    
    article:nth-of-type(2) { 
     left: calc(  0% - var(--r) - #{$m});
     top:  calc(100% - var(--r) + #{$m});
    }
    
    article:nth-of-type(3) { 
     left: calc(100% - var(--r) + #{$m});
     top:  calc(  0% - var(--r) - #{$m});
    }
    
    article:nth-of-type(4) { 
     left: calc(  0% - var(--r) - #{$m});
     top:  calc(  0% - var(--r) - #{$m});
    }

This means the positions of the central points of the discs depend on the gap in between our `<article>` elements (this gap is twice the `margin: $m` we set on them), on the disc radius `r` and on a couple of horizontal and vertical multipliers (`--i` and `--j` respectively). Both these multipliers are initially `-1`.

For the first two `<article>` elements (on the first row of the `2x2` grid), we change the vertical multiplier `--j` to `1` because we want the y coordinate of the discs’ central points to be below the bottom edge, while for the odd ones (on the first column), we change the horizontal multiplier `--i` to `1` because we want the x coordinate to be to the right of the right edge.

    html { --i: -1; --j: -1 } 
    
    h3, section {
      &:before {
        
        top:  calc((1 + var(--j))*50% - var(--r) + var(--j)*#{$m});
        left: calc((1 + var(--i))*50% - var(--r) + var(--i)*#{$m});
      }
    }
    
    @media (min-width: 2*($min-w + 2*$m)) {
      article {
        
        &:nth-of-type(-n + 2) { --j: 1 }
    
        
        &:nth-of-type(odd) { --i: 1 }
    }

Note that we only have visible disc cutouts on the `<section>` element for the first two `<article>` elements and only on the `<h3>` for the last two. So for the first two `<article>` elements, the radius `--r` on the heading’s `::before` pseudo-element is `0`, while for the last two, this radius is `0` for the section’s `::before` pseudo:

    @media (min-width: 2*($min-w + 2*$m)) {
      article {
        &:nth-of-type(-n + 2) h3, 
        &:nth-of-type(n + 3) section { &:before { --r: 0 ; } }
      }
    }

In a similar manner, we add differentiated paddings to the children of the `<article>` elements:

    $p: .5rem;
    
    h3, section { padding: $p; }
    
    @media (min-width: 2*($min-w + 2*$m)) {
      article {
        &:nth-of-type(-n + 2) section, 
        &:nth-of-type(n + 3) h3 {
          padding-right: calc(.5*(1 + var(--i))*(var(--r) - #{$m}) + #{$p});
          padding-left: calc(.5*(1 - var(--i))*(var(--r) - #{$m}) + #{$p});
        }
      }
    }

This helps us get the result we’re looking for:

The above demo works in current versions of all major browsers and, if we can do with some repetition instead of using CSS variables, we can extend support all the way back to IE9.

### Potential issues with the above method

While this was a quick and easy cross-browser way to get the desired result _in this particular case_, we may not always be so lucky with this approach.

First off, we need a pseudo-element for each scooped corner, so if we want this effect for all corners, we need to bring in an extra element. Sad panda.

Secondly, we may not always want a solid `background`. We may want a semi-transparent one (which becomes a pain to get if we want to have more than one scooped corner), a gradient one (while we can emulate some radial gradients with `box-shadow`, it’s a less than ideal solution) or even an image `background` (hardly doable with the only solution being to use `mix-blend-mode` which [cuts out Edge support](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6263617-mix-blend-mode) without an elegant fallback).

And how about really large boxes for which the spread we’ve set is not enough? Ugh.

So, let’s explore other, more reliable approaches with various degrees of browser support.

### Flexibility _and_ good browser support? SVG it!

This is probably no surprise, but the full SVG solution fares best if we want something flexible and reliably cross-browser today. It’s a solution that involves using an SVG element before the content of our box. This SVG contains a `<circle>` on which we’ve set a radius `r` attribute.

    <div class='box'>
      <svg>
        <circle r='50'/>
      </svg>
      TEXT CONTENT OF BOX GOES HERE
    </div>

We absolutely position this SVG within the box and size it such that it fully covers its parent:

    .box { position: relative; }
    
    svg {
      position: absolute;
      width: 100%;
      height: 100%;
    }

Nothing too interesting so far, so let’s give the `<circle>` an `id` and clone it in the other corners:

    <circle id='c' r='50'/> 
    <use xlink:href='#c' x='100%'/> 
    <use xlink:href='#c' y='100%'/> 
    <use xlink:href='#c' x='100%' y='100%'/> 

Note that if we want to exclude one corner or more, we just don’t clone it there.

Alright, but what we’ve done here is create circles in the corners and what we actually want is… the exact opposite! What we do next is put these circles within a `<mask>`, on top of a `white`, full-size (covering the whole SVG) rectangle and then we use this `mask` on another full size rectangle:

    <mask id='m' fill='#fff'>
      <rect id='r' width='100%' height='100%'/>
      <circle id='c' r='50' fill='#000'/>
      <use xlink:href='#c' x='100%'/>
      <use xlink:href='#c' y='100%'/>
      <use xlink:href='#c' x='100%' y='100%'/>
    </mask>
    <use xlink:href='#r' fill='#f90' mask='url(#m)'/>

The result can be seen below:

If we have text, we need to adapt the box `padding` to our corner radius, setting the it to the same value as we’ve set the radius of the SVG circle, using JavaScript to keep them in sync:

Of course, the `fill` of our background rectangle doesn’t need to be a solid one. It may well be semi-transparent (as it is in the demo above), or we can use an SVG gradient or pattern for it. The latter would also allow us to use one or more background images.

### But I came here for _CSS_ candy!

Well, glad you asked! There are a number of things we can do here to shift the weight of the masking method from SVG to CSS.

Sadly, none of these is cross-browser, but they simplify things and they’re definitely something to keep a watch for in the near or more distant future.

#### Use CSS masking on HTML elements instead

What we do here is remove everything outside the `mask` from the SVG. Then, from the CSS, we set a `background` (which can be semi-transparent, a CSS gradient, an image, a combination of multiple backgrounds… anything that CSS has to offer) and the `mask` property on the `.box` element:

    .box {
      
      mask: url(#m);
    }

Note that setting an inline SVG mask on an HTML element only works in Firefox for now!

![Animated gif. Dragging a slider changes both the r attribute of the circle inside the SVG mask and the padding around the text content inside the box.](https://i2.wp.com/css-tricks.com/wp-content/uploads/2018/03/mask_css_on_html.gif?ssl=1)

Version using CSS masking directly on our `.box` ([live demo](https://codepen.io/thebabydino/pen/jzVVbo), Firefox only).

#### Set the circle radius from the CSS

This means removing the `r` attribute from our `<circle>` and setting it in the CSS to the same variable as the box padding:

    .box { padding: var(--r); }
    
    [id='c'] { r: var(--r); }

This way, when we change the value of `--r`, both the scoop radius and the `padding` around the `.box` content get updated!

Note that setting geometry properties for SVG elements from the CSS only works in Blink browsers for now!

![Screenshot. Shows the corners being scooped out in the version setting the radius of the scoop circle as a CSS variable from the CSS.](https://i1.wp.com/css-tricks.com/wp-content/uploads/2018/03/mask_css_radius_for_circle.png?ssl=1)

Version using a CSS variable for the `<circle>` radius ([live demo](https://codepen.io/thebabydino/pen/XENNog), Blink only).

#### Combine the previous two methods

While this would be cool, it’s sadly not possible in practice in any browser at the moment. But the good news is we can do even better than that!

#### Use CSS gradients for masking

Note that CSS masking on HTML elements doesn’t work at all in Edge at this point, though it’s [listed as “In Development”](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/masks/) and a flag for it (that doesn’t do anything for now) [has already shown up](https://pbs.twimg.com/media/DXggq8fW4AAAIbG.jpg) in `about:flags`.

We ditch the SVG part completely and start building our CSS gradient `mask`. We create the circles at the corners using radial gradients. The following CSS creates a circle of radius `--r` in the top left corner of a box:

    .box {
      background: radial-gradient(circle at 0 0, #000 var(--r, 50px), transparent 0);
    }

It can be seen live in the demo below, where we’ve also given the box a red outline just so that we can see its boundaries:

We use the exact same gradient for our `mask`:

    .box {
      
      
      mask: radial-gradient(circle at 0 0, #000 var(--r, 50px), transparent 0);
    }

Note that WebKit browsers still need the `-webkit-` prefix for the `mask` properties.

We then add the circles at the other corners:

    $grad-list: radial-gradient(circle at   0    0 , #000 var(--r, 50px), transparent 0), 
                radial-gradient(circle at 100%   0 , #000 var(--r, 50px), transparent 0), 
                radial-gradient(circle at   0  100%, #000 var(--r, 50px), transparent 0), 
                radial-gradient(circle at 100% 100%, #000 var(--r, 50px), transparent 0);
    .box {
      
      
      mask: $grad-list
    }

That’s insanely repetitive, either a lot of writing or a lot of copy-pasting, so let’s see what we can do about that.

First off, we use a CSS variable for the stop list. This eliminates repetition in the generated CSS.

    $grad-list: radial-gradient(circle at   0    0 , var(--stop-list)), 
                radial-gradient(circle at 100%   0 , var(--stop-list)), 
                radial-gradient(circle at   0  100%, var(--stop-list)), 
                radial-gradient(circle at 100% 100%, var(--stop-list));
    
    .box {
      
      
      --stop-list: #000 var(--r, 50px), transparent 0;
      mask: $grad-list;
    }

But it’s still not much better, so let’s generate the corners within a loop:

    $grad-list: ();
    
    @for $i from 0 to 4 {
      $grad-list: $grad-list, 
        radial-gradient(circle at ($i%2)*100% floor($i/2)*100%, var(--stop-list));
    }
    
    .box {
      
      
      --stop-list: #000 var(--r, 50px), transparent 0;
      mask: $grad-list;
    }

Much better as far as the code goes because now we don’t have to write anything multiple times and run the risk of not updating everywhere later. But the result so far isn’t what we were going for:

![Screenshot. Shows how the code above masks out everything but the quarter circles in the corners (the opposite of what we want).](https://i1.wp.com/css-tricks.com/wp-content/uploads/2018/03/mask_css_w_rad_grad_0.png?ssl=1)

Result of the code above ([live demo](https://codepen.io/thebabydino/pen/RMoKNO), no Edge support for now).

Here, we’re cutting out everything but the corners, which is the opposite of what we want.

One thing we can do is reverse the gradients, make the corner circles `transparent` and the rest `black` with:

    --stop-list: transparent var(--r, 50px), #000 0;

This does the trick when we use just one gradient for just one corner:

![Screenshot. Shows the result when we have an abrupt change from transparent to black in a masking radial gradient at a corner: a quarter circle gets masked out at that corner.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/03/mask_css_w_rad_grad_1.png?ssl=1)

Result when using just one gradient ([live demo](https://codepen.io/thebabydino/pen/LdWaxO), no Edge support for now).

However, when we stack up all four of them (or just even two), we get a `black` rectangle the size of our box for the `mask`, which means nothing actually gets masked out anymore.

![Animated gif. When the mask's gradient list is empty, no masking happens. When we add full size radial gradient layer with a transparent quarter circle in the top left corner, this masks out the area of that transparent quarter circle as these masks are alpha masks, giving each pixel of the element the mask is applied to the alpha of the corresponding mask pixel at that position. When we add another such gradient with a transparent quarter circle at another corner, this covers the transparent corner of the first layer and we can see the non-transparent corner of the first layer through its own transparent corner. So now the resulting masks has no more trnsparent pixels and nothing gets masked out anymore.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/03/mask_grad_layering.gif?ssl=1)

Layering mask gradients ([live demo](https://codepen.io/thebabydino/pen/oqegWy), no Edge support for now).

So, we restrict each of these gradients to a quarter of our box – `50%` of the `width` and `50%` of the `height`, thus getting `25%` (a quarter) of the area for each:

![Illustration. Shows the full mask area being divided into 4 quarters, each being 50% of the width and 50% of the height. The first is in the top left corner, the second in the top right corner, the third in the bootom left corner and th fourth in the bottom right corner.](https://css-tricks.com/wp-content/uploads/2018/03/mask_quarters.svg)

Our mask, split into four quarters ([live](https://codepen.io/thebabydino/pen/LdjmyQ?editors=1000)).

This means we also need to set a `mask-size` of `50% 50%`, a `mask-repeat` of `no-repeat`, and position each `mask-image` into the desired corner:

    $grad-list: ();
    
    @for $i from 0 to 4 {
      $x: ($i%2)*100%;
      $y: floor($i/2)*100%;
      $grad-list: $grad-list 
                  radial-gradient(circle at $x $y, var(--stop-list)) 
                  $x $y; 
    }
    
    .box {
      
      
      --stop-list: transparent var(--r, 50px), #000 0;
      mask: $grad-list;
      mask-size: 50% 50%;
      mask-repeat: no-repeat;
    }

Note that WebKit browsers still need the `-webkit-` prefix for `mask` properties.

But the big problem here is… the problem with division and rounding in general—our four quarters put together don’t always manage to make up a whole again, so we end up with gaps in between them.

![Annotated screenshot. Shows and highlights the gaps in between the four quarters.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/03/mask_quarters_lines-an.png?ssl=1)

Sadly, we may get gaps in between the four quarters ([live demo](https://codepen.io/thebabydino/pen/bvqOLq)).

Oh well, it’s not like we can’t cover up those gaps with thin `linear-gradient()` strips or increase the `mask-size` to let’s say `51%`:

![Screenshot showing we don't have gaps in between the four quarters anymore after increasing their mask-size by 1%.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/03/mask_quarters_xtra_bg.png?ssl=1)

Increasing the `mask-size` for each gradient layer fixes the problem of gaps ([live demo](https://codepen.io/thebabydino/pen/eMvbaQ)).

But isn’t there a more elegant way?

Well, there’s a [`mask-composite`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite) property that can help us if we set it to `intersect` when reverting back to the full size gradient layers.

    $grad-list: ();
    
    @for $i from 0 to 4 {
      $grad-list: $grad-list, 
                  radial-gradient(circle at ($i%2)*100% floor($i/2)*100%, var(--stop-list));
    }
    
    .box {
      
      
      --stop-list: transparent var(--r, 50px), #000 0;
      mask: $grad-list;
      mask-composite: intersect;
    }

This is extremely cool because it’s a pure CSS, no SVG solution, but the not-so-good news is that support is limited to Firefox 53+ here.

![Screenshot. Shows that when using mask-composite: intersect, the parts that don't belong to the intersection of all the layers (are not common) gat masked out. That means the quarter circles at the four corners in our case.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/03/mask_css_rad_grad_composite.png?ssl=1)

Result using `mask-composite: intersect` ([live demo](https://codepen.io/thebabydino/pen/pLNebZ)).

However, we at least have the non-standard [`-webkit-mask-composite`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-composite) alternative (taking different values!) for WebKit browsers. So that’s a lot better than support for the final option we have when it comes to scooped corners.

### The `corner-shape` option

Lea Verou came up with this idea some five years ago and even created [a preview page](https://leaverou.github.io/corner-shape/) for it. Sadly, not only is it not implemented by any browser yet, but [the spec](https://drafts.csswg.org/css-backgrounds-4/#corner-shaping) hasn’t advanced much in the meanwhile. It’s still something to keep in mind for the future, as it offers a lot of flexibility with very little code – recreating our effect would only require the following:

    padding: var(--r);
    corner-shape: scoop;
    border-radius: var(--r);

No markup vomit, no long gradient lists, just this very simple piece of CSS. That is… when it finally gets supported by browsers!


[Source](https://css-tricks.com/scooped-corners-in-2018/)