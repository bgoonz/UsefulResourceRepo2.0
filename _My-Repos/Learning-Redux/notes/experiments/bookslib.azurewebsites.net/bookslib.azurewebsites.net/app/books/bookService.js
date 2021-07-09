(function () {
  "use strict";

  angular.module("app").factory("bookService", [
    "$resource",
    function ($resource) {
      return $resource("/api/books/:id");
    },
  ]);
})();
