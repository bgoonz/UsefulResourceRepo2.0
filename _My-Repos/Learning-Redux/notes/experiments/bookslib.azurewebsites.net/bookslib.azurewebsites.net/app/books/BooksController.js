(function () {
  "use strict";

  angular.module("app").controller("BooksController", [
    "$scope",
    "$http",
    "books",
    function ($scope, $http, books) {
      $scope.title = "Books";
      $scope.books = books;

      $scope.sortOptions = [
        { value: "title", text: "Sort by title" },
        { value: "-votes", text: "Sort by votes" },
        { value: "author", text: "Sort by author" },
        { value: "-favorites", text: "Sort by favorites" },
      ];
      $scope.sortBy = $scope.sortOptions[0].value;
    },
  ]);
})();
