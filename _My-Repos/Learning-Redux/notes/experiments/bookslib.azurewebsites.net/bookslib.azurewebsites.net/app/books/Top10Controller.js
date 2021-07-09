(function () {
  "use strict";

  angular.module("app").controller("Top10Controller", [
    "$scope",
    "top10Service",
    function ($scope, top10Service) {
      $scope.title = "Top 10 Books";
      $scope.books = top10Service.query();
    },
  ]);
})();
