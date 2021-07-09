"use strict";
!(function () {
  function e(e, s) {
    $(
      ".snippet-top-level-nav a[href*='"
        .concat(e, "'], .snippet-category a[href*='")
        .concat(e, "']")
    ).on("click", function (t) {
      t.preventDefault();
      var n = $(t.target);
      $(".snippet-top-level-nav")
        .find("> li")
        .removeClass("active")
        .end()
        .find("a[href*='".concat(e, "']"))
        .parent()
        .addClass("active"),
        $(".list-of-snippets")
          .removeClass("limit-shown")
          .find("li")
          .addClass("hide")
          .end()
          .find("li[data-category='".concat(s, "']"))
          .removeClass("hide"),
        history.replaceState("", "", n.attr("href")),
        (document.title = "".concat(s, ' Snippets" + " | CSS-Tricks'));
    }),
      window.location.pathname === e &&
        $(".snippet-top-level-nav").find("a[href*='".concat(e, "']")).click();
  }
  e("/snippets/html/", "HTML"),
    e("/snippets/css/", "CSS"),
    e("/snippets/javascript/", "JavaScript"),
    e("/snippets/jquery/", "jQuery Code Snippets"),
    e("/snippets/sass/", "Sass"),
    e("/snippets/svg/", "SVG"),
    e("/snippets/php/", "PHP"),
    e("/snippets/wordpress/", "WordPress"),
    e("/snippets/htaccess/", "HTAccess");
})();
