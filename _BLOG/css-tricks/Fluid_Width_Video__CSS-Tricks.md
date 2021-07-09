IN A WORLD of responsive and fluid layouts on the web, ONE MEDIA TYPE stands in the way of perfect harmony: video. There are lots of ways in which video can be displayed on your site. You might be self-hosting the video and presenting it via the HTML5 `<video>` tag. You might be using YouTube, Vimeo, or some other video provider that provides `<iframe>` code to display videos. Let’s cover how to make them all fluid width while maintaining an appropriate height based on their aspect ratio.

In each of these video-embedding scenarios, it is very common for a static `width` and `height` to be declared.

    <video width="400" height="300" controls ... ></video>

    <iframe width="400" height="300" ... ></iframe>


    <object width="400" height="300" ... />
    <embed width="400" height="300" ... />

Guess what? Declaring static widths isn’t a good idea in fluid width environments. What if the parent container for that video shrinks narrower than the declared `400px`? It will bust out and probably look ridiculous and embarrassing.

![breakout](https://i1.wp.com/css-tricks.com/NetMag/FluidWidthVideo/images/breakout.png?ssl=1)

Simple and contrived, but still ridiculous and embarassing.

So can’t we just do this?

    <video width="100%" ... ></video>

Well, yep, you can! If you are using standard HTML5 video, that will make the video fit the width of the container. It’s important that you remove the `height` declaration when you do this so that the aspect ratio of the video is maintained as it grows and shrinks, lest you get awkward “bars” to fill the empty space (unlike images, the actual video maintains it’s aspect ratio regardless of the size of the element).

You can get there via CSS (and not worry about what’s declared in the HTML) like this:

    video {

      width: 100%    !important;
      height: auto   !important;
    }

### `<iframe>` Video (YouTube, Vimeo, etc.)

Our little trick from above isn’t going to help us when dealing with video that is delivered via `<iframe>`. Forcing the width to 100% is effective, but when we set `height: auto`, we end up with a static height of 150px[1](https://css-tricks.com/fluid-width-video/#fn:1), which is far too squat for most video and makes for more R&E (Ridiculous and Embarrassing).

Fortunately, there are a couple of possible solutions here. One of them was pioneered by Thierry Koblentz and presented on A List Apart in 2009: [Creating Intrinsic Ratios for Video](http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/). With this technique, you wrap the video in another element which has an intrinsic aspect ratio, then absolute position the video within that. That gives us fluid width with a reasonable height we can count on.

    <div class="videoWrapper">

      <iframe width="560" height="349" src="http://www.youtube.com/embed/n_dZNLr2cME?rel=0&hd=1" frameborder="0" allowfullscreen></iframe>
    </div>

    .videoWrapper {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
    }
    .videoWrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

There is a clever adaptation of this that allows you to adjust the aspect ratio right from the HTML, like:

    <div class="videoWrapper" style="--aspect-ratio: 3 / 4;">
      <iframe ...>

    .videoWrapper {
      ...

      padding-bottom: calc(var(--aspect-ratio, .5625) * 100%);
    }

Some old school video embedding uses `<object>` and `<embed>` tags, so if you’re trying to be comprehensive, update that wrapper selector to:

    .videoWrapper iframe,
    .videoWrapper embed,
    .videoWrapper object { }

### But, but… aspect ratios, legacy content, non-tech users, etc.

The above technique is awesome, but it has several possible limitations:

1.  It requires a wrapper element, so just straight up copy-and-pasting code from YouTube is out. Users will need to be a bit savvier.
2.  If you have legacy content and are redesigning to be fluid, all old videos need HTML adjustments.
3.  All videos need to be the same aspect ratio. Otherwise, they’ll be forced into a different aspect ratio and you’ll get the “bars”. Or, you’ll need a toolbox of class names you can apply to adjust it which is an additional complication.

If either of these limitations applies to you, you might consider a JavaScript solution.

Imagine this: when the page loads all videos are looked at and their aspect ratio is saved. Once right away, and whenever the window is resized, all the videos are resized to fill the available width and maintain their aspect ratio. Using the [jQuery](https://jquery.com/) JavaScript Library, that looks like this:

    var $allVideos = $("iframe[src^='//www.youtube.com']"),


      $fluidEl = $("body");


    $allVideos.each(function() {

      $(this)
        .data('aspectRatio', this.height / this.width)


        .removeAttr('height')
        .removeAttr('width');

    });


    $(window).resize(function() {

      var newWidth = $fluidEl.width();


      $allVideos.each(function() {

        var $el = $(this);
        $el
          .width(newWidth)
          .height(newWidth * $el.data('aspectRatio'));

      });


    }).resize();

### That’s sorta what became FitVids.js

Except rather than deal with all that resizing business, [FitVids.js](https://github.com/davatron5000/FitVids.js) loops over all the videos and adds the aspect-ratio enabling HTML wrapper and CSS necessary. That’s _way more efficient_ than needing to bind to a window resize handler!

### Plain JavaScript instead

jQuery is rather out of favor these days. Fortunately, Dave has a Vanilla version (that is BYO CSS):
