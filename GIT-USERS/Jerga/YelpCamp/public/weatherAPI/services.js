//SERVICES

weatherApp.service("cityService", function () {
  this.city = "New Yorkm NY";
});

weatherApp.service("weatherService", [
  "$resource",
  function ($resource) {
    this.getWeather = function (city, days) {
      var weatherAPI = $resource(
        "http://api.openweathermap.org/data/2.5/forecast/daily",
        {
          callback: "JSON_CALLBACK",
        },
        { get: { method: "JSONP" } }
      );

      return weatherAPI.get({
        q: city,
        cnt: days,
        appid: "9ba5c9375de0239373a494e10a4a10bb",
      });
    };
  },
]);
