(function () {
  "use strict";

  angular.module("app").controller("BookController", [
    "$scope",
    "$routeParams",
    "book",
    function ($scope, $routeParams, book) {
      $scope.book = book;
    },
  ]);
})();
