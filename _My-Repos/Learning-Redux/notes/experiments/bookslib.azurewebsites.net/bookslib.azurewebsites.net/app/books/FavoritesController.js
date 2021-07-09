(function () {
  "use strict";

  angular.module("app").controller("FavoritesController", [
    "$scope",
    "favoritesService",
    function ($scope, favoritesService) {
      $scope.title = "Favorite books";
      $scope.books = favoritesService.query();
    },
  ]);
})();
