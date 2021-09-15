(function(xData, $) {
  if (!xData || !xData.api) {
    return;
  }

  xData.api.map('instashow-cornerstone', function(params) {
    var $element = $(this);
    var rebuildTimer = $element.data('x-instashow-rebuild-timer');

    if (rebuildTimer) {
      clearTimeout(rebuildTimer);
      $element.data('x-instashow-rebuild-timer', null);
    }

    rebuildTimer = setTimeout(function() {
      $.instaShow($element.parent());
    }, 100);

    $element.data('x-instashow-rebuild-timer', rebuildTimer);
  });
})(window.xData, window.jQuery);
