var quote = "",
  author = "",
  getQuote = function () {
    $.ajax({
      url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
      beforeSend: function (t) {
        t.setRequestHeader(
          "X-Mashape-Key",
          "2i46xuS3BrmshMZJMG5DtSTCiwYZp1CY0btjsn0uwuEf5N8TP9"
        );
      },
      success: function (t) {
        (quote = t.quote),
          (author = t.author),
          $(".title").text(quote),
          $(".subtitle").text("- " + author);
        var e =
          "https://twitter.com/intent/tweet?text=" + quote + " - " + author;
        $("#tweetquote").attr("href", e);
      },
    });
  };
$(document).ready(function () {
  $(".nav-toggle").click(function () {
    $(".nav-menu").toggleClass("is-active");
  }),
    $.LoadingOverlaySetup({
      color: "rgba(0, 0, 0, 0.8)",
      image: "img/loader.svg",
    }),
    $(document).ajaxSend(function (t, e, o) {
      $.LoadingOverlay("show");
    }),
    $(document).ajaxComplete(function (t, e, o) {
      $.LoadingOverlay("hide");
    }),
    getQuote(),
    $("#newquote").click(function () {
      getQuote();
    });
});
