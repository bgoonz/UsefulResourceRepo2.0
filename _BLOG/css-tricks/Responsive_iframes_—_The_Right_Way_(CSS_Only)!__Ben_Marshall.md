## [tl;dr](https://www.benmarshall.me/responsive-iframes/#too-long-to-read)

Use the [responsive iframe generator](https://www.benmarshall.me/responsive-iframe-generator/) to quickly create a responsive iframe at any aspect ratio. Check out the code below to see how you can easily create them with just CSS using aspect ratio boxes.

    .iframe-container {
      overflow: hidden;
      /* 16:9 aspect ratio */
      padding-top: 56.25%;
      position: relative;
    }

    .iframe-container iframe {
       border: 0;
       height: 100%;
       left: 0;
       position: absolute;
       top: 0;
       width: 100%;
    }

    <div class="iframe-container">
      <iframe src="//www.youtube.com/embed/KMYrIi_Mt8A" allowfullscreen></iframe>
    </div>

### [Or you can use custom properties:](https://www.benmarshall.me/responsive-iframes/#custom-properties)

    [style*="--aspect-ratio"] > :first-child {
      width: 100%;
    }
    [style*="--aspect-ratio"] > img {
      height: auto;
    }
    @supports (--custom:property) {
      [style*="--aspect-ratio"] {
        position: relative;
      }
      [style*="--aspect-ratio"]::before {
        content: "";
        display: block;
        padding-bottom: calc(100% / (var(--aspect-ratio)));
      }
      [style*="--aspect-ratio"] > :first-child {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }
    }

    <div style="--aspect-ratio:815/419;">
    </div>

    <div style="--aspect-ratio:16/9;">
    </div>

    <!-- even single value -->
    <div style="--aspect-ratio:1.4;">
    </div>

## [Guide to Responsive iframes](https://www.benmarshall.me/responsive-iframes/#step-by-step)

You’ve spent countless hours designing and building the perfect responsive site. One problem — `iframes`. Proportionally resizing these pesky little windows to another world can be frustrating. It’s easy enough to make it span 100% of its container, but there’s no attribute (yet) to make the height resize accordingly.

So how do you keep from blowing your top trying to make an iframe responsive? **Hint: it doesn’t require any JavaScript, just a simple CSS technique!**

First, let’s define what a “responsive iframes” actually means.

**Native responsive iframes are coming!** There is [the experimental `intrinsicsize` attribute](https://googlechrome.github.io/samples/intrinsic-size/) that I could imagine being quite nice for iframes in addition to images. Plus the [`aspect-ratio` in CSS](https://www.benmarshall.me/css-aspect-ratio/) which could default to use the `width` and `height` attributes on the element.

### [What is a responsive iframe?](https://www.benmarshall.me/responsive-iframes/#what-is-a-responsive-iframe)

The term “responsive iframe” is a little broad. For instance, styling an iframe to use `100%`, `100vw` or `100vh` is technically making it responsive. But what if you need to adjust its height based on the width so it keeps its aspect ratio? That’s where the problem is, iframes are fluid and can’t natively adapt.

The old way of building responsive iframes usually took the form of some nasty JavaScript hack. A better, modern way uses a simple CSS technique — [intrinsic ratios](https://www.benmarshall.me/css-intrinsic-ratio-technique/) — to create an aspect ratio box.

### [What is an aspect ratio box?](https://www.benmarshall.me/responsive-iframes/#aspect-ratio-box)

![Aspect ratio box to create responsive iframes](https://www.benmarshall.me/wp-content/uploads/2014/03/responsive-iframe-diagram.svg)

For the visual learner, here’s how creating responsive iframes work. We have set a default padding-top here, but in reality, the ratio of the sizing of an embed change per provider and even per embed. We need to calculate the padding-top and then add this as a style to the responsive wrapper.

An aspect ratio is basically **a container that adjusts its height based on its width to always keep its aspect ratio** (i.e. 16×9, 4×3, 1×1, etc.). They’re most commonly used to embed iframe videos like YouTube or Vimeo videos.

This isn’t particularly new stuff. I think the original credit goes as far back as 2009 and Thierry Koblentz’s [Intrinsic Ratios](https://alistapart.com/article/creating-intrinsic-ratios-for-video) and maintained popularity even for other kinds of content with articles like [Uncle Dave’s Ol’ Padded Box](http://daverupert.com/2012/04/uncle-daves-ol-padded-box/).

### [What is an intrinsic ratio?](https://www.benmarshall.me/responsive-iframes/#intrinsic-ratio-iframes)

An intrinsic ratio means an element will maintain its aspect ratio when resized. Think of an `img` with `max-width: 100%`. Change the width of its parent and it’ll change the size while keeping the same shape (aka. its aspect ratio).

### [How to calculate aspect ratios?](https://www.benmarshall.me/responsive-iframes/#calculate-aspect-ratio)

Perfect squares and 16:9 stuff is great, but the values used for those are just simple math. An aspect ratio can be anything, and they commonly *are* completely arbitrary. A video or image can be cropped to any size.

So how do you figure out the `padding-top` for say an image that’s `1127.34×591.44`? One way is using the CSS `calc()`, like this:

    padding-top: calc(591.44 / 1127.34 * 100%);

If you’re using a preprocessor like Sass, we could do the calculation ahead of time:

    padding-top: 591.44px / 1127.34px * 100%;

### [How to create a responsive iframe?](https://www.benmarshall.me/responsive-iframes/#how-to)

It’s a cinch to make iframes responsive with an aspect ratio box using the intrinsic ratio technique. Or use the [responsive iframe generator](https://www.benmarshall.me/responsive-iframe-generator/).

**Do not use JavaScript to make iframes responsive.** I cringe every-time I see someone using JS when a simple CSS solution exists — even if it’s “light-weight”, it’s not needed. Worse, they often have issues with cross-browser compatibility & bugginess. The intrinsic ratio technique is a much simpler way to implement cross-browser compliant responsive iframes.

The 3 steps to create a responsive iframe that keeps its aspect ratio:

1.  **Create the aspect ratio box.**

    Add a container for the iframe, determine the aspect ratio percentage, hide the overflow, and set its position to relative.

2.  **Position the iframe.**

    Set the width and height to 100% and absolutely position it to the top left.

3.  **Optimize & style as needed.**

    Add some CSS to remove the iframe border, lazyload it, and remove unneeded attributes.

#### Create the aspect ratio box.

    .iframe-container {
      overflow: hidden;
      /* 16:9 aspect ratio */
      padding-top: 56.25%;
      position: relative;
    }

    <div class="iframe-container"></div>

#### Position the iframe.

    .iframe-container iframe {
       height: 100%;
       left: 0;
       position: absolute;
       top: 0;
    }

    <div class="iframe-container">
      <iframe src="https://www.youtube.com/embed/mB1dE0FotdY" width="100%" frameborder="0" title="Responsive iframe example" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
    </div>

#### Optimize & style as needed.

    .iframe-container iframe {
       border: 0;
       height: 100%;
       left: 0;
       position: absolute;
       top: 0;
       width: 100%;
    }

    <div class="iframe-container">
      <iframe src="https://www.youtube.com/embed/mB1dE0FotdY" loading="lazy" title="Responsive iframe example" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
    </div>

Try resizing your browser window to see the responsive iframe in action.

**Don’t forget to lazy-load your iframes.** In addition to making your iframes responsive, you’ll want to lazy-load them using the `loading` attribute. This improves page load times, enhances the user experience, and increases your search engine rankings. **Learn more about [how to lazy-load iframes](https://www.benmarshall.me/lazy-load-iframes/)**.

### [List of ratios for responsive iframes.](https://www.benmarshall.me/responsive-iframes/#aspect-ratios-list)

Here’s a list of other aspect ratio percentages you can use when defining `padding-top`.

    padding-top: 56.25%; /* 16:9 aspect ratio */
    padding-top: 75%; /* 4:3 aspect ratio */
    padding-top: 66.66%; /* 3:2 aspect ratio */
    padding-top: 62.5%; /* 8:5 aspect ratio */
    padding-top: 100%; /* 1:1 aspect ratio */

**What’s an aspect ratio?** An aspect ratio of an element describes the proportional relationship between its width and its height. Two common video aspect ratios are 4:3 (the universal video format of the 20th century), and 16:9 (universal for HD television and European digital television, and for YouTube videos).

## [Responsive iframes with Sass](https://www.benmarshall.me/responsive-iframes/#using-sass)

Sass makes it even easier to create responsive iframes. You can create a `ratio` `function` that’ll calculate the padding percentage needed for a particular aspect ratio, then a `mixin` to generate the styles.

### [The responsive iframe Sass mixin.](https://www.benmarshall.me/responsive-iframes/#sass-mixin)

Use this Sass mixin to create an aspect ratio box for your iframes.

    /// Aspect ratio box.
    ///
    /// @author Ben Marshall
    /// @link https://www.benmarshall.me/responsive-iframes
    ///
    /// @param {int} $width - Width in pixels.
    /// @param {int} $height - Height in pixels.
    ///
    /// @example scss - Aspect ratio box mixin
    ///   .iframe-container {
    ///     @include aspectRatioBox(834, 469);
    ///   }
    ///
    /// @output CSS aspect ratio box.
    ///   .iframe-container {
    ///     overflow: hidden;
    ///     padding-top: 56.25%;
    ///     position: relative;
    ///     top: 0;
    ///     width: 100%;
    ///   }
    ///
    ///   .iframe-container iframe {
    ///     border: 0;
    ///     height: 100%;
    ///     left: 0;
    ///     position: absolute;
    ///     top: 0;
    ///     width: 100%;
    ///   }
    @mixin aspectRatioBox($width, $height) {
      overflow: hidden;
      padding-top: percentage($height / $width);
      position: relative;

      iframe {
        border: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
    }

### [The `ratio` Sass function.](https://www.benmarshall.me/responsive-iframes/#ratio-sass-function)

Here’s a handy Sass function to calculate aspect ratio percentages:

    /// Calculate a ratio.
    ///
    /// @author Ben Marshall
    /// @link https://www.benmarshall.me/responsive-iframes
    ///
    /// @param {int} $width - Width in pixels.
    /// @param {int} $height - Height in pixels.
    /// @return {int} The calculated ratio percent.
    ///
    /// @example scss - Ratio function
    ///   ratio(834, 469)
    ///   // 56.25
    @function ratio($width, $height) {
      return percentage($height / $width);
    }

## [CSS Framework Support](https://www.benmarshall.me/responsive-iframes/#css-framework)

Many CSS frameworks like [Bootstrap](https://getbootstrap.com/), [Foundation](https://foundation.zurb.com/), or [Materialize](https://materializecss.com/) have built-in styles for aspect ratio boxes. All use the same technique. Check out some of the examples below.

### [Responsive iframes in Bootstrap](https://www.benmarshall.me/responsive-iframes/#bootstrap)

[Bootstrap](https://getbootstrap.com/) 3.2+, uses the predefined class `.embed-responsive`, an aspect ratio class like `.embed-responsive-16by9`, and the `.embed-responsive-item` for the iframe. Check out the examples below or view their [Embeds documentation](https://getbootstrap.com/docs/4.5/utilities/embed/#aspect-ratios).

    <!-- 21:9 aspect ratio -->
    <div class="embed-responsive embed-responsive-21by9">
      <iframe class="embed-responsive-item" src="..."></iframe>
    </div>

    <!-- 16:9 aspect ratio -->
    <div class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" src="..."></iframe>
    </div>

    <!-- 4:3 aspect ratio -->
    <div class="embed-responsive embed-responsive-4by3">
      <iframe class="embed-responsive-item" src="..."></iframe>
    </div>

    <!-- 1:1 aspect ratio -->
    <div class="embed-responsive embed-responsive-1by1">
      <iframe class="embed-responsive-item" src="..."></iframe>
    </div>

Within Bootstrap’s `_variables.scss`, you can change the aspect ratios. Here’s an example of the `$embed-responsive-aspect-ratios` list:

    $embed-responsive-aspect-ratios: (
      (21 9),
      (16 9),
      (4 3),
      (1 1)
    ) !default;

### [Responsive iframes in Materialize](https://www.benmarshall.me/responsive-iframes/#materialize)

If you are using Materialize CSS, then you don’t need your own classes either. Just add the `.video-container` class to your wrapper:

    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/K1K8s-tQGqY" frameborder="0" allowfullscreen></iframe>
    </div>

### [Responsive iframes in Foundation](https://www.benmarshall.me/responsive-iframes/#foundation)

    <div class="responsive-embed">
      <iframe src="https://www.youtube.com/embed/K1K8s-tQGqY" frameborder="0" allowfullscreen></iframe>
    </div>

Aspect ratio modifier classes are set in your `$responsive-embed-ratios` map in your Foundation settings file:

    $responsive-embed-ratios: (
      default: 16 by 9,
      vertical: 9 by 16,
      panorama: 256 by 81,
      square: 1 by 1,
    );

### [Responsive iframes in Semantic UI](https://www.benmarshall.me/responsive-iframes/#semantic-ui)

[Semantic UI](https://semantic-ui.com/) provides an embed module that allows you to create aspect ratio boxes for videos, iframes, and more. See their [Embed documentation](https://semantic-ui.com/modules/embed.html) for more information.

    $('.url.example .ui.embed').embed();

    <div class="ui embed" data-url="https://www.youtube.com/embed/O6Xo21L0ybE" data-placeholder="/images/bear-waving.jpg"></div>

### [Responsive iframes in Bulma](https://www.benmarshall.me/responsive-iframes/#bulma)

In [Bulma](https://bulma.io/), you can apply a specific **ratio** on **any element** by applying the `has-ratio` modifier to a resizable element. Check out the example below or see their [Arbitrary ratios with any element documentation](https://bulma.io/documentation/elements/image/#arbitrary-ratios-with-any-element).

For example, you can apply a `16by9` ratio on an `iframe`.

    <figure class="image is-16by9">
      <iframe class="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/YE7VzlLtp-4?showinfo=0" frameborder="0" allowfullscreen></iframe>
    </figure>

Here’s a list of all the available Bulma aspect ration classes:

- `is-square` or `is-1by1` – 1×1
- `is-5by4` – 5×4
- `is-4by3` – 4×3
- `is-3by2` – 3×2
- `is-5by3` – 5×3
- `is-16by9` – 16×9
- `is-2by1` – 2×1
- `is-3by1` – 3×1
- `is-4by5` – 4×5
- `is-3by4` – 3×4
- `is-2by3` – 2×3
- `is-3by5` – 3×5
- `is-9by16` – 9×16
- `is-1by2` – 1×2
- `is-1by3` – 1×3

## [What if the aspect ratio is dynamic?](https://www.benmarshall.me/responsive-iframes/#iframe-js-solution)

**This is the only time JavaScript should be used.** Let’s say you have content authors creating interactives with each having different dimensions. Without knowing the aspect ratio of the iframe, it’s not easy to implement the intrinsic ratio technique.

You can overcome this problem by using JS. There’s a number of JS libraries out there ([Pym.js](http://blog.apps.npr.org/pym.js/) or this [jQuery plugin](https://npr.github.io/responsiveiframe/)), or you can use this little code snippet.

    function resizeAspectRatioBoxes() {
      var
        $this = $(this),
        proportion = $this.data('proportion'),
        w = $this.attr('width'),
        actual_w = $this.width();

      if (!proportion) {
        proportion = $this.attr('height') / w;
        $this.data('proportion', proportion);
      }

      if (actual_w != w) {
        $this.css('height', Math.round(actual_w * proportion) + 'px');
      }
    }

    $(window).resize(function() {
      resizeAspectRatioBoxes();
    }):

## Responsive iframes are awesome.

Say _Goodbye_ to embedded content breaking your layouts with aspect ratio boxes using the intrinsic ratio technique. No longer do you have to deal with those annoying gaps iframe containers make as content width changes. Just keep in mind these tips when building aspect ratio boxes:

### Things to remember.

- First, **the content within the iframe must be responsive**. If not, it defeats the purpose of creating an aspect ratio box.
- Don’t forget to **specify the containers `position` to be `relative`**. This allows the absolute positioning of the `iframe` within it.
- The **`padding-top` value is calculated based on the aspect ratio** of your content. You can calculate this value using: `(height / width) * 100 = aspect ratio precent.`
- `height` is set to `0` because `padding-bottom` gives the `iframe` it’s height.
- Using `overflow: hidden` is important because it ensures if any content does protrude outside of the container, it will be hidden and avoid screwing up the site’s layout.
- Like with most `absolute` positioned elements, we need to set the `top` and `left` properties so the `iframe` get’s put in the right place.
- Finally, `width` and `height` are set to `100%` so the `iframe` takes up 100% of the containers’ space.

Using aspect ratio boxes is great for all kinds of content, not just iframes. We can use this same technique to make other types of embedded content responsive like Google Maps, calendars, Vimeo, and YouTube videos. Basically, anything that needs to keep its aspect ratio as the screen size changes. **How are you using them on your site?** Comment below.

## [FAQ](https://www.benmarshall.me/responsive-iframes/#faq)

**What is a responsive iframe?**

A responsive iframe is a iframe that “responds” to its container. For instance, 100% width, 100vw, or 100vh.

**What is an aspect ratio box?**

It’s a container that adjusts its height based on its width to always keep its aspect ratio (i.e. 16×9, 4×3, 1×1, etc.).

**How do you calculate an aspect ratio?**

It’s simple: (height / width) \* 100.

**What is an intrinsic ratio?**

Intrinsic ratios maintains an element aspect ratio when resized. Think of an `img` with `max-width: 100%`. Change the width of its parent and it’ll change the size while keeping the same shape (aka. its aspect ratio).

Do you have a question about aspect ratio boxes, the intrinsic ratio technique or how to make iframes responsive? Or maybe you have another nifty technique. I wanna hear from you. Post your questions, comments, or suggestions in the comments below.

## More about iframes & aspect ratio boxes.

With the numerous screen sizes, there’s a host of things to consider to ensure your site looks good no matter the device. Not only is it important to consider the responsiveness of elements, but the performance too. Check out these other articles on iframes, responsive performance, and techniques to keep things sized right.

- [Learn how to lazy-load iframes](https://www.benmarshall.me/lazy-load-iframes/)
- [Responsive iframe Generator](https://www.benmarshall.me/responsive-iframe-generator/)
- [Resize Videos Proportionally with Intrinsic Ratios](https://www.benmarshall.me/resize-videos-proportionally-intrinsic-ratios/)
- [Responsive Images — 6 Simple Ways](https://www.benmarshall.me/responsive-images/)
