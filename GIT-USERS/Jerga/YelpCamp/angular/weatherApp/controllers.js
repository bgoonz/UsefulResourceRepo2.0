weatherApp.controller("forecastController", [
  "$scope",
  "$resource",
  "$routeParams",
  "cityService",
  function ($scope, $resource, $routeParams, cityService) {
    $scope.days = $routeParams.days || "2";

    $scope.city = cityService.city;
    $scope.weatherAPI = $resource(
      "http://api.openweathermap.org/data/2.5/forecast/daily",
      {
        callback: "JSON_CALLBACK",
      },
      { get: { method: "JSONP" } }
    );

    $scope.weatherResult = $scope.weatherAPI.get({
      q: $scope.city,
      cnt: $scope.days,
      appid: "9ba5c9375de0239373a494e10a4a10bb",
    });

    $scope.convertToCelsius = function (degK) {
      return Math.round(degK - 273.15);
    };

    $scope.convertToDate = function (dt) {
      return new Date(dt * 1000);
    };
  },
]);
