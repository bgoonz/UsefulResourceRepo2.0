!(function (e) {
  e(document).ready(function () {
    function t() {
      "geolocation" in navigator
        ? navigator.geolocation.getCurrentPosition(function (e) {
            (i = e.coords.latitude), (a = e.coords.longitude), o(a, i);
          })
        : console.log("Browser doesn't support geolocation!");
    }
    function o(t, o) {
      var n =
        "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" +
        o +
        "%2C" +
        t +
        ")%22)and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      console.log(n),
        e.getJSON(n, function (t) {
          e(".temp").text(t.query.results.channel.item.condition.temp + "°"),
            e("#main").text(t.query.results.channel.item.condition.text),
            e("#precipitation").text(
              t.query.results.channel.atmosphere.pressure + " hPa"
            ),
            e("#humidity").text(
              t.query.results.channel.atmosphere.humidity + "%"
            ),
            e("#wind").text(t.query.results.channel.wind.speed + " km/h"),
            e("#city").text(
              t.query.results.channel.location.region +
                ", " +
                t.query.results.channel.location.country
            );
        });
    }
    function n(t, o) {
      var n =
        "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" +
        o +
        "%2C" +
        t +
        ")%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      console.log(n),
        e.getJSON(n, function (t) {
          e(".temp").text(t.query.results.channel.item.condition.temp + " F"),
            e("#main").text(t.query.results.channel.item.condition.text),
            e("#precipitation").text(
              t.query.results.channel.atmosphere.pressure + " hPa"
            ),
            e("#humidity").text(
              t.query.results.channel.atmosphere.humidity + "%"
            ),
            e("#wind").text(t.query.results.channel.wind.speed + " mph"),
            e("#city").text(
              t.query.results.channel.location.region +
                ", " +
                t.query.results.channel.location.country
            );
        });
    }
    var i = "",
      a = "";
    e("#date").text(e.datepicker.formatDate("M d yy", new Date())),
      e(".nav-toggle").click(function () {
        e(".nav-menu").toggleClass("is-active");
      }),
      e.LoadingOverlaySetup({
        color: "rgba(0, 0, 0, 0.8)",
        image: "img/loader.svg",
      }),
      e(document).ajaxSend(function (t, o, n) {
        e.LoadingOverlay("show");
      }),
      e(document).ajaxComplete(function (t, o, n) {
        e.LoadingOverlay("hide");
      }),
      t(),
      e("#farenheit").click(function () {
        console.log("Ashish rules the world"),
          e("#farenheit-active").addClass("is-active"),
          e("#celsius-active").removeClass("is-active"),
          n(a, i);
      }),
      e("#celsius").click(function () {
        console.log("Ashish rules the world"),
          e("#celsius-active").addClass("is-active"),
          e("#farenheit-active").removeClass("is-active"),
          o(a, i);
      });
  });
})(jQuery);
