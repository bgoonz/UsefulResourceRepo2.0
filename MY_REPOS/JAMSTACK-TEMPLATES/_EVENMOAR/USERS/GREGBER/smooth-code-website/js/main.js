(function() {

  // Header.
  var didScroll = false;
  $(window).on('scroll', function () {
    if (didScroll) return;

    didScroll = true;
    setTimeout(function () {
      $('.navbar-default').toggleClass('navbar-shrink', $(document).scrollTop() >= 100);
      didScroll = false;
    }, 50);
  });

  // Add easeInOutExpo
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t === 0) return b;
      if (t === d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  });

  // Smooth scroll.
  $('a.page-scroll').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 500, 'easeInOutExpo', function () {
      window.location.hash = $anchor.attr('href');
    });
    event.preventDefault();
  });
})();
