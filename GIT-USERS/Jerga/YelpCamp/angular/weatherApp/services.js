//SERVICES

weatherApp.service("cityService", function () {
  this.city = "New Yorkm NY";
});

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
