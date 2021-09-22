!(function (n) {
  n(document).ready(function () {
    n(".nav-toggle").click(function () {
      n(".nav-menu").toggleClass("is-active");
    });
  });
})(jQuery);
