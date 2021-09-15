weatherApp.controller("homeController", [
  "$scope",
  "cityService",
  function ($scope, cityService) {
    $scope.city = cityService.city;

    $scope.$watch("city", function () {
      //watcher
      cityService.city = $scope.city;
    });
  },
]);

weatherApp.controller("forecastController", [
  "$scope",
  "$routeParams",
  "cityService",
  "weatherService",
  function ($scope, $routeParams, cityService, weatherService) {
    $scope.days = $routeParams.days || "2";

    $scope.city = cityService.city;

    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);

    $scope.convertToCelsius = function (degK) {
      return Math.round(degK - 273.15);
    };

    $scope.convertToDate = function (dt) {
      return new Date(dt * 1000);
    };
  },
]);
