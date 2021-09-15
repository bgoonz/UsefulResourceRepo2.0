(function () {
  "use strict";

  angular.module("app").factory("booksService", [
    "$resource",
    function ($resource) {
      return $resource("/api/books");
    },
  ]);
})();
