(function ($) {
  $(document).ready(function () {
    //Variables
    var lat = "";
    var long = "";

    $("#date").text($.datepicker.formatDate("M d yy", new Date()));

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

    function getLocation() {
      if ("geolocation" in navigator) {
        //check geolocation available
        navigator.geolocation.getCurrentPosition(function (position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          getWeatherInCelsius(long, lat);
        });
      } else {
        console.log("Browser doesn't support geolocation!");
      }
    }

    getLocation();

    function getWeatherInCelsius(long, lat) {
      //https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(40.7141667%2C-74.0063889)%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
      var url =
        "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" +
        lat +
        "%2C" +
        long +
        ")%22)and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      console.log(url);
      $.getJSON(url, function (data) {
        $(".temp").text(data.query.results.channel.item.condition.temp + "°");
        $("#main").text(data.query.results.channel.item.condition.text);
        $("#precipitation").text(
          data.query.results.channel.atmosphere.pressure + " hPa"
        );
        $("#humidity").text(
          data.query.results.channel.atmosphere.humidity + "%"
        );
        $("#wind").text(data.query.results.channel.wind.speed + " km/h");
        $("#city").text(
          data.query.results.channel.location.region +
            ", " +
            data.query.results.channel.location.country
        );
      });
    }

    function getWeatherInFarenheit(long, lat) {
      var url =
        "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" +
        lat +
        "%2C" +
        long +
        ")%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      console.log(url);
      $.getJSON(url, function (data) {
        $(".temp").text(data.query.results.channel.item.condition.temp + " F");
        $("#main").text(data.query.results.channel.item.condition.text);
        $("#precipitation").text(
          data.query.results.channel.atmosphere.pressure + " hPa"
        );
        $("#humidity").text(
          data.query.results.channel.atmosphere.humidity + "%"
        );
        $("#wind").text(data.query.results.channel.wind.speed + " mph");
        $("#city").text(
          data.query.results.channel.location.region +
            ", " +
            data.query.results.channel.location.country
        );
      });
    }

    $("#farenheit").click(function () {
      console.log("Ashish rules the world");
      $("#farenheit-active").addClass("is-active");
      $("#celsius-active").removeClass("is-active");
      getWeatherInFarenheit(long, lat);
    });

    $("#celsius").click(function () {
      console.log("Ashish rules the world");
      $("#celsius-active").addClass("is-active");
      $("#farenheit-active").removeClass("is-active");
      getWeatherInCelsius(long, lat);
    });
  });
})(jQuery);
