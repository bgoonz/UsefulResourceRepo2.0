var quote = "";
var author = "";

var getQuote = function () {
  $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "X-Mashape-Key",
        "2i46xuS3BrmshMZJMG5DtSTCiwYZp1CY0btjsn0uwuEf5N8TP9"
      );
    },
    success: function (json) {
      //process the JSON data etc
      //var obj = $.parseJSON(json);
      quote = json.quote;
      author = json.author;
      $(".title").text(quote);
      $(".subtitle").text("- " + author);
      var tweet =
        "https://twitter.com/intent/tweet?text=" + quote + " - " + author;
      $("#tweetquote").attr("href", tweet);
    },
  });
};

$(document).ready(function () {
  $(".nav-toggle").click(function () {
    $(".nav-menu").toggleClass("is-active");
  });

  $.LoadingOverlaySetup({
    color: "rgba(0, 0, 0, 0.8)",
    image: "img/loader.svg",
  });

  $(document).ajaxSend(function (event, jqxhr, settings) {
    $.LoadingOverlay("show");
  });

  $(document).ajaxComplete(function (event, jqxhr, settings) {
    $.LoadingOverlay("hide");
  });

  getQuote();

  $("#newquote").click(function () {
    getQuote();
  });
});
