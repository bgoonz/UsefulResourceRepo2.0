# Responsive Web Design and JavaScript

> Is your RWD tool belt feeling a little light? You're probably missing the right JavaScript. Rob Tarr has just what you may be looking for.

If you haven’t read [Ethan’s article](https://alistapart.com/article/responsive-web-design/), stop now, read it, and then come back here.

Now, let’s talk about some responsive web design. For over a year now, we’ve been developing responsive websites almost exclusively at Sparkbox, and I’ve found something missing in our responsive tool belt—a good way to handle JavaScript.

Example
-------

Recently, I was working on a secondary navigation with two sections. At media queries for smaller sized screens, the navigation had links to show and hide each section using jQuery animations. This posed a problem, however. After they were hidden, jQuery left `style="display: none"` on the elements. After resizing the browser and jumping to a media query for a larger sized screen, these elements should have been shown without the need for the additional links, but they were hidden because of the inline style. 

    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Media Query Testing</title>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <nav id="secondary-nav" class="secondary">   
         <div class="button-group">
           <a href="#quick-links" class="mobile-button">Quick Links</a>
           <a href="#site-search" class="mobile-button search-button">Site Search</a>
         </div>
         <ul id="quick-links" class="quick-links-menu secondary-menu">
           <li><a href="#" title="">News</a></li>
           <li><a href="#" title="">Account Info</a></li>
           <li><a href="#" title="">FAQ</a></li>
           <li><a href="#" title="">Help</a></li>
         </ul>
         <fieldset id="site-search" class="site-search secondary-menu">
           <input class="search-field" type="search" name="site-search">
           <input class="search-submit" type="submit" value="Search">
         </fieldset>
       </nav>
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
      <script src="js/mediaCheck.js"></script>
      <script src="js/script.js"></script>
    </body>
    </html>
    

Now, I know that everyone likes to say that only developers change their browser sizes to see how things respond. There are real problems with this type of thinking. What if the user maximizes their window or makes it smaller based on the content? This might switch media queries, triggering a break in the secondary navigation. Here’s another example that is pretty relevant – what if the controlling media query is somewhere around 900px? A simple orientation change of an iPad would cause these navigation elements to disappear. Oops. Do you care now?

Solution
--------

The solution to this problem lies in the elusive `matchMedia` method; it provides events triggered by media queries.

In order to run code based on media queries, I’m using `mediaCheck` (a wrapper I’ve written around `matchMedia` to fire events when entering or leaving a designated media query) to trigger the cleanup code when entering larger media queries.

    $(function() {
      function secondaryNavLinks( e ) {
        var $toOpen = $( $( e.target ).attr( "href" ) + ":hidden" );
        $( "#secondary-nav" ).children( ".secondary-menu:visible" ).slideUp();
        $toOpen.slideDown();
        e.preventDefault();
      }
    
      function secondaryNavCleanup() {
        $( ".secondary-menu" ).removeAttr( "style" );
      }
    
      $( ".secondary a" ).on( "click", secondaryNavLinks );
    
      mediaCheck({
        media: '(min-width: 800px)',
        entry: function() {
          secondaryNavCleanup();
        },
      });
    });
    

Now when the 600px media query is fired, it will remove the `style` attributes and all is well with the secondary nav.

`mediaCheck` provides a nice wrapper to easily turn code on and off based on media queries. Switching behaviors and cleaning up code between media queries is now made simple. JavaScript mischief managed.

    var mediaCheck = function(options) {
      var mq,
          matchMedia = window.matchMedia !== undefined;
    
      if (matchMedia) {
        mqChange = function(mq, options) {
          if (mq.matches) {
            options.entry();
          } else {
            options.exit();
          }
        };
    
        createListener = function(mqDetails) {
          mq = window.matchMedia(mqDetails.media);
          mq.addListener(function() {
            mqChange(mq, mqDetails);
          });
          mqChange(mq, mqDetails);
        };
    
        createListener(options);
      }
    };
    

Take it out for a test drive, kick the tires, and [look under the hood](https://github.com/sparkbox/mediaCheck). Feel free to ask questions and contribute, and let’s move the web forward together.


[Source](https://sparkbox.com/foundry/responsive_web_design_and_javascript)