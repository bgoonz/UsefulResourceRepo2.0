weatherApp.config(function ($routeProvider) {
  $routeProvider

    .when("/", {
      templateUrl: "../weatherAPI/pages/home.ejs",
      controller: "homeController",
    })

    .when("/forecast", {
      templateUrl: "../weatherAPI/pages/forecast.ejs",
      controller: "forecastController",
    })

    .when("/forecast/:days", {
      templateUrl: "../weatherAPI/pages/forecast.html",
      controller: "forecastController",
    });
});
